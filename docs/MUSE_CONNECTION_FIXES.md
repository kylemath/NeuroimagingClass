# Muse Connection Fixes for BrainImation

## Summary of Changes

Fixed the Muse EEG connection issues in `brainimation.html` by implementing proper muse-js connection patterns based on best practices.

## Critical Fix: Library Import

**The Issue**: `window.MuseClient is not a constructor`

When `muse-js` is loaded from unpkg as a UMD bundle, it exports as `window.muse`, not directly on the window object.

### ✅ Correct Import Method

**1. Import the library:**
```html
<script src="https://unpkg.com/muse-js@latest/dist/muse.min.js"></script>
```

**2. Create MuseClient instance:**
```javascript
// CORRECT ✅
const client = new window.muse.MuseClient();

// WRONG ❌
const client = new window.MuseClient(); // This won't work!
```

The library exports everything under the `muse` namespace when loaded as a script tag.

## Key Fixes Applied

### 1. **Correct Subscription Timing**
- **Problem**: Subscriptions were being set up AFTER calling `start()`, which could cause data loss
- **Solution**: Now subscriptions are established BEFORE calling `start()`

```javascript
// Subscribe to data streams BEFORE starting
const eegSubscription = this.muse.eegReadings.subscribe(reading => {
  this.processEEGReading(reading);
});
this.subscriptions.push(eegSubscription);

// Then start streaming
await this.muse.start();
```

### 2. **Proper Subscription Management**
- **Problem**: Subscriptions weren't being tracked or cleaned up properly
- **Solution**: Added subscription tracking and proper unsubscribe on disconnect

```javascript
// Track all subscriptions
this.subscriptions = [];

// Clean up on disconnect
disconnect() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
  this.subscriptions = [];
}
```

### 3. **Enhanced Error Handling**
- **Problem**: Generic error messages didn't help debug connection issues
- **Solution**: Added specific error messages for different failure types

```javascript
if (error.message && error.message.includes('cancelled')) {
  errorMsg = 'Connection cancelled by user';
} else if (error.message && error.message.includes('GATT')) {
  errorMsg = 'Bluetooth connection failed';
}
```

### 4. **Connection Status Monitoring**
- **Problem**: No feedback when connection was established or lost
- **Solution**: Added telemetry, battery, and connection status subscriptions

```javascript
// Monitor connection status
const statusSubscription = this.muse.connectionStatus.subscribe(status => {
  if (!status) {
    this.updateStatus('Connection lost', 'error');
  }
});
```

### 5. **Data Flow Indicators**
- **Problem**: Hard to tell if data was actually flowing after connection
- **Solution**: Added console logs and status updates to show data reception

```javascript
// Log first few readings
if (this.dataBuffer.length < 5) {
  console.log(`📊 EEG data received from ${reading.electrode}`);
}

// Update status periodically
if (this.dataBuffer.length % 100 === 0) {
  this.updateStatus(`Connected (${dataRate} packets/ch)`, 'connected');
}
```

### 6. **Web Bluetooth Detection**
- **Problem**: No warning when using unsupported browsers
- **Solution**: Added browser compatibility check on startup

```javascript
if (!navigator.bluetooth) {
  console.warn('⚠️ Web Bluetooth is not supported in this browser');
  document.getElementById('connect-btn').disabled = true;
}
```

### 7. **Improved State Management**
- **Problem**: Connect button state could get out of sync
- **Solution**: Simplified button handler to properly track connection state

```javascript
// Check current state
if (currentDataSource === 'muse' && museManager.isConnected) {
  // Disconnect
} else {
  // Connect
}
```

## Testing the Import

Open your browser console and run these commands to verify muse-js is loaded correctly:

```javascript
// 1. Check if muse namespace exists
console.log('muse library:', window.muse);

// 2. Check if MuseClient constructor exists
console.log('MuseClient:', window.muse.MuseClient);

// 3. Try creating an instance
const testClient = new window.muse.MuseClient();
console.log('Client created:', testClient);
```

If all three commands work without errors, the library is loaded correctly!

## How to Use

### Prerequisites
1. **Supported Browser**: Chrome, Edge, or Opera (Web Bluetooth required)
2. **Muse Device**: Muse 2016 (MU-02), Muse 2, or Muse S
3. **Device Pairing**: Muse should NOT be paired in system Bluetooth settings
4. **No Competing Apps**: Close any other apps that might connect to Muse (e.g., Calm app)

### Connection Steps

1. **Open BrainImation** in a supported browser
2. **Check Status**: Look for "✅ Web Bluetooth is supported" in console
3. **Turn On Muse**: Make sure it's charged and turned on (green LED blinking)
4. **Click "Connect Muse"**: Browser will show device selection dialog
5. **Select Your Muse**: Choose your device from the list (e.g., "Muse-XXXX")
6. **Wait for Connection**: Button will show "Connecting..." then "Disconnect Muse"
7. **Check Console**: Should see:
   - "Device connected, setting up subscriptions..."
   - "Starting data stream..."
   - "📊 EEG data received from TP9..."
   - "📊 EEG data received from AF7..."
   - "🔋 Battery: XX%"

### Debugging Connection Issues

#### Issue: "Web Bluetooth not supported"
- **Solution**: Use Chrome, Edge, or Opera browser
- **Not supported**: Firefox, Safari (on most platforms)

#### Issue: "Connection cancelled by user"
- **Solution**: User cancelled the device selection dialog, try again

#### Issue: "Bluetooth connection failed" or "GATT error"
- **Possible causes**:
  - Muse already connected to another app
  - Muse battery too low
  - Muse too far from computer
  - Bluetooth interference
- **Solutions**:
  - Close all other Muse apps
  - Charge the Muse
  - Move closer to computer
  - Turn off/on Muse and try again
  - Restart browser

#### Issue: Connection succeeds but no data
- **Check console**: Should see "📊 EEG data received..." messages
- **If no messages**:
  - Disconnect and reconnect
  - Make sure Muse is on your head (good contact)
  - Check that Muse LEDs show good signal quality
  - Try restarting the Muse device

#### Issue: "No device selected"
- **Solution**: Make sure to select a device from the pairing dialog
- **Note**: Device must be in pairing mode (not already connected elsewhere)

### Testing Without Hardware

If you don't have a Muse device, you can test the interface using the **"Simulate Data"** button:
1. Click "Simulate Data" to generate realistic EEG patterns
2. Use the sliders to adjust attention and meditation levels
3. All visualizations will work with simulated data

## Technical Details

### Subscription Order (Critical!)
The correct order is:
1. Create MuseClient
2. Call `connect()` (shows pairing dialog)
3. Set up ALL subscriptions
4. Call `start()` to begin streaming

### Available Data Streams
- `eegReadings` - Raw EEG data from 4 channels (TP9, AF7, AF8, TP10)
- `accelerometerData` - Head movement data
- `telemetryData` - Battery level, temperature
- `connectionStatus` - Connection state changes
- `ppgReadings` - Photoplethysmogram (if enabled)

### Data Format
EEG readings arrive as:
```javascript
{
  electrode: 'TP9', // or 'AF7', 'AF8', 'TP10'
  samples: [12 samples], // ~12 samples per packet
  timestamp: 1234567890
}
```

Sampling rate: 256 Hz per channel

## Additional Resources

- **muse-js GitHub**: https://github.com/urish/muse-js
- **Web Bluetooth API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API
- **EEGEdu Project**: https://github.com/kylemath/EEGEdu

## Changelog

### 2025-10-06
- Fixed subscription timing (before start)
- Added subscription management and cleanup
- Enhanced error messages
- Added connection status monitoring
- Added data flow indicators
- Added Web Bluetooth detection
- Improved button state management
- Added battery level monitoring
- Added comprehensive console logging

## Troubleshooting Checklist

- [ ] Using Chrome, Edge, or Opera?
- [ ] Web Bluetooth enabled? (Check chrome://flags)
- [ ] Muse turned on and charged?
- [ ] No other apps connected to Muse?
- [ ] Muse not paired in system Bluetooth settings?
- [ ] Browser has Bluetooth permissions?
- [ ] Console shows no JavaScript errors?
- [ ] Try incognito/private mode?
- [ ] Try different USB Bluetooth adapter?
- [ ] Restart browser and try again?

## Known Limitations

1. **Single Connection**: Muse can only connect to one app at a time
2. **Browser Support**: Limited to Chromium-based browsers
3. **Distance**: Bluetooth range ~10 meters with clear line of sight
4. **Signal Quality**: Requires good electrode contact with skin
5. **Battery**: Low battery can cause disconnections

## Contact

If you continue to have issues, check the console for detailed error messages and compare with known issues in the muse-js repository.

