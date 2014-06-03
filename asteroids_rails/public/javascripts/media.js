(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Game.prototype.loadMedia = function() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'images/jungle-plant-background.jpg';

    this.shipImage = new Image();
    this.shipImage.src = 'images/monkey.png';

    this.bulletImage = new Image();
    this.bulletImage.src = 'images/banana.png';

    this.ammoImage = new Image();
    this.ammoImage.src = 'images/ammo.png';

    this.specialBulletImage = new Image();
    this.specialBulletImage.src = 'images/special.jpeg'

    this.asteroidImage = new Image();
    this.asteroidImage.src = 'images/zookeeper.png';

    this.audioElement = document.createElement('audio');
    this.audioElement.setAttribute('src', 'audio/Traitor.mp3');
    this.audioElement.play();
  };

})(this);
