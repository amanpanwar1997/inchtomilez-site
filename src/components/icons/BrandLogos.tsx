/**
 * BRAND LOGOS SHOWCASE
 * Real client/partner brand logos with glassmorphism containers
 * Used in portfolio, testimonials, and partner sections
 */

import { motion } from 'motion/react';
import { GoogleIcon, MetaIcon, AdobeIcon, ShopifyIcon, WordPressIcon, 
         MailchimpIcon, HubSpotIcon, CanvaIcon, FigmaIcon, SlackIcon, NotionIcon } from './TechIcons';

interface BrandLogoProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  delay?: number;
}

const BrandLogo = ({ icon: Icon, name, delay = 0 }: BrandLogoProps) => (
  <motion.div
    className="glass-card p-6 rounded-[10px] flex items-center justify-center hover-lift-award group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex flex-col items-center gap-3">
      <Icon className="w-12 h-12 transition-transform duration-300 group-hover:scale-110" />
      <span className="body-xs text-muted group-hover:text-primary transition-colors">
        {name}
      </span>
    </div>
  </motion.div>
);

export const BrandLogosGrid = () => {
  const brands = [
    { icon: GoogleIcon, name: 'Google' },
    { icon: MetaIcon, name: 'Meta' },
    { icon: AdobeIcon, name: 'Adobe' },
    { icon: ShopifyIcon, name: 'Shopify' },
    { icon: WordPressIcon, name: 'WordPress' },
    { icon: MailchimpIcon, name: 'Mailchimp' },
    { icon: HubSpotIcon, name: 'HubSpot' },
    { icon: CanvaIcon, name: 'Canva' },
    { icon: FigmaIcon, name: 'Figma' },
    { icon: SlackIcon, name: 'Slack' },
    { icon: NotionIcon, name: 'Notion' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {brands.map((brand, index) => (
        <BrandLogo 
          key={brand.name}
          icon={brand.icon}
          name={brand.name}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
};

// Scrolling brand marquee
export const BrandLogosMarquee = () => {
  const brands = [
    GoogleIcon, MetaIcon, AdobeIcon, ShopifyIcon, WordPressIcon,
    MailchimpIcon, HubSpotIcon, CanvaIcon, FigmaIcon, SlackIcon, NotionIcon
  ];

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...brands, ...brands].map((Icon, index) => (
          <div
            key={index}
            className="flex-shrink-0 glass-subtle p-4 rounded-[10px] w-24 h-24 flex items-center justify-center"
          >
            <Icon className="w-12 h-12 opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};