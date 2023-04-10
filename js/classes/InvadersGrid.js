import Invaders from "./Invaders.js";

export default class InvadersGrid {
  constructor(canvasContext) {
    this.invadersGrid = [
      new Invaders("small", { x: 50, y: 50 }),
      new Invaders("medium", { x: 150, y: 50 }),
      new Invaders("large", { x: 250, y: 50 }),
    ];

    this.canvasContext = canvasContext;
  }

  draw() {
    this.invadersGrid.forEach((invader) => {
      invader.draw(this.canvasContext);
    });
  }
}
