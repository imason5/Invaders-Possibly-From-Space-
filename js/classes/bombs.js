import Sprite from "./sprite.js";

export default class Bomb {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
    this.width = 5;
    this.height = 15;
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Static method to create a new Bomb object with a specific position
  static dropBomb(position) {
    const velocity = {
      x: 0,
      y: 3, // Modify to change the speed of the bombs
    };

    return new Bomb(position, velocity);
  }
}

export class WigglyBomb extends Bomb {
  constructor(position, velocity, scalingFactor = 2.5) {
    super(position, velocity);
    this.sprite = new Sprite("/images/sprites.png", 171, 609, 5, 12);
    this.sprite.scalingFactor = scalingFactor;
    this.sprite.scaledWidth = this.sprite.width * this.sprite.scalingFactor;
    this.sprite.scaledHeight = this.sprite.height * this.sprite.scalingFactor;
    this.sprite2 = new Sprite("/images/sprites.png", 171, 630, 5, 12);
    this.sprite2.scalingFactor = scalingFactor;
    this.sprite2.scaledWidth = this.sprite2.width * this.sprite2.scalingFactor;
    this.sprite2.scaledHeight =
      this.sprite2.height * this.sprite2.scalingFactor;
    this.animationDuration = 500; // Time in milliseconds between sprite changes
  }

  draw(context) {
    const currentTime = Date.now();
    const showSprite2 = Math.floor(currentTime / this.animationDuration) % 2;

    if (showSprite2) {
      this.sprite2.draw(context, this.position.x, this.position.y);
    } else {
      this.sprite.draw(context, this.position.x, this.position.y);
    }
  }
}
