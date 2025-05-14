import { motion } from "framer-motion";

const recommendations = [
  {
    title: "Data Analyst in 6 Months",
    description: "Curated path: Python, SQL, Excel, Tableau, and more.",
    progress: 0.7,
  },
  {
    title: "Creative Storytelling",
    description: "Unlock your creativity with writing, design, and video.",
    progress: 0.3,
  },
  {
    title: "AI for Everyone",
    description: "Learn the basics of AI and how to apply it in your field.",
    progress: 0.0,
  },
];

export function Recommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: "#232136",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 4px 32px rgba(162,28,175,0.08)",
        color: "#fff",
        minWidth: 260,
        minHeight: 220,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Recommended for You</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(162,28,175,0.18)", background: "#2e1065" }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            style={{
              background: "#18181b",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 2px 8px rgba(162,28,175,0.04)",
              borderLeft: `4px solid ${i === 0 ? "#a21caf" : "#27272a"}`,
              transition: "box-shadow 0.2s, background 0.2s",
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 16 }}>{rec.title}</div>
            <div style={{ color: "#d1d5db", fontSize: 14, marginBottom: 8 }}>{rec.description}</div>
            {/* Progress Bar */}
            <div style={{ width: "100%", height: 8, background: "#27272a", borderRadius: 6, marginBottom: 10 }}>
              <motion.div
                style={{
                  height: 8,
                  borderRadius: 6,
                  background: rec.progress === 1 ? "#22d3ee" : "#a21caf",
                  width: `${rec.progress * 100}%`,
                  transition: "width 0.4s"
                }}
                initial={{ width: 0 }}
                animate={{ width: `${rec.progress * 100}%` }}
                transition={{ duration: 0.7, delay: 0.1 * i }}
              />
            </div>
            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.06, background: "#c026d3" }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              style={{
                padding: "7px 18px",
                borderRadius: 8,
                background: rec.progress === 1 ? "#22d3ee" : "#a21caf",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                cursor: rec.progress === 1 ? "default" : "pointer",
                opacity: rec.progress === 1 ? 0.7 : 1,
                marginTop: 2,
                transition: "background 0.2s"
              }}
              disabled={rec.progress === 1}
              onClick={() => alert(rec.progress === 1 ? "Path completed!" : "Starting path...")}
            >
              {rec.progress === 1 ? "Completed" : rec.progress > 0 ? "Continue" : "Start Path"}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 