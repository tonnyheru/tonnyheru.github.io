import React from "react";
import { Lightbulb, Sliders, Palette, Zap } from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";
import { ROOMS, LIGHT_COLOR_PRESETS } from "../constants";

export default function LightingTab() {
  const { lights, toggleLight, setLightBrightness, setLightColor, setAllLights, energyMetrics } = useSmartHome();

  const lightEntries = Object.entries(lights);
  const activeCount = lightEntries.filter(([_, l]) => l.on).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header bar with Master All-On/Off & Total Power */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: "rgba(0, 212, 255, 0.05)",
          border: "1px solid rgba(0, 212, 255, 0.15)",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(0, 212, 255, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00d4ff",
            }}
          >
            <Lightbulb size={18} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc" }}>
              Smart Lighting System ({activeCount}/{lightEntries.length} Active)
            </div>
            <div style={{ fontSize: 10, color: "#38bdf8", fontFamily: "monospace" }}>
              Total Draw: {energyMetrics.lightsPower} W • Automated Illumination
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setAllLights(true)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: "rgba(0, 212, 255, 0.15)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              color: "#00d4ff",
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ALL ON
          </button>
          <button
            onClick={() => setAllLights(false)}
            style={{
              padding: "6px 12px",
              borderRadius: 6,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: 10,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ALL OFF
          </button>
        </div>
      </div>

      {/* Grid of Room Light Controllers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {lightEntries.map(([roomId, cfg]) => {
          const room = ROOMS[roomId] || { name: roomId };
          const hex = cfg.hex || "#00d4ff";

          return (
            <div
              key={roomId}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: cfg.on ? `1px solid ${hex}44` : "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 14,
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                transition: "all 0.25s",
                boxShadow: cfg.on ? `0 4px 20px ${hex}15` : "none",
              }}
            >
              {/* Card Header: Room name & Toggle switch */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: cfg.on ? hex : "#334155",
                      boxShadow: cfg.on ? `0 0 10px ${hex}` : "none",
                      transition: "all 0.3s",
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc" }}>{room.name}</div>
                    <div style={{ fontSize: 10, color: cfg.on ? hex : "#64748b", fontFamily: "monospace" }}>
                      {cfg.on ? `ONLINE • ${cfg.brightness}% BRIGHTNESS` : "OFFLINE • STANDBY"}
                    </div>
                  </div>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => toggleLight(roomId)}
                  style={{
                    position: "relative",
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    background: cfg.on ? hex : "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: cfg.on ? 23 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  />
                </button>
              </div>

              {/* Brightness Slider */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "monospace" }}>
                  <span style={{ color: "rgba(255, 255, 255, 0.4)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Sliders size={12} /> BRIGHTNESS
                  </span>
                  <span style={{ color: cfg.on ? hex : "#64748b" }}>{cfg.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={cfg.brightness}
                  disabled={!cfg.on}
                  onChange={(e) => setLightBrightness(roomId, Number(e.target.value))}
                  style={{
                    width: "100%",
                    accentColor: hex,
                    cursor: cfg.on ? "pointer" : "not-allowed",
                    opacity: cfg.on ? 1 : 0.4,
                  }}
                />
              </div>

              {/* Color Preset Palette */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255, 255, 255, 0.4)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Palette size={12} /> COLOR SPECTRUM
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {LIGHT_COLOR_PRESETS.map((p) => {
                    const isSelected = cfg.hex === p.hex;
                    return (
                      <button
                        key={p.name}
                        disabled={!cfg.on}
                        onClick={() => setLightColor(roomId, p.colorInt, p.hex)}
                        title={p.name}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: p.hex,
                          border: isSelected ? "2px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.15)",
                          transform: isSelected ? "scale(1.2)" : "scale(1)",
                          boxShadow: isSelected ? `0 0 8px ${p.hex}` : "none",
                          cursor: cfg.on ? "pointer" : "not-allowed",
                          opacity: cfg.on ? 1 : 0.35,
                          transition: "all 0.2s",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
