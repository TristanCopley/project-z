// Declare canvas variables
let c = document.getElementById("gameSpace");
let ctx = c.getContext("2d");
let cw = 0
let ch = 0

let gameFocused = true

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
    html5: true,
    onend: function() { music.play() }
});

music.play()

for (let i = 0; i < 500; i++) {
    spawnEntity(i)
}

let previousTime = 0.0;
let frameCount = 0;
// dt is roughly ~7

// Gameplay Constant
let friction = 0.94
let fireCooldown = 0
let entityDieSFX = 0

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
    calculateEntities(dt)
    shoot(dt)
    calculateVFX(dt)
}

function render() { // Begin render
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#d91eee";
    ctx.fillRect(0 - camera.xPosition, 0 - camera.yPosition, 20, 20)

    drawEntities()
    drawPlayer()
    drawVFX()
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

    updatePhysics(player, dt)
}

function calculateCamera() {
    camera.xPosition = cw + player.xPosition + camera.xShake
    camera.yPosition = ch + player.yPosition + camera.yShake

    mouse.globalXPosition = mouse.xPosition + camera.xPosition - camera.xShake
    mouse.globalYPosition = mouse.yPosition + camera.yPosition - camera.yShake

    camera.shakeAmplitude *= 0.93

    camera.xShake = Math.random() * camera.shakeAmplitude
    camera.yShake = Math.random() * camera.shakeAmplitude
}

function adjustCanvas() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    cw = window.innerWidth / -2
    ch = window.innerHeight / -2
}

function hud() {
    // Draws X and Y for camera
    let stuff = particles.length > 0 ? particles[0].xPosition : 0;
    ctx.fillStyle = "#FF0000";
    ctx.font = `20px Verdana`;
    ctx.fillText(`X:${stuff} Y:${Math.sqrt(entityDieSFX)} X2:${1} Y2:${mouse.globalXPosition}`, 0, 20);
    ctx.fillStyle = "#000000";
}

function drawPlayer() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(player.xPosition - camera.xPosition - player.size, player.yPosition - camera.yPosition - player.size, player.size * 2, player.size * 2)
}

function drawEntities() {
    for (let i = 0; i < entities.length; i++) {
        entities[i].draw()
    }
}

function trigifyCoords(x, y) {
    return [Math.sin(0.5 * Math.PI * (x / (Math.abs(x) + Math.abs(y)))), Math.sin(0.5 * Math.PI * (y / (Math.abs(x) + Math.abs(y))))]
}

function updatePhysics(object, dt) {
    let temp = object.xPosition
    object.xPosition += friction * object.xPosition - friction * object.xPositionOld + object.xAcceleration * object.movementSpeed * dt
    object.xPositionOld = temp

    temp = object.yPosition
    object.yPosition +=  friction * object.yPosition - friction * object.yPositionOld + object.yAcceleration * object.movementSpeed * dt
    object.yPositionOld = temp

    object.xAcceleration = 0
    object.yAcceleration = 0
}

function calculateEntities(dt) {
    for (let i = 0; i < entities.length; i++) {
        entities[i].update(dt, i);
        if (entities[i].deletion === true) {entities.splice(i, 1); spawnEntity(entities.length);}
    }
}

function spawnEntity(x) {
    entities.push(new Entity(entityLib.runner))
    entities[x].teleport(Math.random() * 4000 - 2000,Math.random() * 4000 - 2000)
}

function shoot(dt) {
    let weapon = weaponLib[player.selected]
    if (mDown === true) {fireCooldown -= dt} else {fireCooldown = 1}
    if (fireCooldown > 0 || (mouse.xPosition + cw === 0 && mouse.yPosition + ch === 0)) {return}

    fireCooldown = weapon.fireRate
    playSFX(weapon.fireSound, Math.random() * 0.05 + 0.2)

    for (let i = 0; i < weapon.bulletsPerShot; i++) {
        let randomX = (weapon.inaccuracy * Math.random() - 0.5 * weapon.inaccuracy)
        let randomY = (weapon.inaccuracy * Math.random() - 0.5 * weapon.inaccuracy)

        if (weapon.fireType === "projectile") {
            new Projectile()
        } else if (weapon.fireType === "hitscan") {
            camera.shakeAmplitude += weapon.screenShake
            tracers.push(new Tracer(tracerTemplate))
            let multiplier = (-cw - ch) / Math.sqrt(((mouse.xPosition + cw) ** 2) + ((mouse.yPosition + ch) ** 2))
            let finalX = multiplier * (mouse.xPosition + cw) - cw + player.xPosition + randomX
            let finalY = multiplier * (mouse.yPosition + ch) - ch + player.yPosition + randomY
            tracers[tracers.length - 1].manipulate(-cw + player.xPosition, -ch + player.yPosition, finalX, finalY, weapon.bulletSize * 0.5)
            let greaterThan = 1
            let a = mouse.globalYPosition - player.yPosition + randomY / multiplier
            let b = player.xPosition - mouse.globalXPosition - randomX / multiplier
            if (-a / b >= 0) {greaterThan = 1} else {greaterThan = -1}
            if (mouse.xPosition + cw + randomX / multiplier <= 0) {greaterThan *= -1}
            entityDieSFX = 1000000
            for (let i = 0; i < entities.length; i++) {entities[i].hitscan(i, a, b, greaterThan, weapon)}
            if (entityDieSFX < 1000000) {playSFX('assets/audio/sfx/enemyExplosion.wav', 1 / (10 + Math.sqrt(entityDieSFX) / 70))}
        }
    }
}

function drawVFX() {
    for (let i = 0; i < tracers.length; i++) {
        tracers[i].draw()
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw()
    }
}

function calculateVFX(dt) {
    for (let i = 0; i < tracers.length; i++) {
        tracers[i].update(dt, i)
        if (tracers[i].deletion === true) {tracers.splice(i, 1)}
    }
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(dt, i)
        if (particles[i].deletion === true) {particles.splice(i, 1)}
    }
}

function spawnEnemyDeathParticle(object, particleCount, xVelocity, yVelocity) {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(particleTemplate));
        let whiteness = Math.random() * 100;
        particles[particles.length - 1].manipulate(object.xPosition, object.yPosition, Math.random() - 0.5 + xVelocity/2, Math.random() - 0.5 + yVelocity/2, object.size / (Math.random() * 2 + 2), 250 + 450 * Math.random(), Math.random() * 3, 255, whiteness, whiteness)
    }
}

function calculateAngle(object) {
    let tempX = (object.xPosition - player.xPosition) / (Math.abs(object.xPosition - player.xPosition) + Math.abs(object.yPosition - player.yPosition));
    let tempY = (object.yPosition - player.yPosition) / (Math.abs(object.xPosition - player.xPosition) + Math.abs(object.yPosition - player.yPosition));
    return trigifyCoords(tempX , tempY);
}