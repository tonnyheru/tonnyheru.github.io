import React, { useState } from "react";
import {
  LayoutDashboard,
  Lightbulb,
  Snowflake,
  Tv,
  ShieldCheck,
  Zap,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useSmartHome } from "../state/SmartHomeContext";
import OverviewTab from "./OverviewTab";
import LightingTab from "./LightingTab";
import ClimateTab from "./ClimateTab";
import EntertainmentTab from "./EntertainmentTab";
import SecurityTab from "./SecurityTab";
import EnergyTab from "./EnergyTab";

export default function SmartHomeDashboard({
  isFullscreen,
  onToggleFullscreen,
  onOpenWelcome,
}) {
  const {
    isNightMode,
    toggleDayNight,
    soundEnabled,
    toggleSound,
    energyMetrics,
    ac,
    securityScore,
    activeRoom,
  } = useSmartHome();

  const [activeTab, setActiveTab] = useState("overview");
  const [isMinimized, setIsMinimized] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "lights", label: "Lighting", icon: Lightbulb },
    { id: "climate", label: "Climate", icon: Snowflake },
    { id: "entertainment", label: "Media & TV", icon: Tv },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "energy", label: "Energy Monitor", icon: Zap },
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── TOP HUD HEADER BAR ── */}
      <header
        style={{
          pointerEvents: "auto",
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          background: "linear-gradient(to bottom, rgba(4, 8, 20, 0.95) 0%, rgba(4, 8, 20, 0.7) 70%, transparent 100%)",
        }}
      >
        {/* Left: System Status Ticker */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0, 212, 255, 0.1)",
              border: "1px solid rgba(0, 212, 255, 0.3)",
              padding: "5px 12px",
              borderRadius: 8,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#00d4ff",
                boxShadow: "0 0 8px #00d4ff",
              }}
            />
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#00d4ff", fontWeight: 700, letterSpacing: "0.08em" }}>
              SMART HOME OS // 6 ROOMS ONLINE
            </span>
          </div>

          {/* Quick HUD Metrics */}
          <div style={{ display: "flex", gap: 8 }} className="hidden sm:flex">
            <div
              style={{
                background: "rgba(4, 8, 20, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontFamily: "monospace",
                color: "#38bdf8",
              }}
            >
              <Zap size={12} color="#00d4ff" />
              <span>{energyMetrics.totalWatts} W</span>
            </div>

            <div
              style={{
                background: "rgba(4, 8, 20, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontFamily: "monospace",
                color: "#10b981",
              }}
            >
              <Snowflake size={12} color="#10b981" />
              <span>{ac.roomTemp}°C</span>
            </div>

            <div
              style={{
                background: "rgba(4, 8, 20, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 8,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontFamily: "monospace",
                color: "#a855f7",
              }}
            >
              <ShieldCheck size={12} color="#a855f7" />
              <span>DEFENSE {securityScore}%</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Day / Night Button */}
          <button
            onClick={toggleDayNight}
            title={isNightMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              background: isNightMode ? "rgba(168, 85, 247, 0.18)" : "rgba(245, 158, 11, 0.18)",
              border: `1px solid ${isNightMode ? "#a855f766" : "#f59e0b66"}`,
              color: isNightMode ? "#c084fc" : "#fbbf24",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            {isNightMode ? <Moon size={14} /> : <Sun size={14} />}
            <span>{isNightMode ? "NIGHT" : "DAY"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Cyber FX" : "Unmute Cyber FX"}
            style={{
              padding: "7px 10px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: soundEnabled ? "#00d4ff" : "rgba(255, 255, 255, 0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Guide / Info modal */}
          <button
            onClick={onOpenWelcome}
            title="System Guide & Overview"
            style={{
              padding: "7px 10px",
              borderRadius: 8,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HelpCircle size={15} />
          </button>

          {/* Fullscreen Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen 3D Villa"}
              style={{
                padding: "7px 10px",
                borderRadius: 8,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "rgba(255, 255, 255, 0.7)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
          )}

          {/* Dashboard Collapse / Expand Button */}
          <button
            onClick={() => setIsMinimized((prev) => !prev)}
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              background: "rgba(0, 212, 255, 0.15)",
              border: "1px solid rgba(0, 212, 255, 0.4)",
              color: "#00d4ff",
              fontSize: 11,
              fontFamily: "monospace",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 0 12px rgba(0, 212, 255, 0.2)",
            }}
          >
            {isMinimized ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            <span>{isMinimized ? "EXPAND HUD" : "COLLAPSE HUD"}</span>
          </button>
        </div>
      </header>

      {/* ── BOTTOM HUD FLOATING DASHBOARD ── */}
      <footer
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxHeight: isMinimized ? "50px" : "420px",
          background: "linear-gradient(to top, rgba(4, 8, 20, 0.98) 0%, rgba(6, 12, 28, 0.92) 80%, rgba(6, 12, 28, 0.6) 100%)",
          backdropFilter: "blur(18px)",
          borderTop: "1px solid rgba(0, 212, 255, 0.25)",
          boxShadow: "0 -12px 40px rgba(0, 0, 0, 0.6), 0 -1px 20px rgba(0, 212, 255, 0.12)",
          transition: "max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Navigation Tabs Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 16px",
            borderBottom: isMinimized ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
            overflowX: "auto",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isMinimized) setIsMinimized(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: isSelected ? "1px solid rgba(0, 212, 255, 0.4)" : "1px solid transparent",
                  background: isSelected ? "rgba(0, 212, 255, 0.15)" : "transparent",
                  color: isSelected ? "#00d4ff" : "rgba(255, 255, 255, 0.5)",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Active Tab Content */}
        {!isMinimized && (
          <div
            style={{
              padding: "16px 20px 24px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "lights" && <LightingTab />}
            {activeTab === "climate" && <ClimateTab />}
            {activeTab === "entertainment" && <EntertainmentTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "energy" && <EnergyTab />}
          </div>
        )}
      </footer>
    </div>
  );
}
