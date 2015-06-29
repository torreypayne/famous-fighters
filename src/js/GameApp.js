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
var Vec3 = require('famous/math/Vec3');
var Collision = require('famous/physics/constraints/Collision');
var Bullet = require('./Bullet');
var FamousEngine = require('famous/core/FamousEngine');

function GameApp(scene, num) {
  var world = new physics.PhysicsEngine();
  var camera = new Camera(scene).setDepth(1000);
  var numAsteroids = num || 20;
  var asteroids = [];
  var asteroidBodies = [];
  var bullets = [];

  var gameView = new Game(scene);
  var ship = new Ship(gameView, world);
  world.add(ship.body);

  for (var i = 0; i < numAsteroids; i++) {
    var asteroid = new Asteroid(gameView, ship, world, asteroids);
    var shipCollision = new Collision([ship.body, asteroid.body]);
    world.add(shipCollision);
    asteroids.push(asteroid);
    asteroidBodies.push(asteroid.body);
    world.add(gravity);
  }

  var gravity = new Gravity3D(null, world.bodies,
    {
      strength: -6,
      max: 1000,
      anchor: new Vec3()
    }
  );
  world.add(gravity);
  console.log(gravity);

  var asteroidsCollision = new Collision(asteroidBodies);
  world.add(asteroidsCollision);
  console.log(asteroidsCollision);
  console.log(world.constraints);

  var objs = asteroids.concat([ship]);

  var lightNode = scene.addChild().setAlign(0.5, 0.5, 0.5).setPosition(0, 0, 250);
  var light = new PointLight(lightNode).setColor(new Color('white'));
  var clock = FamousEngine.getClock();

  clock.setInterval(function() {
    var time = clock.getTime();
    world.update(time);
    ship.update(time);

    for (var j = 0; j < numAsteroids; j++) {
      asteroids[j].update(time);
      // console.log(world.constraints[j+1]);
      var obj = world.constraints[j].broadPhase.overlaps;
      console.log(obj);
      obj.forEach(function(collision) {
        console.log(collision);
        if (collision[0] && collision[0] === ship.body) {
          debugger;
          console.log("GAME OVER!");
        } else {
          console.log("Collided Asteroid removed!");
          collision[0].remove() && collision[1].remove();
        }
      });
    }

    for (var i=0; i < bullets.length; i++) {
      bullets[i].update();
    }
  }, 5);

  document.addEventListener('click', function(e) {
    var bullet = new Bullet(gameView, ship, world, asteroids);
    bullets.push(bullet);
    console.log(bullet);
    console.log("shot bullet!");
  });

}

module.exports = GameApp;
