import { useState, useRef, useEffect } from "react";
import { SmartHomeProvider, useSmartHome } from "./smart-home/state/SmartHomeContext";
import House3DScene from "./smart-home/scene/House3DScene";
import SmartHomeDashboard from "./smart-home/dashboard/SmartHomeDashboard";
import DeviceInspectionTooltip from "./smart-home/dashboard/DeviceInspectionTooltip";
import WelcomeModal from "./smart-home/dashboard/WelcomeModal";

function SmartHomeAppContent() {
  const { setActiveRoom, isNightMode } = useSmartHome();
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Allow ESC to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleSelectMode = (modeId) => {
    switch (modeId) {
      case "explore":
        setActiveRoom("overview");
        break;
      case "dashboard":
        setActiveRoom("livingRoom");
        break;
      case "security":
        setActiveRoom("overview");
        break;
      case "energy":
        setActiveRoom("controlRoom");
        break;
      default:
        break;
    }
  };

  const containerStyle = isFullscreen
    ? {
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        width: "100vw",
        height: "100vh",
        backgroundColor: isNightMode ? "#060914" : "#dbeafe",
        overflow: "hidden",
      }
    : {
        position: "relative",
        width: "100%",
        aspectRatio: "16/9",
        minHeight: "480px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: isNightMode ? "#060914" : "#dbeafe",
        border: "1px solid rgba(0, 212, 255, 0.25)",
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 24px rgba(0, 212, 255, 0.1)",
      };

  return (
    <div ref={containerRef} style={containerStyle}>
      {/* 3D WebGL Canvas */}
      <House3DScene />

      {/* Floating 3D Device Inspection Tooltip */}
      <DeviceInspectionTooltip />

      {/* Futuristic Glassmorphic HUD Dashboard */}
      <SmartHomeDashboard
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onOpenWelcome={() => setWelcomeOpen(true)}
      />

      {/* Welcome "SMART HOME CONTROL CENTER" Modal */}
      <WelcomeModal
        isOpen={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        onSelectMode={handleSelectMode}
      />
    </div>
  );
}

export default function SmartHome3D() {
  return (
    <SmartHomeProvider>
      <SmartHomeAppContent />
    </SmartHomeProvider>
  );
}
