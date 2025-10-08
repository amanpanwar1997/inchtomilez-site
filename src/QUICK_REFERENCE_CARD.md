# 🎯 InchToMilez - Quick Reference Card

## 1-Minute Cheat Sheet for Developers

---

## 📦 IMPORTS

```tsx
// Design System
import { 
  Button, Heading, BodyText, Label,
  Section, Container, Grid, Card 
} from './components/design-system';

// Icons
import { 
  SocialMediaBar, BrandLogosGrid,
  AnimatedServiceIcon, iconColors,
  GoogleIcon, FacebookIcon
} from './components/icons';
```

---

## 🎨 TYPOGRAPHY

```tsx
// Components
<Heading as="h1" variant="xl">Hero Title</Heading>
<Heading as="h2" variant="lg">Section Title</Heading>
<BodyText variant="md">Paragraph text</BodyText>

// OR Utility Classes
<h1 className="heading-xl">Hero Title</h1>
<h2 className="heading-lg">Section Title</h2>
<p className="body-md">Paragraph text</p>
```

---

## 🔘 BUTTONS

```tsx
// Component
<Button variant="primary" size="md">Click Me</Button>
<Button variant="outline" size="lg">Learn More</Button>

// OR Utility Class
<button className="btn-award">Click Me</button>
<button className="btn-outline-award">Learn More</button>
```

---

## 🎴 LAYOUTS

```tsx
<Section spacing="large" glassEffect="medium">
  <Container size="lg">
    <Grid columns={3} gap="lg">
      <Card variant="card" padding="md" hover>
        Content
      </Card>
    </Grid>
  </Container>
</Section>
```

---

## 🎨 COLORS

```css
/* BLACK & WHITE ONLY - NO GREEN/YELLOW */
Black:    #1a1a1a    (Headings, buttons, UI)
White:    #ffffff    (Backgrounds, button text)
Grey 600: #525252    (Body text)
Grey 700: #404040    (Dark body text)

/* PROHIBITED */
❌ #baff00 (green)
❌ #ffc60b (yellow)
```

---

## ✨ GLASSMORPHISM

```tsx
<div className="glass-card">Standard</div>
<div className="glass-strong">More opaque</div>
<div className="glass-subtle">More transparent</div>
<div className="glass-ultra">Most opaque</div>
```

---

## 🎯 ICONS

```tsx
// Social Bar
<SocialMediaBar variant="default" />

// Brand Logos
<BrandLogosGrid />

// Animated Icon
<AnimatedServiceIcon 
  Icon={Zap} 
  color={iconColors.blue}
  size="md"
  animation="float"
/>

// Tech Logos
<GoogleIcon className="w-12 h-12" />
<MetaIcon className="w-12 h-12" />
```

---

## 📏 SPACING

```css
.section-compact      /* 48-64px padding */
.section-compact-md   /* 64-80px padding */
.section-compact-lg   /* 80-96px padding */

.container-award      /* Max-width 1280px */
```

---

## 🎨 BORDER RADIUS

```css
/* ALWAYS USE 10px */
rounded-[10px]
```

---

## 🎭 ANIMATIONS

```css
.hover-lift-award        /* Lift on hover */
.animate-gentle-float    /* Vertical float */
.animate-gentle-scale    /* Size change */
.animate-gentle-fade     /* Opacity change */

/* ❌ NO circular rotations */
```

---

## 📱 RESPONSIVE

```tsx
// Mobile First
className="w-full sm:w-1/2 lg:w-1/3"

// Breakpoints
sm:  640px+
md:  768px+
lg:  1024px+
xl:  1280px+
```

---

## ⚡ QUICK WINS

```tsx
// 1. Update Button (30 sec)
<button className="btn-award">Text</button>

// 2. Add Social Bar (15 sec)
<SocialMediaBar variant="default" />

// 3. Fix Typography (20 sec)
<h2 className="heading-lg">Title</h2>
<p className="body-md">Text</p>

// 4. Add Glassmorphism (10 sec)
<div className="glass-card p-6 rounded-[10px]">
  Content
</div>

// 5. Add Brand Logos (10 sec)
<BrandLogosGrid />
```

---

## 🚨 RULES

### ✅ ALWAYS
- Use design system components
- Black & white colors only
- 10px border radius
- Glassmorphism on cards
- Real brand logos

### ❌ NEVER
- Green/yellow in UI
- Circular rotation animations
- Different border radius
- Skip glassmorphism
- Use generic icons

---

## 📚 DOCS

- Design System: `DESIGN_SYSTEM_UNIFIED.md`
- Icons: `ICON_ENHANCEMENT_GUIDE.md`
- Complete Guide: `FINAL_WEBSITE_UPDATE.md`
- Transformation: `TRANSFORMATION_COMPLETE.md`

---

## 💡 COMMON PATTERNS

### Service Card
```tsx
<Card variant="card" padding="lg" hover>
  <AnimatedServiceIcon Icon={Zap} color={iconColors.blue} />
  <Heading as="h3" variant="sm" className="mt-4">Title</Heading>
  <BodyText variant="md" className="mt-2">Description</BodyText>
  <Button variant="primary" size="sm" className="mt-4">CTA</Button>
</Card>
```

### Hero Section
```tsx
<Section spacing="large">
  <Container size="xl">
    <div className="glass-card p-12 text-center">
      <Heading as="h1" variant="xl">Title</Heading>
      <BodyText variant="lg" className="mt-6">Description</BodyText>
      <Button variant="primary" size="lg" className="mt-8">CTA</Button>
    </div>
  </Container>
</Section>
```

---

**Keep this card handy for quick reference! 🚀**