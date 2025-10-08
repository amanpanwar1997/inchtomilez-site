import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';
import { useState } from 'react';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919876543210?text=Hi%20InchToMilez!%20I%27m%20interested%20in%20your%20services',
      color: 'icon-color-green',
      delay: 0.1
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+919876543210',
      color: 'icon-color-blue',
      delay: 0.2
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:hello@inchtomilez.com',
      color: 'icon-color-red',
      delay: 0.3
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {buttons.map((button, index) => (
              <motion.a
                key={button.label}
                href={button.href}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: button.delay, type: 'spring', stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-premium flex items-center gap-3 px-4 py-3 rounded-full shadow-dramatic hover-lift-md group"
              >
                <button.icon className={`w-5 h-5 ${button.color} transition-transform group-hover:scale-110`} />
                <span className="body-sm font-medium text-black pr-2">{button.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="glass-premium p-4 rounded-full shadow-dramatic relative overflow-hidden group"
        style={{ background: 'rgba(255, 255, 255, 0.95)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 icon-color-green" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-500"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  );
}
