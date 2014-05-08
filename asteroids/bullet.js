(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(game) {
    for (var i = 0; i < game.asteroids.length; i++) {
      if (this.isCollidedWith(game.asteroids[i])) {
        game.removeAsteroid(i);
        game.removeBullet(this);
      }
    }
  };

  Bullet.prototype.move = function(game) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.hitAsteroids(game);
  }

})(this);