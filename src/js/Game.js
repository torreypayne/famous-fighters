var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var Bullet = require('./Bullet');
var UIEvent = require('famous/dom-renderers/events/UIEvent');

function Game(scene, world) {
  this.node = new Node();
  this.world = world;
  this.asteroids = [];
  this.bullets = [];
  this.node
  .setOrigin(0.5, 0.5, 0.5)
  .setAlign(0.5, 0.5, 0.5)
  .setMountPoint(0.5, 0.5, 0.5)
  .setSizeMode(1, 1, 1)
  .setAbsoluteSize(200, 200, 200);
  this.node.addUIEvent('click');
  this.node.addUIEvent('keydown');
  this.node.onReceive = function(event, payload) {
    if (type === "click") {
      debugger;
      var bullet = new Bullet(this, this.ship, this.world, this.asteroids);
      bullets.push(bullet);
      console.log(bullet);
      console.log("shot bullet!");
    } else {
      console.log(type);
    }
  };
  scene.addChild(this.node);
}

Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Game;

Game.prototype.addShip = function(ship) {
  this.ship = ship;
}

Game.prototype.addAsteroid = function(asteroid) {
  this.asteroids.push(asteroid);
}

Game.prototype.onReceive = function onReceive(type, ev) {
  if (type === "click") {
    debugger;
    var bullet = new Bullet(this, this.ship, this.world, this.asteroids);
    bullets.push(bullet);
    console.log(bullet);
    console.log("shot bullet!");
  } else {
    console.log(type);
  }
}

module.exports = Game;
