'use client';

import Link from 'next/link';
import ContactForm from '@/components/forms/ContactForm';

export default function Connect() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/angel-rust',
      description: 'Open source projects and code samples',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/angel-medina',
      description: 'Professional network and career highlights',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/angel_rust',
      description: 'Thoughts, updates, and tech discussions',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:angel@example.com',
      description: 'Direct email for inquiries and collaborations',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      )
    }
  ];

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
          <h1 className="text-5xl font-bold mb-4 text-accent-blue">Let&apos;s Connect</h1>
          <p className="text-xl text-neutral/80 mb-12">
            I&apos;m always open to discussing new projects, opportunities, or just chatting
            about technology. Feel free to reach out through any of these platforms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-10/30 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue hover:bg-accent-blue/5 hover:shadow-glow-sm transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-accent-blue group-hover:text-accent-blue/90 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-accent-blue group-hover:text-accent-blue/90 transition-colors mb-2">
                      {link.name}
                    </h2>
                    <p className="text-neutral/70 text-sm">
                      {link.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-accent-blue/50 group-hover:text-accent-blue group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4 text-accent-blue">Send Me a Message</h2>
            <p className="text-neutral/80 mb-8">
              Have a project in mind or just want to chat? Fill out the form below and I&apos;ll get back to you as soon as possible.
            </p>
            <ContactForm />
          </div>

          <div className="mt-12 p-6 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
            <h3 className="text-xl font-semibold text-accent-blue mb-3">
              Availability
            </h3>
            <p className="text-neutral/80">
              Currently available for freelance projects and consulting opportunities.
              I typically respond within 24-48 hours.
            </p>
          </div>

          <div className="mt-8 p-6 border border-accent-blue/20 rounded-lg">
            <h3 className="text-lg font-semibold text-neutral mb-3">
              Location & Timezone
            </h3>
            <p className="text-neutral/70">
              Based in [Your Location] • Working remotely worldwide • [Your Timezone]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
