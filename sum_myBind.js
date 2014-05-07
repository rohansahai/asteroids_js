var sum = function() {
  var sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
};

Function.prototype.myBind = function(object) {
  var f = this;
  //take off object; leave just the arguments
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    var otherArgs = Array.prototype.slice.call(arguments);
    f.apply(object, args.concat(otherArgs));
  }
};


function myObject(name) {
  this.name = name;
};

var mySum = function() {
  console.log(this.name);
  var sum = 0;
  for(var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  console.log(sum);
};

var bob = new myObject("bob");
//bob.mySum(1, 2);
var myBoundFunction = mySum.myBind(bob, 1, 2);
myBoundFunction(3);