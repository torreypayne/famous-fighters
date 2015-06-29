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
var Collision = require('famous/physics/constraints/Collision');

var FamousEngine = require('famous/core/FamousEngine');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);

  var numAsteroids = num || 20;
  var asteroids = [];
  var asteroidBodies = [];
  var asteroidsCollision = new Collision();

  var gameView = new Game(scene);
  var ship = new Ship(gameView, world);
  world.add(ship.body);

  for (var i = 0; i < numAsteroids; i++) {
    var newAsteroid = false;
    while (newAsteroid === false) {
      var asteroid = new Asteroid(gameView, ship, world);
      // shipCollision.addTarget(asteroid.body);
      if (asteroid.collidesWithOthers(asteroids) === false) {
        asteroidsCollision.addTarget(asteroid.body);
        var shipCollision = new Collision([ship.body, asteroid.body]);
        world.add(shipCollision);
        newAsteroid = true;
      } else {
        asteroid.remove();
      }
    }
    var gravity = new Gravity3D(
      asteroid.body,
      ship.body,
      { strength: 10 }
    );
    asteroids.push(asteroid);
    asteroidBodies.push(asteroid.body);
    world.add(gravity);
  }

  world.add(asteroidsCollision);
  console.log(asteroidsCollision);

  var objs = asteroids.concat([ship]);

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
  var clock = FamousEngine.getClock();

  clock.setInterval(function() {
    var time = clock.getTime();
    world.update(time);
    ship.update(time);
    if (ship)

    for (var j = 0; j < numAsteroids; j++) {
      asteroids[j].update(time);
      // console.log(world.constraints[j+1]);
      console.log(world.constraints[j].broadPhase.overlaps);
    }
    // console.log(world.constraints[numAsteroids + 1]);
  }, 5);

}

module.exports = GameApp;
