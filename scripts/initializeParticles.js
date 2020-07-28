const Particle = require('./particle.js');
const canvas = require('./canvas.js');
const options = require('./options');
const utilities = require('./utilities.js');
const physics = require('./physics.js');
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
let particles;

module.exports = function initParticles() {
    particles = [];
    //For now use scale length for number of parameter, TODO number make an option
    for (let i = 0; i < options().scale.length; i++) {
        let radius = 45//;(Math.floor(Math.random()*18)+6)*2;
        let x = utilities.randomIntFromRange(radius, canvas().canvas.width - radius);
        let y = utilities.randomIntFromRange(radius, canvas().canvas.height - radius);
        let mass = radius/2;
        let color = utilities.randomStringFromArray(colors);
        let id = i;

        //Make sure origin is unique and in bounds
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (physics.distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = utilities.randomIntFromRange(radius, canvas().canvas.width - radius);
                    y = utilities.randomIntFromRange(radius, canvas().canvas.height - radius);
                    j = -1;
                }
            }
        }

        //Set up Parameters
        let particleParameters = {
            visual: {
                x: x,
                y: y,
                radius: radius,
                mass: mass,
                color: color,
                id: id
            },
            audio: {
                scale: options().scale,
                volume:null,
                effects:[]
            }
        };
        particles.push(new Particle(particleParameters));
    }
    return particles;
}
