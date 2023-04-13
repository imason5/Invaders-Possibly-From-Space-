// Invaders.js
import Sprite from "/js/classes/sprite.js";

export default class Invaders {
  constructor(type, position, scale = 0.5) {
    this.position = position;
    this.scale = scale;
    this.sprite = new Sprite();
    this.renderedSprites = [null, null];
    this.currentSpriteIndex = 0;

    switch (type) {
      case "small":
        this.sprite = new Sprite("/images/sprites.png", 394, 477, 76, 66);
        this.alternateSprite = new Sprite(
          "/images/sprites.png",
          490,
          477,
          76,
          66
        );
        break;
      case "medium":
        this.sprite = new Sprite("/images/sprites.png", 380, 581, 98, 63);
        this.alternateSprite = new Sprite(
          "/images/sprites.png",
          480,
          581,
          98,
          63
        );
        break;
      case "large":
        this.sprite = new Sprite("/images/sprites.png", 370, 686, 102, 69);
        this.alternateSprite = new Sprite(
          "/images/sprites.png",
          480,
          686,
          102,
          69
        );
        break;
      default:
        throw new Error(`Invalid invader type: ${type}`);
    }

    this.sprite.scalingFactor = this.scale;
    this.sprite.scaledWidth = this.sprite.width * this.scale;
    this.sprite.scaledHeight = this.sprite.height * this.scale;
    this.alternateSprite.scalingFactor = this.scale;
    this.alternateSprite.scaledWidth = this.alternateSprite.width * this.scale;
    this.alternateSprite.scaledHeight =
      this.alternateSprite.height * this.scale;

    this.animationDuration = 500; // Time in milliseconds between sprite changes
    this.lastSpriteSwitch = Date.now();
  }

  draw(context) {
    const currentTime = Date.now();
    const timeElapsed = currentTime - this.lastSpriteSwitch;

    if (timeElapsed >= this.animationDuration) {
      this.currentSpriteIndex = 1 - this.currentSpriteIndex;
      this.lastSpriteSwitch = currentTime;
    }

    if (!this.renderedSprites[this.currentSpriteIndex]) {
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = this.sprite.scaledWidth;
      offscreenCanvas.height = this.sprite.scaledHeight;
      const offscreenContext = offscreenCanvas.getContext("2d");

      const targetSprite =
        this.currentSpriteIndex === 0 ? this.sprite : this.alternateSprite;
      targetSprite.drawTransparent(offscreenContext, 0, 0);

      this.renderedSprites[this.currentSpriteIndex] = offscreenCanvas;
    }

    context.drawImage(
      this.renderedSprites[this.currentSpriteIndex],
      this.position.x,
      this.position.y
    );
  }
}
