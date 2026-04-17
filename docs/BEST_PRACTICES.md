# Best Practices: Performance & Mobile Optimization

## 1. Performance Optimization

### 1.1 Image Optimization

#### Problem: Large Images Slow Down Mobile Devices
**Solution:** Compress and serve responsive images

```html
<!-- Use srcset for responsive images -->
<img 
  src="assets/images/products/product1-400w.jpg"
  srcset="
    assets/images/products/product1-400w.jpg 400w,
    assets/images/products/product1-600w.jpg 600w,
    assets/images/products/product1-1000w.jpg 1000w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  alt="Product 1"
  class="img-fluid"
/>

<!-- Or use picture element for format switching -->
<picture>
  <source srcset="assets/images/products/product1.webp" type="image/webp">
  <source srcset="assets/images/products/product1.jpg" type="image/jpeg">
  <img src="assets/images/products/product1.jpg" alt="Product 1" class="img-fluid">
</picture>
```

**Best Practices:**
- **Target sizes:** Mobile (400px), Tablet (600px), Desktop (1000px)
- **File formats:** WebP for modern browsers, JPG fallback
- **Compression:** Use TinyPNG, ImageOptim, or ImageMagick
  ```bash
  # ImageMagick compression
  convert product1.jpg -quality 80 -resize 400x400 product1-400w.jpg
  ```
- **Lazy loading:** Use native loading="lazy" attribute
  ```html
  <img src="..." loading="lazy" alt="...">
  ```

**Performance Impact:**
- Reduces bundle size by 60-80%
- Improves LCP score
- Decreases mobile load time from 5s → 2s

---

### 1.2 Video Optimization

#### Problem: Large Video Files Block Mobile Networks
**Solution:** Encode videos in multiple formats and sizes

```html
<!-- Optimized video implementation -->
<video 
  width="100%" 
  height="auto" 
  controls 
  playsinline
  preload="metadata"
  poster="assets/videos/thumbnail.jpg"
  data-aos="fade-up">
  
  <!-- Modern format (smaller size) -->
  <source src="assets/videos/production-showcase.webm" type="video/webm">
  
  <!-- Fallback format -->
  <source src="assets/videos/production-showcase.mp4" type="video/mp4">
  
  Your browser doesn't support HTML5 video.
</video>
```

**Encoding Commands:**
```bash
# Create WebM (smaller, 30-50% size reduction)
ffmpeg -i production-showcase.mp4 -c:v libvpx-vp9 -b:v 500k -c:a libopus -b:a 128k output.webm

# Create MP4 (fallback, compressed)
ffmpeg -i production-showcase.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4

# Create thumbnail
ffmpeg -i production-showcase.mp4 -ss 00:00:03 -vframes 1 -vf scale=1280:-1 thumbnail.jpg
```

**Video Best Practices:**
- **Preload:** Use preload="metadata" instead of "auto"
- **Poster:** Always include a poster image
- **Playsinline:** Required for iOS mobile video
- **Target sizes:** 720p max for mobile (500-1000ms load time)
- **Bitrate:** 500-800 kbps for video, 128 kbps for audio

**Performance Impact:**
- Reduces video size from 50MB → 10-15MB
- Enables mobile streaming without buffering
- Improves Core Web Vitals

---

### 1.3 CSS Optimization

#### Code Splitting & Minification
```css
/* DO: Use mobile-first approach */
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 2 columns on mobile */
  gap: 1rem;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns on tablet+ */
  }
}

/* DON'T: Don't use max-width first */
/* @media (max-width: 768px) { ... } */
```

**CSS Best Practices:**
1. **Remove unused CSS:**
   ```bash
   # Use PurgeCSS to remove unused styles
   npm install purgecss
   purgecss --css css/style.css --content index.html --output css/style.min.css
   ```

2. **Minify CSS:**
   ```bash
   # Using online tool or Node.js
   npx cssnano css/style.css -o css/style.min.css
   ```

3. **Critical CSS:** Inline critical styles
   ```html
   <style>
     /* Critical styles for above-the-fold content */
     body { margin: 0; font-family: system-ui; }
     .hero { min-height: 100vh; }
   </style>
   <link rel="stylesheet" href="css/style.min.css">
   ```

---

### 1.4 JavaScript Optimization

#### Code Splitting & Lazy Loading
```javascript
// GOOD: Lazy load JavaScript modules only when needed
function setupProductEventListeners() {
  // Only attach listeners to products in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const btn = entry.target.querySelector('.order-btn');
        if (btn && !btn.hasListener) {
          btn.addEventListener('click', handleProductOrder);
          btn.hasListener = true;
        }
      }
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
}

// AVOID: Don't run heavy computations on page load
// AVOID: Don't attach event listeners to elements not in viewport

// Use requestAnimationFrame for smooth animations
function smoothScroll(target) {
  const startY = window.scrollY;
  const endY = target.offsetTop;
  const distance = endY - startY;
  const duration = 600;
  let startTime = null;

  function scroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollY = startY + distance * easeInOutCubic(progress);
    
    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

function easeInOutCubic(t) {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
```

**JavaScript Best Practices:**
1. **Defer non-critical scripts:**
   ```html
   <!-- Critical -->
   <script src="js/app.js"></script>
   
   <!-- Non-critical (defer) -->
   <script async src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
   <script async src="https://unpkg.com/aos@next/dist/aos.js"></script>
   ```

2. **Minify JavaScript:**
   ```bash
   npx terser js/app.js -o js/app.min.js --compress --mangle
   ```

3. **Remove console logs in production:**
   ```javascript
   // Minify process removes console statements
   // Or use environment check:
   if (process.env.NODE_ENV !== 'production') {
     console.log('Debug info');
   }
   ```

---

## 2. Mobile-First Design Principles

### 2.1 Responsive Layout Strategy

```css
/* Mobile First: Design for smallest screen first */

/* 1. Base styles (mobile 320px) */
.container {
  padding: 0 1rem;
  max-width: 100%;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* 2 columns */
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
}

/* 2. Tablet styles (576px+) */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
  
  .btn {
    width: auto;
  }
}

/* 3. Tablet styles (768px+) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
  
  .product-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
  }
}

/* 4. Desktop styles (992px+) */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

/* 5. Large desktop (1200px+) */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

### 2.2 Touch-Friendly Interfaces

```css
/* Minimum touch target size: 44x44px */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1rem;
}

.nav-link {
  padding: 0.75rem;
  display: block;
}

/* Remove tap highlight on mobile */
a, button {
  -webkit-tap-highlight-color: transparent;
}

/* Better hover states for mobile */
@media (hover: hover) {
  .btn:hover {
    background-color: #0d6efd;
  }
}

@media (hover: none) {
  .btn:active {
    background-color: #0d6efd;
  }
}
```

### 2.3 Viewport Meta Tag

```html
<!-- Critical for mobile responsiveness -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Enable zoom for accessibility -->
<!-- DON'T USE: user-scalable=no -->
<!-- DON'T USE: maximum-scale=1 -->
```

---

## 3. Low Bandwidth Optimization

### 3.1 Network-Aware Loading

```javascript
// Detect connection speed
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

class NetworkAwareLoader {
  constructor() {
    this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  }

  // Get connection type
  getConnectionType() {
    if (!this.connection) return '4g';
    
    const type = this.connection.effectiveType;
    return type; // '4g', '3g', '2g', 'slow-2g'
  }

  // Get download speed (Mbps)
  getDownloadSpeed() {
    if (!this.connection) return 10; // Assume high speed
    return this.connection.downlink || 10;
  }

  // Get RTT (Round Trip Time in ms)
  getRoundTripTime() {
    if (!this.connection) return 50;
    return this.connection.rtt || 50;
  }

  // Check if on slow network
  isSlowNetwork() {
    return this.getConnectionType() !== '4g' || this.getDownloadSpeed() < 2;
  }

  // Load images based on connection
  loadImagesByConnection() {
    const isSlowNetwork = this.isSlowNetwork();
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
      if (isSlowNetwork) {
        // Load smaller image for slow networks
        img.src = img.getAttribute('data-src-small') || img.getAttribute('data-src');
      } else {
        // Load regular image for fast networks
        img.src = img.getAttribute('data-src');
      }
    });
  }
}

// Initialize on page load
const networkLoader = new NetworkAwareLoader();
networkLoader.loadImagesByConnection();

// Listen for connection changes
if (connection) {
  connection.addEventListener('change', () => {
    networkLoader.loadImagesByConnection();
  });
}
```

**HTML Usage:**
```html
<!-- Different image sizes for different connections -->
<img 
  data-src="assets/images/products/product1-1000w.jpg"
  data-src-small="assets/images/products/product1-400w.jpg"
  alt="Product 1"
  class="img-fluid"
/>
```

### 3.2 Data Saver Mode Detection

```javascript
// Detect data saver mode
const prefersReducedData = (
  navigator.connection && 
  navigator.connection.saveData
);

if (prefersReducedData) {
  // Don't autoplay videos
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.autoplay = false;
  });

  // Disable animations
  const style = document.createElement('style');
  style.textContent = `
    * {
      animation: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(style);
}
```

### 3.3 Service Worker for Offline Support (Advanced)

```javascript
// service-worker.js
const CACHE_NAME = 'ecommerce-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached version or fetch new
      return response || fetch(event.request)
        .then(response => {
          // Cache new response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
    })
  );
});

// Register in app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .catch(err => console.log('SW registration failed:', err));
}
```

---

## 4. Accessibility Best Practices

### 4.1 ARIA Labels & Semantic HTML

```html
<!-- Good: Semantic HTML -->
<nav aria-label="Main navigation">
  <a href="#products">Products</a>
  <a href="#contact">Contact</a>
</nav>

<main>
  <!-- Good: Proper heading hierarchy -->
  <h1>Our Products</h1>
  <section>
    <h2>Featured Items</h2>
    
    <!-- Good: Alt text for images -->
    <img src="product.jpg" alt="Blue leather handbag with gold hardware">
    
    <!-- Good: Form labels associated with inputs -->
    <label for="email">Email Address</label>
    <input id="email" type="email" required>
    
    <!-- Good: Button text describes action -->
    <button aria-label="Order Blue Handbag on WhatsApp">Order</button>
  </section>
</main>
```

### 4.2 Color Contrast & Readability

```css
/* WCAG AA Compliant (4.5:1 ratio for normal text) */
.text-dark {
  color: #212529;      /* 16.6:1 on white */
  background: #ffffff;
}

.text-light {
  color: #f8f9fa;      /* 8.6:1 on dark background */
  background: #212529;
}

/* AVOID: Low contrast */
/* color: #999; background: #eee; */ /* Only 2.3:1 - FAILS WCAG AA */
```

---

## 5. Security Best Practices

### 5.1 Input Validation & Sanitization

```javascript
// Sanitize HTML input to prevent XSS
class InputSanitizer {
  static sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  static sanitizeEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? email : null;
  }

  static sanitizePhone(phone) {
    // Remove special chars except +, -, (, )
    return phone.replace(/[^\d\+\-\(\) ]/g, '');
  }

  static sanitizeMessage(message) {
    // Remove potential script tags
    return message
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
  }
}

// Use in form submission
const formData = contactFormValidator.getFormData();
formData.name = InputSanitizer.sanitize(formData.name);
formData.message = InputSanitizer.sanitizeMessage(formData.message);
```

### 5.2 HTTPS & Environment Variables

```javascript
// Use environment variables for sensitive data
// DON'T: Hardcode phone numbers or API keys in code

// Instead, load from env or config
const CONFIG = {
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '+1234567890',
  API_KEY: process.env.API_KEY,
};

// Ensure all forms use HTTPS
window.addEventListener('load', () => {
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    location.protocol = 'https:';
  }
});
```

---

## 6. Performance Metrics & Monitoring

### 6.1 Core Web Vitals Monitoring

```javascript
// Monitor Core Web Vitals
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }

  // Measure Largest Contentful Paint (LCP)
  measureLCP() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
      console.log('LCP:', this.metrics.LCP);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Measure Cumulative Layout Shift (CLS)
  measureCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.CLS = clsValue;
          console.log('CLS:', this.metrics.CLS);
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  // Measure First Input Delay (FID)
  measureFID() {
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.FID = entry.processingDuration;
        console.log('FID:', this.metrics.FID);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  // Initialize all monitoring
  init() {
    this.measureLCP();
    this.measureCLS();
    this.measureFID();
  }

  // Get all metrics
  getMetrics() {
    return this.metrics;
  }
}

// Initialize monitoring
const perfMonitor = new PerformanceMonitor();
perfMonitor.init();

// Send metrics to analytics (optional)
window.addEventListener('beforeunload', () => {
  const metrics = perfMonitor.getMetrics();
  // Send to your analytics service
  console.log('Performance Metrics:', metrics);
});
```

### 6.2 Performance Testing Script

```bash
#!/bin/bash
# quick-perf-test.sh

echo "Running Lighthouse audit..."
npx lighthouse http://localhost:8000 --view

echo "Checking image sizes..."
du -sh assets/images/*

echo "Checking video sizes..."
du -sh assets/videos/*

echo "Checking gzip compression..."
gzip -k css/style.css
gzip -k js/app.js
ls -lh css/style.css.gz js/app.js.gz

echo "Performance testing complete!"
```

---

## Summary Checklist

- ✅ Images optimized with WebP + JPG fallback
- ✅ Video encoded in WebM + MP4 with correct bitrate
- ✅ CSS minified and critical styles inlined
- ✅ JavaScript split and deferred appropriately
- ✅ Mobile-first CSS with proper breakpoints
- ✅ Touch targets minimum 44x44px
- ✅ Viewport meta tag correct
- ✅ Network-aware loading implemented
- ✅ Data saver mode detection enabled
- ✅ Semantic HTML with ARIA labels
- ✅ Color contrast meets WCAG AA
- ✅ Input validation & sanitization implemented
- ✅ Core Web Vitals monitoring in place
- ✅ Lighthouse score > 90

