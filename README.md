# Mobile-First E-Commerce Website

## Overview
A responsive, lightweight e-commerce platform built with HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript. Designed for mobile-first experience with WhatsApp Click-to-Chat API integration for seamless order placement and customer communication.

**Tech Stack:**
- Frontend: HTML5, CSS3, Bootstrap 5
- JavaScript: Vanilla JS (no frameworks)
- Image Library: GLightbox (image popups)
- Animation: AOS (Animate on Scroll)
- Integration: WhatsApp Click-to-Chat API
- Performance: Optimized for low bandwidth users

---

## Project Management

### Developer Roles & Responsibilities

#### Dev 1: UI/UX Specialist
- HTML structure and semantics
- CSS styling and responsive design
- Bootstrap 5 component integration
- Layout optimization for mobile devices
- Asset organization (images, icons)
- Accessibility (a11y) compliance

#### Dev 2: Logic & Integration Specialist
- JavaScript application architecture
- WhatsApp API integration
- Form validation and submission
- Event handling and DOM manipulation
- Performance optimization (bundling, lazy loading)
- Data management and state handling

### Workflow Guidelines
1. **Dev 1** creates HTML structure based on PROJECT_PLAN.md
2. **Dev 2** implements JavaScript functionality in separate modules
3. Both review BEST_PRACTICES.md for performance standards
4. Use TESTING_CHECKLIST.md before deployment
5. Commit messages follow format: `[dev1/dev2] Component: description`

---

## Quick Start

### Installation
```bash
# No build tool required - just clone and run
git clone <repository>
cd NewProject

# Serve locally (using any local server)
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (if available)
npx http-server

# Option 3: PHP (XAMPP)
# Place in htdocs and visit http://localhost/NewProject
```

### File Structure
```
NewProject/
├── index.html                    # Main entry point
├── css/
│   └── style.css                # Mobile-first styles
├── js/
│   ├── app.js                   # Main application logic
│   ├── whatsapp.js              # WhatsApp integration module
│   ├── forms.js                 # Form handling module
│   └── ui.js                    # UI interactions module
├── assets/
│   ├── images/
│   │   ├── products/            # Product images
│   │   └── icons/               # Social media icons
│   └── videos/                  # Production showcase videos
├── PROJECT_PLAN.md              # UI structure & architecture
├── BEST_PRACTICES.md            # Performance & optimization
└── TESTING_CHECKLIST.md         # QA guidelines
```

---

## Core Features

### 1. Product Grid (2x3 - Mobile)
- Responsive grid: 2 columns on mobile, 3+ on desktop
- Product cards with image, name, price, description
- Click to open product details & order
- Image popup with GLightbox

### 2. WhatsApp Integration
- One-click product ordering
- Contact form submission via WhatsApp
- Pre-formatted messages with product details
- Phone number configuration

### 3. Video Sections
- Production showcase video #1
- Production showcase video #2
- Responsive embedding (mobile-optimized)
- Lazy loading for performance

### 4. Contact Form
- Fields: Name, Email, Phone, Message
- Client-side validation
- Submit via WhatsApp
- Form reset on success

### 5. Social Media Integration
- Social icons with hover effects
- Links to social profiles
- Responsive icon sizing

---

## Performance Checklist (Key Metrics)

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| Lighthouse Score | > 90 | Chrome DevTools |
| Mobile Load Time | < 3s | Real device testing |

---

## Environment Setup

### Required Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

### External CDNs (Optimized)
```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- AOS Library -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<link href="https://unpkg.com/aos@next/dist/aos.css" rel="stylesheet">

<!-- GLightbox Library -->
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
```

---

## Deployment

### Pre-deployment Checklist
- [ ] All images optimized and compressed
- [ ] Video files encoded for web (H.264, VP9)
- [ ] No console errors (Dev Tools)
- [ ] Lighthouse score > 90
- [ ] Mobile responsiveness tested on real devices
- [ ] WhatsApp integration tested with real phone
- [ ] All links functional and leading to correct destinations

### Hosting Recommendation
- **XAMPP/Apache:** Free local/hosted solution
- **Netlify:** Free tier with auto-deploy from Git
- **Vercel:** Fast CF network, free tier available
- **GitHub Pages:** Free for static sites

---

## Support & Documentation

For detailed technical implementation:
- **PROJECT_PLAN.md** → UI Structure & JS Architecture
- **BEST_PRACTICES.md** → Performance & Mobile Optimization
- **TESTING_CHECKLIST.md** → QA & Testing Guidelines

---

## License
This project is intended for learning and commercial use under your chosen license.

---

**Created:** April 2026 | **Status:** Development
