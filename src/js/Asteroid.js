var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var AsteroidSphere = require('./AsteroidSphere');

function Asteroid(game, ship, world, asteroids) {
  this.physBody = new AsteroidSphere(ship, world);
  while (this.isCollidedWith(asteroids)) {
    this.physBody.remove();
    this.physBody = new AsteroidSphere(ship, world);
  }
  this.body = this.physBody.sphere;
  world.add(this.body);

  this.view = new AsteroidView(game, this.physBody);
  this.node = this.view.node;
  this.mesh = new AsteroidMesh(this.node);
}

Asteroid.prototype.remove = function() {
  this.physBody.remove();
  this.view.remove();
}

Asteroid.prototype.update = function() {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );
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

Asteroid.prototype.isCollidedWith = function(asteroids) {
  var tooClose = false;
  asteroids.forEach(function(asteroid) {
    var diffs = [
      this.physBody.x() - asteroid.physBody.x(),
      this.physBody.y() - asteroid.physBody.y(),
      this.physBody.z() - asteroid.physBody.z()
    ];
    var dist = Math.pow(diffs[0],2) + Math.pow(diffs[1],2) + Math.pow(diffs[2], 2);
    var comparison = (dist <= this.physBody.radius() + asteroid.physBody.radius());
    if (this !== asteroid && comparison === true) {
      tooClose = true;
    }
  }.bind(this));

  return tooClose;
}

function AsteroidMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere');
}

function AsteroidView(game, physBody) {
  this.physBody = physBody;
  this.game = game;
  this.node = game.node.addChild();
  this.node
      .setAlign(
        physBody.x()*.1,
        physBody.y()*.1,
        physBody.z()*.1
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(75, 75, 75);
}

AsteroidView.prototype.remove = function() {
  // debugger;
  this.game.node.removeChild(this.node);
}

module.exports = Asteroid;
