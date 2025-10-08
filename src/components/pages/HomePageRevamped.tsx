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

// Import new trending components
import { ImageAccordion } from '../ImageAccordion';
import { MasonryGrid } from '../MasonryGrid';
import { BentoGrid } from '../BentoGrid';
import { IconBoxGrid } from '../IconBoxGrid';
import { AnimatedTabs } from '../AnimatedTabs';
import { AnimatedStats } from '../AnimatedStats';

// Import existing components
import { SEOHead } from '../SEOHead';
import { StructuredData, createOrganizationSchema, createLocalBusinessSchema } from '../StructuredData';
import {
  IndustriesSection,
  TestimonialsSection,
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

      {/* SECTIONS */}
      <CinematicHeroSection onNavigate={onNavigate} />
      <BrandManifestoSection />
      <AdvertisingPhilosophySection />
      <ImageAccordionServicesSection />
      <CampaignArchitectureSection />
      <MasteryStatsSection />
      <ATLBTLTTLTabsSection />
      <PortfolioMasonrySection />
      <FilmProductionBentoSection />
      <IconMethodologiesSection />
      <CinematicTimelineSection />
      <TestimonialsSection />
      <IndustriesSection />
      <FAQSectionWrapper />
      <ContactSection />
    </div>
  );
}

// ============================================
// 1. CINEMATIC HERO SECTION
// ============================================
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

// ============================================
// 2. BRAND MANIFESTO SECTION
// ============================================
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

// ============================================
// 3. ADVERTISING PHILOSOPHY SECTION (Bento Grid)
// ============================================
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

// ============================================
// 4. IMAGE ACCORDION SERVICES SECTION
// ============================================
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

// Continue in next part...

export default HomePage;