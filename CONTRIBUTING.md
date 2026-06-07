# Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new pull request (PR)

# To Do

- [ ] Design Levels
- [x] ~~Explosions~~
- [x] ~~Win/Loss Screen~~
- [x] ~~Player Taking Damage~~
- [x] ~~Enemies Shooting Guns~~
- [ ] Programmatic Map Generation
- [x] ~~Player HUD~~
- [ ] Plot/Lore
- [ ] Code Optimization

# More Existing Features

- [ ] More Sprites
- [ ] More Weapons - Udder Gun, Shield
- [ ] More Pickups - rapidfire buff, armor?
- [ ] More Sounds
- [ ] More Textures

# General Ideas

- upgrade assets, make matrix for missing artifacts
- dead bones decay system (extend sprite cull system)

# Level Ideas

- army base has huge fight between factions, winning faction helps you in mothership level
- warcraft level, human knights and orcs, ogre mage
- army vs terminators
- medieval castle, knights, archers, catapults
- zombies, apocalyptic city, barricades, cars, tanks
- proper tree sprite
- boss mode when you beat the game
- more ammo dispursed around levels / enemies drop ammo
- secret area flag
- total monster count for each level
- zones where movement speed is slowed

# Weapon Ideas

- zeus has dangerous attack when gets to 100 hp, more abilities and hp when beat the game
- udder gun dropped by cow king
- melee axe / katana
- energy shield / physical shield that absorbs 1000 dmg
- freeze gun
- rocket knockback?
- replace pistol with yeti pistol when acquired

# Enemy Ideas

- allegiance flag on monsters (traitor gun? swaps allegiance)
- witch doctors can teleport you to random places on the map
- ufo tractor beams?
- spyro egg thief?
- more enemies freeze player, teleport player, steal weapons, steal health, steal ammo
- scarab steals a random weapon, creates mimics of himself
- wizard that randomly attacks you on a predetermined level, only active for 1 minute, killing him gives you a powerful weapon or drops a red portal to somewhere
- projectile reflect
- animations for enemies, planets crumble, purple magic spawn animations
- give astronauts some kind of ability
- give scarab an ability
- work on sobek boss fight mechanics
- acid and burning debris should have melee attack
- baphomet black magic attacks
- egyptian gods drop ankh on death
- crab ally
- fling aliens on ufo explosion
- enemies aggro if attacked

# Issues / Bugs

- issue with sprite scaling
- chests spam locked sound on pickup attempt, need timeout, same with all pickups that dont clear immediately
- asteroids can go negative map coordinates and cause a NaN error, need to fix that
- frogs all charge at same time
- prisoner ai gets stuck on eachother
- arctic level background needs work