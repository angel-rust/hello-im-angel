# Angel Medina - Portfolio

> Personal portfolio website built with Rust, Axum, Tera, HTMX, and Three.js

[![Built with Rust](https://img.shields.io/badge/Built%20with-Rust-CE422B?style=flat&logo=rust)](https://www.rust-lang.org/)
[![Powered by Axum](https://img.shields.io/badge/Powered%20by-Axum-00A3FF?style=flat)](https://github.com/tokio-rs/axum)
[![HTMX](https://img.shields.io/badge/HTMX-2.0-blue?style=flat)](https://htmx.org/)

## 🚀 Tech Stack

- **Backend**: Rust with Axum web framework
- **Templating**: Tera (Jinja2-like)
- **Frontend**: HTMX for dynamic islands, TypeScript, Three.js
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with SQLX
- **Deployment**: Fly.io

## 🛠️ Development

### Prerequisites

- Rust (1.75+)
- Node.js (20+)
- PostgreSQL (15+)
- Docker (optional, for deployment)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/angel-rust/hello-im-angel.git
   cd hello-im-angel
   ```

2. **Install dependencies**
   ```bash
   # Install Rust dependencies
   cargo build

   # Install Node dependencies
   npm install
   ```

3. **Set up database**
   ```bash
   # Create database
   createdb angel_portfolio

   # Copy environment file
   cp .env.example .env

   # Update DATABASE_URL in .env
   # DATABASE_URL=postgresql://user:password@localhost:5432/angel_portfolio
   ```

4. **Run migrations**
   ```bash
   sqlx migrate run
   ```

5. **Build frontend assets**
   ```bash
   npm run build
   ```

### Running Locally

```bash
# Development mode with hot-reload
npm run dev

# Or run separately:
npm run watch:css    # Terminal 1
npm run watch:js     # Terminal 2
cargo watch -x run   # Terminal 3
```

The application will be available at `http://localhost:8080`

## 📦 Building for Production

```bash
# Build frontend assets
npm run build

# Build Rust binary
cargo build --release

# Or use Docker
docker build -t angel-portfolio .
docker run -p 8080:8080 angel-portfolio
```

## 🚢 Deployment

### Fly.io Deployment

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly**
   ```bash
   fly auth login
   ```

3. **Create app** (first time only)
   ```bash
   fly launch
   ```

4. **Set secrets**
   ```bash
   fly secrets set DATABASE_URL="postgresql://..."
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Custom domain**
   ```bash
   fly certs add angelmedina.io
   fly certs add www.angelmedina.io
   ```

   Then update DNS:
   - A record: `@` → Fly.io IP
   - CNAME: `www` → `<app-name>.fly.dev`

## 📁 Project Structure

```
angel-portfolio/
├── src/
│   ├── main.rs              # Axum server entry point
│   ├── models.rs            # Database models
│   └── handlers/            # Route handlers
│       ├── pages.rs         # Page routes
│       └── contact.rs       # Contact form handler
├── static/
│   ├── css/
│   │   ├── input.css        # Tailwind source
│   │   └── output.css       # Compiled CSS (git-ignored)
│   └── js/
│       ├── main.ts          # TypeScript entry + Three.js scene
│       └── bundle.js        # Compiled JS (git-ignored)
├── templates/
│   ├── base.html            # Base layout
│   ├── components/          # Reusable components
│   │   ├── nav.html
│   │   └── footer.html
│   └── pages/               # Page templates
│       ├── index.html       # Homepage
│       ├── about.html
│       ├── projects.html
│       └── contact.html
├── migrations/              # SQLX database migrations
├── Dockerfile
├── fly.toml
├── Cargo.toml
├── package.json
└── tailwind.config.js
```

## ✨ Features

- **Blazingly Fast**: Built with Rust for maximum performance
- **3D Graphics**: Lightweight Three.js scene optimized for mobile
- **Server-Side Rendering**: Tera templates for fast initial load
- **Progressive Enhancement**: HTMX for dynamic interactions without heavy JS
- **Responsive Design**: Mobile-first Tailwind CSS
- **Contact Form**: HTMX-powered form with PostgreSQL storage
- **SEO Optimized**: Semantic HTML and proper meta tags

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🤝 Connect

- GitHub: [@angel-rust](https://github.com/angel-rust)
- LinkedIn: [Angel Medina](https://www.linkedin.com/in/angelmedina-rust)
- Website: [angelmedina.io](https://angelmedina.io)

---

Built with ❤️ using Rust + Axum + Tera + HTMX
