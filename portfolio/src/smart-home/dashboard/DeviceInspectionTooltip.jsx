import React from "react";
import { useSmartHome } from "../state/SmartHomeContext";
import { ROOMS } from "../constants";

export default function DeviceInspectionTooltip() {
  const { hoveredDevice, selectedDevice, setSelectedDevice } = useSmartHome();
  const device = hoveredDevice || selectedDevice;

  if (!device || typeof device.screenX === "undefined") return null;

  const roomInfo = ROOMS[device.room];

  return (
    <div
      style={{
        position: "absolute",
        left: Math.min(window.innerWidth - 220, Math.max(16, device.screenX + 18)),
        top: Math.min(window.innerHeight - 120, Math.max(60, device.screenY - 24)),
        pointerEvents: "none",
        zIndex: 50,
        animation: "tooltipPop 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <style>{`
        @keyframes tooltipPop {
          from { opacity: 0; transform: translateY(6px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div
        style={{
          background: "rgba(6, 11, 24, 0.92)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 212, 255, 0.35)",
          boxShadow: "0 8px 32px rgba(0, 212, 255, 0.2), 0 0 12px rgba(0, 212, 255, 0.15) inset",
          borderRadius: 10,
          padding: "8px 12px",
          minWidth: 160,
          maxWidth: 240,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00d4ff",
              boxShadow: "0 0 6px #00d4ff",
            }}
          />
          <span style={{ fontSize: 9, fontFamily: "monospace", color: "#00d4ff", letterSpacing: "0.08em" }}>
            {roomInfo ? roomInfo.name.toUpperCase() : "SMART NODE"}
          </span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc", fontFamily: "sans-serif" }}>
          {device.name}
        </div>
        <div style={{ fontSize: 10, color: "rgba(224, 242, 254, 0.65)", marginTop: 2, fontFamily: "monospace" }}>
          {device.actionHint || "Click to interact"}
        </div>
      </div>
    </div>
  );
}
