let context = null; // the Web Audio "context" object
let midiAccess = null; // the MIDIAccess object.
let oscillators = [];
let envelope = null; // the envelope for the single oscillator
const attack = 0.5; // attack speed
const release = 0.8; // release speed
let activeNotes = []; // the stack of actively-pressed keys
let envelopes = [];

window.addEventListener("click", function () {
  // patch up prefixes
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  context = new AudioContext();

  if (navigator.requestMIDIAccess)
    navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
  else
    alert(
      "No MIDI support present in your browser.  You're gonna have a bad time."
    );
});

function onMIDIInit(midi) {
  midiAccess = midi;

  let haveAtLeastOneDevice = false;
  let inputs = midiAccess.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = MIDIMessageEventHandler;
    haveAtLeastOneDevice = true;
  }
  if (!haveAtLeastOneDevice)
    alert("No MIDI input devices present.  You're gonna have a bad time.");
}

function onMIDIReject(err) {
  alert("The MIDI system failed to start.  You're gonna have a bad time.");
}

function MIDIMessageEventHandler(event) {
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2] !== 0) {
        // if velocity != 0, this is a note-on message
        noteOn(event.data[1]);
        return;
      }
    // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      noteOff(event.data[1]);
      return;
  }
}

function frequencyFromNoteNumber(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function noteOn(noteNumber) {
  const oscillator = context.createOscillator();
  envelope = context.createGain();

  activeNotes.push(noteNumber);

  oscillator.connect(envelope);
  envelope.connect(context.destination);

  oscillator.frequency.setValueAtTime(frequencyFromNoteNumber(noteNumber), 0);
  oscillator.start(context.currentTime);

  envelope.gain.setValueAtTime(0.0001, context.currentTime); // Start the gain at 0
  envelope.gain.linearRampToValueAtTime(0.06, context.currentTime + attack); // Linearly ramp the gain to 1

  oscillators.push({ note: noteNumber, oscillator: oscillator });
  envelopes.push({ note: noteNumber, envelope: envelope });
}

function noteOff(noteNumber) {
  let oscillatorPosition = oscillators.findIndex(
    (osc) => osc.note === noteNumber
  );
  let envelopePosition = envelopes.findIndex((env) => env.note === noteNumber);

  if (envelopePosition !== -1) {
    const envToStop = envelopes[envelopePosition].envelope;

    envToStop.gain.setValueAtTime(envToStop.gain.value, context.currentTime);
    envToStop.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + release
    );

    envelopes.splice(envelopePosition, 1);
  }

  if (oscillatorPosition !== -1) {
    const oscToStop = oscillators[oscillatorPosition].oscillator;

    oscToStop.stop(context.currentTime + release);
    oscillators.splice(oscillatorPosition, 1);
  }

  let notePosition = activeNotes.indexOf(noteNumber);

  if (notePosition !== -1) {
    activeNotes.splice(notePosition, 1);
  }
}

// TODO make attack more linear, still kinda sudden
