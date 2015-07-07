var FamousEngine = require('famous/core/FamousEngine');
var Color = require('famous/utilities/Color');
var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function StartScreen(scene) {
  this.scene = scene;
  Node.call(this);
  scene.addChild(this);
  this
      .setSizeMode('absolute', 'absolute')
      .setAlign(0.5,-0.75)
      .setMountPoint(0.5, 0.5)
      .setOrigin(0.5, 0.5)
      .setAbsoluteSize(750, 400)
      .setProportionalSize(1, 1);
  // this.mesh = new Mesh(this)
  //     .setGeometry('Icosahedron', { detail: 10 })
  //     .setBaseColor(new Color('pink'))
  //     ;
  this.el = new DOMElement(this,
    {
      tagName: 'h1',
      content: "Welcome to 3D Asteroids! Rotate the ship using the W, A, S, D keys. Move the ship using the arrow keys.  Shoot a bullet using the space button."
    })
      .setProperty('position', 'absolute')
      .setProperty('background-color', 'grey')
      .setProperty('opacity', 0.75)
  ;

}

StartScreen.prototype = Object.create(Node.prototype);
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.removeScreen = function() {
  this.scene.removeChild(this);
}

module.exports = StartScreen;
