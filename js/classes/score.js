export default class Score {
  constructor() {
    this.value = 0;
  }

  increase(amount) {
    this.value += amount;
  }

  reset() {
    this.value = 0;
  }

  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${this.value}`, 10, 30);
  }
}
