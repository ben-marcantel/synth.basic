
const initParticles = require('./scripts/initializeParticles.js');
const canvas = require('./scripts/canvas.js');
const options = require('./scripts/options.js'); 
const utilities = require('./scripts/utilities.js');
let particleGroup;

function initAnimation(){
    particleGroup = initParticles();
    function animate() {
        requestAnimationFrame(animate);
        canvas().context.fillRect(0, 0, canvas().width, canvas().height);
        canvas().context.fillStyle = "rgba(0,0,0,1)";
        particleGroup.forEach(particle => {
            particle.update(particleGroup);   
        });
    }
    return animate(); 
}

function refresh(){
    utilities.replaceCanvas();
    $("#optionsMenu").hide();
    return initAnimation(options());
}

//Events
$("#initOptions").click(refresh);

$("input[type='checkbox']").change(function(){
    if($("input[type='checkbox']").is(":checked")){
        $(this).parent().parent().find("span").toggleClass("isCheckedLabelText",true);
    }else{
        $(this).parent().parent().find("span").toggleClass("isCheckedLabelText",false);
    }
});

$("#options").click(function(){
    $("#optionsMenu").show();
});

addEventListener('resize', () => {
    refresh();
 })
































/*
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.velocity ={
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    };
})
const mouse = {
    x: 10,
    y: 10,
    velocity :{
        x: (Math.random() - 0.5)*2,
        y: (Math.random() - 0.5)*2
    },
}

*/


