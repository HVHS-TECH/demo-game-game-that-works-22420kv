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

const GAMEHEIGHT = 1850;
const GAMEWIDTH = 860;

const COINSIZE = 20
const COIN_TIMEOUT = 2000;
var coin;

/*******************************************************/
// setup()
/*******************************************************/
function setup() {
	console.log("setup: ");

	cnv = new Canvas(windowWidth, windowHeight);
	player = new Sprite(900, 400, 100, 'd');
	player.color = 'orange';
    player.stroke = 'yellow';
	player.strokeWeight = '5';

    createCoin();
    //player.collides(coin, getPoint);
    //function getPoint(collider1, collider2) {
    //    collider2.remove();
    //    score++;
    //}

	coins = new Group();

	coins.add(createCoin());

	player.collides(coins, getPoint);
	function getPoint(colliders1, colliders2) {
		colliders2.remove();
		score++;
	}

	let random;

}
	

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('grey');
	if(random(0, 100)<5) {
		coin.add = (createCoin());
	}

    movePlayer();
    displayScore();

}



function createCoin() {
    coin = new Sprite(random(0, GAMEHEIGHT), random(0, GAMEWIDTH), COINSIZE);
    coin.color = 'lightgrey';
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

/*******************************************************/
//  END OF APP
/*******************************************************/