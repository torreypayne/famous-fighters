function Reqs() {

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
}

module.exports = Reqs;
