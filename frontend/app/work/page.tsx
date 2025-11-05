'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Project } from '@/lib/types';

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Using fallback data.');
        // Fallback data
        setProjects([
          {
            id: 1,
            title: '3D Portfolio Website',
            description: 'An immersive 3D portfolio built with Next.js, React Three Fiber, and Rust backend.',
            tech_stack: ['Next.js', 'Three.js', 'Rust', 'Tailwind CSS'],
            year: 2025,
            featured: true,
            github_url: null,
            live_url: null,
            github_stars: 0,
            github_forks: 0,
            last_updated: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
          <h1 className="text-5xl font-bold mb-4 text-accent-blue">Selected Work</h1>
          <p className="text-xl text-neutral/80 mb-12">
            A collection of projects I&apos;ve built and contributed to
          </p>

          {loading && (
            <div className="text-center text-neutral/60 py-12">
              Loading projects...
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-yellow-950 border border-yellow-800 rounded-lg text-yellow-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-10/30 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-accent-blue group-hover:text-accent-blue/90 transition-colors">
                    {project.title}
                  </h2>
                  {project.year && (
                    <span className="text-sm text-neutral/60 font-mono">
                      {project.year}
                    </span>
                  )}
                </div>

                <p className="text-neutral/80 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue hover:underline text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                      {project.github_stars > 0 && ` (${project.github_stars} ⭐)`}
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-blue hover:underline text-sm flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
            <h3 className="text-xl font-semibold text-accent-blue mb-3">
              Open Source Contributions
            </h3>
            <p className="text-neutral/80">
              I&apos;m an active contributor to various open-source projects, particularly in the
              React and Rust ecosystems. You can find my contributions on{' '}
              <a
                href="https://github.com/angel-rust"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
