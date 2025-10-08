import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * SCENE 2: ABOUT - Modern Office Interior
 * BG: Office windows with city sky view
 * MG: Office furniture, light panels, floating documents
 * FG: Mission/Vision/Values posters sliding in
 */

export function Scene02_About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const mgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background - Office Windows & Sky */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-blue-50 to-slate-100" />
        
        {/* Window Grid */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 p-8 opacity-30">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="border-4 border-slate-300 bg-gradient-to-b from-sky-200/40 to-blue-100/20 rounded-lg"
            />
          ))}
        </div>

        {/* City Silhouette Through Windows */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            {[...Array(15)].map((_, i) => (
              <rect
                key={i}
                x={i * 80}
                y={80 + Math.random() * 60}
                width={60}
                height={120 - Math.random() * 40}
                fill="#1e293b"
                opacity="0.4"
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* Middleground - Office Furniture & Elements */}
      <motion.div
        className="absolute inset-0"
        style={{ y: mgY, opacity }}
      >
        {/* Floating Office Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              width: '60px',
              height: '80px'
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-2, 2, -2]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Abstract Office Items */}
            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg shadow-lg opacity-40" />
          </motion.div>
        ))}

        {/* Light Panels */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`light-${i}`}
            className="absolute top-0"
            style={{
              left: `${20 + i * 20}%`,
              width: '120px',
              height: '40px'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-white via-yellow-100 to-transparent rounded-b-xl opacity-50" />
          </motion.div>
        ))}

        {/* Floating Documents */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`doc-${i}`}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${40 + (i % 2) * 30}%`
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-16 h-20 bg-white rounded shadow-xl opacity-60 border border-slate-200">
              <div className="p-2 space-y-1">
                <div className="h-1 bg-slate-300 rounded" />
                <div className="h-1 bg-slate-200 rounded w-3/4" />
                <div className="h-1 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground - Mission/Vision/Values Posters */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {/* Left Poster - Mission */}
        <motion.div
          className="absolute left-0 top-1/4"
          initial={{ x: -300, opacity: 0 }}
          whileInView={{ x: 20, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-48 h-64 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-2xl shadow-2xl backdrop-blur-sm p-6">
            <div className="text-2xl font-antonio font-bold text-blue-900 mb-4">MISSION</div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2 bg-blue-900/20 rounded" style={{ width: `${100 - i * 10}%` }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Poster - Vision */}
        <motion.div
          className="absolute right-0 top-1/3"
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: -20, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-48 h-64 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-2xl shadow-2xl backdrop-blur-sm p-6">
            <div className="text-2xl font-antonio font-bold text-purple-900 mb-4">VISION</div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2 bg-purple-900/20 rounded" style={{ width: `${80 - i * 8}%` }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center Bottom Poster - Values */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-1/4"
          initial={{ y: 300, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-56 h-48 bg-gradient-to-br from-green-500/30 to-emerald-500/20 rounded-2xl shadow-2xl backdrop-blur-sm p-6">
            <div className="text-2xl font-antonio font-bold text-green-900 mb-4">VALUES</div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 bg-green-900/20 rounded" style={{ width: `${90 - i * 12}%` }} />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Glass Wall Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]) }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent backdrop-blur-md" />
      </motion.div>
    </div>
  );
}
