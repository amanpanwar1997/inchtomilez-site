/**
 * SOCIAL MEDIA BUTTONS
 * Animated social media buttons with real brand logos
 * Used in header, footer, and contact sections
 */

import { motion } from 'motion/react';
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedInIcon, 
  YouTubeIcon, 
  WhatsAppIcon,
  PinterestIcon,
  TikTokIcon
} from './SocialIcons';

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'large';
}

const SocialButton = ({ href, label, icon: Icon, variant = 'default' }: SocialButtonProps) => {
  const sizes = {
    default: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  const iconSizes = {
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sizes[variant]} glass-card rounded-[10px] flex items-center justify-center group`}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className={`${iconSizes[variant]} transition-transform duration-300 group-hover:scale-110`} />
    </motion.a>
  );
};

export const SocialMediaBar = ({ variant = 'default' }: { variant?: 'default' | 'large' }) => {
  const socialLinks = [
    { href: 'https://facebook.com/inchtomilez', label: 'Facebook', icon: FacebookIcon },
    { href: 'https://twitter.com/inchtomilez', label: 'Twitter', icon: TwitterIcon },
    { href: 'https://instagram.com/inchtomilez', label: 'Instagram', icon: InstagramIcon },
    { href: 'https://linkedin.com/company/inchtomilez', label: 'LinkedIn', icon: LinkedInIcon },
    { href: 'https://youtube.com/@inchtomilez', label: 'YouTube', icon: YouTubeIcon },
  ];

  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <SocialButton 
          key={social.label}
          {...social}
          variant={variant}
        />
      ))}
    </div>
  );
};

export const SocialMediaGrid = () => {
  const socialPlatforms = [
    { href: 'https://facebook.com/inchtomilez', label: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
    { href: 'https://twitter.com/inchtomilez', label: 'Twitter (X)', icon: TwitterIcon, color: '#000000' },
    { href: 'https://instagram.com/inchtomilez', label: 'Instagram', icon: InstagramIcon, color: '#E4405F' },
    { href: 'https://linkedin.com/company/inchtomilez', label: 'LinkedIn', icon: LinkedInIcon, color: '#0A66C2' },
    { href: 'https://youtube.com/@inchtomilez', label: 'YouTube', icon: YouTubeIcon, color: '#FF0000' },
    { href: 'https://wa.me/919009970709', label: 'WhatsApp', icon: WhatsAppIcon, color: '#25D366' },
    { href: 'https://pinterest.com/inchtomilez', label: 'Pinterest', icon: PinterestIcon, color: '#E60023' },
    { href: 'https://tiktok.com/@inchtomilez', label: 'TikTok', icon: TikTokIcon, color: '#000000' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {socialPlatforms.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-6 rounded-[10px] flex flex-col items-center gap-3 group hover-lift-award"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <social.icon className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="text-center">
            <p className="body-sm font-semibold text-primary">{social.label}</p>
            <p className="body-xs text-muted">Follow us</p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};