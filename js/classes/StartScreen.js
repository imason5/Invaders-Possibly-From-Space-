export default class StartScreen {
  constructor(game) {
    this.startButton = document.getElementById("startButton");
    this.game = game;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.startButton.addEventListener(
      "click",
      this.fadeOutStartScreen.bind(this)
    );

    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.fadeOutStartScreen();
      }
    });
  }

  fadeOutStartScreen() {
    this.startButton.style.opacity = "0";
    this.fadeOutBackground();

    setTimeout(() => {
      this.startButton.style.display = "none";
    }, 1000);
  }

  fadeOutBackground() {
    const startScreenOpacity = { value: 1 };

    this.game.canvas.setLevel1Image();

    const animateOpacity = () => {
      startScreenOpacity.value -= 0.02;

      this.game.canvas.setStartScreenOpacity(startScreenOpacity.value);

      if (startScreenOpacity.value > 0) {
        requestAnimationFrame(animateOpacity);
      } else {
        this.game.canvas.setLevelBackground(1);
      }
    };

    animateOpacity();
  }
}
