// Unified game state and data object
let game = {
    monsters: [], // Each monster will have position, health, sprite, etc.
    bullets: [],
    gunSprite: document.getElementById('knife-sprite'),
    isShooting: false,
    equippedWeapon: 1,
    ammo: 0,
    rocketammo: 0,
    lastShot: 0,
    shootCooldown: 600,
    weaponunlocked: {
        knife: true,
        pistol: false,
        machinegun: false,
        yetipistol: false,
        rocketlauncher: false
    },
    screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        halfWidth: null,
        halfHeight: null,
        scale: 4
    },
    projection: {
        width: null,
        height: null,
        halfWidth: null,
        halfHeight: null,
        imageData: null,
        buffer: null
    },
    render: {
        delay: 10
    },
    rayCasting: {
        incrementAngle: null,
        precision: 64
    },
    player: {
        fov: 60,
        halfFov: null,
        x: 2,
        y: 2,
        angle: 0,
        radius: 20,
        speed: {
            movement: 0.08,
            rotation: 1.5
        }
    },
    map: [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 4, 0, 2],
        [2, 0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, 0, 1, 0, 0, 1, 8, 0, 2],
        [2, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 0, 9, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2],
        [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
        [2, 0, 8, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 12, 0, 2, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 13, 0, 2],
        [2, 0, 13, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 8, 0, 0, 0, 0, 2],
        [2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 5, 2, 3, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 8, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 11, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 10, 0, 0, 0, 0, 2, 0, 8, 0, 0, 0, 0, 1, 0, 0, 2],
        [2, 6, 0, 0, 0, 0, 13, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ], // 0 is empty space, 1 is a tree, 2 is a wall, 3 is a monster, 4 is a lion, 5 is a tiger, 6 is a bear, 7 is a yeti, 8 is ammo, 9 is pistolpickup, 10 is machinegunpickup, 11 is yetipistolpickup, 12 is rocketlauncherpickup, 13 is rocketammo
    key: {
        up: {
            code: "ArrowUp",
            active: false
        },
        down: {
            code: "ArrowDown",
            active: false
        },
        left: {
            code: "ArrowLeft",
            active: false
        },
        right: {
            code: "ArrowRight",
            active: false
        },
        space: {
            code: "Space",
            active: false
        },
        one: {
            code: "Digit1",
            active: false
        },
        two: {
            code: "Digit2",
            active: false
        },
        three: {
            code: "Digit3",
            active: false
        },
        four: {
            code: "Digit4",
            active: false
        },
        five: {
            code: "Digit5",
            active: false
        }
    },
    textures: [
        {
            width: 8,
            height: 8,
            bitmap: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 0, 0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 0, 0, 0, 1, 0, 0]
            ],
            colors: [
                "rgb(255, 241, 232)",
                "rgb(194, 195, 199)",
            ]
        },
        {
            width: 16,
            height: 16,
            id: "texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "texture2",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "invis",
            data: null
        }
    ],
    floorTextures: [
        {
            width: 16,
            height: 16,
            id: "floor-texture",
            data: null
        }
    ],
    bulletTexture: {
        id: 'bullet-sprite',
        width: 5454,
        height: 54,
        data: null
    },
    laserTexture: {
        id: 'laser-sprite',
        width: 54,
        height: 54,
        data: null
    },
    rocketTexture: {
        id: 'rocket-sprite',
        width: 16,
        height: 23,
        data: null
    },
    backgrounds: [
        {
            width: 360,
            height: 60,
            id: "background",
            data: null
        }
    ],
    sprites: [] // Only trees and other non-monster sprites
};

// Add initial sprite and monster data programmatically based on coordinates on map
let monsterIdCounter = 0;
for (let i = 0; i < game.map.length; i++) {
    for (let j = 0; j < game.map[i].length; j++) {
        if (game.map[i][j] == 1) {
            // Tree sprite (non-collidable, just drawn)
            game.sprites.push({ id: "tree-sprite", x: j, y: i, width: 8, height: 16, active: false, data: null });
        } else if (game.map[i][j] == 3) {
            // Monster object with position, health, and sprite info
            const monster = {
                id: `monster_${monsterIdCounter}`,
                type: 'imp',
                skin: 'imp-sprite',
                audio: 'imp',
                x: j,
                y: i,
                health: 50,
                isDead: false,
                width: 484,
                height: 499,
                active: false,
                data: null // Will be filled with texture data
            };
            game.monsters.push(monster);
            monsterIdCounter++;
        } else if (game.map[i][j] == 4) {
            // Lion object with position, health, and sprite info
            const lion = {
                id: `monster_${monsterIdCounter}`,
                type: 'lion',
                skin: 'lion-sprite',
                audio: 'bigcat',
                x: j,
                y: i,
                health: 150,
                isDead: false,
                width: 665,
                height: 725,
                active: false,
                data: null // Will be filled with texture data
            };
            game.monsters.push(lion);
            monsterIdCounter++;
        } else if (game.map[i][j] == 5) {
            // Tiger object with position, health, and sprite info
            const tiger = {
                id: `monster_${monsterIdCounter}`,
                type: 'tiger',
                skin: 'tiger-sprite',
                audio: 'bigcat',
                x: j,
                y: i,
                health: 100,
                isDead: false,
                width: 256,
                height: 201,
                active: false,
                data: null // Will be filled with texture data
            };
            game.monsters.push(tiger);
            monsterIdCounter++;
        } else if (game.map[i][j] == 6) {
            // Bear object with position, health, and sprite info
            const bear = {
                id: `monster_${monsterIdCounter}`,
                type: 'bear',
                skin: 'bear-sprite',
                audio: 'bear',
                x: j,
                y: i,
                health: 250,
                isDead: false,
                width: 220,
                height: 237,
                active: false,
                data: null // Will be filled with texture data
            };
            game.monsters.push(bear);
            monsterIdCounter++;
        } else if (game.map[i][j] == 7) {
            // Yeti object with position, health, and sprite info
            const yeti = {
                id: `monster_${monsterIdCounter}`,
                type: 'yeti',
                skin: 'yeti-sprite',
                audio: 'bear',
                x: j,
                y: i,
                health: 550,
                isDead: false,
                width: 326,
                height: 384,
                active: false,
                data: null // Will be filled with texture data
            };
            game.monsters.push(yeti);
            monsterIdCounter++;
        } else if (game.map[i][j] == 8) {
            game.sprites.push({ id: "ammo-sprite", x: j, y: i, width: 100, height: 81, active: false, data: null });
        } else if (game.map[i][j] == 9) {
            game.sprites.push({ id: "pistolpickup-sprite", x: j, y: i, width: 34, height: 19, active: false, data: null });
        } else if (game.map[i][j] == 10) {
            game.sprites.push({ id: "machinegunpickup-sprite", x: j, y: i, width: 49, height: 30, active: false, data: null });
        } else if (game.map[i][j] == 11) {
            game.sprites.push({ id: "yetipistolpickup-sprite", x: j, y: i, width: 50, height: 33, active: false, data: null });
        } else if (game.map[i][j] == 12) {
            game.sprites.push({ id: "rocketlauncherpickup-sprite", x: j, y: i, width: 80, height: 17, active: false, data: null });
        } else if (game.map[i][j] == 13) {
            game.sprites.push({ id: "rocketammo-sprite", x: j, y: i, width: 35, height: 18, active: false, data: null });
        }
    }
}

// Calculated data
const s = game.screen;
game.screen.halfWidth = s.width / 2;
game.screen.halfHeight = s.height / 2;
game.player.halfFov = game.player.fov / 2;
game.projection.width = s.width / s.scale;
game.projection.height = s.height / s.scale;
game.projection.halfWidth = game.projection.width / 2;
game.projection.halfHeight = game.projection.height / 2;
game.rayCasting.incrementAngle = game.player.fov / game.projection.width;

// Canvas
const screen = document.createElement('canvas');
screen.width = game.screen.width;
screen.height = game.screen.height;
screen.style.border = "1px solid black";
document.body.appendChild(screen);

// Canvas context
const screenContext = screen.getContext("2d");
screenContext.scale(game.screen.scale, game.screen.scale);
screenContext.imageSmoothingEnabled = false;

// Buffer
game.projection.imageData = screenContext.createImageData(game.projection.width, game.projection.height);
game.projection.buffer = game.projection.imageData.data;

// Main loop
let mainLoop = null;

function degreeToRadians(degree) {
    let pi = Math.PI;
    return degree * pi / 180;
}

function Color(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

// Draw Pixel
function drawPixel(x, y, color) {
    if (color.r == 255 && color.g == 0 && color.b == 255) return;
    let offset = 4 * (Math.floor(x) + Math.floor(y) * game.projection.width);
    game.projection.buffer[offset] = color.r;
    game.projection.buffer[offset + 1] = color.g;
    game.projection.buffer[offset + 2] = color.b;
    game.projection.buffer[offset + 3] = color.a;
}

function drawLine(x1, y1, y2, color) {
    for (let y = y1; y < y2; y++) {
        drawPixel(x1, y, color);
    }
}

function drawFloor(x1, wallHeight, rayAngle) {
    start = game.projection.halfHeight + wallHeight + 1;
    directionCos = Math.cos(degreeToRadians(rayAngle))
    directionSin = Math.sin(degreeToRadians(rayAngle))
    playerAngle = game.player.angle
    for (y = start; y < game.projection.height; y++) {
        // Create distance and calculate it
        distance = game.projection.height / (2 * y - game.projection.height)
        // distance = distance * Math.cos(degreeToRadians(playerAngle) - degreeToRadians(rayAngle))

        // Get the tile position
        tilex = distance * directionCos
        tiley = distance * directionSin
        tilex += game.player.x
        tiley += game.player.y
        tile = game.map[Math.floor(tiley)][Math.floor(tilex)]

        // Get texture
        texture = game.floorTextures[0]

        if (!texture) {
            continue
        }

        // Define texture coords
        texture_x = (Math.floor(tilex * texture.width)) % texture.width
        texture_y = (Math.floor(tiley * texture.height)) % texture.height

        // Get pixel color
        color = texture.data[texture_x + texture_y * texture.width];
        drawPixel(x1, y, color)
    }
}

// Start
window.onload = function () {
    loadTextures();
    loadBackgrounds();
    loadSprites();
    main();
}

/**
 * Main loop
 */
function main() {
    mainLoop = setInterval(function () {
        inactiveSprites();
        clearScreen();
        movePlayer();
        updateGameObjects();
        rayCasting();
        drawSprites();
        renderBuffer();
        drawGun(screenContext);
    }, game.render.delay);
}

/**
 * Render buffer
 */
function renderBuffer() {
    let canvas = document.createElement('canvas');
    canvas.width = game.projection.width;
    canvas.height = game.projection.height;
    canvas.getContext('2d').putImageData(game.projection.imageData, 0, 0);
    screenContext.drawImage(canvas, 0, 0);
}

/**
 * Raycasting logic
 */
function rayCasting() {
    let rayAngle = game.player.angle - game.player.halfFov;
    for (let rayCount = 0; rayCount < game.projection.width; rayCount++) {

        // Ray data
        let ray = {
            x: game.player.x,
            y: game.player.y
        }

        // Ray path incrementers
        let rayCos = Math.cos(degreeToRadians(rayAngle)) / game.rayCasting.precision;
        let raySin = Math.sin(degreeToRadians(rayAngle)) / game.rayCasting.precision;

        // Wall finder
        let wall = 0;
        while (wall != 2) {
            ray.x += rayCos;
            ray.y += raySin;
            wall = game.map[Math.floor(ray.y)][Math.floor(ray.x)];
            activeSprites(ray.x, ray.y);
        }

        // Pythagoras theorem
        let distance = Math.sqrt(Math.pow(game.player.x - ray.x, 2) + Math.pow(game.player.y - ray.y, 2));

        // Fish eye fix
        distance = distance * Math.cos(degreeToRadians(rayAngle - game.player.angle));

        // Wall height
        let wallHeight = Math.floor(game.projection.halfHeight / distance);

        // Get texture
        let texture = game.textures[wall - 1];

        // Calcule texture position
        let texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

        // Draw
        drawBackground(rayCount, 0, game.projection.halfHeight - wallHeight, game.backgrounds[0]);
        drawTexture(rayCount, wallHeight, texturePositionX, texture);
        drawFloor(rayCount, wallHeight, rayAngle)

        // Increment
        rayAngle += game.rayCasting.incrementAngle;
    }
}

/**
 * Clear screen
 */
function clearScreen() {
    screenContext.clearRect(0, 0, game.projection.width, game.projection.height);
}

/**
 * Movement
 */
function movePlayer() {
    if (game.key.up.active) {
        let playerCos = Math.cos(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let newX = game.player.x + playerCos;
        let newY = game.player.y + playerSin;
        let checkX = Math.floor(newX + playerCos * game.player.radius);
        let checkY = Math.floor(newY + playerSin * game.player.radius);

        // Collision detection
        if (game.map[checkY][Math.floor(game.player.x)] != 2) {
            game.player.y = newY;
        }
        if (game.map[Math.floor(game.player.y)][checkX] != 2) {
            game.player.x = newX;
        }
        // Ammo pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 8) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.ammo += 8;
        }
        // Pistol pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 9) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.pistol = true;
        }
        // Machinegun pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 10) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.machinegun = true;
        }
        // Yeti pistol pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 11) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.yetipistol = true;
        }
        // Rocket launcher pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 12) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.rocketlauncher = true;
        }
        // Rocket ammo pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 13) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.rocketammo += 4;
        }
    }
    if (game.key.down.active) {
        let playerCos = Math.cos(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let newX = game.player.x - playerCos;
        let newY = game.player.y - playerSin;
        let checkX = Math.floor(newX - playerCos * game.player.radius);
        let checkY = Math.floor(newY - playerSin * game.player.radius);

        // Collision detection
        if (game.map[checkY][Math.floor(game.player.x)] != 2) {
            game.player.y = newY;
        }
        if (game.map[Math.floor(game.player.y)][checkX] != 2) {
            game.player.x = newX;
        }
        // Ammo pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 8) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.ammo += 8;
        }
        // Pistol pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 9) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.pistol = true;
        }
        // Machinegun pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 10) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.machinegun = true;
        }
        // Yeti pistol pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 11) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.yetipistol = true;
        }
        // Rocket launcher pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 12) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.weaponunlocked.rocketlauncher = true;
        }
        // Rocket ammo pickup
        if (game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] == 13) {
            game.map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
            itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
            game.rocketammo += 4;
        }
    }
    if (game.key.left.active) {
        game.player.angle -= game.player.speed.rotation;
        if (game.player.angle < 0) game.player.angle += 360;
        game.player.angle %= 360;
    }
    if (game.key.right.active) {
        game.player.angle += game.player.speed.rotation;
        if (game.player.angle < 0) game.player.angle += 360;
        game.player.angle %= 360;
    }
    if (game.key.space.active) {
        handleShooting();  
    }
    if (game.key.one.active && game.weaponunlocked.knife == true) {
        game.gunSprite = document.getElementById('knife-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 1;
    }
    if (game.key.two.active && game.weaponunlocked.pistol == true) {
        game.gunSprite = document.getElementById('gun-sprite');
        game.shootCooldown = 850;
        game.equippedWeapon = 2;
    }
    if (game.key.three.active && game.weaponunlocked.machinegun == true) {
        game.gunSprite = document.getElementById('machinegun-sprite');
        game.shootCooldown = 400;
        game.equippedWeapon = 3;
    }
    if (game.key.four.active && game.weaponunlocked.yetipistol == true) {
        game.gunSprite = document.getElementById('yetipistol-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 4;
    }
    if (game.key.five.active && game.weaponunlocked.rocketlauncher == true) {
        game.gunSprite = document.getElementById('rocketlauncher-sprite');
        game.shootCooldown = 1200;
        game.equippedWeapon = 5;
    }
}

/**
 * Key down check
 */
document.addEventListener('keydown', (event) => {
    let keyCode = event.code;

    if (keyCode === game.key.up.code) {
        game.key.up.active = true;
    }
    if (keyCode === game.key.down.code) {
        game.key.down.active = true;
    }
    if (keyCode === game.key.left.code) {
        game.key.left.active = true;
    }
    if (keyCode === game.key.right.code) {
        game.key.right.active = true;
    }
    if (keyCode === game.key.space.code) {
        game.key.space.active = true;
    }
    if (keyCode === game.key.one.code) {
        game.key.one.active = true;
    }
    if (keyCode === game.key.two.code) {
        game.key.two.active = true;
    }
    if (keyCode === game.key.three.code) {
        game.key.three.active = true;
    }
    if (keyCode === game.key.four.code) {
        game.key.four.active = true;
    }
    if (keyCode === game.key.five.code) {
        game.key.five.active = true;
    }
});

/**
 * Key up check
 */
document.addEventListener('keyup', (event) => {
    let keyCode = event.code;

    if (keyCode === game.key.up.code) {
        game.key.up.active = false;
    }
    if (keyCode === game.key.down.code) {
        game.key.down.active = false;
    }
    if (keyCode === game.key.left.code) {
        game.key.left.active = false;
    }
    if (keyCode === game.key.right.code) {
        game.key.right.active = false;
    }
    if (keyCode === game.key.space.code) {
        game.key.space.active = false;
    }
    if (keyCode === game.key.one.code) {
        game.key.one.active = false;
    }
    if (keyCode === game.key.two.code) {
        game.key.two.active = false;
    }
    if (keyCode === game.key.three.code) {
        game.key.three.active = false;
    }
    if (keyCode === game.key.four.code) {
        game.key.four.active = false;
    }
    if (keyCode === game.key.five.code) {
        game.key.five.active = false;
    }
});

function itemPickup(ycoords, xcoords) {
    const pickupSound = document.getElementById('pickup-sound');
    pickupSound.currentTime = 0;
    pickupSound.play();    
    let spritenum = 0;
    for (let sprite of game.sprites) {
        if (sprite.x == xcoords && sprite.y == ycoords) {
            game.sprites.splice(spritenum, 1);
            break;
        }
        spritenum++;
    }
}

function drawTexture(x, wallHeight, texturePositionX, texture) {
    let yIncrementer = (wallHeight * 2) / texture.height;
    let y = game.projection.halfHeight - wallHeight;
    let color = null
    for (let i = 0; i < texture.height; i++) {
        if (texture.id) {
            color = texture.data[texturePositionX + i * texture.width];
        } else {
            color = texture.colors[texture.bitmap[i][texturePositionX]];
        }
        drawLine(x, y, Math.floor(y + yIncrementer + 2), color);
        y += yIncrementer;
    }
}

/**
 * Load textures
 */
function loadTextures() {
    for (let i = 0; i < game.textures.length; i++) {
        if (game.textures[i].id) {
            game.textures[i].data = getTextureData(game.textures[i]);
        }
    }
    for (let i = 0; i < game.floorTextures.length; i++) {
        if (game.floorTextures[i].id) {
            game.floorTextures[i].data = getTextureData(game.floorTextures[i]);
        }
    }
}

/**
 * Load backgrounds
 */
function loadBackgrounds() {
    for (let i = 0; i < game.backgrounds.length; i++) {
        if (game.backgrounds[i].id) {
            game.backgrounds[i].data = getTextureData(game.backgrounds[i]);
        }
    }
}

/**
 * Load sprites
 */
function loadSprites() {
    for (let i = 0; i < game.sprites.length; i++) {
        if (game.sprites[i].id) {
            game.sprites[i].data = getTextureData(game.sprites[i]);
        }
    }
    // Load monster sprite data for all monsters
    for (let i = 0; i < game.monsters.length; i++) {
        if (!game.monsters[i].data) {
            // Use the monster sprite element for all monsters
            const monsterTexture = {
                id: game.monsters[i].skin,
                width: game.monsters[i].width,
                height: game.monsters[i].height
            };
            game.monsters[i].data = getTextureData(monsterTexture);
        }
    }
    // Load bullet sprite texture
    if (!game.bulletTexture.data) {
        game.bulletTexture.data = getTextureData(game.bulletTexture);
    }
    // Load laser sprite texture
    if (!game.laserTexture.data) {
        game.laserTexture.data = getTextureData(game.laserTexture);
    }
    // Load rocket sprite texture
    if (!game.rocketTexture.data) {
        game.rocketTexture.data = getTextureData(game.rocketTexture);
    }
}

function getTextureData(texture) {
    let image = document.getElementById(texture.id);
    let canvas = document.createElement('canvas');
    canvas.width = texture.width;
    canvas.height = texture.height;
    let canvasContext = canvas.getContext('2d');
    canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
    let imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;
    return parseImageData(imageData);
}

function parseImageData(imageData) {
    let colorArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
        colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]));
    }
    return colorArray;
}

/**
 * Window focus
 */
screen.onclick = function () {
    if (!mainLoop) {
        main();
    }
}

/**
 * Window focus lost event
 */
window.addEventListener('blur', function (event) {
    clearInterval(mainLoop);
    mainLoop = null;
    renderFocusLost();
});

/**
 * Render focus lost
 */
function renderFocusLost() {
    screenContext.fillStyle = 'rgba(0,0,0,0.5)';
    screenContext.fillRect(0, 0, game.projection.width, game.projection.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '10px Lucida Console';
    screenContext.fillText('CLICK TO FOCUS', game.projection.halfWidth / 2, game.projection.halfHeight);
}

function drawBackground(x, y1, y2, background) {
    let offset = (game.player.angle + x);
    for (let y = y1; y < y2; y++) {
        let textureX = Math.floor(offset % background.width);
        let textureY = Math.floor(y % background.height);
        let color = background.data[textureX + textureY * background.width];
        drawPixel(x, y, color);
    }
}

function radiansToDegrees(radians) {
    return 180 * radians / Math.PI;
}

function activeSprites(x, y) {
    const ACTIVATION_DISTANCE = 1.0;
    for (let sprite of game.sprites) {
        const dx = Math.abs(x - sprite.x);
        if (dx > ACTIVATION_DISTANCE) continue;
        const dy = Math.abs(y - sprite.y);
        if (dy > ACTIVATION_DISTANCE) continue;
        sprite.active = true;
    }
    for (let monster of game.monsters) {
        if (monster.isDead) continue;
        const dx = Math.abs(x - monster.x);
        if (dx > ACTIVATION_DISTANCE) continue;
        const dy = Math.abs(y - monster.y);
        if (dy > ACTIVATION_DISTANCE) continue;
        monster.active = true;
    }
}

/**
 * Inactive all of the sprites
 */
function inactiveSprites() {
    for (let sprite of game.sprites) sprite.active = false;
    for (let monster of game.monsters) monster.active = false;
}

function drawRect(x1, x2, y1, y2, color) {
    for (let x = x1; x < x2; x++) {
        if (x < 0) continue;
        if (x > game.projection.width) continue;
        drawLine(x, y1, y2, color);
    }
}

/**
 * Find the coordinates for all activated sprites and draw it in the projection
 */
function drawSprites() {
    // Draw trees and other non-monster sprites
    for (let i = 0; i < game.sprites.length; i++) {
        const sprite = game.sprites[i];
        if (sprite.active && sprite.data) {
            drawSpriteInWorld(sprite);
        }
    }
    // Draw monsters
    for (let monster of game.monsters) {
        if (!monster.isDead && monster.active && monster.data) {
            drawSpriteInWorld(monster);
        }
    }
    // Draw bullets
    for (let bullet of game.bullets) {
        const bulletSprite = {
            x: bullet.x,
            y: bullet.y,
            width: 4,
            height: 4,
            isBullet: true,
            color: new Color(255, 255, 0, 255)
        };
        drawSpriteInWorld(bulletSprite);
    }
}

// Separate sprite drawing logic into its own function
function drawSpriteInWorld(sprite) {
    // Get X and Y coords in relation of the player coords
    let spriteXRelative, spriteYRelative;
    if (sprite.isBullet) {
        spriteXRelative = sprite.x - game.player.x;
        spriteYRelative = sprite.y - game.player.y;
    } else {
        spriteXRelative = sprite.x + 0.5 - game.player.x;
        spriteYRelative = sprite.y + 0.5 - game.player.y;
    }

    // Get angle of the sprite in relation of the player angle
    let spriteAngleRadians = Math.atan2(spriteYRelative, spriteXRelative);
    let spriteAngle = radiansToDegrees(spriteAngleRadians) - Math.floor(game.player.angle - game.player.halfFov);

    // Sprite angle checking
    if (spriteAngle > 360) spriteAngle -= 360;
    if (spriteAngle < 0) spriteAngle += 360;

    // Three rule to discover the x position of the sprite
    let spriteX = Math.floor(spriteAngle * game.projection.width / game.player.fov);

    // SpriteX right position fix
    if (spriteX > game.projection.width) {
        spriteX %= game.projection.width;
        spriteX -= game.projection.width;
    }

    // Get the distance of the sprite (Pythagoras theorem)
    let distance = Math.sqrt(Math.pow(game.player.x - sprite.x, 2) + Math.pow(game.player.y - sprite.y, 2));

    // Calc sprite width and height
    let spriteHeight, spriteWidth;
    if (sprite.isBullet) {
        // Make bullet size scale with distance, but keep it visible and not too large
        // Use a larger base size for bullet, and clamp minimum distance for larger/closer start
        const baseBulletSize = 0.25; // larger for closer start
        const minDistance = 0.5; // clamp so bullet is always visible and large when just fired
        const effectiveDistance = Math.max(distance, minDistance);
        spriteHeight = Math.max(4, Math.floor(game.projection.halfHeight * baseBulletSize / effectiveDistance));
        spriteWidth = Math.max(4, Math.floor(game.projection.halfWidth * baseBulletSize / effectiveDistance));
        if (game.equippedWeapon == 1) {
            // Knife: don't draw bullet
            return;
        }
        drawBulletSprite(spriteX, spriteWidth, spriteHeight, sprite);
    } else {
        spriteHeight = Math.floor(game.projection.halfHeight / distance);
        spriteWidth = Math.floor(game.projection.halfWidth / distance);
        drawSprite(spriteX, spriteWidth, spriteHeight, sprite);
    }
}

// New function to draw bullet sprites
function drawBulletSprite(xProjection, spriteWidth, spriteHeight, bullet) {
    // Use bullet sprite texture instead of a filled rectangle
    let texture;
    if (game.equippedWeapon == 4) {
        texture = game.laserTexture;
    } else if (game.equippedWeapon == 5) {
        texture = game.rocketTexture;
    } else {
        texture = game.bulletTexture;
    }
    if (!texture.data) return;
    // Clamp sprite size
    spriteWidth = Math.max(4, Math.min(spriteWidth, texture.width));
    spriteHeight = Math.max(4, Math.min(spriteHeight, texture.height));
    // Center the bullet
    xProjection = xProjection - spriteWidth / 2;
    let yProjection = game.projection.halfHeight - spriteHeight / 2;
    // Precalculate texture step sizes
    const texStepX = texture.width / spriteWidth;
    const texStepY = texture.height / spriteHeight;
    // Clamp drawing bounds to screen edges
    const startX = Math.max(0, Math.floor(xProjection));
    const endX = Math.min(game.projection.width, Math.ceil(xProjection + spriteWidth));
    const endY = Math.min(game.projection.height - yProjection, spriteHeight);
    for (let stripe = startX - Math.floor(xProjection); stripe < spriteWidth && startX + stripe < endX; stripe++) {
        const xPos = startX + stripe;
        const texX = Math.floor(stripe * texStepX);
        for (let y = 0; y < endY; y++) {
            const texY = Math.floor(y * texStepY);
            const color = texture.data[texX + texY * texture.width];
            // Skip fully transparent pixels (alpha = 0) or magenta pixels
            if (color && color.a > 0 && !(color.r === 255 && color.g === 0 && color.b === 255)) {
                drawPixel(xPos, yProjection + y, color);
            }
        }
    }
}

function drawSprite(xProjection, spriteWidth, spriteHeight, sprite) {
    // Early bounds check for the entire sprite
    if (xProjection + spriteWidth < 0 || xProjection >= game.projection.width) return;

    // Only draw if sprite has valid texture data
    if (!sprite.data) return;

    // Precalculate texture step sizes
    const texStepX = sprite.width / spriteWidth;
    const texStepY = sprite.height / spriteHeight;

    // Get Y position for sprite (center it vertically)
    const yProjection = game.projection.halfHeight - spriteHeight / 2;

    // Clamp drawing bounds to screen edges
    const startX = Math.max(0, Math.floor(xProjection));
    const endX = Math.min(game.projection.width, Math.ceil(xProjection + spriteWidth));
    const endY = Math.min(game.projection.height - yProjection, spriteHeight);

    // For each vertical line of the sprite
    for (let stripe = startX - Math.floor(xProjection); stripe < spriteWidth && startX + stripe < endX; stripe++) {
        const xPos = startX + stripe;
        const texX = Math.floor(stripe * texStepX);

        // Draw the vertical stripe of the sprite
        for (let y = 0; y < endY; y++) {
            const texY = Math.floor(y * texStepY);
            const color = sprite.data[texX + texY * sprite.width];

            // Skip fully transparent pixels (alpha = 0) or magenta pixels
            if (color && color.a > 0 && !(color.r === 255 && color.g === 0 && color.b === 255)) {
                drawPixel(xPos, yProjection + y, color);
            }
        }
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 0.2;
    }

    update() {
        this.x += Math.cos(degreeToRadians(this.angle)) * this.speed;
        this.y += Math.sin(degreeToRadians(this.angle)) * this.speed;
    }
}

function handleShooting(e) {
    const currentTime = Date.now();
    if (currentTime - game.lastShot >= game.shootCooldown) {
        game.isShooting = true;
        game.lastShot = currentTime;

        if ((game.equippedWeapon == 2 || game.equippedWeapon == 3) && game.ammo <= 0 || ((game.equippedWeapon == 5) && game.rocketammo <= 0)){
            const gunclickSound = document.getElementById('gunclick-sound');
            gunclickSound.currentTime = 0;
            gunclickSound.play();
            return;
        }

        // Start the bullet slightly in front of the player in the direction they're facing
        const bulletStartDistance = 0.5; // How far in front of the player the bullet starts
        const startX = game.player.x + Math.cos(degreeToRadians(game.player.angle)) * bulletStartDistance;
        const startY = game.player.y + Math.sin(degreeToRadians(game.player.angle)) * bulletStartDistance;

        const bullet = new Bullet(startX, startY, game.player.angle);
        game.bullets.push(bullet);

        if (game.equippedWeapon == 1) {
            const knifeSound = document.getElementById('knife-sound');
            knifeSound.currentTime = 0;
            knifeSound.play();
        } else if (game.equippedWeapon == 4) {
            const laserSound = document.getElementById('laser-sound');
            laserSound.currentTime = 0;
            laserSound.play();
        } else if (game.equippedWeapon == 5) {
            const rocketlaunchSound = document.getElementById('rocketlaunch-sound');
            rocketlaunchSound.currentTime = 0;
            rocketlaunchSound.play();
            game.rocketammo--;
        } else {
            const shootSound = document.getElementById('shoot-sound');
            shootSound.currentTime = 0;
            shootSound.play();
            game.ammo--;
        }
    }
}

function updateGameObjects() {
    // Update bullets
    for (let i = game.bullets.length - 1; i >= 0; i--) {
        const bullet = game.bullets[i];
        bullet.update();
        // Stop bullet if it hits a wall
        const mapX = Math.floor(bullet.x);
        const mapY = Math.floor(bullet.y);
        if (game.map[mapY] && game.map[mapY][mapX] === 2) {
            game.bullets.splice(i, 1);
            if (game.equippedWeapon == 5) {
                const explosionSound = document.getElementById('explosion-sound');
                explosionSound.currentTime = 0;
                explosionSound.play();
            }
            continue;
        }
        // Check collision with monsters only
        for (const monster of game.monsters) {
            if (!monster.isDead) {
                const dx = monster.x - bullet.x;
                const dy = monster.y - bullet.y;
                const distance = dx * dx + dy * dy;
                if (distance < 0.25) { // Use squared distance for perf
                    if (monster.type == 'yeti') {
                        if (game.equippedWeapon != 4) {
                            const yetilaughSound = document.getElementById('yeti-laugh');
                            yetilaughSound.currentTime = 0;
                            yetilaughSound.play();
                            game.bullets.splice(i, 1);
                            break;
                        } else {
                            monster.health -= 75;
                        }
                    } else {
                        if (game.equippedWeapon == 4) {
                            monster.health -= 75;
                        } else if (game.equippedWeapon == 5) {
                            const explosionSound = document.getElementById('explosion-sound');
                            explosionSound.currentTime = 0;
                            explosionSound.play();
                            monster.health -= 150;
                        } else {
                            monster.health -= 25;
                        }
                    }                
                    if (monster.health <= 0) {
                        monster.isDead = true;
                        const deathSound = document.getElementById(`${monster.audio}-death`);
                        deathSound.currentTime = 0;
                        deathSound.play();
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, active: false, data: null });
                        loadSprites();
                    } else {
                        var rnd = Math.floor(Math.random() * 3);
                        if (rnd == 0) {
                            const painSound1 = document.getElementById(`${monster.audio}-pain-1`);
                            painSound1.currentTime = 0;
                            painSound1.play();
                        } else if (rnd == 1) {
                            const painSound2 = document.getElementById(`${monster.audio}-pain-2`);
                            painSound2.currentTime = 0;
                            painSound2.play();
                        } else {
                            const painSound3 = document.getElementById(`${monster.audio}-pain-3`);
                            painSound3.currentTime = 0;
                            painSound3.play();
                        }
                    }
                    game.bullets.splice(i, 1);
                    break;
                }
            }
        }
        // Remove bullets that have traveled too far
        if (game.equippedWeapon == 1) {
            if (game.bullets[i] && ((bullet.x - game.player.x) ** 2 + (bullet.y - game.player.y) ** 2 > 1)) {
                game.bullets.splice(i, 1);
            }
        } else if (game.equippedWeapon == 5) {
            if (game.bullets[i] && ((bullet.x - game.player.x) ** 2 + (bullet.y - game.player.y) ** 2 > 400)) {
                const explosionSound = document.getElementById('explosion-sound');
                explosionSound.currentTime = 0;
                explosionSound.play();
                game.bullets.splice(i, 1);
            }
        } else {
            if (game.bullets[i] && ((bullet.x - game.player.x) ** 2 + (bullet.y - game.player.y) ** 2 > 400)) {
                game.bullets.splice(i, 1);
            }
        }
    }
    // Update monster positions
    for (let monster of game.monsters) {
        if (!monster.isDead) {
            const dx = game.player.x - monster.x;
            const dy = game.player.y - monster.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0.5 && distance < 10) {
                const moveSpeed = 0.02;
                const invDist = 1 / distance;
                const dirX = dx * invDist * moveSpeed;
                const dirY = dy * invDist * moveSpeed;
                // Try to move in X direction
                const newX = monster.x + dirX;
                if (game.map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                    monster.x = newX;
                }
                // Try to move in Y direction
                const newY = monster.y + dirY;
                if (game.map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                    monster.y = newY;
                }
            }
        }
    }
}

function drawGun(ctx) {
    if (game.isShooting) {
        ctx.drawImage(game.gunSprite,
            game.projection.width / 2 - 80,
            game.projection.height - 170,
            160, 160
        );
        game.isShooting = false;
    } else {
        ctx.drawImage(game.gunSprite,
            game.projection.width / 2 - 80,
            game.projection.height - 155,
            160, 160
        );
    }
}
