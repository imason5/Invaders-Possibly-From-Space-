export default class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  checkCollisions() {
    this.checkProjectileCollisions();
    this.checkBombCollisions();
    this.checkInvadersReachedPlayer();
  }

  // Checks collisions between projectiles and invaders
  checkProjectileCollisions() {
    const projectiles = this.game.projectiles;
    const invadersGrid = this.game.invadersGrid;

    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];

      for (let j = 0; j < invadersGrid.invadersGrid.length; j++) {
        const invader = invadersGrid.invadersGrid[j];

        if (invader && this.checkCollision(projectile, invader)) {
          const invaderScore = invader.sprite.points;
          this.game.score.increase(invaderScore);

          // Play the invader killed sound
          this.game.soundManager.play("invaderKilled");

          invadersGrid.removeInvader(j);
          projectiles.splice(i, 1);
          invadersGrid.drawOffscreen();

          if (invadersGrid.invadersGrid.length === 0) {
            this.game.gameWon = true;
            console.log("Game Won");
          }

          i--;
          break;
        }
      }
    }
  }

  // Checks collisions between bombs and the player
  checkBombCollisions() {
    const bombs = this.game.bombs;
    const player = this.game.player;

    for (let i = 0; i < bombs.length; i++) {
      const bomb = bombs[i];

      // Check if there is a collision between the bomb and the player
      if (this.checkCollision(bomb, player)) {
        this.game.gameOver = true;
        console.log("Game Over");
        bombs.splice(i, 1);
        i--;

        // Play the explosion sound
        this.game.soundManager.play("explosion");
      }
    }
  }

  checkInvadersReachedPlayer() {
    const invadersGrid = this.game.invadersGrid;
    const player = this.game.player;

    for (let i = 0; i < invadersGrid.invadersGrid.length; i++) {
      const invader = invadersGrid.invadersGrid[i];

      // Check if the invader exists and has reached the player
      if (
        invader &&
        invader.position.y + invader.sprite.scaledHeight >= player.position.y
      ) {
        this.game.gameOver = true;
        console.log("Game Over");
        return;
      }
    }
  }

  // Checks if there is a collision between two objects
  checkCollision(objToCheckA, objToCheckB) {
    // Get the dimensions of the two objects
    const objToCheckAWidth =
      objToCheckA.width || objToCheckA.sprite.scaledWidth;
    const objToCheckAHeight =
      objToCheckA.height || objToCheckA.sprite.scaledHeight;
    const objToCheckBWidth =
      objToCheckB.width || objToCheckB.sprite.scaledWidth;
    const objToCheckBHeight =
      objToCheckB.height || objToCheckB.sprite.scaledHeight;

    // Get the positions of the right and bottom edges of each object
    const objToCheckARight = objToCheckA.position.x + objToCheckAWidth;
    const objToCheckABottom = objToCheckA.position.y + objToCheckAHeight;
    const objToCheckBRight = objToCheckB.position.x + objToCheckBWidth;
    const objToCheckBBottom = objToCheckB.position.y + objToCheckBHeight;

    // Check if the objects are overlapping
    return (
      objToCheckA.position.x < objToCheckBRight &&
      objToCheckARight > objToCheckB.position.x &&
      objToCheckA.position.y < objToCheckBBottom &&
      objToCheckABottom > objToCheckB.position.y
    );
  }
}
