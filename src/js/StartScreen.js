var FamousEngine = require('famous/core/FamousEngine');
var Color = require('famous/utilities/Color');
var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function StartScreen(scene) {
  this.scene = scene;
  // Node.call(this);
  // var logo = scene.addChild(this);
  var logo = scene.addChild();
  var logoMesh = new DOMElement(logo, { tagName: 'img' })
      .setAttribute('src', 'https://res.cloudinary.com/tpayne/image/upload/s--xgC6kgR5--/q_jpegmini/v1436309519/Asteroids-Atari-2600-VCS_hnxkbb.jpg')
      ;
  logo
      .setSizeMode('absolute', 'absolute')
      .setAlign(0.45, 0.5, 0.5)
      .setMountPoint(0.5, 0.85, 0.5)
      .setOrigin(0.5, 0.5, 0.5)
      .setAbsoluteSize(400, 400, 400)
      .setProportionalSize(1, 1, 1)
      ;

  var instructions = scene.addChild();
  instructions
      .setSizeMode('absolute', 'absolute')
      .setAlign(0.45, 0.75)
      .setMountPoint(0.5, 0.5)
      .setOrigin(0.5, 0.5)
      .setAbsoluteSize(650, 200)
      .setProportionalSize(1, 1)
      ;

  new DOMElement(instructions, {
    tagName: 'h2',
    content: "CONTROLS:<br><p>- Rotate the ship using the WASD keys.</p><p>- Move with the arrow keys.</p><p>- Shoot with the Space bar.</p>"
  })
      // .setProperty('position', 'absolute')
      .setProperty('background-color', '#99FF99')
      .setProperty('opacity', 1)
  ;

  //
  // this
  //     .setSizeMode('absolute', 'absolute')
  //     .setAlign(0.5,-0.75)
  //     .setMountPoint(0.5, 0.5)
  //     .setOrigin(0.5, 0.5)
  //     .setAbsoluteSize(750, 400)
  //     .setProportionalSize(1, 1);

  var spinner = logo.addComponent({
    onUpdate: function(time) {
      logo.setRotation(0, time / 1000, 0);
      logo.requestUpdateOnNextTick(spinner);
    }
  });

  logo.requestUpdate(spinner);
  // this.el = new DOMElement(this,
  //   {
  //     tagName: 'h1',
  //     content: "Welcome to 3D Asteroids! Rotate the ship using the W, A, S, D keys. Move the ship using the arrow keys.  Shoot a bullet using the space button."
  //   })
  //     .setProperty('position', 'absolute')
  //     .setProperty('background-color', 'grey')
  //     .setProperty('opacity', 0.75)
  // ;

}

StartScreen.prototype = Object.create(Node.prototype);
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.removeScreen = function() {
  this.scene.removeChild(this);
}

module.exports = StartScreen;
