const LSystem = require('lindenmayer');
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d")
 
// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height / 4)
 
// initialize a koch curve L-System that uses final functions
// to draw the fractal onto a Canvas element.
// F: draw a line with length relative to the current iteration (half the previous length for each step)
//    and translates the current position to the end of the line
// +: rotates the canvas 60 degree
// -: rotates the canvas -60 degree
 
var koch = new LSystem({
  axiom: 'F++F++F',
  productions: {'F': 'F-F++F-F'},
  finals: {
    '+': () => { ctx.rotate((Math.PI/180) * 60) },
    '-': () => { ctx.rotate((Math.PI/180) * -60) },
    'F': () => {
      ctx.beginPath()
      ctx.moveTo(0,0)
      ctx.lineTo(0, 40/(koch.iterations + 1))
      ctx.stroke()
      ctx.translate(0, 40/(koch.iterations + 1))}
   }
})
 
koch.iterate(3)
koch.final()

let parametricLsystem = new lsys.LSystem({
    axiom: [
      {symbol: 'A', food:0.5},
      {symbol: 'B'},
      {symbol: 'A',  food:0.1},
      {symbol: 'C'}
    ],
    // And then do stuff with those custom parameters in productions:
    productions: {
      'A': ({part, index}) => {
        // split A into one A and a new B if it ate enough:
        if(part.food >= 1.0) {
          return [{symbol: 'A', food:0}, {symbol: 'B', food:0}]
        } else {
          // otherwise eat a random amount of food
          part.food += Math.random() * 0.1;
          return part;
        }
      }
    }
  });
   
  // parametricLsystem.iterate(60);
  // Depending on randomness:
  // parametricLsystem.getString() ~= 'ABBBBBABBBC';
  // The first part of B's has more B's because the first A got more initial food which in the end made a small difference, as you can see.