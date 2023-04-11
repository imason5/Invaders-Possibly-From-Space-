import Invaders from "./Invaders.js";

export default class InvadersGrid {
  constructor(canvasContext) {
    this.canvasContext = canvasContext;
    this.invadersGrid = this.createInvadersGrid();
    this.direction = "right";
    this.movementSpeed = 10;
    this.dropDownDistance = 30;
    this.speedFactor = 2; // Increase to make the invaders move faster
    this.lastUpdateTime = null;
    this.gridVisible = false;

    this.updateInvadersGrid = this.updateInvadersGrid.bind(this);
    requestAnimationFrame(this.updateInvadersGrid);

    this.offscreenCanvas = document.createElement("canvas"); // Using offscreen canvas to draw the grid for performance
    this.offscreenCanvas.width = canvasContext.canvas.width;
    this.offscreenCanvas.height = canvasContext.canvas.height;
    this.offscreenContext = this.offscreenCanvas.getContext("2d");
    this.drawOffscreen();
  }

  createInvadersGrid() {
    // Grid layout
    const invadersPerRow = 11;
    const rows = 5;
    const invaderWidth = 32;
    const invaderHeight = 24;
    const gapX = 30;
    const gapY = 30;
    // Starting position of the grid
    const gridWidth =
      invadersPerRow * invaderWidth + (invadersPerRow - 1) * gapX;
    const startX = (this.canvasContext.canvas.width - gridWidth) / 2;
    const startY = 50;
    const grid = [];

    // Invader creation - could refactor to allow for different grid layouts
    for (let row = 0; row < rows; row++) {
      let invaderType = row < 1 ? "small" : row < 3 ? "medium" : "large";
      let invaderY = startY + (invaderHeight + gapY) * row;

      for (let col = 0; col < invadersPerRow; col++) {
        let invaderX = startX + (invaderWidth + gapX) * col;
        let invader = new Invaders(invaderType, { x: invaderX, y: invaderY });
        grid.push(invader);
      }
    }

    return grid;
  }

  drawOffscreen() {
    // Handles the drawing of the grid to the offscreen canvas
    this.offscreenContext.clearRect(
      0,
      0,
      this.offscreenCanvas.width,
      this.offscreenCanvas.height
    );
    this.invadersGrid.forEach((invader) => invader.draw(this.offscreenContext));
  }

  draw() {
    if (this.gridVisible) {
      this.canvasContext.drawImage(this.offscreenCanvas, 0, 0);
    }
  }

  update() {
    // Used to prevent grid from moving before the player is in position
    if (!this.moving) {
      return;
    }
    this.move();
  }

  move() {
    // Calculate the horizontal movement based on the direction and speed
    const horizontalMovement =
      this.direction === "right"
        ? this.movementSpeed * this.speedFactor
        : -this.movementSpeed * this.speedFactor;

    // Check if any invader has reached the edge of the screen
    let edgeReached = this.invadersGrid.some((invader) => {
      const futureX = invader.position.x + horizontalMovement;
      return (
        futureX <= 0 ||
        futureX + invader.sprite.scaledWidth >= this.canvasContext.canvas.width
      );
    });

    // Move the invaders horizontally and vertically if necessary
    this.invadersGrid.forEach((invader) => {
      invader.position.x += edgeReached ? 0 : horizontalMovement;
      invader.position.y += edgeReached ? this.dropDownDistance : 0;
    });

    // Change the direction if any invader has reached the edge of the screen
    if (edgeReached) {
      this.direction = this.direction === "right" ? "left" : "right";
    }

    this.drawOffscreen();
  }

  updateInvadersGrid(currentTime) {
    // Calculate the time elapsed since the last update
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = currentTime;
    }
    const timeElapsed = currentTime - this.lastUpdateTime;

    // Update the invaders grid every 500ms
    if (timeElapsed >= 500 && this.gridVisible) {
      this.update();
      this.lastUpdateTime = currentTime;
    }
    requestAnimationFrame(this.updateInvadersGrid);
  }

  startInvadersMovement() {
    this.moving = true;
  }
}
