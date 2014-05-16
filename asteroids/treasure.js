(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Treasure = Asteroids.Treasure = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Treasure.inherits(Asteroids.MovingObject);

  Treasure.randomTreasure = function(dimX, dimY) {
    return new Treasure([300,300], [0,0], 5);
  }

})(this);
