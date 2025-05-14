import { NextResponse } from 'next/server';

const testimonials = [
  {
    avatar: "/bri.svg",
    quote: "SkillCraft made learning fun again! The gamification kept me motivated every day.",
    name: "Alex J.",
    title: "Data Analyst"
  },
  {
    avatar: "/master.svg",
    quote: "I landed my dream job after completing SkillCraft's project-based courses.",
    name: "Priya S.",
    title: "Software Engineer"
  },
  {
    avatar: "/google.svg",
    quote: "The community and live workshops are a game-changer for online learning.",
    name: "Miguel R.",
    title: "Creative Director"
  }
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json({ testimonials });
} 