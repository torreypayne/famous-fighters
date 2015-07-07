var physics = require('famous/physics');
var Sphere = physics.Sphere;


function ShipSphere(world) {
  var options = {
    mass: 1,
    radius: 2
  };
  this.sphere = new Sphere(options);
  this.sphere
      .setPosition(0.5, 0.5, 0.5);
      this.sphere.setForce(0, 0, 10);
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

module.exports = ShipSphere;
