# Developer Quick Reference - InchToMilez

## 🎨 Colors (Copy-Paste Ready)

```tsx
// Primary
bg-[#baff00]  // Green accent
bg-[#ffc60b]  // Yellow accent
bg-white      // White background
bg-black      // Black elements

// Text
text-black          // Primary text (#1a1a1a)
text-gray-700       // Secondary text
text-gray-600       // Muted text
text-[#baff00]      // Green accent text
text-[#ffc60b]      // Yellow accent text

// Borders
border-black/10     // 10% black
border-black/5      // 5% black
border-gray-200     // Light border
```

---

## 📐 Spacing (Quick Copy)

```tsx
// Section Spacing
className="section-spacing"        // py-16 sm:py-20 lg:py-24 xl:py-28
className="section-spacing-sm"     // py-12 sm:py-16 lg:py-20 xl:py-24
className="section-spacing-lg"     // py-20 sm:py-28 lg:py-32 xl:py-40

// Card Spacing
className="card-spacing"           // p-5 sm:p-6 lg:p-8 xl:p-10
className="card-spacing-sm"        // p-4 sm:p-5 lg:p-6 xl:p-7
className="card-spacing-lg"        // p-6 sm:p-8 lg:p-10 xl:p-12

// Container
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

---

## 🔤 Typography (Copy-Paste)

```tsx
// Headings (Always Antonio)
<h1 className="heading-xl">        {/* 2rem → 3.25rem */}
<h2 className="heading-lg">        {/* 1.75rem → 2.5rem */}
<h3 className="heading-md">        {/* 1.35rem → 1.875rem */}
<h4 className="heading-sm">        {/* 1.25rem → 1.75rem */}

// Body Text (Always Raleway)
<p className="body-lg">            {/* 1.125rem → 1.25rem */}
<p className="body-md">            {/* 1rem */}
<p className="body-sm">            {/* 0.875rem */}

// Responsive Text
<p className="text-responsive-xs"> {/* text-xs sm:text-sm */}
<p className="text-responsive-sm"> {/* text-sm sm:text-base */}
<p className="text-responsive-base"> {/* text-base sm:text-lg */}
<p className="text-responsive-lg"> {/* text-lg sm:text-xl lg:text-2xl */}
```

---

## 🎴 Glassmorphism (Quick Variants)

```tsx
className="glass"              // Standard glass effect
className="glass-strong"       // More pronounced
className="glass-card"         // For cards
className="glass-subtle"       // Very light
className="glass-ultra"        // Ultra-modern with hover
className="glass-ultra-strong" // Maximum effect
className="glass-ultra-light"  // Minimal effect
```

---

## 📦 Component Templates

### Button (Primary CTA)
```tsx
<button className="px-6 py-3 bg-[#baff00] hover:bg-[#a8e600] text-black font-medium rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105">
  {children}
</button>
```

### Button (Secondary)
```tsx
<button className="px-6 py-3 bg-black hover:bg-[#baff00] text-white hover:text-black font-medium rounded-xl shadow-medium transition-all duration-300">
  {children}
</button>
```

### Glass Card
```tsx
<div className="glass-card p-6 sm:p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
  {children}
</div>
```

### Section Template
```tsx
<section className="section-spacing bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Badge */}
    <div className="text-center mb-8">
      <span className="inline-block px-4 py-2 bg-[#baff00] text-black rounded-full text-sm font-medium">
        CATEGORY
      </span>
    </div>
    
    {/* Heading */}
    <h2 className="heading-lg text-center mb-6">
      Your Heading Here
    </h2>
    
    {/* Description */}
    <p className="body-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
      Your description here
    </p>
    
    {/* Content Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Your cards here */}
    </div>
  </div>
</section>
```

---

## 🌊 Animation Classes

```tsx
// Entrance
className="animate-fade-in"
className="animate-slide-up"
className="animate-scale-in"
className="animate-bounce-in"

// Hover
className="hover-lift"              // translateY(-8px) + scale(1.02)
className="hover-lift-small"        // translateY(-4px) + scale(1.01)
className="hover-scale-sm"          // scale(1.03)
className="hover-scale-md"          // scale(1.05)
className="hover-scale-lg"          // scale(1.08)

// Icon Animations
className="animate-icon-float"
className="animate-icon-pulse"
className="animate-icon-bounce"
className="animate-icon-rotate"
className="animate-icon-swing"
```

---

## 📱 Responsive Grid

```tsx
// 2 Columns
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
  {children}
</div>

// 3 Columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  {children}
</div>

// 4 Columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
  {children}
</div>

// Or use utility classes
<div className="grid-responsive-2">  {/* Auto 2-col */}
<div className="grid-responsive-3">  {/* Auto 3-col */}
<div className="grid-responsive-4">  {/* Auto 4-col */}
```

---

## 🎯 Common Patterns

### Service Card
```tsx
<div className="glass-card p-6 hover-lift rounded-2xl">
  <div className="w-14 h-14 bg-black/5 rounded-xl flex items-center justify-center mb-4">
    <Icon className="w-7 h-7" />
  </div>
  <h3 className="heading-sm mb-3">Service Name</h3>
  <p className="body-sm text-gray-600 mb-4">Description</p>
  <button className="flex items-center gap-2 text-sm font-medium hover:text-[#baff00]">
    Learn More <ArrowRight className="w-4 h-4" />
  </button>
</div>
```

### Stat Card
```tsx
<div className="glass-card p-6 text-center">
  <div className="text-4xl font-antonio text-black mb-2">
    500+
  </div>
  <div className="text-sm text-gray-600">
    Happy Clients
  </div>
</div>
```

### Badge
```tsx
<span className="inline-flex items-center gap-2 px-4 py-2 bg-[#baff00] text-black rounded-full text-sm font-medium">
  <Icon className="w-4 h-4" />
  LABEL TEXT
</span>
```

---

## 🔧 Utility Combinations

### Card with Hover Effect
```tsx
className="glass-card p-8 rounded-2xl shadow-soft hover:shadow-strong hover-lift transition-all duration-300"
```

### Centered Section
```tsx
className="section-spacing bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto">
      {/* Content */}
    </div>
  </div>
</section>
```

### Full-Width Hero
```tsx
className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Content */}
  </div>
</div>
```

---

## 📦 Import Statements

```tsx
// Theme Components
import { CTAButton, GlassCard, StatCard } from './components/ThemeComponents';

// Responsive Components
import { 
  ResponsiveContainer, 
  ResponsiveSection, 
  ResponsiveGrid,
  ResponsiveFlex,
  ResponsiveText 
} from './components/ResponsiveContainer';

// Utility Components
import { AnimatedIcon } from './components/AnimatedIcon';
import { FloatingParticles, GlowEffect } from './components/VisualEffects';

// UI Components
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';

// Icons
import { 
  Rocket, 
  ArrowRight, 
  Phone, 
  Mail,
  // ... more icons
} from 'lucide-react';

// Motion
import { motion } from 'motion/react';
```

---

## 🎨 Framer Motion Patterns

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
```

### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
```

### Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

### Hover Effect
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {children}
</motion.div>
```

### Stagger Children
```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🚀 Performance Tips

```tsx
// Lazy Load Images
<img loading="lazy" src="..." alt="..." />

// Optimize Re-renders
const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);
const memoizedCallback = useCallback(() => {}, [deps]);

// Lazy Load Components
const Component = lazy(() => import('./Component'));

// Suspense Wrapper
<Suspense fallback={<Loader />}>
  <Component />
</Suspense>

// GPU Acceleration
className="transform-gpu will-change-transform"
```

---

## 🐛 Common Issues & Fixes

### Issue: Layout Shift
```tsx
// ❌ Bad
<img src="..." />

// ✅ Good
<img src="..." width={400} height={300} className="w-full h-auto" />
```

### Issue: Hydration Mismatch
```tsx
// ❌ Bad
{new Date().toString()}

// ✅ Good
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return null;
```

### Issue: Slow Animations
```tsx
// ❌ Bad
className="transition-all"

// ✅ Good (only animate specific properties)
className="transition-transform transition-opacity"
```

---

## 📝 Code Snippets

### Create New Page Template
```tsx
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { CTAButton } from '../ThemeComponents';

interface PageNameProps {
  onNavigate: (page: string) => void;
}

export function PageName({ onNavigate }: PageNameProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#baff00] text-black">
              CATEGORY
            </Badge>
            <h1 className="heading-xl mb-6">
              Page Title
            </h1>
            <p className="body-lg text-gray-700 max-w-3xl mx-auto">
              Description
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-spacing bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CTAButton 
            variant="primary"
            onClick={() => onNavigate('contact')}
          >
            GET STARTED
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
```

---

## 🎯 SEO Checklist

```tsx
// Page Title
<title>Page Title | InchToMilez</title>

// Meta Description
<meta name="description" content="..." />

// Open Graph
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />

// Heading Hierarchy
<h1>Main Title (only one per page)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

// Alt Text
<img src="..." alt="Descriptive alt text" />

// Semantic HTML
<header>, <nav>, <main>, <section>, <article>, <footer>
```

---

## 🔍 Accessibility Checklist

```tsx
// Keyboard Navigation
tabIndex={0}
onKeyPress={(e) => e.key === 'Enter' && handleClick()}

// ARIA Labels
aria-label="Descriptive label"
aria-labelledby="element-id"
aria-describedby="description-id"

// Focus States
focus:outline-none focus:ring-2 focus:ring-[#baff00] focus:ring-offset-2

// Skip Links
<a href="#main-content" className="skip-to-content">
  Skip to main content
</a>

// Alt Text
alt="Meaningful description"

// Color Contrast
// Ensure 4.5:1 for normal text
// Ensure 3:1 for large text (18px+)
```

---

## 💾 Save These Snippets!

Keep this file handy for quick copy-paste during development.

**Pro Tip**: Use your IDE's snippet feature to save these for even faster access!

---

**InchToMilez** | Developer Quick Reference v2.0
