import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { RevealOnScroll, StatCard, FeatureCard, Section, CTAButton } from '../ThemeComponents';
import { 
  TrendingUp, 
  Heart,
  Award,
  Trophy,
  Rocket,
  Eye,
  Clock,
  Target,
  Sparkles,
  Users,
  BarChart3,
  HeadphonesIcon,
  Shield,
  Building2,
  Search,
  Megaphone,
  Palette,
  PenTool,
  Video,
  Code,
  Phone
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-black text-white hover-glow-white animate-pulse-glow">
                About InchToMilez
              </Badge>
              <h1 className="heading-xl mb-6 text-gradient-shine">
                30+ Years of Making Brands Unforgettable
              </h1>
              <p className="body-lg text-gray-700 max-w-3xl mx-auto mb-8">
                We're not just another digital marketing agency. We're brand architects, growth engineers, and storytellers who've been transforming businesses since 1994. Based in Indore, serving the world.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mt-12">
              <StatCard value="30+" label="Years in Business" delay={0.1} />
              <StatCard value="500+" label="Brands Transformed" delay={0.2} />
              <StatCard value="96%" label="Client Retention" delay={0.3} />
              <StatCard value="1200+" label="Projects Delivered" delay={0.4} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <Section gradient>
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-black text-white hover-glow-white animate-pulse-glow">
              Our Story
            </Badge>
            <h2 className="heading-lg mb-6 text-gradient-bw">
              From a Small Office in Indore to Transforming Brands Nationwide
            </h2>
            <p className="body-lg text-gray-700 leading-relaxed">
              Founded in 1994, InchToMilez started with a simple belief: <strong>great marketing creates real business growth</strong>. Over three decades, we've evolved from traditional advertising to becoming digital-first pioneers, always staying ahead of the curve.
            </p>
            <p className="body-lg text-gray-700 leading-relaxed mt-4">
              Today, we're proud to be <strong>Indore's most trusted digital marketing agency</strong>, working with startups, SMEs, and enterprise brands across healthcare, e-commerce, technology, real estate, and more.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={Rocket}
            title="Our Mission"
            description="To empower every brand with strategies that don't just look good on paper—they deliver real, measurable results."
            delay={0.1}
          />
          <FeatureCard
            icon={Eye}
            title="Our Vision"
            description="To be India's most results-driven digital marketing agency, where every campaign is a success story waiting to happen."
            delay={0.2}
          />
          <FeatureCard
            icon={Heart}
            title="Our Promise"
            description="No fluff, no jargon, no empty promises. Just honest work, transparent reporting, and growth you can see and feel."
            delay={0.3}
          />
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <div className="text-center mb-12 sm:mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-black text-white hover-glow-white animate-pulse-glow">
              Our Values
            </Badge>
            <h2 className="heading-lg mb-4 text-gradient-shine">We're Bold. We're Different. We're Real.</h2>
            <p className="body-lg text-gray-600 max-w-2xl mx-auto">
              These aren't corporate buzzwords. These are the principles we live by every single day.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: TrendingUp,
              title: 'Growth That\'s Measurable',
              desc: 'We don\'t chase vanity metrics. We focus on what actually moves the needle: leads, conversions, revenue. Every strategy is data-backed.'
            },
            {
              icon: Heart,
              title: 'Simple & Clear Communication',
              desc: 'No marketing jargon. No confusing reports. We speak human. Your campaigns, your results—explained in plain English.'
            },
            {
              icon: Award,
              title: 'We Earn Recognition, Never Buy It',
              desc: 'We don\'t pay for awards or fake reviews. Our trophies are client success stories, referrals, and long-term partnerships.'
            },
            {
              icon: Trophy,
              title: 'Quality Over Quick Wins',
              desc: 'We don\'t bargain on value. Great campaigns take skill, strategy, and experience. We deliver excellence, not shortcuts.'
            },
          ].map((value, index) => (
            <RevealOnScroll key={index} delay={index * 0.05}>
              <motion.div
                className={`glass-premium p-6 sm:p-8 rounded-3xl hover-lift-md hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle h-full animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center flex-shrink-0 icon-container-glass hover-scale-lg">
                    <value.icon className="w-6 h-6 sm:w-7 sm:h-7 icon-interactive" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2 sm:mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.desc}</p>
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Why Brands Choose Us */}
      <Section gradient>
        <div className="text-center mb-12 sm:mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-black text-white hover-glow-white animate-pulse-glow">
              Why Us?
            </Badge>
            <h2 className="heading-lg mb-4 text-gradient-bw">Why 500+ Brands Trust InchToMilez</h2>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {[
            { icon: Clock, text: '30+ Years of Proven Expertise' },
            { icon: Target, text: 'ROI-Focused, Always' },
            { icon: Sparkles, text: 'Creative Strategies That Work' },
            { icon: Users, text: 'Dedicated Account Managers' },
            { icon: BarChart3, text: 'Transparent Reporting' },
            { icon: HeadphonesIcon, text: '24/7 Support & Quick Response' },
            { icon: Shield, text: 'Ethical & Honest Practices' },
            { icon: Rocket, text: 'Fast Execution, On-Time Delivery' },
            { icon: Building2, text: 'Industry-Specific Strategies' },
          ].map((item, index) => (
            <RevealOnScroll key={index} delay={index * 0.05}>
              <motion.div
                className={`glass-premium p-5 rounded-3xl hover-lift-sm hover-glow-white hover-scale-sm shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 icon-interactive" />
                  <span className="font-medium text-sm sm:text-base">{item.text}</span>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Our Team Philosophy */}
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-black text-white hover-glow-white animate-pulse-glow">
              Our Team
            </Badge>
            <h2 className="heading-lg mb-6 text-gradient-shine">30+ Experts. One Mission: Your Growth.</h2>
            <p className="body-lg text-gray-700">
              We're not a faceless agency. We're a team of strategists, creatives, analysts, and problem-solvers who genuinely care about your success.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[
            { icon: Search, role: 'SEO Specialists', desc: 'Masters of Google rankings' },
            { icon: Megaphone, role: 'PPC Experts', desc: 'Paid ads that actually convert' },
            { icon: Palette, role: 'Creative Designers', desc: 'Visuals that stop scrolls' },
            { icon: PenTool, role: 'Content Writers', desc: 'Words that sell' },
            { icon: Video, role: 'Video Producers', desc: 'Stories beautifully told' },
            { icon: Code, role: 'Web Developers', desc: 'Websites that perform' },
          ].map((member, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <motion.div
                className={`glass-premium p-5 sm:p-6 rounded-3xl text-center hover-lift-md hover-glow-white hover-scale-sm shadow-dramatic border-gradient-subtle group h-full animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform icon-container-glass">
                  <member.icon className="w-7 h-7 sm:w-8 sm:h-8 icon-interactive" />
                </div>
                <h3 className="heading-sm mb-2 text-sm sm:text-base">{member.role}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{member.desc}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section gradient>
        <div className="text-center mb-12 sm:mb-16">
          <RevealOnScroll>
            <Badge className="mb-4 bg-black text-white hover-glow-white animate-pulse-glow">
              Certifications
            </Badge>
            <h2 className="heading-lg mb-4 text-gradient-bw">Backed by the Best</h2>
            <p className="body-lg text-gray-600 max-w-2xl mx-auto">
              Certified, trained, and trusted by industry leaders.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {[
            'Google Ads Certified',
            'Google Analytics Pro',
            'Facebook Blueprint',
            'HubSpot Certified',
            'SEMrush Certified',
            'Bing Ads Accredited',
          ].map((cert, index) => (
            <RevealOnScroll key={index} delay={index * 0.05}>
              <motion.div
                className={`glass-premium p-4 sm:p-5 rounded-3xl text-center hover-lift-sm hover-glow-white hover-scale-md shadow-elegant border-gradient-subtle animate-fade-in-up stagger-delay-${(index % 6) + 1}`}
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 icon-interactive hover-scale-lg" />
                <p className="text-xs sm:text-sm font-medium">{cert}</p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-xl text-white mb-6 text-gradient-shine">
                Let's Write Your Success Story Together
              </h2>
              <p className="body-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Join 500+ brands who've transformed their business with InchToMilez.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CTAButton 
                  onClick={() => onNavigate('contact')}
                  variant="primary"
                  icon={Rocket}
                  className="bg-black text-white hover:bg-black btn-enhanced btn-ripple hover-scale-sm shadow-cinematic w-full sm:w-auto"
                >
                  Let's Talk Growth
                </CTAButton>

                <motion.a
                  href="tel:+919009970709"
                  className="flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/20 text-white rounded-xl hover:bg-white hover:text-black transition-all backdrop-blur-sm font-medium text-base sm:text-lg w-full sm:w-auto btn-ripple hover-scale-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2 icon-interactive" />
                  +91-9009970709
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}