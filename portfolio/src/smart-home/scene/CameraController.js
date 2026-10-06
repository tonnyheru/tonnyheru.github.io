import * as THREE from "three";

/**
 * CameraController
 * Handles orbit rotation, smooth zooming, panning, and cinematic transitions to rooms/devices.
 */
export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // Spherical coordinates
    this.target = new THREE.Vector3(0, 1.2, 0);
    this.currentLookAt = new THREE.Vector3(0, 1.2, 0);

    // Initial camera position & spherical angles
    const offset = new THREE.Vector3().subVectors(this.camera.position, this.target);
    this.radius = offset.length() || 18;
    this.targetRadius = this.radius;

    this.theta = Math.atan2(offset.x, offset.z); // Horizontal angle
    this.targetTheta = this.theta;

    this.phi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.radius))); // Elevation angle
    this.targetPhi = Math.max(0.2, Math.min(1.4, this.phi));

    // Interaction states
    this.isDragging = false;
    this.previousMouse = { x: 0, y: 0 };
    this.autoRotate = false;
    this.autoRotateSpeed = 0.002;
    this.idleTimer = null;

    // Transition animation
    this.inTransition = false;
    this.transitionStart = 0;
    this.transitionDuration = 1200; // ms
    this.transitionFromCam = new THREE.Vector3();
    this.transitionToCam = new THREE.Vector3();
    this.transitionFromLook = new THREE.Vector3();
    this.transitionToLook = new THREE.Vector3();

    this.bindEvents();
  }

  bindEvents() {
    this.onMouseDown = (e) => {
      if (e.button !== 0) return; // Left click only
      this.isDragging = true;
      this.previousMouse = { x: e.clientX, y: e.clientY };
      this.domElement.style.cursor = "grabbing";
      this.resetIdle();
    };

    this.onMouseMove = (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMouse.x;
      const deltaY = e.clientY - this.previousMouse.y;
      this.previousMouse = { x: e.clientX, y: e.clientY };

      this.targetTheta -= deltaX * 0.007;
      this.targetPhi = Math.max(0.18, Math.min(1.42, this.targetPhi + deltaY * 0.005));
      this.resetIdle();
    };

    this.onMouseUp = () => {
      this.isDragging = false;
      this.domElement.style.cursor = "grab";
    };

    this.onWheel = (e) => {
      e.preventDefault();
      this.targetRadius = Math.max(4.5, Math.min(26.0, this.targetRadius + e.deltaY * 0.015));
      this.resetIdle();
    };

    // Touch
    let lastTouchDist = 0;
    this.onTouchStart = (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        this.isDragging = false;
        lastTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
      this.resetIdle();
    };

    this.onTouchMove = (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        const deltaX = e.touches[0].clientX - this.previousMouse.x;
        const deltaY = e.touches[0].clientY - this.previousMouse.y;
        this.previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        this.targetTheta -= deltaX * 0.007;
        this.targetPhi = Math.max(0.18, Math.min(1.42, this.targetPhi + deltaY * 0.005));
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (lastTouchDist - dist) * 0.03;
        this.targetRadius = Math.max(4.5, Math.min(26.0, this.targetRadius + factor));
        lastTouchDist = dist;
      }
      this.resetIdle();
    };

    this.onTouchEnd = () => {
      this.isDragging = false;
    };

    this.domElement.style.cursor = "grab";
    this.domElement.addEventListener("mousedown", this.onMouseDown);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
    this.domElement.addEventListener("wheel", this.onWheel, { passive: false });
    this.domElement.addEventListener("touchstart", this.onTouchStart, { passive: true });
    this.domElement.addEventListener("touchmove", this.onTouchMove, { passive: true });
    this.domElement.addEventListener("touchend", this.onTouchEnd);
  }

  resetIdle() {
    this.autoRotate = false;
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      // Auto rotate only if overview
      if (!this.inTransition) {
        this.autoRotate = true;
      }
    }, 6000);
  }

  /**
   * Smoothly fly camera to a new room or device
   */
  flyTo(camPos, targetPos, duration = 1000) {
    this.inTransition = true;
    this.transitionStart = performance.now();
    this.transitionDuration = duration;

    this.transitionFromCam.copy(this.camera.position);
    this.transitionToCam.set(...camPos);

    this.transitionFromLook.copy(this.currentLookAt);
    this.transitionToLook.set(...targetPos);

    // Compute spherical target matching transitionToCam
    const offset = new THREE.Vector3().subVectors(this.transitionToCam, this.transitionToLook);
    this.targetRadius = offset.length();
    this.targetTheta = Math.atan2(offset.x, offset.z);
    this.targetPhi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.targetRadius)));

    this.autoRotate = false;
  }

  update() {
    const now = performance.now();

    if (this.inTransition) {
      const elapsed = now - this.transitionStart;
      const progress = Math.min(1, elapsed / this.transitionDuration);
      // Smooth easeInOutCubic
      const t = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.camera.position.lerpVectors(this.transitionFromCam, this.transitionToCam, t);
      this.currentLookAt.lerpVectors(this.transitionFromLook, this.transitionToLook, t);
      this.camera.lookAt(this.currentLookAt);

      if (progress >= 1) {
        this.inTransition = false;
        this.target.copy(this.transitionToLook);
        this.radius = this.targetRadius;
        this.theta = this.targetTheta;
        this.phi = this.targetPhi;
      }
      return;
    }

    if (this.autoRotate && !this.isDragging) {
      this.targetTheta += this.autoRotateSpeed;
    }

    // Damping interpolation
    const damping = 0.08;
    this.theta += (this.targetTheta - this.theta) * damping;
    this.phi += (this.targetPhi - this.phi) * damping;
    this.radius += (this.targetRadius - this.radius) * damping;
    this.currentLookAt.lerp(this.target, damping);

    // Calculate Cartesian camera position from spherical coordinates relative to target
    this.camera.position.x = this.currentLookAt.x + this.radius * Math.sin(this.phi) * Math.sin(this.theta);
    this.camera.position.y = this.currentLookAt.y + this.radius * Math.cos(this.phi);
    this.camera.position.z = this.currentLookAt.z + this.radius * Math.sin(this.phi) * Math.cos(this.theta);

    this.camera.lookAt(this.currentLookAt);
  }

  dispose() {
    clearTimeout(this.idleTimer);
    this.domElement.removeEventListener("mousedown", this.onMouseDown);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    this.domElement.removeEventListener("wheel", this.onWheel);
    this.domElement.removeEventListener("touchstart", this.onTouchStart);
    this.domElement.removeEventListener("touchmove", this.onTouchMove);
    this.domElement.removeEventListener("touchend", this.onTouchEnd);
  }
}
