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
};

// Entity Library
const entity = {
    runner: {
        name: 'Runner',
        maxHealth: 1000,
        health: 1000,
        lifespan: 0,
        direction: 0,
        movementSpeed: 0.005,
        boss: false,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    },
}

// Weapons library
const weapon = {
    rifle: {
        damage: 10,
        fireRate: 10,
        spread: 1,
        bulletSpeed: 10,
        bulletsPerShot: 1,
        screenShake: 10,
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
        bulletType: "standard",
        bulletSprite: "assets/weapon/rifleBullet",
        gunSprite: "assets/weapon/rifle",
        fireSound: "assets/audio/sfx/rifleShot",
    }
}

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
    moveSpeed: 0.004,
    assetsLocation: '/assets/player/player_',
    animation: 'idle',
    weaponSlot: {
        primary: "Rifle",
        secondary: "Pistol",
        melee: "Knife",
    },
};

// Entity Dictionary
const entities = [];

// Projectile Dictionary
const projectiles = [];