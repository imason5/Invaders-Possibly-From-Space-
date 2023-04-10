import Game from "./classes/Game.js";
import StartScreen from "./classes/StartScreen.js";

const game = new Game(0);
const startScreen = new StartScreen(game);

function gameLoop() {
  // Main loop function of the game.
  // Updates the projectiles if the game has started
  if (game.gameStarted) {
    game.updateProjectiles();
  }
  // Updates the canvas and calls itself again.
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
