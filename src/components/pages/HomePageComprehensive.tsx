import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getIconColor, iconColors } from '../../utils/iconColors';
import { 
  TrendingUp, Target, Zap, Award, Users, Rocket, CheckCircle2, ArrowRight, 
  Globe, Megaphone, Palette, Code, PenTool, Radio, Search,
  Mail, MapPin, Trophy, Briefcase, Lightbulb, Clock, Shield,
  Smartphone, Cloud, Monitor, Layers, Package, Cpu, Database,
  BarChart3, Speaker, Newspaper, Vote, Eye, MessageSquare,
  ShoppingCart, Settings, Lock, Play, Film, Clapperboard, 
  Camera, Video, Sparkles, Star, BarChart2, LineChart, 
  PieChart, Activity, Repeat, Share2, Download, FileText,
  Leaf, Heart, Handshake, Building2, Users2, GraduationCap,
  Stethoscope, Home, ShoppingBag, Zap as Lightning, BookOpen,
  Phone, Send, Calendar, MousePointerClick, DollarSign,
  TrendingDown, Gauge, Binary, Wrench, Image, Mic, TestTube
} from 'lucide-react';

// Import components
import { AnimatedStats } from '../AnimatedStats';
import { AnimatedTabs } from '../AnimatedTabs';
import { BentoGrid } from '../BentoGrid';
import { ImageAccordion } from '../ImageAccordion';
import { IconBoxGrid } from '../IconBoxGrid';
import { MasonryGrid } from '../MasonryGrid';
import { HorizontalServiceSlider } from '../HorizontalServiceSlider';
import { SEOHead } from '../SEOHead';
import { StructuredData, createOrganizationSchema, createLocalBusinessSchema } from '../StructuredData';
import { ParallaxGlassSection, ParallaxCard, ParallaxBackgroundLayer, ParallaxText } from '../ParallaxGlassSection';
import {
  GoogleLogo,
  MetaLogo,
  AWSLogo,
  MicrosoftLogo,
  AdobeLogo,
  HubSpotLogo,
  ShopifyLogo,
  WordPressLogo
} from '../BrandLogos';
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

export function HomePageComprehensive({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <SEOHead
        title="InchToMilez - 360° Digital Marketing, IT & Media Solutions | #1 Agency in Indore"
        description="Complete Digital Marketing, IT Services & Media Production under one roof. 30+ years excellence. SEO, Web Development, App Development, Branding, Video Production & More."
        keywords="360 degree digital marketing agency, IT services company, media production, advertising agency indore, web development, app development, SEO services, social media marketing, branding agency, video production"
        canonical="https://inchtomilez.com"
      />

      {/* Structured Data */}
      <StructuredData schema={createOrganizationSchema()} />
      <StructuredData schema={createLocalBusinessSchema()} />

      {/* SECTION 1: Hero Section */}
      <HeroSection onNavigate={onNavigate} />
      
      {/* SECTION 2: About InchToMilez */}
      <AboutSection />
      
      {/* SECTION 3: Why Choose Us */}
      <WhyChooseUsSection />
      
      {/* SECTION 4: Core Services Overview (IT + Media + Marketing) */}
      <CoreServicesOverview onNavigate={onNavigate} />
      
      {/* SECTION 5: Digital Marketing Services */}
      <DigitalMarketingServices />
      
      {/* SECTION 6: Advertising Services */}
      <AdvertisingServices />
      
      {/* SECTION 7: IT Services */}
      <ITServicesSection />
      
      {/* SECTION 8: Media & Creative Services */}
      <MediaCreativeServices />
      
      {/* SECTION 9: SEO & Growth Section */}
      <SEOGrowthSection />
      
      {/* SECTION 10: Case Studies / Portfolio */}
      <CaseStudiesSection onNavigate={onNavigate} />
      
      {/* SECTION 11: Industries We Serve */}
      <IndustriesSection />
      
      {/* SECTION 12: Process / How We Work */}
      <ProcessSection />
      
      {/* SECTION 13: Tools & Technologies */}
      <ToolsTechnologiesSection />
      
      {/* SECTION 14: Testimonials & Reviews */}
      <TestimonialsSection />
      
      {/* SECTION 15: Awards & Recognitions */}
      <AwardsRecognitionsSection />
      
      {/* SECTION 16: Our Team */}
      <TeamSection />
      
      {/* SECTION 17: Insights / Blog Section */}
      <InsightsBlogSection onNavigate={onNavigate} />
      
      {/* SECTION 18: Pricing / Packages */}
      <PricingPackagesSection />
      
      {/* SECTION 19: FAQ Section */}
      <FAQSectionWrapper />
      
      {/* SECTION 20: Comparison Section */}
      <ComparisonSection />
      
      {/* SECTION 21: Partner & Affiliate Section */}
      <PartnerAffiliateSection />
      
      {/* SECTION 22: Global Reach Section */}
      <GlobalReachSection />
      
      {/* SECTION 23: Newsletter Subscription */}
      <NewsletterSection />
      
      {/* SECTION 24: Free Tools & Resources */}
      <FreeToolsResourcesSection />
      
      {/* SECTION 25: CSR & Sustainability */}
      <CSRSustainabilitySection />
      
      {/* SECTION 26: Culture & Careers */}
      <RecruitmentSection />
      
      {/* SECTION 27: GMB & Local SEO */}
      <GMBSection />
      
      {/* SECTION 28: Websites Showcase */}
      <WebsitesSection />
      
      {/* SECTION 29: Campaigns Showcase */}
      <CampaignsSection />
      
      {/* SECTION 30: Appointment / Lead Capture */}
      <AppointmentLeadSection />
      
      {/* SECTION 31: Strong CTA Band */}
      <StrongCTABand onNavigate={onNavigate} />
      
      {/* SECTION 32: Contact Us */}
      <ContactSection />
    </div>
  );
}

// ============================================
// SECTION 1: HERO SECTION
// ============================================
function HeroSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [currentTagline, setCurrentTagline] = useState(0);
  
  const taglines = [
    "360° Digital Marketing + IT + Media Solutions",
    "Your Complete Growth Partner",
    "End-to-End Digital Transformation",
    "One Agency, Infinite Possibilities",
    "Where Technology Meets Creativity"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden glass-section-light">
      {/* Parallax Background Layer */}
      <ParallaxBackgroundLayer pattern="dots" />

      <div className="container-award relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="badge-glass px-6 py-3 hover-glow-white animate-pulse-glow">
              <Award className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
              <span className="font-antonio font-bold text-sm">30+ YEARS OF EXCELLENCE</span>
              <Star className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="heading-xl mb-6 text-gradient-shine">
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="body-lg max-w-3xl mx-auto leading-relaxed"
          >
            Complete <strong className="text-black font-semibold">Digital Marketing</strong>, 
            <strong className="text-black font-semibold"> IT Solutions</strong>, and 
            <strong className="text-black font-semibold"> Media Production</strong> services 
            under one roof. From SEO to software development, branding to video production — 
            we're your one-stop agency for digital transformation.
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
              className="btn-award btn-lg-award btn-enhanced btn-ripple hover-scale-sm group"
            >
              <Rocket className="w-5 h-5 icon-interactive" strokeWidth={2} />
              <span>Get Marketing Help</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
            
            <button 
              onClick={() => onNavigate('contact')}
              className="btn-outline-award btn-lg-award btn-enhanced btn-ripple hover-scale-sm group"
            >
              <Calendar className="w-5 h-5 icon-interactive" strokeWidth={2} />
              <span>Book Free Consultation</span>
            </button>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
          >
            {[
              { value: '30+', label: 'Years Experience' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '250+', label: 'Happy Clients' },
              { value: '15+', label: 'Industries Served' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`glass-premium card-compact-md text-center hover-lift-md hover-glow-white shadow-elegant animate-fade-in-up stagger-delay-${index + 1}`}
              >
                <div className="font-antonio font-bold text-3xl md:text-4xl text-gradient-bw mb-1">
                  {stat.value}
                </div>
                <div className="body-sm text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 2: ABOUT INCHTOMILEZ
// ============================================
function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with integrated digital, IT, and media solutions that drive measurable growth and lasting success.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the most trusted 360° digital partner for businesses seeking transformation in the digital age.'
    },
    {
      icon: Shield,
      title: 'Our Values',
      description: 'Excellence, Innovation, Integrity, Client-First Approach, Results-Driven Solutions.'
    }
  ];

  return (
    <ParallaxGlassSection speed="medium" glassLevel="subtle" className="section-compact-lg">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white"
          >
            <Briefcase className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">ABOUT US</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            WHO WE ARE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-4xl mx-auto"
          >
            <strong className="text-black font-semibold">InchToMilez</strong> is a complete 360° digital powerhouse offering 
            <strong className="text-black font-semibold"> Digital Marketing</strong>, 
            <strong className="text-black font-semibold"> IT Solutions</strong>, and 
            <strong className="text-black font-semibold"> Media Production</strong> services. 
            With over <strong className="text-black font-semibold">30 years of combined expertise</strong>, we've helped 250+ 
            businesses transform their digital presence, scale their operations, and achieve remarkable growth. 
            From SEO and social media to custom software development and cinematic brand films — we do it all under one roof.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <ParallaxCard key={value.title} index={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-premium card-compact-lg text-center hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle h-full animate-fade-in-up stagger-delay-${index + 1}`}
                >
                  <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto hover-scale-md">
                    <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                  </div>
                  <h3 className="heading-sm text-base mb-3">{value.title}</h3>
                  <p className="body-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ParallaxCard>
            );
          })}
        </div>
      </div>
    </ParallaxGlassSection>
  );
}

// ============================================
// SECTION 3: WHY CHOOSE US
// ============================================
function WhyChooseUsSection() {
  const usps = [
    {
      icon: Award,
      title: '360° Solutions',
      description: 'Marketing, IT & Media services under one roof — no need for multiple agencies.',
      color: iconColors.yellow
    },
    {
      icon: Trophy,
      title: '30+ Years Experience',
      description: 'Three decades of excellence serving 250+ clients across 15+ industries.',
      color: iconColors.blue
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Data-backed strategies focused on ROI, conversions, and measurable growth.',
      color: iconColors.red
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified specialists in SEO, development, design, video production & more.',
      color: iconColors.purple
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Clear communication, honest reporting, and long-term partnerships.',
      color: iconColors.green
    },
    {
      icon: Rocket,
      title: 'End-to-End Support',
      description: 'From strategy to execution to optimization — we handle everything.',
      color: iconColors.orange
    }
  ];

  return (
    <ParallaxGlassSection speed="medium" glassLevel="medium" className="section-compact-lg">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Star className="w-4 h-4 icon-interactive" style={{ color: iconColors.yellow }} strokeWidth={2} fill={iconColors.yellow} />
            <span className="font-antonio font-bold text-sm">WHY INCHTOMILEZ</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            WHY CHOOSE US
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            We're not just another agency. We're your complete digital transformation partner 
            with proven expertise, trusted processes, and a client-first approach.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <ParallaxCard key={usp.title} index={index} delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-premium card-compact-lg hover-lift-lg hover-glow-white hover-scale-sm shadow-dramatic border-gradient-subtle h-full animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
                >
                  <div className="icon-container-glass w-14 h-14 p-3 mb-4 hover-scale-lg">
                    <Icon className="w-full h-full icon-interactive" style={{ color: usp.color }} strokeWidth={2} />
                  </div>
                  <h3 className="heading-sm text-base mb-3">{usp.title}</h3>
                  <p className="body-sm text-muted leading-relaxed">
                    {usp.description}
                  </p>
                </motion.div>
              </ParallaxCard>
            );
          })}
        </div>
      </div>
    </ParallaxGlassSection>
  );
}

// ============================================
// SECTION 4: CORE SERVICES OVERVIEW
// ============================================
function CoreServicesOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const coreServices = [
    {
      id: '1',
      title: 'Digital Marketing',
      description: 'Complete digital marketing solutions including SEO, SEM, Social Media Marketing, Content Marketing, Email Automation, and Influencer Marketing.',
      icon: Megaphone,
      color: iconColors.red,
      services: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing', 'Influencer Marketing'],
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.02) 100%)',
    },
    {
      id: '2',
      title: 'IT Solutions',
      description: 'Custom software development, web applications, mobile apps, cloud solutions, AI tools, and comprehensive IT consulting services.',
      icon: Code,
      color: iconColors.blue,
      services: ['Website Development', 'App Development', 'Software Solutions', 'Cloud Services', 'AI Tools', 'IT Consulting'],
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.01) 100%)',
    },
    {
      id: '3',
      title: 'Media & Creative',
      description: 'Complete branding, graphic design, video production, photography, AR/VR experiences, and multimedia content creation.',
      icon: Film,
      color: iconColors.purple,
      services: ['Branding', 'Graphic Design', 'Video Production', 'Photography', 'AR/VR', 'Animation'],
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.01) 100%)',
    },
  ];

  return (
    <ParallaxGlassSection speed="fast" glassLevel="strong" className="section-compact-lg">
      <ParallaxBackgroundLayer pattern="grid" />
      <div className="container-award relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white"
          >
            <Layers className="w-4 h-4 icon-interactive" style={{ color: iconColors.cyan }} strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR SERVICES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            360° SOLUTIONS UNDER ONE ROOF
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Complete digital ecosystem covering Marketing, IT, and Media — 
            everything your business needs to thrive in the digital age.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <ParallaxCard key={service.id} index={index} delay={index * 0.15}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`glass-premium card-compact-lg hover-lift-lg hover-glow-white hover-scale-sm shadow-cinematic border-gradient-subtle group h-full animate-fade-in-up stagger-delay-${index + 1}`}
                >
                <div className="icon-container-glass w-16 h-16 p-4 mb-6 hover-scale-lg">
                  <Icon className="w-full h-full icon-interactive" style={{ color: service.color }} strokeWidth={2} />
                </div>
                
                <h3 className="heading-md text-xl mb-4">{service.title}</h3>
                <p className="body-md text-muted mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.services.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 icon-interactive" style={{ color: iconColors.green }} strokeWidth={2} />
                      <span className="body-sm text-secondary">{item}</span>
                    </div>
                  ))}
                </div>

                  <button
                    onClick={() => onNavigate('services')}
                    className="btn-award w-full btn-enhanced btn-ripple hover-scale-sm group-hover:bg-gray-700 transition-colors"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4 icon-interactive" strokeWidth={2} />
                  </button>
                </motion.div>
              </ParallaxCard>
            );
          })}
        </div>
      </div>
    </ParallaxGlassSection>
  );
}

// ============================================
// SECTION 5: DIGITAL MARKETING SERVICES
// ============================================
function DigitalMarketingServices() {
  const services = [
    { icon: Search, title: 'SEO Services', description: 'Rank #1 on Google with technical SEO, content optimization, and link building strategies.' },
    { icon: MousePointerClick, title: 'SEM & PPC', description: 'High-ROI Google Ads, Bing Ads, and paid search campaigns that convert.' },
    { icon: Share2, title: 'Social Media Marketing', description: 'Facebook, Instagram, LinkedIn, Twitter — complete social media management and growth.' },
    { icon: FileText, title: 'Content Marketing', description: 'Engaging blogs, articles, infographics, and content that attracts and converts.' },
    { icon: Mail, title: 'Email Marketing', description: 'Automated email campaigns with personalization and high open rates.' },
    { icon: Users2, title: 'Influencer Marketing', description: 'Strategic influencer partnerships and brand collaborations for maximum reach.' },
    { icon: BarChart3, title: 'Marketing Automation', description: 'HubSpot, Mailchimp, automation tools to streamline your marketing.' },
    { icon: TrendingUp, title: 'Growth Marketing', description: 'Data-driven growth hacking strategies for rapid business scaling.' }
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Megaphone className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">DIGITAL MARKETING</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            DIGITAL MARKETING SERVICES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Complete digital marketing ecosystem — from search engine domination 
            to social media virality and conversion-optimized campaigns.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`glass-premium card-compact-md hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle text-center animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
              >
                <div className="icon-container-glass w-12 h-12 p-3 mb-3 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-sm mb-2">{service.title}</h3>
                <p className="body-xs text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 6: ADVERTISING SERVICES
// ============================================
function AdvertisingServices() {
  const services = [
    { icon: Globe, title: 'Online Advertising', description: 'Google Ads, Facebook Ads, Instagram Ads, LinkedIn Ads — complete PPC management.' },
    { icon: Radio, title: 'Offline Advertising', description: 'TV commercials, radio spots, print ads, and traditional media campaigns.' },
    { icon: Newspaper, title: 'Print Advertising', description: 'Newspaper ads, magazine spreads, brochures, and print collateral.' },
    { icon: MapPin, title: 'OOH Advertising', description: 'Billboards, transit ads, street furniture, and outdoor advertising campaigns.' },
    { icon: Speaker, title: 'Media Buying', description: 'Strategic media planning and buying across all channels for maximum ROI.' },
    { icon: Mic, title: 'PR Campaigns', description: 'Public relations, press releases, media outreach, and reputation management.' }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Radio className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">ADVERTISING</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            ADVERTISING SERVICES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Integrated advertising campaigns across online and offline channels — 
            from digital ads to billboards and TV commercials.
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
                className={`glass-premium card-compact-lg hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
              >
                <div className="icon-container-glass w-14 h-14 p-3 mb-4 hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base mb-3">{service.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 7: IT SERVICES
// ============================================
function ITServicesSection() {
  const services = [
    { icon: Monitor, title: 'Website Development', description: 'Custom websites, e-commerce platforms, CMS solutions, and responsive web design.' },
    { icon: Smartphone, title: 'App Development', description: 'iOS, Android, cross-platform mobile apps with native performance and UX.' },
    { icon: Code, title: 'Software Solutions', description: 'Custom enterprise software, SaaS platforms, and business automation tools.' },
    { icon: Cloud, title: 'Cloud Services', description: 'AWS, Azure, Google Cloud — migration, deployment, and cloud optimization.' },
    { icon: Cpu, title: 'AI & ML Tools', description: 'Artificial intelligence, machine learning, chatbots, and automation solutions.' },
    { icon: Settings, title: 'IT Consulting', description: 'Technology strategy, digital transformation, and IT infrastructure planning.' },
    { icon: Database, title: 'Database Solutions', description: 'Database design, optimization, migration, and management services.' },
    { icon: Lock, title: 'Cybersecurity', description: 'Security audits, penetration testing, and comprehensive security solutions.' }
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Cpu className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">IT SOLUTIONS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            IT SERVICES & TECHNOLOGY SOLUTIONS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Complete IT infrastructure — web development, mobile apps, custom software, 
            cloud solutions, AI tools, and comprehensive IT consulting.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`glass-premium card-compact-md hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle text-center animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
              >
                <div className="icon-container-glass w-12 h-12 p-3 mb-3 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-sm mb-2">{service.title}</h3>
                <p className="body-xs text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 8: MEDIA & CREATIVE SERVICES
// ============================================
function MediaCreativeServices() {
  const services = [
    { icon: Palette, title: 'Branding & Identity', description: 'Complete brand strategy, logo design, brand guidelines, and visual identity systems.' },
    { icon: PenTool, title: 'Graphic Design', description: 'Creative designs for print, digital, social media, and marketing materials.' },
    { icon: Video, title: 'Video Production', description: 'Corporate videos, commercials, brand films, explainer videos, and documentaries.' },
    { icon: Camera, title: 'Photography', description: 'Product photography, corporate shoots, event coverage, and commercial photography.' },
    { icon: Film, title: 'Animation & Motion', description: '2D/3D animation, motion graphics, explainer videos, and animated commercials.' },
    { icon: Package, title: 'AR/VR Experiences', description: 'Augmented reality, virtual reality, and immersive multimedia experiences.' }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Film className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">MEDIA & CREATIVE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            MEDIA & CREATIVE SERVICES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Complete creative studio — branding, design, video production, photography, 
            animation, and cutting-edge AR/VR experiences.
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
                className={`glass-premium card-compact-lg hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
              >
                <div className="icon-container-glass w-14 h-14 p-3 mb-4 hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base mb-3">{service.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 9: SEO & GROWTH
// ============================================
function SEOGrowthSection() {
  const stats = [
    { id: '1', value: 300, suffix: '%', label: 'Average Traffic Increase', icon: TrendingUp, description: 'Organic traffic growth' },
    { id: '2', value: 95, suffix: '%', label: 'First Page Rankings', icon: Trophy, description: 'Top 10 positions' },
    { id: '3', value: 8, suffix: 'x', label: 'Average ROI', icon: DollarSign, description: 'Return on investment' },
    { id: '4', value: 50, suffix: '+', label: 'SEO Experts', icon: Users, description: 'Certified specialists' },
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Search className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">SEO & GROWTH</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            SEO-FIRST GROWTH STRATEGY
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            We don't just optimize — we dominate search rankings with technical SEO, 
            content excellence, and proven link building strategies that deliver sustainable growth.
          </motion.p>
        </div>

        <AnimatedStats stats={stats} layout="grid" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Technical SEO', description: 'Site speed optimization, mobile-first indexing, structured data, and core web vitals.' },
            { title: 'Content Strategy', description: 'Keyword research, content clusters, pillar pages, and search-intent optimization.' },
            { title: 'Link Building', description: 'White-hat backlinks, authority building, and sustainable link acquisition strategies.' }
          ].map((item, index) => (
            <div key={item.title} className={`glass-premium card-compact-lg text-center hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}>
              <h3 className="heading-sm text-base mb-3">{item.title}</h3>
              <p className="body-sm text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 10: CASE STUDIES / PORTFOLIO
// ============================================
function CaseStudiesSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const cases = [
    {
      title: 'E-commerce 500% Revenue Growth',
      client: 'Fashion Retailer',
      metric: '500%',
      metricLabel: 'Revenue Increase',
      description: 'Complete digital transformation with SEO, PPC, and conversion optimization.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80'
    },
    {
      title: 'Healthcare Brand Awareness Campaign',
      client: 'Multi-Specialty Hospital',
      metric: '10M+',
      metricLabel: 'Reach',
      description: 'Integrated ATL/BTL campaign with TV, digital, and OOH advertising.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80'
    },
    {
      title: 'Real Estate Lead Generation',
      client: 'Luxury Real Estate',
      metric: '300+',
      metricLabel: 'Qualified Leads/Month',
      description: 'SEO-driven content strategy with high-converting landing pages.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
    }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Trophy className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">SUCCESS STORIES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            PROVEN RESULTS & CASE STUDIES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Real clients, real results. See how we've transformed businesses across industries 
            with data-driven strategies and creative excellence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`glass-premium overflow-hidden hover-lift-lg hover-glow-white hover-scale-sm shadow-cinematic border-gradient-subtle group animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-antonio font-bold text-3xl">{caseStudy.metric}</div>
                  <div className="body-xs">{caseStudy.metricLabel}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="body-xs text-muted mb-2">{caseStudy.client}</div>
                <h3 className="heading-sm text-base mb-3">{caseStudy.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={() => onNavigate('portfolio')}
            className="btn-award btn-lg-award btn-enhanced btn-ripple hover-scale-sm group"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-5 h-5 icon-interactive group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 12: PROCESS / HOW WE WORK
// ============================================
function ProcessSection() {
  const steps = [
    { 
      number: '01', 
      title: 'Strategy & Planning', 
      description: 'Deep discovery, market research, competitor analysis, and strategic roadmap creation.',
      icon: Target 
    },
    { 
      number: '02', 
      title: 'Execution & Implementation', 
      description: 'Seamless execution with agile methodology, regular updates, and quality assurance.',
      icon: Rocket 
    },
    { 
      number: '03', 
      title: 'Analytics & Reporting', 
      description: 'Data tracking, performance monitoring, and detailed reporting with actionable insights.',
      icon: BarChart3 
    },
    { 
      number: '04', 
      title: 'Optimization & Scaling', 
      description: 'Continuous optimization, A/B testing, and scaling strategies for sustained growth.',
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
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Settings className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">OUR PROCESS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
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
            A proven 4-step methodology that transforms vision into measurable results 
            through strategic planning and continuous optimization.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-premium card-compact-lg text-center hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle relative animate-fade-in-up stagger-delay-${index + 1}`}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-black/10 to-transparent -translate-x-1/2" />
                )}
                
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-black text-white hover-scale-md transition-transform">
                  <span className="font-antonio font-bold text-xl">{step.number}</span>
                </div>
                
                <div className="icon-container-glass w-14 h-14 p-3 mb-4 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                
                <h3 className="heading-sm text-base mb-3">{step.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 13: TOOLS & TECHNOLOGIES
// ============================================
function ToolsTechnologiesSection() {
  const toolCategories = [
    {
      category: 'Marketing',
      tools: ['Google Analytics', 'SEMrush', 'Ahrefs', 'HubSpot', 'Mailchimp', 'Hootsuite']
    },
    {
      category: 'Design',
      tools: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Canva', 'InVision', 'Blender']
    },
    {
      category: 'Development',
      tools: ['React', 'Node.js', 'Python', 'AWS', 'Firebase', 'MongoDB']
    },
    {
      category: 'Advertising',
      tools: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'Twitter Ads', 'TikTok Ads', 'Programmatic']
    }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Wrench className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">TOOLS & TECH</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            TOOLS & TECHNOLOGIES WE USE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Industry-leading platforms and cutting-edge technologies powering our solutions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-premium card-compact-lg hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <h3 className="heading-sm text-base mb-4 text-center">{category.category}</h3>
              <div className="space-y-2">
                {category.tools.map((tool, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 icon-interactive" strokeWidth={2} />
                    <span className="body-sm text-secondary">{tool}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 15: AWARDS & RECOGNITIONS
// ============================================
function AwardsRecognitionsSection() {
  const achievements = [
    { icon: Award, title: 'Top Digital Agency 2024', org: 'Industry Awards' },
    { icon: Trophy, title: 'Best SEO Campaign', org: 'Marketing Excellence' },
    { icon: Star, title: '5-Star Google Rating', org: '100+ Reviews' },
    { icon: Shield, title: 'ISO Certified', org: 'Quality Standards' },
    { icon: Users2, title: 'Top Employer', org: 'Great Place to Work' },
    { icon: Rocket, title: 'Innovation Award', org: 'Tech Summit 2024' }
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Trophy className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">AWARDS & RECOGNITION</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            AWARDS & RECOGNITIONS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Industry recognition and certifications that validate our excellence and commitment to quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-premium card-compact-lg text-center hover-lift-lg hover-glow-white hover-scale-sm shadow-dramatic border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
              >
                <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base mb-2">{achievement.title}</h3>
                <p className="body-sm text-muted">{achievement.org}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 17: INSIGHTS / BLOG
// ============================================
function InsightsBlogSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const articles = [
    {
      title: '10 SEO Strategies That Actually Work in 2025',
      category: 'SEO',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80'
    },
    {
      title: 'The Future of Digital Marketing: AI and Automation',
      category: 'Digital Marketing',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
      title: 'How to Build a High-Converting Website in 2025',
      category: 'Web Development',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80'
    }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <BookOpen className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">LATEST INSIGHTS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            INSIGHTS & BLOG
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Latest marketing trends, technology insights, and expert tips from our team.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`glass-premium overflow-hidden hover-lift-lg hover-glow-white hover-scale-sm shadow-cinematic border-gradient-subtle group cursor-pointer animate-fade-in-up stagger-delay-${index + 1}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-glass px-3 py-1 text-xs hover-glow-white">{article.category}</span>
                  <span className="body-xs text-muted">{article.readTime}</span>
                </div>
                <h3 className="heading-sm text-base mb-3 group-hover:text-white transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-black group-hover:text-white font-semibold text-sm">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 icon-interactive group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={() => onNavigate('blogs')}
            className="btn-award btn-lg-award btn-enhanced btn-ripple hover-scale-sm group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 icon-interactive group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 18: PRICING / PACKAGES
// ============================================
function PricingPackagesSection() {
  const packages = [
    {
      name: 'Startup',
      price: '₹25,000',
      period: '/month',
      description: 'Perfect for small businesses and startups',
      features: [
        'Basic SEO Services',
        'Social Media Management',
        'Monthly Reporting',
        'Email Support',
        '2 Blog Posts/Month'
      ]
    },
    {
      name: 'Growth',
      price: '₹50,000',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Advanced SEO Services',
        'PPC Campaign Management',
        'Social Media + Content',
        'Weekly Reporting',
        'Priority Support',
        '4 Blog Posts/Month'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Complete solutions for enterprises',
      features: [
        'Full-Service Marketing',
        'Custom Software Development',
        'Dedicated Account Manager',
        'Real-Time Analytics',
        '24/7 Premium Support',
        'Unlimited Content'
      ]
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
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <DollarSign className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">PRICING</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            FLEXIBLE PRICING PACKAGES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Transparent pricing with no hidden fees. Choose the package that fits your needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`glass-premium card-compact-lg relative hover-lift-lg hover-glow-white hover-scale-sm shadow-dramatic border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1} ${pkg.popular ? 'ring-2 ring-black' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="badge-glass px-4 py-1 bg-black text-white hover-glow-white animate-pulse-glow">
                    <span className="font-antonio font-bold text-xs">MOST POPULAR</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="heading-md text-xl mb-2">{pkg.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="font-antonio font-bold text-4xl text-black">{pkg.price}</span>
                  <span className="body-sm text-muted mb-1">{pkg.period}</span>
                </div>
                <p className="body-sm text-muted">{pkg.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0 mt-0.5 icon-interactive" strokeWidth={2} />
                    <span className="body-sm text-secondary">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full btn-enhanced btn-ripple hover-scale-sm ${pkg.popular ? 'btn-award' : 'btn-outline-award'}`}>
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 icon-interactive" strokeWidth={2} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 20: COMPARISON SECTION
// ============================================
function ComparisonSection() {
  const comparisons = [
    { feature: '360° Solutions (Marketing + IT + Media)', us: true, others: false },
    { feature: '30+ Years Experience', us: true, others: false },
    { feature: 'Dedicated Account Manager', us: true, others: false },
    { feature: 'Custom Software Development', us: true, others: false },
    { feature: 'In-House Media Production', us: true, others: false },
    { feature: 'Transparent Pricing', us: true, others: true },
    { feature: 'Monthly Reporting', us: true, others: true },
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <BarChart2 className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">COMPARISON</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            WHY INCHTOMILEZ VS. OTHERS
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            See how we compare to traditional agencies and why businesses choose us.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium card-compact-lg max-w-3xl mx-auto overflow-hidden hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 body-sm font-semibold text-secondary">Feature</th>
                <th className="text-center p-4 body-sm font-semibold text-black">InchToMilez</th>
                <th className="text-center p-4 body-sm font-semibold text-muted">Others</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0">
                  <td className="p-4 body-sm text-secondary">{item.feature}</td>
                  <td className="p-4 text-center">
                    {item.us ? (
                      <CheckCircle2 className="w-5 h-5 text-black mx-auto icon-interactive" strokeWidth={2} />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {item.others ? (
                      <CheckCircle2 className="w-5 h-5 text-gray-400 mx-auto" strokeWidth={2} />
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 21: PARTNER & AFFILIATE
// ============================================
function PartnerAffiliateSection() {
  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Handshake className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">PARTNERSHIPS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            STRATEGIC PARTNERS & AFFILIATES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Collaborating with industry leaders to deliver world-class solutions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium card-compact-lg text-center max-w-4xl mx-auto hover-lift-md hover-glow-white shadow-elegant border-gradient-subtle animate-fade-in-up"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Google Partner', Logo: GoogleLogo },
              { name: 'Meta Business Partner', Logo: MetaLogo },
              { name: 'AWS Partner', Logo: AWSLogo },
              { name: 'Microsoft Partner', Logo: MicrosoftLogo },
              { name: 'Adobe Partner', Logo: AdobeLogo },
              { name: 'HubSpot Partner', Logo: HubSpotLogo },
              { name: 'Shopify Partner', Logo: ShopifyLogo },
              { name: 'WordPress Partner', Logo: WordPressLogo }
            ].map((partner, index) => {
              const { Logo } = partner;
              return (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center justify-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <div className="icon-container-glass p-4 hover-scale-md">
                    <Logo className="w-12 h-12" />
                  </div>
                  <div className="body-sm font-semibold text-black">{partner.name}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 22: GLOBAL REACH
// ============================================
function GlobalReachSection() {
  const locations = [
    { city: 'Indore', country: 'India', clients: '100+' },
    { city: 'Mumbai', country: 'India', clients: '50+' },
    { city: 'Delhi', country: 'India', clients: '40+' },
    { city: 'Bangalore', country: 'India', clients: '35+' },
    { city: 'Dubai', country: 'UAE', clients: '15+' },
    { city: 'Singapore', country: 'Singapore', clients: '10+' }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Globe className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">GLOBAL REACH</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            SERVING CLIENTS WORLDWIDE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            From Indore to international markets — trusted by businesses across cities and countries.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-premium card-compact-lg text-center hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
            >
              <MapPin className="w-8 h-8 text-black mx-auto mb-3 icon-interactive hover-scale-lg" strokeWidth={2} />
              <h3 className="heading-sm text-base mb-1">{location.city}</h3>
              <p className="body-sm text-muted mb-2">{location.country}</p>
              <div className="font-antonio font-bold text-2xl text-black">{location.clients}</div>
              <p className="body-xs text-muted">Clients Served</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 23: NEWSLETTER SUBSCRIPTION
// ============================================
function NewsletterSection() {
  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium card-compact-lg max-w-3xl mx-auto text-center hover-lift-md hover-glow-white shadow-dramatic border-gradient-subtle animate-fade-in-up"
        >
          <Mail className="w-12 h-12 text-black mx-auto mb-4 icon-interactive hover-scale-lg" strokeWidth={2} />
          
          <h2 className="heading-lg mb-4 text-gradient-bw">
            STAY UPDATED
          </h2>
          
          <p className="body-lg text-muted mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for the latest digital marketing insights, 
            tech trends, and exclusive tips from our experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="glass-input flex-1 px-4 py-3 body-md focus-ring-elegant"
            />
            <button className="btn-award btn-enhanced btn-ripple hover-scale-sm">
              <Send className="w-4 h-4 icon-interactive" strokeWidth={2} />
              <span>Subscribe</span>
            </button>
          </div>

          <p className="body-xs text-muted mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 24: FREE TOOLS & RESOURCES
// ============================================
function FreeToolsResourcesSection() {
  const resources = [
    { icon: Download, title: 'SEO Checklist', description: 'Complete SEO audit checklist for 2025' },
    { icon: FileText, title: 'Marketing Templates', description: 'Ready-to-use campaign templates' },
    { icon: BarChart3, title: 'ROI Calculator', description: 'Calculate your marketing ROI' },
    { icon: TestTube, title: 'Website Analyzer', description: 'Free website performance analysis' }
  ];

  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Package className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">FREE RESOURCES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            FREE TOOLS & RESOURCES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Downloadable guides, calculators, and tools to help grow your business.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-premium card-compact-lg text-center hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle cursor-pointer group animate-fade-in-up stagger-delay-${index + 1}`}
              >
                <div className="icon-container-glass w-14 h-14 p-3 mb-4 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base mb-2">{resource.title}</h3>
                <p className="body-sm text-muted mb-4">{resource.description}</p>
                <div className="flex items-center justify-center gap-2 text-black group-hover:text-white font-semibold text-sm">
                  <span>Download Free</span>
                  <ArrowRight className="w-4 h-4 icon-interactive group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 25: CSR & SUSTAINABILITY
// ============================================
function CSRSustainabilitySection() {
  const initiatives = [
    { icon: Leaf, title: 'Environmental Responsibility', description: 'Carbon-neutral operations and sustainable practices' },
    { icon: Heart, title: 'Community Support', description: 'Free digital marketing training for NGOs' },
    { icon: GraduationCap, title: 'Education Programs', description: 'Scholarship programs for underprivileged students' }
  ];

  return (
    <section className="section-compact-lg bg-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Leaf className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">CSR & SUSTAINABILITY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-bw"
          >
            CORPORATE SOCIAL RESPONSIBILITY
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Committed to sustainability, community development, and responsible business practices.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass-premium card-compact-lg text-center hover-lift-lg hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${index + 1}`}
              >
                <div className="icon-container-glass w-16 h-16 p-4 mb-4 mx-auto hover-scale-lg">
                  <Icon className="w-full h-full text-black icon-interactive" strokeWidth={2} />
                </div>
                <h3 className="heading-sm text-base mb-3">{initiative.title}</h3>
                <p className="body-sm text-muted leading-relaxed">
                  {initiative.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 30: APPOINTMENT / LEAD CAPTURE
// ============================================
function AppointmentLeadSection() {
  return (
    <section className="section-compact-lg bg-gradient-to-b from-gray-50 to-white">
      <div className="container-award">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 badge-glass px-4 py-2 mb-4 hover-glow-white animate-pulse-glow"
          >
            <Calendar className="w-4 h-4 text-black icon-interactive" strokeWidth={2} />
            <span className="font-antonio font-bold text-sm">BOOK CONSULTATION</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-4 text-gradient-shine"
          >
            SCHEDULE YOUR FREE CONSULTATION
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="body-lg max-w-3xl mx-auto"
          >
            Get expert guidance tailored to your business. Book a free 30-minute strategy session.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium card-compact-lg max-w-2xl mx-auto hover-lift-md hover-glow-white shadow-dramatic border-gradient-subtle animate-fade-in-up"
        >
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Your Name *"
                className="glass-input px-4 py-3 body-md w-full focus-ring-elegant"
                required
              />
              <input 
                type="email" 
                placeholder="Your Email *"
                className="glass-input px-4 py-3 body-md w-full focus-ring-elegant"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="tel" 
                placeholder="Phone Number *"
                className="glass-input px-4 py-3 body-md w-full focus-ring-elegant"
                required
              />
              <input 
                type="text" 
                placeholder="Company Name"
                className="glass-input px-4 py-3 body-md w-full focus-ring-elegant"
              />
            </div>

            <select className="glass-input px-4 py-3 body-md w-full focus-ring-elegant">
              <option>Select Service Interest</option>
              <option>Digital Marketing</option>
              <option>IT Solutions</option>
              <option>Media Production</option>
              <option>Complete Package</option>
            </select>

            <textarea 
              placeholder="Tell us about your project..."
              rows={4}
              className="glass-input px-4 py-3 body-md w-full resize-none focus-ring-elegant"
            />

            <button type="submit" className="btn-award btn-lg-award w-full btn-enhanced btn-ripple hover-scale-sm">
              <Calendar className="w-5 h-5 icon-interactive" strokeWidth={2} />
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 icon-interactive" strokeWidth={2} />
            </button>

            <p className="body-xs text-muted text-center">
              We'll get back to you within 24 hours. Your information is 100% secure.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// SECTION 31: STRONG CTA BAND
// ============================================
function StrongCTABand({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="section-compact-lg bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
          width: '100%',
          height: '100%'
        }} />
      </div>

      <div className="container-award relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="animate-fade-in-up"
          >
            <h2 className="font-antonio font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 text-gradient-shine">
              LET'S BUILD YOUR BRAND TOGETHER
            </h2>
            
            <p className="body-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Ready to transform your business? Get started with India's most comprehensive 
              digital marketing, IT, and media solutions agency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white text-black font-raleway font-semibold text-base px-8 py-4 rounded-[10px] hover:bg-gray-100 transition-all flex items-center gap-3 group btn-enhanced btn-ripple hover-scale-sm shadow-cinematic"
            >
              <Rocket className="w-5 h-5 icon-interactive" strokeWidth={2} />
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 icon-interactive group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </button>
            
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-transparent text-white font-raleway font-semibold text-base px-8 py-4 rounded-[10px] border-2 border-white hover:bg-white hover:text-black transition-all flex items-center gap-3 btn-ripple hover-scale-sm"
            >
              <Phone className="w-5 h-5 icon-interactive" strokeWidth={2} />
              <span>Call: +91 123 456 7890</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 pt-6 text-gray-400"
          >
            <div className="text-center">
              <div className="font-antonio font-bold text-3xl text-white">24/7</div>
              <div className="body-xs">Support</div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div className="text-center">
              <div className="font-antonio font-bold text-3xl text-white">100%</div>
              <div className="body-xs">Satisfaction</div>
            </div>
            <div className="h-12 w-px bg-gray-700" />
            <div className="text-center">
              <div className="font-antonio font-bold text-3xl text-white">30+</div>
              <div className="body-xs">Years Trust</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
