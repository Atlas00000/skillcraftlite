"use client";
import Image from "next/image";
import { ProgressWheel } from "./widgets/ProgressWheel";
import { SkillTreePreview } from "./widgets/SkillTreePreview";
import { Recommendations } from "./widgets/Recommendations";
import { GamificationBar } from "./widgets/GamificationBar";
import { QuickLinks } from "./widgets/QuickLinks";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const user = {
  name: "Alex Johnson",
  avatar: "/bri.svg",
};

// Mock data for new widgets
const activityData = [30, 50, 40, 60, 80, 70, 90]; // XP per day
const achievements = [
  { icon: "🏅", label: "Skill Streaker", desc: "5-day learning streak!" },
  { icon: "🎓", label: "Course Complete", desc: "Completed Python Basics" },
  { icon: "🚀", label: "XP Milestone", desc: "Earned 1000 XP" },
];
const communityFeed = [
  { user: "Priya S.", action: "completed Data Analysis Path", time: "2m ago" },
  { user: "Miguel R.", action: "earned the Skill Streaker badge", time: "10m ago" },
  { user: "Sarah B.", action: "joined the AI Study Group", time: "20m ago" },
];

function LearningActivityChart() {
  // Simple animated bar chart
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(34,211,238,0.18)" }}
      transition={{ duration: 0.5 }}
      className="bg-[#23234a] rounded-2xl p-8 shadow-lg border border-[#23234a] flex flex-col items-center min-h-[220px]"
    >
      <div className="font-bold text-lg mb-2">Learning Activity</div>
      <div className="text-gray-400 text-sm mb-4">XP earned in the last 7 days</div>
      <div className="flex items-end gap-3 w-full h-32 justify-center">
        {activityData.map((val, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${val * 1.2}px` }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="w-6 rounded-t-lg bg-gradient-to-t from-blue-500 via-purple-500 to-blue-400 flex items-end justify-center relative group cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: "#a21caf" }}
          >
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-blue-300 opacity-0 group-hover:opacity-100 transition">{val} XP</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between w-full mt-2 text-xs text-gray-500">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </motion.div>
  );
}

function RecentAchievements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(251,191,36,0.18)" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#23234a] rounded-2xl p-8 shadow-lg border border-[#23234a] flex flex-col min-h-[220px]"
    >
      <div className="font-bold text-lg mb-2">Recent Achievements</div>
      <div className="flex flex-col gap-4 mt-2">
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-4 bg-[#18181b] rounded-xl px-4 py-3 shadow group hover:bg-blue-950/30 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">{ach.icon}</span>
            <div>
              <div className="font-semibold text-base text-blue-300 group-hover:text-yellow-400 transition">{ach.label}</div>
              <div className="text-xs text-gray-400">{ach.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CommunityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(34,197,94,0.18)" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#23234a] rounded-2xl p-8 shadow-lg border border-[#23234a] flex flex-col min-h-[220px]"
    >
      <div className="font-bold text-lg mb-2">Community Feed</div>
      <div className="flex flex-col gap-4 mt-2">
        {communityFeed.map((item, i) => (
          <motion.div
            key={item.user + item.action}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="flex items-center gap-3 bg-[#18181b] rounded-xl px-4 py-3 shadow group hover:bg-green-950/30 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-green-400 font-bold">●</span>
      <div>
              <span className="font-semibold text-base text-green-300 group-hover:text-green-400 transition">{item.user}</span>
              <span className="text-gray-300 ml-2">{item.action}</span>
              <span className="text-xs text-gray-500 ml-2">{item.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/user/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user profile");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load user profile");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans">
        <div className="text-lg text-gray-300">Loading dashboard...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-lg rounded-lg p-6 text-center">{error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden">
      {/* Dashboard Header */}
      <section className="w-full max-w-7xl mx-auto px-8 pt-12 pb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-5"
        >
          <Image src="/bri.svg" alt={user.name || "User"} width={64} height={64} className="rounded-full border-4 border-blue-600 shadow-lg" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1">Welcome back, <span className="text-purple-400">{user.name || user.email}</span>!</h1>
            <p className="text-lg text-gray-300">Ready to level up your skills today?</p>
          </div>
        </motion.div>
      </section>
      {/* Today's Goals Bar */}
      <section className="w-full max-w-7xl mx-auto px-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#23234a] rounded-2xl shadow-lg px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#23234a]"
        >
          <div className="flex items-center gap-3 text-base md:text-lg font-semibold">
            <span className="text-blue-400 text-2xl">🎯</span> Today's Goal: <span className="text-purple-400">Complete 1 lesson</span>
          </div>
          <div className="flex items-center gap-4 text-sm md:text-base">
            <span className="bg-blue-600/20 text-blue-300 px-4 py-1 rounded-full font-medium">Daily Streak: <span className="text-blue-400 font-bold">5 days</span></span>
            <span className="bg-purple-600/20 text-purple-300 px-4 py-1 rounded-full font-medium">XP Earned: <span className="text-purple-400 font-bold">50</span></span>
          </div>
        </motion.div>
      </section>
      {/* Dashboard Widgets Grid */}
      <section className="w-full max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProgressWheel />
          <SkillTreePreview />
          <Recommendations />
          <GamificationBar />
          <QuickLinks />
          <LearningActivityChart />
          <RecentAchievements />
          <CommunityFeed />
        </div>
      </section>
    </main>
  );
}
