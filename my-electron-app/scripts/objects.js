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

const weapon = {
    rifle: {
        damage: 10,
        fireRate: 10,
        spread: 1,
        bulletSpeed: 10,
        bulletsPerShot: 1,
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
const entities = [
    {
        type: 'Crawler',
        maxHealth: 1000,
        health: 1000,
        lifespan: 0,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    },
];

const projectiles = [
    {
        type: 'Crawler',
        maxHealth: 1000,
        health: 1000,
        lifespan: 0,
        assetsLocation: '/assets/enemyAssets/enemy_0',
    },
];