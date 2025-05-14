"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 480, margin: "auto", marginTop: 64 }}>
      <h2>Profile</h2>
      <p><b>Name:</b> {session?.user?.name || "Not provided"}</p>
      <p><b>Email:</b> {session?.user?.email}</p>
      <p>Profile management coming soon...</p>
      <button onClick={() => router.push("/dashboard")}>Back to Dashboard</button>
    </div>
  );
} 