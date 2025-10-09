import Link from 'next/link';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Backend',
      skills: ['Rust', 'Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs']
    },
    {
      title: 'Tools & DevOps',
      skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Linux']
    },
    {
      title: '3D & Graphics',
      skills: ['Three.js', 'React Three Fiber', 'WebGL', 'GLSL', 'Blender', 'Spline']
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
          <h1 className="text-5xl font-bold mb-4 text-accent-blue">Skills & Expertise</h1>
          <p className="text-xl text-neutral/80 mb-12">
            Technologies I work with to build modern, scalable applications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-gray-10/30 border border-accent-blue/20 rounded-lg p-6 hover:border-accent-blue/40 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-accent-blue mb-4">
                  {category.title}
                </h2>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center text-neutral">
                      <svg
                        className="w-5 h-5 mr-3 text-accent-blue flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {skill}
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
