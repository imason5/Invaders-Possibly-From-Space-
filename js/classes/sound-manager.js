export default class SoundManager {
  constructor() {
    this.sounds = {
      playerShoot: new Audio("/audio/player-shoot.wav"),
      invaderKilled: new Audio("/audio/invader-killed.wav"),
      explosion: new Audio("/audio/explosion.wav"),
      backgroundMusic: new Audio("/audio/tom-sawyer.mp3"),
    };

    // Set the volume for background music
    this.sounds.backgroundMusic.volume = 0.5;

    // Loop the background music
    this.sounds.backgroundMusic.loop = true;
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play();
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  }

  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  }
}
