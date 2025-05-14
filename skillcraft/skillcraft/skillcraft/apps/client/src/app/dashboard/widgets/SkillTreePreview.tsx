import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Add a type for skill status
const skillStatuses = ["unlocked", "current", "next", "locked"] as const;
type SkillStatus = typeof skillStatuses[number];

const skills: { id: number; name: string; status: SkillStatus; x: number; y: number }[] = [
  { id: 1, name: "Intro to Python", status: "unlocked", x: 50, y: 120 },
  { id: 2, name: "Data Analysis", status: "unlocked", x: 150, y: 60 },
  { id: 3, name: "SQL Basics", status: "current", x: 250, y: 120 },
  { id: 4, name: "Data Visualization", status: "next", x: 350, y: 60 },
  { id: 5, name: "Machine Learning", status: "locked", x: 450, y: 120 },
];

const statusColor: Record<SkillStatus, string> = {
  unlocked: "#22d3ee",
  current: "#a21caf",
  next: "#fbbf24",
  locked: "#27272a"
};

export function SkillTreePreview() {
  const [hovered, setHovered] = useState<null | number>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(162,28,175,0.18)" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        background: "#232136",
        borderRadius: 24,
        padding: 32,
        boxShadow: "0 4px 32px rgba(162,28,175,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 320,
        minHeight: 220,
        color: "#fff",
        position: "relative"
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Skill Tree</div>
      <div style={{ color: "#d1d5db", fontSize: 15, marginBottom: 16, textAlign: "center" }}>
        Visualize your learning path and unlock new skills as you progress.
      </div>
      {/* Interactive SVG Skill Tree */}
      <div style={{ width: 500, height: 180, marginBottom: 18, position: "relative" }}>
        <svg width={500} height={180}>
          {/* Edges */}
          <line x1={50} y1={120} x2={150} y2={60} stroke="#52525b" strokeWidth={3} />
          <line x1={150} y1={60} x2={250} y2={120} stroke="#52525b" strokeWidth={3} />
          <line x1={250} y1={120} x2={350} y2={60} stroke="#52525b" strokeWidth={3} />
          <line x1={350} y1={60} x2={450} y2={120} stroke="#52525b" strokeWidth={3} />
          {/* Nodes */}
          {skills.map(skill => (
            <g key={skill.id}>
              <motion.circle
                cx={skill.x}
                cy={skill.y}
                r={hovered === skill.id ? 28 : 22}
                fill={statusColor[skill.status]}
                stroke={hovered === skill.id ? "#fff" : "#18181b"}
                strokeWidth={hovered === skill.id ? 5 : 3}
                whileHover={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                onMouseEnter={() => setHovered(skill.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
                tabIndex={0}
                aria-label={skill.name + " node"}
              />
              {/* Node icon */}
              <text
                x={skill.x}
                y={skill.y + 6}
                textAnchor="middle"
                fontSize={18}
                fontWeight={700}
                fill="#232136"
                pointerEvents="none"
              >
                {skill.status === "unlocked" && "✓"}
                {skill.status === "current" && "★"}
                {skill.status === "next" && "→"}
                {skill.status === "locked" && "?"}
              </text>
              {/* Tooltip */}
              <AnimatePresence>
                {hovered === skill.id && (
                  <motion.foreignObject
                    x={skill.x - 70}
                    y={skill.y - 60}
                    width={140}
                    height={48}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div
                      style={{
                        background: "#2e1065",
                        color: "#fff",
                        borderRadius: 10,
                        padding: "8px 16px",
                        fontSize: 15,
                        fontWeight: 500,
                        boxShadow: "0 2px 12px rgba(162,28,175,0.12)",
                        textAlign: "center"
                      }}
                    >
                      {skill.name}
                      <br />
                      <span style={{ fontSize: 13, color: "#fbbf24" }}>
                        {skill.status === "unlocked" && "Unlocked"}
                        {skill.status === "current" && "In Progress"}
                        {skill.status === "next" && "Next to Unlock"}
                        {skill.status === "locked" && "Locked"}
                      </span>
                    </div>
                  </motion.foreignObject>
                )}
              </AnimatePresence>
            </g>
          ))}
        </svg>
      </div>
      <button
        style={{
          padding: "8px 20px",
          fontSize: 16,
          borderRadius: 8,
          background: "#a21caf",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onClick={() => alert("Skill tree coming soon!")}
      >
        View Full Skill Tree
      </button>
    </motion.div>
  );
} 