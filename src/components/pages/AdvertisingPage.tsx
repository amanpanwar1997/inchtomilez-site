import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { GradientHeading } from '../GradientHeading';
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  BarChart3,
  Zap,
  Globe,
  Sparkles,
  Rocket
} from 'lucide-react';

interface AdvertisingPageProps {
  onNavigate: (page: string) => void;
}

export function AdvertisingPage({ onNavigate }: AdvertisingPageProps) {
  const services = [
    {
      icon: Target,
      title: 'Google Ads Mastery',
      description: 'Performance-driven campaigns that turn clicks into customers and maximize your ROI'
    },
    {
      icon: Users,
      title: 'Social Media Ads',
      description: 'Laser-targeted campaigns that reach your perfect audience where they spend their time'
    },
    {
      icon: Globe,
      title: 'Display Dominance',
      description: 'Eye-catching display ads across premium networks that demand attention'
    },
    {
      icon: Zap,
      title: 'Retargeting Power',
      description: 'Convert interested browsers into buying customers with smart retargeting'
    }
  ];

  const benefits = [
    'Explosive brand visibility that gets you noticed',
    'Laser-focused targeting to reach your dream customers',
    'Crystal-clear ROI tracking and performance metrics',
    'Budget-friendly solutions that punch above their weight',
    'Expert campaign wizards optimizing 24/7',
    'Deep-dive analytics that reveal growth opportunities'
  ];

  const stats = [
    { number: '300%', label: 'Average ROI' },
    { number: '85%', label: 'Client Retention' },
    { number: '1000+', label: 'Campaigns Managed' },
    { number: '24/7', label: 'Campaign Monitoring' }
  ];

  return (
    <div className="min-h-screen text-black bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-8 gap-6 rotate-12 scale-150">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-20 h-20 border border-black rounded-lg"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-6 py-3 glass rounded-full mb-6 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Megaphone className="h-5 w-5 text-[#baff00] mr-2 animate-icon-pulse" />
                <span className="text-black">
                  Advertising That Actually Works
                </span>
              </motion.div>

              <GradientHeading 
                text="Ads That Stop Scrolls & Drive Sales"
                className="mb-6"
              />

              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Strategic advertising campaigns that maximize your reach and drive measurable results. 
                From Google Ads to social media dominance, we create data-driven campaigns that convert like crazy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-black text-white hover:bg-[#baff00] hover:text-black px-8 py-6 rounded-full shadow-lg btn-hover-shimmer"
                >
                  Launch Your Campaign
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="p-6 glass-card border-2 border-gray-200 hover:border-[#baff00] hover:shadow-dramatic transition-all text-center">
                      <motion.div 
                        className="text-4xl text-black mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientHeading 
              text="Advertising Services That Deliver"
              className="mb-6"
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive advertising solutions engineered for maximum impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 glass-card border-2 border-gray-200 hover:border-[#baff00] hover:shadow-dramatic transition-all h-full text-center">
                    <motion.div
                      className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="h-7 w-7 text-[#baff00]" />
                    </motion.div>
                    <h3 className="text-xl text-black mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {service.description}
                    </p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GradientHeading 
                text="Why Choose Our Advertising Superpowers?"
                className="mb-6"
              />
              <p className="text-lg text-gray-600 mb-8">
                We combine data-driven strategies with creative excellence to deliver advertising 
                campaigns that don't just reach your target audience—they convert them into raving fans.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start p-4 rounded-lg hover:bg-white transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                  >
                    <CheckCircle className="h-6 w-6 text-[#baff00] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-gray-700">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-8 glass-card border-2 border-gray-200 hover:border-[#baff00] shadow-medium hover:shadow-dramatic transition-all">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <TrendingUp className="h-14 w-14 text-[#baff00] mb-6" />
                  </motion.div>
                  <h3 className="text-2xl text-black mb-4">
                    Results That Speak Volumes
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    Our advertising campaigns are built on a foundation of data analysis, market research, 
                    and relentless optimization. We don't just run ads—we engineer strategic campaigns that 
                    deliver explosive business growth.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => onNavigate('contact')}
                      variant="outline"
                      className="w-full border-2 border-black text-black hover:bg-[#baff00] hover:border-[#baff00] py-6"
                    >
                      Request a Proposal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#baff00] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Sparkles className="h-14 w-14 text-[#baff00]" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl mb-6 text-white">
              Ready to Amplify Your Brand?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's create advertising campaigns that drive real business growth and deliver 
              jaw-dropping ROI. Your success story starts here.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('contact')}
                  className="bg-[#baff00] text-black hover:bg-white px-10 py-6 text-lg rounded-full shadow-lg btn-hover-shimmer"
                >
                  Start Your Campaign
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onNavigate('services')}
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg rounded-full shadow-lg"
                >
                  Explore All Services
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}