import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import ConnectForm from './ConnectForm';

export default function Connect() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/angel-rust',
      description: 'Open source projects',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/angel-medina',
      description: 'Professional network',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/angel_rust',
      description: 'Tech thoughts and updates',
      icon: Twitter,
    },
    {
      name: 'Email',
      url: 'mailto:angel@angelmedina.io',
      description: 'angel@angelmedina.io',
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral px-6 pt-24 pb-12 md:px-12">
      <div className="max-w-6xl mx-auto">
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

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Let&apos;s <span className="text-accent-blue">Connect</span>
          </h1>
          <p className="text-xl text-neutral/80">
            Have a project in mind? Want to collaborate? Let&apos;s make something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
              <ConnectForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="bg-black/40 border border-accent-blue/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Connect Elsewhere</h3>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-accent-blue/20 hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-accent-blue" />
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{link.name}</div>
                        <div className="text-neutral/60 text-xs">{link.description}</div>
                      </div>
                      <svg
                        className="w-4 h-4 text-accent-blue/50 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-bold text-white">Available for Work</h3>
              </div>
              <p className="text-neutral/80 text-sm">
                Open to freelance projects and consulting. I typically respond within 24-48 hours.
              </p>
            </div>

            {/* Location */}
            <div className="bg-black/40 border border-accent-blue/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Location</h3>
              <p className="text-neutral/70 text-sm">
                Remote • Working with teams worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
