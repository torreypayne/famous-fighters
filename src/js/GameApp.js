// var famous = require('famous');
var PointLight = require('famous/webgl-renderables/lights/PointLight');
// var Engine     = require('famous/core/Engine');

var Mesh = require('famous/webgl-renderables/Mesh');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');
var DOMElement = require('famous/dom-renderables/DOMElement');
var math = require('famous/math');
var physics = require('famous/physics');
// var PhysicsEngine = require('famous/physics/PhysicsEngine');
// var Force = PhysicsEngine.Force;
// var DeviceView = require('./DeviceView');

function GameApp(scene, num) {
  var Gravity1D = physics.Gravity1D;
  var Gravity3D = physics.Gravity3D;
  var Particle = physics.Particle;
  var Sphere = physics.Sphere;
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);

  var FamousEngine = require('famous/core/FamousEngine');
  // var mainContext = FamousEngine.createContext();

  var numAsteroids = num || 5;
  var asteroidNodes = [];
  var asteroidBodies = [];
  var asteroidViews = [];

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

  var shipSphere = new Sphere({ mass: 50, radius: 50 }).setVelocity([1,1,0]);
  // var asteroidSphere = new Sphere({ mass: 100, radius: 25 });


  // var gameCanvas = new Mesh(gameNode).setGeometry('Box');

  var ship = new Mesh(shipNode, shipSphere).setGeometry('Sphere', { detail: 100 });
  for (var i = 0; i < numAsteroids; i++) {
    var asteroidSphere = new Sphere({ mass: 100, radius: 25 }).setForce(1,1,1).setVelocity(1,1,1);
    asteroidBodies.push(asteroidSphere);
    var asteroid = new Mesh(asteroidNodes[i], asteroidSphere).setGeometry('Sphere');
    asteroidViews.push(asteroid);
    // var asteroid = new Mesh(asteroidNodes[i]).setGeometry('Sphere');
  }

  for (var i = 0; i < asteroidBodies.length; i++) {
    var gravity = new Gravity3D(asteroidBodies[i], asteroidBodies, {strength: 300});
    gravity.init();
    world.addForce(gravity);
  }


  world.add([shipSphere].concat(asteroidBodies));

  var Collision = physics.Collision;
  var collision = new Collision([shipSphere].concat(asteroidBodies));
  world.addConstraint(collision);

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);

  var light = new PointLight(lightNode).setColor(new Color('white'));

  var clock = FamousEngine.getClock();

  // var initialPush = new Force(asteroidNodes);

  // for (var i = 0; i < numAsteroids; i++) {
  //   initialPush.add(asteroidNodes[i]);
  // }

  // mainContext.add(asteroidViews[0]);

  FamousEngine.getClock().setInterval(function() {
    var time = clock.getTime();
    world.update(time);

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
      // asteroidBodies[j].update();
    }
    // FamousEngine.update();
  }, 16);
}

module.exports = GameApp;
