import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import {
  Search, Globe, Code, Cloud, Smartphone, Palette,
  Video, Radio, MousePointerClick, Newspaper, Vote, Building2,
  ArrowRight, ArrowLeft, Sparkles, CheckCircle2
} from 'lucide-react';

interface ServiceSubsection {
  title: string;
  features: string[];
}

interface ServiceSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Search;
  subsections: ServiceSubsection[];
}

const services: ServiceSlide[] = [
  {
    id: 1,
    title: "DIGITAL MARKETING",
    subtitle: "Services",
    description: "Comprehensive digital marketing solutions designed to elevate your online presence and drive measurable growth.",
    icon: Search,
    subsections: [
      {
        title: "SEO Optimization",
        features: ["Keyword Research & Strategy", "On-Page Optimization", "Technical SEO Audits", "Link Building Campaigns", "Local SEO Excellence", "Performance Tracking"]
      },
      {
        title: "PPC Advertising",
        features: ["Google Ads Management", "Social Media Ads", "Display & Remarketing"]
      },
      {
        title: "Social Media Marketing",
        features: ["Content Strategy", "Community Management", "Influencer Partnerships"]
      },
      {
        title: "Social Media Optimization (SMO)",
        features: ["Profile Optimization", "Content Calendar", "Hashtag Strategy"]
      },
      {
        title: "Organic Growth",
        features: ["Content Marketing", "SEO-Driven Strategy", "Community Building"]
      },
      {
        title: "Email Marketing",
        features: ["Campaign Design", "Automation", "Analytics"]
      }
    ]
  },
  {
    id: 2,
    title: "WEBSITE DEVELOPMENT",
    subtitle: "Services",
    description: "Cutting-edge web solutions that combine stunning design with powerful functionality.",
    icon: Globe,
    subsections: [
      {
        title: "Custom Website Development",
        features: ["Responsive Design", "Custom CMS Integration", "E-commerce Solutions", "Progressive Web Apps", "API Development", "Performance Optimization"]
      },
      {
        title: "UI/UX Design",
        features: ["User Research", "Wireframing & Prototyping", "Interface Design", "User Testing", "Design Systems", "Accessibility Compliance"]
      },
      {
        title: "Web Applications",
        features: ["SaaS Platforms", "Business Tools", "Customer Portals"]
      },
      {
        title: "Maintenance & Support",
        features: ["Security Updates", "Performance Monitoring", "Bug Fixes"]
      }
    ]
  },
  {
    id: 3,
    title: "SOFTWARE DEVELOPMENT",
    subtitle: "Services",
    description: "Enterprise-grade software solutions built with cutting-edge technology and best practices.",
    icon: Code,
    subsections: [
      {
        title: "Custom Software Development",
        features: ["Enterprise Applications", "Business Process Automation", "System Integration", "Legacy Modernization", "Cloud Migration", "DevOps & CI/CD"]
      },
      {
        title: "Mobile App Development",
        features: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Store Optimization", "Mobile Backend", "Push Notifications"]
      },
      {
        title: "Cloud Solutions",
        features: ["AWS/Azure/GCP", "Serverless Architecture", "Microservices"]
      }
    ]
  },
  {
    id: 4,
    title: "CLOUD SERVICES",
    subtitle: "Services",
    description: "Scalable cloud infrastructure and services that power modern businesses.",
    icon: Cloud,
    subsections: [
      {
        title: "Cloud Infrastructure",
        features: ["Cloud Architecture Design", "Migration Services", "Multi-Cloud Strategy", "Disaster Recovery", "Cost Optimization", "Security & Compliance"]
      },
      {
        title: "DevOps & Automation",
        features: ["CI/CD Pipelines", "Infrastructure as Code", "Container Orchestration"]
      },
      {
        title: "Cloud Management",
        features: ["24/7 Monitoring", "Performance Tuning", "Backup Solutions"]
      }
    ]
  },
  {
    id: 5,
    title: "MOBILE APP DEVELOPMENT",
    subtitle: "Services",
    description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
    icon: Smartphone,
    subsections: [
      {
        title: "Native iOS Development",
        features: ["Swift/Objective-C", "SwiftUI", "App Store Submission", "iOS Design Guidelines", "Apple Watch Apps", "Performance Optimization"]
      },
      {
        title: "Native Android Development",
        features: ["Kotlin/Java", "Jetpack Compose", "Google Play Store", "Material Design", "Wear OS Apps", "Testing & QA"]
      },
      {
        title: "Cross-Platform Development",
        features: ["React Native", "Flutter", "Xamarin"]
      },
      {
        title: "App Maintenance",
        features: ["Updates & Bug Fixes", "Feature Enhancement", "Performance Monitoring"]
      }
    ]
  },
  {
    id: 6,
    title: "BRANDING & DESIGN",
    subtitle: "Services",
    description: "Strategic branding and visual identity that makes your business unforgettable.",
    icon: Palette,
    subsections: [
      {
        title: "Brand Strategy",
        features: ["Brand Research & Positioning", "Competitive Analysis", "Brand Architecture", "Messaging & Voice", "Brand Guidelines", "Launch Strategy"]
      },
      {
        title: "Visual Identity",
        features: ["Logo Design", "Color Systems", "Typography", "Brand Patterns", "Icon Libraries", "Style Guides"]
      },
      {
        title: "Brand Collateral",
        features: ["Business Cards", "Stationery", "Marketing Materials", "Packaging Design", "Environmental Graphics", "Digital Assets"]
      },
      {
        title: "Rebranding",
        features: ["Brand Audit", "Strategy Development", "Redesign", "Implementation", "Rollout Plan", "Training"]
      }
    ]
  },
  {
    id: 7,
    title: "GRAPHIC DESIGN",
    subtitle: "Services",
    description: "Creative visual solutions that communicate your message with impact and clarity.",
    icon: Palette,
    subsections: [
      {
        title: "Print Design",
        features: ["Brochures & Catalogs", "Posters & Flyers", "Magazine Layouts", "Packaging Design", "Trade Show Materials", "Annual Reports"]
      },
      {
        title: "Digital Design",
        features: ["Social Media Graphics", "Email Templates", "Web Graphics", "Digital Ads", "Infographics", "Presentation Design"]
      },
      {
        title: "Marketing Collateral",
        features: ["Sales Decks", "One-Pagers", "Case Studies"]
      },
      {
        title: "Custom Illustrations",
        features: ["Digital Illustration", "Character Design", "Icon Sets", "Editorial Illustration", "Product Illustration", "Concept Art"]
      }
    ]
  },
  {
    id: 8,
    title: "OFFLINE ADVERTISING",
    subtitle: "Services",
    description: "Traditional advertising channels that deliver tangible results and lasting brand impressions.",
    icon: Radio,
    subsections: [
      {
        title: "Print Advertising",
        features: ["Magazine Ads", "Newspaper Ads", "Brochures & Flyers", "Catalogs", "Direct Mail", "Trade Publications"]
      },
      {
        title: "Broadcast Advertising",
        features: ["TV Commercials", "Radio Spots", "Script Writing", "Production", "Media Buying", "Campaign Management"]
      },
      {
        title: "Event Marketing",
        features: ["Trade Shows", "Sponsorships", "Product Launches", "Experiential Marketing", "Event Branding", "Promotions"]
      },
      {
        title: "Guerrilla Marketing",
        features: ["Street Marketing", "Flash Mobs", "Stunts", "Ambient Advertising", "Viral Campaigns", "Creative Activations"]
      }
    ]
  },
  {
    id: 9,
    title: "ONLINE ADVERTISING",
    subtitle: "Services",
    description: "Data-driven digital advertising that reaches your audience where they spend time online.",
    icon: MousePointerClick,
    subsections: [
      {
        title: "Display Advertising",
        features: ["Banner Ads", "Responsive Ads", "Rich Media", "Programmatic Buying", "Retargeting", "Performance Tracking"]
      },
      {
        title: "Social Media Advertising",
        features: ["Facebook Ads", "Instagram Ads", "LinkedIn Ads"]
      },
      {
        title: "Video Advertising",
        features: ["YouTube Ads", "OTT/CTV Ads", "Pre-roll/Mid-roll"]
      },
      {
        title: "Native Advertising",
        features: ["Sponsored Articles", "Content Recommendation", "In-feed Ads"]
      }
    ]
  },
  {
    id: 10,
    title: "MEDIA & PR",
    subtitle: "Services",
    description: "Strategic public relations that elevate your brand reputation and secure valuable media coverage.",
    icon: Newspaper,
    subsections: [
      {
        title: "Public Relations Strategy",
        features: ["Media Strategy", "Press Release Writing", "Media Outreach", "Reputation Management", "Crisis Communication", "Thought Leadership"]
      },
      {
        title: "Media Relations",
        features: ["Media Database", "Journalist Outreach", "Press Briefings", "Media Training", "Interview Coordination", "Coverage Tracking"]
      },
      {
        title: "Content & Editorial",
        features: ["Articles & Op-eds", "Case Studies", "White Papers", "Executive Profiles", "Industry Reports", "Guest Contributions"]
      },
      {
        title: "Influencer Relations",
        features: ["Influencer Identification", "Partnership Management", "Campaign Coordination", "Content Collaboration", "Performance Tracking", "ROI Analysis"]
      }
    ]
  },
  {
    id: 11,
    title: "POLITICAL CAMPAIGNS",
    subtitle: "Services",
    description: "Comprehensive campaign management and strategy that wins elections and builds political movements.",
    icon: Vote,
    subsections: [
      {
        title: "Campaign Strategy & Planning",
        features: ["Electoral Strategy", "Voter Research", "Opposition Research", "Message Development", "Campaign Planning", "Field Operations"]
      },
      {
        title: "Digital Political Marketing",
        features: ["Social Media Campaigns", "Digital Advertising", "Email Outreach", "Grassroots Mobilization", "Online Fundraising", "Analytics & Tracking"]
      },
      {
        title: "Political Media & Communications",
        features: ["Press Relations", "Media Training", "Crisis Management", "Debate Preparation", "Speechwriting", "Rapid Response"]
      },
      {
        title: "Grassroots & Field Operations",
        features: ["Volunteer Management", "Door-to-Door Canvassing", "Phone Banking", "Voter Registration", "GOTV Operations", "Event Organization"]
      }
    ]
  },
  {
    id: 12,
    title: "ANIMATION & VIDEO",
    subtitle: "Services",
    description: "Captivating motion graphics and video content that tells your story in dynamic, engaging ways.",
    icon: Video,
    subsections: [
      {
        title: "2D Animation",
        features: ["Explainer Videos", "Motion Graphics", "Character Animation", "Whiteboard Animation", "Kinetic Typography", "Animated Logos"]
      },
      {
        title: "3D Animation & Modeling",
        features: ["Product Visualization", "Architectural Rendering", "Character Modeling", "Environment Design", "VFX & Compositing", "3D Motion Graphics"]
      },
      {
        title: "Video Production",
        features: ["Corporate Videos", "Commercials", "Documentary", "Event Coverage", "Training Videos", "Testimonials"]
      },
      {
        title: "Post-Production",
        features: ["Video Editing", "Color Grading", "Sound Design", "Visual Effects", "Motion Tracking", "Compositing"]
      }
    ]
  }
];

export function HorizontalServiceSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const accumulatedDelta = useRef<number>(0);
  const scrollDebounceTime = 350;
  const deltaResetTimeout = useRef<NodeJS.Timeout>();

  /**
   * SMART SCROLL HIJACKING SYSTEM
   * - Detects when slider section is in viewport
   * - Converts vertical scroll to horizontal ONLY when in viewport
   * - Allows exit by scrolling up at first slide
   * - Allows exit by scrolling down at last slide
   */

  // Detect when slider enters/exits viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '-50px 0px -50px 0px' // Add some margin for better UX
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Smart wheel event handler - hijacks scroll only when needed
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !containerRef.current || isTransitioning || !isInViewport) {
        return; // Allow normal vertical scroll
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      // Detect trackpad vs mouse wheel (trackpad has smaller delta)
      const isTrackpad = Math.abs(e.deltaY) < 50;
      const threshold = isTrackpad ? 80 : 20;

      // Reset accumulated delta after pause
      if (deltaResetTimeout.current) {
        clearTimeout(deltaResetTimeout.current);
      }
      
      deltaResetTimeout.current = setTimeout(() => {
        accumulatedDelta.current = 0;
      }, 150);

      // Accumulate delta
      if (isTrackpad) {
        accumulatedDelta.current += e.deltaY;
      } else {
        accumulatedDelta.current = e.deltaY;
      }

      // Debounce for snappy transitions
      if (timeSinceLastScroll < scrollDebounceTime) {
        e.preventDefault();
        return;
      }

      // FIRST SLIDE - Allow exit by scrolling up
      if (currentSlide === 0 && (accumulatedDelta.current < -threshold || e.deltaY < 0)) {
        // User wants to scroll up - allow vertical scroll (don't prevent)
        return;
      }

      // LAST SLIDE - Allow exit by scrolling down
      if (currentSlide === services.length - 1 && (accumulatedDelta.current > threshold || e.deltaY > 0)) {
        // User wants to scroll down - allow vertical scroll (don't prevent)
        return;
      }

      // MIDDLE SLIDES or moving through slider - hijack scroll
      e.preventDefault();

      // Check threshold and navigate
      if (Math.abs(accumulatedDelta.current) > threshold) {
        if (accumulatedDelta.current > 0 && currentSlide < services.length - 1) {
          // Scroll down = next slide
          lastScrollTime.current = now;
          accumulatedDelta.current = 0;
          scrollToSlide(currentSlide + 1);
        } else if (accumulatedDelta.current < 0 && currentSlide > 0) {
          // Scroll up = previous slide
          lastScrollTime.current = now;
          accumulatedDelta.current = 0;
          scrollToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (deltaResetTimeout.current) {
        clearTimeout(deltaResetTimeout.current);
      }
    };
  }, [currentSlide, isTransitioning, isInViewport]);

  // Track scroll position and snap to slides
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const slideWidth = container.offsetWidth;
        const newSlide = Math.round(scrollLeft / slideWidth);
        
        if (newSlide !== currentSlide) {
          setCurrentSlide(newSlide);
        }
        
        // Snap to nearest slide
        container.scrollTo({
          left: slideWidth * newSlide,
          behavior: 'smooth'
        });
      }, 50);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentSlide]);

  const scrollToSlide = (index: number) => {
    if (containerRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const slideWidth = containerRef.current.offsetWidth;
      
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            left: slideWidth * index,
            behavior: 'smooth'
          });
        }
      });

      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(index);
      }, 400);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < services.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  return (
    <div className="w-full">
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-hidden py-8 sm:py-12 md:py-16"
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
      }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-black/3 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-black/3 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Floating dots decoration */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-40 animate-gentle-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-30 animate-gentle-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-25 animate-gentle-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Section Header */}
      <motion.div 
        className="container-award mb-6 sm:mb-8 md:mb-10 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-3 sm:mb-4"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-black flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="subheading text-[0.75rem] sm:text-[0.813rem] md:text-[0.875rem]">Our Services</span>
          </motion.div>
          
          <h2 className="heading-xl mb-3 sm:mb-4">
            Complete Digital Solutions
          </h2>
          <p className="body-lg max-w-2xl mx-auto mb-4 sm:mb-6">
            Explore our comprehensive range of services designed to transform your business
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 sm:w-10 md:w-12 bg-black' 
                    : 'w-1 bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Horizontal Slider Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[calc(100vh-16rem)] sm:h-[calc(100vh-18rem)] overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div 
          className="flex h-full"
          style={{ 
            width: `${services.length * 100}%`,
            willChange: 'transform'
          }}
        >
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            
            return (
              <div
                key={service.id}
                className="flex-shrink-0 h-full px-2 sm:px-3"
                style={{ 
                  width: `${100 / services.length}%`,
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always'
                }}
              >
                <div className="glass-shine h-full w-full rounded-[10px] overflow-hidden shadow-award-lg relative">
                  <div className="w-full h-full flex flex-col justify-between px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                    
                    {/* Enhanced Header with Quick Stats - More Compact */}
                    <motion.div 
                      className="text-center flex-shrink-0 mb-1.5 sm:mb-2 md:mb-3"
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: currentSlide === index ? 1 : 0.3, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                    >
                      {/* Inline Badge + Icon + Title for Mobile */}
                      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 mb-1">
                        {/* Enhanced Badge with Pulse */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3 }}
                          className="relative inline-flex items-center gap-1 glass-strong px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-[10px]"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-[10px] bg-black/5"
                          />
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center shadow-sm shadow-black/20 relative z-10">
                            <span className="font-antonio font-bold text-white text-[0.563rem] sm:text-[0.625rem]">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                        </motion.div>

                        {/* Enhanced Icon - Smaller */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1,
                            type: "spring",
                            stiffness: 180,
                            damping: 12
                          }}
                          className="icon-container-glass w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 p-1 sm:p-1.5 hover:shadow-lg hover:shadow-black/20"
                          whileHover={{ scale: 1.15 }}
                        >
                          <ServiceIcon className="w-full h-full text-black icon-animated" strokeWidth={2.5} />
                        </motion.div>

                        {/* Quick Stats Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="hidden md:inline-flex items-center gap-1 glass-subtle px-2 py-0.5 rounded-[10px]"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-black" strokeWidth={2.5} />
                          <span className="font-raleway text-[0.625rem] font-semibold text-black">
                            {service.subsections.length} Services
                          </span>
                        </motion.div>
                      </div>

                      {/* Enhanced Title - More Compact */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="relative inline-block"
                      >
                        <h2 className="font-antonio font-bold text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] mb-0.5 sm:mb-1 text-black leading-tight">
                          {service.title}
                        </h2>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="h-0.5 bg-gradient-to-r from-transparent via-black to-transparent origin-center"
                        />
                      </motion.div>

                      {/* Enhanced Description - Hidden on small screens to save space */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="hidden lg:block"
                      >
                        <p className="font-raleway text-[0.688rem] max-w-2xl mx-auto text-gray-600 leading-snug mb-1">
                          {service.description}
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Grid with Interactive Cards - NO OVERFLOW */}
                    <div 
                      className="flex-1 flex items-center justify-center w-full min-h-0"
                      style={{ 
                        contain: 'layout style paint',
                        willChange: 'transform'
                      }}
                    >
                      <div className="w-full h-full flex items-center">
                        <div 
                          className={`
                            grid gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 w-full
                            ${service.subsections.length <= 3 
                              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                              : service.subsections.length <= 4
                              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                              : service.subsections.length <= 6
                              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                            }
                            auto-rows-fr
                          `}
                          style={{
                            maxHeight: '100%'
                          }}
                        >
                          {service.subsections.map((subsection, subIndex) => (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, y: 15, scale: 0.97 }}
                              whileInView={{ opacity: 1, y: 0, scale: 1 }}
                              viewport={{ once: true, margin: "-20px" }}
                              transition={{ 
                                duration: 0.3, 
                                delay: 0.25 + subIndex * 0.02,
                                type: "spring",
                                stiffness: 100
                              }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              className="glass-strong p-2 sm:p-2.5 md:p-3 rounded-[10px] flex flex-col h-full group cursor-pointer border border-transparent hover:border-black/20 transition-all duration-300 relative overflow-hidden"
                              style={{
                                willChange: 'transform',
                                transform: 'translate3d(0, 0, 0)'
                              }}
                            >
                              {/* Hover Glow Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                              />

                              {/* Card Header with Count Badge */}
                              <div className="flex items-start justify-between mb-1 sm:mb-1.5 relative z-10 flex-shrink-0">
                                <h3 className="font-antonio font-semibold text-[0.75rem] sm:text-[0.813rem] md:text-[0.875rem] flex items-center gap-0.5 sm:gap-1 text-black leading-tight flex-1">
                                  <motion.span 
                                    className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-black flex-shrink-0"
                                    whileHover={{ scale: 2 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                  <span className="line-clamp-1">{subsection.title}</span>
                                </h3>
                                {/* Feature Count Badge */}
                                <span className="flex-shrink-0 px-1 py-0.5 glass-subtle rounded-[6px] font-antonio text-[0.563rem] font-bold text-black ml-1">
                                  {subsection.features.length}
                                </span>
                              </div>

                              {/* Enhanced Features List - Compact with max 3 items visible */}
                              <div className="space-y-0.5 sm:space-y-1 flex-1 relative z-10 min-h-0">
                                {subsection.features.slice(0, 3).map((feature, featureIndex) => (
                                  <motion.div
                                    key={featureIndex}
                                    className="flex items-start gap-0.5 sm:gap-1"
                                    initial={{ opacity: 0, x: -5 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: featureIndex * 0.05 }}
                                  >
                                    <motion.div 
                                      className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/10 flex items-center justify-center mt-0.5 group-hover:bg-black/25 transition-colors duration-250"
                                      whileHover={{ scale: 1.2 }}
                                    >
                                      <CheckCircle2 className="w-1 h-1 sm:w-1.5 sm:h-1.5 text-black" strokeWidth={3} />
                                    </motion.div>
                                    <span className="font-raleway text-[0.563rem] sm:text-[0.625rem] md:text-[0.688rem] text-gray-600 flex-1 leading-tight line-clamp-2">
                                      {feature}
                                    </span>
                                  </motion.div>
                                ))}
                                {subsection.features.length > 3 && (
                                  <div className="flex items-center gap-1 pt-0.5">
                                    <span className="font-raleway text-[0.563rem] sm:text-[0.625rem] text-gray-400 italic">
                                      +{subsection.features.length - 3} more
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Card Footer with Quick Action - Compact */}
                              <div className="pt-1 sm:pt-1.5 border-t border-gray-200/40 relative z-10 flex-shrink-0 mt-1">
                                <motion.button
                                  className="w-full flex items-center justify-between group/btn px-1.5 py-1 rounded-[8px] hover:bg-black/5 transition-colors duration-200"
                                  whileHover={{ x: 2 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="font-raleway text-[0.563rem] sm:text-[0.625rem] font-semibold text-black">
                                    Learn More
                                  </span>
                                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-black group-hover/btn:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                </motion.button>
                              </div>

                              {/* Premium Indicator - Top Right */}
                              <motion.div
                                className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                              >
                                <Sparkles className="w-2.5 h-2.5 text-black/30" strokeWidth={2} />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Multi-CTA Section - More Compact */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="flex-shrink-0 pt-1.5 sm:pt-2 md:pt-3"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2">
                        {/* Primary CTA - Smaller */}
                        <motion.button 
                          className="btn-award group/cta px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-[0.688rem] sm:text-[0.75rem] md:text-[0.813rem] w-full sm:w-auto"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ touchAction: 'manipulation' }}
                        >
                          <span>Get Started Now</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                          </motion.div>
                        </motion.button>

                        {/* Secondary CTAs - Smaller */}
                        <div className="flex items-center gap-1.5 w-full sm:w-auto">
                          <motion.button
                            className="btn-outline-award px-2.5 sm:px-3 py-1.5 sm:py-2 text-[0.625rem] sm:text-[0.688rem] md:text-[0.75rem] flex-1 sm:flex-initial"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="hidden sm:inline">View Pricing</span>
                            <span className="sm:hidden">Pricing</span>
                          </motion.button>

                          <motion.button
                            className="glass-strong px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-[10px] text-[0.625rem] sm:text-[0.688rem] md:text-[0.75rem] font-raleway font-semibold text-black hover:bg-black/5 transition-colors flex-1 sm:flex-initial border border-black/10"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span className="hidden sm:inline">Portfolio</span>
                            <span className="sm:hidden">Work</span>
                          </motion.button>
                        </div>
                      </div>

                      {/* Trust Indicators - Smaller and hidden on mobile */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="hidden lg:flex items-center justify-center gap-3 mt-1.5"
                      >
                        <div className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-2 h-2 text-black" strokeWidth={2.5} />
                          <span className="font-raleway text-[0.563rem] text-gray-500">100+ Projects</span>
                        </div>
                        <div className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-2 h-2 text-black" strokeWidth={2.5} />
                          <span className="font-raleway text-[0.563rem] text-gray-500">5-Star Rated</span>
                        </div>
                        <div className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                        <div className="flex items-center gap-0.5">
                          <CheckCircle2 className="w-2 h-2 text-black" strokeWidth={2.5} />
                          <span className="font-raleway text-[0.563rem] text-gray-500">Money-Back Guarantee</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <div className="hidden md:block">
        <motion.button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className={`absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-strong flex items-center justify-center shadow-award-md transition-all duration-300 ${
            currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-award-lg'
          }`}
          whileHover={currentSlide > 0 ? { scale: 1.1 } : {}}
          whileTap={currentSlide > 0 ? { scale: 0.95 } : {}}
        >
          <ArrowLeft className="w-5 h-5 text-black" strokeWidth={2.5} />
        </motion.button>

        <motion.button
          onClick={handleNextSlide}
          disabled={currentSlide === services.length - 1}
          className={`absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-strong flex items-center justify-center shadow-award-md transition-all duration-300 ${
            currentSlide === services.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 hover:shadow-award-lg'
          }`}
          whileHover={currentSlide < services.length - 1 ? { scale: 1.1 } : {}}
          whileTap={currentSlide < services.length - 1 ? { scale: 0.95 } : {}}
        >
          <ArrowRight className="w-5 h-5 text-black" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Scroll Hint - Show only on first slide */}
      {currentSlide === 0 && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="body-xs text-gray-400">Scroll to explore</span>
            <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" strokeWidth={2} />
          </motion.div>
        </motion.div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-thin-green::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin-green::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .scrollbar-thin-green::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          backdrop-filter: blur(8px);
        }
        .scrollbar-thin-green::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        .scrollbar-thin-green {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.05);
        }

        /* Smooth scroll behavior */
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
    </div>
  );
}
