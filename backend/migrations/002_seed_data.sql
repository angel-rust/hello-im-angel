-- Seed initial data for Angel Medina Portfolio

-- Seed skills
INSERT INTO skills (name, category, proficiency, icon, order_index) VALUES
-- Frontend
('React', 'Frontend', 95, 'react', 1),
('Next.js', 'Frontend', 90, 'nextjs', 2),
('TypeScript', 'Frontend', 90, 'typescript', 3),
('Tailwind CSS', 'Frontend', 95, 'tailwind', 4),
('Three.js', 'Frontend', 85, 'threejs', 5),
('Framer Motion', 'Frontend', 80, 'framer', 6),

-- Backend
('Rust', 'Backend', 85, 'rust', 1),
('Node.js', 'Backend', 90, 'nodejs', 2),
('PostgreSQL', 'Backend', 85, 'postgresql', 3),
('Axum', 'Backend', 80, 'axum', 4),
('REST APIs', 'Backend', 90, 'api', 5),

-- Tools & DevOps
('Git', 'Tools & DevOps', 95, 'git', 1),
('Docker', 'Tools & DevOps', 80, 'docker', 2),
('Vercel', 'Tools & DevOps', 90, 'vercel', 3),
('GitHub Actions', 'Tools & DevOps', 75, 'github', 4),

-- 3D & Graphics
('React Three Fiber', '3D & Graphics', 85, 'r3f', 1),
('WebGL', '3D & Graphics', 75, 'webgl', 2),
('Blender', '3D & Graphics', 70, 'blender', 3),
('GSAP', '3D & Graphics', 80, 'gsap', 4)
ON CONFLICT DO NOTHING;

-- Seed initial projects (will be synced from GitHub later)
INSERT INTO projects (title, description, github_url, live_url, tech_stack, year, featured) VALUES
(
    'hello-im-angel',
    '3D interactive portfolio website built with Next.js 15, React Three Fiber, and Rust backend with PostgreSQL.',
    'https://github.com/angel-rust/hello-im-angel',
    'https://angelmedina.io',
    ARRAY['Next.js', 'TypeScript', 'Three.js', 'Rust', 'PostgreSQL', 'Tailwind CSS'],
    2024,
    true
)
ON CONFLICT DO NOTHING;
