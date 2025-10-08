# Theme Consistency Guide - InchToMilez Website

## Design System Overview
InchToMilez follows a **monochromatic design** with **bold accent colors** and **glassmorphism** throughout.

---

## Color Palette

### Primary Colors
```css
--white: #ffffff          /* Main background */
--black: #1a1a1a          /* Primary text, CTAs */
--bright-green: #baff00   /* Primary accent, CTAs, highlights */
--yellow: #ffc60b         /* Secondary accent (from logo) */
```

### Neutral Colors
```css
--light-gray: #f8f8f8     /* Alternate backgrounds */
--gray: #666666           /* Muted text, descriptions */
--border-gray: #e5e5e5    /* Borders, dividers */
--dark-gray: #444442      /* Strong text */
```

### Usage Guidelines
- **White**: All section backgrounds, cards, overlays
- **Black**: Headlines, body text, hover states
- **Green (#baff00)**: Primary CTAs, active states, highlights, badges
- **Yellow (#ffc60b)**: Secondary CTAs, accents, decorative elements
- **Light Gray**: Alternating sections, subtle backgrounds
- **Gray**: Supporting text, descriptions, labels

---

## Typography System

### Font Families
```css
/* Headings - ALWAYS Antonio */
font-family: 'Antonio', sans-serif;

/* Body Text - ALWAYS Raleway */
font-family: 'Raleway', sans-serif;
```

### Heading Scales (Antonio)
```css
.heading-xl  → 2rem to 3.25rem (clamp, responsive)
.heading-lg  → 1.75rem to 2.5rem
.heading-md  → 1.35rem to 1.875rem  
.heading-sm  → 1.25rem to 1.75rem
```

### Body Text (Raleway)
```css
.body-lg → 1.125rem to 1.25rem
.body-md → 1rem (base size)
.body-sm → 0.875rem
```

### Font Weights
- **Antonio**: 500 (medium), 600 (semibold), 700 (bold)
- **Raleway**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Line Heights
- **Headings**: 1.15 - 1.25 (tight, punchy)
- **Body**: 1.6 - 1.7 (readable, comfortable)
- **Labels**: 1.5 (compact)

### Letter Spacing
- **Large Headings**: -0.03em (tighter)
- **Medium Headings**: -0.02em
- **Body Text**: Default (0)

---

## Glassmorphism Effects

### Glass Variants
```css
.glass              /* Standard glass effect */
.glass-strong       /* More pronounced glass */
.glass-card         /* For card elements */
.glass-subtle       /* Very light glass */
.glass-ultra        /* Ultra-modern glass with hover */
.glass-ultra-strong /* Maximum glassmorphism */
.glass-ultra-light  /* Minimal glass effect */
```

### Glass Characteristics
- **Background**: rgba(255, 255, 255, 0.4-0.85)
- **Backdrop Filter**: blur(10px-32px)
- **Border**: 1px solid rgba(0, 0, 0, 0.05-0.08)
- **Shadow**: Soft, layered shadows

### When to Use
- **glass**: General overlays, navigation
- **glass-strong**: Important cards, CTAs
- **glass-card**: Service cards, feature boxes
- **glass-subtle**: Decorative elements, backgrounds

---

## Component Patterns

### Buttons

#### Primary Button (Green CTA)
```css
Background: #baff00
Text: #000000
Hover: Scale 1.05, darken background
Active: Scale 0.95
Shadow: Medium to dramatic on hover
```

#### Secondary Button (Black)
```css
Background: #000000
Text: #ffffff
Hover: Background → #baff00, Text → #000000
Active: Scale 0.95
```

#### Ghost Button
```css
Background: transparent
Border: 1px solid #000000
Text: #000000
Hover: Background → #000000, Text → #ffffff
```

### Cards

#### Standard Card
```css
.glass-card
padding: 5-10 (responsive)
border-radius: 1rem - 2rem
hover: translateY(-8px), scale(1.02)
shadow: soft → dramatic on hover
```

#### Service Card
```css
.glass-card with .hover-lift
Icon: 56px-64px, rounded bg
Title: .heading-sm
Description: .body-md, gray-600
CTA: Arrow or "Learn More"
```

### Sections

#### Section Structure
```tsx
<section className="section-spacing bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Badge */}
    <Badge className="bg-baff00 text-black">CATEGORY</Badge>
    
    {/* Heading */}
    <h2 className="heading-lg mb-6">Title</h2>
    
    {/* Description */}
    <p className="body-lg text-gray-700">Description</p>
    
    {/* Content Grid */}
    <div className="grid-responsive-3">
      {/* Cards */}
    </div>
    
    {/* CTA */}
    <CTAButton>Action</CTAButton>
  </div>
</section>
```

#### Alternating Backgrounds
```
Section 1: bg-white
Section 2: bg-gray-50
Section 3: bg-white
Section 4: bg-gray-50
...and so on
```

---

## Animation Standards

### Timing Functions
```css
/* Entrance Animations */
cubic-bezier(0.34, 1.56, 0.64, 1)  /* Springy */

/* Hover Effects */
ease or cubic-bezier(0.4, 0, 0.2, 1)

/* Click/Tap */
ease or ease-out

/* Page Transitions */
cubic-bezier(0.4, 0, 0.2, 1)
```

### Duration Standards
```css
Micro-interactions: 0.2s
Hover effects: 0.3s
Entrances: 0.6s - 0.8s
Page transitions: 0.4s
Scroll animations: 0.8s - 1s
```

### Animation Types
- **Entrance**: fadeIn, slideUp, scaleIn
- **Hover**: scale, translateY, rotate
- **Icon**: float, pulse, bounce, swing
- **Background**: shimmer, gradient shift

---

## Spacing System

### Section Spacing (Vertical)
```css
.section-spacing    → py-16 sm:py-20 lg:py-24 xl:py-28
.section-spacing-sm → py-12 sm:py-16 lg:py-20 xl:py-24
.section-spacing-lg → py-20 sm:py-28 lg:py-32 xl:py-40
```

### Container Padding (Horizontal)
```css
Mobile: px-4
Tablet: px-6
Desktop: px-8
```

### Component Gaps
```css
gap-4   → 1rem (mobile/tablet)
gap-6   → 1.5rem (desktop)
gap-8   → 2rem (large desktop)
```

### Card Padding
```css
.card-spacing    → p-5 sm:p-6 lg:p-8 xl:p-10
.card-spacing-sm → p-4 sm:p-5 lg:p-6 xl:p-7
.card-spacing-lg → p-6 sm:p-8 lg:p-10 xl:p-12
```

---

## Shadow System

### Shadow Levels
```css
.shadow-soft      /* Subtle elevation */
.shadow-medium    /* Standard cards */
.shadow-strong    /* Important elements */
.shadow-dramatic  /* Hero elements, modals */
```

### Usage
- **Soft**: Subtle cards, overlays
- **Medium**: Service cards, features
- **Strong**: CTAs, important cards
- **Dramatic**: Modals, floating elements, header

---

## Border Radius Standards

```css
sm:  0.375rem (6px)  - Badges, tags
md:  0.5rem (8px)    - Inputs, small buttons
lg:  0.75rem (12px)  - Buttons, small cards
xl:  1rem (16px)     - Cards, modals
2xl: 1.5rem (24px)   - Large cards
3xl: 2rem (32px)     - Hero elements
```

---

## Icon System

### Icon Sizes
```css
xs: 14px - 16px (inline icons)
sm: 18px - 20px (buttons)
md: 24px - 28px (features)
lg: 32px - 40px (headers)
xl: 48px - 64px (hero)
```

### Icon Animations
```css
.animate-icon-float   /* Gentle up/down */
.animate-icon-pulse   /* Scale in/out */
.animate-icon-bounce  /* Playful bounce */
.animate-icon-rotate  /* Continuous spin */
.animate-icon-swing   /* Side to side */
```

---

## Badge System

### Primary Badge (Green)
```tsx
<Badge className="bg-[#baff00] text-black">
  <Icon /> LABEL
</Badge>
```

### Secondary Badge (Black)
```tsx
<Badge className="bg-black text-white">
  <Icon /> LABEL
</Badge>
```

### Usage
- Always uppercase
- Include icon for visual interest
- 2-4 words maximum
- Place above headings

---

## CTA (Call-to-Action) Patterns

### Primary CTA
```tsx
<CTAButton 
  variant="primary"
  icon={Rocket}
>
  ACTION TEXT
</CTAButton>
```
- Green background
- Black text
- Rocket/Arrow icon
- Action-oriented text: "LET'S TALK", "GET STARTED"

### Secondary CTA
```tsx
<CTAButton 
  variant="secondary"
  icon={ArrowRight}
>
  ACTION TEXT
</CTAButton>
```
- Black background (or transparent with border)
- White text
- Arrow icon
- Exploratory text: "LEARN MORE", "VIEW PORTFOLIO"

### CTA Placement
- Hero section: 2 CTAs (Primary + Secondary)
- End of sections: 1 CTA (usually Primary)
- Between major content: Secondary CTAs
- Footer: Multiple contact CTAs

---

## Grid Patterns

### 2-Column Grid
```tsx
<div className="grid-responsive-2">
  {/* 1 col mobile, 2 cols tablet+ */}
</div>
```

### 3-Column Grid (Most Common)
```tsx
<div className="grid-responsive-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### 4-Column Grid
```tsx
<div className="grid-responsive-4">
  {/* 1 col mobile, 2 cols tablet, 3 cols laptop, 4 cols desktop */}
</div>
```

---

## Image Treatment

### Image Overlays
- Always use glassmorphism overlays on images
- Ensure text readability (contrast ratio 4.5:1+)
- Use gradient overlays when needed

### Image Sizes
- Hero: Full width, 60-80vh
- Feature images: 400px - 800px
- Thumbnails: 300px - 400px
- Icons: SVG preferred, PNG fallback

---

## Form Elements

### Input Fields
```css
Background: #f5f5f5
Border: 1px solid #e5e5e5
Focus: Ring #baff00, Border #baff00
Padding: px-4 py-3
Border-radius: 0.5rem
```

### Textareas
- Same as inputs
- Min height: 120px
- Resize: vertical only

### Checkboxes/Radio
- Custom styled
- Green (#baff00) when checked
- Clear focus states

---

## Accessibility Standards

### Contrast Ratios
- **Normal text**: 4.5:1 minimum
- **Large text (18px+)**: 3:1 minimum
- **Interactive elements**: 3:1 minimum

### Focus States
```css
focus:outline-none
focus:ring-2
focus:ring-[#baff00]
focus:ring-offset-2
```

### Touch Targets
- Minimum: 44px × 44px
- Preferred: 48px × 48px
- Spacing between targets: 8px minimum

---

## Page-Specific Patterns

### Homepage
- Stacked scroll sections (100vh each)
- Alternating white/gray backgrounds
- 6 main sections
- Hero with stats
- Services showcase
- Social proof
- Final CTA
- FAQ

### Service Pages
- Hero with badge
- Service overview
- Features grid (3-col)
- Process steps
- Pricing/packages
- Case studies
- FAQ
- CTA section

### Contact Page
- Form + contact info split
- Map integration
- Social links
- Office hours
- Quick contact buttons

---

## Content Guidelines

### Headings
- **Bold and punchy**, not descriptive
- Use power words: DOMINATE, EXPLOSIVE, UNSTOPPABLE
- Ask questions when appropriate
- Keep under 10 words

### Body Copy
- **Short paragraphs** (2-3 sentences)
- Use **bold** and *italics* for emphasis
- Include numbers and stats
- Action-oriented language
- Conversational tone

### CTAs
- **Urgent**: "LET'S DOMINATE TOGETHER"
- **Action-first**: "START YOUR PROJECT"
- **Value-driven**: "GET FREE CONSULTATION"
- **Direct**: "CALL NOW"

---

## File Organization

### Component Structure
```
/components
  /pages         - Full page components
  /ui            - ShadCN components
  ThemeComponents.tsx - Shared theme components
  ResponsiveContainer.tsx - Responsive utilities
```

### CSS Organization
```
/styles
  globals.css - All global styles, organized by:
    - Base styles
    - Typography
    - Glassmorphism
    - Utilities
    - Animations
    - Responsive
```

---

## Quality Checklist

Before pushing any component:

- [ ] Uses Antonio for headings
- [ ] Uses Raleway for body text
- [ ] Follows color palette (no random colors)
- [ ] Has glassmorphism where appropriate
- [ ] Is fully responsive (mobile-first)
- [ ] Has proper spacing (section-spacing, etc.)
- [ ] Includes hover states
- [ ] Has focus states for accessibility
- [ ] Uses consistent shadows
- [ ] Follows animation standards
- [ ] Has proper contrast ratios
- [ ] Touch targets are 44px minimum
- [ ] Loads fast (optimized images, lazy loading)

---

**InchToMilez - Where Consistency Meets Excellence** ✨
