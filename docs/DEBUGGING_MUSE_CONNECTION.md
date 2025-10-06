# 🐛 Debugging Muse Connection Issues - Step by Step Guide

## Current Problem
Getting error: `Cannot read properties of undefined (reading 'MuseClient')`

This means `window.muse` is **undefined** - the muse-js library is NOT loading from the CDN.

---

## 🔍 STEP 1: Test Library Loading (DO THIS FIRST!)

I've created a test file to diagnose the issue:

### Open `test-muse-loading.html`

```bash
# Open this file in Chrome
open test-muse-loading.html
```

This will tell you:
- ✅ or ❌ If muse-js library loads
- ✅ or ❌ If MuseClient is available
- ✅ or ❌ If Web Bluetooth is supported
- ✅ or ❌ If your browser is compatible

**Watch the console output on that page** - it will show exactly what's failing.

---

## 🔍 STEP 2: Check Network Loading

### In Chrome Developer Tools:

1. **Open DevTools**: Press `F12` or `Cmd+Option+I` (Mac)

2. **Go to Network Tab**

3. **Reload the page** (`Cmd+R` or `Ctrl+R`)

4. **Look for muse.min.js**:
   - Find: `muse.min.js` in the list
   - Status should be: `200` (success)
   - Type should be: `script`
   - Size should be: ~few hundred KB

### If you see:
- ❌ **Failed** or **404**: CDN is unreachable
- ❌ **CORS error**: Cross-origin blocking
- ❌ **Blocked**: Content Security Policy or ad blocker
- ❌ **Not in list at all**: Script tag isn't working

---

## 🔍 STEP 3: Check Console for Errors

### Look for these specific errors:

1. **Content Security Policy (CSP)**:
   ```
   Refused to load script from 'https://unpkg.com/...' because it violates 
   the following Content Security Policy directive...
   ```
   **Solution**: You need to add CSP headers or use a local copy

2. **Network Error**:
   ```
   Failed to load resource: net::ERR_CONNECTION_REFUSED
   Failed to load resource: net::ERR_NAME_NOT_RESOLVED
   ```
   **Solution**: Check internet connection, try different CDN

3. **CORS Error**:
   ```
   Cross-Origin Request Blocked...
   ```
   **Solution**: This shouldn't happen with unpkg, but try different CDN

4. **Ad Blocker**:
   ```
   No specific error, but script doesn't load
   ```
   **Solution**: Disable ad blocker or use local file

---

## 🔧 SOLUTION OPTIONS

### Option 1: Try Different CDN

The brainimation.html now tries TWO CDNs:
1. unpkg.com
2. jsdelivr.net

Check which one loads successfully.

### Option 2: Download Library Locally

If CDNs are blocked, download the library:

```bash
# Download muse-js
curl -o muse.min.js https://unpkg.com/muse-js@4.0.3/dist/muse.min.js

# Or use wget
wget https://unpkg.com/muse-js@4.0.3/dist/muse.min.js
```

Then update brainimation.html:
```html
<!-- Replace CDN with local file -->
<script src="./muse.min.js"></script>
```

### Option 3: Check File Protocol

**Are you opening the file directly?** (`file:///Users/...`)

Some browsers block external scripts when using `file://` protocol.

**Solution**: Use a local web server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server)
npx http-server

# Then open:
# http://localhost:8000/brainimation.html
```

### Option 4: Check if Running in App Container

You mentioned: *"In my code I usually run .js files in App html containers"*

**If you're using an app wrapper (Electron, Cordova, etc.):**

1. External scripts may be blocked by default
2. You need to:
   - Add CDNs to Content Security Policy
   - Or bundle the library locally
   - Or whitelist the CDN domains

Example CSP fix:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;">
```

---

## 🎯 Quick Diagnostic Commands

Open browser console on brainimation.html and run:

```javascript
// 1. Check if muse exists
console.log('window.muse:', window.muse);

// 2. Check all muse-related properties
console.log('Muse props:', Object.keys(window).filter(k => k.includes('muse')));

// 3. Check if script tags loaded
console.log('Scripts:', Array.from(document.scripts).map(s => s.src));

// 4. Try loading manually
const script = document.createElement('script');
script.src = 'https://unpkg.com/muse-js@4.0.3/dist/muse.min.js';
script.onload = () => console.log('✅ Loaded!', window.muse);
script.onerror = (e) => console.error('❌ Failed!', e);
document.head.appendChild(script);
```

---

## 🔍 What the Console Should Show

### ✅ SUCCESS looks like:
```
🔍 BrainImation Loading...
📍 Script execution started
window.muse exists? object

🔍 === MUSE LIBRARY DEBUG CHECK ===
1. window.muse: {MuseClient: ƒ, zipSamples: ƒ, ...}
2. typeof window.muse: object
3. window.muse.MuseClient: ƒ MuseClient()
4. typeof window.muse.MuseClient: function
5. All muse properties: ["MuseClient", "zipSamples", ...]
✅ muse-js library loaded successfully!
✅ Test client created: MuseClient {...}
```

### ❌ FAILURE looks like:
```
🔍 BrainImation Loading...
📍 Script execution started
window.muse exists? undefined

🔍 === MUSE LIBRARY DEBUG CHECK ===
1. window.muse: undefined
2. typeof window.muse: undefined
❌ window.muse is undefined - library not loaded!
💡 This could mean:
   - CDN is blocked or unreachable
   - Script tag failed to load
   - Content Security Policy blocking
   - CORS or network issue
```

---

## 🎛️ Why "Connect Muse" Button is Disabled

The initialization code checks:

1. **Is window.muse loaded?** → If NO, disables button
2. **Is navigator.bluetooth available?** → If NO, disables button

This is GOOD - it prevents the error. But we need to fix the loading issue.

---

## 📋 Debugging Checklist

Run through this list:

- [ ] Opened `test-muse-loading.html` - does it work?
- [ ] Checked Network tab - does muse.min.js show status 200?
- [ ] Checked Console - any errors about CSP or CORS?
- [ ] Using Chrome/Edge/Opera browser (not Firefox/Safari)?
- [ ] Have internet connection?
- [ ] Disabled ad blockers?
- [ ] Using `http://` not `file://` protocol?
- [ ] If in app container, checked CSP headers?
- [ ] Tried manual script loading in console?
- [ ] Tried downloading library locally?

---

## 🆘 Next Steps

### If test-muse-loading.html WORKS:
→ The library CAN load, there's something specific in brainimation.html blocking it

### If test-muse-loading.html FAILS:
→ It's an environment issue (network, CSP, app container, etc.)

### Report Back:
1. What does `test-muse-loading.html` show?
2. What's in the Network tab?
3. Any errors in console?
4. Are you using `file://` or `http://`?
5. Are you in an app container/wrapper?

---

## 💡 Common Causes by Environment

### Local File (file://)
- **Problem**: Browsers block external scripts
- **Solution**: Use local web server

### Netlify/Web Host
- **Problem**: CSP headers too strict
- **Solution**: Configure CSP to allow CDNs

### Electron App
- **Problem**: Default CSP blocks external scripts
- **Solution**: Update webPreferences and CSP

### Cordova/PhoneGap
- **Problem**: Whitelist doesn't include CDN
- **Solution**: Add to config.xml whitelist

### Corporate Network
- **Problem**: Firewall blocks CDNs
- **Solution**: Use local copy of library

---

## 📞 Getting Help

If still stuck, provide:
1. Screenshot of `test-muse-loading.html` results
2. Screenshot of Network tab showing muse.min.js
3. Console errors (copy/paste)
4. How you're running the file (file:// vs http:// vs app)
5. Browser and version
6. Operating system

The debugging output will tell us exactly what's wrong!

