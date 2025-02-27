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
const PLAYERSIZE = 40;
const MOVEMENTSPEED = 10;

//const GAMEHEIGHT = 1850;
//const GAMEWIDTH = 860;

const COINSIZE = 10;
const COIN_TIMEOUT = 2000;
var coin;

var gameState = "play";

var cnv;


/*******************************************************/
// setup()
/*******************************************************/
function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y =(windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
	console.log("setup: ");

	cnv = createCanvas(800, 800);
	centerCanvas();

	player = new Sprite(400, 400, PLAYERSIZE);
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
	if (gameState == "play") {
		runGame();
	} else if (gameState == "lose") {
		loseScreen();
	}

}	

function runGame() {
	background('darkblue');
	if (random(0, 1000)<20) {
		coins.add(createCoin());
	}

	movePlayer();
	  for (var i = 0; i < coins.length; i++) {
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
	player.remove();
	coins.remove();
}

function checkCoinTime(_coin) {
	if (_coin.spawntime + COIN_TIMEOUT < millis()) {
		return(true);
	}
		return(false);
}

function createCoin() {
    var coin = new Sprite(random(0, 800), random(0, 800), COINSIZE);
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
		player.vel.x = -MOVEMENTSPEED;  //Keyboard input D
	}
	if (kb.releases('left')) {
		player.vel.x = 0;
	}
	if (kb.pressing('right')) {
		player.vel.x = MOVEMENTSPEED;  //Keyboard input A
	}
	if (kb.releases('right')) {
		player.vel.x = 0;
	}
	if (kb.pressing('up')) {
		player.vel.y = -MOVEMENTSPEED;  //Keyboard input W
	}
	if (kb.releases('up')) {
		player.vel.y = 0;
	}
	if (kb.pressing('down')) {
		player.vel.y = MOVEMENTSPEED;  //Keyboard input S
	}
	if (kb.releases('down')) {
		player.vel.y = 0;
	}
}