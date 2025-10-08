import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Users, TrendingUp, Award, Briefcase, Star, CheckCircle } from 'lucide-react';

const notifications = [
  { 
    name: 'Rajesh Kumar', 
    city: 'Mumbai', 
    action: 'signed up for SEO services',
    icon: TrendingUp,
    color: 'icon-color-blue',
    time: '2 min ago'
  },
  { 
    name: 'Priya Sharma', 
    city: 'Delhi', 
    action: 'requested a consultation',
    icon: Briefcase,
    color: 'icon-color-purple',
    time: '5 min ago'
  },
  { 
    name: 'Amit Patel', 
    city: 'Bangalore', 
    action: 'started a web development project',
    icon: CheckCircle,
    color: 'icon-color-green',
    time: '8 min ago'
  },
  { 
    name: 'Sneha Reddy', 
    city: 'Hyderabad', 
    action: 'joined our branding program',
    icon: Award,
    color: 'icon-color-orange',
    time: '12 min ago'
  },
  { 
    name: 'Vikram Singh', 
    city: 'Pune', 
    action: 'booked a social media campaign',
    icon: Star,
    color: 'icon-color-yellow',
    time: '15 min ago'
  },
  { 
    name: 'Ananya Iyer', 
    city: 'Chennai', 
    action: 'upgraded to premium package',
    icon: TrendingUp,
    color: 'icon-color-pink',
    time: '18 min ago'
  },
  { 
    name: 'Rohan Mehta', 
    city: 'Ahmedabad', 
    action: 'completed project milestone',
    icon: CheckCircle,
    color: 'icon-color-teal',
    time: '22 min ago'
  }
];

export function LiveNotification() {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show on desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => {
      setShow(true);
    }, 3000);

    const interval = setInterval(() => {
      setShow(true);
      
      // Hide after 5 seconds
      setTimeout(() => {
        setShow(false);
      }, 5000);
      
      // Change notification
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % notifications.length);
      }, 5500);
    }, 10000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const notification = notifications[current];
  const Icon = notification.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-6 left-6 z-50 glass-premium rounded-lg shadow-dramatic overflow-hidden max-w-sm"
          style={{ background: 'rgba(255, 255, 255, 0.95)' }}
        >
          {/* Progress Bar */}
          <motion.div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
          
          <div className="p-4 flex items-center gap-3">
            {/* Avatar Circle with Gradient */}
            <motion.div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, 
                  ${notification.color === 'icon-color-blue' ? '#4285F4' : ''}
                  ${notification.color === 'icon-color-purple' ? '#9333EA' : ''}
                  ${notification.color === 'icon-color-green' ? '#34A853' : ''}
                  ${notification.color === 'icon-color-orange' ? '#FF9900' : ''}
                  ${notification.color === 'icon-color-yellow' ? '#FBBC05' : ''}
                  ${notification.color === 'icon-color-pink' ? '#EC4899' : ''}
                  ${notification.color === 'icon-color-teal' ? '#14B8A6' : ''}
                  20%, 
                  ${notification.color === 'icon-color-blue' ? '#1a73e8' : ''}
                  ${notification.color === 'icon-color-purple' ? '#7c3aed' : ''}
                  ${notification.color === 'icon-color-green' ? '#0f9d58' : ''}
                  ${notification.color === 'icon-color-orange' ? '#e68a00' : ''}
                  ${notification.color === 'icon-color-yellow' ? '#ea9e00' : ''}
                  ${notification.color === 'icon-color-pink' ? '#db2777' : ''}
                  ${notification.color === 'icon-color-teal' ? '#0d9488' : ''}
                  80%)`
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.p
                className="body-sm font-semibold text-black truncate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {notification.name}
              </motion.p>
              <motion.p
                className="body-xs text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                from <span className="font-medium">{notification.city}</span>
              </motion.p>
              <motion.p
                className="body-xs text-gray-500 mt-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {notification.action}
              </motion.p>
            </div>

            {/* Time Badge */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="body-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {notification.time}
              </span>
            </motion.div>
          </div>

          {/* Live Pulse Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
