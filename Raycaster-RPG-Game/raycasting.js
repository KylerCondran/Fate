// State
let state = {
    monsters: [],
    bullets: [],
    gunSprite: document.getElementById('gun-sprite'),
    monsterSprite: document.getElementById('monster-sprite'),
    isShooting: false,
    lastShot: 0,
    shootCooldown: 850
};

// Data
let data = {
    screen: {
        width: 1500,
        height: 680,
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
            movement: 0.04,
            rotation: 0.7
        }
    },
    map: [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,2],
        [2,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,3,0,0,0,0,2,0,2,2,2,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,3,0,0,2],
        [2,0,0,0,0,0,0,0,2,0,0,3,2,0,0,0,0,0,0,2],
        [2,0,0,1,0,0,0,0,2,2,0,2,2,0,0,0,1,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,1,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    ],
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
        }
    },
    textures: [
        {
            width: 8,
            height: 8,
            bitmap: [
                [1,1,1,1,1,1,1,1],
                [0,0,0,1,0,0,0,1],
                [1,1,1,1,1,1,1,1],
                [0,1,0,0,0,1,0,0],
                [1,1,1,1,1,1,1,1],
                [0,0,0,1,0,0,0,1],
                [1,1,1,1,1,1,1,1],
                [0,1,0,0,0,1,0,0]
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
    backgrounds: [
        {
            width: 360,
            height: 60,
            id: "background",
            data: null
        }
    ],
    sprites: []
}

// Add initial sprite data programatically based on coordinates on map
for (let i = 0; i < 19; i++) {
    for (let j = 0; j < 18; j++) {
        if (data.map[i][j] == 1) {
            data.sprites.push({ id: "tree", x: j, y: i, width: 8, height: 16, active: false, data: null });
        } else if (data.map[i][j] == 3) {
            data.sprites.push({ id: "monster-sprite", x: j, y: i, width: 32, height: 32, active: false, data: null, isMonster: true});
            state.monsters.push({ x: j, y: i, health: 100, isDead: false });
        }
    }
}

// Calculated data
data.screen.halfWidth = data.screen.width / 2;
data.screen.halfHeight = data.screen.height / 2;
data.player.halfFov = data.player.fov / 2;
data.projection.width = data.screen.width / data.screen.scale;
data.projection.height = data.screen.height / data.screen.scale;
data.projection.halfWidth = data.projection.width / 2;
data.projection.halfHeight = data.projection.height / 2;
data.rayCasting.incrementAngle = data.player.fov / data.projection.width;

// Canvas
const screen = document.createElement('canvas');
screen.width = data.screen.width;
screen.height = data.screen.height;
screen.style.border = "1px solid black";
document.body.appendChild(screen);

// Canvas context
const screenContext = screen.getContext("2d");
screenContext.scale(data.screen.scale, data.screen.scale);
screenContext.imageSmoothingEnabled = false;

// Buffer
data.projection.imageData = screenContext.createImageData(data.projection.width, data.projection.height);
data.projection.buffer = data.projection.imageData.data;

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
    if(color.r == 255 && color.g == 0 && color.b == 255) return;
    let offset = 4 * (Math.floor(x) + Math.floor(y) * data.projection.width);
    data.projection.buffer[offset  ] = color.r;
    data.projection.buffer[offset+1] = color.g;
    data.projection.buffer[offset+2] = color.b;
    data.projection.buffer[offset+3] = color.a;
}

function drawLine(x1, y1, y2, color) {
    for(let y = y1; y < y2; y++) {
        drawPixel(x1, y, color);
    }
}

function drawFloor(x1, wallHeight, rayAngle) {
    start = data.projection.halfHeight + wallHeight + 1;
    directionCos = Math.cos(degreeToRadians(rayAngle))
    directionSin = Math.sin(degreeToRadians(rayAngle))
    playerAngle = data.player.angle
    for(y = start; y < data.projection.height; y++) {
        // Create distance and calculate it
        distance = data.projection.height / (2 * y - data.projection.height)
        // distance = distance * Math.cos(degreeToRadians(playerAngle) - degreeToRadians(rayAngle))

        // Get the tile position
        tilex = distance * directionCos
        tiley = distance * directionSin
        tilex += data.player.x
        tiley += data.player.y
        tile = data.map[Math.floor(tiley)][Math.floor(tilex)]
        
        // Get texture
        texture = data.floorTextures[0]

        if(!texture) {
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
    mainLoop = setInterval(function() {
        inactiveSprites();
        clearScreen();
        movePlayer();
        updateGameObjects();
        syncMonsterState();
        rayCasting();
        drawSprites();       
        renderBuffer();
        drawGun(screenContext);
    }, data.render.delay);
}

/**
 * Render buffer
 */
function renderBuffer() {
    let canvas = document.createElement('canvas');
    canvas.width = data.projection.width;
    canvas.height = data.projection.height;
    canvas.getContext('2d').putImageData(data.projection.imageData, 0, 0);
    screenContext.drawImage(canvas, 0, 0);
}

/**
 * Raycasting logic
 */
function rayCasting() {
    let rayAngle = data.player.angle - data.player.halfFov;
    for(let rayCount = 0; rayCount < data.projection.width; rayCount++) {
        
        // Ray data
        let ray = {
            x: data.player.x,
            y: data.player.y
        }

        // Ray path incrementers
        let rayCos = Math.cos(degreeToRadians(rayAngle)) / data.rayCasting.precision;
        let raySin = Math.sin(degreeToRadians(rayAngle)) / data.rayCasting.precision;
        
        // Wall finder
        let wall = 0;
        while(wall != 2) {
            ray.x += rayCos;
            ray.y += raySin;
            wall = data.map[Math.floor(ray.y)][Math.floor(ray.x)];
            activeSprites(ray.x, ray.y);
        }

        // Pythagoras theorem
        let distance = Math.sqrt(Math.pow(data.player.x - ray.x, 2) + Math.pow(data.player.y - ray.y, 2));

        // Fish eye fix
        distance = distance * Math.cos(degreeToRadians(rayAngle - data.player.angle));

        // Wall height
        let wallHeight = Math.floor(data.projection.halfHeight / distance);

        // Get texture
        let texture = data.textures[wall - 1];

        // Calcule texture position
        let texturePositionX = Math.floor((texture.width * (ray.x + ray.y)) % texture.width);

        // Draw
        drawBackground(rayCount, 0, data.projection.halfHeight - wallHeight, data.backgrounds[0]);
        drawTexture(rayCount, wallHeight, texturePositionX, texture);
        drawFloor(rayCount, wallHeight, rayAngle)

        // Increment
        rayAngle += data.rayCasting.incrementAngle;
    }
}

/**
 * Clear screen
 */
function clearScreen() {
    screenContext.clearRect(0, 0, data.projection.width, data.projection.height);
}

/**
 * Movement
 */
function movePlayer() {
    if(data.key.up.active) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x + playerCos;
        let newY = data.player.y + playerSin;
        let checkX = Math.floor(newX + playerCos * data.player.radius);
        let checkY = Math.floor(newY + playerSin * data.player.radius);

        // Collision detection
        if(data.map[checkY][Math.floor(data.player.x)] != 2) {
            data.player.y = newY;
        }
        if(data.map[Math.floor(data.player.y)][checkX] != 2) {
            data.player.x = newX;
        } 

    }
    if(data.key.down.active) {
        let playerCos = Math.cos(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(data.player.angle)) * data.player.speed.movement;
        let newX = data.player.x - playerCos;
        let newY = data.player.y - playerSin;
        let checkX = Math.floor(newX - playerCos * data.player.radius);
        let checkY = Math.floor(newY - playerSin * data.player.radius);

        // Collision detection
        if(data.map[checkY][Math.floor(data.player.x)] != 2) {
            data.player.y = newY;
        }
        if(data.map[Math.floor(data.player.y)][checkX] != 2) {
            data.player.x = newX;
        } 
    }
    if(data.key.left.active) {
        data.player.angle -= data.player.speed.rotation;
        if(data.player.angle < 0) data.player.angle += 360;
        data.player.angle %= 360;
    }
    if(data.key.right.active) {
        data.player.angle += data.player.speed.rotation;
        if(data.player.angle < 0) data.player.angle += 360;
        data.player.angle %= 360;
    } 
    if (data.key.space.active) {
        handleShooting();
    }
}

/**
 * Key down check
 */
document.addEventListener('keydown', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.up.code) {
        data.key.up.active = true;
    } 
    if(keyCode === data.key.down.code) {
        data.key.down.active = true;
    } 
    if(keyCode === data.key.left.code) {
        data.key.left.active = true;
    } 
    if(keyCode === data.key.right.code) {
        data.key.right.active = true;
    } 
    if (keyCode === data.key.space.code) {
        data.key.space.active = true;
    }
});

/**
 * Key up check
 */
document.addEventListener('keyup', (event) => {
    let keyCode = event.code;

    if(keyCode === data.key.up.code) {
        data.key.up.active = false;
    } 
    if(keyCode === data.key.down.code) {
        data.key.down.active = false;
    } 
    if(keyCode === data.key.left.code) {
        data.key.left.active = false;
    } 
    if(keyCode === data.key.right.code) {
        data.key.right.active = false;
    } 
    if (keyCode === data.key.space.code) {
        data.key.space.active = false;
    }
});

function drawTexture(x, wallHeight, texturePositionX, texture) {
    let yIncrementer = (wallHeight * 2) / texture.height;
    let y = data.projection.halfHeight - wallHeight;
    let color = null
    for(let i = 0; i < texture.height; i++) {
        if(texture.id) {            
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
    for(let i = 0; i < data.textures.length; i++) {
        if(data.textures[i].id) {
            data.textures[i].data = getTextureData(data.textures[i]);
        }
    }
    for(let i = 0; i < data.floorTextures.length; i++) {
        if(data.floorTextures[i].id) {
            data.floorTextures[i].data = getTextureData(data.floorTextures[i]);
        }
    }
}

/**
 * Load backgrounds
 */
function loadBackgrounds() {
    for(let i = 0; i < data.backgrounds.length; i++) {
        if(data.backgrounds[i].id) {
            data.backgrounds[i].data = getTextureData(data.backgrounds[i]);
        }
    }
}

/**
 * Load sprites
 */
function loadSprites() {
    for(let i = 0; i < data.sprites.length; i++) {
        if(data.sprites[i].id) {
            data.sprites[i].data = getTextureData(data.sprites[i]);
        }
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
        colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], 255));
    }
    return colorArray;
}

/**
 * Window focus
 */
screen.onclick = function() {
    if(!mainLoop) {
        main();
    }
}

/**
 * Window focus lost event
 */
window.addEventListener('blur', function(event) {
    clearInterval(mainLoop);
    mainLoop = null;
    renderFocusLost();
});

/**
 * Render focus lost
 */
function renderFocusLost() {
    screenContext.fillStyle = 'rgba(0,0,0,0.5)';
    screenContext.fillRect(0, 0, data.projection.width, data.projection.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '10px Lucida Console';
    screenContext.fillText('CLICK TO FOCUS',data.projection.halfWidth/2,data.projection.halfHeight);
}

function drawBackground(x, y1, y2, background) {
    let offset = (data.player.angle + x);
    for(let y = y1; y < y2; y++) {
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
    for(let i = 0; i < data.sprites.length; i++) {
        if(data.sprites[i].x == Math.floor(x) && data.sprites[i].y == Math.floor(y)) {
            data.sprites[i].active = true;
        }
    }
}

/**
 * Inactive all of the sprites
 */
function inactiveSprites() {
    for(let i = 0; i < data.sprites.length; i++) {
        data.sprites[i].active = false;
    }
}

function drawRect(x1, x2, y1, y2, color) {
    for(let x = x1; x < x2; x++) {
        if(x < 0) continue;
        if(x > data.projection.width) continue;
        drawLine(x, y1, y2, color);
    }
}

/**
 * Find the coordinates for all activated sprites and draw it in the projection
 */
function drawSprites() {
    // Draw regular sprites
    for(let i = 0; i < data.sprites.length; i++) {
        if(data.sprites[i].active) {
            drawSpriteInWorld(data.sprites[i]);
        }
    }
    
    // Draw bullets
    for(let bullet of state.bullets) {
        // Create a temporary sprite object for the bullet
        const bulletSprite = {
            x: bullet.x,
            y: bullet.y,
            width: 4,  // Small size for bullets
            height: 4,
            isBullet: true,
            // Make bullet yellow
            color: new Color(255, 255, 0, 255)
        };
        drawSpriteInWorld(bulletSprite);
    }
}

// Separate sprite drawing logic into its own function
function drawSpriteInWorld(sprite) {
    // Get X and Y coords in relation of the player coords
    let spriteXRelative = sprite.x + 0.5 - data.player.x;
    let spriteYRelative = sprite.y + 0.5 - data.player.y;

    // Get angle of the sprite in relation of the player angle
    let spriteAngleRadians = Math.atan2(spriteYRelative, spriteXRelative);
    let spriteAngle = radiansToDegrees(spriteAngleRadians) - Math.floor(data.player.angle - data.player.halfFov);

    // Sprite angle checking
    if(spriteAngle > 360) spriteAngle -= 360;
    if(spriteAngle < 0) spriteAngle += 360;

    // Three rule to discover the x position of the sprite
    let spriteX = Math.floor(spriteAngle * data.projection.width / data.player.fov);

    // SpriteX right position fix
    if(spriteX > data.projection.width) {
        spriteX %= data.projection.width;
        spriteX -= data.projection.width;
    }
    
    // Get the distance of the sprite (Pythagoras theorem)
    let distance = Math.sqrt(Math.pow(data.player.x - sprite.x, 2) + Math.pow(data.player.y - sprite.y, 2));

    // Calc sprite width and height
    let spriteHeight = Math.floor(data.projection.halfHeight / distance);
    let spriteWidth = Math.floor(data.projection.halfWidth / distance);    // Draw the sprite
    if (sprite.isBullet) {
        drawBulletSprite(spriteX, spriteWidth, spriteHeight, sprite);
    } else {
        drawSprite(spriteX, spriteWidth, spriteHeight, sprite);
    }
}

// New function to draw bullet sprites
function drawBulletSprite(xProjection, spriteWidth, spriteHeight, bullet) {
    // Make bullets smaller than regular sprites and always square
    let size = Math.max(2, Math.min(spriteWidth, spriteHeight) / 4);
    spriteWidth = size;
    spriteHeight = size;

    // Center the bullet
    xProjection = xProjection - spriteWidth / 2;
    let yProjection = data.projection.halfHeight - spriteHeight / 2;

    // Draw a simple filled rectangle for the bullet
    drawRect(
        xProjection, 
        xProjection + spriteWidth, 
        yProjection, 
        yProjection + spriteHeight, 
        bullet.color
    );
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
    if (currentTime - state.lastShot >= state.shootCooldown) {
        state.isShooting = true;
        state.lastShot = currentTime;
            
        // Start the bullet slightly in front of the player in the direction they're facing
        const bulletStartDistance = 0.5; // How far in front of the player the bullet starts
        const startX = data.player.x + Math.cos(degreeToRadians(data.player.angle)) * bulletStartDistance;
        const startY = data.player.y + Math.sin(degreeToRadians(data.player.angle)) * bulletStartDistance;
        
        const bullet = new Bullet(startX, startY, data.player.angle);
        state.bullets.push(bullet);

        const shootSound = document.getElementById('shoot-sound');
        shootSound.currentTime = 0;
        shootSound.play();
    }
}

function updateGameObjects() {
    // Update bullets
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const bullet = state.bullets[i];
        bullet.update();

        // Stop bullet if it hits a wall
        const mapX = Math.floor(bullet.x);
        const mapY = Math.floor(bullet.y);
        if (data.map[mapY] && data.map[mapY][mapX] === 2) {
            state.bullets.splice(i, 1);
            continue;
        }

        // Check collision with monsters
        for (const monster of state.monsters) {
            if (!monster.isDead) {
                const dx = monster.x - bullet.x;
                const dy = monster.y - bullet.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 0.5) {
                    monster.health -= 25;                 
                    if (monster.health <= 0) {
                        monster.isDead = true;
                        const deathSound = document.getElementById('monster-death');
                        deathSound.currentTime = 0;
                        deathSound.play();
                    } else {
                        var rnd = Math.floor(Math.random() * 3);
                        if (rnd == 0) {
                            const painSound1 = document.getElementById('monster-scream-1');
                            painSound1.currentTime = 0;
                            painSound1.play();
                        } else if (rnd == 1) {
                            const painSound2 = document.getElementById('monster-scream-2');
                            painSound2.currentTime = 0;
                            painSound2.play();
                        } else {
                            const painSound3 = document.getElementById('monster-scream-3');
                            painSound3.currentTime = 0;
                            painSound3.play();
                        }              
                    }
                    state.bullets.splice(i, 1);
                    break;
                }
            }
        }

        // Remove bullets that have traveled too far
        if (state.bullets[i] && (Math.abs(bullet.x - data.player.x) > 20 || Math.abs(bullet.y - data.player.y) > 20)) {
            state.bullets.splice(i, 1);
        }
    }
}

function drawGun(ctx) {
    if (state.isShooting) {
        ctx.drawImage(state.gunSprite, 
            data.projection.width/2 - 80, 
            data.projection.height - 170,
            160, 160
        );
        state.isShooting = false;
    } else {
        ctx.drawImage(state.gunSprite, 
            data.projection.width/2 - 80, 
            data.projection.height - 155,
            160, 160
        );
    }
}

function syncMonsterState() {
    for (let monster of state.monsters) {
        for (let sprite of data.sprites) {
            if (sprite.isMonster && sprite.x === monster.x && sprite.y === monster.y) {
                sprite.health = monster.health;
            }
        }
    }
}

function drawSprite(xProjection, spriteWidth, spriteHeight, sprite) {
    // Skip dead monsters
    if (sprite.isMonster && sprite.health <= 0) {
        return;
    }

    // Decrement halfwidth of the sprite to consider the middle of the sprite to draw 
    xProjection = xProjection - sprite.width;

    // Define the projection incrementers for draw
    let xIncrementer = (spriteWidth) / sprite.width;
    let yIncrementer = (spriteHeight * 2) / sprite.height;

    // Iterate sprite width and height
    for(let spriteX = 0; spriteX < sprite.width; spriteX += 1) {
        // Define the Y cursor to draw
        let yProjection = data.projection.halfHeight - spriteHeight;

        for(let spriteY = 0; spriteY < sprite.height; spriteY++) {
            let color = sprite.data[spriteX + spriteY * sprite.width];
            
            // Skip transparent pixels
            if (color.r === 255 && color.g === 0 && color.b === 255) continue;
            
            drawRect(xProjection, xProjection + xIncrementer, yProjection, yProjection + yIncrementer, color);

            // Increment Y
            yProjection += yIncrementer;
        }

        // Increment X
        xProjection += xIncrementer;
    }
}