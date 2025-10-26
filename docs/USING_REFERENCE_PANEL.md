# How to Use the Interactive Reference Panel 📖

## What is the Reference Panel?

The Reference Panel is your **quick guide** to all available p5.js and sound functions in BrainImation. Instead of searching documentation, you can:
- Browse all available functions by category
- See function signatures and descriptions on hover
- Click to insert functions directly into your code!

## How to Open the Reference Panel

1. Look for the **📖 Reference** button in the top right corner
2. Click it to show/hide the reference panel
3. The panel appears on the right side of the screen

## Using the Reference Panel

### Step 1: Choose Your Tab
The reference panel has three tabs:
- **P5.js** - All p5.js drawing, math, sound functions
- **EEG Data** - Brain wave data access
- **AI Helper** - AI code generation (if configured)

### Step 2: Browse Categories
Functions are organized by category:

#### P5.js Tab:
- **Drawing** - ellipse, rect, line, etc.
- **Color** - fill, stroke, colorMode, etc.
- **Transform** - translate, rotate, scale, etc.
- **Math** - map, random, noise, etc.
- **Control** - loop, frameRate, etc.
- **Text** - text, textSize, textAlign, etc.
- **Sound** 🔊 - NEW! All p5.sound functions

#### EEG Data Tab:
- **Frequency Bands** - alpha, beta, theta, delta, gamma
- **Derived Metrics** - attention, meditation
- **Raw Data Access** - getRawChannel, getAllChannels, etc.
- **Connection Status** - connected, sampleRate

### Step 3: Hover to Learn
**Hover your mouse** over any function to see:
- The function signature (what parameters it takes)
- A description of what it does
- Usage tips

Example: Hover over `p5.Oscillator`:
```
new p5.Oscillator([freq], [type])

Creates an oscillator for generating tones. Types: "sine", 
"triangle", "square", "sawtooth". Call .start() to begin, 
.freq() to set frequency, .amp() to set volume.
```

### Step 4: Click to Insert
**Click on any function** to automatically insert it into your code!

The function will be inserted at your cursor position with **placeholders** for parameters:
```javascript
new p5.Oscillator(${1:freq}, ${2:type})
```

You can press **Tab** to jump between placeholders and fill them in.

## Sound Functions Available

### 🎵 Sound Generation
- **p5.Oscillator** - Basic tone generation (sine, triangle, square, sawtooth)
- **p5.PolySynth** - Play multiple notes at once (chords, melodies)
- **p5.MonoSynth** - Single-note synthesizer with envelope control

### 📊 Audio Analysis
- **p5.FFT** - Frequency spectrum analysis (visualize frequencies)
- **p5.Amplitude** - Measure volume levels

### 🎚️ Audio Effects
- **p5.Reverb** - Add spatial depth and echo
- **p5.Delay** - Create echo/delay effects
- **p5.Filter** - Shape the sound (lowpass, highpass, bandpass)

### 🔧 Audio Control
- **loadSound** - Load MP3/WAV files
- **userStartAudio** ⚠️ - REQUIRED! Enable audio after user clicks
- **getAudioContext** - Access Web Audio API (advanced)
- **masterVolume** - Control overall volume

## Example Workflow

Let's create a brain-controlled tone:

### 1. Click on Reference Panel → P5.js → Sound → p5.Oscillator
Your code now has:
```javascript
new p5.Oscillator(freq, type)
```

### 2. Fill in the placeholders:
```javascript
let osc = new p5.Oscillator(440, 'sine');
```

### 3. Need to start it? Find "userStartAudio" in Sound section
Click it to insert in your `mousePressed()` function:
```javascript
function mousePressed() {
  userStartAudio();
}
```

### 4. Want to control it with brain waves?
Switch to **EEG Data** tab → Click `eegData.alpha`:
```javascript
let freq = map(eegData.alpha, 0, 1, 200, 800);
osc.freq(freq);
```

## Pro Tips

### Tip 1: Use Search in Your Browser
Press **Ctrl+F** (or **Cmd+F** on Mac) to search the reference panel for specific functions.

### Tip 2: Keep Reference Panel Open
You can keep the reference panel open while coding. Resize the panels to your preference.

### Tip 3: Learn by Example
Before using the reference panel, try the **Sound & Music examples** from the dropdown:
- Brain Beats
- Alpha Wave Music
- Brain Synthesizer

These show you complete working examples of how to use sound functions.

### Tip 4: Combine EEG + Sound
The magic happens when you combine brain waves with sound:
```javascript
// Alpha controls pitch
osc.freq(map(eegData.alpha, 0, 1, 200, 800));

// Beta controls volume
osc.amp(map(eegData.beta, 0, 1, 0, 0.3));

// Theta controls filter
filter.freq(map(eegData.theta, 0, 1, 100, 5000));
```

## Quick Reference: Essential Sound Functions

### Must-Use Functions:
1. **userStartAudio()** - Call this FIRST in mousePressed() or keyPressed()
2. **new p5.Oscillator()** - Your basic sound source
3. **osc.start()** - Start generating sound
4. **osc.freq(value)** - Set frequency
5. **osc.amp(value)** - Set volume

### Common Pattern:
```javascript
let osc;

function setup() {
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0); // Start silent
}

function draw() {
  // Control with brain waves
  let freq = map(eegData.alpha, 0, 1, 200, 800);
  osc.freq(freq);
  osc.amp(eegData.beta * 0.3);
}

function mousePressed() {
  userStartAudio(); // Required!
}
```

## Troubleshooting

### "I don't see the Reference Panel"
- Click the **📖 Reference** button in the top right
- If your screen is narrow, the panel might be hidden (try fullscreen)

### "Nothing happens when I click a function"
- Make sure your cursor is in the Code Editor area first
- The function will insert at your cursor position

### "The function signature is confusing"
- Parameters in `[brackets]` are optional
- Parameters without brackets are required
- Hover longer to see the full description

### "I want to see more examples"
- Check the **example dropdown** for complete working code
- Look at the System Log to see console messages from examples

## Summary

✅ **Reference Panel** = Quick access to all functions  
✅ **Hover** = See documentation  
✅ **Click** = Insert into code  
✅ **Sound section** = All p5.sound functions ready to use  
✅ **EEG Data section** = Brain wave access functions  

**Now you have everything you need to create brain-controlled music!** 🧠🎵✨

