import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Mail, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './icons/SocialIcons';
import { LanguageSwitcher } from './i18n/LanguageSwitcher';
import logoImage from 'figma:asset/4e0177882de87374e9a23f73159a3fe5dc3fa4d7.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsServicesOpen(false);
    };
    if (isServicesOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isServicesOpen]);

  const services = [
    { name: 'Advertising', path: 'advertising', icon: '📢' },
    { name: 'Branding', path: 'branding', icon: '🎨' },
    { name: 'Graphic Design', path: 'graphic-design', icon: '✏️' },
    { name: 'Animation', path: 'animation', icon: '🎬' },
    { name: 'Public Relations', path: 'public-relations', icon: '📰' },
    { name: 'Website Development', path: 'website-development', icon: '💻' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 glass-ultra border-b border-white/10 transition-all duration-300 ${
        scrolled ? 'shadow-award-md' : ''
      }`}
    >
      {/* Top Bar - Contact Info (Desktop Only) */}
      <div className="hidden lg:block border-b border-white/10 glass-subtle">
        <div className="container-award">
          <div className="flex items-center justify-between h-9 body-xs">
            <div className="flex items-center space-x-6">
              <a href="mailto:info@inchtomilez.com" className="flex items-center hover:text-black transition-colors">
                <Mail className="w-3 h-3 mr-1.5" />
                info@inchtomilez.com
              </a>
              <span className="flex items-center">
                📍 Indore, Madhya Pradesh, India
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex items-center space-x-2">
                {[
                  { Icon: FacebookIcon, href: 'https://facebook.com/inchtomilez', label: 'Facebook' },
                  { Icon: TwitterIcon, href: 'https://twitter.com/inchtomilez', label: 'Twitter' },
                  { Icon: InstagramIcon, href: 'https://instagram.com/inchtomilez', label: 'Instagram' },
                  { Icon: LinkedInIcon, href: 'https://linkedin.com/company/inchtomilez', label: 'LinkedIn' }
                ].map(({ Icon, href, label }) => (
                  <a 
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 rounded-full bg-black/5 hover:bg-black flex items-center justify-center transition-all group"
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
              {/* Admin Access */}
              <button
                onClick={() => onNavigate('admin')}
                className="ml-4 px-3 py-1 rounded-lg bg-black/5 hover:bg-black text-gray-600 hover:text-white transition-all flex items-center gap-1.5 group"
                title="Admin Panel"
              >
                <Shield className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span className="body-xs font-semibold">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-award">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer relative z-10"
            onClick={() => {
              onNavigate('home');
              setIsMenuOpen(false);
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <img src={logoImage} alt="InchToMilez - The Bhrahmaastra For Brands" className="h-8 sm:h-10 lg:h-11 w-auto" />
              {/* Decorative line under logo */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {[
              { name: 'Home', path: 'home' },
              { name: 'About', path: 'about' },
              { name: 'Portfolio', path: 'portfolio' },
            ].map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`relative px-4 py-2 rounded-[10px] transition-all body-md font-semibold ${
                  currentPage === item.path
                    ? 'bg-black text-white shadow-award'
                    : 'text-[#525252] hover:bg-[#f5f5f5] hover:text-black'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              >
                {item.name}
                {currentPage === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-black rounded-[10px] -z-10"
                    layoutId="activeTabBg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Services Dropdown */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <motion.button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`relative flex items-center px-4 py-2 rounded-[10px] transition-all body-md font-semibold ${
                  services.some((service) => currentPage === service.path) || currentPage === 'services'
                    ? 'bg-black text-white shadow-award'
                    : 'text-[#525252] hover:bg-[#f5f5f5] hover:text-black'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              >
                Services
                <motion.div
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </motion.div>
                {(services.some((service) => currentPage === service.path) || currentPage === 'services') && (
                  <motion.div
                    className="absolute inset-0 bg-black rounded-[10px] -z-10"
                    layoutId="activeTabBg"
                  />
                )}
              </motion.button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-3 w-72 glass-strong rounded-[10px] shadow-award-lg overflow-hidden border border-white/10"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* All Services Option */}
                    <motion.button
                      onClick={() => {
                        onNavigate('services');
                        setIsServicesOpen(false);
                      }}
                      className="group flex items-center justify-between w-full text-left px-5 py-3.5 hover:bg-white/10 hover:text-black transition-all border-b border-white/5 font-semibold body-md"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center">
                        <span className="mr-3 text-lg">⚡</span>
                        All Services
                      </span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </motion.button>

                    {/* Individual Services */}
                    <div className="grid grid-cols-2 gap-0">
                      {services.map((service, idx) => (
                        <motion.button
                          key={service.path}
                          onClick={() => {
                            onNavigate(service.path);
                            setIsServicesOpen(false);
                          }}
                          className="group flex flex-col items-start text-left px-4 py-4 hover:bg-white/10 hover:text-black transition-all border-r border-b border-white/5 last:border-r-0 body-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <motion.span 
                            className="text-xl mb-1.5"
                            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            {service.icon}
                          </motion.span>
                          <span className="text-xs leading-tight">{service.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { name: 'Blogs', path: 'blogs' },
              { name: "Let's Talk", path: 'contact' },
            ].map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`relative px-4 py-2 rounded-[10px] transition-all body-md font-semibold ${
                  currentPage === item.path
                    ? 'bg-black text-white shadow-award'
                    : 'text-[#525252] hover:bg-[#f5f5f5] hover:text-black'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05, type: "spring", stiffness: 300 }}
              >
                {item.name}
                {currentPage === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-black rounded-[10px] -z-10"
                    layoutId="activeTabBg"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Language Switcher - Desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <LanguageSwitcher />
          </motion.div>

          {/* CTA Button - Desktop */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              onClick={() => onNavigate('contact')}
              className="btn-award group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91-9009970709</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            className="lg:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-[10px] hover:bg-black/5 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden glass-strong rounded-[10px] mb-4 overflow-hidden shadow-award-lg border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="py-2 space-y-0.5">
                {[
                  { name: 'Home', path: 'home' },
                  { name: 'About', path: 'about' },
                  { name: 'Services', path: 'services' },
                  ...services,
                  { name: 'Blogs', path: 'blogs' },
                  { name: "Let's Talk", path: 'contact' },
                  { name: '🔒 Admin Panel', path: 'admin' },
                ].map((item, idx) => (
                  <motion.button
                    key={item.path}
                    onClick={() => {
                      onNavigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center w-full text-left px-5 py-3.5 transition-all body-md font-medium ${
                      currentPage === item.path
                        ? 'bg-black text-white'
                        : 'text-[#404040] hover:bg-white/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    {'icon' in item && <motion.span className="mr-3" whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>{item.icon}</motion.span>}
                    {item.name}
                  </motion.button>
                ))}
                
                {/* Mobile CTA */}
                <div className="px-4 pt-4 pb-2">
                  <motion.button
                    onClick={() => {
                      onNavigate('contact');
                      setIsMenuOpen(false);
                    }}
                    className="btn-award w-full justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91-9009970709</span>
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}