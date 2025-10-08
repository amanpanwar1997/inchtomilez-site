/**
 * CENTRALIZED DESIGN SYSTEM
 * Export all design system components from a single location
 * Ensures consistency across the entire InchToMilez website
 */

export { Button } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { Heading, Subheading, BodyText, Label } from './Typography';

export { Section, Container, Grid, Card } from './Section';

// Re-export common design tokens for easy access
export const designTokens = {
  colors: {
    black: '#1a1a1a',
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    },
    white: '#ffffff'
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },
  radius: '10px',
  fonts: {
    heading: "'Antonio', sans-serif",
    body: "'Raleway', sans-serif"
  }
};