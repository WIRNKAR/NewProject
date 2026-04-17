/**
 * ============================================================
 * APP.JS - Main Application Controller
 * Handles initialization, configuration, and global state
 * ============================================================
 */

// ==================== GLOBAL CONFIGURATION ====================

const CONFIG = {
    // WhatsApp Business Number (Format: +country_code + number)
    WHATSAPP_NUMBER: '+1234567890',  // CHANGE THIS TO YOUR BUSINESS NUMBER
    
    // Application Settings
    PRODUCT_CURRENCY: 'USD',
    FORM_SUBMIT_DELAY: 500,
    
    // Feature Flags
    ENABLE_AOS: true,
    ENABLE_GLIGHTBOX: true,
    REDUCE_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

// ==================== APPLICATION STATE ====================

const appState = {
    products: [],
    selectedProduct: null,
    formData: {},
    isLoading: false,
    isFormSubmitting: false,
};

// ==================== SAMPLE PRODUCTS DATA ====================
// Replace with actual product data or fetch from API

const SAMPLE_PRODUCTS = [
    {
        id: '1',
        name: 'Premium Leather Handbag',
        price: '29.99',
        description: 'High-quality leather handbag with adjustable straps',
        image: 'https://via.placeholder.com/400x400?text=Product+1',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+1+Full'
    },
    {
        id: '2',
        name: 'Classic Watch',
        price: '49.99',
        description: 'Elegant timepiece with stainless steel case',
        image: 'https://via.placeholder.com/400x400?text=Product+2',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+2+Full'
    },
    {
        id: '3',
        name: 'Sunglasses Collection',
        price: '39.99',
        description: 'UV protection with trendy design',
        image: 'https://via.placeholder.com/400x400?text=Product+3',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+3+Full'
    },
    {
        id: '4',
        name: 'Wireless Headphones',
        price: '79.99',
        description: 'Noise-canceling with premium sound quality',
        image: 'https://via.placeholder.com/400x400?text=Product+4',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+4+Full'
    },
    {
        id: '5',
        name: 'Phone Case',
        price: '19.99',
        description: 'Durable protection with stylish design',
        image: 'https://via.placeholder.com/400x400?text=Product+5',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+5+Full'
    },
    {
        id: '6',
        name: 'Portable Charger',
        price: '34.99',
        description: 'Fast charging 20000mAh power bank',
        image: 'https://via.placeholder.com/400x400?text=Product+6',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Product+6+Full'
    }
];

// ==================== INITIALIZATION ====================

/**
 * Initialize application on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing application...');
    
    try {
        initializeApp();
        setupEventListeners();
        initializeLibraries();
        
        console.log('✅ Application initialized successfully');
        console.log('📊 App State:', appState);
    } catch (error) {
        console.error('❌ Initialization error:', error);
        uiManager?.showError('Failed to initialize application. Please refresh the page.');
    }
});

/**
 * Main initialization function
 */
function initializeApp() {
    loadProducts();
    renderProducts();
}

/**
 * Setup event listeners for interactive elements
 */
function setupEventListeners() {
    // Product order buttons (delegated event)
    document.addEventListener('click', (e) => {
        if (e.target.closest('.order-btn')) {
            handleProductOrder(e);
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Smooth scroll on nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                // Close mobile menu if open
                document.querySelectorAll('.navbar-collapse').forEach(menu => {
                    if (menu.classList.contains('show')) {
                        new bootstrap.Collapse(menu).hide();
                    }
                });
            }
        });
    });
}

/**
 * Initialize third-party libraries
 */
function initializeLibraries() {
    // Initialize AOS (Animate On Scroll)
    if (CONFIG.ENABLE_AOS && window.AOS && !CONFIG.REDUCE_MOTION) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            disable: window.innerWidth < 768 ? 'mobile' : false
        });
    }
    
    // Initialize GLightbox for image popups
    if (CONFIG.ENABLE_GLIGHTBOX && window.GLightbox) {
        initGLightbox();
    }
}

/**
 * Load products from sample data
 * TODO: Replace with API call
 */
function loadProducts() {
    appState.products = SAMPLE_PRODUCTS;
    console.log(`📦 Loaded ${appState.products.length} products`);
}

/**
 * Render products to the DOM
 */
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.warn('⚠️ Products grid not found');
        return;
    }
    
    if (appState.products.length === 0) {
        productsGrid.innerHTML = '<p class="col-12 text-center text-muted">No products available</p>';
        return;
    }
    
    const productsHTML = appState.products
        .map(product => uiManager.generateProductCard(product))
        .join('');
    
    productsGrid.innerHTML = productsHTML;
    
    // Reinitialize AOS for dynamically added elements
    if (window.AOS && !CONFIG.REDUCE_MOTION) {
        AOS.refresh();
    }
    
    // Reinitialize GLightbox for dynamically added images
    if (window.GLightbox) {
        initGLightbox();
    }
}

/**
 * Initialize GLightbox for product image popups
 */
function initGLightbox() {
    if (window.GLightbox) {
        GLightbox({
            selector: '.glightbox-product',
            afterOpenGallery: () => {
                console.log('📸 Image popup opened');
            }
        });
    }
}

// ==================== EVENT HANDLERS ====================

/**
 * Handle product order button click
 * @param {Event} event - Click event
 */
function handleProductOrder(event) {
    const btn = event.target.closest('.order-btn');
    if (!btn) return;
    
    const productId = btn.getAttribute('data-product-id');
    const product = appState.products.find(p => p.id === productId);
    
    if (!product) {
        console.error('❌ Product not found:', productId);
        uiManager.showError('Product not found');
        return;
    }
    
    console.log('🛍️ Ordering product:', product.name);
    
    try {
        whatsappAPI.sendProductOrder(product);
        uiManager.showSuccess(`Opening WhatsApp to order ${product.name}...`);
    } catch (error) {
        console.error('❌ Error sending product order:', error);
        uiManager.showError('Failed to send order. Please try again.');
    }
}

/**
 * Handle contact form submission
 * @param {Event} event - Submit event
 */
function handleContactSubmit(event) {
    event.preventDefault();
    
    if (appState.isFormSubmitting) {
        console.warn('⚠️ Form submission already in progress');
        return;
    }
    
    // Validate form
    if (!contactFormValidator.validateForm()) {
        console.log('📋 Form validation failed');
        uiManager.showError('Please fill all required fields correctly');
        return;
    }
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    
    // Show loading state
    appState.isFormSubmitting = true;
    uiManager.showLoader(submitButton);
    
    console.log('💬 Processing contact form...');
    
    // Simulate processing delay
    setTimeout(() => {
        try {
            const formData = contactFormValidator.getFormData();
            
            console.log('📧 Form data:', formData);
            
            // Send to WhatsApp
            whatsappAPI.sendContactMessage(formData);
            
            // Reset form
            contactFormValidator.reset();
            
            // Show success
            uiManager.showSuccess('Message sent! Opening WhatsApp...');
            
            console.log('✅ Contact form submitted successfully');
        } catch (error) {
            console.error('❌ Error submitting form:', error);
            uiManager.showError('Failed to send message. Please try again.');
        } finally {
            // Hide loading state
            appState.isFormSubmitting = false;
            uiManager.hideLoader(submitButton);
        }
    }, CONFIG.FORM_SUBMIT_DELAY);
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Log application info (for debugging)
 */
function logAppInfo() {
    console.log('=== Application Info ===');
    console.log('Config:', CONFIG);
    console.log('State:', appState);
    console.log('WhatsApp API:', typeof whatsappAPI);
    console.log('Form Validator:', typeof contactFormValidator);
    console.log('UI Manager:', typeof uiManager);
    console.log('========================');
}

/**
 * Check browser capabilities
 */
function checkBrowserCapabilities() {
    const capabilities = {
        localStorage: typeof Storage !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        fetch: window.fetch !== undefined,
        intersectionObserver: window.IntersectionObserver !== undefined,
    };
    
    console.log('🔍 Browser Capabilities:', capabilities);
    return capabilities;
}

// ==================== EXPORT FOR DEBUGGING ====================

// Make useful items available in console for debugging
window.AppDebug = {
    config: CONFIG,
    state: appState,
    logAppInfo,
    checkBrowserCapabilities,
    reloadProducts: () => {
        loadProducts();
        renderProducts();
        console.log('✅ Products reloaded');
    }
};

console.log('💡 Debug tip: Use window.AppDebug for troubleshooting');
