import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Video,
  VideoOff,
  DoorOpen,
  Car,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";

export default function SecurityTab() {
  const {
    security,
    toggleSecurityArmed,
    toggleCamera,
    door,
    toggleDoorLock,
    toggleDoorOpen,
    garage,
    toggleGarageDoor,
    toggleEvCharging,
    eventLogs,
    securityScore,
  } = useSmartHome();

  const [activeCam, setActiveCam] = useState("camFront");

  const camFeeds = {
    camFront: { name: "Front Perimeter", zone: "Zone 01 - Entrance" },
    camLiving: { name: "Living Room CCTV", zone: "Zone 02 - Interior" },
    camGarage: { name: "Garage & EV Bay", zone: "Zone 03 - Exterior Bay" },
  };

  const isCurrentCamOnline = security[activeCam];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Top Security Overview Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {/* Security Score Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: `1px solid ${security.systemArmed ? "#10b98144" : "#f59e0b44"}`,
            borderRadius: 14,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255, 255, 255, 0.4)", marginBottom: 4 }}>
              DEFENSE READINESS SCORE
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: security.systemArmed ? "#10b981" : "#f59e0b", fontFamily: "monospace" }}>
              {securityScore} / 100
            </div>
            <div style={{ fontSize: 11, color: security.systemArmed ? "#6ee7b7" : "#fde68a" }}>
              {security.systemArmed ? "Active Perimeter Shield Engaged" : "System Standby Mode"}
            </div>
          </div>

          <button
            onClick={toggleSecurityArmed}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: security.systemArmed ? "rgba(16, 185, 129, 0.18)" : "rgba(245, 158, 11, 0.18)",
              border: `1px solid ${security.systemArmed ? "#10b981" : "#f59e0b"}`,
              color: security.systemArmed ? "#10b981" : "#f59e0b",
              fontFamily: "monospace",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {security.systemArmed ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
            {security.systemArmed ? "ARMED" : "DISARMED"}
          </button>
        </div>

        {/* Smart Access Controls */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          {/* Front Lock */}
          <button
            onClick={toggleDoorLock}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "10px",
              borderRadius: 10,
              background: door.locked ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)",
              border: `1px solid ${door.locked ? "#ef444466" : "#10b98166"}`,
              color: door.locked ? "#ef4444" : "#10b981",
              cursor: "pointer",
            }}
          >
            {door.locked ? <Lock size={18} /> : <Unlock size={18} />}
            <span style={{ fontSize: 11, fontWeight: 700 }}>{door.locked ? "DOOR LOCKED" : "DOOR UNLOCKED"}</span>
          </button>

          {/* Front Door Swing */}
          <button
            onClick={toggleDoorOpen}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "10px",
              borderRadius: 10,
              background: door.open ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${door.open ? "#38bdf8" : "rgba(255, 255, 255, 0.1)"}`,
              color: door.open ? "#38bdf8" : "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
            }}
          >
            <DoorOpen size={18} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>{door.open ? "DOOR OPEN" : "DOOR CLOSED"}</span>
          </button>
        </div>
      </div>

      {/* Live CCTV Surveillance Feed Simulator */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(0, 212, 255, 0.25)",
          borderRadius: 16,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Cam Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {Object.entries(camFeeds).map(([camId, info]) => {
              const isSelected = activeCam === camId;
              const isOnline = security[camId];
              return (
                <button
                  key={camId}
                  onClick={() => setActiveCam(camId)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: isSelected ? "rgba(0, 212, 255, 0.18)" : "rgba(255, 255, 255, 0.04)",
                    border: isSelected ? "1px solid #00d4ff" : "1px solid rgba(255, 255, 255, 0.08)",
                    color: isSelected ? "#00d4ff" : "rgba(255, 255, 255, 0.6)",
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: isOnline ? "#10b981" : "#ef4444",
                    }}
                  />
                  {info.name}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => toggleCamera(activeCam)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: isCurrentCamOnline ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
              border: `1px solid ${isCurrentCamOnline ? "#ef4444" : "#10b981"}`,
              color: isCurrentCamOnline ? "#ef4444" : "#10b981",
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {isCurrentCamOnline ? <VideoOff size={14} /> : <Video size={14} />}
            {isCurrentCamOnline ? "DISABLE CAM" : "ENABLE CAM"}
          </button>
        </div>

        {/* Simulated CCTV Screen Viewport */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "21/9",
            borderRadius: 12,
            overflow: "hidden",
            background: isCurrentCamOnline
              ? "radial-gradient(ellipse at center, rgba(14, 25, 48, 0.95) 0%, rgba(4, 8, 18, 0.98) 100%)"
              : "#050811",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isCurrentCamOnline ? (
            <>
              {/* Scanline CRT overlay effect */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)",
                  backgroundSize: "100% 4px",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />

              {/* Viewfinder crosshairs */}
              <div
                style={{
                  position: "absolute",
                  inset: 20,
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              >
                {/* Corner brackets */}
                <div style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, borderTop: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff" }} />
                <div style={{ position: "absolute", top: 0, right: 0, width: 12, height: 12, borderTop: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, width: 12, height: 12, borderBottom: "2px solid #00d4ff", borderLeft: "2px solid #00d4ff" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderBottom: "2px solid #00d4ff", borderRight: "2px solid #00d4ff" }} />
              </div>

              {/* Top HUD text */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 18,
                  right: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 4,
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#00d4ff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#ef4444",
                      boxShadow: "0 0 8px #ef4444",
                      animation: "blink 1s infinite",
                    }}
                  />
                  <span>REC [LIVE] • {camFeeds[activeCam].name.toUpperCase()}</span>
                </div>
                <span>FPS: 60.0 • 1080P IR</span>
              </div>

              {/* Target Motion Tracking Box */}
              <div
                style={{
                  position: "absolute",
                  width: 90,
                  height: 90,
                  border: "1px dashed #10b981",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 4,
                  zIndex: 4,
                }}
              >
                <span style={{ fontSize: 8, color: "#10b981", fontFamily: "monospace" }}>
                  OBJ_TRACK // SECURE
                </span>
              </div>

              {/* Bottom HUD */}
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 18,
                  right: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: 4,
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "rgba(224, 242, 254, 0.7)",
                }}
              >
                <span>{camFeeds[activeCam].zone}</span>
                <span>AI OBJECT CLASSIFICATION: CLEAR</span>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#64748b" }}>
              <VideoOff size={32} />
              <span style={{ fontSize: 12, fontFamily: "monospace" }}>CAMERA FEED OFFLINE</span>
            </div>
          )}
        </div>
      </div>

      {/* Garage Gate & EV Wallbox Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {/* Garage Door */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={18} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc" }}>Garage Roll-up Shutter</div>
              <div style={{ fontSize: 10, color: garage.doorOpen ? "#38bdf8" : "#94a3b8", fontFamily: "monospace" }}>
                STATUS: {garage.doorOpen ? "OPENED" : "CLOSED"}
              </div>
            </div>
          </div>

          <button
            onClick={toggleGarageDoor}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              background: garage.doorOpen ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.06)",
              border: `1px solid ${garage.doorOpen ? "#38bdf8" : "rgba(255, 255, 255, 0.15)"}`,
              color: garage.doorOpen ? "#38bdf8" : "rgba(255, 255, 255, 0.6)",
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {garage.doorOpen ? "CLOSE" : "OPEN"}
          </button>
        </div>

        {/* EV Wallbox */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 14,
            padding: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc" }}>EV Fast Charger (22 kW)</div>
              <div style={{ fontSize: 10, color: garage.evCharging ? "#10b981" : "#94a3b8", fontFamily: "monospace" }}>
                BATTERY: {garage.evBattery}% • {garage.evCharging ? "CHARGING" : "PAUSED"}
              </div>
            </div>
          </div>

          <button
            onClick={toggleEvCharging}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              background: garage.evCharging ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.06)",
              border: `1px solid ${garage.evCharging ? "#10b981" : "rgba(255, 255, 255, 0.15)"}`,
              color: garage.evCharging ? "#10b981" : "rgba(255, 255, 255, 0.6)",
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {garage.evCharging ? "PAUSE" : "CHARGE"}
          </button>
        </div>
      </div>

      {/* Security Event Log Stream */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 14,
          padding: "14px",
        }}
      >
        <div style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(0, 212, 255, 0.7)", letterSpacing: "0.1em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <Activity size={12} /> REAL-TIME SECURITY EVENT LOGS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 120, overflowY: "auto" }}>
          {eventLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontFamily: "monospace",
                color: "rgba(224, 242, 254, 0.7)",
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <span style={{ color: "#00d4ff", opacity: 0.8 }}>[{log.time}]</span>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
