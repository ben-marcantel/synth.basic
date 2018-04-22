const Tone = require('tone');
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
//play a chord
polySynth.triggerAttackRelease(["C4", "E4", "G4", "B4"], "1n");
// polySynth.triggerAttackRelease("C4", "8n");