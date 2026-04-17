# Project Plan: UI Structure & JavaScript Architecture

## Part 1: UI Structure (Dev 1 Focus)

### 1.1 HTML Layout Overview

```
┌─────────────────────────────────────┐
│  HEADER (Navigation + Logo)         │
├─────────────────────────────────────┤
│  HERO SECTION (Banner + CTA)        │
├─────────────────────────────────────┤
│  PRODUCTS GRID (2x3)                │
│  - Product Cards (6 items)          │
│  - Click → WhatsApp Order           │
├─────────────────────────────────────┤
│  VIDEO SECTION #1                   │
│  - Title + Description              │
│  - Production Showcase Video        │
├─────────────────────────────────────┤
│  FEATURES SECTION (Optional)        │
│  - Why Choose Us + Icons            │
├─────────────────────────────────────┤
│  VIDEO SECTION #2                   │
│  - Title + Description              │
│  - Production Showcase Video        │
├─────────────────────────────────────┤
│  CONTACT FORM                       │
│  - Name, Email, Phone, Message      │
│  - Submit Button → WhatsApp         │
├─────────────────────────────────────┤
│  SOCIAL ICONS SECTION               │
│  - Facebook, Instagram, Twitter     │
│  - Hover Effects                    │
├─────────────────────────────────────┤
│  FOOTER (Copyright + Links)         │
└─────────────────────────────────────┘
```

### 1.2 Component Breakdown

#### Header (Sticky Navigation)
```html
<header>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#home">YourBrand</a>
      <button class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li><a class="nav-link" href="#products">Products</a></li>
          <li><a class="nav-link" href="#features">Features</a></li>
          <li><a class="nav-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
</header>
```

**Key Points:**
- Sticky positioning for easy navigation
- Mobile hamburger menu (Bootstrap collapse)
- Brand logo/name on left
- Navigation links on right (desktop), hidden on mobile

---

#### Hero Section
```html
<section id="home" class="hero-section py-5">
  <div class="container text-center">
    <h1 class="display-5">Welcome to Your Store</h1>
    <p class="lead">Quality Products at Best Prices</p>
    <button class="btn btn-primary btn-lg">Shop Now</button>
  </div>
</section>
```

**Key Points:**
- Full width on mobile
- Centered text
- Call-to-action button
- Hero image as background (CSS background-image or img tag)

---

#### Product Grid (2x3 Mobile Layout)
```html
<section id="products" class="products-section py-5">
  <div class="container">
    <h2 class="text-center mb-4">Our Products</h2>
    <div class="row g-4">
      <!-- 6 Product Cards -->
      <div class="col-6 col-md-4">
        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="assets/images/products/product1.jpg" alt="Product 1" class="img-fluid">
            <a href="assets/images/products/product1-full.jpg" class="glightbox-product">
              <span class="zoom-icon">🔍</span>
            </a>
          </div>
          <div class="product-info">
            <h5>Product Name</h5>
            <p class="product-description">Short description</p>
            <p class="product-price text-primary"><strong>$XX.XX</strong></p>
            <button class="btn btn-sm btn-success w-100 order-btn" data-product-id="1">
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
      <!-- Repeat for 6 products -->
    </div>
  </div>
</section>
```

**Key Points:**
- col-6 col-md-4 = 2 on mobile, 3 on tablet+
- Product cards with images
- GLightbox popup for full images
- Order button with data-product-id
- Consistent pricing and description

**Product Card Structure:**
```
┌────────────────────┐
│  Product Image     │
│  [Zoom Icon]       │  ← GLightbox trigger
├────────────────────┤
│ Product Name       │
│ Short Description  │
│ Price: $XX.XX      │
│ [ Order Button ]   │  ← WhatsApp integration
└────────────────────┘
```

---

#### Video Sections (2 Total)
```html
<section id="video-1" class="video-section py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-4">How We Work</h2>
    <div class="row align-items-center">
      <div class="col-lg-6">
        <p>Production process explanation text...</p>
      </div>
      <div class="col-lg-6">
        <video width="100%" height="auto" controls playsinline>
          <source src="assets/videos/production-showcase-1.mp4" type="video/mp4">
          Your browser doesn't support HTML5 video.
        </video>
      </div>
    </div>
  </div>
</section>

<!-- Repeat for Video Section #2 -->
```

**Key Points:**
- Responsive video (width: 100%)
- playsinline attribute for mobile
- controls for user interaction
- Text + video side-by-side (desktop), stacked (mobile)
- Background color alternation (light/white)

---

#### Contact Form
```html
<section id="contact" class="contact-section py-5">
  <div class="container">
    <h2 class="text-center mb-4">Get in Touch</h2>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <form id="contact-form" class="contact-form" novalidate>
          <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="name" name="name" required>
            <div class="invalid-feedback">Name is required.</div>
          </div>
          
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" required>
            <div class="invalid-feedback">Valid email required.</div>
          </div>
          
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="phone" name="phone" required>
            <div class="invalid-feedback">Phone number required.</div>
          </div>
          
          <div class="mb-3">
            <label for="message" class="form-label">Message</label>
            <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
            <div class="invalid-feedback">Message is required.</div>
          </div>
          
          <button type="submit" class="btn btn-primary w-100">Send via WhatsApp</button>
        </form>
      </div>
    </div>
  </div>
</section>
```

**Key Points:**
- Bootstrap form validation
- novalidate attribute (custom validation via JS)
- Required fields with feedback
- Responsive width (full on mobile, col-lg-6 on desktop)
- Textarea for longer messages

---

#### Social Icons Section
```html
<section class="social-section py-5 bg-dark text-white">
  <div class="container text-center">
    <h3 class="mb-4">Follow Us</h3>
    <div class="social-icons">
      <a href="#facebook" class="social-icon facebook" title="Facebook">
        <i class="fab fa-facebook"></i>
      </a>
      <a href="#instagram" class="social-icon instagram" title="Instagram">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#twitter" class="social-icon twitter" title="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#whatsapp" class="social-icon whatsapp" title="WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
  </div>
</section>
```

**Key Points:**
- Icon library: Font Awesome 6
- Hover effects for each platform
- Links to social profiles
- Dark background for contrast

---

### 1.3 Responsive Breakpoints

```css
/* Mobile-first approach */
/* 320px - 575px: Mobile phones */
/* 576px - 767px: Phablets */
/* 768px - 991px: Tablets */
/* 992px - 1199px: Small desktops */
/* 1200px+: Large desktops */

/* Bootstrap Grid Classes */
col-6       /* 2 columns on mobile (50% width each) */
col-md-4    /* 3 columns on tablets+ (33.33% width each) */
col-lg-6    /* 6 columns on large screens */
```

---

### 1.4 CSS Naming Convention (BEM)

```
Block__Element--Modifier

Examples:
.product-card
.product-card__image
.product-card__image--hover
.product-card__info
.product-card__price--sale

.social-icons
.social-icons__item
.social-icons__icon--facebook
.social-icons__icon--facebook:hover
```

---

## Part 2: JavaScript Architecture (Dev 2 Focus)

### 2.1 Application Structure

```
js/
├── app.js              # Main controller & initialization
├── whatsapp.js         # WhatsApp API integration
├── forms.js            # Form validation & handling
└── ui.js               # UI interactions & animations
```

### 2.2 Module Breakdown

#### app.js - Main Application
```javascript
// CONFIGURATION
const CONFIG = {
  WHATSAPP_NUMBER: '+1234567890',  // Your business WhatsApp number
  PRODUCT_CURRENCY: 'USD',
  FORM_SUBMIT_DELAY: 500,
};

// APPLICATION STATE
const appState = {
  products: [],
  selectedProduct: null,
  formData: {},
  isLoading: false,
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  initializeLibraries();
});

function initializeApp() {
  loadProducts();
  loadAOS();
  loadGLightbox();
}

function setupEventListeners() {
  // Product order buttons
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', handleProductOrder);
  });
  
  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

function initializeLibraries() {
  AOS.init({
    duration: 800,
    once: true,
    disable: 'phone'
  });
}
```

**Key Points:**
- Centralized CONFIG object for easy maintenance
- appState tracks application data
- DOMContentLoaded ensures DOM is ready
- Module separation for maintainability

---

#### whatsapp.js - WhatsApp Integration
```javascript
class WhatsAppAPI {
  constructor(businessNumber) {
    this.businessNumber = businessNumber;
    this.messageTemplate = 'https://wa.me/{number}?text={message}';
  }

  // Format number to international format
  formatPhoneNumber(number) {
    // Remove non-numeric characters
    const cleaned = number.replace(/\D/g, '');
    // Add country code if missing (adjust as needed)
    return cleaned.length === 10 ? `1${cleaned}` : cleaned;
  }

  // Generate product order message
  generateProductMessage(product) {
    return `Hello! I'm interested in ordering:\n\n` +
           `Product: ${product.name}\n` +
           `Price: $${product.price}\n` +
           `Description: ${product.description}\n\n` +
           `Please confirm availability and shipping details.`;
  }

  // Generate contact form message
  generateContactMessage(formData) {
    return `New Customer Inquiry:\n\n` +
           `Name: ${formData.name}\n` +
           `Email: ${formData.email}\n` +
           `Phone: ${formData.phone}\n\n` +
           `Message:\n${formData.message}`;
  }

  // Open WhatsApp with pre-formatted message
  sendMessage(message, recipientNumber = null) {
    const number = recipientNumber || this.businessNumber;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  }

  // Send product order
  sendProductOrder(product) {
    const message = this.generateProductMessage(product);
    this.sendMessage(message);
  }

  // Send contact form
  sendContactMessage(formData) {
    const message = this.generateContactMessage(formData);
    this.sendMessage(message);
  }
}

// Initialize WhatsApp API
const whatsappAPI = new WhatsAppAPI(CONFIG.WHATSAPP_NUMBER);
```

**Key Points:**
- Class-based design for reusability
- Method encapsulation
- Phone number formatting
- Message templates for consistency
- URL encoding for special characters

---

#### forms.js - Form Handling
```javascript
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.fields = {
      name: { selector: '#name', required: true, type: 'text' },
      email: { selector: '#email', required: true, type: 'email' },
      phone: { selector: '#phone', required: true, type: 'tel' },
      message: { selector: '#message', required: true, type: 'text' },
    };
  }

  // Validate individual field
  validateField(fieldName) {
    const fieldConfig = this.fields[fieldName];
    const field = document.querySelector(fieldConfig.selector);
    const value = field.value.trim();
    
    // Required validation
    if (fieldConfig.required && !value) {
      this.showError(field, `${fieldName} is required`);
      return false;
    }

    // Type-specific validation
    switch (fieldConfig.type) {
      case 'email':
        if (!this.validateEmail(value)) {
          this.showError(field, 'Invalid email format');
          return false;
        }
        break;
      case 'tel':
        if (!this.validatePhone(value)) {
          this.showError(field, 'Invalid phone number');
          return false;
        }
        break;
    }

    this.clearError(field);
    return true;
  }

  // Validate entire form
  validateForm() {
    let isValid = true;
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    return isValid;
  }

  // Email regex validation
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Phone number validation (basic - adjust for your region)
  validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
  }

  // Show error message
  showError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    const feedback = field.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = message;
    }
  }

  // Clear error message
  clearError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  }

  // Get form data
  getFormData() {
    const data = {};
    Object.keys(this.fields).forEach(fieldName => {
      const selector = this.fields[fieldName].selector;
      data[fieldName] = document.querySelector(selector).value.trim();
    });
    return data;
  }

  // Reset form
  reset() {
    this.form.reset();
    this.form.querySelectorAll('.form-control').forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
    });
  }
}

// Initialize form validator
const contactFormValidator = new FormValidator('#contact-form');
```

**Key Points:**
- Centralized validation logic
- Field configuration object
- Type-specific validation (email, phone)
- Visual feedback (is-invalid, is-valid classes)
- Form reset functionality

---

#### ui.js - UI Interactions
```javascript
class UIManager {
  constructor() {
    this.animationDuration = 300;
  }

  // Smooth scroll to section
  smoothScroll(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Show loading state
  showLoader(element) {
    element.disabled = true;
    element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  }

  // Hide loading state
  hideLoader(element) {
    element.disabled = false;
    element.innerHTML = 'Send via WhatsApp';
  }

  // Show success message
  showSuccess(message = 'Message sent successfully!') {
    this.showAlert(message, 'success');
  }

  // Show error message
  showError(message = 'An error occurred. Please try again.') {
    this.showAlert(message, 'danger');
  }

  // Generic alert function
  showAlert(message, type = 'info') {
    const alertHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    
    const alertContainer = document.getElementById('alert-container') || 
                          document.querySelector('main') || 
                          document.body;
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = alertHTML;
    alertContainer.insertBefore(tempDiv.firstElementChild, alertContainer.firstChild);
  }

  // Animate element on scroll
  observeElement(selector, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  // Generate product cards dynamically (if needed)
  generateProductCard(product) {
    return `
      <div class="col-6 col-md-4">
        <div class="product-card" data-aos="fade-up">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="img-fluid">
            <a href="${product.imageFull}" class="glightbox-product" data-glightbox>
              <span class="zoom-icon">🔍</span>
            </a>
          </div>
          <div class="product-info">
            <h5>${product.name}</h5>
            <p class="product-description">${product.description}</p>
            <p class="product-price text-primary"><strong>$${product.price}</strong></p>
            <button class="btn btn-sm btn-success w-100 order-btn" data-product-id="${product.id}">
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize UI Manager
const uiManager = new UIManager();
```

**Key Points:**
- Centralized UI operations
- Loader animations
- Alert system
- Intersection Observer for scroll animations
- Dynamic content generation

---

### 2.3 Event Handler Functions

```javascript
// Handle product order click
function handleProductOrder(event) {
  const productId = event.target.dataset.productId;
  const product = appState.products.find(p => p.id === productId);
  
  if (product) {
    whatsappAPI.sendProductOrder(product);
    uiManager.showSuccess(`Redirecting to WhatsApp...`);
  }
}

// Handle contact form submission
function handleContactSubmit(event) {
  event.preventDefault();
  
  if (!contactFormValidator.validateForm()) {
    uiManager.showError('Please fill all required fields correctly');
    return;
  }

  const submitButton = event.target.querySelector('button[type="submit"]');
  uiManager.showLoader(submitButton);

  // Simulate processing delay
  setTimeout(() => {
    const formData = contactFormValidator.getFormData();
    whatsappAPI.sendContactMessage(formData);
    
    contactFormValidator.reset();
    uiManager.hideLoader(submitButton);
    uiManager.showSuccess('Form submitted! Opening WhatsApp...');
  }, CONFIG.FORM_SUBMIT_DELAY);
}

// Load products (mock data or API)
function loadProducts() {
  appState.products = [
    {
      id: '1',
      name: 'Product 1',
      price: '29.99',
      description: 'High-quality product description',
      image: 'assets/images/products/product1.jpg',
      imageFull: 'assets/images/products/product1-full.jpg'
    },
    // Add 5 more products...
  ];
}

// Load AOS library
function loadAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      disable: window.innerWidth < 768 ? 'phone' : false
    });
  }
}

// Load GLightbox library
function loadGLightbox() {
  if (window.GLightbox) {
    GLightbox({
      selector: '.glightbox-product'
    });
  }
}
```

---

### 2.4 Data Structure

```javascript
// Product Object
{
  id: '1',
  name: 'Product Name',
  price: '29.99',
  description: 'Product description',
  image: 'assets/images/products/product1.jpg',
  imageFull: 'assets/images/products/product1-full.jpg',
  category: 'category-name'
}

// Form Data Object
{
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  message: 'Customer message'
}

// Global Config Object
{
  WHATSAPP_NUMBER: '+1234567890',
  PRODUCT_CURRENCY: 'USD',
  FORM_SUBMIT_DELAY: 500
}
```

---

## Part 3: Integration Checklist

- [ ] HTML structure matches layout from Part 1.1
- [ ] CSS mobile-first styles implemented
- [ ] JavaScript modules loaded in correct order
- [ ] WhatsApp number configured in CONFIG
- [ ] Product data loaded and displayed
- [ ] Form validation working for all fields
- [ ] GLightbox popup working for product images
- [ ] AOS animations working on scroll
- [ ] Contact form submits to WhatsApp
- [ ] Social media icons functional
- [ ] Mobile responsiveness tested
- [ ] Performance optimized (images, videos)
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90

---

**Next Steps:**
1. Dev 1: Create HTML structure using index.html template
2. Dev 2: Implement JavaScript modules using guides above
3. Both: Reference BEST_PRACTICES.md for optimization
4. Both: Use TESTING_CHECKLIST.md before deployment

