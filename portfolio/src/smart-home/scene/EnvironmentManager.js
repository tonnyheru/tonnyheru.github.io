import * as THREE from "three";

/**
 * EnvironmentManager
 * Controls lighting, sky atmosphere, day/night transitions, ground grid, and ambient particles.
 */
export class EnvironmentManager {
  constructor(scene) {
    this.scene = scene;

    // Day & Night color configs
    this.nightConfig = {
      skyColor: new THREE.Color(0x060914),
      fogColor: new THREE.Color(0x060914),
      ambientColor: new THREE.Color(0x101b38),
      ambientIntensity: 0.45,
      sunColor: new THREE.Color(0x38bdf8),
      sunIntensity: 0.35,
      sunPos: new THREE.Vector3(8, 14, 8),
      hemiSky: new THREE.Color(0x1e1b4b),
      hemiGround: new THREE.Color(0x020617),
      hemiIntensity: 0.35,
      groundColor: new THREE.Color(0x040711),
    };

    this.dayConfig = {
      skyColor: new THREE.Color(0xdbeafe), // Soft bright sky blue
      fogColor: new THREE.Color(0xdbeafe),
      ambientColor: new THREE.Color(0xffffff), // Pure white bright ambient illumination
      ambientIntensity: 1.35,
      sunColor: new THREE.Color(0xfffaed), // Warm brilliant sunlight
      sunIntensity: 1.9,
      sunPos: new THREE.Vector3(14, 24, 12),
      hemiSky: new THREE.Color(0xdbeafe),
      hemiGround: new THREE.Color(0xf1f5f9),
      hemiIntensity: 1.0,
      groundColor: new THREE.Color(0x94a3b8), // Modern bright stone patio
    };

    // Default starting state: Bright Daytime
    this.currentSky = new THREE.Color(0xdbeafe);
    this.currentFog = new THREE.Color(0xdbeafe);
    this.scene.background = this.currentSky;

    this.setupLighting();
    this.setupEnvironment();
    this.setupParticles();
  }

  setupLighting() {
    // Ambient Light (Bright daylight default)
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    this.scene.add(this.ambientLight);

    // Hemisphere Light (Sky vs Ground bounce)
    this.hemiLight = new THREE.HemisphereLight(0xdbeafe, 0xf1f5f9, 1.0);
    this.scene.add(this.hemiLight);

    // Directional Sun
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.9);
    this.sunLight.position.set(14, 24, 12);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 48;
    this.sunLight.shadow.camera.left = -16;
    this.sunLight.shadow.camera.right = 16;
    this.sunLight.shadow.camera.top = 16;
    this.sunLight.shadow.camera.bottom = -16;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);

    // Fog (Light atmospheric distance fog)
    this.scene.fog = new THREE.Fog(0xdbeafe, 32, 60);
  }

  setupEnvironment() {
    // Ground Base Slab (Clean architectural patio)
    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.9,
      metalness: 0.1,
    });
    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = -0.02;
    this.groundMesh.receiveShadow = true;
    this.scene.add(this.groundMesh);

    // Futuristic Cyber Grid
    this.grid = new THREE.GridHelper(32, 32, 0x0284c7, 0x64748b);
    this.grid.position.y = 0.001;
    this.grid.material.opacity = 0.15;
    this.grid.material.transparent = true;
    this.scene.add(this.grid);

    // Outer garden / pathway lights
    this.pathwayLights = [];
    const pathPositions = [
      [-6, 0.1, 6],
      [-2, 0.1, 6],
      [2, 0.1, 6],
      [6, 0.1, 6],
    ];
    pathPositions.forEach(([x, y, z]) => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
      );
      pole.position.set(x, y + 0.15, z);
      this.scene.add(pole);

      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.04, 12),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff })
      );
      cap.position.set(x, y + 0.32, z);
      this.scene.add(cap);

      const light = new THREE.PointLight(0x00d4ff, 0.6, 2.2);
      light.position.set(x, y + 0.35, z);
      this.scene.add(light);
      this.pathwayLights.push({ light, cap });
    });
  }

  setupParticles() {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = Math.random() * 12 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 32;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.06,
      transparent: true,
      opacity: 0.45,
    });

    this.particles = new THREE.Points(pGeo, pMat);
    this.scene.add(this.particles);
  }

  update(isNightMode, elapsedTime) {
    const target = isNightMode ? this.nightConfig : this.dayConfig;
    const lerpFactor = 0.05;

    // Sky & Fog
    this.currentSky.lerp(target.skyColor, lerpFactor);
    this.scene.background = this.currentSky;
    if (this.scene.fog) {
      this.currentFog.lerp(target.fogColor, lerpFactor);
      this.scene.fog.color.copy(this.currentFog);
    }

    // Ambient
    this.ambientLight.color.lerp(target.ambientColor, lerpFactor);
    this.ambientLight.intensity += (target.ambientIntensity - this.ambientLight.intensity) * lerpFactor;

    // Hemisphere
    this.hemiLight.color.lerp(target.hemiSky, lerpFactor);
    this.hemiLight.groundColor.lerp(target.hemiGround, lerpFactor);
    this.hemiLight.intensity += (target.hemiIntensity - this.hemiLight.intensity) * lerpFactor;

    // Sun / Moon
    this.sunLight.color.lerp(target.sunColor, lerpFactor);
    this.sunLight.intensity += (target.sunIntensity - this.sunLight.intensity) * lerpFactor;
    this.sunLight.position.lerp(target.sunPos, lerpFactor);

    // Ground & Grid
    if (this.groundMesh) {
      this.groundMesh.material.color.lerp(target.groundColor, lerpFactor);
    }
    if (this.grid) {
      this.grid.material.opacity = isNightMode ? 0.25 : 0.12;
      this.grid.material.color.setHex(isNightMode ? 0x00d4ff : 0x0284c7);
    }

    // Pathway lights
    const pathIntensity = isNightMode ? 0.7 + Math.sin(elapsedTime * 2) * 0.1 : 0.05;
    this.pathwayLights.forEach(({ light, cap }) => {
      light.intensity += (pathIntensity - light.intensity) * lerpFactor;
      cap.material.color.setHex(isNightMode ? 0x00d4ff : 0x334155);
    });

    // Particle drift
    if (this.particles) {
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += 0.004;
        if (positions[i * 3 + 1] > 12) positions[i * 3 + 1] = 0.5;
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }
  }
}
