"use client";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "./OnboardingStepper";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();

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
        background: "linear-gradient(135deg, #18181b 60%, #2e1065 100%)",
        color: "#fff"
      }}
    >
      <OnboardingStepper step={0} />
      {/* Placeholder for illustration */}
      <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
      <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>Welcome to SkillCraft</h1>
      <p style={{ fontSize: 20, maxWidth: 400, textAlign: "center", marginBottom: 32 }}>
        Master skills. Unleash potential. Anywhere.<br />
        Let's personalize your learning journey!
      </p>
      <button
        style={{
          padding: "12px 32px",
          fontSize: 18,
          borderRadius: 8,
          background: "#a21caf",
          color: "#fff",
          border: "none",
          boxShadow: "0 2px 16px rgba(162,28,175,0.2)",
          cursor: "pointer",
          fontWeight: 600
        }}
        onClick={() => router.push("/onboarding/interests")}
      >
        Get Started
      </button>
    </motion.div>
  );
} 