OPTION 4: Blood Oxygenation Estimation from PPG Data
=====================================================

Quick Start Guide
-----------------

📊 Data Files (4 recordings, ~120-150 seconds each):
  • ppg_baseline_rest_spo2_98.csv - Baseline recording (SpO2 = 98%)
  • ppg_baseline_rest_spo2_99.csv - Second baseline (SpO2 = 99%)  
  • ppg_breath_hold_protocol.csv - Breath hold challenge (98% → 94% → 98%)
  • ppg_post_exercise_spo2_99.csv - Post-exercise elevated heart rate

📖 Documentation:
  • EXPERIMENT_PROTOCOL.txt - Full experimental details & validation data
  • EXAMPLE_LLM_PROMPT.txt - Copy-paste prompt for AI-assisted analysis

🎯 Your Goal:
Develop an algorithm to estimate blood oxygen saturation (SpO2) from raw 
PPG signals and validate against commercial pulse oximeter measurements.

💡 Quick Tips:
  1. Plot the raw data first - you should see heartbeat oscillations!
  2. Bandpass filter 0.5-5 Hz to isolate cardiac signal
  3. Calculate R = (AC_red/DC_red) / (AC_ir/DC_ir) for each cardiac cycle
  4. Estimate SpO2 ≈ 110 - 25 × R
  5. Compare to reference values in EXPERIMENT_PROTOCOL.txt

🚀 Getting Started:
  → Read EXPERIMENT_PROTOCOL.txt for full context
  → Use EXAMPLE_LLM_PROMPT.txt to generate analysis code
  → Validate your estimates against reference SpO2 values

📧 Questions? kyle.mathewson@ualberta.ca

