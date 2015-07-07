var physics = require('famous/physics');
var Sphere = physics.Sphere;


function BulletSphere(ship, world) {
  var options = {
    mass: .5,
    radius: .5
  };
  this.sphere = new Sphere(options);
  this.sphere
      .setPosition(
        ship.body.position.x,
        ship.body.position.y,
        ship.body.position.z
      )
      .setForce(.1, .1, .1)
      .setMomentum(.45, .45, .45)
      .setVelocity(
        100*ship.body.getVelocity().x,
        100*ship.body.getVelocity().y,
        100*ship.body.getVelocity().z
        );
}

BulletSphere.prototype.x = function() {
  return this.sphere.getPosition().x;
}

BulletSphere.prototype.y = function() {
  return this.sphere.getPosition().y;
}

BulletSphere.prototype.z = function() {
  return this.sphere.getPosition().z;
}

BulletSphere.prototype.radius = function() {
  return this.sphere.radius;
}

module.exports = BulletSphere;
