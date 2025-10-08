/**
 * Validation Utilities
 * Form validation, data validation, and sanitization
 */

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Phone number validation (basic international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * URL validation
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHTML(html: string): string {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}

/**
 * Validate form data
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateForm(
  data: Record<string, any>,
  rules: ValidationRules
): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach(field => {
    const value = data[field];
    const rule = rules[field];

    // Required check
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }

    // Skip other validations if field is empty and not required
    if (!value && !rule.required) return;

    // Min length check
    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
      return;
    }

    // Max length check
    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = rule.message || `${field} must be at most ${rule.maxLength} characters`;
      return;
    }

    // Pattern check
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} format is invalid`;
      return;
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      errors[field] = rule.message || `${field} is invalid`;
      return;
    }
  });

  return errors;
}

/**
 * Common form validation rules
 */
export const commonRules = {
  email: {
    required: true,
    custom: isValidEmail,
    message: 'Please enter a valid email address'
  },
  
  phone: {
    required: false,
    custom: isValidPhone,
    message: 'Please enter a valid phone number'
  },

  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
    message: 'Name must be between 2 and 100 characters'
  },

  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
    message: 'Message must be between 10 and 5000 characters'
  },

  url: {
    required: false,
    custom: isValidURL,
    message: 'Please enter a valid URL'
  }
};

/**
 * Validate contact form
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): ValidationErrors {
  return validateForm(data, {
    name: commonRules.name,
    email: commonRules.email,
    phone: { ...commonRules.phone, required: false },
    message: commonRules.message
  });
}

/**
 * Validate comment
 */
export function validateComment(data: {
  userName: string;
  text: string;
}): ValidationErrors {
  return validateForm(data, {
    userName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'Name must be between 2 and 50 characters'
    },
    text: {
      required: true,
      minLength: 1,
      maxLength: 1000,
      message: 'Comment must be between 1 and 1000 characters'
    }
  });
}

/**
 * Validate blog post
 */
export function validateBlogPost(data: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): ValidationErrors {
  return validateForm(data, {
    title: {
      required: true,
      minLength: 3,
      maxLength: 200,
      message: 'Title must be between 3 and 200 characters'
    },
    excerpt: {
      required: true,
      minLength: 10,
      maxLength: 500,
      message: 'Excerpt must be between 10 and 500 characters'
    },
    content: {
      required: true,
      minLength: 100,
      message: 'Content must be at least 100 characters'
    },
    category: {
      required: true,
      message: 'Category is required'
    },
    tags: {
      required: true,
      custom: (value: any[]) => Array.isArray(value) && value.length > 0,
      message: 'At least one tag is required'
    }
  });
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Trim all string values in an object
 */
export function trimObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj };
  
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      result[key] = result[key].trim();
    }
  });

  return result;
}

/**
 * Check if object has all required fields
 */
export function hasRequiredFields(
  obj: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missing: string[] } {
  const missing = requiredFields.filter(
    field => isEmpty(obj[field])
  );

  return {
    valid: missing.length === 0,
    missing
  };
}
