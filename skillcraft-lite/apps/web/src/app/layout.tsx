'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <footer className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-300">
              © 2025 SkillCraft Lite
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
