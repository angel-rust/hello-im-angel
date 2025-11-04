import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { ArrowLeft, ExternalLink, Github, CheckCircle, AlertCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-neutral px-6 pt-24 pb-12 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/work"
          className="inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Work
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-sm bg-accent-blue/20 text-accent-blue border border-accent-blue/40 rounded-full font-semibold">
              {project.category}
            </span>
            <span className="text-neutral/60 font-mono">{project.year}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-2xl text-neutral/80 mb-8 leading-relaxed">
            {project.longDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <MagneticButton>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent-blue text-black font-bold px-6 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </MagneticButton>
            )}
            {project.demo && (
              <MagneticButton>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-accent-blue/30 font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              </MagneticButton>
            )}
          </div>
        </header>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-base bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-lg font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Key Highlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/20 rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-accent-blue flex-shrink-0 mt-0.5" />
                <span className="text-neutral/90">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Challenges & Solutions
          </h2>
          <div className="space-y-6">
            {project.challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-black/40 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Challenge</h3>
                    <p className="text-neutral/80">{challenge.problem}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pl-9">
                  <div>
                    <h3 className="text-xl font-bold text-accent-blue mb-2">Solution</h3>
                    <p className="text-neutral/80">{challenge.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 p-8 bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/30 rounded-xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-neutral/80 mb-6 text-lg">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <Link href="/connect">
            <MagneticButton>
              <span className="inline-flex items-center gap-2 bg-accent-blue text-black font-bold px-6 py-3 rounded-lg hover:bg-accent-blue/90 transition-colors">
                Get in touch
              </span>
            </MagneticButton>
          </Link>
        </section>
      </div>
    </div>
  );
}
