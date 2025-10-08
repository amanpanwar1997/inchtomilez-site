import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 5: DIGITAL MARKETING - Control Room
 * BG: Control room back panels with screens
 * MG: Floating dashboards and analytics screens
 * FG: Rising SEO graph, orbiting social media icons
 */

export function Scene05_DigitalMarketing() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const mgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Social media platforms with authentic colors
  const socialIcons = [
    { name: 'Facebook', color: '#1877F2', icon: 'f' },
    { name: 'Instagram', color: '#E4405F', icon: 'i' },
    { name: 'Twitter', color: '#1DA1F2', icon: 't' },
    { name: 'LinkedIn', color: '#0A66C2', icon: 'in' },
    { name: 'YouTube', color: '#FF0000', icon: 'y' },
    { name: 'TikTok', color: '#000000', icon: 'tk' }
  ];

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background - Control Room */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="controlGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect width="50" height="50" fill="none" stroke="#4285F4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#controlGrid)" />
          </svg>
        </div>

        {/* Monitor Screens on Back Wall */}
        <div className="absolute inset-0 grid grid-cols-4 gap-8 p-12">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-lg border border-cyan-500/30 p-4"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                borderColor: ['rgba(6,182,212,0.3)', 'rgba(6,182,212,0.6)', 'rgba(6,182,212,0.3)']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {/* Fake Data Visualization */}
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-1 bg-cyan-400/40 rounded" style={{ width: `${60 + Math.random() * 40}%` }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ambient Lighting */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${i * 25}%`,
                top: '0',
                width: '200px',
                height: '100%'
              }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            >
              <div className="w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Middleground - Floating Dashboards */}
      <motion.div
        className="absolute inset-0"
        style={{ y: mgY, opacity }}
      >
        {/* Analytics Dashboard Cards */}
        {[
          { title: 'Traffic', value: '125K', color: '#4285F4', x: 15, y: 20 },
          { title: 'Conversions', value: '8.5K', color: '#34A853', x: 70, y: 25 },
          { title: 'CTR', value: '12.3%', color: '#EA4335', x: 20, y: 60 },
          { title: 'ROI', value: '340%', color: '#FBBC05', x: 75, y: 65 }
        ].map((dashboard, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${dashboard.x}%`, top: `${dashboard.y}%` }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-2, 2, -2]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border-2 shadow-2xl"
              style={{ borderColor: dashboard.color }}
            >
              <div className="text-xs text-gray-300 mb-2 font-semibold">{dashboard.title}</div>
              <div
                className="text-3xl font-antonio font-bold"
                style={{ color: dashboard.color }}
              >
                {dashboard.value}
              </div>
              {/* Mini Graph */}
              <svg className="w-full h-8 mt-2" viewBox="0 0 100 30">
                <polyline
                  points="0,25 20,20 40,15 60,10 80,8 100,5"
                  fill="none"
                  stroke={dashboard.color}
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground - SEO Graph & Orbiting Social Icons */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Rising SEO Graph */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <svg className="w-full h-full" viewBox="0 0 1200 250" preserveAspectRatio="none">
            <defs>
              <linearGradient id="graphGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#34A853', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#34A853', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            
            {/* Graph Line */}
            <motion.polyline
              points="0,200 200,180 400,140 600,100 800,70 1000,40 1200,20"
              fill="url(#graphGradient)"
              stroke="#34A853"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Data Points */}
            {[0, 200, 400, 600, 800, 1000, 1200].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={200 - i * 30}
                r="5"
                fill="#34A853"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Orbiting Social Media Icons */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {socialIcons.map((social, i) => {
            const angle = (i / socialIcons.length) * Math.PI * 2;
            const radius = 150;
            
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%'
                }}
                animate={{
                  x: Math.cos(angle) * radius,
                  y: Math.sin(angle) * radius,
                  rotate: -angle * (180 / Math.PI)
                }}
                transition={{
                  x: { duration: 20, repeat: Infinity, ease: "linear" },
                  y: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-2xl"
                  style={{ backgroundColor: social.color }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${social.color}40`,
                      `0 0 40px ${social.color}60`,
                      `0 0 20px ${social.color}40`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {social.icon}
                </motion.div>
              </motion.div>
            );
          })}
          
          {/* Center Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-antonio font-bold text-lg shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 30px rgba(147,51,234,0.5)',
                  '0 0 60px rgba(147,51,234,0.8)',
                  '0 0 30px rgba(147,51,234,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SMM
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Data Stream Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{ left: `${i * 10}%`, top: '-20px' }}
            animate={{ y: [0, window.innerHeight + 20] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
}
