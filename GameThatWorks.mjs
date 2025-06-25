/*******************************************************/
// FIREBASE                                                       //LOOK AT STARTED FIREBASE WEBSITE

import { fb_write } from "./fb_io.mjs";

/*******************************************************/
window.setup = setup;
window.draw = draw;

const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');
            

/*******************************************************/
// END OF FIREBASE
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



/*******************************************************/
// setup()
/*******************************************************/
function setup() {
    console.log("setup: ");
    new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    
    obstacles = new Group();

    floor =  new Sprite(SCREEN_WIDTH/2,  SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's');
    floor.color = color("black");
    world.gravity.y = 80;
    
    document.addEventListener("keydown", 
        function(event) {
            if(screenSelector == "start"||screenSelector == "end"){
                screenSelector = "game"
                resetGame();
            }else{
                if(player.y > 184 ){// 184 - found from testing - floor level
                    console.log("Key pressed!");
                    player.vel.y = -20;
                }
            }
    });

}
	

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 400;
const PLAYER_HEIGHT = 25;
const PLAYER_WIDTH = 25;


const OBSTACLE_HEIGHT = PLAYER_HEIGHT;
const OBSTACLE_WIDTH = PLAYER_WIDTH;

var spawnDist = 0;
var nextSpawn = 0;
var score = 0;
var player;
  
var screenSelector = "start";  

var obstacles;
var obstacle;
 
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    if(screenSelector=="game"){
        gameScreen();
    }else if(screenSelector=="end"){
        endScreen();
        fb_write(); 
        console.log(fb_write);                //Work here///
    }else if(screenSelector=="start"){
        startScreen();
    }else{
        text("wrong screen - you shouldnt get here", 50, 50);
        console.log("wrong screen - you shouldnt get here")
    }
}


function newObstacle(){
    obstacle = new Sprite((SCREEN_WIDTH -100),  SCREEN_HEIGHT - OBSTACLE_HEIGHT/2, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, 'k');
    obstacle.color = color("yellow");
    obstacle.vel.x = -10;
    
    obstacles.add(obstacle);
}

function youDead(_player, _obstacle){
    screenSelector = "end";
    player.remove();
    obstacles.removeAll();
    console.log(score);
}

// Main screen functions

function startScreen(){
    background("white");

    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("Welcome to the game", 50, 50);
    textSize(24);
    text("Press space to start!", 50, 110);
	if (kb.presses('space')) {
		gameScreen();
	}
}

function gameScreen(){
    background("#C39BD3");
    allSprites.visible = true;
    score++;
    if(frameCount> nextSpawn){
        newObstacle();
        nextSpawn = frameCount + random(10,100);
    }
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text(score, 50, 50);

}

function endScreen(){
    background("white");



    allSprites.visible = false;
    textSize(32);
    fill(255);
    stroke(0);
    strokeWeight(4);
    text("You died! Too bad :-(", 50, 50);
    textSize(24);
    text("your score was: "+score, 50, 110);
    textSize(14);
    text("press space to restart!", 50, 150);
}

function resetGame(){
    player = new Sprite(PLAYER_WIDTH*1.2,  SCREEN_HEIGHT/2, PLAYER_WIDTH, PLAYER_HEIGHT, 'd');
    player.color = color("purple");
    player.collides(obstacles, youDead);
    score = 0;
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
