import Canvas from "./Canvas.js";

export default class Game {
  constructor(level) {
    this.canvas = new Canvas(document.querySelector("#gameCanvas"), level);
  }

  draw() {
    this.canvas.clear();
    this.canvas.drawBackground();
  }
}
