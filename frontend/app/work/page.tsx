import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function Work() {
  const projects = getAllProjects();

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

          <div className="space-y-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="block group"
              >
                <div className="bg-gray-10/30 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-accent-blue group-hover:text-accent-blue/90 transition-colors">
                      {project.title}
                    </h2>
                    <span className="text-sm text-neutral/60 font-mono">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-neutral/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-accent-blue font-semibold group-hover:gap-3 gap-2 transition-all">
                    View details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
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
                className="inline-flex items-center gap-1 text-accent-blue hover:underline"
              >
                GitHub <ExternalLink className="w-4 h-4" />
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
