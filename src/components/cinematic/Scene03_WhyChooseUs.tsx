import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 3: WHY CHOOSE US - Museum Gallery
 * BG: Museum wall with subtle texture
 * MG: Holographic KPI pillars rising from floor
 * FG: Floating experience counters & rotating icons
 */

export function Scene03_WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const mgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const pillars = [
    { label: '30+ Years', color: '#4285F4', height: 70 },
    { label: '250+ Clients', color: '#EA4335', height: 85 },
    { label: '15+ Industries', color: '#FBBC05', height: 65 },
    { label: '360° Solutions', color: '#34A853', height: 80 },
    { label: '24/7 Support', color: '#9333EA', height: 75 },
    { label: '100% ROI Focus', color: '#FF9900', height: 90 }
  ];

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background - Museum Wall */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-gray-50 to-slate-200" />
        
        {/* Wall Texture */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="museumPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="none" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.2" />
                <circle cx="50" cy="50" r="2" fill="#1a1a1a" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#museumPattern)" />
          </svg>
        </div>

        {/* Museum Spotlights from Above */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`spotlight-${i}`}
            className="absolute top-0"
            style={{
              left: `${10 + i * 15}%`,
              width: '120px',
              height: '60%'
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-yellow-200/30 via-yellow-100/10 to-transparent" 
                 style={{ clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0% 100%)' }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Middleground - Holographic KPI Pillars */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center gap-8 pb-32"
        style={{ y: mgY, opacity }}
      >
        {pillars.map((pillar, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            style={{ transformOrigin: 'bottom' }}
          >
            {/* Pillar Base */}
            <div
              className="w-24 rounded-t-xl relative overflow-hidden"
              style={{
                height: `${pillar.height}px`,
                background: `linear-gradient(to top, ${pillar.color}40, ${pillar.color}20)`
              }}
            >
              {/* Holographic Scan Lines */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 4px,
                    ${pillar.color}30 4px,
                    ${pillar.color}30 8px
                  )`
                }}
                animate={{ y: [-8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing Edge */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: pillar.color, boxShadow: `0 0 20px ${pillar.color}` }}
              />

              {/* Label */}
              <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-antonio font-bold"
                style={{ color: pillar.color }}
              >
                {pillar.label}
              </div>
            </div>

            {/* Floating Particles Around Pillar */}
            {[...Array(4)].map((_, pi) => (
              <motion.div
                key={pi}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: pillar.color,
                  left: '50%',
                  top: `${pi * 25}%`
                }}
                animate={{
                  x: [0, 20, 0, -20, 0],
                  y: [0, -10, -20, -10, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: pi * 0.3
                }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground - Floating Experience Counters & Icons */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Rotating Achievement Icons */}
        {[
          { icon: '🏆', x: 15, y: 20, color: '#FFC60B' },
          { icon: '⭐', x: 85, y: 25, color: '#4285F4' },
          { icon: '🎯', x: 10, y: 60, color: '#EA4335' },
          { icon: '💎', x: 90, y: 65, color: '#9333EA' },
          { icon: '🚀', x: 50, y: 15, color: '#34A853' },
          { icon: '⚡', x: 50, y: 75, color: '#FF9900' }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`
            }}
            animate={{
              rotate: [0, 360],
              y: [-10, 10, -10],
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              y: { duration: 3 + i * 0.5, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <div
              className="text-4xl filter drop-shadow-lg"
              style={{ filter: `drop-shadow(0 0 10px ${item.color})` }}
            >
              {item.icon}
            </div>
          </motion.div>
        ))}

        {/* Floating Counter Cards */}
        {[
          { number: '30+', label: 'Years', color: '#4285F4' },
          { number: '250+', label: 'Clients', color: '#EA4335' },
          { number: '15+', label: 'Industries', color: '#FBBC05' }
        ].map((counter, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${25 + i * 20}%` }}
            animate={{
              x: [-50, 50, -50],
              y: [-10, 10, -10],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ opacity: 0.6, scale: 1.1 }}
          >
            <div 
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2"
              style={{ borderColor: counter.color }}
            >
              <div 
                className="text-5xl font-antonio font-bold mb-1"
                style={{ color: counter.color }}
              >
                {counter.number}
              </div>
              <div className="text-sm text-gray-600 font-semibold">{counter.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Corridor Doors Opening Effect (Exit) */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]) }}
      >
        {/* Left Door */}
        <motion.div
          className="w-1/2 h-full bg-gradient-to-r from-slate-800 to-slate-700"
          style={{ x: useTransform(scrollYProgress, [0.7, 1], ['0%', '-100%']) }}
        />
        {/* Right Door */}
        <motion.div
          className="w-1/2 h-full bg-gradient-to-l from-slate-800 to-slate-700"
          style={{ x: useTransform(scrollYProgress, [0.7, 1], ['0%', '100%']) }}
        />
      </motion.div>
    </div>
  );
}
