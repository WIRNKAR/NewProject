# Testing Checklist: QA & Validation

## Phase 1: Development Testing

### 1.1 HTML Structure Testing

- [ ] **Semantic HTML**
  - [ ] All headings in correct order (h1 → h6, no jumps)
  - [ ] Navigation wrapped in `<nav>` tags
  - [ ] Main content wrapped in `<main>` tag
  - [ ] Sections properly semantically marked
  - [ ] Form inputs have associated `<label>` elements

- [ ] **Links & Navigation**
  - [ ] All internal links working (#fragments)
  - [ ] Navigation menu collapses on mobile
  - [ ] Active nav item highlighted
  - [ ] No broken links (404s)

- [ ] **Forms**
  - [ ] All form fields labeled
  - [ ] Form submits without page reload
  - [ ] Form validation triggers before submission
  - [ ] Error messages display correctly
  - [ ] Form resets after successful submission

---

### 1.2 CSS Testing

- [ ] **Responsive Design**
  - [ ] Mobile (320px): 2 columns, full width
  - [ ] Tablet (768px): 3 columns, adjusted spacing
  - [ ] Desktop (1024px+): Full layout, optimized spacing
  - [ ] No horizontal scrolling at any breakpoint
  - [ ] Images scale properly without distortion

- [ ] **Colors & Contrast**
  ```javascript
  // Run in console to check contrast
  document.querySelectorAll('*').forEach(el => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const bg = style.backgroundColor;
    console.log(el.tagName, color, bg);
  });
  ```
  - [ ] Text readable on all backgrounds (WCAG AA)
  - [ ] Hover effects clear and visible
  - [ ] Active states distinct from hover

- [ ] **Typography**
  - [ ] Font sizes readable on mobile (min 16px)
  - [ ] Line height appropriate (1.4-1.6 for body)
  - [ ] Letter spacing readable
  - [ ] Font weights load correctly

- [ ] **Spacing & Layout**
  - [ ] No cutting off of content
  - [ ] Proper padding on all sides
  - [ ] No overlapping elements
  - [ ] White space consistent

---

### 1.3 JavaScript Testing

#### Test in Browser Console:
```javascript
// 1. Check if all required libraries loaded
console.log('WhatsApp API:', typeof whatsappAPI);
console.log('Form Validator:', typeof contactFormValidator);
console.log('UI Manager:', typeof uiManager);
console.log('AOS:', typeof AOS);
console.log('GLightbox:', typeof GLightbox);

// 2. Test AppState
console.log('App State:', appState);
console.log('Products loaded:', appState.products.length);

// 3. Trigger event handlers
// Click order button to test WhatsApp
document.querySelector('.order-btn').click();

// 4. Test form submission
document.getElementById('contact-form').dispatchEvent(
  new Event('submit', { bubbles: true, cancelable: true })
);

// 5. Check for errors
console.error('Check for any errors above');
```

- [ ] **Initialization**
  - [ ] All modules load without errors
  - [ ] No console errors on page load
  - [ ] Global variables accessible (CONFIG, appState)
  - [ ] Event listeners properly attached

- [ ] **Product Features**
  - [ ] Products load from appState
  - [ ] Product data complete (id, name, price, image)
  - [ ] Click "Order" button triggers WhatsApp
  - [ ] WhatsApp message includes product details
  - [ ] GLightbox opens on image click

- [ ] **Form Validation**
  - [ ] Name required validation works
  - [ ] Email format validation works
  - [ ] Phone number validation works
  - [ ] Message required validation works
  - [ ] Error messages display correctly
  - [ ] Form cannot submit with invalid data

- [ ] **Form Submission**
  - [ ] Form data correctly formatted
  - [ ] WhatsApp message includes all fields
  - [ ] Form resets after submission
  - [ ] Success message displays
  - [ ] Form re-submittable after reset

- [ ] **Animations**
  - [ ] AOS animations on scroll
  - [ ] Animations don't block interaction
  - [ ] Animations disabled on slow devices
  - [ ] Smooth transitions on hover

---

## Phase 2: Browser & Device Testing

### 2.1 Cross-Browser Testing

**Test on all browsers:**

| Browser | Version | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | 90+ | ✓ | [ ] |
| Firefox | 88+ | ✓ | [ ] |
| Safari | 14+ | ✓ | [ ] |
| Edge | 90+ | ✓ | [ ] |
| Mobile Safari | 14+ | ✓ | [ ] |
| Chrome Mobile | 90+ | ✓ | [ ] |

**Testing Matrix:**
- [ ] All functions work in Chrome
- [ ] All functions work in Firefox
- [ ] All functions work in Safari
- [ ] All functions work in Edge
- [ ] Mobile browser touch events work
- [ ] No console errors in any browser

---

### 2.2 Mobile Device Testing

**Test On Multiple Phones:**

| Device | OS | Screen | Status |
|--------|----|---------|---------
| iPhone 12 | iOS 15+ | 390px | [ ] |
| iPhone SE | iOS 15+ | 375px | [ ] |
| Samsung S21 | Android 12+ | 412px | [ ] |
| Google Pixel | Android 12+ | 412px | [ ] |
| Budget Phone | Android 11 | 320px | [ ] |

**Mobile Testing Checklist:**
- [ ] Text readable without zooming
- [ ] Buttons large enough to tap (44x44px)
- [ ] No horizontal scrolling
- [ ] Product grid displays 2 columns
- [ ] Images load quickly
- [ ] Videos play without buffering
- [ ] Forms work with mobile keyboard
- [ ] WhatsApp opens correctly
- [ ] Touch interactions smooth and responsive
- [ ] Battery usage reasonable (no runaway processes)

---

### 2.3 Tablet Testing

- [ ] Landscape orientation works
- [ ] Portrait orientation works
- [ ] Product grid shows 2-3 columns appropriately
- [ ] Touch events work properly
- [ ] No layout breaks

---

## Phase 3: Performance Testing

### 3.1 Page Load Performance

**Using Google Lighthouse (Chrome DevTools):**

```javascript
// Run in Chrome DevTools Audits tab:
// Target scores:
// - Performance: > 90
// - Accessibility: > 90
// - Best Practices: > 90
// - SEO: > 90
```

**Metrics to Check:**
- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms
- [ ] Time to Interactive (TTI) < 3s
- [ ] Total Blocking Time (TBT) < 300ms

**Test Steps:**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Review results
5. Record scores in table below

| Metric | Mobile | Desktop | Target | Status |
|--------|--------|---------|--------|--------|
| FCP | ___ ms | ___ ms | <1500ms | [ ] ✓ |
| LCP | ___ ms | ___ ms | <2500ms | [ ] ✓ |
| CLS | ___ | ___ | <0.1 | [ ] ✓ |
| FID | ___ ms | ___ ms | <100ms | [ ] ✓ |
| Performance | ___ | ___ | >90 | [ ] ✓ |

---

### 3.2 Image Optimization Testing

```bash
# Check image file sizes
du -h assets/images/products/*
du -h assets/images/icons/*

# Target: < 50KB per product image
# Target: < 100KB for hero image
```

- [ ] Product images < 50KB
- [ ] Hero image < 100KB
- [ ] Icons < 10KB
- [ ] Images in WebP format
- [ ] JPG fallback available
- [ ] Responsive srcset images work
- [ ] Lazy loading works
- [ ] No image quality loss

**Test Code:**
```html
<!-- Right-click image → Inspect -->
<!-- Check style="width: auto; height: auto;" -->
<!-- Check src matches screen size -->
```

---

### 3.3 Video Performance Testing

- [ ] Videos don't auto-play (saves data)
- [ ] Video size < 50MB total
- [ ] WebM format available
- [ ] MP4 fallback available
- [ ] Thumbnail displays before play
- [ ] Preload set to metadata
- [ ] Mobile video loads without buffering
- [ ] Desktop video buffers smoothly
- [ ] Playsinline works on iOS

**Test Code:**
```javascript
// Check video stats
const video = document.querySelector('video');
console.log('Video duration:', video.duration);
console.log('Video loaded:', video.readyState);
console.log('Buffered:', video.buffered);

// Simulate slow network in DevTools:
// 1. F12 → Network tab
// 2. Throttle: Slow 4G or slower
// 3. Reload page
// 4. Watch video load time
```

---

### 3.4 Network Throttling Test

**Chrome DevTools Network Simulation:**

```javascript
// Simulate slow 3G
// DevTools → Network → Throttle: Slow 3G
// Expected load time: 3-4 seconds

// Simulate 4G
// DevTools → Network → Throttle: Fast 4G
// Expected load time: 1-2 seconds
```

- [ ] Page loads under 4s on slow 3G
- [ ] Page loads under 2s on 4G
- [ ] Core content visible within 1.5s
- [ ] Form functional even on slow connection
- [ ] WhatsApp links open correctly on slow network

---

## Phase 4: Functionality Testing

### 4.1 WhatsApp Integration Testing

**Requirements:**
- Have WhatsApp installed on test phone
- Have business WhatsApp number configured

**Test Steps:**

1. **Product Order:**
   - [ ] Click "Order on WhatsApp" button
   - [ ] WhatsApp opens with pre-filled message
   - [ ] Message includes product name
   - [ ] Message includes product price
   - [ ] Message includes product description
   - [ ] Chat opens to correct business number
   - [ ] Message pre-populated (not empty)

2. **Contact Form:**
   - [ ] Fill all form fields correctly
   - [ ] Click "Send via WhatsApp"
   - [ ] WhatsApp opens with message
   - [ ] Message includes: Name
   - [ ] Message includes: Email
   - [ ] Message includes: Phone
   - [ ] Message includes: Message text
   - [ ] Message properly formatted (readable)
   - [ ] Chat opens to correct business number

3. **Phone Number Formatting:**
   - [ ] International format accepted (+1234567890)
   - [ ] National format accepted (1234567890)
   - [ ] Spaces/dashes handled correctly
   - [ ] No invalid numbers accepted

**Test Phone Numbers:**
```
+1 (234) 567-8900  → should format to +12345678900
1234567890         → should format to +11234567890
(234) 567-8900     → should format to +12345678900
```

---

### 4.2 Navigation Testing

- [ ] All navbar links work
- [ ] Navbar sticky (stays at top on scroll)
- [ ] Mobile menu toggle works
- [ ] Mobile menu closes on link click
- [ ] Smooth scroll to sections works
- [ ] Active nav item highlighted
- [ ] Social media links functional

---

### 4.3 Form Testing

**Valid Data:**
- Name: "John Doe"
- Email: "john@example.com"
- Phone: "+1234567890"
- Message: "I'm interested in products"

- [ ] Form accepts valid data
- [ ] Form submits without reset behavior issue
- [ ] Form can be submitted multiple times
- [ ] Form data preserved if validation fails

**Invalid Data Tests:**

| Test Case | Input | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Empty name | "" | Error: Name required | [ ] ✓ |
| Invalid email | "notanemail" | Error: Invalid email | [ ] ✓ |
| Empty phone | "" | Error: Phone required | [ ] ✓ |
| Short phone | "123" | Error: Invalid phone | [ ] ✓ |
| Empty message | "" | Error: Message required | [ ] ✓ |

---

### 4.4 Image Popup Testing

- [ ] Click product image opens GLightbox
- [ ] Full-size image displays
- [ ] Close button works
- [ ] Click outside closes popup
- [ ] Navigation between images works (if multiple)
- [ ] Zoom feature works
- [ ] Mobile popup responsive

---

### 4.5 Animation Testing

- [ ] AOS animations trigger on scroll
- [ ] Animations don't lag or stutter
- [ ] Animations prefers-reduced-motion respected

```javascript
// Test reduced motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

console.log('Respects reduced motion:', prefersReducedMotion);
```

- [ ] All animations smooth (60fps)

---

## Phase 5: Accessibility Testing

### 5.1 Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Tab order logical (left to right, top to bottom)
- [ ] Focus indicators visible (blue border)
- [ ] Can submit form with keyboard only
- [ ] Can open/close mobile menu with keyboard
- [ ] Escape key closes modals

**Test:**
```javascript
// Check tab order
// Do this manually: Press Tab key repeatedly
// Expected: Header → Nav → Hero → Products → Forms → Footer
```

---

### 5.2 Screen Reader Testing

**Using NVDA (Free, Windows) or JAWS:**

- [ ] Page title announced correctly
- [ ] Headings announced in order
- [ ] Images have alt text
- [ ] Alt text is descriptive (not "image" or "pic")
- [ ] Form labels associated with inputs
- [ ] Button text clear and descriptive
- [ ] Links have descriptive text (not "click here")
- [ ] ARIA labels used where needed

**Test Screen Reader (Browser Test):**
```javascript
// Use built-in browser accessibility inspector
// Chrome DevTools → Accessibility tab
// Check for:
// - Missing alt text (images)
// - Missing labels (form inputs)
// - Low contrast (Text)
// - Missing semantic HTML
```

---

### 5.3 Color Contrast Testing

**Online Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Polypane Contrast Checker

**Test Combinations:**
- [ ] Black text on white: 16.6:1 ✓
- [ ] Dark gray text on light gray: Check WCAG AA (4.5:1 min)
- [ ] White text on dark background: Check ratio

```css
/* WCAG AA (minimum 4.5:1 for normal text) */
.text-primary {
  color: #0056b3;  /* Blue */
  background: #ffffff;  /* White */
  /* Ratio: ~8:1 ✓ */
}

.text-danger {
  color: #dc3545;  /* Red */
  background: #ffffff;  /* White */
  /* Ratio: ~4.6:1 ✓ */
}
```

---

## Phase 6: Security Testing

### 6.1 Input Validation

- [ ] Script tags can't be injected
  ```javascript
  // Try entering: <script>alert('XSS')</script>
  // Expected: Rendered as text, not executed
  ```

- [ ] HTML tags can't be injected
  ```javascript
  // Try entering: <img src=x onerror=alert('XSS')>
  // Expected: Rendered as text, not executed
  ```

- [ ] Email validation rejects invalid emails
  - [ ] Rejects: "notanemail"
  - [ ] Rejects: "@example.com"
  - [ ] Rejects: "user@"
  - [ ] Accepts: "user@example.com"

- [ ] Phone validation rejects invalid phones
  - [ ] Rejects: "abc"
  - [ ] Rejects: "12"
  - [ ] Accepts: "1234567890"
  - [ ] Accepts: "+1234567890"

---

### 6.2 HTTPS Testing

- [ ] Site accessible via HTTPS (if deployed)
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] No insecure scripts loaded

```javascript
// Check for insecure resources
window.addEventListener('load', () => {
  const images = Array.from(document.querySelectorAll('img'))
    .filter(img => img.src.startsWith('http://'));
  
  if (images.length > 0) {
    console.warn('Insecure images found:', images);
  }
});
```

---

### 6.3 Data Handling

- [ ] No sensitive data logged to console
- [ ] Form data not stored in localStorage
- [ ] WhatsApp number not exposed in source code
- [ ] No API keys hardcoded

---

## Phase 7: SEO Testing

### 7.1 Meta Tags

- [ ] Meta description present (150-160 chars)
- [ ] Favicon set
- [ ] Open Graph tags for social sharing
- [ ] Mobile viewport meta tag correct

```html
<meta name="description" content="...">
<link rel="icon" href="favicon.ico">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
```

---

### 7.2 Structured Data

- [ ] Product schema (optional)
- [ ] Local business schema (optional)
- [ ] Contact information marked up

```javascript
// Test structured data
// Google Structured Data Testing Tool:
// https://schema.org/validate/
```

---

## Phase 8: Deployment Checklist

### Pre-Launch Review

- [ ] All testing phases completed
- [ ] Lighthouse score > 90 on mobile AND desktop
- [ ] No console errors or warnings
- [ ] All links tested and working
- [ ] All forms working end-to-end
- [ ] WhatsApp integration tested with real device
- [ ] Mobile tested on at least 2 different phones
- [ ] Performance metrics acceptable
- [ ] Accessibility audit passed
- [ ] Security checklist completed
- [ ] Backup of code created
- [ ] Git history clean and committed
- [ ] README updated with deployment info
- [ ] Environment variables documented

### Post-Launch Monitoring

- [ ] Google Analytics set up (optional)
- [ ] Error tracking enabled (Sentry/similar)
- [ ] Monitor Lighthouse scores weekly
- [ ] Monitor real user metrics (CWV)
- [ ] Check for broken links monthly
- [ ] Review console errors in production

---

## Quick Test Automation Script

```bash
#!/bin/bash
# test.sh - Run all checks

echo "🔍 Starting test suite..."
echo ""

echo "1️⃣  HTML Validation"
npm install -g html-validator-cli 2>/dev/null
html-validator index.html || echo "⚠️  Install html-validator"

echo ""
echo "2️⃣  CSS Linting"
npm install -g stylelint 2>/dev/null
stylelint css/style.css || echo "⚠️  Install stylelint"

echo ""
echo "3️⃣  JavaScript Linting"
npm install -g eslint 2>/dev/null
eslint js/*.js || echo "⚠️  Install eslint"

echo ""
echo "4️⃣  Performance Audit"
npx lighthouse http://localhost:8000 --output=json --output-path=./lighthouse.json
echo "✅ Lighthouse report saved to lighthouse.json"

echo ""
echo "5️⃣  Checking image sizes"
du -sh assets/images/* | awk '{print "  " $0}'

echo ""
echo "✅ Test suite complete!"
```

---

## Test Result Summary Template

```markdown
# Test Results - [Date]

## Lighthouse Scores
- Mobile Performance: __/100
- Desktop Performance: __/100
- Accessibility: __/100
- Best Practices: __/100
- SEO: __/100

## Devices Tested
- [x] Desktop (Chrome)
- [ ] Tablet (iPad)
- [ ] Mobile (iPhone)
- [ ] Mobile (Android)

## Critical Issues Found
1. Issue: ___
   Status: [ ] Fixed [ ] Deferred

2. Issue: ___
   Status: [ ] Fixed [ ] Deferred

## Confirmation
- [ ] All critical issues fixed
- [ ] Performance acceptable
- [ ] Accessibility passed
- [ ] Ready for launch

Tested By: ___________
Date: ___________
```

---

**Note:** Use this checklist throughout development. Update as you discover new edge cases or requirements.

