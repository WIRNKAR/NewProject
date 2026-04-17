/**
 * ============================================================
 * UI.JS - User Interface Management
 * Handles UI interactions, animations, and feedback
 * ============================================================
 */

class UIManager {
    /**
     * Initialize UI Manager
     */
    constructor() {
        this.animationDuration = 300;
        this.alertTimeout = 5000; // 5 seconds

        console.log('✅ UI Manager initialized');
    }

    // ==================== LOADER & FEEDBACK ====================

    /**
     * Show loading state on element (usually button)
     * @param {HTMLElement} element - Element to show loader on
     * @param {string} [loadingText] - Optional custom loading text
     */
    showLoader(element) {
        if (!element) return;

        element.disabled = true;
        element.setAttribute('data-original-html', element.innerHTML);
        element.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span>Sending...</span>
        `;

        console.log('⏳ Loader shown');
    }

    /**
     * Hide loading state on element
     * @param {HTMLElement} element - Element to hide loader on
     */
    hideLoader(element) {
        if (!element) return;

        const originalHTML = element.getAttribute('data-original-html');
        element.innerHTML = originalHTML || 'Send via WhatsApp';
        element.disabled = false;

        console.log('✅ Loader hidden');
    }

    /**
     * Show success message
     * @param {string} [message] - Optional custom message
     */
    showSuccess(message = 'Operation completed successfully!') {
        this.showAlert(message, 'success');
    }

    /**
     * Show error message
     * @param {string} [message] - Optional custom message
     */
    showError(message = 'An error occurred. Please try again.') {
        this.showAlert(message, 'danger');
    }

    /**
     * Show warning message
     * @param {string} [message] - Optional custom message
     */
    showWarning(message = 'Please note this information.') {
        this.showAlert(message, 'warning');
    }

    /**
     * Show info message
     * @param {string} [message] - Optional custom message
     */
    showInfo(message = 'Information') {
        this.showAlert(message, 'info');
    }

    /**
     * Generic alert/notification function
     * @param {string} message - Message to display
     * @param {string} [type] - Alert type: success, danger, warning, info
     */
    showAlert(message, type = 'info') {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${this.getAlertIcon(type)}</strong> ${this.escapeHTML(message)}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Find or create alert container
        let alertContainer = document.getElementById('alert-container');
        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.id = 'alert-container';
            alertContainer.className = 'position-fixed top-0 start-50 translate-middle-x';
            alertContainer.style.zIndex = '9999';
            alertContainer.style.width = '90%';
            alertContainer.style.maxWidth = '500px';
            alertContainer.style.marginTop = '20px';
            document.body.insertBefore(alertContainer, document.body.firstChild);
        }

        // Create temporary wrapper for HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = alertHTML;
        const alertElement = tempDiv.firstElementChild;

        // Add to container
        alertContainer.insertBefore(alertElement, alertContainer.firstChild);

        // Auto-remove after timeout
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.remove();
            }
        }, this.alertTimeout);

        console.log(`📢 ${type.toUpperCase()}: ${message}`);
    }

    /**
     * Get icon for alert type
     * @param {string} type - Alert type
     * @returns {string} Icon HTML
     */
    getAlertIcon(type) {
        const icons = {
            success: '✅',
            danger: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    // ==================== SCROLLING & NAVIGATION ====================

    /**
     * Smooth scroll to element
     * @param {string} selector - CSS selector of target element
     * @param {number} [offset] - Optional scroll offset in pixels
     */
    smoothScroll(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Scroll target not found: ${selector}`);
            return;
        }

        const targetPosition = element.offsetTop - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        console.log(`📍 Scrolling to ${selector}`);
    }

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} Whether element is visible
     */
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // ==================== ANIMATIONS ====================

    /**
     * Observe and animate elements when they scroll into view
     * @param {string} selector - CSS selector of elements to observe
     * @param {Function} callback - Callback when element enters viewport
     */
    observeElement(selector, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeof callback === 'function') {
                        callback(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });

        console.log(`👁️ Observing elements: ${selector}`);
    }

    /**
     * Fade in animation
     * @param {HTMLElement} element - Element to fade in
     * @param {number} [duration] - Duration in ms
     */
    fadeIn(element, duration = this.animationDuration) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.display = 'block';

        requestAnimationFrame(() => {
            element.style.transition = `opacity ${duration}ms ease-in`;
            element.style.opacity = '1';
        });
    }

    /**
     * Fade out animation
     * @param {HTMLElement} element - Element to fade out
     * @param {number} [duration] - Duration in ms
     */
    fadeOut(element, duration = this.animationDuration) {
        if (!element) return;

        element.style.transition = `opacity ${duration}ms ease-out`;
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    }

    /**
     * Shake animation for error emphasis
     * @param {HTMLElement} element - Element to shake
     */
    shake(element) {
        if (!element) return;

        element.style.animation = 'shake 0.5s';

        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }

    // ==================== DYNAMIC CONTENT GENERATION ====================

    /**
     * Generate product card HTML
     * @param {Object} product - Product object
     * @returns {string} HTML string for product card
     */
    generateProductCard(product) {
        if (!product || !product.id) {
            console.error('❌ Invalid product data');
            return '';
        }

        return `
            <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up">
                <div class="product-item" data-product-id="${product.id}">
                    <img 
                        src="${this.escapeHTML(product.image)}" 
                        alt="${this.escapeHTML(product.name)}" 
                        class="img-fluid"
                        loading="lazy"
                    />
                    <a href="${this.escapeHTML(product.imageFull)}" 
                       class="glightbox" 
                       data-glightbox="gallery: products"
                       title="${this.escapeHTML(product.name)}">
                        <span class="gallery-icon">
                            <i class="fas fa-search-plus"></i>
                        </span>
                    </a>
                </div>
            </div>
        `;
    }

    // ==================== UTILITY FUNCTIONS ====================

    /**
     * Escape HTML special characters to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHTML(text) {
        if (!text) return '';

        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return text.replace(/[&<>"']/g, char => map[char]);
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success indicator
     */
    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text)
                .then(() => {
                    this.showSuccess('Copied to clipboard!');
                    return true;
                })
                .catch(() => {
                    this.showError('Failed to copy');
                    return false;
                });
        }

        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            this.showSuccess('Copied to clipboard!');
            document.body.removeChild(textarea);
            return Promise.resolve(true);
        } catch (error) {
            this.showError('Failed to copy');
            document.body.removeChild(textarea);
            return Promise.resolve(false);
        }
    }

    /**
     * Format number with currency
     * @param {number} amount - Amount to format
     * @param {string} [currency] - Currency code
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount, currency = CONFIG.PRODUCT_CURRENCY) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    /**
     * Disable all form inputs temporarily
     * @param {HTMLFormElement} form - Form to disable
     */
    disableForm(form) {
        if (!form) return;
        form.querySelectorAll('input, textarea, button, select').forEach(el => {
            el.disabled = true;
        });
    }

    /**
     * Enable all form inputs
     * @param {HTMLFormElement} form - Form to enable
     */
    enableForm(form) {
        if (!form) return;
        form.querySelectorAll('input, textarea, button, select').forEach(el => {
            el.disabled = false;
        });
    }
}

// ==================== ADD SHAKE ANIMATION ====================

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE UI MANAGER ====================

const uiManager = new UIManager();

console.log('✅ UI Manager module loaded');
