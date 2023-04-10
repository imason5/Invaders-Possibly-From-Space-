import Canvas from "./Canvas.js";
import Player from "./Player.js";

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    this.player = new Player();

    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.code === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }

  draw() {
    this.canvas.clear();
    this.canvas.drawBackground();
    this.player.draw(this.canvas.context); // Draw the player on the canvas
    this.player.animate(); // Update the player's position
  }
}
