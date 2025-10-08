# InchToMilez Centralized Design System

## Overview
This document outlines the unified design system implemented across the entire InchToMilez website. All components, pages, and UI elements must follow these strict guidelines for consistency.

## Typography System

### Headings - Antonio Font Family
- **H1/H2**: Antonio Bold (700) - BLACK ONLY (#1a1a1a)
  - Use classes: `heading-xl`, `heading-lg` or native `<h1>`, `<h2>` tags
  - Uppercase for hero titles
  - Line-height: 1.1-1.15
  - Letter-spacing: -0.02em to -0.03em

- **H3/H4/H5/H6**: Antonio Semi-Bold (600) - BLACK ONLY (#1a1a1a)
  - Use classes: `heading-md`, `heading-sm` or native `<h3>`-`<h6>` tags
  - Line-height: 1.2-1.25
  - Letter-spacing: -0.01em

- **Subheadings**: Antonio Semi-Bold (600) - GREY (#525252)
  - Use class: `subheading`
  - Uppercase with letter-spacing: 0.05em

### Body Text - Raleway Font Family
- **Body Large**: Raleway Regular (400) - GREY (#404040)
  - Use class: `body-lg` or native `<p>` tag
  - Font-size: 1rem
  - Line-height: 1.6

- **Body Medium**: Raleway Regular (400) - GREY (#404040)
  - Use class: `body-md`
  - Font-size: 0.875rem (14px)
  - Line-height: 1.6

- **Body Small**: Raleway Regular (400) - GREY (#525252)
  - Use class: `body-sm`
  - Font-size: 0.813rem (13px)
  - Line-height: 1.5

- **Body Extra Small**: Raleway Regular (400) - GREY (#666666)
  - Use class: `body-xs`
  - Font-size: 0.75rem (12px)
  - Line-height: 1.5

### Labels & Form Elements
- **Labels**: Raleway Medium (500) - GREY (#525252)
  - Font-size: 0.813rem (13px)

- **Buttons**: Raleway Semi-Bold (600)
  - Font-size: 0.875rem (14px)

## Color System - STRICT BLACK & WHITE ONLY

### Primary Colors
- **Black**: `#1a1a1a` - Primary text, buttons, UI elements
- **White**: `#ffffff` - Background, button text on dark backgrounds

### Grey Scale (for secondary text and subtle UI)
- **Grey 50**: `#fafafa` - Very light backgrounds
- **Grey 100**: `#f5f5f5` - Hover states
- **Grey 200**: `#e5e5e5` - Borders
- **Grey 300**: `#d4d4d4` - Subtle borders
- **Grey 400**: `#a3a3a3` - Disabled text
- **Grey 500**: `#737373` - Secondary text
- **Grey 600**: `#525252` - Body text (dark)
- **Grey 700**: `#404040` - Body text (darker), secondary buttons
- **Grey 800**: `#262626` - Near black
- **Grey 900**: `#171717` - Darkest grey

### ⚠️ STRICTLY PROHIBITED COLORS
- **NO GREEN**: Not `#baff00`, `#34A853`, or any green shades
- **NO YELLOW**: Not `#ffc60b`, `#FBBC05`, or any yellow shades
- **NO NEON COLORS**: in text, buttons, backgrounds, or borders

### Exception: Colorful Brand Logos & Icons
- Brand logos (client logos, social media icons) may retain their original colors
- Icon illustrations can use colors from `iconColors` utility
- Service/feature icons can be colorful ONLY within icon containers

## Button System

### Primary Button (`btn-award`)
```tsx
<button className="btn-award">
  Button Text
</button>
```
- Background: Black (#1a1a1a)
- Text: White (#ffffff)
- Hover: Grey (#404040)
- Border-radius: 10px
- Padding: 12px 24px (md), 8px 16px (sm), 16px 32px (lg)

### Outline Button (`btn-outline-award`)
```tsx
<button className="btn-outline-award">
  Button Text
</button>
```
- Background: Transparent
- Text: Black (#1a1a1a)
- Border: 2px solid black
- Hover: Black background with white text
- Border-radius: 10px

### Using Design System Button Component
```tsx
import { Button } from './components/design-system';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="outline" size="lg" icon={<ArrowRight />}>
  Learn More
</Button>
```

Variants: `primary`, `secondary`, `outline`, `text`
Sizes: `sm`, `md`, `lg`

## Layout System

### Container System
```tsx
// Standard container with max-width and responsive padding
<div className="container-award">
  Content
</div>

// Or use the component
import { Container } from './components/design-system';

<Container size="lg">
  Content
</Container>
```

Sizes: `sm` (max-w-3xl), `md` (max-w-5xl), `lg` (max-w-7xl), `xl` (max-w-[1400px]), `full`

### Section Spacing
```tsx
// Compact section (48px mobile, 64px desktop)
<section className="section-compact">

// Medium section (64px mobile, 80px desktop)
<section className="section-compact-md">

// Large section (80px mobile, 96px desktop)
<section className="section-compact-lg">

// Or use the component
import { Section } from './components/design-system';

<Section spacing="medium" glassEffect="light">
  Content
</Section>
```

### Grid System (12-Column)
```tsx
// 2-column grid
<div className="grid-compact-2">
  {items.map...}
</div>

// 3-column grid
<div className="grid-compact-3">

// 4-column grid
<div className="grid-compact-4">

// Or use the component
import { Grid } from './components/design-system';

<Grid columns={3} gap="md" equalHeight>
  {items.map...}
</Grid>
```

## Glassmorphism System

All UI elements use ultra-transparent frosted glass effects to reveal the cinematic background.

### Card Variants
```tsx
// Standard glass card
<div className="glass-card">

// Strong glass (more opaque)
<div className="glass-strong">

// Subtle glass (more transparent)
<div className="glass-subtle">

// Ultra glass (most opaque)
<div className="glass-ultra">

// Glass with shine edges
<div className="glass-shine">

// Or use the component
import { Card } from './components/design-system';

<Card variant="card" padding="md" hover>
  Content
</Card>
```

### Section Backgrounds
```tsx
// Light glass background
<section className="glass-section-light">

// Medium glass background
<section className="glass-section-medium">

// Strong glass background
<section className="glass-section-strong">
```

### Input Fields
```tsx
<input className="glass-input" />
<textarea className="glass-input" />
```

## Consistent Border Radius
**ALL UI elements use 10px border radius** - No exceptions

- Buttons: `rounded-[10px]`
- Cards: `rounded-[10px]`
- Inputs: `rounded-[10px]`
- Modals: `rounded-[10px]`
- Dropdowns: `rounded-[10px]`

## Hover Effects

### Standard Lift
```tsx
<div className="hover-lift-award">
  // Lifts -4px on hover with shadow
</div>
```

### Glass Glow
```tsx
<div className="glass-card hover-glass-glow">
  // Increases opacity and shadow on hover
</div>
```

## Icon System

### Icon Containers (with colorful icons)
```tsx
<div className="icon-container-glass">
  <Zap className="w-6 h-6 icon-animated icon-blue" />
</div>
```

### Icon Color Utilities (for brand/feature icons ONLY)
- `icon-blue` - #4285F4
- `icon-red` - #EA4335
- `icon-purple` - #9333EA
- `icon-orange` - #FF9900
- `icon-pink` - #EC4899
- `icon-teal` - #14B8A6
- `icon-indigo` - #6366F1
- `icon-cyan` - #06B6D4

### Icon Animations (NO CIRCULAR ROTATIONS)
- `icon-float` - Gentle vertical float
- `icon-pulse` - Opacity pulse
- `icon-rainbow` - Hue rotation (for special effects only)

## Shadow System

```tsx
// Small shadow
<div className="shadow-award">

// Medium shadow
<div className="shadow-award-md">

// Large shadow
<div className="shadow-award-lg">
```

## Migration Checklist

When updating existing components to the design system:

### Typography
- [ ] Replace inline `font-weight` with typography classes
- [ ] Ensure headings use Antonio, body uses Raleway
- [ ] Remove any green/yellow text colors
- [ ] Use semantic heading tags (h1-h6) or utility classes

### Colors
- [ ] Replace `#baff00` (yellow-green) with black/grey
- [ ] Replace `#ffc60b` (yellow) with black/grey
- [ ] Ensure all buttons are black with white text
- [ ] Use grey scale for secondary text/borders
- [ ] Keep colorful icons only in icon containers

### Buttons
- [ ] Replace custom button styles with `btn-award` or `Button` component
- [ ] Ensure 10px border radius
- [ ] Use proper hover states (grey, not green/yellow)

### Layout
- [ ] Use `container-award` or `Container` component
- [ ] Apply section spacing utilities
- [ ] Use grid utilities for consistent layouts

### Glass Effects
- [ ] Apply appropriate glass card variants
- [ ] Ensure all cards have 10px radius
- [ ] Use glass backgrounds for sections

### Animations
- [ ] Remove circular rotation animations
- [ ] Use gentle float/scale animations
- [ ] Ensure animations are smooth and professional

## Component Imports

All design system components are available from a single import:

```tsx
import { 
  Button, 
  Heading, 
  Subheading, 
  BodyText, 
  Label,
  Section,
  Container,
  Grid,
  Card,
  designTokens
} from './components/design-system';
```

## Design Tokens (JavaScript)

Access design tokens programmatically:

```tsx
import { designTokens } from './components/design-system';

const myStyle = {
  color: designTokens.colors.black,
  padding: designTokens.spacing[6],
  borderRadius: designTokens.radius,
  fontFamily: designTokens.fonts.heading
};
```

## Responsive Design

All components are mobile-first and responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Use Tailwind responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

## Accessibility

- All buttons have proper focus states
- Sufficient color contrast (WCAG AA)
- Semantic HTML structure
- Screen reader friendly
- Keyboard navigation support

## Performance

- All animations respect `prefers-reduced-motion`
- Optimized glassmorphism (GPU-accelerated)
- Lazy loading for images
- Code splitting for pages

---

**Last Updated**: October 2025
**Version**: 2.0
**Status**: Active - All new components must follow this system