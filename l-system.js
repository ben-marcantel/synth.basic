const LSystem = require('lindenmayer');
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext("2d")
 
// translate to center of canvas
ctx.translate(canvas.width / 2, canvas.height / 4)
let angle;
let iterateNum;
let axiomLength;
let productionLength; 
let axiomString = "F";
let roll;
let productionString = "FF-";
let counter=0;
let koch;
const angleMaker = ()=>{
   angle = Math.floor(Math.random()*360)
}

const iterateMaker = ()=>{
    iterateNum= Math.floor(Math.random()*3)+3
    // koch.iterations = iterateNum
}

const generateAxiomLength = ()=>{
    axiomLength =  Math.floor(Math.random()*8)+1
}
const generateProductionLength = ()=>{
    productionLength =  Math.floor(Math.random()*8)+1
}
const getCharacter=()=>{
   roll = Math.floor(Math.random()*6)+1
}

const generateAxiom = ()=>{
    for (let i = 0; i < axiomLength; i++){
        getCharacter()
        if (roll === 1){
            axiomString += "F"
        } else if (roll === 2){
            axiomString += "-"
        } else if (roll === 3){
            axiomString += "+"
        }
    }  
};

const generateProduction = ()=>{
    
    for (let i = 0; i < productionLength; i++){
        getCharacter()
        if (roll === 1){
            productionString += "F"
        } else if (roll === 2){
            productionString += "-"
        } else if (roll === 3){
            productionString += "+"
        } else if (roll === 4){
            productionString += "["
        } else if (roll === 5){
            productionString += "]"
        } else if (roll === 6){
            productionString += "X"
        }
    }  
};


// angleMaker();
// generateAxiomLength();
// generateAxiom();
// generateProductionLength();
// generateProduction();

const initializeIt = ()=>{
    generateAxiomLength();
    generateAxiom();
    generateProductionLength();
    generateProduction();
}



const animateLsystem = ()=>{
ctx.scale(4,4);
    
    koch = new LSystem({
        axiom: axiomString,
        productions: {'F': productionString},
        finals: {
        '+': () => { ctx.rotate((Math.PI/180) * counter ) },
        '-': () => { ctx.rotate((Math.PI/180) * -counter) },
        'F': () => {
        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.shadowColor = "black";
        ctx.strokeStyle = `rgb(${counter*10},${255-counter},100)`;
        
        ctx.shadowBlur = 60;
        ctx.lineTo(0,40/(5+ 1))
        ctx.stroke()
        ctx.translate(0, 40/(5+ 1))},
        '[': ()=>{ ctx.save()   }, 
        ']': ()=>{ ctx.restore() },
        'X': ()=>{   }  
        }
    })
}

const growth = (data)=>{
    if (data < 180){
       return counter += 1/10;
    } else if (data >= 180){
        counter = 0;   
    }
};

const scene = ()=>{
    animateIt();
};
iterateMaker();

const animateIt = ()=>{ 

    growth(counter);
    canvas.height = 1000;
    canvas.width = 1000;
    ctx.translate(canvas.width / 2, canvas.height / 4);    
    animateLsystem();
    koch.iterate(5);
    koch.final();
    time = setTimeout(()=>{
                scene();        
            },80);
};
initializeIt()
console.log(axiomString)
console.log(productionString)

animateIt()

