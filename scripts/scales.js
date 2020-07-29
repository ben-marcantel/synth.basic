module.exports = function getScale(key, scale) {
    const noteArray = ["C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1", "A_1", "A#_1", "B_1",
        "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
        "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
        "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
        "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
        "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
        "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
        "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
        "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
        "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
        "C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"
    ];

    const scaleOptions = {
        major: [0, 2, 4, 5, 7, 9, 11, 12],
        minor: [0, 2, 3, 5, 7, 8, 11, 12],
        major7: [0, 2, 4, 5, 7, 9, 10, 12],
        minor7: [0, 2, 3, 5, 7, 8, 10, 12],
        chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        wholeTone: [0, 2, 3, 4, 6, 8, 10, 12],
        ionian: [0, 2, 4, 5, 7, 9, 11, 12],
        dorian: [0, 2, 3, 5, 7, 9, 10, 12],
        phyrgian: [0, 1, 3, 5, 7, 8, 10, 12],
        lydian: [0, 2, 4, 6, 7, 9, 11, 12],
        mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
        aeolian: [0, 2, 3, 5, 7, 8, 10, 12],
        locrian: [0, 1, 3, 5, 6, 8, 10, 12]
    }
    let keyAsInt = parseInt(key);
    let selectedScale = [];

    //TODO add octave selection parameter
    let octave = -2;
    let octaveRange = [0, 1];

    const getStartNote = (keyAsInt, octave) => {
        if ((keyAsInt + (octave * 12)) < 0 || (keyAsInt + (octave * 12)) > 128) {
            return keyAsInt;
        }
        return parseInt(keyAsInt + (octave * 12));
    }

    const processOctaves = (keyAsInt, scale, octave, octaveRange) => {
        const startingNote = getStartNote(keyAsInt, octave);
        octaveRange.forEach((octave) => {
            for (let i = 0; i < scaleOptions[scale].length; i++) {
                let octaveModulator = parseInt(octave) * 12;
                if ((scaleOptions[scale][i]) + parseInt(startingNote + octaveModulator) >= 0 ||
                    (scaleOptions[scale][i]) + parseInt(startingNote + octaveModulator) <= 128) {
                    selectedScale.push(noteArray[parseInt(scaleOptions[scale][i]) + parseInt(startingNote + octaveModulator)]);
                }
            }
        })
        return selectedScale;
    }

    return processOctaves(keyAsInt, scale, octave, octaveRange);
}