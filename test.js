/**
 * Unit tests for User Authentication Validator
 * Secure Software Development Life Cycle Assignment
 */

const AuthValidator = require('./main');

describe('Email Validation', () => {
    // VALID TESTS (should pass)
    test('valid email with common domain should return true', () => {
        expect(AuthValidator.validateEmail('test@example.com')).toBe(true);
    });

    test('valid email with subdomain should return true', () => {
        expect(AuthValidator.validateEmail('user.name@sub.domain.co.uk')).toBe(true);
    });

    // INVALID TESTS (handles wrong input properly)
    test('email missing @ symbol should return false', () => {
        expect(AuthValidator.validateEmail('invalid-email.com')).toBe(false);
    });

    test('email with spaces should return false', () => {
        expect(AuthValidator.validateEmail('test user@example.com')).toBe(false);
    });

    // INTENTIONAL BREAK TEST (fails on purpose)
    test('INTENTIONAL BREAK: expect valid email to return false (should fail)', () => {
        // This test is designed to fail - expecting false for a valid email
        expect(AuthValidator.validateEmail('correct@email.com')).toBe(false);
    });
});

describe('Password Validation', () => {
    // VALID TESTS (should pass)
    test('strong password with uppercase, number and 8+ chars should return true', () => {
        expect(AuthValidator.validatePassword('StrongPass123')).toBe(true);
    });

    test('password with special chars, uppercase and number should return true', () => {
        expect(AuthValidator.validatePassword('Pass@1234')).toBe(true);
    });

    // INVALID TESTS (handles wrong input properly)
    test('password without uppercase should return false', () => {
        expect(AuthValidator.validatePassword('weakpass123')).toBe(false);
    });

    test('password shorter than 8 chars should return false', () => {
        expect(AuthValidator.validatePassword('Short1')).toBe(false);
    });

    // INTENTIONAL BREAK TEST (fails on purpose)
    test('INTENTIONAL BREAK: expect weak password to return true (should fail)', () => {
        // This test is designed to fail - expecting true for a weak password
        expect(AuthValidator.validatePassword('weak')).toBe(true);
    });
});

describe('Credentials Validation', () => {
    test('valid email and password should return valid result', () => {
        const result = AuthValidator.validateCredentials('user@example.com', 'StrongPass123');
        expect(result.isValid).toBe(true);
        expect(result.emailValid).toBe(true);
        expect(result.passwordValid).toBe(true);
    });

    test('invalid email should return appropriate error details', () => {
        const result = AuthValidator.validateCredentials('invalid-email', 'StrongPass123');
        expect(result.isValid).toBe(false);
        expect(result.emailValid).toBe(false);
        expect(result.passwordValid).toBe(true);
    });
});

describe('Edge Cases and Input Validation', () => {
    test('non-string email should return false', () => {
        expect(AuthValidator.validateEmail(123)).toBe(false);
        expect(AuthValidator.validateEmail(null)).toBe(false);
        expect(AuthValidator.validateEmail(undefined)).toBe(false);
        expect(AuthValidator.validateEmail({})).toBe(false);
    });

    test('non-string password should return false', () => {
        expect(AuthValidator.validatePassword(12345678)).toBe(false);
        expect(AuthValidator.validatePassword(null)).toBe(false);
        expect(AuthValidator.validatePassword(undefined)).toBe(false);
        expect(AuthValidator.validatePassword({})).toBe(false);
    });
});