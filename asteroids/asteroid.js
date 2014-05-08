(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 8;
  Asteroid.COLOR = "purple";

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;
    //CHANGE RANDOMVEC (should also have potential to be negative)
    var speed = 10;

    var vecx = Math.floor(Math.random() * speed - speed/2);
    var vecy = Math.floor(Math.random() * speed - speed/2);
    if (vecx === 0 && vecy === 0) {
      vecx = 1;
      vecy = -1;
    };


    var randomVec = [vecx, vecy];
    return new Asteroid([x,y], randomVec, Asteroid.RADIUS, Asteroid.COLOR);
  };
})(this);

