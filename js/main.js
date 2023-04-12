import Game from "/js/classes/game.js";
import StartScreen from "/js/classes/startscreen.js";

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
  "/images/bg.png",
  // Add any other images that need to be preloaded
];

preloadImages(imageSources, () => {
  const game = new Game(0);
  const startScreen = new StartScreen(game);
  game.startScreen = startScreen;

  game.startGame(); // Start the game loop
});
