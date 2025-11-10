/**
 * User Authentication Validator
 * Secure Software Development Life Cycle Assignment
 */

class AuthValidator {
    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {boolean} True if email format is valid
     */
    static validateEmail(email) {
        if (typeof email !== 'string') {
            return false;
        }
        
        // Basic email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validates password strength
     * Requirements: min 8 chars, 1 uppercase, 1 number
     * @param {string} password - Password to validate
     * @returns {boolean} True if password meets strength requirements
     */
    static validatePassword(password) {
        if (typeof password !== 'string') {
            return false;
        }

        // Check minimum length
        if (password.length < 8) {
            return false;
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Check for at least one number
        if (!/\d/.test(password)) {
            return false;
        }

        return true;
    }

    /**
     * Validates both email and password
     * @param {string} email - Email to validate
     * @param {string} password - Password to validate
     * @returns {Object} Validation result with details
     */
    static validateCredentials(email, password) {
        const isEmailValid = this.validateEmail(email);
        const isPasswordValid = this.validatePassword(password);

        return {
            isValid: isEmailValid && isPasswordValid,
            emailValid: isEmailValid,
            passwordValid: isPasswordValid,
            message: isEmailValid && isPasswordValid 
                ? 'Credentials are valid' 
                : `Validation failed: Email ${isEmailValid ? 'valid' : 'invalid'}, Password ${isPasswordValid ? 'valid' : 'invalid'}`
        };
    }
}

module.exports = AuthValidator;