"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../OnboardingStepper";
import { motion } from "framer-motion";

const interestsList = [
  "Tech & Coding",
  "Business",
  "Creative Arts",
  "Languages",
  "Lifestyle",
];

export default function InterestsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    setSelected(sel =>
      sel.includes(interest)
        ? sel.filter(i => i !== interest)
        : [...sel, interest]
    );
  };

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
      <OnboardingStepper step={1} />
      {/* Placeholder for illustration */}
      <div style={{ fontSize: 48, marginBottom: 8 }}>💡</div>
      <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16 }}>What are you interested in?</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        {interestsList.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            style={{
              padding: "20px 32px",
              borderRadius: 16,
              background: selected.includes(interest) ? "#a21caf" : "#27272a",
              color: selected.includes(interest) ? "#fff" : "#d1d5db",
              border: selected.includes(interest) ? "2px solid #a21caf" : "2px solid #27272a",
              fontSize: 18,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: selected.includes(interest)
                ? "0 2px 16px rgba(162,28,175,0.2)"
                : undefined,
              transition: "all 0.2s"
            }}
          >
            {interest}
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
          onClick={() => router.push("/onboarding")}
        >
          Back
        </button>
        <button
          disabled={selected.length === 0}
          style={{
            padding: "12px 32px",
            fontSize: 18,
            borderRadius: 8,
            background: selected.length ? "#a21caf" : "#444",
            color: "#fff",
            border: "none",
            opacity: selected.length ? 1 : 0.5,
            cursor: selected.length ? "pointer" : "not-allowed",
            fontWeight: 600
          }}
          onClick={() => router.push("/onboarding/goals")}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
} 