import Sprite from "./Sprite.js";

export default class Player {
  constructor() {
    this.position = { x: -108, y: 600 };
    this.velocity = { x: 0 };
    this.sprite = new Sprite("/images/sprites.png", 23, 108, 108, 64);
    this.readyToAnimate = false; // Used to prevent the player from moving before the enter animation has finished.
    this.moving = false;

    this.animationId = null;
    this.lastFrameTime = null;
    this.animate = this.animate.bind(this);

    this.renderedPlayer = null;
  }

  draw(context) {
    if (!this.renderedPlayer) {
      // Pre rendering the player image to an off-screen canvas for performance.
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = this.sprite.scaledWidth;
      offscreenCanvas.height = this.sprite.scaledHeight;
      const offscreenContext = offscreenCanvas.getContext("2d");
      this.sprite.draw(offscreenContext, 0, 0);
      this.renderedPlayer = offscreenCanvas;
    }
    context.drawImage(this.renderedPlayer, this.position.x, this.position.y);
  }

  moveFromLeft(callback) {
    // Animates the opening move of the player sprite to the center of the screen.
    const startPosition = -this.sprite.scaledWidth;
    const canvasWidth = (this.canvasWidth =
      document.querySelector("#gameCanvas").width);
    const endPosition = (canvasWidth - this.sprite.scaledWidth) / 2;
    const moveDuration = 2000;

    const startTime = performance.now();

    const movePlayer = (currentTime) => {
      const progress = currentTime - startTime;
      const ratio = progress / moveDuration;
      this.position.x = startPosition + (endPosition - startPosition) * ratio;

      if (this.position.x < endPosition) {
        requestAnimationFrame(movePlayer);
      } else {
        this.position.x = endPosition;
        this.readyToAnimate = false;
        this.playerReadyToFire = true; // Used to prevent the player from firing before the enter animation has finished.
        if (callback) {
          callback();
        }
      }
    };

    requestAnimationFrame(movePlayer);
  }

  moveLeft() {
    this.velocity.x = -10; // Change this to change the speed of the player.
  }

  moveRight() {
    this.velocity.x = 10; // Change this to change the speed of the player.
  }

  animate(currentTime) {
    // Used to animate the player's movement.
    // It calculates the new position based on the player's velocity and the time elapsed since the last frame.
    // It also makes sure the player stays within the bounds of the canvas.
    if (!this.lastFrameTime) {
      this.lastFrameTime = currentTime;
    }

    const deltaTime = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    const newX = this.position.x + this.velocity.x * (deltaTime / 16.67);

    const canvasWidth = document.querySelector("#gameCanvas").width;
    const playerWidth = this.sprite.scaledWidth;
    const minX = 0;
    const maxX = canvasWidth - playerWidth;
    this.position.x = Math.min(Math.max(newX, minX), maxX);

    this.velocity.x = 0;

    // Recursively calls itself to continue the animation loop.
    this.animationId = requestAnimationFrame(this.animate);
  }

  startAnimating() {
    // Starts the animation loop.
    this.animationId = requestAnimationFrame(this.animate);
  }

  stopAnimating() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.lastFrameTime = null;
  }

  move() {
    // Updates the player's position based on its velocity.
    const newX = this.position.x + this.velocity.x;

    const canvasWidth = document.querySelector("#gameCanvas").width;
    const playerWidth = this.sprite.scaledWidth;
    const minX = 0;
    const maxX = canvasWidth - playerWidth;
    this.position.x = Math.min(Math.max(newX, minX), maxX);

    this.velocity.x = 0;
  }
}
