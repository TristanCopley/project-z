// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");

let previousTime = 0.0;

const loop = time => {
    // Compute the delta-time against the previous time
    const dt = time - previousTime; previousTime = time;

    // Update game
    update(dt);

    // Draw
    render()

    // Repeat
    window.requestAnimationFrame(loop);
};

// Launch
window.requestAnimationFrame(time => {
    previousTime = time;

    window.requestAnimationFrame(loop);
});

function update(dt) {
}

function render() {
    ctx.beginPath();
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillRect(1920 - previousTime,10,100,100);

}