# 🔧 BULK UPDATE EXECUTION GUIDE

## FILES TO UPDATE (Batch Processing)

### Service Pages - Green Color & Animations (11 each)
1. GraphicDesignPage.tsx
2. PublicRelationsPage.tsx  
3. WebsiteDevelopmentPage.tsx
4. AdvertisingPage.tsx
5. BrandingPage.tsx

### PATTERN REPLACEMENTS

#### **Green Color Replacements:**
```
FIND: text-[#baff00]
REPLACE: text-black

FIND: bg-[#baff00]
REPLACE: bg-black

FIND: border-[#baff00]
REPLACE: border-black

FIND: hover:bg-[#baff00]
REPLACE: hover:bg-black

FIND: hover:border-[#baff00]
REPLACE: hover:border-black

FIND: hover:text-black (on dark sections)
REPLACE: hover:text-white
```

#### **Card & Glassmorphism Enhancements:**
```
FIND: glass-card border-2 border-gray-200 hover:border-[#baff00]
REPLACE: glass-shine shine-edge-all card-equal-height

FIND: p-6 glass-card border-2 border-gray-200 hover:border-[#baff00] hover:shadow-dramatic transition-all text-center
REPLACE: p-6 glass-shine shine-edge-all card-equal-height hover-lift-award text-center

FIND: p-8 glass-card border-2 border-gray-200 hover:border-[#baff00]
REPLACE: p-8 glass-shine shine-edge-all card-equal-height hover-lift-award
```

#### **Button Replacements:**
```
FIND: bg-[#baff00] text-black hover:bg-white px-10 py-6 text-lg rounded-full shadow-lg btn-hover-shimmer
REPLACE: btn-award btn-lg-award

FIND: bg-black text-white hover:bg-[#baff00] hover:text-black px-8 py-6 rounded-full shadow-lg btn-hover-shimmer
REPLACE: btn-award btn-lg-award

FIND: border-2 border-black text-black hover:bg-[#baff00] hover:border-[#baff00] py-6
REPLACE: border-2 border-black text-black hover:bg-black hover:text-white hover:border-black py-6 transition-all
```

#### **Circular Animation Replacements:**
```
FIND: animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
REPLACE: animate={{ scale: [1, 1.1, 1] }}
         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}

FIND: animate={{ rotate: [0, 10, -10, 0] }}
REPLACE: animate={{ y: [0, -5, 0] }}

FIND: animate={{ rotate: 360 }}
REPLACE: animate={{ scale: [1, 1.05, 1] }}
```

#### **Floating Dots (Dark Sections):**
```
FIND: className="absolute w-2 h-2 bg-[#baff00] rounded-full"
REPLACE: className="absolute w-2 h-2 bg-white rounded-full opacity-30"
```

---

## ✅ COMPLETED
- [x] AnimationPage.tsx - All green removed, animations fixed
- [x] App.tsx - Loader updated
- [x] HorizontalServiceSlider.tsx - Scrollbar & sparkles fixed
- [x] globals.css - Enhanced with new utilities

## 🔄 IN PROGRESS
- [ ] GraphicDesignPage.tsx (14 instances)
- [ ] PublicRelationsPage.tsx (11 instances)
- [ ] WebsiteDevelopmentPage.tsx (11 instances)
- [ ] AdvertisingPage.tsx (1 animation)
- [ ] BrandingPage.tsx (1 animation)
- [ ] BlogsPage.tsx (2 animations)
- [ ] HomePage.tsx (3+ animations)
- [ ] ServicesPage.tsx (1 gradient)
- [ ] PageTransition.tsx (1 loader + 1 animation)
- [ ] WhatsAppChatbot.tsx (1 sparkles)
- [ ] LeadDashboard.tsx (1 loader)
- [ ] InchyAvatar.tsx (1 rotation)
- [ ] AnimatedLineArt.tsx (1 orbit)

---

## 🚀 EXECUTION STRATEGY

Since there are 14+ files with similar patterns, I'll batch process them:

**Phase 1:** Complete all Service Pages (5 files)
**Phase 2:** Update HomePage & main pages (3 files)
**Phase 3:** Update components & utilities (6 files)

Each file follows the same pattern replacements listed above.

---

*Status: AnimationPage COMPLETE - Continuing with batch updates*