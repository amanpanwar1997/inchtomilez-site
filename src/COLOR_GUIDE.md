# InchToMilez Brand Colors Guide

## 🎨 Brand Color Palette

Based on the official InchToMilez logo, our website uses a vibrant, energetic color palette:

### Primary Colors

#### 1. **Black** - `#000000` / `#1a1a1a`
- **Usage**: Main text, headings (Antonio font), primary buttons, icons
- **Purpose**: Professional, bold, commanding presence
- **Contrast**: High readability on white background
- **Examples**: 
  - All headings (h1-h6)
  - Navigation text
  - Body text for emphasis
  - Primary button backgrounds

#### 2. **Yellow/Gold** - `#FFC60B`
- **Usage**: Secondary accent, "TO" in logo, highlights, special emphasis
- **Purpose**: Energy, optimism, attention-grabbing
- **CSS Variable**: `--secondary: #ffc60b`
- **Examples**:
  - Logo "TO" text
  - Secondary highlights in text
  - Alternating accent lines in parallax
  - Icon accents
  - Trust badge highlights
  - Gradient combinations with green

#### 3. **Bright Green** - `#BAFF00`
- **Usage**: Primary accent, CTAs, hover states, active elements
- **Purpose**: Innovation, growth, success
- **CSS Variable**: `--primary: #baff00`
- **Examples**:
  - Primary CTAs
  - Link hover states
  - Active navigation items
  - Accent lines
  - Success indicators
  - Scroll progress bar

### Supporting Colors

#### 4. **White** - `#FFFFFF`
- **Usage**: Background, card backgrounds, glassmorphism
- **Purpose**: Clean, modern, spacious
- **Examples**:
  - Main background
  - Glass card backgrounds
  - Button text on dark backgrounds
  - Navigation background

#### 5. **Gray Variants**
- **Light Gray**: `#F8F8F8` - Subtle backgrounds
- **Medium Gray**: `#666666` - Secondary text
- **Dark Gray**: `#444442` - Tertiary text
- **Border Gray**: `#E5E5E5` - Borders, dividers

---

## 🌈 Color Combinations

### Brand Gradient
```css
/* Yellow to Green */
background: linear-gradient(90deg, #ffc60b 0%, #baff00 100%);
```
**Usage**: Premium features, special headings, scroll progress

### Glassmorphism Accents
```css
/* Yellow Glass */
background: rgba(255, 198, 11, 0.08);
border: 1px solid rgba(255, 198, 11, 0.15);

/* Green Glass */
background: rgba(186, 255, 0, 0.08);
border: 1px solid rgba(186, 255, 0, 0.15);
```

### Text Gradients
```css
/* Brand Gradient Text */
.text-gradient-brand {
  background: linear-gradient(90deg, #ffc60b 0%, #baff00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 📋 Usage Guidelines

### When to Use Yellow (#FFC60B)

✅ **DO USE for:**
- Logo "TO" text
- Secondary emphasis in copy
- Alternating with green in patterns
- Icon accents (every 2-3 items)
- Badge highlights
- Special announcements
- Premium feature indicators
- Gradient combinations

❌ **DON'T USE for:**
- Large background areas
- Primary CTAs (use green)
- Main body text
- Excessive use (keep it special)

### When to Use Green (#BAFF00)

✅ **DO USE for:**
- Primary CTAs
- Active navigation states
- Link hover effects
- Success messages
- Scroll indicators
- Primary accents
- Call-to-action buttons
- Interactive elements

❌ **DON'T USE for:**
- Main body text (use black/gray)
- Large background areas
- Subtle elements

### When to Use Black (#000000)

✅ **DO USE for:**
- All headings (Antonio font)
- Important body text
- Navigation items
- Icons
- Primary button backgrounds
- Borders (with opacity)
- Strong emphasis

### When to Use White (#FFFFFF)

✅ **DO USE for:**
- Main background
- Card backgrounds (with glassmorphism)
- Text on dark backgrounds
- Spacing and breathing room
- Clean, minimal sections

---

## 🎯 Practical Examples

### Buttons

```tsx
// Primary CTA - Black with Green hover
<button className="bg-black text-white hover:bg-[#baff00] hover:text-black">
  Get Started
</button>

// Secondary CTA - Outline with Yellow accent
<button className="border-2 border-black hover:border-[#ffc60b]">
  Learn More
</button>

// Brand Gradient Button (Premium)
<button className="bg-gradient-to-r from-[#ffc60b] to-[#baff00]">
  Premium Feature
</button>
```

### Text Emphasis

```tsx
// Yellow emphasis
<p>We make brands <span className="text-[#ffc60b] font-semibold">shine</span></p>

// Green emphasis
<p>Results that <span className="text-[#baff00] font-semibold">dominate</span></p>

// Brand gradient
<h2 className="text-gradient-brand">Premium Heading</h2>
```

### Icons

```tsx
// Alternating colors
{items.map((item, i) => (
  <Icon className={i % 3 === 0 ? 'text-[#ffc60b]' : 'text-black'} />
))}
```

### Cards

```tsx
// Yellow glass card
<div className="glass-yellow p-6 rounded-3xl">
  Premium Content
</div>

// Brand gradient border
<div className="border-2 border-transparent bg-gradient-to-r from-[#ffc60b] to-[#baff00] bg-clip-border">
  Featured Card
</div>
```

---

## 🎨 Accessibility

### Contrast Ratios

| Combination | Ratio | WCAG Level | Usage |
|-------------|-------|------------|-------|
| Black on White | 21:1 | AAA | Body text, headings |
| White on Black | 21:1 | AAA | Buttons, dark sections |
| Yellow on White | 1.9:1 | ❌ Fail | Decorative only |
| Green on White | 1.4:1 | ❌ Fail | Decorative only |
| Yellow on Black | 11:1 | AAA | Text on dark BG |
| Green on Black | 15:1 | AAA | Text on dark BG |

**Important**: Never use yellow or green for body text on white backgrounds. Only use for decorative accents, icons, and emphasis.

---

## 🔧 CSS Utilities

### Available Classes

```css
/* Text Colors */
.text-gradient-yellow     /* Yellow text */
.text-gradient-green      /* Green text */
.text-gradient-brand      /* Yellow → Green gradient */

/* Backgrounds */
.glass-yellow            /* Yellow glassmorphism */
.glass-green             /* Green glassmorphism */
.glass-brand             /* Brand gradient glass */

/* Glows */
.glow-yellow            /* Yellow glow effect */
.glow-green             /* Green glow effect */
.glow-brand             /* Dual-color glow */

/* Borders */
.border-[#ffc60b]       /* Yellow border */
.border-[#baff00]       /* Green border */
```

---

## 📱 Responsive Color Usage

- **Mobile**: Use colors sparingly, focus on black/white for clarity
- **Tablet**: Introduce more yellow/green accents
- **Desktop**: Full color palette with gradients and effects

---

## 🎭 Color Psychology

### Yellow (#FFC60B)
- **Emotion**: Energy, optimism, warmth
- **Association**: Success, innovation, creativity
- **Effect**: Grabs attention, creates excitement

### Green (#BAFF00)
- **Emotion**: Growth, freshness, vitality
- **Association**: Innovation, progress, success
- **Effect**: Encourages action, modern feel

### Black (#000000)
- **Emotion**: Power, sophistication, authority
- **Association**: Premium, professional, bold
- **Effect**: Commands respect, creates contrast

### White (#FFFFFF)
- **Emotion**: Purity, simplicity, space
- **Association**: Modern, clean, minimal
- **Effect**: Enhances focus, provides breathing room

---

## 🎨 Logo Color Extraction

From the official InchToMilez logo:
- **Avatar**: Bald man with glasses (brand mascot)
- **"INCH"**: Black (#000000)
- **"TO"**: Yellow (#FFC60B) ⭐
- **"MILEZ"**: Black (#000000)
- **Tagline**: "THE BHRAHMAASTRA FOR BRANDS" - Black

**Color Distribution**:
- 70% Black (dominance, professionalism)
- 20% Yellow (energy, accent)
- 10% Green (innovation, CTA)

---

## ✨ Special Effects

### Hover States
```css
/* Yellow hover glow */
.hover-glow-yellow:hover {
  box-shadow: 0 0 20px rgba(255, 198, 11, 0.4);
}

/* Green hover glow */
.hover-glow-green:hover {
  box-shadow: 0 0 20px rgba(186, 255, 0, 0.4);
}
```

### Animated Gradients
```css
/* Animated brand gradient */
.animate-brand-gradient {
  background: linear-gradient(90deg, #ffc60b, #baff00, #ffc60b);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}
```

---

**Last Updated**: October 1, 2025  
**Version**: 2.0  
**Based on**: Official InchToMilez Logo
