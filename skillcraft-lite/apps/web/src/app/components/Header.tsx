'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', String(!darkMode));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-background-surface shadow sticky top-0 z-30 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-primary">SkillCraft</span>
        </div>
        {/* Nav */}
        <nav className="hidden md:flex gap-8 text-text-secondary font-semibold">
          <a href="#" className="hover:text-primary transition">Explore</a>
          <a href="#" className="hover:text-primary transition">Dashboard</a>
        </nav>
        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-primary text-white px-5 py-2 font-bold shadow-card hover:scale-105 hover:shadow-glow transition">Log In</button>
          <button className="rounded-full border border-primary text-primary px-5 py-2 font-bold hover:bg-primary hover:text-white transition">Sign Up</button>
        </div>
      </div>
    </header>
  );
} 