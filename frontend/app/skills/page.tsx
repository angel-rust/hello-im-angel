'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Skill } from '@/lib/types';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await api.getSkills();
        setSkills(data);
      } catch (err) {
        console.error('Failed to fetch skills:', err);
        setError('Failed to load skills. Using fallback data.');
        // Fallback data
        setSkills([
          { id: 1, name: 'React', category: 'Frontend', proficiency: 95, icon: null, order_index: 1, created_at: '', updated_at: '' },
          { id: 2, name: 'Next.js', category: 'Frontend', proficiency: 90, icon: null, order_index: 2, created_at: '', updated_at: '' },
          { id: 3, name: 'TypeScript', category: 'Frontend', proficiency: 90, icon: null, order_index: 3, created_at: '', updated_at: '' },
          { id: 4, name: 'Rust', category: 'Backend', proficiency: 85, icon: null, order_index: 1, created_at: '', updated_at: '' },
          { id: 5, name: 'Node.js', category: 'Backend', proficiency: 90, icon: null, order_index: 2, created_at: '', updated_at: '' },
          { id: 6, name: 'PostgreSQL', category: 'Backend', proficiency: 85, icon: null, order_index: 3, created_at: '', updated_at: '' },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-black text-neutral px-6 pt-24 pb-12 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Content */}
        <div>
          <h1 className="text-5xl font-bold mb-4 text-accent-blue">Skills & Expertise</h1>
          <p className="text-xl text-neutral/80 mb-12">
            Technologies I work with to build modern, scalable applications
          </p>

          {loading && (
            <div className="text-center text-neutral/60 py-12">
              Loading skills...
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-yellow-950 border border-yellow-800 rounded-lg text-yellow-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div
                key={category}
                className="bg-gray-10/30 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue/40 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-accent-blue mb-4">
                  {category}
                </h2>
                <ul className="space-y-3">
                  {categorySkills.map((skill) => (
                    <li key={skill.id} className="text-neutral">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-neutral/60">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-accent-blue h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
            <h3 className="text-xl font-semibold text-accent-blue mb-3">
              Always Learning
            </h3>
            <p className="text-neutral/80">
              Technology evolves rapidly, and I&apos;m constantly exploring new tools and
              frameworks to stay at the cutting edge. Currently diving deeper into
              WebGPU, AI/ML integration, and advanced Rust patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
