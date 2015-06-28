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
var Ship = require('./Ship');
var Game = require('./Game');

var FamousEngine = require('famous/core/FamousEngine');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);

  var numAsteroids = num || 5;
  var asteroids = [];

  var gameView = new Game(scene);
  var ship = new Ship(gameView);
  world.add(ship.body);

  for (var i = 0; i < numAsteroids; i++) {
    var asteroid = new Asteroid(gameView);
    var gravity = new Gravity3D(
      asteroid.physBody.sphere,
      ship.physBody.sphere,
      { strength: 1 }
    );
    world.add(asteroid.body);
    // world.add(gravity);
    asteroids.push(asteroid);
  }

  world.add(asteroids.concat([ship]));

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
  var clock = FamousEngine.getClock();

  FamousEngine.getClock().setInterval(function() {
    var time = clock.getTime();
    world.update(time);
    ship.update(time);

    for (var j = 0; j < numAsteroids; j++) {
      asteroids[j].update(time);
    }
  }, 5);

}

module.exports = GameApp;
