import Bullet from "./classes/Bullets.js";
import Canvas from "./classes/Canvas.js";
import Game from "./classes/Game.js";
import Invader from "./classes/Invader.js";
import Player from "./classes/Player.js";
import Shield from "./classes/Shield.js";

const game = new Game(1);

function gameLoop() {
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
