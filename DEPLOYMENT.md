# KizunaBot Japanese Frontend Deployment Guide

## Vercel Deployment Configuration

### Build Settings:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `kizunafront-jp`

### Environment Variables Required:
```
VITE_BACKEND_URL=https://kinzubackend-1.onrender.com
VITE_API_URL=https://kinzubackend-1.onrender.com
```

### Deployment Steps:

1. **Connect to Vercel:**
   - Go to https://vercel.com
   - Connect your GitHub repository
   - Select the `kizunafront-jp` directory as root

2. **Set Environment Variables:**
   - In Vercel dashboard, go to Project Settings > Environment Variables
   - Add: `VITE_BACKEND_URL` = `https://kinzubackend-1.onrender.com`
   - Add: `VITE_API_URL` = `https://kinzubackend-1.onrender.com`

3. **Deploy:**
   - Vercel will automatically deploy on every push to main branch

### Custom Domain (Optional):
- Add custom domain in Vercel dashboard
- Configure DNS settings as instructed

## Local Development Setup

1. Create `.env.local` file in `kizunafront-jp` directory:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000
```

2. Install dependencies:
```bash
cd kizunafront-jp
npm install
```

3. Run development server:
```bash
npm run dev
```

## Features
- Japanese language support
- Audio analysis interface
- User authentication
- Recording history
- Gemini AI insights

## Dependencies
- React 19
- Vite 6
- Tailwind CSS 4
- React Router DOM
- Heroicons 