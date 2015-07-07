var Node = require('famous/core/Node');

function ShipView(scene, body) {
  Node.call(this);
  scene.addChild(this);
  this
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(
        body.x()*.5,
        body.y()*.5,
        body.z()*.5
      )
      .setMountPoint(1, 1, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(100, 100, 100);
}

ShipView.prototype = Object.create(Node.prototype);
ShipView.prototype.constructor = ShipView;

module.exports = ShipView;
