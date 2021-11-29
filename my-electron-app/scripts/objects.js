// Declare keys and their associated keycode
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
    shakeAmplitude: 0,
};

// Entity Library
const entityLib = {
    runner: {
        name: 'Runner',
        xPosition: 0,
        yPosition: 0,
        xPositionOld: 0,
        yPositionOld: 0,
        xAcceleration: 0,
        yAcceleration: 0,
        direction: 0,
        maxHealth: 100,
        health: 100,
        movementSpeed: 0.02,
        size: 15,
        desiredX: 0,
        desiredY: 0,
        lifetime: 0,
        boss: false,
        deletion: false,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    }
}

// Weapons library
const weaponLib = {
    zapper: {
        damage: 50,
        fireRate: 95,
        inaccuracy: 500,
        bulletSpeed: 10,
        bulletsPerShot: 1,
        screenShake: 5,
        screenEnemyShake: 0.1,
        movementInaccuracy: 0.5,
        knockback: 0,
        magazineSize: 10,
        reloadTime: 120,
        bulletCount: 90,
        range: 100,
        pierce: 0,
        criticalChance: 0,
        ignite: false,
        poison: false,
        fireType: "hitscan",
        bulletSize: 25, // radius for projectiles, ray width for hit scan
        bulletSprite: "assets/weapon/rifleBullet",
        gunSprite: "assets/weapon/rifle",
        fireSound: "assets/audio/sfx/rifleShot.wav",
        from: "player"
    },
    beamCannon: {
        damage: 10,
        fireRate: 40,
        inaccuracy: 400,
        bulletSpeed: 10,
        bulletsPerShot: 1,
        screenShake: 3,
        screenEnemyShake: 0.1,
        movementInaccuracy: 0.5,
        knockback: 0,
        magazineSize: 10,
        reloadTime: 120,
        bulletCount: 90,
        range: 100,
        pierce: 0,
        criticalChance: 0,
        ignite: false,
        poison: false,
        fireType: "hitscan",
        bulletSize: 20, // radius for projectiles, ray width for hit scan
        bulletSprite: "assets/weapon/rifleBullet",
        gunSprite: "assets/weapon/rifle",
        fireSound: "assets/audio/sfx/rifleShot.wav",
        from: "player"
    },
    remington: {
        damage: 90,
        fireRate: 200,
        inaccuracy: 900,
        bulletSpeed: 10,
        bulletsPerShot: 8,
        screenShake: 10,
        screenEnemyShake: 2,
        movementInaccuracy: 0.5,
        knockback: 90,
        magazineSize: 10,
        reloadTime: 120,
        bulletCount: 90,
        range: 100,
        pierce: 0,
        criticalChance: 0,
        ignite: false,
        poison: false,
        fireType: "hitscan",
        bulletSize: 20, // radius for projectiles, ray width for hit scan
        bulletSprite: "assets/weapon/rifleBullet",
        gunSprite: "assets/weapon/rifle",
        fireSound: "assets/audio/sfx/rifleShot.wav",
        from: "player"
    },
    m4: {
        damage: 10,
        fireRate: 40,
        inaccuracy: 900,
        bulletSpeed: 10,
        bulletsPerShot: 8,
        screenShake: 10,
        screenEnemyShake: 0.1,
        movementInaccuracy: 0.5,
        knockback: 0,
        magazineSize: 10,
        reloadTime: 120,
        bulletCount: 90,
        range: 100,
        pierce: 0,
        criticalChance: 0,
        ignite: false,
        poison: false,
        fireType: "projectile",
        bulletSize: 20, // radius for projectiles, ray width for hit scan
        bulletSprite: "assets/weapon/rifleBullet",
        gunSprite: "assets/weapon/rifle",
        fireSound: "assets/audio/sfx/rifleShot.wav",
        from: "player"
    },
}

// Declare player object
const player = {
    xPosition: 0,
    yPosition: 0,
    xPositionOld: 0,
    yPositionOld: 0,
    xAcceleration: 0,
    yAcceleration: 0,
    direction: 0,
    maxHealth: 100,
    health: 100,
    movementSpeed: 0.04,
    size: 15,
    selected: "remington",
    assetsLocation: '/assets/player/player_',
    animation: 'idle',
    weaponSlot: {
        primary: "remington",
        secondary: "glock",
        melee: "bayonet",
    },
};

// Entity Dictionary
const entities = [];


// Entity template
class Entity {
    constructor(entityData) {
        this.xPosition = entityData.xPosition
        this.yPosition = entityData.yPosition
        this.xPositionOld = entityData.xPositionOld
        this.yPositionOld = entityData.yPositionOld
        this.xAcceleration = entityData.xAcceleration
        this.yAcceleration = entityData.yAcceleration
        this.direction = entityData.direction
        this.maxHealth = entityData.maxHealth
        this.health = entityData.health
        this.movementSpeed = entityData.movementSpeed
        this.size = entityData.size
        this.desiredX = entityData.desiredX
        this.desiredY = entityData.desiredY
        this.lifetime = entityData.lifetime
        this.boss = entityData.boss
        this.deletion = entityData.deletion
        this.assetsLocation = entityData.assetsLocation
        this.color = "#ff0000" // Temporary for enemies without assets
    }
    update(dt, index) {
        this.desiredX = player.xPosition
        this.desiredY = player.yPosition

        if (this.xPosition !== this.desiredX || this.yPosition !== this.desiredY) {
            let xDifference = this.desiredX - this.xPosition
            let yDifference = this.desiredY - this.yPosition

            let moveX = (xDifference / (Math.abs(xDifference) + Math.abs(yDifference)))
            let moveY = (yDifference / (Math.abs(xDifference) + Math.abs(yDifference)))

            let temp = trigifyCoords(moveX, moveY);
            this.xAcceleration += temp[0]
            this.yAcceleration += temp[1]
        }
        updatePhysics(this, dt)

        let entityCollisions = 0
        for (let i = 0; i < entities.length - 1; i++) {
            if ( entities[i] === index) { i++ }
            let xDifference = (entities[i].xPosition - this.xPosition)
            let yDifference = (entities[i].yPosition - this.yPosition)

            if (xDifference ** 2 + yDifference ** 2 < 900) {
                this.xAcceleration += -0.1 * xDifference
                this.yAcceleration += -0.1 * yDifference
                entityCollisions++
            }
        }
        if (entityCollisions > 15) {this.deletion = true}
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.xPosition - camera.xPosition - this.size, this.yPosition - camera.yPosition - this.size, this.size * 2, this.size * 2)
    }
    teleport(x, y) {
        this.xPosition = x
        this.yPosition = y
        this.xPositionOld = x
        this.yPositionOld = y
    }
    hitscan(index, a, b, greaterThan, weapon) {
        let d = (Math.abs(a * (this.xPosition - player.xPosition) + b * (this.yPosition - player.yPosition))) / (Math.sqrt((a * a) + (b * b)))
        let exitXVelocity = 0
        let exitYVelocity = 0
        let temp = 0
        if (d < weapon.bulletSize) {
            if (this.yPosition - player.yPosition < b / a * (this.xPosition - player.xPosition) && greaterThan === -1) {this.health -= weapon.damage; temp = 1}
            if (this.yPosition - player.yPosition > b / a * (this.xPosition - player.xPosition) && greaterThan === 1) {this.health -= weapon.damage; temp = 1}
        }
        if (temp === 1) {
            temp = calculateAngle(this)
            exitXVelocity = temp[0]
            exitYVelocity = temp[1]

            this.xAcceleration += temp[0] * weapon.knockback
            this.yAcceleration += temp[1] * weapon.knockback
        }
        if (this.health <= 0) {
            this.deletion = true
            camera.shakeAmplitude += weapon.screenEnemyShake;
            camera.shakeAmplitude *= 0.94;
            let temp = (this.xPosition - player.xPosition) ** 2 + (this.yPosition - player.yPosition) ** 2
            temp < entityDieSFX ? entityDieSFX = temp : entityDieSFX++
            spawnEnemyDeathParticle(this, 3, exitXVelocity, exitYVelocity)
        }
    }
    projectileCollision() {

    }
}

// Projectile Dictionary
const projectiles = [];

// Particles Dictionary
const tracers = [];

const tracerTemplate = {
    xPosition: 0,
    yPosition: 0,
    xPositionOld: 0,
    yPositionOld: 0,
    type: 0,
    color: {
        r: 255,
        g: 255,
        b: 255,
        a: 1,
    },
    lifetime: 255,
    width: 10,
    deletion: false
};

class Tracer {
    constructor(tracerData) {
        this.xPosition = tracerData.xPosition
        this.yPosition = tracerData.yPosition
        this.xPositionOld = tracerData.xPositionOld
        this.yPositionOld = tracerData.yPositionOld
        this.type = tracerData.type
        this.color = tracerData.color
        this.lifetime = tracerData.lifetime
        this.width = tracerData.width
        this.deletion = tracerData.deletion
    }
    manipulate(x1, y1, x2, y2, size) {
        this.xPosition = x1
        this.yPosition = y1
        this.xPositionOld = x2
        this.yPositionOld = y2
        this.size = size
    }
    update(dt) {
        if (this.lifetime <= 0) { this.deletion = true; return}
        this.lifetime -= dt
    }
    draw() {
        let x1 = this.xPosition - player.xPosition
        let y1 = this.yPosition - player.yPosition
        let x2 = this.xPositionOld - player.xPosition
        let y2 = this.yPositionOld - player.yPosition
        let grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, "rgba("+this.color.r+","+this.color.g+","+this.color.b+",0)");
        grad.addColorStop(1, "rgba("+this.color.r+","+this.color.g+","+this.color.b+","+this.lifetime/255+")");
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

const particles = [];

const particleTemplate = {
    xPosition: 0,
    yPosition: 0,
    xPositionOld: 0,
    yPositionOld: 0,
    xAcceleration: 0,
    yAcceleration: 0,
    movementSpeed: 1,
    type: 0,
    color: {
        r: 255,
        g: 200,
        b: 200,
        a: 1,
    },
    lifetime: 255,
    size: 10,
    deletion: false
};

class Particle {
    constructor(particleData) {
        this.xPosition = particleData.xPosition
        this.yPosition = particleData.yPosition
        this.xPositionOld = particleData.xPositionOld
        this.yPositionOld = particleData.yPositionOld
        this.xAcceleration = particleData.xAcceleration
        this.yAcceleration = particleData.yAcceleration
        this.movementSpeed = particleData.movementSpeed
        this.type = particleData.type
        this.r = particleData.color.r
        this.g = particleData.color.g
        this.b = particleData.color.b
        this.lifetime = particleData.lifetime
        this.size = particleData.size
        this.deletion = particleData.deletion
    }
    manipulate(x, y, xa, ya, size, lifetime, speed, r, g, b) {
        this.xPosition = x
        this.yPosition = y
        this.xPositionOld = x
        this.yPositionOld = y
        this.xAcceleration = xa
        this.yAcceleration = ya
        this.size = size
        this.lifetime = lifetime
        this.movementSpeed = speed
        this.r = r
        this.g = g
        this.b = b
    }
    update(dt) {
        if (this.lifetime <= 0) {this.deletion = true; return}
        updatePhysics(this, dt)
        this.lifetime -= dt
    }
    draw() {
        ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+ this.lifetime / 500 +")"
        ctx.fillRect(this.xPosition - camera.xPosition - this.size, this.yPosition - camera.yPosition - this.size, this.size * 2, this.size * 2)
    }
}

class Projectile {
    constructor(projectileData) {
        this.xPosition = projectileData.xPosition
        this.yPosition = projectileData.yPosition
        this.xPositionOld = projectileData.xPositionOld
        this.yPositionOld = projectileData.yPositionOld
        this.xAcceleration = projectileData.xAcceleration
        this.yAcceleration = projectileData.yAcceleration
        this.movementSpeed = projectileData.movementSpeed
        this.type = projectileData.type
        this.r = projectileData.color.r
        this.g = projectileData.color.g
        this.b = projectileData.color.b
        this.lifetime = projectileData.lifetime
        this.size = projectileData.size
        this.from = projectileData.from
        this.deletion = projectileData.deletion
    }
    manipulate(x, y, xa, ya, size, lifetime, speed, r, g, b, from) {
        this.xPosition = x
        this.yPosition = y
        this.xPositionOld = x
        this.yPositionOld = y
        this.xAcceleration = xa
        this.yAcceleration = ya
        this.size = size
        this.lifetime = lifetime
        this.movementSpeed = speed
        this.r = r
        this.g = g
        this.b = b
        this.from = from
    }
    update(dt) {
        if (this.lifetime <= 0) { this.deletion = true; return}
        updatePhysics(this, dt)
        this.lifetime -= dt
    }
    draw() {
        ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+ this.lifetime / 500 +")"
        ctx.fillRect(this.xPosition - camera.xPosition - this.size, this.yPosition - camera.yPosition - this.size, this.size * 2, this.size * 2)
    }
}
