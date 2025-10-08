# 🚀 Glassmorphism & Parallax - Quick Reference Card

## 🔮 Glass Classes (Copy & Paste)

### Cards
```tsx
// Standard Card
<div className="glass-card card-compact-lg hover-lift-award">

// Strong Card (Important)
<div className="glass-strong card-compact-lg hover-lift-award">

// Subtle Card (Background)
<div className="glass-subtle card-compact-lg">

// Ultra Card (Premium)
<div className="glass-ultra card-compact-lg hover-lift-award">

// With Shine Effect
<div className="glass-shine card-compact-lg hover-lift-award">
```

### Inputs
```tsx
// Glass Input
<input type="text" className="glass-input px-4 py-3 w-full" />

// Glass Textarea
<textarea className="glass-input px-4 py-3 w-full resize-none" />
```

### Sections
```tsx
// Light Section
<section className="section-compact-lg glass-section-light">

// Medium Section
<section className="section-compact-lg glass-section-medium">

// Strong Section
<section className="section-compact-lg glass-section-strong">
```

---

## 🌊 Parallax Components (Copy & Paste)

### Import Statement
```tsx
import { 
  ParallaxGlassSection, 
  ParallaxCard, 
  ParallaxBackgroundLayer,
  ParallaxText 
} from '../ParallaxGlassSection';
```

### Section with Parallax
```tsx
<ParallaxGlassSection 
  speed="medium"        // slow | medium | fast
  glassLevel="strong"   // subtle | medium | strong | ultra
  className="section-compact-lg"
>
  <div className="container-award">
    {/* Content */}
  </div>
</ParallaxGlassSection>
```

### Card Grid with Parallax
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {items.map((item, index) => (
    <ParallaxCard key={item.id} index={index} delay={index * 0.1}>
      <div className="glass-strong card-compact-lg h-full">
        {/* Card content */}
      </div>
    </ParallaxCard>
  ))}
</div>
```

### Background Pattern
```tsx
<section className="relative">
  <ParallaxBackgroundLayer pattern="dots" />
  {/* pattern: dots | grid | waves | gradient */}
  
  <div className="relative z-10">
    {/* Content */}
  </div>
</section>
```

### Parallax Text
```tsx
<ParallaxText speed={50} className="heading-xl">
  Your Heading
</ParallaxText>
```

---

## 🎨 Common Patterns

### Hero Section
```tsx
function HeroSection() {
  return (
    <section className="relative min-h-screen glass-section-light">
      <ParallaxBackgroundLayer pattern="dots" />
      
      <div className="container-award relative z-10 py-20">
        <ParallaxText speed={30} className="heading-xl text-center mb-6">
          Welcome to InchToMilez
        </ParallaxText>
        
        <p className="body-lg text-center max-w-2xl mx-auto">
          Your 360° Digital Partner
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <button className="btn-award btn-lg-award">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
```

### Feature Grid
```tsx
function FeaturesSection() {
  const features = [/* data */];
  
  return (
    <ParallaxGlassSection speed="medium" glassLevel="strong" className="section-compact-lg">
      <ParallaxBackgroundLayer pattern="grid" />
      
      <div className="container-award relative z-10">
        <h2 className="heading-lg text-center mb-12">Features</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ParallaxCard key={feature.id} index={index}>
              <div className="glass-strong card-compact-lg hover-lift-award h-full">
                <div className="icon-container-glass w-14 h-14 p-3 mb-4">
                  <Icon className="w-full h-full text-black" />
                </div>
                <h3 className="heading-sm mb-3">{feature.title}</h3>
                <p className="body-sm text-muted">{feature.description}</p>
              </div>
            </ParallaxCard>
          ))}
        </div>
      </div>
    </ParallaxGlassSection>
  );
}
```

### CTA Section
```tsx
function CTASection() {
  return (
    <ParallaxGlassSection speed="fast" glassLevel="ultra" className="section-compact-lg">
      <div className="container-award text-center">
        <h2 className="heading-lg mb-6">Ready to Get Started?</h2>
        <p className="body-lg mb-8 max-w-2xl mx-auto">
          Transform your business with our 360° solutions
        </p>
        <button className="btn-award btn-lg-award">
          Book Free Consultation
        </button>
      </div>
    </ParallaxGlassSection>
  );
}
```

---

## 🎯 Speed Reference

| Speed | Movement | Use Case |
|-------|----------|----------|
| `slow` | -50px | Backgrounds, subtle elements |
| `medium` | -100px | Standard sections, cards |
| `fast` | -150px | Hero, important sections |

## 🔮 Glass Level Reference

| Level | Opacity | Use Case |
|-------|---------|----------|
| `subtle` | 60% | Backgrounds, overlays |
| `medium` | 75% | Standard cards, sections |
| `strong` | 85% | Important cards, features |
| `ultra` | 95% | CTAs, hero cards, premium |

## 🎨 Pattern Reference

| Pattern | Visual | Use Case |
|---------|--------|----------|
| `dots` | • • • | Clean, minimal backgrounds |
| `grid` | ▦ ▦ ▦ | Structured, organized feel |
| `waves` | ∿ ∿ ∿ | Dynamic, flowing sections |
| `gradient` | ◉ | Soft, elegant backgrounds |

---

## ✨ Combination Examples

### Premium Card
```tsx
<ParallaxCard index={0}>
  <div className="glass-ultra card-compact-lg hover-lift-award glass-shine h-full">
    {/* Content */}
  </div>
</ParallaxCard>
```

### Layered Section
```tsx
<ParallaxGlassSection speed="medium" glassLevel="strong">
  <ParallaxBackgroundLayer pattern="dots" />
  <div className="relative z-10">
    {/* Content with background pattern */}
  </div>
</ParallaxGlassSection>
```

### Mobile-Optimized
```tsx
<ParallaxGlassSection 
  speed="medium"
  glassLevel="strong"
  enableParallax={window.innerWidth > 768}
>
  {/* Disables parallax on mobile */}
</ParallaxGlassSection>
```

---

## 🚀 One-Liner Cheat Sheet

```tsx
// Quick glass card
<div className="glass-strong card-compact-lg hover-lift-award">

// Quick parallax section
<ParallaxGlassSection speed="medium" glassLevel="strong" className="section-compact-lg">

// Quick background
<ParallaxBackgroundLayer pattern="dots" />

// Quick card grid
{items.map((item, i) => <ParallaxCard key={item.id} index={i}>...

// Quick input
<input className="glass-input px-4 py-3 w-full" />
```

---

## 📋 Checklist for New Sections

- [ ] Import parallax components
- [ ] Wrap section with `ParallaxGlassSection`
- [ ] Add `ParallaxBackgroundLayer` if needed
- [ ] Use `ParallaxCard` for grid items
- [ ] Apply appropriate glass level
- [ ] Set parallax speed
- [ ] Add hover effects (`hover-lift-award`)
- [ ] Ensure proper z-index layering
- [ ] Test on mobile
- [ ] Verify performance

---

## 🛠️ Troubleshooting (30-Second Fixes)

**Parallax not working?**
```tsx
// Ensure parent has position: relative
<section className="relative">
```

**Glass not visible?**
```tsx
// Add z-index to content
<div className="relative z-10">
```

**Performance issues?**
```tsx
// Disable parallax on mobile
enableParallax={window.innerWidth > 768}
```

---

**Print this card for quick reference!**  
**Last Updated**: December 2024  
**Version**: 2.0
