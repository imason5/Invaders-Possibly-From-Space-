export default class SoundManager {
  constructor() {
    this.sounds = {
      playerShoot: "/audio/player-shoot.wav",
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      const audio = new Audio(this.sounds[soundName]);
      audio.play();
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  }
}
