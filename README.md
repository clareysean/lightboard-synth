# lightboard-synth

# Polyphonic Web Synth

This is a simple polyphonic web synthesizer that utilizes the Web Audio API and the Web MIDI API.

## Features

- Polyphony: Play multiple notes simultaneously, creating chords and harmonies.
- Web MIDI API Integration: Control the synthesizer using external MIDI devices.

## Getting Started

1. Clone or download the repository to your local machine.
2. Open the `index.html` file in a web browser.
3. Allow the browser to access your MIDI devices when prompted.
4. Use your computer keyboard or connect a MIDI device to play the synthesizer.
5. Adjust the various parameters (oscillator type, envelope settings, filter settings, etc.).

## Requirements

- A modern web browser that supports the Web Audio API and the Web MIDI API (e.g., Google Chrome, Mozilla Firefox, Safari).
- If using external MIDI devices, ensure they are connected to your computer and properly recognized by the browser.

## Usage

- Keyboard Controls: Use the computer keyboard to play the synthesizer. The keys are mapped to musical notes.
- Click to initialize a new Audio Context
- MIDI Device Controls: Connect a MIDI device to your computer, and the synthesizer will automatically detect it. Use the MIDI device's keys or buttons to play the synthesizer.
- UI Controls: Adjust the various sliders and knobs on the user interface to modify the sound parameters.

## Customization

Here are some possible enhancements:

- Additional Oscillator Types: Add more waveforms or even implement custom wavetable oscillators.
- More Effects: Extend the effects section to include additional audio effects like chorus, flanger, or distortion.
- User Interface: Enhance the UI by adding visual representations of sound parameters or implementing presets for quick sound selection.

## Resources

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web MIDI API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MIDI_API)

## Acknowledgements

- The Web Audio API and Web MIDI API communities for their valuable documentation and resources.
