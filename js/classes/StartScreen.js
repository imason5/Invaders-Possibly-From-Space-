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

    setTimeout(() => {
      this.startButton.style.display = "none";
      this.game.canvas.setLevelBackground(1);
    }, 1000);
  }
}
