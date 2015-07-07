var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function ShipMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Icosahedron', { detail: 10 })
      .setBaseColor(new Color('red'))
      ;
}

module.exports = ShipMesh;
