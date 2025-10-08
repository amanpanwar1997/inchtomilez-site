import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function AnimatedTabs({ tabs, defaultTab }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="glass-card card-compact-md mb-6">
        <div className="relative flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-6 py-3 rounded-[10px] font-semibold text-sm whitespace-nowrap
                  transition-all duration-300 flex items-center gap-2
                  ${isActive 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-100/50'
                  }
                `}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-black rounded-[10px] shadow-lg"
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 30 
                    }}
                  />
                )}

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  {Icon && <Icon className="w-4 h-4" strokeWidth={2} />}
                  {tab.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 flex gap-1">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className="h-1 flex-1 rounded-full overflow-hidden bg-gray-200"
            >
              <motion.div
                className="h-full bg-black"
                initial={{ width: '0%' }}
                animate={{ 
                  width: index <= activeIndex ? '100%' : '0%' 
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {tabs.map(tab => {
            if (tab.id !== activeTab) return null;

            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                {tab.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
