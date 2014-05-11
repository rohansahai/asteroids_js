(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
    this.rotation = 0;
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "blue";

  Ship.inherits(Asteroids.MovingObject);

  Ship.degreesToRadians = function (degrees){
    return (degrees * Math.PI)/180
  }

  //Adjacent * Tan(degrees for x coordinate) ?


  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.rotate = function(dir) {
    if (dir === "left"){
      this.rotation -= 5;
    } else {
      this.rotation += 5;
    }
  }

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

  Ship.prototype.move = function() {
    this.pos[0] += this.vel[0] * Math.tan(Ship.degreesToRadians(this.rotation));
    this.pos[1] += this.vel[1];
  };

  Ship.prototype.draw = function(ctx) {

		var shipImage = new Image();

		shipImage.onload = function() {
		  ctx.drawImage(shipImage, 250, 250);
		};
		shipImage.src = 'banana.jpeg';

  };


})(this);
