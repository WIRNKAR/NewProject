/**
 * ============================================================
 * WHATSAPP.JS - WhatsApp Click-to-Chat API Integration
 * Handles WhatsApp message generation and delivery
 * ============================================================
 */

class WhatsAppAPI {
    /**
     * Initialize WhatsApp API
     * @param {string} businessNumber - Business WhatsApp number with country code
     */
    constructor(businessNumber) {
        this.businessNumber = this.validateAndFormatNumber(businessNumber);
        this.messageTemplate = 'https://wa.me/{number}?text={message}';
        
        console.log('📞 WhatsApp API initialized');
        console.log('Business number:', this.businessNumber);
    }

    /**
     * Validate and format phone number to international format
     * @param {string} number - Phone number to validate
     * @returns {string} Formatted phone number
     */
    validateAndFormatNumber(number) {
        if (!number || typeof number !== 'string') {
            throw new Error('Invalid phone number provided');
        }

        // Remove all non-numeric characters except + at start
        let cleaned = number.replace(/[^\d+]/g, '');
        
        // If starts with +, it's already international
        if (cleaned.startsWith('+')) {
            return cleaned;
        }

        // If 10 digits (US), assume +1
        if (cleaned.length === 10) {
            cleaned = '1' + cleaned;
        }

        // Add + if not present
        if (!cleaned.startsWith('+')) {
            cleaned = '+' + cleaned;
        }

        return cleaned;
    }

    /**
     * Generate WhatsApp message for product order
     * @param {Object} product - Product object with id, name, price, description
     * @returns {string} Formatted message
     */
    generateProductMessage(product) {
        if (!product || !product.name) {
            throw new Error('Invalid product data');
        }

        const message = 
            `Hello! I'm interested in ordering:\n\n` +
            `📦 Product: ${this.escapeString(product.name)}\n` +
            `💰 Price: ${CONFIG.PRODUCT_CURRENCY} ${product.price}\n` +
            `📝 Description: ${this.escapeString(product.description)}\n\n` +
            `Please confirm availability and shipping details.`;

        return message;
    }

    /**
     * Generate WhatsApp message for contact form
     * @param {Object} formData - Form data object with name, email, phone, message
     * @returns {string} Formatted message
     */
    generateContactMessage(formData) {
        if (!formData || !formData.name) {
            throw new Error('Invalid form data');
        }

        const message =
            `🔔 *New Customer Inquiry*\n\n` +
            `👤 Name: ${this.escapeString(formData.name)}\n` +
            `📧 Email: ${this.escapeString(formData.email)}\n` +
            `📱 Phone: ${this.escapeString(formData.phone)}\n\n` +
            `💬 Message:\n${this.escapeString(formData.message)}`;

        return message;
    }

    /**
     * Escape special characters in strings for WhatsApp
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeString(str) {
        if (!str) return '';
        // WhatsApp supports basic markdown but we'll just clean it
        return str.slice(0, 500); // Limit length
    }

    /**
     * Open WhatsApp with pre-formatted message
     * @param {string} message - Message to send
     * @param {string} [recipientNumber] - Optional specific recipient (default: business number)
     */
    sendMessage(message, recipientNumber = null) {
        if (!message || typeof message !== 'string') {
            throw new Error('Invalid message');
        }

        try {
            const number = recipientNumber || this.businessNumber;
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${number}?text=${encodedMessage}`;

            console.log('📤 Sending WhatsApp message to:', number);
            
            // Open WhatsApp in new window
            window.open(whatsappURL, '_blank', 'width=800,height=600');

            return true;
        } catch (error) {
            console.error('❌ Error sending WhatsApp message:', error);
            throw error;
        }
    }

    /**
     * Send product order via WhatsApp
     * @param {Object} product - Product to order
     */
    sendProductOrder(product) {
        try {
            const message = this.generateProductMessage(product);
            this.sendMessage(message);
            
            console.log('✅ Product order sent:', product.id);
        } catch (error) {
            console.error('❌ Error sending product order:', error);
            throw error;
        }
    }

    /**
     * Send contact form message via WhatsApp
     * @param {Object} formData - Form data to send
     */
    sendContactMessage(formData) {
        try {
            const message = this.generateContactMessage(formData);
            this.sendMessage(message);
            
            console.log('✅ Contact message sent');
        } catch (error) {
            console.error('❌ Error sending contact message:', error);
            throw error;
        }
    }

    /**
     * Generate WhatsApp share link (for social sharing)
     * @param {string} text - Text to share
     * @returns {string} WhatsApp share URL
     */
    generateShareLink(text) {
        try {
            const encodedText = encodeURIComponent(text);
            return `https://wa.me/?text=${encodedText}`;
        } catch (error) {
            console.error('❌ Error generating share link:', error);
            return '';
        }
    }

    /**
     * Check if WhatsApp is available on device
     * @returns {boolean} True if WhatsApp is available
     */
    isWhatsAppAvailable() {
        // Check if opening WhatsApp would be supported
        // This is a basic check - actual availability depends on device
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );
    }

    /**
     * Get WhatsApp Web URL for desktop
     * @returns {string} WhatsApp Web URL
     */
    getWebURL() {
        return `https://web.whatsapp.com/send?phone=${this.businessNumber.replace('+', '')}`;
    }
}

// ==================== INITIALIZE WHATSAPP API ====================

// Create global instance of WhatsApp API
const whatsappAPI = new WhatsAppAPI(CONFIG.WHATSAPP_NUMBER);

console.log('✅ WhatsApp API module loaded');
