function isDarkPixel(r, g, b, a, darknessThreshold = 20) {
  // Helper function to determine if a pixel is dark enough to be considered transparent
  // Needed to remove the black background from the sprites
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
    this.scalingFactor = 1;
    this.scaledWidth = this.width * this.scalingFactor;
    this.scaledHeight = this.height * this.scalingFactor;
  }

  draw(context, posX, posY, removeDarkPixels = true) {
    if (removeDarkPixels) {
      // If removeDarkPixels is true, the sprite will be drawn with the drawTransparent method.
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
    // Creates a temporary canvas to draw the sprite on,
    // then uses the getImageData method to get the pixel data,
    // loops through each pixel to check if it is dark enough to be considered transparent
    // and if so, sets the alpha value to 0, to make it transparent.
    // The updated pixel data is then drawn to the temporary canvas.
    // The temporary canvas is then drawn to the main canvas context.
    context.save();

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = this.scaledWidth;
    tempCanvas.height = this.scaledHeight;
    const tempContext = tempCanvas.getContext("2d");

    tempContext.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      0,
      0,
      this.scaledWidth,
      this.scaledHeight
    );

    const imageData = tempContext.getImageData(
      0,
      0,
      this.scaledWidth,
      this.scaledHeight
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      if (isDarkPixel(data[i], data[i + 1], data[i + 2], data[i + 3])) {
        data[i + 3] = 0;
      }
    }

    tempContext.putImageData(imageData, 0, 0);

    context.drawImage(
      tempCanvas,
      posX,
      posY,
      this.scaledWidth,
      this.scaledHeight
    );

    context.restore();
  }
}
