export default class RestartScreen {
  constructor(canvas, message, game) {
    this.canvas = canvas;
    this.message = message;
    this.game = game;
    this.restartButton = document.querySelector("#restartButton");
  }

  draw() {
    const ctx = this.canvas.context;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  hideButton() {
    this.restartButton.classList.add("hidden");
    this.restartButton.removeEventListener(
      "click",
      this.handleRestartButtonClick
    );
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  showButton() {
    this.restartButton.classList.remove("hidden");
    this.handleRestartButtonClick = (event) => {
      this.hideButton();
      this.game.resetGame();
      this.game.startGame();
    };
    this.handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.restartButton.click();
      }
    };
    this.restartButton.addEventListener("click", this.handleRestartButtonClick);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleRestartButtonClick() {
    this.hideButton();
    this.game.resetGame();
    this.game.startGame();
  }
}
