# Suitsupply AI Content Studio Demo

## Project Overview
- **Name**: Suitsupply AI Content Studio
- **Goal**: Demonstrate AI-powered content creation capabilities for luxury fashion brands
- **Purpose**: Showcase how AI can enhance product videos, images, and social media content

## Live Preview
- **Sandbox URL**: https://3000-i5ywrdzigr2368wd7cpla-5c13a017.sandbox.novita.ai

## Features

### ✅ Currently Implemented
1. **Hero Section** - Full-viewport hero with embedded product video
2. **360° Video Showcase** - Side-by-side video comparison (Original vs AI-Enhanced)
3. **Product Gallery** - 4-card grid with AI enhancement badges
4. **AI Features Section** - 3 feature cards highlighting capabilities
5. **Statistics Display** - Key metrics (10x faster, 70% cost reduction)
6. **Social Content Grid** - 6-item responsive grid with platform overlays
7. **CTA Section** - Call-to-action for demo scheduling
8. **Footer** - Full site footer with navigation links

### API Endpoints
| Path | Method | Description |
|------|--------|-------------|
| `/` | GET | Main demo page |
| `/api/content` | GET | JSON data for images, videos, and features |

## Assets Used

### Images (4 product shots)
- Cream/Ivory Three-Piece Suit (2 angles)
- Navy Birdseye Suit (2 angles)

### Videos (2 360° rotations)
- Ivory suit 360° walkthrough (~10s)
- Navy suit 360° walkthrough (~10s)

## Design System

### Colors (Matching Suitsupply)
- **Black**: #1a1a1a
- **Gray**: #767676
- **Cream**: #f5f0e8
- **Accent Gold**: #c9a961
- **Navy**: #1e3a5f

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Style Notes
- Minimalist, high-end luxury aesthetic
- Clean white backgrounds
- Subtle shadows and hover effects
- Responsive design (mobile-friendly)

## Tech Stack
- **Framework**: Hono (TypeScript)
- **Platform**: Cloudflare Pages
- **Build**: Vite
- **Styling**: Custom CSS (no frameworks)
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Icons**: Font Awesome 6

## Local Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start dev server
npm run preview
# or
npx wrangler pages dev dist --port 3000
```

## Deployment

```bash
# Build and deploy to Cloudflare Pages
npm run build
npx wrangler pages deploy dist --project-name suitsupply-ai-demo
```

## Recommended Next Steps

### Short Term
1. Add interactive before/after image comparison slider
2. Implement video player controls (play/pause, progress bar)
3. Add lightbox for product images
4. Create mobile hamburger menu

### Medium Term
1. Add AI image generation demo (live transformation)
2. Implement virtual try-on mockup
3. Add social sharing functionality
4. Create A/B testing variants

### Long Term
1. Integrate real AI APIs for live demonstrations
2. Add user authentication for personalized demos
3. Build admin panel for content management
4. Implement analytics tracking

## Project Structure
```
webapp/
├── src/
│   └── index.tsx          # Main Hono application
├── public/                 # Static assets
├── dist/                   # Build output
├── ecosystem.config.cjs    # PM2 configuration
├── wrangler.jsonc          # Cloudflare config
├── vite.config.ts          # Vite build config
└── package.json
```

## Notes
- This is a **demonstration page** for pitch/presentation purposes
- All imagery used for demonstration only
- Designed to match Suitsupply's brand aesthetic closely
- Content showcases AI capabilities without actual AI processing (static demo)

---
**Last Updated**: January 2026
**Status**: ✅ Active Development
