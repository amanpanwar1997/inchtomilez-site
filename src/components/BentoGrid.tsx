import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  image?: string;
  gradient?: string;
}

interface BentoGridProps {
  items: BentoItem[];
}

export function BentoGrid({ items }: BentoGridProps) {
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2 md:row-span-1';
      case 'tall':
        return 'md:col-span-1 md:row-span-2';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className={`${getSizeClass(item.size)} group`}
          >
            <div className="glass-card h-full relative overflow-hidden flex flex-col p-6 hover:glass-shine transition-all duration-500">
              {/* Background Pattern/Image */}
              {item.image ? (
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              ) : item.gradient && (
                <div 
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: item.gradient }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="icon-container-glass w-12 h-12 p-2.5 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon className="w-full h-full text-black" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className={`font-antonio font-bold text-black mb-2 ${
                  item.size === 'large' ? 'text-2xl' : 
                  item.size === 'wide' ? 'text-xl' : 
                  'text-lg'
                }`}>
                  {item.title}
                </h3>

                {/* Description - Show more text for larger cards */}
                <p className={`text-muted leading-relaxed flex-1 ${
                  item.size === 'small' ? 'text-xs line-clamp-2' :
                  item.size === 'large' ? 'text-sm' :
                  'text-sm line-clamp-3'
                }`}>
                  {item.description}
                </p>

                {/* Footer - Only show on medium+ */}
                {(item.size === 'medium' || item.size === 'large' || item.size === 'wide') && (
                  <div className="mt-4 pt-4 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-black inline-flex items-center gap-1.5">
                      Explore
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Corner */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-bl from-black/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
