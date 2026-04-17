/**
 * ============================================================
 * FORMS.JS - Form Validation and Handling
 * Handles form validation, submission, and error display
 * ============================================================
 */

class FormValidator {
    /**
     * Initialize form validator
     * @param {string} formSelector - CSS selector for form element
     */
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        
        if (!this.form) {
            console.warn(`⚠️ Form not found: ${formSelector}`);
            return;
        }

        // Define form fields with validation rules
        this.fields = {
            name: {
                selector: '#name',
                required: true,
                type: 'text',
                minLength: 2,
                maxLength: 100,
                errorMessage: 'Name must be 2-100 characters'
            },
            email: {
                selector: '#email',
                required: true,
                type: 'email',
                errorMessage: 'Please enter a valid email address'
            },
            phone: {
                selector: '#phone',
                required: true,
                type: 'tel',
                minLength: 10,
                errorMessage: 'Please enter a valid phone number'
            },
            message: {
                selector: '#message',
                required: true,
                type: 'text',
                minLength: 10,
                maxLength: 1000,
                errorMessage: 'Message must be 10-1000 characters'
            }
        };

        console.log('✅ Form validator initialized:', formSelector);
    }

    /**
     * Validate a single form field
     * @param {string} fieldName - Name of field to validate
     * @returns {boolean} Whether field is valid
     */
    validateField(fieldName) {
        const fieldConfig = this.fields[fieldName];
        if (!fieldConfig) {
            console.warn(`⚠️ Field config not found: ${fieldName}`);
            return false;
        }

        const field = document.querySelector(fieldConfig.selector);
        if (!field) {
            console.warn(`⚠️ Field element not found: ${fieldConfig.selector}`);
            return false;
        }

        const value = field.value.trim();

        // Required validation
        if (fieldConfig.required && !value) {
            this.showError(field, `${this.capitalize(fieldName)} is required`);
            return false;
        }

        // Check minimum length
        if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
            this.showError(field, fieldConfig.errorMessage);
            return false;
        }

        // Check maximum length
        if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
            this.showError(field, fieldConfig.errorMessage);
            return false;
        }

        // Type-specific validation
        switch (fieldConfig.type) {
            case 'email':
                if (!this.validateEmail(value)) {
                    this.showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;

            case 'tel':
                if (!this.validatePhone(value)) {
                    this.showError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;

            case 'text':
                if (!this.validateText(value)) {
                    this.showError(field, fieldConfig.errorMessage);
                    return false;
                }
                break;
        }

        this.clearError(field);
        return true;
    }

    /**
     * Validate entire form
     * @returns {boolean} Whether entire form is valid
     */
    validateForm() {
        let isValid = true;

        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });

        console.log(isValid ? '✅ Form is valid' : '❌ Form has errors');
        return isValid;
    }

    /**
     * Email validation using regex
     * @param {string} email - Email to validate
     * @returns {boolean} Whether email is valid
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Phone number validation
     * Accepts various formats: +1234567890, 1234567890, (123) 456-7890, etc.
     * @param {string} phone - Phone to validate
     * @returns {boolean} Whether phone is valid
     */
    validatePhone(phone) {
        // Must contain at least 10 digits
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    }

    /**
     * Text validation (no scripts or harmful content)
     * @param {string} text - Text to validate
     * @returns {boolean} Whether text is safe
     */
    validateText(text) {
        // Check for script tags or dangerous content
        const dangerousPatterns = /<script|javascript:|on\w+\s*=/i;
        return !dangerousPatterns.test(text);
    }

    /**
     * Show error message for field
     * @param {HTMLElement} field - Form field element
     * @param {string} message - Error message to display
     */
    showError(field, message) {
        if (!field) return;

        field.classList.add('is-invalid');
        field.classList.remove('is-valid');

        // Find or create feedback element
        let feedback = field.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            field.parentNode.insertBefore(feedback, field.nextSibling);
        }

        feedback.textContent = message;
        console.log(`⚠️ Validation error on ${field.id}: ${message}`);
    }

    /**
     * Clear error message for field
     * @param {HTMLElement} field - Form field element
     */
    clearError(field) {
        if (!field) return;

        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    }

    /**
     * Get all form data
     * @returns {Object} Object with field values
     */
    getFormData() {
        const data = {};

        Object.keys(this.fields).forEach(fieldName => {
            const selector = this.fields[fieldName].selector;
            const field = document.querySelector(selector);
            if (field) {
                data[fieldName] = this.sanitizeInput(field.value.trim());
            }
        });

        return data;
    }

    /**
     * Sanitize user input to prevent XSS
     * @param {string} input - Input to sanitize
     * @returns {string} Sanitized input
     */
    sanitizeInput(input) {
        // Remove script tags and dangerous HTML
        input = input.replace(/<script[^>]*>.*?<\/script>/gi, '');
        input = input.replace(/<[^>]+>/g, '');
        
        // Limit length
        input = input.slice(0, 1000);
        
        return input.trim();
    }

    /**
     * Reset form to initial state
     */
    reset() {
        if (!this.form) return;

        this.form.reset();
        
        // Clear all validation states
        this.form.querySelectorAll('.form-control').forEach(field => {
            field.classList.remove('is-invalid', 'is-valid');
        });

        // Clear error messages
        this.form.querySelectorAll('.invalid-feedback').forEach(feedback => {
            feedback.textContent = '';
        });

        console.log('✅ Form reset');
    }

    /**
     * Disable form submit button
     */
    disableSubmit() {
        const submitBtn = this.form?.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
        }
    }

    /**
     * Enable form submit button
     */
    enableSubmit() {
        const submitBtn = this.form?.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
        }
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// ==================== INITIALIZE FORM VALIDATOR ====================

// Create global instance of form validator
const contactFormValidator = new FormValidator('#contact-form');

// Add real-time validation (optional - validate on input)
document.addEventListener('DOMContentLoaded', () => {
    if (contactFormValidator.form) {
        Object.keys(contactFormValidator.fields).forEach(fieldName => {
            const field = document.querySelector(contactFormValidator.fields[fieldName].selector);
            if (field) {
                field.addEventListener('blur', () => {
                    contactFormValidator.validateField(fieldName);
                });

                // Clear error on input
                field.addEventListener('input', () => {
                    if (field.classList.contains('is-invalid')) {
                        field.classList.remove('is-invalid');
                    }
                });
            }
        });
    }
});

console.log('✅ Form validator module loaded');
