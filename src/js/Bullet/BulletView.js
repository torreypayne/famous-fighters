var Node = require('famous/core/Node');

function BulletView(game, ship, physBody) {
  Node.call(this);
  ship.node.addChild(this);
  this.physBody = physBody;
  this
      .setOrigin(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(50, 50, 50)
      .setAlign(
        ship.node.getAlign()[0]*.5,
        ship.node.getAlign()[1]*.5,
        ship.node.getAlign()[2]*.5
      );
}

BulletView.prototype = Object.create(Node.prototype);
BulletView.prototype.constructor = BulletView;

module.exports = BulletView;
