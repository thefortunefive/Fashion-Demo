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

        /* ── Navigation ── */
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

        /* ── Hero ── */
        .hero {
            margin-top: 72px;
            padding: 100px 60px;
            background: linear-gradient(135deg, var(--ss-cream) 0%, var(--ss-white) 100%);
            text-align: center;
        }

        .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: 52px;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 20px;
            color: var(--ss-black);
            max-width: 820px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-subtitle {
            font-size: 17px;
            color: var(--ss-gray);
            max-width: 640px;
            margin: 0 auto;
            font-weight: 300;
            line-height: 1.7;
        }

        /* ── Shared Section Styles ── */
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

        /* ── Showcase: Product Rows ── */
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

        /* 3-column × 2-row grid */
        .showcase-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
        }

        .showcase-item {
            background: var(--ss-white);
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .showcase-item:hover {
            transform: translateY(-4px);
            box-shadow: 0 18px 50px rgba(0,0,0,0.12);
        }

        .showcase-media {
            position: relative;
            aspect-ratio: 3/4;
            overflow: hidden;
            background: var(--ss-light-gray);
        }

        .showcase-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .showcase-media video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }

        /* Badge labels */
        .comparison-label {
            position: absolute;
            top: 14px;
            left: 14px;
            padding: 7px 14px;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 2px;
            z-index: 2;
        }

        .label-enhanced {
            background: var(--ss-accent);
            color: var(--ss-white);
        }

        .label-video {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: var(--ss-white);
        }

        /* Play button */
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

        /* Caption below each item */
        .showcase-info {
            padding: 18px 20px;
            text-align: center;
        }

        .showcase-type {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--ss-gray);
            margin-bottom: 5px;
        }

        .showcase-title {
            font-family: 'Playfair Display', serif;
            font-size: 16px;
            color: var(--ss-black);
        }

        /* ── How It Works ── */
        .steps-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .step-card {
            text-align: center;
            padding: 40px 30px;
            background: rgba(255,255,255,0.7);
            border-radius: 4px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
        }

        .step-number {
            font-family: 'Playfair Display', serif;
            font-size: 56px;
            font-weight: 700;
            color: var(--ss-accent);
            line-height: 1;
            margin-bottom: 16px;
        }

        .step-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 12px;
            color: var(--ss-black);
        }

        .step-desc {
            font-size: 14px;
            color: var(--ss-gray);
            line-height: 1.75;
            font-weight: 300;
        }

        /* ── Business Case ── */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .stat-card {
            text-align: center;
            padding: 40px 20px;
            background: rgba(255,255,255,0.04);
            border-radius: 4px;
            border-top: 2px solid var(--ss-accent);
        }

        .stat-number {
            font-family: 'Playfair Display', serif;
            font-size: 64px;
            font-weight: 700;
            color: var(--ss-accent);
            line-height: 1;
            margin-bottom: 14px;
        }

        .stat-label {
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--ss-white);
            margin-bottom: 8px;
        }

        .stat-desc {
            font-size: 13px;
            color: rgba(255,255,255,0.5);
            line-height: 1.6;
            font-weight: 300;
        }

        /* ── CTA ── */
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
            margin-bottom: 36px;
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

        /* ── Footer ── */
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

        /* ── Lightbox ── */
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

        /* ── Responsive ── */
        @media (max-width: 1024px) {
            .showcase-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .steps-grid {
                grid-template-columns: 1fr;
                max-width: 480px;
                margin: 0 auto;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero-title {
                font-size: 34px;
            }
            .section {
                padding: 60px 24px;
            }
            .section-title {
                font-size: 28px;
            }
            .showcase-grid {
                grid-template-columns: 1fr;
                max-width: 400px;
                margin: 0 auto;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
            }
            .stat-number {
                font-size: 48px;
            }
            .hero {
                padding: 70px 24px;
            }
        }
    </style>
</head>
<body>

    <!-- ═══════════════════════════════════════════
         SECTION 1 — NAVIGATION + HERO
    ═══════════════════════════════════════════ -->
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

    <section class="hero">
        <h1 class="hero-title">AI-Powered Product Photography &amp; Video for Fashion Brands</h1>
        <p class="hero-subtitle">Studio-quality model images and walkthrough videos — no photoshoot required. Product pages with video convert up to 65% higher.</p>
    </section>


    <!-- ═══════════════════════════════════════════
         SECTION 2 — SHOWCASE
    ═══════════════════════════════════════════ -->
    <section id="showcase" class="section">

        <!-- ── Row 1: Charcoal Slim-Fit Suit (Male) ── -->
        <div class="product-row">
            <h3 class="product-row-title">Charcoal Slim-Fit Suit</h3>
            <div class="showcase-grid">

                <!-- TOP ROW — 3 Images -->

                <!-- Image 1: Product Page -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/navy-gallery/navy-ai-1.jpg" alt="Product Page Image">
                        <span class="comparison-label label-enhanced">Product Page</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Image</div>
                        <div class="showcase-title">E-Commerce Ready</div>
                    </div>
                </div>

                <!-- Image 2: Campaign -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/navy-gallery/navy-ai-2.jpg" alt="Campaign Shot">
                        <span class="comparison-label label-enhanced">Campaign</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Campaign Shot</div>
                        <div class="showcase-title">Editorial &amp; Lookbook</div>
                    </div>
                </div>

                <!-- Image 3: Detail -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/navy-gallery/navy-ai-3.jpg" alt="Detail Close-Up">
                        <span class="comparison-label label-enhanced">Detail</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Detail Close-Up</div>
                        <div class="showcase-title">Texture &amp; Craftsmanship</div>
                    </div>
                </div>

                <!-- BOTTOM ROW — 3 Videos -->

                <!-- Video 1: Product Video -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-1" loop muted playsinline preload="metadata">
                            <source src="${media.navyVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Product Video</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-1', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Video</div>
                        <div class="showcase-title">Model Walkthrough</div>
                    </div>
                </div>

                <!-- Video 2: Social -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-2" loop muted playsinline preload="metadata">
                            <source src="${media.navyVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Social</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-2', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Social Content Clip</div>
                        <div class="showcase-title">Instagram &amp; TikTok Ready</div>
                    </div>
                </div>

                <!-- Video 3: Lookbook -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="navy-video-3" loop muted playsinline preload="metadata">
                            <source src="${media.navyVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Lookbook</span>
                        <div class="play-button" onclick="toggleVideo('navy-video-3', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Lookbook Video</div>
                        <div class="showcase-title">Campaign &amp; Lifestyle</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- ── Row 2: Emerald Cocktail Dress (Female) ── -->
        <div class="product-row">
            <h3 class="product-row-title">Emerald Cocktail Dress</h3>
            <div class="showcase-grid">

                <!-- TOP ROW — 3 Images -->

                <!-- Image 1: Product Page -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/ivory-gallery/ivory-ai-1.jpg" alt="Product Page Image">
                        <span class="comparison-label label-enhanced">Product Page</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Image</div>
                        <div class="showcase-title">E-Commerce Ready</div>
                    </div>
                </div>

                <!-- Image 2: Campaign -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/ivory-gallery/ivory-ai-2.jpg" alt="Campaign Shot">
                        <span class="comparison-label label-enhanced">Campaign</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Campaign Shot</div>
                        <div class="showcase-title">Editorial &amp; Lookbook</div>
                    </div>
                </div>

                <!-- Image 3: Detail -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <img src="/static/media/ivory-gallery/ivory-ai-3.jpg" alt="Detail Close-Up">
                        <span class="comparison-label label-enhanced">Detail</span>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Detail Close-Up</div>
                        <div class="showcase-title">Texture &amp; Craftsmanship</div>
                    </div>
                </div>

                <!-- BOTTOM ROW — 3 Videos -->

                <!-- Video 1: Product Video -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-1" loop muted playsinline preload="metadata">
                            <source src="${media.creamVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Product Video</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-1', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Product Page Video</div>
                        <div class="showcase-title">Model Walkthrough</div>
                    </div>
                </div>

                <!-- Video 2: Social -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-2" loop muted playsinline preload="metadata">
                            <source src="${media.creamVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Social</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-2', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Social Content Clip</div>
                        <div class="showcase-title">Instagram &amp; TikTok Ready</div>
                    </div>
                </div>

                <!-- Video 3: Lookbook -->
                <div class="showcase-item">
                    <div class="showcase-media">
                        <video id="cream-video-3" loop muted playsinline preload="metadata">
                            <source src="${media.creamVideo}" type="video/mp4">
                        </video>
                        <span class="comparison-label label-video">Lookbook</span>
                        <div class="play-button" onclick="toggleVideo('cream-video-3', this)">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="showcase-info">
                        <div class="showcase-type">Lookbook Video</div>
                        <div class="showcase-title">Campaign &amp; Lifestyle</div>
                    </div>
                </div>

            </div>
        </div>

    </section>


    <!-- ═══════════════════════════════════════════
         SECTION 3 — HOW IT WORKS
    ═══════════════════════════════════════════ -->
    <section id="features" class="section section-cream">
        <div class="section-header">
            <div class="section-tag">How It Works</div>
            <h2 class="section-title">From Product Photo to Published Content in 3 Steps</h2>
        </div>
        <div class="steps-grid">

            <div class="step-card">
                <div class="step-number">1</div>
                <h3 class="step-title">Send Your Product</h3>
                <p class="step-desc">Share your garment photos — flat-lay, hanger, or mannequin shots. No professional photography required.</p>
            </div>

            <div class="step-card">
                <div class="step-number">2</div>
                <h3 class="step-title">We Generate the Content</h3>
                <p class="step-desc">AI creates studio-quality model photography and walkthrough videos tailored to your brand and product.</p>
            </div>

            <div class="step-card">
                <div class="step-number">3</div>
                <h3 class="step-title">Publish Everywhere</h3>
                <p class="step-desc">Receive ready-to-use assets for your website product pages, social media, email campaigns, and lookbooks.</p>
            </div>

        </div>
    </section>


    <!-- ═══════════════════════════════════════════
         SECTION 4 — THE BUSINESS CASE
    ═══════════════════════════════════════════ -->
    <section class="section section-dark">
        <div class="section-header">
            <div class="section-tag">Why AI Content</div>
            <h2 class="section-title">The Numbers Behind AI Fashion Content</h2>
        </div>
        <div class="stats-grid">

            <div class="stat-card">
                <div class="stat-number">65%</div>
                <div class="stat-label">Higher Conversion</div>
                <div class="stat-desc">Product pages with video vs. images alone</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">90%</div>
                <div class="stat-label">Cost Savings</div>
                <div class="stat-desc">Compared to traditional photoshoot production</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">10x</div>
                <div class="stat-label">Faster Output</div>
                <div class="stat-desc">Days instead of weeks for full campaign assets</div>
            </div>

            <div class="stat-card">
                <div class="stat-number">40%</div>
                <div class="stat-label">More Engagement</div>
                <div class="stat-desc">Luxury brands using video content (McKinsey)</div>
            </div>

        </div>
    </section>


    <!-- ═══════════════════════════════════════════
         SECTION 5 — CTA + FOOTER
    ═══════════════════════════════════════════ -->
    <section id="contact" class="cta-section">
        <div class="section-tag">Get Started</div>
        <h2 class="cta-title">Ready to Upgrade Your Fashion Content?</h2>
        <p class="cta-text">AI-powered product visuals, video, and social content — built for fashion brands ready to move faster.</p>
        <a href="#" class="btn-primary">
            <span>Get Started</span>
            <i class="fas fa-arrow-right"></i>
        </a>
    </section>

    <footer class="footer">
        <div class="footer-brand">5th Ave Fashion</div>
        <p class="footer-text">This is a demonstration page showcasing AI-powered content creation capabilities. All imagery and video content is used for demonstration purposes.</p>
    </footer>


    <!-- ═══════════════════════════════════════════
         LIGHTBOX
    ═══════════════════════════════════════════ -->
    <div class="lightbox" id="lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">
            <i class="fas fa-times"></i>
        </button>
        <img id="lightbox-img" src="" alt="Enlarged view">
    </div>


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

        document.getElementById('lightbox').addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
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
        enhanced: media.navyEnhanced,
        video: media.navyVideo
      },
      {
        name: 'Emerald Cocktail Dress',
        enhanced: media.creamEnhanced,
        video: media.creamVideo
      }
    ]
  })
})

export default app
