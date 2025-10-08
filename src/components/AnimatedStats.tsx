import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  description?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  layout?: 'grid' | 'inline';
}

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export function AnimatedStats({ stats, layout = 'grid' }: AnimatedStatsProps) {
  if (layout === 'inline') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="flex items-center gap-4 group"
            >
              {/* Icon */}
              <div className="icon-container-glass w-14 h-14 p-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-full h-full text-black" strokeWidth={2} />
              </div>

              {/* Stats */}
              <div>
                <div className="flex items-baseline gap-1">
                  {stat.prefix && (
                    <span className="font-antonio font-bold text-2xl text-black">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="font-antonio font-bold text-3xl lg:text-4xl text-black">
                    <AnimatedNumber value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="font-antonio font-bold text-2xl text-black">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted font-semibold mt-0.5">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Grid Layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="glass-card card-compact-md hover:glass-shine transition-all duration-500 group"
          >
            {/* Icon */}
            <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Icon className="w-full h-full text-black" strokeWidth={2} />
            </div>

            {/* Number */}
            <div className="text-center mb-2">
              <div className="flex items-baseline justify-center gap-1">
                {stat.prefix && (
                  <span className="font-antonio font-bold text-xl text-black">
                    {stat.prefix}
                  </span>
                )}
                <span className="font-antonio font-bold text-4xl lg:text-5xl text-black">
                  <AnimatedNumber value={stat.value} />
                </span>
                {stat.suffix && (
                  <span className="font-antonio font-bold text-xl text-black">
                    {stat.suffix}
                  </span>
                )}
              </div>
            </div>

            {/* Label */}
            <h3 className="heading-sm text-sm text-center mb-2">
              {stat.label}
            </h3>

            {/* Description */}
            {stat.description && (
              <p className="body-xs text-muted text-center leading-relaxed">
                {stat.description}
              </p>
            )}

            {/* Decorative Bottom Border */}
            <div className="mt-4 pt-4 border-t border-gray-200/50">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className="h-full bg-black rounded-full"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
