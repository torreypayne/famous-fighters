var PointLight = require('famous/webgl-renderables/lights/PointLight');
var Mesh = require('famous/webgl-renderables/Mesh');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');
var DOMElement = require('famous/dom-renderables/DOMElement');
var math = require('famous/math');
var physics = require('famous/physics');
var Transform = require('famous/core/Transform');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Particle = physics.Particle;
var Sphere = physics.Sphere;
var Asteroid = require('./Asteroid');
var Ship = rquire('./Ship');

var FamousEngine = require('famous/core/FamousEngine');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);

  var context = FamousEngine.getContext('body');

  var numAsteroids = num || 21;
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

  var shipSphere = new Sphere({ mass: 50, radius: 50, position: shipNode.position });
  world.add(shipSphere);

  shipSphere.setVelocity([0.1, 0.1, 0]);

  var ship = new Mesh(shipNode, shipSphere).setGeometry('Sphere', { detail: 50 });
  shipSphere.setForce(10,10,10).setMomentum(50,50,50);
  for (var i = 0; i < numAsteroids; i++) {
    var asteroidSphere = new Sphere({
      mass: 10,
      radius: 25,
      position: asteroidNodes[i].position,
      velocity: [0.5, 0.5, 0.5]
    });
    asteroidSphere.setForce(2*Math.random(), 2*Math.random(), 2*Math.random());
    var asteroid = new Mesh(asteroidNodes[i], asteroidSphere).setGeometry('Sphere');
    world.add(asteroidSphere);
    asteroidBodies.push(asteroidSphere);
    asteroidViews.push(asteroid);
  }

  for (var i = 0; i < asteroidBodies.length-1; i++) {
    var gravity = new Gravity3D(asteroidBodies[i], [shipSphere], {strength: 1});
    world.add(gravity);
  }

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
  var clock = FamousEngine.getClock();

  FamousEngine.getClock().setInterval(function() {
    var time = clock.getTime();
    world.update(time);
    shipNode.setRotation(
      time / 500,
      time / 200,
      time / 300
    );
    // shipNode.setPosition(
    //   shipNode.getPosition()[0] + 10*Math.random() - 5,
    //   shipNode.getPosition()[1] + 10*Math.random() - 5,
    //   shipNode.getPosition()[2] + 10*Math.random() - 5
    //   );

    // console.log(shipNode);
    // console.log(shipSphere);
    // console.log(shipSphere.getMomentum());
    // console.log(shipSphere.getVelocity());
    console.log(shipNode.getPosition());
    console.log(shipSphere.getPosition());
    shipNode.setPosition(
      shipSphere.getPosition().x,
      shipSphere.getPosition().y,
      shipSphere.getPosition().z
    );
    shipNode.getPosition();
  // FamousEngine.pipe(scene);
  // context.add(scene);

    for (var j = 0; j < numAsteroids; j++) {
      var pos = asteroidNodes[j].getPosition();
      asteroidNodes[j].setRotation(
        time / 300,
        time / 300,
        time / 300
      );
      // asteroidNodes[j].setPosition(
      //   asteroidNodes[j].getPosition()[0] * 1.05 + Math.random()*5 - 2.5,
      //   asteroidNodes[j].getPosition()[1] * 1.05 + Math.random()*5 - 2.5,
      //   asteroidNodes[j].getPosition()[2] * 1.05 + Math.random()*5 - 2.5
      // );
    }
    // FamousEngine.update();
  }, 16);

}

module.exports = GameApp;
