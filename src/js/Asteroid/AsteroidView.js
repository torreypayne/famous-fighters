var Node = require('famous/core/Node');

function AsteroidView(game, physBody) {
  Node.call(this);
  game.ship.node.addChild(this);
  this.physBody = physBody;
  this.game = game;
  this
      .setAlign(
        physBody.x()*.5,
        physBody.y()*.5,
        physBody.z()*.5
      )
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(
        physBody.radius()*5,
        physBody.radius()*5,
        physBody.radius()*5
  );
}

AsteroidView.prototype = Object.create(Node.prototype);
AsteroidView.prototype.constructor = AsteroidView;

AsteroidView.prototype.onReceive = function onReceive(type, ev) {}

AsteroidView.prototype.remove = function() {}

module.exports = AsteroidView;
