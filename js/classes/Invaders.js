import Sprite from "./Sprite.js";

export default class Invaders {
  constructor(type, position, scale = 0.5) {
    this.position = position;
    this.scale = scale;

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
    this.sprite.draw(context, this.position.x, this.position.y);
  }
}
