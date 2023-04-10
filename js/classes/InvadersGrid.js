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
      console.log(this.invadersGrid);
    }

    this.canvasContext = canvasContext;

    // Create off-screen canvas
    this.offscreenCanvas = document.createElement("canvas");
    this.offscreenCanvas.width = canvasContext.canvas.width;
    this.offscreenCanvas.height = canvasContext.canvas.height;
    this.offscreenContext = this.offscreenCanvas.getContext("2d");

    // Draw initial state of invaders on off-screen canvas
    this.drawOffscreen();
  }

  // Method for drawing invaders on the off-screen canvas
  drawOffscreen() {
    this.invadersGrid.forEach((invader) => {
      invader.draw(this.offscreenContext);
    });
  }

  // Method for updating the off-screen canvas when an invader is destroyed or moves
  updateOffscreen(invader) {
    // Clear the off-screen canvas and redraw all invaders except the destroyed one
    this.offscreenContext.clearRect(
      0,
      0,
      this.offscreenCanvas.width,
      this.offscreenCanvas.height
    );
    this.invadersGrid.forEach((inv) => {
      if (inv !== invader) {
        inv.draw(this.offscreenContext);
      }
    });
  }

  // Method for drawing the off-screen canvas to the main game canvas
  draw() {
    console.log("Drawing invaders grid");
    this.canvasContext.drawImage(this.offscreenCanvas, 0, 0);
  }
}
