export default class Projectiles {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
    this.width = 5;
    this.height = 10;
  }

  draw(context) {
    context.fillStyle = "#fff";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
