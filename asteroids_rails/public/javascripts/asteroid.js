(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 50;
  Asteroid.COLOR = "purple";

  Asteroid.randomAsteroid = function(dimX, dimY, ship) {
		var legitAsteroid = false;
		while (legitAsteroid != true){
			legitAsteroid = true;
	    var x = Math.random() * dimX;
	    var y = Math.random() * dimY;
	    var speed = 10;

	    var vecx = Math.floor(Math.random() * speed - speed/2);
	    var vecy = Math.floor(Math.random() * speed - speed/2);

	    if (vecx === 0 && vecy === 0) {
	      console.log("zero velocity asteroids are not aloud!");
				legitAsteroid = false;
	    };

			var spawnOffset = Asteroid.RADIUS + 80; //this is the value to offset asteroids away from the ship at the start of the game. Increase the value after the radius to make the game easier (at least at the start)
			console.log(ship.pos[0]);
			if ((x > ship.pos[0] - spawnOffset && x < ship.pos[0] + spawnOffset) &&
			(y > ship.pos[1] - spawnOffset && y < ship.pos[1] + spawnOffset)){
				console.log("asteroid genereated too close to ship!");
				legitAsteroid = false;
			}

		}

    var randomVec = [vecx, vecy];
    return new Asteroid([x,y], randomVec, Asteroid.RADIUS, Asteroid.COLOR);
  };
})(this);
