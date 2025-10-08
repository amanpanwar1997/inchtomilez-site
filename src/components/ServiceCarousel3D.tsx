import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

interface ServiceCarousel3DProps {
  services: Service[];
}

export function ServiceCarousel3D({ services }: ServiceCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    
    if (diff === 0) {
      // Active card - center
      return {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        x: 0,
        z: 0,
        zIndex: 30
      };
    } else if (diff === 1 || diff === -(services.length - 1)) {
      // Right card
      return {
        opacity: 0.6,
        scale: 0.85,
        rotateY: -25,
        x: '50%',
        z: -100,
        zIndex: 10
      };
    } else if (diff === -1 || diff === services.length - 1) {
      // Left card
      return {
        opacity: 0.6,
        scale: 0.85,
        rotateY: 25,
        x: '-50%',
        z: -100,
        zIndex: 10
      };
    } else {
      // Hidden cards
      return {
        opacity: 0,
        scale: 0.7,
        rotateY: diff > 0 ? -45 : 45,
        x: diff > 0 ? '100%' : '-100%',
        z: -200,
        zIndex: 0
      };
    }
  };

  return (
    <div className="relative w-full">
      {/* 3D Carousel Container */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] flex items-center justify-center perspective-[2000px]">
        <div className="relative w-full max-w-5xl mx-auto h-full">
          <AnimatePresence mode="sync">
            {services.map((service, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;
              
              return (
                <motion.div
                  key={service.id}
                  className="absolute top-1/2 left-1/2 w-full max-w-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '2000px'
                  }}
                  initial={false}
                  animate={{
                    opacity: style.opacity,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    x: `calc(-50% + ${typeof style.x === 'string' ? style.x : '0px'})`,
                    y: '-50%',
                    z: style.z,
                    zIndex: style.zIndex
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  onClick={() => !isActive && setActiveIndex(index)}
                  className={`cursor-pointer ${!isActive ? 'pointer-events-auto' : ''}`}
                >
                  <div 
                    className="glass-card card-compact-lg hover-lift-award"
                    style={{
                      borderRadius: '10px',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="icon-container-glass w-16 h-16 p-4 flex-shrink-0">
                        <service.icon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                      </div>
                      <div className="flex-grow">
                        <h3 className="heading-md text-xl mb-2">{service.title}</h3>
                        <p className="body-md">{service.description}</p>
                      </div>
                    </div>

                    {/* Features Grid - Only visible when active */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        height: isActive ? 'auto' : 0
                      }}
                      transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                            transition={{ duration: 0.3, delay: isActive ? 0.3 + idx * 0.05 : 0 }}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#baff00] flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="body-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="btn-award btn-sm-award group/nav"
          aria-label="Previous service"
        >
          <ChevronLeft className="w-5 h-5 icon-animated group-hover/nav:-translate-x-1" strokeWidth={2} />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="transition-all duration-300"
              style={{
                width: index === activeIndex ? '32px' : '8px',
                height: '8px',
                borderRadius: '10px',
                background: index === activeIndex 
                  ? 'linear-gradient(135deg, #baff00 0%, #a3e600 100%)'
                  : '#e5e5e5'
              }}
              aria-label={`Go to ${services[index].title}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="btn-award btn-sm-award group/nav"
          aria-label="Next service"
        >
          <ChevronRight className="w-5 h-5 icon-animated group-hover/nav:translate-x-1" strokeWidth={2} />
        </button>
      </div>

      {/* Service Counter */}
      <div className="text-center mt-6">
        <p className="body-sm">
          <span className="heading-sm text-base">{activeIndex + 1}</span>
          <span className="text-muted"> / {services.length}</span>
        </p>
        <p className="subheading text-xs mt-1">{services[activeIndex].title}</p>
      </div>
    </div>
  );
}
