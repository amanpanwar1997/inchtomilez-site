#!/bin/bash

# ============================================
# BATCH GLASSMORPHISM UPDATE SCRIPT
# Transform ALL divisions to 95% transparency
# ============================================

echo "🎨 Starting Batch Glassmorphism Update..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for changes
TOTAL_FILES=0
TOTAL_CHANGES=0

# Function to update a file
update_file() {
    local file=$1
    echo -e "${BLUE}Processing:${NC} $file"
    
    # Backup original file
    cp "$file" "${file}.backup"
    
    # Track changes in this file
    local changes=0
    
    # ==========================================
    # BACKGROUND REPLACEMENTS
    # ==========================================
    
    # Replace solid white backgrounds
    if sed -i.tmp 's/className="bg-white /className="glass-card /g' "$file"; then
        ((changes++))
    fi
    
    if sed -i.tmp 's/className="bg-white"/className="glass-card"/g' "$file"; then
        ((changes++))
    fi
    
    # Replace gray backgrounds
    sed -i.tmp 's/className="bg-gray-50 /className="glass-subtle /g' "$file"
    sed -i.tmp 's/className="bg-gray-100 /className="glass-section-light /g' "$file"
    sed -i.tmp 's/className="bg-\[#fafafa\] /className="glass-subtle /g' "$file"
    sed -i.tmp 's/className="bg-\[#f5f5f5\] /className="glass-section-light /g' "$file"
    
    # Replace inline background styles
    sed -i.tmp 's/bg-white/glass-card/g' "$file"
    sed -i.tmp 's/bg-gray-50/glass-subtle/g' "$file"
    sed -i.tmp 's/bg-gray-100/glass-section-light/g' "$file"
    sed -i.tmp 's/bg-\[#ffffff\]/glass-card/g' "$file"
    sed -i.tmp 's/bg-\[#fafafa\]/glass-subtle/g' "$file"
    
    # ==========================================
    # BORDER REPLACEMENTS
    # ==========================================
    
    # Replace black borders with white borders
    sed -i.tmp 's/border-black\/5/border-white\/10/g' "$file"
    sed -i.tmp 's/border-black\/8/border-white\/10/g' "$file"
    sed -i.tmp 's/border-black\/10/border-white\/10/g' "$file"
    sed -i.tmp 's/border-black\/20/border-white\/15/g' "$file"
    
    # Replace gray borders
    sed -i.tmp 's/border-gray-100/border-white\/8/g' "$file"
    sed -i.tmp 's/border-gray-200/border-white\/10/g' "$file"
    sed -i.tmp 's/border-gray-300/border-white\/12/g' "$file"
    
    # Replace border color utilities
    sed -i.tmp 's/border-\[rgba(0,0,0,0\.05)\]/border-white\/10/g' "$file"
    sed -i.tmp 's/border-\[rgba(0,0,0,0\.06)\]/border-white\/10/g' "$file"
    sed -i.tmp 's/border-\[rgba(0,0,0,0\.08)\]/border-white\/10/g' "$file"
    sed -i.tmp 's/border-\[rgba(0,0,0,0\.1)\]/border-white\/12/g' "$file"
    
    # ==========================================
    # HOVER STATE REPLACEMENTS
    # ==========================================
    
    # Replace hover backgrounds
    sed -i.tmp 's/hover:bg-gray-50/hover:bg-white\/10/g' "$file"
    sed -i.tmp 's/hover:bg-gray-100/hover:bg-white\/15/g' "$file"
    sed -i.tmp 's/hover:bg-\[#f5f5f5\]/hover:bg-white\/10/g' "$file"
    sed -i.tmp 's/hover:bg-\[#fafafa\]/hover:bg-white\/8/g' "$file"
    
    # ==========================================
    # BORDER RADIUS REPLACEMENTS
    # ==========================================
    
    # Replace all border radius to 10px
    sed -i.tmp 's/rounded-xl /rounded-\[10px\] /g' "$file"
    sed -i.tmp 's/rounded-2xl /rounded-\[10px\] /g' "$file"
    sed -i.tmp 's/rounded-3xl /rounded-\[10px\] /g' "$file"
    sed -i.tmp 's/rounded-lg /rounded-\[10px\] /g' "$file"
    
    sed -i.tmp 's/rounded-xl"/rounded-\[10px\]"/g' "$file"
    sed -i.tmp 's/rounded-2xl"/rounded-\[10px\]"/g' "$file"
    sed -i.tmp 's/rounded-3xl"/rounded-\[10px\]"/g' "$file"
    sed -i.tmp 's/rounded-lg"/rounded-\[10px\]"/g' "$file"
    
    # ==========================================
    # SECTION BACKGROUNDS
    # ==========================================
    
    # Replace section backgrounds
    sed -i.tmp 's/<section className="py-\([^"]*\) bg-white/<section className="py-\1 glass-section-light/g' "$file"
    sed -i.tmp 's/<section className="bg-white /<section className="glass-section-light /g' "$file"
    sed -i.tmp 's/<section className="bg-gray-50 /<section className="glass-section-medium /g' "$file"
    
    # ==========================================
    # CARD CONTAINERS
    # ==========================================
    
    # Replace card backgrounds
    sed -i.tmp 's/<div className="bg-white p-/<div className="glass-card p-/g' "$file"
    sed -i.tmp 's/<div className="bg-gray-50 p-/<div className="glass-subtle p-/g' "$file"
    
    # ==========================================
    # INLINE RGBA STYLES
    # ==========================================
    
    # Replace inline background rgba values
    sed -i.tmp 's/rgba(255, 255, 255, 0\.7)/rgba(255, 255, 255, 0.05)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 0\.75)/rgba(255, 255, 255, 0.05)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 0\.8)/rgba(255, 255, 255, 0.06)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 0\.85)/rgba(255, 255, 255, 0.08)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 0\.9)/rgba(255, 255, 255, 0.08)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 0\.95)/rgba(255, 255, 255, 0.05)/g' "$file"
    sed -i.tmp 's/rgba(255, 255, 255, 1)/rgba(255, 255, 255, 0.08)/g' "$file"
    
    # Replace border rgba values
    sed -i.tmp 's/rgba(0, 0, 0, 0\.05)/rgba(255, 255, 255, 0.1)/g' "$file"
    sed -i.tmp 's/rgba(0, 0, 0, 0\.06)/rgba(255, 255, 255, 0.1)/g' "$file"
    sed -i.tmp 's/rgba(0, 0, 0, 0\.08)/rgba(255, 255, 255, 0.12)/g' "$file"
    sed -i.tmp 's/rgba(0, 0, 0, 0\.1)/rgba(255, 255, 255, 0.15)/g' "$file"
    
    # Clean up temp files
    rm -f "${file}.tmp"
    
    # Compare with backup to count actual changes
    if ! diff -q "$file" "${file}.backup" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Updated${NC} $file"
        ((TOTAL_CHANGES++))
    else
        echo -e "${YELLOW}○ No changes${NC} $file"
        rm "${file}.backup"
    fi
    
    ((TOTAL_FILES++))
}

# ==========================================
# PROCESS ALL PAGE COMPONENTS
# ==========================================

echo -e "\n${BLUE}Updating Page Components...${NC}"

# Main pages
for file in components/pages/*.tsx; do
    if [ -f "$file" ]; then
        update_file "$file"
    fi
done

# ==========================================
# PROCESS ALL REGULAR COMPONENTS
# ==========================================

echo -e "\n${BLUE}Updating Regular Components...${NC}"

# Regular components (excluding ui folder)
for file in components/*.tsx; do
    if [ -f "$file" ]; then
        # Skip certain files
        if [[ "$file" != *"AnimatedCursor"* ]] && [[ "$file" != *"InchyChatbot"* ]]; then
            update_file "$file"
        fi
    fi
done

# ==========================================
# PROCESS CINEMATIC COMPONENTS
# ==========================================

echo -e "\n${BLUE}Updating Cinematic Components...${NC}"

for file in components/cinematic/*.tsx; do
    if [ -f "$file" ]; then
        update_file "$file"
    fi
done

# ==========================================
# SUMMARY
# ==========================================

echo -e "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Batch Update Complete!${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Files processed: ${TOTAL_FILES}"
echo -e "Files updated: ${TOTAL_CHANGES}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Review the changes in each file"
echo "2. Test the website in browser"
echo "3. Check text readability"
echo "4. Verify border visibility"
echo "5. Remove .backup files after verification"
echo -e "\n${BLUE}To remove backups:${NC} find components -name '*.backup' -delete"
echo ""
