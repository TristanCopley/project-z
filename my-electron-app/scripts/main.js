// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");
let cw = c.width / -2
let ch = c.height / -2

let previousTime = 0.0;

let frameCount = 0;

// dt is roughly ~7

// Gameplay Constants
let friction = 0.9

// Declare camera object
const key = {
    up: 87,
    down: 83,
    left: 65,
    right: 68,
};

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
    moveSpeed: 0.005,
    assetsLocation: '/assets/player/player_',
    animation: 'idle',
    weaponSlot: {
        primary: "Rifle",
        secondary: "Pistol",
        melee: "Knife",
    },
};

// Entity Dictionary
const entityDataDictionary = [
    {
        type: 'Crawler',
        maxHealth: 100,
        health: 70,
        lifespan: 0,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    },
];

const loop = time => {
    // Compute the delta-time against the previous time
    const dt = time - previousTime; previousTime = time;
    frameCount += 1

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

function update(dt) {
    calculatePlayerMovement(dt)
    calculateCamera()
}

function render() {
    if (mDown === true && Math.round(frameCount % 10) === 0) { play('assets/audio/sfx/rifleShot.wav', 1) }
    // Begin render
    ctx.clearRect(0, 0, c.width, c.height);
    //ctx.beginPath(); // Used for drawing non-images

    // Draw temp square as player
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(player.xPosition - camera.xPosition, player.yPosition - camera.yPosition, 20, 20)

    //ctx.drawImage(, 0, 0);

    ctx.fillStyle = "#0020ff";
    ctx.fillRect(0 - camera.xPosition,0 - camera.yPosition, 20, 20)

    // Draws X and Y for camera
    ctx.fillStyle = "#FF0000";
    ctx.font = `20px Verdana`;
    ctx.fillText(`X:${frameCount} Y:${player.yPosition}`, 0, 20);
    ctx.fillStyle = "#000000";
}

// Audio function
function play(src, volume) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.play()
}

//play('assets/audio/music1.mp3', 0.5)
//play('assets/audio/sfx/rifleShot.wav', 1)

// Key Handler
document.addEventListener('mousedown', mouseDown, false)
document.addEventListener('mouseup', mouseUp, false)
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let mDown = false;
let mUp = false;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// Detects key down
function keyDownHandler(event) {
    if(event.keyCode === key.right) {
        rightPressed = true;
    }
    else if(event.keyCode === key.left) {
        leftPressed = true;
    }
    if(event.keyCode === key.down) {
        downPressed = true;
    }
    else if(event.keyCode === key.up) {
        upPressed = true;
    }
}

function mouseDown(event) {
    mDown = true;
    mUp = false;
}

function mouseUp(event) {
    mDown = false;
    mUp = true;
}

// Detects key up
function keyUpHandler(event) {
    if(event.keyCode === key.right) {
        rightPressed = false;
    }
    else if(event.keyCode === key.left) {
        leftPressed = false;
    }
    if(event.keyCode === key.down) {
        downPressed = false;
    }
    else if(event.keyCode === key.up) {
        upPressed = false;
    }
}

function calculatePlayerMovement(dt) {
    if (upPressed === true) { player.yAcceleration = -1 }
    if (downPressed === true) { player.yAcceleration = 1 }
    if (leftPressed === true) { player.xAcceleration = -1 }
    if (rightPressed === true) { player.xAcceleration = 1 }

    player.xAcceleration = -1 * player.xAcceleration * ((Math.abs(player.xAcceleration) + Math.abs(player.yAcceleration) - 2) + (-1 * Math.sqrt(0.5) * (Math.round(( Math.abs(player.xAcceleration) + Math.abs(player.yAcceleration) ) / 4))))
    player.yAcceleration = -1 * player.yAcceleration * ((Math.abs(Math.round(player.xAcceleration)) + Math.abs(player.yAcceleration) - 2) + (-1 * Math.sqrt(0.5) * (Math.round(( Math.abs(Math.round(player.xAcceleration)) + Math.abs(player.yAcceleration) ) / 4))))

    player.xVelocity += player.xAcceleration * dt * player.moveSpeed
    player.yVelocity += player.yAcceleration * dt * player.moveSpeed

    player.xVelocity *= friction
    player.yVelocity *= friction

    player.xAcceleration = 0
    player.yAcceleration = 0

    player.xPosition += player.xVelocity * dt
    player.yPosition += player.yVelocity * dt
}

function calculateCamera() {
    camera.xPosition = cw + player.xPosition
    camera.yPosition = ch + player.yPosition
}