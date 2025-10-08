import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  stats?: string;
}

interface ImageAccordionProps {
  items: AccordionItem[];
}

export function ImageAccordion({ items }: ImageAccordionProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || '');

  return (
    <div className="flex flex-col lg:flex-row gap-2 h-[600px] w-full">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;
        
        return (
          <motion.div
            key={item.id}
            className="relative overflow-hidden rounded-[10px] cursor-pointer group"
            style={{
              flex: isActive ? '3' : '1',
            }}
            animate={{
              flex: isActive ? 3 : 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%), url(${item.image})`,
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              {/* Vertical Title (when collapsed) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="transform -rotate-90 origin-center whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        <h3 className="font-antonio font-bold text-white text-xl tracking-wide">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Icon */}
                    <div className="icon-container-glass w-16 h-16 p-4 bg-white/10 backdrop-blur-md border-white/20">
                      <Icon className="w-full h-full text-white" strokeWidth={2} />
                    </div>

                    {/* Stats Badge */}
                    {item.stats && (
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-[10px] px-3 py-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                        <span className="text-white text-xs font-semibold">{item.stats}</span>
                      </div>
                    )}

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="font-antonio font-bold text-white text-3xl mb-1">
                        {item.title}
                      </h3>
                      <p className="font-antonio font-semibold text-white/70 text-lg">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed max-w-md">
                      {item.description}
                    </p>

                    {/* CTA Button */}
                    <button className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-[10px] font-semibold text-sm hover:bg-white/90 transition-all duration-300 group/btn">
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white shadow-lg"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
