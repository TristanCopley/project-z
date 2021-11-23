let mouseX = null
let mouseY = null

// Event Listeners
document.addEventListener('mousemove', e => { mouseX = e.offsetX; mouseY = e.offsetY; });
document.addEventListener('mousedown', function(){ if (mDown === false) { playSFX( 'assets/audio/sfx/rifleShot.wav', 1)} mDown = true; })
document.addEventListener('mouseup', function(){ mDown = false; })
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let mDown = false;
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