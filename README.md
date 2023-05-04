# Invaders! Possibly From Space!

<b>[Click here to see deployed game](https://invaders-game-lemon.vercel.app/)</b>

![Invaders! Possibly From Space!](/invaders-game/images/forReadme.png)

<hr>

## Description

A Space Invaders game made with HTML5 Canvas, CSS and JavaScript. Theme inspiration taken from the late 1970's arcade game, and from an episode of [Futurama](https://youtu.be/UuEARrNbOdo?t=141).

Developed at the end of Module One of the [Ironhack](https://www.ironhack.com/uk/en/web-development/remote) Web Development Bootcamp.

<hr>

## MVP

- A playable Space Invaders game where the player can move left and right and shoot projectiles at the invaders.
- A start screen, game screen, and game over screen.
- The invaders move horizontally and vertically, approaching the cannon.
- The invaders can shoot projectiles at the player.
- The player can shoot projectiles at the invaders.
- The invaders die to one shot, if player is hit they die.
- If the invaders reach the bottom of the screen the player loses.
- When all invaders are destroyed a congratulations screen. The game board is reset on win or loss.

## Backlog

- Player lives
- Bunkers
- Scoring
- Harder levels with faster invaders/more ships/fewer bunkers.
- Boss levels
- Nicer UI
- Local storage for session scores

<hr>

## Data structure

#### main.js

Entry point of the game. It imports the Game() and StartScreen() classes, and defines a preloadImages function. Inside the callback function of the preloadImages function, it creates a new instance of the Game() class, and a new instance of the StartScreen() class.

#### Game()

<b> Game() manages the overall state and functionality of the game. It handles game initialization, game loop, input handling, drawing and updating game objects, managing the game state, and managing the UI elements, managing instances of other classes in the project to create the game. </b>

1. Constructor and initialization methods

- initializeGame(level)

2.  Game loop methods (update and draw)

- startGame()

- gameLoop()

- update()

- draw()

3. Input handling methods (event listeners and key handling)

- addEventListeners()

- handleKeyDown(event)

- handleKeyUp(event)

4. Player-related methods

- updatePlayer()

- createProjectile()

5. Projectile-related methods

- updateProjectiles()

6. Bomb-related methods

- spawnBombs()

- dropBombFromInvaders()

- updateBombs()

7. Invader-related methods

- showInvadersGrid()

8. Game state management methods

- resetGame()

9. UI-related methods (music control button, etc.)

- setupMusicControlButton()

10. Cheat methods

- handleKeyG(event)

#### StartScreen()

Handles display of start button and transition to game screen. Sets up the game by showing the invaders grid, making the player visible and starting the background music.

#### RestartScreen()

Manages the restart screen of the game, which is displayed when the game is over or won. It handles showing and hiding the restart button, listening for user input and resetting the game state to start a new game when the user decides to restart.

#### Canvas()

Manages the game canvas, handling background images, drawing and clearing the canvas, and providing fadeIn and fadeOut animations for smooth transitions between different game states or screens.

#### Sprite()

Handles the game sprite sheet, allowing for drawing it on the canvas while optionally removing dark pixels to make them transparent. The class provides methods to draw the sprite with or without transparency.

#### Player()

It manages the player's sprite, position, movement, and visibility. The class provides methods for drawing the player on the canvas, moving the player left or right, starting and stopping the animation, and resetting the player's position to the initial state.

#### Invaders()

Represents an enemy invader in the game. It takes a type (small, medium, or large) and position as input and manages the invader's sprite and position. The class provides a method for drawing the invader on the canvas and animating it by switching between two sprites.

#### InvadersGrid()

Responsible for creating the grid layout of invaders, managing their movement and animation, and handling the interactions such as dropping bombs and removing invaders when they are hit. The class also implements an offscreen canvas for performance optimization when drawing the grid on the main canvas.

#### Projectiles()

Renders the player projectile on the canvas, updating its position based on its velocity, and handling the firing mechanism by checking if the projectile can be fired and creating a new projectile instance when fired.

#### CollisionManager()

Detects and handles collisions between game entities such as projectiles, bombs, invaders, and the player. When collisions are detected, it updates the game state and triggers appropriate actions, like removing entities or playing sounds.

#### Other Classes

- Bombs() extends Projectiles()
- Score()
- SoundManager()

## States & States Transitions

- Start Screen
- Game Screen
- Restart Screen - different audio for winner or loser.

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

- [x] Invaders speed up
- [ ] Player lives
- [ ] Multiple bomb types
- [ ] Bunkers
- [x] Scoring
- [ ] Boss ship
- [ ] Powerups
- [ ] Harder enemies/level changes
- [x] Sound effects/Music
- [ ] Tidy ui
- [ ] Local storage for session scores/ leaderboard
- [ ] Easter Eggs/Cheats

<hr>

## Links

- [Figma Planning](https://www.figma.com/file/5cTbiap1GEzgBVF4YvJg7E/INVADERS!-Possibly-from-SPACE!?node-id=0-1&t=wUakKrWXNdWOCOzw-0)
- [Trello Link](https://trello.com/b/mz5nAvYU/invaders-kanban)
- [Slides Link](https://docs.google.com/presentation/d/1A_8p_llirh1droBAwcyadLVMxp3_LBygRVeoCedGVmY/edit?usp=sharing)
- [Github repository Link](https://github.com/imason5/invaders-game)
- [Deployment Link](https://invaders-game-lemon.vercel.app/)
