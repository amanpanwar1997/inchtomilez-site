import { motion } from 'motion/react';
import { 
  Phone, Mail, MapPin, ArrowRight, Send, Award, TrendingUp, Users, Heart, ArrowUp 
} from 'lucide-react';
import { SocialMediaBar } from './icons/SocialMediaButtons';
import logoImage from 'figma:asset/4e0177882de87374e9a23f73159a3fe5dc3fa4d7.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const services = [
    { name: 'Advertising', path: 'advertising' },
    { name: 'Branding', path: 'branding' },
    { name: 'Graphic Design', path: 'graphic-design' },
    { name: 'Animation', path: 'animation' },
    { name: 'Public Relations', path: 'public-relations' },
    { name: 'Website Development', path: 'website-development' },
  ];

  const quickLinks = [
    { name: 'Home', path: 'home' },
    { name: 'About Us', path: 'about' },
    { name: 'Services', path: 'services' },
    { name: 'Blogs', path: 'blogs' },
    { name: 'Contact', path: 'contact' },
  ];



  const stats = [
    { icon: Award, value: '30+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '96%', label: 'Success Rate' },
    { icon: Heart, value: '1200+', label: 'Projects Done' },
  ];

  return (
    <footer className="relative mt-20 sm:mt-32 border-t border-white/10 glass-section-medium">
      {/* Enhanced Dramatic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.04) 100%)',
          }}
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        {/* Floating accent shapes - Black/Grey only */}
        <motion.div
          className="absolute -left-20 top-20 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-20 bottom-40 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Diagonal lines accent */}
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-black"
              style={{
                width: '200%',
                left: '-50%',
                top: `${i * 10}%`,
                transform: 'rotate(-12deg)',
              }}
              initial={{ opacity: 0.5, x: -100 }}
              animate={{ opacity: [0.5, 0.8, 0.5], x: [-100, 0, -100] }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar - Glassmorphic */}
      <div className="relative">
        <div className="container-responsive py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass-ultra p-5 sm:p-6 rounded-[10px] text-center group relative overflow-hidden transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -6,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Dark hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] bg-white/5 group-hover:bg-white/10 flex items-center justify-center mb-3 sm:mb-4 mx-auto transition-colors duration-300"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-black group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <div className="heading-sm text-black group-hover:text-white mb-1 transition-colors duration-300">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 transition-colors duration-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container-responsive">
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Company Info - Takes 4 columns */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <img src={logoImage} alt="InchToMilez - The Bhrahmaastra For Brands" className="h-12 sm:h-14 w-auto mb-4" />
              <div className="h-0.5 w-20 bg-gradient-to-r from-black/20 via-black/10 to-transparent mb-4" />
            </div>
            
            <p className="body-md text-gray-600 leading-relaxed max-w-sm">
              India's leading digital marketing agency with <strong>30+ years</strong> of proven excellence. 
              We transform brands through innovative strategies and measurable results.
            </p>

            {/* Social Links - Real Brand Icons */}
            <div>
              <p className="text-black mb-3 text-sm font-raleway font-semibold">Follow Us</p>
              <SocialMediaBar />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {['ISO Certified', 'Google Partner', 'Award Winning'].map((badge, i) => (
                <motion.div 
                  key={badge}
                  className="px-4 py-2 glass-ultra rounded-lg border border-black/5 text-xs font-raleway font-medium text-gray-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  ✓ {badge}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Takes 2 columns */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <h3 className="heading-sm text-black mb-4">Quick Links</h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-black/20 to-transparent mb-4" />
            </div>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => onNavigate(item.path)}
                    className="group flex items-center text-gray-600 hover:text-black transition-colors body-sm font-medium"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all text-black" />
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Takes 3 columns */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h3 className="heading-sm text-black mb-4">Our Services</h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-black/20 to-transparent mb-4" />
            </div>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => onNavigate(service.path)}
                    className="group flex items-center text-gray-600 hover:text-black transition-colors body-sm font-medium"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all text-[#baff00]" />
                    {service.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Takes 3 columns */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <h3 className="heading-sm text-black mb-4">Get In Touch</h3>
              <div className="h-0.5 w-12 bg-gradient-to-r from-black/20 to-transparent mb-4" />
            </div>
            
            <div className="space-y-4">
              <motion.a
                href="tel:+919009970709"
                className="group flex items-start space-x-3 p-3 rounded-2xl hover:bg-black border border-transparent hover:border-black transition-all duration-300"
                whileHover={{ x: 2 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-black/5 group-hover:bg-white rounded-xl flex items-center justify-center transition-all duration-300">
                  <Phone className="h-4 w-4 text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 mb-0.5 transition-colors duration-300">Call Us</p>
                  <p className="text-black group-hover:text-white body-sm font-semibold transition-colors duration-300">+91-9009970709</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:info@inchtomilez.com"
                className="group flex items-start space-x-3 p-3 rounded-2xl hover:bg-black border border-transparent hover:border-black transition-all duration-300"
                whileHover={{ x: 2 }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-black/5 group-hover:bg-white rounded-xl flex items-center justify-center transition-all duration-300">
                  <Mail className="h-4 w-4 text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 mb-0.5 transition-colors duration-300">Email Us</p>
                  <p className="text-black group-hover:text-white body-sm font-semibold transition-colors duration-300">info@inchtomilez.com</p>
                </div>
              </motion.a>

              <div className="flex items-start space-x-3 p-3">
                <div className="flex-shrink-0 w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-black" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Visit Us</p>
                  <p className="text-black body-sm leading-relaxed">
                    Indore, Madhya Pradesh<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="p-4 glass-ultra rounded-2xl border border-black/5">
              <p className="text-black body-sm mb-3 font-semibold">Stay Updated</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/50 border border-black/10 rounded-xl text-black text-xs placeholder-gray-500 focus:outline-none focus:border-black/30 focus:ring-2 focus:ring-[#baff00]/20 transition-all"
                />
                <motion.button
                  className="px-4 py-2 bg-black text-white rounded-xl hover:bg-[#baff00] hover:text-black transition-all duration-300 flex items-center justify-center shadow-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="py-6 sm:py-8 border-t border-black/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <p className="font-raleway">© 2025 InchToMilez. All rights reserved.</p>
              <div className="hidden md:block w-px h-4 bg-black/10" />
              <p className="text-xs font-raleway">Designed & Developed with <span className="text-red-500">❤️</span> in India</p>
            </div>
            
            <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <button className="text-gray-600 hover:text-black transition-colors font-raleway font-medium">
                Privacy Policy
              </button>
              <div className="w-px h-4 bg-black/10" />
              <button className="text-gray-600 hover:text-black transition-colors font-raleway font-medium">
                Terms of Service
              </button>
              <div className="w-px h-4 bg-black/10" />
              <button className="text-gray-600 hover:text-black transition-colors font-raleway font-medium">
                Sitemap
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button - Light Theme */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-black hover:bg-[#baff00] text-white hover:text-black rounded-full flex items-center justify-center shadow-strong transition-all duration-300 z-40 border border-black/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
      </motion.button>
    </footer>
  );
}
