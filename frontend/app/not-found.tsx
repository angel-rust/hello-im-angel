'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function NotFound() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
  };

  const handleClick = () => {
    if (!gameActive) return;

    setScore((prev) => prev + 1);
    setPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
    });
  };

  useEffect(() => {
    if (score >= 10 && gameActive) {
      setGameActive(false);
      alert('🎉 You won! You found all the 404s! You get a virtual high-five! 🙌');
    }
  }, [score, gameActive]);

  return (
    <div className="min-h-screen bg-black text-neutral flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 404 Header */}
          <motion.h1
            className="text-[12rem] md:text-[18rem] font-black leading-none"
            style={{
              background: 'linear-gradient(45deg, #00a3ff, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(0, 163, 255, 0.5)',
            }}
          >
            404
          </motion.h1>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-xl text-neutral/80 mb-12 max-w-2xl mx-auto">
            Looks like this page took a wrong turn in the matrix. But hey, while you&apos;re here,
            want to play a quick game?
          </p>

          {/* Game Section */}
          {!gameActive ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-accent-blue/10 to-purple-500/10 border border-accent-blue/30 rounded-2xl p-8 mb-12"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                🎮 Catch the 404!
              </h3>
              <p className="text-neutral/80 mb-6">
                Click the moving 404 button 10 times to win!
              </p>
              <button
                onClick={startGame}
                className="bg-accent-blue text-black font-bold px-8 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors"
              >
                Start Game
              </button>
            </motion.div>
          ) : (
            <div className="relative h-96 bg-gradient-to-br from-accent-blue/10 to-purple-500/10 border border-accent-blue/30 rounded-2xl p-8 mb-12 overflow-hidden">
              <div className="absolute top-4 left-4 text-2xl font-bold text-accent-blue">
                Score: {score}/10
              </div>

              <motion.button
                onClick={handleClick}
                animate={{ x: `${position.x}%`, y: `${position.y}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                className="absolute w-20 h-20 bg-gradient-to-br from-accent-blue to-purple-500 rounded-full flex items-center justify-center font-bold text-white shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                404
              </motion.button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <MagneticButton>
                <span className="inline-flex items-center gap-2 bg-accent-blue text-black font-bold px-8 py-4 rounded-lg hover:bg-accent-blue/90 transition-colors">
                  <Home className="w-5 h-5" />
                  Go Home
                </span>
              </MagneticButton>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-accent-blue/30 font-bold px-8 py-4 rounded-lg hover:bg-white/20 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-black/40 border border-accent-blue/20 rounded-xl"
          >
            <h4 className="text-lg font-semibold text-accent-blue mb-3">
              💡 Fun Fact
            </h4>
            <p className="text-neutral/70 text-sm">
              The HTTP 404 error code is a reference to room 404 at CERN where the World Wide Web was invented.
              Actually, that&apos;s a myth - but it sounds cool! 😄
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
