"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../OnboardingStepper";
import { motion } from "framer-motion";

const goalsList = [
  "Career Advancement",
  "Hobby Exploration",
  "Skill Certification",
  "Project Building",
  "Just for Fun",
];

export default function GoalsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  // State persistence for selected goal
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_goal");
    if (saved) setSelected(saved);
  }, []);
  useEffect(() => {
    if (selected) localStorage.setItem("onboarding_goal", selected);
  }, [selected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#18181b",
        color: "#fff"
      }}
    >
      <OnboardingStepper step={2} />
      {/* Placeholder for illustration */}
      <div style={{ fontSize: 48, marginBottom: 8 }}>🎯</div>
      <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>What's your main learning goal?</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        {goalsList.map(goal => (
          <button
            key={goal}
            onClick={() => setSelected(goal)}
            style={{
              padding: "20px 32px",
              borderRadius: 16,
              background: selected === goal ? "#a21caf" : "#27272a",
              color: selected === goal ? "#fff" : "#d1d5db",
              border: selected === goal ? "2px solid #a21caf" : "2px solid #27272a",
              fontSize: 18,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: selected === goal
                ? "0 2px 16px rgba(162,28,175,0.2)"
                : undefined,
              transition: "all 0.2s"
            }}
          >
            {goal}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <button
          style={{
            padding: "12px 32px",
            fontSize: 18,
            borderRadius: 8,
            background: "#444",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            opacity: 1,
            cursor: "pointer"
          }}
          onClick={() => router.push("/onboarding/interests")}
        >
          Back
        </button>
        <button
          disabled={!selected}
          style={{
            padding: "12px 32px",
            fontSize: 18,
            borderRadius: 8,
            background: selected ? "#a21caf" : "#444",
            color: "#fff",
            border: "none",
            opacity: selected ? 1 : 0.5,
            cursor: selected ? "pointer" : "not-allowed",
            fontWeight: 600
          }}
          onClick={() => router.push("/onboarding/complete")}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
} 