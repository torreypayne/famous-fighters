var physics = require('famous/physics');
var Force = physics.Force;
var Vec3 = require('famous/math/Vec3');
var Bullet = require('../Bullet/Bullet');
var ShipSphere = require('./ShipSphere');
var ShipView = require('./ShipView');
var ShipMesh = require('./ShipMesh');

function Ship(scene, game, world) {
  this.game = game;
  this.world = world;
  this.physBody = new ShipSphere(world);
  this.body = this.physBody.sphere;
  this.world.add(this.body);
  this.node = new ShipView(scene, this.physBody);
  this.mesh = new ShipMesh(this.node);
  this.bullets = [];
}

Ship.prototype.isColliding = function(asteroids) {
  var tooClose = false;
  asteroids.forEach(function(asteroid) {
    var diffs = [
      this.physBody.x() - asteroid.physBody.x(),
      this.physBody.y() - asteroid.physBody.y(),
      this.physBody.z() - asteroid.physBody.z()
    ];
    var dist = Math.pow(diffs[0], 2) + Math.pow(diffs[1], 2) + Math.pow(diffs[2], 2);
    var comparison = (dist <= this.body.radius + asteroid.physBody.radius());
    if (this !== asteroid && comparison === true) {
      tooClose = true;
    }
  }.bind(this));

  return tooClose;
}

Ship.prototype.power = function(impulse) {
  var pos = this.position();
  var vector = new Vec3(
    impulse[0],
    impulse[1],
    impulse[2]
  );
  this.body.applyImpulse(vector);
}

Ship.prototype.spin = function(impulse) {
  var vector = new Vec3(
    10*impulse[0],
    10*impulse[1],
    10*impulse[2],
    10*impulse[3]
  );
  this.body.applyTorque(vector);
  var rotations = [
    this.node.getRotation()[0] + 2* Math.PI * impulse[0]/90,
    this.node.getRotation()[1] + 2* Math.PI * impulse[1]/90,
    this.node.getRotation()[2] + 2* Math.PI * impulse[2]/90,
    this.node.getRotation()[3] + 2* Math.PI * impulse[3]/90
  ];
  rotations.forEach(function(value, idx) {
    if (value > 1) {
      rotations[idx] = -1;
      console.log("What can I do here?");
    } else if (value < -1) {
      rotations[idx] = 1;
    }
  });
  this.node.setRotation(
    rotations[0],
    rotations[1],
    rotations[2],
    rotations[3]
  );
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
  if (this.isColliding(asteroids)) {
    console.log("GAME OVER!");
  }
}

Ship.prototype.onReceive = function onReceive(type, ev) {
  switch (event.keyCode) {
    case 32:
      var bullet = new Bullet(this.game, this, this.world, this.game.asteroids);
      this.game.bullets.push(bullet);
      console.log('Fire!');
      break;
    case 37:
      this.power([1,0,0]);
      break;
    case 38:
      this.power([0,-1,0]);
      break;
    case 39:
      this.power([-1,0,0]);
      break;
    case 40:
      this.power([0,1,0]);
      break;
    case 65:
      this.spin([1,0,0,0]);
      break;
    case 68:
      this.spin([-1,0,0,0]);
      break;
    case 87:
      this.spin([0,1,0,0]);
      break;
    case 83:
      this.spin([0,-1,0,0]);
      break;
    default:
      console.log(ev.keyCode);
  }
}

module.exports = Ship;
