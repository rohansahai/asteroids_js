(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Bullet.inherits(Asteroids.MovingObject);

})(this);