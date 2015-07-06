var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;

function AsteroidSphere(ship, world) {
  this.world = world;
  var options = {
    mass: 10,
    radius: 75,
  };
  this.ship = ship;
  this.sphere = new Sphere(options);
  var sign = Math.round(2*Math.random()-1);
  this.sphere
      .setPosition(
        ship.physBody.x()+100 + sign*150*Math.random(),
        ship.physBody.y()+100 + sign*150*Math.random(),
        ship.physBody.y()+100 + sign*150*Math.random()
      )
      .setVelocity(10 + sign*20, 10 + sign*20, 10 + sign*20*Math.random() - 1);
}

AsteroidSphere.prototype.remove = function() {
  this.world.removeBody(this.sphere);
}

AsteroidSphere.prototype.changePosition = function() {
  var sign = Math.round(2*Math.random()-1);
  this.sphere
      .setPosition(
        this.ship.physBody.x()+100 + sign*150*Math.random(),
        this.ship.physBody.y()+100 + sign*150*Math.random(),
        this.ship.physBody.z()+100 + sign*150*Math.random()
      );
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

AsteroidSphere.prototype.radius = function() {
  return this.sphere.radius;
}

module.exports = AsteroidSphere;
