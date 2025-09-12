# PSYCH 403A1: Neuroimaging and Neurostimulation

Course website for PSYCH 403A1 - Neuroimaging and Neurostimulation  
University of Alberta, Fall 2025

**Instructor:** Kyle Mathewson  
**Time:** Mondays 9:00-12:00 PM  
**Location:** T B-05 - Henry Marshall Tory Building  

## Course Description

This course covers historical, contemporary, developing, and future technologies in neuroimaging and neurostimulation from both an engineering perspective on the equipment, and also a data analysis perspective. Students will get experience collecting and analyzing their own data.

## Website Structure

- `index.html` - Main course navigation and schedule
- `syllabus.html` - Complete course syllabus with university policies
- `lecture1.html` - First lecture outline and materials
- `plan.md` - Internal planning document (not public)

## Cache Busting Implementation

All HTML pages include comprehensive cache busting features to ensure students always see the latest versions:

### Required Meta Tags
Add these meta tags to the `<head>` section of any new HTML page:
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<meta name="cache-buster" content="YYYYMMDD-v1">
```

### External Resources
Add version parameters to external resources:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Spectral:wght@300;400;600;700&display=swap&v=YYYYMMDD" rel="stylesheet">
```

### CSS and JavaScript Versioning
Add version comments to CSS and JavaScript:
```html
<style>
/* Cache-busted styles - vYYYYMMDD */
/* your styles here */
</style>

<script>
// Cache busting script - vYYYYMMDD
// your JavaScript here

// Force reload if page is cached
if (window.performance && window.performance.navigation.type === 2) {
  window.location.reload(true);
}
</script>
```

### Updating Versions
When making changes to pages, update the version numbers:
- `cache-buster` meta tag (e.g., `20250108-v2`)
- CSS comment version
- JavaScript comment version  
- Google Fonts version parameter

## Deployment

This site is configured for Netlify deployment with:
- Build command: `./_build.sh`
- Security headers and caching
- Private file protection

© 2025 Kyle Mathewson
