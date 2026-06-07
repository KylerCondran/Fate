// Unified game state and data object
let game = {
    currentLevel: 0,
    monsters: [], // Each monster will have position, health, sprite, etc.
    sprites: [], // Only trees and other non-monster sprites
    checkpoints: [], // Checkpoints for pre scripted NPC pathing
    projectiles: [], // Bullets, rockets, etc.
    notifications: [], // Array to hold active notification messages
    weaponSprite: document.getElementById('knife-sprite'),
    equippedWeapon: 1,
    ammo: 0,
    rocketammo: 0,
    boomerangammo: 0,
    tridentammo: true,
    laserbattery: 100,
    laserrechargetick: 0,
    lastShot: 0,
    shootCooldown: 600,
    bulletHitboxRadius: 0.25,
    explosionHitboxRadius: 5,
    bulletRange: 400,
    objectCullDistance: 2000,
    knifeRange: 1,
    bulletStartDistance: 0.5,
    activationDistance: 1.0,
    monsterTotal: 0,
    monsterDefeated: 0,
    pickupTotal: 0,
    pickupCollected: 0,
    checkpointTotal: 0,
    lastMonsterToHitPlayer: 'Unknown',
    playerFrozen: false,
    playerFrozenTime: 0,
    playerFrozenDuration: 0,
    activeGravityWell: null,
    weaponsUnlocked: {
        knife: true,
        pistol: false,
        machinegun: false,
        yetipistol: false,
        rocketlauncher: false,
        scepter: false,
        boomerang: false,
        lasershotgun: false,
        trident: false
    },
    savedWeaponState: null,
    keysUnlocked: {
        cowkey: false,
        monkeykey: false,
        goatkey: false,
        cellkey: false
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
        precision: 32
    },
    player: {
        fov: 60,
        halfFov: null,
        x: 2,
        y: 2,
        angle: 0,
        radius: 20,
        health: 100,
        maxHealth: 100,
        speed: {
            movement: 0.08,
            rotation: 1.5
        }
    },
    levels: JSON.parse(JSON.stringify(window.LevelData)),
    cheats: {
        infiniteAmmo: false,
        godMode: false,
        allWeapons: false,
        unlockAllLevels: false,
        megaSpawns: false,
        speedBoost: false,
        randomStart: false,
        rapidFire: false,
        randomizeEnemies: false
    },
    developerMode: false,
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
        },
        six: {
            code: "Digit6",
            active: false
        },
        seven: {
            code: "Digit7",
            active: false
        },
        eight: {
            code: "Digit8",
            active: false
        },
        nine: {
            code: "Digit9",
            active: false
        },
        strafeleft: {
            code: "KeyA",
            active: false
        },
        straferight: {
            code: "KeyD",
            active: false
        }
    },
    textures: [
        {
            number: 0,
            width: 16,
            height: 16,
            id: "texture",
            data: null
        },
        {
            number: 1,
            width: 16,
            height: 16,
            id: "texture2",
            data: null
        },
        {
            number: 2,
            width: 16,
            height: 16,
            id: "invis",
            data: null
        },
        {
            number: 3,
            width: 16,
            height: 16,
            id: "ice",
            data: null
        },
        {
            number: 4,
            width: 16,
            height: 16,
            id: "grass-texture",
            data: null
        },
        {
            number: 5,
            width: 16,
            height: 16,
            id: "lava-texture",
            data: null
        },
        {
            number: 6,
            width: 16,
            height: 16,
            id: "woods-texture",
            data: null
        },
        {
            number: 7,
            width: 16,
            height: 16,
            id: "cloud",
            data: null
        },
        {
            number: 8,
            width: 16,
            height: 16,
            id: "sand-texture",
            data: null
        },
        {
            number: 9,
            width: 16,
            height: 16,
            id: "tech-texture",
            data: null
        },
        {
            number: 10,
            width: 16,
            height: 16,
            id: "water-texture",
            data: null
        },
        {
            number: 11,
            width: 16,
            height: 16,
            id: "fence-texture",
            data: null
        },
        {
            number: 12,
            width: 16,
            height: 16,
            id: "sandstone-texture",
            data: null
        },
        {
            number: 13,
            width: 16,
            height: 16,
            id: "cobblestone-texture",
            data: null
        },
        {
            number: 14,
            width: 16,
            height: 16,
            id: "cobblestonebrick-texture",
            data: null
        },
        {
            number: 15,
            width: 16,
            height: 16,
            id: "dirt-texture",
            data: null
        },
        {
            number: 16,
            width: 16,
            height: 16,
            id: "cobblestonemossy-texture",
            data: null
        },
        {
            number: 17,
            width: 16,
            height: 16,
            id: "cobblestonebrickmossy-texture",
            data: null
        },
        {
            number: 18,
            width: 16,
            height: 16,
            id: "bamboo-texture",
            data: null
        },
        {
            number: 19,
            width: 16,
            height: 16,
            id: "bambooplank-texture",
            data: null
        },
        {
            number: 20,
            width: 16,
            height: 16,
            id: "magma-texture",
            data: null
        },
        {
            number: 21,
            width: 16,
            height: 16,
            id: "volcanic-texture",
            data: null
        },
        {
            number: 22,
            width: 16,
            height: 16,
            id: "star-texture",
            data: null
        },
        {
            number: 23,
            width: 16,
            height: 16,
            id: "checkerboard-texture",
            data: null
        },
        {
            number: 24,
            width: 16,
            height: 16,
            id: "door-texture",
            data: null
        }
    ],
    projectileTextures: [
        {
            number: 0,
            id: 'bullet-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 1,
            id: 'laser-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 2,
            id: 'rocket-sprite',
            width: 16,
            height: 23,
            data: null
        },
        {
            number: 3,
            id: 'inboundrocket-sprite',
            width: 16,
            height: 23,
            data: null
        },
        {
            number: 4,  
            id: 'orb-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 5,
            id: 'boomerang-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 6,
            id: 'shuriken-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 7,
            id: 'waterorb-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 8,
            id: 'eyeballprojectile-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 9,
            id: 'fireball-sprite',
            width: 26,
            height: 34,
            data: null
        },
        {
            number: 10,
            id: 'web-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 11,
            id: 'laserpurple-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 12,
            id: 'whirl-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            number: 13,
            id: 'force-sprite',
            width: 32,
            height: 32,
            data: null
        },
        {
            number: 14,
            id: 'deathcoil-sprite',
            width: 30,
            height: 30,
            data: null
        }
    ],
    backgrounds: [
        {
            number: 0,
            width: 360,
            height: 60,
            id: "sunny",
            data: null
        },
        {
            number: 1,
            width: 360,
            height: 60,
            id: "night",
            data: null
        },
        {
            number: 2,
            width: 360,
            height: 60,
            id: "snowy",
            data: null
        },
        {
            number: 3,
            width: 360,
            height: 60,
            id: "space",
            data: null
        },
        {
            number: 4,
            width: 360,
            height: 88,
            id: "egypt",
            data: null
        }
    ]
};

// ====================================================================
// MAIN
// ====================================================================

// Show start screen on page load
window.onload = function () {
    applyCheats();
    createStartScreen();
    loadSprites();
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
const degree_to_rad = Math.PI / 180;
const rad_to_degree = 180 / Math.PI;

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

// Projectile Map
game.projectileMap = {
    bullet: game.projectileTextures[0],
    laser: game.projectileTextures[1],
    rocket: game.projectileTextures[2],
    inboundrocket: game.projectileTextures[3],
    orb: game.projectileTextures[4],
    boomerang: game.projectileTextures[5],
    shuriken: game.projectileTextures[6],
    waterorb: game.projectileTextures[7],
    eyeball: game.projectileTextures[8],
    fireball: game.projectileTextures[9],
    web: game.projectileTextures[10],
    laserpurple: game.projectileTextures[11],
    whirl: game.projectileTextures[12],
    force: game.projectileTextures[13],
    deathcoil: game.projectileTextures[14]
};

// Main loop
let mainLoop = null;

// Main Function

function main() {
    mainLoop = setInterval(function () {
    clearScreen();
    movePlayer();
    updateGameObjects();
    // WIN CONDITION: all monsters dead
    if (game.monsterTotal == game.monsterDefeated) {
        endGame();
        return;
    }
    rayCasting();
    drawSprites();
    renderBuffer();
    drawGun(screenContext);
    drawNotifications();
    drawHUD(screenContext);
    }, game.render.delay);
}

// Window Focus Event

screen.onclick = function () {
    if (!mainLoop) {
        screenContext.textAlign = 'start';
        screenContext.textBaseline = 'alphabetic';
        main();
    }
}

// ====================================================================
// LEVEL LOADING
// ====================================================================

// Load a level by index

function startLevel(levelIdx) {
    removeScreen('start-screen-overlay');
    loadLevel(levelIdx);
    window.addEventListener('blur', pauseGame);
    // Start the game loop if not running
    if (!mainLoop) main();
}

// Load map and reset game state for a level

function loadLevel(levelIdx) {
    // Stop game loop if running
    if (mainLoop) {
        clearInterval(mainLoop);
        mainLoop = null;
    }
    game.currentLevel = levelIdx;
    // Reset level state
    // Reset inventory
    game.equippedWeapon = game.levels[levelIdx].equippedweapon;
    setWeapon(game.equippedWeapon);
    // Clear monsters and sprites
    game.monsters = [];
    game.sprites = [];
    game.checkpoints = [];
    game.projectiles = [];
    // Rebuild monsters and sprites from map
    game.monsterTotal = 0;
    game.monsterDefeated = 0;
    game.pickupTotal = 0;
    game.pickupCollected = 0;
    game.checkpointTotal = 0;
    // Reset player health
    if (game.cheats.godMode || game.developerMode) {
        game.player.health = 9999;
    } else {
        game.player.health = 100;
    }
    // Reset trident ammo per level
    if (game.weaponsUnlocked.trident) {
        game.tridentammo = true;
    }
    // Recharge laser battery
    if (game.cheats.infiniteAmmo || game.developerMode) {
        game.laserbattery = 9999;
    } else {
        game.laserbattery = 100;
    }
    if (game.cheats.speedBoost) {
        game.player.speed.movement = 0.16;
    } else {
        game.player.speed.movement = 0.08;
    }
    if (game.levels[levelIdx].name == "Prison") {
        // Save current weapon unlock state before applying restrictions
        if (!game.savedWeaponState) {
            game.savedWeaponState = {
                pistol: game.weaponsUnlocked.pistol,
                machinegun: game.weaponsUnlocked.machinegun,
                yetipistol: game.weaponsUnlocked.yetipistol,
                rocketlauncher: game.weaponsUnlocked.rocketlauncher,
                scepter: game.weaponsUnlocked.scepter,
                boomerang: game.weaponsUnlocked.boomerang,
                lasershotgun: game.weaponsUnlocked.lasershotgun,
                trident: game.weaponsUnlocked.trident,
                ammo: game.ammo
            };
        }
        // Restrict weapon set for prison level
        game.weaponsUnlocked.pistol = false;
        game.weaponsUnlocked.machinegun = false;
        game.weaponsUnlocked.yetipistol = false;
        game.weaponsUnlocked.rocketlauncher = false;
        game.weaponsUnlocked.scepter = false;
        game.weaponsUnlocked.boomerang = false;
        game.weaponsUnlocked.lasershotgun = false;
        game.weaponsUnlocked.trident = false;
        game.ammo = 0;
        game.levels[levelIdx] = JSON.parse(JSON.stringify(window.LevelData[levelIdx]));
        game.levels[levelIdx].unlocked = true;
    } else {
        // Upon starting another level, restore weapon unlock state if it was previously saved (after leaving prison level)
        if (game.savedWeaponState) {
            game.weaponsUnlocked.pistol = game.savedWeaponState.pistol;
            game.weaponsUnlocked.machinegun = game.savedWeaponState.machinegun;
            game.weaponsUnlocked.yetipistol = game.savedWeaponState.yetipistol;
            game.weaponsUnlocked.rocketlauncher = game.savedWeaponState.rocketlauncher;
            game.weaponsUnlocked.scepter = game.savedWeaponState.scepter;
            game.weaponsUnlocked.boomerang = game.savedWeaponState.boomerang;
            game.weaponsUnlocked.lasershotgun = game.savedWeaponState.lasershotgun;
            game.weaponsUnlocked.trident = game.savedWeaponState.trident;
            game.ammo = game.savedWeaponState.ammo;
            game.savedWeaponState = null;      
        }
        game.keysUnlocked.cellkey = false;
    }
    let map = game.levels[levelIdx].map;
    let origmap = JSON.parse(JSON.stringify(window.LevelData[levelIdx].map));
    let mapy = origmap.length;
    let mapx = origmap[0].length;
    const emptyPositions = [];
    const monsterValues = [3, 4, 5, 6, 7, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 41, 45, 46, 47, 50, 52, 57, 59, 60, 61, 62, 64, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 85, 86, 87, 88, 89, 90, 91, 92];
    for (let i = 0; i < mapy; i++) {
        for (let j = 0; j < mapx; j++) {
            var objectValue = origmap[i][j];
            if (game.cheats.randomizeEnemies && monsterValues.includes(objectValue)) {
                objectValue = monsterValues[Math.floor(Math.random() * monsterValues.length)];
            }
            switch (objectValue) {
                case 0:
                    emptyPositions.push({ i, j });
                    break;
                case 1:
                    switch (game.levels[levelIdx].name) {
                        case "Hell":
                        case "Dark Continent":
                            game.sprites.push({ id: "cauldron-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Arctic":
                            game.sprites.push({ id: "snowytree-sprite", x: j, y: i, width: 552, height: 552, data: null, spriteScale: 2.0 });
                            break;
                        case "Heaven":
                            game.sprites.push({ id: "pillar-sprite", x: j, y: i, width: 320, height: 640, data: null, spriteScale: 2.0 });
                            break;
                        case "Ocean":
                            game.sprites.push({ id: "kelp-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 3.0 });
                            break;
                        case "Army Base":
                            game.sprites.push({ id: "militarytent-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Ninja Dojo":
                            game.sprites.push({ id: "cherryblossom-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 3.0 });
                            break;
                        case "Secret Cow Level":
                            game.sprites.push({ id: "haybale-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Jurassic":
                            game.sprites.push({ id: "fern-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 3.0 });
                            break;
                        case "Ancient Egypt":
                            game.sprites.push({ id: "obelisk-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 3.0 });
                            break;
                        case "Prison":
                            game.sprites.push({ id: "table-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 2.0 });
                            break;
                        default:
                            game.sprites.push({ id: "tree-sprite", x: j, y: i, width: 8, height: 16, data: null, spriteScale: 2.0 });
                            break;
                    }
                    break;
                case 3:
                    const imp = { ...window.MonsterData.imp, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(imp);
                    game.monsterTotal++;
                    break;
                case 4:
                    const lion = { ...window.MonsterData.lion, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(lion);
                    game.monsterTotal++;
                    break;
                case 5:
                    const tiger = { ...window.MonsterData.tiger, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(tiger);
                    game.monsterTotal++;
                    break;
                case 6:
                    const bear = { ...window.MonsterData.bear, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(bear);
                    game.monsterTotal++;
                    break;
                case 7:
                    const yeti = { ...window.MonsterData.yeti, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(yeti);
                    game.monsterTotal++;
                    break;
                case 8:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "ammo-sprite", x: j, y: i, width: 100, height: 81, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 9:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "pistolpickup-sprite", x: j, y: i, width: 34, height: 19, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 10:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "machinegunpickup-sprite", x: j, y: i, width: 49, height: 30, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 11:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "yetipistolpickup-sprite", x: j, y: i, width: 50, height: 33, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 12:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "rocketlauncherpickup-sprite", x: j, y: i, width: 80, height: 17, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 13:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "rocketammo-sprite", x: j, y: i, width: 35, height: 18, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 14:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "scepterpickup-sprite", x: j, y: i, width: 64, height: 64, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 15:
                    const crusader = { ...window.MonsterData.crusader, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(crusader);
                    game.monsterTotal++;
                    break;
                case 16:
                    const king = { ...window.MonsterData.king, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(king);
                    game.monsterTotal++;
                    break;
                case 17:
                    const minotaur = { ...window.MonsterData.minotaur, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(minotaur);
                    game.monsterTotal++;
                    break;
                case 18:
                    const demon = { ...window.MonsterData.demon, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(demon);
                    game.monsterTotal++;
                    break;
                case 19:
                    const skeleton = { ...window.MonsterData.skeleton, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(skeleton);
                    game.monsterTotal++;
                    break;
                case 20:
                    game.sprites.push({ id: "portal-sprite", x: j, y: i, width: 512, height: 512, data: null, spriteScale: 1.5 });
                    break
                case 21:
                    const jackalope = { ...window.MonsterData.jackalope, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(jackalope);
                    game.monsterTotal++;
                    break;
                case 22:
                    const alien1 = { ...window.MonsterData.alien1, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(alien1);
                    game.monsterTotal++;
                    break;
                case 23:
                    const alien2 = { ...window.MonsterData.alien2, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(alien2);
                    game.monsterTotal++;
                    break;
                case 24:
                    const ufo = { ...window.MonsterData.ufo, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(ufo);
                    game.monsterTotal++;
                    break;
                case 25:
                    const robot = { ...window.MonsterData.robot, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(robot);
                    game.monsterTotal++;
                    break;
                case 26:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "boomerang-sprite", x: j, y: i, width: 27, height: 27, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 27:
                    const ninja1 = { ...window.MonsterData.ninja1, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(ninja1);
                    game.monsterTotal++;
                    break;
                case 28:
                    const ninja2 = { ...window.MonsterData.ninja2, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(ninja2);
                    game.monsterTotal++;
                    break;
                case 29:
                    const soldier = { ...window.MonsterData.soldier, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(soldier);
                    game.monsterTotal++;
                    break;
                case 30:
                    const apache = { ...window.MonsterData.apache, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(apache);
                    game.monsterTotal++;
                    break;
                case 31:
                    const fighterjet = { ...window.MonsterData.fighterjet, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(fighterjet);
                    game.monsterTotal++;
                    break;
                case 32:
                    const tank = { ...window.MonsterData.tank, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(tank);
                    game.monsterTotal++;
                    break;
                case 33:
                    const piranha = { ...window.MonsterData.piranha, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(piranha);
                    game.monsterTotal++;
                    break;
                case 34:
                    const shark = { ...window.MonsterData.shark, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(shark);
                    game.monsterTotal++;
                    break;
                case 35:
                    const squid = { ...window.MonsterData.squid, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(squid);
                    game.monsterTotal++;
                    break;
                case 36:
                    const cow = { ...window.MonsterData.cow, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(cow);
                    game.monsterTotal++;
                    break;
                case 37:
                    const cowking = { ...window.MonsterData.cowking, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(cowking);
                    game.monsterTotal++;
                    break;
                case 38:
                    //cow chest
                    if (map[i][j] != 0) {                 
                        game.sprites.push({ id: "lockedchest-sprite", x: j, y: i, width: 512, height: 512, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 39:
                    //cow key
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 40:
                    game.sprites.push({ id: "speedboost-sprite", x: j, y: i, width: 512, height: 512, data: null });
                    game.pickupTotal++;
                    break;
                case 41:
                    const zeus = { ...window.MonsterData.zeus, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(zeus);
                    game.monsterTotal++;
                    break;
                case 42:
                    game.sprites.push({ id: 'acid-sprite', x: j, y: i, width: 256, height: 256, data: null, spriteScale: 2.0 });
                    break;
                case 43:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "lasershotgunpickup-sprite", x: j, y: i, width: 80, height: 29, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 44:
                    game.sprites.push({ id: 'burningdebris-sprite', x: j, y: i, width: 512, height: 512, data: null, spriteScale: 2.0 });
                    break;
                case 45:
                    const rhino = { ...window.MonsterData.rhino, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(rhino);
                    game.monsterTotal++;
                    break;
                case 46:
                    const cheetah = { ...window.MonsterData.cheetah, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(cheetah);
                    game.monsterTotal++;
                    break;
                case 47:
                    const witchdoctor = { ...window.MonsterData.witchdoctor, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(witchdoctor);
                    game.monsterTotal++;
                    break;
                case 48:
                    //monkey chest
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "lockedchest-sprite", x: j, y: i, width: 512, height: 512, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 49:
                    //monkey key
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 50:
                    const eyeball = { ...window.MonsterData.eyeball, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(eyeball);
                    game.monsterTotal++;
                    break;
                case 51:
                    game.sprites.push({ id: "medkit-sprite", x: j, y: i, width: 512, height: 512, data: null });
                    game.pickupTotal++;
                    break;
                case 52:
                    const stasischamber = { ...window.MonsterData.stasischamber, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(stasischamber);
                    game.monsterTotal++;
                    break;
                case 53:
                    game.checkpoints.push({ id: "checkpoint", type: 'checkpoint_0', x: j, y: i });
                    game.checkpointTotal++;
                    break;
                case 54:
                    game.checkpoints.push({ id: "checkpoint", type: 'checkpoint_1', x: j, y: i });
                    game.checkpointTotal++;
                    break;
                case 55:
                    game.checkpoints.push({ id: "checkpoint", type: 'checkpoint_2', x: j, y: i });
                    game.checkpointTotal++;
                    break;
                case 56:
                    game.checkpoints.push({ id: "checkpoint", type: 'checkpoint_3', x: j, y: i });
                    game.checkpointTotal++;
                    break;
                case 57:
                    const spider = { ...window.MonsterData.spider, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(spider);
                    game.monsterTotal++;
                    break;
                case 58:
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "tridentpickup-sprite", x: j, y: i, width: 30, height: 80, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 59:
                    const hyena = { ...window.MonsterData.hyena, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(hyena);
                    game.monsterTotal++;
                    break;
                case 60:
                    const werewolf = { ...window.MonsterData.werewolf, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(werewolf);
                    game.monsterTotal++;
                    break;
                case 61:
                    const wolf = { ...window.MonsterData.wolf, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(wolf);
                    game.monsterTotal++;
                    break;
                case 62:
                    const astronaut = { ...window.MonsterData.astronaut, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(astronaut);
                    game.monsterTotal++;
                    break;
                case 63:
                    const rover = { ...window.MonsterData.rover, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(rover);
                    game.monsterTotal++;
                    break;
                case 64:
                    const turret = { ...window.MonsterData.turret, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(turret);
                    game.monsterTotal++;
                    break;
                case 65:
                    const lander = { ...window.MonsterData.lander, id: `monster_${game.monsterTotal}`, x: j, y: i, landerNumber: 1 };
                    game.monsters.push(lander);
                    game.monsterTotal++;
                    break;
                case 66:
                    const lander2 = { ...window.MonsterData.lander, id: `monster_${game.monsterTotal}`, x: j, y: i, landerNumber: 2 };
                    game.monsters.push(lander2);
                    game.monsterTotal++;
                    break;
                case 67:
                    //goat chest
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "lockedchest-sprite", x: j, y: i, width: 512, height: 512, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 68:
                    //goat key
                    if (map[i][j] != 0) {
                        game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                        game.pickupTotal++;
                    }
                    break;
                case 69:
                    const dinosauregg = { ...window.MonsterData.dinosauregg, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(dinosauregg);
                    game.monsterTotal++;
                    break;
                case 70:
                    const lizard = { ...window.MonsterData.lizard, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(lizard);
                    game.monsterTotal++;
                    break;
                case 71:
                    const raptor = { ...window.MonsterData.raptor, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(raptor);
                    game.monsterTotal++;
                    break;
                case 72:
                    const brontosaurus = { ...window.MonsterData.brontosaurus, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(brontosaurus);
                    game.monsterTotal++;
                    break;
                case 73:
                    const stegosaurus = { ...window.MonsterData.stegosaurus, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(stegosaurus);
                    game.monsterTotal++;
                    break;
                case 74:
                    const scarab = { ...window.MonsterData.scarab, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(scarab);
                    game.monsterTotal++;
                    break;
                case 75:
                    const sphinx = { ...window.MonsterData.sphinx, id: `monster_${game.monsterTotal}`, x: j, y: i, leashX: j, leashY: i };
                    game.monsters.push(sphinx);
                    game.monsterTotal++;
                    break;
                case 76:
                    game.sprites.push({ id: "battery-sprite", x: j, y: i, width: 256, height: 256, data: null });
                    game.pickupTotal++;
                    break;
                case 77:
                    const anubis = { ...window.MonsterData.anubis, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(anubis);
                    game.monsterTotal++;
                    break;
                case 78:
                    const mummy = { ...window.MonsterData.mummy, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(mummy);
                    game.monsterTotal++;
                    break;
                case 79:
                    const tutankhamun = { ...window.MonsterData.tutankhamun, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(tutankhamun);
                    game.monsterTotal++;
                    break;
                case 80:
                    const satyr = { ...window.MonsterData.satyr, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(satyr);
                    game.monsterTotal++;
                    break;
                case 81:
                    const frog = { ...window.MonsterData.frog, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(frog);
                    game.monsterTotal++;
                    break;
                case 82:
                    const kamikaze = { ...window.MonsterData.kamikaze, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(kamikaze);
                    game.monsterTotal++;
                    break;
                case 83:
                    const pterodactyl = { ...window.MonsterData.pterodactyl, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(pterodactyl);
                    game.monsterTotal++;
                    break;
                case 84:
                    game.sprites.push({ id: 'nest-sprite', x: j, y: i, width: 861, height: 455, data: null, spriteScale: 2.0 });
                    break;
                case 85:
                    const baphomet = { ...window.MonsterData.baphomet, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(baphomet);
                    game.monsterTotal++;
                    break;
                case 86:
                    let startHostile = false;
                    var rndVal = Math.floor(Math.random() * 100) + 1;
                    if (rndVal <= 25) { startHostile = true; }
                    const prisoner = { ...window.MonsterData.prisoner, id: `monster_${game.monsterTotal}`, x: j, y: i, hostile: startHostile };
                    game.monsters.push(prisoner);
                    break;
                case 87:
                    const guard1 = { ...window.MonsterData.guard1, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(guard1);
                    game.monsterTotal++;
                    break;
                case 88:
                    const guard2 = { ...window.MonsterData.guard2, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(guard2);
                    game.monsterTotal++;
                    break;
                case 89:
                    const sobek = { ...window.MonsterData.sobek, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(sobek);
                    game.monsterTotal++;
                    break;
                case 90:
                    const crocodile = { ...window.MonsterData.crocodile, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(crocodile);
                    game.monsterTotal++;
                    break;
                case 91:
                    const explosivebarrel = { ...window.MonsterData.explosivebarrel, id: `monster_${game.monsterTotal}`, x: j, y: i, spriteScale: 2.0 };
                    game.monsters.push(explosivebarrel);
                    game.monsterTotal++;
                    break;
                case 92:
                    const bat = { ...window.MonsterData.bat, id: `monster_${game.monsterTotal}`, x: j, y: i };
                    game.monsters.push(bat);
                    game.monsterTotal++;
                    break;
                case 93:
                    //cell key
                    game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                    game.pickupTotal++;
                    break;
                default:
                    break;
            }
        }
    }
    // Reset player position
    if (game.cheats.randomStart) {
        const spot = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        game.player.x = spot.j;
        game.player.y = spot.i;
        const startAngles = [0, 90, 180, 270];
        const startingAngle = startAngles[Math.floor(Math.random() * startAngles.length)];
        game.player.angle = startingAngle;
    } else {
        game.player.x = game.levels[levelIdx].startlocation.x;
        game.player.y = game.levels[levelIdx].startlocation.y;
        game.player.angle = game.levels[levelIdx].startAngle;
    }
    // Reload textures and sprites
    loadSprites();
}

// Reset Game State After Game Completion

function resetGameState() {
    game.levels = JSON.parse(JSON.stringify(window.LevelData));
    game.currentLevel = 0;
    game.weaponSprite = document.getElementById('knife-sprite');
    game.equippedWeapon = 1;
    game.ammo = 0;
    game.rocketammo = 0;
    game.boomerangammo = 0;
    game.tridentammo = true;
    game.lastShot = 0;
    game.shootCooldown = 600;
    game.lastMonsterToHitPlayer = 'Unknown';
    game.weaponsUnlocked.pistol = false;
    game.weaponsUnlocked.machinegun = false;
    game.weaponsUnlocked.yetipistol = false;
    game.weaponsUnlocked.rocketlauncher = false;
    game.weaponsUnlocked.scepter = false;
    game.weaponsUnlocked.boomerang = false;
    game.weaponsUnlocked.lasershotgun = false;
    game.weaponsUnlocked.trident = false;
    game.keysUnlocked.cowkey = false;
    game.keysUnlocked.monkeykey = false;
    game.playerFrozen = false;
    game.playerFrozenTime = 0;
    game.player.speed.movement = 0.08;
}

// Apply Cheats From Cheat Menu After Game Completion

function applyCheats() {
    if (game.cheats.infiniteAmmo || game.developerMode) {
        game.ammo = 9999;
        game.rocketammo = 9999;
        game.boomerangammo = 9999;
        game.laserbattery = 9999;
    }
    if (game.cheats.allWeapons || game.developerMode) {
        game.weaponsUnlocked.pistol = true;
        game.weaponsUnlocked.machinegun = true;
        game.weaponsUnlocked.yetipistol = true;
        game.weaponsUnlocked.rocketlauncher = true;
        game.weaponsUnlocked.scepter = true;
        game.weaponsUnlocked.boomerang = true;
        game.weaponsUnlocked.lasershotgun = true;
        game.weaponsUnlocked.trident = true;
    }
    if (game.cheats.unlockAllLevels || game.developerMode) {
        for (let i = 0; i < game.levels.length; i++) {
            game.levels[i].unlocked = true;
        }
    }
    if (game.cheats.rapidFire) {
        game.shootCooldown = 100;
    }
}

// ====================================================================
// MECHANICS
// ====================================================================

// Cast rays to find walls and draw the scene

function rayCasting() {
    const currentMap = game.levels[game.currentLevel].map;
    const rayPrecision = game.rayCasting.precision;
    const projectionHalfHeight = game.projection.halfHeight;

    let rayAngle = game.player.angle - game.player.halfFov;
    const angleIncrement = game.rayCasting.incrementAngle;

    // Precalculate values used in loop
    const playerX = game.player.x;
    const playerY = game.player.y;

    for (let rayCount = 0; rayCount < game.projection.width; rayCount++) {
        const rayAngleRad = degreeToRadians(rayAngle);
        const rayCos = Math.cos(rayAngleRad) / rayPrecision;
        const raySin = Math.sin(rayAngleRad) / rayPrecision;

        // Ray position
        let rayX = playerX;
        let rayY = playerY;

        // Wall detection
        let wall;
        do {
            rayX += rayCos;
            rayY += raySin;
            wall = currentMap[Math.floor(rayY)][Math.floor(rayX)];
        } while (wall !== 2 && wall !== 100);

        // Distance calculation with fish-eye fix
        const dx = rayX - playerX;
        const dy = rayY - playerY;
        const distance = Math.sqrt(dx * dx + dy * dy) *
            Math.cos(degreeToRadians(rayAngle - game.player.angle));

        // Wall height calculation
        const wallHeight = Math.floor(projectionHalfHeight / distance);


        let wallTexture;
        // If Door Texture, use specific texture, otherwise use level wall texture
        if (wall === 100) {
            wallTexture = game.textures[24];
        } else {
            wallTexture = game.textures[game.levels[game.currentLevel].wall];
        }

        // Draw calls
        drawBackground(rayCount, 0, projectionHalfHeight - wallHeight,
            game.backgrounds[game.levels[game.currentLevel].background]);
        drawTexture(rayCount, wallHeight,
            Math.floor((texture.width * (rayX + rayY)) % wallTexture.width), wallTexture);
        drawFloor(rayCount, wallHeight, rayAngle);

        rayAngle += angleIncrement;
    }
}

// Check if sprite/monster is visible to player for draw calls

function isVisibleToPlayer(monster) {
    const map = game.levels[game.currentLevel].map;
    let x0 = game.player.x;
    let y0 = game.player.y;
    let x1 = monster.x;
    let y1 = monster.y;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy)) * 4; // Increase factor for precision

    for (let step = 0; step < steps; step++) {
        const t = step / steps;
        const x = x0 + dx * t;
        const y = y0 + dy * t;
        const mapX = Math.floor(x);
        const mapY = Math.floor(y);

        // Stop if we hit a wall (2) or a locked door (100)
        if (map[mapY] && (map[mapY][mapX] === 2 || map[mapY][mapX] === 100)) {
            return false;
        }

        // If we reach the monster
        if (Math.floor(x) === Math.floor(x1) && Math.floor(y) === Math.floor(y1)) {
            return true;
        }
    }
    return true;
}

// Check if sprite/monster is visible to another monster for draw calls

function isVisibleToMonster(monster, target) {
    const map = game.levels[game.currentLevel].map;
    let x0 = monster.x;
    let y0 = monster.y;
    let x1 = target.x;
    let y1 = target.y;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const steps = Math.max(Math.abs(dx), Math.abs(dy)) * 4; // Increase factor for precision

    for (let step = 0; step < steps; step++) {
        const t = step / steps;
        const x = x0 + dx * t;
        const y = y0 + dy * t;
        const mapX = Math.floor(x);
        const mapY = Math.floor(y);

        // Stop if we hit a wall (2) or a locked door (100)
        if (map[mapY] && (map[mapY][mapX] === 2 || map[mapY][mapX] === 100)) {
            return false;
        }

        // If we reach the monster
        if (Math.floor(x) === Math.floor(x1) && Math.floor(y) === Math.floor(y1)) {
            return true;
        }
    }
    return true;
}

// Degrees to radians conversion

function degreeToRadians(degree) {
    return degree * degree_to_rad;
}


// Radians to degrees conversion

function radiansToDegrees(radians) {
    return radians * rad_to_degree;
}

// Bullet Object

class Projectile {
    constructor(x, y, angle, type, texture, owner, speed, damage) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.owner = owner;
        this.type = type;
        this.texture = texture;
        this.damage = damage;
    }
    update() {
        this.x += Math.cos(degreeToRadians(this.angle)) * this.speed;
        this.y += Math.sin(degreeToRadians(this.angle)) * this.speed;
    }
}

// Handle Shooting

function handleShooting(e) {
    const currentTime = Date.now();
    if (currentTime - game.lastShot >= game.shootCooldown) {
        game.lastShot = currentTime;

        if (((game.equippedWeapon == 2 || game.equippedWeapon == 3) && game.ammo <= 0) || (game.equippedWeapon == 5 && game.rocketammo <= 0)) {
            playSound('gunclick-sound');
            return;
        } else if ((game.equippedWeapon == 7 && game.boomerangammo <= 0) || (game.equippedWeapon == 9 && !game.tridentammo && !game.developerMode && !game.cheats.infiniteAmmo)) {
            //boomerang fail throw / trident fail sound
            playSound('invalid-sound');
            return;
        } else if ((game.equippedWeapon == 4 && game.laserbattery == 0) || (game.equippedWeapon == 8 && game.laserbattery <= 4)) {
            //yeti pistol / laser shotgun fail sound
            playSound('overheat-sound');
            return;
        }
        // Start the bullet slightly in front of the player in the direction they're facing
        const startX = game.player.x + Math.cos(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
        const startY = game.player.y + Math.sin(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
        let texture;
        switch (game.equippedWeapon) {
            case 1:
                playSound('knife-sound');
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'knife', texture, 'player', 0.2, 25));
                break;
            case 4:
                playSound('laser-sound');
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'laser', game.projectileMap['laser'], 'player', 0.2, 50));
                game.laserbattery--;
                break;
            case 5:
                playSound('rocketlaunch-sound');
                game.rocketammo--;
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'rocket', game.projectileMap['rocket'], 'player', 0.2, 150));
                break;
            case 6:
                playSound('orb-sound');
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'orb', game.projectileMap['orb'], 'player', 0.2, 25));
                break;
            case 7:
                playSound('boomerang-sound');
                game.boomerangammo--;
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'boomerang', game.projectileMap['boomerang'], 'player', 0.2, 250));
                if (game.boomerangammo <= 0) {
                    game.weaponSprite = document.getElementById('blank-sprite');
                    game.weaponsUnlocked.boomerang = false;
                }
                break;
            case 8:
                texture = game.projectileMap['laserpurple'];
                playSound('laserblast-sound');
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle + 2, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle + 4, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle - 2, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle - 4, 'laser', texture, 'player', 0.2, 50));
                game.laserbattery -= 5;
                break;
            case 9:
                playSound('portal-sound');
                if (!game.cheats.infiniteAmmo && !game.developerMode) game.tridentammo = false;
                var rndVal = Math.floor(Math.random() * 100) + 1;
                if (rndVal > 50) {
                    const moby = { ...window.MonsterData.moby, id: `monster_moby`, x: startX, y: startY, spawnTime: Date.now() };
                    const monsterTexture = {
                        id: moby.skin,
                        width: moby.width,
                        height: moby.height
                    };
                    moby.data = getTextureData(monsterTexture);
                    game.monsters.push(moby);
                } else {
                    const seahorse = { ...window.MonsterData.seahorse, id: `monster_seahorse`, x: startX, y: startY, spawnTime: Date.now() };
                    const monsterTexture = {
                        id: seahorse.skin,
                        width: seahorse.width,
                        height: seahorse.height
                    };
                    seahorse.data = getTextureData(monsterTexture);
                    game.monsters.push(seahorse);
                }
                break;
            default:
                playSound('shoot-sound');
                game.ammo--;
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'bullet', game.projectileMap['bullet'], 'player', 0.2, 25));
                break;
        }
    }
}

// Display game notifications

function showNotification(notification) {
    game.notifications.push({
        text: `${notification}`,
        startTime: Date.now(),
        duration: 3000
    });
}

// Build spatial grid of monsters for collision detection

function updateMonsterGrid() {
    game.monsterGrid = {};
    for (let monster of game.monsters) {
        if (!monster.isDead && monster.type != 'moby' && monster.type != 'seahorse' && monster.type != 'seahorsebaby' && monster.type != 'dinosauregg' && monster.type != 'tutankhamun') {
            const gridKey = `${Math.floor(monster.x)}_${Math.floor(monster.y)}`;
            if (!game.monsterGrid[gridKey]) {
                game.monsterGrid[gridKey] = [];
            }
            game.monsterGrid[gridKey].push(monster);
        }
    }
}

// Check if a position is occupied by another monster

function isMonsterAtPosition(x, y, excludeMonster = null, allowedTypes = null) {
    const gridKey = `${Math.floor(x)}_${Math.floor(y)}`;
    const nearby = game.monsterGrid[gridKey] || [];
    
    const checkRadius = 0.5;
    for (let monster of nearby) {
        if (monster === excludeMonster) continue;
        if (allowedTypes && !allowedTypes.includes(monster.type)) continue;
        const distSq = (monster.x - x) ** 2 + (monster.y - y) ** 2;
        if (distSq < checkRadius * checkRadius) {
            return true;
        }
    }
    return false;
}

// Remove dead monsters from the game.monsters array

function removeDeadMonsters() {
    let writeIdx = 0;
    for (let i = 0; i < game.monsters.length; i++) {
        if (!game.monsters[i].isDead) {
            game.monsters[writeIdx] = game.monsters[i];
            writeIdx++;
        }
    }
    game.monsters.length = writeIdx;
}

// Remove culled sprites from the game.sprites array

function updateSpriteList() {
    let writeIdx = 0;
    const currentTime = Date.now();

    for (let i = 0; i < game.sprites.length; i++) {
        const sprite = game.sprites[i];
        let keep = true;

        if (sprite.cullTime && sprite.spawnTime) {
            const elapsed = currentTime - sprite.spawnTime;
            if (elapsed >= sprite.cullTime) {
                keep = false;
            }
        }

        if (keep) {
            game.sprites[writeIdx] = sprite;
            writeIdx++;
        }
    }

    game.sprites.length = writeIdx;
}

// Find valid spawn positions for monsters

function getOpenSpawnPositions(xVal, yVal, range) {
    const positions = [];
    // range should always be an odd number for this to work properly
    range -= 1;
    lowerBound = -(range/2);
    upperBound = (range/2);
    for (let dx = lowerBound; dx <= upperBound; dx++) {
        for (let dy = lowerBound; dy <= upperBound; dy++) {
            const x = xVal + dx;
            const y = yVal + dy;

            // Skip center exact tile
            if (dx == 0 && dy == 0) continue;

            if ((game.levels[game.currentLevel].map[y] && game.levels[game.currentLevel].map[y][x] != 2) && !isMonsterAtPosition(x, y)) {
                positions.push({ x, y });
            }
        }
    }

    return positions;
}

// Update Game Objects

function updateGameObjects() {
    // Update monster spatial grid for collision detection
    updateMonsterGrid();
    
    // Update projectiles
    const projectilesToRemove = new Set();
    let map = game.levels[game.currentLevel].map;

    // Update projectiles
    for (let i = game.projectiles.length - 1; i >= 0; i--) {
        const projectile = game.projectiles[i];
        projectile.update();

        const mapX = Math.floor(projectile.x);
        const mapY = Math.floor(projectile.y);

        // Remove if hits a wall
        if (map[mapY] && map[mapY][mapX] === 2) {
            if (projectile.type === 'rocket') {                
                const dx = game.player.x - projectile.x;
                const dy = game.player.y - projectile.y;
                var angle = radiansToDegrees(Math.atan2(dy, dx));
                const startX = projectile.x + Math.cos(degreeToRadians(angle)) * 0.25;
                const startY = projectile.y + Math.sin(degreeToRadians(angle)) * 0.25;
                game.sprites.push({ id: 'explosion-sprite', x: startX, y: startY, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                playSound('explosion-sound');
                for (const monster of game.monsters) {
                    if (!monster.isDead) {
                        const dx2 = monster.x - projectile.x;
                        const dy2 = monster.y - projectile.y;
                        const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                        if (distanceSq2 < game.explosionHitboxRadius && !monster.invulnerable && monster.type != 'yeti') {
                            monster.health -= projectile.damage;
                        }
                    }
                }
                const rocketSq = dx * dx + dy * dy;
                if (rocketSq < game.explosionHitboxRadius) {
                    game.lastMonsterToHitPlayer = 'Rocket Explosion';
                    game.player.health -= 25;
                    playSound('injured-sound');
                    if (game.player.health <= 0) {
                        playSound('death-sound');
                        endGameDeath();
                    }
                }
            }
            projectilesToRemove.add(i);
            continue;
        }

        if (projectile.owner === 'player') {
            // Check collision with monsters
            for (const monster of game.monsters) {
                if (!monster.isDead) {
                    const dx = monster.x - projectile.x;
                    const dy = monster.y - projectile.y;
                    const distanceSq = dx * dx + dy * dy;
                    if (distanceSq < game.bulletHitboxRadius) {
                        if (monster.type == 'yeti') {
                            if (projectile.type != 'laser') {
                                playSound('yeti-laugh');
                                projectilesToRemove.add(i);
                                break;
                            } else {
                                monster.health -= 75;
                            }
                        } else if (monster.type == 'tank') {
                            if (projectile.type == 'bullet' || projectile.type == 'knife' || projectile.type == 'boomerang') {
                                playSound('ricochet-sound');
                                projectilesToRemove.add(i);
                                break;
                            } else {
                                monster.health -= projectile.damage;
                            }
                        } else if ((monster.type == 'moon' || monster.type == 'sun' || monster.type == 'saturn') && monster.invulnerable) {
                            projectilesToRemove.add(i);
                            break;
                        } else if (monster.shieldHealth !== undefined && monster.shieldHealth > 0) {
                            const remainingDamage = Math.max(0, projectile.damage - monster.shieldHealth);
                            monster.shieldHealth -= projectile.damage;
                            monster.lastShieldHit = Date.now();

                            if (remainingDamage > 0) {
                                monster.health -= remainingDamage; // Overflow damage to health
                            }
                            playSound('forcefield-sound');
                        } else if (projectile.type == 'laser') {
                            monster.health -= projectile.damage;
                        } else if (projectile.type == 'rocket') {
                            const dx = game.player.x - projectile.x;
                            const dy = game.player.y - projectile.y;
                            var angle = radiansToDegrees(Math.atan2(dy, dx));
                            const startX = projectile.x + Math.cos(degreeToRadians(angle)) * 0.25;
                            const startY = projectile.y + Math.sin(degreeToRadians(angle)) * 0.25;
                            game.sprites.push({ id: 'explosion-sprite', x: startX, y: startY, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                            playSound('explosion-sound');
                            monster.health -= projectile.damage;
                            for (const m2 of game.monsters) {
                                if (!m2.isDead && (m2.id != monster.id)) {
                                    const dx2 = m2.x - projectile.x;
                                    const dy2 = m2.y - projectile.y;
                                    const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                                    if (distanceSq2 < game.explosionHitboxRadius && !m2.invulnerable && m2.type != 'yeti') {
                                        m2.health -= projectile.damage;
                                    }
                                }
                            }
                            const rocketSq = dx * dx + dy * dy;
                            if (rocketSq < game.explosionHitboxRadius) {
                                game.lastMonsterToHitPlayer = 'Rocket Explosion';
                                game.player.health -= 25;
                                playSound('injured-sound');
                                if (game.player.health <= 0) {
                                    playSound('death-sound');
                                    endGameDeath();
                                }
                            }
                        } else if (projectile.type == 'orb') {
                            if (monster.type == 'imp' || monster.type == 'demon' || monster.type == 'skeleton' || monster.type == 'alien' || monster.type == 'werewolf' || monster.type == 'mummy' || monster.type == 'satyr') {
                                monster.health -= 75;
                            } else {
                                monster.health -= projectile.damage;
                            }
                        } else if (projectile.type == 'boomerang') {
                            monster.health -= projectile.damage;
                            const dx = game.player.x - monster.x;
                            const dy = game.player.y - monster.y;
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'boomerang', game.projectileMap['boomerang'], 'monster', 0.2, 0));
                            playSound('boomerang-sound');
                        } else {
                            monster.health -= projectile.damage;
                        }
                        if (monster.health > 0) {
                            var rnd = Math.floor(Math.random() * 3);
                            playSound(`${monster.audio}-pain-${rnd + 1}`);
                        }
                        projectilesToRemove.add(i);
                        break;
                    }
                }
            }
            // Remove if out of range
            const distSq = (projectile.x - game.player.x) ** 2 + (projectile.y - game.player.y) ** 2;
            if (projectile.type == 'knife') {
                if (distSq > game.knifeRange) projectilesToRemove.add(i);
            } else {
                if (distSq > game.bulletRange) {
                    if (projectile.type == 'rocket') playSound('explosion-sound');
                    projectilesToRemove.add(i);
                }
            }
        } else if (projectile.owner == 'monster') {
            // Check collision with player
            const dx = game.player.x - projectile.x;
            const dy = game.player.y - projectile.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 0.10) {
                if (projectile.type == 'rocket') {
                    const startX = game.player.x + Math.cos(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
                    const startY = game.player.y + Math.sin(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
                    game.sprites.push({ id: 'explosion-sprite', x: startX, y: startY, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                    game.player.health -= projectile.damage; // rocket damage
                    for (const m2 of game.monsters) {
                        if (!m2.isDead) {
                            const dx2 = m2.x - projectile.x;
                            const dy2 = m2.y - projectile.y;
                            const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                            if (distanceSq2 < game.explosionHitboxRadius && !m2.invulnerable && m2.type != 'yeti') {
                                m2.health -= 150;
                            }
                        }
                    }
                    playSound('explosion-sound');
                } else if (projectile.type == 'boomerang') {
                    game.boomerangammo += 1; // Boomerang pickup
                    playSound('pickup-sound');
                    if (game.boomerangammo >= 1) {
                        game.weaponSprite = document.getElementById('boomerangwep-sprite');
                        game.weaponsUnlocked.boomerang = true;
                    }
                } else if (projectile.type == 'whirl') {
                    //playSound('pickup-sound');
                    const anubis = game.monsters.find(monster => monster.type === 'anubis');

                    if (anubis && !anubis.isDead) {
                        // Initialize pull properties if they don't exist
                        if (!anubis.pullStartTime) {
                            anubis.pullStartTime = Date.now();
                            anubis.activePull = true;
                            anubis.pullDuration = 500;
                        }
                    }
                } else if (projectile.type == 'force') {
                    //playSound('pickup-sound');
                    const tutankhamun = game.monsters.find(monster => monster.type === 'tutankhamun');

                    if (tutankhamun && !tutankhamun.isDead) {
                        // Initialize push properties if they don't exist
                        if (!tutankhamun.pushStartTime) {
                            tutankhamun.pushStartTime = Date.now();
                            tutankhamun.activePush = true;
                            tutankhamun.pushDuration = 1000;
                        }
                    }
                } else {
                    game.player.health -= projectile.damage; // All other projectile damage
                }
                if (projectile.type === 'web' || projectile.type === 'shuriken') {
                    if (!game.playerFrozen) {
                        game.playerFrozen = true;
                        game.playerFrozenTime = Date.now();
                        if (projectile.type === 'web') {
                            game.playerFrozenDuration = 2000;
                        } else if (projectile.type === 'shuriken') {
                            game.playerFrozenDuration = 1000;
                        }
                    }
                }
                if (!(projectile.type === 'boomerang') && !(projectile.type === 'whirl') && !(projectile.type === 'force')) {
                    playSound('injured-sound');
                }
                projectilesToRemove.add(i);
                if (game.player.health <= 0) {
                    playSound('death-sound');
                    game.lastMonsterToHitPlayer = projectile.type.charAt(0).toUpperCase() + projectile.type.slice(1);
                    endGameDeath();
                }
            }
            // Remove if out of range
            if (distSq > game.bulletRange) {
                if (projectile.type === 'rocket') playSound('explosion-sound');
                projectilesToRemove.add(i);
            }
        } 
    }
    // Remove marked projectiles
    game.projectiles = game.projectiles.filter((_, idx) => !projectilesToRemove.has(idx));
    // Remove expired sprites with a culltime and spawn time
    updateSpriteList();

    // Update monster positions and check for attacks
    for (let monster of game.monsters) {
        if (!monster.isDead) {
            if (monster.health <= 0) {
                monster.isDead = true;
                if (monster.type != 'moby' && monster.type != 'seahorse' && monster.type != 'seahorsebaby' && monster.type != 'prisoner') {
                    game.monsterDefeated++;
                }
                playSound(`${monster.audio}-death`);
                switch (monster.type) {
                    case 'crusader':
                    case 'king':
                        game.sprites.push({ id: 'tombstone-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'tombstone-sprite', width: 256, height: 256 }) });
                        break;
                    case 'alien':
                        game.sprites.push({ id: 'acid-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'acid-sprite', width: 256, height: 256 }) });
                        game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 42;
                        break;
                    case 'zeus':
                        game.sprites.push({ id: 'tridentpickup-sprite', x: Math.floor(monster.x), y: Math.floor(monster.y), width: 30, height: 80, data: getTextureData({ id: 'tridentpickup-sprite', width: 30, height: 80 }) });
                        game.pickupTotal++;
                        game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 58;
                        break;
                    case 'cowking':
                        game.sprites.push({ id: 'key-sprite', x: Math.floor(monster.x), y: Math.floor(monster.y), width: 64, height: 64, data: getTextureData({ id: 'key-sprite', width: 64, height: 64 }) });
                        game.pickupTotal++;
                        game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 68;
                        break;
                    case 'stasischamber':
                        game.sprites.push({ id: 'brokenstasischamber-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'brokenstasischamber-sprite', width: 512, height: 512 }) });
                        playSound('glass-sound');
                        break;
                    case 'explosivebarrel':
                        game.sprites.push({ id: 'explodedbarrel-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'explodedbarrel-sprite', width: 512, height: 512 }), spriteScale: 2.0 });
                        const barrelused = new Set();
                        const barrelexplosions = 3;
                        const explosionradius = 0.5; // how tight the cluster is
                        let explosioncount = 0;
                        while (explosioncount < barrelexplosions) {
                            let offsetX, offsetY;
                            do {
                                offsetX = (Math.random() * 2 - 1) * explosionradius;
                                offsetY = (Math.random() * 2 - 1) * explosionradius;
                            } while (offsetX * offsetX + offsetY * offsetY > explosionradius * explosionradius);
                            const x = monster.x + offsetX;
                            const y = monster.y + offsetY;
                            const key = `${x},${y}`;
                            if (barrelused.has(key)) continue; // skip duplicates
                            barrelused.add(key);
                            game.sprites.push({ id: 'explosion-sprite', x: x, y: y, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200, spriteScale: 2.0 });
                            explosioncount++;
                        }
                        for (const m2 of game.monsters) {
                            if (!m2.isDead && (m2.id != monster.id)) {
                                const dx2 = m2.x - monster.x;
                                const dy2 = m2.y - monster.y;
                                const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                                if (distanceSq2 < game.explosionHitboxRadius && !m2.invulnerable && m2.type != 'yeti') {
                                    m2.health -= monster.damage;
                                }
                            }
                        }
                        const dx = game.player.x - monster.x;
                        const dy = game.player.y - monster.y;
                        const distSq = dx * dx + dy * dy;
                        if (distSq < game.explosionHitboxRadius) {
                            game.lastMonsterToHitPlayer = 'Barrel Explosion';
                            game.player.health -= 25;
                            playSound('injured-sound');
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                        playSound('explosion-sound');
                        break;
                    case 'tank':
                    case 'apache':
                    case 'robot':
                    case 'fighterjet':
                    case 'rover':
                        game.sprites.push({ id: 'burningdebris-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'burningdebris-sprite', width: 512, height: 512 }) });
                        game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 44;
                        break;
                    case 'turret':
                    case 'lander':
                        game.sprites.push({ id: 'burningdebris-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'burningdebris-sprite', width: 512, height: 512 }) });
                        break;
                    case 'ufo':
                        game.sprites.push({ id: 'burningdebris-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'burningdebris-sprite', width: 512, height: 512 }) });
                        game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 44;
                        game.monsterTotal++;
                        const alien1 = { ...window.MonsterData.alien1, id: `monster_${game.monsterTotal}`, x: monster.x, y: monster.y };
                        const monsterTexture = {
                            id: alien1.skin,
                            width: alien1.width,
                            height: alien1.height
                        };
                        alien1.data = getTextureData(monsterTexture);
                        game.monsters.push(alien1);
                        break;
                    case 'portal':
                    case 'moon':
                    case 'sun':
                    case 'saturn':
                    case 'asteroid':
                        break;
                    case 'kamikaze':
                        const used = new Set();
                        const explosions = 3;
                        const radius = 0.5; // how tight the cluster is
                        let count = 0;
                        while (count < explosions) {
                            let offsetX, offsetY;
                            do {
                                offsetX = (Math.random() * 2 - 1) * radius;
                                offsetY = (Math.random() * 2 - 1) * radius;
                            } while (offsetX * offsetX + offsetY * offsetY > radius * radius);
                            const x = monster.x + offsetX;
                            const y = monster.y + offsetY;
                            const key = `${x},${y}`;
                            if (used.has(key)) continue; // skip duplicates
                            used.add(key);
                            game.sprites.push({ id: 'explosion-sprite', x: x, y: y, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                            count++;
                        }
                        for (const m2 of game.monsters) {
                            if (!m2.isDead && (m2.id != monster.id)) {
                                const dx2 = m2.x - monster.x;
                                const dy2 = m2.y - monster.y;
                                const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                                if (distanceSq2 < game.explosionHitboxRadius && !m2.invulnerable && m2.type != 'yeti') {
                                    m2.health -= 150;
                                }
                            }
                        }
                        const kdx = game.player.x - monster.x;
                        const kdy = game.player.y - monster.y;
                        const kdistSq = kdx * kdx + kdy * kdy;
                        if (kdistSq < game.explosionHitboxRadius) {
                            game.lastMonsterToHitPlayer = 'Kamikaze Explosion';
                            game.player.health -= monster.damage;
                            playSound('injured-sound');
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                        stopSound('kamikaze-aaaa');
                        playSound('explosion-sound');
                        break;
                    case 'guard':
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'bones-sprite', width: 256, height: 256 }) });
                        const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                        if (validSpots.length == 0) continue;
                        const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                        if (monster.variant === 'guard2') {
                            game.sprites.push({ id: "machinegunpickup-sprite", x: spot.x, y: spot.y, width: 49, height: 30, data: getTextureData({ id: 'machinegunpickup-sprite', width: 49, height: 30 }) });
                            game.levels[game.currentLevel].map[spot.y][spot.x] = 10;
                        } else {
                            game.sprites.push({ id: "pistolpickup-sprite", x: spot.x, y: spot.y, width: 34, height: 19, data: getTextureData({ id: 'pistolpickup-sprite', width: 34, height: 19 }) });
                            game.levels[game.currentLevel].map[spot.y][spot.x] = 9;
                        }
                        game.pickupTotal++;
                        break;
                    case 'frog':
                    case 'lizard':
                    case 'jackalope':
                    case 'piranha':
                    case 'seahorsebaby':
                    case 'bat':
                        game.sprites.push({ id: 'gib-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'gib-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                        break;
                    case 'dinosauregg':
                        game.monsterTotal++;
                        const lizard = { ...window.MonsterData.lizard, id: `monster_${game.monsterTotal}`, x: monster.x, y: monster.y };
                        const lizardTexture = {
                            id: lizard.skin,
                            width: lizard.width,
                            height: lizard.height
                        };
                        lizard.data = getTextureData(lizardTexture);
                        game.monsters.push(lizard);
                        break;
                    default:
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'bones-sprite', width: 256, height: 256 }), spawnTime: Date.now() });
                        break;
                }
                continue;
            } 
            const dx = game.player.x - monster.x;
            const dy = game.player.y - monster.y;
            const distSq = dx * dx + dy * dy;
            const currentTime = Date.now();
            var spawnModifier = 1;
            if (game.cheats.megaSpawns) spawnModifier = 3;

            if (monster.shieldHealth !== undefined) {
                // Recharge shield after cooldown
                if (!monster.lastShieldHit || currentTime - monster.lastShieldHit >= monster.shieldRechargeCooldown) {
                    monster.shieldHealth = Math.min(monster.maxShieldHealth, monster.shieldHealth + monster.shieldRechargeRate);
                }
            }

            switch (monster.type) {
                case 'spider':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'web', game.projectileMap['web'], 'monster', 0.2, monster.damage));
                            playSound('web-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 200 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'alien':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (monster.variant === 'alien2') {
                            const delay = monster.shotsInBurst < 3 ? 500 : monster.attackCooldown;
                            if (!monster.lastShot || currentTime - monster.lastShot >= delay) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.projectileMap['laserpurple'], 'monster', 0.2, monster.damage));
                                playSound('laser-sound');
                                monster.lastShot = currentTime;
                                monster.shotsInBurst++;
                                if (monster.shotsInBurst > 3) {
                                    monster.shotsInBurst = 1;
                                }
                            }
                        } else {
                            if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.projectileMap['laser'], 'monster', 0.2, monster.damage));
                                playSound('laser-sound');
                                monster.lastShot = currentTime;
                            }
                        }
                    }
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'ufo':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.projectileMap['laser'], 'monster', 0.2, 5));
                            playSound('laser-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 100 && isVisibleToPlayer(monster)) {
                        if (!monster.rocketlastShot || currentTime - monster.rocketlastShot >= monster.rocketCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'rocket', game.projectileMap['inboundrocket'], 'monster', 0.2, 25));
                            playSound('rocketlaunch-sound');
                            monster.rocketlastShot = currentTime;
                        }
                    }
                    if (distSq < 150) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist;
                        const dirY = dy * invDist;
                        if (distSq > 50) {
                            // TOO FAR → move toward player
                            moveX = dirX * monster.speed;
                            moveY = dirY * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        } else {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;
                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }
                            moveX = perpX * monster.strafeDir * monster.speed;
                            moveY = perpY * monster.strafeDir * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    if (monster.health < 200 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;                         
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }               
                        if (monster.speed != 0.02) { monster.speed = 0.02; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 400 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }                    
                        if (monster.speed != 0.03) { monster.speed = 0.03; }
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'soldier':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                            playSound('shoot-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'ninja':
                    if (monster.health > 75) {
                        if (distSq < 45) {
                            if (!monster.lastCharge || currentTime - monster.lastCharge >= monster.chargeCooldown) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                monster.chargeAngle = angle;
                                monster.isCharging = true;
                                monster.lastCharge = currentTime;
                            }
                        }
                        if (monster.isCharging) {
                            // Charge the player using the predetermined charge angle
                            const chargeSpeed = monster.speed * 2; // Charge faster than normal movement
                            const chargeDx = Math.cos(degreeToRadians(monster.chargeAngle)) * chargeSpeed;
                            const chargeDy = Math.sin(degreeToRadians(monster.chargeAngle)) * chargeSpeed;

                            // Try to move in X direction with the charge angle
                            const newX = monster.x + chargeDx;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }

                            // Try to move in Y direction with the charge angle
                            const newY = monster.y + chargeDy;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }

                            // If the ninja has reached a certain threshold charging time, stop charging
                            if (currentTime - monster.lastCharge >= 1000) {
                                monster.isCharging = false;
                            }
                        } else {
                            // If not charging, follow the player
                            if (distSq > 0.25 && distSq < 200) {
                                const distance = Math.sqrt(distSq);
                                const invDist = 1 / distance;
                                const dirX = dx * invDist * monster.speed;
                                const dirY = dy * invDist * monster.speed;

                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }

                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                            }
                        }
                        if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                            // Attack the player
                            game.player.health -= monster.damage;
                            game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                            monster.lastAttack = currentTime;
                            // Play monster attack sound
                            playSound('injured-sound');
                            // Check if player died
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                    } else {
                        if (distSq < 64 && isVisibleToPlayer(monster)) {
                            if (!monster.lastShot || currentTime - monster.lastShot >= monster.rangedCooldown) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'shuriken', game.projectileMap['shuriken'], 'monster', 0.2, 5));
                                playSound('shuriken-sound');
                                monster.lastShot = currentTime;
                            }
                        }
                        if (distSq < 200) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist;
                            const dirY = dy * invDist;
                            if (distSq > 40) {
                                // TOO FAR → move toward player
                                moveX = dirX * monster.speed;
                                moveY = dirY * monster.speed;
                                // Try to move in X direction
                                const newX = monster.x + moveX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }
                                // Try to move in Y direction
                                const newY = monster.y + moveY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                            } else {
                                if (distSq < 45) {
                                    // When ninja is weakened, only 50% chance of charging when cooldown is available
                                    if (!monster.lastCharge || currentTime - monster.lastCharge >= monster.chargeCooldown) {
                                        var rndVal = Math.floor(Math.random() * 100) + 1;
                                        if (rndVal > 50) {
                                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                                            monster.chargeAngle = angle;
                                            monster.isCharging = true;
                                        }
                                        monster.lastCharge = currentTime;
                                    }
                                }
                                if (monster.isCharging) {
                                    // Charge the player using the predetermined charge angle
                                    const chargeSpeed = monster.speed * 2; // Charge faster than normal movement
                                    const chargeDx = Math.cos(degreeToRadians(monster.chargeAngle)) * chargeSpeed;
                                    const chargeDy = Math.sin(degreeToRadians(monster.chargeAngle)) * chargeSpeed;

                                    // Try to move in X direction with the charge angle
                                    const newX = monster.x + chargeDx;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }

                                    // Try to move in Y direction with the charge angle
                                    const newY = monster.y + chargeDy;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }

                                    // If the ninja has reached a certain threshold charging time, stop charging
                                    if (currentTime - monster.lastCharge >= 1000) {
                                        monster.isCharging = false;
                                    }
                                } else {
                                    // IN RANGE → strafe sideways
                                    const perpX = -dirY;
                                    const perpY = dirX;
                                    // Optional: switch left/right occasionally
                                    monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                                    if (Math.random() < 0.01) {
                                        monster.strafeDir *= -1;
                                    }
                                    moveX = perpX * monster.strafeDir * monster.speed;
                                    moveY = perpY * monster.strafeDir * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + moveX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + moveY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                }
                            }
                        }
                        if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                            // Attack the player
                            game.player.health -= monster.damage;
                            game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                            monster.lastAttack = currentTime;
                            // Play monster attack sound
                            playSound('injured-sound');
                            // Check if player died
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                    }
                    break;
                case 'zeus':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        const delay = monster.shotsInBurst < 3 ? 1000 : monster.attackCooldown;
                        if (!monster.lastShot || currentTime - monster.lastShot >= delay) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'waterorb', game.projectileMap['waterorb'], 'monster', 0.2, monster.damage));
                            playSound('waterorb-sound');
                            monster.lastShot = currentTime;
                            monster.shotsInBurst++;
                            if (monster.shotsInBurst > 3) {
                                monster.shotsInBurst = 1;
                            }
                        }
                    }
                    if (distSq > 20) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (monster.health < 800 && !monster.spawnPirahna) {
                        monster.spawnPirahna = true;
                        for (let i = 0; i < (3 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const piranha = { ...window.MonsterData.piranha, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: piranha.skin,
                                width: piranha.width,
                                height: piranha.height
                            };
                            piranha.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(piranha);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 600 && !monster.spawnSquid) {
                        monster.spawnSquid = true;
                        for (let i = 0; i < (2 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const squid = { ...window.MonsterData.squid, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: squid.skin,
                                width: squid.width,
                                height: squid.height
                            };
                            squid.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(squid);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 400 && !monster.spawnShark) {
                        monster.spawnShark = true;
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const shark = { ...window.MonsterData.shark, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: shark.skin,
                                width: shark.width,
                                height: shark.height
                            };
                            shark.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(shark);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    break;
                case 'apache':
                    // Checkpoint route movement code
                    const checkpointOBJ = game.checkpoints.find(checkpoint => checkpoint.type == `checkpoint_${monster.activeCheckpoint}`);
                    if (!checkpointOBJ || !Number.isFinite(checkpointOBJ.x) || !Number.isFinite(checkpointOBJ.y)) {
                        break; // NaN safeguard
                    }
                    const checkpointX = checkpointOBJ.x - monster.x;
                    const checkpointY = checkpointOBJ.y - monster.y;
                    const checkpointdistSq = checkpointX * checkpointX + checkpointY * checkpointY;
                    if (checkpointdistSq < 1) {
                        monster.activeCheckpoint++;
                        if (monster.activeCheckpoint >= game.checkpointTotal) {
                            monster.activeCheckpoint = 0;
                        }
                    } else {
                        const distance = Math.sqrt(checkpointdistSq);
                        const invDist = 1 / distance;
                        const dirX = checkpointX * invDist * monster.speed;
                        const dirY = checkpointY * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 50 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                            playSound('shoot-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if ((!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) && checkpointdistSq < 100 && checkpointdistSq > 50) {
                        monster.lastSpawn = currentTime;
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            game.monsterTotal++;
                            const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                            const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                            const soldier = { ...window.MonsterData.soldier, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                            const monsterTexture = {
                                id: soldier.skin,
                                width: soldier.width,
                                height: soldier.height
                            };
                            soldier.data = getTextureData(monsterTexture);
                            game.monsters.push(soldier);
                            updateMonsterGrid();
                            angle += 30;
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 200 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }
                        if (monster.speed != 0.01) { monster.speed = 0.01; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 400 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }                       
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'fighterjet':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, 5));
                            playSound('shoot-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 100 && isVisibleToPlayer(monster)) {
                        if (!monster.rocketlastShot || currentTime - monster.rocketlastShot >= monster.rocketCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'rocket', game.projectileMap['inboundrocket'], 'monster', 0.2, 25));
                            playSound('rocketlaunch-sound');
                            monster.rocketlastShot = currentTime;
                        }
                    }
                    if (distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist;
                        const dirY = dy * invDist;
                        if (distSq > 50) {
                            // TOO FAR → move toward player
                            moveX = dirX * monster.speed;
                            moveY = dirY * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        } else {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;

                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }

                            moveX = perpX * monster.strafeDir * monster.speed;
                            moveY = perpY * monster.strafeDir * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    if (monster.health < 200 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }
                        if (monster.speed != 0.01) { monster.speed = 0.01; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 400 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'tank':
                    if (distSq < 100 && isVisibleToPlayer(monster)) {
                        if (!monster.rocketlastShot || currentTime - monster.rocketlastShot >= monster.rocketCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'rocket', game.projectileMap['inboundrocket'], 'monster', 0.2, 25));
                            playSound('rocketlaunch-sound');
                            monster.rocketlastShot = currentTime;
                        }
                    }
                    if (distSq > 0.25 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = 'Tank Treads';
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('squish-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    if (monster.health < 100 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }
                        if (monster.speed != 0.01) { monster.speed = 0.01; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 200 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'cowking':
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                        if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                            monster.lastSpawn = currentTime;
                            for (let i = 0; i < (2 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                const cow = { ...window.MonsterData.cow, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: cow.skin,
                                    width: cow.width,
                                    height: cow.height
                                };
                                cow.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(cow);
                                updateMonsterGrid();
                            }
                            playSound('portal-sound');
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'eyeball':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle + monster.attackAngle, 'eyeball', game.projectileMap['eyeball'], 'monster', 0.2, monster.damage));
                            playSound('squish-sound');
                            monster.attackAngle += 3;
                            if (monster.attackAngle > 6) {
                                monster.attackAngle = -6;
                            }
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist;
                        const dirY = dy * invDist;
                        if (distSq > 30) {
                            // TOO FAR → move toward player
                            moveX = dirX * monster.speed;
                            moveY = dirY * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        } else {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;

                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }

                            moveX = perpX * monster.strafeDir * (monster.speed/2);
                            moveY = perpY * monster.strafeDir * (monster.speed/2);
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'witchdoctor':
                    if (distSq < 84 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            if (!monster.spawnEyeball) {
                                var rndVal = Math.floor(Math.random() * 100) + 1;
                                if (rndVal > 94) {
                                    monster.spawnEyeball = true;
                                    for (let i = 0; i < (1 * spawnModifier); i++) {
                                        const validSpots = getOpenSpawnPositions(Math.floor(game.player.x), Math.floor(game.player.y), 3);
                                        if (validSpots.length == 0) continue;
                                        const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                        const eyeball = { ...window.MonsterData.eyeball, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                        const monsterTexture = {
                                            id: eyeball.skin,
                                            width: eyeball.width,
                                            height: eyeball.height
                                        };
                                        eyeball.data = getTextureData(monsterTexture);
                                        game.monsterTotal++;
                                        game.monsters.push(eyeball);
                                        updateMonsterGrid();
                                    }
                                    playSound('portal-sound');
                                }
                            }
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'fireball', game.projectileMap['fireball'], 'monster', 0.2, monster.damage));
                            playSound('fireball-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 100 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'cheetah':
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'werewolf':
                    const distance = Math.sqrt(distSq);
                    const invDist = 1 / distance;
                    const dirX = dx * invDist * monster.speed;
                    const dirY = dy * invDist * monster.speed;
                    if (monster.health < 165 && !monster.flee && (monster.fleeTime == 0 || currentTime - monster.fleeTime > 8000)) {
                        monster.flee = true;
                        monster.fleeTime = currentTime;
                    } else if ((monster.flee && monster.health > 375) || (monster.flee && distSq < 50 && currentTime - monster.fleeTime > 8000)) {
                        monster.flee = false;
                    }
                    if ((!monster.lastHeal || currentTime - monster.lastHeal >= monster.healCooldown) && monster.health <= 420) {
                        monster.health += 80;
                        monster.lastHeal = currentTime;
                    }
                    if (!monster.flee) {
                        if (distSq > 0.25) {
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    } else {
                        // dirX, dirY = direction FROM monster TO player
                        // So fleeing direction is the opposite:
                        const fleeX = -dirX;
                        const fleeY = -dirY;

                        // Perpendicular (strafe)
                        const perpX = -dirY;
                        const perpY = dirX;
                        // Control how much the monster flees vs strafes
                        const fleeWeight = 0.8;   // mostly fleeing
                        const strafeWeight = 0.2; // small sideways motion

                        monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                        if (Math.random() < 0.01) {
                            monster.strafeDir *= -1;
                        }

                        // Blend the directions
                        let moveX = (fleeX * fleeWeight) + (perpX * monster.strafeDir * strafeWeight);
                        let moveY = (fleeY * fleeWeight) + (perpY * monster.strafeDir * strafeWeight);

                        // Normalize so speed stays consistent
                        const length = Math.hypot(moveX, moveY);
                        if (length > 0) {
                            moveX = (moveX / length) * monster.speed;
                            moveY = (moveY / length) * monster.speed;
                        }

                        const newX = monster.x + moveX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }

                        const newY = monster.y + moveY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'rhino':
                    if (distSq < 45) {
                        if (!monster.lastCharge || currentTime - monster.lastCharge >= monster.chargeCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            monster.chargeAngle = angle;
                            monster.isCharging = true;
                            monster.lastCharge = currentTime;
                        }
                    }
                    if (monster.isCharging) {
                        // Charge the player using the predetermined charge angle
                        const chargeSpeed = monster.speed * 3; // Charge faster than normal movement
                        const chargeDx = Math.cos(degreeToRadians(monster.chargeAngle)) * chargeSpeed;
                        const chargeDy = Math.sin(degreeToRadians(monster.chargeAngle)) * chargeSpeed;

                        // Try to move in X direction with the charge angle
                        const newX = monster.x + chargeDx;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }

                        // Try to move in Y direction with the charge angle
                        const newY = monster.y + chargeDy;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }

                        // If the rhino has reached a certain threshold charging time, stop charging
                        if (currentTime - monster.lastCharge >= 2500) {
                            monster.isCharging = false;
                        }
                    } else {
                        // If not charging, follow the player
                        if (distSq > 0.25 && distSq < 100) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;

                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }

                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        if (monster.isCharging) {
                            game.player.health -= 100;
                            game.lastMonsterToHitPlayer = 'Rhino Charge';
                            // Play monster attack sound
                            playSound('squish-sound');
                        } else {
                            game.player.health -= monster.damage;
                            game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                            // Play monster attack sound
                            playSound('injured-sound');
                        }
                        monster.lastAttack = currentTime;
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'dinosauregg':
                case 'stasischamber':
                case 'explosivebarrel':
                    break;
                case 'lander':
                    if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                        monster.lastSpawn = currentTime;
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            let checkVal = 0;
                            if (monster.landerNumber == 2) { checkVal = 2 }
                            const rover = { ...window.MonsterData.rover, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y, activeCheckpoint: checkVal };
                            const monsterTexture = {
                                id: rover.skin,
                                width: rover.width,
                                height: rover.height
                            };
                            rover.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(rover);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    break;
                case 'moby':
                    if (currentTime - monster.spawnTime >= 60000) {
                        monster.isDead = true;
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'bones-sprite', width: 256, height: 256 }) });
                        playSound('moby-death');
                        break;
                    }
                    const MclosestEnemy = game.monsters.reduce((closest, enemy) => {
                        // Skip excluded enemy types and dead enemies
                        if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || enemy.isDead) {
                            return closest;
                        }

                        // Calculate distance to this enemy
                        const edx = enemy.x - monster.x;
                        const edy = enemy.y - monster.y;
                        const enemyDistSq = edx * edx + edy * edy;

                        // Update closest if this enemy is closer
                        if (!closest || enemyDistSq < closest.distanceSq) {
                            return { enemy: enemy, distanceSq: enemyDistSq };
                        }
                        return closest;
                    }, null);
                    if (!MclosestEnemy || !Number.isFinite(MclosestEnemy.enemy.x) || !Number.isFinite(MclosestEnemy.enemy.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                        break; // NaN safeguard
                    } else {
                        const enemyX = MclosestEnemy.enemy.x - monster.x;
                        const enemyY = MclosestEnemy.enemy.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq > 0.25 && enemydistSq < 100 && isVisibleToMonster(monster, MclosestEnemy.enemy)) {
                            const distance = Math.sqrt(enemydistSq);
                            const invDist = 1 / distance;
                            const dirX = enemyX * invDist * monster.speed;
                            const dirY = enemyY * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                            if (enemydistSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                // Attack the monster
                                MclosestEnemy.enemy.health -= monster.damage;
                                playSound('splash-sound');
                                monster.lastAttack = currentTime;
                            }
                        } else if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'seahorse':
                    if (currentTime - monster.spawnTime >= 60000) {
                        monster.isDead = true;
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: getTextureData({ id: 'bones-sprite', width: 256, height: 256 }) });
                        playSound('moby-death');
                        break;
                    }
                    const SclosestEnemy = game.monsters.reduce((closest, enemy) => {
                        // Skip excluded enemy types and dead enemies
                        if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || enemy.isDead) {
                            return closest;
                        }

                        // Calculate distance to this enemy
                        const edx = enemy.x - monster.x;
                        const edy = enemy.y - monster.y;
                        const enemyDistSq = edx * edx + edy * edy;

                        // Update closest if this enemy is closer
                        if (!closest || enemyDistSq < closest.distanceSq) {
                            return { enemy: enemy, distanceSq: enemyDistSq };
                        }
                        return closest;
                    }, null);
                    if (!SclosestEnemy || !Number.isFinite(SclosestEnemy.enemy.x) || !Number.isFinite(SclosestEnemy.enemy.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                        break; // NaN safeguard
                    } else {
                        const enemyX = SclosestEnemy.enemy.x - monster.x;
                        const enemyY = SclosestEnemy.enemy.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq < 64 && (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) && isVisibleToMonster(monster, SclosestEnemy.enemy)) {
                            // Attack the monster
                            var angle = radiansToDegrees(Math.atan2(enemyY, enemyX));
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const startX = monster.x + Math.cos(degreeToRadians(angle)) * game.bulletStartDistance;
                                const startY = monster.y + Math.sin(degreeToRadians(angle)) * game.bulletStartDistance;
                                const seahorsebaby = { ...window.MonsterData.seahorsebaby, id: `monster_seahorsebaby`, x: startX, y: startY, spawnTime: Date.now() };
                                const monsterTexture = {
                                    id: seahorsebaby.skin,
                                    width: seahorsebaby.width,
                                    height: seahorsebaby.height
                                };
                                seahorsebaby.data = getTextureData(monsterTexture);
                                game.monsters.push(seahorsebaby);
                                angle += 30;
                            }
                            monster.lastShot = currentTime;
                        }
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'seahorsebaby':
                    if (currentTime - monster.spawnTime >= 10000) {
                        monster.isDead = true;
                        game.sprites.push({ id: 'gib-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'gib-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                        break;
                    }
                    const SBclosestEnemy = game.monsters.reduce((closest, enemy) => {
                        // Skip excluded enemy types and dead enemies
                        if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || enemy.isDead) {
                            return closest;
                        }

                        // Calculate distance to this enemy
                        const edx = enemy.x - monster.x;
                        const edy = enemy.y - monster.y;
                        const enemyDistSq = edx * edx + edy * edy;

                        // Update closest if this enemy is closer
                        if (!closest || enemyDistSq < closest.distanceSq) {
                            return { enemy:enemy, distanceSq: enemyDistSq };
                        }
                        return closest;
                    }, null);
                    if (!SBclosestEnemy || !Number.isFinite(SBclosestEnemy.enemy.x) || !Number.isFinite(SBclosestEnemy.enemy.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                        break; // NaN safeguard
                    } else {
                        const enemyX = SBclosestEnemy.enemy.x - monster.x;
                        const enemyY = SBclosestEnemy.enemy.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq > 0.25 && enemydistSq < 100 && isVisibleToMonster(monster, SBclosestEnemy.enemy)) {
                            const distance = Math.sqrt(enemydistSq);
                            const invDist = 1 / distance;
                            const dirX = enemyX * invDist * monster.speed;
                            const dirY = enemyY * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                            if (enemydistSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                // Attack the monster
                                SBclosestEnemy.enemy.health -= monster.damage;
                                playSound('splash-sound');
                                monster.lastAttack = currentTime;
                                monster.isDead = true;
                                game.sprites.push({ id: 'gib-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: getTextureData({ id: 'gib-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                            }
                        } else if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'rover':
                    // Checkpoint route movement code
                    const RcheckpointOBJ = game.checkpoints.find(checkpoint => checkpoint.type == `checkpoint_${monster.activeCheckpoint}`);
                    if (!RcheckpointOBJ || !Number.isFinite(RcheckpointOBJ.x) || !Number.isFinite(RcheckpointOBJ.y)) {
                        break; // NaN safeguard
                    }
                    const RcheckpointX = RcheckpointOBJ.x - monster.x;
                    const RcheckpointY = RcheckpointOBJ.y - monster.y;
                    const RcheckpointdistSq = RcheckpointX * RcheckpointX + RcheckpointY * RcheckpointY;
                    if (RcheckpointdistSq < 1) {
                        monster.activeCheckpoint++;
                        if (monster.activeCheckpoint >= game.checkpointTotal) {
                            monster.activeCheckpoint = 0;
                        }
                    } else {
                        if (distSq > 15) {
                            const distance = Math.sqrt(RcheckpointdistSq);
                            const invDist = 1 / distance;
                            const dirX = RcheckpointX * invDist * monster.speed;
                            const dirY = RcheckpointY * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                        } else {
                            if (!monster.spawnAstronaut) {
                                monster.spawnAstronaut = true;
                                for (let i = 0; i < (2 * spawnModifier); i++) {
                                    const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                                    if (validSpots.length == 0) continue;
                                    const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                    const astronaut = { ...window.MonsterData.astronaut, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                    const monsterTexture = {
                                        id: astronaut.skin,
                                        width: astronaut.width,
                                        height: astronaut.height
                                    };
                                    astronaut.data = getTextureData(monsterTexture);
                                    game.monsterTotal++;
                                    game.monsters.push(astronaut);
                                    updateMonsterGrid();
                                }
                                playSound('portal-sound');
                            }
                        }
                    }
                    if (monster.health < 100 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }
                        if (monster.speed != 0.02) { monster.speed = 0.02; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 200 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }
                        if (monster.speed != 0.03) { monster.speed = 0.03; }
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'turret':
                    if (distSq < 80 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            let texture;
                            texture = game.projectileMap['laserpurple'];
                            playSound('laserblast-sound');
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', texture, 'monster', 0.2, monster.damage));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle + 2, 'laser', texture, 'monster', 0.2, monster.damage));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle + 4, 'laser', texture, 'monster', 0.2, monster.damage));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle - 2, 'laser', texture, 'monster', 0.2, monster.damage));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle - 4, 'laser', texture, 'monster', 0.2, monster.damage));
                            monster.lastShot = currentTime;
                        }
                    }
                    break;
                case 'lizard':
                    if (distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // dirX, dirY = direction FROM monster TO player
                        // So fleeing direction is the opposite:
                        const fleeX = -dirX;
                        const fleeY = -dirY;

                        // Perpendicular (strafe)
                        const perpX = -dirY;
                        const perpY = dirX;
                        // Control how much the monster flees vs strafes
                        const fleeWeight = 0.8;   // mostly fleeing
                        const strafeWeight = 0.2; // small sideways motion

                        monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                        if (Math.random() < 0.01) {
                            monster.strafeDir *= -1;
                        }

                        // Blend the directions
                        let moveX = (fleeX * fleeWeight) + (perpX * monster.strafeDir * strafeWeight);
                        let moveY = (fleeY * fleeWeight) + (perpY * monster.strafeDir * strafeWeight);

                        // Normalize so speed stays consistent
                        const length = Math.hypot(moveX, moveY);
                        if (length > 0) {
                            moveX = (moveX / length) * monster.speed;
                            moveY = (moveY / length) * monster.speed;
                        }

                        const newX = monster.x + moveX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }

                        const newY = monster.y + moveY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    } else {
                        // Pick a new random direction every wanderCooldown seconds
                        if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                            const angle = Math.random() * Math.PI * 2;
                            monster.dirX = Math.cos(angle);
                            monster.dirY = Math.sin(angle);

                            monster.lastWanderTime = currentTime;
                        }

                        // Move using the stored random direction
                        const dirX = monster.dirX * monster.speed;
                        const dirY = monster.dirY * monster.speed;

                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        } else {
                            // Hit a wall → pick a new direction immediately
                            monster.lastWanderTime = 0;
                        }

                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        } else {
                            // Hit a wall → pick a new direction immediately
                            monster.lastWanderTime = 0;
                        }
                    }
                    break;
                case 'raptor':
                    if (distSq > 0.25 && distSq < 60) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    } else if (distSq > 80) {
                        const closestEnemy = game.monsters.reduce((closest, enemy) => {
                            // Skip excluded enemy types and dead enemies
                            if (enemy.type == 'raptor' || enemy.type == 'dinosauregg' || enemy.type == 'pterodactyl' || enemy.isDead) {
                                return closest;
                            }

                            // Calculate distance to this enemy
                            const edx = enemy.x - monster.x;
                            const edy = enemy.y - monster.y;
                            const enemyDistSq = edx * edx + edy * edy;

                            // Update closest if this enemy is closer
                            if (!closest || enemyDistSq < closest.distanceSq) {
                                return { enemy: enemy, distanceSq: enemyDistSq };
                            }
                            return closest;
                        }, null);

                        if (!closestEnemy || !Number.isFinite(closestEnemy.enemy.x) || !Number.isFinite(closestEnemy.enemy.y)) {
                            // Pick a new random direction every wanderCooldown seconds
                            if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                                const angle = Math.random() * Math.PI * 2;
                                monster.dirX = Math.cos(angle);
                                monster.dirY = Math.sin(angle);

                                monster.lastWanderTime = currentTime;
                            }

                            // Move using the stored random direction
                            const dirX = monster.dirX * monster.speed;
                            const dirY = monster.dirY * monster.speed;

                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }

                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }
                            break;
                        } else {
                            const enemyX = closestEnemy.enemy.x - monster.x;
                            const enemyY = closestEnemy.enemy.y - monster.y;
                            const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                            if (enemydistSq > 0.25 && enemydistSq < 80) {
                                const distance = Math.sqrt(enemydistSq);
                                const invDist = 1 / distance;
                                const dirX = enemyX * invDist * monster.speed;
                                const dirY = enemyY * invDist * monster.speed;
                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }
                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                                if (enemydistSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                    // Attack the monster
                                    closestEnemy.enemy.health -= monster.damage;
                                    monster.lastAttack = currentTime;
                                }
                            } else {
                                // Pick a new random direction every wanderCooldown seconds
                                if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                                    const angle = Math.random() * Math.PI * 2;
                                    monster.dirX = Math.cos(angle);
                                    monster.dirY = Math.sin(angle);

                                    monster.lastWanderTime = currentTime;
                                }

                                // Move using the stored random direction
                                const dirX = monster.dirX * monster.speed;
                                const dirY = monster.dirY * monster.speed;

                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                } else {
                                    // Hit a wall → pick a new direction immediately
                                    monster.lastWanderTime = 0;
                                }

                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                } else {
                                    // Hit a wall → pick a new direction immediately
                                    monster.lastWanderTime = 0;
                                }
                            }
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'brontosaurus':
                    if (distSq > 0.25) {
                        // Pick a new random direction every wanderCooldown seconds
                        if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                            const angle = Math.random() * Math.PI * 2;
                            monster.dirX = Math.cos(angle);
                            monster.dirY = Math.sin(angle);

                            monster.lastWanderTime = currentTime;
                        }

                        // Move using the stored random direction
                        const dirX = monster.dirX * monster.speed;
                        const dirY = monster.dirY * monster.speed;

                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        } else {
                            // Hit a wall → pick a new direction immediately
                            monster.lastWanderTime = 0;
                        }

                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        } else {
                            // Hit a wall → pick a new direction immediately
                            monster.lastWanderTime = 0;
                        }
                        if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                            // Attack the player
                            game.player.health -= monster.damage;
                            game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                            monster.lastAttack = currentTime;
                            // Play monster attack sound
                            playSound('squish-sound');
                            // Check if player died
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                    }
                    break;
                case 'stegosaurus':
                    if (distSq > 0.25 && distSq < 45) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    } else {
                        const closestEnemy = game.monsters.reduce((closest, enemy) => {
                            // Skip excluded enemy types and dead enemies
                            if (enemy.type != 'dinosauregg' || enemy.isDead) {
                                return closest;
                            }

                            // Calculate distance to this enemy
                            const edx = enemy.x - monster.x;
                            const edy = enemy.y - monster.y;
                            const enemyDistSq = edx * edx + edy * edy;

                            // Update closest if this enemy is closer
                            if (!closest || enemyDistSq < closest.distanceSq) {
                                return { ...enemy, distanceSq: enemyDistSq };
                            }
                            return closest;
                        }, null);
                        if (!closestEnemy || !Number.isFinite(closestEnemy.x) || !Number.isFinite(closestEnemy.y)) {
                            // Pick a new random direction every wanderCooldown seconds
                            if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                                const angle = Math.random() * Math.PI * 2;
                                monster.dirX = Math.cos(angle);
                                monster.dirY = Math.sin(angle);

                                monster.lastWanderTime = currentTime;
                            }

                            // Move using the stored random direction
                            const dirX = monster.dirX * monster.speed;
                            const dirY = monster.dirY * monster.speed;

                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }

                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }
                            break;
                        } else {
                            const enemyX = closestEnemy.x - monster.x;
                            const enemyY = closestEnemy.y - monster.y;
                            const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                            if (enemydistSq > 0.5) {
                                const distance = Math.sqrt(enemydistSq);
                                const invDist = 1 / distance;
                                const dirX = enemyX * invDist * monster.speed;
                                const dirY = enemyY * invDist * monster.speed;
                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }
                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                            } else {
                                // Pick a new random direction every wanderCooldown seconds
                                if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                                    const angle = Math.random() * Math.PI * 2;
                                    monster.dirX = Math.cos(angle);
                                    monster.dirY = Math.sin(angle);

                                    monster.lastWanderTime = currentTime;
                                }

                                // Move using the stored random direction
                                const dirX = monster.dirX * monster.speed;
                                const dirY = monster.dirY * monster.speed;

                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                } else {
                                    // Hit a wall → pick a new direction immediately
                                    monster.lastWanderTime = 0;
                                }

                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                } else {
                                    // Hit a wall → pick a new direction immediately
                                    monster.lastWanderTime = 0;
                                }
                            }
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'sphinx':
                    if (distSq < 400 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            const perpX = -Math.sin(angle);
                            const perpY = Math.cos(angle);
                            const spacing = 0.1;
                            game.projectiles.push(new Projectile(monster.x + perpX * spacing, monster.y + perpY * spacing, angle, 'laser', game.projectileMap['laserpurple'], 'monster', 0.2, monster.damage));
                            game.projectiles.push(new Projectile(monster.x - perpX * spacing, monster.y - perpY * spacing, angle, 'laser', game.projectileMap['laserpurple'], 'monster', 0.2, monster.damage));
                            playSound('laser-sound');
                            monster.lastShot = currentTime;
                            var rndVal = Math.floor(Math.random() * 100) + 1;
                            if (rndVal > 89) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                monster.x = spot.x;
                                monster.y = spot.y;
                                playSound('portal-sound');
                            }
                        }
                    }
                    const lx = monster.leashX - monster.x;
                    const ly = monster.leashY - monster.y;
                    const leashdistSq = lx * lx + ly * ly;
                    if (leashdistSq > 1 && !isVisibleToPlayer(monster)) {
                        // if sphinx do not see the player they will leash back to starting position and guard
                        const distance = Math.sqrt(leashdistSq);
                        const invDist = 1 / distance;
                        const dirX = lx * invDist * monster.speed;
                        const dirY = ly * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    } else if (distSq > 10 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'anubis':
                    if (distSq < 400 && isVisibleToPlayer(monster)) {
                        if (!monster.spawnMoon) {
                            monster.spawnMoon = true;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                const moon = { ...window.MonsterData.moon, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: moon.skin,
                                    width: moon.width,
                                    height: moon.height
                                };
                                moon.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(moon);
                            }
                        }
                        if (!monster.spawnSun) {
                            monster.spawnSun = true;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                const sun = { ...window.MonsterData.sun, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: sun.skin,
                                    width: sun.width,
                                    height: sun.height
                                };
                                sun.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(sun);
                            }
                        }
                        if (!monster.spawnSaturn) {
                            monster.spawnSaturn = true;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 5);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                const saturn = { ...window.MonsterData.saturn, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: saturn.skin,
                                    width: saturn.width,
                                    height: saturn.height
                                };
                                saturn.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(saturn);
                                playSound('portal-sound');
                            }
                        }
                        // GRAVITY WELL MECHANIC
                        if (!monster.gravityWellActive) {
                            if (!monster.lastGravityWell || currentTime - monster.lastGravityWell >= 8000) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 13);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                monster.gravityWellActive = true;
                                monster.gravityWellStartTime = currentTime;
                                monster.gravityWellX = spot.x;
                                monster.gravityWellY = spot.y;
                                monster.lastGravityWell = currentTime;
                            }
                        }
                        // PROCESS ACTIVE GRAVITY WELL
                        if (monster.gravityWellActive) {
                            const gravityWellDuration = 3000;
                            const timeSinceStart = currentTime - monster.gravityWellStartTime;

                            if (timeSinceStart < gravityWellDuration) {
                                const gravityWellRadius = 5;
                                const pullStrength = 0.07;

                                // Pull player
                                const playerDx = monster.gravityWellX - game.player.x;
                                const playerDy = monster.gravityWellY - game.player.y;
                                const playerDist = Math.sqrt(playerDx * playerDx + playerDy * playerDy);

                                if (playerDist > 0.25 && playerDist < gravityWellRadius) {
                                    const pullX = (playerDx / playerDist) * pullStrength;
                                    const pullY = (playerDy / playerDist) * pullStrength;

                                    const newPlayerX = game.player.x + pullX;
                                    const newPlayerY = game.player.y + pullY;

                                    if (map[Math.floor(newPlayerY)] && map[Math.floor(newPlayerY)][Math.floor(newPlayerX)] !== 2) {
                                        game.player.x = newPlayerX;
                                    }
                                    if (map[Math.floor(game.player.y)] && map[Math.floor(game.player.y)][Math.floor(newPlayerX)] !== 2) {
                                        game.player.y = newPlayerY;
                                    }
                                }

                                // Pull monsters
                                for (const otherMonster of game.monsters) {
                                    if (!otherMonster.isDead && otherMonster.id !== monster.id) {
                                        const monsterDx = monster.gravityWellX - otherMonster.x;
                                        const monsterDy = monster.gravityWellY - otherMonster.y;
                                        const monsterDist = Math.sqrt(monsterDx * monsterDx + monsterDy * monsterDy);

                                        if (monsterDist > 0.25 && monsterDist < gravityWellRadius) {
                                            const pullX = (monsterDx / monsterDist) * pullStrength * 0.5;
                                            const pullY = (monsterDy / monsterDist) * pullStrength * 0.5;

                                            const newMonsterX = otherMonster.x + pullX;
                                            const newMonsterY = otherMonster.y + pullY;

                                            if (map[Math.floor(newMonsterY)] && map[Math.floor(newMonsterY)][Math.floor(newMonsterX)] !== 2 && !isMonsterAtPosition(newMonsterX, otherMonster.y, otherMonster)) {
                                                otherMonster.x = newMonsterX;
                                            }
                                            if (map[Math.floor(otherMonster.y)] && map[Math.floor(otherMonster.y)][Math.floor(newMonsterX)] !== 2 && !isMonsterAtPosition(otherMonster.x, newMonsterY, otherMonster)) {
                                                otherMonster.y = newMonsterY;
                                            }
                                        }
                                    }
                                }

                                // Pull projectiles
                                for (let i = 0; i < game.projectiles.length; i++) {
                                    const projectile = game.projectiles[i];
                                    const projDx = monster.gravityWellX - projectile.x;
                                    const projDy = monster.gravityWellY - projectile.y;
                                    const projDist = Math.sqrt(projDx * projDx + projDy * projDy);

                                    if (projDist < gravityWellRadius && projectile.owner !== 'monster') {
                                        const pullX = (projDx / projDist) * pullStrength * 0.8;
                                        const pullY = (projDy / projDist) * pullStrength * 0.8;
                                        projectile.x += pullX;
                                        projectile.y += pullY;
                                    }
                                }

                                // Store gravity well data for floor rendering
                                game.activeGravityWell = {
                                    x: monster.gravityWellX,
                                    y: monster.gravityWellY,
                                    radius: gravityWellRadius,
                                    progress: timeSinceStart / gravityWellDuration
                                };
                            } else {
                                monster.gravityWellActive = false;
                                game.activeGravityWell = null;
                            }
                        }
                        if (distSq < 64 && isVisibleToPlayer(monster)) {
                            if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'whirl', game.projectileMap['whirl'], 'monster', 0.2, 0));
                                //playSound('shoot-sound');
                                monster.lastShot = currentTime;
                            }
                        }
                        // HANDLE ACTIVE PULL
                        if (monster.activePull && monster.pullStartTime) {
                            const timeSincePull = currentTime - monster.pullStartTime;

                            if (timeSincePull < monster.pullDuration) {
                                // Pull is still active
                                const pullStrength = 0.15; // How hard to pull per frame
                                const dx = monster.x - game.player.x;
                                const dy = monster.y - game.player.y;
                                const pullDistance = Math.sqrt(dx * dx + dy * dy);

                                if (pullDistance > 0.25) {
                                    const pullDx = (dx / pullDistance) * pullStrength;
                                    const pullDy = (dy / pullDistance) * pullStrength;

                                    const newX = game.player.x + pullDx;
                                    const newY = game.player.y + pullDy;

                                    // Only move if not hitting a wall
                                    if (map[Math.floor(game.player.y)] && map[Math.floor(game.player.y)][Math.floor(newX)] !== 2) {
                                        game.player.x = newX;
                                    }
                                    if (map[Math.floor(newY)] && map[Math.floor(newY)][Math.floor(game.player.x)] !== 2) {
                                        game.player.y = newY;
                                    }
                                }
                            } else {
                                // Pull duration elapsed - deactivate
                                monster.activePull = false;
                                monster.pullStartTime = null;
                            }
                        }
                        // SPAWN MUMMY
                        if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                            monster.lastSpawn = currentTime;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                game.monsterTotal++;
                                const mummy = { ...window.MonsterData.mummy, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: mummy.skin,
                                    width: mummy.width,
                                    height: mummy.height
                                };
                                mummy.data = getTextureData(monsterTexture);
                                game.monsters.push(mummy);
                                updateMonsterGrid();
                            }
                            playSound('portal-sound');
                        }
                        if (distSq > 0.25 && distSq < 400) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                        if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                            // Attack the player
                            game.player.health -= monster.damage;
                            game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                            monster.lastAttack = currentTime;
                            // Play monster attack sound
                            playSound('injured-sound');
                            // Check if player died
                            if (game.player.health <= 0) {
                                playSound('death-sound');
                                endGameDeath();
                            }
                        }
                    }
                    break;
                case 'moon':
                case 'sun':
                case 'saturn':
                    // Celestial route movement code
                    const celestialOBJ = game.monsters.find(monster => monster.type == 'anubis');
                    if (!celestialOBJ || !Number.isFinite(celestialOBJ.x) || !Number.isFinite(celestialOBJ.y)) {
                        break; // NaN safeguard
                    }
                    const celestialX = celestialOBJ.x - monster.x;
                    const celestialY = celestialOBJ.y - monster.y;
                    const celestialdistSq = celestialX * celestialX + celestialY * celestialY;
                    if (monster.type == 'moon' && celestialOBJ.health < 1600 && monster.invulnerable) {
                        monster.invulnerable = false;
                        monster.speed = 0.06;
                    }
                    if (monster.type == 'sun' && celestialOBJ.health < 1100 && monster.invulnerable) {
                        monster.invulnerable = false;
                        monster.speed = 0.06;
                    }
                    if (monster.type == 'saturn' && celestialOBJ.health < 600 && monster.invulnerable) {
                        monster.invulnerable = false;
                        monster.speed = 0.06;
                    }
                    if (celestialdistSq > 0.01 && monster.invulnerable) {
                        const distance = Math.sqrt(celestialdistSq);

                        // Normalize direction to center
                        const nx = celestialX / distance;
                        const ny = celestialY / distance;

                        // Get perpendicular (tangent) direction
                        // Swap and negate one axis → 90° rotation
                        const tangentX = -ny;  // clockwise orbit
                        const tangentY = nx;

                        // maintain orbit radius (spring effect)    
                        const desiredRadius = 1;
                        const radiusError = distance - desiredRadius;

                        const pullStrength = 0.05; // how strongly it corrects radius

                        // Combine orbit + radius correction
                        const moveX = (tangentX * monster.speed) + (nx * radiusError * pullStrength);
                        const moveY = (tangentY * monster.speed) + (ny * radiusError * pullStrength);

                        // Move with collision checks
                        const newX = monster.x + moveX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster, ['sun', 'moon', 'saturn'])) {
                            monster.x = newX;
                        }

                        const newY = monster.y + moveY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster, ['sun', 'moon', 'saturn'])) {
                            monster.y = newY;
                        }
                    } else {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster, ['sun', 'moon', 'saturn'])) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster, ['sun', 'moon', 'saturn'])) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        switch (monster.type) {
                            case 'moon':
                            case 'sun':
                                game.lastMonsterToHitPlayer = 'The ' + monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                                break
                            case 'saturn':
                                game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                                break;
                        }
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        //playSound('squish-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'mummy':
                    if (distSq > 0.25 && distSq < 400 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        if (!game.playerFrozen) {
                            game.playerFrozen = true;
                            game.playerFrozenTime = Date.now();
                            game.playerFrozenDuration = 500;
                        }
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'tutankhamun':
                    if (monster.health < 1500 && !monster.spawnFrogPortal) {
                        monster.spawnFrogPortal = true;
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const portal = { ...window.MonsterData.portal, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y, spawnType: 'frog', spawnCooldown: 2000 };
                            const monsterTexture = {
                                id: portal.skin,
                                width: portal.width,
                                height: portal.height
                            };
                            portal.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(portal);
                            updateMonsterGrid();
                        }
                        monster.shieldHealth = monster.maxShieldHealth;
                        playSound('portal-sound');
                    }
                    if (monster.health < 1000 && !monster.spawnMummyPortal) {
                        monster.spawnMummyPortal = true;
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const portal = { ...window.MonsterData.portal, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y, spawnType: 'mummy', spawnCooldown: 8000 };
                            const monsterTexture = {
                                id: portal.skin,
                                width: portal.width,
                                height: portal.height
                            };
                            portal.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(portal);
                            updateMonsterGrid();
                        }
                        monster.shieldHealth = monster.maxShieldHealth;
                        playSound('portal-sound');
                    }
                    if (monster.health < 500 && !monster.spawnKamikazePortal) {
                        monster.spawnKamikazePortal = true;
                        for (let i = 0; i < (1 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const portal = { ...window.MonsterData.portal, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y, spawnType: 'kamikaze', spawnCooldown: 4000 };
                            const monsterTexture = {
                                id: portal.skin,
                                width: portal.width,
                                height: portal.height
                            };
                            portal.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(portal);
                            updateMonsterGrid();
                        }
                        monster.shieldHealth = monster.maxShieldHealth;
                        playSound('portal-sound');
                    }
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle - 7, 'force', game.projectileMap['force'], 'monster', 0.2, 0));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'force', game.projectileMap['force'], 'monster', 0.2, 0));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle + 7, 'force', game.projectileMap['force'], 'monster', 0.2, 0));
                            //playSound('shoot-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    // HANDLE ACTIVE PUSH
                    if (monster.activePush && monster.pushStartTime) {
                        const timeSincePush = currentTime - monster.pushStartTime;

                        if (timeSincePush < monster.pushDuration) {
                            // Push is still active
                            const pushStrength = 0.15; // How hard to push per frame
                            const dx = monster.x - game.player.x;
                            const dy = monster.y - game.player.y;
                            const pushDistance = Math.sqrt(dx * dx + dy * dy);

                            if (pushDistance > 0.25) {
                                const pushDx = (dx / pushDistance) * pushStrength;
                                const pushDy = (dy / pushDistance) * pushStrength;

                                const newX = game.player.x - pushDx;
                                const newY = game.player.y - pushDy;

                                // Only move if not hitting a wall
                                if (map[Math.floor(game.player.y)] && map[Math.floor(game.player.y)][Math.floor(newX)] !== 2) {
                                    game.player.x = newX;
                                }
                                if (map[Math.floor(newY)] && map[Math.floor(newY)][Math.floor(game.player.x)] !== 2) {
                                    game.player.y = newY;
                                }
                            }
                        } else {
                            // Push duration elapsed - deactivate
                            monster.activePush = false;
                            monster.pushStartTime = null;
                        }
                    }
                    if (distSq < 400 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist;
                        const dirY = dy * invDist;
                        if (distSq > 55) {
                            // TOO FAR → move toward player
                            moveX = dirX * monster.speed;
                            moveY = dirY * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        } else {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;
                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }
                            moveX = perpX * monster.strafeDir * monster.speed;
                            moveY = perpY * monster.strafeDir * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'portal':
                    // SPAWN FROG
                    if (monster.spawnType == 'frog') {
                        if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                            monster.lastSpawn = currentTime;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                game.monsterTotal++;
                                const frog = { ...window.MonsterData.frog, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: frog.skin,
                                    width: frog.width,
                                    height: frog.height
                                };
                                frog.data = getTextureData(monsterTexture);
                                game.monsters.push(frog);
                                updateMonsterGrid();
                            }
                        }
                    }
                    // SPAWN MUMMY
                    if (monster.spawnType == 'mummy') {
                        if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                            monster.lastSpawn = currentTime;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                game.monsterTotal++;
                                const mummy = { ...window.MonsterData.mummy, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: mummy.skin,
                                    width: mummy.width,
                                    height: mummy.height
                                };
                                mummy.data = getTextureData(monsterTexture);
                                game.monsters.push(mummy);
                                updateMonsterGrid();
                            }
                        }
                    }
                    // SPAWN KAMIKAZE
                    if (monster.spawnType == 'kamikaze') {
                        if (!monster.lastSpawn || currentTime - monster.lastSpawn >= monster.spawnCooldown) {
                            monster.lastSpawn = currentTime;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                game.monsterTotal++;
                                const kamikaze = { ...window.MonsterData.kamikaze, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                                const monsterTexture = {
                                    id: kamikaze.skin,
                                    width: kamikaze.width,
                                    height: kamikaze.height
                                };
                                kamikaze.data = getTextureData(monsterTexture);
                                game.monsters.push(kamikaze);
                                updateMonsterGrid();
                            }
                        }
                    }
                    break;
                case 'frog':
                    if (isVisibleToPlayer(monster)) {
                        if (!monster.lastCharge || currentTime - monster.lastCharge >= monster.chargeCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            monster.chargeAngle = angle;
                            monster.isCharging = true;
                            monster.lastCharge = currentTime;
                        }
                    }
                    if (monster.isCharging) {
                        // Charge the player using the predetermined charge angle
                        const chargeSpeed = monster.speed * 2; // Charge faster than normal movement
                        const chargeDx = Math.cos(degreeToRadians(monster.chargeAngle)) * chargeSpeed;
                        const chargeDy = Math.sin(degreeToRadians(monster.chargeAngle)) * chargeSpeed;

                        // Try to move in X direction with the charge angle
                        const newX = monster.x + chargeDx;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster, ['frog'])) {
                            monster.x = newX;
                        }

                        // Try to move in Y direction with the charge angle
                        const newY = monster.y + chargeDy;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster, ['frog'])) {
                            monster.y = newY;
                        }

                        // If the frog has reached a certain threshold charging time, stop charging
                        if (currentTime - monster.lastCharge >= 500) {
                            monster.isCharging = false;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        // Play monster attack sound
                        playSound('injured-sound');
                        monster.lastAttack = currentTime;
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'kamikaze':
                    if (distSq > 0.25 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                        if (!monster.lastSound || currentTime - monster.lastSound >= monster.soundCooldown) {
                            const maxDistance = 50;
                            const loudDistance = 10;

                            let volume;

                            if (distance <= loudDistance) {
                                volume = 1;
                            } else {
                                let t = (distance - loudDistance) / (maxDistance - loudDistance);
                                t = Math.min(t, 1);

                                // sharp dropoff after 10
                                volume = 0.9 * Math.pow(1 - t, 2.5);
                            }

                            if (volume > 0.01) {
                                playSound('kamikaze-aaaa', volume);
                            }

                            monster.lastSound = currentTime;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = 'Kamikaze Explosion';
                        monster.lastAttack = currentTime;
                        monster.isDead = true;
                        const used = new Set();
                        const explosions = 3;
                        const radius = 0.5; // how tight the cluster is
                        let count = 0;
                        while (count < explosions) {
                            let offsetX, offsetY;
                            do {
                                offsetX = (Math.random() * 2 - 1) * radius;
                                offsetY = (Math.random() * 2 - 1) * radius;
                            } while (offsetX * offsetX + offsetY * offsetY > radius * radius);
                            const x = monster.x + offsetX;
                            const y = monster.y + offsetY;
                            const key = `${x},${y}`;
                            if (used.has(key)) continue; // skip duplicates
                            used.add(key);
                            game.sprites.push({ id: 'explosion-sprite', x: x, y: y, width: 512, height: 512, data: getTextureData({ id: 'explosion-sprite', width: 512, height: 512 }), spawnTime: Date.now(), cullTime: 200 });
                            count++;
                        }
                        for (const m2 of game.monsters) {
                            if (!m2.isDead && (m2.id != monster.id)) {
                                const dx2 = m2.x - monster.x;
                                const dy2 = m2.y - monster.y;
                                const distanceSq2 = dx2 * dx2 + dy2 * dy2;
                                if (distanceSq2 < game.explosionHitboxRadius && !m2.invulnerable && m2.type != 'yeti') {
                                    m2.health -= 150;
                                }
                            }
                        }
                        stopSound('kamikaze-aaaa');
                        game.monsterDefeated++;
                        playSound('explosion-sound');
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'pterodactyl':
                    if (!monster.grabbed) {
                        if (distSq > 0.25 && distSq < 60 && (!monster.lastGrab || currentTime - monster.lastGrab >= monster.grabCooldown)) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                            if (distSq < 0.5 && (!monster.lastGrab || currentTime - monster.lastGrab >= monster.grabCooldown)) {
                                // Grab the player
                                monster.lastGrab = currentTime;
                                monster.grabbed = true;
                                showNotification('A Pterodactyl has grabbed you!');
                            }
                        } else {
                            // Pick a new random direction every wanderCooldown seconds
                            if (!monster.lastWanderTime || currentTime - monster.lastWanderTime >= monster.wanderCooldown) {
                                const angle = Math.random() * Math.PI * 2;
                                monster.dirX = Math.cos(angle);
                                monster.dirY = Math.sin(angle);

                                monster.lastWanderTime = currentTime;
                            }

                            // Move using the stored random direction
                            const dirX = monster.dirX * monster.speed;
                            const dirY = monster.dirY * monster.speed;

                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }

                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            } else {
                                // Hit a wall → pick a new direction immediately
                                monster.lastWanderTime = 0;
                            }
                        }
                    } else {
                        // Checkpoint route movement code
                        const checkpointOBJ = game.checkpoints.find(checkpoint => checkpoint.type == `checkpoint_${monster.activeCheckpoint}`);
                        if (!checkpointOBJ || !Number.isFinite(checkpointOBJ.x) || !Number.isFinite(checkpointOBJ.y)) {
                            break; // NaN safeguard
                        }
                        const checkpointX = checkpointOBJ.x - monster.x;
                        const checkpointY = checkpointOBJ.y - monster.y;
                        const checkpointdistSq = checkpointX * checkpointX + checkpointY * checkpointY;
                        if (checkpointdistSq < 1) {
                            monster.grabbed = false;
                        } else {
                            const distance = Math.sqrt(checkpointdistSq);
                            const invDist = 1 / distance;
                            const dirX = checkpointX * invDist * monster.speed;
                            const dirY = checkpointY * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                                monster.y = newY;
                            }
                            // Drag Player
                            const pullStrength = 0.15;     // How hard to pull per frame
                            const followDistance = 0.5;    // How far behind the monster to stay

                            // Vector from player to monster
                            const mdx = monster.x - game.player.x;
                            const mdy = monster.y - game.player.y;
                            const dist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;

                            // Normalize direction
                            const mdirX = mdx / dist;
                            const mdirY = mdy / dist;

                            // Target point slightly "behind" the monster (relative to player)
                            const targetX = monster.x - mdirX * followDistance;
                            const targetY = monster.y - mdirY * followDistance;

                            // Pull toward that target instead of monster center
                            const mx = targetX - game.player.x;
                            const my = targetY - game.player.y;
                            const pullDistance = Math.sqrt(mx * mx + my * my) || 1;

                            // Optional smoothing (prevents snapping when close)
                            const adjustedPullStrength = Math.min(pullStrength, pullDistance * 0.1);

                            const pullDx = (mx / pullDistance) * adjustedPullStrength;
                            const pullDy = (my / pullDistance) * adjustedPullStrength;

                            const mnewX = game.player.x + pullDx;
                            const mnewY = game.player.y + pullDy;

                            // Collision checks
                            if (map[Math.floor(game.player.y)] && map[Math.floor(game.player.y)][Math.floor(mnewX)] !== 2) {
                                game.player.x = mnewX;
                            }
                            if (map[Math.floor(mnewY)] && map[Math.floor(mnewY)][Math.floor(game.player.x)] !== 2) {
                                game.player.y = mnewY;
                            }
                        }
                    }
                    break;
                case 'baphomet':
                    if (monster.health < 1800 && !monster.spawnSkeletons) {
                        monster.spawnSkeletons = true;
                        for (let i = 0; i < (10 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const skeleton = { ...window.MonsterData.skeleton, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: skeleton.skin,
                                width: skeleton.width,
                                height: skeleton.height
                            };
                            skeleton.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(skeleton);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 1300 && !monster.spawnSatyrs) {
                        monster.spawnSatyrs = true;
                        for (let i = 0; i < (3 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const satyr = { ...window.MonsterData.satyr, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: satyr.skin,
                                width: satyr.width,
                                height: satyr.height
                            };
                            satyr.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(satyr);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 900 && !monster.spawnBats) {
                        monster.spawnBats = true;
                        for (let i = 0; i < (5 * spawnModifier); i++) {
                            const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 9);
                            if (validSpots.length == 0) continue;
                            const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                            const bat = { ...window.MonsterData.bat, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y };
                            const monsterTexture = {
                                id: bat.skin,
                                width: bat.width,
                                height: bat.height
                            };
                            bat.data = getTextureData(monsterTexture);
                            game.monsterTotal++;
                            game.monsters.push(bat);
                            updateMonsterGrid();
                        }
                        playSound('portal-sound');
                    }
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastSpawn || (currentTime - monster.lastSpawn >= monster.spawnCooldown && monster.asteroidCount < 8)) {
                            monster.lastSpawn = currentTime;
                            monster.asteroidCount++;
                            for (let i = 0; i < (1 * spawnModifier); i++) {
                                const validSpots = getOpenSpawnPositions(Math.floor(monster.x), Math.floor(monster.y), 3);
                                if (validSpots.length == 0) continue;
                                const spot = validSpots[Math.floor(Math.random() * validSpots.length)];
                                const mx = game.player.x - spot.x;
                                const my = game.player.y - spot.y;
                                const angle = radiansToDegrees(Math.atan2(my, mx));
                                const monsterDx = Math.cos(degreeToRadians(angle));
                                const monsterDy = Math.sin(degreeToRadians(angle));
                                const asteroid = { ...window.MonsterData.asteroid, id: `monster_${game.monsterTotal}`, x: spot.x, y: spot.y, dirX: monsterDx, dirY: monsterDy };
                                const monsterTexture = {
                                    id: asteroid.skin,
                                    width: asteroid.width,
                                    height: asteroid.height
                                };
                                asteroid.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(asteroid);
                                updateMonsterGrid();
                            }
                            playSound('fireball-sound');
                        }
                    }
                    if (distSq < 400 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist;
                        const dirY = dy * invDist;
                        if (distSq > 45) {
                            // TOO FAR → move toward player
                            moveX = dirX * monster.speed;
                            moveY = dirY * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        } else {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;
                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.005) {
                                monster.strafeDir *= -1;
                            }
                            moveX = perpX * monster.strafeDir * monster.speed;
                            moveY = perpY * monster.strafeDir * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + moveX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + moveY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                    }
                    break;
                case 'asteroid':
                    // Initialize direction ONCE (if not already set)
                    if (monster.dirX === undefined || monster.dirY === undefined) {
                        const angle = Math.random() * Math.PI * 2;
                        monster.dirX = Math.cos(angle);
                        monster.dirY = Math.sin(angle);
                    }

                    // Move using stored direction
                    let nextX = monster.x + monster.dirX * monster.speed;
                    let nextY = monster.y + monster.dirY * monster.speed;

                    // Try to move in X direction
                    if (map[Math.floor(monster.y)][Math.floor(nextX)] !== 2 && !isMonsterAtPosition(nextX, monster.y, monster)) {
                        monster.x = nextX;
                    } else {
                        // Bounce on vertical wall → reflect X
                        monster.dirX *= -1;
                    }

                    // Try to move in Y direction
                    if (map[Math.floor(nextY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, nextY, monster)) {
                        monster.y = nextY;
                    } else {
                        // Bounce on horizontal wall → reflect Y
                        monster.dirY *= -1;
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
                case 'prisoner':
                    if (monster.hostile) {
                        if (monster.following) {
                            if (!monster.announceAllegiance) {
                                var rnd = Math.floor(Math.random() * 2);
                                playSound(`prisoner-hostile-${rnd + 1}`);
                                monster.announceAllegiance = true;
                            }
                            const RclosestEnemy = game.monsters.reduce((closest, enemy) => {
                                // Skip excluded enemy types and dead enemies
                                if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || enemy.type == 'guard' ||(enemy.type == 'prisoner' && enemy.hostile) || enemy.isDead) {
                                    return closest;
                                }

                                // Calculate distance to this enemy
                                const edx = enemy.x - monster.x;
                                const edy = enemy.y - monster.y;
                                const enemyDistSq = edx * edx + edy * edy;

                                // Update closest if this enemy is closer
                                if (!closest || enemyDistSq < closest.distanceSq) {
                                    return { enemy: enemy, distanceSq: enemyDistSq };
                                }
                                return closest;
                            }, null);
                            if (!RclosestEnemy || !Number.isFinite(RclosestEnemy.enemy.x) || !Number.isFinite(RclosestEnemy.enemy.y)) {
                                //move towards player if no enemies
                                if (distSq > 0.25 && distSq < 100 && isVisibleToPlayer(monster)) {
                                    const distance = Math.sqrt(distSq);
                                    const invDist = 1 / distance;
                                    const dirX = dx * invDist * monster.speed;
                                    const dirY = dy * invDist * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + dirX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + dirY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                }
                                if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                    // Attack the player
                                    game.player.health -= monster.damage;
                                    game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                                    monster.lastAttack = currentTime;
                                    // Play monster attack sound
                                    playSound('injured-sound');
                                    // Check if player died
                                    if (game.player.health <= 0) {
                                        playSound('death-sound');
                                        endGameDeath();
                                    }
                                }
                                break;
                            } else {        
                                const Redx = RclosestEnemy.enemy.x - monster.x;
                                const Redy = RclosestEnemy.enemy.y - monster.y;
                                const RenemyDistSq = Redx * Redx + Redy * Redy;
                                if (distSq <= RenemyDistSq) {
                                    if (distSq > 0.25 && distSq < 100 && isVisibleToPlayer(monster)) {
                                        const distance = Math.sqrt(distSq);
                                        const invDist = 1 / distance;
                                        const dirX = dx * invDist * monster.speed;
                                        const dirY = dy * invDist * monster.speed;
                                        // Try to move in X direction
                                        const newX = monster.x + dirX;
                                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                            monster.x = newX;
                                        }
                                        // Try to move in Y direction
                                        const newY = monster.y + dirY;
                                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                            monster.y = newY;
                                        }
                                    }
                                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                        // Attack the player
                                        game.player.health -= monster.damage;
                                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                                        monster.lastAttack = currentTime;
                                        // Play monster attack sound
                                        playSound('injured-sound');
                                        // Check if player died
                                        if (game.player.health <= 0) {
                                            playSound('death-sound');
                                            endGameDeath();
                                        }
                                    }
                                } else {                                  
                                    if (RenemyDistSq > 0.25 && isVisibleToMonster(monster, RclosestEnemy.enemy)) {
                                        const distance = Math.sqrt(RenemyDistSq);
                                        const invDist = 1 / distance;
                                        const dirX = Redx * invDist * monster.speed;
                                        const dirY = Redy * invDist * monster.speed;
                                        // Try to move in X direction
                                        const newX = monster.x + dirX;
                                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                            monster.x = newX;
                                        }
                                        // Try to move in Y direction
                                        const newY = monster.y + dirY;
                                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                            monster.y = newY;
                                        }
                                        if (RenemyDistSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                            // Attack the monster
                                            RclosestEnemy.enemy.health -= monster.damage;
                                            playSound('knife-sound');
                                            monster.lastAttack = currentTime;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (isVisibleToPlayer(monster)) {
                                monster.following = true;
                            }
                        }
                    } else {
                        if (monster.following) {
                            if (!monster.announceAllegiance) {
                                var rnd = Math.floor(Math.random() * 2);
                                playSound(`prisoner-friendly-${rnd + 1}`);
                                monster.announceAllegiance = true;
                            }
                            const PclosestEnemy = game.monsters.reduce((closest, enemy) => {
                                // Skip excluded enemy types and dead enemies
                                if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || (enemy.type == 'prisoner' && !enemy.hostile) || enemy.isDead) {
                                    return closest;
                                }

                                // Calculate distance to this enemy
                                const edx = enemy.x - monster.x;
                                const edy = enemy.y - monster.y;
                                const enemyDistSq = edx * edx + edy * edy;

                                // Update closest if this enemy is closer
                                if (!closest || enemyDistSq < closest.distanceSq) {
                                    return { enemy: enemy, distanceSq: enemyDistSq };
                                }
                                return closest;
                            }, null);
                            if (!PclosestEnemy || !Number.isFinite(PclosestEnemy.enemy.x) || !Number.isFinite(PclosestEnemy.enemy.y)) {
                                if (distSq > 2) {
                                    const distance = Math.sqrt(distSq);
                                    const invDist = 1 / distance;
                                    const dirX = dx * invDist * monster.speed;
                                    const dirY = dy * invDist * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + dirX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + dirY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                }
                                break; // NaN safeguard
                            } else {
                                const enemyX = PclosestEnemy.enemy.x - monster.x;
                                const enemyY = PclosestEnemy.enemy.y - monster.y;
                                const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                                if (enemydistSq > 0.25 && isVisibleToMonster(monster,PclosestEnemy.enemy)) {
                                    const distance = Math.sqrt(enemydistSq);
                                    const invDist = 1 / distance;
                                    const dirX = enemyX * invDist * monster.speed;
                                    const dirY = enemyY * invDist * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + dirX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + dirY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                    if (enemydistSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                                        // Attack the monster
                                        PclosestEnemy.enemy.health -= monster.damage;
                                        playSound('knife-sound');
                                        monster.lastAttack = currentTime;
                                    }
                                } else if (distSq > 2) {
                                    const distance = Math.sqrt(distSq);
                                    const invDist = 1 / distance;
                                    const dirX = dx * invDist * monster.speed;
                                    const dirY = dy * invDist * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + dirX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + dirY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                }
                            }
                        } else {
                            if (isVisibleToPlayer(monster)) {
                                monster.following = true;
                            }
                        }
                    }
                    break;
                case 'guard':
                    const JclosestEnemy = game.monsters.reduce((closest, enemy) => {
                        // Skip excluded enemy types and dead enemies
                        if (enemy.type == 'seahorse' || enemy.type == 'seahorsebaby' || enemy.type == 'moby' || enemy.type == 'guard' || enemy.isDead) {
                            return closest;
                        }

                        // Calculate distance to this enemy
                        const edx = enemy.x - monster.x;
                        const edy = enemy.y - monster.y;
                        const enemyDistSq = edx * edx + edy * edy;

                        // Update closest if this enemy is closer
                        if (!closest || enemyDistSq < closest.distanceSq) {
                            return { ...enemy, distanceSq: enemyDistSq };
                        }
                        return closest;
                    }, null);
                    if (distSq < 80 && !monster.aggroSoundPlayed && isVisibleToPlayer(monster)) {
                        var rnd = Math.floor(Math.random() * 3);
                        playSound(`guard-${rnd + 1}`);
                        monster.aggroSoundPlayed = true;
                    }
                    if (!JclosestEnemy || !Number.isFinite(JclosestEnemy.x) || !Number.isFinite(JclosestEnemy.y)) {
                        if (distSq < 64 && isVisibleToPlayer(monster)) {
                            if (monster.variant === 'guard2') {
                                const delay = monster.shotsInBurst < 3 ? 500 : monster.attackCooldown;
                                if (!monster.lastShot || currentTime - monster.lastShot >= delay) {
                                    const angle = radiansToDegrees(Math.atan2(dy, dx));
                                    game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                                    playSound('shoot-sound');
                                    monster.lastShot = currentTime;
                                    monster.shotsInBurst++;
                                    if (monster.shotsInBurst > 3) {
                                        monster.shotsInBurst = 1;
                                    }
                                }
                            } else {
                                if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                    const angle = radiansToDegrees(Math.atan2(dy, dx));
                                    game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                                    playSound('shoot-sound');
                                    monster.lastShot = currentTime;
                                }
                            }
                        }
                        if (distSq > 30 && isVisibleToPlayer(monster)) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * monster.speed;
                            const dirY = dy * invDist * monster.speed;
                            // Try to move in X direction
                            const newX = monster.x + dirX;
                            if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                monster.x = newX;
                            }
                            // Try to move in Y direction
                            const newY = monster.y + dirY;
                            if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                monster.y = newY;
                            }
                        }
                        break; // NaN safeguard
                    } else {
                        const Jedx = JclosestEnemy.x - monster.x;
                        const Jedy = JclosestEnemy.y - monster.y;
                        const JenemyDistSq = Jedx * Jedx + Jedy * Jedy;
                        if (distSq <= JenemyDistSq) {
                            if (distSq < 64 && isVisibleToPlayer(monster)) {
                                if (monster.variant === 'guard2') {
                                    const delay = monster.shotsInBurst < 3 ? 500 : monster.attackCooldown;
                                    if (!monster.lastShot || currentTime - monster.lastShot >= delay) {
                                        const angle = radiansToDegrees(Math.atan2(dy, dx));
                                        game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                                        playSound('shoot-sound');
                                        monster.lastShot = currentTime;
                                        monster.shotsInBurst++;
                                        if (monster.shotsInBurst > 3) {
                                            monster.shotsInBurst = 1;
                                        }
                                    }
                                } else {
                                    if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                        const angle = radiansToDegrees(Math.atan2(dy, dx));
                                        game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, monster.damage));
                                        playSound('shoot-sound');
                                        monster.lastShot = currentTime;
                                    }
                                }
                            }
                            if (distSq > 30 && isVisibleToPlayer(monster)) {
                                const distance = Math.sqrt(distSq);
                                const invDist = 1 / distance;
                                const dirX = dx * invDist * monster.speed;
                                const dirY = dy * invDist * monster.speed;
                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }
                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                            }
                        } else { 
                            if (JenemyDistSq < 64 && isVisibleToMonster(monster, JclosestEnemy)) {
                                if (monster.variant === 'guard2') {
                                    const delay = monster.shotsInBurst < 3 ? 500 : monster.attackCooldown;
                                    if (!monster.lastShot || currentTime - monster.lastShot >= delay) {
                                        const angle = radiansToDegrees(Math.atan2(Jedy, Jedx));
                                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * game.bulletStartDistance;
                                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * game.bulletStartDistance;
                                        game.projectiles.push(new Projectile(startX, startY, angle, 'bullet', game.projectileMap['bullet'], 'player', 0.2, monster.damage));
                                        playSound('shoot-sound');
                                        monster.lastShot = currentTime;
                                        monster.shotsInBurst++;
                                        if (monster.shotsInBurst > 3) {
                                            monster.shotsInBurst = 1;
                                        }
                                    }
                                } else {
                                    if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                        const angle = radiansToDegrees(Math.atan2(Jedy, Jedx));
                                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * game.bulletStartDistance;
                                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * game.bulletStartDistance;
                                        game.projectiles.push(new Projectile(startX, startY, angle, 'bullet', game.projectileMap['bullet'], 'player', 0.2, monster.damage));
                                        playSound('shoot-sound');
                                        monster.lastShot = currentTime;
                                    }
                                }
                            }
                            if (JenemyDistSq > 30 && JenemyDistSq < 200 && isVisibleToMonster(monster, JclosestEnemy)) {
                                const distance = Math.sqrt(JenemyDistSq);
                                const invDist = 1 / distance;
                                const dirX = dx * invDist * monster.speed;
                                const dirY = dy * invDist * monster.speed;
                                // Try to move in X direction
                                const newX = monster.x + dirX;
                                if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                    monster.x = newX;
                                }
                                // Try to move in Y direction
                                const newY = monster.y + dirY;
                                if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                    monster.y = newY;
                                }
                            }
                        }
                    }
                    break;
                case 'robot':
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    if (monster.health < 50 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 4 + 1);
                        if (rnd == 1) {
                            game.sprites.push({ id: 'fire-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'fire-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 300 });
                        } else {
                            game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                        }
                        if (monster.speed != 0.02) { monster.speed = 0.02; }
                        monster.lastSmokeTime = currentTime;
                    } else if (monster.health < 100 && (monster.lastSmokeTime == 0 || currentTime - monster.lastSmokeTime >= 50)) {
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        const startX = monster.x + Math.cos(degreeToRadians(angle)) * -0.25;
                        const startY = monster.y + Math.sin(degreeToRadians(angle)) * -0.25;
                        var rnd = Math.floor(Math.random() * 2 + 1);
                        switch (rnd) {
                            case 1:
                                game.sprites.push({ id: 'smoke-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                            case 2:
                                game.sprites.push({ id: 'smoke2-sprite', x: startX, y: startY, width: 200, height: 200, data: getTextureData({ id: 'smoke2-sprite', width: 200, height: 200 }), spawnTime: Date.now(), cullTime: 400 });
                                break;
                        }
                        if (monster.speed != 0.03) { monster.speed = 0.03; }
                        monster.lastSmokeTime = currentTime;
                    }
                    break;
                case 'yeti':
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        if (!monster.pushStartTime) {
                            monster.pushStartTime = Date.now();
                            monster.activePush = true;
                        }
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    // YETI KNOCKBACK
                    if (monster.activePush && monster.pushStartTime) {
                        const timeSincePush = currentTime - monster.pushStartTime;

                        if (timeSincePush < monster.pushDuration) {
                            // Push is still active
                            const pushStrength = 0.08; // How hard to push per frame
                            const dx = monster.x - game.player.x;
                            const dy = monster.y - game.player.y;
                            const pushDistance = Math.sqrt(dx * dx + dy * dy);

                            if (pushDistance > 0.25) {
                                const pushDx = (dx / pushDistance) * pushStrength;
                                const pushDy = (dy / pushDistance) * pushStrength;

                                const newX = game.player.x - pushDx;
                                const newY = game.player.y - pushDy;

                                // Only move if not hitting a wall
                                if (map[Math.floor(game.player.y)] && map[Math.floor(game.player.y)][Math.floor(newX)] !== 2) {
                                    game.player.x = newX;
                                }
                                if (map[Math.floor(newY)] && map[Math.floor(newY)][Math.floor(game.player.x)] !== 2) {
                                    game.player.y = newY;
                                }
                            }
                        } else {
                            // Push duration elapsed - deactivate
                            monster.activePush = false;
                            monster.pushStartTime = null;
                        }
                    }
                    break;
                case 'satyr':
                    if (distSq < 64 && isVisibleToPlayer(monster)) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'deathcoil', game.projectileMap['deathcoil'], 'monster', 0.05, monster.damage));
                            playSound('deathcoil-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if ((!monster.lastHeal || currentTime - monster.lastHeal >= monster.healCooldown) && monster.health <= 670) {
                        monster.health += 80;
                        monster.lastHeal = currentTime;
                    }
                    if (!monster.lastReanimate || currentTime - monster.lastReanimate >= monster.reanimateCooldown) {
                        const closestBones = game.sprites.reduce((closest, bones) => {
                            // Skip excluded enemy types and dead enemies
                            if (bones.id != 'bones-sprite') {
                                return closest;
                            }

                            // Calculate distance to this enemy
                            const edx = bones.x - monster.x;
                            const edy = bones.y - monster.y;
                            const bonesDistSq = edx * edx + edy * edy;

                            // Update closest if this enemy is closer
                            if (!closest || bonesDistSq < closest.distanceSq) {
                                return { bones: bones, distanceSq: bonesDistSq };
                            }
                            return closest;
                        }, null);
                        if (!closestBones || !Number.isFinite(closestBones.bones.x) || !Number.isFinite(closestBones.bones.y)) {
                            break; // NaN safeguard
                        } else {
                            if (closestBones.distanceSq < 0.5) {
                                monster.lastReanimate = currentTime;
                                closestBones.bones.cullTime = 1;
                                var angle = radiansToDegrees(Math.atan2(dy, dx));
                                const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                                const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                                const skeleton = { ...window.MonsterData.skeleton, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                                const monsterTexture = {
                                    id: skeleton.skin,
                                    width: skeleton.width,
                                    height: skeleton.height
                                };
                                skeleton.data = getTextureData(monsterTexture);
                                game.monsterTotal++;
                                game.monsters.push(skeleton);
                                updateMonsterGrid();
                                updateSpriteList();
                                playSound('raiseskeleton-sound');
                            } else {
                                const bonesX = closestBones.bones.x - monster.x;
                                const bonesY = closestBones.bones.y - monster.y;
                                const bonesdistSq = bonesX * bonesX + bonesY * bonesY;
                                if (bonesdistSq > 0.25 && isVisibleToMonster(monster, closestBones.bones)) {
                                    const distance = Math.sqrt(bonesdistSq);
                                    const invDist = 1 / distance;
                                    const dirX = bonesX * invDist * monster.speed;
                                    const dirY = bonesY * invDist * monster.speed;
                                    // Try to move in X direction
                                    const newX = monster.x + dirX;
                                    if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                                        monster.x = newX;
                                    }
                                    // Try to move in Y direction
                                    const newY = monster.y + dirY;
                                    if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                                        monster.y = newY;
                                    }
                                } 
                            }
                        } 
                    } else if (distSq > 30 && isVisibleToPlayer(monster)) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    break;
                default:
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * monster.speed;
                        const dirY = dy * invDist * monster.speed;
                        // Try to move in X direction
                        const newX = monster.x + dirX;
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2 && !isMonsterAtPosition(newX, monster.y, monster)) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2 && !isMonsterAtPosition(monster.x, newY, monster)) {
                            monster.y = newY;
                        }
                    }
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
                        game.lastMonsterToHitPlayer = monster.type.charAt(0).toUpperCase() + monster.type.slice(1);
                        monster.lastAttack = currentTime;
                        // Play monster attack sound
                        playSound('injured-sound');
                        // Check if player died
                        if (game.player.health <= 0) {
                            playSound('death-sound');
                            endGameDeath();
                        }
                    }
                    break;
            }
        }
    }

    // Remove dead monsters from the array to free memory
    removeDeadMonsters();
}

// Player Movement

function movePlayer() {
    let map = game.levels[game.currentLevel].map;
    let mapHeight = map.length;
    let mapWidth = map[0]?.length ?? 0; 
    const currentTime = Date.now();
    if (!game.laserrechargetick || currentTime - game.laserrechargetick >= 10000) {
        if (game.laserbattery < 96 || game.cheats.infiniteAmmo || game.developerMode) {
            game.laserbattery += 5;
        } else {
            game.laserbattery = 100;
        }
        game.laserrechargetick = currentTime;       
    }
    if (game.playerFrozen && currentTime - game.playerFrozenTime >= game.playerFrozenDuration) {
        game.playerFrozen = false;
    }
    if (game.key.up.active && !game.playerFrozen) {
        let playerCos = Math.cos(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let newX = game.player.x + playerCos;
        let newY = game.player.y + playerSin;
        let checkX = Math.floor(newX + playerCos * game.player.radius);
        let checkY = Math.floor(newY + playerSin * game.player.radius);  
        let mathfloorX = Math.floor(game.player.x);
        let mathfloorY = Math.floor(game.player.y);
        // Collision detection
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.x = newX;
        }
    }
    if (game.key.down.active && !game.playerFrozen) {
        let playerCos = Math.cos(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(game.player.angle)) * game.player.speed.movement;
        let newX = game.player.x - playerCos;
        let newY = game.player.y - playerSin;
        let checkX = Math.floor(newX - playerCos * game.player.radius);
        let checkY = Math.floor(newY - playerSin * game.player.radius);
        let mathfloorX = Math.floor(game.player.x);
        let mathfloorY = Math.floor(game.player.y);
        // Collision detection
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.x = newX;
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
    if (game.key.strafeleft.active && !game.playerFrozen) {
        // Calculate strafe angle (90 degrees to the left of player's angle)
        let strafeAngle = game.player.angle - 90;
        let playerCos = Math.cos(degreeToRadians(strafeAngle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(strafeAngle)) * game.player.speed.movement;
        let newX = game.player.x + playerCos;
        let newY = game.player.y + playerSin;
        let checkX = Math.floor(newX);
        let checkY = Math.floor(newY);
        let mathfloorX = Math.floor(game.player.x);
        let mathfloorY = Math.floor(game.player.y);
        // Collision detection
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.x = newX;
        }
    }
    if (game.key.straferight.active && !game.playerFrozen) {
        // Calculate strafe angle (90 degrees to the right of player's angle)
        let strafeAngle = game.player.angle + 90;
        let playerCos = Math.cos(degreeToRadians(strafeAngle)) * game.player.speed.movement;
        let playerSin = Math.sin(degreeToRadians(strafeAngle)) * game.player.speed.movement;
        let newX = game.player.x + playerCos;
        let newY = game.player.y + playerSin;
        let checkX = Math.floor(newX);
        let checkY = Math.floor(newY);
        let mathfloorX = Math.floor(game.player.x);
        let mathfloorY = Math.floor(game.player.y);
        // Collision detection
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2 && (map[mathfloorY][checkX] !== 100 || game.keysUnlocked.cellkey)) {
            game.player.x = newX;
        }
    }
    if (game.key.up.active || game.key.down.active || game.key.strafeleft.active || game.key.straferight.active) {
        // Check for pickups
        switch (game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)]) {
            // Ammo pickup
            case 8:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.ammo += 12;
                game.pickupCollected++;
                break;
            // Pistol pickup
            case 9:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.pistol) {
                    showNotification('Weapon Unlocked: Pistol');
                }
                game.weaponsUnlocked.pistol = true;
                game.ammo += 3;
                game.pickupCollected++;
                break;
            // Machinegun pickup
            case 10:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.machinegun) {
                    showNotification('Weapon Unlocked: Machine Gun');
                }
                game.weaponsUnlocked.machinegun = true;
                game.ammo += 5;
                game.pickupCollected++;
                break;
            // Yeti pistol pickup
            case 11:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.yetipistol) {
                    showNotification('Weapon Unlocked: Yeti Pistol');
                }
                game.weaponsUnlocked.yetipistol = true;
                game.pickupCollected++;
                break;
            // Rocket launcher pickup
            case 12:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.rocketlauncher) {
                    showNotification('Weapon Unlocked: Rocket Launcher');
                }
                game.weaponsUnlocked.rocketlauncher = true;
                game.rocketammo += 2;
                game.pickupCollected++;
                break;
            // Rocket ammo pickup
            case 13:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.rocketammo += 4;
                game.pickupCollected++;
                break;
            // Scepter pickup
            case 14:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.scepter) {
                    showNotification('Weapon Unlocked: Scepter');
                }
                game.weaponsUnlocked.scepter = true;
                game.pickupCollected++;
                break;
            // Portal activated
            case 20:
                for (let portal of game.levels[game.currentLevel].portalcoords) {
                    if (portal.x == Math.floor(game.player.x) && portal.y == Math.floor(game.player.y)) {
                        playSound('portal-sound');
                        game.player.x = portal.exitx;
                        game.player.y = portal.exity;
                        game.player.angle = portal.exitangle;
                        break;
                    }
                }
                break;
            // Boomerang pickup
            case 26:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.boomerang) {
                    showNotification('Weapon Unlocked: Boomerang');
                }
                game.weaponsUnlocked.boomerang = true;
                game.boomerangammo++;
                game.pickupCollected++;
                break;
            // Cow Chest pickup
            case 38:
                if (game.keysUnlocked.cowkey) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    //drop secret totem
                    itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'secretunlock-sound');
                    showNotification('Level Unlocked: Secret Cow Level');
                    game.pickupCollected++;
                    game.levels[15].unlocked = true;
                    game.keysUnlocked.cowkey = false;
                } else {
                    playSound('locked-sound');
                }                
                break;
            // Cow Key pickup
            case 39:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.keysUnlocked.cowkey) {
                    showNotification('Picked Up Cow Key');
                }
                game.pickupCollected++;
                game.keysUnlocked.cowkey = true;
                break;
            // Speed Boost pickup
            case 40:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.pickupCollected++;
                game.player.speed.movement = 0.12;
                break;
            // Acid Damage
            case 42:
                game.player.health -= 1;
                playSound('injured-sound');    
                if (game.player.health <= 0) {
                    playSound('death-sound');
                    game.lastMonsterToHitPlayer = 'Acid';
                    endGameDeath();
                }
                break;
            // Laser Shotgun pickup
            case 43:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.lasershotgun) {
                    showNotification('Weapon Unlocked: Laser Shotgun');
                }
                game.weaponsUnlocked.lasershotgun = true;
                game.pickupCollected++;
                break;
            // Burning Debris Damage
            case 44:
                game.player.health -= 1;
                playSound('injured-sound');
                if (game.player.health <= 0) {
                    playSound('death-sound');
                    game.lastMonsterToHitPlayer = 'Burning Debris';
                    endGameDeath();
                }
                break;
            // Monkey Chest pickup
            case 48:
                if (game.keysUnlocked.monkeykey) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    //drop secret totem
                    itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'secretunlock-sound');
                    showNotification('Level Unlocked: Dark Continent');
                    game.pickupCollected++;
                    game.levels[16].unlocked = true;
                    game.keysUnlocked.monkeykey = false;
                } else {
                    playSound('locked-sound');
                }
                break;
            // Monkey Key pickup
            case 49:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.keysUnlocked.monkeykey) {
                    showNotification('Picked Up Monkey Key');
                }
                game.pickupCollected++;
                game.keysUnlocked.monkeykey = true;
                break;
            // Medkit pickup
            case 51:
                if (game.player.health <= 50) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                    game.pickupCollected++;
                    game.player.health += 50;
                } else {
                    playSound('invalid-sound');
                }
                break;
            // Trident pickup
            case 58:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.weaponsUnlocked.trident) {
                    showNotification('Weapon Unlocked: Trident');
                }
                game.weaponsUnlocked.trident = true;
                game.tridentammo = true;
                game.pickupCollected++;
                break;
            // Goat Chest pickup
            case 67:
                if (game.keysUnlocked.goatkey) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    //drop secret totem
                    itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'secretunlock-sound');
                    showNotification('Level Unlocked: Armageddon');
                    game.pickupCollected++;
                    game.levels[17].unlocked = true;
                    game.keysUnlocked.goatkey = false;
                } else {
                    playSound('locked-sound');
                }
                break;
            // Goat Key pickup
            case 68:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.keysUnlocked.goatkey) {
                    showNotification('Picked Up Goat Key');
                }
                game.pickupCollected++;
                game.keysUnlocked.goatkey = true;
                break;
            // Battery pickup
            case 76:
                if (game.laserbattery <= 75) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                    game.pickupCollected++;
                    game.laserbattery += 25;
                } else {
                    playSound('invalid-sound');
                }
                break;
            // Cell Key pickup
            case 93:       
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                if (!game.keysUnlocked.cellkey) {
                    showNotification('Picked Up Cell Key');
                }
                game.pickupCollected++;
                game.keysUnlocked.cellkey = true;
                break;
            // Locked Door
            case 100:
                if (game.keysUnlocked.cellkey) {
                    game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                    if (game.levels[game.currentLevel].map[Math.floor(game.player.y) + 1][Math.floor(game.player.x)] == 100) {
                        game.levels[game.currentLevel].map[Math.floor(game.player.y) + 1][Math.floor(game.player.x)] = 0;
                    }
                    if (game.levels[game.currentLevel].map[Math.floor(game.player.y) - 1][Math.floor(game.player.x)] == 100) {
                        game.levels[game.currentLevel].map[Math.floor(game.player.y) - 1][Math.floor(game.player.x)] = 0;
                    }
                    if (game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x) + 1] == 100) {
                        game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x) + 1] = 0;
                    }
                    if (game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x) - 1] == 100) {
                        game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x) - 1] = 0;
                    }
                    playSound('celldoor-sound');
                } else {
                    playSound('invalid-sound');
                }
                break;
        }
    }
    if (game.key.one.active && game.weaponsUnlocked.knife) {
        game.weaponSprite = document.getElementById('knife-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 600;
        game.equippedWeapon = 1;
    }
    if (game.key.two.active && game.weaponsUnlocked.pistol) {
        game.weaponSprite = document.getElementById('gun-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 850;
        game.equippedWeapon = 2;
    }
    if (game.key.three.active && game.weaponsUnlocked.machinegun) {
        game.weaponSprite = document.getElementById('machinegun-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 400;
        game.equippedWeapon = 3;
    }
    if (game.key.four.active && game.weaponsUnlocked.yetipistol) {
        game.weaponSprite = document.getElementById('yetipistol-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 600;
        game.equippedWeapon = 4;
    }
    if (game.key.five.active && game.weaponsUnlocked.rocketlauncher) {
        game.weaponSprite = document.getElementById('rocketlauncher-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 1200;
        game.equippedWeapon = 5;
    }
    if (game.key.six.active && game.weaponsUnlocked.scepter) {
        game.weaponSprite = document.getElementById('scepter-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 300;
        game.equippedWeapon = 6;
    }
    if (game.key.seven.active && game.weaponsUnlocked.boomerang) {
        game.weaponSprite = document.getElementById('boomerangwep-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 1000;
        game.equippedWeapon = 7;
    }
    if (game.key.eight.active && game.weaponsUnlocked.lasershotgun) {
        game.weaponSprite = document.getElementById('lasershotgun-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 600;
        game.equippedWeapon = 8;
    }
    if (game.key.nine.active && game.weaponsUnlocked.trident) {
        game.weaponSprite = document.getElementById('trident-sprite');
        if (!game.cheats.rapidFire) game.shootCooldown = 600;
        game.equippedWeapon = 9;
    }
}

// Play Audio

const audioCache = {};
function playSound(id, volume = 1) {
    if (!audioCache[id]) {
        audioCache[id] = document.getElementById(id);
    }
    const audio = audioCache[id];
    if (audio) {
        audio.currentTime = 0;
        audio.volume = Math.max(0, Math.min(1, volume));
        audio.play();
    }
}

// Stop Audio

function stopSound(id) {
    const audio = audioCache[id] || document.getElementById(id);
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// Set Initial Weapon Sprite

function setWeapon(id) {
    switch (id) {
        case 1:
            game.weaponSprite = document.getElementById('knife-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 600;
            break;
        case 2:
            game.weaponSprite = document.getElementById('gun-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 850;
            break;
        case 3:
            game.weaponSprite = document.getElementById('machinegun-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 400;
            break;
        case 4:
            game.weaponSprite = document.getElementById('yetipistol-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 600;
            break;
        case 5:
            game.weaponSprite = document.getElementById('rocketlauncher-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 1200;
            break;
        case 6:
            game.weaponSprite = document.getElementById('scepter-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 300;
            break;
        case 7:
            game.weaponSprite = document.getElementById('boomerangwep-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 1000;
            break;
        case 8:
            game.weaponSprite = document.getElementById('lasershotgun-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 600;
            break;
        case 9:
            game.weaponSprite = document.getElementById('trident-sprite');
            if (!game.cheats.rapidFire) game.shootCooldown = 600;
            break;
    }
}

// Key Down Check

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case game.key.up.code:
            game.key.up.active = true;
            break;
        case game.key.down.code:
            game.key.down.active = true;
            break;
        case game.key.left.code:
            game.key.left.active = true;
            break;
        case game.key.right.code:
            game.key.right.active = true;
            break;
        case game.key.space.code:
            game.key.space.active = true;
            break;
        case game.key.one.code:
            game.key.one.active = true;
            break;
        case game.key.two.code:
            game.key.two.active = true;
            break;
        case game.key.three.code:
            game.key.three.active = true;
            break;
        case game.key.four.code:
            game.key.four.active = true;
            break;
        case game.key.five.code:
            game.key.five.active = true;
            break;
        case game.key.six.code:
            game.key.six.active = true;
            break;
        case game.key.strafeleft.code:
            game.key.strafeleft.active = true;
            break;
        case game.key.straferight.code:
            game.key.straferight.active = true;
            break;
        case game.key.seven.code:
            game.key.seven.active = true;
            break;
        case game.key.eight.code:
            game.key.eight.active = true;
            break;
        case game.key.nine.code:
            game.key.nine.active = true;
            break;
    }
});

// Key Up Check

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case game.key.up.code:
            game.key.up.active = false;
            break;
        case game.key.down.code:
            game.key.down.active = false;
            break;
        case game.key.left.code:
            game.key.left.active = false;
            break;
        case game.key.right.code:
            game.key.right.active = false;
            break;
        case game.key.space.code:
            game.key.space.active = false;
            break;
        case game.key.one.code:
            game.key.one.active = false;
            break;
        case game.key.two.code:
            game.key.two.active = false;
            break;
        case game.key.three.code:
            game.key.three.active = false;
            break;
        case game.key.four.code:
            game.key.four.active = false;
            break;
        case game.key.five.code:
            game.key.five.active = false;
            break;
        case game.key.six.code:
            game.key.six.active = false;
            break;
        case game.key.strafeleft.code:
            game.key.strafeleft.active = false;
            break;
        case game.key.straferight.code:
            game.key.straferight.active = false;
            break;
        case game.key.seven.code:
            game.key.seven.active = false;
            break;
        case game.key.eight.code:
            game.key.eight.active = false;
            break;
        case game.key.nine.code:
            game.key.nine.active = false;
            break;
    }
});

// Item Pickup

function itemPickup(ycoords, xcoords, sound) {
    playSound(sound);
    let spritenum = 0;
    for (let sprite of game.sprites) {
        if (sprite.x == xcoords && sprite.y == ycoords) {
            game.sprites.splice(spritenum, 1);
            break;
        }
        spritenum++;
    }
}

// ====================================================================
// LOAD ASSETS
// ====================================================================

// Load Sprites

function loadSprites() {
    // Load texture data for all textures
    for (let i = 0; i < game.textures.length; i++) {
        if (!game.textures[i].data) {
            game.textures[i].data = getTextureData(game.textures[i]);
        }
    }
    // Load background data for all backgrounds
    for (let i = 0; i < game.backgrounds.length; i++) {
        if (!game.backgrounds[i].data) {
            game.backgrounds[i].data = getTextureData(game.backgrounds[i]);
        }
    }
    // Load sprite data for all sprites
    for (let i = 0; i < game.sprites.length; i++) {
        if (!game.sprites[i].data) {
            game.sprites[i].data = getTextureData(game.sprites[i]);
        }
    }
    // Load monster data for all monsters
    for (let i = 0; i < game.monsters.length; i++) {
        if (!game.monsters[i].data) {
            const monsterTexture = {
                id: game.monsters[i].skin,
                width: game.monsters[i].width,
                height: game.monsters[i].height
            };
            game.monsters[i].data = getTextureData(monsterTexture);
        }
    }
    // Load projectile data for all projectiles
    for (let i = 0; i < game.projectileTextures.length; i++) {
        if (!game.projectileTextures[i].data) {
            game.projectileTextures[i].data = getTextureData(game.projectileTextures[i]);
        }
    }
}

// Get texture data from an image element

const textureCache = new Map();
function getTextureData(texture) {
    const key = texture.id;
    if (textureCache.has(key)) return textureCache.get(key);
    let image = document.getElementById(texture.id);
    let canvas = document.createElement('canvas');
    canvas.width = texture.width;
    canvas.height = texture.height;
    let canvasContext = canvas.getContext('2d');
    canvasContext.drawImage(image, 0, 0, texture.width, texture.height);
    let imageData = canvasContext.getImageData(0, 0, texture.width, texture.height).data;
    const parsedData = parseImageData(imageData);
    textureCache.set(key, parsedData);
    return parsedData;
}

// Parse image data into an array of Color objects

function parseImageData(imageData) {
    let colorArray = [];
    for (let i = 0; i < imageData.length; i += 4) {
        colorArray.push(new Color(imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]));
    }
    return colorArray;
}

// ====================================================================
// DRAW METHODS
// ====================================================================

// Draw Floor

function drawFloor(x1, wallHeight, rayAngle) {
    start = game.projection.halfHeight + wallHeight + 1;
    directionCos = Math.cos(degreeToRadians(rayAngle));
    directionSin = Math.sin(degreeToRadians(rayAngle));
    playerAngle = game.player.angle;
    for (y = start; y < game.projection.height; y++) {
        distance = game.projection.height / (2 * y - game.projection.height);

        tilex = distance * directionCos;
        tiley = distance * directionSin;
        tilex += game.player.x;
        tiley += game.player.y;

        texture = game.textures[game.levels[game.currentLevel].floor];

        if (!texture) {
            continue;
        }

        texture_x = (Math.floor(tilex * texture.width)) % texture.width;
        texture_y = (Math.floor(tiley * texture.height)) % texture.height;

        color = texture.data[texture_x + texture_y * texture.width];

        // Check if this floor tile is in the gravity well
        if (game.activeGravityWell) {
            const wellCenterX = game.activeGravityWell.x;
            const wellCenterY = game.activeGravityWell.y;
            const wellRadius = game.activeGravityWell.radius;

            // Distance from pixel to well center
            const dx = tilex - wellCenterX;
            const dy = tiley - wellCenterY;
            const distToWell = Math.sqrt(dx * dx + dy * dy);

            if (distToWell < wellRadius) {
                // Inside the well - use well texture
                const wellTexture = game.textures[22]; // star texture
                if (wellTexture) {
                    const well_x = (Math.floor(tilex * wellTexture.width) + Math.floor(game.activeGravityWell.progress * 100)) % wellTexture.width;
                    const well_y = (Math.floor(tiley * wellTexture.height)) % wellTexture.height;
                    color = wellTexture.data[well_x + well_y * wellTexture.width];
                } else {
                    // Fallback to solid purple
                    const intensity = Math.max(0, 1 - game.activeGravityWell.progress);
                    color = new Color(
                        Math.floor(200 * intensity),
                        Math.floor(80 * intensity),
                        Math.floor(255 * intensity),
                        255
                    );
                }
            } else if (distToWell < wellRadius + 0.5) {
                // Edge of well - create a glowing ring
                const edgeDistance = distToWell - wellRadius;
                const ringGlow = Math.max(0, 1 - (edgeDistance / 0.5)) * (1 - game.activeGravityWell.progress);

                color = new Color(
                    Math.floor(color.r * (1 - ringGlow * 0.8) + 0 * ringGlow),
                    Math.floor(color.g * (1 - ringGlow * 0.8) + 0 * ringGlow),
                    Math.floor(color.b * (1 - ringGlow * 0.8) + 0 * ringGlow),
                    color.a
                );
            }
        }

        drawPixel(x1, y, color);
    }
}

// Color Object

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

// Draw Line

function drawLine(x1, y1, y2, color) {
    for (let y = y1; y < y2; y++) {
        drawPixel(x1, y, color);
    }
}

// Draw texture

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

// Draw Background

function drawBackground(x, y1, y2, background) {
    let offset = (game.player.angle + x);
    for (let y = y1; y < y2; y++) {
        let textureX = Math.floor(offset % background.width);
        let textureY = Math.floor(y % background.height);
        let color = background.data[textureX + textureY * background.width];
        drawPixel(x, y, color);
    }
}

// Sprite drawing method

function drawSprites() {
    const spritesToDraw = [];

    // Collect all sprites with their distances
    for (let sprite of game.sprites) {
        const distSq = (game.player.x - sprite.x) ** 2 + (game.player.y - sprite.y) ** 2;
        if (distSq > game.objectCullDistance) continue;
        if (sprite.data && isVisibleToPlayer(sprite)) {
            const distance = Math.sqrt(Math.pow(game.player.x - sprite.x, 2) + Math.pow(game.player.y - sprite.y, 2));
            spritesToDraw.push({ sprite, distance, isMonster: false });
        }
    }

    // Collect monsters with their distances
    for (let monster of game.monsters) {
        const distSq = (game.player.x - monster.x) ** 2 + (game.player.y - monster.y) ** 2;
        if (distSq > game.objectCullDistance) continue;
        if (!monster.isDead && monster.data && isVisibleToPlayer(monster)) {
            const distance = Math.sqrt(Math.pow(game.player.x - monster.x, 2) + Math.pow(game.player.y - monster.y, 2));
            spritesToDraw.push({ sprite: monster, distance, isMonster: true });
        }
    }

    // Collect projectiles with their distances
    for (let projectile of game.projectiles) {
        const distSq = (game.player.x - projectile.x) ** 2 + (game.player.y - projectile.y) ** 2;
        if (distSq > game.objectCullDistance) continue;
        const distance = Math.sqrt(Math.pow(game.player.x - projectile.x, 2) + Math.pow(game.player.y - projectile.y, 2));
        spritesToDraw.push({
            sprite: {
                x: projectile.x,
                y: projectile.y,
                width: 4,
                height: 4,
                isBullet: true,
                owner: projectile.owner,
                texture: projectile.texture
            },
            distance,
            isProjectile: true
        });
    }

    // Sort by distance (farthest first)
    spritesToDraw.sort((a, b) => b.distance - a.distance);

    // Draw in order from farthest to nearest
    for (let item of spritesToDraw) {
        drawSpriteInWorld(item.sprite);
    }
}

// Sprite drawing logic

function drawSpriteInWorld(sprite) {
    // Get X and Y coords in relation of the player coords
    let spriteXRelative, spriteYRelative;
    spriteXRelative = sprite.x - game.player.x;
    spriteYRelative = sprite.y - game.player.y;

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
        if (sprite.owner == 'player' && sprite.texture == null) {
            // Knife: don't draw bullet
            return;
        }
        drawBulletSprite(spriteX, spriteWidth, spriteHeight, sprite);
    } else {
        const spriteScale = sprite.spriteScale || 1.0;
        spriteHeight = Math.floor(game.projection.halfHeight / distance * spriteScale);
        spriteWidth = Math.floor(game.projection.halfWidth / distance * spriteScale);
        const spriteY = game.projection.halfHeight - spriteHeight / 2;
        // Drawn Energy Shield if monster has one and is not dead
        if (sprite.type && sprite.shieldHealth !== undefined && sprite.shieldHealth > 0 && distance < 15 && spriteX >= 0 && spriteX <= game.projection.width) {
            drawEnergyShield(spriteX, spriteY + spriteHeight / 2, spriteWidth / 2, sprite.shieldHealth, sprite.maxShieldHealth);
        }
        drawSprite(spriteX, spriteWidth, spriteHeight, sprite);
    }

    if (sprite.type && sprite.health !== undefined && sprite.isDead === false) {
        // Only draw health bar if sprite is visible on screen
        if (spriteX >= 0 && spriteX <= game.projection.width) {
            // Health bar settings
            const barWidth = Math.max(24, Math.floor(spriteWidth * 0.7));
            const barHeight = 6;
            // Center above head
            const barX = Math.floor(spriteX + spriteWidth - barWidth * 2);
            const barY = Math.floor(game.projection.halfHeight - spriteHeight / 2) - 12;
            // Find maxHealth (initial health at spawn)
            let maxHealth = sprite.maxHealth || sprite._maxHealth || sprite.health;
            if (!sprite._maxHealth) sprite._maxHealth = sprite.health;
            // Format monster name (capitalize)
            const monsterName = sprite.type.toUpperCase();

            if (sprite.shieldHealth !== undefined) {
                drawHealthBar(barX, barY, barWidth, barHeight, sprite.health, maxHealth, monsterName, sprite.shieldHealth, sprite.maxShieldHealth);
            } else {
                drawHealthBar(barX, barY, barWidth, barHeight, sprite.health, maxHealth, monsterName);
            }            
        }
    }
}

// Draw bullet sprites

function drawBulletSprite(xProjection, spriteWidth, spriteHeight, bullet) {
    // Use bullet sprite texture
    const texture = bullet.texture;
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

// Draw Sprite

function drawSprite(xProjection, spriteWidth, spriteHeight, sprite) {
    // Center the sprite by offsetting by half width
    xProjection = xProjection - spriteWidth / 2;

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

// Draw active notifications with fade effect

function drawNotifications() {
    const currentTime = Date.now();

    // Remove expired notifications
    let writeIdx = 0;
    for (let i = 0; i < game.notifications.length; i++) {
        if (currentTime - game.notifications[i].startTime < game.notifications[i].duration) {
            game.notifications[writeIdx] = game.notifications[i];
            writeIdx++;
        }
    }
    game.notifications.length = writeIdx;

    // Save the current transform
    screenContext.save();

    // Reset the scale to draw at actual pixel coordinates
    screenContext.setTransform(1, 0, 0, 1, 0, 0);

    // Draw each active notification
    game.notifications.forEach((notif, index) => {
        const elapsed = currentTime - notif.startTime;
        const progress = elapsed / notif.duration;

        // Calculate alpha for fade effect
        let alpha = 1;
        if (progress > 0.85) {
            alpha = 1 - ((progress - 0.85) / 0.15);
        }

        // Flash effect
        const flashCycle = (elapsed % 500) / 500;
        const flashAlpha = flashCycle > 0.5 ? 1 : 0.6;

        const finalAlpha = alpha * flashAlpha;

        // Set font to measure text width
        screenContext.font = 'bold 20px "Lucida Console"';
        const textWidth = screenContext.measureText(notif.text).width;
        const padding = 20; // Padding on each side
        const boxWidth = textWidth + (padding * 2);
        const boxHeight = 40;

        // Center the box
        const notifX = game.screen.width / 2 - boxWidth / 2;
        const notifY = 50 + (index * 60); // Increased spacing for variable-width boxes

        // Draw semi-transparent background
        screenContext.fillStyle = `rgba(0, 0, 0, ${0.7 * finalAlpha})`;
        screenContext.fillRect(notifX, notifY, boxWidth, boxHeight);

        // Draw notification text
        screenContext.fillStyle = `rgba(255, 215, 0, ${finalAlpha})`;
        screenContext.textAlign = 'center';
        screenContext.textBaseline = 'middle';
        screenContext.fillText(notif.text, game.screen.width / 2, notifY + boxHeight / 2);
    });

    // Restore the transform
    screenContext.restore();
}

// Draw Gun

function drawGun(ctx) {
    const timeSinceShooting = Date.now() - game.lastShot;
    const recoilDuration = 100; // milliseconds
    const recoilDistance = 15; // pixels
    
    let yOffset = 0;
    if (timeSinceShooting < recoilDuration) {
        // Ease out: start at max recoil, return to normal
        const recoilProgress = timeSinceShooting / recoilDuration;
        const easeOut = 1 - Math.pow(1 - recoilProgress, 3); // cubic ease-out
        yOffset = -recoilDistance * (1 - easeOut);
    }
    
    ctx.drawImage(game.weaponSprite,
        game.projection.width / 2 - 80,
        game.projection.height - 155 + yOffset,
        160, 160
    );
}

// Draw HUD

function drawHUD(ctx) {
    // Draw semi-transparent black background for HUD
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, 80, 27);

    // Configure text style
    ctx.font = '5px "Lucida Console"';
    ctx.fillStyle = '#FFFFFF';

    ctx.fillText(`Health: ${game.player.health}`, 0, 5);

    // Draw weapon name
    const weaponName = (() => {
        switch(game.equippedWeapon) {
            case 1: return 'Knife';
            case 2: return 'Pistol';
            case 3: return 'Machine Gun';
            case 4: return 'Yeti Pistol';
            case 5: return 'Rocket Launcher';
            case 6: return 'Scepter';
            case 7: return 'Boomerang';
            case 8: return 'Laser Shotgun';
            case 9: return 'Trident';
            default: return 'Unknown';
        }
    })();
    ctx.fillText(`Weapon: ${weaponName}`, 0, 10);

    // Draw ammo count
    const ammoText = (() => {
        if (game.equippedWeapon == 1 || game.equippedWeapon == 6) {
            return '∞'; 
        } else if (game.equippedWeapon == 4 || game.equippedWeapon == 8) {
            return `${game.laserbattery}`; // Special ammo type for laser weapons
        } else if (game.equippedWeapon == 5) {
            return `${game.rocketammo}`; // Special ammo type for rocket launcher
        } else if (game.equippedWeapon == 7) {
            return `${game.boomerangammo}`; // Special ammo type for boomerang
        } else if (game.equippedWeapon == 9) {
            if (game.tridentammo) {
                return '1'; // Trident unused
            } else {
                return '0'; // Trident used
            }      
        } else {
            return `${game.ammo}`; // Regular ammo for guns
        }
    })();
    if (game.equippedWeapon == 4 || game.equippedWeapon == 8) {
        ctx.fillText(`Battery: ${ammoText}%`, 0, 15);
    } else {
        ctx.fillText(`Ammo: ${ammoText}`, 0, 15);
    }
    const unlocks = (() => {
        let unlockText = '';
        if (game.weaponsUnlocked.knife) {
            unlockText += '1 ';
        }
        if (game.weaponsUnlocked.pistol) {
            unlockText += '2 ';
        }
        if (game.weaponsUnlocked.machinegun) {
            unlockText += '3 ';
        }
        if (game.weaponsUnlocked.yetipistol) {
            unlockText += '4 ';
        }
        if (game.weaponsUnlocked.rocketlauncher) {
            unlockText += '5 ';
        }
        if (game.weaponsUnlocked.scepter) {
            unlockText += '6 ';
        }
        if (game.weaponsUnlocked.boomerang) {
            unlockText += '7 ';
        }
        if (game.weaponsUnlocked.lasershotgun) {
            unlockText += '8 ';
        }
        if (game.weaponsUnlocked.trident) {
            unlockText += '9 ';
        }
        return unlockText;
    })();
    ctx.fillText(`Unlocked: ${unlocks}`, 0, 20);
    const keys = (() => {
        let keyText = '';
        if (game.keysUnlocked.cowkey) {
            keyText += 'Cow ';
        }
        if (game.keysUnlocked.monkeykey) {
            keyText += 'Monkey ';
        }
        if (game.keysUnlocked.goatkey) {
            keyText += 'Goat ';
        }
        if (game.keysUnlocked.cellkey) {
            keyText += 'Cell ';
        }
        return keyText;
    })();
    ctx.fillText(`Keys: ${keys}`, 0, 25);
}

// Draw Health Bar

function drawHealthBar(x, y, width, height, health, maxHealth, monsterName = '', shieldHealth = 0, maxShieldHealth = 0) {
    if (monsterName == 'SEAHORSEBABY') { return; }
    // Draw red background (depleted health)
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            drawPixel(x + i, y + j, new Color(180, 0, 0, 255));
        }
    }
    // Draw green foreground (remaining health)
    const greenWidth = Math.floor(width * Math.max(0, health) / maxHealth);
    for (let i = 0; i < greenWidth; i++) {
        for (let j = 0; j < height; j++) {
            drawPixel(x + i, y + j, new Color(0, 200, 0, 255));
        }
    }
    // Draw blue foreground (remaining shield)
    if (maxShieldHealth > 0) {       
        const blueWidth = Math.floor(width * Math.max(0, shieldHealth) / maxShieldHealth);
        for (let i = 0; i < blueWidth; i++) {
            for (let j = 0; j < height; j++) {
                drawPixel(x + i, y + j, new Color(0, 0, 200, 255));
            }
        }
    }
    // Black border
    for (let i = 0; i < width; i++) {
        drawPixel(x + i, y, new Color(0, 0, 0, 255));
        drawPixel(x + i, y + height - 1, new Color(0, 0, 0, 255));
    }
    for (let j = 0; j < height; j++) {
        drawPixel(x, y + j, new Color(0, 0, 0, 255));
        drawPixel(x + width - 1, y + j, new Color(0, 0, 0, 255));
    }

    // Draw monster name below health bar if provided
    if (monsterName) {
        if (monsterName == 'STASISCHAMBER') { monsterName = 'STASIS' }
        if (monsterName == 'DINOSAUREGG') { monsterName = 'EGG' }  
        if (monsterName == 'EXPLOSIVEBARREL') { monsterName = 'TNT' }  
        const namePixels = monsterName.length * 4; // Approximate width (4 pixels per character)
        const nameX = Math.max(0, x + Math.floor((width - namePixels) / 2));
        const nameY = y - height;
        drawMonsterName(nameX, nameY, monsterName);
    }
}

// Draw Monster Name

function drawMonsterName(x, y, name) {
    // Simple 1-pixel text rendering (drawing white pixels to form letters)
    // Map of letter patterns (each letter is 4x5 pixels)
    const letterMap = {
        'A': [0b0110, 0b1001, 0b1111, 0b1001, 0b1001],
        'B': [0b1110, 0b1001, 0b1110, 0b1001, 0b1110],
        'C': [0b0111, 0b1000, 0b1000, 0b1000, 0b0111],
        'D': [0b1110, 0b1001, 0b1001, 0b1001, 0b1110],
        'E': [0b1111, 0b1000, 0b1110, 0b1000, 0b1111],
        'F': [0b1111, 0b1000, 0b1110, 0b1000, 0b1000],
        'G': [0b0111, 0b1000, 0b1011, 0b1001, 0b0111],
        'H': [0b1001, 0b1001, 0b1111, 0b1001, 0b1001],
        'I': [0b0111, 0b0010, 0b0010, 0b0010, 0b0111],
        'J': [0b1111, 0b0001, 0b0001, 0b1001, 0b0110],
        'K': [0b1001, 0b1010, 0b1100, 0b1010, 0b1001],
        'L': [0b1000, 0b1000, 0b1000, 0b1000, 0b1111],
        'M': [0b1001, 0b1111, 0b1111, 0b1001, 0b1001],
        'N': [0b1001, 0b1101, 0b1011, 0b1001, 0b1001],
        'O': [0b0110, 0b1001, 0b1001, 0b1001, 0b0110],
        'P': [0b1110, 0b1001, 0b1110, 0b1000, 0b1000],
        'Q': [0b0110, 0b1001, 0b1001, 0b0110, 0b0011],
        'R': [0b1110, 0b1001, 0b1110, 0b1010, 0b1001],
        'S': [0b0111, 0b1000, 0b0110, 0b0001, 0b1110],
        'T': [0b1111, 0b0010, 0b0010, 0b0010, 0b0010],
        'U': [0b1001, 0b1001, 0b1001, 0b1001, 0b0110],
        'V': [0b1001, 0b1001, 0b1001, 0b0110, 0b0010],
        'W': [0b1001, 0b1001, 0b1111, 0b1111, 0b1001],
        'X': [0b1001, 0b1001, 0b0110, 0b1001, 0b1001],
        'Y': [0b1001, 0b0110, 0b0010, 0b0010, 0b0010],
        'Z': [0b1111, 0b0001, 0b0110, 0b1000, 0b1111],
        ' ': [0b0000, 0b0000, 0b0000, 0b0000, 0b0000]
    };

    let currentX = x;
    const white = new Color(255, 255, 255, 255);

    for (let char of name) {
        const pattern = letterMap[char] || letterMap[' '];

        for (let row = 0; row < 5; row++) {
            const bits = pattern[row];
            for (let col = 0; col < 4; col++) {
                if ((bits >> (3 - col)) & 1) {
                    drawPixel(currentX + col, y + row, white);
                }
            }
        }
        currentX += 5; // Move to next character position (4 pixels + 1 space)
    }
}

// Draw energy shield around monsters

function drawEnergyShield(centerX, centerY, radius, shieldHealth, maxShieldHealth) {
    const time = performance.now() * 0.005;

    const healthRatio = shieldHealth / maxShieldHealth;
    const alpha = 0.5 + 0.5 * healthRatio;

    // Pulse (weaker shield = more unstable)
    const pulse = 1 + Math.sin(time * 3) * (0.05 + (1 - healthRatio) * 0.1);
    radius *= pulse;

    // Layered colors
    const innerColor = new Color(200, 225, 235, 255 * alpha);
    const midColor = new Color(40, 150, 200, 255 * alpha);
    const outerColor = new Color(25, 70, 160, 255 * alpha);

    // Outer glow (soft halo)
    for (let i = 0; i < 3; i++) {
        drawCircle(centerX, centerY, radius + i * 2, outerColor);
    }

    // Main shield layers
    drawCircle(centerX, centerY, radius * 0.98, midColor);
    drawCircle(centerX, centerY, radius * 0.92, innerColor);
}

// Draw circle with dynamic arc segments and wobble for energy shield effect

function drawCircle(centerX, centerY, radius, color) {
    const time = performance.now() * 0.005;

    for (let angle = 0; angle < 360; angle += 3) {

        // --- rotating arc segments (skip some angles) ---
        const segment = (angle + time * 20) % 60;
        if (segment > 45) continue;

        const rad = degreeToRadians(angle);

        // --- wobble / energy distortion ---
        const wobble = Math.sin(angle * 8 + time * 2) * 2;
        const r = radius + wobble;

        const x = centerX + Math.cos(rad) * r;
        const y = centerY + Math.sin(rad) * r;

        // --- thickness (draw small cluster instead of 1 pixel) ---
        drawPixel(x, y, color);
        drawPixel(x + 1, y, color);
        drawPixel(x, y + 1, color);
    }
}

// ====================================================================
// MENU SCREENS
// ====================================================================

// Win Screen

function createWinScreen() {
    let overlay = document.createElement('div');
    overlay.id = 'win-screen-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.innerHTML = `
        <h1 style="color: #fff; font-family: 'Lucida Console', monospace; font-size: 2.5em; margin-bottom: 1em;">You Win!</h1>
        <p style="color: #aaa; font-family: 'Lucida Console', monospace; font-size: 1.2em;">${game.monsterDefeated} / ${game.monsterTotal} monsters defeated!</p>
        <p style="color: #aaa; font-family: 'Lucida Console', monospace; font-size: 1.2em;">${game.pickupCollected} / ${game.pickupTotal} Pickups Collected.</p>
    `;
    document.body.appendChild(overlay);
}

// Death Screen

function createDeathScreen() {
    let overlay = document.createElement('div');
    overlay.id = 'death-screen-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.innerHTML = `
        <h1 style="color: #fff; font-family: 'Lucida Console', monospace; font-size: 2.5em; margin-bottom: 1em;">You Died!</h1>
        <p style="color: #ff6666; font-family: 'Lucida Console', monospace; font-size: 1.4em; margin-bottom: 1.5em;">Killed by: ${game.lastMonsterToHitPlayer}</p>
        <p style="color: #aaa; font-family: 'Lucida Console', monospace; font-size: 1.2em;">${game.monsterDefeated} / ${game.monsterTotal} monsters defeated!</p>
        <p style="color: #aaa; font-family: 'Lucida Console', monospace; font-size: 1.2em;">${game.pickupCollected} / ${game.pickupTotal} Pickups Collected.</p>
    `;
    document.body.appendChild(overlay);
}

// Start Screen

function createStartScreen() {
    let overlay = document.createElement('div');
    overlay.id = 'start-screen-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
        <h1 style="color: #fff; font-family: 'Lucida Console', monospace; font-size: 2.5em; margin-bottom: 1em;">Fate</h1>
        <table id="level-buttons" style="border-spacing: 1em;"></table>
        <p style="color: #aaa; margin-top: 2em; font-family: 'Lucida Console', monospace;">Use arrow keys to move, A & D to strafe, Number keys to swap weapons, Space to shoot.</p>
    `;
    document.body.appendChild(overlay);
    // Add level buttons in a 3-column table
    const btnContainer = overlay.querySelector('#level-buttons');
    let currentRow;
    game.levels.forEach((level, idx) => {
        if (idx % 3 === 0) {
            currentRow = document.createElement('tr');
            btnContainer.appendChild(currentRow);
        }
        let td = document.createElement('td');
        let btn = document.createElement('button');
        if (game.levels[idx].name == 'Secret Cow Level' || game.levels[idx].name == 'Dark Continent' || game.levels[idx].name == 'Armageddon') {
            if (game.levels[idx].unlocked) {
                btn.textContent = level.name;
                btn.style.backgroundColor = '#A96A6A';
            } else {
                btn.textContent = 'Secret';
                btn.style.backgroundColor = '#3B0F0F';
            }
        } else if (game.levels[idx].unlocked == false) {
            btn.textContent = 'Locked';
            btn.style.backgroundColor = '#3b3b3b';
        } else {
            btn.textContent = level.name; 
            btn.style.backgroundColor = '#a9a9a9';
        }
        
        btn.style.width = '200px';
        btn.style.height = '60px';
        btn.style.fontSize = '1.2em';
        if (game.levels[idx].unlocked == false) {
            btn.disabled = true;
        }
        btn.style.fontFamily = "'Lucida Console', monospace";
        btn.style.cursor = 'pointer';
        btn.style.border = '2px solid #666';
        btn.style.color = '#fff';
        btn.onclick = () => {
            startLevel(idx);
        };
        td.appendChild(btn);
        currentRow.appendChild(td);
    });
}

// End Credits Screen

function createEndCreditsScreen() {
    let overlay = document.createElement('div');
    overlay.id = 'endcredits-screen-overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.innerHTML = `
        <h1 style="color: #fff; font-family: 'Lucida Console', monospace; font-size: 2.5em; margin-bottom: 1.5em;">You Beat The Game!</h1>
        <div style="margin-bottom: 2em;">
            <p style="color: #fff; font-family: 'Lucida Console', monospace; font-size: 1.2em; margin-bottom: 1em; text-align: center;">Cheat Menu:</p>
            <table id="cheat-buttons" style="border-spacing: 1em; margin: 0 auto;"></table>
        </div>
    `;
    document.body.appendChild(overlay);

    // Add cheat buttons in a 3x2 table
    const btnContainer = overlay.querySelector('#cheat-buttons');
    const cheatData = [
        { id: 'infiniteAmmo', label: 'Infinite Ammo' },
        { id: 'godMode', label: 'God Mode' },
        { id: 'allWeapons', label: 'All Weapons' },
        { id: 'unlockAllLevels', label: 'Level Unlock' },
        { id: 'megaSpawns', label: '3x Spawns' },
        { id: 'speedBoost', label: '2x Speed' },
        { id: 'randomStart', label: 'Random Start' },
        { id: 'rapidFire', label: 'Rapid Fire' },
        { id: 'randomizeEnemies', label: 'Random Enemies' }
    ];

    let currentRow = null;
    cheatData.forEach((cheat, idx) => {
        if (idx % 3 === 0) {
            currentRow = document.createElement('tr');
            btnContainer.appendChild(currentRow);
        }

        let td = document.createElement('td');
        let btn = document.createElement('button');
        btn.textContent = `${cheat.label}: ${game.cheats[cheat.id] ? 'ON' : 'OFF'}`;
        btn.id = `cheat-${cheat.id}`;
        btn.style.width = '180px';
        btn.style.height = '50px';
        btn.style.fontSize = '1em';
        btn.style.fontFamily = "'Lucida Console', monospace";
        btn.style.cursor = 'pointer';
        btn.style.border = '2px solid #666';
        btn.style.color = '#fff';
        btn.style.backgroundColor = game.cheats[cheat.id] ? '#2d5016' : '#663333';
        btn.style.transition = 'background-color 0.2s';

        btn.onclick = () => {
            game.cheats[cheat.id] = !game.cheats[cheat.id];
            btn.textContent = `${cheat.label}: ${game.cheats[cheat.id] ? 'ON' : 'OFF'}`;
            btn.style.backgroundColor = game.cheats[cheat.id] ? '#2d5016' : '#663333';
        };

        td.appendChild(btn);
        currentRow.appendChild(td);
    });

    // Return button
    let returnDiv = document.createElement('div');
    returnDiv.style.marginTop = '2em';
    let returnBtn = document.createElement('button');
    returnBtn.textContent = 'Restart Game';
    returnBtn.style.width = '200px';
    returnBtn.style.height = '50px';
    returnBtn.style.fontSize = '1.2em';
    returnBtn.style.fontFamily = "'Lucida Console', monospace";
    returnBtn.style.cursor = 'pointer';
    returnBtn.style.border = '2px solid #666';
    returnBtn.style.color = '#fff';
    returnBtn.style.backgroundColor = '#3b3b3b';
    returnBtn.style.transition = 'background-color 0.2s';

    returnBtn.onmouseover = () => {
        returnBtn.style.backgroundColor = '#555';
    };
    returnBtn.onmouseout = () => {
        returnBtn.style.backgroundColor = '#3b3b3b';
    };

    returnBtn.onclick = () => {
        resetGameState();
        applyCheats();
        removeScreen('endcredits-screen-overlay');
        createStartScreen();
    };

    returnDiv.appendChild(returnBtn);
    overlay.appendChild(returnDiv);
}

// Pause Game (when window loses focus)

function pauseGame(event) {
    clearInterval(mainLoop);
    mainLoop = null;
    screenContext.fillStyle = 'rgba(0,0,0,0.5)';
    screenContext.fillRect(0, 0, game.projection.width, game.projection.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '20px Lucida Console';
    screenContext.textAlign = 'center';
    screenContext.textBaseline = 'middle';
    screenContext.fillText('GAME PAUSED', game.projection.halfWidth, game.projection.halfHeight);
}

// End game screens for win and loss, then return to start screen

function endGame() {
    if (mainLoop) {
        clearInterval(mainLoop);
        mainLoop = null;
    }
    window.removeEventListener('blur', pauseGame);
    createWinScreen();
    if (game.currentLevel != game.levels.length - 4 && game.currentLevel != game.levels.length - 3 && game.currentLevel != game.levels.length - 2 && game.currentLevel != game.levels.length - 1) {
        game.levels[game.currentLevel + 1].unlocked = true;
    }
    game.levels[game.currentLevel].completed = true;
    let levelsCompleted = 0;   
    for (let i = 0; i < game.levels.length; i++) {
        if (game.levels[i].completed) {
            levelsCompleted++;
        } else {
            break;
        }
    }
    if (game.levels.length == levelsCompleted) {
        setTimeout(() => {
            removeScreen('win-screen-overlay');
            createEndCreditsScreen();
        }, 5000);
    } else {
        setTimeout(() => {
            removeScreen('win-screen-overlay');
            createStartScreen();
        }, 5000);
    }
}

function endGameDeath() {
    if (mainLoop) {
        clearInterval(mainLoop);
        mainLoop = null;
    }
    window.removeEventListener('blur', pauseGame);
    createDeathScreen();
    setTimeout(() => {
        removeScreen('death-screen-overlay');
        createStartScreen();
    }, 5000);
}

// Render Buffer

function renderBuffer() {
    screenContext.putImageData(game.projection.imageData, 0, 0);
    screenContext.drawImage(screen, 0, 0);
}

// Clear Screen

function clearScreen() {
    screenContext.clearRect(0, 0, game.projection.width, game.projection.height);
}

// Remove Screen

function removeScreen(screenoverlay) {
    const overlay = document.getElementById(screenoverlay);
    if (overlay) overlay.remove();
}