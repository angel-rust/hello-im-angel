# DEPLOYMENT GUIDE - Angel Medina Portfolio

## CURRENT STATUS

**PROJECT**: Hello, I'm Angel
**DOMAIN**: angelmedina.io
**TECH STACK**: Next.js 15 + TypeScript + React Three Fiber + Rust + Axum

## COMPLETED

### Frontend
- [x] Next.js 15 initialized with TypeScript
- [x] React Three Fiber configured
- [x] 3D Hero scene with geometric shapes
- [x] Custom color scheme (Black, Forest Green, Crimson Maroon)
- [x] Responsive navigation
- [x] Hero section with animations
- [x] Production build successful (386 KB First Load JS)

### Backend
- [x] Rust + Axum server
- [x] CORS configured
- [x] Health check endpoint
- [x] Projects API endpoint
- [x] Successful compilation

### Project Structure
- [x] Organized component structure
- [x] Type safety with TypeScript
- [x] Tailwind CSS configured
- [x] Git repository initialized

## DEPLOYMENT STEPS

### Step 1: Push to GitHub

```bash
cd ~/Desktop/hello-im-angel
git commit -m "Initial commit: 3D portfolio with Next.js and Rust backend"
git branch -M main
git remote add origin https://github.com/angel-rust/hello-im-angel.git
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

**Via Vercel CLI:**
```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

**Via Vercel Dashboard:**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub: `angel-rust/hello-im-angel`
4. Set root directory: `frontend`
5. Click "Deploy"

### Step 3: Configure Custom Domain

**In Vercel Dashboard:**
1. Go to Project Settings
2. Navigate to Domains
3. Add custom domain: `angelmedina.io`
4. Follow DNS configuration instructions

**DNS Records Required:**
```
Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Deploy Backend (Future)

**Options:**
- Fly.io
- Railway
- AWS EC2

**For now**: Backend can run locally or skip until needed

## VERCEL CONFIGURATION

### Environment Variables

Create `.env.local` in frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Production:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.fly.dev
```

### Build Settings

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Root Directory: `frontend`

## PERFORMANCE TARGETS

**Current Status:**
- First Load JS: 386 KB
- Bundle Size: Optimized
- 3D Scene: Rendering successfully

**Goals:**
- Lighthouse Performance: >95
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

## NEXT STEPS

1. Create GitHub repository
2. Push code to GitHub
3. Connect Vercel to repository
4. Configure angelmedina.io domain
5. Test production deployment
6. Add more portfolio sections
7. Integrate GitHub API for projects
8. Add contact form with Resend MCP

## TROUBLESHOOTING

### Build Fails
```bash
cd frontend
npm install
npm run build
```

### 3D Scene Not Rendering
- Check WebGL support
- Verify React Three Fiber imports
- Check console for errors

### Domain Not Resolving
- Wait 24-48 hours for DNS propagation
- Verify DNS records in domain registrar
- Check Vercel domain configuration

## MONITORING

### Frontend (Vercel)
- Automatic monitoring included
- View analytics at vercel.com/dashboard
- Track Web Vitals automatically

### Backend (Future)
- Add logging with tracing
- Monitor API response times
- Track error rates

## SUCCESS CRITERIA

- [ ] GitHub repository created
- [ ] Frontend deployed to Vercel
- [ ] angelmedina.io domain configured
- [ ] 3D scene renders on all devices
- [ ] Navigation works
- [ ] Performance metrics met
- [ ] Zero console errors

## CONTACT

**Developer**: Angel Medina
**GitHub**: https://github.com/angel-rust
**Email**: hello@angelmedina.io
