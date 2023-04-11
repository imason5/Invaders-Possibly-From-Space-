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
      y: 4, // Modify to change the speed of the bombs
    };

    return new Bomb(position, velocity);
  }
}
