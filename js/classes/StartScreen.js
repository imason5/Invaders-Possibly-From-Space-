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
    // Fades out the start screen and starts the game.
    this.startButton.style.opacity = "0";

    const startFadeOut = () => {
      this.game.canvas.fadeOut(1, () => {
        // 1 is the duration of the fadeout
        this.startButton.style.display = "none";
        this.game.canvas.setLevelBackground(1);
        this.game.showInvadersGrid();

        this.game.canvas.fadeIn(1, () => {
          // 1 is the duration of the fadein
          this.game.player.moveFromLeft(() => {
            // Moves the player from the left side of the screen to the center
            this.game.gameStarted = true;
            this.game.invadersGrid.startInvadersMovement();
          });
        });
      });
    };

    requestAnimationFrame(startFadeOut);
  }
}
