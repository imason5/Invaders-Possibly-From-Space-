import Game from "./classes/Game.js";
import StartScreen from "./classes/StartScreen.js";

const game = new Game(0);
const startScreen = new StartScreen(game);

function gameLoop() {
  if (game.gameStarted) {
  }
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
