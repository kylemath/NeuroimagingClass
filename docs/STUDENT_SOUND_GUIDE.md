# Student Guide: Using Sound with Your Brain Waves! 🔊🧠

## Quick Start

Sound is now fully supported in BrainImation! Your brain waves can control music, tones, and synthesizers in real-time.

## Try the Examples First

1. Open **BrainImation** in your browser
2. Click **"Simulate Data"** to start generating brain wave data
3. From the dropdown menu, select one of these examples:
   - 🔊 **Brain Beats** - Simple tone controlled by your alpha waves
   - 🎵 **Alpha Wave Music** - Generative music from your brain
   - 🎹 **Brain Synthesizer** - Full synthesizer with waveform visualization

4. **Click on the canvas** to start the audio (browsers require this!)
5. Use the sliders to change your "brain waves" and hear the sound change

## Your First Sound Program

Here's the simplest possible sound program:

```javascript
let osc; // This will be our sound generator

function setup() {
  // Create a sine wave oscillator
  osc = new p5.Oscillator('sine');
  osc.start();
  osc.amp(0); // Start with no volume
  
  console.log('Click to start sound!');
}

function draw() {
  background(200, 50, 100);
  
  // Map alpha waves (0 to 1) to frequency (200 to 800 Hz)
  let frequency = map(eegData.alpha, 0, 1, 200, 800);
  osc.freq(frequency);
  
  // Map beta waves to volume
  let volume = map(eegData.beta, 0, 1, 0, 0.3);
  osc.amp(volume);
  
  // Show the current frequency
  fill(255);
  textAlign(CENTER);
  text('Frequency: ' + frequency.toFixed(0) + ' Hz', width/2, height/2);
}

function mousePressed() {
  userStartAudio(); // THIS IS REQUIRED for browser audio!
}
```

## Important Rules for Sound

### 1. Always Call `userStartAudio()`
Browsers won't let sound play until the user clicks/interacts. Do this:

```javascript
function mousePressed() {
  userStartAudio(); // Required!
  // Now your sound will work
}
```

### 2. Start Oscillators with Zero Volume
This prevents sudden loud noises:

```javascript
function setup() {
  osc = new p5.Oscillator();
  osc.amp(0); // Start silent!
  osc.start();
}
```

### 3. Map Brain Waves Carefully
Brain wave values are between 0 and 1. Use `map()` to convert them:

```javascript
// Good - controlled range
let freq = map(eegData.alpha, 0, 1, 200, 800);

// Bad - too wide a range
let freq = eegData.alpha * 10000; // Could be too high!
```

## Sound Building Blocks

### Oscillators (Tone Generators)

```javascript
let osc = new p5.Oscillator('sine'); // or 'triangle', 'square', 'sawtooth'
osc.start(); // Begin generating sound
osc.freq(440); // Set frequency in Hz
osc.amp(0.5); // Set volume (0 to 1)
osc.stop(); // Stop generating sound
```

### Playing Notes

```javascript
let synth = new p5.PolySynth(); // Can play multiple notes at once

// Play a note: play(frequency, velocity, time, duration)
synth.play(440, 0.5, 0, 0.3); // A4 note, medium loud, now, 0.3 seconds
```

### Loading Sound Files

```javascript
let song;

function preload() {
  song = loadSound('mymusic.mp3');
}

function setup() {
  song.loop(); // Play on repeat
}

function draw() {
  // Control volume with attention
  let vol = map(eegData.attention, 0, 1, 0, 1);
  song.setVolume(vol);
}
```

### Audio Effects

```javascript
let reverb = new p5.Reverb();
reverb.process(synth, 3, 2); // Add reverb to synth (3 sec, 2% mix)

let delay = new p5.Delay();
delay.process(osc, 0.5, 0.7, 2300); // Echo effect

let filter = new p5.LowPass();
filter.freq(eegData.alpha * 5000); // Filter controlled by alpha
```

## Brain Wave Control Ideas

### Alpha Waves (Relaxation)
- **Best for**: Melody, tone color, filter frequency
- **Range**: Usually 0.2 to 0.6
```javascript
let note = map(eegData.alpha, 0, 1, 0, notes.length);
synth.play(notes[floor(note)]);
```

### Beta Waves (Attention)
- **Best for**: Rhythm speed, volume, percussion
- **Range**: Usually 0.3 to 0.7
```javascript
let tempo = map(eegData.beta, 0, 1, 500, 100); // Higher beta = faster
if (millis() - lastBeat > tempo) {
  playDrum();
  lastBeat = millis();
}
```

### Theta Waves (Creativity)
- **Best for**: Effects depth, harmonics, texture
- **Range**: Usually 0.1 to 0.4
```javascript
let reverbAmount = map(eegData.theta, 0, 1, 0, 5);
reverb.set(reverbAmount);
```

### Attention (Combined metric)
- **Best for**: Overall volume, intensity
```javascript
let masterVol = map(eegData.attention, 0, 1, 0, 0.5);
masterVolume(masterVol);
```

## Complete Example: Brain Drum Machine

```javascript
let kick, snare, hihat;
let lastKick = 0;
let lastSnare = 0;
let lastHihat = 0;

function preload() {
  // You can use built-in noise, or load your own samples
}

function setup() {
  // Create drum sounds using oscillators
  kick = new p5.Oscillator('sine');
  kick.amp(0);
  kick.start();
  
  snare = new p5.Oscillator('noise');
  snare.amp(0);
  snare.start();
  
  hihat = new p5.Oscillator('noise');
  hihat.amp(0);
  hihat.start();
}

function draw() {
  background(0);
  
  // Kick drum - triggered by alpha peaks
  if (eegData.alpha > 0.5 && millis() - lastKick > 500) {
    playKick();
    lastKick = millis();
  }
  
  // Snare - triggered by beta
  if (eegData.beta > 0.6 && millis() - lastSnare > 700) {
    playSnare();
    lastSnare = millis();
  }
  
  // Hi-hat - constant rhythm, speed by attention
  let hihatSpeed = map(eegData.attention, 0, 1, 400, 100);
  if (millis() - lastHihat > hihatSpeed) {
    playHihat();
    lastHihat = millis();
  }
  
  // Visualize
  if (millis() - lastKick < 100) {
    fill(255, 0, 0);
    ellipse(width/2, height/2, 200);
  }
}

function playKick() {
  kick.freq(60);
  kick.amp(0.8, 0.01);
  kick.amp(0, 0.2);
}

function playSnare() {
  snare.amp(0.3, 0.01);
  snare.amp(0, 0.1);
}

function playHihat() {
  hihat.amp(0.1, 0.001);
  hihat.amp(0, 0.05);
}

function mousePressed() {
  userStartAudio();
}
```

## Troubleshooting

### "No sound is playing"
1. Did you click on the canvas after loading?
2. Did you call `userStartAudio()` in `mousePressed()`?
3. Check the System Log tab for error messages

### "Sound is too quiet"
```javascript
// Increase the amp() value (but not above 1.0!)
osc.amp(0.5); // Try higher values
```

### "Sound is stuttering or glitchy"
```javascript
// Use smooth transitions
osc.amp(0.5, 0.1); // The 0.1 means "fade over 0.1 seconds"
```

### "My frequency is too high/low"
```javascript
// Check your mapping range
let freq = map(eegData.alpha, 0, 1, 200, 800); // Adjust 200 and 800
```

## More Resources

- **p5.sound Reference**: https://p5js.org/reference/#/libraries/p5.sound
- **See the example code**: Click the dropdown and select any "Sound & Music" example
- **Experiment!**: Try changing the numbers and see what happens

## Musical Frequencies (Notes)

Use these frequencies to play actual musical notes:

```javascript
let notes = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'B4': 493.88,
  'C5': 523.25
};

// Play a C major scale based on brain waves
let noteIndex = floor(map(eegData.alpha, 0, 1, 0, 8));
synth.play(Object.values(notes)[noteIndex]);
```

---

**Now go make some brain music!** 🎵🧠✨

Remember: Start with simple examples, experiment with different mappings, and have fun!

