'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase,
  Code,
  Mail,
  User,
  Github,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import GitHubStats from './GitHubStats';

export default function BentoGrid() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen py-20 px-6 md:px-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={item} className="mb-12 text-center">
          <h2 className="text-6xl md:text-8xl font-black text-white mb-4">
            <span className="text-accent-blue">Explore</span> My World
          </h2>
          <p className="text-xl text-neutral/80">
            Interactive portfolio • Built with passion
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
        >
          {/* Large Hero Card - About */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-2">
            <Link href="/about">
              <div className="group h-full bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/30 rounded-2xl p-8 hover:border-accent-blue/60 transition-all duration-300 hover:shadow-glow cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <User className="w-12 h-12 text-accent-blue mb-4" />
                  <h3 className="text-4xl font-bold text-white mb-3">About Me</h3>
                  <p className="text-neutral/80 text-lg mb-6 leading-relaxed">
                    Full Stack Developer passionate about creating beautiful,
                    performant web experiences. Specializing in React, Next.js,
                    Three.js, and Rust.
                  </p>
                  <div className="flex items-center text-accent-blue font-semibold group-hover:gap-3 gap-2 transition-all">
                    Learn more <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* GitHub Stats Card */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-1">
            <div className="h-full bg-black/40 border border-accent-blue/30 rounded-2xl p-6 hover:border-accent-blue/50 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Github className="w-6 h-6 text-accent-blue" />
                <h3 className="text-xl font-bold text-white">GitHub Stats</h3>
              </div>
              <GitHubStats />
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <Link href="/work">
              <div className="group h-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer">
                <Briefcase className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Projects</h3>
                <p className="text-neutral/70 text-sm">View my work</p>
                <div className="mt-4 flex items-center text-purple-400 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={item} className="md:col-span-1 md:row-span-1">
            <Link href="/skills">
              <div className="group h-full bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] cursor-pointer">
                <Code className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Skills</h3>
                <p className="text-neutral/70 text-sm">Tech stack</p>
                <div className="mt-4 flex items-center text-green-400 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                  View all <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog Card */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-1">
            <Link href="/blog">
              <div className="group h-full bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] cursor-pointer relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
                </div>
                <Zap className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">Blog & Articles</h3>
                <p className="text-neutral/70">
                  Thoughts on development, design, and technology
                </p>
                <div className="mt-4 flex items-center text-orange-400 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                  Read articles <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-1">
            <Link href="/connect">
              <div className="group h-full bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/30 rounded-2xl p-8 hover:border-accent-blue/60 transition-all duration-300 hover:shadow-glow cursor-pointer">
                <Mail className="w-10 h-10 text-accent-blue mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Let&apos;s Connect</h3>
                <p className="text-neutral/80 mb-4">
                  Have a project in mind? Let&apos;s build something amazing together.
                </p>
                <MagneticButton>
                  <span className="inline-flex items-center gap-2 bg-accent-blue text-black font-bold px-6 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors">
                    Get in touch <ArrowRight className="w-5 h-5" />
                  </span>
                </MagneticButton>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
