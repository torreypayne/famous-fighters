var PointLight = require('famous/webgl-renderables/lights/PointLight');
var Camera = require('famous/components/Camera');
var Color = require('famous/utilities/Color');
var physics = require('famous/physics');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Asteroid = require('./Asteroid');
var AsteroidSphere = require('./AsteroidSphere');
var Ship = require('./Ship');
var Game = require('./Game');
var Vec3 = require('famous/math/Vec3');
var Bullet = require('./Bullet');
var FamousEngine = require('famous/core/FamousEngine');
var UIEvent = require('famous/dom-renderers/events/UIEvent');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(4000);
  var numAsteroids = num || 150;
  var asteroids = [];
  var asteroidBodies = [];
  var bullets = [];

  var game = new Game(scene, world, camera);
  game.start();

  var gravOpts = {
    strength: -6,
    max: 1000,
    anchor: new Vec3()
  };
  var gravity = new Gravity3D(null, world.bodies, gravOpts);
  world.add(gravity);
  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
}

module.exports = GameApp;
