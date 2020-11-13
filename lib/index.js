'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var EventEmitter = _interopDefault(require('events'));

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var __filename$1 = '/queue/Queue.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var hasProp = {}.hasOwnProperty;
var QueueTF = (function (Module) {
  var _dec, _class, _class2, _init, _init2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

  var _Module$NS = Module.NS,
      CoreObject = _Module$NS.CoreObject,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      nameBy = _Module$NS.nameBy;
  var Queue = (_dec = partOf(Module), initialize(_class = _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_CoreObject) {
    _inherits(Queue, _CoreObject);

    var _super = _createSuper(Queue);

    _createClass(Queue, [{
      key: "delay",
      value: function () {
        var _delay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(scriptName, data, delayUntil) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.resque.delay(this.name, scriptName, data, delayUntil);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function delay(_x, _x2, _x3) {
          return _delay.apply(this, arguments);
        }

        return delay;
      }()
    }, {
      key: "push",
      value: function () {
        var _push = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(scriptName, data, delayUntil) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return this.resque.pushJob(this.name, scriptName, data, delayUntil);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function push(_x4, _x5, _x6) {
          return _push.apply(this, arguments);
        }

        return push;
      }()
    }, {
      key: "get",
      value: function () {
        var _get2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(jobId) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.resque.getJob(this.name, jobId);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function get(_x7) {
          return _get2.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "delete",
      value: function () {
        var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(jobId) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.resque.deleteJob(this.name, jobId);

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function _delete(_x8) {
          return _delete2.apply(this, arguments);
        }

        return _delete;
      }()
    }, {
      key: "abort",
      value: function () {
        var _abort = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(jobId) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.resque.abortJob(this.name, jobId);

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function abort(_x9) {
          return _abort.apply(this, arguments);
        }

        return abort;
      }()
    }, {
      key: "all",
      value: function () {
        var _all = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(scriptName) {
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.resque.allJobs(this.name, scriptName);

                case 2:
                  return _context6.abrupt("return", _context6.sent);

                case 3:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function all(_x10) {
          return _all.apply(this, arguments);
        }

        return all;
      }()
    }, {
      key: "pending",
      value: function () {
        var _pending = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(scriptName) {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.resque.pendingJobs(this.name, scriptName);

                case 2:
                  return _context7.abrupt("return", _context7.sent);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function pending(_x11) {
          return _pending.apply(this, arguments);
        }

        return pending;
      }()
    }, {
      key: "progress",
      value: function () {
        var _progress = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(scriptName) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return this.resque.progressJobs(this.name, scriptName);

                case 2:
                  return _context8.abrupt("return", _context8.sent);

                case 3:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function progress(_x12) {
          return _progress.apply(this, arguments);
        }

        return progress;
      }()
    }, {
      key: "completed",
      value: function () {
        var _completed = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(scriptName) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.resque.completedJobs(this.name, scriptName);

                case 2:
                  return _context9.abrupt("return", _context9.sent);

                case 3:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function completed(_x13) {
          return _completed.apply(this, arguments);
        }

        return completed;
      }()
    }, {
      key: "failed",
      value: function () {
        var _failed = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(scriptName) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return this.resque.failedJobs(this.name, scriptName);

                case 2:
                  return _context10.abrupt("return", _context10.sent);

                case 3:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function failed(_x14) {
          return _failed.apply(this, arguments);
        }

        return failed;
      }()
    }], [{
      key: "restoreObject",
      value: function () {
        var _restoreObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(acModule, replica) {
          var Facade, facade, resque;
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  if (!((replica != null ? replica["class"] : undefined) === this.name && (replica != null ? replica.type : undefined) === 'instance')) {
                    _context11.next = 9;
                    break;
                  }

                  Facade = acModule.NS.ApplicationFacade || acModule.NS.Facade;
                  facade = Facade.getInstance(replica.multitonKey);
                  resque = facade.getProxy(replica.resqueName);
                  _context11.next = 6;
                  return resque.get(replica.name);

                case 6:
                  return _context11.abrupt("return", _context11.sent);

                case 9:
                  _context11.next = 11;
                  return _get(_getPrototypeOf(Queue), "restoreObject", this).call(this, acModule, replica);

                case 11:
                  return _context11.abrupt("return", _context11.sent);

                case 12:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11, this);
        }));

        function restoreObject(_x15, _x16) {
          return _restoreObject.apply(this, arguments);
        }

        return restoreObject;
      }()
    }, {
      key: "replicateObject",
      value: function () {
        var _replicateObject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(instance) {
          var replica;
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  _context12.next = 2;
                  return _get(_getPrototypeOf(Queue), "replicateObject", this).call(this, instance);

                case 2:
                  replica = _context12.sent;
                  replica.multitonKey = instance.resque._multitonKey;
                  replica.resqueName = instance.resque.getProxyName();
                  replica.name = instance.name;
                  return _context12.abrupt("return", replica);

                case 7:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12, this);
        }));

        function replicateObject(_x17) {
          return _replicateObject.apply(this, arguments);
        }

        return replicateObject;
      }()
    }]);

    function Queue(aoProperties, aoResque) {
      var _this;

      _classCallCheck(this, Queue);

      _this = _super.apply(this, arguments);

      _initializerDefineProperty(_this, "resque", _descriptor, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "name", _descriptor2, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "concurrency", _descriptor3, _assertThisInitialized(_this));

      _this.resque = aoResque;

      for (var vsAttrName in aoProperties) {
        if (!hasProp.call(aoProperties, vsAttrName)) continue;
        var voAttrValue = aoProperties[vsAttrName];
        _this[vsAttrName] = voAttrValue;
      }

      return _this;
    }

    return Queue;
  }(CoreObject), _class3.__filename = __filename$1, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "resque", [property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "concurrency", [property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "delay", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "delay"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "push", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "push"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "get", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "get"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delete", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "delete"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "abort", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "abort"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "all", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "all"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pending", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "pending"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progress", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "progress"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completed", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "completed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "failed", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "failed"), _class2.prototype), _applyDecoratedDescriptor(_class2, "restoreObject", [method], Object.getOwnPropertyDescriptor(_class2, "restoreObject"), _class2), _applyDecoratedDescriptor(_class2, "replicateObject", [method], Object.getOwnPropertyDescriptor(_class2, "replicateObject"), _class2)), _class2)) || _class) || _class);
});

var __filename$2 = '/proxies/Resque.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var ResqueTF = (function (Module) {
  var _dec, _class, _class2, _init, _init2, _descriptor, _descriptor2, _class3, _temp;

  var _Module$NS = Module.NS,
      DELAYED_JOBS_QUEUE = _Module$NS.DELAYED_JOBS_QUEUE,
      Proxy = _Module$NS.Proxy,
      assert = _Module$NS.assert,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      nameBy = _Module$NS.nameBy,
      mixin = _Module$NS.mixin,
      uuid = _Module$NS.Utils.uuid;
  var Resque = (_dec = partOf(Module), initialize(_class = _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Proxy) {
    _inherits(Resque, _Proxy);

    var _super = _createSuper(Resque);

    _createClass(Resque, [{
      key: "fullQueueName",
      value: function fullQueueName(queueName) {
        if (!/\|\>/.test(queueName)) {
          var _this$ApplicationModu = this.ApplicationModule.name.split('|>'),
              _this$ApplicationModu2 = _slicedToArray(_this$ApplicationModu, 1),
              moduleName = _this$ApplicationModu2[0];

          queueName = "".concat(moduleName, "|>").concat(queueName);
        }

        return queueName;
      }
    }, {
      key: "onRegister",
      value: function onRegister() {
        var _get2;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_get2 = _get(_getPrototypeOf(Resque.prototype), "onRegister", this)).call.apply(_get2, [this].concat(args));
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        var _get3;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_get3 = _get(_getPrototypeOf(Resque.prototype), "onRemove", this)).call.apply(_get3, [this].concat(args));

        this.tmpJobs = [];
      }
    }, {
      key: "create",
      value: function () {
        var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queueName, concurrency) {
          var vhNewQueue;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.ensureQueue(queueName, concurrency);

                case 2:
                  vhNewQueue = _context.sent;
                  return _context.abrupt("return", Module.NS.Queue["new"](vhNewQueue, this));

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function create(_x, _x2) {
          return _create.apply(this, arguments);
        }

        return create;
      }()
    }, {
      key: "all",
      value: function () {
        var _all = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var results, vlQueues, _iterator, _step, vhQueue;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  results = [];
                  _context2.next = 3;
                  return this.allQueues();

                case 3:
                  vlQueues = _context2.sent;
                  _iterator = _createForOfIteratorHelper(vlQueues);

                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      vhQueue = _step.value;
                      results.push(Module.NS.Queue["new"](vhQueue, this));
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }

                  return _context2.abrupt("return", results);

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function all() {
          return _all.apply(this, arguments);
        }

        return all;
      }()
    }, {
      key: 'get',
      value: function () {
        var _get4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(queueName) {
          var vhQueue;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getQueue(queueName);

                case 2:
                  vhQueue = _context3.sent;

                  if (!(vhQueue != null)) {
                    _context3.next = 7;
                    break;
                  }

                  return _context3.abrupt("return", Module.NS.Queue["new"](vhQueue, this));

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function get(_x3) {
          return _get4.apply(this, arguments);
        }

        return get;
      }()
    }, {
      key: "remove",
      value: function () {
        var _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(queueName) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.removeQueue(queueName);

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function remove(_x4) {
          return _remove.apply(this, arguments);
        }

        return remove;
      }()
    }, {
      key: "update",
      value: function () {
        var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(queueName, concurrency) {
          var vhNewQueue;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.ensureQueue(queueName, concurrency);

                case 2:
                  vhNewQueue = _context5.sent;
                  return _context5.abrupt("return", Module.NS.Queue["new"](vhNewQueue, this));

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function update(_x5, _x6) {
          return _update.apply(this, arguments);
        }

        return update;
      }()
    }, {
      key: "delay",
      value: function () {
        var _delay2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(queueName, scriptName, data, _delay) {
          var id, queue;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (!/\|\>/.test(this.facade._multitonKey)) {
                    _context6.next = 5;
                    break;
                  }

                  id = uuid.v4();
                  this.tmpJobs.push({
                    queueName: queueName,
                    scriptName: scriptName,
                    data: data,
                    delay: _delay,
                    id: id
                  });
                  _context6.next = 11;
                  break;

                case 5:
                  _context6.next = 7;
                  return this.get(queueName || DELAYED_JOBS_QUEUE);

                case 7:
                  queue = _context6.sent;
                  _context6.next = 10;
                  return queue.push(scriptName, data, _delay);

                case 10:
                  id = _context6.sent;

                case 11:
                  return _context6.abrupt("return", id);

                case 12:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function delay(_x7, _x8, _x9, _x10) {
          return _delay2.apply(this, arguments);
        }

        return delay;
      }()
    }, {
      key: "getDelayed",
      value: function () {
        var _getDelayed = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  return _context7.abrupt("return", this.tmpJobs);

                case 1:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function getDelayed() {
          return _getDelayed.apply(this, arguments);
        }

        return getDelayed;
      }()
    }, {
      key: "ensureQueue",
      value: function () {
        var _ensureQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(name, concurrency) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        function ensureQueue(_x11, _x12) {
          return _ensureQueue.apply(this, arguments);
        }

        return ensureQueue;
      }()
    }, {
      key: "getQueue",
      value: function () {
        var _getQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(name) {
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  return _context9.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9);
        }));

        function getQueue(_x13) {
          return _getQueue.apply(this, arguments);
        }

        return getQueue;
      }()
    }, {
      key: "removeQueue",
      value: function () {
        var _removeQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(name) {
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  return _context10.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10);
        }));

        function removeQueue(_x14) {
          return _removeQueue.apply(this, arguments);
        }

        return removeQueue;
      }()
    }, {
      key: "allQueues",
      value: function () {
        var _allQueues = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
          return regeneratorRuntime.wrap(function _callee11$(_context11) {
            while (1) {
              switch (_context11.prev = _context11.next) {
                case 0:
                  return _context11.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context11.stop();
              }
            }
          }, _callee11);
        }));

        function allQueues() {
          return _allQueues.apply(this, arguments);
        }

        return allQueues;
      }()
    }, {
      key: "pushJob",
      value: function () {
        var _pushJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(queueName, scriptName, data, delayUntil) {
          return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
              switch (_context12.prev = _context12.next) {
                case 0:
                  return _context12.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context12.stop();
              }
            }
          }, _callee12);
        }));

        function pushJob(_x15, _x16, _x17, _x18) {
          return _pushJob.apply(this, arguments);
        }

        return pushJob;
      }()
    }, {
      key: "getJob",
      value: function () {
        var _getJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(queueName, jobId) {
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  return _context13.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13);
        }));

        function getJob(_x19, _x20) {
          return _getJob.apply(this, arguments);
        }

        return getJob;
      }()
    }, {
      key: "deleteJob",
      value: function () {
        var _deleteJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(queueName, jobId) {
          return regeneratorRuntime.wrap(function _callee14$(_context14) {
            while (1) {
              switch (_context14.prev = _context14.next) {
                case 0:
                  return _context14.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context14.stop();
              }
            }
          }, _callee14);
        }));

        function deleteJob(_x21, _x22) {
          return _deleteJob.apply(this, arguments);
        }

        return deleteJob;
      }()
    }, {
      key: "abortJob",
      value: function () {
        var _abortJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(queueName, jobId) {
          return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
              switch (_context15.prev = _context15.next) {
                case 0:
                  return _context15.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context15.stop();
              }
            }
          }, _callee15);
        }));

        function abortJob(_x23, _x24) {
          return _abortJob.apply(this, arguments);
        }

        return abortJob;
      }()
    }, {
      key: "allJobs",
      value: function () {
        var _allJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(queueName, scriptName) {
          return regeneratorRuntime.wrap(function _callee16$(_context16) {
            while (1) {
              switch (_context16.prev = _context16.next) {
                case 0:
                  return _context16.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context16.stop();
              }
            }
          }, _callee16);
        }));

        function allJobs(_x25, _x26) {
          return _allJobs.apply(this, arguments);
        }

        return allJobs;
      }()
    }, {
      key: "pendingJobs",
      value: function () {
        var _pendingJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(queueName, scriptName) {
          return regeneratorRuntime.wrap(function _callee17$(_context17) {
            while (1) {
              switch (_context17.prev = _context17.next) {
                case 0:
                  return _context17.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context17.stop();
              }
            }
          }, _callee17);
        }));

        function pendingJobs(_x27, _x28) {
          return _pendingJobs.apply(this, arguments);
        }

        return pendingJobs;
      }()
    }, {
      key: "progressJobs",
      value: function () {
        var _progressJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(queueName, scriptName) {
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  return _context18.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee18);
        }));

        function progressJobs(_x29, _x30) {
          return _progressJobs.apply(this, arguments);
        }

        return progressJobs;
      }()
    }, {
      key: "completedJobs",
      value: function () {
        var _completedJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(queueName, scriptName) {
          return regeneratorRuntime.wrap(function _callee19$(_context19) {
            while (1) {
              switch (_context19.prev = _context19.next) {
                case 0:
                  return _context19.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context19.stop();
              }
            }
          }, _callee19);
        }));

        function completedJobs(_x31, _x32) {
          return _completedJobs.apply(this, arguments);
        }

        return completedJobs;
      }()
    }, {
      key: "failedJobs",
      value: function () {
        var _failedJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(queueName, scriptName) {
          return regeneratorRuntime.wrap(function _callee20$(_context20) {
            while (1) {
              switch (_context20.prev = _context20.next) {
                case 0:
                  return _context20.abrupt("return", assert.fail('Not implemented specific method'));

                case 1:
                case "end":
                  return _context20.stop();
              }
            }
          }, _callee20);
        }));

        function failedJobs(_x33, _x34) {
          return _failedJobs.apply(this, arguments);
        }

        return failedJobs;
      }()
    }]);

    function Resque() {
      var _this;

      _classCallCheck(this, Resque);

      _this = _super.apply(this, arguments);

      _initializerDefineProperty(_this, "_resqueI", _descriptor, _assertThisInitialized(_this));

      _initializerDefineProperty(_this, "tmpJobs", _descriptor2, _assertThisInitialized(_this));

      _this.tmpJobs = [];
      return _this;
    }

    return Resque;
  }(Proxy), _class3.__filename = __filename$2, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resqueI", [property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return 'ResqueInterface';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tmpJobs", [property], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return null;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "fullQueueName", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "fullQueueName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRegister", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRegister"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRemove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "create", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "create"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "all", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "all"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'get', [method], Object.getOwnPropertyDescriptor(_class2.prototype, 'get'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "remove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "remove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delay", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "delay"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getDelayed", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getDelayed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ensureQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "ensureQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "removeQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allQueues", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "allQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "pushJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "abortJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "abortJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "allJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pendingJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "pendingJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progressJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "progressJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completedJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "completedJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "failedJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "failedJobs"), _class2.prototype)), _class2)) || _class) || _class);
});

var __filename$3 = '/commands/DelayedJobCommand.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var DelayedJobCommandTF = (function (Module) {
  var _dec, _class, _class2, _init, _init2, _class3, _temp;

  var _Module$NS = Module.NS,
      DELAYED_JOB_RESULT = _Module$NS.DELAYED_JOB_RESULT,
      Proto = _Module$NS.Proto,
      Command = _Module$NS.Command,
      Notification = _Module$NS.Notification,
      assert = _Module$NS.assert,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      method = _Module$NS.method,
      nameBy = _Module$NS.nameBy;
  var DelayedJobCommand = (_dec = partOf(Module), initialize(_class = _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Command) {
    _inherits(DelayedJobCommand, _Command);

    var _super = _createSuper(DelayedJobCommand);

    function DelayedJobCommand() {
      _classCallCheck(this, DelayedJobCommand);

      return _super.apply(this, arguments);
    }

    _createClass(DelayedJobCommand, [{
      key: "body",
      value: function () {
        var _body = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(aoData) {
          var _replicated, _replicated2;

          var replicated, moduleName, replica, methodName, args, ApplicationModule, vcInstanceClass;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  moduleName = aoData.moduleName, replica = aoData.replica, methodName = aoData.methodName, args = aoData.args;
                  replica.multitonKey = this._multitonKey;
                  ApplicationModule = this.ApplicationModule;
                  assert(moduleName === ApplicationModule.name, "Job was defined with moduleName = `".concat(moduleName, "`, but its Module = `").concat(ApplicationModule.name, "`"));
                  _context.t0 = replica.type;
                  _context.next = _context.t0 === 'class' ? 7 : _context.t0 === 'instance' ? 14 : 22;
                  break;

                case 7:
                  _context.next = 10;
                  return Proto.restoreObject(ApplicationModule, replica);

                case 10:
                  replicated = _context.sent;
                  _context.next = 13;
                  return (_replicated = replicated)[methodName].apply(_replicated, _toConsumableArray(args));

                case 13:
                  return _context.abrupt("break", 23);

                case 14:
                  vcInstanceClass = ApplicationModule.NS[replica["class"]];
                  _context.next = 18;
                  return vcInstanceClass.restoreObject(ApplicationModule, replica);

                case 18:
                  replicated = _context.sent;
                  _context.next = 21;
                  return (_replicated2 = replicated)[methodName].apply(_replicated2, _toConsumableArray(args));

                case 21:
                  return _context.abrupt("break", 23);

                case 22:
                  throw new Error('Replica type must be `instance` or `class`');

                case 23:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function body(_x) {
          return _body.apply(this, arguments);
        }

        return body;
      }()
    }, {
      key: "execute",
      value: function () {
        var _execute = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(aoNotification) {
          var voBody, reverse, voResult, result;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  voBody = aoNotification.getBody();
                  reverse = aoNotification.getType();
                  voResult = null;
                  _context2.prev = 3;
                  _context2.next = 6;
                  return this.body(voBody);

                case 6:
                  result = _context2.sent;
                  voResult = {
                    result: result
                  };
                  _context2.next = 15;
                  break;

                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](3);
                  _context2.t0.message = 'ERROR in Script::execute ' + _context2.t0.message;
                  console.error(_context2.t0);
                  voResult = {
                    error: _context2.t0
                  };

                case 15:
                  this.send(DELAYED_JOB_RESULT, voResult, reverse);

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[3, 10]]);
        }));

        function execute(_x2) {
          return _execute.apply(this, arguments);
        }

        return execute;
      }()
    }]);

    return DelayedJobCommand;
  }(Command), _class3.__filename = __filename$3, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2), _applyDecoratedDescriptor(_class2.prototype, "body", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "body"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "execute", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "execute"), _class2.prototype)), _class2)) || _class) || _class);
});

var __filename$4 = '/mediators/ResqueExecutor.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var ResqueExecutorTF = (function (Module) {
  var _dec, _class, _class2, _init, _init2, _class3, _temp;

  var _Module$NS = Module.NS,
      Mediator = _Module$NS.Mediator,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      nameBy = _Module$NS.nameBy;
  var ResqueExecutor = (_dec = partOf(Module), initialize(_class = _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Mediator) {
    _inherits(ResqueExecutor, _Mediator);

    var _super = _createSuper(ResqueExecutor);

    function ResqueExecutor() {
      _classCallCheck(this, ResqueExecutor);

      return _super.apply(this, arguments);
    }

    return ResqueExecutor;
  }(Mediator), _class3.__filename = __filename$4, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2)), _class2)) || _class) || _class);
});

var __filename$5 = '/mixins/DelayableMixin.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var DelayableMixinTF = (function (Module) {
  var _Module$NS = Module.NS,
      RESQUE = _Module$NS.RESQUE,
      DELAYED_JOBS_QUEUE = _Module$NS.DELAYED_JOBS_QUEUE,
      DELAYED_JOB_COMMAND = _Module$NS.DELAYED_JOB_COMMAND,
      CoreObject = _Module$NS.CoreObject,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      method = _Module$NS.method,
      _ = _Module$NS.Utils._;
  Module.defineMixin(__filename$5, function (BaseClass) {
    var _class, _class2, _init, _class3, _temp;

    var Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Mixin, _BaseClass);

      var _super = _createSuper(Mixin);

      function Mixin() {
        _classCallCheck(this, Mixin);

        return _super.apply(this, arguments);
      }

      _createClass(Mixin, [{
        key: "delay",
        value: function delay(opts) {
          return new Proxy(this, {
            get: function get(target, name, receiver) {
              if (name === 'delay') {
                throw new Error('Method `delay` can not been delayed');
              }

              if (!(name in target) || typeof target[name] !== "function") {
                throw new Error("Method `".concat(_.isSymbol(name) ? Symbol.keyFor(name) : name, "` absent in class ").concat(target.name, ".prototype"));
              }

              vcClass = target.constructor;
              vcClass;
              var options = opts || {};
              return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _len,
                    args,
                    _key,
                    data,
                    _args = arguments;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                          args[_key] = _args[_key];
                        }

                        _context.t0 = target.moduleName();
                        _context.next = 4;
                        return vcClass.replicateObject(target);

                      case 4:
                        _context.t1 = _context.sent;
                        _context.t2 = name;
                        _context.t3 = args;
                        _context.t4 = options;
                        data = {
                          moduleName: _context.t0,
                          replica: _context.t1,
                          methodName: _context.t2,
                          args: _context.t3,
                          opts: _context.t4
                        };
                        _context.next = 11;
                        return vcClass._delayJob(target, data, options);

                      case 11:
                        return _context.abrupt("return", _context.sent);

                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
            }
          });
        }
      }], [{
        key: "_delayJob",
        value: function () {
          var _delayJob2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(target, data, options) {
            var queueName, Facade, voFacade, resque, queue;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    queueName = options.queue;
                    Facade = target.Module.NS.Facade;
                    voFacade = Facade.getInstance(target.Module.name);
                    resque = voFacade.getProxy(RESQUE);
                    _context2.next = 6;
                    return resque.get(queueName || DELAYED_JOBS_QUEUE);

                  case 6:
                    queue = _context2.sent;
                    _context2.next = 9;
                    return queue.delay(DELAYED_JOB_COMMAND, data, options.delayUntil);

                  case 9:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function _delayJob(_x, _x2, _x3) {
            return _delayJob2.apply(this, arguments);
          }

          return _delayJob;
        }()
      }, {
        key: "delay",
        value: function delay(opts) {
          return new Proxy(this, {
            get: function get(target, name, receiver) {
              if (name === 'delay') {
                throw new Error('Method `delay` can not been delayed');
              }

              if (!(name in target) || typeof target[name] !== "function") {
                throw new Error("Method `".concat(_.isSymbol(name) ? Symbol.keyFor(name) : name, "` absent in class ").concat(target.name));
              }

              var Proto = target.constructor;
              var options = opts || {};
              return /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _len2,
                    args,
                    _key2,
                    data,
                    _args3 = arguments;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        for (_len2 = _args3.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                          args[_key2] = _args3[_key2];
                        }

                        _context3.t0 = target.moduleName();
                        _context3.next = 4;
                        return Proto.replicateObject(target);

                      case 4:
                        _context3.t1 = _context3.sent;
                        _context3.t2 = name;
                        _context3.t3 = args;
                        _context3.t4 = options;
                        data = {
                          moduleName: _context3.t0,
                          replica: _context3.t1,
                          methodName: _context3.t2,
                          args: _context3.t3,
                          opts: _context3.t4
                        };
                        _context3.next = 11;
                        return target._delayJob(target, data, options);

                      case 11:
                        return _context3.abrupt("return", _context3.sent);

                      case 12:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
            }
          });
        }
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2, "_delayJob", [method], Object.getOwnPropertyDescriptor(_class2, "_delayJob"), _class2), _applyDecoratedDescriptor(_class2, "delay", [method], Object.getOwnPropertyDescriptor(_class2, "delay"), _class2), _applyDecoratedDescriptor(_class2.prototype, "delay", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "delay"), _class2.prototype)), _class2)) || _class;

    return Mixin;
  });
});

var __filename$6 = '/mixins/SaveDelayedJobsMixin.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var SaveDelayedJobsMixinTF = (function (Module) {
  var _Module$NS = Module.NS,
      RESQUE = _Module$NS.RESQUE,
      DELAYED_JOBS_QUEUE = _Module$NS.DELAYED_JOBS_QUEUE,
      CoreObject = _Module$NS.CoreObject,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      inject = _Module$NS.inject;
  Module.defineMixin(__filename$6, function (BaseClass) {
    var _dec, _class, _class2, _init, _descriptor, _class3, _temp;

    var Mixin = (_dec = inject("Factory<".concat(RESQUE, ">")), initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Mixin, _BaseClass);

      var _super = _createSuper(Mixin);

      function Mixin() {
        var _this;

        _classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _initializerDefineProperty(_this, "_resqueFactory", _descriptor, _assertThisInitialized(_this));

        return _this;
      }

      _createClass(Mixin, [{
        key: "saveDelayeds",
        value: function () {
          var _saveDelayeds = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _iterator, _step, delayed, queueName, scriptName, data, delay, queue;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = _createForOfIteratorHelper;
                    _context.next = 3;
                    return this.resque.getDelayed();

                  case 3:
                    _context.t1 = _context.sent;
                    _iterator = (0, _context.t0)(_context.t1);
                    _context.prev = 5;

                    _iterator.s();

                  case 7:
                    if ((_step = _iterator.n()).done) {
                      _context.next = 17;
                      break;
                    }

                    delayed = _step.value;
                    queueName = delayed.queueName, scriptName = delayed.scriptName, data = delayed.data, delay = delayed.delay;
                    _context.next = 12;
                    return this.resque.get(queueName || DELAYED_JOBS_QUEUE);

                  case 12:
                    queue = _context.sent;
                    _context.next = 15;
                    return queue.push(scriptName, data, delay);

                  case 15:
                    _context.next = 7;
                    break;

                  case 17:
                    _context.next = 22;
                    break;

                  case 19:
                    _context.prev = 19;
                    _context.t2 = _context["catch"](5);

                    _iterator.e(_context.t2);

                  case 22:
                    _context.prev = 22;

                    _iterator.f();

                    return _context.finish(22);

                  case 25:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[5, 19, 22, 25]]);
          }));

          function saveDelayeds() {
            return _saveDelayeds.apply(this, arguments);
          }

          return saveDelayeds;
        }()
      }, {
        key: "resque",
        get: function get() {
          return this._resqueFactory();
        }
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "saveDelayeds", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "saveDelayeds"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_resqueFactory", [_dec, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, "resque", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "resque"), _class2.prototype)), _class2)) || _class);
    return Mixin;
  });
});

var __filename$7 = '/mixins/MemoryResqueMixin.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var MemoryResqueMixinTF = (function (Module) {
  var _Module$NS = Module.NS,
      DEFAULT_QUEUE = _Module$NS.DEFAULT_QUEUE,
      Resque = _Module$NS.Resque,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      _Module$NS$Utils = _Module$NS.Utils,
      _ = _Module$NS$Utils._,
      inflect = _Module$NS$Utils.inflect;
  Module.defineMixin(__filename$7, function (BaseClass) {
    var _class, _class2, _init, _descriptor, _descriptor2, _class3, _temp;

    var Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Mixin, _BaseClass);

      var _super = _createSuper(Mixin);

      function Mixin() {
        var _this;

        _classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _initializerDefineProperty(_this, "_jobs", _descriptor, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "_queues", _descriptor2, _assertThisInitialized(_this));

        return _this;
      }

      _createClass(Mixin, [{
        key: "onRegister",
        value: function onRegister() {
          _get(_getPrototypeOf(Mixin.prototype), "onRegister", this).apply(this, arguments);

          this._queues = {};
          this._jobs = {};
          var fullName = this.fullQueueName(DEFAULT_QUEUE);
          this._queues[fullName] = {
            name: DEFAULT_QUEUE,
            concurrency: 1
          };
        }
      }, {
        key: "onRemove",
        value: function onRemove() {
          _get(_getPrototypeOf(Mixin.prototype), "onRemove", this).apply(this, arguments);

          for (var qKey in this._queues) {
            delete this._queues[qKey];
          }

          this._queues = {};

          for (var jKey in this._jobs) {
            delete this._jobs[jKey];
          }

          this._jobs = {};
        }
      }, {
        key: "ensureQueue",
        value: function () {
          var _ensureQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
            var concurrency,
                fullName,
                queue,
                _args = arguments;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    concurrency = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
                    fullName = this.fullQueueName(name);
                    queue = this._queues[fullName];

                    if (queue != null) {
                      queue.concurrency = concurrency;
                      this._queues[fullName] = queue;
                    } else {
                      this._queues[fullName] = {
                        name: name,
                        concurrency: concurrency
                      };
                    }

                    return _context.abrupt("return", {
                      name: name,
                      concurrency: concurrency
                    });

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function ensureQueue(_x) {
            return _ensureQueue.apply(this, arguments);
          }

          return ensureQueue;
        }()
      }, {
        key: "getQueue",
        value: function () {
          var _getQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
            var fullName, queue, concurrency;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    fullName = this.fullQueueName(name);
                    queue = this._queues[fullName];

                    if (!(queue != null)) {
                      _context2.next = 7;
                      break;
                    }

                    concurrency = queue.concurrency;
                    return _context2.abrupt("return", {
                      name: name,
                      concurrency: concurrency
                    });

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function getQueue(_x2) {
            return _getQueue.apply(this, arguments);
          }

          return getQueue;
        }()
      }, {
        key: "removeQueue",
        value: function () {
          var _removeQueue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(queueName) {
            var fullName, queue;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    fullName = this.fullQueueName(queueName);
                    queue = this._queues[fullName];

                    if (queue != null) {
                      delete this._queues[fullName];
                    }

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function removeQueue(_x3) {
            return _removeQueue.apply(this, arguments);
          }

          return removeQueue;
        }()
      }, {
        key: "allQueues",
        value: function () {
          var _allQueues = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var queues, mapedQueues;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    queues = _.values(this._queues);
                    mapedQueues = queues.map(function (_ref) {
                      var name = _ref.name,
                          concurrency = _ref.concurrency;
                      return {
                        name: name,
                        concurrency: concurrency
                      };
                    });
                    return _context4.abrupt("return", mapedQueues);

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function allQueues() {
            return _allQueues.apply(this, arguments);
          }

          return allQueues;
        }()
      }, {
        key: "pushJob",
        value: function () {
          var _pushJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(queueName, scriptName, data, delayUntil) {
            var fullName, length;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    fullName = this.fullQueueName(queueName);
                    delayUntil = delayUntil || Date.now();

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    length = this._jobs[fullName].push({
                      queueName: fullName,
                      data: {
                        scriptName: scriptName,
                        data: data
                      },
                      delayUntil: delayUntil,
                      status: 'scheduled',
                      lockLifetime: 5000,
                      lockLimit: 2
                    });
                    return _context5.abrupt("return", length - 1);

                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function pushJob(_x4, _x5, _x6, _x7) {
            return _pushJob.apply(this, arguments);
          }

          return pushJob;
        }()
      }, {
        key: "getJob",
        value: function () {
          var _getJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(queueName, jobId) {
            var fullName;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context6.abrupt("return", this._jobs[fullName][jobId] || null);

                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function getJob(_x8, _x9) {
            return _getJob.apply(this, arguments);
          }

          return getJob;
        }()
      }, {
        key: "deleteJob",
        value: function () {
          var _deleteJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(queueName, jobId) {
            var isDeleted, fullName;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    if (this._jobs[fullName][jobId] != null) {
                      delete this._jobs[fullName][jobId];
                      isDeleted = true;
                    } else {
                      isDeleted = false;
                    }

                    return _context7.abrupt("return", isDeleted);

                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          function deleteJob(_x10, _x11) {
            return _deleteJob.apply(this, arguments);
          }

          return deleteJob;
        }()
      }, {
        key: "abortJob",
        value: function () {
          var _abortJob = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(queueName, jobId) {
            var fullName, job;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    job = this._jobs[fullName][jobId];

                    if (job != null) {
                      if (job.status === 'scheduled') {
                        job.status = 'failed';
                        job.reason = new Error('Job has been aborted');
                      }
                    }

                  case 4:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));

          function abortJob(_x12, _x13) {
            return _abortJob.apply(this, arguments);
          }

          return abortJob;
        }()
      }, {
        key: "allJobs",
        value: function () {
          var _allJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(queueName) {
            var scriptName,
                fullName,
                _args9 = arguments;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    scriptName = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : null;
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context9.abrupt("return", this._jobs[fullName].filter(function (job) {
                      if (scriptName != null) {
                        if (job.data.scriptName === scriptName) {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        return true;
                      }
                    }) || []);

                  case 4:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));

          function allJobs(_x14) {
            return _allJobs.apply(this, arguments);
          }

          return allJobs;
        }()
      }, {
        key: "pendingJobs",
        value: function () {
          var _pendingJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(queueName) {
            var scriptName,
                fullName,
                _args10 = arguments;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    scriptName = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : null;
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context10.abrupt("return", this._jobs[fullName].filter(function (job) {

                      if (scriptName != null) {
                        if (job.data.scriptName === scriptName && _.includes(['scheduled', 'queued'], job.status)) {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        if (_.includes(['scheduled', 'queued'], job.status)) {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }) || []);

                  case 4:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));

          function pendingJobs(_x15) {
            return _pendingJobs.apply(this, arguments);
          }

          return pendingJobs;
        }()
      }, {
        key: "progressJobs",
        value: function () {
          var _progressJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(queueName) {
            var scriptName,
                fullName,
                _args11 = arguments;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    scriptName = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : null;
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context11.abrupt("return", this._jobs[fullName].filter(function (job) {
                      if (scriptName != null) {
                        if (job.data.scriptName === scriptName && job.status === 'running') {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        if (job.status === 'running') {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }) || []);

                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }
            }, _callee11, this);
          }));

          function progressJobs(_x16) {
            return _progressJobs.apply(this, arguments);
          }

          return progressJobs;
        }()
      }, {
        key: "completedJobs",
        value: function () {
          var _completedJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(queueName) {
            var scriptName,
                fullName,
                _args12 = arguments;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
              while (1) {
                switch (_context12.prev = _context12.next) {
                  case 0:
                    scriptName = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : null;
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context12.abrupt("return", this._jobs[fullName].filter(function (job) {
                      if (scriptName != null) {
                        if (job.data.scriptName === scriptName && job.status === 'completed') {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        if (job.status === 'completed') {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }) || []);

                  case 4:
                  case "end":
                    return _context12.stop();
                }
              }
            }, _callee12, this);
          }));

          function completedJobs(_x17) {
            return _completedJobs.apply(this, arguments);
          }

          return completedJobs;
        }()
      }, {
        key: "failedJobs",
        value: function () {
          var _failedJobs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(queueName) {
            var scriptName,
                fullName,
                _args13 = arguments;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    scriptName = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : null;
                    fullName = this.fullQueueName(queueName);

                    if (this._jobs[fullName] == null) {
                      this._jobs[fullName] = [];
                    }

                    return _context13.abrupt("return", this._jobs[fullName].filter(function (job) {
                      if (scriptName != null) {
                        if (job.data.scriptName === scriptName && job.status === 'failed') {
                          return true;
                        } else {
                          return false;
                        }
                      } else {
                        if (job.status === 'failed') {
                          return true;
                        } else {
                          return false;
                        }
                      }
                    }) || []);

                  case 4:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13, this);
          }));

          function failedJobs(_x18) {
            return _failedJobs.apply(this, arguments);
          }

          return failedJobs;
        }()
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_jobs", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return null;
      }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_queues", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return null;
      }
    }), _applyDecoratedDescriptor(_class2.prototype, "onRegister", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRegister"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRemove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "ensureQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "ensureQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeQueue", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "removeQueue"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allQueues", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "allQueues"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pushJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "pushJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "getJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "abortJob", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "abortJob"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "allJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "allJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "pendingJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "pendingJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "progressJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "progressJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "completedJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "completedJobs"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "failedJobs", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "failedJobs"), _class2.prototype)), _class2)) || _class;

    return Mixin;
  });
});

var __filename$8 = '/mixins/MemoryExecutorMixin.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var hasProp$1 = {}.hasOwnProperty;
var MemoryExecutorMixinTF = (function (Module) {
  var _Module$NS = Module.NS,
      DELAYED_JOB_RESULT = _Module$NS.DELAYED_JOB_RESULT,
      START_RESQUE = _Module$NS.START_RESQUE,
      RESQUE = _Module$NS.RESQUE,
      RESQUE_EXECUTOR = _Module$NS.RESQUE_EXECUTOR,
      ResqueExecutor = _Module$NS.ResqueExecutor,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      property = _Module$NS.property,
      method = _Module$NS.method,
      inject = _Module$NS.inject,
      _Module$NS$Utils = _Module$NS.Utils,
      _ = _Module$NS$Utils._,
      genRandomAlphaNumbers = _Module$NS$Utils.genRandomAlphaNumbers;
  Module.defineMixin(__filename$8, function (BaseClass) {
    var _dec, _class, _class2, _init, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

    var Mixin = (_dec = inject("Factory<".concat(RESQUE, ">")), initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Mixin, _BaseClass);

      var _super = _createSuper(Mixin);

      function Mixin() {
        var _this;

        _classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _initializerDefineProperty(_this, "_timer", _descriptor, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "_isStopped", _descriptor2, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "_definedProcessors", _descriptor3, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "_concurrencyCount", _descriptor4, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "_resqueFactory", _descriptor5, _assertThisInitialized(_this));

        return _this;
      }

      _createClass(Mixin, [{
        key: "fullQueueName",
        value: function fullQueueName(queueName) {
          return this.resque.fullQueueName(queueName);
        }
      }, {
        key: "listNotificationInterests",
        value: function listNotificationInterests() {
          return [DELAYED_JOB_RESULT, START_RESQUE];
        }
      }, {
        key: "handleNotification",
        value: function handleNotification(aoNotification) {
          var vsName = aoNotification.getName();
          var voBody = aoNotification.getBody();
          var vsType = aoNotification.getType();

          switch (vsName) {
            case DELAYED_JOB_RESULT:
              this.getViewComponent().emit(vsType, voBody);
              break;

            case START_RESQUE:
              this.start();
          }
        }
      }, {
        key: "onRegister",
        value: function onRegister() {
          var _get2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          (_get2 = _get(_getPrototypeOf(Mixin.prototype), "onRegister", this)).call.apply(_get2, [this].concat(args));

          this.setViewComponent(new EventEmitter());
          this._concurrencyCount = {};
          this._definedProcessors = {};
          this.defineProcessors();
        }
      }, {
        key: "reDefineProcessors",
        value: function () {
          var _reDefineProcessors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    this.stop();
                    this._definedProcessors = {};
                    _context.next = 4;
                    return this.defineProcessors();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function reDefineProcessors() {
            return _reDefineProcessors.apply(this, arguments);
          }

          return reDefineProcessors;
        }()
      }, {
        key: "defineProcessors",
        value: function () {
          var _defineProcessors = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var _this2 = this;

            var ref, _iterator, _step, _step$value, name, concurrency, fullQueueName;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return this.resque.allQueues();

                  case 2:
                    ref = _context3.sent;
                    _iterator = _createForOfIteratorHelper(ref);
                    _context3.prev = 4;

                    _iterator.s();

                  case 6:
                    if ((_step = _iterator.n()).done) {
                      _context3.next = 13;
                      break;
                    }

                    _step$value = _step.value, name = _step$value.name, concurrency = _step$value.concurrency;
                    fullQueueName = this.resque.fullQueueName(name); // [let moduleName] = fullQueueName.split('|>');
                    //if (moduleName === this.moduleName()) {

                    this.define(name, {
                      concurrency: concurrency
                    }, /*#__PURE__*/function () {
                      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(job, done) {
                        var reverse, _job$data, scriptName, data;

                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                reverse = genRandomAlphaNumbers(32);

                                _this2.getViewComponent().once(reverse, function (aoError) {
                                  return done(aoError);
                                });

                                _job$data = job.data, scriptName = _job$data.scriptName, data = _job$data.data;

                                _this2.send(scriptName, data, reverse);

                              case 4:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));

                      return function (_x, _x2) {
                        return _ref.apply(this, arguments);
                      };
                    }()); //}

                    return _context3.abrupt("continue", 11);

                  case 11:
                    _context3.next = 6;
                    break;

                  case 13:
                    _context3.next = 18;
                    break;

                  case 15:
                    _context3.prev = 15;
                    _context3.t0 = _context3["catch"](4);

                    _iterator.e(_context3.t0);

                  case 18:
                    _context3.prev = 18;

                    _iterator.f();

                    return _context3.finish(18);

                  case 21:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this, [[4, 15, 18, 21]]);
          }));

          function defineProcessors() {
            return _defineProcessors.apply(this, arguments);
          }

          return defineProcessors;
        }()
      }, {
        key: "onRemove",
        value: function onRemove() {
          var _get3;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          (_get3 = _get(_getPrototypeOf(Mixin.prototype), "onRemove", this)).call.apply(_get3, [this].concat(args));

          this.stop();
        }
      }, {
        key: "cyclePart",
        value: function () {
          var _cyclePart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var ref, queueName, _ref$queueName, listener, concurrency, currentQC, now, progressJobs, _iterator2, _step2, _job, pendingJobs, _iterator3, _step3, job;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    ref = this._definedProcessors;
                    _context4.t0 = regeneratorRuntime.keys(ref);

                  case 2:
                    if ((_context4.t1 = _context4.t0()).done) {
                      _context4.next = 38;
                      break;
                    }

                    queueName = _context4.t1.value;

                    if (hasProp$1.call(ref, queueName)) {
                      _context4.next = 6;
                      break;
                    }

                    return _context4.abrupt("continue", 2);

                  case 6:
                    _ref$queueName = ref[queueName], listener = _ref$queueName.listener, concurrency = _ref$queueName.concurrency;
                    currentQC = this._concurrencyCount[queueName];
                    now = Date.now();
                    _context4.next = 11;
                    return this.resque.progressJobs(queueName);

                  case 11:
                    progressJobs = _context4.sent;
                    _iterator2 = _createForOfIteratorHelper(progressJobs);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        _job = _step2.value;

                        if (now - _job.startedAt < _job.lockLifetime) {
                          _job.status = 'scheduled';
                        }
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }

                    _context4.next = 16;
                    return this.resque.pendingJobs(queueName);

                  case 16:
                    pendingJobs = _context4.sent;

                    if (!(currentQC != null && currentQC < concurrency || currentQC == null)) {
                      _context4.next = 36;
                      break;
                    }

                    _iterator3 = _createForOfIteratorHelper(pendingJobs);
                    _context4.prev = 19;

                    _iterator3.s();

                  case 21:
                    if ((_step3 = _iterator3.n()).done) {
                      _context4.next = 28;
                      break;
                    }

                    job = _step3.value;

                    if (job.delayUntil < now) {
                      listener(job);
                    }

                    if (!(currentQC >= concurrency)) {
                      _context4.next = 26;
                      break;
                    }

                    return _context4.abrupt("break", 28);

                  case 26:
                    _context4.next = 21;
                    break;

                  case 28:
                    _context4.next = 33;
                    break;

                  case 30:
                    _context4.prev = 30;
                    _context4.t2 = _context4["catch"](19);

                    _iterator3.e(_context4.t2);

                  case 33:
                    _context4.prev = 33;

                    _iterator3.f();

                    return _context4.finish(33);

                  case 36:
                    _context4.next = 2;
                    break;

                  case 38:
                    this.recursion();

                  case 39:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this, [[19, 30, 33, 36]]);
          }));

          function cyclePart() {
            return _cyclePart.apply(this, arguments);
          }

          return cyclePart;
        }()
      }, {
        key: "recursion",
        value: function () {
          var _recursion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var _this3 = this;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (!this._isStopped) {
                      _context6.next = 2;
                      break;
                    }

                    return _context6.abrupt("return");

                  case 2:
                    this._timer = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              clearTimeout(_this3._timer);
                              _context5.next = 3;
                              return _this3.cyclePart();

                            case 3:
                              return _context5.abrupt("return", _context5.sent);

                            case 4:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    })), 100);

                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function recursion() {
            return _recursion.apply(this, arguments);
          }

          return recursion;
        }()
      }, {
        key: "start",
        value: function () {
          var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    this._isStopped = false;
                    _context7.next = 3;
                    return this.recursion();

                  case 3:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }()
      }, {
        key: "stop",
        value: function stop() {
          this._isStopped = true;

          if (this._timer != null) {
            clearTimeout(this._timer);
          }
        }
      }, {
        key: "define",
        value: function define(queueName, opts, lambda) {
          var _this4 = this;

          var concurrency = opts.concurrency;

          var listener = function listener(job) {
            var base;

            var done = function done(err) {
              if (err != null) {
                job.status = 'failed';
                job.reason = err;
              } else {
                job.status = 'completed';
              }

              _this4._concurrencyCount[queueName] -= 1;
            };

            if ((base = _this4._concurrencyCount)[queueName] == null) {
              base[queueName] = 0;
            }

            _this4._concurrencyCount[queueName] += 1;
            job.status = 'running';
            job.startedAt = Date.now();
            lambda(job, done);
          };

          this._definedProcessors[queueName] = {
            listener: listener,
            concurrency: concurrency
          };
        }
      }, {
        key: "resque",
        get: function get() {
          return this._resqueFactory();
        }
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_timer", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return null;
      }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isStopped", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return true;
      }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_definedProcessors", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return null;
      }
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_concurrencyCount", [property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return null;
      }
    }), _applyDecoratedDescriptor(_class2.prototype, "fullQueueName", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "fullQueueName"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "listNotificationInterests", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "listNotificationInterests"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleNotification", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "handleNotification"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRegister", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRegister"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reDefineProcessors", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "reDefineProcessors"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "defineProcessors", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "defineProcessors"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRemove", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "onRemove"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cyclePart", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "cyclePart"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "recursion", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "recursion"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "start", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "start"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "stop", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "stop"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "define", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "define"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_resqueFactory", [_dec, property], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, "resque", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "resque"), _class2.prototype)), _class2)) || _class);
    return Mixin;
  });
});

var __filename$9 = '/proxies/MemoryResque.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var MemoryResqueTF = (function (Module) {
  var _dec, _dec2, _class, _class2, _init, _init2, _class3, _temp;

  var _Module$NS = Module.NS,
      Resque = _Module$NS.Resque,
      MemoryResqueMixin = _Module$NS.MemoryResqueMixin,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      nameBy = _Module$NS.nameBy,
      mixin = _Module$NS.mixin;
  var MemoryResque = (_dec = partOf(Module), _dec2 = mixin(MemoryResqueMixin), initialize(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Resque) {
    _inherits(MemoryResque, _Resque);

    var _super = _createSuper(MemoryResque);

    function MemoryResque() {
      _classCallCheck(this, MemoryResque);

      return _super.apply(this, arguments);
    }

    return MemoryResque;
  }(Resque), _class3.__filename = __filename$9, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2)), _class2)) || _class) || _class) || _class);
});

var __filename$a = '/mediators/MemoryResqueExecutor.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var MemoryResqueExecutorTF = (function (Module) {
  var _dec, _dec2, _class, _class2, _init, _init2, _class3, _temp;

  var _Module$NS = Module.NS,
      ResqueExecutor = _Module$NS.ResqueExecutor,
      MemoryExecutorMixin = _Module$NS.MemoryExecutorMixin,
      initialize = _Module$NS.initialize,
      partOf = _Module$NS.partOf,
      meta = _Module$NS.meta,
      nameBy = _Module$NS.nameBy,
      mixin = _Module$NS.mixin;
  var MemoryResqueExecutor = (_dec = mixin(MemoryExecutorMixin), _dec2 = partOf(Module), initialize(_class = _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_ResqueExecutor) {
    _inherits(MemoryResqueExecutor, _ResqueExecutor);

    var _super = _createSuper(MemoryResqueExecutor);

    function MemoryResqueExecutor() {
      _classCallCheck(this, MemoryResqueExecutor);

      return _super.apply(this, arguments);
    }

    return MemoryResqueExecutor;
  }(ResqueExecutor), _class3.__filename = __filename$a, _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "__filename", [nameBy], (_init = Object.getOwnPropertyDescriptor(_class2, "__filename"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init;
    }
  }), _class2), _applyDecoratedDescriptor(_class2, "object", [meta], (_init2 = Object.getOwnPropertyDescriptor(_class2, "object"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function initializer() {
      return _init2;
    }
  }), _class2)), _class2)) || _class) || _class) || _class);
});

var __filename$b = '/patches/FacadePatch.js';

// This file is part of leanes-delayable-addon.
//
// leanes-delayable-addon is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// leanes-delayable-addon is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with leanes-delayable-addon.  If not, see <https://www.gnu.org/licenses/>.
var FacadePatchTF = (function (Module) {
  var _Module$NS = Module.NS,
      DELAYED_JOB_COMMAND = _Module$NS.DELAYED_JOB_COMMAND,
      RESQUE = _Module$NS.RESQUE,
      RESQUE_EXECUTOR = _Module$NS.RESQUE_EXECUTOR,
      Facade = _Module$NS.Facade,
      initializePatch = _Module$NS.initializePatch,
      meta = _Module$NS.meta,
      method = _Module$NS.method,
      _ = _Module$NS.Utils._;
  Module.definePatch(__filename$b, function (BaseClass) {
    var _class, _class2, _init, _class3, _temp;

    var Patch = initializePatch(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Patch, _BaseClass);

      var _super = _createSuper(Patch);

      function Patch() {
        _classCallCheck(this, Patch);

        return _super.apply(this, arguments);
      }

      _createClass(Patch, [{
        key: "initializeFacade",
        value: function initializeFacade() {
          _get(_getPrototypeOf(Patch.prototype), "initializeFacade", this).apply(this, arguments);

          this.addCommand(DELAYED_JOB_COMMAND, 'DelayedJobCommand');
          this.addProxy(RESQUE, 'MemoryResque');
          this.addMediator(RESQUE_EXECUTOR, 'MemoryResqueExecutor');
        }
      }]);

      return Patch;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _applyDecoratedDescriptor(_class2.prototype, "initializeFacade", [method], Object.getOwnPropertyDescriptor(_class2.prototype, "initializeFacade"), _class2.prototype)), _class2)) || _class;

    return Patch;
  });
});

var index = (function (Module) {
  var _Module$NS = Module.NS,
      BaseModule = _Module$NS.Module,
      initializeMixin = _Module$NS.initializeMixin,
      meta = _Module$NS.meta,
      constant = _Module$NS.constant,
      method = _Module$NS.method,
      patch = _Module$NS.patch;
  return ['DelayableAddon', function (BaseClass) {
    var _class, _class2, _init, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

    var Mixin = initializeMixin(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseClass) {
      _inherits(Mixin, _BaseClass);

      var _super = _createSuper(Mixin);

      function Mixin() {
        var _this;

        _classCallCheck(this, Mixin);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));

        _initializerDefineProperty(_this, "RESQUE", _descriptor, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "RESQUE_EXECUTOR", _descriptor2, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "START_RESQUE", _descriptor3, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "DELAYED_JOBS_QUEUE", _descriptor4, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "DELAYED_JOB_COMMAND", _descriptor5, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "DEFAULT_QUEUE", _descriptor6, _assertThisInitialized(_this));

        _initializerDefineProperty(_this, "DELAYED_JOB_RESULT", _descriptor7, _assertThisInitialized(_this));

        return _this;
      }

      _createClass(Mixin, null, [{
        key: "including",
        value: function including() {
          patch(this.NS.FacadePatch)(this.NS.Facade);
        }
      }]);

      return Mixin;
    }(BaseClass), _class3.object = {}, _temp), (_applyDecoratedDescriptor(_class2, "object", [meta], (_init = Object.getOwnPropertyDescriptor(_class2, "object"), _init = _init ? _init.value : undefined, {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: function initializer() {
        return _init;
      }
    }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "RESQUE", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'ResqueProxy';
      }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "RESQUE_EXECUTOR", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'ResqueExecutor';
      }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "START_RESQUE", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'START_RESQUE';
      }
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "DELAYED_JOBS_QUEUE", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'delayed_jobs';
      }
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "DELAYED_JOB_COMMAND", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'DelayedJobCommand';
      }
    }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "DEFAULT_QUEUE", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'default';
      }
    }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "DELAYED_JOB_RESULT", [constant], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function initializer() {
        return 'DELAYED_JOB_RESULT';
      }
    }), _applyDecoratedDescriptor(_class2, "including", [method], Object.getOwnPropertyDescriptor(_class2, "including"), _class2)), _class2)) || _class;

    QueueTF(Mixin);
    ResqueTF(Mixin);
    DelayedJobCommandTF(Mixin);
    ResqueExecutorTF(Mixin);
    DelayableMixinTF(Mixin);
    SaveDelayedJobsMixinTF(Mixin);
    MemoryResqueMixinTF(Mixin);
    MemoryExecutorMixinTF(Mixin);
    MemoryResqueTF(Mixin);
    MemoryResqueExecutorTF(Mixin);
    FacadePatchTF(Mixin);
    return Mixin;
  }];
});

module.exports = index;
//# sourceMappingURL=index.js.map
