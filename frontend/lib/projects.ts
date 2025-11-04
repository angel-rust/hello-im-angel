export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  year: string;
  category: string;
  featured: boolean;
  github?: string;
  demo?: string;
  image?: string;
  highlights: string[];
  challenges: { problem: string; solution: string }[];
}

export const projects: Project[] = [
  {
    slug: '3d-portfolio',
    title: '3D Interactive Portfolio',
    description: 'An immersive 3D portfolio built with Next.js, React Three Fiber, and Rust backend.',
    longDescription: 'A cutting-edge portfolio website featuring interactive 3D elements, smooth animations, and a modern design system. Built with performance and user experience as top priorities.',
    tech: ['Next.js', 'Three.js', 'React', 'Rust', 'Tailwind CSS', 'Framer Motion'],
    year: '2025',
    category: 'Web Development',
    featured: true,
    github: 'https://github.com/angel-rust/hello-im-angel',
    demo: 'https://angelmedina.io',
    highlights: [
      'Interactive 3D scene with React Three Fiber',
      'Command palette navigation (⌘K)',
      'Smooth scroll animations with Lenis',
      'Bento grid layout for modern UX',
      'MDX blog with syntax highlighting',
      'Rust backend for high performance',
    ],
    challenges: [
      {
        problem: 'Mobile performance with 3D graphics',
        solution: 'Implemented adaptive quality settings and progressive loading based on device capabilities',
      },
      {
        problem: 'SEO with client-side 3D content',
        solution: 'Used Next.js 15 with server-side rendering for optimal SEO while maintaining rich interactivity',
      },
    ],
  },
  {
    slug: 'collaboration-platform',
    title: 'Real-time Collaboration Platform',
    description: 'A WebSocket-based platform for team collaboration with real-time document editing.',
    longDescription: 'Enterprise-grade collaboration tool enabling teams to work together seamlessly with real-time document editing, chat, and project management features.',
    tech: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Redis', 'Docker'],
    year: '2024',
    category: 'Full Stack',
    featured: true,
    highlights: [
      'Real-time collaborative editing with operational transformation',
      'WebSocket-based chat with message history',
      'Role-based access control',
      'Offline-first architecture with sync',
      'Docker containerization for easy deployment',
    ],
    challenges: [
      {
        problem: 'Conflict resolution in concurrent edits',
        solution: 'Implemented operational transformation algorithm to handle simultaneous edits gracefully',
      },
      {
        problem: 'Scaling WebSocket connections',
        solution: 'Used Redis pub/sub for horizontal scaling across multiple server instances',
      },
    ],
  },
  {
    slug: 'analytics-dashboard',
    title: 'E-commerce Analytics Dashboard',
    description: 'Comprehensive analytics platform with data visualization and reporting capabilities.',
    longDescription: 'A powerful analytics dashboard providing actionable insights for e-commerce businesses with real-time metrics, custom reports, and predictive analytics.',
    tech: ['Next.js', 'TypeScript', 'GraphQL', 'D3.js', 'Recharts', 'PostgreSQL'],
    year: '2024',
    category: 'Data Visualization',
    featured: true,
    highlights: [
      'Real-time sales and traffic metrics',
      'Interactive data visualizations with D3.js',
      'Custom report builder',
      'GraphQL API for flexible data queries',
      'Export to PDF and Excel',
    ],
    challenges: [
      {
        problem: 'Large dataset rendering performance',
        solution: 'Implemented virtual scrolling and data aggregation strategies',
      },
      {
        problem: 'Complex data relationships',
        solution: 'Designed efficient GraphQL schema with DataLoader for N+1 query prevention',
      },
    ],
  },
  {
    slug: 'ai-content-generator',
    title: 'AI-Powered Content Generator',
    description: 'Machine learning-powered tool for generating marketing content and copy.',
    longDescription: 'An intelligent content generation platform leveraging GPT models to help marketers create compelling copy, blog posts, and social media content.',
    tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'PostgreSQL', 'Redis'],
    year: '2023',
    category: 'AI/ML',
    featured: false,
    highlights: [
      'Multiple content templates (blog, ads, social)',
      'Tone and style customization',
      'SEO optimization suggestions',
      'Content history and versioning',
      'Team collaboration features',
    ],
    challenges: [
      {
        problem: 'API rate limiting and costs',
        solution: 'Implemented smart caching and request batching to optimize API usage',
      },
      {
        problem: 'Content quality consistency',
        solution: 'Fine-tuned prompts and added quality scoring system',
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
