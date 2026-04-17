# DEV 1: UI/UX DEVELOPER GUIDE ✅
## Your Step-by-Step Instruction Manual

**Created For:** Dev 1 (UI/UX Designer/Developer)  
**Tech Focus:** HTML5, CSS3, Bootstrap 5, Responsive Design  
**Time Estimate:** 3-5 hours  
**Status:** Ready to start ✅

---

## 🎯 Your Job (Summary)

You are responsible for all visual design, layout, and styling. Your work ensures the website looks beautiful and works perfectly on mobile, tablet, and desktop devices.

**Your Main Tasks:**
1. Add real product images (6 items)
2. Customize colors and fonts to match your brand
3. Optimize images for mobile devices
4. Test on actual phones for layout & responsiveness
5. Ensure accessibility (colors, text sizes)

**Dev 2 will handle:** JavaScript, WhatsApp integration, form validation, animations

---

## ✅ Task Checklist (In Order)

### Task 1: Update Hero Section
**File:** `index.html` (lines 70-78)
- Change h1 from "Welcome to Our Store" to your brand tagline
- Change p from "Premium quality products..." to your brand promise

**Deliverable:** ✓ Personalized hero text

---

### Task 2: Add Product Images (CRITICAL)
**Location:** `assets/images/products/`
- Create 6 images: product1.jpg, product2.jpg, ... product6.jpg
- Size: 400x400 pixels (square)
- Format: JPG, < 50KB each
- Use TinyPNG.com to compress

**Deliverable:** ✓ 6 product images in assets folder

---

### Task 3: Update Product Data
**File:** `js/app.js` (lines 30-65)
- Update SAMPLE_PRODUCTS array
- Change product names, prices, descriptions
- Update image paths to: `assets/images/products/product1.jpg`

**Deliverable:** ✓ All 6 products with real data

---

### Task 4: Customize Brand Colors
**File:** `css/style.css` (lines 10-24)
- Edit `:root` CSS variables
- Change `--primary-color` to your main brand color (hex code)
- Keep `--success-color: #198754` (WhatsApp green)
- Keep `--danger-color: #dc3545` (error red)

**Deliverable:** ✓ Custom brand colors in CSS

---

### Task 5: Add Production Videos
**Location:** `assets/videos/`
- Upload 2 videos: production-showcase-1.mp4, production-showcase-2.mp4
- Format: MP4, < 10MB each, 720p max
- Optional: video1-thumbnail.jpg, video2-thumbnail.jpg

**Deliverable:** ✓ 2 videos in assets folder

---

### Task 6: Mobile Responsiveness Testing
**Test on real devices!**
- Mobile 320px → 2 product columns
- Tablet 768px → 3 product columns
- Desktop 1024px+ → Full layout
- Check: readable text, proper image scaling, no horizontal scrolling

**Deliverable:** ✓ Tested on mobile, tablet, desktop

---

### Task 7: Optimize All Images
**Make images load fast!**
- All product images: 400x400, JPG, 75-80% quality
- File size: < 50KB each
- Total all 6: < 300KB
- Use TinyPNG.com (free)

**Deliverable:** ✓ All images < 50KB

---

### Task 8: Update Footer
**File:** `index.html` (line 265)
- Change `&copy; 2024 Your Store` to `&copy; 2026 YOUR COMPANY NAME`

**Deliverable:** ✓ Footer updated

---

### Task 9: Update Navbar Brand
**File:** `index.html` (line 31)
- Change `YourStore` to `YOUR BRAND NAME`

**Deliverable:** ✓ Brand name in navbar

---

### Task 10: Final Quality Check
Before handing off to Dev 2:
- [ ] All images load (no broken images)
- [ ] Colors match brand
- [ ] Responsive on 3 device sizes
- [ ] No console errors (F12)
- [ ] Lighthouse score > 90
- [ ] Hero section branded
- [ ] Videos play correctly
- [ ] Footer/navbar updated
- [ ] Accessibility good (readable colors, text sizes)

**Deliverable:** ✓ Quality checked

---

## Git Commits for Each Task

```bash
git add index.html
git commit -m "[dev1] Update hero section with brand messaging"

git add assets/images/products/
git commit -m "[dev1] Add 6 product images"

git add js/app.js
git commit -m "[dev1] Update product data with real information"

git add css/style.css
git commit -m "[dev1] Customize brand colors"

git add .
git commit -m "[dev1] Complete UI/UX customization - ready for Dev 2"
```

---

## ⏱️ Time Breakdown

- Tasks 1-3: 1 hour
- Task 4: 15 mins
- Task 5: 45 mins
- Task 6: 30 mins
- Task 7: 30 mins
- Tasks 8-10: 15 mins
- Buffer: 15-30 mins
- **TOTAL: 3-4 hours**

---

**START WITH TASK 1 NOW!** ✅
