(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(){
    MovingObject.call(this, pos, vel, radius, color);
  }

  Asteroid.inherits(MovingObject);


})(this);