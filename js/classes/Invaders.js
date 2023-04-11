import Sprite from "/js/classes/Sprite.js";

export default class Invaders {
  constructor(type, position, scale = 0.5) {
    this.position = position;
    this.scale = scale;
    this.sprite = new Sprite();
    this.renderedInvader = null;

    switch (type) {
      case "small":
        this.sprite = new Sprite("/images/sprites.png", 394, 477, 76, 66);
        break;
      case "medium":
        this.sprite = new Sprite("/images/sprites.png", 380, 581, 98, 63);
        break;
      case "large":
        this.sprite = new Sprite("/images/sprites.png", 370, 686, 102, 69);
        break;
      default:
        throw new Error(`Invalid invader type: ${type}`);
    }
    this.sprite.scalingFactor = this.scale;
    this.sprite.scaledWidth = this.sprite.width * this.scale;
    this.sprite.scaledHeight = this.sprite.height * this.scale;
  }

  draw(context) {
    if (!this.renderedInvader) {
      // If the invader has not been rendered yet, draw it to an off-screen canvas
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = this.sprite.scaledWidth;
      offscreenCanvas.height = this.sprite.scaledHeight;
      const offscreenContext = offscreenCanvas.getContext("2d");
      this.sprite.drawTransparent(offscreenContext, 0, 0);

      // Store the rendered invader image data
      this.renderedInvader = offscreenCanvas;
    }

    // Draw the pre-rendered invader image data on the main context
    context.drawImage(this.renderedInvader, this.position.x, this.position.y);
  }
}
