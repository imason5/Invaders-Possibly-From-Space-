import Invaders from "./Invaders.js";

export default class InvadersGrid {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.invadersGrid = [
      new Invaders("small", { x: 50, y: 50 }),
      new Invaders("medium", { x: 150, y: 50 }),
      new Invaders("large", { x: 250, y: 50 }),
    ];
  }
}
