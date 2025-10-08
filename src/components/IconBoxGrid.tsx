import { motion } from 'motion/react';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface IconBox {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stat?: string;
  link?: string;
}

interface IconBoxGridProps {
  items: IconBox[];
  columns?: 2 | 3 | 4;
  animation?: 'flip' | 'scale' | 'glow' | 'slide';
}

export function IconBoxGrid({ items, columns = 4, animation = 'glow' }: IconBoxGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols[columns]} gap-6`}>
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="group perspective-[1000px]"
          >
            {animation === 'flip' ? (
              // Flip Animation Card
              <div className="relative preserve-3d transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="glass-card card-compact-md h-full backface-hidden">
                  <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto">
                    <Icon className="w-full h-full text-black" strokeWidth={2} />
                  </div>
                  <h3 className="heading-sm text-base text-center mb-2">{item.title}</h3>
                  {item.stat && (
                    <div className="text-center">
                      <span className="font-antonio font-bold text-2xl text-black">{item.stat}</span>
                    </div>
                  )}
                </div>

                {/* Back */}
                <div className="glass-card card-compact-md h-full absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-black/90 backdrop-blur-lg">
                  <div className="flex flex-col h-full justify-center items-center text-center">
                    <p className="text-white text-sm leading-relaxed mb-4">{item.description}</p>
                    {item.link && (
                      <button className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-[10px] text-xs font-semibold hover:bg-white/90 transition-colors">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : animation === 'scale' ? (
              // Scale Animation Card
              <div className="glass-card card-compact-md h-full hover:glass-shine transition-all duration-500 group-hover:scale-105">
                <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Icon className="w-full h-full text-black" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base text-center mb-2">{item.title}</h3>
                {item.stat && (
                  <div className="text-center mb-3">
                    <span className="font-antonio font-bold text-2xl text-black">{item.stat}</span>
                  </div>
                )}
                <p className="body-xs text-muted text-center leading-relaxed line-clamp-3">{item.description}</p>
              </div>
            ) : animation === 'slide' ? (
              // Slide Animation Card
              <div className="glass-card card-compact-md h-full relative overflow-hidden">
                {/* Default Content */}
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto">
                    <Icon className="w-full h-full text-black" strokeWidth={2} />
                  </div>
                  <h3 className="heading-sm text-base text-center mb-2">{item.title}</h3>
                  {item.stat && (
                    <div className="text-center">
                      <span className="font-antonio font-bold text-2xl text-black">{item.stat}</span>
                    </div>
                  )}
                </div>

                {/* Slide-up Content */}
                <div className="absolute inset-0 bg-black/90 backdrop-blur-lg flex flex-col justify-center items-center text-center p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <Icon className="w-12 h-12 text-white mb-3" strokeWidth={2} />
                  <h3 className="font-antonio font-bold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ) : (
              // Glow Animation Card (default)
              <div className="glass-card card-compact-md h-full hover:glass-shine transition-all duration-500 relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black/5 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10">
                  <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto group-hover:shadow-lg transition-shadow duration-500">
                    <Icon className="w-full h-full text-black" strokeWidth={2} />
                  </div>
                  <h3 className="heading-sm text-base text-center mb-2">{item.title}</h3>
                  {item.stat && (
                    <div className="text-center mb-3">
                      <span className="font-antonio font-bold text-2xl text-black">{item.stat}</span>
                    </div>
                  )}
                  <p className="body-xs text-muted text-center leading-relaxed line-clamp-3">{item.description}</p>
                  
                  {/* Hover Line */}
                  <div className="mt-4 pt-4 border-t border-transparent group-hover:border-gray-200 transition-colors duration-300">
                    <div className="flex items-center justify-center gap-1 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold">Discover</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
