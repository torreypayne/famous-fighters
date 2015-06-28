var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function AsteroidNode() {
  Node.call(this, arguments);
  this
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(2*Math.random(), 2*Math.random(), 2*Math.random());
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(75, 75, 75);
}

function AsteroidSphere(node) {
  var options = {
    mass: 100,
    radius: 35,
    position: node.position,
    velocity: [10, 10, 10]
  };
  Sphere.call(this, options);
}

function Asteroid() {
  this.node = new AsteroidNode();
  this.physBody = new AsteroidSphere(this.node);
}

module.exports = Asteroid;
