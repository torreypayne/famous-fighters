var Node = require('famous/core/Node');
var Mesh = require('famous/webgl-renderables/Mesh');
var math = require('famous/math');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Sphere = physics.Sphere;
var Box = physics.Box;

function Bullet(game, ship, world, asteroids) {
  this.physBody = new BulletBox(ship, world);
  this.body = this.physBody.box;
  world.add(this.body);
  this.view = new BulletView(game, this.physBody);
  this.node = this.view.node;
  this.mesh = new BulletMesh(this.node);
}

Bullet.prototype.update = function() {
  this.node.setPosition(
    this.physBody.x(),
    this.physBody.y(),
    this.physBody.z()
  );
}

function BulletBox(ship, world) {
  this.world = world;
  var options = {
    mass: .05,
    size: [5, .25, .25],
  };
  this.box = new Box(options);
  var sign = Math.round(2*Math.random()-1);
  this.box
      .setPosition(
        ship.physBody.x()+.1,
        ship.physBody.y()+.1,
        ship.physBody.z()+1
      );
  this.box.setVelocity(
    1 * ship.body.velocity.x,
    1 * ship.body.velocity.y,
    1 * ship.body.velocity.z
  );
}

BulletBox.prototype.x = function() {
  return this.box.getPosition().x;
}

BulletBox.prototype.y = function() {
  return this.box.getPosition().y;
}

BulletBox.prototype.z = function() {
  return this.box.getPosition().z;
}

function BulletView(game, physBody) {
  this.physBody = physBody;
  this.game = game;
  this.node = game.node.addChild();
  var x = physBody.x();
  var y = physBody.y();
  var z = physBody.z();
  this.node
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(x*.1,y*.1,z*.1)
      .setPosition(x, y, z)
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(150, 10, 10);
}

function BulletMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setBaseColor(new Color('yellow'))
      .setGeometry('Box');
}

module.exports = Bullet;
