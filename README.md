# Invaders! Possibly From Space!

[Click here to see deployed game](https://invaders-game-lemon.vercel.app/)

<hr>

## Description

A Space Invaders game made with HTML5 Canvas, CSS and JavaScript. Theme inspiration taken from the late 1970's arcade game, and from an episode of [Futurama](https://futurama.fandom.com/wiki/Anthology_of_Interest_II).

<hr>

## MVP

- A playable Space Invaders game where the player can move left and right and shoot projectiles at the invaders.
- A start screen, game screen, and game over screen.
- The invaders move horizontally and vertically, approaching the cannon.
- The invaders can shoot projectiles at the player.
- The player can shoot projectiles at the invaders.
- The invaders die to one shot, if player is hit they die.
- If the invaders reach the bottom of the screen the player loses.
- When all invaders are destroyed a congratulations screen. The game board is reset.

## Backlog

- Player lives
- Bunkers
- Scoring
- Harder levels with faster invaders/more ships/fewer bunkers.
- Boss levels
- Nicer UI
- Sound effects
- Local storage for session scores
- Host on firebase

<hr>

## Data structure

## States & States Transitions

- Start Screen
- Game Screen
- Restart Screen

<hr>

## Task

- [x] Create a canvas
- [x] Have a splash screen with functionality to start game
- [x] Have splash screen disappear after game start
- [x] Have a player that can move left and right
- [x] Create player projectiles
- [x] Create invader
- [x] Create invader grid
- [x] Grid movement
- [x] Player projectile collision with invader
- [x] Collision and enemy death
- [x] Invader projectile(s)
- [x] Lose condition - Player hit
- [x] Win condition - All invaders destroyed
- [x] Lose condition - Invaders reach player's height
- [x] Restart game - not reload page

###Bonus

- [ ] Invaders speed up
- [ ] Player lives
- [ ] Multiple bomb types
- [ ] Bunkers
- [x] Scoring
- [ ] Boss ship
- [ ] Powerups
- [ ] Harder enemies/level changes
- [x] Sound effects/Music
- [ ] Tidy ui
- [ ] Local storage for session scores
- [ ] Leaderboard (firebase)
- [ ] Easter Eggs/Cheats

<hr>

## Links

- [Trello Link](https://trello.com/b/mz5nAvYU/invaders-kanban)
- [Slides Link](http://slides.com)
- [Github repository Link](https://github.com/imason5/invaders-game)
- [Deployment Link](https://invaders-game-lemon.vercel.app/)
