# Building muse-browser.js

The `muse-browser.js` file is a bundled version of muse-js for direct browser use.

## Already Built

The `muse-browser.js` file is already included in the repository, so you don't need to rebuild it unless:
- You want to update to a newer version of muse-js
- You need to modify the bundle

## To Rebuild (if needed)

```bash
# Install dependencies
npm install

# Build the bundle
npm run build
```

This will create/update `muse-browser.js` using esbuild.

## What's Included

- `muse-js@3.3.0` - The Muse EEG library
- Bundled as IIFE (Immediately Invoked Function Expression)
- Exposes `window.muse.MuseClient` globally
- Size: ~473KB

## Files

- `package.json` - Build configuration
- `src/muse-bundle.js` - Source file
- `muse-browser.js` - Output bundle (committed to git)
- `node_modules/` - Dependencies (not committed)

## Why Not Use CDN?

- Version 4.0.3 doesn't exist (was causing errors)
- Version 3.3.0 doesn't have a pre-built browser bundle
- ES module imports had compatibility issues
- **This local bundle is the most reliable approach**
