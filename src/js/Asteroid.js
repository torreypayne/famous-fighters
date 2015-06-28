var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function AsteroidView(game, physBody) {
  this.physBody = physBody;
  this.node = game.node.addChild();
  this.node
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(
        physBody.x(),
        physBody.y(),
        physBody.z()
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(75, 75, 75);
}

function AsteroidSphere(ship, world) {
  this.world = world;
  var options = {
    mass: 1,
    radius: 1,
  };
  this.sphere = new Sphere(options);
  this.sphere
      .setPosition(
        ship.physBody.x() + 2*Math.random(),
        ship.physBody.y() + 2*Math.random(),
        2*Math.random()
      )
      .setVelocity(10, 10, 10*Math.random() - 1);
  world.add(this.sphere);
  
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

function Asteroid(game, ship, world) {
  this.physBody = new AsteroidSphere(ship, world);
  this.view = new AsteroidView(game, this.physBody);
  this.node = this.view.node;
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
