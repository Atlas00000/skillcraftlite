import React from "react";

const steps = ["Welcome", "Interests", "Goals", "Complete"];

export function OnboardingStepper({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: i <= step ? "#a21caf" : "#27272a",
              color: i <= step ? "#fff" : "#d1d5db",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
              border: i === step ? "2px solid #fff" : undefined,
              transition: "all 0.2s"
            }}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 32, height: 2, background: i < step ? "#a21caf" : "#27272a" }} />
          )}
        </React.Fragment>
      ))}
      <span style={{ marginLeft: 16, color: "#a21caf", fontWeight: 600 }}>
        Step {step + 1} of {steps.length}
      </span>
    </div>
  );
} 