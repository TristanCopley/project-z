// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");
adjustCanvas()

let previousTime = 0.0;
let frameCount = 0;
// dt is roughly ~7

// Gameplay Constants
let friction = 0.9

// Game loop
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
    ctx.fillText(`X:${player.xPosition} Y:${player.yPosition}`, 0, 20);
    ctx.fillStyle = "#000000";
}

// Audio Function
function playAudio(src, volume) {
    let audio = new Howl({
        src: [src],
        volume: volume,
    });
    audio.play()
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

function adjustCanvas() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    cw = window.innerWidth / -2
    ch = window.innerHeight / -2
}