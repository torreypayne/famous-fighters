var PointLight = require('famous/webgl-renderables/lights/PointLight');
var Mesh = require('famous/webgl-renderables/Mesh');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');
var DOMElement = require('famous/dom-renderables/DOMElement');
var math = require('famous/math');
var physics = require('famous/physics');
var Force = require('famous/physics/forces/Force');
var Transform = require('famous/core/Transform');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Particle = physics.Particle;
var Sphere = physics.Sphere;
var Asteroid = require('./Asteroid');
var AsteroidSphere = require('./AsteroidSphere');
var Ship = require('./Ship');
var Game = require('./Game');
var Vec3 = require('famous/math/Vec3');
var Collision = require('famous/physics/constraints/Collision');
var Bullet = require('./Bullet');
var FamousEngine = require('famous/core/FamousEngine');
var UIEvent = require('famous/dom-renderers/events/UIEvent');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);
  var numAsteroids = num || 60;
  var asteroids = [];
  var asteroidBodies = [];
  var bullets = [];

  var game = new Game(scene, world);
  game.addUIEvent('click');
  game.addUIEvent('keydown');
  game.start();
  // var ship = new Ship(game, world);
  // world.add(ship.body);
  // game.addShip(ship);

  // for (var i = 0; i < numAsteroids; i++) {
  //   var asteroid = new Asteroid(game, ship, world, asteroids);
  //   game.addAsteroid(asteroid);
  //   asteroidBodies.push(asteroid.body);
  // }

  var gravity = new Gravity3D(null, world.bodies,
    {
      strength: -6,
      max: 1000,
      anchor: new Vec3()
    }
  );
  world.add(gravity);


  // var objs = asteroids.concat([ship]);

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
  var clock = FamousEngine.getClock();

  // clock.setInterval(function() {
  //   var time = clock.getTime();
  //   world.update(time);
  //   ship.update(asteroids, time);
  //
  //   for (var j = 0; j < numAsteroids; j++) {
  //     game.asteroids[j].update(time);
  //   }
  //
  //   for (var i=0; i < bullets.length; i++) {
  //     bullets[i].update();
  //   }
  // }, 5);
  //
  // clock.setInterval(function() {
  //   for (var i = 0; i < numAsteroids/10; i++) {
  //     var asteroid = new Asteroid(game, ship, world, asteroids);
  //     game.addAsteroid(asteroid);
  //     asteroidBodies.push(asteroid.body);
  //   }
  // }, 1000);
  //
  // document.addEventListener('click', function(e) {
  //   var bullet = new Bullet(game, ship, world, asteroids);
  //   bullets.push(bullet);
  //   console.log(bullet);
  //   console.log("shot bullet!");
  // });

}

module.exports = GameApp;
