/**
 * Smart Home 3D - System Constants & Device Configurations
 */

export const ROOMS = {
  overview: {
    id: "overview",
    name: "Whole Villa",
    nameId: "Seluruh Rumah",
    icon: "Home",
    color: "#00d4ff",
    cameraPos: [14, 12, 14],
    targetPos: [0, 1.2, 0],
    description: "Isometric panoramic view of the entire 3D smart home",
  },
  livingRoom: {
    id: "livingRoom",
    name: "Living Room",
    nameId: "Ruang Tamu",
    icon: "Armchair",
    color: "#00d4ff",
    cameraPos: [-4.2, 4.5, 7.2],
    targetPos: [-3.8, 1.2, 1.8],
    description: "Entertainment hub with smart OLED TV, climate control & motorized curtains",
  },
  bedroom: {
    id: "bedroom",
    name: "Master Bedroom",
    nameId: "Kamar Tidur Utama",
    icon: "Bed",
    color: "#a855f7",
    cameraPos: [4.8, 4.2, 7.0],
    targetPos: [4.0, 1.2, 1.8],
    description: "Relaxation suite with ambient mood lighting, AC & smart privacy curtains",
  },
  kitchen: {
    id: "kitchen",
    name: "Kitchen & Dining",
    nameId: "Dapur & Ruang Makan",
    icon: "Utensils",
    color: "#10b981",
    cameraPos: [-4.5, 4.6, -6.8],
    targetPos: [-3.8, 1.2, -2.5],
    description: "Modern culinary island with smart appliances and task pendant lighting",
  },
  bathroom: {
    id: "bathroom",
    name: "Modern Bathroom",
    nameId: "Kamar Mandi",
    icon: "Bath",
    color: "#06b6d4",
    cameraPos: [4.6, 4.5, -6.8],
    targetPos: [4.0, 1.2, -2.5],
    description: "Wellness bathroom with illuminated smart mirror and rain shower",
  },
  garage: {
    id: "garage",
    name: "Garage & EV Bay",
    nameId: "Garasi & EV Charging",
    icon: "Car",
    color: "#f59e0b",
    cameraPos: [8.8, 5.0, 0],
    targetPos: [7.2, 1.2, 0],
    description: "High-tech garage with roll-up shutter and EV fast charging dock",
  },
  controlRoom: {
    id: "controlRoom",
    name: "Smart Control Room",
    nameId: "Ruang Kontrol IoT",
    icon: "Cpu",
    color: "#38bdf8",
    cameraPos: [0, 4.8, -6.5],
    targetPos: [0, 1.2, -2.5],
    description: "Central IoT server racks, hologram nexus, and mesh network routers",
  },
};

export const LIGHT_COLOR_PRESETS = [
  { name: "Daylight White", hex: "#f8fafc", colorInt: 0xf8fafc, temp: "5500K" },
  { name: "Warm Gold", hex: "#fef08a", colorInt: 0xffe277, temp: "2700K" },
  { name: "Cyber Cyan", hex: "#00d4ff", colorInt: 0x00d4ff, temp: "Cyber" },
  { name: "Neon Violet", hex: "#c084fc", colorInt: 0xa855f7, temp: "Neon" },
  { name: "Emerald Glow", hex: "#34d399", colorInt: 0x10b981, temp: "Green" },
  { name: "Sunset Amber", hex: "#fb923c", colorInt: 0xf97316, temp: "Warm" },
];

export const TV_CHANNELS = [
  { id: "cyber", title: "Cyber Stream 4K", genre: "Tech & Sci-Fi", color: "#00d4ff" },
  { id: "matrix", title: "Neural Code Matrix", genre: "Dev Feed", color: "#10b981" },
  { id: "ambient", title: "Ambient Neo-Tokyo", genre: "Cityscape Chill", color: "#a855f7" },
  { id: "security", title: "CCTV Quad Matrix", genre: "Home Surveillance", color: "#f59e0b" },
];

export const INITIAL_STATE = {
  // Day / Night - Default to bright Day Mode for optimal visibility
  isNightMode: false,

  // Selected camera view
  activeRoom: "overview",

  // Lighting per room
  lights: {
    livingRoom: { on: true, brightness: 85, color: 0x00d4ff, hex: "#00d4ff" },
    bedroom: { on: true, brightness: 70, color: 0xa855f7, hex: "#a855f7" },
    kitchen: { on: true, brightness: 90, color: 0x10b981, hex: "#10b981" },
    bathroom: { on: true, brightness: 80, color: 0x06b6d4, hex: "#06b6d4" },
    garage: { on: true, brightness: 75, color: 0xf59e0b, hex: "#f59e0b" },
    controlRoom: { on: true, brightness: 100, color: 0x00d4ff, hex: "#00d4ff" },
  },

  // Air Conditioner (Living Room & Bedroom)
  ac: {
    power: true,
    temp: 22,
    mode: "cool", // cool, fan, auto, heat
    fanSpeed: "medium", // low, medium, high
    roomTemp: 23.2,
  },

  // Smart TV (Living Room)
  tv: {
    power: true,
    channel: "cyber",
    volume: 65,
  },

  // Smart Door & Lock (Front Entrance)
  door: {
    locked: true,
    open: false,
  },

  // Garage Door & EV Charger
  garage: {
    doorOpen: false,
    evCharging: true,
    evBattery: 78,
  },

  // Security Cameras
  security: {
    systemArmed: true,
    camFront: true,
    camLiving: true,
    camGarage: true,
    alertsCount: 0,
    securityScore: 98,
  },

  // Smart Curtains (Living room & Bedroom)
  curtains: {
    livingRoom: "open", // open, closed
    bedroom: "closed",
  },

  // Audio effects
  soundEnabled: true,

  // Selected / Hovered device in 3D
  selectedDevice: null,
  hoveredDevice: null,
};
