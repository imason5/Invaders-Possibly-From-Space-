export default class Projectiles {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
    this.width = 5;
    this.height = 10;
  }

  draw(context) {
    context.fillStyle = "#fff"; // Change this to change the color of the projectiles.
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    // Updates the position of the projectile based on its velocity.
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
