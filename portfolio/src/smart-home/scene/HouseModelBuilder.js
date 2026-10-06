import * as THREE from "three";

/**
 * HouseModelBuilder
 * Generates the modular 3D architectural villa, 6 rooms, furniture, and smart IoT devices.
 */

// Helper to create box meshes
function createBox(w, h, d, color, roughness = 0.5, metalness = 0.2, emissive = 0x000000, emissiveIntensity = 0) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      emissive,
      emissiveIntensity,
    })
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export class HouseModelBuilder {
  constructor(scene) {
    this.scene = scene;
    this.root = new THREE.Group();
    this.scene.add(this.root);

    // Interactive meshes for raycasting
    this.interactiveObjects = [];

    // References to animatable parts
    this.roomLights = {};
    this.animatedComponents = {
      tvScreenMesh: null,
      tvCanvas: null,
      tvCtx: null,
      tvTexture: null,
      doorHingeGroup: null,
      garageGateGroup: null,
      curtainsLiving: { left: null, right: null },
      curtainsBedroom: { left: null, right: null },
      acLouvers: [],
      acParticles: null,
      wifiRings: [],
      holoPedestal: null,
      surveillanceCams: [],
      evChargingLED: null,
      smartLockMesh: null,
      serverLeds: [],
    };

    this.buildArchitecture();
    this.buildLivingRoom();
    this.buildMasterBedroom();
    this.buildKitchenDining();
    this.buildBathroom();
    this.buildGarageBay();
    this.buildSmartControlRoom();
    this.buildFrontEntrance();
    this.buildSecurityCameras();
  }

  /* ══════════════════════════════════════════════════════
     1. ARCHITECTURAL SLABS, WALLS & GLASS
  ══════════════════════════════════════════════════════ */
  buildArchitecture() {
    // Main Foundation Podium Slab (17 x 0.25 x 12.5)
    const foundation = createBox(17.2, 0.25, 12.5, 0x1e293b, 0.6, 0.2);
    foundation.position.set(0, 0.125, 0);
    this.root.add(foundation);

    // Outer Neon Base Trim
    const neonTrimMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const trimFront = new THREE.Mesh(new THREE.BoxGeometry(17.3, 0.04, 0.04), neonTrimMat);
    trimFront.position.set(0, 0.25, 6.25);
    this.root.add(trimFront);

    const trimBack = new THREE.Mesh(new THREE.BoxGeometry(17.3, 0.04, 0.04), neonTrimMat);
    trimBack.position.set(0, 0.25, -6.25);
    this.root.add(trimBack);

    // Room Floors (Slightly elevated over foundation)
    // Living Room Floor (Rich luxury navy-slate wood)
    const lrFloor = createBox(5.6, 0.04, 5.6, 0x24324f, 0.7, 0.1);
    lrFloor.position.set(-4.8, 0.27, 2.8);
    this.root.add(lrFloor);

    // Bedroom Floor (Charcoal plum cozy finish)
    const brFloor = createBox(5.6, 0.04, 5.6, 0x2e2752, 0.8, 0.05);
    brFloor.position.set(4.8, 0.27, 2.8);
    this.root.add(brFloor);

    // Kitchen Floor (Polished ceramic quartz)
    const kFloor = createBox(5.6, 0.04, 5.6, 0x1b4047, 0.35, 0.4);
    kFloor.position.set(-4.8, 0.27, -3.1);
    this.root.add(kFloor);

    // Bathroom Floor (High gloss porcelain)
    const bFloor = createBox(3.4, 0.04, 5.6, 0x1b4554, 0.2, 0.5);
    bFloor.position.set(3.7, 0.27, -3.1);
    this.root.add(bFloor);

    // Garage Floor (Concrete epoxy)
    const gFloor = createBox(3.4, 0.04, 6.0, 0x263345, 0.6, 0.2);
    gFloor.position.set(7.1, 0.27, -0.2);
    this.root.add(gFloor);

    // Control Room Floor (Raised floor tiles)
    const crFloor = createBox(3.6, 0.04, 5.6, 0x1c2b47, 0.5, 0.4);
    crFloor.position.set(0, 0.27, -3.1);
    this.root.add(crFloor);

    // Entrance Foyer Floor
    const efFloor = createBox(3.6, 0.04, 5.6, 0x21324d, 0.5, 0.2);
    efFloor.position.set(0, 0.27, 2.8);
    this.root.add(efFloor);

    // Architectural Low Cutaway Walls (height 1.8 - allows full camera view into all rooms)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x283b5c,
      roughness: 0.5,
      metalness: 0.1,
    });

    const dividerMat = new THREE.MeshStandardMaterial({
      color: 0x20304a,
      roughness: 0.6,
      metalness: 0.15,
    });

    // Outer Back Wall
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(17.0, 2.2, 0.18), wallMat);
    backWall.position.set(0, 1.35, -6.1);
    backWall.castShadow = true;
    this.root.add(backWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 12.0), wallMat);
    leftWall.position.set(-7.7, 1.35, 0);
    leftWall.castShadow = true;
    this.root.add(leftWall);

    // Right Wall (Garage side)
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 12.0), wallMat);
    rightWall.position.set(8.7, 1.35, 0);
    rightWall.castShadow = true;
    this.root.add(rightWall);

    // Front Low Walls with window openings
    const frontWallL = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.9, 0.18), wallMat);
    frontWallL.position.set(-4.9, 0.7, 5.8);
    this.root.add(frontWallL);

    const frontWallR = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.9, 0.18), wallMat);
    frontWallR.position.set(4.9, 0.7, 5.8);
    this.root.add(frontWallR);

    // Internal Dividing Wall (Separating front and back rooms)
    const centerWallH1 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.2, 0.15), dividerMat);
    centerWallH1.position.set(-4.9, 1.35, -0.15);
    centerWallH1.castShadow = true;
    this.root.add(centerWallH1);

    const centerWallH2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, 0.15), dividerMat);
    centerWallH2.position.set(0, 1.35, -0.15);
    centerWallH2.castShadow = true;
    this.root.add(centerWallH2);

    const centerWallH3 = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.2, 0.15), dividerMat);
    centerWallH3.position.set(4.9, 1.35, -0.15);
    centerWallH3.castShadow = true;
    this.root.add(centerWallH3);

    // Vertical dividers between rooms
    const vertDivider1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 5.6), dividerMat);
    vertDivider1.position.set(-2.0, 1.35, 2.8);
    this.root.add(vertDivider1);

    const vertDivider2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 5.6), dividerMat);
    vertDivider2.position.set(2.0, 1.35, 2.8);
    this.root.add(vertDivider2);

    const vertDivider3 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 5.6), dividerMat);
    vertDivider3.position.set(-2.0, 1.35, -3.1);
    this.root.add(vertDivider3);

    const vertDivider4 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 5.6), dividerMat);
    vertDivider4.position.set(2.0, 1.35, -3.1);
    this.root.add(vertDivider4);

    const vertDivider5 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 5.6), dividerMat);
    vertDivider5.position.set(5.4, 1.35, -3.1);
    this.root.add(vertDivider5);

    // Panoramic Smoked Glass Windows
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00244d,
      roughness: 0.05,
      metalness: 0.9,
      transparent: true,
      opacity: 0.35,
    });

    const windowL = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.3, 0.06), glassMat);
    windowL.position.set(-4.9, 1.8, 5.8);
    this.root.add(windowL);

    const windowR = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.3, 0.06), glassMat);
    windowR.position.set(4.9, 1.8, 5.8);
    this.root.add(windowR);
  }

  /* ══════════════════════════════════════════════════════
     2. LIVING ROOM (TV, SOFA, AC, CURTAINS, LIGHT)
  ══════════════════════════════════════════════════════ */
  buildLivingRoom() {
    const lrGroup = new THREE.Group();
    this.root.add(lrGroup);

    // Sectional Sofa L-Shape
    const sofaMain = createBox(2.8, 0.45, 1.1, 0x1b2848, 0.8, 0.1);
    sofaMain.position.set(-4.5, 0.5, 3.8);
    lrGroup.add(sofaMain);

    const sofaBack = createBox(2.8, 0.45, 0.25, 0x141f38, 0.8, 0.1);
    sofaBack.position.set(-4.5, 0.9, 4.3);
    lrGroup.add(sofaBack);

    const sofaL = createBox(1.1, 0.45, 1.4, 0x1b2848, 0.8, 0.1);
    sofaL.position.set(-3.65, 0.5, 2.8);
    lrGroup.add(sofaL);

    // Coffee table (Tempered glass top + cyber metallic legs)
    const tableTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.06, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.45, roughness: 0.1, metalness: 0.8 })
    );
    tableTop.position.set(-4.8, 0.42, 2.4);
    lrGroup.add(tableTop);

    const tableBase = createBox(1.2, 0.12, 0.6, 0x0a1426, 0.5, 0.5);
    tableBase.position.set(-4.8, 0.35, 2.4);
    lrGroup.add(tableBase);

    // Floating Media Console
    const consoleTable = createBox(3.0, 0.3, 0.5, 0x0e172a, 0.6, 0.3);
    consoleTable.position.set(-4.8, 0.44, 0.3);
    lrGroup.add(consoleTable);

    // ── SMART OLED TV ──
    const tvFrame = createBox(2.2, 1.25, 0.08, 0x05070f, 0.2, 0.9);
    tvFrame.position.set(-4.8, 1.5, 0.15);
    lrGroup.add(tvFrame);

    // Dynamic Procedural Canvas Screen
    const tvCanvas = document.createElement("canvas");
    tvCanvas.width = 512;
    tvCanvas.height = 288;
    const tvCtx = tvCanvas.getContext("2d");
    const tvTexture = new THREE.CanvasTexture(tvCanvas);
    tvTexture.minFilter = THREE.LinearFilter;

    const tvScreenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.15),
      new THREE.MeshBasicMaterial({ map: tvTexture })
    );
    tvScreenMesh.position.set(-4.8, 1.5, 0.2);
    tvScreenMesh.userData = {
      isInteractive: true,
      deviceId: "tv",
      deviceType: "tv",
      name: "Smart OLED TV 65\"",
      room: "livingRoom",
      actionHint: "Click to toggle power / channel",
    };
    lrGroup.add(tvScreenMesh);
    this.interactiveObjects.push(tvScreenMesh);

    // Ambient TV back glow light
    const tvBackLight = new THREE.PointLight(0x00d4ff, 1.5, 4.0);
    tvBackLight.position.set(-4.8, 1.5, 0.4);
    lrGroup.add(tvBackLight);

    this.animatedComponents.tvScreenMesh = tvScreenMesh;
    this.animatedComponents.tvCanvas = tvCanvas;
    this.animatedComponents.tvCtx = tvCtx;
    this.animatedComponents.tvTexture = tvTexture;
    this.animatedComponents.tvBackLight = tvBackLight;

    // ── AIR CONDITIONER (Living Room) ──
    const acBody = createBox(1.3, 0.35, 0.28, 0x1e293b, 0.3, 0.4);
    acBody.position.set(-7.4, 2.0, 2.5);
    acBody.rotation.y = Math.PI / 2;
    acBody.userData = {
      isInteractive: true,
      deviceId: "ac",
      deviceType: "ac",
      name: "Inverter Climate AC",
      room: "livingRoom",
      actionHint: "Click to adjust temperature & mode",
    };
    lrGroup.add(acBody);
    this.interactiveObjects.push(acBody);

    // AC status LED strip
    const acLed = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.03, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    acLed.position.set(-7.25, 1.92, 2.5);
    acLed.rotation.y = Math.PI / 2;
    lrGroup.add(acLed);

    // AC Louver
    const acLouver = createBox(1.1, 0.03, 0.12, 0x334155, 0.4, 0.3);
    acLouver.position.set(-7.28, 1.86, 2.5);
    acLouver.rotation.y = Math.PI / 2;
    lrGroup.add(acLouver);
    this.animatedComponents.acLouvers.push(acLouver);
    this.animatedComponents.acLed = acLed;

    // AC Breeze Particle Stream
    const acParticleCount = 45;
    const acPPos = new Float32Array(acParticleCount * 3);
    for (let i = 0; i < acParticleCount; i++) {
      acPPos[i * 3] = -7.2 + Math.random() * 2.2;
      acPPos[i * 3 + 1] = 1.8 - Math.random() * 0.9;
      acPPos[i * 3 + 2] = 2.5 + (Math.random() - 0.5) * 1.0;
    }
    const acPGeo = new THREE.BufferGeometry();
    acPGeo.setAttribute("position", new THREE.Float32BufferAttribute(acPPos, 3));
    const acPMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.55,
    });
    const acParticles = new THREE.Points(acPGeo, acPMat);
    lrGroup.add(acParticles);
    this.animatedComponents.acParticles = acParticles;

    // ── SMART CURTAINS (Living Room) ──
    const curtainRail = createBox(5.3, 0.06, 0.08, 0x1e293b, 0.4, 0.6);
    curtainRail.position.set(-4.9, 2.45, 5.72);
    lrGroup.add(curtainRail);

    const curtainMat = new THREE.MeshStandardMaterial({
      color: 0x0f223f,
      roughness: 0.85,
      metalness: 0.1,
    });

    const curtainL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.04), curtainMat);
    curtainL.position.set(-6.1, 1.6, 5.72);
    curtainL.userData = {
      isInteractive: true,
      deviceId: "curtains_living",
      deviceType: "curtains",
      name: "Panoramic Smart Curtains",
      room: "livingRoom",
      actionHint: "Click to open / close curtains",
    };
    lrGroup.add(curtainL);
    this.interactiveObjects.push(curtainL);

    const curtainR = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.04), curtainMat);
    curtainR.position.set(-3.7, 1.6, 5.72);
    curtainR.userData = {
      isInteractive: true,
      deviceId: "curtains_living",
      deviceType: "curtains",
      name: "Panoramic Smart Curtains",
      room: "livingRoom",
      actionHint: "Click to open / close curtains",
    };
    lrGroup.add(curtainR);
    this.interactiveObjects.push(curtainR);

    this.animatedComponents.curtainsLiving = { left: curtainL, right: curtainR };

    // ── ROOM LIGHTING (Living Room) ──
    const lrLight = new THREE.PointLight(0x00d4ff, 2.5, 6.5);
    lrLight.position.set(-4.8, 2.4, 2.8);
    lrLight.castShadow = true;
    lrGroup.add(lrLight);

    const bulbMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    bulbMesh.position.set(-4.8, 2.4, 2.8);
    bulbMesh.userData = {
      isInteractive: true,
      deviceId: "light_livingRoom",
      deviceType: "light",
      name: "Living Room Lighting",
      room: "livingRoom",
      actionHint: "Click to toggle light",
    };
    lrGroup.add(bulbMesh);
    this.interactiveObjects.push(bulbMesh);

    // Ceiling disc fixture
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.04, 16),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
    );
    disc.position.set(-4.8, 2.48, 2.8);
    lrGroup.add(disc);

    this.roomLights.livingRoom = { light: lrLight, bulb: bulbMesh };
  }

  /* ══════════════════════════════════════════════════════
     3. MASTER BEDROOM (BED, NIGHTSTANDS, AC, CURTAINS)
  ══════════════════════════════════════════════════════ */
  buildMasterBedroom() {
    const brGroup = new THREE.Group();
    this.root.add(brGroup);

    // King Platform Bed
    const bedPlatform = createBox(2.4, 0.35, 2.6, 0x1e1b4b, 0.8, 0.2);
    bedPlatform.position.set(4.8, 0.45, 3.2);
    brGroup.add(bedPlatform);

    // Mattress & Duvet
    const mattress = createBox(2.1, 0.28, 2.3, 0x312e81, 0.9, 0.05);
    mattress.position.set(4.8, 0.72, 3.2);
    brGroup.add(mattress);

    // Duvet fold
    const duvet = createBox(2.15, 0.08, 1.4, 0x4338ca, 0.8, 0.1);
    duvet.position.set(4.8, 0.88, 3.6);
    brGroup.add(duvet);

    // Pillows
    [-0.55, 0.55].forEach(xOff => {
      const pillow = createBox(0.7, 0.14, 0.45, 0x6366f1, 0.9, 0.0);
      pillow.position.set(4.8 + xOff, 0.92, 2.3);
      brGroup.add(pillow);
    });

    // Headboard with ambient halo LED
    const headboard = createBox(2.6, 1.1, 0.16, 0x110e2e, 0.7, 0.3);
    headboard.position.set(4.8, 1.05, 1.9);
    brGroup.add(headboard);

    const headboardLED = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.04, 0.04),
      new THREE.MeshBasicMaterial({ color: 0xa855f7 })
    );
    headboardLED.position.set(4.8, 1.62, 1.95);
    brGroup.add(headboardLED);

    // Bedside Nightstands & Mood Lamps
    [-1.6, 1.6].forEach(xOff => {
      const nightstand = createBox(0.65, 0.5, 0.55, 0x0f172a, 0.6, 0.3);
      nightstand.position.set(4.8 + xOff, 0.52, 2.2);
      brGroup.add(nightstand);

      const lampBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 0.1, 12),
        new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 })
      );
      lampBase.position.set(4.8 + xOff, 0.82, 2.2);
      brGroup.add(lampBase);

      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xa855f7 })
      );
      orb.position.set(4.8 + xOff, 0.98, 2.2);
      brGroup.add(orb);
    });

    // Bedroom AC unit
    const brAc = createBox(1.2, 0.32, 0.25, 0x1e293b, 0.3, 0.4);
    brAc.position.set(7.5, 2.0, 2.5);
    brAc.rotation.y = -Math.PI / 2;
    brGroup.add(brAc);

    // Bedroom Curtains
    const curtainRailBR = createBox(5.3, 0.06, 0.08, 0x1e293b, 0.4, 0.6);
    curtainRailBR.position.set(4.9, 2.45, 5.72);
    brGroup.add(curtainRailBR);

    const curtainMatBR = new THREE.MeshStandardMaterial({
      color: 0x1d1438,
      roughness: 0.85,
      metalness: 0.1,
    });

    const curtainBRL = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.04), curtainMatBR);
    curtainBRL.position.set(3.7, 1.6, 5.72);
    curtainBRL.userData = {
      isInteractive: true,
      deviceId: "curtains_bedroom",
      deviceType: "curtains",
      name: "Bedroom Privacy Curtains",
      room: "bedroom",
      actionHint: "Click to toggle curtains",
    };
    brGroup.add(curtainBRL);
    this.interactiveObjects.push(curtainBRL);

    const curtainBRR = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.04), curtainMatBR);
    curtainBRR.position.set(6.1, 1.6, 5.72);
    curtainBRR.userData = {
      isInteractive: true,
      deviceId: "curtains_bedroom",
      deviceType: "curtains",
      name: "Bedroom Privacy Curtains",
      room: "bedroom",
      actionHint: "Click to toggle curtains",
    };
    brGroup.add(curtainBRR);
    this.interactiveObjects.push(curtainBRR);

    this.animatedComponents.curtainsBedroom = { left: curtainBRL, right: curtainBRR };

    // ── BEDROOM LIGHTING ──
    const brLight = new THREE.PointLight(0xa855f7, 2.4, 6.5);
    brLight.position.set(4.8, 2.3, 3.2);
    brLight.castShadow = true;
    brGroup.add(brLight);

    const brBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xa855f7 })
    );
    brBulb.position.set(4.8, 2.3, 3.2);
    brBulb.userData = {
      isInteractive: true,
      deviceId: "light_bedroom",
      deviceType: "light",
      name: "Master Bedroom Chandelier",
      room: "bedroom",
      actionHint: "Click to toggle light",
    };
    brGroup.add(brBulb);
    this.interactiveObjects.push(brBulb);

    this.roomLights.bedroom = { light: brLight, bulb: brBulb, headboardLED };
  }

  /* ══════════════════════════════════════════════════════
     4. KITCHEN & DINING (ISLAND, STOOLS, FRIDGE)
  ══════════════════════════════════════════════════════ */
  buildKitchenDining() {
    const kGroup = new THREE.Group();
    this.root.add(kGroup);

    // Kitchen Island with waterfall edge counter
    const island = createBox(2.8, 0.9, 1.2, 0x0f292e, 0.3, 0.5);
    island.position.set(-4.8, 0.72, -3.2);
    kGroup.add(island);

    // Countertop (Glossy quartz)
    const countertop = createBox(2.9, 0.08, 1.3, 0x134e4a, 0.15, 0.7);
    countertop.position.set(-4.8, 1.18, -3.2);
    kGroup.add(countertop);

    // Induction cooktop burners
    [-0.7, -0.2].forEach(xOff => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.16, 24),
        new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(-4.8 + xOff, 1.23, -3.2);
      kGroup.add(ring);
    });

    // Chrome faucet
    const faucet = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.025, 8, 16, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 })
    );
    faucet.rotation.z = Math.PI / 2;
    faucet.position.set(-4.2, 1.38, -3.2);
    kGroup.add(faucet);

    // Bar Stools
    [-0.8, 0, 0.8].forEach(xOff => {
      const seat = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.24, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x042f2e, roughness: 0.6, metalness: 0.3 })
      );
      seat.position.set(-4.8 + xOff, 0.68, -2.1);
      kGroup.add(seat);

      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.68, 8),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 })
      );
      leg.position.set(-4.8 + xOff, 0.34, -2.1);
      kGroup.add(leg);
    });

    // Smart Refrigerator with vertical door touch screen
    const fridge = createBox(1.2, 2.1, 0.9, 0x111827, 0.25, 0.7);
    fridge.position.set(-7.0, 1.32, -4.8);
    fridge.userData = {
      isInteractive: true,
      deviceId: "fridge",
      deviceType: "fridge",
      name: "Smart Hub Refrigerator",
      room: "kitchen",
      actionHint: "Click to check temperature & inventory",
    };
    kGroup.add(fridge);
    this.interactiveObjects.push(fridge);

    const fridgeScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 0.7),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    fridgeScreen.rotation.y = Math.PI / 2;
    fridgeScreen.position.set(-6.54, 1.45, -4.8);
    kGroup.add(fridgeScreen);

    // Overhead Pendant Bar
    const bar = createBox(2.2, 0.04, 0.04, 0x1e293b, 0.3, 0.8);
    bar.position.set(-4.8, 2.35, -3.2);
    kGroup.add(bar);

    // ── KITCHEN LIGHTING ──
    const kLight = new THREE.PointLight(0x10b981, 2.4, 6.0);
    kLight.position.set(-4.8, 2.2, -3.2);
    kLight.castShadow = true;
    kGroup.add(kLight);

    const kBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    kBulb.position.set(-4.8, 2.2, -3.2);
    kBulb.userData = {
      isInteractive: true,
      deviceId: "light_kitchen",
      deviceType: "light",
      name: "Kitchen Pendant Lights",
      room: "kitchen",
      actionHint: "Click to toggle light",
    };
    kGroup.add(kBulb);
    this.interactiveObjects.push(kBulb);

    this.roomLights.kitchen = { light: kLight, bulb: kBulb };
  }

  /* ══════════════════════════════════════════════════════
     5. MODERN BATHROOM (SHOWER, VANITY, SMART MIRROR)
  ══════════════════════════════════════════════════════ */
  buildBathroom() {
    const bGroup = new THREE.Group();
    this.root.add(bGroup);

    // Glass Shower Stall
    const showerGlass = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 2.0, 0.05),
      new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        metalness: 0.8,
      })
    );
    showerGlass.position.set(4.5, 1.27, -4.8);
    bGroup.add(showerGlass);

    // Rainfall showerhead
    const showerHead = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.03, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 })
    );
    showerHead.position.set(4.5, 2.2, -5.2);
    bGroup.add(showerHead);

    // Floating Vanity & Sink
    const vanity = createBox(1.6, 0.45, 0.7, 0x082f49, 0.4, 0.4);
    vanity.position.set(2.9, 0.65, -3.2);
    bGroup.add(vanity);

    const sinkBowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.2, 0.14, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.1 })
    );
    sinkBowl.position.set(2.9, 0.95, -3.2);
    bGroup.add(sinkBowl);

    // Smart Mirror with backlit LED glow ring
    const mirror = new THREE.Mesh(
      new THREE.CircleGeometry(0.48, 32),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.05, metalness: 0.9 })
    );
    mirror.position.set(2.9, 1.6, -2.6);
    bGroup.add(mirror);

    const mirrorHalo = new THREE.Mesh(
      new THREE.RingGeometry(0.48, 0.52, 32),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide })
    );
    mirrorHalo.position.set(2.9, 1.6, -2.59);
    bGroup.add(mirrorHalo);

    // ── BATHROOM LIGHTING ──
    const bLight = new THREE.PointLight(0x06b6d4, 2.2, 5.5);
    bLight.position.set(3.7, 2.3, -3.2);
    bLight.castShadow = true;
    bGroup.add(bLight);

    const bBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
    );
    bBulb.position.set(3.7, 2.3, -3.2);
    bBulb.userData = {
      isInteractive: true,
      deviceId: "light_bathroom",
      deviceType: "light",
      name: "Bathroom LED Cove",
      room: "bathroom",
      actionHint: "Click to toggle light",
    };
    bGroup.add(bBulb);
    this.interactiveObjects.push(bBulb);

    this.roomLights.bathroom = { light: bLight, bulb: bBulb, mirrorHalo };
  }

  /* ══════════════════════════════════════════════════════
     6. GARAGE & EV BAY (ROLL-UP GATE, EV WALLBOX, CAR)
  ══════════════════════════════════════════════════════ */
  buildGarageBay() {
    const gGroup = new THREE.Group();
    this.root.add(gGroup);

    // EV Wallbox Charging Station
    const wallbox = createBox(0.45, 0.7, 0.2, 0x1e293b, 0.3, 0.6);
    wallbox.position.set(8.55, 1.4, -1.2);
    wallbox.rotation.y = -Math.PI / 2;
    wallbox.userData = {
      isInteractive: true,
      deviceId: "ev_charger",
      deviceType: "ev",
      name: "EV Fast Wallbox 22kW",
      room: "garage",
      actionHint: "Click to toggle EV charging",
    };
    gGroup.add(wallbox);
    this.interactiveObjects.push(wallbox);

    // Glowing charging indicator ring
    const chargeRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.02, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    chargeRing.position.set(8.44, 1.48, -1.2);
    chargeRing.rotation.y = -Math.PI / 2;
    gGroup.add(chargeRing);
    this.animatedComponents.evChargingLED = chargeRing;

    // Futuristic Concept EV Vehicle (Stylized polygon body)
    const carBody = createBox(2.0, 0.65, 3.8, 0x0f172a, 0.2, 0.85);
    carBody.position.set(7.1, 0.65, 0.2);
    gGroup.add(carBody);

    const carCabin = createBox(1.7, 0.55, 2.0, 0x00d4ff, 0.1, 0.9);
    carCabin.position.set(7.1, 1.15, 0.1);
    gGroup.add(carCabin);

    // Glowing Headlights & Taillights
    const frontHeadlights = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.08, 0.05),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    frontHeadlights.position.set(7.1, 0.62, 2.12);
    gGroup.add(frontHeadlights);

    const rearTaillights = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.08, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    rearTaillights.position.set(7.1, 0.65, -1.72);
    gGroup.add(rearTaillights);

    // Roll-up Garage Gate (Animated group)
    const gateGroup = new THREE.Group();
    gateGroup.position.set(7.1, 0, 3.0);
    gGroup.add(gateGroup);

    const shutterMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });

    for (let i = 0; i < 7; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.26, 0.05), shutterMat);
      slat.position.set(0, 0.4 + i * 0.28, 0);
      gateGroup.add(slat);
    }

    gateGroup.userData = {
      isInteractive: true,
      deviceId: "garage_door",
      deviceType: "garage",
      name: "Automated Roll-up Shutter",
      room: "garage",
      actionHint: "Click to open / close garage",
    };
    this.interactiveObjects.push(gateGroup);
    this.animatedComponents.garageGateGroup = gateGroup;

    // ── GARAGE LIGHTING ──
    const gLight = new THREE.PointLight(0xf59e0b, 2.2, 6.0);
    gLight.position.set(7.1, 2.4, 0.2);
    gLight.castShadow = true;
    gGroup.add(gLight);

    const gBulb = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.15),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    gBulb.position.set(7.1, 2.4, 0.2);
    gBulb.userData = {
      isInteractive: true,
      deviceId: "light_garage",
      deviceType: "light",
      name: "Garage Linear LEDs",
      room: "garage",
      actionHint: "Click to toggle light",
    };
    gGroup.add(gBulb);
    this.interactiveObjects.push(gBulb);

    this.roomLights.garage = { light: gLight, bulb: gBulb };
  }

  /* ══════════════════════════════════════════════════════
     7. SMART CONTROL ROOM (SERVER RACKS, ROUTER, HOLOGRAM)
  ══════════════════════════════════════════════════════ */
  buildSmartControlRoom() {
    const crGroup = new THREE.Group();
    this.root.add(crGroup);

    // Dual Server Racks
    [-0.9, 0.9].forEach(xOff => {
      const rack = createBox(0.95, 2.1, 0.75, 0x050b14, 0.4, 0.8);
      rack.position.set(xOff, 1.32, -4.8);
      crGroup.add(rack);

      // Blinking status LEDs on server face
      for (let r = 0; r < 5; r++) {
        const led = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.04, 0.02),
          new THREE.MeshBasicMaterial({ color: 0x00d4ff })
        );
        led.position.set(xOff, 0.6 + r * 0.35, -4.42);
        crGroup.add(led);
        this.animatedComponents.serverLeds.push(led);
      }
    });

    // Central Holographic Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.75, 0.35, 24),
      new THREE.MeshStandardMaterial({ color: 0x0c1b33, metalness: 0.9, roughness: 0.2 })
    );
    pedestal.position.set(0, 0.45, -2.8);
    crGroup.add(pedestal);

    const holoRing = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.55, 32),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6 })
    );
    holoRing.rotation.x = -Math.PI / 2;
    holoRing.position.set(0, 0.64, -2.8);
    crGroup.add(holoRing);

    // Floating Rotating Holographic Icosahedron
    const holoMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.32, 1),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.85 })
    );
    holoMesh.position.set(0, 1.2, -2.8);
    holoMesh.userData = {
      isInteractive: true,
      deviceId: "hologram",
      deviceType: "hologram",
      name: "Neural IoT Core",
      room: "controlRoom",
      actionHint: "Central AI Node Online",
    };
    crGroup.add(holoMesh);
    this.interactiveObjects.push(holoMesh);
    this.animatedComponents.holoPedestal = holoMesh;

    // High Power Mesh Router Unit on rack
    const router = createBox(0.4, 0.1, 0.25, 0x1e293b, 0.3, 0.7);
    router.position.set(0, 1.15, -4.8);
    router.userData = {
      isInteractive: true,
      deviceId: "router",
      deviceType: "router",
      name: "Tri-Band WiFi 7 Mesh Gateway",
      room: "controlRoom",
      actionHint: "Status: 10 Gbps / 42 Connected Nodes",
    };
    crGroup.add(router);
    this.interactiveObjects.push(router);

    // WiFi Pulse Waves (Torus rings radiating into air)
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.3 + i * 0.25, 0.012, 8, 36),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.7 - i * 0.2 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, 1.35 + i * 0.18, -4.8);
      ring.userData = { baseOpacity: 0.7 - i * 0.2, phase: i * 1.8 };
      crGroup.add(ring);
      this.animatedComponents.wifiRings.push(ring);
    }

    // ── CONTROL ROOM LIGHTING ──
    const crLight = new THREE.PointLight(0x00d4ff, 2.6, 6.0);
    crLight.position.set(0, 2.3, -3.2);
    crLight.castShadow = true;
    crGroup.add(crLight);

    const crBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff })
    );
    crBulb.position.set(0, 2.3, -3.2);
    crBulb.userData = {
      isInteractive: true,
      deviceId: "light_controlRoom",
      deviceType: "light",
      name: "Server Room Cyan Illumination",
      room: "controlRoom",
      actionHint: "Click to toggle light",
    };
    crGroup.add(crBulb);
    this.interactiveObjects.push(crBulb);

    this.roomLights.controlRoom = { light: crLight, bulb: crBulb };
  }

  /* ══════════════════════════════════════════════════════
     8. FRONT ENTRANCE & SMART DOOR LOCK
  ══════════════════════════════════════════════════════ */
  buildFrontEntrance() {
    const feGroup = new THREE.Group();
    this.root.add(feGroup);

    // Door Frame
    const doorFrame = createBox(1.5, 2.4, 0.18, 0x0a1426, 0.6, 0.4);
    doorFrame.position.set(0, 1.45, 5.8);
    feGroup.add(doorFrame);

    // Door Hinge Group (Pivot for swing animation)
    const doorHinge = new THREE.Group();
    doorHinge.position.set(-0.65, 0.27, 5.8); // Hinge anchor on left side
    feGroup.add(doorHinge);

    // Door Slab
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0x0b172a,
      metalness: 0.8,
      roughness: 0.25,
    });
    const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.2, 0.08), doorMat);
    doorMesh.position.set(0.65, 1.1, 0); // Offset from hinge pivot
    doorMesh.userData = {
      isInteractive: true,
      deviceId: "front_door",
      deviceType: "door",
      name: "Smart Entrance Pivot Door",
      room: "entrance",
      actionHint: "Click to open / close door",
    };
    doorHinge.add(doorMesh);
    this.interactiveObjects.push(doorMesh);

    // Smart Door Lock Keypad & Status Ring
    const lockKeypad = createBox(0.12, 0.28, 0.04, 0x020617, 0.2, 0.9);
    lockKeypad.position.set(1.15, 1.05, 0.05);
    doorHinge.add(lockKeypad);

    const lockLedRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.04, 0.008, 8, 16),
      new THREE.MeshBasicMaterial({ color: 0xef4444 }) // Red = locked initially
    );
    lockLedRing.position.set(1.15, 1.12, 0.075);
    lockLedRing.userData = {
      isInteractive: true,
      deviceId: "door_lock",
      deviceType: "door_lock",
      name: "Biometric Smart Door Lock",
      room: "entrance",
      actionHint: "Click to lock / unlock",
    };
    doorHinge.add(lockLedRing);
    this.interactiveObjects.push(lockLedRing);

    this.animatedComponents.doorHingeGroup = doorHinge;
    this.animatedComponents.smartLockMesh = lockLedRing;
  }

  /* ══════════════════════════════════════════════════════
     9. SECURITY SURVEILLANCE CAMERAS
  ══════════════════════════════════════════════════════ */
  buildSecurityCameras() {
    const camConfigs = [
      { id: "camFront", name: "Perimeter Cam (Front)", pos: [-7.5, 2.3, 5.7], rotY: Math.PI / 4 },
      { id: "camLiving", name: "Living Room CCTV", pos: [-2.2, 2.3, 0.4], rotY: Math.PI * 0.75 },
      { id: "camGarage", name: "Garage CCTV", pos: [8.5, 2.3, 2.8], rotY: -Math.PI / 4 },
    ];

    camConfigs.forEach(cfg => {
      const camGroup = new THREE.Group();
      camGroup.position.set(...cfg.pos);
      camGroup.rotation.y = cfg.rotY;
      this.root.add(camGroup);

      // Mount bracket
      const mount = createBox(0.08, 0.08, 0.15, 0x1e293b, 0.5, 0.5);
      camGroup.add(mount);

      // Rotating head
      const head = new THREE.Group();
      camGroup.add(head);

      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 0.28, 12),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
      );
      body.rotation.x = Math.PI / 2;
      head.add(body);

      // Lens ring
      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.02, 12),
        new THREE.MeshBasicMaterial({ color: 0x00d4ff })
      );
      lens.rotation.x = Math.PI / 2;
      lens.position.z = 0.15;
      head.add(lens);

      // Blinking red recording LED
      const recLed = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      recLed.position.set(0.06, 0.06, 0.14);
      head.add(recLed);

      head.userData = {
        isInteractive: true,
        deviceId: cfg.id,
        deviceType: "camera",
        name: cfg.name,
        room: "security",
        actionHint: "Click to toggle camera feed",
      };
      this.interactiveObjects.push(head);

      this.animatedComponents.surveillanceCams.push({
        id: cfg.id,
        group: head,
        recLed,
        baseRotY: cfg.rotY,
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     UPDATE LOOP (ANIMATIONS & STATE SYNCHRONIZATION)
  ══════════════════════════════════════════════════════ */
  update(state, elapsedTime) {
    const t = elapsedTime;

    // 1. Room Lights
    Object.entries(this.roomLights).forEach(([roomId, comp]) => {
      const roomState = state.lights[roomId];
      if (!roomState) return;

      const targetIntensity = roomState.on ? (roomState.brightness / 100) * 2.8 : 0;
      comp.light.intensity += (targetIntensity - comp.light.intensity) * 0.1;
      comp.light.color.setHex(roomState.on ? roomState.color : 0x111827);

      if (comp.bulb) {
        comp.bulb.material.color.setHex(roomState.on ? roomState.color : 0x1e293b);
      }
      if (comp.headboardLED) {
        comp.headboardLED.material.color.setHex(roomState.on ? roomState.color : 0x050510);
      }
      if (comp.mirrorHalo) {
        comp.mirrorHalo.material.color.setHex(roomState.on ? roomState.color : 0x041018);
      }
    });

    // 2. Smart TV Screen Canvas Animation
    if (this.animatedComponents.tvCtx && this.animatedComponents.tvTexture) {
      const ctx = this.animatedComponents.tvCtx;
      const w = 512, h = 288;

      if (!state.tv.power) {
        // TV is OFF - Sleek reflective dark screen with standby red LED
        ctx.fillStyle = "#030712";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(w / 2, h - 16, 4, 0, Math.PI * 2);
        ctx.fill();
        if (this.animatedComponents.tvBackLight) {
          this.animatedComponents.tvBackLight.intensity += (0 - this.animatedComponents.tvBackLight.intensity) * 0.1;
        }
      } else {
        // TV is ON - Render channel visuals
        ctx.fillStyle = "#040b17";
        ctx.fillRect(0, 0, w, h);

        const channel = state.tv.channel || "cyber";

        if (channel === "cyber") {
          // Cyberpunk visualizer & HUD
          ctx.fillStyle = "#00d4ff";
          ctx.font = "bold 22px 'Courier New', monospace";
          ctx.fillText("CYBER STREAM 4K // ONLINE", 30, 48);

          // Audio visualizer bars
          const bars = 24;
          for (let i = 0; i < bars; i++) {
            const barH = 30 + Math.sin(t * 8 + i * 0.6) * 50 + Math.cos(t * 4 + i) * 30;
            const grad = ctx.createLinearGradient(0, h - 60 - barH, 0, h - 60);
            grad.addColorStop(0, "#00d4ff");
            grad.addColorStop(1, "#a855f7");
            ctx.fillStyle = grad;
            ctx.fillRect(30 + i * 19, h - 60 - barH, 14, barH);
          }
        } else if (channel === "matrix") {
          // Matrix code rain
          ctx.fillStyle = "#10b981";
          ctx.font = "bold 16px 'Courier New', monospace";
          ctx.fillText("NEURAL NETWORK MATRIX v3.8", 30, 40);
          for (let i = 0; i < 18; i++) {
            const y = ((t * 80 + i * 45) % (h - 60)) + 60;
            ctx.fillStyle = i % 2 === 0 ? "#34d399" : "#059669";
            ctx.fillText(`0x${((i * 492) % 255).toString(16).padStart(2, "0")} BIT_RUN`, 30 + i * 26, y);
          }
        } else if (channel === "ambient") {
          // Ambient chill purple cityscape
          const grad = ctx.createLinearGradient(0, 0, 0, h);
          grad.addColorStop(0, "#2e1065");
          grad.addColorStop(0.6, "#7c3aed");
          grad.addColorStop(1, "#030712");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = "#fef08a";
          ctx.beginPath();
          ctx.arc(380, 90, 40, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Security Quad View
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.strokeRect(20, 20, w - 40, h - 40);
          ctx.beginPath();
          ctx.moveTo(w / 2, 20); ctx.lineTo(w / 2, h - 20);
          ctx.moveTo(20, h / 2); ctx.lineTo(w - 20, h / 2);
          ctx.stroke();
          ctx.fillStyle = "#38bdf8";
          ctx.font = "14px monospace";
          ctx.fillText("CAM 01: FRONT", 30, 45);
          ctx.fillText("CAM 02: LIVING", w / 2 + 10, 45);
          ctx.fillText("CAM 03: GARAGE", 30, h / 2 + 25);
          ctx.fillText("CAM 04: CORE", w / 2 + 10, h / 2 + 25);
        }

        // Live HUD timestamp
        ctx.fillStyle = "#ffffff";
        ctx.font = "12px monospace";
        ctx.fillText(`LIVE 60FPS • VOL ${state.tv.volume}%`, 30, h - 24);

        if (this.animatedComponents.tvBackLight) {
          this.animatedComponents.tvBackLight.intensity += (1.8 + Math.sin(t * 3) * 0.4 - this.animatedComponents.tvBackLight.intensity) * 0.1;
        }
      }
      this.animatedComponents.tvTexture.needsUpdate = true;
    }

    // 3. Smart Door Swing Animation
    if (this.animatedComponents.doorHingeGroup) {
      const targetAngle = state.door.open ? -Math.PI * 0.42 : 0;
      this.animatedComponents.doorHingeGroup.rotation.y += (targetAngle - this.animatedComponents.doorHingeGroup.rotation.y) * 0.08;
    }

    // 4. Smart Lock LED Ring (Green = Unlocked, Red = Locked)
    if (this.animatedComponents.smartLockMesh) {
      const targetColor = state.door.locked ? 0xef4444 : 0x10b981;
      this.animatedComponents.smartLockMesh.material.color.setHex(targetColor);
    }

    // 5. Garage Roll-up Gate (Slide upward when open)
    if (this.animatedComponents.garageGateGroup) {
      const targetY = state.garage.doorOpen ? 2.2 : 0;
      this.animatedComponents.garageGateGroup.position.y += (targetY - this.animatedComponents.garageGateGroup.position.y) * 0.06;
    }

    // 6. EV Wallbox Pulse
    if (this.animatedComponents.evChargingLED) {
      const charging = state.garage.evCharging;
      const pulse = charging ? 0.5 + Math.sin(t * 4) * 0.5 : 0.2;
      this.animatedComponents.evChargingLED.material.color.setHex(charging ? 0x10b981 : 0x475569);
      this.animatedComponents.evChargingLED.scale.setScalar(1 + pulse * 0.15);
    }

    // 7. Curtains Sliding
    if (this.animatedComponents.curtainsLiving.left && this.animatedComponents.curtainsLiving.right) {
      const open = state.curtains.livingRoom === "open";
      const targetLX = open ? -7.0 : -6.1;
      const targetRX = open ? -2.8 : -3.7;
      this.animatedComponents.curtainsLiving.left.position.x += (targetLX - this.animatedComponents.curtainsLiving.left.position.x) * 0.06;
      this.animatedComponents.curtainsLiving.right.position.x += (targetRX - this.animatedComponents.curtainsLiving.right.position.x) * 0.06;
    }

    if (this.animatedComponents.curtainsBedroom.left && this.animatedComponents.curtainsBedroom.right) {
      const open = state.curtains.bedroom === "open";
      const targetLX = open ? 2.7 : 3.7;
      const targetRX = open ? 7.1 : 6.1;
      this.animatedComponents.curtainsBedroom.left.position.x += (targetLX - this.animatedComponents.curtainsBedroom.left.position.x) * 0.06;
      this.animatedComponents.curtainsBedroom.right.position.x += (targetRX - this.animatedComponents.curtainsBedroom.right.position.x) * 0.06;
    }

    // 8. AC Louver & Particles
    if (this.animatedComponents.acLouvers.length > 0) {
      const acOn = state.ac.power;
      const targetRotX = acOn ? 0.35 + Math.sin(t * 2) * 0.15 : 0;
      this.animatedComponents.acLouvers.forEach(l => {
        l.rotation.x += (targetRotX - l.rotation.x) * 0.1;
      });
      if (this.animatedComponents.acLed) {
        this.animatedComponents.acLed.material.color.setHex(acOn ? (state.ac.mode === "heat" ? 0xf97316 : 0x00d4ff) : 0x334155);
      }
    }

    if (this.animatedComponents.acParticles) {
      const acOn = state.ac.power;
      this.animatedComponents.acParticles.visible = acOn;
      if (acOn) {
        const pArr = this.animatedComponents.acParticles.geometry.attributes.position.array;
        for (let i = 0; i < pArr.length / 3; i++) {
          pArr[i * 3] += 0.02; // Blow forward into living room
          pArr[i * 3 + 1] -= 0.005; // Gentle downward drift
          if (pArr[i * 3] > -4.5 || pArr[i * 3 + 1] < 0.6) {
            pArr[i * 3] = -7.2;
            pArr[i * 3 + 1] = 1.8;
          }
        }
        this.animatedComponents.acParticles.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 9. WiFi Rings Pulse
    this.animatedComponents.wifiRings.forEach(ring => {
      const p = Math.sin(t * 3 + ring.userData.phase) * 0.5 + 0.5;
      ring.material.opacity = ring.userData.baseOpacity * p;
      ring.scale.setScalar(1 + p * 0.2);
    });

    // 10. Hologram rotation
    if (this.animatedComponents.holoPedestal) {
      this.animatedComponents.holoPedestal.rotation.y += 0.015;
      this.animatedComponents.holoPedestal.rotation.x = Math.sin(t * 1.5) * 0.2;
    }

    // 11. Security Cameras Sweeping
    this.animatedComponents.surveillanceCams.forEach(cam => {
      const isOnline = state.security[cam.id];
      if (isOnline) {
        cam.group.rotation.y = Math.sin(t * 1.2) * 0.45;
        cam.recLed.material.color.setHex(Math.sin(t * 5) > 0 ? 0xef4444 : 0x330000);
      } else {
        cam.group.rotation.y = 0;
        cam.recLed.material.color.setHex(0x334155);
      }
    });

    // 12. Server LEDs blink
    this.animatedComponents.serverLeds.forEach((led, idx) => {
      led.material.color.setHex(Math.sin(t * 6 + idx * 1.2) > 0 ? 0x00d4ff : 0x002244);
    });
  }

  dispose() {
    this.scene.remove(this.root);
  }
}
