import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Mail, User, Phone, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { ConfettiEffect } from './ConfettiEffect';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: any;
  validation: (value: string) => string | null;
}

export function PremiumForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your name',
      icon: User,
      validation: (value) => {
        if (!value) return 'Name is required';
        if (value.length < 3) return 'Name must be at least 3 characters';
        return null;
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@example.com',
      icon: Mail,
      validation: (value) => {
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return null;
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+91 98765 43210',
      icon: Phone,
      validation: (value) => {
        if (!value) return 'Phone is required';
        if (!/^\+?[\d\s-]{10,}$/.test(value)) return 'Invalid phone number';
        return null;
      }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell us about your project...',
      icon: MessageSquare,
      validation: (value) => {
        if (!value) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        return null;
      }
    }
  ];

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      const field = fields.find((f) => f.name === name);
      if (field) {
        const error = field.validation(value);
        setErrors((prev) => ({ ...prev, [name]: error || '' }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const field = fields.find((f) => f.name === name);
    if (field) {
      const error = field.validation(formData[name as keyof typeof formData]);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const error = field.validation(formData[field.name as keyof typeof formData]);
      if (error) newErrors[field.name] = error;
    });

    // Mark all as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setShowConfetti(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setTouched({});
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <>
      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-8 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h3 className="heading-lg mb-2">Get In Touch</h3>
          <p className="body-md text-gray-600">
            Fill out the form and we'll get back to you within 24 hours.
          </p>
        </div>

        {fields.map((field, index) => {
          const Icon = field.icon;
          const hasError = touched[field.name] && errors[field.name];
          const isValid = touched[field.name] && !errors[field.name] && formData[field.name as keyof typeof formData];

          return (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="body-sm font-medium mb-2 block">
                {field.label}
              </label>

              <div className="relative">
                {/* Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Icon className={`w-5 h-5 transition-colors ${
                    hasError ? 'text-red-500' : 
                    isValid ? 'text-green-500' : 
                    'text-gray-400'
                  }`} />
                </div>

                {/* Input/Textarea */}
                {field.type === 'textarea' ? (
                  <motion.textarea
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={() => handleBlur(field.name)}
                    placeholder={field.placeholder}
                    rows={4}
                    className={`
                      w-full pl-12 pr-12 py-3 glass-input rounded-lg
                      transition-all duration-300 resize-none
                      focus:ring-2 focus:ring-offset-2
                      ${hasError ? 'border-red-500 focus:ring-red-500' : 
                        isValid ? 'border-green-500 focus:ring-green-500' : 
                        'border-gray-200 focus:ring-blue-500'}
                    `}
                    animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  />
                ) : (
                  <motion.input
                    type={field.type}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={() => handleBlur(field.name)}
                    placeholder={field.placeholder}
                    className={`
                      w-full pl-12 pr-12 py-3 glass-input rounded-lg
                      transition-all duration-300
                      focus:ring-2 focus:ring-offset-2
                      ${hasError ? 'border-red-500 focus:ring-red-500' : 
                        isValid ? 'border-green-500 focus:ring-green-500' : 
                        'border-gray-200 focus:ring-blue-500'}
                    `}
                    animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  />
                )}

                {/* Validation Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <AnimatePresence mode="wait">
                    {hasError && (
                      <motion.div
                        key="error"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </motion.div>
                    )}
                    {isValid && (
                      <motion.div
                        key="valid"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {hasError && (
                  <motion.p
                    className="body-xs text-red-500 mt-2 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors[field.name]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PremiumButton
            variant={submitSuccess ? 'gradient' : 'primary'}
            size="lg"
            className="w-full"
            icon={submitSuccess ? <CheckCircle /> : null}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Sending...
              </span>
            ) : submitSuccess ? (
              'Message Sent!'
            ) : (
              'Send Message'
            )}
          </PremiumButton>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              className="glass-premium p-4 rounded-lg border-l-4 border-green-500"
              style={{ background: 'rgba(52, 168, 83, 0.1)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 icon-color-green icon-bounce" />
                <div>
                  <p className="body-sm font-semibold text-black">Success!</p>
                  <p className="body-xs text-gray-600">We'll get back to you soon.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </>
  );
}
