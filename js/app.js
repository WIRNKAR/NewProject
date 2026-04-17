/**
 * ============================================================
 * APP.JS - Main Application Controller
 * Handles initialization, configuration, and global state
 * ============================================================
 */

// ==================== GLOBAL CONFIGURATION ====================

const CONFIG = {
    // WhatsApp Business Number (Format: +country_code + number)
    WHATSAPP_NUMBER: '+23767686995',  // Beli Metal Fabrication WhatsApp
    
    // Application Settings
    PRODUCT_CURRENCY: 'XAF',
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
// Metal Fabrication Products for Beli

const SAMPLE_PRODUCTS = [
    {
        id: '1',
        name: 'Steel Structural Beams',
        price: 'Quote on Request',
        description: 'High-quality steel beams for construction and infrastructure projects',
        image: 'https://via.placeholder.com/400x400?text=Steel+Beams',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Steel+Beams+Full'
    },
    {
        id: '2',
        name: 'Custom Welded Frames',
        price: 'Quote on Request',
        description: 'Custom fabricated metal frames for various industrial applications',
        image: 'https://via.placeholder.com/400x400?text=Welded+Frames',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Welded+Frames+Full'
    },
    {
        id: '3',
        name: 'Steel Staircases',
        price: 'Quote on Request',
        description: 'Modern and durable steel staircases with custom designs',
        image: 'https://via.placeholder.com/400x400?text=Staircases',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Staircases+Full'
    },
    {
        id: '4',
        name: 'Metal Gates & Railings',
        price: 'Quote on Request',
        description: 'Decorative and functional metal gates with elegant designs',
        image: 'https://via.placeholder.com/400x400?text=Gates+Railings',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Gates+Railings+Full'
    },
    {
        id: '5',
        name: 'Industrial Piping',
        price: 'Quote on Request',
        description: 'High-grade welded pipes for industrial and commercial use',
        image: 'https://via.placeholder.com/400x400?text=Industrial+Pipes',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Industrial+Pipes+Full'
    },
    {
        id: '6',
        name: 'Custom Metal Containers',
        price: 'Quote on Request',
        description: 'Custom-built metal containers and tanks for storage solutions',
        image: 'https://via.placeholder.com/400x400?text=Metal+Containers',
        imageFull: 'https://via.placeholder.com/1000x1000?text=Metal+Containers+Full'
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
    renderGallery();
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
 * Render gallery items to the DOM
 */
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) {
        console.warn('⚠️ Gallery grid not found');
        return;
    }
    
    // Use products as gallery items
    const galleryHTML = appState.products
        .map(item => `
            <div class="gallery-item" data-aos="fade-up">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <a href="${item.imageFull}" class="glightbox-gallery" data-glightbox="gallery: welding">
                    <span class="gallery-icon"><i class="fas fa-search-plus"></i></span>
                </a>
            </div>
        `)
        .join('');
    
    galleryGrid.innerHTML = galleryHTML;
    
    // Reinitialize AOS for dynamically added elements
    if (window.AOS && !CONFIG.REDUCE_MOTION) {
        AOS.refresh();
    }
    
    // Reinitialize GLightbox for gallery
    if (window.GLightbox) {
        GLightbox({
            selector: '.glightbox-gallery',
        });
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
