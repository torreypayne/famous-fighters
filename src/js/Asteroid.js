var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function AsteroidView(game) {
  this.node = game.node.addChild();
  this.node
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(2*Math.random(), 2*Math.random(), 2*Math.random())
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(75, 75, 75);
}

function AsteroidSphere(node) {
  var options = {
    mass: 10,
    radius: 35,
  };
  this.node = node;
  this.sphere = new Sphere(options);
  this.sphere
      .setPosition(node.getPosition()[0], node.getPosition()[1], node.getPosition()[2])
      .setVelocity(2, 2, 2*Math.random() - 1);
}

AsteroidSphere.prototype.x = function() {
  return this.sphere.getPosition().x;
}

AsteroidSphere.prototype.y = function() {
  return this.sphere.getPosition().y;
}

AsteroidSphere.prototype.z = function() {
  return this.sphere.getPosition().z;
}

function AsteroidMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere');
}

function Asteroid(game) {
  this.view = new AsteroidView(game);
  this.node = this.view.node;
  this.physBody = new AsteroidSphere(this.node);
  this.body = this.physBody.sphere;
  this.mesh = new AsteroidMesh(this.node);
}

Asteroid.prototype.update = function() {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );
}

module.exports = Asteroid;
