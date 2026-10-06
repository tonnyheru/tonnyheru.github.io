import React from "react";
import { Tv, Volume2, VolumeX, Radio, Sparkles, Blinds } from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";
import { TV_CHANNELS } from "../constants";

export default function EntertainmentTab() {
  const { tv, toggleTv, setTvChannel, setTvVolume, curtains, toggleCurtains } = useSmartHome();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* TV Media Center */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: tv.power ? "1px solid rgba(0, 212, 255, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxShadow: tv.power ? "0 4px 30px rgba(0, 212, 255, 0.12)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: tv.power ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tv.power ? "#00d4ff" : "#64748b",
              }}
            >
              <Tv size={20} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>
                Living Room Smart OLED TV 65"
              </div>
              <div style={{ fontSize: 10, color: tv.power ? "#00d4ff" : "#64748b", fontFamily: "monospace" }}>
                {tv.power ? "ONLINE • 4K HDR 120HZ" : "STANDBY (3W)"}
              </div>
            </div>
          </div>

          <button
            onClick={toggleTv}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              background: tv.power ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.06)",
              border: `1px solid ${tv.power ? "#00d4ff" : "rgba(255, 255, 255, 0.15)"}`,
              color: tv.power ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {tv.power ? "POWER OFF" : "POWER ON"}
          </button>
        </div>

        {/* Channels */}
        <div>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255, 255, 255, 0.4)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <Radio size={12} /> INTERACTIVE DISPLAY CHANNELS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
            {TV_CHANNELS.map((ch) => {
              const isSelected = tv.channel === ch.id;
              return (
                <button
                  key={ch.id}
                  disabled={!tv.power}
                  onClick={() => setTvChannel(ch.id)}
                  style={{
                    padding: "10px",
                    borderRadius: 10,
                    background: isSelected && tv.power ? `${ch.color}22` : "rgba(255, 255, 255, 0.02)",
                    border: isSelected && tv.power ? `1px solid ${ch.color}` : "1px solid rgba(255, 255, 255, 0.06)",
                    color: isSelected && tv.power ? ch.color : "rgba(255, 255, 255, 0.5)",
                    cursor: tv.power ? "pointer" : "not-allowed",
                    textAlign: "left",
                    transition: "all 0.2s",
                    opacity: tv.power ? 1 : 0.4,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{ch.title}</div>
                  <div style={{ fontSize: 9, opacity: 0.7, fontFamily: "monospace", marginTop: 2 }}>{ch.genre}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Volume Slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            disabled={!tv.power}
            onClick={() => setTvVolume(tv.volume > 0 ? 0 : 50)}
            style={{
              background: "none",
              border: "none",
              color: tv.power ? "#00d4ff" : "#64748b",
              cursor: tv.power ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
            }}
          >
            {tv.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={tv.volume}
            disabled={!tv.power}
            onChange={(e) => setTvVolume(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: "#00d4ff",
              cursor: tv.power ? "pointer" : "not-allowed",
              opacity: tv.power ? 1 : 0.4,
            }}
          />
          <span style={{ fontSize: 11, fontFamily: "monospace", color: tv.power ? "#00d4ff" : "#64748b", minWidth: 32 }}>
            {tv.volume}%
          </span>
        </div>
      </div>

      {/* Motorized Smart Curtains */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          padding: "18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Blinds size={18} color="#a855f7" />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f8fafc" }}>
            Motorized Panoramic Smart Curtains
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {/* Living Room Curtains */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 12,
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Living Room Glass</div>
              <div style={{ fontSize: 10, color: curtains.livingRoom === "open" ? "#38bdf8" : "#94a3b8", fontFamily: "monospace" }}>
                STATUS: {curtains.livingRoom.toUpperCase()}
              </div>
            </div>
            <button
              onClick={() => toggleCurtains("livingRoom")}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                background: curtains.livingRoom === "open" ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.06)",
                border: `1px solid ${curtains.livingRoom === "open" ? "#38bdf8" : "rgba(255, 255, 255, 0.15)"}`,
                color: curtains.livingRoom === "open" ? "#38bdf8" : "rgba(255, 255, 255, 0.6)",
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {curtains.livingRoom === "open" ? "CLOSE" : "OPEN"}
            </button>
          </div>

          {/* Bedroom Curtains */}
          <div
            style={{
              background: "rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: 12,
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>Master Bedroom Glass</div>
              <div style={{ fontSize: 10, color: curtains.bedroom === "open" ? "#c084fc" : "#94a3b8", fontFamily: "monospace" }}>
                STATUS: {curtains.bedroom.toUpperCase()}
              </div>
            </div>
            <button
              onClick={() => toggleCurtains("bedroom")}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                background: curtains.bedroom === "open" ? "rgba(192, 132, 252, 0.2)" : "rgba(255, 255, 255, 0.06)",
                border: `1px solid ${curtains.bedroom === "open" ? "#c084fc" : "rgba(255, 255, 255, 0.15)"}`,
                color: curtains.bedroom === "open" ? "#c084fc" : "rgba(255, 255, 255, 0.6)",
                fontSize: 10,
                fontFamily: "monospace",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {curtains.bedroom === "open" ? "CLOSE" : "OPEN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
