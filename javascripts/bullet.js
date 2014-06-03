(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(game, special) {
    for (var i = 0; i < game.asteroids.length; i++) {
      if (this.isCollidedWith(game.asteroids[i])) {
        audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'audio/MarioFire.wav');
        audioElement.play();
        game.removeAsteroid(i);
        game.kills++;
        if (!(special === true)){
          game.removeBullet(this);
        }
      }
    }
  };

  Bullet.prototype.move = function(game, special) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.hitAsteroids(game, special);
  };
  //
  // Bullet.randomFloatingBullet = function(dimX, dimY) {
  //   return new Bullet([300,300], [0,0], 5);
  // }

})(this);
