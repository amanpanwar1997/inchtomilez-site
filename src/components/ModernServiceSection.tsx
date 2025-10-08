import { motion } from 'motion/react';
import { LucideIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
}

interface ModernServiceSectionProps {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  description: string;
  services: Service[];
  bgStyle?: 'white' | 'gradient' | 'subtle';
  layout?: 'grid' | 'alternating' | 'featured';
}

export function ModernServiceSection({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  services,
  bgStyle = 'white',
  layout = 'grid'
}: ModernServiceSectionProps) {
  const bgClasses = {
    white: 'bg-white',
    gradient: 'bg-gradient-to-b from-gray-50 to-white',
    subtle: 'bg-gradient-to-b from-white to-gray-50'
  };

  if (layout === 'featured' && services.length >= 3) {
    const FeaturedIcon = services[0].icon;
    
    return (
      null
    );
  }

  if (layout === 'alternating') {
    return (
      <section className={`section-compact-md ${bgClasses[bgStyle]}`}>
        <div className="container-award">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="badge-glass mb-4 inline-flex">
              <BadgeIcon className="w-4 h-4 text-black" strokeWidth={2} />
              <span className="subheading text-xs">{badge}</span>
            </div>
            <h2 className="heading-lg mb-3">{title}</h2>
            <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>
          </motion.div>

          {/* Alternating Layout */}
          <div className="space-y-12">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const ServiceIcon = service.icon;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    isEven ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Image/Icon Side */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <TiltCard3D intensity={10}>
                      <div className="glass-card card-compact-lg flex items-center justify-center aspect-square">
                        <div className="icon-container-glass w-24 h-24 p-6">
                          <ServiceIcon className="w-full h-full text-black icon-animated icon-float" strokeWidth={2} />
                        </div>
                      </div>
                    </TiltCard3D>
                  </div>

                  {/* Content Side */}
                  <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
                    <div className="space-y-4">
                      <div className="badge-glass inline-flex">
                        <span className="text-xs">FEATURE {index + 1}</span>
                      </div>
                      <h3 className="heading-md text-2xl">{service.title}</h3>
                      <p className="body-md">{service.description}</p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#baff00] flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="body-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className="btn-award mt-6">
                        Explore This Service
                        <ArrowRight className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Default Grid Layout
  return (
    <section className={`section-compact-md ${bgClasses[bgStyle]}`}>
      <div className="container-award">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="badge-glass mb-4 inline-flex">
            <BadgeIcon className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="subheading text-xs">{badge}</span>
          </div>
          <h2 className="heading-lg mb-3">{title}</h2>
          <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard3D intensity={8}>
                  <div className="glass-card card-compact-md h-full flex flex-col group hover-lift-award">
                    {/* Icon */}
                    <div className="icon-container-glass w-14 h-14 p-3.5 mb-4 group-hover:scale-110 transition-transform">
                      <ServiceIcon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                    </div>

                  {/* Content */}
                  <h3 className="heading-sm text-base mb-3">{service.title}</h3>
                  <p className="body-sm text-muted mb-4">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#baff00] flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="body-xs">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="btn-award w-full btn-sm-award group/btn">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
                  </button>
                </div>
              </TiltCard3D>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}