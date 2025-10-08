import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Users, Award, Rocket, Zap, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { RevealOnScroll, StatCard, Section } from '../ThemeComponents';
import { useToast, ToastContainer } from '../ui/Toast';
import { validateContactForm } from '../../utils/validation';

export function ContactPage() {
  const { toasts, success, error, remove } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      error('Please fix the errors in the form');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      success('Thank you! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (err) {
      error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextareaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const services = [
    'Digital Marketing',
    'SEO Services',
    'Social Media Marketing',
    'Google Ads',
    'Website Development',
    'Branding',
    'Graphic Design',
    'Animation',
    'Public Relations',
    'Other'
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      detail: '+91-9009970709',
      description: 'Mon-Sat, 9AM - 7PM IST',
      href: 'tel:+919009970709'
    },
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'info@inchtomilez.com',
      description: 'Lightning-fast replies',
      href: 'mailto:info@inchtomilez.com'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      detail: 'Indore, Madhya Pradesh',
      description: 'Coffee\'s on us',
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={remove} />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-black text-white hover-glow-white animate-pulse-glow">
                <Sparkles className="w-4 h-4 mr-2 icon-interactive" />
                Free Consultation | Fast Response | No Pressure
              </Badge>

              <h1 className="heading-xl mb-6 text-gradient-shine">
                Let's Make Magic Happen
              </h1>

              <p className="body-lg text-gray-700 max-w-3xl mx-auto mb-12">
                Got a project? A question? Or just want to talk shop?<br />
                <strong>We're all ears.</strong> Drop us a line and let's build something incredible together.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="tel:+919009970709"
                  className="px-8 py-4 bg-black text-white rounded-xl font-medium shadow-strong btn-hover-scale flex items-center w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  +91-9009970709
                </motion.a>

                <motion.a
                  href="mailto:info@inchtomilez.com"
                  className="px-8 py-4 border-2 border-black text-black rounded-xl hover:bg-black hover:text-white transition-all font-medium flex items-center w-full sm:w-auto justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="mr-2 w-5 h-5" />
                  Email Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <StatCard icon={Zap} value="<24h" label="Response Time" delay={0.1} />
          <StatCard icon={Users} value="500+" label="Happy Clients" delay={0.2} />
          <StatCard icon={Award} value="30+" label="Years Excellence" delay={0.3} />
          <StatCard icon={Rocket} value="1200+" label="Projects Delivered" delay={0.4} />
        </div>
      </Section>

      {/* Contact Form & Info */}
      <Section gradient>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <RevealOnScroll>
            <div className="glass-premium p-6 sm:p-10 rounded-3xl hover-lift-md hover-glow-white shadow-dramatic border-gradient-subtle animate-fade-in-up">
              <h2 className="heading-lg mb-3 text-gradient-bw">Drop Us a Line</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                Fill out the form and we'll get back to you faster than you can say "digital marketing"
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`border-gray-300 focus:border-black ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-gray-300 focus:border-black"
                      placeholder="+91 9009970709"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`border-gray-300 focus:border-black ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-black"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none text-sm"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`border-gray-300 focus:border-black resize-none ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <motion.div whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-900 py-6 font-medium shadow-cinematic hover:shadow-2xl transition-all duration-300 btn-enhanced btn-ripple hover-scale-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loader-pulse w-5 h-5 bg-white rounded-full mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5 icon-interactive" />
                        Send Message
                        <Rocket className="ml-2 h-5 w-5 icon-interactive" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </RevealOnScroll>

          {/* Contact Information */}
          <div className="space-y-6">
            <RevealOnScroll delay={0.2}>
              <div>
                <h2 className="heading-lg mb-4">Get in Touch</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  <strong>Three ways to reach us.</strong> Pick your favorite—we're ready to chat, strategize, and make things happen.
                </p>
              </div>
            </RevealOnScroll>

            {contactMethods.map((method, index) => (
              <RevealOnScroll key={index} delay={0.3 + index * 0.1}>
                <motion.a
                  href={method.href}
                  className="block glass-premium p-5 sm:p-6 rounded-3xl hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle group animate-fade-in-up"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#baff00] transition-colors">
                      <method.icon className="h-6 w-6 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div className="ml-4">
                      <h3 className="heading-sm mb-1 text-sm sm:text-base">
                        {method.title}
                      </h3>
                      <p className="text-sm text-black mb-1">
                        {method.detail}
                      </p>
                      <p className="text-xs text-gray-500">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              </RevealOnScroll>
            ))}

            {/* Quick Response Promise */}
            <RevealOnScroll delay={0.6}>
              <div className="glass-ultra p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-black to-gray-900 text-white">
                <div className="flex items-start">
                  <Sparkles className="h-6 w-6 mr-3 flex-shrink-0 text-[#baff00]" />
                  <div>
                    <h3 className="heading-sm mb-2 text-sm sm:text-base">
                      Quick Response Guarantee
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300">
                      We value your time. Our team will respond to your inquiry within 24 hours on business days.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* Map/Office Section */}
      <Section>
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <RevealOnScroll>
            <h2 className="heading-lg mb-4">Visit Our Office</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Located in the heart of Indore, serving clients across India
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.2}>
          <div className="glass-ultra p-8 sm:p-12 rounded-3xl text-center max-w-3xl mx-auto">
            <MapPin className="h-12 w-12 sm:h-16 sm:w-16 text-black mx-auto mb-4" />
            <h3 className="heading-md mb-2">InchToMilez</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Indore, Madhya Pradesh, India
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Schedule an appointment to visit our office and meet our team
            </p>
          </div>
        </RevealOnScroll>
      </Section>
    </div>
  );
}