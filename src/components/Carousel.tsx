import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface CarouselProps {
  children: ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  slidesToShow?: number;
  className?: string;
}

export function Carousel({
  children,
  autoplay = true,
  autoplaySpeed = 3000,
  showDots = true,
  slidesToShow = 3,
  className = ''
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, autoplaySpeed);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, currentIndex]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetAutoplay();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: `calc(-${currentIndex * (100 / slidesToShow)}% - ${currentIndex * 1}rem)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              style={{ minWidth: `calc(${100 / slidesToShow}% - ${((slidesToShow - 1) * 1) / slidesToShow}rem)` }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-black/10"
        onClick={() => {
          goToPrev();
          resetAutoplay();
        }}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-black/10"
        onClick={() => {
          goToNext();
          resetAutoplay();
        }}
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Navigation */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-black w-8'
                  : 'bg-black/30 hover:bg-black/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SingleSlideCarouselProps {
  children: ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  fade?: boolean;
  className?: string;
}

export function SingleSlideCarousel({
  children,
  autoplay = true,
  autoplaySpeed = 4000,
  showDots = true,
  fade = false,
  className = ''
}: SingleSlideCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, autoplaySpeed);
    }
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoplay();
  };

  const variants = fade
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    : {
        enter: (direction: number) => ({
          x: direction > 0 ? 1000 : -1000,
          opacity: 0
        }),
        center: {
          x: 0,
          opacity: 1
        },
        exit: (direction: number) => ({
          x: direction < 0 ? 1000 : -1000,
          opacity: 0
        })
      };

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div className="relative overflow-hidden min-h-[300px]">
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: fade ? 0.5 : 0.2 }
            }}
            className="absolute inset-0"
          >
            {children[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-black/10"
        onClick={() => {
          goToPrev();
          resetAutoplay();
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border-black/10"
        onClick={() => {
          goToNext();
          resetAutoplay();
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots Navigation */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-8">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-black w-8'
                  : 'bg-black/30 hover:bg-black/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}