# Stacked Scroll Implementation Guide

## Overview
InchToMilez website now features a sophisticated **stacked scroll effect** where each section slides up from the bottom and stacks on top of the previous section with higher z-index.

## How It Works

### 1. Section Slide-Up Effect
- Each section starts **below the viewport** (at 100vh)
- As you scroll, sections **slide up** smoothly into view
- Sections **stick at the top** of the viewport using `position: sticky`
- Next section slides over the previous one

### 2. Z-Index Stacking
- Section 1 (Hero): `z-index: 6`
- Section 2 (Why Different): `z-index: 5`
- Section 3 (Services): `z-index: 4`
- Section 4 (Social Proof): `z-index: 3`
- Section 5 (Final CTA): `z-index: 2`
- Section 6 (FAQ): `z-index: 1`

Higher z-index = appears on top when scrolling

### 3. Visual Effects
- **Scale Down**: Sections scale from 100% to 92% as they get covered
- **Opacity Fade**: Sections fade from 100% to 40% opacity
- **Border Radius**: Corners round (0px to 16px) for card effect
- **Shadow Gradient**: Subtle top shadow appears when section is covered

## Components

### StackedScrollContainer
```tsx
<StackedScrollContainer>
  {/* All stacked sections go here */}
</StackedScrollContainer>
```

### StackedScrollSection
```tsx
<StackedScrollSection 
  index={0}                        // Section number (0-based)
  totalSections={6}                // Total number of sections
  backgroundColor="bg-white"       // Tailwind background class
>
  <div data-section-index="0">    // Required for section tracking
    {/* Your content */}
  </div>
</StackedScrollSection>
```

### SectionIndicator
```tsx
<SectionIndicator 
  totalSections={6} 
  currentSection={currentSection}
  onNavigate={handleSectionNavigate}
/>
```
- Fixed position on right side
- Shows current active section
- Click to jump to specific section

## Technical Details

### Scroll Progress Tracking
Two scroll progress trackers per section:

1. **Container Progress**: Tracks slide-up animation (0% to 100vh)
2. **Sticky Progress**: Tracks scale/fade when section is at top

### Motion Values
```typescript
// Slide up from bottom
const y = useTransform(containerProgress, [0, 1], ['100vh', '0vh']);

// Scale down when covered
const scale = useTransform(stickyProgress, [0, 0.5, 1], [1, 0.96, 0.92]);

// Fade out when covered
const opacity = useTransform(stickyProgress, [0, 0.6, 1], [1, 1, 0.4]);

// Round corners when covered
const borderRadius = useTransform(stickyProgress, [0, 0.7, 1], [0, 8, 16]);
```

## HomePage Structure

### 6 Sections:
1. **Hero** (white) - Explosive energy, stats, CTAs
2. **Why Different** (gray) - 3 key differentiators
3. **Services** (white) - 6 service cards
4. **Social Proof** (gray) - Stats & testimonials
5. **Final CTA** (white) - Domination call-to-action
6. **FAQ** (gray) - 30 comprehensive FAQs

## Styling

### Each Section:
- **Height**: Exactly 100vh (full viewport)
- **Position**: `sticky top-0`
- **Overflow**: Varies by section (some allow scroll for long content)
- **Background**: Alternating white/gray for visual distinction

### Performance Optimizations:
```css
.stacked-section {
  will-change: transform;
  transform: translateZ(0);
}
```

## User Experience

### Desktop:
- Smooth scroll between sections
- Section indicator on right side
- Click indicator dots to jump to sections
- Hover effects on all interactive elements

### Mobile:
- Touch-optimized scrolling
- Section indicator hidden (more screen space)
- All content remains accessible
- Optimized for smaller viewports

## CSS Classes Used

### Background Colors:
- `bg-white` - White sections (1, 3, 5)
- `bg-gray-50` - Light gray sections (2, 4, 6)

### Glassmorphism:
- `.glass-card` - Standard glass effect
- `.glass-strong` - Stronger glass effect for CTAs

### Typography:
- `.heading-xl`, `.heading-lg`, `.heading-sm` - Antonio headings
- `.body-lg`, `.body-md` - Raleway body text

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
- Keyboard navigation supported
- Focus states on all interactive elements
- ARIA labels on section indicators
- Reduced motion support via `prefers-reduced-motion`

## Future Enhancements
- [ ] Add section titles to indicator tooltips
- [ ] Keyboard shortcuts for section navigation
- [ ] Smooth snap points for better UX
- [ ] Custom easing curves for different sections
- [ ] Progress bar showing scroll position within section

---

**Created for InchToMilez Digital Marketing Agency**
*Making every scroll unforgettable* ⚡
