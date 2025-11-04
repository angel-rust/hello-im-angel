'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'Tech Innovations Inc.',
    content:
      'Angel is an exceptional developer who consistently delivers high-quality work. Their expertise in React and Rust helped us scale our application to handle millions of users.',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Digital Solutions Co.',
    content:
      'Working with Angel was a game-changer for our team. They brought innovative solutions to complex problems and their 3D web experiences are simply outstanding.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Engineering Lead',
    company: 'StartUp Labs',
    content:
      'Angel\'s ability to bridge frontend and backend development is remarkable. They built our entire platform from scratch and it runs flawlessly. Highly recommended!',
  },
  {
    name: 'David Kim',
    role: 'Designer',
    company: 'Creative Agency',
    content:
      'As a designer, I appreciate how Angel brings designs to life with pixel-perfect precision and smooth animations. Their attention to detail is unmatched.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        What People <span className="text-accent-blue">Say</span>
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/30 rounded-2xl p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-accent-blue/40 mb-6" />

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                &quot;{testimonials[currentIndex].content}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent-blue/20 border-2 border-accent-blue flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-blue">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-neutral/70 text-sm">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => paginate(-1)}
            className="w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/30 hover:bg-accent-blue/20 hover:border-accent-blue/50 transition-all flex items-center justify-center group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-accent-blue group-hover:scale-110 transition-transform" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-accent-blue w-8'
                    : 'bg-accent-blue/30 hover:bg-accent-blue/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            className="w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/30 hover:bg-accent-blue/20 hover:border-accent-blue/50 transition-all flex items-center justify-center group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-accent-blue group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
