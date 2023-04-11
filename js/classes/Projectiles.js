export default class Projectiles {
  constructor(position, velocity, fireInterval) {
    this.position = position;
    this.velocity = velocity;
    this.width = 5;
    this.height = 10;
    this.fireInterval = fireInterval; // fire interval in milliseconds
    this.lastFireTime = 0; // timestamp of the last time a projectile was fired
  }

  draw(context) {
    context.fillStyle = "#fff";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  canFire(currentTime) {
    // Returns true if the player can fire a projectile based on the fire interval
    return currentTime - this.lastFireTime >= this.fireInterval;
  }

  fire(currentTime) {
    // Updates the lastFireTime property and returns a new projectile instance
    this.lastFireTime = currentTime;
    return new Projectiles(
      { x: this.position.x, y: this.position.y },
      { x: 0, y: -10 }
    );
  }
}
