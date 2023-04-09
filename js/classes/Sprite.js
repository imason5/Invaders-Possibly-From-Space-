function isDarkPixel(r, g, b, a, darknessThreshold = 20) {
  return (
    r <= darknessThreshold &&
    g <= darknessThreshold &&
    b <= darknessThreshold &&
    a !== 0
  );
}

export default class Sprite {
  constructor(imagePath, x, y, width, height) {
    this.image = new Image();
    this.image.src = imagePath;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scalingFactor = 2;
    this.scaledWidth = this.width * this.scalingFactor;
    this.scaledHeight = this.height * this.scalingFactor;
  }

  draw(context, posX, posY, removeDarkPixels = true) {
    if (removeDarkPixels) {
      this.drawTransparent(context, posX, posY);
    } else {
      context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height,
        posX,
        posY,
        this.scaledWidth,
        this.scaledHeight
      );
    }
  }

  drawTransparent(context, posX, posY) {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );

    const imageData = tempCtx.getImageData(0, 0, this.width, this.height);
    const data = imageData.data;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = (y * this.width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        if (!isDarkPixel(r, g, b, a)) {
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
          context.fillRect(
            posX + x * this.scalingFactor,
            posY + y * this.scalingFactor,
            this.scalingFactor,
            this.scalingFactor
          );
        }
      }
    }
  }
}
