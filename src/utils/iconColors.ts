/**
 * Icon Color System - Vibrant colors for icons throughout the website
 * Use these colors to add visual interest and hierarchy to icons
 */

export const iconColors = {
  // Primary Brand Colors
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FFC60B',
  green: '#34A853',
  
  // Extended Palette
  purple: '#9333EA',
  orange: '#FF9900',
  pink: '#EC4899',
  teal: '#14B8A6',
  indigo: '#6366F1',
  cyan: '#06B6D4',
  lime: '#84CC16',
  amber: '#F59E0B',
  rose: '#F43F5E',
  violet: '#8B5CF6',
  emerald: '#10B981',
  sky: '#0EA5E9',
  
  // Service Categories
  marketing: '#FF6B6B',
  technology: '#4ECDC4',
  design: '#9B59B6',
  analytics: '#3498DB',
  social: '#E74C3C',
  seo: '#2ECC71',
  content: '#F39C12',
  media: '#E67E22',
  development: '#1ABC9C',
  consulting: '#34495E'
};

/**
 * Predefined color schemes for common use cases
 */
export const iconColorSchemes = {
  // Service categories with vibrant colors
  services: [
    iconColors.blue,
    iconColors.red,
    iconColors.green,
    iconColors.purple,
    iconColors.orange,
    iconColors.teal,
    iconColors.pink,
    iconColors.indigo,
    iconColors.cyan,
    iconColors.amber,
    iconColors.lime,
    iconColors.violet
  ],
  
  // Social media platforms
  social: [
    '#1877F2', // Facebook
    '#E4405F', // Instagram
    '#1DA1F2', // Twitter
    '#FF0000', // YouTube
    '#0A66C2', // LinkedIn
    '#25D366'  // WhatsApp
  ],
  
  // Technology stack
  tech: [
    '#4285F4', // Google
    '#FF9900', // AWS
    '#FFB900', // Microsoft
    '#FF0000', // Adobe
    '#21759B', // WordPress
    '#96BF48'  // Shopify
  ],
  
  // Creative palette
  creative: [
    '#FF6B9D',
    '#C44569',
    '#A29BFE',
    '#6C5CE7',
    '#FD79A8',
    '#FDCB6E',
    '#00B894',
    '#00CEC9'
  ],
  
  // Professional palette
  professional: [
    '#2C3E50',
    '#3498DB',
    '#9B59B6',
    '#E74C3C',
    '#F39C12',
    '#1ABC9C',
    '#34495E',
    '#16A085'
  ]
};

/**
 * Get a color for an icon based on its index
 * Cycles through the color array if index exceeds array length
 */
export function getIconColor(index: number, scheme: string[] = iconColorSchemes.services): string {
  return scheme[index % scheme.length];
}

/**
 * Generate gradient string for SVG icons
 */
export function generateIconGradient(color1: string, color2: string, id: string = 'iconGradient'): string {
  return `url(#${id})`;
}

/**
 * Common icon configurations with colors
 */
export const iconConfigs = {
  // Digital Marketing Services
  digitalMarketing: {
    seo: { color: iconColors.green, name: 'SEO' },
    ppc: { color: iconColors.blue, name: 'PPC' },
    social: { color: iconColors.pink, name: 'Social Media' },
    content: { color: iconColors.orange, name: 'Content Marketing' },
    email: { color: iconColors.purple, name: 'Email Marketing' },
    analytics: { color: iconColors.cyan, name: 'Analytics' },
    conversion: { color: iconColors.amber, name: 'Conversion Rate Optimization' },
    branding: { color: iconColors.violet, name: 'Branding' }
  },
  
  // Technology Services
  technology: {
    web: { color: iconColors.blue, name: 'Web Development' },
    mobile: { color: iconColors.indigo, name: 'Mobile Apps' },
    cloud: { color: iconColors.sky, name: 'Cloud Services' },
    database: { color: iconColors.teal, name: 'Database' },
    api: { color: iconColors.purple, name: 'API Integration' },
    security: { color: iconColors.red, name: 'Security' },
    hosting: { color: iconColors.green, name: 'Hosting' },
    maintenance: { color: iconColors.orange, name: 'Maintenance' }
  },
  
  // Design Services
  design: {
    graphic: { color: iconColors.pink, name: 'Graphic Design' },
    ui: { color: iconColors.purple, name: 'UI Design' },
    ux: { color: iconColors.blue, name: 'UX Design' },
    logo: { color: iconColors.red, name: 'Logo Design' },
    video: { color: iconColors.orange, name: 'Video Production' },
    animation: { color: iconColors.cyan, name: 'Animation' },
    illustration: { color: iconColors.violet, name: 'Illustration' },
    photography: { color: iconColors.amber, name: 'Photography' }
  }
};
