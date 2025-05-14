import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function ProgressWheel() {
  // Mock data
  const progress = 100; // percent (set to 100 to demo confetti)
  const streak = 5; // days
  const xpToday = 50;
  const xpGoal = 50;

  const [hovered, setHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Show confetti when progress hits 100%
  // (In real app, trigger only once per day)
  if (progress === 100 && !showConfetti) {
    setTimeout(() => setShowConfetti(true), 800); // delay for animation
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(162,28,175,0.18)" }}
      transition={{ duration: 0.5 }}
      style={{
        background: "#232136",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 4px 32px rgba(162,28,175,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 220,
        minHeight: 220,
        color: "#fff",
        position: "relative"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      aria-label="Daily Progress Wheel"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: -56,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#2e1065",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500,
              boxShadow: "0 2px 12px rgba(162,28,175,0.12)",
              zIndex: 10,
              pointerEvents: "none"
            }}
            role="tooltip"
          >
            {progress === 100 ? (
              <span>🎉 Goal reached! {xpToday}/{xpGoal} XP earned today.</span>
            ) : (
              <span>
                {progress}% of daily goal<br />
                {xpToday}/{xpGoal} XP earned
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <motion.svg
            key="confetti"
            width="120"
            height="60"
            viewBox="0 0 120 60"
            style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <circle cx="20" cy="20" r="4" fill="#a21caf" />
            <circle cx="60" cy="10" r="3" fill="#fbbf24" />
            <circle cx="100" cy="25" r="4" fill="#22d3ee" />
            <circle cx="40" cy="40" r="3" fill="#a21caf" />
            <circle cx="80" cy="35" r="3" fill="#fbbf24" />
            <circle cx="100" cy="50" r="2" fill="#22d3ee" />
          </motion.svg>
        )}
      </AnimatePresence>
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#27272a"
          strokeWidth="12"
          fill="none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke="#a21caf"
          strokeWidth="12"
          fill="none"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - progress / 100) }}
          transition={{ duration: 1 }}
        />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fill="#fff"
          fontSize="24"
          fontWeight="700"
          dy=".3em"
        >
          {progress}%
        </text>
      </motion.svg>
      <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600 }}>Daily Progress</div>
      <div style={{ marginTop: 8, color: "#a21caf", fontWeight: 700, fontSize: 16 }}>
        🔥 {streak} day streak
      </div>
    </motion.div>
  );
} 