var curriedSum = function(numArgs){
  var numbers = [];
  var _curriedSum = function(num){
    numbers.push(num);
    var total = 0;

    if (numbers.length === numArgs){
      numbers.forEach(function(n) {total += n});
      return total;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

var sum = curriedSum(4); //returns a function that knows to add numArgs times
sum(5)(30)(20)(1); //calls resulting function on argument numArgs times

Function.prototype.curry = function(numArgs) {
  var that = this;
  var args = [];

  var _curry = function (x) {
    args.push(x);

    if (args.length === numArgs) {
      that.apply(that, args);
    } else {
      return _curry;
    }
  };
  return _curry;
};

var printer = function(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}

var blah = printer.curry(3);
blah("annie")("bob")("carl");