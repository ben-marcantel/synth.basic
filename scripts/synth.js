const options = require('./options.js');
const Tone = require('tone');

module.exports = function () {
    let effectsMap = options().effects
    //FX
    const chorus = function (parameters) {
        return new Tone.Chorus(parameters[0],parameters[1],parameters[2]).toMaster();
    }
    const tremolo = function (parameters) {
        return new Tone.Tremolo(parameters[0],parameters[1]).toMaster();
    }
    const freeverb = function (parameters) {
        return new Tone.Freeverb(parameters[0]).toMaster();
    }
    const feedbackDelay = function (parameters) {
        //return new Tone.PingPongDelay("4n", 0.8).toMaster();
        return new Tone.FeedbackDelay(parameters[0],parameters[1]).toMaster();
    }
    //Volume Control
   const vol = function(parameters){ 
       new Tone.Volume(parameters[0]).toMaster();
    }

    //Synth Types //TODO refactor to be selectable options
    let polySynth = new Tone.FMSynth().toMaster();
    let polySynth2 = new Tone.PolySynth(6, Tone.Synth).toMaster();

    //Volume


    const initEffects = (synth) => {
        for (const effect in effectsMap) {
            if (effectsMap[effect].active) {
                switch (effect) {
                    case "chorus":
                        synth.connect(chorus(effectsMap[effect].parameters));
                        break;
                    case "tremolo":
                        synth.connect(tremolo(effectsMap[effect].parameters));
                        break;
                    case "freeverb":
                        synth.connect(freeverb(effectsMap[effect].parameters));
                        break;
                    case "feedbackDelay":
                        synth.connect(feedbackDelay(effectsMap[effect].parameters));
                        break;
                    default:
                        return synth;
                }
            }
        }
        console.log(options().volume);
        return synth.volume.value = -1 * options().volume;
    };

    initEffects(polySynth);
    initEffects(polySynth2);

    return {
        synth1: polySynth,
        synth2: polySynth2
    }
}
