module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}

/***/ }),

/***/ "5Oj0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"settings":"settings__1JFwH"};

/***/ }),

/***/ "Asjh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "GWMv":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var idbKeyval = function (e) {
  "use strict";

  var t = function () {
    function t() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "keyval-store";

      var _t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "keyval";

      _classCallCheck(this, t);

      this.storeName = _t, this._dbp = new Promise(function (r, n) {
        var o = indexedDB.open(e, 1);o.onerror = function () {
          return n(o.error);
        }, o.onsuccess = function () {
          return r(o.result);
        }, o.onupgradeneeded = function () {
          o.result.createObjectStore(_t);
        };
      });
    }

    t.prototype._withIDBStore = function _withIDBStore(e, t) {
      var _this = this;

      return this._dbp.then(function (r) {
        return new Promise(function (n, o) {
          var s = r.transaction(_this.storeName, e);s.oncomplete = function () {
            return n();
          }, s.onabort = s.onerror = function () {
            return o(s.error);
          }, t(s.objectStore(_this.storeName));
        });
      });
    };

    return t;
  }();

  var r = void 0;function n() {
    return r || (r = new t()), r;
  }return e.Store = t, e.get = function (e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n();
    var r = void 0;return t._withIDBStore("readonly", function (t) {
      r = t.get(e);
    }).then(function () {
      return r.result;
    });
  }, e.set = function (e, t) {
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : n();
    return r._withIDBStore("readwrite", function (r) {
      r.put(t, e);
    });
  }, e.del = function (e) {
    var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : n();
    return t._withIDBStore("readwrite", function (t) {
      t.delete(e);
    });
  }, e.clear = function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : n();
    return e._withIDBStore("readwrite", function (e) {
      e.clear();
    });
  }, e.keys = function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : n();
    var t = [];return e._withIDBStore("readonly", function (e) {
      (e.openKeyCursor || e.openCursor).call(e).onsuccess = function () {
        this.result && (t.push(this.result.key), this.result.continue());
      };
    }).then(function () {
      return t;
    });
  }, e;
}({});

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/idb-keyval/dist/idb-keyval-iife.min.js
var idb_keyval_iife_min = __webpack_require__("GWMv");
var idb_keyval_iife_min_default = /*#__PURE__*/__webpack_require__.n(idb_keyval_iife_min);

// EXTERNAL MODULE: ../node_modules/calendar-base/lib/calendar-base.js
var calendar_base = __webpack_require__("sMip");
var calendar_base_default = /*#__PURE__*/__webpack_require__.n(calendar_base);

// CONCATENATED MODULE: ./utils.js


var cal = new calendar_base["Calendar"]();

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function getFirstDayAvailable(days) {
  return Object.keys(days).sort(function (a, b) {
    return a.replace(/-/g, '') - b.replace(/-/g, '');
  })[0];
}

function createCalendar(days) {
  var today = getTodayKey().split('-');
  var upToToday = function upToToday(day) {
    return day.day <= today[2];
  };
  if (!days || !Object.keys(days).length) {
    return cal.getCalendar(today[0], today[1] - 1).filter(upToToday);
  }
  var firstDayAvailable = getFirstDayAvailable(days).split('-');
  var calendarColumns = [];

  if (+today[0] > +firstDayAvailable[0]) {
    // before than this year
    // first available month
    for (var k = +firstDayAvailable[1]; k <= 12; k++) {
      var month = cal.getCalendar(firstDayAvailable[0], k - 1);
      calendarColumns = calendarColumns.concat(month);
    }
    // years in between
    for (var remainingYears = +today[0] - (+firstDayAvailable[0] + 1); remainingYears > 0; remainingYears--) {
      for (var remainingMonths = 0; remainingMonths < 12; remainingMonths++) {
        var _month = cal.getCalendar(+today[0] - remainingYears, remainingMonths);
        calendarColumns = calendarColumns.concat(_month);
      }
    }
    // current year
    for (var remainingMonths = 0; remainingMonths < +today[1]; remainingMonths++) {
      var _month2 = cal.getCalendar(+today[0], remainingMonths);
      calendarColumns = calendarColumns.concat(_month2).filter(upToToday);
    }
  } else if (+today[1] > +firstDayAvailable[1]) {
    // before this month
    for (var remainingMonths = +today[1] - +firstDayAvailable[1]; remainingMonths >= 0; remainingMonths--) {
      var _month3 = cal.getCalendar(firstDayAvailable[0], +firstDayAvailable[1] - remainingMonths - 1);
      calendarColumns = calendarColumns.concat(_month3);
    }
  } else {
    // this month only
    var _month4 = cal.getCalendar(firstDayAvailable[0], firstDayAvailable[1] - 1);
    calendarColumns = calendarColumns.concat(_month4).filter(upToToday);
  }
  return calendarColumns;
}

function addHabitsToCalendar(days, calendar) {
  Object.keys(days).forEach(function (day) {
    var date = day.split('-');
    var index = calendar.findIndex(function (el) {
      return el && el.day === +date[2] && el.month === +date[1] - 1 && el.year === +date[0];
    });
    console.log(day, index > -1 ? 'found' : 'not-found');
    if (index > -1) {
      var today = calendar[index];
      var prevDay = calendar[index - 1];
      today.habits = days[day];
      today.streak = {};
      today.habits.forEach(function (habit) {
        today.streak[habit] = prevDay && prevDay.streak && prevDay.streak[habit] ? prevDay.streak[habit] + 1 : 1;
      });
    };
  });

  return calendar;
}
// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js





var header__ref = Object(preact_min["h"])(
	'h1',
	null,
	'Evryday'
);

var header_Header = function Header() {
	return Object(preact_min["h"])(
		'header',
		{ 'class': header_style_default.a.header },
		header__ref,
		Object(preact_min["h"])(
			'nav',
			null,
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/' },
				'Habits'
			),
			Object(preact_min["h"])(
				match["Link"],
				{ activeClassName: header_style_default.a.active, href: '/settings' },
				'Settings'
			)
		)
	);
};

/* harmony default export */ var header = (header_Header);
// EXTERNAL MODULE: ../node_modules/prop-types/index.js
var prop_types = __webpack_require__("5D9O");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./routes/habits/style.css
var habits_style = __webpack_require__("nceL");
var habits_style_default = /*#__PURE__*/__webpack_require__.n(habits_style);

// CONCATENATED MODULE: ./routes/habits/index.js







var dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var habits_today = getTodayKey();

var _ref2 = Object(preact_min["h"])(
	'h2',
	null,
	'Habits'
);

var _ref3 = Object(preact_min["h"])(
	'i',
	null,
	'\u2714'
);

var habits_HabitsColumn = function HabitsColumn(_ref) {
	var habits = _ref.habits,
	    track = _ref.track,
	    today = _ref.today;
	return Object(preact_min["h"])(
		'div',
		{ 'class': habits_style_default.a.HabitsColumn },
		_ref2,
		Object(preact_min["h"])(
			'ul',
			null,
			habits.map(function (habit) {
				return Object(preact_min["h"])(
					'li',
					{ 'class': today && today.includes(habit) ? habits_style_default.a.checked : null, onClick: function onClick() {
							return track(habit);
						} },
					habit,
					_ref3
				);
			})
		)
	);
};

var habits_DayHeader = function DayHeader(_ref4) {
	var day = _ref4.day;
	return Object(preact_min["h"])(
		'header',
		{ 'class': day.weekDay === 0 || day.weekDay === 6 ? habits_style_default.a.weekend : null },
		dayNames[day.weekDay],
		Object(preact_min["h"])(
			'b',
			null,
			day.day
		),
		Object(preact_min["h"])(
			'span',
			null,
			monthNames[day.month]
		)
	);
};

var habits_CalendarColumn = function CalendarColumn(_ref5) {
	var day = _ref5.day,
	    habits = _ref5.habits;
	return Object(preact_min["h"])(
		'div',
		{ 'class': habits_style_default.a.CalendarColumn },
		Object(preact_min["h"])(habits_DayHeader, { day: day }),
		habits.map(function (habit) {
			return Object(preact_min["h"])('i', { 'class': day.habits && day.habits.includes(habit) ? habits_style_default.a.done : null, style: { opacity: day.streak && day.streak[habit] ? day.streak[habit] * 0.1 : 0 } });
		})
	);
};

var habits_Habits = function Habits(_ref6) {
	var habits = _ref6.habits,
	    days = _ref6.days,
	    calendar = _ref6.calendar,
	    trackHabit = _ref6.trackHabit;

	var calendarWithHabits = addHabitsToCalendar(days, calendar);
	return Object(preact_min["h"])(
		'div',
		{ 'class': habits_style_default.a.Home },
		habits && Object(preact_min["h"])(habits_HabitsColumn, { habits: habits, track: function track(habit) {
				return trackHabit(habit);
			}, today: days[habits_today] }),
		Object(preact_min["h"])(
			'div',
			{ 'class': habits_style_default.a.Calendar },
			calendar && calendar.map(function (day) {
				return day && Object(preact_min["h"])(habits_CalendarColumn, { day: day, habits: habits });
			})
		)
	);
};

/* harmony default export */ var routes_habits = (habits_Habits);
// EXTERNAL MODULE: ./routes/settings/style.css
var settings_style = __webpack_require__("5Oj0");
var settings_style_default = /*#__PURE__*/__webpack_require__.n(settings_style);

// CONCATENATED MODULE: ./routes/settings/index.js




var settings_Settings = function Settings(_ref) {
	var habits = _ref.habits,
	    addHabit = _ref.addHabit,
	    removeHabit = _ref.removeHabit,
	    clear = _ref.clear;
	return Object(preact_min["h"])(
		'div',
		{ 'class': settings_style_default.a.settings },
		Object(preact_min["h"])(
			'button',
			{ onClick: addHabit },
			'Add new daily habit'
		),
		Object(preact_min["h"])(
			'ul',
			null,
			habits.map(function (habit) {
				return Object(preact_min["h"])(
					'li',
					null,
					habit,
					' ',
					Object(preact_min["h"])(
						'button',
						{ onClick: function onClick() {
								return removeHabit(habit);
							} },
						'Delete'
					)
				);
			})
		),
		Object(preact_min["h"])(
			'button',
			{ onClick: clear },
			'Delete history'
		)
	);
};
/* harmony default export */ var settings = (settings_Settings);
// CONCATENATED MODULE: ./actions/index.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ var actions = (function (app) {
  var save = function save(state) {
    app.setState(state, function () {
      Object(idb_keyval_iife_min["set"])('state', state);
    });
  };

  return {
    habits: {
      addHabit: function addHabit() {
        var habits = app.state.habits;

        var name = prompt("What habit do you want to track?", "Meditate");
        habits.some(function (habit) {
          return habit === name;
        }) || save(_extends({}, app.state, { habits: habits.concat([name]) }));
      },
      removeHabit: function removeHabit(habit) {
        var habits = app.state.habits;

        var newHabits = habits.filter(function (el) {
          return el !== habit;
        });
        save(_extends({}, app.state, { habits: newHabits }));
      }
    },
    tracking: {
      trackHabit: function trackHabit(habit) {
        var newDays = _extends({}, app.state.days);
        var today = getTodayKey();
        newDays[today] ? newDays[today].some(function (el) {
          return habit === el;
        }) || newDays[today].push(habit) : newDays[today] = [habit];
        save(_extends({}, app.state, { days: newDays }));
      },
      clearTracking: function clearTracking() {
        save(_extends({}, app.state, { days: {} }));
      }
    }
  };
});
// CONCATENATED MODULE: ./components/app.js
var app__extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









// Code-splitting is automated for routes





var app__ref2 = Object(preact_min["h"])(header, null);

var app_App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.state = {
			habits: [],
			days: {}
		};

		_this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		};

		_this.hydrateStateWithLocalStorage = function () {
			Object(idb_keyval_iife_min["get"])('state').then(function (data) {
				if (data) {
					_this.setState(data);
				}
				_this.cal = createCalendar(data && data.days);
			});
		};

		_this.actions = actions(_this);

		return _this;
	}

	App.prototype.componentDidMount = function componentDidMount() {
		this.hydrateStateWithLocalStorage();
	};

	App.prototype.render = function render(props, _ref) {
		var habits = _ref.habits,
		    days = _ref.days;

		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			app__ref2,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				Object(preact_min["h"])(routes_habits, app__extends({ path: '/' }, this.state, this.actions.tracking, { calendar: this.cal })),
				Object(preact_min["h"])(settings, app__extends({ path: '/settings' }, this.state, this.actions.habits, { clear: this.actions.tracking.clearTracking }))
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js

app_App;

/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e(e, t) {
    var n,
        o,
        r,
        i,
        l = W;for (i = arguments.length; i-- > 2;) {
      P.push(arguments[i]);
    }t && null != t.children && (P.length || P.push(t.children), delete t.children);while (P.length) {
      if ((o = P.pop()) && void 0 !== o.pop) for (i = o.length; i--;) {
        P.push(o[i]);
      } else "boolean" == typeof o && (o = null), (r = "function" != typeof e) && (null == o ? o = "" : "number" == typeof o ? o += "" : "string" != typeof o && (r = !1)), r && n ? l[l.length - 1] += o : l === W ? l = [o] : l.push(o), n = r;
    }var a = new T();return a.nodeName = e, a.children = l, a.attributes = null == t ? void 0 : t, a.key = null == t ? void 0 : t.key, void 0 !== M.vnode && M.vnode(a), a;
  }function t(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function n(e, t) {
    null != e && ("function" == typeof e ? e(t) : e.current = t);
  }function o(n, o) {
    return e(n.nodeName, t(t({}, n.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : n.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == V.push(e) && (M.debounceRendering || D)(i);
  }function i() {
    var e;while (e = V.pop()) {
      e.__d && x(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var n = t({}, e.attributes);n.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === n[r] && (n[r] = o[r]);
    }return n;
  }function c(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function s(e, t, o, r, i) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n(o, null), n(r, e);else if ("class" !== t || i) {
      if ("style" === t) {
        if (r && "string" != typeof r && "string" != typeof o || (e.style.cssText = r || ""), r && "object" == typeof r) {
          if ("string" != typeof o) for (var l in o) {
            l in r || (e.style[l] = "");
          }for (var l in r) {
            e.style[l] = "number" == typeof r[l] && !1 === E.test(l) ? r[l] + "px" : r[l];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var a = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), r ? o || e.addEventListener(t, _, a) : e.removeEventListener(t, _, a), (e.__l || (e.__l = {}))[t] = r;
      } else if ("list" !== t && "type" !== t && !i && t in e) {
        try {
          e[t] = null == r ? "" : r;
        } catch (e) {}null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t);
      } else {
        var u = i && t !== (t = t.replace(/^xlink:?/, ""));null == r || !1 === r ? u ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (u ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r));
      }
    } else e.className = r || "";
  }function _(e) {
    return this.__l[e.type](M.event && M.event(e) || e);
  }function f() {
    var e;while (e = A.shift()) {
      M.afterMount && M.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function d(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, B = null != e && !("__preactattr_" in e));var l = h(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (B = !1, i || f()), l;
  }function h(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return N(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = c(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), v(e, !0);
    }var p = i.firstChild,
        s = i.__preactattr_,
        _ = t.children;if (null == s) {
      s = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        s[f[d].name] = f[d].value;
      }
    }return !B && _ && 1 === _.length && "string" == typeof _[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != _[0] && (p.nodeValue = _[0]) : (_ && _.length || null != p) && m(i, _, n, o, B || null != s.dangerouslySetInnerHTML), y(i, t.attributes, s), R = l, i;
  }function m(e, t, n, o, r) {
    var i,
        a,
        u,
        c,
        s,
        _ = e.childNodes,
        f = [],
        d = {},
        m = 0,
        b = 0,
        y = _.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = _[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (m++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      c = t[C], s = null;var k = c.key;if (null != k) m && void 0 !== d[k] && (s = d[k], d[k] = void 0, m--);else if (b < g) for (i = b; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], c, r)) {
          s = a, f[i] = void 0, i === g - 1 && g--, i === b && b++;break;
        }
      }s = h(s, c, n, o), u = _[C], s && s !== e && s !== u && (null == u ? e.appendChild(s) : s === u.nextSibling ? p(u) : e.insertBefore(s, u));
    }if (m) for (var C in d) {
      void 0 !== d[C] && v(d[C], !1);
    }while (b <= g) {
      void 0 !== (s = f[g--]) && v(s, !1);
    }
  }function v(e, t) {
    var o = e._component;o ? k(o) : (null != e.__preactattr_ && n(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || p(e), b(e));
  }function b(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;v(e, !0), e = t;
    }
  }function y(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || s(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || s(e, o, n[o], n[o] = t[o], R);
    }
  }function g(e, t, n) {
    var o,
        r = F.length;e.prototype && e.prototype.render ? (o = new e(t, n), U.call(o, t, n)) : (o = new U(t, n), o.constructor = e, o.render = w);while (r--) {
      if (F[r].constructor === e) return o.__b = F[r].__b, F.splice(r, 1), o;
    }return o;
  }function w(e, t, n) {
    return this.constructor(e, n);
  }function C(e, t, o, i, l) {
    e.__x || (e.__x = !0, e.__r = t.ref, e.__k = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || l ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, i)), i && i !== e.context && (e.__c || (e.__c = e.context), e.context = i), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== o && (1 !== o && !1 === M.syncComponentUpdates && e.base ? r(e) : x(e, 1, l)), n(e.__r, e));
  }function x(e, n, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          c = e.props,
          p = e.state,
          s = e.context,
          _ = e.__p || c,
          h = e.__s || p,
          m = e.__c || s,
          b = e.base,
          y = e.__b,
          w = b || y,
          N = e._component,
          U = !1,
          S = m;if (e.constructor.getDerivedStateFromProps && (p = t(t({}, p), e.constructor.getDerivedStateFromProps(c, p)), e.state = p), b && (e.props = _, e.state = h, e.context = m, 2 !== n && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(c, p, s) ? U = !0 : e.componentWillUpdate && e.componentWillUpdate(c, p, s), e.props = c, e.state = p, e.context = s), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !U) {
        i = e.render(c, p, s), e.getChildContext && (s = t(t({}, s), e.getChildContext())), b && e.getSnapshotBeforeUpdate && (S = e.getSnapshotBeforeUpdate(_, h));var L,
            T,
            P = i && i.nodeName;if ("function" == typeof P) {
          var W = u(i);l = N, l && l.constructor === P && W.key == l.__k ? C(l, W, 1, s, !1) : (L = l, e._component = l = g(P, W, s), l.__b = l.__b || y, l.__u = e, C(l, W, 0, s, !1), x(l, 1, o, !0)), T = l.base;
        } else a = w, L = N, L && (a = e._component = null), (w || 1 === n) && (a && (a._component = null), T = d(a, i, s, o || !b, w && w.parentNode, !0));if (w && T !== w && l !== N) {
          var D = w.parentNode;D && T !== D && (D.replaceChild(T, w), L || (w._component = null, v(w, !1)));
        }if (L && k(L), e.base = T, T && !r) {
          var E = e,
              V = e;while (V = V.__u) {
            (E = V).base = T;
          }T._component = E, T._componentConstructor = E.constructor;
        }
      }!b || o ? A.push(e) : U || (e.componentDidUpdate && e.componentDidUpdate(_, h, S), M.afterUpdate && M.afterUpdate(e));while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || f();
    }
  }function N(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        c = a,
        p = u(t);while (r && !c && (r = r.__u)) {
      c = r.constructor === t.nodeName;
    }return r && c && (!o || r._component) ? (C(r, p, 3, n, o), e = r.base) : (i && !a && (k(i), e = l = null), r = g(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), C(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, v(l, !1))), e;
  }function k(e) {
    M.beforeUnmount && M.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var o = e._component;o ? k(o) : t && (null != t.__preactattr_ && n(t.__preactattr_.ref, null), e.__b = t, p(t), F.push(e), b(t)), n(e.__r, null);
  }function U(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}, this.__h = [];
  }function S(e, t, n) {
    return d(n, e, {}, !1, t, !1);
  }function L() {
    return {};
  }var T = function T() {},
      M = {},
      P = [],
      W = [],
      D = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      E = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      V = [],
      A = [],
      H = 0,
      R = !1,
      B = !1,
      F = [];t(U.prototype, { setState: function setState(e, n) {
      this.__s || (this.__s = this.state), this.state = t(t({}, this.state), "function" == typeof e ? e(this.state, this.props) : e), n && this.__h.push(n), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && this.__h.push(e), x(this, 2);
    }, render: function render() {} });var j = { h: e, createElement: e, cloneElement: o, createRef: L, Component: U, render: S, rerender: i, options: M }; true ? module.exports = j : self.preact = j;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "nceL":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Home":"Home__65c5V","Calendar":"Calendar__1dND1","CalendarColumn":"CalendarColumn__Q-XQg","weekend":"weekend__2OsNK","done":"done__mc6f-","HabitsColumn":"HabitsColumn__UKoVx","checked":"checked__1aRv7"};

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sMip":
/***/ (function(module, exports) {

/**
 * Calendar constructor
 *
 * @param   {Object}  options               Calendar options
 *   @param {Object}  options.startDate     Date object indicating the selected start date
 *   @param {Object}  options.endDate       Date object indicating the selected end date
 *   @param {Boolean} options.siblingMonths Calculate dates from sibling months (before and after the current month, based on weekStart)
 *   @param {Boolean} options.weekNumbers   Caclulate the week days
 *   @param {Number}  options.weekStart     Day of the week to start the calendar, respects `Date.prototype.getDay` (defaults to `0`, Sunday)
 */
function Calendar(options) {
	options = options || {};

	this.startDate = options.startDate;
	this.endDate = options.endDate;
	this.siblingMonths = options.siblingMonths;
	this.weekNumbers = options.weekNumbers;
	this.weekStart = options.weekStart;

	if (this.weekStart === undefined) {
		this.weekStart = 0;
	}
}

/**
 * Calculate a calendar month
 *
 * @param  {Number} year  Year
 * @param  {Number} month Month [0-11]
 * @return {Array}        Calendar days
 */
Calendar.prototype.getCalendar = function (year, month) {
	var date = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));

	year = date.getUTCFullYear();
	month = date.getUTCMonth();

	var calendar = [],
	    firstDay = date.getUTCDay(),
	    firstDate = -((7 - this.weekStart + firstDay) % 7),
	    lastDate = Calendar.daysInMonth(year, month),
	    lastDay = (lastDate - firstDate) % 7,
	    lastDatePreviousMonth = Calendar.daysInMonth(year, month - 1),
	    i = firstDate,
	    max = lastDate - i + (lastDay != 0 ? 7 - lastDay : 0) + firstDate,
	    currentDay,
	    currentDate,
	    currentDateObject,
	    currentWeekNumber = null,
	    otherMonth,
	    otherYear;

	while (i < max) {
		currentDate = i + 1;
		currentDay = ((i < 1 ? 7 + i : i) + firstDay) % 7;
		if (currentDate < 1 || currentDate > lastDate) {
			if (this.siblingMonths) {
				if (currentDate < 1) {
					otherMonth = month - 1;
					otherYear = year;
					if (otherMonth < 0) {
						otherMonth = 11;
						otherYear--;
					}
					currentDate = lastDatePreviousMonth + currentDate;
				} else if (currentDate > lastDate) {
					otherMonth = month + 1;
					otherYear = year;
					if (otherMonth > 11) {
						otherMonth = 0;
						otherYear++;
					}
					currentDate = i - lastDate + 1;
				}
				currentDateObject = {
					day: currentDate,
					weekDay: currentDay,
					month: otherMonth,
					year: otherYear,
					siblingMonth: true
				};
			} else {
				currentDateObject = false;
			}
		} else {
			currentDateObject = {
				day: currentDate,
				weekDay: currentDay,
				month: month,
				year: year
			};
		}

		if (currentDateObject && this.weekNumbers) {
			if (currentWeekNumber === null) {
				currentWeekNumber = Calendar.calculateWeekNumber(currentDateObject);
			} else if (currentDay == 1 && currentWeekNumber == 52) {
				currentWeekNumber = 1;
			} else if (currentDay == 1) {
				currentWeekNumber++;
			}
			currentDateObject.weekNumber = currentWeekNumber;
		}

		if (currentDateObject && this.startDate) {
			currentDateObject.selected = this.isDateSelected(currentDateObject);
		}

		calendar.push(currentDateObject);
		i++;
	}

	return calendar;
};

/**
 * Checks if a date is selected
 *
 * @param  {Object}  date Date object
 * @return {Boolean}      Selected status of the date
 */
Calendar.prototype.isDateSelected = function (date) {
	if (date.year == this.startDate.year && date.month == this.startDate.month && date.day == this.startDate.day) {
		return true;
	} else if (this.endDate) {
		if (date.year == this.startDate.year && date.month == this.startDate.month && date.day < this.startDate.day) {
			return false;
		} else if (date.year == this.endDate.year && date.month == this.endDate.month && date.day > this.endDate.day) {
			return false;
		} else if (date.year == this.startDate.year && date.month < this.startDate.month) {
			return false;
		} else if (date.year == this.endDate.year && date.month > this.endDate.month) {
			return false;
		} else if (date.year < this.startDate.year) {
			return false;
		} else if (date.year > this.endDate.year) {
			return false;
		}
		return true;
	}
	return false;
};

/**
 * Sets the selected period start
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setStartDate = function (date) {
	this.startDate = date;
};

/**
 * Sets the selected period end
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setEndDate = function (date) {
	this.endDate = date;
};

/**
 * Sets one selected date
 *
 * @param {Object} date Date object
 */
Calendar.prototype.setDate = Calendar.prototype.setStartDate;

/**
 * Calculates the difference between two dates (date1 - date2), in days
 *
 * @param  {Object} date1 Date object
 * @param  {Object} date2 Date object
 * @return {Number}       Days between the dates
 */
Calendar.diff = function (date1, date2) {
	date1 = new Date(Date.UTC(date1.year, date1.month, date1.day, 0, 0, 0, 0));
	date2 = new Date(Date.UTC(date2.year, date2.month, date2.day, 0, 0, 0, 0));
	return Math.ceil((date1.getTime() - date2.getTime()) / 86400000);
};

/**
 * Calculates the interval between two dates
 *
 * @param  {Object} date1 Date object
 * @param  {Object} date2 Date object
 * @return {Number}       Number of days
 */
Calendar.interval = function (date1, date2) {
	return Math.abs(Calendar.diff(date1, date2)) + 1;
};

/**
 * Quickly compare two dates
 *
 * @param  {Object} leftDate  Left date
 * @param  {Object} rightDate Right date
 * @return {Number}           Comparison result: -1 (left < right), 0 (equal) or 1 (left > right)
 */
Calendar.compare = function (leftDate, rightDate) {
	if (typeof leftDate != 'object' || typeof rightDate != 'object' || leftDate === null || rightDate === null) {
		throw new TypeError('dates must be objects');
	}

	if (leftDate.year < rightDate.year) {
		return -1;
	} else if (leftDate.year > rightDate.year) {
		return 1;
	} else if (leftDate.month < rightDate.month) {
		return -1;
	} else if (leftDate.month > rightDate.month) {
		return 1;
	} else if (leftDate.day < rightDate.day) {
		return -1;
	} else if (leftDate.day > rightDate.day) {
		return 1;
	}

	return 0;
};

/**
 * Calculates the number of days in a month
 *
 * @param  {Number} year  Year
 * @param  {Number} month Month [0-11]
 * @return {Number}       Length of the month
 */
Calendar.daysInMonth = function (year, month) {
	return new Date(year, month + 1, 0).getDate();
};

/**
 * Calculates if a given year is a leap year
 *
 * @param  {Number}  year Year
 * @return {Boolean}      Leap year or not
 */
Calendar.isLeapYear = function (year) {
	return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
};

/**
 * Calculates the week number for a given date
 *
 * @param  {Object} date Date object
 * @return {Number}      Week number
 */
// Adapted from http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
Calendar.calculateWeekNumber = function (date) {
	// Creates the requested date
	var current = new Date(Date.UTC(date.year, date.month, date.day, 0, 0, 0, 0));

	// Create a copy of the object
	var target = new Date(current.valueOf());

	// ISO week date weeks start on monday so correct the day number
	var dayNr = (current.getUTCDay() + 6) % 7;

	// ISO 8601 states that week 1 is the week with the first thursday of that
	// year. Set the target date to the thursday in the target week.
	target.setUTCDate(target.getUTCDate() - dayNr + 3);

	// Store the millisecond value of the target date
	var firstThursday = target.valueOf();

	// Set the target to the first thursday of the year

	// First set the target to january first
	target.setUTCMonth(0, 1);

	// Not a thursday? Correct the date to the next thursday
	if (target.getUTCDay() != 4) {
		target.setUTCMonth(0, 1 + (4 - target.getUTCDay() + 7) % 7);
	}

	// The weeknumber is the number of weeks between the  first thursday of the
	// year and the thursday in the target week.
	// 604800000 = 7 * 24 * 3600 * 1000
	return 1 + Math.ceil((firstThursday - target) / 604800000);
};

/**
 * Exports the Calendar
 */
module.exports = { Calendar: Calendar };

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3QGkI","active":"active__3gItZ"};

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("Asjh");

function emptyFunction() {}

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map