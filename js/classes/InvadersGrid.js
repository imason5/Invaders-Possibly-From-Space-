import Invaders from "./Invaders.js";

export default class InvadersGrid {
  constructor(canvasContext) {
    this.invadersGrid = [];

    const invadersPerRow = 11;
    const rows = 5;

    const invaderWidth = 32; // Width of each invader
    const invaderHeight = 24; // Height of each invader
    const gapX = 30; // Gap between invaders in the same row
    const gapY = 30; // Gap between rows

    // Calculate the total width of the grid
    const gridWidth =
      invadersPerRow * invaderWidth + (invadersPerRow - 1) * gapX;

    // Calculate the starting x position to center the grid horizontally
    const startX = (canvasContext.canvas.width - gridWidth) / 2;
    const startY = 50; // Starting y position of the grid

    this.direction = "right";
    this.movementSpeed = 10;
    this.dropDownDistance = 30;

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

    this.gridPosition = { x: 0, y: 0 };

    // Draw initial state of invaders on off-screen canvas
    this.drawOffscreen();
  }

  // Draw invaders on the off-screen canvas
  drawOffscreen() {
    this.invadersGrid.forEach((invader) => {
      invader.draw(this.offscreenContext);
    });
  }

  updateOffscreen(invader) {
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

  // Drawing the off-screen canvas to the main game canvas
  draw() {
    if (this.gridVisible) {
      this.canvasContext.drawImage(this.offscreenCanvas, 0, 0);
    }
    console.log("Drawing invaders grid");
  }

  move() {
    const deltaX =
      this.direction === "right" ? this.movementSpeed : -this.movementSpeed;

    let edgeReached = false;

    // Check if any invader reaches the edge
    this.invadersGrid.forEach((invader) => {
      const futureX = invader.position.x + deltaX;
      if (
        !edgeReached &&
        (futureX <= 0 ||
          futureX + invader.sprite.scaledWidth >=
            this.canvasContext.canvas.width)
      ) {
        edgeReached = true;
      }
    });

    // Calculate future positions based on edgeReached
    let futurePositions = this.invadersGrid.map((invader) => {
      const futureX = invader.position.x + deltaX;
      return {
        x: futureX,
        y: edgeReached
          ? invader.position.y + this.dropDownDistance
          : invader.position.y,
      };
    });

    // Clear the off-screen canvas
    this.offscreenContext.clearRect(
      0,
      0,
      this.offscreenCanvas.width,
      this.offscreenCanvas.height
    );

    // Update the invaders' positions
    this.invadersGrid.forEach((invader, index) => {
      invader.position = futurePositions[index];
    });

    if (edgeReached) {
      this.direction = this.direction === "right" ? "left" : "right";
    }

    this.drawOffscreen();
  }
  update() {
    this.move();
  }
}
