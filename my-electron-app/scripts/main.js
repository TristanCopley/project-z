// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");
let cw = 0
let ch = 0
adjustCanvas()

// Audio function
function playSFX(src, volume) {
    let audio = new Howl({
        src: [src],
        volume: volume,
    });
    audio.play()
}

// Play music
let music = new Howl({
    src: ['assets/audio/music/bossMusic1.mp3'],
    volume: 0.2,
    html5: true
});
music.play()

let previousTime = 0.0;
let frameCount = 0;
// dt is roughly ~7

// Gameplay Constants
let friction = 0.93


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

function render() { // Begin render
    ctx.clearRect(0, 0, c.width, c.height);

    drawEntities()
    drawPlayer()
    hud()
}

function calculatePlayerMovement(dt) {
    let inputX = 0
    let inputY = 0

    if (upPressed === true) { inputY = -1 }
    if (downPressed === true) { inputY = 1 }
    if (leftPressed === true) { inputX = -1 }
    if (rightPressed === true) { inputX = 1 }

    // Changes acceleration based on input
    if (Math.abs(inputX) + Math.abs(inputY) > 0) { let temp = trigifyCoords(inputX, inputY); player.xAcceleration += temp[0]; player.yAcceleration += temp[1];}

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

function hud() {
    // Draws X and Y for camera
    ctx.fillStyle = "#FF0000";
    ctx.font = `20px Verdana`;
    ctx.fillText(`X:${100 * player.xVelocity} Y:${100 * player.yVelocity}`, 0, 20);
    ctx.fillStyle = "#000000";
}

function drawPlayer() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(player.xPosition - camera.xPosition, player.yPosition - camera.yPosition, 20, 20)
}

function drawEntities() {
    ctx.fillStyle = "#0020ff";
    ctx.fillRect(0 - camera.xPosition, 0 - camera.yPosition, 20, 20)
}

function trigifyCoords(x, y) {
        return [Math.sin(0.5 * Math.PI * (x / (Math.abs(x) + Math.abs(y)))), Math.sin(0.5 * Math.PI * (y / (Math.abs(x) + Math.abs(y))))]
}