#Invaders! Possibly from Space!

## Game Rules

<b>Basic Gameplay:</b>

- Player controls cannon at bottom of screen, can only move horizontally. Invaders move horizontally and vertically, approaching the cannon.
- Player can shoot projectile at will (with a delay) to hit enemies, invaders randomly shoot.
- Invaders die to one shot, if player is hit they lose a life. (could have difficulty modes for number of lives?)
- On loss of one player life, the aliens are not reset.
- There are four bunkers that both players and invaders can damage. Each bunker can take several hits.

<b>Invaders:</b>

- Invaders appear in a formation of 11 columns and 5 rows. THREE(!) different types of ships. They slowly move horizontally in formation, and when they hit the side of the game board they drop down an increment. The invader move faster each time they drop down. Each column can shoot randomly at one time.

<b>Scoring:</b>

- Each destroyed invader is worth an amount of points.
- When all invaders are destroyed a congratulations screen is shown with the score. The game board is reset.

## Further Considerations:

- Harder levels with faster invaders/more ships/fewer bunkers.
- Sound
- A 'boss' ship - appears after a certain amount of time, moves independent of the invaders formation. Worth more points to kill.
- Other unique things to shoot? Maybe powerups that make you fire and move faster/wipe a portion of invaders. Lots of scope.
- Mouse or keyboard functionality?
- Choose your icon to play?
- Local storage for session scores
- Leaderboard? Would require player name functionality, could host on firebase.
- Easter Eggs/Cheats

#### [Figma Wireframe](https://www.figma.com/file/5cTbiap1GEzgBVF4YvJg7E/INVADERS!-Possibly-from-SPACE!?node-id=0-1&t=JWCoDkNdahynAkvD-0)

## Requirements

[Project Requirements](https://docs.google.com/presentation/d/1Xdukk-TXd_OO6GRxEfHb5GCExOw2EQVW/edit#slide=id.p20)

- [ ] 3 States (splash, game, gameover)
- [ ] Able to restart
- [ ] Win/Lose logic
- [ ] Bonus: Local Storage, Audio

<hr>
## Logic/Steps
