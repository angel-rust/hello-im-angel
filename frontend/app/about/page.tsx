import Link from 'next/link';
import Timeline from '@/components/sections/Timeline';
import Testimonials from '@/components/sections/Testimonials';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-neutral px-6 pt-24 pb-12 md:px-12">
      <div className="max-w-5xl mx-auto">
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
        <article className="prose prose-invert prose-accent-blue max-w-none">
          <h1 className="text-5xl font-bold mb-6 text-accent-blue">About Me</h1>

          <div className="space-y-6 text-lg leading-relaxed mb-16">
            <p>
              Hi, I&apos;m Angel Medina, a full-stack developer passionate about creating
              beautiful, performant web experiences that push the boundaries of what&apos;s
              possible on the web.
            </p>

            <p>
              I specialize in modern web technologies, with a focus on React, Next.js,
              and Three.js for creating immersive 3D experiences. On the backend, I work
              with Rust to build fast, reliable systems.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-accent-blue">Background</h2>
            <p>
              My journey into development started with a curiosity about how things work
              under the hood. This led me to explore various technologies and eventually
              specialize in full-stack development with a unique blend of frontend artistry
              and backend engineering.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-4 text-accent-blue">Philosophy</h2>
            <p>
              I believe in writing clean, maintainable code that others can understand and
              build upon. Performance, accessibility, and user experience are at the core
              of everything I create.
            </p>

            <p>
              When I&apos;m not coding, you can find me exploring new technologies, contributing
              to open source, or experimenting with 3D graphics and interactive web experiences.
            </p>
          </div>
        </article>

        {/* Timeline */}
        <div className="my-20">
          <Timeline />
        </div>

        {/* Testimonials */}
        <div className="my-20">
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
