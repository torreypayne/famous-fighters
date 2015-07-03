'use strict';

// Famous dependencies
var DOMElement = require('famous/dom-renderables/DOMElement');
var FamousEngine = require('famous/core/FamousEngine');

var scene = FamousEngine.createScene('body');

FamousEngine.init();

var GameApp = require('./js/GameApp');
var game = new GameApp(scene);
