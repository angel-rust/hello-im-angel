'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/about', label: 'About', icon: '👤' },
    { href: '/skills', label: 'Skills', icon: '⚡' },
    { href: '/work', label: 'Work', icon: '💼' },
    { href: '/connect', label: 'Connect', icon: '🔗' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-accent-blue/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          {/* 3D Hamburger Button - Center */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative group"
            aria-label="Toggle menu"
          >
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* 3D Container with glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-lg border border-accent-blue/30 group-hover:border-accent-blue/50" />

              {/* Hamburger Icon */}
              <div className="relative z-10 flex flex-col gap-1.5">
                <motion.div
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-7 h-0.5 bg-white rounded-full shadow-lg shadow-accent-blue/50"
                />
                <motion.div
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-0.5 bg-white rounded-full shadow-lg shadow-accent-blue/50"
                />
                <motion.div
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-7 h-0.5 bg-white rounded-full shadow-lg shadow-accent-blue/50"
                />
              </div>
            </div>
          </button>
        </div>

        {/* Modern Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 z-[200]"
            >
              <div className="bg-black/95 backdrop-blur-xl border border-accent-blue/30 rounded-2xl shadow-2xl shadow-accent-blue/20 overflow-hidden">
                <div className="p-2 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-accent-blue/10 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-blue/5 to-accent-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                          {link.icon}
                        </span>
                        <span className="text-base font-semibold text-white group-hover:text-accent-blue transition-colors duration-300 relative z-10">
                          {link.label}
                        </span>

                        {/* Arrow indicator */}
                        <svg
                          className="w-5 h-5 ml-auto text-accent-blue/50 group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-accent-blue/0 via-accent-blue to-accent-blue/0" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
