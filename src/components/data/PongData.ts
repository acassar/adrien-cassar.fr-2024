const RACKET_WIDTH = 10; //in px
const RACKET_HEIGHT = 60; //in px
const SPACE_SIDES = 10; //in px
const RACKET_SPEED = 1.5; //in px
const BALL_SIZE = 10; //in px
const BALL_SPEED = 1.8; //in px
const defaultStoreValues = {
	player1Coords: { x: SPACE_SIDES, y: window.innerHeight / 2 },
	player2Coords: { x: window.innerWidth - (RACKET_WIDTH + SPACE_SIDES), y: window.innerHeight / 2 },
	ballCoords: { x: window.innerWidth / 2, y: window.innerHeight / 2},
	ballDir: { x: Math.floor(Math.random()) * 2 - 1, y: Math.random() * 2 - 1 },
	touchCounter: 0,
	playerKey: null,
	end: false,
};

export {RACKET_WIDTH, RACKET_HEIGHT, SPACE_SIDES, RACKET_SPEED, BALL_SIZE, BALL_SPEED, defaultStoreValues};
