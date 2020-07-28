const physics = require('./physics.js');
const utilities = require('./utilities.js');
const canvas = require('./canvas.js');
const synths = require('./synth.js');

let noteLength = ['1n', '2n', '4n', '8n', '16n']; //TO DO Move to  audio parameters


module.exports = function Particle(particleParameters) {
    this.x = particleParameters.visual.x
    this.y = particleParameters.visual.y
    this.radius = particleParameters.visual.radius
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    };
    this.color = particleParameters.visual.color
    this.mass = particleParameters.visual.mass
    this.id = particleParameters.visual.id
    this.scale = particleParameters.audio.scale
    this.context = canvas().context
    //this.synth1 = particleParameters.audio.synths[0];
    //this.synth2 = particleParameters.audio.synths[1];
    this.synth1 = synths().synth1;
    this.synth2 = synths().synth2;
    this.update = (particles) => {
        this.draw()
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            //check if collision
            if (physics.distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                //activate sounds
                let note = this.scale[this.id];
                let note2 = this.scale[particles[i].id];
                let length = utilities.randomStringFromArray(noteLength);
                this.synth1.triggerAttackRelease(`${note}`, `${length}`, );
                this.synth2.triggerAttackRelease(`${note2}`, `${length}`, );

                physics.resolveCollision(this, particles[i]);
            }
        }
        //after collision
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    this.draw = function () {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.context.strokeStyle = this.color;
        this.context.fillStyle = this.fill;
        this.context.shadowBlur = 10;
        this.context.stroke();
        this.context.closePath();
    }
}