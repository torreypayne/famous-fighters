var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var DOMElement = require('famous/dom-renderables/DOMElement');
var AsteroidSphere = require('./AsteroidSphere');
var Bullet = require('./Bullet');

function Asteroid(game, ship, world, asteroids) {
  this.physBody = new AsteroidSphere(ship, world);
  while (this.isColliding(asteroids)) {
    this.physBody.changePosition();
  }
  this.body = this.physBody.sphere;
  world.add(this.body);

  this.node = new AsteroidView(game, this.physBody);
  this.mesh = new AsteroidMesh(this.node);
  this.asteroids = asteroids;
  this.game = game;
}



Asteroid.prototype.remove = function() {
  this.physBody.remove();
  this.node.remove();
}

Asteroid.prototype.update = function() {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );

  if (this.isColliding(this.asteroids)) {
    console.log("Collision!");
  }
}

Asteroid.prototype.x = function() {
  return this.physBody.x();
}

Asteroid.prototype.y = function() {
  return this.physBody.y();
}

Asteroid.prototype.z = function() {
  return this.physBody.z();
}

Asteroid.prototype.isColliding = function(asteroids) {
  var tooClose = false;
  asteroids.forEach(function(asteroid) {
    var diffs = [
      this.physBody.x() - asteroid.physBody.x(),
      this.physBody.y() - asteroid.physBody.y(),
      this.physBody.z() - asteroid.physBody.z()
    ];
    var dist = Math.pow(diffs[0],2) + Math.pow(diffs[1],2) + Math.pow(diffs[2], 2);
    var comparison = (dist <= this.physBody.radius()*3 + asteroid.physBody.radius()*3);
    if (this !== asteroid && comparison === true) {
      tooClose = true;
    }
  }.bind(this));

  return tooClose;
}


function AsteroidView(game, physBody) {
  Node.call(this);
  game.addChild(this);
  this.physBody = physBody;
  this.game = game;
  this
      .setAlign(
        physBody.x()*.05,
        physBody.y()*.05,
        physBody.z()*.05
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(10, 10, 10);
}

AsteroidView.prototype = Object.create(Node.prototype);
AsteroidView.prototype.constructor = AsteroidView;

AsteroidView.prototype.onReceive = function onReceive(type, ev) {}

AsteroidView.prototype.remove = function() {
  this.game.removeChild(this);
}

function AsteroidMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere');
}

module.exports = Asteroid;
