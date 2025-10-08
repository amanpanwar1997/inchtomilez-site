import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';
import { TrendingUp, Users, Award, Target, Zap, Globe } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  color: string;
  delay?: number;
}

function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 60, 
    stiffness: 100 
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString('en-IN')}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref} />;
}

function StatCard({ icon: Icon, value, suffix, prefix, label, color, delay = 0 }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
      className="glass-card p-6 hover-lift-award group relative overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="icon-container-glass w-14 h-14 flex items-center justify-center">
            <Icon className={`w-7 h-7 ${color} icon-pulse`} />
          </div>
        </motion.div>

        {/* Value */}
        <motion.div
          className="heading-lg mb-2"
          initial={{ scale: 0.5 }}
          animate={isInView ? { scale: 1 } : { scale: 0.5 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
        >
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </motion.div>

        {/* Label */}
        <p className="body-sm text-gray-600">{label}</p>

        {/* Decorative line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mt-4"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: delay + 0.4, duration: 0.8 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{ translateX: ['100%', '-100%'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
      />
    </motion.div>
  );
}

export function InteractiveStats() {
  const stats = [
    {
      icon: Users,
      value: 500,
      suffix: '+',
      label: 'Happy Clients',
      color: 'icon-color-blue'
    },
    {
      icon: Award,
      value: 1200,
      suffix: '+',
      label: 'Projects Completed',
      color: 'icon-color-purple'
    },
    {
      icon: Target,
      value: 95,
      suffix: '%',
      label: 'Success Rate',
      color: 'icon-color-green'
    },
    {
      icon: TrendingUp,
      value: 300,
      suffix: '%',
      label: 'Avg. ROI Increase',
      color: 'icon-color-orange'
    },
    {
      icon: Zap,
      value: 24,
      suffix: '/7',
      label: 'Support Available',
      color: 'icon-color-yellow'
    },
    {
      icon: Globe,
      value: 15,
      suffix: '+',
      label: 'Industries Served',
      color: 'icon-color-teal'
    }
  ];

  return (
    <section className="section-compact-lg glass-section-light">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">Our Impact in Numbers</h2>
          <p className="body-lg max-w-2xl mx-auto text-gray-600">
            Real results that speak louder than words. Join hundreds of businesses 
            that have transformed their digital presence with InchToMilez.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              {...stat} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
