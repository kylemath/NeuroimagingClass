// Bundle muse-js for browser use
import { MuseClient, zipSamples } from 'muse-js';

// Export to window
window.muse = {
  MuseClient,
  zipSamples
};

console.log('✅ muse-js bundle loaded!');
