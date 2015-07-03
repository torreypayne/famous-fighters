var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var Bullet = require('./Bullet');

function Ship(scene, game, world) {
  this.game = game;
  this.world = world;
  this.physBody = new ShipSphere(world);
  this.body = this.physBody.sphere;
  this.world.add(this.body);
  this.node = new ShipView(game, this.physBody);
  this.mesh = new ShipMesh(this.node);
  this.bullets = [];
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

Ship.prototype.onReceive = function onReceive(type, ev) {
  if (event.keyCode === 32) {
    var bullet = new Bullet(this.game, this, this.world, this.game.asteroids);
    this.game.bullets.push(bullet);
    console.log('Fire!');
    // this.emit('bulletfire', ev.value);
  } else {
    console.log(type);
  }
}

// ShipView.prototype.onReceive = function onReceive(type, ev) {
//   if (type === "click") {
//     console.log('clicked on Asteroid!');
//     var bullet = new Bullet(this.game, this, this.world, this.asteroids);
//     this.game.bullets.push(bullet);
//     console.log('Fire!');
//     this.emit('bulletfire', ev.value);
//   } else {
//     console.log(type);
//   }
// }

function ShipView(game, body) {
  Node.call(this);
  game.addChild(this);
  this
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(
        body.x()*.1,
        body.y()*.1,
        body.z()*.1
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(175, 175, 175);
  this.addUIEvent('click');
}

ShipView.prototype = Object.create(Node.prototype);
ShipView.prototype.constructor = ShipView;

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
      .setGeometry('Icosahedron', { detail: 10 })
      .setBaseColor(new Color('red'))
      ;
}

module.exports = Ship;
