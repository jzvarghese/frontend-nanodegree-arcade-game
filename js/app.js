// Enemies our player must avoid
// this function will be called with the keyword new
var Enemy = function(init_x,init_y,init_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //add initial position and speed for enemies
    this.x = init_x;
    this.y = init_y;
    this.speed = init_speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speed;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(init_x,init_y,player_sprite){

    //load sprite for character
    this.sprite = player_sprite;
    this.x = init_x;
    this.y = init_y;
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(first_argument) {
    // add collision detection stuff here
};

Player.prototype.handleInput = function(allowedKeys) {
    console.log("The key is:")
    console.log(allowedKeys);
    //move the player depending on what key was pressed
    //and check to see whether they tried to move off
    //screen or got to the water

    //this.update();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Player(init_x,init_y,player_sprite){
var player = new Player(302,390,'images/char-boy.png');
var allEnemies = [new Enemy(0,60,95),new Enemy(0,145,25),new Enemy(0,230,25)];



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
