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
  this.ship = ship;
  this.node = new AsteroidView(game, this.physBody);
  this.mesh = new AsteroidMesh(this.node);
  this.asteroids = asteroids;
  this.game = game;
  this.world = world;
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
    var comparison = (dist <= this.physBody.radius() + asteroid.physBody.radius());
    if (this !== asteroid && comparison === true) {
      tooClose = true;
    }
  }.bind(this));

  return tooClose;
}

Asteroid.prototype.blowUp = function() {
  this.node.setAbsoluteSize(1,1,1);
  this.mesh.changeColor(new Color('blue'));
}


function AsteroidView(game, physBody) {
  Node.call(this);
  game.ship.node.addChild(this);
  this.physBody = physBody;
  this.game = game;
  this
      .setAlign(
        physBody.x()*.5,
        physBody.y()*.5,
        physBody.z()*.5
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(physBody.radius()*5,
      physBody.radius()*5,
      physBody.radius()*5
  );
}

AsteroidView.prototype = Object.create(Node.prototype);
AsteroidView.prototype.constructor = AsteroidView;

AsteroidView.prototype.onReceive = function onReceive(type, ev) {}

AsteroidView.prototype.remove = function() {}

function AsteroidMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere');
}

AsteroidMesh.prototype.changeColor = function(color) {
  this.skin.setBaseColor(color);
}

module.exports = Asteroid;
