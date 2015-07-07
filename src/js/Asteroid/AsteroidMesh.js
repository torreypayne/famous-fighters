var Mesh = require('famous/webgl-renderables/Mesh');

function AsteroidMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere');
}

AsteroidMesh.prototype.changeColor = function(color) {
  this.skin.setBaseColor(color);
}

module.exports = AsteroidMesh;
