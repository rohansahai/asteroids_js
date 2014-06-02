(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
		var numAsteroids = (window.innerHeight * window.innerWidth)/110000;
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2],
      [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
	  this.asteroids = this.addAsteroids(numAsteroids); //NUMBER OF ASTEROIDS IN GAME
			
    this.intervalTimer = 0;
    this.frameCount = 0;

    this.bullets = [];
    this.specialBullets = [];
    this.treasure = this.addTreasure(1);

    this.loadMedia();

		this.startTime = new Date
		this.gameTime = null;

    this.lastBulletFired = null;
    this.keys = {};

    this.kills = 0;


  }

  Game.DIM_X = window.innerWidth - 10;
  Game.DIM_Y = window.innerHeight - 10;
  Game.FPS = 30;
	Game.MONKEY_SIZE = 50;
	Game.BANANA_SIZE = 30;
	Game.ASTEROID_SIZE = 100;

  Game.prototype.addAsteroids = function(numAsteroids) {
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this.ship));
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
    ctx.drawImage(this.backgroundImage, 0, 0, Game.DIM_X, Game.DIM_Y);
    this.ship.draw(this);

    this.drawItem(this.asteroids, Game.ASTEROID_SIZE, this.asteroidImage, 5);
    this.drawItem(this.bullets, Game.BANANA_SIZE, this.bulletImage);
    this.drawItem(this.treasure, 50, this.ammoImage);
    this.drawItem(this.specialBullets, 150, this.specialBulletImage);
  };

  Game.prototype.drawItem = function(items, size, image, yOffSet) {
    yOffSet = yOffSet || 0;
    for (var i = 0; i < items.length; i++) {
      this.ctx.drawImage(image,
        items[i].pos[0] - size/2,
        items[i].pos[1] - size/2,
        size, size + yOffSet);
    }
  };

  Game.prototype.move = function() {
    this.checkHeldKeys();


    this.ship.move();
    this.moveItem(this.asteroids);
    this.moveItem(this.bullets);

    for (var i = 0; i < this.specialBullets.length; i++) {
      this.specialBullets[i].move(this, true);
    }

  };

  Game.prototype.moveItem = function(items) {
    for (var i = 0; i < items.length; i++){
      items[i].move(this);
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
    if (this.keys[83]){
      this.fireSpecial();
    }
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.isOutOfBounds();
    this.checkCollisions();
		this.updateScreen();
    this.addFieldObjects();
		this.isWin();
  };

  Game.prototype.addFieldObjects = function() {
    //add ammo every 5 seconds
    if (this.frameCount % 150 === 0){
      this.treasure = this.addTreasure(1);
    }
    //add asteroids every n seconds
    if (this.frameCount % 150 === 0){
      this.asteroids = this.asteroids.concat(this.addAsteroids(1));
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

	Game.prototype.updateScreen = function (){
    this.frameCount += 1;
		this.gameTime = (new Date - this.startTime) / 1000;
		$('.timer').text("Time: " + this.gameTime);
    $(".ammo").html("Bananas: " + this.ship.ammo);
    $(".kills").html("Kanye Slayings: " + this.kills);
	};

  Game.prototype.checkCollisions = function() {
    //check if the ship has collided with the any asteroids
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
 				this.audioElement.pause();
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

    for(var i = this.specialBullets.length-1; i >= 0; i--) {
      if(this.specialBullets[i].pos[0] < 0 || this.specialBullets[i].pos[0] > Game.DIM_X) {
        this.specialBullets.splice(i, 1);
      } else if(this.specialBullets[i].pos[1] < 0 || this.specialBullets[i].pos[1] > Game.DIM_Y) {
        this.specialBullets.splice(i, 1);
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

  Game.prototype.fireSpecial = function() {
    var newBullet = this.ship.fireBullet(50, 10);
    if (newBullet !== undefined && this.kills >= 1){
      this.specialBullets.push(newBullet);
      this.kills++
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
