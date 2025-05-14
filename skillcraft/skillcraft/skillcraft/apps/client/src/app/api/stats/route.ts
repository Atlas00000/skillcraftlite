import { NextResponse } from 'next/server';

const stats = [
  { label: 10000000, desc: "Global Learners" },
  { label: 1000, desc: "Interactive Courses" },
  { label: 200, desc: "Expert Instructors" },
  { label: 92, desc: "Completion Rate", isPercent: true },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json({ stats });
} 