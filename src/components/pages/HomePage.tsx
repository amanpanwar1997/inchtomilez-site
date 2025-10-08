import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  TrendingUp, Target, Zap, Award, Users, Rocket, CheckCircle2, ArrowRight, 
  Globe, Megaphone, Palette, Code, PenTool, Radio, Search,
  Mail, MapPin, Trophy, Briefcase, Lightbulb, Clock, Shield,
  Smartphone, Cloud, Monitor, Layers, Package, Cpu, Database,
  BarChart3, Speaker, Newspaper, Vote, Eye, MessageSquare,
  ShoppingCart, TrendingDown, Settings, Lock, Zap as Lightning,
  Play, Film, Clapperboard, Camera, Video, Sparkles, Star,
  BarChart2, LineChart, PieChart, Activity, Repeat, Share2
} from 'lucide-react';

// Import NEW trending components
import { ImageAccordion } from '../ImageAccordion';
import { MasonryGrid } from '../MasonryGrid';
import { BentoGrid } from '../BentoGrid';
import { IconBoxGrid } from '../IconBoxGrid';
import { AnimatedTabs } from '../AnimatedTabs';
import { AnimatedStats } from '../AnimatedStats';

// Import existing components
import { AnimatedIcon } from '../AnimatedIcon';
import { ProgressBar, CircularProgress } from '../ProgressBar';
import { InfographicStat, TimelineItem, ComparisonBar } from '../Infographic';
import { ModernServiceSection } from '../ModernServiceSection';
import { HorizontalServiceSlider } from '../HorizontalServiceSlider';
import { SEOHead } from '../SEOHead';
import { StructuredData, createOrganizationSchema, createLocalBusinessSchema } from '../StructuredData';
import {
  IndustriesSection,
  GMBSection,
  WebsitesSection,
  CampaignsSection,
  TestimonialsSection,
  ExpertiseSection,
  TeamSection,
  RecruitmentSection,
  FAQSectionWrapper,
  ContactSection
} from './HomePageSections';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <SEOHead
        title="InchToMilez - World-Class Digital Marketing & Advertising Agency | Cinematic Brand Storytelling"
        description="Experience award-winning brand narratives through our integrated ATL, BTL & TTL campaigns. Master storytellers crafting visual symphonies for iconic brands. 30+ years of advertising excellence."
        keywords="creative advertising agency, brand storytelling, ATL BTL TTL campaigns, integrated marketing communication, cinematic brand films, visual storytelling, advertising strategy indore, creative direction, campaign architecture"
        canonical="https://inchtomilez.com"
      />

      {/* Structured Data */}
      <StructuredData schema={createOrganizationSchema()} />
      <StructuredData schema={createLocalBusinessSchema()} />

      {/* ===== NEW CINEMATIC HERO ===== */}
      <CinematicHeroSection onNavigate={onNavigate} />
      
      {/* ===== BRAND MANIFESTO WITH STATS ===== */}
      <BrandManifestoSection />
      
      {/* ===== SERVICES OVERVIEW ===== */}
      <ServicesOverviewSection onNavigate={onNavigate} />
      
      {/* ===== IMAGE ACCORDION SERVICES ===== */}
      <ImageAccordionServicesSection />
      
      {/* ===== ADVERTISING PHILOSOPHY ===== */}
      <AdvertisingPhilosophySection />
      
      {/* ===== HORIZONTAL SERVICE SLIDER ===== */}
      <HorizontalServiceSlider />
      
      {/* ===== OLD PROVEN SECTIONS ===== */}
      <WorkProcessSection />
      <IndustriesSection />
      <GMBSection />
      <WebsitesSection />
      <CampaignsSection />
      <TestimonialsSection />
      <ExpertiseSection />
      <TeamSection />
      <RecruitmentSection />
      <FAQSectionWrapper />
      <ContactSection />
    </div>
  );
}

// ============================================
// NEW WORLD-CLASS SECTIONS
// ============================================

// 1. CINEMATIC HERO SECTION
function CinematicHeroSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [currentTagline, setCurrentTagline] = useState(0);
  
  const taglines = [
    "WHERE BRANDS BECOME LEGENDS",
    "CRAFTING VISUAL SYMPHONIES",
    "YOUR STORY, OUR MISE-EN-SCÈNE",
    "ADVERTISING AS AN ART FORM",
    "FROM CONCEPT TO CONVERSION"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container-award relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Award Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="badge-glass px-6 py-3">
              <Sparkles className="w-4 h-4 text-black" strokeWidth={2} />
              <span className="font-antonio font-bold text-sm">30+ YEARS OF CREATIVE EXCELLENCE</span>
              <Award className="w-4 h-4 text-black" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-xl mb-6">
              InchToMilez
            </h1>
            <div className="h-16 flex items-center justify-center">
              <motion.p
                key={currentTagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="font-antonio font-semibold text-2xl md:text-3xl text-gray-700"
              >
                {taglines[currentTagline]}
              </motion.p>
            </div>
          </motion.div>

          {/* Subtitle with Advertising Terminology */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-lg max-w-3xl mx-auto leading-relaxed"
          >
            Master storytellers architecting <strong className="text-black font-semibold">integrated campaigns</strong> across 
            ATL, BTL & TTL touchpoints. From <strong className="text-black font-semibold">brand positioning matrices</strong> to 
            conversion-optimized <strong className="text-black font-semibold">sales funnels</strong> — we orchestrate every frame 
            of your brand's cinematic journey.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-award btn-lg-award group"
            >
              <Clapperboard className="w-5 h-5" strokeWidth={2} />
              <span>Start Your Campaign</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
            
            <button 
              onClick={() => onNavigate('portfolio')}
              className="btn-outline-award btn-lg-award group"
            >
              <Film className="w-5 h-5" strokeWidth={2} />
              <span>View Our Reel</span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-12"
          >
            <div className="flex flex-col items-center gap-2 text-muted">
              <span className="body-xs font-semibold uppercase tracking-wider">Explore The Narrative</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 2. BRAND MANIFESTO SECTION
function BrandManifestoSection() {
  const stats = [
    { id: '1', value: 500, suffix: '+', label: 'Campaigns Delivered', icon: Trophy, description: 'Award-winning campaigns' },
    { id: '2', value: 30, suffix: '+', label: 'Years of Excellence', icon: Award, description: 'Industry leadership' },
    { id: '3', value: 95, suffix: '%', label: 'Client Retention', icon: Users, description: 'Long-term partnerships' },
    { id: '4', value: 250, suffix: '+', label: 'Brands Transformed', icon: Rocket, description: 'Success stories' },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Star className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">THE INCHTOMILEZ DIFFERENCE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-lg mb-4"
          >
            MASTERS OF BRAND STORYTELLING
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Like master cinematographers crafting each frame with precision, we orchestrate 
            <strong className="text-black font-semibold"> brand narratives</strong> that resonate across 
            every touchpoint. Our <strong className="text-black font-semibold">mise-en-scène approach</strong> transforms 
            brands into cultural phenomena.
          </motion.p>
        </div>

        {/* Animated Stats Grid */}
        <AnimatedStats stats={stats} layout="grid" />
      </div>
    </section>
  );
}

// 3. ADVERTISING PHILOSOPHY SECTION
function AdvertisingPhilosophySection() {
  const bentoItems = [
    {
      id: '1',
      title: 'Brand Positioning Matrix',
      description: 'Strategic frameworks defining your unique market position, competitive differentiation, and target audience psychographics.',
      icon: Target,
      size: 'large' as const,
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
    },
    {
      id: '2',
      title: 'AIDA Framework',
      description: 'Attention → Interest → Desire → Action. Engineering each touchpoint for maximum conversion impact.',
      icon: TrendingUp,
      size: 'medium' as const,
    },
    {
      id: '3',
      title: 'Visual Storytelling',
      description: 'Cinematic narratives that transcend traditional advertising.',
      icon: Film,
      size: 'small' as const,
    },
    {
      id: '4',
      title: 'Consumer Psychology',
      description: 'Behavioral insights driving persuasive creative.',
      icon: Eye,
      size: 'small' as const,
    },
    {
      id: '5',
      title: 'Media Mix Optimization',
      description: 'Data-driven channel allocation maximizing reach, frequency, and GRP across ATL/BTL/TTL mediums.',
      icon: BarChart3,
      size: 'wide' as const,
    },
    {
      id: '6',
      title: 'Call-to-Action Engineering',
      description: 'Precision-crafted CTAs driving measurable conversion lift.',
      icon: Zap,
      size: 'medium' as const,
    },
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Lightbulb className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR METHODOLOGY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            ADVERTISING PHILOSOPHY
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Rooted in classical advertising theory, enhanced by modern data science, 
            perfected through three decades of creative excellence.
          </motion.p>
        </div>

        <BentoGrid items={bentoItems} />
      </div>
    </section>
  );
}

// 4. IMAGE ACCORDION SERVICES SECTION
function ImageAccordionServicesSection() {
  const accordionItems = [
    {
      id: '1',
      title: 'ATL Campaigns',
      subtitle: 'Above The Line',
      description: 'Mass media mastery across TV, Radio, Print, OOH & Cinema. Building brand awareness at scale with high-impact creative that cuts through the clutter.',
      image: 'https://images.unsplash.com/photo-1560523282-916f7dd28896?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      icon: Radio,
      stats: 'Reach: 10M+ per campaign',
    },
    {
      id: '2',
      title: 'BTL Activation',
      subtitle: 'Below The Line',
      description: 'Direct response marketing through Experiential Events, Direct Mail, Point-of-Sale, and Targeted Digital. Measurable engagement, trackable ROI.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      icon: Target,
      stats: 'Conversion Rate: 4.2%',
    },
    {
      id: '3',
      title: 'TTL Integration',
      subtitle: 'Through The Line',
      description: 'Seamless integration of mass media and direct response. Omnichannel narratives that amplify reach while driving measurable action. The future of advertising.',
      image: 'https://images.unsplash.com/photo-1532617074212-c503101ae0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      icon: Layers,
      stats: 'Integrated Reach + Action',
    },
    {
      id: '4',
      title: 'Brand Films',
      subtitle: 'Cinematic Storytelling',
      description: 'Emotion-driven visual narratives inspired by parallel cinema. Every frame composed with purpose, every edit serving the story arc. Advertising as art.',
      image: 'https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      icon: Film,
      stats: '95% Brand Recall',
    },
    {
      id: '5',
      title: 'Digital Ecosystem',
      subtitle: 'Full-Funnel Growth',
      description: 'SEO, SEM, Social, Programmatic, Influencer & Content Marketing. Data-driven performance marketing with creative that converts. Technology meets artistry.',
      image: 'https://images.unsplash.com/photo-1676276375742-9e3d10e39d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      icon: Globe,
      stats: '8X Average ROI',
    },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Megaphone className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR SERVICES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            INTEGRATED CAMPAIGN ARCHITECTURE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            From <strong className="text-black font-semibold">Above The Line</strong> mass awareness to{' '}
            <strong className="text-black font-semibold">Below The Line</strong> targeted activation, 
            perfected through <strong className="text-black font-semibold">Through The Line</strong> integration.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageAccordion items={accordionItems} />
        </motion.div>
      </div>
    </section>
  );
}

// 5. SERVICES OVERVIEW SECTION (OLD CONTENT - RESTORED)
function ServicesOverviewSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const services = [
    {
      icon: Megaphone,
      title: 'Advertising',
      description: 'Strategic campaigns that capture attention, build awareness, and drive action across all channels.',
      page: 'advertising'
    },
    {
      icon: Palette,
      title: 'Branding',
      description: 'Complete brand identity systems that tell your story and create lasting emotional connections.',
      page: 'branding'
    },
    {
      icon: PenTool,
      title: 'Graphic Design',
      description: 'Visual excellence that communicates your message with clarity, creativity, and impact.',
      page: 'graphic-design'
    },
    {
      icon: Film,
      title: 'Animation',
      description: 'Motion graphics and animated content that brings your brand to life with dynamic storytelling.',
      page: 'animation'
    },
    {
      icon: MessageSquare,
      title: 'Public Relations',
      description: 'Strategic PR that builds reputation, manages perception, and amplifies your brand voice.',
      page: 'public-relations'
    },
    {
      icon: Code,
      title: 'Website Development',
      description: 'Custom websites and web applications built for performance, conversion, and user experience.',
      page: 'website-development'
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Data-driven SEO strategies that improve rankings, increase organic traffic, and drive qualified leads.',
      page: 'services'
    }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Star className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR EXPERTISE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            COMPREHENSIVE DIGITAL SOLUTIONS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            From strategic advertising to cutting-edge web development, we deliver 
            end-to-end solutions that transform businesses and drive measurable growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onNavigate(service.page)}
                className="glass-card card-compact-lg hover-lift-award cursor-pointer group"
              >
                <div className="icon-container-glass w-14 h-14 p-3 mb-4">
                  <Icon className="w-full h-full text-black" strokeWidth={2} />
                </div>

                <h3 className="heading-sm text-base mb-3">{service.title}</h3>
                <p className="body-sm text-muted leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 6. WORK PROCESS SECTION (OLD CONTENT - RESTORED)
function WorkProcessSection() {
  const processes = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'Deep dive into your business, goals, target audience, and competitive landscape to create a winning roadmap.',
      icon: Target
    },
    {
      number: '02',
      title: 'Creative Development',
      description: 'Our team crafts compelling campaigns, designs, and content that capture attention and drive engagement.',
      icon: Palette
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Seamless execution across all channels with rigorous quality control and attention to detail.',
      icon: Rocket
    },
    {
      number: '04',
      title: 'Optimize & Scale',
      description: 'Continuous monitoring, testing, and refinement to maximize ROI and fuel sustainable growth.',
      icon: TrendingUp
    }
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4"
          >
            <Lightbulb className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR PROCESS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4"
          >
            HOW WE WORK
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            A proven methodology that transforms vision into measurable results through strategic 
            planning, creative excellence, and data-driven optimization.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processes.map((process, index) => {
            const Icon = process.icon;
            
            return (
              <motion.div
                key={process.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card card-compact-lg text-center group hover-lift-award"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-black text-white">
                  <span className="font-antonio font-bold text-xl">{process.number}</span>
                </div>

                <div className="icon-container-glass w-14 h-14 p-3 mb-4 mx-auto">
                  <Icon className="w-full h-full text-black" strokeWidth={2} />
                </div>

                <h3 className="heading-sm text-base mb-3">{process.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// OLD SECTIONS (keeping for reference)
// 1. HERO SECTION
function HeroSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-award relative z-10 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="badge-glass">
              <motion.div 
                className="w-2 h-2 rounded-full bg-black"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="subheading text-xs">DIGITAL MARKETING EXCELLENCE</span>
            </div>
          </motion.div>

          {/* Main Headline - SEO Optimized */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl"
          >
            INDORE'S AWARD-WINNING<br />
            DIGITAL MARKETING AGENCY<br />
            TRANSFORMING BUSINESSES SINCE 1995
          </motion.h1>

          {/* Sub-headline - SEO Rich */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Expert <strong>SEO services</strong>, <strong>website development</strong>, <strong>branding</strong>, and comprehensive digital solutions that drive real results. 
            With <strong>30+ years of excellence</strong> and <strong>500+ successful projects</strong>, we're Indore's most trusted digital partner for businesses ready to dominate their market.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('contact')}
              className="btn-award group"
            >
              START YOUR TRANSFORMATION
              <ArrowRight className="w-4 h-4 icon-animated group-hover:translate-x-1" />
            </button>

            <button className="btn-outline-award">
              VIEW SUCCESS STORIES
            </button>
          </motion.div>

          {/* Stats Grid - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { value: '10X', label: 'AVG ROI', icon: TrendingUp },
              { value: '48HR', label: 'QUICK DELIVERY', icon: Clock },
              { value: '500+', label: 'BRANDS ELEVATED', icon: Trophy },
              { value: '2M+', label: 'ENGAGEMENT', icon: Users }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="glass-card card-compact text-center hover-lift-award"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="icon-container-glass w-10 h-10 mx-auto mb-2 p-2.5 flex items-center justify-center">
                  <stat.icon className="w-full h-full text-black icon-animated icon-float" strokeWidth={2} />
                </div>
                <div className="heading-md text-xl mb-1">{stat.value}</div>
                <div className="body-xs">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// 2. TICKER STRIP
function TickerStrip() {
  const items = [
    '10X AVERAGE ROI',
    '48-HOUR ASSET TURNAROUND',
    '500+ BRANDS TRANSFORMED',
    '2M+ ENGAGEMENT ACHIEVED',
    'AWARD-WINNING CREATIVE EXCELLENCE'
  ];

  return (
    <div className="bg-black text-white py-3 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="inline-flex items-center px-6">
            <span className="heading-sm text-sm uppercase">{item}</span>
            <div className="w-1 h-1 mx-4 rounded-full bg-black" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// 3. ABOUT US SECTION - COMPACT
function AboutSection() {
  return (
    <section className="section-compact-md bg-gradient-to-b from-white to-gray-50">
      <div className="container-award">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-lg mb-4">
              WE DON'T JUST DO MARKETING.<br />
              WE CREATE EXPERIENCES.<br />
              WE BUILD LEGACIES.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="body-md"
          >
            Welcome to a new era of digital marketing. For three decades, we've been perfecting 
            the art and science of brand transformation. We dive deep into data, psychology, 
            and creative innovation to deliver <strong>measurable, explosive growth</strong>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-md"
          >
            We pioneer the marketing strategies that become industry standards. We're not just 
            a service provider; we're your <strong>strategic growth partner</strong> committed 
            to turning your vision into undeniable market success.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// 6. DIGITAL MARKETING SECTION
function DigitalMarketingSection() {
  const services = [
    {
      id: 'seo',
      title: 'SEO Optimization',
      icon: Search,
      description: 'Dominate search rankings with our data-driven SEO strategies that ensure maximum visibility and sustainable organic traffic growth.',
      features: ['Keyword Research & Strategy', 'On-Page Optimization', 'Technical SEO Audits', 'Link Building Campaigns', 'Local SEO Excellence', 'Performance Tracking']
    },
    {
      id: 'ppc',
      title: 'PPC Advertising',
      icon: Target,
      description: 'Maximize ROI with precision-targeted campaigns where every click is optimized for conversion and measurable results.',
      features: ['Google Ads Management', 'Social Media Ads', 'Display & Remarketing', 'Campaign Strategy', 'A/B Testing', 'Conversion Optimization']
    },
    {
      id: 'smm',
      title: 'Social Media Marketing',
      icon: MessageSquare,
      description: 'Build engaged communities and amplify your brand voice across all social platforms with content that resonates.',
      features: ['Content Strategy', 'Community Management', 'Influencer Partnerships', 'Social Advertising', 'Analytics & Insights', 'Reputation Management']
    },
    {
      id: 'smo',
      title: 'Social Media Optimization',
      icon: TrendingUp,
      description: 'Optimize your social presence for maximum engagement and reach by fine-tuning every element for peak performance.',
      features: ['Profile Optimization', 'Content Calendar', 'Hashtag Strategy', 'Engagement Boost', 'Cross-Platform Integration', 'Performance Analytics']
    },
    {
      id: 'organic-growth',
      title: 'Organic Growth',
      icon: Rocket,
      description: 'Achieve sustainable growth through authentic engagement and valuable content that builds long-term success.',
      features: ['Content Marketing', 'SEO-Driven Strategy', 'Community Building', 'Email Marketing', 'Referral Programs', 'Brand Partnerships']
    },
    {
      id: 'organic-ranking',
      title: 'Organic Ranking',
      icon: BarChart3,
      description: 'Climb to the top of search results naturally with proven methodologies that ensure lasting rankings.',
      features: ['SERP Analysis', 'Competitor Research', 'Content Optimization', 'Authority Building', 'UX Enhancement', 'Ranking Monitoring']
    }
  ];

  return (
    <ModernServiceSection
      badge="DIGITAL MARKETING"
      badgeIcon={Search}
      title="DIGITAL MARKETING SERVICES"
      description="Comprehensive digital marketing solutions designed to elevate your online presence and drive measurable growth."
      services={services}
      bgStyle="white"
      layout="featured"
    />
  );
}

// 7. WEBSITE DEVELOPMENT SECTION
function WebsiteDevelopmentSection() {
  const services = [
    {
      id: 'corporate',
      title: 'Corporate Websites',
      icon: Briefcase,
      description: 'Professional, high-performance websites that establish credibility and drive business growth.',
      features: ['Custom Design', 'Mobile Responsive', 'CMS Integration', 'SEO Optimized', 'Fast Loading', 'Security Enhanced']
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      icon: ShoppingCart,
      description: 'Powerful online stores built to convert visitors into customers and scale with your business.',
      features: ['Payment Integration', 'Inventory Management', 'Shopping Cart', 'Product Catalog', 'Order Tracking', 'Analytics Dashboard']
    },
    {
      id: 'landing',
      title: 'Landing Pages',
      icon: Target,
      description: 'High-converting landing pages designed with a single goal: turn visitors into leads and customers.',
      features: ['Conversion Focused', 'A/B Testing Ready', 'Fast Load Times', 'Form Integration', 'Analytics Tracking', 'Mobile Optimized']
    },
    {
      id: 'web-apps',
      title: 'Web Applications',
      icon: Layers,
      description: 'Custom web applications that streamline operations and deliver exceptional user experiences.',
      features: ['Custom Functionality', 'Database Integration', 'API Development', 'User Authentication', 'Real-time Features', 'Scalable Architecture']
    }
  ];

  return (
    <ModernServiceSection
      badge="WEBSITE DEVELOPMENT"
      badgeIcon={Code}
      title="WEBSITE DEVELOPMENT SERVICES"
      description="Beautiful, fast, and secure websites that deliver exceptional user experiences and drive conversions."
      services={services}
      bgStyle="gradient"
      layout="grid"
    />
  );
}

// 8. SOFTWARE DEVELOPMENT SECTION
function SoftwareDevelopmentSection() {
  const services = [
    {
      id: 'custom',
      title: 'Custom Software Development',
      icon: Code,
      description: 'Tailored software solutions that perfectly fit your unique business requirements and workflows.',
      features: ['Requirements Analysis', 'Custom Architecture', 'Agile Development', 'Quality Assurance', 'Deployment & Support', 'Ongoing Maintenance']
    },
    {
      id: 'enterprise',
      title: 'Enterprise Solutions',
      icon: Briefcase,
      description: 'Scalable enterprise-grade software that grows with your organization and handles complex operations.',
      features: ['ERP Systems', 'CRM Solutions', 'Workflow Automation', 'Integration Services', 'Data Management', 'Security & Compliance']
    },
    {
      id: 'saas',
      title: 'SaaS Development',
      icon: Cloud,
      description: 'Build powerful Software-as-a-Service platforms that deliver value to customers worldwide.',
      features: ['Multi-tenant Architecture', 'Subscription Management', 'API Development', 'Cloud Infrastructure', 'Auto-scaling', 'Analytics & Reporting']
    },
    {
      id: 'integration',
      title: 'System Integration',
      icon: Layers,
      description: 'Seamlessly connect your existing systems and tools for unified, efficient operations.',
      features: ['API Integration', 'Data Synchronization', 'Third-party Services', 'Legacy System Updates', 'Workflow Automation', 'Real-time Processing']
    }
  ];

  return (
    <ModernServiceSection
      badge="SOFTWARE DEVELOPMENT"
      badgeIcon={Cpu}
      title="SOFTWARE DEVELOPMENT SERVICES"
      description="Custom software solutions engineered for performance, scalability, and business growth."
      services={services}
      bgStyle="white"
      layout="alternating"
    />
  );
}

// 9. CLOUD ARCHITECTURE SECTION
function CloudArchitectureSection() {
  const services = [
    {
      id: 'migration',
      title: 'Cloud Migration',
      icon: Cloud,
      description: 'Seamlessly migrate your infrastructure to the cloud with zero downtime and maximum efficiency.',
      features: ['Migration Strategy', 'Data Transfer', 'Application Replatforming', 'Testing & Validation', 'Performance Optimization', 'Post-migration Support']
    },
    {
      id: 'infrastructure',
      title: 'Cloud Infrastructure',
      icon: Database,
      description: 'Design and implement robust cloud infrastructure that scales with your business needs.',
      features: ['AWS/Azure/GCP Setup', 'Auto-scaling', 'Load Balancing', 'Disaster Recovery', 'Backup Solutions', '24/7 Monitoring']
    },
    {
      id: 'security',
      title: 'Cloud Security',
      icon: Shield,
      description: 'Protect your cloud assets with enterprise-grade security measures and compliance standards.',
      features: ['Security Audits', 'Access Management', 'Encryption', 'Compliance (GDPR, HIPAA)', 'Threat Detection', 'Incident Response']
    },
    {
      id: 'optimization',
      title: 'Cloud Optimization',
      icon: Settings,
      description: 'Maximize performance while minimizing costs through intelligent cloud resource optimization.',
      features: ['Cost Analysis', 'Resource Allocation', 'Performance Tuning', 'Serverless Architecture', 'Container Optimization', 'ROI Improvement']
    }
  ];

  return (
    <ModernServiceSection
      badge="CLOUD ARCHITECTURE"
      badgeIcon={Cloud}
      title="CLOUD ARCHITECTURE SERVICES"
      description="Enterprise-grade cloud solutions that deliver scalability, security, and performance excellence."
      services={services}
      bgStyle="gradient"
      layout="grid"
    />
  );
}

// 10. APPLICATION DEVELOPMENT SECTION
function ApplicationDevelopmentSection() {
  const services = [
    {
      id: 'mobile',
      title: 'Mobile Applications',
      icon: Smartphone,
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences on iOS and Android.',
      features: ['iOS Development', 'Android Development', 'React Native/Flutter', 'UI/UX Design', 'App Store Optimization', 'Maintenance & Updates']
    },
    {
      id: 'progressive',
      title: 'Progressive Web Apps',
      icon: Globe,
      description: 'Fast, reliable, and engaging web apps that work offline and feel like native applications.',
      features: ['Offline Functionality', 'Push Notifications', 'App-like Experience', 'Cross-platform', 'Fast Loading', 'SEO Friendly']
    },
    {
      id: 'desktop',
      title: 'Desktop Applications',
      icon: Monitor,
      description: 'Powerful desktop applications for Windows, macOS, and Linux with native performance.',
      features: ['Cross-platform Support', 'Native Performance', 'System Integration', 'Auto-updates', 'Offline Capability', 'Custom UI/UX']
    },
    {
      id: 'hybrid',
      title: 'Hybrid Solutions',
      icon: Layers,
      description: 'Best of both worlds: combine web and native technologies for maximum reach and efficiency.',
      features: ['Single Codebase', 'Multi-platform', 'Cost Effective', 'Faster Development', 'Easy Maintenance', 'Native Features']
    }
  ];

  return (
    <ModernServiceSection
      badge="APPLICATION DEVELOPMENT"
      badgeIcon={Smartphone}
      title="APPLICATION DEVELOPMENT SERVICES"
      description="Innovative applications that connect with your audience across every platform and device."
      services={services}
      bgStyle="white"
      layout="featured"
    />
  );
}

// 11. BRANDING SECTION
function BrandingSection() {
  const services = [
    {
      id: 'identity',
      title: 'Brand Identity Design',
      icon: Palette,
      description: 'Create a distinctive brand identity that resonates with your audience and stands out in the market.',
      features: ['Logo Design', 'Color Palette', 'Typography Selection', 'Brand Guidelines', 'Visual Identity', 'Brand Collateral']
    },
    {
      id: 'strategy',
      title: 'Brand Strategy',
      icon: Target,
      description: 'Develop a comprehensive brand strategy that positions you for long-term success and market leadership.',
      features: ['Market Research', 'Competitor Analysis', 'Brand Positioning', 'Messaging Framework', 'Value Proposition', 'Brand Architecture']
    },
    {
      id: 'rebranding',
      title: 'Brand Refresh & Rebranding',
      icon: Rocket,
      description: 'Revitalize your existing brand or completely transform it to meet evolving market demands.',
      features: ['Brand Audit', 'Stakeholder Research', 'Redesign Strategy', 'Migration Planning', 'Launch Campaign', 'Brand Rollout']
    },
    {
      id: 'naming',
      title: 'Brand Naming & Messaging',
      icon: PenTool,
      description: 'Craft memorable names and compelling messages that capture your brand essence and connect emotionally.',
      features: ['Name Development', 'Tagline Creation', 'Messaging Strategy', 'Tone of Voice', 'Storytelling', 'Content Guidelines']
    }
  ];

  return (
    <ModernServiceSection
      badge="BRANDING"
      badgeIcon={Palette}
      title="BRANDING SERVICES"
      description="Transform your business into a memorable brand that captivates audiences and drives loyalty."
      services={services}
      bgStyle="gradient"
      layout="alternating"
    />
  );
}

// 12. DESIGN & ANIMATION SECTION
function DesignAnimationSection() {
  const services = [
    {
      id: 'graphic',
      title: 'Graphic Design',
      icon: PenTool,
      description: 'Eye-catching visual designs that communicate your message and captivate your audience.',
      features: ['Brand Materials', 'Marketing Collateral', 'Social Media Graphics', 'Print Design', 'Packaging Design', 'Infographics']
    },
    {
      id: 'motion',
      title: 'Motion Graphics',
      icon: Zap,
      description: 'Dynamic animations that bring your brand to life and engage viewers with compelling visual stories.',
      features: ['2D Animation', '3D Animation', 'Logo Animation', 'Explainer Videos', 'Social Media Videos', 'Video Editing']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: Monitor,
      description: 'User-centered design that creates intuitive, delightful experiences across digital platforms.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Interface Design', 'Usability Testing', 'Design Systems']
    },
    {
      id: 'illustration',
      title: 'Custom Illustrations',
      icon: Palette,
      description: 'Original illustrations that add personality and uniqueness to your brand communications.',
      features: ['Digital Illustration', 'Character Design', 'Icon Sets', 'Editorial Illustration', 'Product Illustration', 'Concept Art']
    }
  ];

  return (
    <ModernServiceSection
      badge="DESIGN & ANIMATION"
      badgeIcon={PenTool}
      title="DESIGN & ANIMATION SERVICES"
      description="Creative visual solutions that stop scrolls, start conversations, and drive engagement."
      services={services}
      bgStyle="white"
      layout="grid"
    />
  );
}

// 13. OFFLINE ADVERTISING SECTION
function OfflineAdvertisingSection() {
  const services = [
    {
      id: 'print',
      title: 'Print Advertising',
      icon: Newspaper,
      description: 'Impactful print campaigns in newspapers, magazines, and trade publications that reach your target audience.',
      features: ['Magazine Ads', 'Newspaper Ads', 'Brochures & Flyers', 'Catalogs', 'Direct Mail', 'Trade Publications']
    },
    {
      id: 'broadcast',
      title: 'Broadcast Advertising',
      icon: Radio,
      description: 'Captivating TV and radio commercials that amplify your message to mass audiences.',
      features: ['TV Commercials', 'Radio Spots', 'Script Writing', 'Production', 'Media Buying', 'Campaign Management']
    },
    {
      id: 'events',
      title: 'Event Marketing',
      icon: Users,
      description: 'Memorable brand experiences through strategic event marketing and activations.',
      features: ['Trade Shows', 'Sponsorships', 'Product Launches', 'Experiential Marketing', 'Event Branding', 'Promotions']
    },
    {
      id: 'guerrilla',
      title: 'Guerrilla Marketing',
      icon: Lightbulb,
      description: 'Unconventional, creative campaigns that generate buzz and viral word-of-mouth.',
      features: ['Street Marketing', 'Flash Mobs', 'Stunts', 'Ambient Advertising', 'Viral Campaigns', 'Creative Activations']
    }
  ];

  return (
    <ModernServiceSection
      badge="OFFLINE ADVERTISING"
      badgeIcon={Newspaper}
      title="OFFLINE ADVERTISING SERVICES"
      description="Traditional advertising channels that deliver tangible results and lasting brand impressions."
      services={services}
      bgStyle="gradient"
      layout="grid"
    />
  );
}

// 14. ONLINE ADVERTISING SECTION
function OnlineAdvertisingSection() {
  const services = [
    {
      id: 'display',
      title: 'Display Advertising',
      icon: Monitor,
      description: 'Strategic display ad campaigns that capture attention and drive conversions across the web.',
      features: ['Banner Ads', 'Responsive Ads', 'Rich Media', 'Programmatic Buying', 'Retargeting', 'Performance Tracking']
    },
    {
      id: 'social-ads',
      title: 'Social Media Advertising',
      icon: MessageSquare,
      description: 'Targeted social campaigns that reach the right audience on Facebook, Instagram, LinkedIn, and more.',
      features: ['Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Twitter Ads', 'TikTok Ads', 'Audience Targeting']
    },
    {
      id: 'video-ads',
      title: 'Video Advertising',
      icon: Eye,
      description: 'Engaging video campaigns on YouTube, social platforms, and OTT services that tell your story.',
      features: ['YouTube Ads', 'OTT/CTV Ads', 'Pre-roll/Mid-roll', 'Video Production', 'Targeting Strategy', 'Analytics']
    },
    {
      id: 'native',
      title: 'Native Advertising',
      icon: Newspaper,
      description: 'Seamless sponsored content that blends naturally with editorial content for higher engagement.',
      features: ['Sponsored Articles', 'Content Recommendation', 'In-feed Ads', 'Premium Publishers', 'Content Creation', 'Performance Optimization']
    }
  ];

  return (
    <ModernServiceSection
      badge="ONLINE ADVERTISING"
      badgeIcon={Globe}
      title="ONLINE ADVERTISING SERVICES"
      description="Data-driven digital advertising that reaches your audience where they spend their time online."
      services={services}
      bgStyle="white"
      layout="featured"
    />
  );
}

// 15. MEDIA & PR SECTION
function MediaPRSection() {
  const services = [
    {
      id: 'pr-strategy',
      title: 'Public Relations Strategy',
      icon: Speaker,
      description: 'Comprehensive PR strategies that build reputation, manage crises, and amplify your brand voice.',
      features: ['Media Strategy', 'Press Release Writing', 'Media Outreach', 'Reputation Management', 'Crisis Communication', 'Thought Leadership']
    },
    {
      id: 'media-relations',
      title: 'Media Relations',
      icon: Radio,
      description: 'Strong relationships with journalists and media outlets that secure valuable coverage for your brand.',
      features: ['Media Database', 'Journalist Outreach', 'Press Briefings', 'Media Training', 'Interview Coordination', 'Coverage Tracking']
    },
    {
      id: 'content-pr',
      title: 'Content & Editorial',
      icon: PenTool,
      description: 'Compelling content that positions your brand as an industry authority and thought leader.',
      features: ['Articles & Op-eds', 'Case Studies', 'White Papers', 'Executive Profiles', 'Industry Reports', 'Guest Contributions']
    },
    {
      id: 'influencer',
      title: 'Influencer Relations',
      icon: Users,
      description: 'Strategic partnerships with influencers and brand ambassadors to amplify your message authentically.',
      features: ['Influencer Identification', 'Partnership Management', 'Campaign Coordination', 'Content Collaboration', 'Performance Tracking', 'ROI Analysis']
    }
  ];

  return (
    <ModernServiceSection
      badge="MEDIA & PR"
      badgeIcon={Radio}
      title="MEDIA & PR SERVICES"
      description="Strategic public relations that elevate your brand reputation and secure valuable media coverage."
      services={services}
      bgStyle="gradient"
      layout="grid"
    />
  );
}

// 16. POLITICAL CAMPAIGNS SECTION
function PoliticalCampaignsSection() {
  const services = [
    {
      id: 'campaign-strategy',
      title: 'Campaign Strategy & Planning',
      icon: Vote,
      description: 'Winning political strategies that connect with voters and drive electoral success.',
      features: ['Electoral Strategy', 'Voter Research', 'Opposition Research', 'Message Development', 'Campaign Planning', 'Field Operations']
    },
    {
      id: 'digital-political',
      title: 'Digital Political Marketing',
      icon: Globe,
      description: 'Targeted digital campaigns that reach voters where they are and mobilize support online.',
      features: ['Social Media Campaigns', 'Digital Advertising', 'Email Outreach', 'Grassroots Mobilization', 'Online Fundraising', 'Analytics & Tracking']
    },
    {
      id: 'media-political',
      title: 'Political Media & Communications',
      icon: Speaker,
      description: 'Strategic media management and communications that control the narrative and build momentum.',
      features: ['Press Relations', 'Media Training', 'Crisis Management', 'Debate Preparation', 'Speechwriting', 'Rapid Response']
    },
    {
      id: 'ground-ops',
      title: 'Ground Operations',
      icon: Users,
      description: 'Field operations and grassroots organizing that turn supporters into voters and volunteers.',
      features: ['Canvassing', 'Phone Banking', 'Volunteer Management', 'Event Organization', 'GOTV Operations', 'Coalition Building']
    }
  ];

  return (
    <section className="section-compact-md bg-white">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="badge-glass mb-4 inline-flex">
            <Vote className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="subheading text-xs">POLITICAL CAMPAIGNS</span>
          </div>
          <h2 className="heading-lg mb-3">
            POLITICAL CAMPAIGN SERVICES
          </h2>
          <p className="body-md text-muted max-w-2xl mx-auto">
            Comprehensive campaign management and strategy that wins elections and builds political movements.
          </p>
        </motion.div>

        <ModernServiceSection
          badge="POLITICAL CAMPAIGNS"
          badgeIcon={Vote}
          title="POLITICAL CAMPAIGN SERVICES"
          description="Comprehensive campaign management and strategy that wins elections and builds political movements."
          services={services}
          bgStyle="white"
          layout="alternating"
        />
      </div>
    </section>
  );
}

// 17. OOH SERVICES SECTION
function OOHServicesSection() {
  const services = [
    {
      id: 'billboards',
      title: 'Billboard Advertising',
      icon: Eye,
      description: 'High-impact billboard campaigns that reach thousands of viewers daily in prime locations.',
      features: ['Traditional Billboards', 'Digital Billboards', 'Highway Advertising', 'Urban Locations', 'Creative Design', 'Strategic Placement']
    },
    {
      id: 'transit',
      title: 'Transit Advertising',
      icon: MapPin,
      description: 'Mobile advertising on buses, trains, and transit shelters that reaches commuters throughout their journey.',
      features: ['Bus Advertising', 'Metro/Train Ads', 'Transit Shelters', 'Airport Displays', 'Taxi/Rideshare Ads', 'Route Planning']
    },
    {
      id: 'street',
      title: 'Street Furniture',
      icon: Monitor,
      description: 'Eye-level advertising on bus shelters, kiosks, and urban furniture for maximum pedestrian impact.',
      features: ['Bus Shelters', 'Kiosks', 'Street Poles', 'Benches', 'Digital Screens', 'Urban Locations']
    },
    {
      id: 'ambient',
      title: 'Ambient & Experiential',
      icon: Lightbulb,
      description: 'Creative out-of-home experiences that create memorable brand moments in unexpected places.',
      features: ['Mall Advertising', 'Venue Branding', '3D Installations', 'Interactive Displays', 'Pop-up Activations', 'Guerrilla OOH']
    }
  ];

  return (
    <ModernServiceSection
      badge="OUT-OF-HOME (OOH)"
      badgeIcon={Eye}
      title="OUT-OF-HOME ADVERTISING SERVICES"
      description="Strategic outdoor advertising that captures attention and builds brand awareness in the physical world."
      services={services}
      bgStyle="gradient"
      layout="grid"
    />
  );
}
