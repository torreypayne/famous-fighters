var BulletSphere = require('./BulletSphere');
var BulletView = require('./BulletView');
var BulletMesh = require('./BulletMesh');

function Bullet(game, ship, world, asteroids) {
  this.world = world;
  this.ship = ship;
  this.game = this.ship.game;
  this.physBody = new BulletSphere(ship, world);
  this.body = this.physBody.sphere;
  this.world.add(this.body);
  this.node = new BulletView(game, ship, this.physBody);
  this.mesh = new BulletMesh(this.node);
  this.asteroids = this.game.asteroids;
  this.update();
}

Bullet.prototype.isColliding = function() {
  var collisions = [];
  this.asteroids.forEach(function(asteroid) {
    var diffs = [
      this.physBody.x() - asteroid.physBody.x(),
      this.physBody.y() - asteroid.physBody.y(),
      this.physBody.z() - asteroid.physBody.z()
    ];
    var dist = Math.pow(diffs[0], 2) + Math.pow(diffs[1], 2) + Math.pow(diffs[2], 2);
    var comparison = (dist <= 2 * (this.body.radius + asteroid.body.radius));
    if (this !== asteroid && comparison === true) {
      collisions.push(asteroid);
    }
  }.bind(this));

  return collisions;
}

Bullet.prototype.update = function() {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );
  var collisions = this.isColliding();
  if (collisions.length > 0) {
    console.log("Hit asteroid!");
    collisions.forEach(function(asteroid) {
      asteroid.blowUp();
    });
  }
}

module.exports = Bullet;
