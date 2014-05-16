(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(1); //NUMBER OF ASTEROIDS IN GAME
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2],
      [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    this.intervalTimer = 0;
    this.bullets = [];
    this.treasure = this.addTreasure(1);

    this.image = new Image();
    this.image.src = 'images/jungle-plant-background.jpg';

		this.shipImage = new Image();
		this.shipImage.src = 'images/monkey.png';

		this.bulletImage = new Image();
		this.bulletImage.src = 'images/banana.png';

		this.asteroidImage = new Image();
		this.asteroidImage.src = 'images/kanye.png';

		this.startTime = new Date
		this.gameTime = null;

    this.lastBulletFired = null;
    this.keys = {};
    this.frameCount = 0;
  }

  Game.DIM_X = window.innerWidth - 10;
  Game.DIM_Y = window.innerHeight - 10;
  Game.FPS = 30;
	Game.MONKEY_SIZE = 50;
	Game.BANANA_SIZE = 30;
	Game.ZOO_KEEPER_SIZE = 100;

  Game.prototype.addAsteroids = function(numAsteroids) {
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    return asteroids;
  };

  Game.prototype.addTreasure = function(numTreasure) {
    var treasure = [];
    for(var i = 0; i < numTreasure; i++) {
      treasure.push(Asteroids.Treasure.randomTreasure(Game.DIM_X, Game.DIM_Y));
    }
    return treasure;
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.image, 0, 0, Game.DIM_X, Game.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++){
			this.ctx.drawImage(this.asteroidImage,
				this.asteroids[i].pos[0] - Game.ZOO_KEEPER_SIZE/2,
				this.asteroids[i].pos[1] - Game.ZOO_KEEPER_SIZE/2,
				Game.ZOO_KEEPER_SIZE, Game.ZOO_KEEPER_SIZE + 20);
    }

    this.ship.draw(this);

    for (var i = 0; i < this.bullets.length; i++) {
			this.ctx.drawImage(this.bulletImage,
				this.bullets[i].pos[0] - Game.BANANA_SIZE/2,
				this.bullets[i].pos[1] - Game.BANANA_SIZE/2,
				Game.BANANA_SIZE, Game.BANANA_SIZE);
    }

    for (var i = 0; i < this.treasure.length; i++) {
      this.ctx.drawImage(this.bulletImage,
        this.treasure[i].pos[0] - Game.BANANA_SIZE/2,
        this.treasure[i].pos[1] - Game.BANANA_SIZE/2,
        Game.BANANA_SIZE, Game.BANANA_SIZE);
    }
  };

  Game.prototype.move = function() {
    this.checkHeldKeys();

    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    this.ship.move();

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move(this);
    }

  };

  Game.prototype.checkHeldKeys = function () {
    if (this.keys[73]){
      this.ship.power([1,-1]);
    }
    if (this.keys[74]){
      this.ship.rotate("left");
    }
    if (this.keys[75]){
      this.ship.power([-1,1]);
    }
    if (this.keys[76]){
      this.ship.rotate("right");
    }
    if (this.keys[32]){
      this.fireBullet();
    }
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.isOutOfBounds();
    this.checkCollisions();
		this.updateTimer();
    this.addAmmo();
		this.isWin();
  };

  Game.prototype.addAmmo = function() {
    if (this.frameCount % 150 === 0){
      this.treasure = this.addTreasure(1);
    }
  }

  Game.prototype.isOutOfBounds = function(){
    this.regenerateAsteroids();
    this.removeBullets();
    this.regenerateShip();
  };

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    var that = this;
    // window.setInterval returns a number (ID) representing the timer
    // we use this later to clear the interval (stop the game/ timer)
    this.intervalTimer = window.setInterval(that.step.bind(that), Game.FPS);
  };

	Game.prototype.updateTimer = function (){
    this.frameCount += 1;
		this.gameTime = (new Date - this.startTime) / 1000;
		$('.timer').text("Time: " + this.gameTime);
	};

  Game.prototype.checkCollisions = function() {
    //check if the ship has collided with the any asteroids
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        alert("You're going back to zoo little monkey!!");
        this.stop();
      }
    }
    //check if the ship has picked up any ammo
    for(var i = this.treasure.length - 1; i >= 0; i--) {
      if (this.treasure[i].isCollidedWith(this.ship)) {
        this.ship.addAmmo(5);
        this.treasure.splice(i,1);
      }
    }
  };

	Game.prototype.isWin = function() {
		if (this.asteroids.length === 0){
			alert("You are free monkey! TIME: " + this.gameTime);
			this.stop();
		}
	};

  Game.prototype.stop = function() {
    clearInterval(this.intervalTimer);
  };

  Game.prototype.regenerateAsteroids = function() {
    for(var i = this.asteroids.length-1; i >= 0; i--) {
      if(this.asteroids[i].pos[0] < 0){
        this.asteroids[i].pos[0] = Game.DIM_X;
      } else if(this.asteroids[i].pos[0] > Game.DIM_X) {
        this.asteroids[i].pos[0] = 0;
      } else if(this.asteroids[i].pos[1] < 0) {
        this.asteroids[i].pos[1] = Game.DIM_Y;
      } else if(this.asteroids[i].pos[1] > Game.DIM_Y) {
        this.asteroids[i].pos[1] = 0;
      }
    }
  };

  Game.prototype.removeBullets = function() {
    for(var i = this.bullets.length-1; i >= 0; i--) {
      if(this.bullets[i].pos[0] < 0 || this.bullets[i].pos[0] > Game.DIM_X) {
        this.bullets.splice(i, 1);
      } else if(this.bullets[i].pos[1] < 0 || this.bullets[i].pos[1] > Game.DIM_Y) {
        this.bullets.splice(i, 1);
      }
    }

  };

  Game.prototype.regenerateShip = function() {
    if(this.ship.pos[0] < 0){
    	this.ship.pos[0] = Game.DIM_X;
    } else if (this.ship.pos[0] > Game.DIM_X) {
      this.ship.pos[0] = 0;
    } else if(this.ship.pos[1] < 0){
    	this.ship.pos[1] = Game.DIM_Y;
    } else if(this.ship.pos[1] > Game.DIM_Y) {
      this.ship.pos[1] = 0;
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    $(document).keydown(function(e){
      that.keys[e.which] = true;
    });

    $(document).keyup(function(e){
      that.keys[e.which] = false;
    });
  };

  Game.prototype.fireBullet = function() {
    var newBullet = this.ship.fireBullet();
    var bulletGap = (new Date - this.lastBulletFired) / 1000;
    if (newBullet !== undefined && bulletGap > .5 && this.ship.ammo > 0){
      this.bullets.push(newBullet);
      this.lastBulletFired = new Date();
      this.ship.ammo -= 1;
    }

  };

  Game.prototype.removeAsteroid = function(i) {
    this.asteroids.splice(i, 1);
  };

  Game.prototype.removeBullet = function(bullet) {
    for(var i = this.bullets.length - 1; i >= 0; i--) {
      if (this.bullets[i] == bullet){
        this.bullets.splice(i, 1);
      }
    }
  };

})(this);
