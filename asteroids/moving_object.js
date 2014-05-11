(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(parent){
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    this.prototype = new Surrogate();
  };

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var dx = Math.pow((this.pos[0] - otherObject.pos[0]), 2);
    var dy = Math.pow((this.pos[1] - otherObject.pos[1]), 2);
    var dist = Math.sqrt(dx + dy);

    if (this.radius + otherObject.radius >= dist){
      return true;
    }
    return false;
  };
})(this);
