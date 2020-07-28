module.exports = function () {
    const canvas = $('#canvas');
    const context = canvas.get(0).getContext('2d');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    return {
        canvas:canvas,
        context:context,
        width: canvas.width, 
        height: canvas.height
    }
}