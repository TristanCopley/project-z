// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");

let previousTime = 0.0;

// dt = ~7

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


// Gameplay Constants
let friction = 0.9

function update(dt) {

    calculatePlayerMovement(dt)
}

function render() {
    // Begin render
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath(); // Used for drawing non-images

    // Draw temp square as player

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(player.xPosition, player.yPosition, 20, 20)


    // Draws X and Y for camera
    ctx.fillStyle = "#FF0000";
    ctx.font = `20px Verdana`;
    ctx.fillText(`X:${enemyDataDictionary[0].lifespan} Y:${camera.yPosition}`, 0, 20);
    ctx.fillStyle = "#000000";
}

// Key Handler

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// Detects key down
function keyDownHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = true;
    }
    else if(event.keyCode === 37) {
        leftPressed = true;
    }
    if(event.keyCode === 40) {
        downPressed = true;
    }
    else if(event.keyCode === 38) {
        upPressed = true;
    }
}

// Detects key up
function keyUpHandler(event) {
    if(event.keyCode === 39) {
        rightPressed = false;
    }
    else if(event.keyCode === 37) {
        leftPressed = false;
    }
    if(event.keyCode === 40) {
        downPressed = false;
    }
    else if(event.keyCode === 38) {
        upPressed = false;
    }
}

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
        primary: "Rifle",
        secondary: "Pistol",
        melee: "Knife",
    },
};

// Enemy Dictionary
const enemyDataDictionary = [
    {
        type: 'Crawler',
        maxHealth: 100,
        health: 70,
        lifespan: 0,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    },
];

function calculatePlayerMovement(dt) {

    // Player movement
    if (upPressed === true) { player.yAcceleration = -1 }
    if (downPressed === true) { player.yAcceleration = 1 }
    if (leftPressed === true) { player.xAcceleration = -1 }
    if (rightPressed === true) { player.xAcceleration = 1 }

    player.xVelocity = player.xAcceleration * dt * friction
    player.yVelocity = player.yAcceleration * dt * friction

    player.xAcceleration = 0
    player.yAcceleration = 0

    player.xPosition += player.xVelocity
    player.yPosition += player.yVelocity

}