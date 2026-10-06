import React from "react";
import { Compass, LayoutDashboard, ShieldCheck, Zap, X } from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";

export default function WelcomeModal({ isOpen, onClose, onSelectMode }) {
  const { isNightMode, energyMetrics, securityScore } = useSmartHome();

  if (!isOpen) return null;

  const cards = [
    {
      id: "explore",
      title: "Explore 3D Home",
      desc: "Free 3D navigation, orbit around the modern villa, enter rooms, and click interactive smart devices.",
      icon: Compass,
      color: "#00d4ff",
      badge: "Interactive 3D",
    },
    {
      id: "dashboard",
      title: "Dashboard Controls",
      desc: "Manage multi-room lighting, inverter AC climate, smart OLED TV, and motorized panoramic curtains.",
      icon: LayoutDashboard,
      color: "#a855f7",
      badge: "IoT Central",
    },
    {
      id: "security",
      title: "Security Matrix",
      desc: "Monitor live CCTV surveillance feeds, biometric front door lock, and perimeter motion alerts.",
      icon: ShieldCheck,
      color: "#10b981",
      badge: `${securityScore}% Armed`,
    },
    {
      id: "energy",
      title: "Energy Monitoring",
      desc: "Track real-time power consumption, daily kWh analytics, EV charging, and automated solar savings.",
      icon: Zap,
      color: "#f59e0b",
      badge: `${energyMetrics.totalWatts}W Live`,
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(3, 7, 18, 0.78)",
        backdropFilter: "blur(14px)",
        animation: "welcomeFade 0.25s ease-out",
      }}
    >
      <style>{`
        @keyframes welcomeFade {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "linear-gradient(135deg, rgba(8, 14, 30, 0.95) 0%, rgba(13, 22, 45, 0.95) 100%)",
          border: "1px solid rgba(0, 212, 255, 0.28)",
          borderRadius: "20px",
          boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 212, 255, 0.12)",
          padding: "28px 32px",
          position: "relative",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              borderRadius: 999,
              padding: "4px 14px",
              fontSize: 10,
              fontFamily: "monospace",
              color: "#00d4ff",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00d4ff",
                boxShadow: "0 0 6px #00d4ff",
              }}
            />
            NEXT-GEN WEBGL ARCHITECTURE
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 3.5vw, 28px)",
              fontWeight: 800,
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
              background: "linear-gradient(to right, #ffffff, #a5f3fc, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SMART HOME CONTROL CENTER
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(224, 242, 254, 0.65)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Interactive 3D Villa Visualization & Real-time IoT Automation System built with React, Three.js & Tailwind.
          </p>
        </div>

        {/* 4 Feature Choice Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                onClick={() => {
                  onSelectMode(c.id);
                  onClose();
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${c.color}26`,
                  borderRadius: 14,
                  padding: "16px",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${c.color}10`;
                  e.currentTarget.style.borderColor = `${c.color}66`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${c.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = `${c.color}26`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: `${c.color}18`,
                        border: `1px solid ${c.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: c.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: "monospace",
                        color: c.color,
                        background: `${c.color}15`,
                        padding: "3px 8px",
                        borderRadius: 6,
                        border: `1px solid ${c.color}33`,
                      }}
                    >
                      {c.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px 0", color: "#f8fafc" }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: 11, color: "rgba(203, 213, 225, 0.7)", margin: 0, lineHeight: 1.5 }}>
                    {c.desc}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    color: c.color,
                    marginTop: 14,
                  }}
                >
                  Launch Mode &rarr;
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Quick Start */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 16,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: 11,
            color: "rgba(255, 255, 255, 0.45)",
            fontFamily: "monospace",
          }}
        >
          <span>🖱 Drag to orbit • Scroll to zoom • Click 3D objects</span>
          <button
            onClick={() => {
              onSelectMode("explore");
              onClose();
            }}
            style={{
              background: "linear-gradient(135deg, #00d4ff, #3b82f6)",
              border: "none",
              color: "#fff",
              padding: "8px 18px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0, 212, 255, 0.35)",
            }}
          >
            Start Exploring &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
