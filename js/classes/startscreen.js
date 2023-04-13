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

    const startFadeOut = () => {
      this.game.canvas.fadeOut(1, () => {
        this.startButton.style.display = "none";
        this.game.canvas.setLevelBackground(1);
        this.game.showInvadersGrid();
        this.game.player.visible = true;
        this.game.soundManager.play("backgroundMusic");

        this.game.canvas.fadeIn(1, () => {
          this.game.gameStarted = true;
          this.game.invadersGrid.startInvadersMovement();
          this.game.player.playerReadyToFire = true;
          this.game.score.scoreVisible = true;
        });
      });
    };

    requestAnimationFrame(startFadeOut);
  }

  showButton() {
    this.startButton.style.display = "block";
    this.startButton.style.opacity = "1";
    console.log(this.startButton);
  }

  isButtonHidden() {
    return this.button.classList.contains("hidden");
  }
}
