import Sprite from "./Sprite.js";

export default class Invaders {
  constructor(type, position) {
    this.position = position;

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
  }

  draw(context) {
    this.sprite.draw(context, this.position.x, this.position.y);
  }
}
