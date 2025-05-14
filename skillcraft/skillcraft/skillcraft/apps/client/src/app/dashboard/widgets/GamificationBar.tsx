import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function GamificationBar() {
  // Mock data
  const xp = 1240;
  const xpToNext = 1500;
  const nextBadge = "Skill Streaker";
  const streak = 5;
  const badgeDesc = "Earned for a 5-day learning streak!";
  const progress = xp / xpToNext;

  const [badgeHovered, setBadgeHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(162,28,175,0.18)", background: "#2e1065" }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        background: "#232136",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 4px 32px rgba(162,28,175,0.08)",
        color: "#fff",
        minWidth: 260,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 12,
        transition: "background 0.2s",
        position: "relative"
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Gamification</div>
      {/* XP Progress Bar */}
      <div style={{ width: "100%", marginBottom: 10 }}>
        <div style={{ fontSize: 15, color: "#d1d5db", marginBottom: 2 }}>
          XP Progress: {xp} / {xpToNext}
        </div>
        <div style={{ width: "100%", height: 10, background: "#27272a", borderRadius: 6, position: "relative" }}>
          <motion.div
            style={{
              height: 10,
              borderRadius: 6,
              background: progress >= 1 ? "#22d3ee" : "#a21caf",
              width: `${Math.min(progress, 1) * 100}%`,
              transition: "width 0.4s"
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 1) * 100}%` }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 16, color: "#a21caf", fontWeight: 700 }}>⭐ XP: {xp}</div>
        {/* Badge with tooltip */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <motion.span
            whileHover={{ scale: 1.18 }}
            style={{ fontSize: 20, cursor: "pointer" }}
            onMouseEnter={() => setBadgeHovered(true)}
            onMouseLeave={() => setBadgeHovered(false)}
            tabIndex={0}
            aria-label={nextBadge + " badge"}
          >
            🏅
          </motion.span>
          <span style={{ fontSize: 16, color: "#fbbf24", fontWeight: 700, marginLeft: 6 }}>Next Badge: {nextBadge}</span>
          <AnimatePresence>
            {badgeHovered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: "absolute",
                  top: 32,
                  left: 0,
                  background: "#2e1065",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "8px 16px",
                  fontSize: 15,
                  fontWeight: 500,
                  boxShadow: "0 2px 12px rgba(162,28,175,0.12)",
                  zIndex: 10,
                  whiteSpace: "nowrap"
                }}
                role="tooltip"
              >
                {badgeDesc}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div style={{ fontSize: 16, color: "#a21caf", fontWeight: 700 }}>🔥 Streak: {streak}d</div>
      </div>
    </motion.div>
  );
} 