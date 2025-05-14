"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Stats bar data
const stats = [
  { label: 10000000, desc: "Global Learners" },
  { label: 1000, desc: "Interactive Courses" },
  { label: 200, desc: "Expert Instructors" },
  { label: 92, desc: "Completion Rate", isPercent: true },
];

// Categories and skills
const categories = [
  {
    name: "Tech & Coding",
    skills: ["Python", "JavaScript", "React", "Machine Learning", "Cybersecurity", "DevOps"],
  },
  {
    name: "Business",
    skills: ["Entrepreneurship", "Marketing", "Finance", "Leadership", "Productivity"],
  },
  {
    name: "Creative Arts",
    skills: ["Design", "Photography", "Music", "Writing", "Animation"],
  },
  {
    name: "Languages",
    skills: ["Spanish", "French", "Mandarin", "German", "English"],
  },
  {
    name: "Lifestyle",
    skills: ["Cooking", "Fitness", "Mindfulness", "Travel", "Gardening"],
  },
];

// Value props
const valueProps = [
  { icon: "🧩", title: "Interactive Learning", desc: "Enjoy a mix of videos, exercises, simulations, and real-world projects." },
  { icon: "🎯", title: "Personalized Paths", desc: "AI-driven recommendations, right to your learning style, goals, and needs." },
  { icon: "📈", title: "Progress Tracking", desc: "Monitor your advancement with analytics and motivational experiences." },
  { icon: "🤝", title: "Community Support", desc: "Connect with fellow learners and instructors for feedback and collaboration." },
];

// Testimonials
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

// Partners
const partners = [
  { src: "/bri.svg", alt: "Brilliant" },
  { src: "/master.svg", alt: "MasterClass" },
  { src: "/google.svg", alt: "Google Classroom" },
];

// FAQ
const faqs = [
  { q: "Is SkillCraft free to start?", a: "Yes! You can start learning for free with a 7-day trial. No credit card required." },
  { q: "Can I learn at my own pace?", a: "Absolutely. All courses are self-paced and you can revisit lessons anytime." },
  { q: "Are certificates provided?", a: "Yes, you earn certificates and badges for completed courses and projects." },
  { q: "Is there a community?", a: "Yes, join study groups, live workshops, and connect with peers and mentors." },
];

// Animated Counter
function AnimatedCounter({ to, isPercent = false }: { to: number, isPercent?: boolean }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = to;
    if (start === end) return;
    let incrementTime = 10;
    let step = Math.ceil(end / 100);
    let timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [to]);
  return <span>{count.toLocaleString()}{isPercent ? "%" : ""}</span>;
}

// FAQ Accordion
function FAQAccordion() {
  const [open, setOpen] = React.useState(-1);
  return (
    <div className="max-w-2xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="mb-3 border-b border-gray-700">
          <button
            className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-gray-200 hover:text-blue-400 transition"
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {faq.q}
            <span className={`ml-2 transition-transform ${open === i ? "rotate-180" : "rotate-0"}`}>▼</span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden text-gray-400 pb-4 px-2"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Testimonials Carousel
function TestimonialsCarousel({ testimonials, testimonialsLoading, testimonialsError }: { testimonials: any[], testimonialsLoading: boolean, testimonialsError: string }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!testimonialsLoading && testimonials.length > 0) {
      const timer = setTimeout(() => setIdx((idx + 1) % testimonials.length), 5000);
      return () => clearTimeout(timer);
    }
  }, [idx, testimonials, testimonialsLoading]);
  if (testimonialsLoading) {
    return <div className="text-center text-gray-400 py-12">Loading testimonials...</div>;
  }
  if (testimonialsError) {
    return <div className="text-center text-red-400 py-12">{testimonialsError}</div>;
  }
  if (!testimonials.length) {
    return <div className="text-center text-gray-400 py-12">No testimonials available.</div>;
  }
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="bg-[#23234a] rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#23234a] min-h-[260px]"
        >
          <img src={testimonials[idx].avatar} alt={testimonials[idx].name} width={60} height={60} className="rounded-full mb-4 border-2 border-blue-600" />
          <p className="text-gray-200 text-lg mb-4 text-center">“{testimonials[idx].quote}”</p>
          <span className="font-bold text-base text-blue-400 mb-1">{testimonials[idx].name}</span>
          <span className="text-gray-400 text-sm">{testimonials[idx].title}</span>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 justify-center mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === idx ? "bg-blue-500" : "bg-gray-600"}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCat, setActiveCat] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  // API integration for featured courses
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");
  // API integration for stats
  const [stats, setStats] = useState<any[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  // API integration for testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState("");

  useEffect(() => {
    setCoursesLoading(true);
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedCourses(data.courses.slice(0, 4));
        setCoursesLoading(false);
      })
      .catch((err) => {
        setCoursesError("Failed to load courses");
        setCoursesLoading(false);
      });
  }, []);

  useEffect(() => {
    setStatsLoading(true);
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setStatsLoading(false);
      })
      .catch((err) => {
        setStatsError("Failed to load stats");
        setStatsLoading(false);
      });
  }, []);

  useEffect(() => {
    setTestimonialsLoading(true);
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials);
        setTestimonialsLoading(false);
      })
      .catch((err) => {
        setTestimonialsError("Failed to load testimonials");
        setTestimonialsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    let timer = setTimeout(() => setProgress(80), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <img src="/bri.svg" alt="SkillCraft Logo" width={40} height={40} className="rounded-xl" />
          <span className="font-bold text-lg tracking-tight">SkillCraft</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="/explore" className="hover:text-blue-400 transition">Explore</Link>
          <Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
        </nav>
        <div className="flex gap-3 items-center">
          <a href="/login" className="px-4 py-1.5 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition text-sm">Login</a>
          <a href="/signup" className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-semibold">Sign Up</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-8 pt-12 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col items-start gap-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            Master New Skills with <span className="text-purple-400">Interactive Learning</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-4">
            Personalized, gamified education that adapts to your learning style. Join millions of learners worldwide on their journey to mastery.
          </p>
          <div className="flex gap-4 mb-2">
            <motion.a
              whileHover={{ scale: 1.07 }}
              href="/signup"
              className="px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold shadow-lg transition animate-pulse"
            >
              Start Learning For Free
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.07 }}
              href="#"
              className="px-7 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-lg font-semibold border border-gray-600 transition"
            >
              Watch Demo
            </motion.a>
          </div>
          {/* Animated Progress Bar */}
          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between mb-1 text-xs text-gray-400">
              <span>Daily XP Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 shadow-lg"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span>10M+ Learners Worldwide</span>
          </div>
        </motion.div>
        {/* Browser SVG Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          <svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            <rect x="10" y="20" width="320" height="140" rx="18" fill="#18182f" stroke="#3b3b5c" strokeWidth="2"/>
            <rect x="30" y="45" width="90" height="25" rx="6" fill="#23234a"/>
            <rect x="130" y="45" width="180" height="25" rx="6" fill="#23234a"/>
            <rect x="30" y="80" width="120" height="18" rx="5" fill="#23234a"/>
            <rect x="160" y="80" width="110" height="18" rx="5" fill="#23234a"/>
            <rect x="30" y="110" width="70" height="14" rx="4" fill="#23234a"/>
            <rect x="110" y="110" width="200" height="14" rx="4" fill="#23234a"/>
            {/* Floating chat bubbles */}
            <rect x="220" y="30" width="60" height="18" rx="6" fill="#6d28d9" opacity="0.7"/>
            <rect x="60" y="120" width="50" height="18" rx="6" fill="#2563eb" opacity="0.7"/>
          </svg>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-[#18182f] border-y border-[#23234a] py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-8">
          {statsLoading ? (
            <div className="text-center text-gray-400 py-4">Loading stats...</div>
          ) : statsError ? (
            <div className="text-center text-red-400 py-4">{statsError}</div>
          ) : (
            stats.map((stat, i) => (
              <motion.div
                key={stat.desc}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center md:items-start group"
              >
                <span className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition">
                  <AnimatedCounter to={stat.label} isPercent={stat.isPercent} />
                </span>
                <span className="text-gray-400 text-sm md:text-base">{stat.desc}</span>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Partners/Trusted By */}
      <section className="w-full max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-300">Trusted by learners from</h2>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {partners.map((logo) => (
            <motion.div
              key={logo.alt}
              whileHover={{ scale: 1.1 }}
              className="transition"
            >
              <img src={logo.src} alt={logo.alt} width={90} height={40} className="object-contain grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="w-full max-w-7xl mx-auto px-8 py-14">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Courses</h2>
          <Link href="/courses" className="text-blue-400 hover:underline text-sm font-medium">View all courses →</Link>
        </div>
        {coursesLoading ? (
          <div className="text-center text-gray-400 py-12">Loading courses...</div>
        ) : coursesError ? (
          <div className="text-center text-red-400 py-12">{coursesError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(34,211,238,0.18)" }}
                className="bg-[#23234a] rounded-2xl p-5 flex flex-col shadow-lg border border-[#23234a] hover:border-blue-600 transition group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden">
                  <img src={course.imageUrl} alt={course.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-300" />
                </div>
                <span className="text-xs uppercase tracking-wider text-blue-400 bg-blue-950/40 px-2 py-1 rounded mb-2 self-start">{course.category}</span>
                <h3 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition">{course.title}</h3>
                <div className="text-gray-400 text-xs mb-2">By {course.instructor.name}</div>
                <div className="text-gray-300 text-xs mb-4">{course.level} · {course.duration}</div>
                <motion.button
                  whileHover={{ scale: 1.06, backgroundColor: "#a21caf" }}
                  className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-xs font-semibold transition"
                  onClick={() => alert("Course preview coming soon!")}
                >
                  Preview
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Category Explorer */}
      <section className="w-full max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore by Category</h2>
        <div className="flex gap-4 mb-6 flex-wrap">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCat(idx)}
              whileHover={{ scale: 1.08 }}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition relative overflow-hidden ${activeCat === idx ? "bg-blue-600 border-blue-600 text-white" : "bg-[#18182f] border-gray-700 text-gray-300 hover:bg-blue-950/30"}`}
            >
              {cat.name}
              {activeCat === idx && <motion.div layoutId="cat-underline" className="absolute left-0 right-0 bottom-0 h-1 bg-blue-400 rounded-full" style={{ zIndex: 1 }} />}
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#23234a] rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg border border-[#23234a]"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3 text-white">Popular Skills</h3>
            <div className="flex flex-wrap gap-3">
              {categories[activeCat].skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.1, backgroundColor: "#2563eb", color: "#fff" }}
                  className="px-4 py-2 bg-blue-950/40 text-blue-300 rounded-full text-sm font-medium border border-blue-900/30 cursor-pointer transition"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <Link href="/courses" passHref legacyBehavior><motion.a whileHover={{ scale: 1.07 }} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-base font-semibold shadow-lg transition">Browse Courses</motion.a></Link>
          </div>
        </motion.div>
      </section>

      {/* Why Choose SkillCraft */}
      <section className="w-full max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose SkillCraft</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {valueProps.map((prop, i) => (
            <motion.div
              key={prop.title}
              whileHover={{ scale: 1.08, backgroundColor: "#232136" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#18182f] border border-gray-800 rounded-2xl p-7 flex flex-col items-center shadow-md transition"
            >
              <span className="text-4xl mb-3">{prop.icon}</span>
              <span className="font-bold text-lg mb-2 text-center">{prop.title}</span>
              <span className="text-gray-300 text-sm text-center">{prop.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="w-full max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Learners Say</h2>
        <TestimonialsCarousel testimonials={testimonials} testimonialsLoading={testimonialsLoading} testimonialsError={testimonialsError} />
      </section>

      {/* FAQ Accordion */}
      <section className="w-full max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <FAQAccordion />
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-blue-800/80 py-16 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
        >
          Start Your Learning Journey Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-200 mb-6 text-center max-w-xl"
        >
          Join millions of learners worldwide and unlock your potential with interactive courses designed for real skill mastery.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.07 }}
          href="/signup"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold shadow-lg transition animate-pulse"
        >
          Get Started for Free →
        </motion.a>
        <span className="text-xs text-gray-300 mt-2">No credit card required. 7-day free trial.</span>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#18182f] border-t border-gray-800 py-10 px-8 mt-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/bri.svg" alt="SkillCraft Logo" width={32} height={32} className="rounded-md" />
            <span>SkillCraft</span>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            <Link href="/courses" className="hover:text-blue-400 transition">All Courses</Link>
            <Link href="/courses?category=tech" className="hover:text-blue-400 transition">Tech & Coding</Link>
            <Link href="/courses?category=business" className="hover:text-blue-400 transition">Business</Link>
            <Link href="/courses?category=creative-arts" className="hover:text-blue-400 transition">Creative Arts</Link>
            <Link href="/courses?category=languages" className="hover:text-blue-400 transition">Languages</Link>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://twitter.com/" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-xl">🐦</a>
            <a href="https://discord.com/" aria-label="Discord" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-xl">💬</a>
            <a href="https://linkedin.com/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition text-xl">🔗</a>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mt-6">© {new Date().getFullYear()} SkillCraft. All rights reserved.</div>
      </footer>
    </main>
  );
}
