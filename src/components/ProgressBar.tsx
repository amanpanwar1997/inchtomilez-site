import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: 'green' | 'yellow' | 'black';
  showPercentage?: boolean;
  delay?: number;
  icon?: any;
}

export function ProgressBar({
  label,
  value,
  maxValue = 100,
  color = 'green',
  showPercentage = true,
  delay = 0,
  icon: Icon
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorClasses = {
    green: 'bg-[#baff00]',
    yellow: 'bg-[#ffc60b]',
    black: 'bg-black'
  };

  const glowClasses = {
    green: 'shadow-[0_0_20px_rgba(186,255,0,0.3)]',
    yellow: 'shadow-[0_0_20px_rgba(255,198,11,0.3)]',
    black: 'shadow-[0_0_20px_rgba(0,0,0,0.3)]'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />}
          <span className="font-raleway font-medium text-sm">{label}</span>
        </div>
        {showPercentage && (
          <span className="font-antonio text-sm">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colorClasses[color]} ${glowClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${(displayValue / maxValue) * 100}%` }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: 'green' | 'yellow' | 'black';
  label?: string;
  delay?: number;
}

export function CircularProgress({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = 'green',
  label,
  delay = 0
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = (value / maxValue) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / maxValue) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const colorMap = {
    green: '#baff00',
    yellow: '#ffc60b',
    black: '#000000'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorMap[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            filter: `drop-shadow(0 0 8px ${colorMap[color]}40)`
          }}
        />
        {/* Center text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="font-antonio text-2xl fill-black transform rotate-90"
          style={{ transformOrigin: 'center' }}
        >
          {Math.round(percentage)}%
        </text>
      </svg>
      {label && (
        <span className="font-raleway text-sm text-center font-medium">{label}</span>
      )}
    </div>
  );
}
