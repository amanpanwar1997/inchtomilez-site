import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { GradientHeading } from '../GradientHeading';
import { Video, Film, Play, Sparkles, ArrowRight, CheckCircle, Rocket, Zap } from 'lucide-react';

interface AnimationPageProps {
  onNavigate: (page: string) => void;
}

export function AnimationPage({ onNavigate }: AnimationPageProps) {
  const services = [
    { icon: Video, title: '2D Animation Magic', description: 'Engaging 2D animations that explain complex ideas simply and beautifully' },
    { icon: Film, title: '3D Animation Power', description: 'Stunning 3D animations and product visualizations that wow audiences' },
    { icon: Play, title: 'Motion Graphics', description: 'Dynamic motion graphics that bring your brand to life' },
    { icon: Sparkles, title: 'Explainer Videos', description: 'Explainer videos that convert viewers into customers fast' }
  ];

  const benefits = [
    'Professional animations that grab attention instantly',
    'Explainer videos that simplify complex concepts',
    'Brand-consistent motion graphics across all platforms',
    'High-quality renders optimized for any screen',
    'Fast turnaround with unlimited revisions',
    'Complete video ownership and source files'
  ];

  const stats = [
    { number: '500+', label: 'Animations Made' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '2-4 wk', label: 'Avg Delivery' },
    { number: '100%', label: 'Custom Work' }
  ];

  return (
    <div className="min-h-screen text-black bg-white">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border-2 border-black rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
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
                <Video className="h-5 w-5 text-black mr-2 animate-icon-pulse" />
                <span className="text-black">Animation That Mesmerizes</span>
              </motion.div>

              <GradientHeading 
                text="Animations That Stop The Scroll"
                className="mb-6"
              />

              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Professional animation services that transform your message into captivating visual stories. 
                From explainer videos to product visualizations, we create animations that engage and convert.
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
                  className="bg-black text-white hover:bg-gray-700 px-8 py-6 rounded-full shadow-lg btn-hover-shimmer"
                >
                  Animate Your Vision
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
                    <Card className="p-6 glass-card border-2 border-gray-200 hover:border-black hover:shadow-dramatic transition-all text-center">
                      <motion.div 
                        className="text-4xl text-black mb-2"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              text="Animation Services That Captivate"
              className="mb-6"
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bring your brand to life with animations that engage and inspire
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
                  <Card className="p-6 glass-card border-2 border-gray-200 hover:border-black hover:shadow-dramatic transition-all h-full text-center">
                    <motion.div
                      className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="h-7 w-7 text-black" />
                    </motion.div>
                    <h3 className="text-xl text-black mb-3">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                text="Why Our Animations Win Hearts"
                className="mb-6"
              />
              <p className="text-lg text-gray-600 mb-8">
                We craft animations that don't just move—they motivate. Every frame is designed to 
                capture attention, communicate clearly, and drive action.
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
                    <CheckCircle className="h-6 w-6 text-black mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-gray-700">{benefit}</span>
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
                <Card className="p-8 glass-shine shine-edge-all hover-lift-award transition-all card-equal-height">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="h-14 w-14 text-black mb-6" />
                  </motion.div>
                  <h3 className="text-2xl text-black mb-4">
                    Animations That Convert
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    Every animation we create combines stunning visuals with strategic storytelling. 
                    We don't just animate—we create motion experiences that drive measurable business results.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => onNavigate('contact')}
                      variant="outline"
                      className="w-full border-2 border-black text-black hover:bg-black hover:text-white hover:border-black py-6 transition-all"
                    >
                      Start Animating
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
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
              <Sparkles className="h-14 w-14 text-white" />
            </motion.div>

            <h2 className="text-4xl lg:text-6xl mb-6 text-white">
              Ready to Bring Your Vision to Life?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's create animations that capture hearts, minds, and market share. Your story deserves to move.
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
                  className="btn-award btn-lg-award"
                >
                  Get Animated
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