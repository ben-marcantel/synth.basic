module.exports = {

    randomIntFromRange: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomStringFromArray: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    replaceCanvas: () => {
        $('#canvasWrapper').empty();
        let width = innerWidth;
        let height = innerHeight;
        return $('#canvasWrapper').append(`<canvas id="canvas" width=${width} height=${height}></canvas>`);
    }
}