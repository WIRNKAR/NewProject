# 🔩 Beli Metal Fabrication — Project Overview

> Premium welding & custom metal fabrication services website for **Douala, Cameroon**.
> Mobile-first, WhatsApp-integrated, zero-backend static site.

---

## Table of Contents

- [Project Summary](#project-summary)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Developer Roles](#developer-roles)
- [Features](#features)
- [Products / Services](#products--services)
- [WhatsApp Integration](#whatsapp-integration)
- [Performance Targets](#performance-targets)
- [Deployment](#deployment)
- [Pre-Launch Checklist](#pre-launch-checklist)

---

## Project Summary

Beli Metal Fabrication is a **static, mobile-first e-commerce website** built for a welding and metal fabrication business based in Douala, Cameroon. Customers can browse services, view a gallery, watch production videos, and place orders or inquiries directly via WhatsApp — no backend required.

- **Business:** Beli Metal Fabrication
- **Location:** Douala, Littoral Region, Cameroon
- **WhatsApp:** +237 676 866 995
- **Email:** shop@sheyeugine.com
- **Status:** Development (v1.0, April 2026)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 + Bootstrap 5 |
| JavaScript | Vanilla JS (no frameworks) |
| Image Lightbox | GLightbox |
| Scroll Animations | AOS (Animate on Scroll) |
| Icons | Font Awesome 6 |
| Integration | WhatsApp Click-to-Chat API |
| Hosting | Netlify / Vercel / GitHub Pages / XAMPP |

---

## Project Structure

```
NewProject/
├── index.html                  # Main entry point
├── css/
│   └── style.css               # Mobile-first CSS3 styles
├── js/
│   ├── app.js                  # Main app controller & CONFIG
│   ├── whatsapp.js             # WhatsApp API class
│   ├── forms.js                # Form validation class
│   └── ui.js                   # UI manager class
├── assets/
│   ├── images/
│   │   └── products/           # Product images (6 required)
│   └── videos/                 # Production showcase videos (2 required)
├── README.md
├── PROJECT_PLAN.md
├── BEST_PRACTICES.md
├── TESTING_CHECKLIST.md
├── DEPLOYMENT.md
├── DEV1_UI_UX_GUIDE.md
├── DEV2_JAVASCRIPT_GUIDE.md
├── QUICKSTART.md
└── .gitignore
```

---

## Getting Started

### Local Development

```bash
# Option 1 — Python (recommended)
cd NewProject
python -m http.server 8000
# Visit: http://localhost:8000

# Option 2 — Node.js
npx http-server
# Visit: http://localhost:8080

# Option 3 — XAMPP/PHP
# Place in htdocs → visit: http://localhost/NewProject
```

No build tools, no dependencies to install. Just serve and go.

---

## Configuration

All key settings live in `js/app.js` at the top of the file:

```javascript
const CONFIG = {
    WHATSAPP_NUMBER: '+23767686995',   // Business WhatsApp
    PRODUCT_CURRENCY: 'XAF',           // CFA Francs
    FORM_SUBMIT_DELAY: 500,            // ms delay before WhatsApp opens
    ENABLE_AOS: true,
    ENABLE_GLIGHTBOX: true,
    REDUCE_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};
```

**To customise brand colors**, edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #dc3545;     /* Red — welding/fire theme */
    --secondary-color: #474747;   /* Dark gray — metal theme */
    --success-color: #198754;     /* WhatsApp green */
}
```

---

## Developer Roles

This project is split between two developers working in parallel.

### Dev 1 — UI/UX (HTML + CSS)

Responsible for all visual output and responsiveness.

| Task | File | Est. Time |
|---|---|---|
| Update hero text & branding | `index.html` | 30 min |
| Add 6 product images (400×400px, <50KB) | `assets/images/products/` | 1 hr |
| Customise brand colors | `css/style.css` | 15 min |
| Add 2 production videos | `assets/videos/` | 45 min |
| Mobile responsiveness testing | All devices | 30 min |
| Optimize images with TinyPNG | All images | 30 min |
| Update navbar & footer | `index.html` | 15 min |

**Total: ~3–4 hours**

### Dev 2 — JavaScript & Integration

Responsible for all logic, data, and API wiring.

| Task | File | Est. Time |
|---|---|---|
| Configure WhatsApp number | `js/app.js` | 15 min |
| Update SAMPLE_PRODUCTS array (6 services) | `js/app.js` | 30 min |
| Test form validation (all edge cases) | `js/forms.js` | 20 min |
| Test WhatsApp message generation | `js/whatsapp.js` | 25 min |
| Fix any console errors | All JS files | 30 min |
| Performance & optimization (optional) | All | 20 min |

**Total: ~3–4 hours**

---

## Features

### Product Grid
- 2 columns on mobile, 3 on tablet/desktop
- Product cards with image, name, description, and price
- Click-to-zoom via GLightbox
- Order via WhatsApp with one tap

### Gallery Section
- Auto-generated from product data
- Hover-to-reveal zoom icon
- GLightbox popup on click

### Project Videos
- 2 video upload areas (MP4/WebM, max 100MB)
- Displayed inline after upload
- `playsinline` for iOS compatibility

### Contact Form
- Fields: Full Name, Email, Service (dropdown), Message
- Real-time validation on blur
- Error messages for empty/invalid fields
- Submission routes via WhatsApp with formatted message

### Stats Section
- 500+ Projects, 10+ Years, 100% Quality, 24h Turnaround

### Scroll Animations
- AOS (Animate on Scroll) throughout
- Respects `prefers-reduced-motion`

---

## Products / Services

The `SAMPLE_PRODUCTS` array in `js/app.js` defines all 6 services. Default entries:

| # | Name | Category |
|---|---|---|
| 1 | Steel Structural Beams | Structural |
| 2 | Custom Welded Frames | Industrial |
| 3 | Steel Staircases | Custom Work |
| 4 | Metal Gates & Railings | Custom Work |
| 5 | Industrial Piping | Installation |
| 6 | Custom Metal Containers | Storage |

All prices default to **"Quote on Request"** — update with actual XAF prices as needed.

---

## WhatsApp Integration

The `WhatsAppAPI` class in `js/whatsapp.js` handles all messaging.

### Product Order Message (auto-generated)

```
Hello! I'm interested in ordering:

📦 Product: Steel Staircases
💰 Price: XAF Quote on Request
📝 Description: Modern and durable steel staircases with custom designs

Please confirm availability and shipping details.
```

### Contact Form Message (auto-generated)

```
🔔 New Customer Inquiry

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: +237676866995

💬 Message:
I need a custom gate for my property...
```

### Testing in Console (F12)

```javascript
// Confirm WhatsApp number loaded
console.log(CONFIG.WHATSAPP_NUMBER)

// Test product message
whatsappAPI.generateProductMessage({ name: 'Test', price: '50000', description: 'Test product' })

// Test form validation
contactFormValidator.validateEmail('test@example.com')
contactFormValidator.validatePhone('+237676866995')

// Debug full app state
window.AppDebug.logAppInfo()
```

---

## Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Lighthouse Score | > 90 |
| Mobile Load Time | < 3s |
| Product image file size | < 50KB each |
| Video file size | < 10MB each |

Run a Lighthouse audit from Chrome DevTools (F12 → Lighthouse → Analyze page load).

---

## Deployment

### Netlify (Recommended — Free)

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Vercel (Free, fast CDN)

```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages (Free for static sites)

Push to `main` branch → enable GitHub Pages in repo settings.

### XAMPP/Apache (Local or VPS)

Already configured at `c:\xampp\htdocs\NewProject` → `http://localhost/NewProject`

---

## Pre-Launch Checklist

### Code & Content
- [ ] Hero text updated with brand messaging
- [ ] All 6 product images added and optimised (<50KB each)
- [ ] 2 production videos added (<10MB each)
- [ ] WhatsApp number set to `+237676866995`
- [ ] Navbar brand name updated
- [ ] Footer copyright updated to 2026

### Functionality
- [ ] All product cards render correctly
- [ ] Order buttons open WhatsApp with correct message
- [ ] Contact form validates all fields
- [ ] Form submission opens WhatsApp correctly
- [ ] GLightbox image popups work
- [ ] AOS scroll animations work

### Mobile
- [ ] Tested on iOS (Safari 14+)
- [ ] Tested on Android (Chrome)
- [ ] No horizontal scrolling at any breakpoint
- [ ] Touch targets ≥ 44×44px
- [ ] Product grid shows 2 columns on mobile, 3 on tablet+

### Performance & Quality
- [ ] Lighthouse score > 90 (mobile and desktop)
- [ ] No red errors in browser console (F12)
- [ ] HTTPS enabled (production)
- [ ] All links are functional

---

*Made with ❤️ in Douala, Cameroon — Est. 2015*
