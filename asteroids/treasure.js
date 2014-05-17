(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Treasure = Asteroids.Treasure = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Treasure.inherits(Asteroids.MovingObject);
  Treasure.RADIUS = 20;

  Treasure.randomTreasure = function(dimX, dimY) {

    var legitTreasure = false;
    while (legitTreasure != true){
      legitTreasure = true;
      var x = Math.random() * dimX;
      var y = Math.random() * dimY;

      var spawnOffset = Treasure.RADIUS + 20; //this is the value to offset Treasures away from the ship at the start of the game. Increase the value after the radius to make the game easier (at least at the start)

      if ((x > dimX/2 - spawnOffset && x < dimX/2 + spawnOffset) &&
      (y > dimY/2 - spawnOffset && y < dimX/2 + spawnOffset)){
        console.log("Treasure genereated too close to ship!");
        legitTreasure = false;
      }

    }

    return new Treasure([x,y], [0,0], Treasure.RADIUS);
  }

})(this);
