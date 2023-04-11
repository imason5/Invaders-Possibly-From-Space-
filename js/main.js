import Game from "/js/classes/game.js";
import StartScreen from "/js/classes/startscreen.js";

const game = new Game(0);
const startScreen = new StartScreen(game);

// main.js
function preloadImages(sources, callback) {
  let loadedImages = 0;
  let images = [];

  sources.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === sources.length) {
        callback();
      }
    };
    images.push(img);
  });
}

const imageSources = [
  "/images/sprites.png",
  // Add any other images that need to be preloaded
];

preloadImages(imageSources, () => {
  const game = new Game(0);
  const startScreen = new StartScreen(game);

  function gameLoop() {
    if (game.gameStarted) {
      game.updateProjectiles();
    }
    game.draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});

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
