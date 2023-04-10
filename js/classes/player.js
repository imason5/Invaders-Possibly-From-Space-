import Sprite from "./Sprite.js";

export default class Player {
  constructor() {
    this.position = { x: -108, y: 600 }; // Change the initial x position to -108 (offscreen)
    this.velocity = { x: 0 };
    this.sprite = new Sprite("/images/sprites.png", 23, 108, 108, 64);
  }

  draw(context) {
    this.sprite.draw(context, this.position.x, this.position.y);
  }

 
  moveFromLeft() {
    const startPosition = -this.sprite.scaledWidth;
    const canvasWidth = (this.canvasWidth =
      document.querySelector("#gameCanvas").width);
    const endPosition = (canvasWidth - this.sprite.scaledWidth) / 2;
    const moveDuration = 2000; // Move duration in milliseconds
    const startTime = performance.now();

    const movePlayer = (currentTime) => {
      const progress = currentTime - startTime;
      const ratio = progress / moveDuration;

      this.position.x = startPosition + (endPosition - startPosition) * ratio;

      if (this.position.x < endPosition) {
        requestAnimationFrame(movePlayer);
      } else {
        this.position.x = endPosition; 
      }
    };

    requestAnimationFrame(movePlayer);
  }
}
