const Tone = require('tone');
var chorus = new Tone.Chorus(4, 2.5, 0.5);
var tremolo = new Tone.Tremolo(9, 0.75).toMaster();
var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster();
var freeverb = new Tone.Freeverb().toMaster();
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster().connect(freeverb).connect(feedbackDelay).connect(tremolo).connect(chorus);

 let noteArray=['A5','C5','E5','F5','A4','C4','E4','F4','G#4', 'A3','C3','E3','F3','G#3', 'A2','C2','E2','F2','G#2'];
 let noteLength=['1n','2n','4n','8n','16n'];
 


// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: 10,
    y: 10,
    velocity :{
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    },
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    mouse.velocity ={
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    };
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})

// Utility Functions
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    let xDist = x2 - x1
    let yDist = y2 - y1
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Particle(x, y, radius, color, id) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity ={
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    };
    this.color = color
    this.mass = 2
    this.id = id

    this.update = (particles)=> {
        this.draw()

        for (let i=0;i<particles.length; i++){
            if(this === particles[i]) continue;
            if ( distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius*2 < 0){
                let note = noteArray[this.id-1]
                let note2 = noteArray[particles[i].id-1]
                let length = randomColor(noteLength)
                polySynth.triggerAttackRelease(`${note}`, `${length}`, );
                polySynth.triggerAttackRelease(`${note2}`, `${length}`, );
                resolveCollision(this, particles[i])
            }
        }


        if(this.x - this.radius <= 0 || this.x + this.radius>= innerWidth){
            this.velocity.x = -this.velocity.x;
        } 

        if(this.y - this.radius <= 0 || this.y + this.radius >= innerHeight){
            this.velocity.y = -this.velocity.y;
        } 

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.color
        c.fillStyle = this.fill
        c.shadowBlur = 10;
        c.stroke()
        c.closePath()
    }
}




// Implementation
let particles;
function init() {
    particles = []
    for (let i = 0; i < 20; i++) {
        let radius = Math.floor(Math.random()*18)+1;
        let mass = radius;
        let x = randomIntFromRange(radius,canvas.width -radius);
        let y = randomIntFromRange(radius,canvas.height -radius);
        let color = randomColor(colors);
        let id = radius

        if (i!== 0){
            for (let j =0; j< particles.length; j++){
                if ( distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0){
                    x = randomIntFromRange(radius,canvas.width - radius);
                    y = randomIntFromRange(radius,canvas.height - radius);
                    j= -1;
                }
            }
        }
        particles.push( new Particle(x,y,radius,color,mass,id));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillRect(0,0, canvas.width, canvas.height);
    c.fillStyle="rgba(0,0,0,0.05)";
    particles.forEach(particle => {
        particle.update(particles);   
    });
}

init()
animate()