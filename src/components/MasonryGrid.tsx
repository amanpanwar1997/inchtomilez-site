import { motion } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { LucideIcon } from 'lucide-react';

interface MasonryItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  size?: 'small' | 'medium' | 'large';
  category?: string;
}

interface MasonryGridProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
}

export function MasonryGrid({ items, columns = 3, gap = 24 }: MasonryGridProps) {
  const getSizeClass = (size?: string) => {
    switch (size) {
      case 'small':
        return 'min-h-[200px]';
      case 'large':
        return 'min-h-[400px]';
      default:
        return 'min-h-[300px]';
    }
  };

  return (
    <Masonry columnsCount={columns} gutter={`${gap}px`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="group"
          >
            <div 
              className={`
                glass-card card-compact-md hover:glass-shine transition-all duration-500 
                ${getSizeClass(item.size)} 
                flex flex-col relative overflow-hidden
              `}
            >
              {/* Background Image (if provided) */}
              {item.image && (
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              )}

              {/* Category Badge */}
              {item.category && (
                <div className="absolute top-3 right-3 badge-glass px-3 py-1 z-10">
                  <span className="text-xs font-semibold text-black">{item.category}</span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="icon-container-glass w-14 h-14 p-3 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-full h-full text-black" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="heading-sm text-base mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="body-sm text-muted leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-black inline-flex items-center gap-1">
                    Learn More
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        );
      })}
    </Masonry>
  );
}
