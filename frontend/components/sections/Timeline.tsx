'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

interface TimelineItem {
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
}

const timelineData: TimelineItem[] = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    organization: 'Tech Innovations Inc.',
    period: '2023 - Present',
    description: 'Leading development of enterprise web applications using React, Next.js, and Rust.',
    highlights: [
      'Architected and built scalable microservices backend',
      'Improved performance by 60% through optimization',
      'Mentored junior developers',
    ],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Digital Solutions Co.',
    period: '2021 - 2023',
    description: 'Developed modern web applications for diverse clients using React and Node.js.',
    highlights: [
      'Built 15+ production applications',
      'Implemented CI/CD pipelines',
      'Reduced deployment time by 75%',
    ],
  },
  {
    type: 'achievement',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    period: '2020 - Present',
    description: 'Active contributor to React, Rust, and Three.js ecosystems.',
    highlights: [
      '100+ merged pull requests',
      'Maintained 5+ packages on npm',
      'Built developer tools used by 10k+ developers',
    ],
  },
  {
    type: 'education',
    title: 'B.S. Computer Science',
    organization: 'University of Technology',
    period: '2017 - 2021',
    description: 'Focused on software engineering, algorithms, and web technologies.',
    highlights: [
      'Graduated with honors',
      'Led university coding club',
      'Won 3 hackathons',
    ],
  },
];

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
};

export default function Timeline() {
  return (
    <section className="py-12">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        <span className="text-accent-blue">Career</span> Timeline
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-blue/30"></div>

        {/* Timeline items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => {
            const Icon = iconMap[item.type];
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-black border-4 border-accent-blue flex items-center justify-center z-10">
                  <Icon className="w-7 h-7 text-accent-blue" />
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-5/12 ${
                    isLeft ? 'md:pr-16 pl-20 md:pl-0 md:text-right' : 'md:pl-16 pl-20 md:pr-0'
                  }`}
                >
                  <div className="bg-gradient-to-br from-accent-blue/10 to-accent-blue/5 border border-accent-blue/30 rounded-xl p-6 hover:border-accent-blue/50 transition-all duration-300">
                    <span className="text-accent-blue text-sm font-mono">{item.period}</span>
                    <h3 className="text-2xl font-bold text-white mt-2 mb-1">{item.title}</h3>
                    <p className="text-accent-blue/80 font-semibold mb-3">{item.organization}</p>
                    <p className="text-neutral/80 mb-4">{item.description}</p>

                    {item.highlights && (
                      <ul className={`space-y-1 text-sm text-neutral/70 ${isLeft ? 'md:text-right' : ''}`}>
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`text-accent-blue ${isLeft ? 'md:order-2' : ''}`}>•</span>
                            <span className={isLeft ? 'md:text-right flex-1' : 'flex-1'}>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
