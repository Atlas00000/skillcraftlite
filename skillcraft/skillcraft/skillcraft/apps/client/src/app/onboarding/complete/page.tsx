"use client";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../OnboardingStepper";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function OnboardingCompletePage() {
  const router = useRouter();

  // Clear onboarding state on completion
  useEffect(() => {
    localStorage.removeItem("onboarding_goal");
    // Add more keys if you persist interests, etc.
  }, []);

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
        background: "linear-gradient(135deg, #2e1065 60%, #18181b 100%)",
        color: "#fff"
      }}
    >
      <OnboardingStepper step={3} />
      {/* Placeholder for illustration */}
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>You're all set!</h2>
      <p style={{ fontSize: 20, maxWidth: 400, textAlign: "center", marginBottom: 32 }}>
        Your personalized learning journey starts now.<br />
        Head to your dashboard to begin mastering new skills!
      </p>
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
          onClick={() => router.push("/onboarding/goals")}
        >
          Back
        </button>
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
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </motion.div>
  );
} 