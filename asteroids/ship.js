(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1], 2));
    if (this.vel !== [0, 0]) {
    return (new Asteroids.Bullet(
      [this.pos[0], this.pos[1]],
      [this.vel[0]/speed * 10, this.vel[1]/speed * 10],
      5,
      "green"))
    }
  };

})(this);