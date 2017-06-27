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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Gridion = undefined;

	var _component = __webpack_require__(4);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Gridion = _component2.default;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _transitoins = __webpack_require__(5);

	var _transitoins2 = _interopRequireDefault(_transitoins);

	var _aTools = __webpack_require__(6);

	var _aTools2 = _interopRequireDefault(_aTools);

	var _view = __webpack_require__(10);

	var _view2 = _interopRequireDefault(_view);

	var _model = __webpack_require__(15);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Gridion = function () {
	    function Gridion(parentSelector, cols) {
	        var _this = this;

	        _classCallCheck(this, Gridion);

	        this.parent = document.querySelector(parentSelector);
	        this.view = new _view2.default();
	        this.appendToParent();
	        this.model = new _model2.default(this.view.el.offsetWidth, cols);

	        var update = void 0;
	        window.addEventListener('resize', function () {
	            clearTimeout(update);
	            update = setTimeout(function () {
	                _this.model.updateSize(_this.view.el.offsetWidth);
	                _this.model.list.forEach(function (cell) {
	                    cell.model.updateSize(_this.model.size);
	                });
	                _this.fastUpdate();
	            }, 100);
	        });
	    }

	    _createClass(Gridion, [{
	        key: 'appendToParent',
	        value: function appendToParent() {
	            this.parent.appendChild(this.view.el);
	        }
	    }, {
	        key: 'fastAddItem',
	        value: function fastAddItem(config, index) {
	            var cell = this.model.addItem(config, index);
	            this.view.addItem(cell.view.el);
	            this.fastUpdate();
	        }
	    }, {
	        key: 'fastAddItems',
	        value: function fastAddItems(configList, index) {
	            var _this2 = this;

	            if (configList instanceof Array) {
	                var cellList = this.model.addItems(configList, index);
	                cellList.forEach(function (cell) {
	                    _this2.view.addItem(cell.view.el);
	                });
	                this.fastUpdate();
	            } else {
	                throw new TypeError('list is not an array');
	            }
	        }
	    }, {
	        key: 'fastRemoveItem',
	        value: function fastRemoveItem(id) {
	            var cell = this.model.removeItem(id);
	        }
	    }, {
	        key: 'fastUpdate',
	        value: function fastUpdate() {
	            this.model.list.forEach(function (cell) {
	                cell.updateSize();
	                cell.updatePosition();
	            });
	            var height = this.model.table.cells.length;
	            this.view.setHeight(height * this.model.size);
	        }
	    }, {
	        key: 'addItems',
	        value: function addItems(configList, index) {
	            if (configList instanceof Array) {
	                var newCells = this.model.addItems(configList, index);

	                var height = this.model.table.cells.length;
	                this.view.setHeight(height * this.model.size);

	                new _aTools2.default.Animation(_transitoins2.default.positioning.simpleTranslate(this, this.model.differences)).then(_transitoins2.default.add.scaleMax(this, newCells)).run();
	            } else {
	                throw new TypeError('list is not an array');
	            }
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(id) {
	            var _this3 = this;

	            var cell = this.model.removeItem(id);

	            new _aTools2.default.Animation(_transitoins2.default.remove.scaleMin(this, [cell])).then(_transitoins2.default.positioning.simpleTranslate(this, this.model.differences)).run(function () {

	                var height = _this3.model.table.cells.length;
	                _this3.view.setHeight(height * _this3.model.size);
	            });
	        }
	    }, {
	        key: 'scaleItem',
	        value: function scaleItem(id, x, y) {
	            var _this4 = this;

	            var cell = this.model.scaleItem(id, x, y);

	            new _aTools2.default.Animation(_transitoins2.default.scaling.scaleMin(this, [cell])).then(_transitoins2.default.positioning.simpleTranslate(this, this.model.differences)).then(_transitoins2.default.scaling.scaleMax(this, [cell])).run(function () {
	                var height = _this4.model.table.cells.length;
	                _this4.view.setHeight(height * _this4.model.size);
	            });
	        }
	    }]);

	    return Gridion;
	}();

	exports.default = Gridion;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _aTools = __webpack_require__(6);

	var _aTools2 = _interopRequireDefault(_aTools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    add: {
	        fadeOut: function fadeOut(gridion, cells) {
	            return new _aTools2.default.Transition(function () {
	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-fade');
	                    gridion.view.addItem(cell.view.el);
	                    cell.updateSize();
	                    cell.updatePosition();
	                });
	            }, function () {
	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-fading');
	                    gridion.view.addItem(cell.view.el);
	                });
	            }, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        _aTools2.default.teOnce(cell.view.el, function () {
	                            cell.view.el.classList.remove('is-fading');
	                            if (callback && ! --updatedItemsCount) {
	                                callback();
	                            }
	                        });
	                        cell.view.el.classList.remove('is-fade');
	                    });
	                } else {
	                    callback && callback();
	                }
	            }, function () {});
	        },
	        scaleMax: function scaleMax(gridion, cells) {
	            return new _aTools2.default.Transition(function () {
	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-scaling');
	                    gridion.view.addItem(cell.view.el);
	                    cell.updateSize();
	                    cell.updatePosition();
	                });
	            }, function () {
	                cells.forEach(function (cell) {
	                    cell.view.transforms.addToElement(cell.view.el, {
	                        scale: ['0']
	                    });
	                });
	            }, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        cell.view.transforms.addToElement(cell.view.el, {
	                            scale: ['1']
	                        });
	                        _aTools2.default.teOnce(cell.view.el, function () {
	                            cell.view.el.addEventListener('transitionend', function () {
	                                console.log();
	                                if (! --updatedItemsCount && callback) {
	                                    callback();
	                                }
	                            });
	                        });
	                    });
	                } else {
	                    callback && callback();
	                }
	            }, function () {});
	        }
	    },
	    remove: {
	        scaleMin: function scaleMin(gridion, cells) {
	            console.log(cells);
	            return new _aTools2.default.Transition(function () {
	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-scaling');
	                });
	            }, function () {
	                cells.forEach(function (cell) {
	                    cell.view.transforms.addToElement(cell.view.el, {
	                        scale: ['1']
	                    });
	                });
	            }, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        cell.view.transforms.addToElement(cell.view.el, {
	                            scale: ['0']
	                        });
	                        cell.view.el.addEventListener('transitionend', function () {
	                            if (! --updatedItemsCount && callback) {
	                                callback();
	                            }
	                            cell.view.el.remove();
	                        });
	                    });
	                } else {
	                    callback && callback();
	                }
	            }, function () {});
	        }
	    },
	    positioning: {
	        simpleTranslate: function simpleTranslate(gridion, cells) {
	            return new _aTools2.default.Transition(function () {}, function () {}, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        _aTools2.default.teOnce(cell.view.el, function () {

	                            if (! --updatedItemsCount && callback) {
	                                callback();
	                            }
	                        });
	                        cell.updateSize();
	                        cell.updatePosition();
	                    });
	                } else {
	                    callback && callback();
	                }
	            }, function () {});
	        }
	    },
	    scaling: {
	        scaleMax: function scaleMax(gridion, cells) {
	            return new _aTools2.default.Transition(function () {

	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-scaling');
	                    cell.updateSize();
	                    cell.updatePosition();
	                });
	            }, function () {

	                cells.forEach(function (cell) {
	                    cell.view.transforms.addToElement(cell.view.el, {
	                        scale: ['0']
	                    });
	                });
	            }, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        cell.view.transforms.addToElement(cell.view.el, {
	                            scale: ['1']
	                        });

	                        _aTools2.default.teOnce(cell.view.el, function () {

	                            if (! --updatedItemsCount && callback) {
	                                callback();
	                            }
	                        });
	                    });
	                } else {

	                    callback && callback();
	                }
	            }, function () {});
	        },
	        scaleMin: function scaleMin(gridion, cells) {
	            return new _aTools2.default.Transition(function () {
	                cells.forEach(function (cell) {
	                    cell.view.el.classList.add('is-scaling');
	                });
	            }, function () {
	                cells.forEach(function (cell) {
	                    cell.view.transforms.addToElement(cell.view.el, {
	                        scale: ['1']
	                    });
	                });
	            }, function (callback) {
	                var updatedItemsCount = cells.length;
	                if (updatedItemsCount !== 0) {
	                    cells.forEach(function (cell) {
	                        cell.view.transforms.addToElement(cell.view.el, {
	                            scale: ['0']
	                        });
	                        cell.view.el.addEventListener('transitionend', function () {
	                            if (! --updatedItemsCount && callback) {
	                                callback();
	                            }
	                        });
	                    });
	                } else {
	                    callback && callback();
	                }
	            }, function () {});
	        }
	    }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _animation = __webpack_require__(7);

	var _animation2 = _interopRequireDefault(_animation);

	var _transition = __webpack_require__(8);

	var _transition2 = _interopRequireDefault(_transition);

	var _teOnce = __webpack_require__(9);

	var _teOnce2 = _interopRequireDefault(_teOnce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ATools = function () {
	    function ATools() {
	        _classCallCheck(this, ATools);
	    }

	    _createClass(ATools, null, [{
	        key: 'Animation',
	        //animation tools;
	        get: function get() {
	            return _animation2.default;
	        }
	    }, {
	        key: 'Transition',
	        get: function get() {
	            return _transition2.default;
	        }
	    }, {
	        key: 'teOnce',
	        get: function get() {
	            return _teOnce2.default;
	        }
	    }]);

	    return ATools;
	}();

	exports.default = ATools;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Animation = function () {
	    function Animation(transition) {
	        _classCallCheck(this, Animation);

	        this.list = [transition];
	    }

	    _createClass(Animation, [{
	        key: "then",
	        value: function then(transition) {
	            this.list.push(transition);
	            return this;
	        }
	    }, {
	        key: "run",
	        value: function run(callback) {
	            var fnc = this.list[this.list.length - 1].run.bind(this.list[this.list.length - 1], callback); //inner
	            for (var i = this.list.length - 2; i >= 0; i--) {
	                fnc = this.list[i].run.bind(this.list[i], fnc); //self,callback
	            }
	            fnc();
	        }
	    }]);

	    return Animation;
	}();

	exports.default = Animation;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Transitions = function () {
	    function Transitions(prepare, start, finish, ending) {
	        _classCallCheck(this, Transitions);

	        this.prepare = prepare;
	        this.start = start;
	        this.finish = finish;
	        this.ending = ending;
	    }

	    _createClass(Transitions, [{
	        key: "run",
	        value: function run(callback) {
	            var _this = this;

	            this.prepare();
	            requestAnimationFrame(function () {
	                _this.start();
	                requestAnimationFrame(function () {
	                    _this.finish(function () {
	                        _this.ending();
	                        callback && callback();
	                    });
	                });
	            });
	        }
	    }]);

	    return Transitions;
	}();

	exports.default = Transitions;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = teOnce;
	//transitionend once
	function teOnce(el, callback) {
	    var fnc = function fnc() {
	        el.removeEventListener('transitionend', fnc);
	        callback();
	    };
	    el.addEventListener('transitionend', fnc);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(11);

	var _grid = __webpack_require__(13);

	var _grid2 = _interopRequireDefault(_grid);

	var _abstractView = __webpack_require__(14);

	var _abstractView2 = _interopRequireDefault(_abstractView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var View = function (_AbstractView) {
	    _inherits(View, _AbstractView);

	    function View() {
	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

	        _this.grid = _this.createElement((0, _grid2.default)());
	        return _this;
	    }

	    _createClass(View, [{
	        key: 'addItem',
	        value: function addItem(element) {
	            this.el.appendChild(element);
	        }
	    }, {
	        key: 'addItemAnimated',
	        value: function addItemAnimated(element) {
	            this.el.appendChild(element);
	        }
	    }, {
	        key: 'setHeight',
	        value: function setHeight(height) {
	            this.el.style.height = height + 'px';
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.el.innerHTML = '';
	        }
	    }]);

	    return View;
	}(_abstractView2.default);

	exports.default = View;

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function () {
	    return "<div class=\"gridion\"></div>";
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AbstractView = function () {
	    function AbstractView() {
	        _classCallCheck(this, AbstractView);
	    }

	    _createClass(AbstractView, [{
	        key: 'createElement',
	        value: function createElement(string) {
	            this.el = this.stringToElement(string);
	        }
	    }, {
	        key: 'stringToElement',
	        value: function stringToElement(s) {
	            var div = document.createElement('div');
	            div.innerHTML = s;
	            return div.firstChild;
	        }
	    }, {
	        key: 'appendTo',
	        value: function appendTo(parentSelector) {
	            this.parent = document.querySelector(parentSelector);
	            this.parent.appendChild(this.el);
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            this.el.parentNode.removeChild(this.el);
	        }
	    }]);

	    return AbstractView;
	}();

	exports.default = AbstractView;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _component = __webpack_require__(16);

	var _component2 = _interopRequireDefault(_component);

	var _model = __webpack_require__(21);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	    function Model(width, cols) {
	        _classCallCheck(this, Model);

	        this.size = parseFloat(width) / cols;
	        this.w = cols;
	        this.list = [];
	        this.table = new _model2.default(cols);
	        this.ids = [];
	        this.differences = [];
	    }

	    _createClass(Model, [{
	        key: 'updateSize',
	        value: function updateSize(width) {
	            this.size = parseFloat(width) / this.w;
	        }
	    }, {
	        key: 'genId',
	        value: function genId() {
	            var id = this.ids.length + 1;
	            this.ids.push(id);
	            return id;
	        }
	    }, {
	        key: 'addItem',
	        value: function addItem(config, index) {
	            var cell = new _component2.default(config);
	            if (!(index || index === 0 && index < this.list.length)) {
	                index = this.list.length;
	            }
	            //prepare
	            cell.setId(this.genId());
	            cell.model.size = this.size;
	            //list
	            this.list.splice(index, 0, cell);
	            //table
	            this.table.remove(); //let cp =
	            this.table.addCells(this.list);
	            //cell.model.setPosition(cp.x,cp.y);

	            this.setDifferences();

	            return cell;
	        }
	    }, {
	        key: 'addItems',
	        value: function addItems(configList, index) {
	            var _this = this;

	            var addedCellList = [];
	            if (!(index || index === 0 && index < this.list.length)) {
	                index = this.list.length;
	            }
	            configList.forEach(function (config) {
	                var cell = new _component2.default(config);
	                //prepare
	                cell.setId(_this.genId());
	                cell.model.size = _this.size;
	                addedCellList.push(cell);
	            });
	            //list
	            var push = this.list.splice.bind(this.list, index, 0);
	            push.apply(this.list, addedCellList);
	            //table
	            this.table.remove();
	            this.table.addCells(this.list);

	            this.setDifferences();

	            return addedCellList;
	        }
	    }, {
	        key: 'setDifferences',
	        value: function setDifferences() {
	            var _this2 = this;

	            this.differences = [];
	            this.list.forEach(function (cell) {
	                if (cell.model.y !== cell.model.yOld && cell.model.yOld !== null || cell.model.x !== cell.model.xOld && cell.model.xOld !== null) {

	                    if (cell.model.id === 2) {}
	                    //first set differences
	                    _this2.differences.push(cell);
	                    //second set current as old coords
	                    cell.model.setOldPosition();
	                }
	            });
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(id) {
	            var cell = this.list.find(function (cell) {
	                return cell.model.id === id;
	            });
	            var idx = this.list.indexOf(cell);
	            this.list.splice(idx, 1);
	            //this.update();                    
	            this.table.remove();
	            this.table.addCells(this.list);

	            this.setDifferences();

	            return cell;
	        }
	    }, {
	        key: 'scaleItem',
	        value: function scaleItem(id, w, h) {
	            var cell = this.list.find(function (cell) {
	                return cell.model.id === id;
	            });
	            cell.model.w = w;
	            cell.model.h = h;
	            this.table.scaleCell(id, w, h, this.list);

	            this.setDifferences();
	            return cell;
	        }
	        // update(){
	        //     this.table.remove();
	        //     this.list.forEach((cell)=>{
	        //         cell.model.size = this.size;
	        //         let cp = this.table.addCell(cell);
	        //         cell.model.setPosition(cp.x,cp.y);
	        //     });
	        // }

	    }]);

	    return Model;
	}();

	exports.default = Model;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _view = __webpack_require__(17);

	var _view2 = _interopRequireDefault(_view);

	var _model = __webpack_require__(20);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cell = function () {
	    function Cell(config) {
	        _classCallCheck(this, Cell);

	        this.model = new this.constructor.Model(config.size, config.pos);
	        this.view = new this.constructor.View(config.data);
	        config.buildCallback && config.buildCallback(this);
	    }

	    _createClass(Cell, [{
	        key: 'updatePosition',
	        value: function updatePosition() {
	            this.view.setPosition(this.model.x * this.model.size, this.model.y * this.model.size);
	        }
	    }, {
	        key: 'updateSize',
	        value: function updateSize() {
	            this.view.setSize(this.model.w * this.model.size, this.model.h * this.model.size);
	        }
	    }, {
	        key: 'setId',
	        value: function setId(id) {
	            this.model.id = id;
	        }
	    }], [{
	        key: 'Model',
	        get: function get() {
	            return _model2.default;
	        }
	    }, {
	        key: 'View',
	        get: function get() {
	            return _view2.default;
	        }
	    }]);

	    return Cell;
	}();

	exports.default = Cell;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(18);

	var _cell2 = _interopRequireDefault(_cell);

	var _abstractView = __webpack_require__(14);

	var _abstractView2 = _interopRequireDefault(_abstractView);

	var _cssTransforms = __webpack_require__(19);

	var _cssTransforms2 = _interopRequireDefault(_cssTransforms);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var View = function (_AbstractView) {
	    _inherits(View, _AbstractView);

	    function View(data) {
	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

	        _this.createElement((0, _cell2.default)(data));
	        _this.transforms = new _cssTransforms2.default({
	            scale: ['1']
	        });
	        _this.transforms.setPriority(['translate', 'scale']);
	        return _this;
	    }

	    _createClass(View, [{
	        key: 'setPosition',
	        value: function setPosition(left, top) {
	            this.transforms.addToElement(this.el, {
	                translate: [left + 'px', top + 'px']
	            });
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height) {
	            this.el.style.width = width + 'px';
	            this.el.style.height = height + 'px';
	        }
	    }, {
	        key: 'animatedRemove',
	        value: function animatedRemove(callback) {
	            var _this2 = this;

	            this.el.classList.add('is-scaling');
	            this.transforms.addToElement(this.el, {
	                scale: ['0']
	            });
	            this.el.addEventListener('transitionend', function () {
	                _this2.remove();
	                callback && callback();
	            });
	        }
	    }]);

	    return View;
	}(_abstractView2.default);

	exports.default = View;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (data) {
	    return "<div class=\"gridion__cell\">" + data + "</div>";
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CssTransforms = function () {
	    function CssTransforms(transforms) {
	        _classCallCheck(this, CssTransforms);

	        this.props = {};
	        this.priority = [];
	        this.set(transforms);
	    }

	    _createClass(CssTransforms, [{
	        key: 'set',
	        value: function set(transforms) {
	            if (typeof transforms === 'string') {
	                this.setFromString(transforms);
	            } else {
	                transforms && this.setFromObject(transforms);
	            }
	        }
	    }, {
	        key: 'setFromString',
	        value: function setFromString(string) {
	            var _this = this;

	            var transforms = string.match(/\w+\([^\(]*\)/g);
	            transforms.forEach(function (el) {
	                var name = el.match(/\w+/)[0];
	                _this.props[name] = el.match(/\((.*)\)/)[1].split(',');
	                //let self = this;
	                // this[name] = function(){
	                //     for(let i=0;i<arguments.length;i++){
	                //         self.props[name] = arguments;
	                //     }
	                // };
	            });
	        }
	    }, {
	        key: 'setFromObject',
	        value: function setFromObject(obj) {
	            for (var key in obj) {
	                this.props[key] = obj[key];
	            }
	        }
	    }, {
	        key: 'setPriority',
	        value: function setPriority(priority) {
	            this.priority = priority;
	        }
	    }, {
	        key: 'addToElement',
	        value: function addToElement(el, transforms, priority) {
	            var _this2 = this;

	            priority && this.setPriority(priority);
	            transforms && this.set(transforms);
	            var transform = '';
	            //priority
	            this.priority.forEach(function (p) {
	                if (p in _this2.props) {
	                    transform += ' ' + p + '(' + _this2.props[p] + ')';
	                }
	            });
	            //no priority

	            var _loop = function _loop(key) {
	                if (_this2.priority.some(function (p) {
	                    return p === key;
	                })) {
	                    return 'continue'; //exclude
	                }
	                var vals = '';
	                _this2.props[key].forEach(function (v) {
	                    vals += ',' + v;
	                });
	                vals = vals.slice(1);
	                transform += ' ' + key + '(' + _this2.props[key] + ')';
	            };

	            for (var key in this.props) {
	                var _ret = _loop(key);

	                if (_ret === 'continue') continue;
	            }
	            el.style.transform = transform.slice(1);
	        }
	    }]);

	    return CssTransforms;
	}();

	exports.default = CssTransforms;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cell = function () {
	    function Cell(size, pos) {
	        _classCallCheck(this, Cell);

	        this.size = null;
	        this.id = null;
	        this.w = size.w;
	        this.h = size.h;
	        this.x = null;
	        this.y = null;
	        this.xOld = null;
	        this.yOld = null;
	        //this.type = pos?'fixed':'dynamic';
	        //if(this.type === 'fixed'){
	        //    this.x = pos.x;
	        //    this.y = pos.y;
	        //}
	    }

	    _createClass(Cell, [{
	        key: "updateSize",
	        value: function updateSize(size) {
	            this.size = size;
	        }
	    }, {
	        key: "setPosition",
	        value: function setPosition(x, y) {
	            this.x = x;
	            this.y = y;
	        }
	    }, {
	        key: "setOldPosition",
	        value: function setOldPosition() {
	            this.xOld = this.x;
	            this.yOld = this.y;
	        }
	    }]);

	    return Cell;
	}();

	exports.default = Cell;

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = function () {
	    function Model(cols) {
	        _classCallCheck(this, Model);

	        this.cells = [];
	        this.w = cols;
	        this.h = 0;
	    }

	    _createClass(Model, [{
	        key: "generate",
	        value: function generate() {
	            for (var y = 0; y < this.h; y++) {
	                this.cells[y] = [];
	                for (var x = 0; x < this.w; x++) {
	                    this.cells[y][x] = 0;
	                }
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.generate();
	        }
	    }, {
	        key: "remove",
	        value: function remove() {
	            this.cells = [];
	            this.h = 0;
	        }
	    }, {
	        key: "addCell",
	        value: function addCell(cell) {
	            while (!this.checkReceivingCell(cell.model.h)) {
	                //for start, because need row
	                this.createNewRow();
	            }
	            var c = { x: 0, y: 0 }; //cursor

	            for (; c.y < this.cells.length; c.y++) {

	                while (c.x < this.cells[c.y].length) {
	                    if (this.checkFreeSpace(cell, c)) {
	                        this.setCell(cell, c);
	                        return c;
	                        //exit !important
	                    }
	                    c.x++;
	                }
	                c.x = 0;

	                if (c.y + cell.model.h > this.h - 1) {
	                    //last index
	                    this.createNewRow();
	                }
	            }
	        }
	    }, {
	        key: "setCell",
	        value: function setCell(cell, c) {
	            for (var y = c.y; y < cell.model.h + c.y; y++) {
	                for (var x = c.x; x < cell.model.w + c.x; x++) {
	                    this.cells[y][x] = cell.model.id;
	                }
	            }
	        }
	    }, {
	        key: "createNewRow",
	        value: function createNewRow() {
	            var idx = this.h;
	            this.cells[idx] = [];
	            for (var x = 0; x < this.w; x++) {
	                this.cells[idx][x] = 0;
	            }
	            this.h++;
	        }
	    }, {
	        key: "checkFreeSpace",
	        value: function checkFreeSpace(cell, c) {
	            if (cell.model.h + c.y > this.h || cell.model.w + c.x > this.w) {
	                //limits
	                return false;
	            }
	            for (var y = c.y; y < cell.model.h + c.y; y++) {
	                for (var x = c.x; x < cell.model.w + c.x; x++) {
	                    if (this.cells[y][x]) {
	                        //no empty
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	    }, {
	        key: "checkReceivingCell",
	        value: function checkReceivingCell(cellHeight) {
	            return this.h >= cellHeight;
	        }
	    }, {
	        key: "addCells",
	        value: function addCells(cellList) {
	            for (var i = 0; i < cellList.length; i++) {
	                var cp = this.addCell(cellList[i]);

	                cellList[i].model.setOldPosition();
	                cellList[i].model.setPosition(cp.x, cp.y);
	            }
	        }
	    }, {
	        key: "scaleCell",
	        value: function scaleCell(id, w, h, cellList) {
	            this.remove();
	            var cell = void 0,
	                changedItems = [];
	            for (var i = 0; i < cellList.length; i++) {
	                if (cellList[i].model.id !== id) {
	                    changedItems.push(cellList[i]);
	                } else {
	                    cell = cellList[i];
	                }
	            }
	            for (var _i = 0; _i < cell.model.y + cell.model.h; _i++) {
	                this.createNewRow();
	            }
	            this.setCell(cell, { x: cell.model.x, y: cell.model.y });
	            this.addCells(changedItems);
	        }
	        // changePosition(changedListConfig,cellList){
	        //     this.remove();
	        //
	        // }

	    }]);

	    return Model;
	}();

	exports.default = Model;

/***/ }
/******/ ]);