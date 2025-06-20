// Unified game state and data object
let game = {
    currentLevel: 0,
    monsters: [], // Each monster will have position, health, sprite, etc.
    sprites: [], // Only trees and other non-monster sprites
    projectiles: [], // Bullets, rockets, etc.
    weaponSprite: document.getElementById('knife-sprite'),
    isShooting: false,
    equippedWeapon: 1,
    ammo: 0,
    rocketammo: 0,
    boomerangammo: 0,
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
    weaponsUnlocked: {
        knife: true,
        pistol: false,
        machinegun: false,
        yetipistol: false,
        rocketlauncher: false,
        scepter: false,
        boomerang: false
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
    //level legend: 0 is empty space, 1 is a tree, 2 is a wall, 3 is a imp, 4 is a lion, 5 is a tiger, 6 is a bear, 7 is a yeti, 8 is ammo, 9 is pistolpickup, 10 is machinegunpickup, 11 is yetipistolpickup, 12 is rocketlauncherpickup, 13 is rocketammo, 14 is scepterpickup, 15 is a crusader, 16 is a king, 17 is a minotaur, 18 is a demon, 19 is a skeleton, 20 is a portal, 21 is a jackalope, 22 is a alien1, 23 is a alien2, 24 is a ufo
    levels: [
        {
            name: "Jungle",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 2],
                [2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 8, 0, 2],
                [2, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2],
                [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 26, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 8, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 8, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 1, 0, 0, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2],
                [2, 0, 8, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 1, 0, 0, 2],
                [2, 6, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: true,
            floor: 5,
            wall: 7,
            background: 0,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Hell",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 0, 0, 0, 13, 0, 2],
                [2, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 19, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 2],
                [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 2, 0, 0, 13, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 2, 0, 0, 0, 2, 0, 12, 0, 2],
                [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2],
                [2, 0, 13, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 19, 0, 0, 2],
                [2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 3, 2, 3, 13, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 13, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 13, 0, 0, 0, 0, 2],
                [2, 3, 0, 0, 0, 0, 0, 0, 0, 2, 0, 13, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 13, 0, 2, 2, 0, 0, 0, 19, 0, 0, 0, 0, 18, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 6,
            wall: 1,
            background: 1,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Arctic",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 2, 0, 0, 21, 2, 2, 2, 0, 0, 0, 0, 0, 7, 0, 2],
                [2, 0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, 0, 1, 0, 0, 1, 0, 0, 2],
                [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2],
                [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 2, 0, 2, 21, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 7, 2, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 21, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 11, 0, 0, 0, 1, 0, 0, 2],
                [2, 7, 0, 0, 0, 0, 0, 0, 21, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 4,
            wall: 4,
            background: 2,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Labyrinth",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 8, 0, 0, 8, 0, 0, 0, 2, 17, 0, 0, 2, 17, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2],
                [2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2],
                [2, 0, 0, 8, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
                [2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2],
                [2, 0, 0, 0, 8, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2],
                [2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2],
                [2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2],
                [2, 0, 0, 2, 0, 0, 0, 2, 9, 2, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2],
                [2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 17, 0, 0, 2, 0, 2, 0, 2],
                [2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2],
                [2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2],
                [2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 9,
            wall: 2,
            background: 1,
            startlocation: { x: 1, y: 1 },
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Heaven",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 2],
                [2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 20, 0, 0, 2, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2],
                [2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2],
                [2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 1, 0, 0, 0, 1, 0, 2, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 16, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 8,
            wall: 8,
            background: 0,
            startlocation: { x: 2, y: 4 },
            portalcoords: [{ x: 11, y: 8, exitx: 3, exity: 8, exitangle: 90 }],
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Death Pit",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 20, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 10, 0, 2],
                [2, 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 18, 0, 13, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 8, 0, 8, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 13, 0, 8, 0, 0, 0, 0, 0, 2, 18, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 13, 18, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 18, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 20, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 12, 0, 0, 0, 20, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 5,
            wall: 1,
            background: 1,
            startlocation: { x: 2, y: 9 },
            portalcoords: [
                { x: 2, y: 2, exitx: 6, exity: 9, exitangle: 0 },
                { x: 2, y: 17, exitx: 6, exity: 10, exitangle: 0 },
                { x: 17, y: 2, exitx: 13, exity: 9, exitangle: 180 },
                { x: 17, y: 17, exitx: 13, exity: 10, exitangle: 180 },
                { x: 6, y: 6, exitx: 2, exity: 9, exitangle: 270 },
                { x: 6, y: 13, exitx: 2, exity: 10, exitangle: 90 },
                { x: 13, y: 6, exitx: 17, exity: 9, exitangle: 270 },
                { x: 13, y: 13, exitx: 17, exity: 10, exitangle: 90 }],
            equippedweapon: 1,
            monstermovespeed: 0.02
        },
        {
            name: "Ninja Dojo",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 10, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 8, 0, 2],
                [2, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 28, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 9,
            wall: 2,
            background: 1,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.07
        },
        {
            name: "Mothership",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 22, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 2],
                [2, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 24, 0, 0, 2],
                [2, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 10,
            wall: 10,
            background: 3,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.04
        },
        {
            name: "Test Level",
            map: [
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 4, 0, 2],
                [2, 0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, 0, 1, 0, 0, 1, 8, 0, 2],
                [2, 0, 0, 0, 1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 0, 9, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 2],
                [2, 0, 0, 0, 0, 26, 0, 1, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2],
                [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 8, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 12, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2],
                [2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 13, 0, 2],
                [2, 0, 13, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2],
                [2, 2, 0, 0, 0, 2, 2, 0, 2, 0, 0, 5, 2, 3, 8, 0, 0, 0, 0, 2],
                [2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 2, 2],
                [2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [2, 0, 8, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 11, 0, 0, 0, 0, 2],
                [2, 0, 0, 0, 10, 0, 0, 0, 0, 2, 0, 8, 0, 0, 0, 0, 1, 0, 0, 2],
                [2, 6, 0, 0, 0, 0, 13, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            unlocked: false,
            floor: 5,
            wall: 1,
            background: 0,
            startlocation: { x: 2, y: 2 },
            equippedweapon: 1,
            monstermovespeed: 0.02
        }
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
        }
    ],
    bulletTexture: {
        id: 'bullet-sprite',
        width: 27,
        height: 27,
        data: null
    },
    laserTexture: {
        id: 'laser-sprite',
        width: 27,
        height: 27,
        data: null
    },
    rocketTexture: {
        id: 'rocket-sprite',
        width: 16,
        height: 23,
        data: null
    },
    inboundrocketTexture: {
        id: 'inboundrocket-sprite',
        width: 16,
        height: 23,
        data: null
    },
    orbTexture: {
        id: 'orb-sprite',
        width: 27,
        height: 27,
        data: null
    },
    boomerangTexture: {
        id: 'boomerang-sprite',
        width: 27,
        height: 27,
        data: null
    },
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
    createStartScreen();
    loadTextures();
    loadBackgrounds();
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

// Main loop
let mainLoop = null;

// Main Function

function main() {
    mainLoop = setInterval(function () {
    inactiveSprites();
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
        main();
    }
}

// Window Lost Focus Event

window.addEventListener('blur', function (event) {
    clearInterval(mainLoop);
    mainLoop = null;
    renderFocusLost();
});

// ====================================================================
// LEVEL LOADING
// ====================================================================

// Load a level by index

function startLevel(levelIdx) {
    removeStartScreen();
    loadLevel(levelIdx);
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
    // Rebuild monsters and sprites from map
    game.monsterTotal = 0;
    game.monsterDefeated = 0;
    game.pickupTotal = 0;
    game.pickupCollected = 0;
    // Reset player health
    game.player.health = 100;
    let map = game.levels[levelIdx].map;
    let mapy = map.length;
    let mapx = map[0].length;
    game.monsterMoveSpeed = game.levels[levelIdx].monstermovespeed;
    for (let i = 0; i < mapy; i++) {
        for (let j = 0; j < mapx; j++) {
            switch (map[i][j]) {
                case 1:
                    switch (game.levels[levelIdx].name) {
                        case "Hell":
                            game.sprites.push({ id: "cauldron-sprite", x: j, y: i, width: 512, height: 512, active: true, data: null });
                            break;
                        case "Arctic":
                            game.sprites.push({ id: "snowytree-sprite", x: j, y: i, width: 552, height: 552, active: true, data: null });
                            break;
                        case "Heaven":
                            game.sprites.push({ id: "pillar-sprite", x: j, y: i, width: 320, height: 640, active: true, data: null });
                            break;
                        default:
                            game.sprites.push({ id: "tree-sprite", x: j, y: i, width: 8, height: 16, active: true, data: null });
                            break;
                    }
                    break;
                case 3:
                    const imp = {
                        id: `monster_${game.monsterTotal}`,
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
                        data: null,
                        damage: 10,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(imp);
                    game.monsterTotal++;
                    break;
                case 4:
                    const lion = {
                        id: `monster_${game.monsterTotal}`,
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
                        data: null,
                        damage: 20,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(lion);
                    game.monsterTotal++;
                    break;
                case 5:
                    const tiger = {
                        id: `monster_${game.monsterTotal}`,
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
                        data: null,
                        damage: 15,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(tiger);
                    game.monsterTotal++;
                    break;
                case 6:
                    const bear = {
                        id: `monster_${game.monsterTotal}`,
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
                        data: null,
                        damage: 25,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(bear);
                    game.monsterTotal++;
                    break;
                case 7:
                    const yeti = {
                        id: `monster_${game.monsterTotal}`,
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
                        data: null,
                        damage: 10,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(yeti);
                    game.monsterTotal++;
                    break;
                case 8:
                    game.sprites.push({ id: "ammo-sprite", x: j, y: i, width: 100, height: 81, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 9:
                    game.sprites.push({ id: "pistolpickup-sprite", x: j, y: i, width: 34, height: 19, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 10:
                    game.sprites.push({ id: "machinegunpickup-sprite", x: j, y: i, width: 49, height: 30, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 11:
                    game.sprites.push({ id: "yetipistolpickup-sprite", x: j, y: i, width: 50, height: 33, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 12:
                    game.sprites.push({ id: "rocketlauncherpickup-sprite", x: j, y: i, width: 80, height: 17, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 13:
                    game.sprites.push({ id: "rocketammo-sprite", x: j, y: i, width: 35, height: 18, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 14:
                    game.sprites.push({ id: "scepterpickup-sprite", x: j, y: i, width: 64, height: 64, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 15:
                    const crusader = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'crusader',
                        skin: 'crusader-sprite',
                        audio: 'crusader',
                        x: j,
                        y: i,
                        health: 550,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 25,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(crusader);
                    game.monsterTotal++;
                    break;
                case 16:
                    const king = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'king',
                        skin: 'king-sprite',
                        audio: 'crusader',
                        x: j,
                        y: i,
                        health: 1000,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 100,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(king);
                    game.monsterTotal++;
                    break;
                case 17:
                    const minotaur = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'minotaur',
                        skin: 'minotaur-sprite',
                        audio: 'minotaur',
                        x: j,
                        y: i,
                        health: 150,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 25,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(minotaur);
                    game.monsterTotal++;
                    break;
                case 18:
                    const demon = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'demon',
                        skin: 'demon-sprite',
                        audio: 'demon',
                        x: j,
                        y: i,
                        health: 450,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 25,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(demon);
                    game.monsterTotal++;
                    break;
                case 19:
                    const skeleton = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'skeleton',
                        skin: 'skeleton-sprite',
                        audio: 'skeleton',
                        x: j,
                        y: i,
                        health: 25,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 10,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(skeleton);
                    game.monsterTotal++;
                    break;
                case 20:
                    game.sprites.push({ id: "portal-sprite", x: j, y: i, width: 1024, height: 1024, active: true, data: null });
                    break
                case 21:
                    const jackalope = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'jackalope',
                        skin: 'jackalope-sprite',
                        audio: 'jackalope',
                        x: j,
                        y: i,
                        health: 25,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 5,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(jackalope);
                    game.monsterTotal++;
                    break;
                case 22:
                    const alien1 = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'alien',
                        skin: 'alien1-sprite',
                        audio: 'alien',
                        x: j,
                        y: i,
                        health: 350,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        lastShot: 0,
                        attackCooldown: 2000
                    };
                    game.monsters.push(alien1);
                    game.monsterTotal++;
                    break;
                case 23:
                    const alien2 = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'alien',
                        skin: 'alien2-sprite',
                        audio: 'alien',
                        x: j,
                        y: i,
                        health: 350,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        lastShot: 0,
                        attackCooldown: 2000
                    };
                    game.monsters.push(alien2);
                    game.monsterTotal++;
                    break;
                case 24:
                    const ufo = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'ufo',
                        skin: 'ufo-sprite',
                        audio: 'ufo',
                        x: j,
                        y: i,
                        health: 1000,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        lastShot: 0,
                        rocketlastShot: 0,
                        attackCooldown: 2000,
                        rocketCooldown: 8000
                    };
                    game.monsters.push(ufo);
                    game.monsterTotal++;
                    break;
                case 25:
                    const robot = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'robot',
                        skin: 'robot-sprite',
                        audio: 'robot',
                        x: j,
                        y: i,
                        health: 250,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 10,
                        lastAttack: 0,
                        attackCooldown: 1000
                    };
                    game.monsters.push(robot);
                    game.monsterTotal++;
                    break;
                case 26:
                    game.sprites.push({ id: "boomerang-sprite", x: j, y: i, width: 27, height: 27, active: true, data: null });
                    game.pickupTotal++;
                    break;
                case 27:
                    const ninja1 = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'ninja',
                        skin: 'ninja1-sprite',
                        audio: 'ninja',
                        x: j,
                        y: i,
                        health: 250,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 15,
                        lastAttack: 0,
                        attackCooldown: 500
                    };
                    game.monsters.push(ninja1);
                    game.monsterTotal++;
                    break;
                case 28:
                    const ninja2 = {
                        id: `monster_${game.monsterTotal}`,
                        type: 'ninja',
                        skin: 'ninja2-sprite',
                        audio: 'ninja',
                        x: j,
                        y: i,
                        health: 250,
                        isDead: false,
                        width: 512,
                        height: 512,
                        active: false,
                        data: null,
                        damage: 15,
                        lastAttack: 0,
                        attackCooldown: 500
                    };
                    game.monsters.push(ninja2);
                    game.monsterTotal++;
                    break;
                default:
                    break;
            }
        }
    }
    // Reload textures and sprites
    loadTextures();
    loadBackgrounds();
    loadSprites();
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
            activeSprites(rayX, rayY);
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

// Degrees to radians conversion

function degreeToRadians(degree) {
    return degree * degree_to_rad;
}


// Radians to degrees conversion

function radiansToDegrees(radians) {
    return radians * rad_to_degree;
}

// Active monsters based on player position

function activeSprites(x, y) {
    const activationDistSq = game.activationDistance * game.activationDistance;

    // Check activation for monsters since they are dynamic
    for (let monster of game.monsters) {
        if (monster.isDead || monster.active) continue;

        const dx = x - monster.x;
        const dy = y - monster.y;
        const distSq = dx * dx + dy * dy;

        if (distSq <= activationDistSq) {
            monster.active = true;
        }
    }
}

// Inactive all monsters

function inactiveSprites() {
    // Only inactive monsters since they are dynamic
    for (let monster of game.monsters) {
        monster.active = false;
    }
}

// Bullet Object

class Projectile {
    constructor(x, y, angle, type, texture, owner) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 0.2;
        this.owner = owner;
        this.type = type;
        this.texture = texture;
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
        game.isShooting = true;
        game.lastShot = currentTime;

        if ((game.equippedWeapon == 2 || game.equippedWeapon == 3) && game.ammo <= 0 || ((game.equippedWeapon == 5) && game.rocketammo <= 0)) {
            playSound('gunclick-sound');
            return;
        } else if (game.equippedWeapon == 7 && game.boomerangammo <= 0) {
            //boomerang fail throw
            return;
        }
        // Start the bullet slightly in front of the player in the direction they're facing
        const startX = game.player.x + Math.cos(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
        const startY = game.player.y + Math.sin(degreeToRadians(game.player.angle)) * game.bulletStartDistance;
        let texture;
        let type;
        switch (game.equippedWeapon) {
            case 1:
                playSound('knife-sound');
                type = 'knife';
                break;
            case 4:
                texture = game.laserTexture;
                type = 'laser';
                playSound('laser-sound');
                break;
            case 5:
                texture = game.rocketTexture;
                type = 'rocket';
                playSound('rocketlaunch-sound');
                game.rocketammo--;
                break;
            case 6:
                texture = game.orbTexture;
                type = 'orb';
                playSound('orb-sound');
                break;
            case 7:
                texture = game.boomerangTexture;
                type = 'boomerang';
                playSound('boomerang-sound');
                game.boomerangammo--;
                if (game.boomerangammo <= 0) {
                    game.weaponSprite = document.getElementById('blank-sprite');
                    game.weaponsUnlocked.boomerang = false;
                }
                break;
            default:
                texture = game.bulletTexture;
                type = 'bullet';
                playSound('shoot-sound');
                game.ammo--;
                break;
        }
        game.projectiles.push(new Projectile(startX, startY, game.player.angle, type, texture, 'player'));
    }
}

// Update Game Objects

function updateGameObjects() {
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
                            if (game.equippedWeapon != 4) {
                                playSound('yeti-laugh');
                                projectilesToRemove.add(i);
                                break;
                            } else {
                                monster.health -= 75;
                            }
                        } else if (game.equippedWeapon == 4) {
                            monster.health -= 50;
                        } else if (game.equippedWeapon == 5) {
                            playSound('explosion-sound');
                            monster.health -= 150;
                        } else if (game.equippedWeapon == 6) {
                            if (monster.type == 'imp' || monster.type == 'demon' || monster.type == 'skeleton') {
                                monster.health -= 75;
                            } else {
                                monster.health -= 25;
                            }
                        } else if (game.equippedWeapon == 7) {
                            monster.health -= 250;
                            const dx = game.player.x - monster.x;
                            const dy = game.player.y - monster.y;
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'boomerang', game.boomerangTexture, 'monster'));
                            playSound('boomerang-sound');
                        } else {
                            monster.health -= 25;
                        }
                        if (monster.health <= 0) {
                            monster.isDead = true;
                            game.monsterDefeated++;
                            playSound(`${monster.audio}-death`);
                            switch (monster.type) {
                                case 'crusader':
                                case 'king':
                                    game.sprites.push({ id: 'tombstone-sprite', x: monster.x, y: monster.y, width: 256, height: 256, active: true, data: null });
                                    break;
                                case 'alien':
                                    game.sprites.push({ id: 'acid-sprite', x: monster.x, y: monster.y, width: 256, height: 256, active: true, data: null });
                                    break;
                                default:
                                    game.sprites.push({ id: 'bones-sprite', x: monster.x, y: monster.y, width: 256, height: 256, active: true, data: null });
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
            if (projectile.type === 'knife') {
                if (distSq > game.knifeRange) projectilesToRemove.add(i);
            } else {
                if (distSq > game.bulletRange) {
                    if (projectile.type === 'rocket') playSound('explosion-sound');
                    projectilesToRemove.add(i);
                }
            }
        } else if (projectile.owner === 'monster') {
            // Check collision with player
            const dx = game.player.x - projectile.x;
            const dy = game.player.y - projectile.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 0.10) {
                if (projectile.type === 'rocket') {
                    game.player.health -= 25; // rocket damage
                    playSound('explosion-sound');
                } else if (projectile.type === 'boomerang') {
                    game.boomerangammo += 1; // Boomerang pickup
                    playSound('pickup-sound');
                    if (game.boomerangammo >= 1) {
                        game.weaponSprite = document.getElementById('boomerangwep-sprite');
                        game.weaponsUnlocked.boomerang = true;
                    }
                } else {
                    game.player.health -= 5; // Laser damage
                }
                playSound('injured-sound');
                projectilesToRemove.add(i);
                if (game.player.health <= 0) {
                    playSound('death-sound');
                    endGameDeath();
                }
                projectilesToRemove.add(i);
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

            switch (monster.type) {
                case 'alien':
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.laserTexture, 'monster'));
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
                        if (map[Math.floor(monster.y)][Math.floor(newX)] !== 2) {
                            monster.x = newX;
                        }
                        // Try to move in Y direction
                        const newY = monster.y + dirY;
                        if (map[Math.floor(newY)][Math.floor(monster.x)] !== 2) {
                            monster.y = newY;
                        }
                    }
                    break;
                case 'ufo':
                    if (distSq < 64) {
                        if (!monster.lastShot || currentTime - monster.lastShot >= monster.attackCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'laser', game.laserTexture, 'monster'));
                            playSound('laser-sound');
                            monster.lastShot = currentTime;
                        }
                    }
                    if (distSq < 100) {
                        if (!monster.rocketlastShot || currentTime - monster.rocketlastShot >= monster.rocketCooldown) {
                            const angle = radiansToDegrees(Math.atan2(dy, dx));
                            game.projectiles.push(new Projectile(monster.x, monster.y, angle, 'rocket', game.inboundrocketTexture, 'monster'));
                            playSound('rocketlaunch-sound');
                            monster.rocketlastShot = currentTime;
                        }
                    }
                    if (distSq > 30 && distSq < 200) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    break;
                default:
                    if (distSq > 0.25 && distSq < 100) {
                        const distance = Math.sqrt(distSq);
                        const invDist = 1 / distance;
                        const dirX = dx * invDist * game.monsterMoveSpeed;
                        const dirY = dy * invDist * game.monsterMoveSpeed;
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
                    if (distSq < 0.5 && (!monster.lastAttack || currentTime - monster.lastAttack >= monster.attackCooldown)) {
                        // Attack the player
                        game.player.health -= monster.damage;
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

// Movement

function movePlayer() {
    let map = game.levels[game.currentLevel].map;
    let mapHeight = map.length;
    let mapWidth = map[0]?.length ?? 0; 
    if (game.key.up.active) {
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
    if (game.key.down.active) {
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
    if (game.key.strafeleft.active) {
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
    if (game.key.straferight.active) {
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
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.ammo += 8;
                game.pickupCollected++;
                break;
            // Pistol pickup
            case 9:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.weaponsUnlocked.pistol = true;
                game.pickupCollected++;
                break;
            // Machinegun pickup
            case 10:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.weaponsUnlocked.machinegun = true;
                game.pickupCollected++;
                break;
            // Yeti pistol pickup
            case 11:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.weaponsUnlocked.yetipistol = true;
                game.pickupCollected++;
                break;
            // Rocket launcher pickup
            case 12:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.weaponsUnlocked.rocketlauncher = true;
                game.pickupCollected++;
                break;
            // Rocket ammo pickup
            case 13:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.rocketammo += 4;
                game.pickupCollected++;
                break;
            // Scepter pickup
            case 14:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
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
            case 26:
                game.levels[game.currentLevel].map[Math.floor(game.player.y)][Math.floor(game.player.x)] = 0;
                itemPickup(Math.floor(game.player.y), Math.floor(game.player.x));
                game.weaponsUnlocked.boomerang = true;
                game.boomerangammo++;
                game.pickupCollected++;
                break;
        }
    }
    if (game.key.one.active && game.weaponsUnlocked.knife == true) {
        game.weaponSprite = document.getElementById('knife-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 1;
    }
    if (game.key.two.active && game.weaponsUnlocked.pistol == true) {
        game.weaponSprite = document.getElementById('gun-sprite');
        game.shootCooldown = 850;
        game.equippedWeapon = 2;
    }
    if (game.key.three.active && game.weaponsUnlocked.machinegun == true) {
        game.weaponSprite = document.getElementById('machinegun-sprite');
        game.shootCooldown = 400;
        game.equippedWeapon = 3;
    }
    if (game.key.four.active && game.weaponsUnlocked.yetipistol == true) {
        game.weaponSprite = document.getElementById('yetipistol-sprite');
        game.shootCooldown = 600;
        game.equippedWeapon = 4;
    }
    if (game.key.five.active && game.weaponsUnlocked.rocketlauncher == true) {
        game.weaponSprite = document.getElementById('rocketlauncher-sprite');
        game.shootCooldown = 1200;
        game.equippedWeapon = 5;
    }
    if (game.key.six.active && game.weaponsUnlocked.scepter == true) {
        game.weaponSprite = document.getElementById('scepter-sprite');
        game.shootCooldown = 300;
        game.equippedWeapon = 6;
    }
    if (game.key.seven.active && game.weaponsUnlocked.boomerang == true) {
        game.weaponSprite = document.getElementById('boomerangwep-sprite');
        game.shootCooldown = 1000;
        game.equippedWeapon = 7;
    }
}

// Audio Cache

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
    }
});

// Item Pickup

function itemPickup(ycoords, xcoords) {
    playSound('pickup-sound');
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

// Load Textures

function loadTextures() {
    for (let i = 0; i < game.textures.length; i++) {
        if (game.textures[i].id) {
            game.textures[i].data = getTextureData(game.textures[i]);
        }
    }
}

// Load Backgrounds

function loadBackgrounds() {
    for (let i = 0; i < game.backgrounds.length; i++) {
        if (game.backgrounds[i].id) {
            game.backgrounds[i].data = getTextureData(game.backgrounds[i]);
        }
    }
}

// Load Sprites

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
    // Load inboundrocket sprite texture
    if (!game.inboundrocketTexture.data) {
        game.inboundrocketTexture.data = getTextureData(game.inboundrocketTexture);
    }
    if (!game.orbTexture.data) {
        game.orbTexture.data = getTextureData(game.orbTexture);
    }
    if (!game.boomerangTexture.data) {
        game.boomerangTexture.data = getTextureData(game.boomerangTexture);
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
    for (let i = 0; i < game.sprites.length; i++) {
        const sprite = game.sprites[i];
        if (sprite.data) {
            drawSpriteInWorld(sprite);
        }
    }

    // Draw monsters
    for (let monster of game.monsters) {
        if (!monster.isDead && monster.active && monster.data) {
            drawSpriteInWorld(monster);
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
        if (sprite.owner == 'player' && game.equippedWeapon == 1) {
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
        // Health bar settings
        const barWidth = Math.max(24, Math.floor(spriteWidth * 0.7));
        const barHeight = 6;
        // Center above head
        const barX = Math.floor(spriteX + spriteWidth / 2 - barWidth / 2);
        const barY = Math.floor(game.projection.halfHeight - spriteHeight / 2) - 12;
        // Find maxHealth (initial health at spawn)
        let maxHealth = sprite.maxHealth || sprite._maxHealth || sprite.health;
        if (!sprite._maxHealth) sprite._maxHealth = sprite.health;
        drawHealthBar(barX, barY, barWidth, barHeight, sprite.health, maxHealth);
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
    if (game.isShooting) {
        ctx.drawImage(game.weaponSprite,
            game.projection.width / 2 - 80,
            game.projection.height - 170,
            160, 160
        );
        game.isShooting = false;
    } else {
        ctx.drawImage(game.weaponSprite,
            game.projection.width / 2 - 80,
            game.projection.height - 155,
            160, 160
        );
    }
}

function drawHUD(ctx) {
    // Draw semi-transparent black background for HUD
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, 80, 22);

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
            default: return 'Unknown';
        }
    })();
    ctx.fillText(`Weapon: ${weaponName}`, 0, 10);

    // Draw ammo count
    const ammoText = (() => {
        if (game.equippedWeapon === 1 || game.equippedWeapon === 4 || game.equippedWeapon == 6) {
            return '∞'; 
        } else if (game.equippedWeapon === 5) {
            return `${game.rocketammo}`; // Special ammo type for rocket launcher
        } else if (game.equippedWeapon === 7) {
            return `${game.boomerangammo}`; // Special ammo type for boomerang
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
        return unlockText;
    })();
    ctx.fillText(`Unlocked: ${unlocks}`, 0, 20);
}

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
        <p style="color: #aaa; margin-top: 2em; font-family: 'Lucida Console', monospace;">Use arrow keys to move, A & D to strafe, 1-6 to switch weapons, Space to shoot.</p>
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
        if (game.levels[idx].unlocked == false) {
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

// Render Lost Focus 

function renderFocusLost() {
    screenContext.fillStyle = 'rgba(0,0,0,0.5)';
    screenContext.fillRect(0, 0, game.projection.width, game.projection.height);
    screenContext.fillStyle = 'white';
    screenContext.font = '10px Lucida Console';
    screenContext.fillText('CLICK TO FOCUS', game.projection.halfWidth / 2, game.projection.halfHeight);
}

// End game and show win screen, then return to start screen

function endGame() {
    if (mainLoop) {
        clearInterval(mainLoop);
        mainLoop = null;
    }
    createWinScreen();
    if (game.currentLevel != game.levels.length - 1) {
        game.levels[game.currentLevel + 1].unlocked = true;
    }
    setTimeout(() => {
        removeWinScreen();
        createStartScreen();
    }, 5000);
}

function endGameDeath() {
    if (mainLoop) {
        clearInterval(mainLoop);
        mainLoop = null;
    }
    createDeathScreen();
    setTimeout(() => {
        removeDeathScreen();
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

// Remove start screen overlay

function removeStartScreen() {
    const overlay = document.getElementById('start-screen-overlay');
    if (overlay) overlay.remove();
}

// Remove win screen overlay

function removeWinScreen() {
    const overlay = document.getElementById('win-screen-overlay');
    if (overlay) overlay.remove();
}

// Remove death screen overlay

function removeDeathScreen() {
    const overlay = document.getElementById('death-screen-overlay');
    if (overlay) overlay.remove();
}