import { Card } from "pixel-retroui";
import neryTrackerLogo from "./assets/logo.png";

const ShareCard = ({ player, stats, battlePass, id }) => {
  return (
    <div
      id={id}
      style={{
        width: "1200px",
        height: "630px",
        background: "linear-gradient(135deg, #2a0845 0%, #6441A5 50%, #000000 100%)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "absolute",
        top: "-9999px", // Hide from view but keep in DOM for html2canvas
        left: "-9999px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={neryTrackerLogo}
          alt="Logo"
          style={{ width: "100px", height: "100px", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
        />
        <div>
          <h1 
            className="text-6xl font-bold" 
            style={{ 
              background: "linear-gradient(to right, #FACC15, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 0px #000" 
            }}
          >
            NeryNite Tracker
          </h1>
          <p className="text-2xl opacity-80 mt-2">Estadísticas de Fortnite a lo retro</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-between items-center mt-8">
        {/* Player Name */}
        <div className="flex-1">
          <div 
            className="inline-block p-8 rounded-xl shadow-2xl backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              border: "4px solid #A855F7"
            }}
          >
            <h2 className="text-7xl font-black mb-2 tracking-wider">{player?.name || "Player"}</h2>
            <div className="text-3xl font-mono" style={{ color: "#D8B4FE" }}>ID: {player?.id || "N/A"}</div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-8 flex-1">
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className="text-2xl opacity-70 mb-2">🏆 Victorias</div>
            <div className="text-6xl font-bold" style={{ color: "#FACC15" }}>{stats?.wins || 0}</div>
          </div>
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className="text-2xl opacity-70 mb-2">⚔️ K/D Ratio</div>
            <div className="text-6xl font-bold" style={{ color: "#F87171" }}>{stats?.kd ? stats.kd.toFixed(2) : "0.00"}</div>
          </div>
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className="text-2xl opacity-70 mb-2">📊 Nivel BP</div>
            <div className="text-6xl font-bold" style={{ color: "#60A5FA" }}>{battlePass?.level || 0}</div>
          </div>
          <div 
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className="text-2xl opacity-70 mb-2">💀 Eliminaciones</div>
            <div className="text-6xl font-bold" style={{ color: "#4ADE80" }}>{stats?.kills || 0}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div 
        className="flex justify-between items-end mt-8 pt-6"
        style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
      >
        <div className="flex gap-8 text-2xl opacity-80">
          <span>🎮 Partidas: <strong>{stats?.matches || 0}</strong></span>
          <span>⏱️ Tiempo: <strong>{stats?.minutesPlayed ? Math.floor(stats.minutesPlayed / 60) + "h" : "0h"}</strong></span>
          <span>🔝 Top 10: <strong>{stats?.top10 || 0}</strong></span>
        </div>
        <div className="text-2xl font-mono opacity-60">
          nery-nite-tracker.app
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
