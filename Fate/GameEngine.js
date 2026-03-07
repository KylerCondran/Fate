// Unified game state and data object
let game = {
    currentLevel: 0,
    monsters: [], // Each monster will have position, health, sprite, etc.
    sprites: [], // Only trees and other non-monster sprites
    checkpoints: [], // Checkpoints for pre scripted NPC pathing
    projectiles: [], // Bullets, rockets, etc.
    weaponSprite: document.getElementById('knife-sprite'),
    equippedWeapon: 1,
    ammo: 0,
    rocketammo: 0,
    boomerangammo: 0,
    tridentammo: true,
    lastShot: 0,
    shootCooldown: 600,
    bulletHitboxRadius: 0.25,
    bulletRange: 400,
    knifeRange: 1,
    bulletStartDistance: 0.5,
    monsterMoveSpeed: 0.02,
    activationDistance: 1.0,
    monsterTotal: 0,
    monsterDefeated: 0,
    pickupTotal: 0,
    pickupCollected: 0,
    checkpointTotal: 0,
    lastMonsterToHitPlayer: 'Unknown',
    playerFrozen: false,
    playerFrozenTime: 0,
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
    keysUnlocked: {
        cowkey: false,
        monkeykey: false
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
        speedBoost: false
    },
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
        },
        {
            width: 16,
            height: 16,
            id: "ice",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "grass-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "lava-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "woods-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "cloud",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "sand-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "tech-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "water-texture",
            data: null
        },
        {
            width: 16,
            height: 16,
            id: "fence-texture",
            data: null
        }
    ],
    projectileTextures: [
        {
            id: 'bullet-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'laser-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'rocket-sprite',
            width: 16,
            height: 23,
            data: null
        },
        {
            id: 'inboundrocket-sprite',
            width: 16,
            height: 23,
            data: null
        },
        {
            id: 'orb-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'boomerang-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'shuriken-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'waterorb-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'eyeballprojectile-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'fireball-sprite',
            width: 27,
            height: 27,
            data: null
        },
        {
            id: 'web-sprite',
            width: 27,
            height: 27,
            data: null
        }
    ],
    backgrounds: [
        {
            width: 360,
            height: 60,
            id: "sunny",
            data: null
        },
        {
            width: 360,
            height: 60,
            id: "night",
            data: null
        },
        {
            width: 360,
            height: 60,
            id: "snowy",
            data: null
        },
        {
            width: 360,
            height: 60,
            id: "space",
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
    web: game.projectileTextures[10]
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
    // Reset game state
    // Reset player position (center of map)
    game.player.x = game.levels[levelIdx].startlocation.x;
    game.player.y = game.levels[levelIdx].startlocation.y;
    //game.player.x = 2;
    //game.player.y = 2;
    game.player.angle = 0;
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
    if (game.cheats.godMode) {
        game.player.health = 9999;
    } else {
        game.player.health = 100;
    }
    // Reset trident ammo per level
    if (game.weaponsUnlocked.trident) {
        game.tridentammo = true;
    }
    let map = game.levels[levelIdx].map;
    let mapy = map.length;
    let mapx = map[0].length;
    game.monsterMoveSpeed = game.levels[levelIdx].monstermovespeed;
    if (game.cheats.speedBoost) {
        game.player.speed.movement = 0.16;
    } else {
        game.player.speed.movement = 0.08;
    }
    for (let i = 0; i < mapy; i++) {
        for (let j = 0; j < mapx; j++) {
            switch (map[i][j]) {
                case 1:
                    switch (game.levels[levelIdx].name) {
                        case "Hell":
                        case "Dark Continent":
                            game.sprites.push({ id: "cauldron-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Arctic":
                            game.sprites.push({ id: "snowytree-sprite", x: j, y: i, width: 552, height: 552, data: null });
                            break;
                        case "Heaven":
                            game.sprites.push({ id: "pillar-sprite", x: j, y: i, width: 320, height: 640, data: null });
                            break;
                        case "Ocean":
                            game.sprites.push({ id: "kelp-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Army Base":
                            game.sprites.push({ id: "militarytent-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Ninja Dojo":
                            game.sprites.push({ id: "cherryblossom-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        case "Secret Cow Level":
                            game.sprites.push({ id: "haybale-sprite", x: j, y: i, width: 512, height: 512, data: null });
                            break;
                        default:
                            game.sprites.push({ id: "tree-sprite", x: j, y: i, width: 8, height: 16, data: null });
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
                    game.sprites.push({ id: "ammo-sprite", x: j, y: i, width: 100, height: 81, data: null });
                    game.pickupTotal++;
                    break;
                case 9:
                    game.sprites.push({ id: "pistolpickup-sprite", x: j, y: i, width: 34, height: 19, data: null });
                    game.pickupTotal++;
                    break;
                case 10:
                    game.sprites.push({ id: "machinegunpickup-sprite", x: j, y: i, width: 49, height: 30, data: null });
                    game.pickupTotal++;
                    break;
                case 11:
                    game.sprites.push({ id: "yetipistolpickup-sprite", x: j, y: i, width: 50, height: 33, data: null });
                    game.pickupTotal++;
                    break;
                case 12:
                    game.sprites.push({ id: "rocketlauncherpickup-sprite", x: j, y: i, width: 80, height: 17, data: null });
                    game.pickupTotal++;
                    break;
                case 13:
                    game.sprites.push({ id: "rocketammo-sprite", x: j, y: i, width: 35, height: 18, data: null });
                    game.pickupTotal++;
                    break;
                case 14:
                    game.sprites.push({ id: "scepterpickup-sprite", x: j, y: i, width: 64, height: 64, data: null });
                    game.pickupTotal++;
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
                    game.sprites.push({ id: "portal-sprite", x: j, y: i, width: 1024, height: 1024, data: null });
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
                    game.sprites.push({ id: "boomerang-sprite", x: j, y: i, width: 27, height: 27, data: null });
                    game.pickupTotal++;
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
                    game.sprites.push({ id: "lockedchest-sprite", x: j, y: i, width: 512, height: 512, data: null });
                    game.pickupTotal++;
                    break;
                case 39:
                    //cow key
                    game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                    game.pickupTotal++;
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
                    game.sprites.push({ id: 'acid-sprite', x: j, y: i, width: 256, height: 256, data: null });
                    break;
                case 43:
                    game.sprites.push({ id: "lasershotgunpickup-sprite", x: j, y: i, width: 80, height: 29, data: null });
                    game.pickupTotal++;
                    break;
                case 44:
                    game.sprites.push({ id: 'burningdebris-sprite', x: j, y: i, width: 512, height: 512, data: null });
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
                    game.sprites.push({ id: "lockedchest-sprite", x: j, y: i, width: 512, height: 512, data: null });
                    game.pickupTotal++;
                    break;
                case 49:
                    //monkey key
                    game.sprites.push({ id: "key-sprite", x: j, y: i, width: 64, height: 64, data: null });
                    game.pickupTotal++;
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
                    game.sprites.push({ id: "tridentpickup-sprite", x: j, y: i, width: 30, height: 80, data: null });
                    game.pickupTotal++;
                    break;
                default:
                    break;
            }
        }
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
    if (game.cheats.infiniteAmmo) {
        game.ammo = 9999;
        game.rocketammo = 9999;
        game.boomerangammo = 9999;
    }
    if (game.cheats.allWeapons) {
        game.weaponsUnlocked.pistol = true;
        game.weaponsUnlocked.machinegun = true;
        game.weaponsUnlocked.yetipistol = true;
        game.weaponsUnlocked.rocketlauncher = true;
        game.weaponsUnlocked.scepter = true;
        game.weaponsUnlocked.boomerang = true;
        game.weaponsUnlocked.lasershotgun = true;
        game.weaponsUnlocked.trident = true;
    }
    if (game.cheats.unlockAllLevels) {
        for (let i = 0; i < game.levels.length; i++) {
            game.levels[i].unlocked = true;
        }
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
        } while (wall !== 2);

        // Distance calculation with fish-eye fix
        const dx = rayX - playerX;
        const dy = rayY - playerY;
        const distance = Math.sqrt(dx * dx + dy * dy) *
            Math.cos(degreeToRadians(rayAngle - game.player.angle));

        // Wall height calculation
        const wallHeight = Math.floor(projectionHalfHeight / distance);

        // Draw calls
        drawBackground(rayCount, 0, projectionHalfHeight - wallHeight,
            game.backgrounds[game.levels[game.currentLevel].background]);
        drawTexture(rayCount, wallHeight,
            Math.floor((texture.width * (rayX + rayY)) % texture.width),
            game.textures[game.levels[game.currentLevel].wall]);
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

        // Stop if we hit a wall (2)
        if (map[mapY] && map[mapY][mapX] === 2) {
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
        } else if ((game.equippedWeapon == 7 && game.boomerangammo <= 0) || (game.equippedWeapon == 9 && !game.tridentammo)) {
            //boomerang fail throw / trident fail sound
            playSound('invalid-sound');
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
                texture = game.projectileMap['laser'];
                playSound('laserblast-sound');
                game.projectiles.push(new Projectile(startX, startY, game.player.angle, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle + 2, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle + 4, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle - 2, 'laser', texture, 'player', 0.2, 50));
                game.projectiles.push(new Projectile(startX, startY, game.player.angle - 4, 'laser', texture, 'player', 0.2, 50));
                break;
            case 9:
                playSound('portal-sound');
                if (!game.cheats.infiniteAmmo) game.tridentammo = false;
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

// Build spatial grid of monsters for collision detection

function updateMonsterGrid() {
    game.monsterGrid = {};
    for (let monster of game.monsters) {
        if (!monster.isDead && monster.type != 'moby' && monster.type != 'seahorse' && monster.type != 'seahorsebaby') {
            const gridKey = `${Math.floor(monster.x)}_${Math.floor(monster.y)}`;
            if (!game.monsterGrid[gridKey]) {
                game.monsterGrid[gridKey] = [];
            }
            game.monsterGrid[gridKey].push(monster);
        }
    }
}

// Check if a position is occupied by another monster

function isMonsterAtPosition(x, y, excludeMonster = null) {
    const gridKey = `${Math.floor(x)}_${Math.floor(y)}`;
    const nearby = game.monsterGrid[gridKey] || [];
    
    const checkRadius = 0.5;
    for (let monster of nearby) {
        if (monster === excludeMonster) continue;
        const distSq = (monster.x - x) ** 2 + (monster.y - y) ** 2;
        if (distSq < checkRadius * checkRadius) {
            return true;
        }
    }
    return false;
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
            if (projectile.type === 'rocket') playSound('explosion-sound');
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
                        } else if (projectile.type == 'laser') {
                            monster.health -= projectile.damage;
                        } else if (projectile.type == 'rocket') {
                            playSound('explosion-sound');
                            monster.health -= projectile.damage;
                        } else if (projectile.type == 'orb') {
                            if (monster.type == 'imp' || monster.type == 'demon' || monster.type == 'skeleton') {
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
                        if (monster.health <= 0) {
                            monster.isDead = true;
                            if (monster.type != 'moby' && monster.type != 'seahorse' && monster.type != 'seahorsebaby') {
                                game.monsterDefeated++;
                            }
                            playSound(`${monster.audio}-death`);
                            switch (monster.type) {
                                case 'crusader':
                                case 'king':
                                    game.sprites.push({ id: 'tombstone-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: null });
                                    break;
                                case 'alien':
                                    game.sprites.push({ id: 'acid-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: null });
                                    game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 42;
                                    break;
                                case 'zeus':
                                    game.sprites.push({ id: "tridentpickup-sprite", x: Math.floor(monster.x), y: Math.floor(monster.y), width: 30, height: 80, data: null });
                                    game.pickupTotal++;
                                    game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 58;
                                    break;
                                case 'stasischamber':
                                    game.sprites.push({ id: 'brokenstasischamber-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: null });
                                    playSound('glass-sound');
                                    break;
                                case 'tank':
                                case 'apache':
                                case 'robot':
                                case 'fighterjet':
                                    game.sprites.push({ id: 'burningdebris-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: null });
                                    game.levels[game.currentLevel].map[Math.floor(monster.y)][Math.floor(monster.x)] = 44;
                                    break;
                                case 'ufo':
                                    game.sprites.push({ id: 'burningdebris-sprite', x: monster.x, y: monster.y, width: 512, height: 512, data: null });
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
                                default:
                                    game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: null });
                                    break;
                            }
                            for (let i = 0; i < game.sprites.length; i++) {
                                if (!game.sprites[i].data) {
                                    game.sprites[i].data = getTextureData(game.sprites[i]);
                                }
                            }
                        } else {
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
                    game.player.health -= projectile.damage; // rocket damage
                    playSound('explosion-sound');
                } else if (projectile.type == 'boomerang') {
                    game.boomerangammo += 1; // Boomerang pickup
                    playSound('pickup-sound');
                    if (game.boomerangammo >= 1) {
                        game.weaponSprite = document.getElementById('boomerangwep-sprite');
                        game.weaponsUnlocked.boomerang = true;
                    }
                } else {
                    game.player.health -= projectile.damage; // All other projectile damage
                }
                if (projectile.type === 'web') {
                    game.playerFrozen = true;
                    game.playerFrozenTime = Date.now();
                }
                if (!(projectile.type === 'boomerang')) {
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

    // Update monster positions and check for attacks
    for (let monster of game.monsters) {
        if (!monster.isDead) {
            const dx = game.player.x - monster.x;
            const dy = game.player.y - monster.y;
            const distSq = dx * dx + dy * dy;
            const currentTime = Date.now();
            var spawnModifier = 1;
            if (game.cheats.megaSpawns) spawnModifier = 3;

            switch (monster.type) {
                case 'spider':
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'web', game.projectileMap['web'], 'monster', 0.2, monster.damage));
                            playSound('web-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.projectileMap['laser'], 'monster', 0.2, monster.damage));
                            playSound('laser-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.projectileMap['laser'], 'monster', 0.2, 5));
                            playSound('laser-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 100) {
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
                            moveX = dirX * game.monsterMoveSpeed;
                            moveY = dirY * game.monsterMoveSpeed;
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
                        } else if (distSq > 20) {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;
                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }
                            moveX = perpX * monster.strafeDir * game.monsterMoveSpeed;
                            moveY = perpY * monster.strafeDir * game.monsterMoveSpeed;
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
                case 'soldier':
                    if (distSq < 64) {
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
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                        if (distSq > 0.25 && distSq < 100) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * game.monsterMoveSpeed;
                            const dirY = dy * invDist * game.monsterMoveSpeed;
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
                        if (distSq < 64) {
                            if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                                const angle = radiansToDegrees(Math.atan2(dy, dx));
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'shuriken', game.projectileMap['shuriken'], 'monster', 0.2, 5));
                                playSound('shuriken-sound');
                                monster.lastShot = currentTime;
                            }
                        }
                        if (distSq > 30 && distSq < 100) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * game.monsterMoveSpeed;
                            const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    break;
                case 'zeus':
                    if (distSq < 64) {
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
                    if (distSq > 20 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        for (i = 0; i < (3 * spawnModifier); i++) {
                            game.monsterTotal++;
                            const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                            const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                            const piranha = { ...window.MonsterData.piranha, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                            const monsterTexture = {
                                id: piranha.skin,
                                width: piranha.width,
                                height: piranha.height
                            };
                            piranha.data = getTextureData(monsterTexture);
                            game.monsters.push(piranha);
                            angle += 30;
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 600 && !monster.spawnSquid) {
                        monster.spawnSquid = true;
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        for (i = 0; i < (2 * spawnModifier); i++) {
                            game.monsterTotal++;
                            const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                            const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                            const squid = { ...window.MonsterData.squid, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                            const monsterTexture = {
                                id: squid.skin,
                                width: squid.width,
                                height: squid.height
                            };
                            squid.data = getTextureData(monsterTexture);
                            game.monsters.push(squid);
                            angle += 30;
                        }
                        playSound('portal-sound');
                    }
                    if (monster.health < 400 && !monster.spawnShark) {
                        monster.spawnShark = true;
                        var angle = radiansToDegrees(Math.atan2(dy, dx));
                        for (i = 0; i < (1 * spawnModifier); i++) {
                            game.monsterTotal++;
                            const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                            const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                            const shark = { ...window.MonsterData.shark, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                            const monsterTexture = {
                                id: shark.skin,
                                width: shark.width,
                                height: shark.height
                            };
                            shark.data = getTextureData(monsterTexture);
                            game.monsters.push(shark);
                            angle += 30;
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
                        const dirX = checkpointX * invDist * game.monsterMoveSpeed;
                        const dirY = checkpointY * invDist * game.monsterMoveSpeed;
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
                    if (distSq < 50) {
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
                        for (i = 0; i < (1 * spawnModifier); i++) {
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
                            angle += 30;
                        }
                        playSound('portal-sound');
                    }
                    break;
                case 'fighterjet':
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'bullet', game.projectileMap['bullet'], 'monster', 0.2, 5));
                            playSound('shoot-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 100) {
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
                            moveX = dirX * game.monsterMoveSpeed;
                            moveY = dirY * game.monsterMoveSpeed;
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
                        } else if (distSq > 10) {
                            // IN RANGE → strafe sideways
                            const perpX = -dirY;
                            const perpY = dirX;

                            // Optional: switch left/right occasionally
                            monster.strafeDir = monster.strafeDir ?? (Math.random() < 0.5 ? -1 : 1);
                            if (Math.random() < 0.01) {
                                monster.strafeDir *= -1;
                            }

                            moveX = perpX * monster.strafeDir * game.monsterMoveSpeed;
                            moveY = perpY * monster.strafeDir * game.monsterMoveSpeed;
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
                case 'tank':
                    if (distSq < 100) {
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
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    break;
                case 'cowking':
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                            var angle = radiansToDegrees(Math.atan2(dy, dx));
                            for (i = 0; i < (2 * spawnModifier); i++) {
                                game.monsterTotal++;
                                const startX = monster.x + Math.cos(degreeToRadians(angle)) * 1.5;
                                const startY = monster.y + Math.sin(degreeToRadians(angle)) * 1.5;
                                const cow = { ...window.MonsterData.cow, id: `monster_${game.monsterTotal}`, x: startX, y: startY };
                                const monsterTexture = {
                                    id: cow.skin,
                                    width: cow.width,
                                    height: cow.height
                                };
                                cow.data = getTextureData(monsterTexture);
                                game.monsters.push(cow);
                                angle += 30;
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
                    if (distSq < 84) {
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
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * 0.04;
                        const dirY = dy * invDist * 0.04;
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
                case 'witchdoctor':
                    if (distSq < 84) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            if (!monster.spawnEyeball) {
                                var rndVal = Math.floor(Math.random() * 100) + 1;
                                if (rndVal > 94) {
                                    monster.spawnEyeball = true;
                                    for (i = 0; i < (1 * spawnModifier); i++) {
                                        game.monsterTotal++;
                                        var rndX = Math.floor(Math.random() * 3) - 1;
                                        var rndY = Math.floor(Math.random() * 3) - 1;
                                        const eyeball = { ...window.MonsterData.eyeball, id: `monster_${game.monsterTotal}`, x: game.player.x + rndX, y: game.player.y + rndY };
                                        const monsterTexture = {
                                            id: eyeball.skin,
                                            width: eyeball.width,
                                            height: eyeball.height
                                        };
                                        eyeball.data = getTextureData(monsterTexture);
                                        game.monsters.push(eyeball);
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
                    if (distSq > 30 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                        const dirX = dx * invDist * 0.08;
                        const dirY = dy * invDist * 0.08;
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
                case 'stasischamber':
                    break;
                case 'moby':
                    if (currentTime - monster.spawnTime >= 60000) {
                        monster.isDead = true;
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: null });
                        playSound('moby-death');
                        for (let i = 0; i < game.sprites.length; i++) {
                            if (!game.sprites[i].data) {
                                game.sprites[i].data = getTextureData(game.sprites[i]);
                            }
                        }
                        break;
                    }
                    const enemyOBJ = game.monsters.find(enemy => enemy.type != 'moby' && !enemy.isDead && isVisibleToPlayer(enemy))
                    if (!enemyOBJ || !Number.isFinite(enemyOBJ.x) || !Number.isFinite(enemyOBJ.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * 0.04;
                            const dirY = dy * invDist * 0.04;
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
                        const enemyX = enemyOBJ.x - monster.x;
                        const enemyY = enemyOBJ.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq > 0.25 && enemydistSq < 100) {
                            const distance = Math.sqrt(enemydistSq);
                            const invDist = 1 / distance;
                            const dirX = enemyX * invDist * 0.04;
                            const dirY = enemyY * invDist * 0.04;
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
                                const angle = radiansToDegrees(Math.atan2(enemyY, enemyX));
                                let blankTexture;
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'knife', blankTexture, 'player', 0.2, monster.damage));
                                playSound('splash-sound');
                                monster.lastAttack = currentTime;
                            }
                        } else if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * 0.04;
                            const dirY = dy * invDist * 0.04;
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
                        game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, data: null });
                        playSound('moby-death');
                        for (let i = 0; i < game.sprites.length; i++) {
                            if (!game.sprites[i].data) {
                                game.sprites[i].data = getTextureData(game.sprites[i]);
                            }
                        }
                        break;
                    }
                    const SenemyOBJ = game.monsters.find(enemy => enemy.type != 'seahorse' && enemy.type != 'seahorsebaby' && !enemy.isDead && isVisibleToPlayer(enemy))
                    if (!SenemyOBJ || !Number.isFinite(SenemyOBJ.x) || !Number.isFinite(SenemyOBJ.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * 0.04;
                            const dirY = dy * invDist * 0.04;
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
                        const enemyX = SenemyOBJ.x - monster.x;
                        const enemyY = SenemyOBJ.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq < 64 && (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown)) {
                            // Attack the monster
                            var angle = radiansToDegrees(Math.atan2(enemyY, enemyX));
                            for (i = 0; i < (1 * spawnModifier); i++) {
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
                            const dirX = dx * invDist * 0.04;
                            const dirY = dy * invDist * 0.04;
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
                        break;
                    }
                    const SBenemyOBJ = game.monsters.find(enemy => enemy.type != 'seahorse' && enemy.type != 'seahorsebaby' && !enemy.isDead && isVisibleToPlayer(enemy))
                    if (!SBenemyOBJ || !Number.isFinite(SBenemyOBJ.x) || !Number.isFinite(SBenemyOBJ.y)) {
                        if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * 0.04;
                            const dirY = dy * invDist * 0.04;
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
                        const enemyX = SBenemyOBJ.x - monster.x;
                        const enemyY = SBenemyOBJ.y - monster.y;
                        const enemydistSq = enemyX * enemyX + enemyY * enemyY;
                        if (enemydistSq > 0.25 && enemydistSq < 100) {
                            const distance = Math.sqrt(enemydistSq);
                            const invDist = 1 / distance;
                            const dirX = enemyX * invDist * 0.02;
                            const dirY = enemyY * invDist * 0.02;
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
                                const angle = radiansToDegrees(Math.atan2(enemyY, enemyX));
                                let blankTexture;
                                game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'knife', blankTexture, 'player', 0.2, monster.damage));
                                playSound('splash-sound');
                                monster.lastAttack = currentTime;
                                monster.isDead = true;
                            }
                        } else if (distSq > 5) {
                            const distance = Math.sqrt(distSq);
                            const invDist = 1 / distance;
                            const dirX = dx * invDist * 0.02;
                            const dirY = dy * invDist * 0.02;
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
                default:
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
}

// Player Movement

function movePlayer() {
    let map = game.levels[game.currentLevel].map;
    let mapHeight = map.length;
    let mapWidth = map[0]?.length ?? 0; 
    const currentTime = Date.now();
    if (game.playerFrozen && currentTime - game.playerFrozenTime >= 1500) {
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
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2) {
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
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2) {
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
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2) {
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
        if (checkY >= 0 && checkY < mapHeight && mathfloorX >= 0 && mathfloorX < mapWidth && map[checkY][mathfloorX] !== 2) {
            game.player.y = newY;
        }
        if (mathfloorY >= 0 && mathfloorY < mapHeight && checkX >= 0 && checkX < mapWidth && map[mathfloorY][checkX] !== 2) {
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
                game.weaponsUnlocked.pistol = true;
                game.pickupCollected++;
                break;
            // Machinegun pickup
            case 10:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.weaponsUnlocked.machinegun = true;
                game.pickupCollected++;
                break;
            // Yeti pistol pickup
            case 11:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.weaponsUnlocked.yetipistol = true;
                game.pickupCollected++;
                break;
            // Rocket launcher pickup
            case 12:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
                game.weaponsUnlocked.rocketlauncher = true;
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
                    game.pickupCollected++;
                    game.levels[10].unlocked = true;
                    game.keysUnlocked.cowkey = false;
                } else {
                    playSound('locked-sound');
                }                
                break;
            // Cow Key pickup
            case 39:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
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
                    game.pickupCollected++;
                    game.levels[11].unlocked = true;
                    game.keysUnlocked.monkeykey = false;
                } else {
                    playSound('locked-sound');
                }
                break;
            // Monkey Key pickup
            case 49:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x), 'pickup-sound');
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
                game.weaponsUnlocked.trident = true;
                game.tridentammo = true;
                game.pickupCollected++;
                break;
        }
    }
    if (game.key.one.active && game.weaponsUnlocked.knife) {
        game.weaponSprite = document.getElementById('knife-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 1;
    }
    if (game.key.two.active && game.weaponsUnlocked.pistol) {
        game.weaponSprite = document.getElementById('gun-sprite');
        game.shootCooldown = 850;
        game.equippedWeapon = 2;
    }
    if (game.key.three.active && game.weaponsUnlocked.machinegun) {
        game.weaponSprite = document.getElementById('machinegun-sprite');
        game.shootCooldown = 400;
        game.equippedWeapon = 3;
    }
    if (game.key.four.active && game.weaponsUnlocked.yetipistol) {
        game.weaponSprite = document.getElementById('yetipistol-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 4;
    }
    if (game.key.five.active && game.weaponsUnlocked.rocketlauncher) {
        game.weaponSprite = document.getElementById('rocketlauncher-sprite');
        game.shootCooldown = 1200;
        game.equippedWeapon = 5;
    }
    if (game.key.six.active && game.weaponsUnlocked.scepter) {
        game.weaponSprite = document.getElementById('scepter-sprite');
        game.shootCooldown = 300;
        game.equippedWeapon = 6;
    }
    if (game.key.seven.active && game.weaponsUnlocked.boomerang) {
        game.weaponSprite = document.getElementById('boomerangwep-sprite');
        game.shootCooldown = 1000;
        game.equippedWeapon = 7;
    }
    if (game.key.eight.active && game.weaponsUnlocked.lasershotgun) {
        game.weaponSprite = document.getElementById('lasershotgun-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 8;
    }
    if (game.key.nine.active && game.weaponsUnlocked.trident) {
        game.weaponSprite = document.getElementById('trident-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 9;
    }
}

// Play Audio

const audioCache = {};
function playSound(id) {
    if (!audioCache[id]) {
        audioCache[id] = document.getElementById(id);
    }
    const audio = audioCache[id];
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Set Initial Weapon Sprite

function setWeapon(id) {
    switch (id) {
        case 1:
            game.weaponSprite = document.getElementById('knife-sprite');
            game.shootCooldown = 600;
            break;
        case 2:
            game.weaponSprite = document.getElementById('gun-sprite');
            game.shootCooldown = 850;
            break;
        case 3:
            game.weaponSprite = document.getElementById('machinegun-sprite');
            game.shootCooldown = 400;
            break;
        case 4:
            game.weaponSprite = document.getElementById('yetipistol-sprite');
            game.shootCooldown = 600;
            break;
        case 5:
            game.weaponSprite = document.getElementById('rocketlauncher-sprite');
            game.shootCooldown = 1200;
            break;
        case 6:
            game.weaponSprite = document.getElementById('scepter-sprite');
            game.shootCooldown = 300;
            break;
        case 7:
            game.weaponSprite = document.getElementById('boomerangwep-sprite');
            game.shootCooldown = 1000;
            break;
        case 8:
            game.weaponSprite = document.getElementById('lasershotgun-sprite');
            game.shootCooldown = 600;
            break;
        case 9:
            game.weaponSprite = document.getElementById('trident-sprite');
            game.shootCooldown = 600;
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
        // Create distance and calculate it
        distance = game.projection.height / (2 * y - game.projection.height);
        // distance = distance * Math.cos(degreeToRadians(playerAngle) - degreeToRadians(rayAngle))

        // Get the tile position
        tilex = distance * directionCos;
        tiley = distance * directionSin;
        tilex += game.player.x;
        tiley += game.player.y;

        // Get texture
        texture = game.textures[game.levels[game.currentLevel].floor];

        if (!texture) {
            continue;
        }

        // Define texture coords
        texture_x = (Math.floor(tilex * texture.width)) % texture.width;
        texture_y = (Math.floor(tiley * texture.height)) % texture.height;

        // Get pixel color
        color = texture.data[texture_x + texture_y * texture.width];
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
    // Draw trees and other non-monster sprites
    for (let sprite of game.sprites) {
        if (sprite.data) {
            if (isVisibleToPlayer(sprite)) {
                drawSpriteInWorld(sprite);
            }
        }
    }

    // Draw monsters
    for (let monster of game.monsters) {
        if (!monster.isDead && monster.data) {
            if (isVisibleToPlayer(monster)) {
                drawSpriteInWorld(monster);
            }
        }
    }

    // Draw projectiles
    for (let projectile of game.projectiles) {
        drawSpriteInWorld({
            x: projectile.x,
            y: projectile.y,
            width: 4,
            height: 4,
            isBullet: true,
            owner: projectile.owner,
            texture: projectile.texture
        });
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
        spriteHeight = Math.floor(game.projection.halfHeight / distance);
        spriteWidth = Math.floor(game.projection.halfWidth / distance);
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
            drawHealthBar(barX, barY, barWidth, barHeight, sprite.health, maxHealth);
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
        if (game.equippedWeapon == 1 || game.equippedWeapon == 4 || game.equippedWeapon == 6 || game.equippedWeapon == 8) {
            return '∞'; 
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
    ctx.fillText(`Ammo: ${ammoText}`, 0, 15);
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
        return keyText;
    })();
    ctx.fillText(`Keys: ${keys}`, 0, 25);
}

// Draw Health Bar

function drawHealthBar(x, y, width, height, health, maxHealth) {
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
    // Black border
    for (let i = 0; i < width; i++) {
        drawPixel(x + i, y, new Color(0, 0, 0, 255));
        drawPixel(x + i, y + height - 1, new Color(0, 0, 0, 255));
    }
    for (let j = 0; j < height; j++) {
        drawPixel(x, y + j, new Color(0, 0, 0, 255));
        drawPixel(x + width - 1, y + j, new Color(0, 0, 0, 255));
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
    overlay.style.background = 'rgba(0,0,0,0.92)';
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
    overlay.style.background = 'rgba(0,0,0,0.92)';
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
    overlay.style.background = 'rgba(0,0,0,0.85)';
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
    // Add level buttons in a 2-column table
    const btnContainer = overlay.querySelector('#level-buttons');
    let currentRow;
    game.levels.forEach((level, idx) => {
        if (idx % 2 === 0) {
            currentRow = document.createElement('tr');
            btnContainer.appendChild(currentRow);
        }
        let td = document.createElement('td');
        let btn = document.createElement('button');
        if (game.levels[idx].name == 'Secret Cow Level' || game.levels[idx].name == 'Dark Continent') {
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
    overlay.style.background = 'rgba(0,0,0,0.92)';
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
        { id: 'speedBoost', label: '2x Speed' }
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
    if (game.currentLevel != game.levels.length - 3 && game.currentLevel != game.levels.length - 2 && game.currentLevel != game.levels.length - 1) {
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