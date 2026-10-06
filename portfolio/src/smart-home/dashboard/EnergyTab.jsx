import React, { useState } from "react";
import { Zap, DollarSign, TrendingUp, Sun, BatteryCharging, Server, Tv, Lightbulb, Wind } from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";

export default function EnergyTab() {
  const { energyMetrics } = useSmartHome();
  const [hoveredHour, setHoveredHour] = useState(null);

  // Generate 24-hour wattage simulation curve
  // Baseline fluctuates + morning bump + evening peak
  const hours = Array.from({ length: 24 }, (_, i) => {
    let factor = 0.5; // night baseline
    if (i >= 6 && i <= 8) factor = 0.85; // morning wake up
    if (i >= 9 && i <= 16) factor = 0.65; // midday solar
    if (i >= 18 && i <= 22) factor = 1.35; // evening peak
    const w = Math.round(energyMetrics.totalWatts * (0.6 + factor * 0.4) + Math.sin(i) * 15);
    return { hour: `${String(i).padStart(2, "0")}:00`, watts: Math.max(40, w) };
  });

  const maxWatt = Math.max(...hours.map((h) => h.watts), 400);

  // SVG dimensions
  const svgW = 600;
  const svgH = 150;
  const points = hours.map((h, i) => {
    const x = (i / (hours.length - 1)) * (svgW - 40) + 20;
    const y = svgH - 25 - (h.watts / maxWatt) * (svgH - 50);
    return { x, y, ...h };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x} ${p.y}`, "");
  const fillD = `${pathD} L ${points[points.length - 1].x} ${svgH - 20} L ${points[0].x} ${svgH - 20} Z`;

  const breakdownItems = [
    { label: "Climate Control (AC)", val: energyMetrics.acPower, icon: Wind, color: "#00d4ff" },
    { label: "Smart Lighting System", val: energyMetrics.lightsPower, icon: Lightbulb, color: "#f59e0b" },
    { label: "Smart OLED TV", val: energyMetrics.tvPower, icon: Tv, color: "#a855f7" },
    { label: "EV Wallbox Station", val: energyMetrics.evPower, icon: BatteryCharging, color: "#10b981" },
    { label: "Central IoT Servers", val: energyMetrics.serverPower, icon: Server, color: "#38bdf8" },
    { label: "Standby Circuits", val: 42, icon: Zap, color: "#64748b" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <div
          style={{
            background: "rgba(0, 212, 255, 0.05)",
            border: "1px solid rgba(0, 212, 255, 0.25)",
            borderRadius: 14,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace" }}>
              CURRENT POWER DRAW
            </span>
            <Zap size={16} color="#00d4ff" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#00d4ff", fontFamily: "monospace" }}>
            {energyMetrics.totalWatts} W
          </div>
          <div style={{ fontSize: 10, color: "#38bdf8", opacity: 0.8, marginTop: 4 }}>
            Live Smart Grid Real-time Load
          </div>
        </div>

        <div
          style={{
            background: "rgba(16, 185, 129, 0.05)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            borderRadius: 14,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace" }}>
              DAILY ACCUMULATED
            </span>
            <TrendingUp size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#10b981", fontFamily: "monospace" }}>
            {energyMetrics.dailyKWh} kWh
          </div>
          <div style={{ fontSize: 10, color: "#6ee7b7", opacity: 0.8, marginTop: 4 }}>
            -18% vs Monthly Baseline
          </div>
        </div>

        <div
          style={{
            background: "rgba(168, 85, 247, 0.05)",
            border: "1px solid rgba(168, 85, 247, 0.25)",
            borderRadius: 14,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.4)", fontFamily: "monospace" }}>
              ESTIMATED MONTHLY
            </span>
            <DollarSign size={16} color="#a855f7" />
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#a855f7", fontFamily: "monospace" }}>
            ${energyMetrics.monthlyCost}
          </div>
          <div style={{ fontSize: 10, color: "#c084fc", opacity: 0.8, marginTop: 4 }}>
            Avg $0.15 / kWh Smart Metering
          </div>
        </div>
      </div>

      {/* Interactive 24-Hour Energy Chart */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          borderRadius: 16,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>
            24-Hour Energy Consumption Curve
          </div>
          <div style={{ fontSize: 10, color: "#00d4ff", fontFamily: "monospace" }}>
            {hoveredHour ? `${hoveredHour.hour} • ${hoveredHour.watts} Watts` : "HOVER CHART POINTS FOR DETAILS"}
          </div>
        </div>

        <div style={{ width: "100%", overflowX: "auto" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal guidelines */}
            {[0.25, 0.5, 0.75].map((p, idx) => (
              <line
                key={idx}
                x1="20"
                y1={svgH - 25 - p * (svgH - 50)}
                x2={svgW - 20}
                y2={svgH - 25 - p * (svgH - 50)}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeDasharray="4 4"
              />
            ))}

            {/* Gradient Fill & Path */}
            <path d={fillD} fill="url(#energyGrad)" />
            <path d={pathD} fill="none" stroke="#00d4ff" strokeWidth="2.5" />

            {/* Data circles */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={hoveredHour?.hour === p.hour ? 5 : 2.5}
                fill={hoveredHour?.hour === p.hour ? "#ffffff" : "#00d4ff"}
                stroke="#060914"
                strokeWidth="1.5"
                style={{ cursor: "pointer", transition: "r 0.15s" }}
                onMouseEnter={() => setHoveredHour(p)}
                onMouseLeave={() => setHoveredHour(null)}
              />
            ))}

            {/* X-axis labels */}
            {[0, 6, 12, 18, 23].map((hrIdx) => {
              const p = points[hrIdx];
              return (
                <text
                  key={hrIdx}
                  x={p.x}
                  y={svgH - 6}
                  fill="rgba(255, 255, 255, 0.4)"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {p.hour}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Device Power Breakdown */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 16,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>
          Live Device Power Allocation
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
          {breakdownItems.map((item) => {
            const Icon = item.icon;
            const pct = Math.min(100, Math.round((item.val / Math.max(1, energyMetrics.totalWatts)) * 100));
            return (
              <div
                key={item.label}
                style={{
                  background: "rgba(0, 0, 0, 0.2)",
                  borderRadius: 10,
                  padding: "10px 12px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon size={14} color={item.color} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#f8fafc" }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 700, color: item.color }}>
                    {item.val} W ({pct}%)
                  </span>
                </div>
                {/* Progress Bar */}
                <div style={{ width: "100%", height: 4, background: "rgba(255, 255, 255, 0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: item.color,
                      borderRadius: 2,
                      transition: "width 0.4s ease-out",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
