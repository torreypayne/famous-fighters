var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var Bullet = require('./Bullet');
var Ship = require('./Ship');
var Asteroid = require('./Asteroid');
var UIEvent = require('famous/dom-renderers/events/UIEvent');

function Game(scene, world) {
  Node.call(this);
  scene.addChild(this);
  this.NUM_ASTEROIDS = 50;
  this._domElement = new DOMElement(this);
  this.world = world;
  this.asteroids = [];
  this.asteroidBodies = [];
  this.bullets = [];
  this.ship = new Ship(this, world);
  world.add(this.ship.body);
  this.setProportionalSize(1, 1, 1);
  this.addUIEvent('click');
  this.addUIEvent('keydown');
  this.clock = FamousEngine.getClock();
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var asteroid = new Asteroid(this, this.ship, world, this.asteroids);
    this.addAsteroid(asteroid);
    this.asteroidBodies.push(asteroid.body);
  }
}
Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Game;

Game.prototype.start = function() {
  this.clock.setInterval(function() {
    var time = this.clock.getTime();
    this.world.update(time);
    this.ship.update(this.asteroids, time);

    for (var j = 0; j < this.NUM_ASTEROIDS; j++) {
      this.asteroids[j].update(time);
    }

    for (var i=0; i < this.bullets.length; i++) {
      this.bullets[i].update();
    }
  }.bind(this), 5);

  this.clock.setInterval(function() {
    for (var i = 0; i < this.NUM_ASTEROIDS/10; i++) {
      var asteroid = new Asteroid(this, this.ship, this.world, this.asteroids);
      this.addAsteroid(asteroid);
      this.asteroidBodies.push(asteroid.body);
    }
  }.bind(this), 2000);
}


Game.prototype.addShip = function(ship) {
  this.ship = ship;
}

Game.prototype.addAsteroid = function(asteroid) {
  this.asteroids.push(asteroid);
}

Game.prototype.onReceive = function onReceive(type, ev) {
  if (type === "click") {
    var bullet = new Bullet(this, this.ship, this.world, this.asteroids);
    this.bullets.push(bullet);
    this.emit('bulletfire', ev.value);
  } else {
    console.log(type);
  }
  // this.receive(type, ev);
}

// Game.prototype.update = function() {
//
// }

module.exports = Game;
