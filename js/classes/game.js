import Canvas from "/js/classes/canvas.js";
import Player from "/js/classes/player.js";
import Projectiles from "/js/classes/projectiles.js";
import InvadersGrid from "/js/classes/invaders-grid.js";
import CollisionManager from "/js/classes/collision-manager.js";
import Bombs from "/js/classes/bombs.js";
import { WigglyBomb } from "/js/classes/bombs.js";
import RestartScreen from "/js/classes/restart-screen.js";
import StartScreen from "/js/classes/startscreen.js";
import Score from "/js/classes/score.js";
import SoundManager from "/js/classes/sound-manager.js";

export default class Game {
  // 1. Constructor and initialization methods
  constructor(level) {
    this.initializeGame(level);
    this.addEventListeners();
    this.startGame();
    this.setupMusicControlButton();
  }

  initializeGame(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    this.player = new Player();
    this.soundManager = new SoundManager();
    this.projectiles = [];
    this.bombs = [];
    this.lastBombTime = Date.now();
    this.keysPressed = {};

    this.invadersGrid = new InvadersGrid(this.canvas.context);
    this.collisionManager = new CollisionManager(this);
    this.bombDropCounter = 0;

    this.gameOver = false;
    this.gameWon = false;
    this.gameStopped = false;
    this.inGame = false;
    this.score = new Score();
  }

  // 2. Game loop methods

  startGame() {
    if (!this.gameStarted) {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.inGame = true;
        this.gameLoop();
      }
    }
  }

  gameLoop() {
    // Main loop function of the game.
    // Updates the projectiles and bombs if the game has started
    if (this.gameStarted) {
      this.updatePlayer();
      this.updateProjectiles();
      this.spawnBombs();
      this.updateBombs();
    }
    // Updates the canvas and calls itself again.
    this.update();
    this.draw();

    if (!this.gameStopped) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  update() {
    if (this.gameOver || this.gameWon) {
      if (!this.gameStopped) {
        this.gameStopped = true;
        this.soundManager.stop("backgroundMusic");

        if (this.gameWon) {
          this.soundManager.play("gameWon");
        } else {
          this.soundManager.play("gameOver");
        }

        this.restartScreen = new RestartScreen(
          this.canvas,
          this.gameWon ? "Game Won" : "Game Over",
          this,
          this.startScreen
        );

        this.restartScreen.showButton();
        this.restartScreen.draw();
      }

      return;
    }
  }

  draw() {
    // Responsible for drawing the current state of the game.
    // It clears the canvas, draws the background, the player, the invaders grid, the score, and all projectiles/bombs
    this.canvas.clear();

    this.canvas.drawBackground();
    this.player.draw(this.canvas.context);
    this.invadersGrid.draw();
    this.collisionManager.checkCollisions();
    this.score.draw(this.canvas.context);

    // Draws all projectiles and bombs
    this.projectiles.forEach((projectile) => {
      projectile.draw(this.canvas.context);
    });

    this.bombs.forEach((bomb) => {
      bomb.draw(this.canvas.context);
    });

    // Stops the drawing of the canvas if the game is over or won
    if (this.gameOver || this.gameWon) {
      return;
    }
  }

  // 3. Input handling methods

  addEventListeners() {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    document.addEventListener("keydown", (event) => this.handleKeyG(event));
  }

  handleKeyDown(event) {
    this.keysPressed[event.key] = true;

    if (event.key === " ") {
      this.createProjectile();
    }
  }

  handleKeyUp(event) {
    this.keysPressed[event.key] = false;
  }

  // 4. Player-related methods
  updatePlayer() {
    if (this.keysPressed["ArrowLeft"] || this.keysPressed["a"]) {
      this.player.moveLeft();
      this.player.moving = true;
    }
    if (this.keysPressed["ArrowRight"] || this.keysPressed["d"]) {
      this.player.moveRight();
      this.player.moving = true;
    }
    if (
      !this.keysPressed["ArrowLeft"] &&
      !this.keysPressed["a"] &&
      !this.keysPressed["ArrowRight"] &&
      !this.keysPressed["d"]
    ) {
      this.player.moving = false;
    }

    // Call handlePlayerMovement with the value of this.player.moving
    this.player.handlePlayerMovement(this.player.moving);
  }

  createProjectile() {
    if (!this.player.playerReadyToFire) {
      return;
    }
    const now = Date.now();
    const timeSinceLastProjectile = now - this.lastProjectileTime;
    const firingInterval = 500; // Modify the time interval between firing projectiles

    if (timeSinceLastProjectile < firingInterval) {
      return;
    }

    // Creates a new projectile at the player's current position
    // and adds it to the projectiles array.
    const position = {
      x: this.player.position.x + this.player.sprite.scaledWidth / 2 - 2.5, //
      y: this.player.position.y,
    };
    const velocity = {
      // Modify to change the speed of the projectiles.
      x: 0,
      y: -10,
    };
    const projectile = new Projectiles(position, velocity);
    this.projectiles.push(projectile);
    this.soundManager.play("playerShoot");
    this.lastProjectileTime = now;
  }

  // 5. Projectile-related methods
  updateProjectiles() {
    // Updates the positions of all projectiles and removes any
    // that have gone off the top of the screen.
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter((projectile) => {
      return projectile.position.y > -projectile.height;
    });
  }

  // 6. Bomb-related methods
  spawnBombs() {
    if (!this.invadersGrid.moving) {
      return;
    }

    const now = Date.now();
    const timeSinceLastBomb = now - this.lastBombTime;
    const bombSpawnInterval = 2000; // Modify the time interval between spawning bombs

    if (timeSinceLastBomb >= bombSpawnInterval) {
      this.dropBombFromInvaders();
      this.lastBombTime = now;
    }
  }

  dropBombFromInvaders() {
    const bombDropPosition = this.invadersGrid.getBombDropPosition();

    if (this.bombDropCounter % 3 === 0) {
      const bomb = Bombs.dropBomb(bombDropPosition);
      this.bombs.push(bomb);
    } else {
      const wigglyBomb = new WigglyBomb(bombDropPosition, { x: 0, y: 4 });
      this.bombs.push(wigglyBomb);
    }

    this.bombDropCounter++;
  }

  updateBombs() {
    this.bombs.forEach((bomb) => {
      bomb.update();
    });
    this.bombs = this.bombs.filter((bomb) => {
      const bombOffScreen = bomb.position.y > this.canvas.height + bomb.height;
      return !bombOffScreen;
    });
  }

  // 7. Invaders-related methods

  showInvadersGrid() {
    this.invadersGrid.gridVisible = true;
  }

  // 8. Game state management methods

  resetGame() {
    this.gameOver = false;
    this.gameWon = false;
    this.gameStopped = false;
    this.gameStarted = false;

    this.invadersGrid.reset();
    this.projectiles = [];
    this.bombs = [];
    this.player.resetPosition();
    this.inGame = false;
    this.player.visible = false;
    this.player.playerReadyToFire = false;

    this.canvas.setLevelBackground(0);
    this.startScreen = new StartScreen(this);
    this.startScreen.setupEventListeners();
    this.startScreen.showButton();
    this.score.reset();
    this.score.scoreVisible = false;
  }

  // 9. UI-related methods
  setupMusicControlButton() {
    const musicControlButton = document.getElementById("musicControl");
    musicControlButton.addEventListener("click", () => {
      if (this.soundManager.isPlaying("backgroundMusic")) {
        this.soundManager.togglePlay("backgroundMusic");
        musicControlButton.innerText = "Play Music";
      } else {
        this.soundManager.togglePlay("backgroundMusic");
        musicControlButton.innerText = "Pause Music";
      }
    });
  }

  // 10. Cheat methods
  handleKeyG(event) {
    if (event.key === "g") {
      this.gameWon = true;
    }
  }
}
