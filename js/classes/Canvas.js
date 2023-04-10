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

  drawBackground() {
    this.context.drawImage(
      this.backgroundImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  setBackground(backgroundImage) {
    this.backgroundImage = new Image();
    this.backgroundImage.src = backgroundImage;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fadeOut(duration, callback) {
    const startTime = performance.now();
    let fade = 0;

    const animate = (currentTime) => {
      const progress = currentTime - startTime;
      const ratio = progress / (duration * 1000);

      fade = Math.min(1, ratio);

      this.context.fillStyle = `rgba(0, 0, 0, ${fade})`;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (fade < 1) {
        requestAnimationFrame(animate);
      } else {
        callback();
      }
    };

    requestAnimationFrame(animate);
  }

  fadeIn(duration, callback) {
    const startTime = performance.now();
    let fade = 1;

    const animate = (currentTime) => {
      const progress = currentTime - startTime;
      const ratio = progress / (duration * 1000);

      fade = Math.max(0, 1 - ratio);

      this.context.fillStyle = `rgba(0, 0, 0, ${fade})`;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (fade > 0) {
        requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    };

    requestAnimationFrame(animate);

    if (fade === 0 && callback) {
      callback();
    }
  }
}
