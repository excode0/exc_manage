'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 ${className}`}></div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 ${className}`}
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <SunIcon
          className={`w-5 h-5 text-yellow-500 absolute transition-all duration-300 transform ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <MoonIcon
          className={`w-5 h-5 text-blue-400 absolute transition-all duration-300 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>

      {/* Animated background */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 opacity-20'
            : 'bg-gradient-to-r from-yellow-400 to-orange-400 opacity-20'
        }`}
      />
    </button>
  );
}
