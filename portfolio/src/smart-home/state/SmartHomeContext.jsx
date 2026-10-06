import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { INITIAL_STATE, ROOMS } from "../constants";
import { playSound } from "../soundEffects";

const SmartHomeContext = createContext(null);

export function SmartHomeProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);
  const [eventLogs, setEventLogs] = useState([
    { id: 1, time: "11:42", msg: "System online - IoT Mesh Connected", type: "info" },
    { id: 2, time: "11:50", msg: "Smart Door locked & secured", type: "success" },
    { id: 3, time: "12:01", msg: "Living Room AC stabilized at 22°C", type: "info" },
  ]);

  const addLog = useCallback((msg, type = "info") => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setEventLogs(prev => [{ id: Date.now(), time: timeStr, msg, type }, ...prev.slice(0, 19)]);
  }, []);

  // Ambient room temperature simulation towards AC target
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => {
        if (!prev.ac.power) {
          // Drifts toward outdoor ambient temp (28°C day, 24°C night)
          const ambient = prev.isNightMode ? 24.5 : 28.5;
          const diff = ambient - prev.ac.roomTemp;
          if (Math.abs(diff) > 0.05) {
            return {
              ...prev,
              ac: { ...prev.ac, roomTemp: Number((prev.ac.roomTemp + diff * 0.03).toFixed(1)) },
            };
          }
          return prev;
        }

        // Drifts toward target temp
        const target = prev.ac.temp;
        const diff = target - prev.ac.roomTemp;
        if (Math.abs(diff) > 0.05) {
          return {
            ...prev,
            ac: { ...prev.ac, roomTemp: Number((prev.ac.roomTemp + diff * 0.05).toFixed(1)) },
          };
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Sound toggle
  const toggleSound = useCallback(() => {
    setState(prev => {
      const next = !prev.soundEnabled;
      playSound("click", next);
      return { ...prev, soundEnabled: next };
    });
  }, []);

  // Day / Night Mode
  const toggleDayNight = useCallback(() => {
    setState(prev => {
      const nextNight = !prev.isNightMode;
      playSound(nextNight ? "toggleOff" : "toggleOn", prev.soundEnabled);
      addLog(nextNight ? "Night Mode engaged: Interior illumination active" : "Day Mode active: Solar optimization enabled", "info");
      return { ...prev, isNightMode: nextNight };
    });
  }, [addLog]);

  const setDayNight = useCallback((isNight) => {
    setState(prev => {
      playSound(isNight ? "toggleOff" : "toggleOn", prev.soundEnabled);
      return { ...prev, isNightMode: isNight };
    });
  }, []);

  // Camera Room View Selection
  const setActiveRoom = useCallback((roomId) => {
    setState(prev => {
      if (prev.activeRoom !== roomId) {
        playSound("roomChange", prev.soundEnabled);
        const roomName = ROOMS[roomId]?.name || roomId;
        addLog(`Camera navigated to: ${roomName}`, "info");
      }
      return { ...prev, activeRoom: roomId };
    });
  }, [addLog]);

  // Lighting controls
  const toggleLight = useCallback((roomId) => {
    setState(prev => {
      const cur = prev.lights[roomId];
      const nextOn = !cur.on;
      playSound(nextOn ? "toggleOn" : "toggleOff", prev.soundEnabled);
      addLog(`${ROOMS[roomId]?.name || roomId} light turned ${nextOn ? "ON" : "OFF"}`, "info");
      return {
        ...prev,
        lights: {
          ...prev.lights,
          [roomId]: { ...cur, on: nextOn },
        },
      };
    });
  }, [addLog]);

  const setLightBrightness = useCallback((roomId, val) => {
    setState(prev => ({
      ...prev,
      lights: {
        ...prev.lights,
        [roomId]: { ...prev.lights[roomId], brightness: Math.max(0, Math.min(100, val)) },
      },
    }));
  }, []);

  const setLightColor = useCallback((roomId, colorInt, hex) => {
    setState(prev => {
      playSound("click", prev.soundEnabled);
      addLog(`${ROOMS[roomId]?.name || roomId} light color updated to ${hex}`, "info");
      return {
        ...prev,
        lights: {
          ...prev.lights,
          [roomId]: { ...prev.lights[roomId], color: colorInt, hex },
        },
      };
    });
  }, [addLog]);

  const setAllLights = useCallback((on) => {
    setState(prev => {
      playSound(on ? "toggleOn" : "toggleOff", prev.soundEnabled);
      addLog(on ? "All house lights turned ON" : "All house lights turned OFF", "info");
      const updated = {};
      Object.keys(prev.lights).forEach(k => {
        updated[k] = { ...prev.lights[k], on };
      });
      return { ...prev, lights: updated };
    });
  }, [addLog]);

  // AC controls
  const toggleAc = useCallback(() => {
    setState(prev => {
      const next = !prev.ac.power;
      playSound(next ? "toggleOn" : "toggleOff", prev.soundEnabled);
      addLog(`Air Conditioner turned ${next ? "ON" : "OFF"}`, next ? "success" : "info");
      return { ...prev, ac: { ...prev.ac, power: next } };
    });
  }, [addLog]);

  const setAcTemp = useCallback((val) => {
    setState(prev => {
      const clamped = Math.max(16, Math.min(30, val));
      playSound("click", prev.soundEnabled);
      return { ...prev, ac: { ...prev.ac, temp: clamped } };
    });
  }, []);

  const setAcMode = useCallback((mode) => {
    setState(prev => {
      playSound("click", prev.soundEnabled);
      addLog(`AC mode changed to ${mode.toUpperCase()}`, "info");
      return { ...prev, ac: { ...prev.ac, mode } };
    });
  }, [addLog]);

  // TV controls
  const toggleTv = useCallback(() => {
    setState(prev => {
      const next = !prev.tv.power;
      playSound(next ? "toggleOn" : "toggleOff", prev.soundEnabled);
      addLog(`Smart OLED TV turned ${next ? "ON" : "OFF"}`, "info");
      return { ...prev, tv: { ...prev.tv, power: next } };
    });
  }, [addLog]);

  const setTvChannel = useCallback((channelId) => {
    setState(prev => {
      playSound("click", prev.soundEnabled);
      addLog(`TV channel switched to: ${channelId}`, "info");
      return { ...prev, tv: { ...prev.tv, channel: channelId } };
    });
  }, [addLog]);

  const setTvVolume = useCallback((vol) => {
    setState(prev => ({
      ...prev,
      tv: { ...prev.tv, volume: Math.max(0, Math.min(100, vol)) },
    }));
  }, []);

  // Door & Lock controls
  const toggleDoorLock = useCallback(() => {
    setState(prev => {
      const nextLocked = !prev.door.locked;
      playSound(nextLocked ? "lock" : "unlock", prev.soundEnabled);
      addLog(nextLocked ? "Front Door Smart Lock: LOCKED & ARMED" : "Front Door Smart Lock: UNLOCKED", nextLocked ? "success" : "info");
      // If locking, auto-close door if open
      return {
        ...prev,
        door: {
          ...prev.door,
          locked: nextLocked,
          open: nextLocked ? false : prev.door.open,
        },
      };
    });
  }, [addLog]);

  const toggleDoorOpen = useCallback(() => {
    setState(prev => {
      if (prev.door.locked && !prev.door.open) {
        playSound("alert", prev.soundEnabled);
        addLog("Cannot open door: Smart Lock is engaged!", "warning");
        return prev;
      }
      const nextOpen = !prev.door.open;
      playSound("click", prev.soundEnabled);
      addLog(`Front door ${nextOpen ? "opened" : "closed"}`, "info");
      return { ...prev, door: { ...prev.door, open: nextOpen } };
    });
  }, [addLog]);

  // Garage controls
  const toggleGarageDoor = useCallback(() => {
    setState(prev => {
      const nextOpen = !prev.garage.doorOpen;
      playSound("click", prev.soundEnabled);
      addLog(`Garage roll-up gate ${nextOpen ? "opened" : "closed"}`, "info");
      return {
        ...prev,
        garage: { ...prev.garage, doorOpen: nextOpen },
      };
    });
  }, [addLog]);

  const toggleEvCharging = useCallback(() => {
    setState(prev => {
      const next = !prev.garage.evCharging;
      playSound(next ? "toggleOn" : "toggleOff", prev.soundEnabled);
      addLog(`EV Wallbox Charging ${next ? "started" : "paused"}`, "info");
      return {
        ...prev,
        garage: { ...prev.garage, evCharging: next },
      };
    });
  }, [addLog]);

  // Curtains
  const toggleCurtains = useCallback((room = "livingRoom") => {
    setState(prev => {
      const current = prev.curtains[room] || "open";
      const next = current === "open" ? "closed" : "open";
      playSound("click", prev.soundEnabled);
      addLog(`${ROOMS[room]?.name || room} smart curtains ${next.toUpperCase()}`, "info");
      return {
        ...prev,
        curtains: { ...prev.curtains, [room]: next },
      };
    });
  }, [addLog]);

  // Security controls
  const toggleSecurityArmed = useCallback(() => {
    setState(prev => {
      const next = !prev.security.systemArmed;
      playSound(next ? "lock" : "unlock", prev.soundEnabled);
      addLog(next ? "Perimeter Security System ARMED" : "Perimeter Security System STANDBY", next ? "success" : "info");
      return {
        ...prev,
        security: { ...prev.security, systemArmed: next },
      };
    });
  }, [addLog]);

  const toggleCamera = useCallback((camKey) => {
    setState(prev => {
      const next = !prev.security[camKey];
      playSound("click", prev.soundEnabled);
      return {
        ...prev,
        security: { ...prev.security, [camKey]: next },
      };
    });
  }, []);

  // 3D Object interaction hover/select
  const setHoveredDevice = useCallback((device) => {
    setState(prev => (prev.hoveredDevice === device ? prev : { ...prev, hoveredDevice: device }));
  }, []);

  const setSelectedDevice = useCallback((device) => {
    setState(prev => {
      if (device) playSound("click", prev.soundEnabled);
      return { ...prev, selectedDevice: device };
    });
  }, []);

  // Real-time Energy Monitoring Calculations
  const energyMetrics = useMemo(() => {
    let powerW = 42; // Base standby (IoT hub, mesh routers, standby electronics)

    // Lights
    let lightsPower = 0;
    Object.values(state.lights).forEach(l => {
      if (l.on) {
        lightsPower += Math.round((l.brightness / 100) * 16);
      }
    });
    powerW += lightsPower;

    // AC
    let acPower = 0;
    if (state.ac.power) {
      const tempDelta = Math.abs(state.ac.roomTemp - state.ac.temp);
      acPower = Math.round(90 + tempDelta * 140);
      if (state.ac.mode === "fan") acPower = 45;
    }
    powerW += acPower;

    // TV
    let tvPower = state.tv.power ? 85 : 3;
    powerW += tvPower;

    // Garage EV
    let evPower = state.garage.evCharging ? 350 : 0;
    powerW += evPower;

    // Server room
    powerW += 68;

    // Estimated daily kWh and monthly cost (assumes avg $0.15/kWh)
    const dailyKWh = ((powerW * 18) / 1000).toFixed(2);
    const monthlyCost = (Number(dailyKWh) * 30 * 0.15).toFixed(2);

    return {
      totalWatts: powerW,
      lightsPower,
      acPower,
      tvPower,
      evPower,
      serverPower: 68,
      dailyKWh,
      monthlyCost,
    };
  }, [state.lights, state.ac, state.tv.power, state.garage.evCharging]);

  // Overall security score
  const securityScore = useMemo(() => {
    let score = 50;
    if (state.door.locked) score += 20;
    if (state.security.systemArmed) score += 15;
    if (state.security.camFront) score += 5;
    if (state.security.camLiving) score += 5;
    if (state.security.camGarage) score += 5;
    return score;
  }, [state.door.locked, state.security]);

  const value = {
    ...state,
    eventLogs,
    energyMetrics,
    securityScore,
    toggleSound,
    toggleDayNight,
    setDayNight,
    setActiveRoom,
    toggleLight,
    setLightBrightness,
    setLightColor,
    setAllLights,
    toggleAc,
    setAcTemp,
    setAcMode,
    toggleTv,
    setTvChannel,
    setTvVolume,
    toggleDoorLock,
    toggleDoorOpen,
    toggleGarageDoor,
    toggleEvCharging,
    toggleCurtains,
    toggleSecurityArmed,
    toggleCamera,
    setHoveredDevice,
    setSelectedDevice,
    addLog,
  };

  return <SmartHomeContext.Provider value={value}>{children}</SmartHomeContext.Provider>;
}

export function useSmartHome() {
  const ctx = useContext(SmartHomeContext);
  if (!ctx) {
    throw new Error("useSmartHome must be used within a SmartHomeProvider");
  }
  return ctx;
}
