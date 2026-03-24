import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic())

// Local paths for images and videos (served from /static/media/)
const media = {
  // Navy Suit
  navyOriginal: '/static/media/navy-suit-1.jpg',
  navyEnhanced: '/static/media/navy-suit-2.jpg',
  navyVideo: '/static/media/navy-walk.mp4',
  // Cream Suit  
  creamOriginal: '/static/media/cream-suit-1.jpg',
  creamEnhanced: '/static/media/cream-suit-2.jpg',
  creamVideo: '/static/media/cream-walk.mp4'
}

// Main page - 5th Ave Fashion style
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5th Ave Fashion Content Studio</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --ss-black: #1a1a1a;
            --ss-dark: #2d2d2d;
            --ss-gray: #767676;
            --ss-light-gray: #f5f5f5;
            --ss-white: #ffffff;
            --ss-accent: #c9a961;
            --ss-navy: #1e3a5f;
            --ss-cream: #f5f0e8;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--ss-white);
            color: var(--ss-black);
            line-height: 1.6;
        }

        /* Navigation */
        .nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: var(--ss-white);
            z-index: 1000;
            border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .nav-inner {
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 72px;
        }

        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ss-black);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 40px;
        }

        .nav-links a {
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--ss-black);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .nav-links a:hover {
            color: var(--ss-gray);
        }

        .nav-badge {
            background: var(--ss-accent);
            color: var(--ss-white);
            font-size: 9px;
            padding: 3px 8px;
            border-radius: 2px;
            margin-left: 8px;
            font-weight: 600;
        }

        /* Hero Section */
        .hero {
            margin-top: 72px;
            padding: 80px 60px;
            background: linear-gradient(135deg, var(--ss-cream) 0%, var(--ss-white) 100%);
            text-align: center;
        }

        .hero-tag {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--ss-accent);
            margin-bottom: 16px;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 16px;
            color: var(--ss-black);
        }

        .hero-subtitle {
            font-size: 16px;
            color: var(--ss-gray);
            max-width: 600px;
            margin: 0 auto;
            font-weight: 300;
        }

        /* Section Styles */
        .section {
            padding: 80px 60px;
        }

        .section-dark {
            background: var(--ss-black);
            color: var(--ss-white);
        }

        .section-cream {
            background: var(--ss-cream);
        }

        .section-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }

        .section-tag {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--ss-accent);
            margin-bottom: 12px;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 12px;
        }

        .section-subtitle {
            font-size: 15px;
            color: var(--ss-gray);
            font-weight: 300;
        }

        .section-dark .section-subtitle {
            color: rgba(255,255,255,0.6);
        }

        /* Product Row - Original → Enhanced → Video */
        .product-row {
            max-width: 1400px;
            margin: 0 auto 80px;
        }

        .product-row:last-child {
            margin-bottom: 0;
        }

        .product-row-title {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            text-align: center;
            margin-bottom: 40px;
            color: var(--ss-black);
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }

        .comparison-item {
            background: var(--ss-white);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        }

        .comparison-media {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--ss-light-gray);
        }

        .comparison-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .comparison-media video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }

        .comparison-label {
            position: absolute;
            top: 16px;
            left: 16px;
            padding: 8px 16px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 2px;
        }

        .label-original {
            background: var(--ss-dark);
            color: var(--ss-white);
        }

        .label-enhanced {
            background: var(--ss-accent);
            color: var(--ss-white);
        }

        .label-video {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: var(--ss-white);
        }

        .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70px;
            height: 70px;
            background: rgba(255,255,255,0.95);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .play-button:hover {
            transform: translate(-50%, -50%) scale(1.1);
            background: var(--ss-white);
        }

        .play-button i {
            font-size: 24px;
            color: var(--ss-black);
            margin-left: 4px;
        }

        .play-button.playing i:before {
            content: "\\f04c";
        }

        .comparison-info {
            padding: 20px;
            text-align: center;
        }

        .comparison-type {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ss-gray);
            margin-bottom: 6px;
        }

        .comparison-title {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
        }

        /* Arrow between items */
        .arrow-connector {
            display: none;
        }

        /* Features Section */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature-card {
            text-align: center;
            padding: 40px 30px;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
        }

        .feature-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ss-accent);
            border-radius: 50%;
            font-size: 24px;
            color: var(--ss-white);
        }

        .feature-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            margin-bottom: 10px;
        }

        .feature-desc {
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            line-height: 1.7;
        }

        /* CTA Section */
        .cta-section {
            text-align: center;
            background: linear-gradient(135deg, var(--ss-navy) 0%, var(--ss-black) 100%);
            color: var(--ss-white);
            padding: 100px 60px;
        }

        .cta-title {
            font-family: 'Playfair Display', serif;
            font-size: 40px;
            margin-bottom: 16px;
        }

        .cta-text {
            font-size: 16px;
            color: rgba(255,255,255,0.7);
            margin-bottom: 30px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--ss-white);
            color: var(--ss-black);
            padding: 16px 32px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background: var(--ss-cream);
            transform: translateY(-2px);
        }

        /* Footer */
        .footer {
            background: var(--ss-black);
            color: var(--ss-white);
            padding: 60px;
            text-align: center;
        }

        .footer-brand {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }

        .footer-text {
            font-size: 13px;
            color: rgba(255,255,255,0.5);
            max-width: 500px;
            margin: 0 auto;
        }

        /* AI Gallery Grid */
        .gallery-section {
            padding: 80px 60px;
            background: var(--ss-cream);
        }

        .gallery-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .gallery-item {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 8px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .gallery-item:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 50px rgba(0,0,0,0.15);
        }

        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }

        .gallery-item:hover img {
            transform: scale(1.05);
        }

        .gallery-item-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 6px 12px;
            background: var(--ss-accent);
            color: var(--ss-white);
            border-radius: 2px;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        /* Lightbox */
        .lightbox {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.95);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 40px;
        }

        .lightbox.active {
            display: flex;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 4px;
        }

        .lightbox-close {
            position: absolute;
            top: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: rgba(255,255,255,0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .lightbox-close:hover {
            background: rgba(255,255,255,0.2);
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .comparison-grid {
                grid-template-columns: 1fr;
                max-width: 400px;
                margin: 0 auto;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
            .gallery-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero-title {
                font-size: 32px;
            }
            .section {
                padding: 60px 30px;
            }
            .section-title {
                font-size: 28px;
            }
            .gallery-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }
            .gallery-section {
                padding: 60px 30px;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-inner">
            <a href="/" class="logo">5th Ave Fashion</a>
            <div class="nav-links">
                <a href="#showcase">AI Showcase<span class="nav-badge">New</span></a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-tag">5th Ave Fashion Content Studio</div>
        <h1 class="hero-title">AI-Powered Content for Fashion Brands</h1>
        <p class="hero-subtitle">See how AI transforms static product photography into enhanced visuals, dynamic 360° videos, and scroll-stopping social content.</p>
    </section>

    <!-- Product Showcase Section -->
    <section id="showcase" class="section">
        <div class="section-header">
            <div class="section-tag">AI Transformation</div>
            <h2 class="section-title">Original → AI Enhanced → AI Video</h2>
            <p class="section-subtitle">Watch how we take original product photography and transform it into enhanced imagery and moving content.</p>
        </div>

        <!-- Navy Birdseye Suit Row -->
        <div class="product-row">
            <h3 class="product-row-title">Charcoal Slim-Fit Suit</h3>
            <div class="comparison-grid">
                <!-- Original -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <img src="${media.navyOriginal}" alt="Navy Suit Original">
                        <span class="comparison-label label-original">Original</span>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">Source Image</div>
                        <div class="comparison-title">Product Photography</div>
                    </div>
                </div>

                <!-- AI Enhanced -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <img src="${media.navyEnhanced}" alt="Navy Suit AI Enhanced">
                        <span class="comparison-label label-enhanced">AI Enhanced</span>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">Enhanced Image</div>
                        <div class="comparison-title">Color & Detail Optimization</div>
                    </div>
                </div>

                <!-- AI Video -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <video id="navy-video" loop muted playsinline preload="metadata">
                            <source src="${media.navyVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">AI Video</span>
                        <div class="play-button" onclick="toggleVideo('navy-video', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">360° Video</div>
                        <div class="comparison-title">AI-Generated Motion</div>
                    </div>
                </div>
            </div>

            <!-- Navy AI Generated Gallery -->
            <div class="gallery-inline" style="margin-top: 40px;">
                <h4 style="font-family: 'Playfair Display', serif; font-size: 20px; text-align: center; margin-bottom: 24px; color: var(--ss-gray);">AI Generated Collection</h4>
                <div class="gallery-grid">
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-1.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-1.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-2.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-2.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-3.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-3.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-4.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-4.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-5.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-5.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-6.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-6.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-7.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-7.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-8.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-8.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/navy-gallery/navy-ai-9.jpg')">
                        <img src="/static/media/navy-gallery/navy-ai-9.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Ivory/Cream Suit Row -->
        <div class="product-row">
            <h3 class="product-row-title">Cream Linen Two-Piece Suit</h3>
            <div class="comparison-grid">
                <!-- Original -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <img src="${media.creamOriginal}" alt="Ivory Suit Original">
                        <span class="comparison-label label-original">Original</span>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">Source Image</div>
                        <div class="comparison-title">Product Photography</div>
                    </div>
                </div>

                <!-- AI Enhanced -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <img src="${media.creamEnhanced}" alt="Ivory Suit AI Enhanced">
                        <span class="comparison-label label-enhanced">AI Enhanced</span>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">Enhanced Image</div>
                        <div class="comparison-title">Lighting & Background</div>
                    </div>
                </div>

                <!-- AI Video -->
                <div class="comparison-item">
                    <div class="comparison-media">
                        <video id="cream-video" loop muted playsinline preload="metadata">
                            <source src="${media.creamVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">AI Video</span>
                        <div class="play-button" onclick="toggleVideo('cream-video', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="comparison-info">
                        <div class="comparison-type">360° Video</div>
                        <div class="comparison-title">AI-Generated Motion</div>
                    </div>
                </div>
            </div>

            <!-- Ivory AI Generated Gallery -->
            <div class="gallery-inline" style="margin-top: 40px;">
                <h4 style="font-family: 'Playfair Display', serif; font-size: 20px; text-align: center; margin-bottom: 24px; color: var(--ss-gray);">AI Generated Collection</h4>
                <div class="gallery-grid">
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-1.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-1.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-2.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-2.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-3.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-3.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-4.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-4.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-5.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-5.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-6.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-6.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-7.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-7.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-8.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-8.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                    <div class="gallery-item" onclick="openLightbox('/static/media/ivory-gallery/ivory-ai-9.jpg')">
                        <img src="/static/media/ivory-gallery/ivory-ai-9.jpg" alt="AI Generated Image">
                        <span class="gallery-item-badge">AI Generated Image</span>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">
            <i class="fas fa-times"></i>
        </button>
        <img id="lightbox-img" src="" alt="Enlarged view">
    </div>

    <!-- Features Section -->
    <section id="features" class="section section-dark">
        <div class="section-header">
            <div class="section-tag">AI Capabilities</div>
            <h2 class="section-title">What AI Can Create</h2>
            <p class="section-subtitle">Transform your content strategy with powerful AI tools.</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-image"></i>
                </div>
                <h3 class="feature-title">Image Enhancement</h3>
                <p class="feature-desc">Automatic background optimization, color correction, and detail enhancement while maintaining brand consistency.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-video"></i>
                </div>
                <h3 class="feature-title">Video Generation</h3>
                <p class="feature-desc">Create 360° product rotations and lifestyle videos from static images with smooth, professional motion.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-share-alt"></i>
                </div>
                <h3 class="feature-title">Social Content</h3>
                <p class="feature-desc">Generate platform-optimized content for Instagram, TikTok, and YouTube automatically.</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="cta-section">
        <div class="section-tag">Get Started</div>
        <h2 class="cta-title">Ready to Upgrade Your Fashion Content?</h2>
        <p class="cta-text">AI-powered product visuals, video, and social content — built for fashion brands ready to move faster.</p>
        <a href="#" class="btn-primary">
            <span>Get Started</span>
            <i class="fas fa-arrow-right"></i>
        </a>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-brand">5th Ave Fashion</div>
        <p class="footer-text">This is a demonstration page showcasing AI-powered content creation capabilities. All imagery and video content is used for demonstration purposes.</p>
    </footer>

    <script>
        function toggleVideo(videoId, button) {
            const video = document.getElementById(videoId);
            if (video.paused) {
                video.play();
                button.classList.add('playing');
                button.querySelector('i').classList.remove('fa-play');
                button.querySelector('i').classList.add('fa-pause');
            } else {
                video.pause();
                button.classList.remove('playing');
                button.querySelector('i').classList.remove('fa-pause');
                button.querySelector('i').classList.add('fa-play');
            }
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Lightbox functions
        function openLightbox(imgSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close lightbox on background click
        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Close lightbox on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    </script>
</body>
</html>
  `)
})

// API endpoint
app.get('/api/content', (c) => {
  return c.json({
    products: [
      {
        name: 'Charcoal Slim-Fit Suit',
        original: media.navyOriginal,
        enhanced: media.navyEnhanced,
        video: media.navyVideo
      },
      {
        name: 'Cream Linen Two-Piece Suit',
        original: media.creamOriginal,
        enhanced: media.creamEnhanced,
        video: media.creamVideo
      }
    ]
  })
})

export default app
