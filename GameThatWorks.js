/*******************************************************/
// P5.play: GameThatWorks.js
// Coin collector
// Written by Kyla
/*******************************************************/
	
/*******************************************************/
// Variables
/*******************************************************/
var score = 0;
var player;
const PLAYERSIZE = 20;
const MOVEMENTSPEED = 5;

const GAMEHEIGHT = 1850;
const GAMEWIDTH = 860;

const COINSIZE = 10;
const COIN_TIMEOUT = 2000;
var coin;

var gameState = "play";

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");

	cnv = new Canvas(windowWidth, windowHeight);
	player = new Sprite(900, 400, PLAYERSIZE);
	player.color = 'orange';
    player.stroke = 'yellow';
	player.strokeWeight = '5';

	coins = new Group();

	coins.add(createCoin());

	player.collides(coins, getPoint);
	function getPoint(collider1, collider2) {
		collider2.remove();
		score++;
	}
}
	

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	//background('grey');

	if (gameState == "play") {
		runGame();
	} else if (gameState == "lose") {
		loseScreen();
	}

}	

function runGame() {
	background('grey');
	if (random(0, 100)<5) {
		coins.add(createCoin());
	}

	movePlayer();
	  for (var i = 0; i < coins.lenght; i++) {
		if(checkCoinTime(coins[i])) {
			coins[i].remove();
			gameState = "lose";
		}
	  }
	  console.log(gameState);
	displayScore();
}

function loseScreen() {
	background('blue');
	text("You missed a coin! ", 10,100);
	textSize(100);
	text("Score: " + score, 10,200);
}

function checkCountTime(_coin) {
	if (_coin.spawntime + COIN_TIMEOUT < millis()) {
		return(true);
	}
		return(false);
}

function createCoin() {
    var coin = new Sprite(random(0, GAMEHEIGHT), random(0, GAMEWIDTH), COINSIZE);
    coin.color = 'lightgrey';
	coin.spawntime = millis();
	  return(coin);
}

function displayScore() {
    text("Score: " + score, 10, 20);
    textSize(20);
}

function movePlayer() {
    if (kb.pressing('left')) {
		player.vel.x = -5;  //Keyboard input D
	}
	if (kb.releases('left')) {
		player.vel.x = 0;
	}
	if (kb.pressing('right')) {
		player.vel.x = 5;  //Keyboard input A
	}
	if (kb.releases('right')) {
		player.vel.x = 0;
	}
	if (kb.pressing('up')) {
		player.vel.y = -5;  //Keyboard input W
	}
	if (kb.releases('up')) {
		player.vel.y = 0;
	}
	if (kb.pressing('down')) {
		player.vel.y = 5;  //Keyboard input S
	}
	if (kb.releases('down')) {
		player.vel.y = 0;
	}
}