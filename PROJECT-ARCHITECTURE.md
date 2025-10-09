# ANGEL MEDINA PORTFOLIO - TECHNICAL ARCHITECTURE

## PROJECT OVERVIEW

**Domain**: angelmedina.io
**Type**: 3D Interactive Portfolio Website
**Status**: Production-Ready Development
**Target**: Cross-device (Desktop, iOS, Android)

## COLOR SCHEME

```
Primary:   #000000 (Black)
Accent 1:  #228B22 (Forest Green)
Accent 2:  #800020 (Crimson Maroon)
Neutral:   #D3D3D3 (Light Gray)
```

## INSPIRATION & BENCHMARKS

**Bruno Simon Portfolio**
- Award-winning Site of the Month
- Key Performance Optimizations:
  - No real lights/shadows (uses matcaps)
  - VAO optimization (reduced WebGL calls)
  - Pixel ratio clamping
  - Matrix auto-update disabled
  - Physics with Cannon.js

**Modern Best Practices**
- React Three Fiber for declarative 3D
- GSAP for smooth animations
- Drei for Three.js helpers
- Lazy loading for 3D models
- Progressive enhancement

## TECH STACK

### Frontend
```
Framework:     Next.js 15 (App Router)
Language:      TypeScript 5.x
3D Engine:     Three.js via React Three Fiber
3D Helpers:    @react-three/drei
Animation:     GSAP 3.x + Framer Motion
Styling:       Tailwind CSS 4.x
State:         Zustand (if needed)
Forms:         React Hook Form
Validation:    Zod
```

### Backend
```
Language:      Rust 1.90.0
Framework:     Axum 0.7
Database:      PostgreSQL (existing: claude_workspace)
ORM:           SQLx
Auth:          JWT via jsonwebtoken
CORS:          tower-http
Serialization: Serde
```

### Deployment
```
Frontend:      Vercel (existing account configured)
Backend:       Fly.io or Railway
Database:      Existing PostgreSQL localhost (migrate to cloud)
CDN:           Vercel Edge Network
Domain:        angelmedina.io (via Vercel)
```

### MCP Integration
```
GitHub MCP:    Portfolio project fetching
Vercel MCP:    Deployment automation
PostgreSQL:    Resume/project data storage
Resend MCP:    Contact form emails
```

## PROJECT STRUCTURE

```
hello-im-angel/
├── frontend/                          Next.js application
│   ├── app/
│   │   ├── layout.tsx                Root layout
│   │   ├── page.tsx                  Home with 3D scene
│   │   ├── about/
│   │   ├── projects/
│   │   ├── resume/
│   │   └── contact/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Scene.tsx             Main 3D scene
│   │   │   ├── Hero3D.tsx            Hero 3D element
│   │   │   ├── ProjectCard3D.tsx     3D project cards
│   │   │   └── Background3D.tsx      Animated background
│   │   ├── ui/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Button.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ProjectsSection.tsx
│   │       ├── SkillsSection.tsx
│   │       └── ContactSection.tsx
│   ├── lib/
│   │   ├── api.ts                    Backend API client
│   │   ├── github.ts                 GitHub API wrapper
│   │   └── utils.ts
│   ├── public/
│   │   ├── models/                   3D models (.gltf, .glb)
│   │   ├── textures/
│   │   └── fonts/
│   ├── styles/
│   │   └── globals.css
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                           Rust API server
│   ├── src/
│   │   ├── main.rs                   Entry point
│   │   ├── api/
│   │   │   ├── mod.rs
│   │   │   ├── projects.rs           Project endpoints
│   │   │   ├── resume.rs             Resume endpoints
│   │   │   └── contact.rs            Contact form handler
│   │   ├── models/
│   │   │   ├── mod.rs
│   │   │   ├── project.rs
│   │   │   └── resume.rs
│   │   ├── db/
│   │   │   ├── mod.rs
│   │   │   └── pool.rs               PostgreSQL pool
│   │   └── config.rs                 Configuration
│   ├── migrations/                   SQLx migrations
│   ├── Cargo.toml
│   └── .env.example
├── docs/
│   ├── API.md                        API documentation
│   ├── DEPLOYMENT.md                 Deployment guide
│   └── PERFORMANCE.md                Optimization notes
└── README.md
```

## PERFORMANCE OPTIMIZATIONS

### 3D Graphics
```
1. Matcaps instead of real-time lighting
2. Low-poly models (<10k triangles)
3. Texture compression (Basis Universal)
4. Instanced rendering for repeated elements
5. Level of Detail (LOD) for models
6. Frustum culling enabled
7. Pixel ratio clamped to max 2
8. Request Animation Frame optimization
```

### Loading Strategy
```
1. Critical CSS inlined
2. 3D models lazy loaded
3. Route-based code splitting
4. Image optimization (Next.js Image)
5. Font subsetting
6. Service Worker for offline support
7. Progressive Web App (PWA) capable
```

### Bundle Size Targets
```
First Load JS:     < 100 KB
Total Bundle:      < 500 KB
3D Models:         < 2 MB total
First Paint:       < 1.5s
Time to Interactive: < 3s
Lighthouse Score:  > 95
```

## API ARCHITECTURE

### Endpoints

**Projects API**
```
GET  /api/projects           List all projects
GET  /api/projects/:id       Get project details
POST /api/projects/sync      Sync from GitHub (admin)
```

**Resume API**
```
GET  /api/resume             Get resume data
GET  /api/resume/download    Download PDF
```

**Contact API**
```
POST /api/contact            Submit contact form
```

**Health**
```
GET  /health                 Health check
```

## DATABASE SCHEMA

```sql
-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    tech_stack TEXT[],
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 100),
    icon_url VARCHAR(500)
);

-- Experience table
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255),
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    technologies TEXT[]
);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    subject VARCHAR(255),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45)
);
```

## 3D SCENE DESIGN

### Hero Scene
```
Element:      Floating geometric shapes
Style:        Abstract, minimalist
Animation:    Slow rotation, float on mouse move
Colors:       Black base, green/maroon accents
Interaction:  Mouse parallax, touch responsive
Performance:  <5k triangles total
```

### Project Cards
```
Element:      3D cards with depth
Style:        Material design elevated
Animation:    Flip on hover, smooth transitions
Colors:       Dark glass effect with accent borders
Interaction:  Click to expand, drag to rotate
Performance:  Instanced rendering
```

### Background
```
Element:      Particle field or geometric grid
Style:        Subtle, non-distracting
Animation:    Slow drift, responds to scroll
Colors:       Dark with subtle green/maroon glow
Interaction:  Mouse trail effect
Performance:  GPU particles, <1000 total
```

## RESPONSIVE BREAKPOINTS

```
Mobile:        320px - 768px
Tablet:        768px - 1024px
Desktop:       1024px - 1920px
Ultra-wide:    1920px+
```

### 3D Adjustments by Device
```
Mobile:        Reduced particle count, lower resolution
Tablet:        Medium quality, touch optimized
Desktop:       Full quality, mouse interactions
Ultra-wide:    Enhanced FOV, wider scene
```

## CONTENT SECTIONS

### Home
- Hero with 3D background
- Animated name reveal
- Call-to-action buttons

### About
- Personal introduction
- Skills visualization (3D or animated)
- Technologies proficiency

### Projects
- Grid of project cards with 3D effects
- Filter by technology
- GitHub integration
- Live site links

### Resume
- Interactive timeline
- Downloadable PDF
- Experience details
- Education

### Contact
- Contact form (via Resend MCP)
- Social links
- Email/GitHub/LinkedIn

## GITHUB INTEGRATION

### Data Fetched
```
- Public repositories
- Pinned repositories
- Repository stats (stars, forks)
- Recent commits
- Languages used
- README content
```

### Sync Strategy
```
- Cache GitHub data in PostgreSQL
- Refresh every 6 hours
- Manual sync via admin endpoint
- Fallback to cached data on API failure
```

## DEPLOYMENT WORKFLOW

### Frontend (Vercel)
```
1. Push to main branch
2. Vercel auto-deploys
3. Run build checks
4. Deploy to production
5. Update angelmedina.io DNS
```

### Backend (Fly.io/Railway)
```
1. Build Rust binary
2. Create Docker image
3. Deploy to cloud
4. Run migrations
5. Health check verification
```

### Database
```
1. Migrate from localhost to cloud PostgreSQL
2. Run SQLx migrations
3. Seed initial data
4. Configure connection pooling
```

## SECURITY

### Frontend
```
- Environment variables for API keys
- HTTPS only
- CSP headers
- XSS protection
```

### Backend
```
- CORS whitelist
- Rate limiting
- Input validation (Zod)
- SQL injection prevention (SQLx)
- API key authentication for admin endpoints
```

## MONITORING

### Performance
```
- Vercel Analytics
- Web Vitals tracking
- 3D FPS monitoring
- Bundle size tracking
```

### Errors
```
- Sentry for error tracking
- Backend logging
- API response times
```

## NEXT STEPS

**Phase 1: Foundation**
1. Initialize Next.js project
2. Set up Tailwind with theme
3. Create basic layout

**Phase 2: 3D Integration**
1. Install React Three Fiber
2. Create basic 3D scene
3. Test cross-device rendering

**Phase 3: Backend**
1. Set up Axum server
2. PostgreSQL migrations
3. API endpoints

**Phase 4: Content**
1. Portfolio sections
2. GitHub integration
3. Resume data

**Phase 5: Polish**
1. Animations and interactions
2. Performance optimization
3. Mobile responsiveness

**Phase 6: Deployment**
1. Vercel frontend deployment
2. Backend deployment
3. Domain configuration
4. Production testing

## ESTIMATED TIMELINE

```
Phase 1-2: 2-3 days
Phase 3:   2 days
Phase 4:   2 days
Phase 5:   1-2 days
Phase 6:   1 day

Total: 8-10 days for full production
```

## SUCCESS METRICS

```
- Lighthouse Performance: >95
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cross-device compatibility: 100%
- Zero console errors
- SEO score: >90
```
