var PointLight = require('famous/webgl-renderables/lights/PointLight');
var FamousEngine = require('famous/core/FamousEngine');
var Mesh = require('famous/webgl-renderables/Mesh');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');
var DOMElement = require('famous/dom-renderables/DOMElement');
var PhysicsEngine = require('famous/physics/PhysicsEngine');
var world = new PhysicsEngine();
// var Force = PhysicsEngine.Force;
// var DeviceView = require('./DeviceView');

function GameApp(scene, num) {
  var camera = new Camera(scene).setDepth(1000);

  var numAsteroids = num || 5;
  var asteroidNodes = [];

  var gameNode = scene.addChild()
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(200, 200, 200);

  var shipNode = gameNode.addChild()
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(0.5, 0.5, 0.5)
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(200, 200, 200);

  for (var i = 0; i < numAsteroids; i++) {
    var asteroidNode = gameNode.addChild()
      .setOrigin(0.5, 0.5, 0.5)
      .setAlign(2*Math.random(), 2*Math.random(), 2*Math.random())
      .setMountPoint(0.5, 0.5, 0.5)
      .setSizeMode(1, 1, 1)
      .setAbsoluteSize(75, 75, 75);
    asteroidNodes.push(asteroidNode);
  }


  // var gameCanvas = new Mesh(gameNode).setGeometry('Box');

  var ship = new Mesh(shipNode).setGeometry('Sphere');
  for (var i = 0; i < numAsteroids; i++) {
    var asteroid = new Mesh(asteroidNodes[i]).setGeometry('Sphere');
  }


  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);

  var light = new PointLight(lightNode).setColor(new Color('white'));

  var clock = FamousEngine.getClock();

  // var initialPush = new Force(asteroidNodes);

  // for (var i = 0; i < numAsteroids; i++) {
  //   initialPush.add(asteroidNodes[i]);
  // }

  FamousEngine.getClock().setInterval(function() {
    var time = clock.getTime();

    shipNode.setRotation(
      time / 1500,
      time / 1200,
      time / 1300
    );

    for (var j = 0; j < numAsteroids; j++) {
      asteroidNodes[j].setRotation(
        time / 300,
        time / 300,
        time / 300
      );
      // asteroidNodes[j].setTranslation();
    }
  }, 16);
}

module.exports = GameApp;
