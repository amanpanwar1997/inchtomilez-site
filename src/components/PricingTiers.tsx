import { CheckCircle2, Zap, Rocket, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { TiltCard3D } from './TiltCard3D';

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  icon?: 'zap' | 'rocket' | 'crown';
  cta?: string;
  badge?: string;
}

interface PricingTiersProps {
  title?: string;
  description?: string;
  tiers: PricingTier[];
  currency?: string;
}

export function PricingTiers({ 
  title = 'Simple, Transparent Pricing',
  description = 'Choose the perfect plan for your business needs',
  tiers,
  currency = '₹'
}: PricingTiersProps) {
  const iconMap = {
    zap: Zap,
    rocket: Rocket,
    crown: Crown
  };

  return (
    <section className="section-compact-md">
      <div className="container-award">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="badge-glass mb-4 inline-flex">
            <Crown className="w-4 h-4 text-black" strokeWidth={2} />
            <span className="subheading text-xs">PRICING</span>
          </div>
          <h2 className="heading-lg mb-3">{title}</h2>
          <p className="body-md text-muted max-w-2xl mx-auto">{description}</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, index) => {
            const Icon = tier.icon ? iconMap[tier.icon] : Zap;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard3D intensity={tier.highlighted ? 15 : 10}>
                  <div 
                    className={`glass-card card-compact-lg h-full flex flex-col relative ${
                      tier.highlighted ? 'ring-2 ring-[#baff00] shadow-award-lg' : ''
                    }`}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <div className="absolute top-0 right-0 translate-x-3 -translate-y-3">
                        <div className="badge-glass">
                          <span className="text-xs">{tier.badge}</span>
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="icon-container-glass w-12 h-12 p-3 mb-4">
                      <Icon className="w-full h-full text-black icon-animated" strokeWidth={2} />
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="heading-md text-xl mb-1">{tier.name}</h3>
                      <p className="body-sm text-muted">{tier.tagline}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-muted body-md">{currency}</span>
                        <span className="heading-xl">{tier.price}</span>
                        {tier.period && (
                          <span className="text-muted body-sm">/{tier.period}</span>
                        )}
                      </div>
                      <p className="body-sm mt-2">{tier.description}</p>
                    </div>

                    {/* Features */}
                    <div className="flex-grow mb-6">
                      <ul className="space-y-3">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#baff00] flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="body-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button 
                      className={`btn-award w-full ${tier.highlighted ? 'shadow-award-lg' : ''}`}
                    >
                      {tier.cta || 'Get Started'}
                    </button>
                  </div>
                </TiltCard3D>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="body-sm text-muted">
            Need a custom plan? <button className="text-black hover:text-[#baff00] transition-colors underline">Contact us</button> for tailored solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Example usage data
export const samplePricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'Perfect for small businesses',
    price: '15,000',
    period: 'month',
    description: 'Essential digital marketing to get you started',
    icon: 'zap',
    features: [
      'Social Media Management (2 platforms)',
      'Content Creation (8 posts/month)',
      'Basic SEO Optimization',
      'Monthly Performance Report',
      'Email Support'
    ],
    cta: 'Start Free Trial'
  },
  {
    name: 'Professional',
    tagline: 'Most popular for growing brands',
    price: '35,000',
    period: 'month',
    description: 'Comprehensive marketing for serious growth',
    icon: 'rocket',
    highlighted: true,
    badge: 'MOST POPULAR',
    features: [
      'Social Media Management (4 platforms)',
      'Content Creation (20 posts/month)',
      'Advanced SEO & Google Ads',
      'Website Maintenance',
      'Lead Generation Campaigns',
      'Weekly Performance Reports',
      'Priority Support',
      'Dedicated Account Manager'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Enterprise',
    tagline: 'For established businesses',
    price: '75,000',
    period: 'month',
    description: 'Full-service marketing domination',
    icon: 'crown',
    features: [
      'All Professional Features',
      'Multi-Channel Campaigns',
      'Custom Website Development',
      'Video Production & Animation',
      'Influencer Marketing',
      'PR & Media Relations',
      'Real-time Analytics Dashboard',
      '24/7 Premium Support',
      'Strategic Consulting'
    ],
    cta: 'Contact Sales'
  }
];