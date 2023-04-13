export default class Score {
  constructor() {
    this.value = 0;
    this.scoreVisible = false;
  }

  increase(amount) {
    this.value += amount;
  }

  reset() {
    this.value = 0;
  }

  draw(ctx) {
    if (this.scoreVisible) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${this.value}`, 10, 30);
    }
  }

  toggleVisibility() {
    this.scoreVisible = !this.scoreVisible;
  }
}
