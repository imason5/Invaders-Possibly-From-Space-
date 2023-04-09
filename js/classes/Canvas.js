export default class Canvas {
  constructor(canvasElement, level) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext("2d");

    this.setLevelBackground(level);
  }

  setLevelBackground(level) {
    let bgImage = "";

    switch (level) {
      case 0:
        bgImage = "/images/start.jpg";
        break;
      case 1:
        bgImage = "/images/bg.png";
        break;
      case 2:
        bgImage = "./backgrounds/level2.png";
        break;
      case 3:
        bgImage = "./backgrounds/level3.png";
        break;
      default:
        bgImage = "/images/start.jpg";
        break;
    }

    this.level = level;
    this.setBackground(bgImage);
  }

  getLevel() {
    return this.level;
  }

  setStartScreenOpacity(opacity) {
    this.startScreenOpacity = opacity;
  }

  setLevel1Opacity(opacity) {
    this.level1Opacity = opacity;
  }

  drawBackground() {
    this.context.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    if (this.getLevel() === 1 && this.startScreenOpacity > 0) {
      this.context.globalAlpha = this.startScreenOpacity;
      this.context.drawImage(
        this.level1Image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.context.globalAlpha = 1;
    }
  }

  // ...
  setBackground(backgroundImage, callback) {
    this.backgroundImage = new Image();
    this.backgroundImage.onload = callback;
    this.backgroundImage.src = backgroundImage;
  }

  setLevel1Image(callback) {
    this.level1Image = new Image();
    this.level1Image.onload = callback;
    this.level1Image.src = "/images/bg.png";
  }
  // ...

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
