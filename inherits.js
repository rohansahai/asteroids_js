Function.prototype.inherits = function(parent){
  function Surrogate() {};
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
};

function Animal(name, age){
  this.name = name;
  this.age = age;
};

Animal.prototype.makeNoise = function(){
  console.log("rawr");
};

function Dog(name, age, color){
  Animal.call(this, name, age);
  this.color = color;
};

Dog.inherits(Animal);

var dog = new Dog("louie", "2", "blue");
console.log(dog);
dog.makeNoise();