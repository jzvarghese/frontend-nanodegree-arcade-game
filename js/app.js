
//superclass for all the sprites in the game
var Sprite = function(init_x,init_y,sprite) {
    this.sprite = sprite;
    this.x = init_x;
    this.y = init_y;
};

Sprite.prototype.render = function() {
    var temp = Resources.get(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
// this function will be called with the keyword new
var Enemy = function(init_x,init_y,init_speed) {
    Sprite.call(this,init_x,init_y,'images/enemy-bug.png');
    this.speed = init_speed;
};

//delegate failed lookups for Enemy's prototype to Sprite's prototype
Enemy.prototype = Object.create(Sprite.prototype);

//TODO
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //we multiply the delta time by the speed
    //to ensure the enemies cover the same distance
    //in the same amount of time irrespective
    //of the users processing speed

    //check to see if the enemy has run off the screen
    if(this.x < 707){
        this.x = this.x + dt*this.speed;
    } else {
        //if it has moved off the screen, then reset
        //the speed and x position
        this.reset();
    }
};

Enemy.prototype.reset = function() {
    //reset the enemies starting position and speed
    this.x = getEnemyStartingPosition();
    this.speed = getRandomEnemySpeed();
};



var Player = function(init_x,init_y,player_sprite) {
    Sprite.call(this,init_x,init_y,player_sprite);
};

//delegate Player's failed lookups to Sprite's prototype
Player.prototype = Object.create(Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.handleInput = function(allowedKeys) {
    //console.log("The key is:");
    //console.log(allowedKeys);

    //check to see if we got a legitimate key press
    if(allowedKeys !== undefined) {

        switch(allowedKeys){
            case 'right':
              if(this.x < 603) {
                this.x += 101;
              }
              break;
            case 'left':
              if(this.x > 3) {
                this.x -= 101;
              }
              break;
            case 'up':
              if(this.y > 140) {
                this.y -= 83;
              }
              else {
                //we scored a point
                //TODO: Log score and reset player
                console.log("score");
              }
              break;
            case 'down':
              if(this.y < 390) {
                this.y += 83;
              }
              break;
            default:
              break;
        }//end switch

            //console.log("X is:");
            //console.log(this.x);

            //console.log("Y is:");
            //console.log(this.y);
    }//end if
    //move the player depending on what key was pressed
    //and check to see whether they tried to move off
    //screen or got to the water
};//end handleInput

Player.prototype.reset = function() {
    //resets the players position
    this.x = 303;
    this.y = 390;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//returns a random starting x position
//for enemies in the range of -400 and -150 px
function getEnemyStartingPosition() {
    return -getRandomInt(150, 900);
}

//returns a random speed for enemies
//in the range of 110 and 220
function getRandomEnemySpeed() {
    return getRandomInt(110, 320);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Player(init_x,init_y,player_sprite){
//create an array with all the players and render them to the screen

//var boy = new Player(303,390,'images/char-boy.png');
var catGirl = new Sprite(203,390,'images/char-cat-girl.png');
var hornGirl = new Sprite(103,390,'images/char-horn-girl.png');
var pinkGirl = new Sprite(403,390,'images/char-pink-girl.png');
var princessGirl = new Sprite(503,390,'images/char-princess-girl.png');


//rows
var topBlockRow = 58;
var middleBlockRow = 141;
var bottomBlockRow = 224;

//-getRandomInt(150, 400)
var player = new Player(303,390,'images/char-boy.png');
var allEnemies = [new Enemy(getEnemyStartingPosition(),topBlockRow,getRandomEnemySpeed()),
                new Enemy(getEnemyStartingPosition(),topBlockRow,getRandomEnemySpeed()),
                new Enemy(getEnemyStartingPosition(),middleBlockRow,getRandomEnemySpeed()),
                new Enemy(getEnemyStartingPosition(),middleBlockRow,getRandomEnemySpeed()),
                new Enemy(getEnemyStartingPosition(),bottomBlockRow,getRandomEnemySpeed()),
                new Enemy(getEnemyStartingPosition(),bottomBlockRow,getRandomEnemySpeed())];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//e.keyCode is the unicode value of the key that was pressed
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
