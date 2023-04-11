export default class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  checkCollisions() {
    const { projectiles, invadersGrid } = this.game;

    for (let i = 0; i < projectiles.length; i++) {
      const projectile = projectiles[i];

      for (let j = 0; j < invadersGrid.invadersGrid.length; j++) {
        const invader = invadersGrid.invadersGrid[j];

        if (invader && this.checkCollision(projectile, invader)) {
          invadersGrid.removeInvader(j);
          projectiles.splice(i, 1);
          invadersGrid.drawOffscreen();

          i--;
          break;
        }
      }
    }
  }

  checkCollision(projectile, invader) {
    const projectileRight = projectile.position.x + projectile.width;
    const projectileBottom = projectile.position.y + projectile.height;
    const invaderRight = invader.position.x + invader.sprite.scaledWidth;
    const invaderBottom = invader.position.y + invader.sprite.scaledHeight;

    return (
      projectile.position.x < invaderRight &&
      projectileRight > invader.position.x &&
      projectile.position.y < invaderBottom &&
      projectileBottom > invader.position.y
    );
  }
}
