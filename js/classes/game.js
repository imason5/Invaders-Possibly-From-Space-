import Canvas from "./Canvas.js";
import Player from "./Player.js";
import Projectiles from "./Projectiles.js";
import Invaders from "./Invaders.js";
import InvadersGrid from "./InvadersGrid.js";

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
    this.player = new Player();
    this.projectiles = [];
    this.keysPressed = {};
    this.invadersGrid = new InvadersGrid(this.canvas.context);
  }

  draw() {
    // Responsible for drawing the current state of the game.
    // It clears the canvas, draws the background, the player, and all projectiles,
    // and updates the player's movement if necessary.
    this.canvas.clear();
    this.canvas.drawBackground();
    this.player.draw(this.canvas.context);

    this.invadersGrid.draw();

    this.projectiles.forEach((projectile) => {
      projectile.draw(this.canvas.context);
    });

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
    if (this.player.moving) {
      this.player.move();
    }
  }

  handleKeyDown(event) {
    // Sets the corresponding key in the keysPressed object to true,
    // and creates a new projectile if the spacebar is pressed.
    // Necessary to allow fire while moving.
    this.keysPressed[event.key] = true;

    if (event.key === " ") {
      this.createProjectile();
    }
  }

  handleKeyUp(event) {
    this.keysPressed[event.key] = false;

    if (
      !this.keysPressed["ArrowLeft"] &&
      !this.keysPressed["a"] &&
      !this.keysPressed["ArrowRight"] &&
      !this.keysPressed["d"]
    ) {
      this.player.moving = false;
    }
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

    this.lastProjectileTime = now;
  }

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

  showInvadersGrid() {
    this.invadersGrid.gridVisible = true;
  }
}
