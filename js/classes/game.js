import Canvas from "./Canvas.js";
import Player from "./Player.js"; 

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    this.player = new Player(); 
  }

  draw() {
    this.canvas.clear();
    this.canvas.drawBackground();
    this.player.draw(this.canvas.context); // Draw the player on the canvas
  }
}
