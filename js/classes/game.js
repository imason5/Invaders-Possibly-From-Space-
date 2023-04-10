import Canvas from "./Canvas.js";
import Player from "./Player.js";

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
    this.player = new Player();
    this.gameStarted = false;
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));
  }
  draw() {
    this.canvas.clear();
    this.canvas.drawBackground();
    this.player.draw(this.canvas.context);
    this.player.animate();
  }

  handleKeyDown(event) {
    switch (event.type) {
      case "keydown":
        switch (event.key) {
          case "ArrowLeft":
          case "a":
            this.player.moveLeft();
            break;
          case "ArrowRight":
          case "d":
            this.player.moveRight();
            break;
        }
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.type) {
      case "keyup":
        switch (event.key) {
          case "ArrowLeft":
          case "a":
          case "ArrowRight":
          case "d":
            break;
        }
        break;
    }
  }
}
