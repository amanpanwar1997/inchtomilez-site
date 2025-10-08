import { motion } from 'motion/react';

interface SectionIndicatorProps {
  totalSections: number;
  currentSection: number;
  onNavigate?: (index: number) => void;
}

export function SectionIndicator({ 
  totalSections, 
  currentSection,
  onNavigate 
}: SectionIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onNavigate?.(index)}
          className="group relative w-3 h-3 rounded-full transition-all duration-300"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to section ${index + 1}`}
        >
          {/* Outer ring */}
          <motion.div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'border-black'
                : 'border-black/20 group-hover:border-black/40'
            }`}
            animate={{
              scale: currentSection === index ? 1.5 : 1,
            }}
          />
          
          {/* Inner dot */}
          <motion.div
            className={`absolute inset-0 m-auto w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-black'
                : 'bg-black/20 group-hover:bg-black/40'
            }`}
            animate={{
              scale: currentSection === index ? 1.2 : 1,
            }}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            <div className="bg-black text-white text-xs px-3 py-1.5 rounded-md font-raleway">
              Section {index + 1}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
