# PSYCH 403A1 - Lecture 1 Outline
**Date:** September 8, 2025  
**Duration:** 3 hours (9:00-12:00 PM)  
**Location:** T B-05 - Henry Marshall Tory Building

---

## **Opening: Welcome & Course Philosophy (20 minutes)**

Begin with introductions and establish the core premise that this course is fundamentally different from typical psychology classes. We're not just learning about the brain as users of neuroimaging tools, but as engineers who understand how these devices actually work, what they're made of, and how to build better ones. Share your background and research experience, then have students briefly introduce themselves with particular attention to any programming, electronics, or engineering experience they bring.

Introduce the teaching assistants Tamari Shalamberidze and Sijie Ling, emphasizing their role not just as graders but as project mentors who will help students navigate the technical challenges of building and analyzing throughout the semester. Quickly tour the course website to show the integrated project timeline and practical exam structure, but don't dwell on administrative details.

## **Equipment Showcase & Unconventional Bioelectricity (35 minutes)**

Rather than lengthy explanations of assessment structure, dive directly into the physical reality of what we'll be working with. Demonstrate the 25 Muse EEG systems, showing students the actual electrodes, the wireless connectivity, and the real-time signal acquisition. Let them handle the devices and see the raw electrical signals from their own brains displayed on screen.

Show the fNIRS system and explain how near-infrared light actually penetrates skull and measures blood oxygenation changes. Demonstrate the tDCS device with emphasis on the safety protocols and current parameters. This isn't theoretical - these are the actual tools they'll be using to collect data and build projects.

### **Beyond Human Brains: Unconventional Bioelectricity Measurement**

Here's where things get interesting - bioelectricity isn't limited to human brains. Demonstrate the Backyard Brains SpikerBox device with its needle-tip electrodes, showing how the same principles of electrical measurement can be applied to completely different biological systems. Play the actual sounds of electrical activity from mushroom mycelium through speakers, demonstrating how fungi generate measurable electrical patterns that some researchers believe might represent primitive information processing.

Show recordings from plant tissues - Venus flytraps generating action potentials when stimulated, the electrical responses of sensitive plants to touch, and the surprising electrical communication networks that exist in root systems. Move to insect preparations, demonstrating how we can record from cricket legs or other insect appendages to understand their neural control systems. These aren't just curiosities - they represent the fundamental universality of bioelectricity across all living systems and show how the engineering principles we use for human neuroimaging can be adapted to study any electrically active biological tissue.

---

## **15-MINUTE BREAK**

---

## **The Engineering Evolution of Brain Measurement (90 minutes)**

### **The Fundamental Challenge**

The central engineering problem has remained constant for over 200 years: how do you measure electrical activity happening inside a skull without opening it up? Every breakthrough in neuroimaging represents a clever engineering solution to this seemingly impossible challenge, and understanding these solutions teaches us both the capabilities and fundamental limitations of each technique.

### **Mechanical Solutions: The Phrenology Era**

The earliest attempts were purely mechanical. Phrenologists in the 1800s built elaborate measuring devices - calipers, rulers, and mapping tools - to quantify skull shape with millimeter precision. Their brass instruments and measurement protocols were sophisticated for their time, based on the reasonable assumption that brain shape might influence skull shape. The engineering was sound, but the underlying theory was wrong. What's fascinating is how their measurement techniques and systematic data collection methods laid groundwork for more scientific approaches.

### **Electrical Detection: Building the First EEG Machines**

The breakthrough came when engineers realized they could detect electrical activity directly through the skull. The first EEG machines in the 1920s were massive mechanical contraptions - room-sized assemblies of vacuum tubes, mechanical pen recorders, and delicate galvanometers that could detect microvolts of electrical activity. These machines required constant calibration and produced traces on moving paper rolls, creating those characteristic wavy lines we associate with brain activity.

The engineering challenge was enormous: amplifying signals a million times while filtering out electrical noise from lights, motors, and other equipment. Early EEG systems used differential amplification - comparing signals between electrode pairs to cancel out common electrical interference. The electrode technology itself was primitive by today's standards - metal discs attached with conductive paste, requiring careful skin preparation and often producing artifacts from movement or poor contact.

### **Structural Imaging: X-rays and Magnetic Engineering**

CT scanners represented a completely different engineering approach - instead of detecting natural electrical activity, they created detailed structural images using X-ray technology. The engineering breakthrough was computational: taking hundreds of X-ray projections from different angles and using mathematical algorithms to reconstruct cross-sectional images. The early CT machines were enormous, requiring specialized rooms and massive computing power for the reconstruction calculations.

MRI systems pushed engineering even further, using superconducting magnets cooled with liquid helium to create magnetic fields thousands of times stronger than Earth's magnetic field. The engineering complexity is staggering - maintaining superconducting temperatures, precisely controlling radio frequency pulses, and detecting the tiny signals emitted by hydrogen atoms as they realign with magnetic fields. The machines themselves are architectural marvels, requiring specially constructed rooms with no ferromagnetic materials anywhere nearby.

### **Functional Measurement: From Structure to Activity**

The next engineering leap was measuring brain function, not just structure. fMRI systems combine the magnetic engineering of structural MRI with sophisticated pulse sequences that can detect blood oxygenation changes. The engineering insight was that active brain regions consume more oxygen, changing the magnetic properties of blood in those areas. The detection requires incredibly precise timing - pulse sequences measured in milliseconds, with signal processing that can distinguish tiny changes in magnetic resonance signals.

### **Optical Solutions: Light-Based Brain Imaging**

fNIRS systems represent a completely different engineering approach - using near-infrared light that can penetrate several centimeters into brain tissue. The engineering challenge is detecting incredibly small changes in light absorption as blood oxygenation changes. Modern fNIRS systems use laser diodes and sensitive photodetectors, with sophisticated algorithms to separate brain signals from contamination by scalp blood flow, hair, and movement artifacts.

The beauty of fNIRS engineering is its portability - no massive magnets or specialized rooms required. The systems we'll use consist of lightweight fiber optic cables, LED light sources, and photodetectors that can be worn during natural activities. This represents a fundamental engineering trade-off: reduced spatial resolution and depth penetration in exchange for mobility and real-world applicability.

### **Stimulation Technology: From Measurement to Modification**

The newest engineering frontier involves not just measuring brain activity but actively modifying it. TMS systems use powerful electromagnetic coils to create focused magnetic fields that can temporarily disrupt or enhance neural activity in specific brain regions. The engineering challenges include creating precisely shaped magnetic fields, managing the enormous electrical currents required, and controlling the timing with millisecond precision.

tDCS systems take a different approach - applying weak electrical currents directly to the scalp to modify neural excitability. The engineering is deceptively simple - current sources, electrodes, and safety monitoring - but the precision required for safe and effective stimulation involves sophisticated current control and real-time impedance monitoring.

## **Hands-On Engineering Analysis (40 minutes)**

Rather than creating historical timelines, we'll reverse-engineer the solutions. Students will work individually or in pairs to examine actual neuroimaging data and identify what engineering challenges each technique solved and what new problems it created. Using real EEG signals from the Muse systems, fMRI datasets from OpenNeuro, fNIRS data from our lab, and bioelectrical recordings from the Backyard Brains device, students will analyze the trade-offs between temporal resolution, spatial resolution, portability, and cost.

Each student or pair will pick one technique and create a simple engineering diagram showing the signal path from biological tissue to computer - what physical phenomena are being detected, how the sensors work, what processing is required, and where the fundamental limitations arise. This includes the unconventional applications: how does measuring electrical activity in mushroom mycelium compare to measuring neural activity in insect legs? What are the engineering similarities and differences? This isn't about memorizing historical facts but understanding the engineering principles that determine what each technique can and cannot measure across all biological systems.

## **Course Preview & Next Steps (20 minutes)**

With this engineering foundation, students now understand the breadth of bioelectrical measurement possibilities - from human neuroimaging to fungal networks to insect neural control. Over the semester, they'll have opportunities to work with all these systems, understanding not just how to use them but how to improve them and adapt them to new applications.

For next week, students should explore the technical specifications of the equipment we'll be using. Instead of reading historical accounts, they should examine the actual device manuals, signal processing algorithms, and engineering trade-offs. The goal is to think like engineers who could improve these systems, not just users who apply them. Consider bringing interesting biological specimens - leaves, mushrooms, insects - that we might explore with the bioelectricity measurement devices.

---

## **Materials Needed**
Muse EEG headsets for demonstration, laptop with real-time signal display, fNIRS system for hands-on examination, tDCS device for safety demonstration, Backyard Brains SpikerBox with needle electrodes, speakers/headphones for bioelectricity audio, mushroom specimens, plant materials (Venus flytrap if available), preserved insect legs or other specimens, large paper for engineering diagrams, access to OpenNeuro datasets, printed device specifications and technical manuals.
