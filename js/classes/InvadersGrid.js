import Invaders from "./Invaders.js";

export default class InvadersGrid {
  constructor(canvasContext) {
    this.invadersGrid = [];

    const invadersPerRow = 11;
    const rows = 5;
    const startX = 50; // Starting x position of the grid
    const startY = 50; // Starting y position of the grid
    const invaderWidth = 32; // Width of each invader
    const invaderHeight = 24; // Height of each invader
    const gapX = 30; // Gap between invaders in the same row
    const gapY = 30; // Gap between rows

    for (let row = 0; row < rows; row++) {
      let invaderType = "";
      let invaderY = startY + (invaderHeight + gapY) * row;

      if (row < 1) {
        invaderType = "small";
      } else if (row < 3) {
        invaderType = "medium";
      } else {
        invaderType = "large";
      }

      for (let col = 0; col < invadersPerRow; col++) {
        let invaderX = startX + (invaderWidth + gapX) * col;

        let invader = new Invaders(invaderType, { x: invaderX, y: invaderY });
        this.invadersGrid.push(invader);
      }
    }

    this.canvasContext = canvasContext;
  }

  draw() {
    this.invadersGrid.forEach((invader) => {
      invader.draw(this.canvasContext);
    });
  }
}
