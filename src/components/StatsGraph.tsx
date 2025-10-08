import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface StatData {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

interface StatsGraphProps {
  data: StatData[];
  type?: 'bar' | 'line' | 'radial';
  className?: string;
}

export function StatsGraph({ data, type = 'bar', className = '' }: StatsGraphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (type === 'bar') {
    return (
      <div ref={ref} className={`space-y-4 ${className}`}>
        {data.map((stat, index) => {
          const percentage = ((stat.value / (stat.maxValue || 100)) * 100);
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">{stat.label}</span>
                <span className="font-semibold">{stat.value}%</span>
              </div>
              <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-black via-gray-700 to-gray-900 rounded-full relative"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.1 + 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (type === 'line') {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((stat, i) => ({
      x: (i / (data.length - 1)) * 100,
      y: 100 - ((stat.value / maxValue) * 80)
    }));

    const pathD = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    return (
      <div ref={ref} className={`${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-40" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="black"
              strokeWidth="0.2"
              opacity="0.1"
            />
          ))}

          {/* Area under line */}
          <motion.path
            d={`${pathD} L 100 100 L 0 100 Z`}
            fill="url(#lineGradient)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="black"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data points */}
          {points.map((point, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="black"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
              />
              {/* Pulse ring */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="2"
                fill="none"
                stroke="black"
                strokeWidth="0.5"
                initial={{ r: 2, opacity: 0 }}
                animate={isInView ? {
                  r: [2, 8, 12],
                  opacity: [0.8, 0.3, 0]
                } : { opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: 2.5 + i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.g>
          ))}

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="black" stopOpacity="0.3" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-2">
          {data.map((stat, i) => (
            <div key={i} className="text-xs text-center">
              <div className="text-gray-500">{stat.label}</div>
              <div className="font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'radial') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    return (
      <div ref={ref} className={`flex flex-wrap gap-6 justify-center ${className}`}>
        {data.map((stat, index) => {
          const percentage = (stat.value / (stat.maxValue || 100)) * 100;
          const offset = circumference - (percentage / 100) * circumference;

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-full h-full">
                  {/* Background circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="black"
                    strokeWidth="8"
                    fill="none"
                    opacity="0.05"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="black"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
                    transition={{
                      duration: 2,
                      delay: index * 0.2,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-2xl font-antonio font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + 1
                    }}
                  >
                    {stat.value}%
                  </motion.div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mt-3 text-center font-medium">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}

// Mini sparkline component for inline stats
export function Sparkline({ 
  data, 
  className = '', 
  height = 20 
}: { 
  data: number[]; 
  className?: string; 
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const maxValue = Math.max(...data);
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: height - ((value / maxValue) * height)
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <svg 
        viewBox={`0 0 100 ${height}`} 
        style={{ width: '100px', height: `${height}px` }}
        preserveAspectRatio="none"
      >
        <motion.path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}