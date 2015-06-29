var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var Bullet = require('./Bullet');

function Game(scene) {
  this.node = scene.addChild();
  this.node
  .setOrigin(0.5, 0.5, 0.5)
  .setAlign(0.5, 0.5, 0.5)
  .setMountPoint(0.5, 0.5, 0.5)
  .setSizeMode(1, 1, 1)
  .setAbsoluteSize(200, 200, 200);
  this.addUIEvent('click');
}

Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Game;

// Game.prototype.onReceive = function onReceive(type, ev) {
//   if (type === "click") {
//     var bullet = new Bullet(gameView, ship, world, asteroids);
//     bullets.push(bullet);
//     console.log(bullet);
//     console.log("shot bullet!");
//   }
// }

module.exports = Game;
