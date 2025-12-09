# Visual Portfolio Index - User Guide

## 🎨 What Changed

Your portfolio index has been transformed from text-based cards to a **YouTube Shorts / Pinterest-style visual grid** with hover effects!

### Key Features:
- ✨ **Image-based cards** displaying graphics from each student's paper
- 🎭 **Hover effects** showing clickability and assignment badges
- ✅ **Auto-checking** portfolio availability (greyed out if missing)
- 📱 **Responsive masonry grid** layout
- 🎯 **"FirstName L." overlay** on each image
- 📝 **Short filenames** for easy management (e.g., `Caitlyn_A_portfolio.html`)

---

## 📸 File Naming Convention

### Portfolio Files
Each student's portfolio HTML file is named:
```
FirstName_L_portfolio.html
```

**Examples:**
- `Caitlyn_A_portfolio.html` (Caitlyn Archibald)
- `Tori_A_portfolio.html` (Tori Anderson)
- `Sarah_B_portfolio.html` (Sarah Badran)
- `Kyle_M_portfolio.html` (Kyle Mathewson)

### Image Files
Each student needs an image file named:
```
FirstNameL.png
```

**Examples:**
- `CaitlynA.png` (Caitlyn Archibald)
- `ToriA.png` (Tori Anderson)
- `SarahB.png` (Sarah Badran)
- `KyleM.png` (Kyle Mathewson)

## 📸 How to Add Student Images

### Steps to Add Images:

1. **Extract a graphic** from each student's Assignment 6 paper (PDF)
   - Look for: diagrams, schematics, concept images, technical illustrations
   - Preferred aspect ratio: **3:4 (portrait)** or **1:1 (square)**

2. **Name the file** using the convention above

3. **Place in the same folder** as `student_portfolios_index.html`
   ```
   portfolio_test/
   ├── student_portfolios_index.html
   ├── Caitlyn_A_portfolio.html  ← Portfolio files
   ├── Tori_A_portfolio.html
   ├── Sarah_B_portfolio.html
   ├── CaitlynA.png              ← Image files
   ├── ToriA.png
   ├── SarahB.png
   └── ... (more files)
   ```

4. **Reload the page** - images will appear automatically!
   - If the image is missing, a placeholder with "🖼️ Image not found" will show
   - Cards without portfolio HTML files will be greyed out

---

## 🎯 What Happens Without Images?

Cards will still display but show a placeholder icon and "Image not found" message. The system gracefully handles missing images without breaking.

---

## 🔄 Using the Generator

The updated `generate_portfolio_index.js` now automatically creates visual cards. To regenerate the index:

1. Open `submissions_tracker_live.html`
2. Load your submissions
3. Click **"📚 Generate Portfolio Index"**
4. The new index will include image-based cards

---

## 📋 Expected Images (All 32 Students)

```
ToriA.png           CaitlynA.png        SarahB.png          KoraB.png
CaseyC.png          NatashaC.png        HannahC.png         KyleC.png
JakeG.png           JiaG.png            SamirJ.png          AyaanJ.png
MohamedJ.png        AmnaK.png           IvanL.png           YanL.png
KyleM.png           AngelN.png          AliciaO.png         RyanP.png
HardiP.png          RanaR.png           HamzaR.png          KiaraR.png
MarinayaS.png       ZainabS.png         BaniS.png           RaissaS.png
GraceS.png          ChloeS.png          EllaT.png           PortiaW.png
```

---

## 🎨 Design Details

### Card Overlay:
- **Name** (large, top): "FirstName L."
- **Hover hint**: "👆 Click for portfolio"
- **Mini badges**: EEG, Brain, MT (Assignment badges)

### Status Indicator (top-right circle):
- **⟳** Checking... (spinning animation)
- **✓** Available (green)
- **⚠** Not available (orange) → card greyed out

### Colors:
- **Gradient overlay**: Pink to teal (hover brightens)
- **Shadow**: Lifts on hover
- **Badges**: White with pink accent

---

## 🚀 Quick Tip: Batch Image Extraction

To extract images from all PDFs at once:

1. **Manual method**: Open each PDF, screenshot the best graphic, crop, save
2. **Automated (if PDFs have selectable images)**: 
   ```bash
   # macOS/Linux
   for pdf in *.pdf; do
       pdfimages "$pdf" extracted_images/
   done
   ```
3. **AI-assisted**: Use Claude/ChatGPT to help identify best image from each paper

---

## 🎯 Current Status

- **Generator updated**: ✅ `generate_portfolio_index.js`
- **Index page updated**: ✅ `student_portfolios_index.html`
- **Example image**: ✅ `CaitlynA.png`
- **Remaining images needed**: 31 more

Once you add images, they'll automatically appear in the grid!

---

## 📱 Testing

To test the visual index:

1. Open `portfolio_test/student_portfolios_index.html` in a browser
2. You should see:
   - Visual cards for all students
   - CaitlynA.png showing (if present)
   - Other cards showing placeholder
   - Hover effects working
   - Status indicators checking availability
   - "Available Portfolios" counter updating

---

## 🔧 Troubleshooting

**Images not showing?**
- Check file naming (case-sensitive!)
- Ensure images are in the same folder as the HTML
- Check browser console for errors

**Cards greyed out?**
- Portfolio HTML file might be missing
- Check `data-portfolio-file` attribute in card HTML

**Hover effects not working?**
- Clear browser cache
- Check if JavaScript is enabled

---

**Ready to add your images! 🎨**

