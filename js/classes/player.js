import Sprite from "./Sprite.js";

export default class Player {
  constructor() {
    this.position = { x: 200, y: 600 }; // Change the initial y position to 600
    this.velocity = { x: 0 };
    this.sprite = new Sprite("/images/sprites.png", 23, 108, 108, 64);
  }

  draw(context) {
    this.sprite.draw(context, this.position.x, this.position.y);
  }
}
