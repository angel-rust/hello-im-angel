'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/3d/Scene';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* 3D Scene fills entire hero section */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Scene />
        </div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-accent-glow opacity-20 blur-3xl pointer-events-none z-5" />

        <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[9rem] md:text-[18rem] font-black mb-12 leading-tight"
          style={{
            textShadow: `
              0 1.5px 0 #ccc,
              0 3px 0 #c9c9c9,
              0 4.5px 0 #bbb,
              0 6px 0 #b9b9b9,
              0 7.5px 0 #aaa,
              0 9px 1.5px rgba(0,0,0,.1),
              0 0 7.5px rgba(0,0,0,.1),
              0 1.5px 4.5px rgba(0,0,0,.3),
              0 4.5px 7.5px rgba(0,0,0,.2),
              0 7.5px 15px rgba(0,0,0,.25),
              0 15px 15px rgba(0,0,0,.2),
              0 30px 30px rgba(0,0,0,.15),
              0 0 120px rgba(0, 163, 255, 0.5)
            `
          }}
        >
          <span className="text-accent-blue">Hello,</span>
          <br />
          <span className="text-white">I&apos;m </span>
          <span className="text-accent-blue">Angel</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="space-y-10 text-center">
            <p
              className="text-[2.8125rem] md:text-[5.625rem] text-white font-black tracking-tight leading-tight"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.8),
                  0 0 45px rgba(0, 163, 255, 0.4),
                  6px 6px 12px rgba(0,0,0,0.5)
                `
              }}
            >
              Full Stack Developer
            </p>
            <p
              className="text-[2.8125rem] md:text-[5.625rem] text-white font-black tracking-tight leading-tight"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.8),
                  0 0 45px rgba(0, 163, 255, 0.4),
                  6px 6px 12px rgba(0,0,0,0.5)
                `
              }}
            >
              Rust Native
            </p>
            <p
              className="text-[2.8125rem] md:text-[5.625rem] text-white font-black tracking-tight leading-tight"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.8),
                  0 0 45px rgba(0, 163, 255, 0.4),
                  6px 6px 12px rgba(0,0,0,0.5)
                `
              }}
            >
              Claude CLI Workflow Expert
            </p>
            <p
              className="text-[2.8125rem] md:text-[5.625rem] text-white font-black tracking-tight leading-tight"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.8),
                  0 0 45px rgba(0, 163, 255, 0.4),
                  6px 6px 12px rgba(0,0,0,0.5)
                `
              }}
            >
              MCP Server Architect
            </p>
            <p
              className="text-[2.8125rem] md:text-[5.625rem] text-white font-black tracking-tight leading-tight"
              style={{
                textShadow: `
                  3px 3px 6px rgba(0,0,0,0.8),
                  0 0 45px rgba(0, 163, 255, 0.4),
                  6px 6px 12px rgba(0,0,0,0.5)
                `
              }}
            >
              Automation Builder + Hospitality Pro
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex justify-center gap-6"
        >
          <a
            href="https://github.com/angel-rust"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral hover:text-accent-blue transition-colors"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
