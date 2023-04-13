export default class SoundManager {
  constructor() {
    this.sounds = {
      playerShoot: new Audio("/audio/player-shoot.wav"),
      invaderKilled: new Audio("/audio/invader-killed.wav"),
      explosion: new Audio("/audio/explosion.wav"),
      backgroundMusic: new Audio("/audio/tom-sawyer.mp3"),
      gameOver: new Audio("/audio/lose.wav"),
      enemyDialogue: new Audio("/audio/enemy-dialogue.wav"),
      gameWon: new Audio("/audio/win.wav"),
    };

    // Set the volume for background music
    this.sounds.backgroundMusic.volume = 0.3;

    this.sounds.playerShoot.volume = 0.3;

    this.sounds.invaderKilled.volume = 0.3;

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

  togglePlay(soundName) {
    if (this.sounds[soundName]) {
      if (this.sounds[soundName].paused) {
        this.sounds[soundName].play();
      } else {
        this.sounds[soundName].pause();
      }
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  }

  isPlaying(soundName) {
    if (this.sounds[soundName]) {
      return (
        !this.sounds[soundName].paused && this.sounds[soundName].currentTime > 0
      );
    } else {
      console.warn(`Sound "${soundName}" not found.`);
      return false;
    }
  }
}
