import Sprite from "/js/classes/sprite.js";

export default class Player {
  constructor() {
    this.sprite = new Sprite("/images/sprites.png", 23, 108, 108, 64);
    this.velocity = { x: 0 };
    this.animationId = null;
    this.playerReadyToFire = true;
    this.renderedPlayer = null;
    this.visible = false;
    this.resetPosition();
  }

  get canvas() {
    return document.querySelector("#gameCanvas");
  }

  getInitialPosition() {
    return {
      x: this.canvas.width / 2 - this.sprite.scaledWidth / 2,
      y: this.canvas.height - this.sprite.scaledHeight,
    };
  }

  draw(context) {
    if (!this.visible) {
      return;
    }

    if (!this.renderedPlayer) {
      this.preRenderPlayerImage();
    }
    context.drawImage(this.renderedPlayer, this.position.x, this.position.y);
  }

  preRenderPlayerImage() {
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = this.sprite.scaledWidth;
    offscreenCanvas.height = this.sprite.scaledHeight;
    const offscreenContext = offscreenCanvas.getContext("2d");
    this.sprite.draw(offscreenContext, 0, 0);
    this.renderedPlayer = offscreenCanvas;
  }

  moveLeft() {
    this.setVelocity(-10);
  }

  moveRight() {
    this.setVelocity(10);
  }

  setVelocity(value) {
    this.velocity.x = value;
  }

  handlePlayerMovement(moving) {
    if (moving) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation() {
    if (!this.animationId) {
      this.animationId = requestAnimationFrame(
        this.updatePlayerPosition.bind(this)
      );
    }
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationId);
    this.animationId = null;
    this.lastFrameTime = null;
  }

  updatePlayerPosition() {
    // Calculate the new position based on the velocity
    const newX = this.position.x + this.velocity.x;

    const canvasWidth = this.canvas.width;
    const playerWidth = this.sprite.scaledWidth;

    // Update the player's x-position if it's within the canvas boundaries
    if (newX >= 0 && newX <= canvasWidth - playerWidth) {
      this.position.x = newX;
    }

    // Reset the velocity for the next frame
    this.velocity.x = 0;

    // Request the next animation frame and bind the current context
    this.animationId = requestAnimationFrame(
      this.updatePlayerPosition.bind(this)
    );
  }

  resetPosition() {
    this.position = this.getInitialPosition();
  }
}
