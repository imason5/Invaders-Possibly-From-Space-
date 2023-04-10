export default class Invader {
  constructor(position, spriteCoords) {
    this.position = position;
    this.spriteCoords = spriteCoords;
    this.sprite = new Image();
    this.sprite.src = "/images/sprites.png"; // Replace with your actual sprite sheet path
  }

  draw(context) {
    const [sx, sy, sw, sh] = this.spriteCoords;
    const [dx, dy] = this.position;
    const dw = sw;
    const dh = sh;

    context.drawImage(this.sprite, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}
