import { motion } from "framer-motion";

export function QuickLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(162,28,175,0.18)" }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{
        background: "#232136",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 4px 32px rgba(162,28,175,0.08)",
        color: "#fff",
        minWidth: 220,
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Quick Links</div>
      <motion.button
        whileHover={{ scale: 1.05, background: "#c026d3" }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          background: "#a21caf",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 4,
          transition: "background 0.2s"
        }}
        onClick={() => alert("Resume course coming soon!")}
      >
        ▶️ Resume Course
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, background: "#18181b" }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          background: "#27272a",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 4,
          transition: "background 0.2s"
        }}
        onClick={() => alert("Join community coming soon!")}
      >
        💬 Join Community
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, background: "#18181b" }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          background: "#27272a",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onClick={() => alert("Start challenge coming soon!")}
      >
        🏆 Start Challenge
      </motion.button>
    </motion.div>
  );
} 