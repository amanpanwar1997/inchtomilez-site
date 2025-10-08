# 🎯 **ANIMATED UI/UX - QUICK REFERENCE**

## **COMPONENTS CHEAT SHEET**

### **ColorfulIcon**
```tsx
<ColorfulIcon 
  icon={Rocket}
  color="blue|red|yellow|green|purple|orange|pink|teal|indigo|cyan|rainbow"
  animation="bounce|float|pulse-glow|rotate-y|wobble|swing|jump|heartbeat|shake|zoom-pulse"
  hoverAnimation="bounce|rotate|wobble|shake|jump"
  size={48}
  containerGradient={true}
  stagger={1-8}
/>
```

---

### **AnimatedHeading**
```tsx
<AnimatedHeading 
  as="h1|h2|h3|h4|h5|h6"
  animation="shimmer|gradient-sweep|typewriter|glitch|wave|fade-scale|slide-left|slide-right"
>
  Text Here
</AnimatedHeading>
```

---

### **ScrollReveal**
```tsx
<ScrollReveal animation="fade|slide-left|slide-right|zoom|rotate|stagger">
  <Content />
</ScrollReveal>
```

---

### **InnovativeCard**
```tsx
<InnovativeCard 
  effect="3d-tilt|magnetic|flip|expand|slide-reveal|glow-border|particles"
  glassStyle="card|strong|subtle|ultra|premium"
  flipContent={<BackSide />}
>
  <Content />
</InnovativeCard>
```

---

## **ICON COLORS**

| Color | Use Case | Hex |
|-------|----------|-----|
| blue | Tech, Trust | #4285F4 |
| red | Alert, Energy | #EA4335 |
| yellow | Attention | #FBBC05 |
| green | Success | #34A853 |
| purple | Premium | #9333EA |
| orange | Creative | #FF9900 |
| pink | Playful | #EC4899 |
| rainbow | Special | Gradient |

---

## **ICON ANIMATIONS**

| Animation | Effect | Use Case |
|-----------|--------|----------|
| `bounce` | Bounces up/down | Playful, energetic |
| `float` | Gentle float | Professional, calm |
| `pulse-glow` | Glowing pulse | Attention-grabbing |
| `rotate-y` | 3D spin | Showcase, premium |
| `wobble` | Side wobble | Playful |
| `swing` | Pendulum swing | Dynamic |
| `jump` | Quick jump | Energetic |
| `heartbeat` | Heart pulse | Love, passion |
| `shake` | Shake effect | Alert, urgent |
| `zoom-pulse` | Scale pulse | Important |

---

## **HEADING ANIMATIONS**

| Animation | Effect |
|-----------|--------|
| `shimmer` | Light sweeps across |
| `gradient-sweep` | Gradient moves through |
| `typewriter` | Typing with cursor |
| `glitch` | Glitch distortion |
| `wave` | Letters wave up/down |
| `fade-scale` | Fade + scale in |
| `slide-left` | Slides from left |
| `slide-right` | Slides from right |

---

## **CARD EFFECTS**

| Effect | Behavior |
|--------|----------|
| `3d-tilt` | 3D tilt on hover |
| `magnetic` | Follows cursor |
| `flip` | Flips to back side |
| `expand` | Expands larger |
| `slide-reveal` | Content slides up |
| `glow-border` | Rainbow glow |
| `particles` | Animated particles |

---

## **SCROLL ANIMATIONS**

| Animation | Effect |
|-----------|--------|
| `fade` | Fade in from bottom |
| `slide-left` | Slide from left |
| `slide-right` | Slide from right |
| `zoom` | Zoom in |
| `rotate` | Rotate in |
| `stagger` | Stagger children |

---

## **QUICK PATTERNS**

### **Pattern: Icon Grid**
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map((item, i) => (
    <ColorfulIcon 
      icon={item.icon} 
      color={item.color}
      animation="float"
      stagger={i+1}
      className="glass-premium p-6"
    />
  ))}
</div>
```

### **Pattern: Animated Section**
```tsx
<ScrollReveal animation="fade">
  <AnimatedHeading as="h2" animation="shimmer">
    Title
  </AnimatedHeading>
</ScrollReveal>
```

### **Pattern: Interactive Card**
```tsx
<InnovativeCard effect="3d-tilt" className="p-8">
  <ColorfulIcon icon={Star} color="yellow" size={48} />
  <h3>Title</h3>
  <p>Description</p>
</InnovativeCard>
```

---

## **CSS UTILITIES**

### **Direct Icon Classes**
```css
.icon-color-blue
.icon-bounce
.icon-hover-rotate
.icon-stagger-1
```

### **Heading Classes**
```css
.heading-shimmer
.heading-gradient-sweep
.heading-wave
```

### **Card Classes**
```css
.card-3d-tilt
.card-magnetic
.card-flip
.hover-rainbow-border
```

### **Scroll Classes**
```css
.scroll-fade-in
.scroll-slide-left
.in-view /* Add when visible */
```

---

## **BEST PRACTICES**

✅ **DO:**
- Use 1-2 animations per section
- Match colors to brand/purpose
- Test on mobile
- Use stagger for grids
- Combine with glass effects

❌ **DON'T:**
- Animate everything at once
- Use conflicting colors
- Overuse rainbow
- Forget accessibility
- Ignore performance

---

## **COLOR USE GUIDE**

🔵 **Blue** → Technology, Security, Trust  
🔴 **Red** → Urgent, Alert, Important  
🟡 **Yellow** → Energy, Optimism, Attention  
🟢 **Green** → Success, Growth, Eco  
🟣 **Purple** → Premium, Luxury, Creative  
🟠 **Orange** → Friendly, Creative, Warm  
💗 **Pink** → Playful, Modern, Fresh  
🌈 **Rainbow** → Special, Unique, Highlight  

---

## **RESPONSIVE**

All components auto-adjust:
- Icons scale down on mobile
- Grids adapt columns
- Animations work on touch
- Glass effects remain

---

## **IMPORTS**

```tsx
import { ColorfulIcon } from './components/ColorfulIcon';
import { AnimatedHeading } from './components/AnimatedHeading';
import { ScrollReveal } from './components/ScrollReveal';
import { InnovativeCard } from './components/InnovativeCard';
```

---

**Ready to make your website incredibly interactive!** 🚀✨
