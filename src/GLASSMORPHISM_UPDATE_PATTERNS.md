# 🎨 Glassmorphism Update Patterns - Complete Reference

## 95% Transparent Glass for ALL Divisions

---

## 🔍 FIND & REPLACE PATTERNS

### Pattern 1: Background Classes

#### Find:
```tsx
className="bg-white
className="bg-white"
bg-white
bg-gray-50
bg-gray-100
bg-gray-200
bg-[#ffffff]
bg-[#fafafa]
bg-[#f5f5f5]
```

#### Replace With:
```tsx
className="glass-card
className="glass-card"
glass-card
glass-subtle
glass-section-light
glass-section-medium
glass-card
glass-subtle
glass-section-light
```

---

### Pattern 2: Section Backgrounds

#### Find:
```tsx
<section className="py-20 bg-white">
<section className="bg-white py-16">
<section className="bg-gray-50">
<div className="bg-white min-h-screen">
```

#### Replace With:
```tsx
<section className="py-20 glass-section-light">
<section className="glass-section-light py-16">
<section className="glass-section-medium">
<div className="glass-section-light min-h-screen">
```

---

### Pattern 3: Card Containers

#### Find:
```tsx
<div className="bg-white p-6 rounded-xl shadow-lg">
<div className="bg-white p-8 rounded-2xl border">
<div className="bg-gray-50 p-6 rounded-lg">
```

#### Replace With:
```tsx
<div className="glass-card p-6 rounded-[10px] shadow-award">
<div className="glass-card p-8 rounded-[10px] border border-white/10">
<div className="glass-subtle p-6 rounded-[10px]">
```

---

### Pattern 4: Borders

#### Find:
```tsx
border-black/5
border-black/8
border-black/10
border-gray-200
border-gray-300
border-[rgba(0,0,0,0.05)]
border-[rgba(0,0,0,0.06)]
border-[rgba(0,0,0,0.08)]
border-[rgba(0,0,0,0.1)]
```

#### Replace With:
```tsx
border-white/10
border-white/10
border-white/10
border-white/10
border-white/12
border-white/10
border-white/10
border-white/12
border-white/15
```

---

### Pattern 5: Hover States

#### Find:
```tsx
hover:bg-gray-50
hover:bg-gray-100
hover:bg-[#f5f5f5]
hover:bg-[#fafafa]
hover:bg-white
```

#### Replace With:
```tsx
hover:bg-white/10
hover:bg-white/15
hover:bg-white/10
hover:bg-white/8
hover:bg-white/12
```

---

### Pattern 6: Border Radius

#### Find:
```tsx
rounded-xl
rounded-2xl
rounded-3xl
rounded-lg
rounded-full (keep for circles)
```

#### Replace With:
```tsx
rounded-[10px]
rounded-[10px]
rounded-[10px]
rounded-[10px]
rounded-full (unchanged)
```

---

### Pattern 7: Inline Styles (JavaScript/TypeScript)

#### Find:
```tsx
style={{ background: 'rgba(255, 255, 255, 0.7)' }}
style={{ background: 'rgba(255, 255, 255, 0.8)' }}
style={{ background: 'rgba(255, 255, 255, 0.9)' }}
style={{ background: '#ffffff' }}
style={{ background: 'white' }}
```

#### Replace With:
```tsx
className="glass-card"
className="glass-card"
className="glass-strong"
className="glass-card"
className="glass-card"
```

#### Or Keep Inline:
```tsx
style={{ background: 'rgba(255, 255, 255, 0.05)' }}
style={{ background: 'rgba(255, 255, 255, 0.06)' }}
style={{ background: 'rgba(255, 255, 255, 0.08)' }}
```

---

### Pattern 8: Border Inline Styles

#### Find:
```tsx
style={{ border: '1px solid rgba(0, 0, 0, 0.05)' }}
style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}
```

#### Replace With:
```tsx
style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}
style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}
```

---

## 📋 FILE-BY-FILE CHECKLIST

### HomePageComprehensive.tsx
- [ ] Hero section background
- [ ] Feature cards
- [ ] Service grid
- [ ] Stats section
- [ ] Testimonials
- [ ] CTA sections
- [ ] All dividers

### AboutPage.tsx
- [ ] Main container
- [ ] Team cards
- [ ] Mission/Vision cards
- [ ] Timeline sections
- [ ] Value propositions

### ServicesPage.tsx
- [ ] Service cards
- [ ] Category sections
- [ ] Feature lists
- [ ] Pricing tables (if any)

### ContactPage.tsx
- [ ] Form container
- [ ] Input fields (use glass-input)
- [ ] Contact info cards
- [ ] Map container

### PortfolioPage.tsx
- [ ] Project cards
- [ ] Filter buttons
- [ ] Modal backgrounds
- [ ] Image overlays

### BlogsPage.tsx
- [ ] Article cards
- [ ] Category filters
- [ ] Sidebar widgets
- [ ] Featured posts

### All Service Pages
- [ ] Hero sections
- [ ] Feature grids
- [ ] Process steps
- [ ] Benefit cards
- [ ] CTA sections

---

## 🎯 SPECIFIC COMPONENT UPDATES

### Modal/Dialog Components

**Before:**
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
  <div className="bg-white p-8 rounded-2xl max-w-lg mx-auto mt-20">
    <h2>Modal Title</h2>
    <p>Content</p>
  </div>
</div>
```

**After:**
```tsx
<div className="fixed inset-0 bg-black/30 backdrop-blur-md">
  <div className="glass-strong p-8 rounded-[10px] max-w-lg mx-auto mt-20 border border-white/15">
    <h2>Modal Title</h2>
    <p>Content</p>
  </div>
</div>
```

### Form Containers

**Before:**
```tsx
<form className="bg-white p-8 rounded-xl shadow-xl">
  <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
  <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white" />
  <button className="btn-award">Submit</button>
</form>
```

**After:**
```tsx
<form className="glass-strong p-8 rounded-[10px] shadow-award-lg border border-white/10">
  <input className="w-full px-4 py-3 glass-input border-white/15 rounded-[10px]" />
  <textarea className="w-full px-4 py-3 glass-input border-white/15 rounded-[10px]" />
  <button className="btn-award">Submit</button>
</form>
```

### Grid Layouts

**Before:**
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
</div>
```

**After:**
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <div className="glass-card p-6 rounded-[10px] border border-white/10 hover-lift-award">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ))}
</div>
```

### Hero Sections

**Before:**
```tsx
<section className="relative py-24 bg-gradient-to-b from-white to-gray-50">
  <div className="container-award">
    <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl">
      <h1>Hero Title</h1>
      <p>Description</p>
      <button className="btn-award">CTA</button>
    </div>
  </div>
</section>
```

**After:**
```tsx
<section className="relative py-24 glass-section-light">
  <div className="container-award">
    <div className="glass-card p-12 rounded-[10px]">
      <h1>Hero Title</h1>
      <p>Description</p>
      <button className="btn-award">CTA</button>
    </div>
  </div>
</section>
```

### Stats/Metrics Sections

**Before:**
```tsx
<div className="grid grid-cols-4 gap-6">
  {stats.map(stat => (
    <div className="bg-white p-6 rounded-xl text-center border border-gray-200">
      <div className="text-4xl font-bold">{stat.value}</div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  ))}
</div>
```

**After:**
```tsx
<div className="grid grid-cols-4 gap-6">
  {stats.map(stat => (
    <div className="glass-card p-6 rounded-[10px] text-center border border-white/10 hover-lift-award">
      <div className="text-4xl font-bold">{stat.value}</div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  ))}
</div>
```

---

## 🚨 SPECIAL CASES

### Case 1: Image Overlays

**Before:**
```tsx
<div className="relative">
  <img src="..." alt="..." />
  <div className="absolute inset-0 bg-black/50">
    <div className="bg-white p-6">Content</div>
  </div>
</div>
```

**After:**
```tsx
<div className="relative">
  <img src="..." alt="..." />
  <div className="absolute inset-0 bg-black/30">
    <div className="glass-strong p-6 border border-white/15">Content</div>
  </div>
</div>
```

### Case 2: Navigation Dropdowns

**Before:**
```tsx
<div className="absolute mt-2 bg-white rounded-xl shadow-xl border border-gray-200">
  <a className="block px-4 py-2 hover:bg-gray-100">Link</a>
</div>
```

**After:**
```tsx
<div className="absolute mt-2 glass-strong rounded-[10px] shadow-award-lg border border-white/10">
  <a className="block px-4 py-2 hover:bg-white/10">Link</a>
</div>
```

### Case 3: Sidebar Widgets

**Before:**
```tsx
<aside className="bg-gray-50 p-6 rounded-xl">
  <h3>Widget Title</h3>
  <ul>
    <li className="bg-white p-3 rounded-lg mb-2">Item</li>
  </ul>
</aside>
```

**After:**
```tsx
<aside className="glass-subtle p-6 rounded-[10px]">
  <h3>Widget Title</h3>
  <ul>
    <li className="glass-card p-3 rounded-[10px] mb-2 border border-white/10">Item</li>
  </ul>
</aside>
```

### Case 4: Tooltips & Popovers

**Before:**
```tsx
<div className="absolute bg-white p-2 rounded-lg shadow-lg text-sm border border-gray-200">
  Tooltip text
</div>
```

**After:**
```tsx
<div className="absolute glass-strong p-2 rounded-[10px] shadow-award text-sm border border-white/15">
  Tooltip text
</div>
```

---

## 🔄 REGEX PATTERNS (For Advanced Users)

### VSCode Find/Replace (Regex Enabled)

#### Pattern 1: Background Classes
```regex
Find: className="([^"]*)bg-white([^"]*)"
Replace: className="$1glass-card$2"
```

#### Pattern 2: Border Radius
```regex
Find: rounded-(xl|2xl|3xl|lg)
Replace: rounded-[10px]
```

#### Pattern 3: Black Borders
```regex
Find: border-black\/(5|8|10)
Replace: border-white/10
```

#### Pattern 4: Inline Background RGBA
```regex
Find: rgba\(255, 255, 255, 0\.[7-9]\d*\)
Replace: rgba(255, 255, 255, 0.05)
```

---

## ✅ VERIFICATION CHECKLIST

After updating each file:

- [ ] All white backgrounds replaced with glass
- [ ] All gray backgrounds replaced with glass variants
- [ ] All borders changed from black to white
- [ ] All border-radius standardized to 10px
- [ ] All hover states use white/opacity
- [ ] Text is still readable
- [ ] Forms are usable
- [ ] Buttons maintain contrast
- [ ] Icons are visible
- [ ] No visual regressions

---

## 📊 PRIORITY ORDER

### High Priority (Update First)
1. ✅ App.tsx
2. ✅ Header.tsx
3. ✅ Footer.tsx
4. HomePageComprehensive.tsx
5. ContactPage.tsx

### Medium Priority
6. AboutPage.tsx
7. ServicesPage.tsx
8. PortfolioPage.tsx
9. BlogsPage.tsx

### Lower Priority
10. Service-specific pages
11. Utility components
12. Cinematic components

---

## 🎨 GLASS CLASS QUICK REFERENCE

```tsx
glass-subtle           // 3% opacity - 97% transparent
glass-section-light    // 2% opacity - 98% transparent
glass-section-medium   // 4% opacity - 96% transparent
glass-card             // 5% opacity - 95% transparent
glass-strong           // 8% opacity - 92% transparent
glass-ultra            // 5% opacity - 95% transparent
glass-shine            // 6% opacity - 94% transparent
glass-input            // 5% opacity - 95% transparent
icon-container-glass   // 5% opacity - 95% transparent
badge-glass            // 5% opacity - 95% transparent
```

---

## 🚀 AUTOMATED UPDATE COMMANDS

### Using sed (macOS/Linux)
```bash
# Update all .tsx files in pages directory
find components/pages -name "*.tsx" -exec sed -i '' \
  -e 's/bg-white/glass-card/g' \
  -e 's/bg-gray-50/glass-subtle/g' \
  -e 's/border-black\/10/border-white\/10/g' \
  -e 's/rounded-xl/rounded-[10px]/g' \
  {} +
```

### Using PowerShell (Windows)
```powershell
Get-ChildItem -Path components/pages -Filter *.tsx -Recurse | ForEach-Object {
    (Get-Content $_.FullName) `
        -replace 'bg-white', 'glass-card' `
        -replace 'bg-gray-50', 'glass-subtle' `
        -replace 'border-black/10', 'border-white/10' `
        -replace 'rounded-xl', 'rounded-[10px]' |
    Set-Content $_.FullName
}
```

---

**Status**: Ready for Batch Update
**Target**: 95% Transparency Everywhere
**Estimated Time**: 30-60 minutes for all files

**Let's make every division glass! 🎨✨**
