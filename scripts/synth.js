const options = require('./options.js');
const Tone = require('tone');

module.exports = () => {
    let effectsMap = options().effects
    let existingNodes = [];

    let polySynth = new Tone.FMSynth().toMaster();
    let polySynth2 = new Tone.PolySynth(6, Tone.Synth).toMaster();
    //FX
    const chorus = (parameters) => {
        return new Tone.Chorus(parameters[0], parameters[1], parameters[2]).toMaster();
    }
    const tremolo = (parameters) => {
        return new Tone.Tremolo(parameters[0], parameters[1]).toMaster();
    }
    const freeverb = (parameters) => {
        return new Tone.Freeverb(parameters[0]).toMaster();
    }
    const feedbackDelay = (parameters) => {
        //return new Tone.PingPongDelay("4n", 0.8).toMaster();
        return new Tone.FeedbackDelay(parameters[0], parameters[1]).toMaster();
    }
    //Volume Control TODO suss out proper volume adjustment
    const vol = (parameters) => {
        new Tone.Volume(parameters[0]).toMaster();
    }

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
        return synth.volume.value = -1 * options().volume;
    };

    const initSynths = () => {
        //Synth Types //TODO refactor to be selectable options
        polySynth = new Tone.FMSynth().toMaster();
        polySynth2 = new Tone.PolySynth(6, Tone.Synth).toMaster();
        return [polySynth, polySynth2];
    }

    const refreshSynthAudioContext = () => {
        if(existingNodes.length){
            existingNodes.forEach((synth)=>{
                synth.dispose();
            })
        }
        return initSynths();
    }

    const addEffects = (synths) => {
        synths.forEach((synth) => {
            existingNodes.push(synth);
            initEffects(synth);
        })
        return synths;
    }

    const refreshSynths = () => {
        let synths = refreshSynthAudioContext();
        return addEffects(synths);
    }

    const initSynthObject = () => {
        let synths = refreshSynths();
        return {
            synth1: synths[0],
            synth2: synths[1]
        }
    }
   return initSynthObject();
}