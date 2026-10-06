import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useSmartHome } from "../state/SmartHomeContext";
import { CameraController } from "./CameraController";
import { EnvironmentManager } from "./EnvironmentManager";
import { HouseModelBuilder } from "./HouseModelBuilder";
import { ROOMS } from "../constants";

export default function House3DScene({ onDeviceHover, onDeviceClick }) {
  const mountRef = useRef(null);
  const state = useSmartHome();
  const stateRef = useRef(state);

  // Keep stateRef up to date for animation loop without restarting Three.js
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const sceneRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    cameraController: null,
    envManager: null,
    houseBuilder: null,
  });

  // Watch activeRoom changes to glide camera
  useEffect(() => {
    const ctrl = sceneRefs.current.cameraController;
    if (ctrl && state.activeRoom && ROOMS[state.activeRoom]) {
      const room = ROOMS[state.activeRoom];
      ctrl.flyTo(room.cameraPos, room.targetPos, 1100);
    }
  }, [state.activeRoom]);

  // Click on 3D object handler
  const handleDeviceInteraction = useCallback((device) => {
    if (!device) return;
    const s = stateRef.current;

    switch (device.deviceType) {
      case "tv":
        s.toggleTv();
        break;
      case "ac":
        s.toggleAc();
        break;
      case "door_lock":
        s.toggleDoorLock();
        break;
      case "door":
        s.toggleDoorOpen();
        break;
      case "curtains":
        s.toggleCurtains(device.room);
        break;
      case "garage":
        s.toggleGarageDoor();
        break;
      case "ev":
        s.toggleEvCharging();
        break;
      case "light":
        s.toggleLight(device.room);
        break;
      case "camera":
        s.toggleCamera(device.deviceId);
        break;
      case "fridge":
        s.setActiveRoom("kitchen");
        break;
      case "hologram":
      case "router":
        s.setActiveRoom("controlRoom");
        break;
      default:
        break;
    }

    s.setSelectedDevice(device);
    if (onDeviceClick) onDeviceClick(device);
  }, [onDeviceClick]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    /* ── 1. RENDERER ── */
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    /* ── 2. SCENE & CAMERA ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(14, 12, 14);
    camera.lookAt(0, 1.2, 0);

    /* ── 3. MANAGERS ── */
    const envManager = new EnvironmentManager(scene);
    const houseBuilder = new HouseModelBuilder(scene);
    const cameraController = new CameraController(camera, renderer.domElement);

    sceneRefs.current = {
      scene,
      camera,
      renderer,
      cameraController,
      envManager,
      houseBuilder,
    };

    /* ── 4. RAYCASTING (HOVER & CLICK) ── */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredMesh = null;

    const getIntersectedObject = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(houseBuilder.interactiveObjects, true);

      if (intersects.length > 0) {
        // Traverse upwards to find the object with userData.isInteractive
        let cur = intersects[0].object;
        while (cur && !cur.userData?.isInteractive && cur !== scene) {
          cur = cur.parent;
        }
        if (cur && cur.userData?.isInteractive) {
          return { object: cur, point: intersects[0].point };
        }
      }
      return null;
    };

    const onPointerMove = (e) => {
      const result = getIntersectedObject(e);
      if (result) {
        hoveredMesh = result.object;
        renderer.domElement.style.cursor = "pointer";
        const rect = renderer.domElement.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        stateRef.current.setHoveredDevice({
          ...result.object.userData,
          screenX,
          screenY,
        });
        if (onDeviceHover) onDeviceHover(result.object.userData);
      } else {
        if (hoveredMesh) {
          hoveredMesh = null;
          renderer.domElement.style.cursor = "grab";
          stateRef.current.setHoveredDevice(null);
          if (onDeviceHover) onDeviceHover(null);
        }
      }
    };

    const onClick = (e) => {
      // Ignore click if was dragging
      if (cameraController.isDragging) return;
      const result = getIntersectedObject(e);
      if (result) {
        handleDeviceInteraction(result.object.userData);
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    /* ── 5. RESIZE ── */
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    /* ── 6. ANIMATION LOOP ── */
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const curState = stateRef.current;

      cameraController.update();
      envManager.update(curState.isNightMode, elapsedTime);
      houseBuilder.update(curState, elapsedTime);

      renderer.render(scene, camera);
    };
    animate();

    /* ── CLEANUP ── */
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      cameraController.dispose();
      houseBuilder.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleDeviceInteraction, onDeviceClick, onDeviceHover]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: state.isNightMode ? "#060914" : "#dbeafe",
      }}
    />
  );
}
