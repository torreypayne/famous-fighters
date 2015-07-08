var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function BulletMesh(node) {
  this.skin = new Mesh(node);
  this.skin
      .setGeometry('Sphere', { detail: 50 })
      .setBaseColor(new Color('pink'))
      ;
}

module.exports = BulletMesh;
