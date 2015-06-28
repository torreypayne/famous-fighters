var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function Game(scene) {
  this.node = scene.addChild();
  this.node
  .setOrigin(0.5, 0.5, 0.5)
  .setAlign(0.5, 0.5, 0.5)
  .setMountPoint(0.5, 0.5, 0.5)
  .setSizeMode(1, 1, 1)
  .setAbsoluteSize(200, 200, 200);
}

module.exports = Game;
