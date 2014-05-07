(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);


})(this);