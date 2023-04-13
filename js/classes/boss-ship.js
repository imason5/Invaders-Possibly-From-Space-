export default class BossShip {
  constructor(context) {
    this.image = new Image();
    this.image.src = "/images/lrrr.png";
    this.context = context;
    this.width = 64;
    this.height = 48;
    this.scalingFactor = 2;
    this.scaledWidth = this.width * this.scalingFactor;
    this.scaledHeight = this.height * this.scalingFactor;
    this.points = 100;
    this.position = { x: -this.scaledWidth, y: 50 };
    this.velocity = { x: 3, y: 0 };
    this.shouldAppear = false;
    this.interval = null;
  }

  get canvas() {
    return this.context.canvas;
  }

  start() {
    this.initInterval();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    this.shouldAppear = false;
    this.resetPosition();
  }

  initInterval() {
    this.interval = setInterval(() => {
      this.shouldAppear = !this.shouldAppear;
      this.resetPosition();
    }, 15000);
  }

  update() {
    if (!this.shouldAppear) {
      return;
    }

    this.position.x += this.velocity.x;

    if (this.position.x >= this.canvas.width) {
      this.shouldAppear = false;
      this.resetPosition();
    }
  }

  draw() {
    if (!this.shouldAppear) {
      return;
    }

    this.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.scaledWidth,
      this.scaledHeight
    );
  }

  resetPosition() {
    if (this.shouldAppear) {
      this.position.x = -this.scaledWidth;
    } else {
      this.position.x = this.canvas.width;
    }
  }
}
