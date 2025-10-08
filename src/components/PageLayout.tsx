import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Badge } from './ui/badge';
import { ArrowRight, Home } from 'lucide-react';
import { Button } from './ui/button';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: Array<{ label: string; path?: string }>;
  onNavigate?: (page: string) => void;
  heroGradient?: boolean;
  ctaText?: string;
  ctaAction?: () => void;
}

export function PageLayout({
  children,
  title,
  subtitle,
  badge,
  breadcrumbs,
  onNavigate,
  heroGradient = true,
  ctaText,
  ctaAction
}: PageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${heroGradient ? 'bg-gradient-to-b from-gray-50 via-white to-white' : 'bg-white'} border-b border-black/5`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 right-[10%] w-32 h-32 border border-black/5 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-[15%] w-24 h-24 border border-black/5 rounded-xl"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.div
              className="flex items-center space-x-2 mb-6 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index === 0 && <Home className="w-3.5 h-3.5 mr-2 text-gray-500" />}
                  {crumb.path && onNavigate ? (
                    <button
                      onClick={() => onNavigate(crumb.path!)}
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className={index === breadcrumbs.length - 1 ? 'text-black font-medium' : 'text-gray-600'}>
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 mx-2 text-gray-400" />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            {badge && (
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="px-5 py-2 glass-card border-black/10 shadow-soft">
                  {badge}
                </Badge>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl mb-6 text-shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTA Button */}
            {ctaText && ctaAction && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  onClick={ctaAction}
                  className="bg-black text-white hover:bg-gray-900 shadow-medium hover-lift-small"
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}