import { motion } from 'motion/react';
import { LucideIcon, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AnimatedIcon } from './AnimatedIcon';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  price?: string;
  popular?: boolean;
  delay?: number;
  onClick?: () => void;
  variant?: 'default' | 'featured' | 'compact';
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features = [],
  price,
  popular,
  delay = 0,
  onClick,
  variant = 'default'
}: ServiceCardProps) {
  
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        <Card className="group relative glass-card p-6 h-full border-black/5 hover:border-black/15 transition-all hover-lift cursor-pointer shadow-soft overflow-hidden">
          {/* Background Icon */}
          <div className="absolute -right-6 -top-6 opacity-[0.03]">
            <AnimatedIcon icon={Icon} animation="float" size={140} delay={delay} />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-medium">
              <AnimatedIcon icon={Icon} animation="pulse" size={24} className="text-white" delay={delay} />
            </div>

            {/* Content */}
            <h3 className="text-xl mb-3">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

            {/* Action */}
            {onClick && (
              <button
                onClick={onClick}
                className="mt-4 flex items-center text-sm font-medium text-black group-hover:gap-2 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="relative"
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-black text-white border-black shadow-medium px-4 py-1.5">
              ⭐ Most Popular
            </Badge>
          </div>
        )}

        <Card className={`group relative p-8 h-full transition-all hover-lift cursor-pointer overflow-hidden ${
          popular 
            ? 'border-2 border-black shadow-dramatic bg-gradient-to-b from-gray-50 to-white' 
            : 'glass-card border-black/8 shadow-strong'
        }`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}
            />
          </div>

          {/* Background Icon */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.02]">
            <AnimatedIcon icon={Icon} animation="rotate" size={200} delay={delay} />
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-strong">
              <AnimatedIcon icon={Icon} animation="pulse" size={32} className="text-white" delay={delay} />
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            {/* Price */}
            {price && (
              <div className="mb-6 pb-6 border-b border-black/5">
                <div className="flex items-baseline">
                  <span className="text-3xl font-antonio font-bold">{price}</span>
                  <span className="text-gray-500 ml-2">/project</span>
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: delay + (idx * 0.05) }}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-black" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            )}

            {/* Action Button */}
            {onClick && (
              <Button
                onClick={onClick}
                className={`w-full ${
                  popular 
                    ? 'bg-black text-white hover:bg-gray-900' 
                    : 'bg-white border-2 border-black hover:bg-black hover:text-white'
                } shadow-medium btn-hover-scale`}
                size="lg"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card className="group relative glass-card p-6 h-full border-black/8 hover:border-black/20 transition-all hover-lift cursor-pointer shadow-medium overflow-hidden">
        {/* Background Icon */}
        <div className="absolute -right-8 -top-8 opacity-[0.02]">
          <AnimatedIcon icon={Icon} animation="float" size={160} delay={delay} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="w-14 h-14 bg-gradient-to-br from-black to-gray-700 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-medium">
            <AnimatedIcon icon={Icon} animation="pulse" size={24} className="text-white" delay={delay} />
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h3 className="text-xl mb-3">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

            {/* Features */}
            {features.length > 0 && (
              <ul className="space-y-2 mb-5">
                {features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-600">
                    <CheckCircle2 className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action */}
          {onClick && (
            <Button
              variant="ghost"
              onClick={onClick}
              className="w-full justify-between group border border-black/5 hover:border-black/20 hover:bg-black/5 mt-auto"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// Service Grid Component for consistent layouts
interface ServiceGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ServiceGrid({ children, columns = 3, className = '' }: ServiceGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 ${className}`}>
      {children}
    </div>
  );
}