import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic())

// Local paths for images and videos (served from /static/media/)
const images = {
  creamSuit1: '/static/media/cream-suit-1.jpg',
  navySuit1: '/static/media/navy-suit-1.jpg',
  creamSuit2: '/static/media/cream-suit-2.jpg',
  navySuit2: '/static/media/navy-suit-2.jpg'
}

const videos = {
  creamWalk: '/static/media/cream-walk.mp4',
  navyWalk: '/static/media/navy-walk.mp4'
}

// Main page - Suitsupply style
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Content Studio | Suitsupply</title>
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
            height: calc(100vh - 72px);
            background: linear-gradient(135deg, var(--ss-cream) 0%, var(--ss-white) 100%);
            display: flex;
            align-items: center;
            padding: 0 80px;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            max-width: 600px;
            z-index: 2;
        }

        .hero-tag {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--ss-accent);
            margin-bottom: 24px;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 64px;
            font-weight: 500;
            line-height: 1.1;
            margin-bottom: 24px;
            color: var(--ss-black);
        }

        .hero-subtitle {
            font-size: 18px;
            color: var(--ss-gray);
            margin-bottom: 40px;
            font-weight: 300;
        }

        .hero-video {
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%);
            width: 400px;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        }

        .hero-video video {
            width: 100%;
            display: block;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: var(--ss-black);
            color: var(--ss-white);
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
            background: var(--ss-dark);
            transform: translateY(-2px);
        }

        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            background: transparent;
            color: var(--ss-black);
            padding: 16px 32px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            border: 1px solid var(--ss-black);
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: 16px;
        }

        .btn-secondary:hover {
            background: var(--ss-black);
            color: var(--ss-white);
        }

        /* Section Styles */
        .section {
            padding: 120px 80px;
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
            margin: 0 auto 80px;
        }

        .section-tag {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--ss-accent);
            margin-bottom: 16px;
        }

        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 500;
            margin-bottom: 20px;
        }

        .section-subtitle {
            font-size: 16px;
            color: var(--ss-gray);
            font-weight: 300;
        }

        .section-dark .section-subtitle {
            color: rgba(255,255,255,0.6);
        }

        /* Video Showcase */
        .video-showcase {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .video-card {
            position: relative;
            background: var(--ss-white);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }

        .video-wrapper {
            position: relative;
            aspect-ratio: 9/16;
            max-height: 600px;
            overflow: hidden;
        }

        .video-wrapper video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .video-label {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0,0,0,0.8);
            color: var(--ss-white);
            padding: 8px 16px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 2px;
        }

        .video-label.ai {
            background: var(--ss-accent);
        }

        .video-info {
            padding: 24px;
        }

        .video-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            margin-bottom: 8px;
        }

        .video-desc {
            font-size: 13px;
            color: var(--ss-gray);
        }

        /* Product Grid */
        .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            max-width: 1400px;
            margin: 0 auto;
        }

        .product-card {
            background: var(--ss-white);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .product-card:hover {
            transform: translateY(-8px);
        }

        .product-image {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--ss-light-gray);
        }

        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .product-card:hover .product-image img {
            transform: scale(1.05);
        }

        .product-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            background: var(--ss-accent);
            color: var(--ss-white);
            padding: 6px 12px;
            font-size: 9px;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .product-info {
            padding: 20px 0;
        }

        .product-name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 6px;
        }

        .product-price {
            font-size: 13px;
            color: var(--ss-gray);
        }

        /* AI Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature-card {
            text-align: center;
            padding: 40px;
            background: rgba(255,255,255,0.05);
            border-radius: 4px;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            background: rgba(255,255,255,0.1);
            transform: translateY(-4px);
        }

        .feature-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--ss-accent);
            border-radius: 50%;
            font-size: 24px;
        }

        .feature-title {
            font-family: 'Playfair Display', serif;
            font-size: 22px;
            margin-bottom: 12px;
        }

        .feature-desc {
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            line-height: 1.7;
        }

        /* Social Content Section */
        .social-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 4px;
        }

        .social-item {
            position: relative;
            aspect-ratio: 1;
            overflow: hidden;
            cursor: pointer;
        }

        .social-item img,
        .social-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .social-item:hover img,
        .social-item:hover video {
            transform: scale(1.1);
        }

        .social-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .social-item:hover .social-overlay {
            opacity: 1;
        }

        .social-icon {
            color: var(--ss-white);
            font-size: 24px;
        }

        /* Stats Section */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
            max-width: 1000px;
            margin: 0 auto;
            text-align: center;
        }

        .stat-item {
            padding: 20px;
        }

        .stat-number {
            font-family: 'Playfair Display', serif;
            font-size: 56px;
            font-weight: 500;
            color: var(--ss-accent);
            margin-bottom: 8px;
        }

        .stat-label {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.6);
        }

        /* CTA Section */
        .cta-section {
            text-align: center;
            background: linear-gradient(135deg, var(--ss-navy) 0%, var(--ss-black) 100%);
            color: var(--ss-white);
        }

        .cta-title {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            margin-bottom: 20px;
        }

        .cta-text {
            font-size: 16px;
            color: rgba(255,255,255,0.7);
            margin-bottom: 40px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        /* Footer */
        .footer {
            background: var(--ss-black);
            color: var(--ss-white);
            padding: 80px;
        }

        .footer-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr repeat(3, 1fr);
            gap: 60px;
        }

        .footer-brand {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 20px;
        }

        .footer-text {
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            line-height: 1.8;
        }

        .footer-title {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 24px;
        }

        .footer-links a {
            display: block;
            font-size: 14px;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            margin-bottom: 12px;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--ss-white);
        }

        .footer-bottom {
            max-width: 1200px;
            margin: 60px auto 0;
            padding-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-copyright {
            font-size: 13px;
            color: rgba(255,255,255,0.4);
        }

        .footer-social {
            display: flex;
            gap: 20px;
        }

        .footer-social a {
            color: rgba(255,255,255,0.6);
            font-size: 18px;
            transition: color 0.3s ease;
        }

        .footer-social a:hover {
            color: var(--ss-white);
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .hero-video {
                width: 320px;
                right: 40px;
            }
            .product-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 992px) {
            .hero {
                flex-direction: column;
                padding: 60px 40px;
                height: auto;
                min-height: calc(100vh - 72px);
            }
            .hero-content {
                text-align: center;
                margin-bottom: 60px;
            }
            .hero-title {
                font-size: 48px;
            }
            .hero-video {
                position: relative;
                right: 0;
                top: 0;
                transform: none;
            }
            .section {
                padding: 80px 40px;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
            .video-showcase {
                grid-template-columns: 1fr;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .social-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            .footer-inner {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero-title {
                font-size: 36px;
            }
            .section-title {
                font-size: 32px;
            }
            .product-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-inner">
            <a href="/" class="logo">Suitsupply</a>
            <div class="nav-links">
                <a href="#video">AI Video<span class="nav-badge">New</span></a>
                <a href="#images">AI Images</a>
                <a href="#features">Features</a>
                <a href="#social">Social</a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-tag">AI Content Studio</div>
            <h1 class="hero-title">Transform Your Fashion Content With AI</h1>
            <p class="hero-subtitle">Create stunning product videos, enhanced imagery, and social media content using cutting-edge AI technology. Elevate your brand's visual storytelling.</p>
            <a href="#video" class="btn-primary">
                <span>Explore Videos</span>
                <i class="fas fa-arrow-right"></i>
            </a>
            <a href="#features" class="btn-secondary">
                <span>Learn More</span>
            </a>
        </div>
        <div class="hero-video">
            <video autoplay muted loop playsinline>
                <source src="${videos.creamWalk}" type="video/mp4">
            </video>
        </div>
    </section>

    <!-- Video Showcase Section -->
    <section id="video" class="section">
        <div class="section-header">
            <div class="section-tag">AI-Powered Video</div>
            <h2 class="section-title">360° Product Videos</h2>
            <p class="section-subtitle">High-end lookbook style content featuring slow pivots, studio lighting, and premium cinematography - all enhanced or generated with AI.</p>
        </div>
        <div class="video-showcase">
            <div class="video-card">
                <div class="video-wrapper">
                    <video autoplay muted loop playsinline>
                        <source src="${videos.creamWalk}" type="video/mp4">
                    </video>
                    <span class="video-label">Original</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">Ivory Three-Piece Suit</h3>
                    <p class="video-desc">Double-breasted peak lapel suit in textured wool-crepe. 360° rotation showcase with high-key studio lighting.</p>
                </div>
            </div>
            <div class="video-card">
                <div class="video-wrapper">
                    <video autoplay muted loop playsinline>
                        <source src="${videos.navyWalk}" type="video/mp4">
                    </video>
                    <span class="video-label ai">AI Enhanced</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">Navy Birdseye Suit</h3>
                    <p class="video-desc">Two-button single-breasted suit in Naples Blue. AI-enhanced color grading and motion smoothing.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Product Images Section -->
    <section id="images" class="section section-cream">
        <div class="section-header">
            <div class="section-tag">AI-Enhanced Photography</div>
            <h2 class="section-title">Product Gallery</h2>
            <p class="section-subtitle">Studio-quality product photography with AI-powered enhancements: background removal, color correction, and model variations.</p>
        </div>
        <div class="product-grid">
            <div class="product-card">
                <div class="product-image">
                    <img src="${images.creamSuit1}" alt="Cream Suit Close-up">
                    <span class="product-badge">AI Optimized</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">Off-White Three-Piece Suit</h3>
                    <p class="product-price">$1,299</p>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="${images.navySuit1}" alt="Navy Suit Close-up">
                    <span class="product-badge">AI Enhanced</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">Navy Birdseye Suit</h3>
                    <p class="product-price">$899</p>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="${images.creamSuit2}" alt="Cream Suit Full View">
                    <span class="product-badge">Original</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">Ivory Double-Breasted Suit</h3>
                    <p class="product-price">$1,499</p>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <img src="${images.navySuit2}" alt="Navy Suit Full View">
                    <span class="product-badge">AI Styled</span>
                </div>
                <div class="product-info">
                    <h3 class="product-name">Classic Navy Two-Piece</h3>
                    <p class="product-price">$999</p>
                </div>
            </div>
        </div>
    </section>

    <!-- AI Features Section -->
    <section id="features" class="section section-dark">
        <div class="section-header">
            <div class="section-tag">AI Capabilities</div>
            <h2 class="section-title">What AI Can Create</h2>
            <p class="section-subtitle">Transform your content strategy with powerful AI tools designed for luxury fashion brands.</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-video"></i>
                </div>
                <h3 class="feature-title">AI Video Generation</h3>
                <p class="feature-desc">Create 360° product rotations, lifestyle videos, and runway content. AI handles smooth motion, perfect lighting, and professional cinematography.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-image"></i>
                </div>
                <h3 class="feature-title">Image Enhancement</h3>
                <p class="feature-desc">Automatic background removal, color correction, model variations, and virtual try-on capabilities. Maintain brand consistency at scale.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-share-alt"></i>
                </div>
                <h3 class="feature-title">Social Content</h3>
                <p class="feature-desc">Generate Instagram posts, TikTok videos, and Stories automatically. AI adapts content for each platform's optimal dimensions and style.</p>
            </div>
        </div>
        
        <!-- Stats -->
        <div class="stats-grid" style="margin-top: 80px;">
            <div class="stat-item">
                <div class="stat-number">10x</div>
                <div class="stat-label">Faster Production</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">70%</div>
                <div class="stat-label">Cost Reduction</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">∞</div>
                <div class="stat-label">Variations</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Content Generation</div>
            </div>
        </div>
    </section>

    <!-- Social Media Content Section -->
    <section id="social" class="section">
        <div class="section-header">
            <div class="section-tag">Social Ready</div>
            <h2 class="section-title">AI-Generated Social Content</h2>
            <p class="section-subtitle">From product stills to engaging video clips, AI creates scroll-stopping content for every platform.</p>
        </div>
        <div class="social-grid">
            <div class="social-item">
                <img src="${images.creamSuit1}" alt="Social content">
                <div class="social-overlay">
                    <i class="fab fa-instagram social-icon"></i>
                </div>
            </div>
            <div class="social-item">
                <video autoplay muted loop playsinline>
                    <source src="${videos.creamWalk}" type="video/mp4">
                </video>
                <div class="social-overlay">
                    <i class="fab fa-tiktok social-icon"></i>
                </div>
            </div>
            <div class="social-item">
                <img src="${images.navySuit1}" alt="Social content">
                <div class="social-overlay">
                    <i class="fab fa-instagram social-icon"></i>
                </div>
            </div>
            <div class="social-item">
                <img src="${images.creamSuit2}" alt="Social content">
                <div class="social-overlay">
                    <i class="fab fa-facebook social-icon"></i>
                </div>
            </div>
            <div class="social-item">
                <video autoplay muted loop playsinline>
                    <source src="${videos.navyWalk}" type="video/mp4">
                </video>
                <div class="social-overlay">
                    <i class="fab fa-youtube social-icon"></i>
                </div>
            </div>
            <div class="social-item">
                <img src="${images.navySuit2}" alt="Social content">
                <div class="social-overlay">
                    <i class="fab fa-instagram social-icon"></i>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
        <div class="section-tag">Get Started</div>
        <h2 class="cta-title">Ready to Transform Your Content?</h2>
        <p class="cta-text">Partner with us to bring AI-powered content creation to your fashion brand. Scale your visual storytelling without limits.</p>
        <a href="#" class="btn-primary">
            <span>Schedule Demo</span>
            <i class="fas fa-calendar"></i>
        </a>
        <a href="#" class="btn-secondary" style="border-color: rgba(255,255,255,0.3); color: var(--ss-white);">
            <span>Contact Us</span>
        </a>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-inner">
            <div>
                <div class="footer-brand">Suitsupply</div>
                <p class="footer-text">This is a demonstration page showcasing AI-powered content creation capabilities for luxury fashion brands. All imagery and video content is used for demonstration purposes.</p>
            </div>
            <div>
                <h4 class="footer-title">AI Services</h4>
                <div class="footer-links">
                    <a href="#">Video Generation</a>
                    <a href="#">Image Enhancement</a>
                    <a href="#">Social Content</a>
                    <a href="#">Virtual Try-On</a>
                </div>
            </div>
            <div>
                <h4 class="footer-title">Resources</h4>
                <div class="footer-links">
                    <a href="#">Case Studies</a>
                    <a href="#">Documentation</a>
                    <a href="#">API Access</a>
                    <a href="#">Pricing</a>
                </div>
            </div>
            <div>
                <h4 class="footer-title">Contact</h4>
                <div class="footer-links">
                    <a href="#">Schedule Demo</a>
                    <a href="#">Support</a>
                    <a href="#">Partnerships</a>
                    <a href="#">Press</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="footer-copyright">© 2024 AI Content Studio Demo. For demonstration purposes only.</p>
            <div class="footer-social">
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-tiktok"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    </script>
</body>
</html>
  `)
})

// API endpoint for demo data
app.get('/api/content', (c) => {
  return c.json({
    images: [
      { id: 1, url: images.creamSuit1, title: 'Off-White Three-Piece', type: 'ai-optimized' },
      { id: 2, url: images.navySuit1, title: 'Navy Birdseye', type: 'ai-enhanced' },
      { id: 3, url: images.creamSuit2, title: 'Ivory Double-Breasted', type: 'original' },
      { id: 4, url: images.navySuit2, title: 'Classic Navy Two-Piece', type: 'ai-styled' }
    ],
    videos: [
      { id: 1, url: videos.creamWalk, title: 'Ivory Suit 360°', duration: '10s' },
      { id: 2, url: videos.navyWalk, title: 'Navy Suit 360°', duration: '10s' }
    ],
    features: [
      { icon: 'video', title: 'AI Video Generation', desc: 'Create 360° product rotations and lifestyle content' },
      { icon: 'image', title: 'Image Enhancement', desc: 'Background removal, color correction, model variations' },
      { icon: 'share', title: 'Social Content', desc: 'Platform-optimized content for Instagram, TikTok, YouTube' }
    ]
  })
})

export default app
