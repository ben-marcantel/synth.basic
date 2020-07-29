const scale = require('./scales');

module.exports = () => {
    //TODO get octave
    let octave;

    let volume = () => {
        return $("#volumeSelection").val();
    };

    let scaleArray = () => {
        let scaleValue = $("input[name='scaleSelection']:checked").val();
        let keyValue = $("input[name='keySelection']:checked").val();
        return scale(keyValue, scaleValue);
    }
    //Effects
    let chorus = () => {
        //frequency, delayTime, depth
        return {
            active: $('#chorus').is(":checked"),
            parameters: [4, 2.5, 0.5]
        };
    };

    let reverb = () => {
        //seconds of delay
        return {
            active: $('#reverb').is(":checked"),
            parameters: [3]
        };
    };

    let tremolo = () => {
        //frequency, depth
        return {
            active: $('#tremolo').is(":checked"),
            parameters: [9, 0.75]
        };
    };

    let delay = () => {
        //delay time, max delay
        return {
            active: $('#delay').is(":checked"),
            parameters: ["2n", 0.5]
        };
    };

    return {
        volume: volume(),
        scale: scaleArray(),
        effects: {
            chorus: {
                active: chorus().active,
                parameters: chorus().parameters
            },
            reverb: {
                active: reverb().active,
                parameters: reverb().parameters

            },
            tremolo: {
                active: tremolo().active,
                parameters: tremolo().parameters

            },
            delay: {
                active: delay().active,
                parameters: delay().parameters
            }
        }
    };
}