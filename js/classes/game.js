import Canvas from "./Canvas.js";
import Player from "./Player.js";
import Projectiles from "./Projectiles.js";

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    this.player = new Player();
    this.projectiles = [];

    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  draw() {
    this.canvas.clear();
    this.canvas.drawBackground();
    this.player.draw(this.canvas.context);

    // Draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(this.canvas.context);
    });

    if (this.player.moving) {
      this.player.move();
    }
  }

  handleKeyDown(event) {
    this.player.moving = true;

    switch (event.key) {
      case "ArrowLeft":
      case "a":
        this.player.moveLeft();
        break;
      case "ArrowRight":
      case "d":
        this.player.moveRight();
        break;
      case " ":
        this.createProjectile();
        break;
    }
  }

  handleKeyUp(event) {
    this.player.moving = false;
  }

  createProjectile() {
    const position = {
      x: this.player.position.x + this.player.sprite.scaledWidth / 2 - 2.5,
      y: this.player.position.y,
    };
    const velocity = {
      x: 0,
      y: -10,
    };
    const projectile = new Projectiles(position, velocity);
    this.projectiles.push(projectile);
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.projectiles = this.projectiles.filter((projectile) => {
      return projectile.position.y > -projectile.height;
    });
  }
}
