var Node = require('famous/core/Node');
var math = require('famous/math');
var physics = require('famous/physics');
var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Gravity1D = physics.Gravity1D;
var Gravity3D = physics.Gravity3D;
var Color = require('famous/utilities/Color');
var Sphere = physics.Sphere;
var Wall = physics.Wall;
var Bullet = require('./Bullet');
var Ship = require('./Ship');
var Asteroid = require('./Asteroid');
var UIEvent = require('famous/dom-renderers/events/UIEvent');
var KeyboardEvent = require('famous/dom-renderers/events/KeyboardEvent');
var GameWall = require('./GameWall');
// var Surface = require('famous/core/Surface');

function Game(scene, world, camera) {
  Node.call(this);
  scene.addChild(this);
  this.setOrigin(0.5, 0.5, 0.5)
      .setSizeMode('absolute', 'absolute', 'absolute')
      .setAbsoluteSize(250, 250)
  ;

  // this.el = new DOMElement(this)
  //     .setProperty("backgroundColor", 'black')
      // .setAbsoluteSize(1000,1000);
      // .setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/A_starry_sky_above_Death_Valley_and_Orionid.jpg/1280px-A_starry_sky_above_Death_Valley_and_Orionid.jpg');
  // this.el2 = new DOMElement(this);

  // this.el
      // .setProperty("backgroundImage", 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/A_starry_sky_above_Death_Valley_and_Orionid.jpg/1280px-A_starry_sky_above_Death_Valley_and_Orionid.jpg')
      // .setProperty("backgroundSize", "200x 200px");
  this.NUM_ASTEROIDS = 200;
  this._domElement = new DOMElement(this);
  this.world = world;
  this.asteroids = [];
  this.asteroidBodies = [];
  this.bullets = [];
  this.ship = new Ship(this, world);
  this.walls = [];
  world.add(this.ship.body);
  this.setProportionalSize(1, 1, 1);
  this.clock = FamousEngine.getClock();
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var asteroid = new Asteroid(this, this.ship, world, this.asteroids);
    this.addAsteroid(asteroid);
    this.asteroidBodies.push(asteroid.body);
  }

  this.setupWalls();
  this.addUIEvent('click');
  this.addUIEvent('keydown');
  this.addUIEvent('keyup');
}
Game.prototype = Object.create(Node.prototype);
Game.prototype.constructor = Game;

Game.prototype.start = function() {
  this.clock.setInterval(function() {
    var time = this.clock.getTime();
    this.world.update(time);
    this.ship.update(this.asteroids, time);

    this.asteroids.forEach(function(asteroid) {
      asteroid.update();
    });

    this.bullets.forEach(function(bullet, idx) {
      console.log(idx);
      bullet.update();
    });
    console.log(this.bullets.length);

    this.walls.forEach(function(wall) {
      wall.update();
    });
  }.bind(this), 5);

  this.clock.setInterval(function() {
    var time = this.clock.getTime();
    // debugger;
    var pos = this.ship.position();
    this.setPosition(pos.x, pos.y, pos.z);
    this.setRotation(
      0,
      time / 1500,
      0
    );
  }.bind(this), 5);

  // this.clock.setInterval(function() {
  //   for (var i = 0; i < this.NUM_ASTEROIDS/10; i++) {
  //     var asteroid = new Asteroid(this, this.ship, this.world, this.asteroids);
  //     this.addAsteroid(asteroid);
  //     this.asteroidBodies.push(asteroid.body);
  //   }
  // }.bind(this), 2000);
}


Game.prototype.addShip = function(ship) {
  this.ship = ship;
}

Game.prototype.addAsteroid = function(asteroid) {
  this.asteroids.push(asteroid);
}

Game.prototype.onReceive = function onReceive(type, ev) {
  if (type === "click") {
    var bullet = new Bullet(this, this.ship, this.world, this.asteroids);
    this.bullets.push(bullet);
    console.log('Fire!');
    this.emit('bulletfire', ev.value);
  } else {
    debugger;
    console.log(type);
  }
  this.getChildren().forEach(function(child) {
    child.onReceive && child.onReceive(type, ev);
  });
}

Game.prototype.setupWalls = function() {
  this.downWall = new GameWall(this, this.world, { direction: Wall.DOWN, position: [100, 0, 0] });
  this.upWall = new GameWall(this, this.world, { direction: Wall.UP, position: [-100,0,0] });
  this.leftWall = new GameWall(this, this.world, { direction: Wall.LEFT, position: [0, 100, 0] });
  this.rightWall = new GameWall(this, this.world, { direction: Wall.RIGHT, position: [0, -100, 0] });
  this.forwardWall = new GameWall(this, this.world, { direction: Wall.FORWARD, position: [0, 0, 100] });
  this.backWall = new GameWall(this, this.world, { direction: Wall.BACKWARD, position: [0, 0, -100] });
  this.walls.push(
    this.downWall,
    this.upWall,
    this.leftWall,
    this.rightWall,
    this.forwardWall,
    this.backWall
  );
}

module.exports = Game;
