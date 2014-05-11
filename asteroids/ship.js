(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
    this.rotation = 0;
  };

  Ship.RADIUS = 25;
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
      this.rotation -= 15;
    } else {
      this.rotation += 15;
    }
  }

  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1], 2));
    var xVel = this.vel[0] * Math.sin(Ship.degreesToRadians(this.rotation));
    var yVel = this.vel[1] * Math.cos(Ship.degreesToRadians(this.rotation));

    if (this.vel[0] !== 0 && this.vel[1] !== 0) {
      return (new Asteroids.Bullet(
      [this.pos[0], this.pos[1]],
      [xVel * 10, yVel * 10],
      5,
      "green"))
    }
  };

  Ship.prototype.move = function() {
    this.pos[0] += this.vel[0] * Math.sin(Ship.degreesToRadians(this.rotation));
    this.pos[1] += this.vel[1] * Math.cos(Ship.degreesToRadians(this.rotation));
  };

  Ship.prototype.draw = function(game) {

      // save the current co-ordinate system
  	// before we screw with it
  	game.ctx.save();

  	// move to the middle of where we want to draw our image
  	game.ctx.translate(this.pos[0], this.pos[1]);

  	// rotate around that point, converting our
  	// angle from degrees to radians
  	game.ctx.rotate(Ship.degreesToRadians(this.rotation));

  	// draw it up and to the left by half the width
  	// and height of the image
  	//game.ctx.drawImage(image, -(image.width/2), -(image.height/2));
    game.ctx.drawImage(game.shipImage,
      -Asteroids.Game.MONKEY_SIZE/2,
      -Asteroids.Game.MONKEY_SIZE/2,
      Asteroids.Game.MONKEY_SIZE, Asteroids.Game.MONKEY_SIZE);

  	// and restore the co-ords to how they were when we began
  	game.ctx.restore();

  };


})(this);
