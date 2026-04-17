# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Clone & Setup
```bash
cd c:\xampp\htdocs\NewProject
git status  # Already initialized
```

### Step 2: Start Local Server
**Option A - Python (Recommended)**
```bash
python -m http.server 8000
# Visit: http://localhost:8000
```

**Option B - PHP (XAMPP)**
```bash
# File is already in htdocs
# Visit: http://localhost/NewProject
```

**Option C - Node.js**
```bash
npx http-server
# Visit: http://localhost:8080
```

### Step 3: Configure WhatsApp Number
Edit `js/app.js` line ~22:
```javascript
const CONFIG = {
    WHATSAPP_NUMBER: '+1234567890',  // ← CHANGE THIS
    // ... rest of config
};
```

### Step 4: Add Product Images
Replace placeholder images in these directories:
- `assets/images/products/` - Product photos (6 items)
- `assets/videos/` - Production videos (2 videos)

### Step 5: Test Everything
1. Open http://localhost:8000 in browser
2. Click "Shop Now" → Products load
3. Click product "Order on WhatsApp" → Opens WhatsApp
4. Scroll down, fill contact form → Submit via WhatsApp

---

## 📁 Project Structure

```
NewProject/
├── index.html                    # Main page
├── css/
│   └── style.css                # Mobile-first styles
├── js/
│   ├── app.js                   # Main app logic
│   ├── whatsapp.js              # WhatsApp integration
│   ├── forms.js                 # Form validation
│   └── ui.js                    # UI interactions
├── assets/
│   ├── images/
│   │   ├── products/            # Product images (add 6)
│   │   └── icons/               # Social icons
│   └── videos/                  # Production videos (add 2)
├── README.md                    # Project overview
├── PROJECT_PLAN.md              # Technical architecture
├── BEST_PRACTICES.md            # Performance guide
├── TESTING_CHECKLIST.md         # QA checklist
└── .gitignore                   # Git ignore rules
```

---

## 👥 Developer Split

### Dev 1: UI/UX (HTML + CSS)
- [ ] Replace placeholder images with real products
- [ ] Customize CSS colors/fonts in `css/style.css`
- [ ] Update product descriptions in `index.html`
- [ ] Optimize images for mobile (guide in BEST_PRACTICES.md)
- [ ] Test responsive design on mobile devices

### Dev 2: Logic (JavaScript)
- [ ] Configure WhatsApp number in `js/app.js`
- [ ] Load real product data (currently using SAMPLE_PRODUCTS)
- [ ] Test form validation with invalid inputs
- [ ] Verify WhatsApp messages format correctly
- [ ] Add analytics/error tracking (optional)

---

## 📝 Key Configuration Files

### app.js (Line ~22)
```javascript
const CONFIG = {
    WHATSAPP_NUMBER: '+1234567890',  // Your business number
    PRODUCT_CURRENCY: 'USD',
    FORM_SUBMIT_DELAY: 500,
    // ...
};
```

### HTML Products (index.html - Line ~130)
```html
<!-- Replace SAMPLE_PRODUCTS in js/app.js with real data -->
<!-- or load from API endpoint -->
```

---

## 🧪 Quick Testing

### Console Commands (F12 → Console)
```javascript
// Check if everything loaded
window.AppDebug.checkBrowserCapabilities()

// View app state
window.AppDebug.logAppInfo()

// Reload products
window.AppDebug.reloadProducts()

// Test form validation
contactFormValidator.validateForm()

// Test WhatsApp message
whatsappAPI.generateProductMessage({
    name: 'Test Product',
    price: '99.99',
    description: 'Test'
})
```

---

## ✅ Pre-Launch Checklist

### Before Going Live:

**Dev 1 - UI/UX:**
- [ ] All 6 product images added
- [ ] Product descriptions updated
- [ ] Colors/fonts customized
- [ ] Mobile tested on 2+ devices
- [ ] Hero section image added
- [ ] Video thumbnails added
- [ ] Videos compressed for web

**Dev 2 - Logic:**
- [ ] WhatsApp number configured
- [ ] Product data loaded correctly
- [ ] Form validation tested with invalid data
- [ ] WhatsApp messages formatted properly
- [ ] No console errors
- [ ] Mobile WhatsApp opens correctly

**Both:**
- [ ] Run Lighthouse audit (target > 90)
- [ ] Test on iPhone + Android
- [ ] Check all links work
- [ ] Verify social media links
- [ ] Test contact form end-to-end
- [ ] Commit to git
- [ ] Create backup

---

## 🎨 Customization Guide

### Change Colors
Edit `css/style.css` CSS Variables (Line ~10):
```css
:root {
    --primary-color: #0d6efd;      /* Blue */
    --success-color: #198754;      /* Green */
    --danger-color: #dc3545;       /* Red */
    /* ... more colors ... */
}
```

### Change Fonts
Edit `css/style.css` (Line ~24):
```css
--font-family-base: 'Your Font Family';
```

### Add More Products
Edit `js/app.js` SAMPLE_PRODUCTS array (Line ~30):
```javascript
const SAMPLE_PRODUCTS = [
    {
        id: '7',
        name: 'New Product',
        price: '49.99',
        // ... more fields
    }
];
```

---

## 📱 Performance Tips

### Image Optimization
```bash
# Compress images (75-80% quality)
# Target: < 50KB per product image

# Use online tools:
# - TinyPNG.com
# - ImageOptim.com
```

### Video Optimization
```bash
# Convert to WebM (save bandwidth)
ffmpeg -i video.mp4 -c:v libvpx-vp9 -b:v 500k output.webm

# Target: Videos < 10MB each
```

### Lighthouse Score
1. Open DevTools (F12)
2. Go to Lighthouse
3. Click "Analyze page load"
4. Target Score: > 90 on all metrics

---

## 🐛 Troubleshooting

### Products Don't Show
```javascript
// Step 1: Check console (F12)
console.log('Products:', appState.products)

// Step 2: Verify HTML grid exists
document.getElementById('productsGrid')

// Step 3: Check for JS errors
// Look in DevTools → Console for red errors
```

### WhatsApp Doesn't Open
```javascript
// Check WhatsApp number format
whatsappAPI.businessNumber  // Should be: +1234567890

// Test message generation
whatsappAPI.generateProductMessage({
    name: 'Test',
    price: '10',
    description: 'Test product'
})
```

### Form Validation Issues
```javascript
// Test single field validation
contactFormValidator.validateField('email')

// Check field configurations
console.log(contactFormValidator.fields)

// Manually validate entire form
contactFormValidator.validateForm()
```

---

## 📚 Documentation References

- **UI/UX Guide:** See [PROJECT_PLAN.md](PROJECT_PLAN.md) Part 1
- **JavaScript Architecture:** See [PROJECT_PLAN.md](PROJECT_PLAN.md) Part 2
- **Performance Guide:** See [BEST_PRACTICES.md](BEST_PRACTICES.md)
- **Testing Guide:** See [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)

---

## 🚀 Deployment

### Recommended Hosting:
1. **Netlify** (Free, auto-deploy from git)
2. **Vercel** (Fast CDN, free tier)
3. **GitHub Pages** (Free for static sites)
4. **XAMPP/Apache** (Local or VPS)

### Before Deploying:
- [ ] Lighthouse score > 90
- [ ] All images optimized
- [ ] No console errors
- [ ] Mobile tested
- [ ] Form works end-to-end
- [ ] WhatsApp integration working

---

## 💡 Next Steps

1. **Replace SAMPLE_PRODUCTS** with real product data
2. **Add real images** to `assets/images/products/`
3. **Customize colors** in CSS to match brand
4. **Add company info** to footer and header
5. **Set WhatsApp number** to business number
6. **Test on multiple devices** before launch
7. **Optimize images/videos** for performance
8. **Deploy to hosting** of choice

---

## ❓ Questions?

**For UI Issues:** Check `BEST_PRACTICES.md` → Mobile-First Design section  
**For JavaScript Issues:** Check `PROJECT_PLAN.md` → Part 2 JavaScript Architecture  
**For Performance:** Check `BEST_PRACTICES.md` → Performance Optimization section  
**For Testing:** Check `TESTING_CHECKLIST.md` for comprehensive QA guide

---

**Last Updated:** April 2026  
**Status:** Ready for Development  
**Version:** 1.0
