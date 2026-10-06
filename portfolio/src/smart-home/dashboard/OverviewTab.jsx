import React from "react";
import {
  Home,
  Armchair,
  Bed,
  Utensils,
  Bath,
  Car,
  Cpu,
  Lightbulb,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
  Wind,
  Tv,
  Wifi,
} from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";
import { ROOMS } from "../constants";

const ROOM_ICONS = {
  Home,
  Armchair,
  Bed,
  Utensils,
  Bath,
  Car,
  Cpu,
};

export default function OverviewTab() {
  const {
    activeRoom,
    setActiveRoom,
    lights,
    setAllLights,
    ac,
    tv,
    door,
    toggleDoorLock,
    security,
    toggleSecurityArmed,
    isNightMode,
    toggleDayNight,
    energyMetrics,
    securityScore,
  } = useSmartHome();

  const activeLightsCount = Object.values(lights).filter((l) => l.on).length;
  const allLightsOn = activeLightsCount === Object.keys(lights).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Room Quick-Jump Grid */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0, 212, 255, 0.7)", letterSpacing: "0.1em" }}>
            3D ROOM FLY-TO NAVIGATION
          </span>
          <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace" }}>
            SELECT TO FOCUS
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 8,
          }}
        >
          {Object.values(ROOMS).map((room) => {
            const Icon = ROOM_ICONS[room.icon] || Home;
            const isSelected = activeRoom === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "9px 12px",
                  borderRadius: 10,
                  background: isSelected ? "rgba(0, 212, 255, 0.18)" : "rgba(255, 255, 255, 0.03)",
                  border: isSelected ? "1px solid #00d4ff" : "1px solid rgba(255, 255, 255, 0.07)",
                  color: isSelected ? "#00d4ff" : "rgba(255, 255, 255, 0.7)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: isSelected ? "0 0 16px rgba(0, 212, 255, 0.25)" : "none",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                  }
                }}
              >
                <Icon size={16} color={isSelected ? "#00d4ff" : room.color} />
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {room.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Action Tiles */}
      <div>
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0, 212, 255, 0.7)", letterSpacing: "0.1em", marginBottom: 8 }}>
          MASTER SYSTEM AUTOMATIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
          {/* Master Lights */}
          <button
            onClick={() => setAllLights(!allLightsOn)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "12px",
              borderRadius: 12,
              background: allLightsOn ? "rgba(0, 212, 255, 0.12)" : "rgba(255, 255, 255, 0.03)",
              border: `1px solid ${allLightsOn ? "#00d4ff66" : "rgba(255, 255, 255, 0.08)"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Lightbulb size={18} color={allLightsOn ? "#00d4ff" : "#94a3b8"} />
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: allLightsOn ? "#00d4ff22" : "rgba(255, 255, 255, 0.06)",
                  color: allLightsOn ? "#00d4ff" : "#94a3b8",
                }}
              >
                {activeLightsCount}/6
              </span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>All Lighting</div>
              <div style={{ fontSize: 10, color: allLightsOn ? "#00d4ff" : "#94a3b8", fontFamily: "monospace" }}>
                {allLightsOn ? "ALL ACTIVE" : "TOGGLE ALL"}
              </div>
            </div>
          </button>

          {/* Front Door Smart Lock */}
          <button
            onClick={toggleDoorLock}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "12px",
              borderRadius: 12,
              background: door.locked ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
              border: `1px solid ${door.locked ? "#ef444466" : "#10b98166"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {door.locked ? <Lock size={18} color="#ef4444" /> : <Unlock size={18} color="#10b981" />}
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: door.locked ? "#ef444422" : "#10b98122",
                  color: door.locked ? "#ef4444" : "#10b981",
                }}
              >
                {door.locked ? "LOCKED" : "OPEN"}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Front Entrance</div>
              <div style={{ fontSize: 10, color: door.locked ? "#fca5a5" : "#86efac", fontFamily: "monospace" }}>
                {door.locked ? "BIOMETRIC LOCKED" : "UNLOCKED"}
              </div>
            </div>
          </button>

          {/* Security System */}
          <button
            onClick={toggleSecurityArmed}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "12px",
              borderRadius: 12,
              background: security.systemArmed ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: `1px solid ${security.systemArmed ? "#10b98166" : "#f59e0b66"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {security.systemArmed ? <ShieldCheck size={18} color="#10b981" /> : <ShieldAlert size={18} color="#f59e0b" />}
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: security.systemArmed ? "#10b98122" : "#f59e0b22",
                  color: security.systemArmed ? "#10b981" : "#f59e0b",
                }}
              >
                {securityScore}%
              </span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Perimeter Guard</div>
              <div style={{ fontSize: 10, color: security.systemArmed ? "#86efac" : "#fde68a", fontFamily: "monospace" }}>
                {security.systemArmed ? "ARMED & ACTIVE" : "STANDBY"}
              </div>
            </div>
          </button>

          {/* Day / Night Mode */}
          <button
            onClick={toggleDayNight}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "12px",
              borderRadius: 12,
              background: isNightMode ? "rgba(168, 85, 247, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: `1px solid ${isNightMode ? "#a855f766" : "#f59e0b66"}`,
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {isNightMode ? <Moon size={18} color="#a855f7" /> : <Sun size={18} color="#f59e0b" />}
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: isNightMode ? "#a855f722" : "#f59e0b22",
                  color: isNightMode ? "#c084fc" : "#fbbf24",
                }}
              >
                {isNightMode ? "NIGHT" : "DAY"}
              </span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Environment</div>
              <div style={{ fontSize: 10, color: isNightMode ? "#d8b4fe" : "#fde68a", fontFamily: "monospace" }}>
                {isNightMode ? "NIGHT GLOW MODE" : "SOLAR DAY MODE"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Environmental & IoT Health Status */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: 14,
          padding: "14px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", marginBottom: 2 }}>
            REAL-TIME POWER
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#00d4ff", fontFamily: "monospace" }}>
            {energyMetrics.totalWatts} W
          </div>
          <div style={{ fontSize: 9, color: "#38bdf8", opacity: 0.7 }}>{energyMetrics.dailyKWh} kWh today</div>
        </div>

        <div>
          <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", marginBottom: 2 }}>
            INDOOR CLIMATE
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#10b981", fontFamily: "monospace" }}>
            {ac.roomTemp}°C
          </div>
          <div style={{ fontSize: 9, color: "#6ee7b7", opacity: 0.7 }}>Target: {ac.temp}°C</div>
        </div>

        <div>
          <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", marginBottom: 2 }}>
            MESH NETWORK
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#a855f7", fontFamily: "monospace" }}>
            10 Gbps
          </div>
          <div style={{ fontSize: 9, color: "#c084fc", opacity: 0.7 }}>WiFi 7 / Zigbee 3.0</div>
        </div>

        <div>
          <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", marginBottom: 2 }}>
            ACTIVE NODES
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace" }}>
            42 / 42
          </div>
          <div style={{ fontSize: 9, color: "#fbbf24", opacity: 0.7 }}>Latency: 1.2ms</div>
        </div>
      </div>
    </div>
  );
}
