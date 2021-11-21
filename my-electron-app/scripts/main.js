// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");

let previousTime = 0.0;

// dt = 7

const loop = time => {
    // Compute the delta-time against the previous time
    const dt = time - previousTime; previousTime = time;

    // Update game
    update(dt);

    // Draw
    render();

    // Repeat
    window.requestAnimationFrame(loop);
};

// Launch
window.requestAnimationFrame(time => {
    previousTime = time;

    window.requestAnimationFrame(loop);
});

// Declare camera object

const camera = {
    xPosition: 0,
    yPosition: 0,
    xVelocity: 0,
    yVelocity: 0,
    xAcceleration: 0,
    yAcceleration: 0,
    xShake: 0,
    yShake: 0,
};

// Declare player object
const player = {
    xPosition: 0,
    yPosition: 0,
    xVelocity: 0,
    yVelocity: 0,
    xAcceleration: 0,
    yAcceleration: 0,
    direction: 0,
    maxHealth: 100,
    health: 100,
    assetsLocation: '/assets/playerAssets',
    weaponSlot: {
        1: "Pistol",
        2: "Rifle",
    },

};

function update(dt) {

}

function render() {
    ctx.beginPath();
    ctx.clearRect(0, 0, c.width, c.height);
    //ctx.globalAlpha = 1 ;
    //ctx.fillRect(0,0, c.width, c.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FF0000";
    ctx.font = `20px Verdana`;
    ctx.fillText(`X:${camera.xPosition} Y:${camera.yPosition}`, 0, 20);
    ctx.fillStyle = "#000000";

}
