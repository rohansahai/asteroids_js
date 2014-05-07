(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(15);
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2],
      [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    this.intervalTimer = 0;
  }

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
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
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    this.ship.draw(this.ctx);
  };

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function() {
    var that = this;
    this.intervalTimer = window.setInterval(that.step.bind(that), Game.FPS);
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        alert("The game has ended");
      }
    }
  };

  Game.prototype.stop = function() {
    clearInterval(this.intervalTimer);
  };

})(this);