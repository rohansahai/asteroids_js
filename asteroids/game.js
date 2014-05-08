(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(15);
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2],
      [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    this.intervalTimer = 0;
    this.bullets = [];
    this.image = new Image();
    this.image.src = 'milky_way.jpeg';
    this.image.width = "500";
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 1000;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    return asteroids;
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0,0,500,500);

    ctx.drawImage(this.image, 0, 0, Game.DIM_X, Game.DIM_Y);

    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }
  };

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    this.ship.move();

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move(this);
    }

  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.isOutOfBounds();
    this.checkCollisions();
  };

  Game.prototype.isOutOfBounds = function(){
    this.removeAsteroids();
    this.removeBullets();
    this.removeShip();
  };

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    var that = this;
    // window.setInterval returns a number (ID) representing the timer
    // we use this later to clear the interval (stop the game/ timer)
    this.intervalTimer = window.setInterval(that.step.bind(that), Game.FPS);
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        alert("The game has ended");
        this.stop();
      }
    }
  };

  Game.prototype.stop = function() {
    clearInterval(this.intervalTimer);
  };

  Game.prototype.removeAsteroids = function() {
    for(var i = this.asteroids.length-1; i >= 0; i--) {
      if(this.asteroids[i].pos[0] < 0 || this.asteroids[i].pos[0] > Game.DIM_X) {
        this.asteroids.splice(i, 1);
      } else if(this.asteroids[i].pos[1] < 0 || this.asteroids[i].pos[1] > Game.DIM_Y) {
        this.asteroids.splice(i, 1);
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

  Game.prototype.removeShip = function() {
    if(this.ship.pos[0] < 0 || this.ship.pos[0] > Game.DIM_X) {
      this.ship.pos = [250, 250];
    } else if(this.ship.pos[1] < 0 || this.ship.pos[1] > Game.DIM_Y) {
      this.ship.pos = [250, 250];
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('i', function(){ that.ship.power([0,-1]) });
    key('j', function(){ that.ship.power([-1,0]) });
    key('k', function(){ that.ship.power([0,1]) });
    key('l', function(){ that.ship.power([1,0]) });
    key('space', function(){ that.fireBullet() });
  };

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet() );
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