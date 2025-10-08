import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { GradientHeading } from '../GradientHeading';
import { PenTool, Palette, FileText, Package, Image, ArrowRight, CheckCircle, Sparkles, Rocket, Zap } from 'lucide-react';

interface GraphicDesignPageProps {
  onNavigate: (page: string) => void;
}

export function GraphicDesignPage({ onNavigate }: GraphicDesignPageProps) {
  const services = [
    { icon: FileText, title: 'Print Perfection', description: 'Brochures, flyers, and print materials that demand attention' },
    { icon: Image, title: 'Digital Dominance', description: 'Social media graphics and digital assets that stop the scroll' },
    { icon: Palette, title: 'Infographic Magic', description: 'Data visualization that turns complex info into visual gold' },
    { icon: Package, title: 'Packaging Power', description: 'Product packaging that flies off shelves' }
  ];

  const benefits = [
    'Professional, jaw-dropping designs that convert',
    'Brand-consistent visual communication across all platforms',
    'Print-ready and web-optimized files for every use case',
    'Unlimited revisions until you are absolutely thrilled',
    'Lightning-fast turnaround times that meet your deadlines',
    'Complete design ownership and it is 100% yours'
  ];

  const stats = [
    { number: '2000+', label: 'Designs Created' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '48hr', label: 'Avg Turnaround' },
    { number: '100%', label: 'Custom Work' }
  ];

  return (
    <div className="min-h-screen text-black bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-black"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
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
                <PenTool className="h-5 w-5 text-black mr-2 animate-icon-pulse" />
                <span className="text-black">Design That Captivates</span>
              </motion.div>

              <GradientHeading 
                text="Graphics That Make Jaws Drop"
                className="mb-6"
              />

              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Professional graphic design that transforms your vision into visual masterpieces. 
                From print to digital, we create designs that captivate, communicate, and convert.
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
                  className="btn-award btn-lg-award"
                >
                  Start Your Project
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
                    <Card className="p-6 glass-shine shine-edge-all card-equal-height hover-lift-award text-center">
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
              text="Design Services That Wow"
              className="mb-6"
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive graphic design solutions that elevate your brand
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
                  <Card className="p-6 glass-shine shine-edge-all card-equal-height hover-lift-award h-full text-center">
                    <motion.div
                      className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="h-7 w-7 text-white" />
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
                text="Why Our Designs Win Every Time"
                className="mb-6"
              />
              <p className="text-lg text-gray-600 mb-8">
                We blend creativity with strategy to produce designs that not only look amazing 
                but actually drive business results and customer engagement.
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
                <Card className="p-8 glass-shine shine-edge-all card-equal-height hover-lift-award">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Zap className="h-14 w-14 text-black mb-6" />
                  </motion.div>
                  <h3 className="text-2xl text-black mb-4">
                    Designs That Drive Results
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    Every design we create is backed by strategic thinking and proven design principles. 
                    We don't just make things look pretty—we create visual assets that achieve your business goals.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => onNavigate('contact')}
                      variant="outline"
                      className="w-full border-2 border-black text-black hover:bg-black hover:text-white hover:border-black py-6 transition-all"
                    >
                      Get Started Today
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
              Ready for Designs That Pop?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's create visual masterpieces that captivate your audience and drive real results. 
              Your design revolution starts here.
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
                  className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-lg rounded-[10px] shadow-lg transition-all"
                >
                  Start Your Project
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