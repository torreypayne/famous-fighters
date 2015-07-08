var FamousEngine = require('famous/core/FamousEngine');
var Color = require('famous/utilities/Color');
var Node = require('famous/core/Node');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Mesh = require('famous/webgl-renderables/Mesh');
var Color = require('famous/utilities/Color');

function StartScreen(scene) {
  this.scene = scene;
  var logo = this.logo = scene.addChild();
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

  var instructions = this.instructions = scene.addChild();
  instructions
      .setSizeMode('absolute', 'absolute')
      .setAlign(0.45, 0.75)
      .setMountPoint(0.5, 0.5)
      .setOrigin(0.5, 0.5)
      .setAbsoluteSize(650, 250)
      .setProportionalSize(1, 1)
      ;

  new DOMElement(instructions, {
    tagName: 'h2',
    content: "<p style='color:white'>CONTROLS: Click to Start!!</p><p style='color:white'>- Rotate the ship using the WASD keys.</p><p style='color:white'>- Move with the arrow keys.</p><p style='color:white'>- Shoot with the Space bar.</p>"
  })
      .setProperty('background-color', 'black')
      .setProperty('opacity', .7)
      .setProperty('padding', '5px')
      ;

  var spinner = logo.addComponent({
    onUpdate: function(time) {
      logo.setRotation(0, time / 1800, 0);
      logo.requestUpdateOnNextTick(spinner);
    }
  });

  logo.requestUpdate(spinner);
}

StartScreen.prototype = Object.create(Node.prototype);
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.removeScreen = function() {
  this.scene.removeChild(this.instructions) && this.scene.removeChild(this.logo);
}

module.exports = StartScreen;
