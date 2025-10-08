import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { GradientHeading } from '../GradientHeading';
import { Globe, Code, Smartphone, Zap, ArrowRight, CheckCircle, Sparkles, Rocket, ShoppingCart } from 'lucide-react';

interface WebsiteDevelopmentPageProps {
  onNavigate: (page: string) => void;
}

export function WebsiteDevelopmentPage({ onNavigate }: WebsiteDevelopmentPageProps) {
  const services = [
    { icon: Globe, title: 'Responsive Design', description: 'Mobile-first websites that look stunning on every device and screen size' },
    { icon: Code, title: 'Custom Development', description: 'Bespoke websites built with cutting-edge tech and best practices' },
    { icon: ShoppingCart, title: 'E-commerce Solutions', description: 'Powerful online stores that turn browsers into buyers' },
    { icon: Zap, title: 'Performance Optimization', description: 'Lightning-fast websites that rank high and convert like crazy' }
  ];

  const benefits = [
    'Lightning-fast load times that boost conversions',
    'Mobile-responsive designs that work everywhere',
    'SEO-optimized code that ranks and drives traffic',
    'Secure, scalable architecture built to grow',
    'Ongoing maintenance and support included',
    'Complete ownership of your digital asset'
  ];

  const stats = [
    { number: '300+', label: 'Websites Built' },
    { number: '99%', label: 'Uptime Guarantee' },
    { number: '2s', label: 'Load Time' },
    { number: '100%', label: 'Custom Code' }
  ];

  return (
    <div className="min-h-screen text-black bg-white">
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-6xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {['<', '>', '/', '{', '}', '[', ']'][Math.floor(Math.random() * 7)]}
            </motion.div>
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
                <Globe className="h-5 w-5 text-black mr-2 animate-icon-pulse" />
                <span className="text-black">Websites That Work Wonders</span>
              </motion.div>

              <GradientHeading 
                text="Websites That Convert Visitors Into Customers"
                className="mb-6"
              />

              <motion.p 
                className="text-lg text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Custom website development that combines stunning design with powerful functionality. 
                We build fast, secure, and scalable websites that drive real business results.
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
                  Build Your Website
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
              text="Development Services That Deliver"
              className="mb-6"
            />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive web development solutions built for performance and growth
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
                text="Why Our Websites Crush the Competition"
                className="mb-6"
              />
              <p className="text-lg text-gray-600 mb-8">
                We don't just build websites—we engineer digital experiences that captivate visitors, 
                communicate value, and convert like crazy. Every line of code is optimized for results.
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
                    Websites Built to Win
                  </h3>
                  <p className="text-base text-gray-600 mb-6">
                    Every website we develop combines cutting-edge technology with conversion-focused design. 
                    We build digital powerhouses that attract visitors, engage users, and drive measurable business growth.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => onNavigate('contact')}
                      variant="outline"
                      className="w-full border-2 border-black text-black hover:bg-black hover:text-white hover:border-black py-6 transition-all"
                    >
                      Start Your Project
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
              Ready to Launch Your Digital Empire?
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Let's build a website that doesn't just exist online—it dominates. Your digital transformation starts now.
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
                  Build Your Site
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