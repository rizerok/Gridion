/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.grid = new _index2.default('.container', 6); //require('_app/index.js');


	console.time(1234);
	var items = [];
	for (var i = 0; i < 25; i++) {
	    items[i] = {
	        data: '' + (i + 1),
	        size: {
	            w: nr(1, 3),
	            h: nr(1, 3)
	        },
	        buildCallback: function buildCallback(cell) {
	            cell.view.el.addEventListener('click', function () {
	                window.grid.removeItem(cell.model.id);
	            });
	        }
	    };
	}
	window.grid.fastAddItems(items);
	console.timeEnd(1234);

	function nr(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function renderTable() {
	    for (var v = 0; v < window.grid.model.table.cells.length; v++) {
	        var tr = document.createElement('tr');
	        table.appendChild(tr);
	        for (var h = 0; h < window.grid.model.table.cells[v].length; h++) {
	            var td = document.createElement('td');
	            td.innerHTML = window.grid.model.table.cells[v][h];
	            tr.appendChild(td);
	        }
	    }
	}

	var table = document.querySelector('table');
	renderTable();
	window.addItems = function () {
	    var items = [];
	    for (var _i = 0; _i < 2; _i++) {
	        items[_i] = {
	            data: '' + _i,
	            size: {
	                w: nr(1, 3),
	                h: nr(1, 3)
	            },
	            buildCallback: function buildCallback(cell) {
	                // cell.view.el.style.backgroundSize = 'cover';
	                // cell.view.el.style.backgroundColor = 'transparent';
	                // cell.view.el.style.backgroundImage = `url(http://lorempixel.com/${Math.floor(grid.model.size*cell.model.w)}/${Math.floor(grid.model.size*cell.model.h)})`;
	                cell.view.el.addEventListener('click', function () {
	                    console.log('cell', cell);
	                    window.grid.removeItem(cell.model.id);
	                });
	            }
	        };
	    }
	    window.grid.addItems(items, 0);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	import Gridion from '_app/app';
	export default Gridion;

/***/ }
/******/ ]);