import Sprite from "./Sprite.js";

export default class Player {
  constructor() {
    this.position = { x: -108, y: 600 };
    this.velocity = { x: 0 };
    this.sprite = new Sprite("/images/sprites.png", 23, 108, 108, 64);
    this.readyToAnimate = false;
    this.moving = false;

    this.animationId = null;
    this.lastFrameTime = null;
    this.animate = this.animate.bind(this);
  }

  draw(context) {
    this.sprite.draw(context, this.position.x, this.position.y);
  }

  moveFromLeft(callback) {
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
        if (callback) {
          callback();
        }
      }
    };

    requestAnimationFrame(movePlayer);
  }

  moveLeft() {
    this.velocity.x = -10;
  }

  moveRight() {
    this.velocity.x = 10;
  }

  animate(currentTime) {
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

    this.animationId = requestAnimationFrame(this.animate);
  }

  startAnimating() {
    this.animationId = requestAnimationFrame(this.animate);
  }

  stopAnimating() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.lastFrameTime = null;
  }

  move() {
    const newX = this.position.x + this.velocity.x;

    const canvasWidth = document.querySelector("#gameCanvas").width;
    const playerWidth = this.sprite.scaledWidth;
    const minX = 0;
    const maxX = canvasWidth - playerWidth;
    this.position.x = Math.min(Math.max(newX, minX), maxX);

    this.velocity.x = 0;
  }
}
