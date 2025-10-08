import { motion } from 'motion/react';
import { AnimatedIcon } from './AnimatedIcon';
import { LucideIcon } from 'lucide-react';

interface InfographicStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
  delay?: number;
  color?: 'green' | 'yellow' | 'black';
}

export function InfographicStat({
  icon,
  value,
  label,
  description,
  delay = 0,
  color = 'green'
}: InfographicStatProps) {
  const colorClasses = {
    green: 'from-[#baff00] to-[#a3e600]',
    yellow: 'from-[#ffc60b] to-[#f0b800]',
    black: 'from-black to-gray-800'
  };

  const iconColorClasses = {
    green: 'text-[#baff00]',
    yellow: 'text-[#ffc60b]',
    black: 'text-black'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="glass-ultra rounded-3xl p-6 text-center group hover:scale-105 transition-all duration-300"
    >
      {/* Animated Icon */}
      <div 
        className="w-16 h-16 mx-auto mb-4 p-4 group-hover:scale-110 transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.03), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
        }}
      >
        <AnimatedIcon icon={icon} animation="pulse" size={32} className="text-black" strokeWidth={2} />
      </div>

      {/* Value */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2, type: 'spring' }}
        className="heading-xl mb-2"
      >
        {value}
      </motion.div>

      {/* Label */}
      <div className="heading-sm mb-2">{label}</div>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-xs">{description}</p>
      )}

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '60%' }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
        className={`h-0.5 bg-gradient-to-r ${colorClasses[color]} mx-auto mt-4`}
      />
    </motion.div>
  );
}

interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
  isLast?: boolean;
}

export function TimelineItem({
  number,
  title,
  description,
  delay = 0,
  isLast = false
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative flex gap-4 md:gap-6"
    >
      {/* Number Badge */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#baff00] to-[#a3e600] flex items-center justify-center shadow-lg">
          <span className="font-antonio text-lg font-bold text-black">{number}</span>
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-[#baff00] to-transparent ml-6 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <h3 className="heading-md mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

interface ComparisonBarProps {
  label: string;
  ourValue: number;
  competitorValue: number;
  maxValue?: number;
  delay?: number;
}

export function ComparisonBar({
  label,
  ourValue,
  competitorValue,
  maxValue = 100,
  delay = 0
}: ComparisonBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-raleway font-medium text-sm">{label}</span>
        <span className="font-antonio text-sm text-[#baff00]">+{ourValue - competitorValue}%</span>
      </div>

      {/* Our Performance */}
      <div className="space-y-1">
        <span className="text-xs text-gray-600">InchToMilez</span>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#baff00] to-[#a3e600] rounded-full shadow-[0_0_10px_rgba(186,255,0,0.3)]"
            initial={{ width: 0 }}
            animate={{ width: `${(ourValue / maxValue) * 100}%` }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Competitor Performance */}
      <div className="space-y-1">
        <span className="text-xs text-gray-600">Others</span>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gray-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(competitorValue / maxValue) * 100}%` }}
            transition={{ duration: 1.2, delay: delay + 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
