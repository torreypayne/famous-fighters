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
    mass: 30,
    radius: 1,
  };
  this.sphere = new Sphere(options);
  var sign = Math.round(2*Math.random()-1);
  this.sphere
      .setPosition(
        ship.physBody.x()+5 + sign*20*Math.random(),
        ship.physBody.y()+5 + sign*20*Math.random(),
        2*Math.random()
      )
      .setVelocity(sign*10, sign*10, sign*10*Math.random() - 1);
  // world.add(this.sphere);

}

AsteroidSphere.prototype.remove = function() {
  this.world.removeBody(this.sphere);
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
