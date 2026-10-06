import React from "react";
import { Snowflake, Wind, Zap, Flame, Power, Droplets, Gauge } from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";

export default function ClimateTab() {
  const { ac, toggleAc, setAcTemp, setAcMode, energyMetrics } = useSmartHome();

  const modes = [
    { id: "cool", label: "Cool", icon: Snowflake, color: "#00d4ff" },
    { id: "fan", label: "Fan", icon: Wind, color: "#10b981" },
    { id: "auto", label: "Auto", icon: Zap, color: "#a855f7" },
    { id: "heat", label: "Heat", icon: Flame, color: "#f97316" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main Climate Hub */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(0, 212, 255, 0.18)",
          borderRadius: 16,
          padding: "20px",
        }}
      >
        {/* Left: Circular Thermostat Dial */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(10, 20, 42, 0.9) 0%, rgba(5, 10, 24, 0.95) 75%)",
              border: `2px solid ${ac.power ? "#00d4ff55" : "rgba(255,255,255,0.1)"}`,
              boxShadow: ac.power ? "0 0 35px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.15)" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            {/* Ambient Mode Icon */}
            <div style={{ fontSize: 10, fontFamily: "monospace", color: ac.power ? "#00d4ff" : "#64748b", marginBottom: 2 }}>
              {ac.power ? `${ac.mode.toUpperCase()} MODE` : "STANDBY"}
            </div>

            {/* Target Temp */}
            <div
              style={{
                fontSize: 42,
                fontWeight: 800,
                fontFamily: "monospace",
                color: ac.power ? "#f8fafc" : "#64748b",
                lineHeight: 1,
              }}
            >
              {ac.temp}°
            </div>

            {/* Current Room Temp */}
            <div style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.5)", fontFamily: "monospace", marginTop: 4 }}>
              ROOM: {ac.roomTemp}°C
            </div>

            {/* Quick Adjust Buttons Overlay */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button
                disabled={!ac.power}
                onClick={() => setAcTemp(ac.temp - 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.15)",
                  border: "1px solid rgba(0, 212, 255, 0.4)",
                  color: "#00d4ff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: ac.power ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: ac.power ? 1 : 0.3,
                }}
              >
                &minus;
              </button>
              <button
                disabled={!ac.power}
                onClick={() => setAcTemp(ac.temp + 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(0, 212, 255, 0.15)",
                  border: "1px solid rgba(0, 212, 255, 0.4)",
                  color: "#00d4ff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: ac.power ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: ac.power ? 1 : 0.3,
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right: Controls & Operating Modes */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14 }}>
          {/* Power Toggle Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>
                Inverter Climate Control
              </div>
              <div style={{ fontSize: 11, color: "rgba(224, 242, 254, 0.65)", fontFamily: "monospace" }}>
                Active in Living Room & Master Bedroom
              </div>
            </div>

            <button
              onClick={toggleAc}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 8,
                background: ac.power ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${ac.power ? "#00d4ff" : "rgba(255, 255, 255, 0.15)"}`,
                color: ac.power ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
                fontSize: 11,
                fontFamily: "monospace",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Power size={14} />
              {ac.power ? "SYSTEM ON" : "STANDBY"}
            </button>
          </div>

          {/* Operating Modes Buttons */}
          <div>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255, 255, 255, 0.4)", marginBottom: 6 }}>
              OPERATING MODES
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {modes.map((m) => {
                const Icon = m.icon;
                const isSelected = ac.mode === m.id;
                return (
                  <button
                    key={m.id}
                    disabled={!ac.power}
                    onClick={() => setAcMode(m.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "10px 4px",
                      borderRadius: 10,
                      background: isSelected && ac.power ? `${m.color}22` : "rgba(255, 255, 255, 0.03)",
                      border: isSelected && ac.power ? `1px solid ${m.color}` : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isSelected && ac.power ? m.color : "rgba(255, 255, 255, 0.5)",
                      cursor: ac.power ? "pointer" : "not-allowed",
                      transition: "all 0.2s",
                      opacity: ac.power ? 1 : 0.4,
                    }}
                  >
                    <Icon size={16} />
                    <span style={{ fontSize: 10, fontFamily: "monospace", fontWeight: 700 }}>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Environmental Sensors */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              background: "rgba(0, 0, 0, 0.2)",
              padding: "10px",
              borderRadius: 10,
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div>
              <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
                <Droplets size={10} /> HUMIDITY
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#38bdf8", fontFamily: "monospace" }}>
                48% RH
              </div>
            </div>

            <div>
              <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
                <Gauge size={10} /> AIR QUALITY
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#10b981", fontFamily: "monospace" }}>
                AQI 22 (Good)
              </div>
            </div>

            <div>
              <div style={{ fontSize: 9, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
                <Zap size={10} /> POWER DRAW
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", fontFamily: "monospace" }}>
                {energyMetrics.acPower} W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
