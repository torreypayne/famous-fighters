var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function Ship(game, world) {
  this.world = world;
  this.physBody = new ShipSphere(world);
  this.body = this.physBody.sphere;
  this.world.add(this.body);
  this.view = new ShipView(game, this.physBody);
  this.node = this.view.node;
  this.mesh = new ShipMesh(this.node);
}

Ship.prototype.isCollidedWith = function(asteroids) {
  var tooClose = false;
  asteroids.forEach(function(asteroid) {
    var diffs = [
      this.physBody.x() - asteroid.physBody.x(),
      this.physBody.y() - asteroid.physBody.y(),
      this.physBody.z() - asteroid.physBody.z()
    ];
    var dist = Math.pow(diffs[0],2) + Math.pow(diffs[1],2) + Math.pow(diffs[2], 2);
    var comparison = (dist <= this.body.radius + asteroid.physBody.radius());
    if (this !== asteroid && comparison === true) {
      tooClose = true;
    }
  }.bind(this));

  return tooClose;
}

Ship.prototype.power = function(impulse) {

}

Ship.prototype.position = function() {
  return this.body.getPosition();
}

Ship.prototype.update = function(asteroids, time) {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );
  if (this.isCollidedWith(asteroids)) {
    console.log("GAME OVER!");
  }
}

function ShipView(game, body) {
  this.node = game.addChild();
  this.node
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(
        body.x()*.1,
        body.y()*.1,
        body.z()*.1
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(175, 175, 175);
}

function ShipSphere(world) {
  var options = {
    mass: .5,
    radius: 1
  };
  this.sphere = new Sphere(options);
  this.sphere
      .setPosition(0.5, 0.5, 0.5)
      .setForce(.1, .1, .1)
      .setMomentum(.45, .45, .45)
      .setVelocity(150,150,20);
}

ShipSphere.prototype.x = function() {
  return this.sphere.getPosition().x;
}

ShipSphere.prototype.y = function() {
  return this.sphere.getPosition().y;
}

ShipSphere.prototype.z = function() {
  return this.sphere.getPosition().z;
}

function ShipMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere', { detail: 50 })
      .setBaseColor(new Color('red'))
      ;
}

module.exports = Ship;
