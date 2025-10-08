#!/bin/bash
# Batch replacement script for removing all green colors
# This documents all the replacements needed across the codebase

# Color Replacements:
# #baff00 → #1a1a1a (black) or context-specific black
# #a3e600 → #404040 (dark grey)
# Green gradients → Black/grey gradients
# Green shadows → Black shadows
# Green backgrounds → Black/grey backgrounds

echo "Green Color Removal - Batch Replacement Guide"
echo "=============================================="
echo ""
echo "Files requiring updates:"
echo "- ✅ /styles/globals.css (COMPLETE)"
echo "- ✅ /components/HorizontalServiceSlider.tsx (COMPLETE)"
echo "- ✅ /components/pages/HomePage.tsx (COMPLETE)"
echo "- 🔄 /components/ThemeComponents.tsx"
echo "- 🔄 /components/LeadDashboard.tsx"
echo "- 🔄 /components/TiltCard3D.tsx"
echo "- 🔄 /components/pages/ServicesPage.tsx"
echo "- 🔄 /components/pages/AnimationPage.tsx"
echo "- 🔄 /components/pages/GraphicDesignPage.tsx"
echo "- 🔄 /components/pages/PublicRelationsPage.tsx"
echo "- 🔄 /components/pages/WebsiteDevelopmentPage.tsx"
echo "- 🔄 /components/pages/AdvertisingPage.tsx"
echo "- 🔄 /components/pages/BrandingPage.tsx (if exists)"
echo ""
echo "Replacement patterns:"
echo "  text-[#baff00] → text-black"
echo "  bg-[#baff00] → bg-black"
echo "  from-[#baff00] to-[#a3e600] → from-black to-gray-700"
echo "  border-[#baff00] → border-black"
echo "  shadow-[#baff00]/30 → shadow-black/20"
echo "  hover:bg-[#baff00] → hover:bg-gray-700"
echo "  hover:text-[#baff00] → hover:text-gray-700"
echo "  bg-[#baff00]/20 → bg-black/10"
echo "  bg-gradient-to-r from-[#baff00] to-[#a3e600] → bg-gradient-to-r from-black to-gray-700"
echo ""