import { ArrowRight, Megaphone, Palette, Globe, Play, Users, BarChart3, CheckCircle, Star, Target, Search, Code, Zap, Shield, TrendingUp, Rocket, Sparkles, Award, Flame, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientHeading, GradientBadge } from '../GradientHeading';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const mainServices = [
    {
      icon: Megaphone,
      title: 'Advertising',
      description: 'We craft killer ad campaigns that don\'t just get clicks—they get CONVERSIONS. From Google to Facebook, we make every penny count.',
      features: ['Google Ads Mastery', 'Facebook & Instagram Ads', 'Display & Retargeting', 'Video Ad Campaigns', 'PPC Optimization'],
      path: 'advertising',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Palette,
      title: 'Branding',
      description: 'Turn your business into a BRAND that people remember, trust, and choose. We create identities that stick.',
      features: ['Logo & Identity Design', 'Brand Strategy', 'Visual Guidelines', 'Brand Positioning', 'Complete Rebranding'],
      path: 'branding',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Stunning visuals that stop the scroll and start conversations. Every design element has a purpose.',
      features: ['Social Media Graphics', 'Marketing Collateral', 'Infographics That Convert', 'Print & Digital Design', 'Packaging Design'],
      path: 'graphic-design',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Play,
      title: 'Animation',
      description: 'Bring your brand to life with animations that captivate, explain, and sell. Motion that moves minds.',
      features: ['2D & 3D Animation', 'Explainer Videos', 'Motion Graphics Magic', 'Video Production', 'Interactive Content'],
      path: 'animation',
      color: 'from-gray-800 to-gray-900'
    },
    {
      icon: Users,
      title: 'Public Relations',
      description: 'Build a reputation that opens doors. We manage your public image like it\'s our own.',
      features: ['Press Release Distribution', 'Media Relations', 'Crisis Management', 'Influencer Partnerships', 'Reputation Building'],
      path: 'public-relations',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Website Development',
      description: 'Lightning-fast, conversion-focused websites that work as hard as you do. Built for results, not just looks.',
      features: ['Responsive Web Design', 'E-Commerce Solutions', 'Custom Development', 'Web Applications', '24/7 Maintenance'],
      path: 'website-development',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const additionalServices = [
    {
      icon: Search,
      title: 'SEO Domination',
      description: 'Rank higher, get found faster. We optimize your site to dominate search results.'
    },
    {
      icon: Target,
      title: 'Social Media Firepower',
      description: 'Turn followers into fanatics. Campaigns that engage, entertain, and CONVERT.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Data that tells a story. Track, measure, and optimize every single move.'
    },
    {
      icon: Code,
      title: 'Content That Converts',
      description: 'Words that work. Content strategies that attract, engage, and sell.'
    }
  ];

  const whyChoose = [
    {
      icon: Flame,
      title: '30+ Years of Crushing It',
      description: 'Three decades. Countless success stories. Zero compromises.',
      stat: '30+'
    },
    {
      icon: Award,
      title: '500+ Happy Clients',
      description: 'Businesses that trusted us—and never looked back.',
      stat: '500+'
    },
    {
      icon: Rocket,
      title: '96% Success Rate',
      description: 'We don\'t just promise results. We DELIVER them.',
      stat: '96%'
    },
    {
      icon: Sparkles,
      title: 'Full-Stack Powerhouse',
      description: 'Everything you need, all under one roof. No hassle.',
      stat: '100%'
    }
  ];

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gray-50">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-8 gap-6 rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-20 h-20 border border-black rounded-lg"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientBadge icon={Sparkles} className="mb-6">
              30+ Years | 500+ Clients | 96% Success Rate
            </GradientBadge>

            <GradientHeading as="h1" className="text-5xl lg:text-7xl mb-6">
              Services That Actually<br />WORK
            </GradientHeading>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 font-raleway"
            >
              No fluff. No BS. Just <strong>proven digital marketing services</strong> that drive real revenue.
              <br />From SEO to social media, advertising to analytics—we've got you covered.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                onClick={() => onNavigate('contact')}
                size="lg"
                className="bg-black text-white hover:bg-gray-700 px-8 py-6 rounded-full font-raleway hover-lift btn-ripple hover-scale-sm shadow-cinematic"
              >
                Get Started Now
                <Rocket className="ml-2 h-5 w-5 icon-interactive" />
              </Button>
              <Button
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-6 rounded-full font-raleway btn-ripple hover-scale-sm"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 icon-interactive" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientHeading as="h2" className="text-4xl lg:text-6xl mb-6">
              The Full Arsenal
            </GradientHeading>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto font-raleway"
            >
              Six powerhouse services. Endless possibilities. <strong>One mission:</strong> Making your brand impossible to ignore.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-8 glass-premium border-gradient-subtle shadow-elegant hover:shadow-cinematic transition-all duration-500 h-full relative overflow-hidden animate-fade-in-up">
                  {/* Dark hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ pointerEvents: 'none' }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors duration-300"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                    >
                      <service.icon className="h-8 w-8 text-white group-hover:text-black transition-colors duration-300 icon-interactive" />
                    </motion.div>

                    <h3 className="text-2xl text-black mb-4 font-antonio group-hover:text-gray-700 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-base text-gray-600 mb-6 font-raleway leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 text-black mr-3 flex-shrink-0 icon-interactive" />
                          <span className="font-raleway font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      onClick={() => onNavigate(service.path)}
                      variant="outline"
                      className="w-full border-2 border-black text-black hover:bg-black hover:text-white font-raleway font-semibold py-6 rounded-xl transition-all duration-300 btn-ripple hover-scale-sm"
                    >
                      Explore {service.title}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform icon-interactive" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientHeading as="h2" className="text-4xl lg:text-6xl mb-6">
              Plus, Even More Firepower
            </GradientHeading>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto font-raleway"
            >
              Because dominating one channel isn't enough. We help you WIN everywhere.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="p-8 glass-strong border-2 border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-300 h-full text-center group">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black mb-6 group-hover:bg-white transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="h-8 w-8 text-white group-hover:text-black transition-colors" />
                  </motion.div>
                  <h3 className="text-xl text-black mb-3 font-antonio group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-raleway leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientHeading as="h2" className="text-4xl lg:text-6xl mb-6">
              Why We're Different
            </GradientHeading>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto font-raleway"
            >
              Numbers don't lie. <strong>Results speak louder than words.</strong> Here's why 500+ clients trust us.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 glass-card border-2 border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-300 text-center group relative overflow-hidden">
                  {/* Dark hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ pointerEvents: 'none' }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-all duration-300"
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                    >
                      <item.icon className="h-10 w-10 text-white group-hover:text-black transition-colors" />
                    </motion.div>

                    <motion.div
                      className="text-5xl font-antonio mb-3 text-black group-hover:text-white transition-colors duration-300"
                    >
                      {item.stat}
                    </motion.div>

                    <h3 className="text-xl text-black mb-3 font-antonio group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-raleway leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-strong p-12 rounded-3xl border-2 border-black/10"
          >
            <GradientHeading as="h2" className="text-4xl lg:text-6xl mb-6">
              Ready to Dominate?
            </GradientHeading>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-raleway"
            >
              <strong>Stop wasting time with mediocre marketing.</strong><br />
              Let's build a strategy that actually drives revenue.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('contact')}
                  size="lg"
                  className="bg-black text-white hover:bg-gray-700 px-10 py-7 text-lg rounded-full shadow-2xl font-raleway font-bold transition-all duration-300"
                >
                  Let's Talk Strategy
                  <Rocket className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.location.href = 'tel:+919009970709'}
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white px-10 py-7 text-lg rounded-full font-raleway font-bold"
                >
                  Call Now: +91-9009970709
                  <Phone className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-500 mt-6 font-raleway"
            >
              🔥 <strong>Limited slots available</strong> for new clients this month
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}