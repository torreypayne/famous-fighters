var Node = require('famous/core/Node');
var physics = require('famous/physics');
var Mesh = require('famous/webgl-renderables/Mesh');
var Wall = physics.Wall;
var Color = require('famous/utilities/Color');

function GameWall(game, world, options) {
  this.world = world;
  this.game = game;
  this.body = new Wall({ direction: options.direction });
  this.body.setPosition(
    options.position[0],
    options.position[1],
    options.position[2]
  );
  this.view = new WallView(this, game, this.body);
  world.add(this.body);
  this.node = this.view.node;
  this.mesh = new WallMesh(this.node);
}

GameWall.prototype.update = function() {
  this.node.setPosition(
    this.x(),
    this.y(),
    this.z()
  );
}

GameWall.prototype.x = function() {
  return this.body.getPosition().x;
}

GameWall.prototype.y = function() {
  return this.body.getPosition().y;
}

GameWall.prototype.z = function() {
  return this.body.getPosition().z;
}

GameWall.prototype.position = function() {
  return this.body.getPosition();
}

function WallView(wall, game, body) {
  this.game = game;
  this.body = body;
  this.node = game.addChild();
  this.node
      .setAlign(
        wall.x(),
        wall.y(),
        wall.z()
      )
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(400*(wall.x()),400*wall.y(),400*wall.z());
      console.log(wall.x());
}

function WallMesh(node) {
  this.skin = new Mesh(node);
  this.skin.setGeometry('Box').setBaseColor(new Color('green'));
}

module.exports = GameWall;
