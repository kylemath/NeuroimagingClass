# Muse EEG-Only Mode Fix

## Problem

Students using Muse 2016 devices were getting connection errors like:
```
Connection failed: No Characteristics matching UUID 273e000b-4c4d-454d-96be-f03bac821358 found in Service
```

This was happening because the `muse-js` library (v3.3.0) tries to connect to several optional characteristics during connection:
- **Telemetry** (`273e000b`) - battery, temperature data
- **Gyroscope** (`273e0009`) - device orientation
- **Accelerometer** (`273e000a`) - device movement
- **PPG sensors** (`273e000f`, `273e0010`, `273e0011`) - heart rate (Muse 2/S only)

Not all Muse devices have all these characteristics, and when any one fails to connect, the entire connection fails.

## Solution

Created a **custom EEG-only bundle** that:
1. Makes optional characteristics (telemetry, gyroscope, accelerometer) fail gracefully
2. Only requires EEG and control characteristics (which all Muse devices have)
3. Maintains full EEG functionality for brainimation

### Files Modified

1. **`src/muse-bundle-eeg-only.js`** - New wrapper around muse-js that patches the Bluetooth service to allow optional characteristics to fail silently

2. **`muse-browser-eeg-only.js`** - Compiled bundle (474KB) used by brainimation.html

3. **`brainimation.html`** - Updated to use the EEG-only bundle instead of the standard one

### How It Works

The wrapper extends `MuseClient` and patches the Bluetooth service's `getCharacteristic` method to:
- Try to fetch optional characteristics
- If they fail, return a dummy characteristic that does nothing
- Allow required characteristics (EEG, control) to fail normally if not found

This ensures compatibility with:
- ✅ Muse 2016 (original 4-channel EEG)
- ✅ Muse 2 (newer model with PPG)
- ✅ Muse S (sleep headband with PPG)

### Rebuilding the Bundle

If you need to update or modify the bundle:

```bash
cd /Users/kylemathewson/NeuroimagingClass
npm install  # Install muse-js and esbuild
npx esbuild src/muse-bundle-eeg-only.js --bundle --format=iife --outfile=muse-browser-eeg-only.js
```

### What's Lost vs Standard Bundle

The EEG-only mode disables:
- ❌ Battery level monitoring
- ❌ Device temperature readings
- ❌ Gyroscope data (device orientation)
- ❌ Accelerometer data (head movement)
- ❌ PPG/heart rate data (Muse 2/S only)

**But retains:**
- ✅ All 4 EEG channels (TP9, AF7, AF8, TP10)
- ✅ Full 256 Hz sampling rate
- ✅ Event markers
- ✅ Connection status monitoring
- ✅ Compatible with all Muse device versions

Since brainimation only needs EEG data for visualization, this is perfect for the application!

## Testing

Tested successfully with:
- Muse 2016 (students' devices)
- Muse 2 (instructor's device)

Both now connect without errors and stream EEG data correctly.

