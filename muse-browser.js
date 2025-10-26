(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/rxjs/internal/util/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/rxjs/internal/util/isFunction.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isFunction(x) {
        return typeof x === "function";
      }
      exports.isFunction = isFunction;
    }
  });

  // node_modules/rxjs/internal/config.js
  var require_config = __commonJS({
    "node_modules/rxjs/internal/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _enable_super_gross_mode_that_will_cause_bad_things = false;
      exports.config = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(value) {
          if (value) {
            var error = new Error();
            console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + error.stack);
          } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log("RxJS: Back to a better error behavior. Thank you. <3");
          }
          _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return _enable_super_gross_mode_that_will_cause_bad_things;
        }
      };
    }
  });

  // node_modules/rxjs/internal/util/hostReportError.js
  var require_hostReportError = __commonJS({
    "node_modules/rxjs/internal/util/hostReportError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function hostReportError(err) {
        setTimeout(function() {
          throw err;
        }, 0);
      }
      exports.hostReportError = hostReportError;
    }
  });

  // node_modules/rxjs/internal/Observer.js
  var require_Observer = __commonJS({
    "node_modules/rxjs/internal/Observer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var config_1 = require_config();
      var hostReportError_1 = require_hostReportError();
      exports.empty = {
        closed: true,
        next: function(value) {
        },
        error: function(err) {
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
          } else {
            hostReportError_1.hostReportError(err);
          }
        },
        complete: function() {
        }
      };
    }
  });

  // node_modules/rxjs/internal/util/isArray.js
  var require_isArray = __commonJS({
    "node_modules/rxjs/internal/util/isArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isArray = function() {
        return Array.isArray || function(x) {
          return x && typeof x.length === "number";
        };
      }();
    }
  });

  // node_modules/rxjs/internal/util/isObject.js
  var require_isObject = __commonJS({
    "node_modules/rxjs/internal/util/isObject.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isObject(x) {
        return x !== null && typeof x === "object";
      }
      exports.isObject = isObject;
    }
  });

  // node_modules/rxjs/internal/util/UnsubscriptionError.js
  var require_UnsubscriptionError = __commonJS({
    "node_modules/rxjs/internal/util/UnsubscriptionError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var UnsubscriptionErrorImpl = function() {
        function UnsubscriptionErrorImpl2(errors) {
          Error.call(this);
          this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
            return i + 1 + ") " + err.toString();
          }).join("\n  ") : "";
          this.name = "UnsubscriptionError";
          this.errors = errors;
          return this;
        }
        UnsubscriptionErrorImpl2.prototype = Object.create(Error.prototype);
        return UnsubscriptionErrorImpl2;
      }();
      exports.UnsubscriptionError = UnsubscriptionErrorImpl;
    }
  });

  // node_modules/rxjs/internal/Subscription.js
  var require_Subscription = __commonJS({
    "node_modules/rxjs/internal/Subscription.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isArray_1 = require_isArray();
      var isObject_1 = require_isObject();
      var isFunction_1 = require_isFunction();
      var UnsubscriptionError_1 = require_UnsubscriptionError();
      var Subscription = function() {
        function Subscription2(unsubscribe) {
          this.closed = false;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (unsubscribe) {
            this._ctorUnsubscribe = true;
            this._unsubscribe = unsubscribe;
          }
        }
        Subscription2.prototype.unsubscribe = function() {
          var errors;
          if (this.closed) {
            return;
          }
          var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (_parentOrParents instanceof Subscription2) {
            _parentOrParents.remove(this);
          } else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
              var parent_1 = _parentOrParents[index];
              parent_1.remove(this);
            }
          }
          if (isFunction_1.isFunction(_unsubscribe)) {
            if (_ctorUnsubscribe) {
              this._unsubscribe = void 0;
            }
            try {
              _unsubscribe.call(this);
            } catch (e) {
              errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
          }
          if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
              var sub = _subscriptions[index];
              if (isObject_1.isObject(sub)) {
                try {
                  sub.unsubscribe();
                } catch (e) {
                  errors = errors || [];
                  if (e instanceof UnsubscriptionError_1.UnsubscriptionError) {
                    errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                  } else {
                    errors.push(e);
                  }
                }
              }
            }
          }
          if (errors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
          }
        };
        Subscription2.prototype.add = function(teardown) {
          var subscription = teardown;
          if (!teardown) {
            return Subscription2.EMPTY;
          }
          switch (typeof teardown) {
            case "function":
              subscription = new Subscription2(teardown);
            case "object":
              if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== "function") {
                return subscription;
              } else if (this.closed) {
                subscription.unsubscribe();
                return subscription;
              } else if (!(subscription instanceof Subscription2)) {
                var tmp = subscription;
                subscription = new Subscription2();
                subscription._subscriptions = [tmp];
              }
              break;
            default: {
              throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
            }
          }
          var _parentOrParents = subscription._parentOrParents;
          if (_parentOrParents === null) {
            subscription._parentOrParents = this;
          } else if (_parentOrParents instanceof Subscription2) {
            if (_parentOrParents === this) {
              return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
          } else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
          } else {
            return subscription;
          }
          var subscriptions = this._subscriptions;
          if (subscriptions === null) {
            this._subscriptions = [subscription];
          } else {
            subscriptions.push(subscription);
          }
          return subscription;
        };
        Subscription2.prototype.remove = function(subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
              subscriptions.splice(subscriptionIndex, 1);
            }
          }
        };
        Subscription2.EMPTY = function(empty) {
          empty.closed = true;
          return empty;
        }(new Subscription2());
        return Subscription2;
      }();
      exports.Subscription = Subscription;
      function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function(errs, err) {
          return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
        }, []);
      }
    }
  });

  // node_modules/rxjs/internal/symbol/rxSubscriber.js
  var require_rxSubscriber = __commonJS({
    "node_modules/rxjs/internal/symbol/rxSubscriber.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rxSubscriber = function() {
        return typeof Symbol === "function" ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
      }();
      exports.$$rxSubscriber = exports.rxSubscriber;
    }
  });

  // node_modules/rxjs/internal/Subscriber.js
  var require_Subscriber = __commonJS({
    "node_modules/rxjs/internal/Subscriber.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var isFunction_1 = require_isFunction();
      var Observer_1 = require_Observer();
      var Subscription_1 = require_Subscription();
      var rxSubscriber_1 = require_rxSubscriber();
      var config_1 = require_config();
      var hostReportError_1 = require_hostReportError();
      var Subscriber = function(_super) {
        __extends(Subscriber2, _super);
        function Subscriber2(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this.syncErrorValue = null;
          _this.syncErrorThrown = false;
          _this.syncErrorThrowable = false;
          _this.isStopped = false;
          switch (arguments.length) {
            case 0:
              _this.destination = Observer_1.empty;
              break;
            case 1:
              if (!destinationOrNext) {
                _this.destination = Observer_1.empty;
                break;
              }
              if (typeof destinationOrNext === "object") {
                if (destinationOrNext instanceof Subscriber2) {
                  _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                  _this.destination = destinationOrNext;
                  destinationOrNext.add(_this);
                } else {
                  _this.syncErrorThrowable = true;
                  _this.destination = new SafeSubscriber(_this, destinationOrNext);
                }
                break;
              }
            default:
              _this.syncErrorThrowable = true;
              _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
              break;
          }
          return _this;
        }
        Subscriber2.prototype[rxSubscriber_1.rxSubscriber] = function() {
          return this;
        };
        Subscriber2.create = function(next, error, complete) {
          var subscriber = new Subscriber2(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
        };
        Subscriber2.prototype.next = function(value) {
          if (!this.isStopped) {
            this._next(value);
          }
        };
        Subscriber2.prototype.error = function(err) {
          if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
          }
        };
        Subscriber2.prototype.complete = function() {
          if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
          }
        };
        Subscriber2.prototype.unsubscribe = function() {
          if (this.closed) {
            return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
        };
        Subscriber2.prototype._next = function(value) {
          this.destination.next(value);
        };
        Subscriber2.prototype._error = function(err) {
          this.destination.error(err);
          this.unsubscribe();
        };
        Subscriber2.prototype._complete = function() {
          this.destination.complete();
          this.unsubscribe();
        };
        Subscriber2.prototype._unsubscribeAndRecycle = function() {
          var _parentOrParents = this._parentOrParents;
          this._parentOrParents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parentOrParents = _parentOrParents;
          return this;
        };
        return Subscriber2;
      }(Subscription_1.Subscription);
      exports.Subscriber = Subscriber;
      var SafeSubscriber = function(_super) {
        __extends(SafeSubscriber2, _super);
        function SafeSubscriber2(_parentSubscriber, observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this._parentSubscriber = _parentSubscriber;
          var next;
          var context = _this;
          if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
          } else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
              context = Object.create(observerOrNext);
              if (isFunction_1.isFunction(context.unsubscribe)) {
                _this.add(context.unsubscribe.bind(context));
              }
              context.unsubscribe = _this.unsubscribe.bind(_this);
            }
          }
          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
        }
        SafeSubscriber2.prototype.next = function(value) {
          if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
              this.__tryOrUnsub(this._next, value);
            } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber2.prototype.error = function(err) {
          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config_1.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
              if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._error, err);
                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, this._error, err);
                this.unsubscribe();
              }
            } else if (!_parentSubscriber.syncErrorThrowable) {
              this.unsubscribe();
              if (useDeprecatedSynchronousErrorHandling) {
                throw err;
              }
              hostReportError_1.hostReportError(err);
            } else {
              if (useDeprecatedSynchronousErrorHandling) {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
              } else {
                hostReportError_1.hostReportError(err);
              }
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber2.prototype.complete = function() {
          var _this = this;
          if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
              var wrappedComplete = function() {
                return _this._complete.call(_this._context);
              };
              if (!config_1.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(wrappedComplete);
                this.unsubscribe();
              } else {
                this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                this.unsubscribe();
              }
            } else {
              this.unsubscribe();
            }
          }
        };
        SafeSubscriber2.prototype.__tryOrUnsub = function(fn, value) {
          try {
            fn.call(this._context, value);
          } catch (err) {
            this.unsubscribe();
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
              throw err;
            } else {
              hostReportError_1.hostReportError(err);
            }
          }
        };
        SafeSubscriber2.prototype.__tryOrSetError = function(parent, fn, value) {
          if (!config_1.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error("bad call");
          }
          try {
            fn.call(this._context, value);
          } catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
              parent.syncErrorValue = err;
              parent.syncErrorThrown = true;
              return true;
            } else {
              hostReportError_1.hostReportError(err);
              return true;
            }
          }
          return false;
        };
        SafeSubscriber2.prototype._unsubscribe = function() {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;
          _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber2;
      }(Subscriber);
      exports.SafeSubscriber = SafeSubscriber;
    }
  });

  // node_modules/rxjs/internal/util/canReportError.js
  var require_canReportError = __commonJS({
    "node_modules/rxjs/internal/util/canReportError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function canReportError(observer) {
        while (observer) {
          var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
          if (closed_1 || isStopped) {
            return false;
          } else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
          } else {
            observer = null;
          }
        }
        return true;
      }
      exports.canReportError = canReportError;
    }
  });

  // node_modules/rxjs/internal/util/toSubscriber.js
  var require_toSubscriber = __commonJS({
    "node_modules/rxjs/internal/util/toSubscriber.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var rxSubscriber_1 = require_rxSubscriber();
      var Observer_1 = require_Observer();
      function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
          }
        }
        if (!nextOrObserver && !error && !complete) {
          return new Subscriber_1.Subscriber(Observer_1.empty);
        }
        return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
      }
      exports.toSubscriber = toSubscriber;
    }
  });

  // node_modules/rxjs/internal/symbol/observable.js
  var require_observable = __commonJS({
    "node_modules/rxjs/internal/symbol/observable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.observable = function() {
        return typeof Symbol === "function" && Symbol.observable || "@@observable";
      }();
    }
  });

  // node_modules/rxjs/internal/util/identity.js
  var require_identity = __commonJS({
    "node_modules/rxjs/internal/util/identity.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function identity(x) {
        return x;
      }
      exports.identity = identity;
    }
  });

  // node_modules/rxjs/internal/util/pipe.js
  var require_pipe = __commonJS({
    "node_modules/rxjs/internal/util/pipe.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var identity_1 = require_identity();
      function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          fns[_i] = arguments[_i];
        }
        return pipeFromArray(fns);
      }
      exports.pipe = pipe;
      function pipeFromArray(fns) {
        if (fns.length === 0) {
          return identity_1.identity;
        }
        if (fns.length === 1) {
          return fns[0];
        }
        return function piped(input) {
          return fns.reduce(function(prev, fn) {
            return fn(prev);
          }, input);
        };
      }
      exports.pipeFromArray = pipeFromArray;
    }
  });

  // node_modules/rxjs/internal/Observable.js
  var require_Observable = __commonJS({
    "node_modules/rxjs/internal/Observable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var canReportError_1 = require_canReportError();
      var toSubscriber_1 = require_toSubscriber();
      var observable_1 = require_observable();
      var pipe_1 = require_pipe();
      var config_1 = require_config();
      var Observable = function() {
        function Observable2(subscribe) {
          this._isScalar = false;
          if (subscribe) {
            this._subscribe = subscribe;
          }
        }
        Observable2.prototype.lift = function(operator) {
          var observable = new Observable2();
          observable.source = this;
          observable.operator = operator;
          return observable;
        };
        Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
          var operator = this.operator;
          var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
          if (operator) {
            sink.add(operator.call(sink, this.source));
          } else {
            sink.add(this.source || config_1.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
          }
          if (config_1.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
              sink.syncErrorThrowable = false;
              if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
              }
            }
          }
          return sink;
        };
        Observable2.prototype._trySubscribe = function(sink) {
          try {
            return this._subscribe(sink);
          } catch (err) {
            if (config_1.config.useDeprecatedSynchronousErrorHandling) {
              sink.syncErrorThrown = true;
              sink.syncErrorValue = err;
            }
            if (canReportError_1.canReportError(sink)) {
              sink.error(err);
            } else {
              console.warn(err);
            }
          }
        };
        Observable2.prototype.forEach = function(next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function(resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function(value) {
              try {
                next(value);
              } catch (err) {
                reject(err);
                if (subscription) {
                  subscription.unsubscribe();
                }
              }
            }, reject, resolve);
          });
        };
        Observable2.prototype._subscribe = function(subscriber) {
          var source = this.source;
          return source && source.subscribe(subscriber);
        };
        Observable2.prototype[observable_1.observable] = function() {
          return this;
        };
        Observable2.prototype.pipe = function() {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
          }
          if (operations.length === 0) {
            return this;
          }
          return pipe_1.pipeFromArray(operations)(this);
        };
        Observable2.prototype.toPromise = function(promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function(resolve, reject) {
            var value;
            _this.subscribe(function(x) {
              return value = x;
            }, function(err) {
              return reject(err);
            }, function() {
              return resolve(value);
            });
          });
        };
        Observable2.create = function(subscribe) {
          return new Observable2(subscribe);
        };
        return Observable2;
      }();
      exports.Observable = Observable;
      function getPromiseCtor(promiseCtor) {
        if (!promiseCtor) {
          promiseCtor = config_1.config.Promise || Promise;
        }
        if (!promiseCtor) {
          throw new Error("no Promise impl found");
        }
        return promiseCtor;
      }
    }
  });

  // node_modules/rxjs/internal/util/ObjectUnsubscribedError.js
  var require_ObjectUnsubscribedError = __commonJS({
    "node_modules/rxjs/internal/util/ObjectUnsubscribedError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ObjectUnsubscribedErrorImpl = function() {
        function ObjectUnsubscribedErrorImpl2() {
          Error.call(this);
          this.message = "object unsubscribed";
          this.name = "ObjectUnsubscribedError";
          return this;
        }
        ObjectUnsubscribedErrorImpl2.prototype = Object.create(Error.prototype);
        return ObjectUnsubscribedErrorImpl2;
      }();
      exports.ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;
    }
  });

  // node_modules/rxjs/internal/SubjectSubscription.js
  var require_SubjectSubscription = __commonJS({
    "node_modules/rxjs/internal/SubjectSubscription.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscription_1 = require_Subscription();
      var SubjectSubscription = function(_super) {
        __extends(SubjectSubscription2, _super);
        function SubjectSubscription2(subject, subscriber) {
          var _this = _super.call(this) || this;
          _this.subject = subject;
          _this.subscriber = subscriber;
          _this.closed = false;
          return _this;
        }
        SubjectSubscription2.prototype.unsubscribe = function() {
          if (this.closed) {
            return;
          }
          this.closed = true;
          var subject = this.subject;
          var observers = subject.observers;
          this.subject = null;
          if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
          }
          var subscriberIndex = observers.indexOf(this.subscriber);
          if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
          }
        };
        return SubjectSubscription2;
      }(Subscription_1.Subscription);
      exports.SubjectSubscription = SubjectSubscription;
    }
  });

  // node_modules/rxjs/internal/Subject.js
  var require_Subject = __commonJS({
    "node_modules/rxjs/internal/Subject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscriber_1 = require_Subscriber();
      var Subscription_1 = require_Subscription();
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      var SubjectSubscription_1 = require_SubjectSubscription();
      var rxSubscriber_1 = require_rxSubscriber();
      var SubjectSubscriber = function(_super) {
        __extends(SubjectSubscriber2, _super);
        function SubjectSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          return _this;
        }
        return SubjectSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.SubjectSubscriber = SubjectSubscriber;
      var Subject = function(_super) {
        __extends(Subject2, _super);
        function Subject2() {
          var _this = _super.call(this) || this;
          _this.observers = [];
          _this.closed = false;
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
        }
        Subject2.prototype[rxSubscriber_1.rxSubscriber] = function() {
          return new SubjectSubscriber(this);
        };
        Subject2.prototype.lift = function(operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
        };
        Subject2.prototype.next = function(value) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
              copy[i].next(value);
            }
          }
        };
        Subject2.prototype.error = function(err) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.hasError = true;
          this.thrownError = err;
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].error(err);
          }
          this.observers.length = 0;
        };
        Subject2.prototype.complete = function() {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          }
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
            copy[i].complete();
          }
          this.observers.length = 0;
        };
        Subject2.prototype.unsubscribe = function() {
          this.isStopped = true;
          this.closed = true;
          this.observers = null;
        };
        Subject2.prototype._trySubscribe = function(subscriber) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else {
            return _super.prototype._trySubscribe.call(this, subscriber);
          }
        };
        Subject2.prototype._subscribe = function(subscriber) {
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
          } else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
          } else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
          }
        };
        Subject2.prototype.asObservable = function() {
          var observable = new Observable_1.Observable();
          observable.source = this;
          return observable;
        };
        Subject2.create = function(destination, source) {
          return new AnonymousSubject(destination, source);
        };
        return Subject2;
      }(Observable_1.Observable);
      exports.Subject = Subject;
      var AnonymousSubject = function(_super) {
        __extends(AnonymousSubject2, _super);
        function AnonymousSubject2(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
        }
        AnonymousSubject2.prototype.next = function(value) {
          var destination = this.destination;
          if (destination && destination.next) {
            destination.next(value);
          }
        };
        AnonymousSubject2.prototype.error = function(err) {
          var destination = this.destination;
          if (destination && destination.error) {
            this.destination.error(err);
          }
        };
        AnonymousSubject2.prototype.complete = function() {
          var destination = this.destination;
          if (destination && destination.complete) {
            this.destination.complete();
          }
        };
        AnonymousSubject2.prototype._subscribe = function(subscriber) {
          var source = this.source;
          if (source) {
            return this.source.subscribe(subscriber);
          } else {
            return Subscription_1.Subscription.EMPTY;
          }
        };
        return AnonymousSubject2;
      }(Subject);
      exports.AnonymousSubject = AnonymousSubject;
    }
  });

  // node_modules/rxjs/internal/operators/refCount.js
  var require_refCount = __commonJS({
    "node_modules/rxjs/internal/operators/refCount.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function refCount() {
        return function refCountOperatorFunction(source) {
          return source.lift(new RefCountOperator(source));
        };
      }
      exports.refCount = refCount;
      var RefCountOperator = function() {
        function RefCountOperator2(connectable) {
          this.connectable = connectable;
        }
        RefCountOperator2.prototype.call = function(subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
          }
          return subscription;
        };
        return RefCountOperator2;
      }();
      var RefCountSubscriber = function(_super) {
        __extends(RefCountSubscriber2, _super);
        function RefCountSubscriber2(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
        }
        RefCountSubscriber2.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (!connectable) {
            this.connection = null;
            return;
          }
          this.connectable = null;
          var refCount2 = connectable._refCount;
          if (refCount2 <= 0) {
            this.connection = null;
            return;
          }
          connectable._refCount = refCount2 - 1;
          if (refCount2 > 1) {
            this.connection = null;
            return;
          }
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
          }
        };
        return RefCountSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/observable/ConnectableObservable.js
  var require_ConnectableObservable = __commonJS({
    "node_modules/rxjs/internal/observable/ConnectableObservable.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var Observable_1 = require_Observable();
      var Subscriber_1 = require_Subscriber();
      var Subscription_1 = require_Subscription();
      var refCount_1 = require_refCount();
      var ConnectableObservable = function(_super) {
        __extends(ConnectableObservable2, _super);
        function ConnectableObservable2(source, subjectFactory) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subjectFactory = subjectFactory;
          _this._refCount = 0;
          _this._isComplete = false;
          return _this;
        }
        ConnectableObservable2.prototype._subscribe = function(subscriber) {
          return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable2.prototype.getSubject = function() {
          var subject = this._subject;
          if (!subject || subject.isStopped) {
            this._subject = this.subjectFactory();
          }
          return this._subject;
        };
        ConnectableObservable2.prototype.connect = function() {
          var connection = this._connection;
          if (!connection) {
            this._isComplete = false;
            connection = this._connection = new Subscription_1.Subscription();
            connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
            if (connection.closed) {
              this._connection = null;
              connection = Subscription_1.Subscription.EMPTY;
            }
          }
          return connection;
        };
        ConnectableObservable2.prototype.refCount = function() {
          return refCount_1.refCount()(this);
        };
        return ConnectableObservable2;
      }(Observable_1.Observable);
      exports.ConnectableObservable = ConnectableObservable;
      exports.connectableObservableDescriptor = function() {
        var connectableProto = ConnectableObservable.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: true },
          _subject: { value: null, writable: true },
          _connection: { value: null, writable: true },
          _subscribe: { value: connectableProto._subscribe },
          _isComplete: { value: connectableProto._isComplete, writable: true },
          getSubject: { value: connectableProto.getSubject },
          connect: { value: connectableProto.connect },
          refCount: { value: connectableProto.refCount }
        };
      }();
      var ConnectableSubscriber = function(_super) {
        __extends(ConnectableSubscriber2, _super);
        function ConnectableSubscriber2(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
        }
        ConnectableSubscriber2.prototype._error = function(err) {
          this._unsubscribe();
          _super.prototype._error.call(this, err);
        };
        ConnectableSubscriber2.prototype._complete = function() {
          this.connectable._isComplete = true;
          this._unsubscribe();
          _super.prototype._complete.call(this);
        };
        ConnectableSubscriber2.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (connectable) {
            this.connectable = null;
            var connection = connectable._connection;
            connectable._refCount = 0;
            connectable._subject = null;
            connectable._connection = null;
            if (connection) {
              connection.unsubscribe();
            }
          }
        };
        return ConnectableSubscriber2;
      }(Subject_1.SubjectSubscriber);
      var RefCountOperator = function() {
        function RefCountOperator2(connectable) {
          this.connectable = connectable;
        }
        RefCountOperator2.prototype.call = function(subscriber, source) {
          var connectable = this.connectable;
          connectable._refCount++;
          var refCounter = new RefCountSubscriber(subscriber, connectable);
          var subscription = source.subscribe(refCounter);
          if (!refCounter.closed) {
            refCounter.connection = connectable.connect();
          }
          return subscription;
        };
        return RefCountOperator2;
      }();
      var RefCountSubscriber = function(_super) {
        __extends(RefCountSubscriber2, _super);
        function RefCountSubscriber2(destination, connectable) {
          var _this = _super.call(this, destination) || this;
          _this.connectable = connectable;
          return _this;
        }
        RefCountSubscriber2.prototype._unsubscribe = function() {
          var connectable = this.connectable;
          if (!connectable) {
            this.connection = null;
            return;
          }
          this.connectable = null;
          var refCount = connectable._refCount;
          if (refCount <= 0) {
            this.connection = null;
            return;
          }
          connectable._refCount = refCount - 1;
          if (refCount > 1) {
            this.connection = null;
            return;
          }
          var connection = this.connection;
          var sharedConnection = connectable._connection;
          this.connection = null;
          if (sharedConnection && (!connection || sharedConnection === connection)) {
            sharedConnection.unsubscribe();
          }
        };
        return RefCountSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/groupBy.js
  var require_groupBy = __commonJS({
    "node_modules/rxjs/internal/operators/groupBy.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Subscription_1 = require_Subscription();
      var Observable_1 = require_Observable();
      var Subject_1 = require_Subject();
      function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
        return function(source) {
          return source.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
        };
      }
      exports.groupBy = groupBy;
      var GroupByOperator = function() {
        function GroupByOperator2(keySelector, elementSelector, durationSelector, subjectSelector) {
          this.keySelector = keySelector;
          this.elementSelector = elementSelector;
          this.durationSelector = durationSelector;
          this.subjectSelector = subjectSelector;
        }
        GroupByOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
        };
        return GroupByOperator2;
      }();
      var GroupBySubscriber = function(_super) {
        __extends(GroupBySubscriber2, _super);
        function GroupBySubscriber2(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.elementSelector = elementSelector;
          _this.durationSelector = durationSelector;
          _this.subjectSelector = subjectSelector;
          _this.groups = null;
          _this.attemptedToUnsubscribe = false;
          _this.count = 0;
          return _this;
        }
        GroupBySubscriber2.prototype._next = function(value) {
          var key;
          try {
            key = this.keySelector(value);
          } catch (err) {
            this.error(err);
            return;
          }
          this._group(value, key);
        };
        GroupBySubscriber2.prototype._group = function(value, key) {
          var groups = this.groups;
          if (!groups) {
            groups = this.groups = /* @__PURE__ */ new Map();
          }
          var group = groups.get(key);
          var element;
          if (this.elementSelector) {
            try {
              element = this.elementSelector(value);
            } catch (err) {
              this.error(err);
            }
          } else {
            element = value;
          }
          if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject_1.Subject();
            groups.set(key, group);
            var groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
              var duration = void 0;
              try {
                duration = this.durationSelector(new GroupedObservable(key, group));
              } catch (err) {
                this.error(err);
                return;
              }
              this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
          }
          if (!group.closed) {
            group.next(element);
          }
        };
        GroupBySubscriber2.prototype._error = function(err) {
          var groups = this.groups;
          if (groups) {
            groups.forEach(function(group, key) {
              group.error(err);
            });
            groups.clear();
          }
          this.destination.error(err);
        };
        GroupBySubscriber2.prototype._complete = function() {
          var groups = this.groups;
          if (groups) {
            groups.forEach(function(group, key) {
              group.complete();
            });
            groups.clear();
          }
          this.destination.complete();
        };
        GroupBySubscriber2.prototype.removeGroup = function(key) {
          this.groups.delete(key);
        };
        GroupBySubscriber2.prototype.unsubscribe = function() {
          if (!this.closed) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
              _super.prototype.unsubscribe.call(this);
            }
          }
        };
        return GroupBySubscriber2;
      }(Subscriber_1.Subscriber);
      var GroupDurationSubscriber = function(_super) {
        __extends(GroupDurationSubscriber2, _super);
        function GroupDurationSubscriber2(key, group, parent) {
          var _this = _super.call(this, group) || this;
          _this.key = key;
          _this.group = group;
          _this.parent = parent;
          return _this;
        }
        GroupDurationSubscriber2.prototype._next = function(value) {
          this.complete();
        };
        GroupDurationSubscriber2.prototype._unsubscribe = function() {
          var _a = this, parent = _a.parent, key = _a.key;
          this.key = this.parent = null;
          if (parent) {
            parent.removeGroup(key);
          }
        };
        return GroupDurationSubscriber2;
      }(Subscriber_1.Subscriber);
      var GroupedObservable = function(_super) {
        __extends(GroupedObservable2, _super);
        function GroupedObservable2(key, groupSubject, refCountSubscription) {
          var _this = _super.call(this) || this;
          _this.key = key;
          _this.groupSubject = groupSubject;
          _this.refCountSubscription = refCountSubscription;
          return _this;
        }
        GroupedObservable2.prototype._subscribe = function(subscriber) {
          var subscription = new Subscription_1.Subscription();
          var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
          if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
          }
          subscription.add(groupSubject.subscribe(subscriber));
          return subscription;
        };
        return GroupedObservable2;
      }(Observable_1.Observable);
      exports.GroupedObservable = GroupedObservable;
      var InnerRefCountSubscription = function(_super) {
        __extends(InnerRefCountSubscription2, _super);
        function InnerRefCountSubscription2(parent) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          parent.count++;
          return _this;
        }
        InnerRefCountSubscription2.prototype.unsubscribe = function() {
          var parent = this.parent;
          if (!parent.closed && !this.closed) {
            _super.prototype.unsubscribe.call(this);
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
              parent.unsubscribe();
            }
          }
        };
        return InnerRefCountSubscription2;
      }(Subscription_1.Subscription);
    }
  });

  // node_modules/rxjs/internal/BehaviorSubject.js
  var require_BehaviorSubject = __commonJS({
    "node_modules/rxjs/internal/BehaviorSubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      var BehaviorSubject = function(_super) {
        __extends(BehaviorSubject2, _super);
        function BehaviorSubject2(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
        }
        Object.defineProperty(BehaviorSubject2.prototype, "value", {
          get: function() {
            return this.getValue();
          },
          enumerable: true,
          configurable: true
        });
        BehaviorSubject2.prototype._subscribe = function(subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          if (subscription && !subscription.closed) {
            subscriber.next(this._value);
          }
          return subscription;
        };
        BehaviorSubject2.prototype.getValue = function() {
          if (this.hasError) {
            throw this.thrownError;
          } else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else {
            return this._value;
          }
        };
        BehaviorSubject2.prototype.next = function(value) {
          _super.prototype.next.call(this, this._value = value);
        };
        return BehaviorSubject2;
      }(Subject_1.Subject);
      exports.BehaviorSubject = BehaviorSubject;
    }
  });

  // node_modules/rxjs/internal/scheduler/Action.js
  var require_Action = __commonJS({
    "node_modules/rxjs/internal/scheduler/Action.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscription_1 = require_Subscription();
      var Action = function(_super) {
        __extends(Action2, _super);
        function Action2(scheduler, work) {
          return _super.call(this) || this;
        }
        Action2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return this;
        };
        return Action2;
      }(Subscription_1.Subscription);
      exports.Action = Action;
    }
  });

  // node_modules/rxjs/internal/scheduler/AsyncAction.js
  var require_AsyncAction = __commonJS({
    "node_modules/rxjs/internal/scheduler/AsyncAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Action_1 = require_Action();
      var AsyncAction = function(_super) {
        __extends(AsyncAction2, _super);
        function AsyncAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
        }
        AsyncAction2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (this.closed) {
            return this;
          }
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          this.pending = true;
          this.delay = delay;
          this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
          return this;
        };
        AsyncAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
          }
          clearInterval(id);
          return void 0;
        };
        AsyncAction2.prototype.execute = function(state, delay) {
          if (this.closed) {
            return new Error("executing a cancelled action");
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
            return error;
          } else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
        };
        AsyncAction2.prototype._execute = function(state, delay) {
          var errored = false;
          var errorValue = void 0;
          try {
            this.work(state);
          } catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
          }
          if (errored) {
            this.unsubscribe();
            return errorValue;
          }
        };
        AsyncAction2.prototype._unsubscribe = function() {
          var id = this.id;
          var scheduler = this.scheduler;
          var actions = scheduler.actions;
          var index = actions.indexOf(this);
          this.work = null;
          this.state = null;
          this.pending = false;
          this.scheduler = null;
          if (index !== -1) {
            actions.splice(index, 1);
          }
          if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
        };
        return AsyncAction2;
      }(Action_1.Action);
      exports.AsyncAction = AsyncAction;
    }
  });

  // node_modules/rxjs/internal/scheduler/QueueAction.js
  var require_QueueAction = __commonJS({
    "node_modules/rxjs/internal/scheduler/QueueAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncAction_1 = require_AsyncAction();
      var QueueAction = function(_super) {
        __extends(QueueAction2, _super);
        function QueueAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        QueueAction2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay > 0) {
            return _super.prototype.schedule.call(this, state, delay);
          }
          this.delay = delay;
          this.state = state;
          this.scheduler.flush(this);
          return this;
        };
        QueueAction2.prototype.execute = function(state, delay) {
          return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
        };
        QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          return scheduler.flush(this);
        };
        return QueueAction2;
      }(AsyncAction_1.AsyncAction);
      exports.QueueAction = QueueAction;
    }
  });

  // node_modules/rxjs/internal/Scheduler.js
  var require_Scheduler = __commonJS({
    "node_modules/rxjs/internal/Scheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Scheduler = function() {
        function Scheduler2(SchedulerAction, now) {
          if (now === void 0) {
            now = Scheduler2.now;
          }
          this.SchedulerAction = SchedulerAction;
          this.now = now;
        }
        Scheduler2.prototype.schedule = function(work, delay, state) {
          if (delay === void 0) {
            delay = 0;
          }
          return new this.SchedulerAction(this, work).schedule(state, delay);
        };
        Scheduler2.now = function() {
          return Date.now();
        };
        return Scheduler2;
      }();
      exports.Scheduler = Scheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/AsyncScheduler.js
  var require_AsyncScheduler = __commonJS({
    "node_modules/rxjs/internal/scheduler/AsyncScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Scheduler_1 = require_Scheduler();
      var AsyncScheduler = function(_super) {
        __extends(AsyncScheduler2, _super);
        function AsyncScheduler2(SchedulerAction, now) {
          if (now === void 0) {
            now = Scheduler_1.Scheduler.now;
          }
          var _this = _super.call(this, SchedulerAction, function() {
            if (AsyncScheduler2.delegate && AsyncScheduler2.delegate !== _this) {
              return AsyncScheduler2.delegate.now();
            } else {
              return now();
            }
          }) || this;
          _this.actions = [];
          _this.active = false;
          _this.scheduled = void 0;
          return _this;
        }
        AsyncScheduler2.prototype.schedule = function(work, delay, state) {
          if (delay === void 0) {
            delay = 0;
          }
          if (AsyncScheduler2.delegate && AsyncScheduler2.delegate !== this) {
            return AsyncScheduler2.delegate.schedule(work, delay, state);
          } else {
            return _super.prototype.schedule.call(this, work, delay, state);
          }
        };
        AsyncScheduler2.prototype.flush = function(action) {
          var actions = this.actions;
          if (this.active) {
            actions.push(action);
            return;
          }
          var error;
          this.active = true;
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while (action = actions.shift());
          this.active = false;
          if (error) {
            while (action = actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AsyncScheduler2;
      }(Scheduler_1.Scheduler);
      exports.AsyncScheduler = AsyncScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/QueueScheduler.js
  var require_QueueScheduler = __commonJS({
    "node_modules/rxjs/internal/scheduler/QueueScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncScheduler_1 = require_AsyncScheduler();
      var QueueScheduler = function(_super) {
        __extends(QueueScheduler2, _super);
        function QueueScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        return QueueScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.QueueScheduler = QueueScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/queue.js
  var require_queue = __commonJS({
    "node_modules/rxjs/internal/scheduler/queue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var QueueAction_1 = require_QueueAction();
      var QueueScheduler_1 = require_QueueScheduler();
      exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
      exports.queue = exports.queueScheduler;
    }
  });

  // node_modules/rxjs/internal/observable/empty.js
  var require_empty = __commonJS({
    "node_modules/rxjs/internal/observable/empty.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      exports.EMPTY = new Observable_1.Observable(function(subscriber) {
        return subscriber.complete();
      });
      function empty(scheduler) {
        return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
      }
      exports.empty = empty;
      function emptyScheduled(scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          return scheduler.schedule(function() {
            return subscriber.complete();
          });
        });
      }
    }
  });

  // node_modules/rxjs/internal/util/isScheduler.js
  var require_isScheduler = __commonJS({
    "node_modules/rxjs/internal/util/isScheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isScheduler(value) {
        return value && typeof value.schedule === "function";
      }
      exports.isScheduler = isScheduler;
    }
  });

  // node_modules/rxjs/internal/util/subscribeToArray.js
  var require_subscribeToArray = __commonJS({
    "node_modules/rxjs/internal/util/subscribeToArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.subscribeToArray = function(array) {
        return function(subscriber) {
          for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
          }
          subscriber.complete();
        };
      };
    }
  });

  // node_modules/rxjs/internal/scheduled/scheduleArray.js
  var require_scheduleArray = __commonJS({
    "node_modules/rxjs/internal/scheduled/scheduleArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      function scheduleArray(input, scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var sub = new Subscription_1.Subscription();
          var i = 0;
          sub.add(scheduler.schedule(function() {
            if (i === input.length) {
              subscriber.complete();
              return;
            }
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
              sub.add(this.schedule());
            }
          }));
          return sub;
        });
      }
      exports.scheduleArray = scheduleArray;
    }
  });

  // node_modules/rxjs/internal/observable/fromArray.js
  var require_fromArray = __commonJS({
    "node_modules/rxjs/internal/observable/fromArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var subscribeToArray_1 = require_subscribeToArray();
      var scheduleArray_1 = require_scheduleArray();
      function fromArray(input, scheduler) {
        if (!scheduler) {
          return new Observable_1.Observable(subscribeToArray_1.subscribeToArray(input));
        } else {
          return scheduleArray_1.scheduleArray(input, scheduler);
        }
      }
      exports.fromArray = fromArray;
    }
  });

  // node_modules/rxjs/internal/observable/of.js
  var require_of = __commonJS({
    "node_modules/rxjs/internal/observable/of.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isScheduler_1 = require_isScheduler();
      var fromArray_1 = require_fromArray();
      var scheduleArray_1 = require_scheduleArray();
      function of() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var scheduler = args[args.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
          args.pop();
          return scheduleArray_1.scheduleArray(args, scheduler);
        } else {
          return fromArray_1.fromArray(args);
        }
      }
      exports.of = of;
    }
  });

  // node_modules/rxjs/internal/observable/throwError.js
  var require_throwError = __commonJS({
    "node_modules/rxjs/internal/observable/throwError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      function throwError(error, scheduler) {
        if (!scheduler) {
          return new Observable_1.Observable(function(subscriber) {
            return subscriber.error(error);
          });
        } else {
          return new Observable_1.Observable(function(subscriber) {
            return scheduler.schedule(dispatch, 0, { error, subscriber });
          });
        }
      }
      exports.throwError = throwError;
      function dispatch(_a) {
        var error = _a.error, subscriber = _a.subscriber;
        subscriber.error(error);
      }
    }
  });

  // node_modules/rxjs/internal/Notification.js
  var require_Notification = __commonJS({
    "node_modules/rxjs/internal/Notification.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var empty_1 = require_empty();
      var of_1 = require_of();
      var throwError_1 = require_throwError();
      var NotificationKind;
      (function(NotificationKind2) {
        NotificationKind2["NEXT"] = "N";
        NotificationKind2["ERROR"] = "E";
        NotificationKind2["COMPLETE"] = "C";
      })(NotificationKind = exports.NotificationKind || (exports.NotificationKind = {}));
      var Notification = function() {
        function Notification2(kind, value, error) {
          this.kind = kind;
          this.value = value;
          this.error = error;
          this.hasValue = kind === "N";
        }
        Notification2.prototype.observe = function(observer) {
          switch (this.kind) {
            case "N":
              return observer.next && observer.next(this.value);
            case "E":
              return observer.error && observer.error(this.error);
            case "C":
              return observer.complete && observer.complete();
          }
        };
        Notification2.prototype.do = function(next, error, complete) {
          var kind = this.kind;
          switch (kind) {
            case "N":
              return next && next(this.value);
            case "E":
              return error && error(this.error);
            case "C":
              return complete && complete();
          }
        };
        Notification2.prototype.accept = function(nextOrObserver, error, complete) {
          if (nextOrObserver && typeof nextOrObserver.next === "function") {
            return this.observe(nextOrObserver);
          } else {
            return this.do(nextOrObserver, error, complete);
          }
        };
        Notification2.prototype.toObservable = function() {
          var kind = this.kind;
          switch (kind) {
            case "N":
              return of_1.of(this.value);
            case "E":
              return throwError_1.throwError(this.error);
            case "C":
              return empty_1.empty();
          }
          throw new Error("unexpected notification kind value");
        };
        Notification2.createNext = function(value) {
          if (typeof value !== "undefined") {
            return new Notification2("N", value);
          }
          return Notification2.undefinedValueNotification;
        };
        Notification2.createError = function(err) {
          return new Notification2("E", void 0, err);
        };
        Notification2.createComplete = function() {
          return Notification2.completeNotification;
        };
        Notification2.completeNotification = new Notification2("C");
        Notification2.undefinedValueNotification = new Notification2("N", void 0);
        return Notification2;
      }();
      exports.Notification = Notification;
    }
  });

  // node_modules/rxjs/internal/operators/observeOn.js
  var require_observeOn = __commonJS({
    "node_modules/rxjs/internal/operators/observeOn.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Notification_1 = require_Notification();
      function observeOn(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return function observeOnOperatorFunction(source) {
          return source.lift(new ObserveOnOperator(scheduler, delay));
        };
      }
      exports.observeOn = observeOn;
      var ObserveOnOperator = function() {
        function ObserveOnOperator2(scheduler, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          this.scheduler = scheduler;
          this.delay = delay;
        }
        ObserveOnOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
        };
        return ObserveOnOperator2;
      }();
      exports.ObserveOnOperator = ObserveOnOperator;
      var ObserveOnSubscriber = function(_super) {
        __extends(ObserveOnSubscriber2, _super);
        function ObserveOnSubscriber2(destination, scheduler, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          var _this = _super.call(this, destination) || this;
          _this.scheduler = scheduler;
          _this.delay = delay;
          return _this;
        }
        ObserveOnSubscriber2.dispatch = function(arg) {
          var notification = arg.notification, destination = arg.destination;
          notification.observe(destination);
          this.unsubscribe();
        };
        ObserveOnSubscriber2.prototype.scheduleMessage = function(notification) {
          var destination = this.destination;
          destination.add(this.scheduler.schedule(ObserveOnSubscriber2.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
        };
        ObserveOnSubscriber2.prototype._next = function(value) {
          this.scheduleMessage(Notification_1.Notification.createNext(value));
        };
        ObserveOnSubscriber2.prototype._error = function(err) {
          this.scheduleMessage(Notification_1.Notification.createError(err));
          this.unsubscribe();
        };
        ObserveOnSubscriber2.prototype._complete = function() {
          this.scheduleMessage(Notification_1.Notification.createComplete());
          this.unsubscribe();
        };
        return ObserveOnSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.ObserveOnSubscriber = ObserveOnSubscriber;
      var ObserveOnMessage = /* @__PURE__ */ function() {
        function ObserveOnMessage2(notification, destination) {
          this.notification = notification;
          this.destination = destination;
        }
        return ObserveOnMessage2;
      }();
      exports.ObserveOnMessage = ObserveOnMessage;
    }
  });

  // node_modules/rxjs/internal/ReplaySubject.js
  var require_ReplaySubject = __commonJS({
    "node_modules/rxjs/internal/ReplaySubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var queue_1 = require_queue();
      var Subscription_1 = require_Subscription();
      var observeOn_1 = require_observeOn();
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      var SubjectSubscription_1 = require_SubjectSubscription();
      var ReplaySubject = function(_super) {
        __extends(ReplaySubject2, _super);
        function ReplaySubject2(bufferSize, windowTime, scheduler) {
          if (bufferSize === void 0) {
            bufferSize = Number.POSITIVE_INFINITY;
          }
          if (windowTime === void 0) {
            windowTime = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this) || this;
          _this.scheduler = scheduler;
          _this._events = [];
          _this._infiniteTimeWindow = false;
          _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
          _this._windowTime = windowTime < 1 ? 1 : windowTime;
          if (windowTime === Number.POSITIVE_INFINITY) {
            _this._infiniteTimeWindow = true;
            _this.next = _this.nextInfiniteTimeWindow;
          } else {
            _this.next = _this.nextTimeWindow;
          }
          return _this;
        }
        ReplaySubject2.prototype.nextInfiniteTimeWindow = function(value) {
          if (!this.isStopped) {
            var _events = this._events;
            _events.push(value);
            if (_events.length > this._bufferSize) {
              _events.shift();
            }
          }
          _super.prototype.next.call(this, value);
        };
        ReplaySubject2.prototype.nextTimeWindow = function(value) {
          if (!this.isStopped) {
            this._events.push(new ReplayEvent(this._getNow(), value));
            this._trimBufferThenGetEvents();
          }
          _super.prototype.next.call(this, value);
        };
        ReplaySubject2.prototype._subscribe = function(subscriber) {
          var _infiniteTimeWindow = this._infiniteTimeWindow;
          var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
          var scheduler = this.scheduler;
          var len = _events.length;
          var subscription;
          if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
          } else if (this.isStopped || this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
          } else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
          }
          if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
          }
          if (_infiniteTimeWindow) {
            for (var i = 0; i < len && !subscriber.closed; i++) {
              subscriber.next(_events[i]);
            }
          } else {
            for (var i = 0; i < len && !subscriber.closed; i++) {
              subscriber.next(_events[i].value);
            }
          }
          if (this.hasError) {
            subscriber.error(this.thrownError);
          } else if (this.isStopped) {
            subscriber.complete();
          }
          return subscription;
        };
        ReplaySubject2.prototype._getNow = function() {
          return (this.scheduler || queue_1.queue).now();
        };
        ReplaySubject2.prototype._trimBufferThenGetEvents = function() {
          var now = this._getNow();
          var _bufferSize = this._bufferSize;
          var _windowTime = this._windowTime;
          var _events = this._events;
          var eventsCount = _events.length;
          var spliceCount = 0;
          while (spliceCount < eventsCount) {
            if (now - _events[spliceCount].time < _windowTime) {
              break;
            }
            spliceCount++;
          }
          if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
          }
          if (spliceCount > 0) {
            _events.splice(0, spliceCount);
          }
          return _events;
        };
        return ReplaySubject2;
      }(Subject_1.Subject);
      exports.ReplaySubject = ReplaySubject;
      var ReplayEvent = /* @__PURE__ */ function() {
        function ReplayEvent2(time, value) {
          this.time = time;
          this.value = value;
        }
        return ReplayEvent2;
      }();
    }
  });

  // node_modules/rxjs/internal/AsyncSubject.js
  var require_AsyncSubject = __commonJS({
    "node_modules/rxjs/internal/AsyncSubject.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var Subscription_1 = require_Subscription();
      var AsyncSubject = function(_super) {
        __extends(AsyncSubject2, _super);
        function AsyncSubject2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.value = null;
          _this.hasNext = false;
          _this.hasCompleted = false;
          return _this;
        }
        AsyncSubject2.prototype._subscribe = function(subscriber) {
          if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
          } else if (this.hasCompleted && this.hasNext) {
            subscriber.next(this.value);
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
          }
          return _super.prototype._subscribe.call(this, subscriber);
        };
        AsyncSubject2.prototype.next = function(value) {
          if (!this.hasCompleted) {
            this.value = value;
            this.hasNext = true;
          }
        };
        AsyncSubject2.prototype.error = function(error) {
          if (!this.hasCompleted) {
            _super.prototype.error.call(this, error);
          }
        };
        AsyncSubject2.prototype.complete = function() {
          this.hasCompleted = true;
          if (this.hasNext) {
            _super.prototype.next.call(this, this.value);
          }
          _super.prototype.complete.call(this);
        };
        return AsyncSubject2;
      }(Subject_1.Subject);
      exports.AsyncSubject = AsyncSubject;
    }
  });

  // node_modules/rxjs/internal/util/Immediate.js
  var require_Immediate = __commonJS({
    "node_modules/rxjs/internal/util/Immediate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var nextHandle = 1;
      var RESOLVED = function() {
        return Promise.resolve();
      }();
      var activeHandles = {};
      function findAndClearHandle(handle) {
        if (handle in activeHandles) {
          delete activeHandles[handle];
          return true;
        }
        return false;
      }
      exports.Immediate = {
        setImmediate: function(cb) {
          var handle = nextHandle++;
          activeHandles[handle] = true;
          RESOLVED.then(function() {
            return findAndClearHandle(handle) && cb();
          });
          return handle;
        },
        clearImmediate: function(handle) {
          findAndClearHandle(handle);
        }
      };
      exports.TestTools = {
        pending: function() {
          return Object.keys(activeHandles).length;
        }
      };
    }
  });

  // node_modules/rxjs/internal/scheduler/AsapAction.js
  var require_AsapAction = __commonJS({
    "node_modules/rxjs/internal/scheduler/AsapAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Immediate_1 = require_Immediate();
      var AsyncAction_1 = require_AsyncAction();
      var AsapAction = function(_super) {
        __extends(AsapAction2, _super);
        function AsapAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
        };
        AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (scheduler.actions.length === 0) {
            Immediate_1.Immediate.clearImmediate(id);
            scheduler.scheduled = void 0;
          }
          return void 0;
        };
        return AsapAction2;
      }(AsyncAction_1.AsyncAction);
      exports.AsapAction = AsapAction;
    }
  });

  // node_modules/rxjs/internal/scheduler/AsapScheduler.js
  var require_AsapScheduler = __commonJS({
    "node_modules/rxjs/internal/scheduler/AsapScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncScheduler_1 = require_AsyncScheduler();
      var AsapScheduler = function(_super) {
        __extends(AsapScheduler2, _super);
        function AsapScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        AsapScheduler2.prototype.flush = function(action) {
          this.active = true;
          this.scheduled = void 0;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
            while (++index < count && (action = actions.shift())) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AsapScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.AsapScheduler = AsapScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/asap.js
  var require_asap = __commonJS({
    "node_modules/rxjs/internal/scheduler/asap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsapAction_1 = require_AsapAction();
      var AsapScheduler_1 = require_AsapScheduler();
      exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
      exports.asap = exports.asapScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/async.js
  var require_async = __commonJS({
    "node_modules/rxjs/internal/scheduler/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncAction_1 = require_AsyncAction();
      var AsyncScheduler_1 = require_AsyncScheduler();
      exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
      exports.async = exports.asyncScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/AnimationFrameAction.js
  var require_AnimationFrameAction = __commonJS({
    "node_modules/rxjs/internal/scheduler/AnimationFrameAction.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncAction_1 = require_AsyncAction();
      var AnimationFrameAction = function(_super) {
        __extends(AnimationFrameAction2, _super);
        function AnimationFrameAction2(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          return _this;
        }
        AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0) {
            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
          }
          scheduler.actions.push(this);
          return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function() {
            return scheduler.flush(null);
          }));
        };
        AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
          }
          if (scheduler.actions.length === 0) {
            cancelAnimationFrame(id);
            scheduler.scheduled = void 0;
          }
          return void 0;
        };
        return AnimationFrameAction2;
      }(AsyncAction_1.AsyncAction);
      exports.AnimationFrameAction = AnimationFrameAction;
    }
  });

  // node_modules/rxjs/internal/scheduler/AnimationFrameScheduler.js
  var require_AnimationFrameScheduler = __commonJS({
    "node_modules/rxjs/internal/scheduler/AnimationFrameScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncScheduler_1 = require_AsyncScheduler();
      var AnimationFrameScheduler = function(_super) {
        __extends(AnimationFrameScheduler2, _super);
        function AnimationFrameScheduler2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        AnimationFrameScheduler2.prototype.flush = function(action) {
          this.active = true;
          this.scheduled = void 0;
          var actions = this.actions;
          var error;
          var index = -1;
          var count = actions.length;
          action = action || actions.shift();
          do {
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          } while (++index < count && (action = actions.shift()));
          this.active = false;
          if (error) {
            while (++index < count && (action = actions.shift())) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        return AnimationFrameScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.AnimationFrameScheduler = AnimationFrameScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/animationFrame.js
  var require_animationFrame = __commonJS({
    "node_modules/rxjs/internal/scheduler/animationFrame.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var AnimationFrameAction_1 = require_AnimationFrameAction();
      var AnimationFrameScheduler_1 = require_AnimationFrameScheduler();
      exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
      exports.animationFrame = exports.animationFrameScheduler;
    }
  });

  // node_modules/rxjs/internal/scheduler/VirtualTimeScheduler.js
  var require_VirtualTimeScheduler = __commonJS({
    "node_modules/rxjs/internal/scheduler/VirtualTimeScheduler.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncAction_1 = require_AsyncAction();
      var AsyncScheduler_1 = require_AsyncScheduler();
      var VirtualTimeScheduler = function(_super) {
        __extends(VirtualTimeScheduler2, _super);
        function VirtualTimeScheduler2(SchedulerAction, maxFrames) {
          if (SchedulerAction === void 0) {
            SchedulerAction = VirtualAction;
          }
          if (maxFrames === void 0) {
            maxFrames = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this, SchedulerAction, function() {
            return _this.frame;
          }) || this;
          _this.maxFrames = maxFrames;
          _this.frame = 0;
          _this.index = -1;
          return _this;
        }
        VirtualTimeScheduler2.prototype.flush = function() {
          var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
          var error, action;
          while ((action = actions[0]) && action.delay <= maxFrames) {
            actions.shift();
            this.frame = action.delay;
            if (error = action.execute(action.state, action.delay)) {
              break;
            }
          }
          if (error) {
            while (action = actions.shift()) {
              action.unsubscribe();
            }
            throw error;
          }
        };
        VirtualTimeScheduler2.frameTimeFactor = 10;
        return VirtualTimeScheduler2;
      }(AsyncScheduler_1.AsyncScheduler);
      exports.VirtualTimeScheduler = VirtualTimeScheduler;
      var VirtualAction = function(_super) {
        __extends(VirtualAction2, _super);
        function VirtualAction2(scheduler, work, index) {
          if (index === void 0) {
            index = scheduler.index += 1;
          }
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.index = index;
          _this.active = true;
          _this.index = scheduler.index = index;
          return _this;
        }
        VirtualAction2.prototype.schedule = function(state, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
          }
          this.active = false;
          var action = new VirtualAction2(this.scheduler, this.work);
          this.add(action);
          return action.schedule(state, delay);
        };
        VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          this.delay = scheduler.frame + delay;
          var actions = scheduler.actions;
          actions.push(this);
          actions.sort(VirtualAction2.sortActions);
          return true;
        };
        VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
          if (delay === void 0) {
            delay = 0;
          }
          return void 0;
        };
        VirtualAction2.prototype._execute = function(state, delay) {
          if (this.active === true) {
            return _super.prototype._execute.call(this, state, delay);
          }
        };
        VirtualAction2.sortActions = function(a, b) {
          if (a.delay === b.delay) {
            if (a.index === b.index) {
              return 0;
            } else if (a.index > b.index) {
              return 1;
            } else {
              return -1;
            }
          } else if (a.delay > b.delay) {
            return 1;
          } else {
            return -1;
          }
        };
        return VirtualAction2;
      }(AsyncAction_1.AsyncAction);
      exports.VirtualAction = VirtualAction;
    }
  });

  // node_modules/rxjs/internal/util/noop.js
  var require_noop = __commonJS({
    "node_modules/rxjs/internal/util/noop.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function noop() {
      }
      exports.noop = noop;
    }
  });

  // node_modules/rxjs/internal/util/isObservable.js
  var require_isObservable = __commonJS({
    "node_modules/rxjs/internal/util/isObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      function isObservable(obj) {
        return !!obj && (obj instanceof Observable_1.Observable || typeof obj.lift === "function" && typeof obj.subscribe === "function");
      }
      exports.isObservable = isObservable;
    }
  });

  // node_modules/rxjs/internal/util/ArgumentOutOfRangeError.js
  var require_ArgumentOutOfRangeError = __commonJS({
    "node_modules/rxjs/internal/util/ArgumentOutOfRangeError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ArgumentOutOfRangeErrorImpl = function() {
        function ArgumentOutOfRangeErrorImpl2() {
          Error.call(this);
          this.message = "argument out of range";
          this.name = "ArgumentOutOfRangeError";
          return this;
        }
        ArgumentOutOfRangeErrorImpl2.prototype = Object.create(Error.prototype);
        return ArgumentOutOfRangeErrorImpl2;
      }();
      exports.ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
    }
  });

  // node_modules/rxjs/internal/util/EmptyError.js
  var require_EmptyError = __commonJS({
    "node_modules/rxjs/internal/util/EmptyError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var EmptyErrorImpl = function() {
        function EmptyErrorImpl2() {
          Error.call(this);
          this.message = "no elements in sequence";
          this.name = "EmptyError";
          return this;
        }
        EmptyErrorImpl2.prototype = Object.create(Error.prototype);
        return EmptyErrorImpl2;
      }();
      exports.EmptyError = EmptyErrorImpl;
    }
  });

  // node_modules/rxjs/internal/util/TimeoutError.js
  var require_TimeoutError = __commonJS({
    "node_modules/rxjs/internal/util/TimeoutError.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TimeoutErrorImpl = function() {
        function TimeoutErrorImpl2() {
          Error.call(this);
          this.message = "Timeout has occurred";
          this.name = "TimeoutError";
          return this;
        }
        TimeoutErrorImpl2.prototype = Object.create(Error.prototype);
        return TimeoutErrorImpl2;
      }();
      exports.TimeoutError = TimeoutErrorImpl;
    }
  });

  // node_modules/rxjs/internal/operators/map.js
  var require_map = __commonJS({
    "node_modules/rxjs/internal/operators/map.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function map(project, thisArg) {
        return function mapOperation(source) {
          if (typeof project !== "function") {
            throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
          }
          return source.lift(new MapOperator(project, thisArg));
        };
      }
      exports.map = map;
      var MapOperator = function() {
        function MapOperator2(project, thisArg) {
          this.project = project;
          this.thisArg = thisArg;
        }
        MapOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        };
        return MapOperator2;
      }();
      exports.MapOperator = MapOperator;
      var MapSubscriber = function(_super) {
        __extends(MapSubscriber2, _super);
        function MapSubscriber2(destination, project, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.count = 0;
          _this.thisArg = thisArg || _this;
          return _this;
        }
        MapSubscriber2.prototype._next = function(value) {
          var result;
          try {
            result = this.project.call(this.thisArg, value, this.count++);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        return MapSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/observable/bindCallback.js
  var require_bindCallback = __commonJS({
    "node_modules/rxjs/internal/observable/bindCallback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var AsyncSubject_1 = require_AsyncSubject();
      var map_1 = require_map();
      var canReportError_1 = require_canReportError();
      var isArray_1 = require_isArray();
      var isScheduler_1 = require_isScheduler();
      function bindCallback(callbackFunc, resultSelector, scheduler) {
        if (resultSelector) {
          if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
          } else {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return bindCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1.map(function(args2) {
                return isArray_1.isArray(args2) ? resultSelector.apply(void 0, args2) : resultSelector(args2);
              }));
            };
          }
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var context = this;
          var subject;
          var params = {
            context,
            subject,
            callbackFunc,
            scheduler
          };
          return new Observable_1.Observable(function(subscriber) {
            if (!scheduler) {
              if (!subject) {
                subject = new AsyncSubject_1.AsyncSubject();
                var handler = function() {
                  var innerArgs = [];
                  for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                    innerArgs[_i2] = arguments[_i2];
                  }
                  subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                  subject.complete();
                };
                try {
                  callbackFunc.apply(context, args.concat([handler]));
                } catch (err) {
                  if (canReportError_1.canReportError(subject)) {
                    subject.error(err);
                  } else {
                    console.warn(err);
                  }
                }
              }
              return subject.subscribe(subscriber);
            } else {
              var state = {
                args,
                subscriber,
                params
              };
              return scheduler.schedule(dispatch, 0, state);
            }
          });
        };
      }
      exports.bindCallback = bindCallback;
      function dispatch(state) {
        var _this = this;
        var self = this;
        var args = state.args, subscriber = state.subscriber, params = state.params;
        var callbackFunc = params.callbackFunc, context = params.context, scheduler = params.scheduler;
        var subject = params.subject;
        if (!subject) {
          subject = params.subject = new AsyncSubject_1.AsyncSubject();
          var handler = function() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }
            var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
            _this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
          };
          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            subject.error(err);
          }
        }
        this.add(subject.subscribe(subscriber));
      }
      function dispatchNext(state) {
        var value = state.value, subject = state.subject;
        subject.next(value);
        subject.complete();
      }
    }
  });

  // node_modules/rxjs/internal/observable/bindNodeCallback.js
  var require_bindNodeCallback = __commonJS({
    "node_modules/rxjs/internal/observable/bindNodeCallback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var AsyncSubject_1 = require_AsyncSubject();
      var map_1 = require_map();
      var canReportError_1 = require_canReportError();
      var isScheduler_1 = require_isScheduler();
      var isArray_1 = require_isArray();
      function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
        if (resultSelector) {
          if (isScheduler_1.isScheduler(resultSelector)) {
            scheduler = resultSelector;
          } else {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return bindNodeCallback(callbackFunc, scheduler).apply(void 0, args).pipe(map_1.map(function(args2) {
                return isArray_1.isArray(args2) ? resultSelector.apply(void 0, args2) : resultSelector(args2);
              }));
            };
          }
        }
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var params = {
            subject: void 0,
            args,
            callbackFunc,
            scheduler,
            context: this
          };
          return new Observable_1.Observable(function(subscriber) {
            var context = params.context;
            var subject = params.subject;
            if (!scheduler) {
              if (!subject) {
                subject = params.subject = new AsyncSubject_1.AsyncSubject();
                var handler = function() {
                  var innerArgs = [];
                  for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                    innerArgs[_i2] = arguments[_i2];
                  }
                  var err = innerArgs.shift();
                  if (err) {
                    subject.error(err);
                    return;
                  }
                  subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
                  subject.complete();
                };
                try {
                  callbackFunc.apply(context, args.concat([handler]));
                } catch (err) {
                  if (canReportError_1.canReportError(subject)) {
                    subject.error(err);
                  } else {
                    console.warn(err);
                  }
                }
              }
              return subject.subscribe(subscriber);
            } else {
              return scheduler.schedule(dispatch, 0, { params, subscriber, context });
            }
          });
        };
      }
      exports.bindNodeCallback = bindNodeCallback;
      function dispatch(state) {
        var _this = this;
        var params = state.params, subscriber = state.subscriber, context = state.context;
        var callbackFunc = params.callbackFunc, args = params.args, scheduler = params.scheduler;
        var subject = params.subject;
        if (!subject) {
          subject = params.subject = new AsyncSubject_1.AsyncSubject();
          var handler = function() {
            var innerArgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              innerArgs[_i] = arguments[_i];
            }
            var err = innerArgs.shift();
            if (err) {
              _this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
            } else {
              var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
              _this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
            }
          };
          try {
            callbackFunc.apply(context, args.concat([handler]));
          } catch (err) {
            this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
          }
        }
        this.add(subject.subscribe(subscriber));
      }
      function dispatchNext(arg) {
        var value = arg.value, subject = arg.subject;
        subject.next(value);
        subject.complete();
      }
      function dispatchError(arg) {
        var err = arg.err, subject = arg.subject;
        subject.error(err);
      }
    }
  });

  // node_modules/rxjs/internal/OuterSubscriber.js
  var require_OuterSubscriber = __commonJS({
    "node_modules/rxjs/internal/OuterSubscriber.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var OuterSubscriber = function(_super) {
        __extends(OuterSubscriber2, _super);
        function OuterSubscriber2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        OuterSubscriber2.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          this.destination.next(innerValue);
        };
        OuterSubscriber2.prototype.notifyError = function(error, innerSub) {
          this.destination.error(error);
        };
        OuterSubscriber2.prototype.notifyComplete = function(innerSub) {
          this.destination.complete();
        };
        return OuterSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.OuterSubscriber = OuterSubscriber;
    }
  });

  // node_modules/rxjs/internal/InnerSubscriber.js
  var require_InnerSubscriber = __commonJS({
    "node_modules/rxjs/internal/InnerSubscriber.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var InnerSubscriber = function(_super) {
        __extends(InnerSubscriber2, _super);
        function InnerSubscriber2(parent, outerValue, outerIndex) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.outerValue = outerValue;
          _this.outerIndex = outerIndex;
          _this.index = 0;
          return _this;
        }
        InnerSubscriber2.prototype._next = function(value) {
          this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        };
        InnerSubscriber2.prototype._error = function(error) {
          this.parent.notifyError(error, this);
          this.unsubscribe();
        };
        InnerSubscriber2.prototype._complete = function() {
          this.parent.notifyComplete(this);
          this.unsubscribe();
        };
        return InnerSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.InnerSubscriber = InnerSubscriber;
    }
  });

  // node_modules/rxjs/internal/util/subscribeToPromise.js
  var require_subscribeToPromise = __commonJS({
    "node_modules/rxjs/internal/util/subscribeToPromise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var hostReportError_1 = require_hostReportError();
      exports.subscribeToPromise = function(promise) {
        return function(subscriber) {
          promise.then(function(value) {
            if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function(err) {
            return subscriber.error(err);
          }).then(null, hostReportError_1.hostReportError);
          return subscriber;
        };
      };
    }
  });

  // node_modules/rxjs/internal/symbol/iterator.js
  var require_iterator = __commonJS({
    "node_modules/rxjs/internal/symbol/iterator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getSymbolIterator() {
        if (typeof Symbol !== "function" || !Symbol.iterator) {
          return "@@iterator";
        }
        return Symbol.iterator;
      }
      exports.getSymbolIterator = getSymbolIterator;
      exports.iterator = getSymbolIterator();
      exports.$$iterator = exports.iterator;
    }
  });

  // node_modules/rxjs/internal/util/subscribeToIterable.js
  var require_subscribeToIterable = __commonJS({
    "node_modules/rxjs/internal/util/subscribeToIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var iterator_1 = require_iterator();
      exports.subscribeToIterable = function(iterable) {
        return function(subscriber) {
          var iterator = iterable[iterator_1.iterator]();
          do {
            var item = void 0;
            try {
              item = iterator.next();
            } catch (err) {
              subscriber.error(err);
              return subscriber;
            }
            if (item.done) {
              subscriber.complete();
              break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
              break;
            }
          } while (true);
          if (typeof iterator.return === "function") {
            subscriber.add(function() {
              if (iterator.return) {
                iterator.return();
              }
            });
          }
          return subscriber;
        };
      };
    }
  });

  // node_modules/rxjs/internal/util/subscribeToObservable.js
  var require_subscribeToObservable = __commonJS({
    "node_modules/rxjs/internal/util/subscribeToObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      exports.subscribeToObservable = function(obj) {
        return function(subscriber) {
          var obs = obj[observable_1.observable]();
          if (typeof obs.subscribe !== "function") {
            throw new TypeError("Provided object does not correctly implement Symbol.observable");
          } else {
            return obs.subscribe(subscriber);
          }
        };
      };
    }
  });

  // node_modules/rxjs/internal/util/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/rxjs/internal/util/isArrayLike.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isArrayLike = function(x) {
        return x && typeof x.length === "number" && typeof x !== "function";
      };
    }
  });

  // node_modules/rxjs/internal/util/isPromise.js
  var require_isPromise = __commonJS({
    "node_modules/rxjs/internal/util/isPromise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isPromise(value) {
        return !!value && typeof value.subscribe !== "function" && typeof value.then === "function";
      }
      exports.isPromise = isPromise;
    }
  });

  // node_modules/rxjs/internal/util/subscribeTo.js
  var require_subscribeTo = __commonJS({
    "node_modules/rxjs/internal/util/subscribeTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var subscribeToArray_1 = require_subscribeToArray();
      var subscribeToPromise_1 = require_subscribeToPromise();
      var subscribeToIterable_1 = require_subscribeToIterable();
      var subscribeToObservable_1 = require_subscribeToObservable();
      var isArrayLike_1 = require_isArrayLike();
      var isPromise_1 = require_isPromise();
      var isObject_1 = require_isObject();
      var iterator_1 = require_iterator();
      var observable_1 = require_observable();
      exports.subscribeTo = function(result) {
        if (!!result && typeof result[observable_1.observable] === "function") {
          return subscribeToObservable_1.subscribeToObservable(result);
        } else if (isArrayLike_1.isArrayLike(result)) {
          return subscribeToArray_1.subscribeToArray(result);
        } else if (isPromise_1.isPromise(result)) {
          return subscribeToPromise_1.subscribeToPromise(result);
        } else if (!!result && typeof result[iterator_1.iterator] === "function") {
          return subscribeToIterable_1.subscribeToIterable(result);
        } else {
          var value = isObject_1.isObject(result) ? "an invalid object" : "'" + result + "'";
          var msg = "You provided " + value + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.";
          throw new TypeError(msg);
        }
      };
    }
  });

  // node_modules/rxjs/internal/util/subscribeToResult.js
  var require_subscribeToResult = __commonJS({
    "node_modules/rxjs/internal/util/subscribeToResult.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var InnerSubscriber_1 = require_InnerSubscriber();
      var subscribeTo_1 = require_subscribeTo();
      var Observable_1 = require_Observable();
      function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, innerSubscriber) {
        if (innerSubscriber === void 0) {
          innerSubscriber = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
        }
        if (innerSubscriber.closed) {
          return void 0;
        }
        if (result instanceof Observable_1.Observable) {
          return result.subscribe(innerSubscriber);
        }
        return subscribeTo_1.subscribeTo(result)(innerSubscriber);
      }
      exports.subscribeToResult = subscribeToResult;
    }
  });

  // node_modules/rxjs/internal/observable/combineLatest.js
  var require_combineLatest = __commonJS({
    "node_modules/rxjs/internal/observable/combineLatest.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var isScheduler_1 = require_isScheduler();
      var isArray_1 = require_isArray();
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      var fromArray_1 = require_fromArray();
      var NONE = {};
      function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        var resultSelector = void 0;
        var scheduler = void 0;
        if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
          scheduler = observables.pop();
        }
        if (typeof observables[observables.length - 1] === "function") {
          resultSelector = observables.pop();
        }
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
          observables = observables[0];
        }
        return fromArray_1.fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
      }
      exports.combineLatest = combineLatest;
      var CombineLatestOperator = function() {
        function CombineLatestOperator2(resultSelector) {
          this.resultSelector = resultSelector;
        }
        CombineLatestOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new CombineLatestSubscriber(subscriber, this.resultSelector));
        };
        return CombineLatestOperator2;
      }();
      exports.CombineLatestOperator = CombineLatestOperator;
      var CombineLatestSubscriber = function(_super) {
        __extends(CombineLatestSubscriber2, _super);
        function CombineLatestSubscriber2(destination, resultSelector) {
          var _this = _super.call(this, destination) || this;
          _this.resultSelector = resultSelector;
          _this.active = 0;
          _this.values = [];
          _this.observables = [];
          return _this;
        }
        CombineLatestSubscriber2.prototype._next = function(observable) {
          this.values.push(NONE);
          this.observables.push(observable);
        };
        CombineLatestSubscriber2.prototype._complete = function() {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
            this.destination.complete();
          } else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
              var observable = observables[i];
              this.add(subscribeToResult_1.subscribeToResult(this, observable, void 0, i));
            }
          }
        };
        CombineLatestSubscriber2.prototype.notifyComplete = function(unused) {
          if ((this.active -= 1) === 0) {
            this.destination.complete();
          }
        };
        CombineLatestSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
          var values = this.values;
          var oldVal = values[outerIndex];
          var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
          values[outerIndex] = innerValue;
          if (toRespond === 0) {
            if (this.resultSelector) {
              this._tryResultSelector(values);
            } else {
              this.destination.next(values.slice());
            }
          }
        };
        CombineLatestSubscriber2.prototype._tryResultSelector = function(values) {
          var result;
          try {
            result = this.resultSelector.apply(this, values);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        return CombineLatestSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
      exports.CombineLatestSubscriber = CombineLatestSubscriber;
    }
  });

  // node_modules/rxjs/internal/scheduled/scheduleObservable.js
  var require_scheduleObservable = __commonJS({
    "node_modules/rxjs/internal/scheduled/scheduleObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      var observable_1 = require_observable();
      function scheduleObservable(input, scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var sub = new Subscription_1.Subscription();
          sub.add(scheduler.schedule(function() {
            var observable = input[observable_1.observable]();
            sub.add(observable.subscribe({
              next: function(value) {
                sub.add(scheduler.schedule(function() {
                  return subscriber.next(value);
                }));
              },
              error: function(err) {
                sub.add(scheduler.schedule(function() {
                  return subscriber.error(err);
                }));
              },
              complete: function() {
                sub.add(scheduler.schedule(function() {
                  return subscriber.complete();
                }));
              }
            }));
          }));
          return sub;
        });
      }
      exports.scheduleObservable = scheduleObservable;
    }
  });

  // node_modules/rxjs/internal/scheduled/schedulePromise.js
  var require_schedulePromise = __commonJS({
    "node_modules/rxjs/internal/scheduled/schedulePromise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      function schedulePromise(input, scheduler) {
        return new Observable_1.Observable(function(subscriber) {
          var sub = new Subscription_1.Subscription();
          sub.add(scheduler.schedule(function() {
            return input.then(function(value) {
              sub.add(scheduler.schedule(function() {
                subscriber.next(value);
                sub.add(scheduler.schedule(function() {
                  return subscriber.complete();
                }));
              }));
            }, function(err) {
              sub.add(scheduler.schedule(function() {
                return subscriber.error(err);
              }));
            });
          }));
          return sub;
        });
      }
      exports.schedulePromise = schedulePromise;
    }
  });

  // node_modules/rxjs/internal/scheduled/scheduleIterable.js
  var require_scheduleIterable = __commonJS({
    "node_modules/rxjs/internal/scheduled/scheduleIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      var iterator_1 = require_iterator();
      function scheduleIterable(input, scheduler) {
        if (!input) {
          throw new Error("Iterable cannot be null");
        }
        return new Observable_1.Observable(function(subscriber) {
          var sub = new Subscription_1.Subscription();
          var iterator;
          sub.add(function() {
            if (iterator && typeof iterator.return === "function") {
              iterator.return();
            }
          });
          sub.add(scheduler.schedule(function() {
            iterator = input[iterator_1.iterator]();
            sub.add(scheduler.schedule(function() {
              if (subscriber.closed) {
                return;
              }
              var value;
              var done;
              try {
                var result = iterator.next();
                value = result.value;
                done = result.done;
              } catch (err) {
                subscriber.error(err);
                return;
              }
              if (done) {
                subscriber.complete();
              } else {
                subscriber.next(value);
                this.schedule();
              }
            }));
          }));
          return sub;
        });
      }
      exports.scheduleIterable = scheduleIterable;
    }
  });

  // node_modules/rxjs/internal/util/isInteropObservable.js
  var require_isInteropObservable = __commonJS({
    "node_modules/rxjs/internal/util/isInteropObservable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var observable_1 = require_observable();
      function isInteropObservable(input) {
        return input && typeof input[observable_1.observable] === "function";
      }
      exports.isInteropObservable = isInteropObservable;
    }
  });

  // node_modules/rxjs/internal/util/isIterable.js
  var require_isIterable = __commonJS({
    "node_modules/rxjs/internal/util/isIterable.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var iterator_1 = require_iterator();
      function isIterable(input) {
        return input && typeof input[iterator_1.iterator] === "function";
      }
      exports.isIterable = isIterable;
    }
  });

  // node_modules/rxjs/internal/scheduled/scheduled.js
  var require_scheduled = __commonJS({
    "node_modules/rxjs/internal/scheduled/scheduled.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var scheduleObservable_1 = require_scheduleObservable();
      var schedulePromise_1 = require_schedulePromise();
      var scheduleArray_1 = require_scheduleArray();
      var scheduleIterable_1 = require_scheduleIterable();
      var isInteropObservable_1 = require_isInteropObservable();
      var isPromise_1 = require_isPromise();
      var isArrayLike_1 = require_isArrayLike();
      var isIterable_1 = require_isIterable();
      function scheduled(input, scheduler) {
        if (input != null) {
          if (isInteropObservable_1.isInteropObservable(input)) {
            return scheduleObservable_1.scheduleObservable(input, scheduler);
          } else if (isPromise_1.isPromise(input)) {
            return schedulePromise_1.schedulePromise(input, scheduler);
          } else if (isArrayLike_1.isArrayLike(input)) {
            return scheduleArray_1.scheduleArray(input, scheduler);
          } else if (isIterable_1.isIterable(input) || typeof input === "string") {
            return scheduleIterable_1.scheduleIterable(input, scheduler);
          }
        }
        throw new TypeError((input !== null && typeof input || input) + " is not observable");
      }
      exports.scheduled = scheduled;
    }
  });

  // node_modules/rxjs/internal/observable/from.js
  var require_from = __commonJS({
    "node_modules/rxjs/internal/observable/from.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var subscribeTo_1 = require_subscribeTo();
      var scheduled_1 = require_scheduled();
      function from(input, scheduler) {
        if (!scheduler) {
          if (input instanceof Observable_1.Observable) {
            return input;
          }
          return new Observable_1.Observable(subscribeTo_1.subscribeTo(input));
        } else {
          return scheduled_1.scheduled(input, scheduler);
        }
      }
      exports.from = from;
    }
  });

  // node_modules/rxjs/internal/innerSubscribe.js
  var require_innerSubscribe = __commonJS({
    "node_modules/rxjs/internal/innerSubscribe.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Observable_1 = require_Observable();
      var subscribeTo_1 = require_subscribeTo();
      var SimpleInnerSubscriber = function(_super) {
        __extends(SimpleInnerSubscriber2, _super);
        function SimpleInnerSubscriber2(parent) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          return _this;
        }
        SimpleInnerSubscriber2.prototype._next = function(value) {
          this.parent.notifyNext(value);
        };
        SimpleInnerSubscriber2.prototype._error = function(error) {
          this.parent.notifyError(error);
          this.unsubscribe();
        };
        SimpleInnerSubscriber2.prototype._complete = function() {
          this.parent.notifyComplete();
          this.unsubscribe();
        };
        return SimpleInnerSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.SimpleInnerSubscriber = SimpleInnerSubscriber;
      var ComplexInnerSubscriber = function(_super) {
        __extends(ComplexInnerSubscriber2, _super);
        function ComplexInnerSubscriber2(parent, outerValue, outerIndex) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.outerValue = outerValue;
          _this.outerIndex = outerIndex;
          return _this;
        }
        ComplexInnerSubscriber2.prototype._next = function(value) {
          this.parent.notifyNext(this.outerValue, value, this.outerIndex, this);
        };
        ComplexInnerSubscriber2.prototype._error = function(error) {
          this.parent.notifyError(error);
          this.unsubscribe();
        };
        ComplexInnerSubscriber2.prototype._complete = function() {
          this.parent.notifyComplete(this);
          this.unsubscribe();
        };
        return ComplexInnerSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.ComplexInnerSubscriber = ComplexInnerSubscriber;
      var SimpleOuterSubscriber = function(_super) {
        __extends(SimpleOuterSubscriber2, _super);
        function SimpleOuterSubscriber2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleOuterSubscriber2.prototype.notifyNext = function(innerValue) {
          this.destination.next(innerValue);
        };
        SimpleOuterSubscriber2.prototype.notifyError = function(err) {
          this.destination.error(err);
        };
        SimpleOuterSubscriber2.prototype.notifyComplete = function() {
          this.destination.complete();
        };
        return SimpleOuterSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.SimpleOuterSubscriber = SimpleOuterSubscriber;
      var ComplexOuterSubscriber = function(_super) {
        __extends(ComplexOuterSubscriber2, _super);
        function ComplexOuterSubscriber2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ComplexOuterSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, _outerIndex, _innerSub) {
          this.destination.next(innerValue);
        };
        ComplexOuterSubscriber2.prototype.notifyError = function(error) {
          this.destination.error(error);
        };
        ComplexOuterSubscriber2.prototype.notifyComplete = function(_innerSub) {
          this.destination.complete();
        };
        return ComplexOuterSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.ComplexOuterSubscriber = ComplexOuterSubscriber;
      function innerSubscribe(result, innerSubscriber) {
        if (innerSubscriber.closed) {
          return void 0;
        }
        if (result instanceof Observable_1.Observable) {
          return result.subscribe(innerSubscriber);
        }
        var subscription;
        try {
          subscription = subscribeTo_1.subscribeTo(result)(innerSubscriber);
        } catch (error) {
          innerSubscriber.error(error);
        }
        return subscription;
      }
      exports.innerSubscribe = innerSubscribe;
    }
  });

  // node_modules/rxjs/internal/operators/mergeMap.js
  var require_mergeMap = __commonJS({
    "node_modules/rxjs/internal/operators/mergeMap.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var map_1 = require_map();
      var from_1 = require_from();
      var innerSubscribe_1 = require_innerSubscribe();
      function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        if (typeof resultSelector === "function") {
          return function(source) {
            return source.pipe(mergeMap(function(a, i) {
              return from_1.from(project(a, i)).pipe(map_1.map(function(b, ii) {
                return resultSelector(a, b, i, ii);
              }));
            }, concurrent));
          };
        } else if (typeof resultSelector === "number") {
          concurrent = resultSelector;
        }
        return function(source) {
          return source.lift(new MergeMapOperator(project, concurrent));
        };
      }
      exports.mergeMap = mergeMap;
      var MergeMapOperator = function() {
        function MergeMapOperator2(project, concurrent) {
          if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
          }
          this.project = project;
          this.concurrent = concurrent;
        }
        MergeMapOperator2.prototype.call = function(observer, source) {
          return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
        };
        return MergeMapOperator2;
      }();
      exports.MergeMapOperator = MergeMapOperator;
      var MergeMapSubscriber = function(_super) {
        __extends(MergeMapSubscriber2, _super);
        function MergeMapSubscriber2(destination, project, concurrent) {
          if (concurrent === void 0) {
            concurrent = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.concurrent = concurrent;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
        }
        MergeMapSubscriber2.prototype._next = function(value) {
          if (this.active < this.concurrent) {
            this._tryNext(value);
          } else {
            this.buffer.push(value);
          }
        };
        MergeMapSubscriber2.prototype._tryNext = function(value) {
          var result;
          var index = this.index++;
          try {
            result = this.project(value, index);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.active++;
          this._innerSub(result);
        };
        MergeMapSubscriber2.prototype._innerSub = function(ish) {
          var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          var innerSubscription = innerSubscribe_1.innerSubscribe(ish, innerSubscriber);
          if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
          }
        };
        MergeMapSubscriber2.prototype._complete = function() {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
          }
          this.unsubscribe();
        };
        MergeMapSubscriber2.prototype.notifyNext = function(innerValue) {
          this.destination.next(innerValue);
        };
        MergeMapSubscriber2.prototype.notifyComplete = function() {
          var buffer = this.buffer;
          this.active--;
          if (buffer.length > 0) {
            this._next(buffer.shift());
          } else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
          }
        };
        return MergeMapSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
      exports.MergeMapSubscriber = MergeMapSubscriber;
      exports.flatMap = mergeMap;
    }
  });

  // node_modules/rxjs/internal/operators/mergeAll.js
  var require_mergeAll = __commonJS({
    "node_modules/rxjs/internal/operators/mergeAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var mergeMap_1 = require_mergeMap();
      var identity_1 = require_identity();
      function mergeAll(concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        return mergeMap_1.mergeMap(identity_1.identity, concurrent);
      }
      exports.mergeAll = mergeAll;
    }
  });

  // node_modules/rxjs/internal/operators/concatAll.js
  var require_concatAll = __commonJS({
    "node_modules/rxjs/internal/operators/concatAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var mergeAll_1 = require_mergeAll();
      function concatAll() {
        return mergeAll_1.mergeAll(1);
      }
      exports.concatAll = concatAll;
    }
  });

  // node_modules/rxjs/internal/observable/concat.js
  var require_concat = __commonJS({
    "node_modules/rxjs/internal/observable/concat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var of_1 = require_of();
      var concatAll_1 = require_concatAll();
      function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        return concatAll_1.concatAll()(of_1.of.apply(void 0, observables));
      }
      exports.concat = concat;
    }
  });

  // node_modules/rxjs/internal/observable/defer.js
  var require_defer = __commonJS({
    "node_modules/rxjs/internal/observable/defer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var from_1 = require_from();
      var empty_1 = require_empty();
      function defer(observableFactory) {
        return new Observable_1.Observable(function(subscriber) {
          var input;
          try {
            input = observableFactory();
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          var source = input ? from_1.from(input) : empty_1.empty();
          return source.subscribe(subscriber);
        });
      }
      exports.defer = defer;
    }
  });

  // node_modules/rxjs/internal/observable/forkJoin.js
  var require_forkJoin = __commonJS({
    "node_modules/rxjs/internal/observable/forkJoin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var isArray_1 = require_isArray();
      var map_1 = require_map();
      var isObject_1 = require_isObject();
      var from_1 = require_from();
      function forkJoin() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        if (sources.length === 1) {
          var first_1 = sources[0];
          if (isArray_1.isArray(first_1)) {
            return forkJoinInternal(first_1, null);
          }
          if (isObject_1.isObject(first_1) && Object.getPrototypeOf(first_1) === Object.prototype) {
            var keys = Object.keys(first_1);
            return forkJoinInternal(keys.map(function(key) {
              return first_1[key];
            }), keys);
          }
        }
        if (typeof sources[sources.length - 1] === "function") {
          var resultSelector_1 = sources.pop();
          sources = sources.length === 1 && isArray_1.isArray(sources[0]) ? sources[0] : sources;
          return forkJoinInternal(sources, null).pipe(map_1.map(function(args) {
            return resultSelector_1.apply(void 0, args);
          }));
        }
        return forkJoinInternal(sources, null);
      }
      exports.forkJoin = forkJoin;
      function forkJoinInternal(sources, keys) {
        return new Observable_1.Observable(function(subscriber) {
          var len = sources.length;
          if (len === 0) {
            subscriber.complete();
            return;
          }
          var values = new Array(len);
          var completed = 0;
          var emitted = 0;
          var _loop_1 = function(i2) {
            var source = from_1.from(sources[i2]);
            var hasValue = false;
            subscriber.add(source.subscribe({
              next: function(value) {
                if (!hasValue) {
                  hasValue = true;
                  emitted++;
                }
                values[i2] = value;
              },
              error: function(err) {
                return subscriber.error(err);
              },
              complete: function() {
                completed++;
                if (completed === len || !hasValue) {
                  if (emitted === len) {
                    subscriber.next(keys ? keys.reduce(function(result, key, i3) {
                      return result[key] = values[i3], result;
                    }, {}) : values);
                  }
                  subscriber.complete();
                }
              }
            }));
          };
          for (var i = 0; i < len; i++) {
            _loop_1(i);
          }
        });
      }
    }
  });

  // node_modules/rxjs/internal/observable/fromEvent.js
  var require_fromEvent = __commonJS({
    "node_modules/rxjs/internal/observable/fromEvent.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var isArray_1 = require_isArray();
      var isFunction_1 = require_isFunction();
      var map_1 = require_map();
      function fromEvent(target, eventName, options, resultSelector) {
        if (isFunction_1.isFunction(options)) {
          resultSelector = options;
          options = void 0;
        }
        if (resultSelector) {
          return fromEvent(target, eventName, options).pipe(map_1.map(function(args) {
            return isArray_1.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
          }));
        }
        return new Observable_1.Observable(function(subscriber) {
          function handler(e) {
            if (arguments.length > 1) {
              subscriber.next(Array.prototype.slice.call(arguments));
            } else {
              subscriber.next(e);
            }
          }
          setupSubscription(target, eventName, handler, subscriber, options);
        });
      }
      exports.fromEvent = fromEvent;
      function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isEventTarget(sourceObj)) {
          var source_1 = sourceObj;
          sourceObj.addEventListener(eventName, handler, options);
          unsubscribe = function() {
            return source_1.removeEventListener(eventName, handler, options);
          };
        } else if (isJQueryStyleEventEmitter(sourceObj)) {
          var source_2 = sourceObj;
          sourceObj.on(eventName, handler);
          unsubscribe = function() {
            return source_2.off(eventName, handler);
          };
        } else if (isNodeStyleEventEmitter(sourceObj)) {
          var source_3 = sourceObj;
          sourceObj.addListener(eventName, handler);
          unsubscribe = function() {
            return source_3.removeListener(eventName, handler);
          };
        } else if (sourceObj && sourceObj.length) {
          for (var i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
          }
        } else {
          throw new TypeError("Invalid event target");
        }
        subscriber.add(unsubscribe);
      }
      function isNodeStyleEventEmitter(sourceObj) {
        return sourceObj && typeof sourceObj.addListener === "function" && typeof sourceObj.removeListener === "function";
      }
      function isJQueryStyleEventEmitter(sourceObj) {
        return sourceObj && typeof sourceObj.on === "function" && typeof sourceObj.off === "function";
      }
      function isEventTarget(sourceObj) {
        return sourceObj && typeof sourceObj.addEventListener === "function" && typeof sourceObj.removeEventListener === "function";
      }
    }
  });

  // node_modules/rxjs/internal/observable/fromEventPattern.js
  var require_fromEventPattern = __commonJS({
    "node_modules/rxjs/internal/observable/fromEventPattern.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var isArray_1 = require_isArray();
      var isFunction_1 = require_isFunction();
      var map_1 = require_map();
      function fromEventPattern(addHandler, removeHandler, resultSelector) {
        if (resultSelector) {
          return fromEventPattern(addHandler, removeHandler).pipe(map_1.map(function(args) {
            return isArray_1.isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
          }));
        }
        return new Observable_1.Observable(function(subscriber) {
          var handler = function() {
            var e = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              e[_i] = arguments[_i];
            }
            return subscriber.next(e.length === 1 ? e[0] : e);
          };
          var retValue;
          try {
            retValue = addHandler(handler);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          if (!isFunction_1.isFunction(removeHandler)) {
            return void 0;
          }
          return function() {
            return removeHandler(handler, retValue);
          };
        });
      }
      exports.fromEventPattern = fromEventPattern;
    }
  });

  // node_modules/rxjs/internal/observable/generate.js
  var require_generate = __commonJS({
    "node_modules/rxjs/internal/observable/generate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var identity_1 = require_identity();
      var isScheduler_1 = require_isScheduler();
      function generate(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
        var resultSelector;
        var initialState;
        if (arguments.length == 1) {
          var options = initialStateOrOptions;
          initialState = options.initialState;
          condition = options.condition;
          iterate = options.iterate;
          resultSelector = options.resultSelector || identity_1.identity;
          scheduler = options.scheduler;
        } else if (resultSelectorOrObservable === void 0 || isScheduler_1.isScheduler(resultSelectorOrObservable)) {
          initialState = initialStateOrOptions;
          resultSelector = identity_1.identity;
          scheduler = resultSelectorOrObservable;
        } else {
          initialState = initialStateOrOptions;
          resultSelector = resultSelectorOrObservable;
        }
        return new Observable_1.Observable(function(subscriber) {
          var state = initialState;
          if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
              subscriber,
              iterate,
              condition,
              resultSelector,
              state
            });
          }
          do {
            if (condition) {
              var conditionResult = void 0;
              try {
                conditionResult = condition(state);
              } catch (err) {
                subscriber.error(err);
                return void 0;
              }
              if (!conditionResult) {
                subscriber.complete();
                break;
              }
            }
            var value = void 0;
            try {
              value = resultSelector(state);
            } catch (err) {
              subscriber.error(err);
              return void 0;
            }
            subscriber.next(value);
            if (subscriber.closed) {
              break;
            }
            try {
              state = iterate(state);
            } catch (err) {
              subscriber.error(err);
              return void 0;
            }
          } while (true);
          return void 0;
        });
      }
      exports.generate = generate;
      function dispatch(state) {
        var subscriber = state.subscriber, condition = state.condition;
        if (subscriber.closed) {
          return void 0;
        }
        if (state.needIterate) {
          try {
            state.state = state.iterate(state.state);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
        } else {
          state.needIterate = true;
        }
        if (condition) {
          var conditionResult = void 0;
          try {
            conditionResult = condition(state.state);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          if (!conditionResult) {
            subscriber.complete();
            return void 0;
          }
          if (subscriber.closed) {
            return void 0;
          }
        }
        var value;
        try {
          value = state.resultSelector(state.state);
        } catch (err) {
          subscriber.error(err);
          return void 0;
        }
        if (subscriber.closed) {
          return void 0;
        }
        subscriber.next(value);
        if (subscriber.closed) {
          return void 0;
        }
        return this.schedule(state);
      }
    }
  });

  // node_modules/rxjs/internal/observable/iif.js
  var require_iif = __commonJS({
    "node_modules/rxjs/internal/observable/iif.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var defer_1 = require_defer();
      var empty_1 = require_empty();
      function iif(condition, trueResult, falseResult) {
        if (trueResult === void 0) {
          trueResult = empty_1.EMPTY;
        }
        if (falseResult === void 0) {
          falseResult = empty_1.EMPTY;
        }
        return defer_1.defer(function() {
          return condition() ? trueResult : falseResult;
        });
      }
      exports.iif = iif;
    }
  });

  // node_modules/rxjs/internal/util/isNumeric.js
  var require_isNumeric = __commonJS({
    "node_modules/rxjs/internal/util/isNumeric.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isArray_1 = require_isArray();
      function isNumeric(val) {
        return !isArray_1.isArray(val) && val - parseFloat(val) + 1 >= 0;
      }
      exports.isNumeric = isNumeric;
    }
  });

  // node_modules/rxjs/internal/observable/interval.js
  var require_interval = __commonJS({
    "node_modules/rxjs/internal/observable/interval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var async_1 = require_async();
      var isNumeric_1 = require_isNumeric();
      function interval(period, scheduler) {
        if (period === void 0) {
          period = 0;
        }
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        if (!isNumeric_1.isNumeric(period) || period < 0) {
          period = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== "function") {
          scheduler = async_1.async;
        }
        return new Observable_1.Observable(function(subscriber) {
          subscriber.add(scheduler.schedule(dispatch, period, { subscriber, counter: 0, period }));
          return subscriber;
        });
      }
      exports.interval = interval;
      function dispatch(state) {
        var subscriber = state.subscriber, counter = state.counter, period = state.period;
        subscriber.next(counter);
        this.schedule({ subscriber, counter: counter + 1, period }, period);
      }
    }
  });

  // node_modules/rxjs/internal/observable/merge.js
  var require_merge = __commonJS({
    "node_modules/rxjs/internal/observable/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var isScheduler_1 = require_isScheduler();
      var mergeAll_1 = require_mergeAll();
      var fromArray_1 = require_fromArray();
      function merge() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        var concurrent = Number.POSITIVE_INFINITY;
        var scheduler = null;
        var last = observables[observables.length - 1];
        if (isScheduler_1.isScheduler(last)) {
          scheduler = observables.pop();
          if (observables.length > 1 && typeof observables[observables.length - 1] === "number") {
            concurrent = observables.pop();
          }
        } else if (typeof last === "number") {
          concurrent = observables.pop();
        }
        if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1.Observable) {
          return observables[0];
        }
        return mergeAll_1.mergeAll(concurrent)(fromArray_1.fromArray(observables, scheduler));
      }
      exports.merge = merge;
    }
  });

  // node_modules/rxjs/internal/observable/never.js
  var require_never = __commonJS({
    "node_modules/rxjs/internal/observable/never.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var noop_1 = require_noop();
      exports.NEVER = new Observable_1.Observable(noop_1.noop);
      function never() {
        return exports.NEVER;
      }
      exports.never = never;
    }
  });

  // node_modules/rxjs/internal/observable/onErrorResumeNext.js
  var require_onErrorResumeNext = __commonJS({
    "node_modules/rxjs/internal/observable/onErrorResumeNext.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var from_1 = require_from();
      var isArray_1 = require_isArray();
      var empty_1 = require_empty();
      function onErrorResumeNext() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          sources[_i] = arguments[_i];
        }
        if (sources.length === 0) {
          return empty_1.EMPTY;
        }
        var first = sources[0], remainder = sources.slice(1);
        if (sources.length === 1 && isArray_1.isArray(first)) {
          return onErrorResumeNext.apply(void 0, first);
        }
        return new Observable_1.Observable(function(subscriber) {
          var subNext = function() {
            return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber));
          };
          return from_1.from(first).subscribe({
            next: function(value) {
              subscriber.next(value);
            },
            error: subNext,
            complete: subNext
          });
        });
      }
      exports.onErrorResumeNext = onErrorResumeNext;
    }
  });

  // node_modules/rxjs/internal/observable/pairs.js
  var require_pairs = __commonJS({
    "node_modules/rxjs/internal/observable/pairs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var Subscription_1 = require_Subscription();
      function pairs(obj, scheduler) {
        if (!scheduler) {
          return new Observable_1.Observable(function(subscriber) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length && !subscriber.closed; i++) {
              var key = keys[i];
              if (obj.hasOwnProperty(key)) {
                subscriber.next([key, obj[key]]);
              }
            }
            subscriber.complete();
          });
        } else {
          return new Observable_1.Observable(function(subscriber) {
            var keys = Object.keys(obj);
            var subscription = new Subscription_1.Subscription();
            subscription.add(scheduler.schedule(dispatch, 0, { keys, index: 0, subscriber, subscription, obj }));
            return subscription;
          });
        }
      }
      exports.pairs = pairs;
      function dispatch(state) {
        var keys = state.keys, index = state.index, subscriber = state.subscriber, subscription = state.subscription, obj = state.obj;
        if (!subscriber.closed) {
          if (index < keys.length) {
            var key = keys[index];
            subscriber.next([key, obj[key]]);
            subscription.add(this.schedule({ keys, index: index + 1, subscriber, subscription, obj }));
          } else {
            subscriber.complete();
          }
        }
      }
      exports.dispatch = dispatch;
    }
  });

  // node_modules/rxjs/internal/util/not.js
  var require_not = __commonJS({
    "node_modules/rxjs/internal/util/not.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function not(pred, thisArg) {
        function notPred() {
          return !notPred.pred.apply(notPred.thisArg, arguments);
        }
        notPred.pred = pred;
        notPred.thisArg = thisArg;
        return notPred;
      }
      exports.not = not;
    }
  });

  // node_modules/rxjs/internal/operators/filter.js
  var require_filter = __commonJS({
    "node_modules/rxjs/internal/operators/filter.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function filter(predicate, thisArg) {
        return function filterOperatorFunction(source) {
          return source.lift(new FilterOperator(predicate, thisArg));
        };
      }
      exports.filter = filter;
      var FilterOperator = function() {
        function FilterOperator2(predicate, thisArg) {
          this.predicate = predicate;
          this.thisArg = thisArg;
        }
        FilterOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
        };
        return FilterOperator2;
      }();
      var FilterSubscriber = function(_super) {
        __extends(FilterSubscriber2, _super);
        function FilterSubscriber2(destination, predicate, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.count = 0;
          return _this;
        }
        FilterSubscriber2.prototype._next = function(value) {
          var result;
          try {
            result = this.predicate.call(this.thisArg, value, this.count++);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          if (result) {
            this.destination.next(value);
          }
        };
        return FilterSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/observable/partition.js
  var require_partition = __commonJS({
    "node_modules/rxjs/internal/observable/partition.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var not_1 = require_not();
      var subscribeTo_1 = require_subscribeTo();
      var filter_1 = require_filter();
      var Observable_1 = require_Observable();
      function partition(source, predicate, thisArg) {
        return [
          filter_1.filter(predicate, thisArg)(new Observable_1.Observable(subscribeTo_1.subscribeTo(source))),
          filter_1.filter(not_1.not(predicate, thisArg))(new Observable_1.Observable(subscribeTo_1.subscribeTo(source)))
        ];
      }
      exports.partition = partition;
    }
  });

  // node_modules/rxjs/internal/observable/race.js
  var require_race = __commonJS({
    "node_modules/rxjs/internal/observable/race.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var isArray_1 = require_isArray();
      var fromArray_1 = require_fromArray();
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      function race() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        if (observables.length === 1) {
          if (isArray_1.isArray(observables[0])) {
            observables = observables[0];
          } else {
            return observables[0];
          }
        }
        return fromArray_1.fromArray(observables, void 0).lift(new RaceOperator());
      }
      exports.race = race;
      var RaceOperator = function() {
        function RaceOperator2() {
        }
        RaceOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new RaceSubscriber(subscriber));
        };
        return RaceOperator2;
      }();
      exports.RaceOperator = RaceOperator;
      var RaceSubscriber = function(_super) {
        __extends(RaceSubscriber2, _super);
        function RaceSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasFirst = false;
          _this.observables = [];
          _this.subscriptions = [];
          return _this;
        }
        RaceSubscriber2.prototype._next = function(observable) {
          this.observables.push(observable);
        };
        RaceSubscriber2.prototype._complete = function() {
          var observables = this.observables;
          var len = observables.length;
          if (len === 0) {
            this.destination.complete();
          } else {
            for (var i = 0; i < len && !this.hasFirst; i++) {
              var observable = observables[i];
              var subscription = subscribeToResult_1.subscribeToResult(this, observable, void 0, i);
              if (this.subscriptions) {
                this.subscriptions.push(subscription);
              }
              this.add(subscription);
            }
            this.observables = null;
          }
        };
        RaceSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
          if (!this.hasFirst) {
            this.hasFirst = true;
            for (var i = 0; i < this.subscriptions.length; i++) {
              if (i !== outerIndex) {
                var subscription = this.subscriptions[i];
                subscription.unsubscribe();
                this.remove(subscription);
              }
            }
            this.subscriptions = null;
          }
          this.destination.next(innerValue);
        };
        return RaceSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
      exports.RaceSubscriber = RaceSubscriber;
    }
  });

  // node_modules/rxjs/internal/observable/range.js
  var require_range = __commonJS({
    "node_modules/rxjs/internal/observable/range.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      function range(start, count, scheduler) {
        if (start === void 0) {
          start = 0;
        }
        return new Observable_1.Observable(function(subscriber) {
          if (count === void 0) {
            count = start;
            start = 0;
          }
          var index = 0;
          var current = start;
          if (scheduler) {
            return scheduler.schedule(dispatch, 0, {
              index,
              count,
              start,
              subscriber
            });
          } else {
            do {
              if (index++ >= count) {
                subscriber.complete();
                break;
              }
              subscriber.next(current++);
              if (subscriber.closed) {
                break;
              }
            } while (true);
          }
          return void 0;
        });
      }
      exports.range = range;
      function dispatch(state) {
        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
          subscriber.complete();
          return;
        }
        subscriber.next(start);
        if (subscriber.closed) {
          return;
        }
        state.index = index + 1;
        state.start = start + 1;
        this.schedule(state);
      }
      exports.dispatch = dispatch;
    }
  });

  // node_modules/rxjs/internal/observable/timer.js
  var require_timer = __commonJS({
    "node_modules/rxjs/internal/observable/timer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var async_1 = require_async();
      var isNumeric_1 = require_isNumeric();
      var isScheduler_1 = require_isScheduler();
      function timer(dueTime, periodOrScheduler, scheduler) {
        if (dueTime === void 0) {
          dueTime = 0;
        }
        var period = -1;
        if (isNumeric_1.isNumeric(periodOrScheduler)) {
          period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
        } else if (isScheduler_1.isScheduler(periodOrScheduler)) {
          scheduler = periodOrScheduler;
        }
        if (!isScheduler_1.isScheduler(scheduler)) {
          scheduler = async_1.async;
        }
        return new Observable_1.Observable(function(subscriber) {
          var due = isNumeric_1.isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
          return scheduler.schedule(dispatch, due, {
            index: 0,
            period,
            subscriber
          });
        });
      }
      exports.timer = timer;
      function dispatch(state) {
        var index = state.index, period = state.period, subscriber = state.subscriber;
        subscriber.next(index);
        if (subscriber.closed) {
          return;
        } else if (period === -1) {
          return subscriber.complete();
        }
        state.index = index + 1;
        this.schedule(state, period);
      }
    }
  });

  // node_modules/rxjs/internal/observable/using.js
  var require_using = __commonJS({
    "node_modules/rxjs/internal/observable/using.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var from_1 = require_from();
      var empty_1 = require_empty();
      function using(resourceFactory, observableFactory) {
        return new Observable_1.Observable(function(subscriber) {
          var resource;
          try {
            resource = resourceFactory();
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          var result;
          try {
            result = observableFactory(resource);
          } catch (err) {
            subscriber.error(err);
            return void 0;
          }
          var source = result ? from_1.from(result) : empty_1.EMPTY;
          var subscription = source.subscribe(subscriber);
          return function() {
            subscription.unsubscribe();
            if (resource) {
              resource.unsubscribe();
            }
          };
        });
      }
      exports.using = using;
    }
  });

  // node_modules/rxjs/internal/observable/zip.js
  var require_zip = __commonJS({
    "node_modules/rxjs/internal/observable/zip.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var fromArray_1 = require_fromArray();
      var isArray_1 = require_isArray();
      var Subscriber_1 = require_Subscriber();
      var iterator_1 = require_iterator();
      var innerSubscribe_1 = require_innerSubscribe();
      function zip() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        var resultSelector = observables[observables.length - 1];
        if (typeof resultSelector === "function") {
          observables.pop();
        }
        return fromArray_1.fromArray(observables, void 0).lift(new ZipOperator(resultSelector));
      }
      exports.zip = zip;
      var ZipOperator = function() {
        function ZipOperator2(resultSelector) {
          this.resultSelector = resultSelector;
        }
        ZipOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector));
        };
        return ZipOperator2;
      }();
      exports.ZipOperator = ZipOperator;
      var ZipSubscriber = function(_super) {
        __extends(ZipSubscriber2, _super);
        function ZipSubscriber2(destination, resultSelector, values) {
          if (values === void 0) {
            values = /* @__PURE__ */ Object.create(null);
          }
          var _this = _super.call(this, destination) || this;
          _this.resultSelector = resultSelector;
          _this.iterators = [];
          _this.active = 0;
          _this.resultSelector = typeof resultSelector === "function" ? resultSelector : void 0;
          return _this;
        }
        ZipSubscriber2.prototype._next = function(value) {
          var iterators = this.iterators;
          if (isArray_1.isArray(value)) {
            iterators.push(new StaticArrayIterator(value));
          } else if (typeof value[iterator_1.iterator] === "function") {
            iterators.push(new StaticIterator(value[iterator_1.iterator]()));
          } else {
            iterators.push(new ZipBufferIterator(this.destination, this, value));
          }
        };
        ZipSubscriber2.prototype._complete = function() {
          var iterators = this.iterators;
          var len = iterators.length;
          this.unsubscribe();
          if (len === 0) {
            this.destination.complete();
            return;
          }
          this.active = len;
          for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (iterator.stillUnsubscribed) {
              var destination = this.destination;
              destination.add(iterator.subscribe());
            } else {
              this.active--;
            }
          }
        };
        ZipSubscriber2.prototype.notifyInactive = function() {
          this.active--;
          if (this.active === 0) {
            this.destination.complete();
          }
        };
        ZipSubscriber2.prototype.checkIterators = function() {
          var iterators = this.iterators;
          var len = iterators.length;
          var destination = this.destination;
          for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            if (typeof iterator.hasValue === "function" && !iterator.hasValue()) {
              return;
            }
          }
          var shouldComplete = false;
          var args = [];
          for (var i = 0; i < len; i++) {
            var iterator = iterators[i];
            var result = iterator.next();
            if (iterator.hasCompleted()) {
              shouldComplete = true;
            }
            if (result.done) {
              destination.complete();
              return;
            }
            args.push(result.value);
          }
          if (this.resultSelector) {
            this._tryresultSelector(args);
          } else {
            destination.next(args);
          }
          if (shouldComplete) {
            destination.complete();
          }
        };
        ZipSubscriber2.prototype._tryresultSelector = function(args) {
          var result;
          try {
            result = this.resultSelector.apply(this, args);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        return ZipSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.ZipSubscriber = ZipSubscriber;
      var StaticIterator = function() {
        function StaticIterator2(iterator) {
          this.iterator = iterator;
          this.nextResult = iterator.next();
        }
        StaticIterator2.prototype.hasValue = function() {
          return true;
        };
        StaticIterator2.prototype.next = function() {
          var result = this.nextResult;
          this.nextResult = this.iterator.next();
          return result;
        };
        StaticIterator2.prototype.hasCompleted = function() {
          var nextResult = this.nextResult;
          return Boolean(nextResult && nextResult.done);
        };
        return StaticIterator2;
      }();
      var StaticArrayIterator = function() {
        function StaticArrayIterator2(array) {
          this.array = array;
          this.index = 0;
          this.length = 0;
          this.length = array.length;
        }
        StaticArrayIterator2.prototype[iterator_1.iterator] = function() {
          return this;
        };
        StaticArrayIterator2.prototype.next = function(value) {
          var i = this.index++;
          var array = this.array;
          return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
        };
        StaticArrayIterator2.prototype.hasValue = function() {
          return this.array.length > this.index;
        };
        StaticArrayIterator2.prototype.hasCompleted = function() {
          return this.array.length === this.index;
        };
        return StaticArrayIterator2;
      }();
      var ZipBufferIterator = function(_super) {
        __extends(ZipBufferIterator2, _super);
        function ZipBufferIterator2(destination, parent, observable) {
          var _this = _super.call(this, destination) || this;
          _this.parent = parent;
          _this.observable = observable;
          _this.stillUnsubscribed = true;
          _this.buffer = [];
          _this.isComplete = false;
          return _this;
        }
        ZipBufferIterator2.prototype[iterator_1.iterator] = function() {
          return this;
        };
        ZipBufferIterator2.prototype.next = function() {
          var buffer = this.buffer;
          if (buffer.length === 0 && this.isComplete) {
            return { value: null, done: true };
          } else {
            return { value: buffer.shift(), done: false };
          }
        };
        ZipBufferIterator2.prototype.hasValue = function() {
          return this.buffer.length > 0;
        };
        ZipBufferIterator2.prototype.hasCompleted = function() {
          return this.buffer.length === 0 && this.isComplete;
        };
        ZipBufferIterator2.prototype.notifyComplete = function() {
          if (this.buffer.length > 0) {
            this.isComplete = true;
            this.parent.notifyInactive();
          } else {
            this.destination.complete();
          }
        };
        ZipBufferIterator2.prototype.notifyNext = function(innerValue) {
          this.buffer.push(innerValue);
          this.parent.checkIterators();
        };
        ZipBufferIterator2.prototype.subscribe = function() {
          return innerSubscribe_1.innerSubscribe(this.observable, new innerSubscribe_1.SimpleInnerSubscriber(this));
        };
        return ZipBufferIterator2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/index.js
  var require_rxjs = __commonJS({
    "node_modules/rxjs/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      exports.Observable = Observable_1.Observable;
      var ConnectableObservable_1 = require_ConnectableObservable();
      exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
      var groupBy_1 = require_groupBy();
      exports.GroupedObservable = groupBy_1.GroupedObservable;
      var observable_1 = require_observable();
      exports.observable = observable_1.observable;
      var Subject_1 = require_Subject();
      exports.Subject = Subject_1.Subject;
      var BehaviorSubject_1 = require_BehaviorSubject();
      exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
      var ReplaySubject_1 = require_ReplaySubject();
      exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
      var AsyncSubject_1 = require_AsyncSubject();
      exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
      var asap_1 = require_asap();
      exports.asap = asap_1.asap;
      exports.asapScheduler = asap_1.asapScheduler;
      var async_1 = require_async();
      exports.async = async_1.async;
      exports.asyncScheduler = async_1.asyncScheduler;
      var queue_1 = require_queue();
      exports.queue = queue_1.queue;
      exports.queueScheduler = queue_1.queueScheduler;
      var animationFrame_1 = require_animationFrame();
      exports.animationFrame = animationFrame_1.animationFrame;
      exports.animationFrameScheduler = animationFrame_1.animationFrameScheduler;
      var VirtualTimeScheduler_1 = require_VirtualTimeScheduler();
      exports.VirtualTimeScheduler = VirtualTimeScheduler_1.VirtualTimeScheduler;
      exports.VirtualAction = VirtualTimeScheduler_1.VirtualAction;
      var Scheduler_1 = require_Scheduler();
      exports.Scheduler = Scheduler_1.Scheduler;
      var Subscription_1 = require_Subscription();
      exports.Subscription = Subscription_1.Subscription;
      var Subscriber_1 = require_Subscriber();
      exports.Subscriber = Subscriber_1.Subscriber;
      var Notification_1 = require_Notification();
      exports.Notification = Notification_1.Notification;
      exports.NotificationKind = Notification_1.NotificationKind;
      var pipe_1 = require_pipe();
      exports.pipe = pipe_1.pipe;
      var noop_1 = require_noop();
      exports.noop = noop_1.noop;
      var identity_1 = require_identity();
      exports.identity = identity_1.identity;
      var isObservable_1 = require_isObservable();
      exports.isObservable = isObservable_1.isObservable;
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
      var EmptyError_1 = require_EmptyError();
      exports.EmptyError = EmptyError_1.EmptyError;
      var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
      exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
      var UnsubscriptionError_1 = require_UnsubscriptionError();
      exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
      var TimeoutError_1 = require_TimeoutError();
      exports.TimeoutError = TimeoutError_1.TimeoutError;
      var bindCallback_1 = require_bindCallback();
      exports.bindCallback = bindCallback_1.bindCallback;
      var bindNodeCallback_1 = require_bindNodeCallback();
      exports.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;
      var combineLatest_1 = require_combineLatest();
      exports.combineLatest = combineLatest_1.combineLatest;
      var concat_1 = require_concat();
      exports.concat = concat_1.concat;
      var defer_1 = require_defer();
      exports.defer = defer_1.defer;
      var empty_1 = require_empty();
      exports.empty = empty_1.empty;
      var forkJoin_1 = require_forkJoin();
      exports.forkJoin = forkJoin_1.forkJoin;
      var from_1 = require_from();
      exports.from = from_1.from;
      var fromEvent_1 = require_fromEvent();
      exports.fromEvent = fromEvent_1.fromEvent;
      var fromEventPattern_1 = require_fromEventPattern();
      exports.fromEventPattern = fromEventPattern_1.fromEventPattern;
      var generate_1 = require_generate();
      exports.generate = generate_1.generate;
      var iif_1 = require_iif();
      exports.iif = iif_1.iif;
      var interval_1 = require_interval();
      exports.interval = interval_1.interval;
      var merge_1 = require_merge();
      exports.merge = merge_1.merge;
      var never_1 = require_never();
      exports.never = never_1.never;
      var of_1 = require_of();
      exports.of = of_1.of;
      var onErrorResumeNext_1 = require_onErrorResumeNext();
      exports.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
      var pairs_1 = require_pairs();
      exports.pairs = pairs_1.pairs;
      var partition_1 = require_partition();
      exports.partition = partition_1.partition;
      var race_1 = require_race();
      exports.race = race_1.race;
      var range_1 = require_range();
      exports.range = range_1.range;
      var throwError_1 = require_throwError();
      exports.throwError = throwError_1.throwError;
      var timer_1 = require_timer();
      exports.timer = timer_1.timer;
      var using_1 = require_using();
      exports.using = using_1.using;
      var zip_1 = require_zip();
      exports.zip = zip_1.zip;
      var scheduled_1 = require_scheduled();
      exports.scheduled = scheduled_1.scheduled;
      var empty_2 = require_empty();
      exports.EMPTY = empty_2.EMPTY;
      var never_2 = require_never();
      exports.NEVER = never_2.NEVER;
      var config_1 = require_config();
      exports.config = config_1.config;
    }
  });

  // node_modules/rxjs/internal/operators/audit.js
  var require_audit = __commonJS({
    "node_modules/rxjs/internal/operators/audit.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function audit(durationSelector) {
        return function auditOperatorFunction(source) {
          return source.lift(new AuditOperator(durationSelector));
        };
      }
      exports.audit = audit;
      var AuditOperator = function() {
        function AuditOperator2(durationSelector) {
          this.durationSelector = durationSelector;
        }
        AuditOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
        };
        return AuditOperator2;
      }();
      var AuditSubscriber = function(_super) {
        __extends(AuditSubscriber2, _super);
        function AuditSubscriber2(destination, durationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.durationSelector = durationSelector;
          _this.hasValue = false;
          return _this;
        }
        AuditSubscriber2.prototype._next = function(value) {
          this.value = value;
          this.hasValue = true;
          if (!this.throttled) {
            var duration = void 0;
            try {
              var durationSelector = this.durationSelector;
              duration = durationSelector(value);
            } catch (err) {
              return this.destination.error(err);
            }
            var innerSubscription = innerSubscribe_1.innerSubscribe(duration, new innerSubscribe_1.SimpleInnerSubscriber(this));
            if (!innerSubscription || innerSubscription.closed) {
              this.clearThrottle();
            } else {
              this.add(this.throttled = innerSubscription);
            }
          }
        };
        AuditSubscriber2.prototype.clearThrottle = function() {
          var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
          if (throttled) {
            this.remove(throttled);
            this.throttled = void 0;
            throttled.unsubscribe();
          }
          if (hasValue) {
            this.value = void 0;
            this.hasValue = false;
            this.destination.next(value);
          }
        };
        AuditSubscriber2.prototype.notifyNext = function() {
          this.clearThrottle();
        };
        AuditSubscriber2.prototype.notifyComplete = function() {
          this.clearThrottle();
        };
        return AuditSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/auditTime.js
  var require_auditTime = __commonJS({
    "node_modules/rxjs/internal/operators/auditTime.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var audit_1 = require_audit();
      var timer_1 = require_timer();
      function auditTime(duration, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return audit_1.audit(function() {
          return timer_1.timer(duration, scheduler);
        });
      }
      exports.auditTime = auditTime;
    }
  });

  // node_modules/rxjs/internal/operators/buffer.js
  var require_buffer = __commonJS({
    "node_modules/rxjs/internal/operators/buffer.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function buffer(closingNotifier) {
        return function bufferOperatorFunction(source) {
          return source.lift(new BufferOperator(closingNotifier));
        };
      }
      exports.buffer = buffer;
      var BufferOperator = function() {
        function BufferOperator2(closingNotifier) {
          this.closingNotifier = closingNotifier;
        }
        BufferOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
        };
        return BufferOperator2;
      }();
      var BufferSubscriber = function(_super) {
        __extends(BufferSubscriber2, _super);
        function BufferSubscriber2(destination, closingNotifier) {
          var _this = _super.call(this, destination) || this;
          _this.buffer = [];
          _this.add(innerSubscribe_1.innerSubscribe(closingNotifier, new innerSubscribe_1.SimpleInnerSubscriber(_this)));
          return _this;
        }
        BufferSubscriber2.prototype._next = function(value) {
          this.buffer.push(value);
        };
        BufferSubscriber2.prototype.notifyNext = function() {
          var buffer2 = this.buffer;
          this.buffer = [];
          this.destination.next(buffer2);
        };
        return BufferSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/bufferCount.js
  var require_bufferCount = __commonJS({
    "node_modules/rxjs/internal/operators/bufferCount.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function bufferCount(bufferSize, startBufferEvery) {
        if (startBufferEvery === void 0) {
          startBufferEvery = null;
        }
        return function bufferCountOperatorFunction(source) {
          return source.lift(new BufferCountOperator(bufferSize, startBufferEvery));
        };
      }
      exports.bufferCount = bufferCount;
      var BufferCountOperator = function() {
        function BufferCountOperator2(bufferSize, startBufferEvery) {
          this.bufferSize = bufferSize;
          this.startBufferEvery = startBufferEvery;
          if (!startBufferEvery || bufferSize === startBufferEvery) {
            this.subscriberClass = BufferCountSubscriber;
          } else {
            this.subscriberClass = BufferSkipCountSubscriber;
          }
        }
        BufferCountOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
        };
        return BufferCountOperator2;
      }();
      var BufferCountSubscriber = function(_super) {
        __extends(BufferCountSubscriber2, _super);
        function BufferCountSubscriber2(destination, bufferSize) {
          var _this = _super.call(this, destination) || this;
          _this.bufferSize = bufferSize;
          _this.buffer = [];
          return _this;
        }
        BufferCountSubscriber2.prototype._next = function(value) {
          var buffer = this.buffer;
          buffer.push(value);
          if (buffer.length == this.bufferSize) {
            this.destination.next(buffer);
            this.buffer = [];
          }
        };
        BufferCountSubscriber2.prototype._complete = function() {
          var buffer = this.buffer;
          if (buffer.length > 0) {
            this.destination.next(buffer);
          }
          _super.prototype._complete.call(this);
        };
        return BufferCountSubscriber2;
      }(Subscriber_1.Subscriber);
      var BufferSkipCountSubscriber = function(_super) {
        __extends(BufferSkipCountSubscriber2, _super);
        function BufferSkipCountSubscriber2(destination, bufferSize, startBufferEvery) {
          var _this = _super.call(this, destination) || this;
          _this.bufferSize = bufferSize;
          _this.startBufferEvery = startBufferEvery;
          _this.buffers = [];
          _this.count = 0;
          return _this;
        }
        BufferSkipCountSubscriber2.prototype._next = function(value) {
          var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
          this.count++;
          if (count % startBufferEvery === 0) {
            buffers.push([]);
          }
          for (var i = buffers.length; i--; ) {
            var buffer = buffers[i];
            buffer.push(value);
            if (buffer.length === bufferSize) {
              buffers.splice(i, 1);
              this.destination.next(buffer);
            }
          }
        };
        BufferSkipCountSubscriber2.prototype._complete = function() {
          var _a = this, buffers = _a.buffers, destination = _a.destination;
          while (buffers.length > 0) {
            var buffer = buffers.shift();
            if (buffer.length > 0) {
              destination.next(buffer);
            }
          }
          _super.prototype._complete.call(this);
        };
        return BufferSkipCountSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/bufferTime.js
  var require_bufferTime = __commonJS({
    "node_modules/rxjs/internal/operators/bufferTime.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var Subscriber_1 = require_Subscriber();
      var isScheduler_1 = require_isScheduler();
      function bufferTime(bufferTimeSpan) {
        var length = arguments.length;
        var scheduler = async_1.async;
        if (isScheduler_1.isScheduler(arguments[arguments.length - 1])) {
          scheduler = arguments[arguments.length - 1];
          length--;
        }
        var bufferCreationInterval = null;
        if (length >= 2) {
          bufferCreationInterval = arguments[1];
        }
        var maxBufferSize = Number.POSITIVE_INFINITY;
        if (length >= 3) {
          maxBufferSize = arguments[2];
        }
        return function bufferTimeOperatorFunction(source) {
          return source.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
        };
      }
      exports.bufferTime = bufferTime;
      var BufferTimeOperator = function() {
        function BufferTimeOperator2(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
          this.bufferTimeSpan = bufferTimeSpan;
          this.bufferCreationInterval = bufferCreationInterval;
          this.maxBufferSize = maxBufferSize;
          this.scheduler = scheduler;
        }
        BufferTimeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
        };
        return BufferTimeOperator2;
      }();
      var Context = /* @__PURE__ */ function() {
        function Context2() {
          this.buffer = [];
        }
        return Context2;
      }();
      var BufferTimeSubscriber = function(_super) {
        __extends(BufferTimeSubscriber2, _super);
        function BufferTimeSubscriber2(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.bufferTimeSpan = bufferTimeSpan;
          _this.bufferCreationInterval = bufferCreationInterval;
          _this.maxBufferSize = maxBufferSize;
          _this.scheduler = scheduler;
          _this.contexts = [];
          var context = _this.openContext();
          _this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
          if (_this.timespanOnly) {
            var timeSpanOnlyState = { subscriber: _this, context, bufferTimeSpan };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
          } else {
            var closeState = { subscriber: _this, context };
            var creationState = { bufferTimeSpan, bufferCreationInterval, subscriber: _this, scheduler };
            _this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
          }
          return _this;
        }
        BufferTimeSubscriber2.prototype._next = function(value) {
          var contexts = this.contexts;
          var len = contexts.length;
          var filledBufferContext;
          for (var i = 0; i < len; i++) {
            var context_1 = contexts[i];
            var buffer = context_1.buffer;
            buffer.push(value);
            if (buffer.length == this.maxBufferSize) {
              filledBufferContext = context_1;
            }
          }
          if (filledBufferContext) {
            this.onBufferFull(filledBufferContext);
          }
        };
        BufferTimeSubscriber2.prototype._error = function(err) {
          this.contexts.length = 0;
          _super.prototype._error.call(this, err);
        };
        BufferTimeSubscriber2.prototype._complete = function() {
          var _a = this, contexts = _a.contexts, destination = _a.destination;
          while (contexts.length > 0) {
            var context_2 = contexts.shift();
            destination.next(context_2.buffer);
          }
          _super.prototype._complete.call(this);
        };
        BufferTimeSubscriber2.prototype._unsubscribe = function() {
          this.contexts = null;
        };
        BufferTimeSubscriber2.prototype.onBufferFull = function(context) {
          this.closeContext(context);
          var closeAction = context.closeAction;
          closeAction.unsubscribe();
          this.remove(closeAction);
          if (!this.closed && this.timespanOnly) {
            context = this.openContext();
            var bufferTimeSpan = this.bufferTimeSpan;
            var timeSpanOnlyState = { subscriber: this, context, bufferTimeSpan };
            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
          }
        };
        BufferTimeSubscriber2.prototype.openContext = function() {
          var context = new Context();
          this.contexts.push(context);
          return context;
        };
        BufferTimeSubscriber2.prototype.closeContext = function(context) {
          this.destination.next(context.buffer);
          var contexts = this.contexts;
          var spliceIndex = contexts ? contexts.indexOf(context) : -1;
          if (spliceIndex >= 0) {
            contexts.splice(contexts.indexOf(context), 1);
          }
        };
        return BufferTimeSubscriber2;
      }(Subscriber_1.Subscriber);
      function dispatchBufferTimeSpanOnly(state) {
        var subscriber = state.subscriber;
        var prevContext = state.context;
        if (prevContext) {
          subscriber.closeContext(prevContext);
        }
        if (!subscriber.closed) {
          state.context = subscriber.openContext();
          state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
        }
      }
      function dispatchBufferCreation(state) {
        var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
        var context = subscriber.openContext();
        var action = this;
        if (!subscriber.closed) {
          subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber, context }));
          action.schedule(state, bufferCreationInterval);
        }
      }
      function dispatchBufferClose(arg) {
        var subscriber = arg.subscriber, context = arg.context;
        subscriber.closeContext(context);
      }
    }
  });

  // node_modules/rxjs/internal/operators/bufferToggle.js
  var require_bufferToggle = __commonJS({
    "node_modules/rxjs/internal/operators/bufferToggle.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscription_1 = require_Subscription();
      var subscribeToResult_1 = require_subscribeToResult();
      var OuterSubscriber_1 = require_OuterSubscriber();
      function bufferToggle(openings, closingSelector) {
        return function bufferToggleOperatorFunction(source) {
          return source.lift(new BufferToggleOperator(openings, closingSelector));
        };
      }
      exports.bufferToggle = bufferToggle;
      var BufferToggleOperator = function() {
        function BufferToggleOperator2(openings, closingSelector) {
          this.openings = openings;
          this.closingSelector = closingSelector;
        }
        BufferToggleOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
        };
        return BufferToggleOperator2;
      }();
      var BufferToggleSubscriber = function(_super) {
        __extends(BufferToggleSubscriber2, _super);
        function BufferToggleSubscriber2(destination, openings, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.closingSelector = closingSelector;
          _this.contexts = [];
          _this.add(subscribeToResult_1.subscribeToResult(_this, openings));
          return _this;
        }
        BufferToggleSubscriber2.prototype._next = function(value) {
          var contexts = this.contexts;
          var len = contexts.length;
          for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
          }
        };
        BufferToggleSubscriber2.prototype._error = function(err) {
          var contexts = this.contexts;
          while (contexts.length > 0) {
            var context_1 = contexts.shift();
            context_1.subscription.unsubscribe();
            context_1.buffer = null;
            context_1.subscription = null;
          }
          this.contexts = null;
          _super.prototype._error.call(this, err);
        };
        BufferToggleSubscriber2.prototype._complete = function() {
          var contexts = this.contexts;
          while (contexts.length > 0) {
            var context_2 = contexts.shift();
            this.destination.next(context_2.buffer);
            context_2.subscription.unsubscribe();
            context_2.buffer = null;
            context_2.subscription = null;
          }
          this.contexts = null;
          _super.prototype._complete.call(this);
        };
        BufferToggleSubscriber2.prototype.notifyNext = function(outerValue, innerValue) {
          outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
        };
        BufferToggleSubscriber2.prototype.notifyComplete = function(innerSub) {
          this.closeBuffer(innerSub.context);
        };
        BufferToggleSubscriber2.prototype.openBuffer = function(value) {
          try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
              this.trySubscribe(closingNotifier);
            }
          } catch (err) {
            this._error(err);
          }
        };
        BufferToggleSubscriber2.prototype.closeBuffer = function(context) {
          var contexts = this.contexts;
          if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
          }
        };
        BufferToggleSubscriber2.prototype.trySubscribe = function(closingNotifier) {
          var contexts = this.contexts;
          var buffer = [];
          var subscription = new Subscription_1.Subscription();
          var context = { buffer, subscription };
          contexts.push(context);
          var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
          if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
          } else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
          }
        };
        return BufferToggleSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/bufferWhen.js
  var require_bufferWhen = __commonJS({
    "node_modules/rxjs/internal/operators/bufferWhen.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscription_1 = require_Subscription();
      var innerSubscribe_1 = require_innerSubscribe();
      function bufferWhen(closingSelector) {
        return function(source) {
          return source.lift(new BufferWhenOperator(closingSelector));
        };
      }
      exports.bufferWhen = bufferWhen;
      var BufferWhenOperator = function() {
        function BufferWhenOperator2(closingSelector) {
          this.closingSelector = closingSelector;
        }
        BufferWhenOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
        };
        return BufferWhenOperator2;
      }();
      var BufferWhenSubscriber = function(_super) {
        __extends(BufferWhenSubscriber2, _super);
        function BufferWhenSubscriber2(destination, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.closingSelector = closingSelector;
          _this.subscribing = false;
          _this.openBuffer();
          return _this;
        }
        BufferWhenSubscriber2.prototype._next = function(value) {
          this.buffer.push(value);
        };
        BufferWhenSubscriber2.prototype._complete = function() {
          var buffer = this.buffer;
          if (buffer) {
            this.destination.next(buffer);
          }
          _super.prototype._complete.call(this);
        };
        BufferWhenSubscriber2.prototype._unsubscribe = function() {
          this.buffer = void 0;
          this.subscribing = false;
        };
        BufferWhenSubscriber2.prototype.notifyNext = function() {
          this.openBuffer();
        };
        BufferWhenSubscriber2.prototype.notifyComplete = function() {
          if (this.subscribing) {
            this.complete();
          } else {
            this.openBuffer();
          }
        };
        BufferWhenSubscriber2.prototype.openBuffer = function() {
          var closingSubscription = this.closingSubscription;
          if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
          }
          var buffer = this.buffer;
          if (this.buffer) {
            this.destination.next(buffer);
          }
          this.buffer = [];
          var closingNotifier;
          try {
            var closingSelector = this.closingSelector;
            closingNotifier = closingSelector();
          } catch (err) {
            return this.error(err);
          }
          closingSubscription = new Subscription_1.Subscription();
          this.closingSubscription = closingSubscription;
          this.add(closingSubscription);
          this.subscribing = true;
          closingSubscription.add(innerSubscribe_1.innerSubscribe(closingNotifier, new innerSubscribe_1.SimpleInnerSubscriber(this)));
          this.subscribing = false;
        };
        return BufferWhenSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/catchError.js
  var require_catchError = __commonJS({
    "node_modules/rxjs/internal/operators/catchError.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function catchError(selector) {
        return function catchErrorOperatorFunction(source) {
          var operator = new CatchOperator(selector);
          var caught = source.lift(operator);
          return operator.caught = caught;
        };
      }
      exports.catchError = catchError;
      var CatchOperator = function() {
        function CatchOperator2(selector) {
          this.selector = selector;
        }
        CatchOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
        };
        return CatchOperator2;
      }();
      var CatchSubscriber = function(_super) {
        __extends(CatchSubscriber2, _super);
        function CatchSubscriber2(destination, selector, caught) {
          var _this = _super.call(this, destination) || this;
          _this.selector = selector;
          _this.caught = caught;
          return _this;
        }
        CatchSubscriber2.prototype.error = function(err) {
          if (!this.isStopped) {
            var result = void 0;
            try {
              result = this.selector(err, this.caught);
            } catch (err2) {
              _super.prototype.error.call(this, err2);
              return;
            }
            this._unsubscribeAndRecycle();
            var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
            this.add(innerSubscriber);
            var innerSubscription = innerSubscribe_1.innerSubscribe(result, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
              this.add(innerSubscription);
            }
          }
        };
        return CatchSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/combineAll.js
  var require_combineAll = __commonJS({
    "node_modules/rxjs/internal/operators/combineAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var combineLatest_1 = require_combineLatest();
      function combineAll(project) {
        return function(source) {
          return source.lift(new combineLatest_1.CombineLatestOperator(project));
        };
      }
      exports.combineAll = combineAll;
    }
  });

  // node_modules/rxjs/internal/operators/combineLatest.js
  var require_combineLatest2 = __commonJS({
    "node_modules/rxjs/internal/operators/combineLatest.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isArray_1 = require_isArray();
      var combineLatest_1 = require_combineLatest();
      var from_1 = require_from();
      function combineLatest() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        var project = null;
        if (typeof observables[observables.length - 1] === "function") {
          project = observables.pop();
        }
        if (observables.length === 1 && isArray_1.isArray(observables[0])) {
          observables = observables[0].slice();
        }
        return function(source) {
          return source.lift.call(from_1.from([source].concat(observables)), new combineLatest_1.CombineLatestOperator(project));
        };
      }
      exports.combineLatest = combineLatest;
    }
  });

  // node_modules/rxjs/internal/operators/concat.js
  var require_concat2 = __commonJS({
    "node_modules/rxjs/internal/operators/concat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var concat_1 = require_concat();
      function concat() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        return function(source) {
          return source.lift.call(concat_1.concat.apply(void 0, [source].concat(observables)));
        };
      }
      exports.concat = concat;
    }
  });

  // node_modules/rxjs/internal/operators/concatMap.js
  var require_concatMap = __commonJS({
    "node_modules/rxjs/internal/operators/concatMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var mergeMap_1 = require_mergeMap();
      function concatMap(project, resultSelector) {
        return mergeMap_1.mergeMap(project, resultSelector, 1);
      }
      exports.concatMap = concatMap;
    }
  });

  // node_modules/rxjs/internal/operators/concatMapTo.js
  var require_concatMapTo = __commonJS({
    "node_modules/rxjs/internal/operators/concatMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var concatMap_1 = require_concatMap();
      function concatMapTo(innerObservable, resultSelector) {
        return concatMap_1.concatMap(function() {
          return innerObservable;
        }, resultSelector);
      }
      exports.concatMapTo = concatMapTo;
    }
  });

  // node_modules/rxjs/internal/operators/count.js
  var require_count = __commonJS({
    "node_modules/rxjs/internal/operators/count.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function count(predicate) {
        return function(source) {
          return source.lift(new CountOperator(predicate, source));
        };
      }
      exports.count = count;
      var CountOperator = function() {
        function CountOperator2(predicate, source) {
          this.predicate = predicate;
          this.source = source;
        }
        CountOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
        };
        return CountOperator2;
      }();
      var CountSubscriber = function(_super) {
        __extends(CountSubscriber2, _super);
        function CountSubscriber2(destination, predicate, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.count = 0;
          _this.index = 0;
          return _this;
        }
        CountSubscriber2.prototype._next = function(value) {
          if (this.predicate) {
            this._tryPredicate(value);
          } else {
            this.count++;
          }
        };
        CountSubscriber2.prototype._tryPredicate = function(value) {
          var result;
          try {
            result = this.predicate(value, this.index++, this.source);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          if (result) {
            this.count++;
          }
        };
        CountSubscriber2.prototype._complete = function() {
          this.destination.next(this.count);
          this.destination.complete();
        };
        return CountSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/debounce.js
  var require_debounce = __commonJS({
    "node_modules/rxjs/internal/operators/debounce.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function debounce(durationSelector) {
        return function(source) {
          return source.lift(new DebounceOperator(durationSelector));
        };
      }
      exports.debounce = debounce;
      var DebounceOperator = function() {
        function DebounceOperator2(durationSelector) {
          this.durationSelector = durationSelector;
        }
        DebounceOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
        };
        return DebounceOperator2;
      }();
      var DebounceSubscriber = function(_super) {
        __extends(DebounceSubscriber2, _super);
        function DebounceSubscriber2(destination, durationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.durationSelector = durationSelector;
          _this.hasValue = false;
          return _this;
        }
        DebounceSubscriber2.prototype._next = function(value) {
          try {
            var result = this.durationSelector.call(this, value);
            if (result) {
              this._tryNext(value, result);
            }
          } catch (err) {
            this.destination.error(err);
          }
        };
        DebounceSubscriber2.prototype._complete = function() {
          this.emitValue();
          this.destination.complete();
        };
        DebounceSubscriber2.prototype._tryNext = function(value, duration) {
          var subscription = this.durationSubscription;
          this.value = value;
          this.hasValue = true;
          if (subscription) {
            subscription.unsubscribe();
            this.remove(subscription);
          }
          subscription = innerSubscribe_1.innerSubscribe(duration, new innerSubscribe_1.SimpleInnerSubscriber(this));
          if (subscription && !subscription.closed) {
            this.add(this.durationSubscription = subscription);
          }
        };
        DebounceSubscriber2.prototype.notifyNext = function() {
          this.emitValue();
        };
        DebounceSubscriber2.prototype.notifyComplete = function() {
          this.emitValue();
        };
        DebounceSubscriber2.prototype.emitValue = function() {
          if (this.hasValue) {
            var value = this.value;
            var subscription = this.durationSubscription;
            if (subscription) {
              this.durationSubscription = void 0;
              subscription.unsubscribe();
              this.remove(subscription);
            }
            this.value = void 0;
            this.hasValue = false;
            _super.prototype._next.call(this, value);
          }
        };
        return DebounceSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/debounceTime.js
  var require_debounceTime = __commonJS({
    "node_modules/rxjs/internal/operators/debounceTime.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var async_1 = require_async();
      function debounceTime(dueTime, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return function(source) {
          return source.lift(new DebounceTimeOperator(dueTime, scheduler));
        };
      }
      exports.debounceTime = debounceTime;
      var DebounceTimeOperator = function() {
        function DebounceTimeOperator2(dueTime, scheduler) {
          this.dueTime = dueTime;
          this.scheduler = scheduler;
        }
        DebounceTimeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
        };
        return DebounceTimeOperator2;
      }();
      var DebounceTimeSubscriber = function(_super) {
        __extends(DebounceTimeSubscriber2, _super);
        function DebounceTimeSubscriber2(destination, dueTime, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.dueTime = dueTime;
          _this.scheduler = scheduler;
          _this.debouncedSubscription = null;
          _this.lastValue = null;
          _this.hasValue = false;
          return _this;
        }
        DebounceTimeSubscriber2.prototype._next = function(value) {
          this.clearDebounce();
          this.lastValue = value;
          this.hasValue = true;
          this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
        };
        DebounceTimeSubscriber2.prototype._complete = function() {
          this.debouncedNext();
          this.destination.complete();
        };
        DebounceTimeSubscriber2.prototype.debouncedNext = function() {
          this.clearDebounce();
          if (this.hasValue) {
            var lastValue = this.lastValue;
            this.lastValue = null;
            this.hasValue = false;
            this.destination.next(lastValue);
          }
        };
        DebounceTimeSubscriber2.prototype.clearDebounce = function() {
          var debouncedSubscription = this.debouncedSubscription;
          if (debouncedSubscription !== null) {
            this.remove(debouncedSubscription);
            debouncedSubscription.unsubscribe();
            this.debouncedSubscription = null;
          }
        };
        return DebounceTimeSubscriber2;
      }(Subscriber_1.Subscriber);
      function dispatchNext(subscriber) {
        subscriber.debouncedNext();
      }
    }
  });

  // node_modules/rxjs/internal/operators/defaultIfEmpty.js
  var require_defaultIfEmpty = __commonJS({
    "node_modules/rxjs/internal/operators/defaultIfEmpty.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function defaultIfEmpty(defaultValue) {
        if (defaultValue === void 0) {
          defaultValue = null;
        }
        return function(source) {
          return source.lift(new DefaultIfEmptyOperator(defaultValue));
        };
      }
      exports.defaultIfEmpty = defaultIfEmpty;
      var DefaultIfEmptyOperator = function() {
        function DefaultIfEmptyOperator2(defaultValue) {
          this.defaultValue = defaultValue;
        }
        DefaultIfEmptyOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
        };
        return DefaultIfEmptyOperator2;
      }();
      var DefaultIfEmptySubscriber = function(_super) {
        __extends(DefaultIfEmptySubscriber2, _super);
        function DefaultIfEmptySubscriber2(destination, defaultValue) {
          var _this = _super.call(this, destination) || this;
          _this.defaultValue = defaultValue;
          _this.isEmpty = true;
          return _this;
        }
        DefaultIfEmptySubscriber2.prototype._next = function(value) {
          this.isEmpty = false;
          this.destination.next(value);
        };
        DefaultIfEmptySubscriber2.prototype._complete = function() {
          if (this.isEmpty) {
            this.destination.next(this.defaultValue);
          }
          this.destination.complete();
        };
        return DefaultIfEmptySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/util/isDate.js
  var require_isDate = __commonJS({
    "node_modules/rxjs/internal/util/isDate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isDate(value) {
        return value instanceof Date && !isNaN(+value);
      }
      exports.isDate = isDate;
    }
  });

  // node_modules/rxjs/internal/operators/delay.js
  var require_delay = __commonJS({
    "node_modules/rxjs/internal/operators/delay.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var isDate_1 = require_isDate();
      var Subscriber_1 = require_Subscriber();
      var Notification_1 = require_Notification();
      function delay(delay2, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        var absoluteDelay = isDate_1.isDate(delay2);
        var delayFor = absoluteDelay ? +delay2 - scheduler.now() : Math.abs(delay2);
        return function(source) {
          return source.lift(new DelayOperator(delayFor, scheduler));
        };
      }
      exports.delay = delay;
      var DelayOperator = function() {
        function DelayOperator2(delay2, scheduler) {
          this.delay = delay2;
          this.scheduler = scheduler;
        }
        DelayOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
        };
        return DelayOperator2;
      }();
      var DelaySubscriber = function(_super) {
        __extends(DelaySubscriber2, _super);
        function DelaySubscriber2(destination, delay2, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.delay = delay2;
          _this.scheduler = scheduler;
          _this.queue = [];
          _this.active = false;
          _this.errored = false;
          return _this;
        }
        DelaySubscriber2.dispatch = function(state) {
          var source = state.source;
          var queue = source.queue;
          var scheduler = state.scheduler;
          var destination = state.destination;
          while (queue.length > 0 && queue[0].time - scheduler.now() <= 0) {
            queue.shift().notification.observe(destination);
          }
          if (queue.length > 0) {
            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
            this.schedule(state, delay_1);
          } else {
            this.unsubscribe();
            source.active = false;
          }
        };
        DelaySubscriber2.prototype._schedule = function(scheduler) {
          this.active = true;
          var destination = this.destination;
          destination.add(scheduler.schedule(DelaySubscriber2.dispatch, this.delay, {
            source: this,
            destination: this.destination,
            scheduler
          }));
        };
        DelaySubscriber2.prototype.scheduleNotification = function(notification) {
          if (this.errored === true) {
            return;
          }
          var scheduler = this.scheduler;
          var message = new DelayMessage(scheduler.now() + this.delay, notification);
          this.queue.push(message);
          if (this.active === false) {
            this._schedule(scheduler);
          }
        };
        DelaySubscriber2.prototype._next = function(value) {
          this.scheduleNotification(Notification_1.Notification.createNext(value));
        };
        DelaySubscriber2.prototype._error = function(err) {
          this.errored = true;
          this.queue = [];
          this.destination.error(err);
          this.unsubscribe();
        };
        DelaySubscriber2.prototype._complete = function() {
          this.scheduleNotification(Notification_1.Notification.createComplete());
          this.unsubscribe();
        };
        return DelaySubscriber2;
      }(Subscriber_1.Subscriber);
      var DelayMessage = /* @__PURE__ */ function() {
        function DelayMessage2(time, notification) {
          this.time = time;
          this.notification = notification;
        }
        return DelayMessage2;
      }();
    }
  });

  // node_modules/rxjs/internal/operators/delayWhen.js
  var require_delayWhen = __commonJS({
    "node_modules/rxjs/internal/operators/delayWhen.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Observable_1 = require_Observable();
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
          return function(source) {
            return new SubscriptionDelayObservable(source, subscriptionDelay).lift(new DelayWhenOperator(delayDurationSelector));
          };
        }
        return function(source) {
          return source.lift(new DelayWhenOperator(delayDurationSelector));
        };
      }
      exports.delayWhen = delayWhen;
      var DelayWhenOperator = function() {
        function DelayWhenOperator2(delayDurationSelector) {
          this.delayDurationSelector = delayDurationSelector;
        }
        DelayWhenOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
        };
        return DelayWhenOperator2;
      }();
      var DelayWhenSubscriber = function(_super) {
        __extends(DelayWhenSubscriber2, _super);
        function DelayWhenSubscriber2(destination, delayDurationSelector) {
          var _this = _super.call(this, destination) || this;
          _this.delayDurationSelector = delayDurationSelector;
          _this.completed = false;
          _this.delayNotifierSubscriptions = [];
          _this.index = 0;
          return _this;
        }
        DelayWhenSubscriber2.prototype.notifyNext = function(outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
          this.destination.next(outerValue);
          this.removeSubscription(innerSub);
          this.tryComplete();
        };
        DelayWhenSubscriber2.prototype.notifyError = function(error, innerSub) {
          this._error(error);
        };
        DelayWhenSubscriber2.prototype.notifyComplete = function(innerSub) {
          var value = this.removeSubscription(innerSub);
          if (value) {
            this.destination.next(value);
          }
          this.tryComplete();
        };
        DelayWhenSubscriber2.prototype._next = function(value) {
          var index = this.index++;
          try {
            var delayNotifier = this.delayDurationSelector(value, index);
            if (delayNotifier) {
              this.tryDelay(delayNotifier, value);
            }
          } catch (err) {
            this.destination.error(err);
          }
        };
        DelayWhenSubscriber2.prototype._complete = function() {
          this.completed = true;
          this.tryComplete();
          this.unsubscribe();
        };
        DelayWhenSubscriber2.prototype.removeSubscription = function(subscription) {
          subscription.unsubscribe();
          var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
          if (subscriptionIdx !== -1) {
            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
          }
          return subscription.outerValue;
        };
        DelayWhenSubscriber2.prototype.tryDelay = function(delayNotifier, value) {
          var notifierSubscription = subscribeToResult_1.subscribeToResult(this, delayNotifier, value);
          if (notifierSubscription && !notifierSubscription.closed) {
            var destination = this.destination;
            destination.add(notifierSubscription);
            this.delayNotifierSubscriptions.push(notifierSubscription);
          }
        };
        DelayWhenSubscriber2.prototype.tryComplete = function() {
          if (this.completed && this.delayNotifierSubscriptions.length === 0) {
            this.destination.complete();
          }
        };
        return DelayWhenSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
      var SubscriptionDelayObservable = function(_super) {
        __extends(SubscriptionDelayObservable2, _super);
        function SubscriptionDelayObservable2(source, subscriptionDelay) {
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.subscriptionDelay = subscriptionDelay;
          return _this;
        }
        SubscriptionDelayObservable2.prototype._subscribe = function(subscriber) {
          this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
        };
        return SubscriptionDelayObservable2;
      }(Observable_1.Observable);
      var SubscriptionDelaySubscriber = function(_super) {
        __extends(SubscriptionDelaySubscriber2, _super);
        function SubscriptionDelaySubscriber2(parent, source) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          _this.source = source;
          _this.sourceSubscribed = false;
          return _this;
        }
        SubscriptionDelaySubscriber2.prototype._next = function(unused) {
          this.subscribeToSource();
        };
        SubscriptionDelaySubscriber2.prototype._error = function(err) {
          this.unsubscribe();
          this.parent.error(err);
        };
        SubscriptionDelaySubscriber2.prototype._complete = function() {
          this.unsubscribe();
          this.subscribeToSource();
        };
        SubscriptionDelaySubscriber2.prototype.subscribeToSource = function() {
          if (!this.sourceSubscribed) {
            this.sourceSubscribed = true;
            this.unsubscribe();
            this.source.subscribe(this.parent);
          }
        };
        return SubscriptionDelaySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/dematerialize.js
  var require_dematerialize = __commonJS({
    "node_modules/rxjs/internal/operators/dematerialize.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function dematerialize() {
        return function dematerializeOperatorFunction(source) {
          return source.lift(new DeMaterializeOperator());
        };
      }
      exports.dematerialize = dematerialize;
      var DeMaterializeOperator = function() {
        function DeMaterializeOperator2() {
        }
        DeMaterializeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DeMaterializeSubscriber(subscriber));
        };
        return DeMaterializeOperator2;
      }();
      var DeMaterializeSubscriber = function(_super) {
        __extends(DeMaterializeSubscriber2, _super);
        function DeMaterializeSubscriber2(destination) {
          return _super.call(this, destination) || this;
        }
        DeMaterializeSubscriber2.prototype._next = function(value) {
          value.observe(this.destination);
        };
        return DeMaterializeSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/distinct.js
  var require_distinct = __commonJS({
    "node_modules/rxjs/internal/operators/distinct.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function distinct(keySelector, flushes) {
        return function(source) {
          return source.lift(new DistinctOperator(keySelector, flushes));
        };
      }
      exports.distinct = distinct;
      var DistinctOperator = function() {
        function DistinctOperator2(keySelector, flushes) {
          this.keySelector = keySelector;
          this.flushes = flushes;
        }
        DistinctOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
        };
        return DistinctOperator2;
      }();
      var DistinctSubscriber = function(_super) {
        __extends(DistinctSubscriber2, _super);
        function DistinctSubscriber2(destination, keySelector, flushes) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.values = /* @__PURE__ */ new Set();
          if (flushes) {
            _this.add(innerSubscribe_1.innerSubscribe(flushes, new innerSubscribe_1.SimpleInnerSubscriber(_this)));
          }
          return _this;
        }
        DistinctSubscriber2.prototype.notifyNext = function() {
          this.values.clear();
        };
        DistinctSubscriber2.prototype.notifyError = function(error) {
          this._error(error);
        };
        DistinctSubscriber2.prototype._next = function(value) {
          if (this.keySelector) {
            this._useKeySelector(value);
          } else {
            this._finalizeNext(value, value);
          }
        };
        DistinctSubscriber2.prototype._useKeySelector = function(value) {
          var key;
          var destination = this.destination;
          try {
            key = this.keySelector(value);
          } catch (err) {
            destination.error(err);
            return;
          }
          this._finalizeNext(key, value);
        };
        DistinctSubscriber2.prototype._finalizeNext = function(key, value) {
          var values = this.values;
          if (!values.has(key)) {
            values.add(key);
            this.destination.next(value);
          }
        };
        return DistinctSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
      exports.DistinctSubscriber = DistinctSubscriber;
    }
  });

  // node_modules/rxjs/internal/operators/distinctUntilChanged.js
  var require_distinctUntilChanged = __commonJS({
    "node_modules/rxjs/internal/operators/distinctUntilChanged.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function distinctUntilChanged(compare, keySelector) {
        return function(source) {
          return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
        };
      }
      exports.distinctUntilChanged = distinctUntilChanged;
      var DistinctUntilChangedOperator = function() {
        function DistinctUntilChangedOperator2(compare, keySelector) {
          this.compare = compare;
          this.keySelector = keySelector;
        }
        DistinctUntilChangedOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
        };
        return DistinctUntilChangedOperator2;
      }();
      var DistinctUntilChangedSubscriber = function(_super) {
        __extends(DistinctUntilChangedSubscriber2, _super);
        function DistinctUntilChangedSubscriber2(destination, compare, keySelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.hasKey = false;
          if (typeof compare === "function") {
            _this.compare = compare;
          }
          return _this;
        }
        DistinctUntilChangedSubscriber2.prototype.compare = function(x, y) {
          return x === y;
        };
        DistinctUntilChangedSubscriber2.prototype._next = function(value) {
          var key;
          try {
            var keySelector = this.keySelector;
            key = keySelector ? keySelector(value) : value;
          } catch (err) {
            return this.destination.error(err);
          }
          var result = false;
          if (this.hasKey) {
            try {
              var compare = this.compare;
              result = compare(this.key, key);
            } catch (err) {
              return this.destination.error(err);
            }
          } else {
            this.hasKey = true;
          }
          if (!result) {
            this.key = key;
            this.destination.next(value);
          }
        };
        return DistinctUntilChangedSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/distinctUntilKeyChanged.js
  var require_distinctUntilKeyChanged = __commonJS({
    "node_modules/rxjs/internal/operators/distinctUntilKeyChanged.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var distinctUntilChanged_1 = require_distinctUntilChanged();
      function distinctUntilKeyChanged(key, compare) {
        return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
          return compare ? compare(x[key], y[key]) : x[key] === y[key];
        });
      }
      exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
    }
  });

  // node_modules/rxjs/internal/operators/throwIfEmpty.js
  var require_throwIfEmpty = __commonJS({
    "node_modules/rxjs/internal/operators/throwIfEmpty.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var EmptyError_1 = require_EmptyError();
      var Subscriber_1 = require_Subscriber();
      function throwIfEmpty(errorFactory) {
        if (errorFactory === void 0) {
          errorFactory = defaultErrorFactory;
        }
        return function(source) {
          return source.lift(new ThrowIfEmptyOperator(errorFactory));
        };
      }
      exports.throwIfEmpty = throwIfEmpty;
      var ThrowIfEmptyOperator = function() {
        function ThrowIfEmptyOperator2(errorFactory) {
          this.errorFactory = errorFactory;
        }
        ThrowIfEmptyOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
        };
        return ThrowIfEmptyOperator2;
      }();
      var ThrowIfEmptySubscriber = function(_super) {
        __extends(ThrowIfEmptySubscriber2, _super);
        function ThrowIfEmptySubscriber2(destination, errorFactory) {
          var _this = _super.call(this, destination) || this;
          _this.errorFactory = errorFactory;
          _this.hasValue = false;
          return _this;
        }
        ThrowIfEmptySubscriber2.prototype._next = function(value) {
          this.hasValue = true;
          this.destination.next(value);
        };
        ThrowIfEmptySubscriber2.prototype._complete = function() {
          if (!this.hasValue) {
            var err = void 0;
            try {
              err = this.errorFactory();
            } catch (e) {
              err = e;
            }
            this.destination.error(err);
          } else {
            return this.destination.complete();
          }
        };
        return ThrowIfEmptySubscriber2;
      }(Subscriber_1.Subscriber);
      function defaultErrorFactory() {
        return new EmptyError_1.EmptyError();
      }
    }
  });

  // node_modules/rxjs/internal/operators/take.js
  var require_take = __commonJS({
    "node_modules/rxjs/internal/operators/take.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      var empty_1 = require_empty();
      function take(count) {
        return function(source) {
          if (count === 0) {
            return empty_1.empty();
          } else {
            return source.lift(new TakeOperator(count));
          }
        };
      }
      exports.take = take;
      var TakeOperator = function() {
        function TakeOperator2(total) {
          this.total = total;
          if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }
        }
        TakeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new TakeSubscriber(subscriber, this.total));
        };
        return TakeOperator2;
      }();
      var TakeSubscriber = function(_super) {
        __extends(TakeSubscriber2, _super);
        function TakeSubscriber2(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.count = 0;
          return _this;
        }
        TakeSubscriber2.prototype._next = function(value) {
          var total = this.total;
          var count = ++this.count;
          if (count <= total) {
            this.destination.next(value);
            if (count === total) {
              this.destination.complete();
              this.unsubscribe();
            }
          }
        };
        return TakeSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/elementAt.js
  var require_elementAt = __commonJS({
    "node_modules/rxjs/internal/operators/elementAt.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      var filter_1 = require_filter();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var take_1 = require_take();
      function elementAt(index, defaultValue) {
        if (index < 0) {
          throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
        }
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(filter_1.filter(function(v, i) {
            return i === index;
          }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }));
        };
      }
      exports.elementAt = elementAt;
    }
  });

  // node_modules/rxjs/internal/operators/endWith.js
  var require_endWith = __commonJS({
    "node_modules/rxjs/internal/operators/endWith.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var concat_1 = require_concat();
      var of_1 = require_of();
      function endWith() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          array[_i] = arguments[_i];
        }
        return function(source) {
          return concat_1.concat(source, of_1.of.apply(void 0, array));
        };
      }
      exports.endWith = endWith;
    }
  });

  // node_modules/rxjs/internal/operators/every.js
  var require_every = __commonJS({
    "node_modules/rxjs/internal/operators/every.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function every(predicate, thisArg) {
        return function(source) {
          return source.lift(new EveryOperator(predicate, thisArg, source));
        };
      }
      exports.every = every;
      var EveryOperator = function() {
        function EveryOperator2(predicate, thisArg, source) {
          this.predicate = predicate;
          this.thisArg = thisArg;
          this.source = source;
        }
        EveryOperator2.prototype.call = function(observer, source) {
          return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
        };
        return EveryOperator2;
      }();
      var EverySubscriber = function(_super) {
        __extends(EverySubscriber2, _super);
        function EverySubscriber2(destination, predicate, thisArg, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.source = source;
          _this.index = 0;
          _this.thisArg = thisArg || _this;
          return _this;
        }
        EverySubscriber2.prototype.notifyComplete = function(everyValueMatch) {
          this.destination.next(everyValueMatch);
          this.destination.complete();
        };
        EverySubscriber2.prototype._next = function(value) {
          var result = false;
          try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          if (!result) {
            this.notifyComplete(false);
          }
        };
        EverySubscriber2.prototype._complete = function() {
          this.notifyComplete(true);
        };
        return EverySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/exhaust.js
  var require_exhaust = __commonJS({
    "node_modules/rxjs/internal/operators/exhaust.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function exhaust() {
        return function(source) {
          return source.lift(new SwitchFirstOperator());
        };
      }
      exports.exhaust = exhaust;
      var SwitchFirstOperator = function() {
        function SwitchFirstOperator2() {
        }
        SwitchFirstOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SwitchFirstSubscriber(subscriber));
        };
        return SwitchFirstOperator2;
      }();
      var SwitchFirstSubscriber = function(_super) {
        __extends(SwitchFirstSubscriber2, _super);
        function SwitchFirstSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasCompleted = false;
          _this.hasSubscription = false;
          return _this;
        }
        SwitchFirstSubscriber2.prototype._next = function(value) {
          if (!this.hasSubscription) {
            this.hasSubscription = true;
            this.add(innerSubscribe_1.innerSubscribe(value, new innerSubscribe_1.SimpleInnerSubscriber(this)));
          }
        };
        SwitchFirstSubscriber2.prototype._complete = function() {
          this.hasCompleted = true;
          if (!this.hasSubscription) {
            this.destination.complete();
          }
        };
        SwitchFirstSubscriber2.prototype.notifyComplete = function() {
          this.hasSubscription = false;
          if (this.hasCompleted) {
            this.destination.complete();
          }
        };
        return SwitchFirstSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/exhaustMap.js
  var require_exhaustMap = __commonJS({
    "node_modules/rxjs/internal/operators/exhaustMap.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var map_1 = require_map();
      var from_1 = require_from();
      var innerSubscribe_1 = require_innerSubscribe();
      function exhaustMap(project, resultSelector) {
        if (resultSelector) {
          return function(source) {
            return source.pipe(exhaustMap(function(a, i) {
              return from_1.from(project(a, i)).pipe(map_1.map(function(b, ii) {
                return resultSelector(a, b, i, ii);
              }));
            }));
          };
        }
        return function(source) {
          return source.lift(new ExhaustMapOperator(project));
        };
      }
      exports.exhaustMap = exhaustMap;
      var ExhaustMapOperator = function() {
        function ExhaustMapOperator2(project) {
          this.project = project;
        }
        ExhaustMapOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ExhaustMapSubscriber(subscriber, this.project));
        };
        return ExhaustMapOperator2;
      }();
      var ExhaustMapSubscriber = function(_super) {
        __extends(ExhaustMapSubscriber2, _super);
        function ExhaustMapSubscriber2(destination, project) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.hasSubscription = false;
          _this.hasCompleted = false;
          _this.index = 0;
          return _this;
        }
        ExhaustMapSubscriber2.prototype._next = function(value) {
          if (!this.hasSubscription) {
            this.tryNext(value);
          }
        };
        ExhaustMapSubscriber2.prototype.tryNext = function(value) {
          var result;
          var index = this.index++;
          try {
            result = this.project(value, index);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.hasSubscription = true;
          this._innerSub(result);
        };
        ExhaustMapSubscriber2.prototype._innerSub = function(result) {
          var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          var innerSubscription = innerSubscribe_1.innerSubscribe(result, innerSubscriber);
          if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
          }
        };
        ExhaustMapSubscriber2.prototype._complete = function() {
          this.hasCompleted = true;
          if (!this.hasSubscription) {
            this.destination.complete();
          }
          this.unsubscribe();
        };
        ExhaustMapSubscriber2.prototype.notifyNext = function(innerValue) {
          this.destination.next(innerValue);
        };
        ExhaustMapSubscriber2.prototype.notifyError = function(err) {
          this.destination.error(err);
        };
        ExhaustMapSubscriber2.prototype.notifyComplete = function() {
          this.hasSubscription = false;
          if (this.hasCompleted) {
            this.destination.complete();
          }
        };
        return ExhaustMapSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/expand.js
  var require_expand = __commonJS({
    "node_modules/rxjs/internal/operators/expand.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function expand(project, concurrent, scheduler) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
        return function(source) {
          return source.lift(new ExpandOperator(project, concurrent, scheduler));
        };
      }
      exports.expand = expand;
      var ExpandOperator = function() {
        function ExpandOperator2(project, concurrent, scheduler) {
          this.project = project;
          this.concurrent = concurrent;
          this.scheduler = scheduler;
        }
        ExpandOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
        };
        return ExpandOperator2;
      }();
      exports.ExpandOperator = ExpandOperator;
      var ExpandSubscriber = function(_super) {
        __extends(ExpandSubscriber2, _super);
        function ExpandSubscriber2(destination, project, concurrent, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.concurrent = concurrent;
          _this.scheduler = scheduler;
          _this.index = 0;
          _this.active = 0;
          _this.hasCompleted = false;
          if (concurrent < Number.POSITIVE_INFINITY) {
            _this.buffer = [];
          }
          return _this;
        }
        ExpandSubscriber2.dispatch = function(arg) {
          var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
          subscriber.subscribeToProjection(result, value, index);
        };
        ExpandSubscriber2.prototype._next = function(value) {
          var destination = this.destination;
          if (destination.closed) {
            this._complete();
            return;
          }
          var index = this.index++;
          if (this.active < this.concurrent) {
            destination.next(value);
            try {
              var project = this.project;
              var result = project(value, index);
              if (!this.scheduler) {
                this.subscribeToProjection(result, value, index);
              } else {
                var state = { subscriber: this, result, value, index };
                var destination_1 = this.destination;
                destination_1.add(this.scheduler.schedule(ExpandSubscriber2.dispatch, 0, state));
              }
            } catch (e) {
              destination.error(e);
            }
          } else {
            this.buffer.push(value);
          }
        };
        ExpandSubscriber2.prototype.subscribeToProjection = function(result, value, index) {
          this.active++;
          var destination = this.destination;
          destination.add(innerSubscribe_1.innerSubscribe(result, new innerSubscribe_1.SimpleInnerSubscriber(this)));
        };
        ExpandSubscriber2.prototype._complete = function() {
          this.hasCompleted = true;
          if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
          }
          this.unsubscribe();
        };
        ExpandSubscriber2.prototype.notifyNext = function(innerValue) {
          this._next(innerValue);
        };
        ExpandSubscriber2.prototype.notifyComplete = function() {
          var buffer = this.buffer;
          this.active--;
          if (buffer && buffer.length > 0) {
            this._next(buffer.shift());
          }
          if (this.hasCompleted && this.active === 0) {
            this.destination.complete();
          }
        };
        return ExpandSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
      exports.ExpandSubscriber = ExpandSubscriber;
    }
  });

  // node_modules/rxjs/internal/operators/finalize.js
  var require_finalize = __commonJS({
    "node_modules/rxjs/internal/operators/finalize.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Subscription_1 = require_Subscription();
      function finalize(callback) {
        return function(source) {
          return source.lift(new FinallyOperator(callback));
        };
      }
      exports.finalize = finalize;
      var FinallyOperator = function() {
        function FinallyOperator2(callback) {
          this.callback = callback;
        }
        FinallyOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new FinallySubscriber(subscriber, this.callback));
        };
        return FinallyOperator2;
      }();
      var FinallySubscriber = function(_super) {
        __extends(FinallySubscriber2, _super);
        function FinallySubscriber2(destination, callback) {
          var _this = _super.call(this, destination) || this;
          _this.add(new Subscription_1.Subscription(callback));
          return _this;
        }
        return FinallySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/find.js
  var require_find = __commonJS({
    "node_modules/rxjs/internal/operators/find.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function find(predicate, thisArg) {
        if (typeof predicate !== "function") {
          throw new TypeError("predicate is not a function");
        }
        return function(source) {
          return source.lift(new FindValueOperator(predicate, source, false, thisArg));
        };
      }
      exports.find = find;
      var FindValueOperator = function() {
        function FindValueOperator2(predicate, source, yieldIndex, thisArg) {
          this.predicate = predicate;
          this.source = source;
          this.yieldIndex = yieldIndex;
          this.thisArg = thisArg;
        }
        FindValueOperator2.prototype.call = function(observer, source) {
          return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
        };
        return FindValueOperator2;
      }();
      exports.FindValueOperator = FindValueOperator;
      var FindValueSubscriber = function(_super) {
        __extends(FindValueSubscriber2, _super);
        function FindValueSubscriber2(destination, predicate, source, yieldIndex, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.yieldIndex = yieldIndex;
          _this.thisArg = thisArg;
          _this.index = 0;
          return _this;
        }
        FindValueSubscriber2.prototype.notifyComplete = function(value) {
          var destination = this.destination;
          destination.next(value);
          destination.complete();
          this.unsubscribe();
        };
        FindValueSubscriber2.prototype._next = function(value) {
          var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
          var index = this.index++;
          try {
            var result = predicate.call(thisArg || this, value, index, this.source);
            if (result) {
              this.notifyComplete(this.yieldIndex ? index : value);
            }
          } catch (err) {
            this.destination.error(err);
          }
        };
        FindValueSubscriber2.prototype._complete = function() {
          this.notifyComplete(this.yieldIndex ? -1 : void 0);
        };
        return FindValueSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.FindValueSubscriber = FindValueSubscriber;
    }
  });

  // node_modules/rxjs/internal/operators/findIndex.js
  var require_findIndex = __commonJS({
    "node_modules/rxjs/internal/operators/findIndex.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var find_1 = require_find();
      function findIndex(predicate, thisArg) {
        return function(source) {
          return source.lift(new find_1.FindValueOperator(predicate, source, true, thisArg));
        };
      }
      exports.findIndex = findIndex;
    }
  });

  // node_modules/rxjs/internal/operators/first.js
  var require_first = __commonJS({
    "node_modules/rxjs/internal/operators/first.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var EmptyError_1 = require_EmptyError();
      var filter_1 = require_filter();
      var take_1 = require_take();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var identity_1 = require_identity();
      function first(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(predicate ? filter_1.filter(function(v, i) {
            return predicate(v, i, source);
          }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new EmptyError_1.EmptyError();
          }));
        };
      }
      exports.first = first;
    }
  });

  // node_modules/rxjs/internal/operators/ignoreElements.js
  var require_ignoreElements = __commonJS({
    "node_modules/rxjs/internal/operators/ignoreElements.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function ignoreElements() {
        return function ignoreElementsOperatorFunction(source) {
          return source.lift(new IgnoreElementsOperator());
        };
      }
      exports.ignoreElements = ignoreElements;
      var IgnoreElementsOperator = function() {
        function IgnoreElementsOperator2() {
        }
        IgnoreElementsOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new IgnoreElementsSubscriber(subscriber));
        };
        return IgnoreElementsOperator2;
      }();
      var IgnoreElementsSubscriber = function(_super) {
        __extends(IgnoreElementsSubscriber2, _super);
        function IgnoreElementsSubscriber2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        IgnoreElementsSubscriber2.prototype._next = function(unused) {
        };
        return IgnoreElementsSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/isEmpty.js
  var require_isEmpty = __commonJS({
    "node_modules/rxjs/internal/operators/isEmpty.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function isEmpty() {
        return function(source) {
          return source.lift(new IsEmptyOperator());
        };
      }
      exports.isEmpty = isEmpty;
      var IsEmptyOperator = function() {
        function IsEmptyOperator2() {
        }
        IsEmptyOperator2.prototype.call = function(observer, source) {
          return source.subscribe(new IsEmptySubscriber(observer));
        };
        return IsEmptyOperator2;
      }();
      var IsEmptySubscriber = function(_super) {
        __extends(IsEmptySubscriber2, _super);
        function IsEmptySubscriber2(destination) {
          return _super.call(this, destination) || this;
        }
        IsEmptySubscriber2.prototype.notifyComplete = function(isEmpty2) {
          var destination = this.destination;
          destination.next(isEmpty2);
          destination.complete();
        };
        IsEmptySubscriber2.prototype._next = function(value) {
          this.notifyComplete(false);
        };
        IsEmptySubscriber2.prototype._complete = function() {
          this.notifyComplete(true);
        };
        return IsEmptySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/takeLast.js
  var require_takeLast = __commonJS({
    "node_modules/rxjs/internal/operators/takeLast.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      var empty_1 = require_empty();
      function takeLast(count) {
        return function takeLastOperatorFunction(source) {
          if (count === 0) {
            return empty_1.empty();
          } else {
            return source.lift(new TakeLastOperator(count));
          }
        };
      }
      exports.takeLast = takeLast;
      var TakeLastOperator = function() {
        function TakeLastOperator2(total) {
          this.total = total;
          if (this.total < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }
        }
        TakeLastOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
        };
        return TakeLastOperator2;
      }();
      var TakeLastSubscriber = function(_super) {
        __extends(TakeLastSubscriber2, _super);
        function TakeLastSubscriber2(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.ring = new Array();
          _this.count = 0;
          return _this;
        }
        TakeLastSubscriber2.prototype._next = function(value) {
          var ring = this.ring;
          var total = this.total;
          var count = this.count++;
          if (ring.length < total) {
            ring.push(value);
          } else {
            var index = count % total;
            ring[index] = value;
          }
        };
        TakeLastSubscriber2.prototype._complete = function() {
          var destination = this.destination;
          var count = this.count;
          if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
              var idx = count++ % total;
              destination.next(ring[idx]);
            }
          }
          destination.complete();
        };
        return TakeLastSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/last.js
  var require_last = __commonJS({
    "node_modules/rxjs/internal/operators/last.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var EmptyError_1 = require_EmptyError();
      var filter_1 = require_filter();
      var takeLast_1 = require_takeLast();
      var throwIfEmpty_1 = require_throwIfEmpty();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var identity_1 = require_identity();
      function last(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function(source) {
          return source.pipe(predicate ? filter_1.filter(function(v, i) {
            return predicate(v, i, source);
          }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
            return new EmptyError_1.EmptyError();
          }));
        };
      }
      exports.last = last;
    }
  });

  // node_modules/rxjs/internal/operators/mapTo.js
  var require_mapTo = __commonJS({
    "node_modules/rxjs/internal/operators/mapTo.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function mapTo(value) {
        return function(source) {
          return source.lift(new MapToOperator(value));
        };
      }
      exports.mapTo = mapTo;
      var MapToOperator = function() {
        function MapToOperator2(value) {
          this.value = value;
        }
        MapToOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new MapToSubscriber(subscriber, this.value));
        };
        return MapToOperator2;
      }();
      var MapToSubscriber = function(_super) {
        __extends(MapToSubscriber2, _super);
        function MapToSubscriber2(destination, value) {
          var _this = _super.call(this, destination) || this;
          _this.value = value;
          return _this;
        }
        MapToSubscriber2.prototype._next = function(x) {
          this.destination.next(this.value);
        };
        return MapToSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/materialize.js
  var require_materialize = __commonJS({
    "node_modules/rxjs/internal/operators/materialize.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Notification_1 = require_Notification();
      function materialize() {
        return function materializeOperatorFunction(source) {
          return source.lift(new MaterializeOperator());
        };
      }
      exports.materialize = materialize;
      var MaterializeOperator = function() {
        function MaterializeOperator2() {
        }
        MaterializeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new MaterializeSubscriber(subscriber));
        };
        return MaterializeOperator2;
      }();
      var MaterializeSubscriber = function(_super) {
        __extends(MaterializeSubscriber2, _super);
        function MaterializeSubscriber2(destination) {
          return _super.call(this, destination) || this;
        }
        MaterializeSubscriber2.prototype._next = function(value) {
          this.destination.next(Notification_1.Notification.createNext(value));
        };
        MaterializeSubscriber2.prototype._error = function(err) {
          var destination = this.destination;
          destination.next(Notification_1.Notification.createError(err));
          destination.complete();
        };
        MaterializeSubscriber2.prototype._complete = function() {
          var destination = this.destination;
          destination.next(Notification_1.Notification.createComplete());
          destination.complete();
        };
        return MaterializeSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/scan.js
  var require_scan = __commonJS({
    "node_modules/rxjs/internal/operators/scan.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function scan(accumulator, seed) {
        var hasSeed = false;
        if (arguments.length >= 2) {
          hasSeed = true;
        }
        return function scanOperatorFunction(source) {
          return source.lift(new ScanOperator(accumulator, seed, hasSeed));
        };
      }
      exports.scan = scan;
      var ScanOperator = function() {
        function ScanOperator2(accumulator, seed, hasSeed) {
          if (hasSeed === void 0) {
            hasSeed = false;
          }
          this.accumulator = accumulator;
          this.seed = seed;
          this.hasSeed = hasSeed;
        }
        ScanOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
        };
        return ScanOperator2;
      }();
      var ScanSubscriber = function(_super) {
        __extends(ScanSubscriber2, _super);
        function ScanSubscriber2(destination, accumulator, _seed, hasSeed) {
          var _this = _super.call(this, destination) || this;
          _this.accumulator = accumulator;
          _this._seed = _seed;
          _this.hasSeed = hasSeed;
          _this.index = 0;
          return _this;
        }
        Object.defineProperty(ScanSubscriber2.prototype, "seed", {
          get: function() {
            return this._seed;
          },
          set: function(value) {
            this.hasSeed = true;
            this._seed = value;
          },
          enumerable: true,
          configurable: true
        });
        ScanSubscriber2.prototype._next = function(value) {
          if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
          } else {
            return this._tryNext(value);
          }
        };
        ScanSubscriber2.prototype._tryNext = function(value) {
          var index = this.index++;
          var result;
          try {
            result = this.accumulator(this.seed, value, index);
          } catch (err) {
            this.destination.error(err);
          }
          this.seed = result;
          this.destination.next(result);
        };
        return ScanSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/reduce.js
  var require_reduce = __commonJS({
    "node_modules/rxjs/internal/operators/reduce.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var scan_1 = require_scan();
      var takeLast_1 = require_takeLast();
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      var pipe_1 = require_pipe();
      function reduce(accumulator, seed) {
        if (arguments.length >= 2) {
          return function reduceOperatorFunctionWithSeed(source) {
            return pipe_1.pipe(scan_1.scan(accumulator, seed), takeLast_1.takeLast(1), defaultIfEmpty_1.defaultIfEmpty(seed))(source);
          };
        }
        return function reduceOperatorFunction(source) {
          return pipe_1.pipe(scan_1.scan(function(acc, value, index) {
            return accumulator(acc, value, index + 1);
          }), takeLast_1.takeLast(1))(source);
        };
      }
      exports.reduce = reduce;
    }
  });

  // node_modules/rxjs/internal/operators/max.js
  var require_max = __commonJS({
    "node_modules/rxjs/internal/operators/max.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var reduce_1 = require_reduce();
      function max(comparer) {
        var max2 = typeof comparer === "function" ? function(x, y) {
          return comparer(x, y) > 0 ? x : y;
        } : function(x, y) {
          return x > y ? x : y;
        };
        return reduce_1.reduce(max2);
      }
      exports.max = max;
    }
  });

  // node_modules/rxjs/internal/operators/merge.js
  var require_merge2 = __commonJS({
    "node_modules/rxjs/internal/operators/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var merge_1 = require_merge();
      function merge() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        return function(source) {
          return source.lift.call(merge_1.merge.apply(void 0, [source].concat(observables)));
        };
      }
      exports.merge = merge;
    }
  });

  // node_modules/rxjs/internal/operators/mergeMapTo.js
  var require_mergeMapTo = __commonJS({
    "node_modules/rxjs/internal/operators/mergeMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var mergeMap_1 = require_mergeMap();
      function mergeMapTo(innerObservable, resultSelector, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        if (typeof resultSelector === "function") {
          return mergeMap_1.mergeMap(function() {
            return innerObservable;
          }, resultSelector, concurrent);
        }
        if (typeof resultSelector === "number") {
          concurrent = resultSelector;
        }
        return mergeMap_1.mergeMap(function() {
          return innerObservable;
        }, concurrent);
      }
      exports.mergeMapTo = mergeMapTo;
    }
  });

  // node_modules/rxjs/internal/operators/mergeScan.js
  var require_mergeScan = __commonJS({
    "node_modules/rxjs/internal/operators/mergeScan.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function mergeScan(accumulator, seed, concurrent) {
        if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
        }
        return function(source) {
          return source.lift(new MergeScanOperator(accumulator, seed, concurrent));
        };
      }
      exports.mergeScan = mergeScan;
      var MergeScanOperator = function() {
        function MergeScanOperator2(accumulator, seed, concurrent) {
          this.accumulator = accumulator;
          this.seed = seed;
          this.concurrent = concurrent;
        }
        MergeScanOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
        };
        return MergeScanOperator2;
      }();
      exports.MergeScanOperator = MergeScanOperator;
      var MergeScanSubscriber = function(_super) {
        __extends(MergeScanSubscriber2, _super);
        function MergeScanSubscriber2(destination, accumulator, acc, concurrent) {
          var _this = _super.call(this, destination) || this;
          _this.accumulator = accumulator;
          _this.acc = acc;
          _this.concurrent = concurrent;
          _this.hasValue = false;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
        }
        MergeScanSubscriber2.prototype._next = function(value) {
          if (this.active < this.concurrent) {
            var index = this.index++;
            var destination = this.destination;
            var ish = void 0;
            try {
              var accumulator = this.accumulator;
              ish = accumulator(this.acc, value, index);
            } catch (e) {
              return destination.error(e);
            }
            this.active++;
            this._innerSub(ish);
          } else {
            this.buffer.push(value);
          }
        };
        MergeScanSubscriber2.prototype._innerSub = function(ish) {
          var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          var innerSubscription = innerSubscribe_1.innerSubscribe(ish, innerSubscriber);
          if (innerSubscription !== innerSubscriber) {
            destination.add(innerSubscription);
          }
        };
        MergeScanSubscriber2.prototype._complete = function() {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
            if (this.hasValue === false) {
              this.destination.next(this.acc);
            }
            this.destination.complete();
          }
          this.unsubscribe();
        };
        MergeScanSubscriber2.prototype.notifyNext = function(innerValue) {
          var destination = this.destination;
          this.acc = innerValue;
          this.hasValue = true;
          destination.next(innerValue);
        };
        MergeScanSubscriber2.prototype.notifyComplete = function() {
          var buffer = this.buffer;
          this.active--;
          if (buffer.length > 0) {
            this._next(buffer.shift());
          } else if (this.active === 0 && this.hasCompleted) {
            if (this.hasValue === false) {
              this.destination.next(this.acc);
            }
            this.destination.complete();
          }
        };
        return MergeScanSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
      exports.MergeScanSubscriber = MergeScanSubscriber;
    }
  });

  // node_modules/rxjs/internal/operators/min.js
  var require_min = __commonJS({
    "node_modules/rxjs/internal/operators/min.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var reduce_1 = require_reduce();
      function min(comparer) {
        var min2 = typeof comparer === "function" ? function(x, y) {
          return comparer(x, y) < 0 ? x : y;
        } : function(x, y) {
          return x < y ? x : y;
        };
        return reduce_1.reduce(min2);
      }
      exports.min = min;
    }
  });

  // node_modules/rxjs/internal/operators/multicast.js
  var require_multicast = __commonJS({
    "node_modules/rxjs/internal/operators/multicast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ConnectableObservable_1 = require_ConnectableObservable();
      function multicast(subjectOrSubjectFactory, selector) {
        return function multicastOperatorFunction(source) {
          var subjectFactory;
          if (typeof subjectOrSubjectFactory === "function") {
            subjectFactory = subjectOrSubjectFactory;
          } else {
            subjectFactory = function subjectFactory2() {
              return subjectOrSubjectFactory;
            };
          }
          if (typeof selector === "function") {
            return source.lift(new MulticastOperator(subjectFactory, selector));
          }
          var connectable = Object.create(source, ConnectableObservable_1.connectableObservableDescriptor);
          connectable.source = source;
          connectable.subjectFactory = subjectFactory;
          return connectable;
        };
      }
      exports.multicast = multicast;
      var MulticastOperator = function() {
        function MulticastOperator2(subjectFactory, selector) {
          this.subjectFactory = subjectFactory;
          this.selector = selector;
        }
        MulticastOperator2.prototype.call = function(subscriber, source) {
          var selector = this.selector;
          var subject = this.subjectFactory();
          var subscription = selector(subject).subscribe(subscriber);
          subscription.add(source.subscribe(subject));
          return subscription;
        };
        return MulticastOperator2;
      }();
      exports.MulticastOperator = MulticastOperator;
    }
  });

  // node_modules/rxjs/internal/operators/onErrorResumeNext.js
  var require_onErrorResumeNext2 = __commonJS({
    "node_modules/rxjs/internal/operators/onErrorResumeNext.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var from_1 = require_from();
      var isArray_1 = require_isArray();
      var innerSubscribe_1 = require_innerSubscribe();
      function onErrorResumeNext() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          nextSources[_i] = arguments[_i];
        }
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
          nextSources = nextSources[0];
        }
        return function(source) {
          return source.lift(new OnErrorResumeNextOperator(nextSources));
        };
      }
      exports.onErrorResumeNext = onErrorResumeNext;
      function onErrorResumeNextStatic() {
        var nextSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          nextSources[_i] = arguments[_i];
        }
        var source = void 0;
        if (nextSources.length === 1 && isArray_1.isArray(nextSources[0])) {
          nextSources = nextSources[0];
        }
        source = nextSources.shift();
        return from_1.from(source).lift(new OnErrorResumeNextOperator(nextSources));
      }
      exports.onErrorResumeNextStatic = onErrorResumeNextStatic;
      var OnErrorResumeNextOperator = function() {
        function OnErrorResumeNextOperator2(nextSources) {
          this.nextSources = nextSources;
        }
        OnErrorResumeNextOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
        };
        return OnErrorResumeNextOperator2;
      }();
      var OnErrorResumeNextSubscriber = function(_super) {
        __extends(OnErrorResumeNextSubscriber2, _super);
        function OnErrorResumeNextSubscriber2(destination, nextSources) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.nextSources = nextSources;
          return _this;
        }
        OnErrorResumeNextSubscriber2.prototype.notifyError = function() {
          this.subscribeToNextSource();
        };
        OnErrorResumeNextSubscriber2.prototype.notifyComplete = function() {
          this.subscribeToNextSource();
        };
        OnErrorResumeNextSubscriber2.prototype._error = function(err) {
          this.subscribeToNextSource();
          this.unsubscribe();
        };
        OnErrorResumeNextSubscriber2.prototype._complete = function() {
          this.subscribeToNextSource();
          this.unsubscribe();
        };
        OnErrorResumeNextSubscriber2.prototype.subscribeToNextSource = function() {
          var next = this.nextSources.shift();
          if (!!next) {
            var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
            var destination = this.destination;
            destination.add(innerSubscriber);
            var innerSubscription = innerSubscribe_1.innerSubscribe(next, innerSubscriber);
            if (innerSubscription !== innerSubscriber) {
              destination.add(innerSubscription);
            }
          } else {
            this.destination.complete();
          }
        };
        return OnErrorResumeNextSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/pairwise.js
  var require_pairwise = __commonJS({
    "node_modules/rxjs/internal/operators/pairwise.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function pairwise() {
        return function(source) {
          return source.lift(new PairwiseOperator());
        };
      }
      exports.pairwise = pairwise;
      var PairwiseOperator = function() {
        function PairwiseOperator2() {
        }
        PairwiseOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new PairwiseSubscriber(subscriber));
        };
        return PairwiseOperator2;
      }();
      var PairwiseSubscriber = function(_super) {
        __extends(PairwiseSubscriber2, _super);
        function PairwiseSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.hasPrev = false;
          return _this;
        }
        PairwiseSubscriber2.prototype._next = function(value) {
          var pair;
          if (this.hasPrev) {
            pair = [this.prev, value];
          } else {
            this.hasPrev = true;
          }
          this.prev = value;
          if (pair) {
            this.destination.next(pair);
          }
        };
        return PairwiseSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/partition.js
  var require_partition2 = __commonJS({
    "node_modules/rxjs/internal/operators/partition.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var not_1 = require_not();
      var filter_1 = require_filter();
      function partition(predicate, thisArg) {
        return function(source) {
          return [
            filter_1.filter(predicate, thisArg)(source),
            filter_1.filter(not_1.not(predicate, thisArg))(source)
          ];
        };
      }
      exports.partition = partition;
    }
  });

  // node_modules/rxjs/internal/operators/pluck.js
  var require_pluck = __commonJS({
    "node_modules/rxjs/internal/operators/pluck.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var map_1 = require_map();
      function pluck() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          properties[_i] = arguments[_i];
        }
        var length = properties.length;
        if (length === 0) {
          throw new Error("list of properties cannot be empty.");
        }
        return function(source) {
          return map_1.map(plucker(properties, length))(source);
        };
      }
      exports.pluck = pluck;
      function plucker(props, length) {
        var mapper = function(x) {
          var currentProp = x;
          for (var i = 0; i < length; i++) {
            var p = currentProp != null ? currentProp[props[i]] : void 0;
            if (p !== void 0) {
              currentProp = p;
            } else {
              return void 0;
            }
          }
          return currentProp;
        };
        return mapper;
      }
    }
  });

  // node_modules/rxjs/internal/operators/publish.js
  var require_publish = __commonJS({
    "node_modules/rxjs/internal/operators/publish.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var multicast_1 = require_multicast();
      function publish(selector) {
        return selector ? multicast_1.multicast(function() {
          return new Subject_1.Subject();
        }, selector) : multicast_1.multicast(new Subject_1.Subject());
      }
      exports.publish = publish;
    }
  });

  // node_modules/rxjs/internal/operators/publishBehavior.js
  var require_publishBehavior = __commonJS({
    "node_modules/rxjs/internal/operators/publishBehavior.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var BehaviorSubject_1 = require_BehaviorSubject();
      var multicast_1 = require_multicast();
      function publishBehavior(value) {
        return function(source) {
          return multicast_1.multicast(new BehaviorSubject_1.BehaviorSubject(value))(source);
        };
      }
      exports.publishBehavior = publishBehavior;
    }
  });

  // node_modules/rxjs/internal/operators/publishLast.js
  var require_publishLast = __commonJS({
    "node_modules/rxjs/internal/operators/publishLast.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var AsyncSubject_1 = require_AsyncSubject();
      var multicast_1 = require_multicast();
      function publishLast() {
        return function(source) {
          return multicast_1.multicast(new AsyncSubject_1.AsyncSubject())(source);
        };
      }
      exports.publishLast = publishLast;
    }
  });

  // node_modules/rxjs/internal/operators/publishReplay.js
  var require_publishReplay = __commonJS({
    "node_modules/rxjs/internal/operators/publishReplay.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ReplaySubject_1 = require_ReplaySubject();
      var multicast_1 = require_multicast();
      function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
        if (selectorOrScheduler && typeof selectorOrScheduler !== "function") {
          scheduler = selectorOrScheduler;
        }
        var selector = typeof selectorOrScheduler === "function" ? selectorOrScheduler : void 0;
        var subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
        return function(source) {
          return multicast_1.multicast(function() {
            return subject;
          }, selector)(source);
        };
      }
      exports.publishReplay = publishReplay;
    }
  });

  // node_modules/rxjs/internal/operators/race.js
  var require_race2 = __commonJS({
    "node_modules/rxjs/internal/operators/race.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isArray_1 = require_isArray();
      var race_1 = require_race();
      function race() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        return function raceOperatorFunction(source) {
          if (observables.length === 1 && isArray_1.isArray(observables[0])) {
            observables = observables[0];
          }
          return source.lift.call(race_1.race.apply(void 0, [source].concat(observables)));
        };
      }
      exports.race = race;
    }
  });

  // node_modules/rxjs/internal/operators/repeat.js
  var require_repeat = __commonJS({
    "node_modules/rxjs/internal/operators/repeat.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var empty_1 = require_empty();
      function repeat(count) {
        if (count === void 0) {
          count = -1;
        }
        return function(source) {
          if (count === 0) {
            return empty_1.empty();
          } else if (count < 0) {
            return source.lift(new RepeatOperator(-1, source));
          } else {
            return source.lift(new RepeatOperator(count - 1, source));
          }
        };
      }
      exports.repeat = repeat;
      var RepeatOperator = function() {
        function RepeatOperator2(count, source) {
          this.count = count;
          this.source = source;
        }
        RepeatOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
        };
        return RepeatOperator2;
      }();
      var RepeatSubscriber = function(_super) {
        __extends(RepeatSubscriber2, _super);
        function RepeatSubscriber2(destination, count, source) {
          var _this = _super.call(this, destination) || this;
          _this.count = count;
          _this.source = source;
          return _this;
        }
        RepeatSubscriber2.prototype.complete = function() {
          if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
              return _super.prototype.complete.call(this);
            } else if (count > -1) {
              this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
          }
        };
        return RepeatSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/repeatWhen.js
  var require_repeatWhen = __commonJS({
    "node_modules/rxjs/internal/operators/repeatWhen.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var innerSubscribe_1 = require_innerSubscribe();
      function repeatWhen(notifier) {
        return function(source) {
          return source.lift(new RepeatWhenOperator(notifier));
        };
      }
      exports.repeatWhen = repeatWhen;
      var RepeatWhenOperator = function() {
        function RepeatWhenOperator2(notifier) {
          this.notifier = notifier;
        }
        RepeatWhenOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
        };
        return RepeatWhenOperator2;
      }();
      var RepeatWhenSubscriber = function(_super) {
        __extends(RepeatWhenSubscriber2, _super);
        function RepeatWhenSubscriber2(destination, notifier, source) {
          var _this = _super.call(this, destination) || this;
          _this.notifier = notifier;
          _this.source = source;
          _this.sourceIsBeingSubscribedTo = true;
          return _this;
        }
        RepeatWhenSubscriber2.prototype.notifyNext = function() {
          this.sourceIsBeingSubscribedTo = true;
          this.source.subscribe(this);
        };
        RepeatWhenSubscriber2.prototype.notifyComplete = function() {
          if (this.sourceIsBeingSubscribedTo === false) {
            return _super.prototype.complete.call(this);
          }
        };
        RepeatWhenSubscriber2.prototype.complete = function() {
          this.sourceIsBeingSubscribedTo = false;
          if (!this.isStopped) {
            if (!this.retries) {
              this.subscribeToRetries();
            }
            if (!this.retriesSubscription || this.retriesSubscription.closed) {
              return _super.prototype.complete.call(this);
            }
            this._unsubscribeAndRecycle();
            this.notifications.next(void 0);
          }
        };
        RepeatWhenSubscriber2.prototype._unsubscribe = function() {
          var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
          if (notifications) {
            notifications.unsubscribe();
            this.notifications = void 0;
          }
          if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = void 0;
          }
          this.retries = void 0;
        };
        RepeatWhenSubscriber2.prototype._unsubscribeAndRecycle = function() {
          var _unsubscribe = this._unsubscribe;
          this._unsubscribe = null;
          _super.prototype._unsubscribeAndRecycle.call(this);
          this._unsubscribe = _unsubscribe;
          return this;
        };
        RepeatWhenSubscriber2.prototype.subscribeToRetries = function() {
          this.notifications = new Subject_1.Subject();
          var retries;
          try {
            var notifier = this.notifier;
            retries = notifier(this.notifications);
          } catch (e) {
            return _super.prototype.complete.call(this);
          }
          this.retries = retries;
          this.retriesSubscription = innerSubscribe_1.innerSubscribe(retries, new innerSubscribe_1.SimpleInnerSubscriber(this));
        };
        return RepeatWhenSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/retry.js
  var require_retry = __commonJS({
    "node_modules/rxjs/internal/operators/retry.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function retry(count) {
        if (count === void 0) {
          count = -1;
        }
        return function(source) {
          return source.lift(new RetryOperator(count, source));
        };
      }
      exports.retry = retry;
      var RetryOperator = function() {
        function RetryOperator2(count, source) {
          this.count = count;
          this.source = source;
        }
        RetryOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
        };
        return RetryOperator2;
      }();
      var RetrySubscriber = function(_super) {
        __extends(RetrySubscriber2, _super);
        function RetrySubscriber2(destination, count, source) {
          var _this = _super.call(this, destination) || this;
          _this.count = count;
          _this.source = source;
          return _this;
        }
        RetrySubscriber2.prototype.error = function(err) {
          if (!this.isStopped) {
            var _a = this, source = _a.source, count = _a.count;
            if (count === 0) {
              return _super.prototype.error.call(this, err);
            } else if (count > -1) {
              this.count = count - 1;
            }
            source.subscribe(this._unsubscribeAndRecycle());
          }
        };
        return RetrySubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/retryWhen.js
  var require_retryWhen = __commonJS({
    "node_modules/rxjs/internal/operators/retryWhen.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var innerSubscribe_1 = require_innerSubscribe();
      function retryWhen(notifier) {
        return function(source) {
          return source.lift(new RetryWhenOperator(notifier, source));
        };
      }
      exports.retryWhen = retryWhen;
      var RetryWhenOperator = function() {
        function RetryWhenOperator2(notifier, source) {
          this.notifier = notifier;
          this.source = source;
        }
        RetryWhenOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
        };
        return RetryWhenOperator2;
      }();
      var RetryWhenSubscriber = function(_super) {
        __extends(RetryWhenSubscriber2, _super);
        function RetryWhenSubscriber2(destination, notifier, source) {
          var _this = _super.call(this, destination) || this;
          _this.notifier = notifier;
          _this.source = source;
          return _this;
        }
        RetryWhenSubscriber2.prototype.error = function(err) {
          if (!this.isStopped) {
            var errors = this.errors;
            var retries = this.retries;
            var retriesSubscription = this.retriesSubscription;
            if (!retries) {
              errors = new Subject_1.Subject();
              try {
                var notifier = this.notifier;
                retries = notifier(errors);
              } catch (e) {
                return _super.prototype.error.call(this, e);
              }
              retriesSubscription = innerSubscribe_1.innerSubscribe(retries, new innerSubscribe_1.SimpleInnerSubscriber(this));
            } else {
              this.errors = void 0;
              this.retriesSubscription = void 0;
            }
            this._unsubscribeAndRecycle();
            this.errors = errors;
            this.retries = retries;
            this.retriesSubscription = retriesSubscription;
            errors.next(err);
          }
        };
        RetryWhenSubscriber2.prototype._unsubscribe = function() {
          var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
          if (errors) {
            errors.unsubscribe();
            this.errors = void 0;
          }
          if (retriesSubscription) {
            retriesSubscription.unsubscribe();
            this.retriesSubscription = void 0;
          }
          this.retries = void 0;
        };
        RetryWhenSubscriber2.prototype.notifyNext = function() {
          var _unsubscribe = this._unsubscribe;
          this._unsubscribe = null;
          this._unsubscribeAndRecycle();
          this._unsubscribe = _unsubscribe;
          this.source.subscribe(this);
        };
        return RetryWhenSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/sample.js
  var require_sample = __commonJS({
    "node_modules/rxjs/internal/operators/sample.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function sample(notifier) {
        return function(source) {
          return source.lift(new SampleOperator(notifier));
        };
      }
      exports.sample = sample;
      var SampleOperator = function() {
        function SampleOperator2(notifier) {
          this.notifier = notifier;
        }
        SampleOperator2.prototype.call = function(subscriber, source) {
          var sampleSubscriber = new SampleSubscriber(subscriber);
          var subscription = source.subscribe(sampleSubscriber);
          subscription.add(innerSubscribe_1.innerSubscribe(this.notifier, new innerSubscribe_1.SimpleInnerSubscriber(sampleSubscriber)));
          return subscription;
        };
        return SampleOperator2;
      }();
      var SampleSubscriber = function(_super) {
        __extends(SampleSubscriber2, _super);
        function SampleSubscriber2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.hasValue = false;
          return _this;
        }
        SampleSubscriber2.prototype._next = function(value) {
          this.value = value;
          this.hasValue = true;
        };
        SampleSubscriber2.prototype.notifyNext = function() {
          this.emitValue();
        };
        SampleSubscriber2.prototype.notifyComplete = function() {
          this.emitValue();
        };
        SampleSubscriber2.prototype.emitValue = function() {
          if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.value);
          }
        };
        return SampleSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/sampleTime.js
  var require_sampleTime = __commonJS({
    "node_modules/rxjs/internal/operators/sampleTime.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var async_1 = require_async();
      function sampleTime(period, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return function(source) {
          return source.lift(new SampleTimeOperator(period, scheduler));
        };
      }
      exports.sampleTime = sampleTime;
      var SampleTimeOperator = function() {
        function SampleTimeOperator2(period, scheduler) {
          this.period = period;
          this.scheduler = scheduler;
        }
        SampleTimeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
        };
        return SampleTimeOperator2;
      }();
      var SampleTimeSubscriber = function(_super) {
        __extends(SampleTimeSubscriber2, _super);
        function SampleTimeSubscriber2(destination, period, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.period = period;
          _this.scheduler = scheduler;
          _this.hasValue = false;
          _this.add(scheduler.schedule(dispatchNotification, period, { subscriber: _this, period }));
          return _this;
        }
        SampleTimeSubscriber2.prototype._next = function(value) {
          this.lastValue = value;
          this.hasValue = true;
        };
        SampleTimeSubscriber2.prototype.notifyNext = function() {
          if (this.hasValue) {
            this.hasValue = false;
            this.destination.next(this.lastValue);
          }
        };
        return SampleTimeSubscriber2;
      }(Subscriber_1.Subscriber);
      function dispatchNotification(state) {
        var subscriber = state.subscriber, period = state.period;
        subscriber.notifyNext();
        this.schedule(state, period);
      }
    }
  });

  // node_modules/rxjs/internal/operators/sequenceEqual.js
  var require_sequenceEqual = __commonJS({
    "node_modules/rxjs/internal/operators/sequenceEqual.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function sequenceEqual(compareTo, comparator) {
        return function(source) {
          return source.lift(new SequenceEqualOperator(compareTo, comparator));
        };
      }
      exports.sequenceEqual = sequenceEqual;
      var SequenceEqualOperator = function() {
        function SequenceEqualOperator2(compareTo, comparator) {
          this.compareTo = compareTo;
          this.comparator = comparator;
        }
        SequenceEqualOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparator));
        };
        return SequenceEqualOperator2;
      }();
      exports.SequenceEqualOperator = SequenceEqualOperator;
      var SequenceEqualSubscriber = function(_super) {
        __extends(SequenceEqualSubscriber2, _super);
        function SequenceEqualSubscriber2(destination, compareTo, comparator) {
          var _this = _super.call(this, destination) || this;
          _this.compareTo = compareTo;
          _this.comparator = comparator;
          _this._a = [];
          _this._b = [];
          _this._oneComplete = false;
          _this.destination.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, _this)));
          return _this;
        }
        SequenceEqualSubscriber2.prototype._next = function(value) {
          if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
          } else {
            this._a.push(value);
            this.checkValues();
          }
        };
        SequenceEqualSubscriber2.prototype._complete = function() {
          if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
          } else {
            this._oneComplete = true;
          }
          this.unsubscribe();
        };
        SequenceEqualSubscriber2.prototype.checkValues = function() {
          var _c = this, _a = _c._a, _b = _c._b, comparator = _c.comparator;
          while (_a.length > 0 && _b.length > 0) {
            var a = _a.shift();
            var b = _b.shift();
            var areEqual = false;
            try {
              areEqual = comparator ? comparator(a, b) : a === b;
            } catch (e) {
              this.destination.error(e);
            }
            if (!areEqual) {
              this.emit(false);
            }
          }
        };
        SequenceEqualSubscriber2.prototype.emit = function(value) {
          var destination = this.destination;
          destination.next(value);
          destination.complete();
        };
        SequenceEqualSubscriber2.prototype.nextB = function(value) {
          if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
          } else {
            this._b.push(value);
            this.checkValues();
          }
        };
        SequenceEqualSubscriber2.prototype.completeB = function() {
          if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
          } else {
            this._oneComplete = true;
          }
        };
        return SequenceEqualSubscriber2;
      }(Subscriber_1.Subscriber);
      exports.SequenceEqualSubscriber = SequenceEqualSubscriber;
      var SequenceEqualCompareToSubscriber = function(_super) {
        __extends(SequenceEqualCompareToSubscriber2, _super);
        function SequenceEqualCompareToSubscriber2(destination, parent) {
          var _this = _super.call(this, destination) || this;
          _this.parent = parent;
          return _this;
        }
        SequenceEqualCompareToSubscriber2.prototype._next = function(value) {
          this.parent.nextB(value);
        };
        SequenceEqualCompareToSubscriber2.prototype._error = function(err) {
          this.parent.error(err);
          this.unsubscribe();
        };
        SequenceEqualCompareToSubscriber2.prototype._complete = function() {
          this.parent.completeB();
          this.unsubscribe();
        };
        return SequenceEqualCompareToSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/share.js
  var require_share = __commonJS({
    "node_modules/rxjs/internal/operators/share.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var multicast_1 = require_multicast();
      var refCount_1 = require_refCount();
      var Subject_1 = require_Subject();
      function shareSubjectFactory() {
        return new Subject_1.Subject();
      }
      function share() {
        return function(source) {
          return refCount_1.refCount()(multicast_1.multicast(shareSubjectFactory)(source));
        };
      }
      exports.share = share;
    }
  });

  // node_modules/rxjs/internal/operators/shareReplay.js
  var require_shareReplay = __commonJS({
    "node_modules/rxjs/internal/operators/shareReplay.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var ReplaySubject_1 = require_ReplaySubject();
      function shareReplay(configOrBufferSize, windowTime, scheduler) {
        var config;
        if (configOrBufferSize && typeof configOrBufferSize === "object") {
          config = configOrBufferSize;
        } else {
          config = {
            bufferSize: configOrBufferSize,
            windowTime,
            refCount: false,
            scheduler
          };
        }
        return function(source) {
          return source.lift(shareReplayOperator(config));
        };
      }
      exports.shareReplay = shareReplay;
      function shareReplayOperator(_a) {
        var _b = _a.bufferSize, bufferSize = _b === void 0 ? Number.POSITIVE_INFINITY : _b, _c = _a.windowTime, windowTime = _c === void 0 ? Number.POSITIVE_INFINITY : _c, useRefCount = _a.refCount, scheduler = _a.scheduler;
        var subject;
        var refCount = 0;
        var subscription;
        var hasError = false;
        var isComplete = false;
        return function shareReplayOperation(source) {
          refCount++;
          var innerSub;
          if (!subject || hasError) {
            hasError = false;
            subject = new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
            innerSub = subject.subscribe(this);
            subscription = source.subscribe({
              next: function(value) {
                subject.next(value);
              },
              error: function(err) {
                hasError = true;
                subject.error(err);
              },
              complete: function() {
                isComplete = true;
                subscription = void 0;
                subject.complete();
              }
            });
            if (isComplete) {
              subscription = void 0;
            }
          } else {
            innerSub = subject.subscribe(this);
          }
          this.add(function() {
            refCount--;
            innerSub.unsubscribe();
            innerSub = void 0;
            if (subscription && !isComplete && useRefCount && refCount === 0) {
              subscription.unsubscribe();
              subscription = void 0;
              subject = void 0;
            }
          });
        };
      }
    }
  });

  // node_modules/rxjs/internal/operators/single.js
  var require_single = __commonJS({
    "node_modules/rxjs/internal/operators/single.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var EmptyError_1 = require_EmptyError();
      function single(predicate) {
        return function(source) {
          return source.lift(new SingleOperator(predicate, source));
        };
      }
      exports.single = single;
      var SingleOperator = function() {
        function SingleOperator2(predicate, source) {
          this.predicate = predicate;
          this.source = source;
        }
        SingleOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
        };
        return SingleOperator2;
      }();
      var SingleSubscriber = function(_super) {
        __extends(SingleSubscriber2, _super);
        function SingleSubscriber2(destination, predicate, source) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.source = source;
          _this.seenValue = false;
          _this.index = 0;
          return _this;
        }
        SingleSubscriber2.prototype.applySingleValue = function(value) {
          if (this.seenValue) {
            this.destination.error("Sequence contains more than one element");
          } else {
            this.seenValue = true;
            this.singleValue = value;
          }
        };
        SingleSubscriber2.prototype._next = function(value) {
          var index = this.index++;
          if (this.predicate) {
            this.tryNext(value, index);
          } else {
            this.applySingleValue(value);
          }
        };
        SingleSubscriber2.prototype.tryNext = function(value, index) {
          try {
            if (this.predicate(value, index, this.source)) {
              this.applySingleValue(value);
            }
          } catch (err) {
            this.destination.error(err);
          }
        };
        SingleSubscriber2.prototype._complete = function() {
          var destination = this.destination;
          if (this.index > 0) {
            destination.next(this.seenValue ? this.singleValue : void 0);
            destination.complete();
          } else {
            destination.error(new EmptyError_1.EmptyError());
          }
        };
        return SingleSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/skip.js
  var require_skip = __commonJS({
    "node_modules/rxjs/internal/operators/skip.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function skip(count) {
        return function(source) {
          return source.lift(new SkipOperator(count));
        };
      }
      exports.skip = skip;
      var SkipOperator = function() {
        function SkipOperator2(total) {
          this.total = total;
        }
        SkipOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SkipSubscriber(subscriber, this.total));
        };
        return SkipOperator2;
      }();
      var SkipSubscriber = function(_super) {
        __extends(SkipSubscriber2, _super);
        function SkipSubscriber2(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.count = 0;
          return _this;
        }
        SkipSubscriber2.prototype._next = function(x) {
          if (++this.count > this.total) {
            this.destination.next(x);
          }
        };
        return SkipSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/skipLast.js
  var require_skipLast = __commonJS({
    "node_modules/rxjs/internal/operators/skipLast.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
      function skipLast(count) {
        return function(source) {
          return source.lift(new SkipLastOperator(count));
        };
      }
      exports.skipLast = skipLast;
      var SkipLastOperator = function() {
        function SkipLastOperator2(_skipCount) {
          this._skipCount = _skipCount;
          if (this._skipCount < 0) {
            throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
          }
        }
        SkipLastOperator2.prototype.call = function(subscriber, source) {
          if (this._skipCount === 0) {
            return source.subscribe(new Subscriber_1.Subscriber(subscriber));
          } else {
            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
          }
        };
        return SkipLastOperator2;
      }();
      var SkipLastSubscriber = function(_super) {
        __extends(SkipLastSubscriber2, _super);
        function SkipLastSubscriber2(destination, _skipCount) {
          var _this = _super.call(this, destination) || this;
          _this._skipCount = _skipCount;
          _this._count = 0;
          _this._ring = new Array(_skipCount);
          return _this;
        }
        SkipLastSubscriber2.prototype._next = function(value) {
          var skipCount = this._skipCount;
          var count = this._count++;
          if (count < skipCount) {
            this._ring[count] = value;
          } else {
            var currentIndex = count % skipCount;
            var ring = this._ring;
            var oldValue = ring[currentIndex];
            ring[currentIndex] = value;
            this.destination.next(oldValue);
          }
        };
        return SkipLastSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/skipUntil.js
  var require_skipUntil = __commonJS({
    "node_modules/rxjs/internal/operators/skipUntil.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function skipUntil(notifier) {
        return function(source) {
          return source.lift(new SkipUntilOperator(notifier));
        };
      }
      exports.skipUntil = skipUntil;
      var SkipUntilOperator = function() {
        function SkipUntilOperator2(notifier) {
          this.notifier = notifier;
        }
        SkipUntilOperator2.prototype.call = function(destination, source) {
          return source.subscribe(new SkipUntilSubscriber(destination, this.notifier));
        };
        return SkipUntilOperator2;
      }();
      var SkipUntilSubscriber = function(_super) {
        __extends(SkipUntilSubscriber2, _super);
        function SkipUntilSubscriber2(destination, notifier) {
          var _this = _super.call(this, destination) || this;
          _this.hasValue = false;
          var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(_this);
          _this.add(innerSubscriber);
          _this.innerSubscription = innerSubscriber;
          var innerSubscription = innerSubscribe_1.innerSubscribe(notifier, innerSubscriber);
          if (innerSubscription !== innerSubscriber) {
            _this.add(innerSubscription);
            _this.innerSubscription = innerSubscription;
          }
          return _this;
        }
        SkipUntilSubscriber2.prototype._next = function(value) {
          if (this.hasValue) {
            _super.prototype._next.call(this, value);
          }
        };
        SkipUntilSubscriber2.prototype.notifyNext = function() {
          this.hasValue = true;
          if (this.innerSubscription) {
            this.innerSubscription.unsubscribe();
          }
        };
        SkipUntilSubscriber2.prototype.notifyComplete = function() {
        };
        return SkipUntilSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/skipWhile.js
  var require_skipWhile = __commonJS({
    "node_modules/rxjs/internal/operators/skipWhile.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function skipWhile(predicate) {
        return function(source) {
          return source.lift(new SkipWhileOperator(predicate));
        };
      }
      exports.skipWhile = skipWhile;
      var SkipWhileOperator = function() {
        function SkipWhileOperator2(predicate) {
          this.predicate = predicate;
        }
        SkipWhileOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
        };
        return SkipWhileOperator2;
      }();
      var SkipWhileSubscriber = function(_super) {
        __extends(SkipWhileSubscriber2, _super);
        function SkipWhileSubscriber2(destination, predicate) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.skipping = true;
          _this.index = 0;
          return _this;
        }
        SkipWhileSubscriber2.prototype._next = function(value) {
          var destination = this.destination;
          if (this.skipping) {
            this.tryCallPredicate(value);
          }
          if (!this.skipping) {
            destination.next(value);
          }
        };
        SkipWhileSubscriber2.prototype.tryCallPredicate = function(value) {
          try {
            var result = this.predicate(value, this.index++);
            this.skipping = Boolean(result);
          } catch (err) {
            this.destination.error(err);
          }
        };
        return SkipWhileSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/startWith.js
  var require_startWith = __commonJS({
    "node_modules/rxjs/internal/operators/startWith.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var concat_1 = require_concat();
      var isScheduler_1 = require_isScheduler();
      function startWith() {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          array[_i] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
          array.pop();
          return function(source) {
            return concat_1.concat(array, source, scheduler);
          };
        } else {
          return function(source) {
            return concat_1.concat(array, source);
          };
        }
      }
      exports.startWith = startWith;
    }
  });

  // node_modules/rxjs/internal/observable/SubscribeOnObservable.js
  var require_SubscribeOnObservable = __commonJS({
    "node_modules/rxjs/internal/observable/SubscribeOnObservable.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Observable_1 = require_Observable();
      var asap_1 = require_asap();
      var isNumeric_1 = require_isNumeric();
      var SubscribeOnObservable = function(_super) {
        __extends(SubscribeOnObservable2, _super);
        function SubscribeOnObservable2(source, delayTime, scheduler) {
          if (delayTime === void 0) {
            delayTime = 0;
          }
          if (scheduler === void 0) {
            scheduler = asap_1.asap;
          }
          var _this = _super.call(this) || this;
          _this.source = source;
          _this.delayTime = delayTime;
          _this.scheduler = scheduler;
          if (!isNumeric_1.isNumeric(delayTime) || delayTime < 0) {
            _this.delayTime = 0;
          }
          if (!scheduler || typeof scheduler.schedule !== "function") {
            _this.scheduler = asap_1.asap;
          }
          return _this;
        }
        SubscribeOnObservable2.create = function(source, delay, scheduler) {
          if (delay === void 0) {
            delay = 0;
          }
          if (scheduler === void 0) {
            scheduler = asap_1.asap;
          }
          return new SubscribeOnObservable2(source, delay, scheduler);
        };
        SubscribeOnObservable2.dispatch = function(arg) {
          var source = arg.source, subscriber = arg.subscriber;
          return this.add(source.subscribe(subscriber));
        };
        SubscribeOnObservable2.prototype._subscribe = function(subscriber) {
          var delay = this.delayTime;
          var source = this.source;
          var scheduler = this.scheduler;
          return scheduler.schedule(SubscribeOnObservable2.dispatch, delay, {
            source,
            subscriber
          });
        };
        return SubscribeOnObservable2;
      }(Observable_1.Observable);
      exports.SubscribeOnObservable = SubscribeOnObservable;
    }
  });

  // node_modules/rxjs/internal/operators/subscribeOn.js
  var require_subscribeOn = __commonJS({
    "node_modules/rxjs/internal/operators/subscribeOn.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var SubscribeOnObservable_1 = require_SubscribeOnObservable();
      function subscribeOn(scheduler, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return function subscribeOnOperatorFunction(source) {
          return source.lift(new SubscribeOnOperator(scheduler, delay));
        };
      }
      exports.subscribeOn = subscribeOn;
      var SubscribeOnOperator = function() {
        function SubscribeOnOperator2(scheduler, delay) {
          this.scheduler = scheduler;
          this.delay = delay;
        }
        SubscribeOnOperator2.prototype.call = function(subscriber, source) {
          return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
        };
        return SubscribeOnOperator2;
      }();
    }
  });

  // node_modules/rxjs/internal/operators/switchMap.js
  var require_switchMap = __commonJS({
    "node_modules/rxjs/internal/operators/switchMap.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var map_1 = require_map();
      var from_1 = require_from();
      var innerSubscribe_1 = require_innerSubscribe();
      function switchMap(project, resultSelector) {
        if (typeof resultSelector === "function") {
          return function(source) {
            return source.pipe(switchMap(function(a, i) {
              return from_1.from(project(a, i)).pipe(map_1.map(function(b, ii) {
                return resultSelector(a, b, i, ii);
              }));
            }));
          };
        }
        return function(source) {
          return source.lift(new SwitchMapOperator(project));
        };
      }
      exports.switchMap = switchMap;
      var SwitchMapOperator = function() {
        function SwitchMapOperator2(project) {
          this.project = project;
        }
        SwitchMapOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
        };
        return SwitchMapOperator2;
      }();
      var SwitchMapSubscriber = function(_super) {
        __extends(SwitchMapSubscriber2, _super);
        function SwitchMapSubscriber2(destination, project) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.index = 0;
          return _this;
        }
        SwitchMapSubscriber2.prototype._next = function(value) {
          var result;
          var index = this.index++;
          try {
            result = this.project(value, index);
          } catch (error) {
            this.destination.error(error);
            return;
          }
          this._innerSub(result);
        };
        SwitchMapSubscriber2.prototype._innerSub = function(result) {
          var innerSubscription = this.innerSubscription;
          if (innerSubscription) {
            innerSubscription.unsubscribe();
          }
          var innerSubscriber = new innerSubscribe_1.SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          this.innerSubscription = innerSubscribe_1.innerSubscribe(result, innerSubscriber);
          if (this.innerSubscription !== innerSubscriber) {
            destination.add(this.innerSubscription);
          }
        };
        SwitchMapSubscriber2.prototype._complete = function() {
          var innerSubscription = this.innerSubscription;
          if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
          }
          this.unsubscribe();
        };
        SwitchMapSubscriber2.prototype._unsubscribe = function() {
          this.innerSubscription = void 0;
        };
        SwitchMapSubscriber2.prototype.notifyComplete = function() {
          this.innerSubscription = void 0;
          if (this.isStopped) {
            _super.prototype._complete.call(this);
          }
        };
        SwitchMapSubscriber2.prototype.notifyNext = function(innerValue) {
          this.destination.next(innerValue);
        };
        return SwitchMapSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/switchAll.js
  var require_switchAll = __commonJS({
    "node_modules/rxjs/internal/operators/switchAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var switchMap_1 = require_switchMap();
      var identity_1 = require_identity();
      function switchAll() {
        return switchMap_1.switchMap(identity_1.identity);
      }
      exports.switchAll = switchAll;
    }
  });

  // node_modules/rxjs/internal/operators/switchMapTo.js
  var require_switchMapTo = __commonJS({
    "node_modules/rxjs/internal/operators/switchMapTo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var switchMap_1 = require_switchMap();
      function switchMapTo(innerObservable, resultSelector) {
        return resultSelector ? switchMap_1.switchMap(function() {
          return innerObservable;
        }, resultSelector) : switchMap_1.switchMap(function() {
          return innerObservable;
        });
      }
      exports.switchMapTo = switchMapTo;
    }
  });

  // node_modules/rxjs/internal/operators/takeUntil.js
  var require_takeUntil = __commonJS({
    "node_modules/rxjs/internal/operators/takeUntil.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      function takeUntil(notifier) {
        return function(source) {
          return source.lift(new TakeUntilOperator(notifier));
        };
      }
      exports.takeUntil = takeUntil;
      var TakeUntilOperator = function() {
        function TakeUntilOperator2(notifier) {
          this.notifier = notifier;
        }
        TakeUntilOperator2.prototype.call = function(subscriber, source) {
          var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
          var notifierSubscription = innerSubscribe_1.innerSubscribe(this.notifier, new innerSubscribe_1.SimpleInnerSubscriber(takeUntilSubscriber));
          if (notifierSubscription && !takeUntilSubscriber.seenValue) {
            takeUntilSubscriber.add(notifierSubscription);
            return source.subscribe(takeUntilSubscriber);
          }
          return takeUntilSubscriber;
        };
        return TakeUntilOperator2;
      }();
      var TakeUntilSubscriber = function(_super) {
        __extends(TakeUntilSubscriber2, _super);
        function TakeUntilSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.seenValue = false;
          return _this;
        }
        TakeUntilSubscriber2.prototype.notifyNext = function() {
          this.seenValue = true;
          this.complete();
        };
        TakeUntilSubscriber2.prototype.notifyComplete = function() {
        };
        return TakeUntilSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/takeWhile.js
  var require_takeWhile = __commonJS({
    "node_modules/rxjs/internal/operators/takeWhile.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      function takeWhile(predicate, inclusive) {
        if (inclusive === void 0) {
          inclusive = false;
        }
        return function(source) {
          return source.lift(new TakeWhileOperator(predicate, inclusive));
        };
      }
      exports.takeWhile = takeWhile;
      var TakeWhileOperator = function() {
        function TakeWhileOperator2(predicate, inclusive) {
          this.predicate = predicate;
          this.inclusive = inclusive;
        }
        TakeWhileOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate, this.inclusive));
        };
        return TakeWhileOperator2;
      }();
      var TakeWhileSubscriber = function(_super) {
        __extends(TakeWhileSubscriber2, _super);
        function TakeWhileSubscriber2(destination, predicate, inclusive) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.inclusive = inclusive;
          _this.index = 0;
          return _this;
        }
        TakeWhileSubscriber2.prototype._next = function(value) {
          var destination = this.destination;
          var result;
          try {
            result = this.predicate(value, this.index++);
          } catch (err) {
            destination.error(err);
            return;
          }
          this.nextOrComplete(value, result);
        };
        TakeWhileSubscriber2.prototype.nextOrComplete = function(value, predicateResult) {
          var destination = this.destination;
          if (Boolean(predicateResult)) {
            destination.next(value);
          } else {
            if (this.inclusive) {
              destination.next(value);
            }
            destination.complete();
          }
        };
        return TakeWhileSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/tap.js
  var require_tap = __commonJS({
    "node_modules/rxjs/internal/operators/tap.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var noop_1 = require_noop();
      var isFunction_1 = require_isFunction();
      function tap(nextOrObserver, error, complete) {
        return function tapOperatorFunction(source) {
          return source.lift(new DoOperator(nextOrObserver, error, complete));
        };
      }
      exports.tap = tap;
      var DoOperator = function() {
        function DoOperator2(nextOrObserver, error, complete) {
          this.nextOrObserver = nextOrObserver;
          this.error = error;
          this.complete = complete;
        }
        DoOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
        };
        return DoOperator2;
      }();
      var TapSubscriber = function(_super) {
        __extends(TapSubscriber2, _super);
        function TapSubscriber2(destination, observerOrNext, error, complete) {
          var _this = _super.call(this, destination) || this;
          _this._tapNext = noop_1.noop;
          _this._tapError = noop_1.noop;
          _this._tapComplete = noop_1.noop;
          _this._tapError = error || noop_1.noop;
          _this._tapComplete = complete || noop_1.noop;
          if (isFunction_1.isFunction(observerOrNext)) {
            _this._context = _this;
            _this._tapNext = observerOrNext;
          } else if (observerOrNext) {
            _this._context = observerOrNext;
            _this._tapNext = observerOrNext.next || noop_1.noop;
            _this._tapError = observerOrNext.error || noop_1.noop;
            _this._tapComplete = observerOrNext.complete || noop_1.noop;
          }
          return _this;
        }
        TapSubscriber2.prototype._next = function(value) {
          try {
            this._tapNext.call(this._context, value);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(value);
        };
        TapSubscriber2.prototype._error = function(err) {
          try {
            this._tapError.call(this._context, err);
          } catch (err2) {
            this.destination.error(err2);
            return;
          }
          this.destination.error(err);
        };
        TapSubscriber2.prototype._complete = function() {
          try {
            this._tapComplete.call(this._context);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          return this.destination.complete();
        };
        return TapSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/throttle.js
  var require_throttle = __commonJS({
    "node_modules/rxjs/internal/operators/throttle.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var innerSubscribe_1 = require_innerSubscribe();
      exports.defaultThrottleConfig = {
        leading: true,
        trailing: false
      };
      function throttle(durationSelector, config) {
        if (config === void 0) {
          config = exports.defaultThrottleConfig;
        }
        return function(source) {
          return source.lift(new ThrottleOperator(durationSelector, !!config.leading, !!config.trailing));
        };
      }
      exports.throttle = throttle;
      var ThrottleOperator = function() {
        function ThrottleOperator2(durationSelector, leading, trailing) {
          this.durationSelector = durationSelector;
          this.leading = leading;
          this.trailing = trailing;
        }
        ThrottleOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
        };
        return ThrottleOperator2;
      }();
      var ThrottleSubscriber = function(_super) {
        __extends(ThrottleSubscriber2, _super);
        function ThrottleSubscriber2(destination, durationSelector, _leading, _trailing) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.durationSelector = durationSelector;
          _this._leading = _leading;
          _this._trailing = _trailing;
          _this._hasValue = false;
          return _this;
        }
        ThrottleSubscriber2.prototype._next = function(value) {
          this._hasValue = true;
          this._sendValue = value;
          if (!this._throttled) {
            if (this._leading) {
              this.send();
            } else {
              this.throttle(value);
            }
          }
        };
        ThrottleSubscriber2.prototype.send = function() {
          var _a = this, _hasValue = _a._hasValue, _sendValue = _a._sendValue;
          if (_hasValue) {
            this.destination.next(_sendValue);
            this.throttle(_sendValue);
          }
          this._hasValue = false;
          this._sendValue = void 0;
        };
        ThrottleSubscriber2.prototype.throttle = function(value) {
          var duration = this.tryDurationSelector(value);
          if (!!duration) {
            this.add(this._throttled = innerSubscribe_1.innerSubscribe(duration, new innerSubscribe_1.SimpleInnerSubscriber(this)));
          }
        };
        ThrottleSubscriber2.prototype.tryDurationSelector = function(value) {
          try {
            return this.durationSelector(value);
          } catch (err) {
            this.destination.error(err);
            return null;
          }
        };
        ThrottleSubscriber2.prototype.throttlingDone = function() {
          var _a = this, _throttled = _a._throttled, _trailing = _a._trailing;
          if (_throttled) {
            _throttled.unsubscribe();
          }
          this._throttled = void 0;
          if (_trailing) {
            this.send();
          }
        };
        ThrottleSubscriber2.prototype.notifyNext = function() {
          this.throttlingDone();
        };
        ThrottleSubscriber2.prototype.notifyComplete = function() {
          this.throttlingDone();
        };
        return ThrottleSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/throttleTime.js
  var require_throttleTime = __commonJS({
    "node_modules/rxjs/internal/operators/throttleTime.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var async_1 = require_async();
      var throttle_1 = require_throttle();
      function throttleTime(duration, scheduler, config) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        if (config === void 0) {
          config = throttle_1.defaultThrottleConfig;
        }
        return function(source) {
          return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
        };
      }
      exports.throttleTime = throttleTime;
      var ThrottleTimeOperator = function() {
        function ThrottleTimeOperator2(duration, scheduler, leading, trailing) {
          this.duration = duration;
          this.scheduler = scheduler;
          this.leading = leading;
          this.trailing = trailing;
        }
        ThrottleTimeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
        };
        return ThrottleTimeOperator2;
      }();
      var ThrottleTimeSubscriber = function(_super) {
        __extends(ThrottleTimeSubscriber2, _super);
        function ThrottleTimeSubscriber2(destination, duration, scheduler, leading, trailing) {
          var _this = _super.call(this, destination) || this;
          _this.duration = duration;
          _this.scheduler = scheduler;
          _this.leading = leading;
          _this.trailing = trailing;
          _this._hasTrailingValue = false;
          _this._trailingValue = null;
          return _this;
        }
        ThrottleTimeSubscriber2.prototype._next = function(value) {
          if (this.throttled) {
            if (this.trailing) {
              this._trailingValue = value;
              this._hasTrailingValue = true;
            }
          } else {
            this.add(this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this }));
            if (this.leading) {
              this.destination.next(value);
            } else if (this.trailing) {
              this._trailingValue = value;
              this._hasTrailingValue = true;
            }
          }
        };
        ThrottleTimeSubscriber2.prototype._complete = function() {
          if (this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this.destination.complete();
          } else {
            this.destination.complete();
          }
        };
        ThrottleTimeSubscriber2.prototype.clearThrottle = function() {
          var throttled = this.throttled;
          if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
              this.destination.next(this._trailingValue);
              this._trailingValue = null;
              this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
          }
        };
        return ThrottleTimeSubscriber2;
      }(Subscriber_1.Subscriber);
      function dispatchNext(arg) {
        var subscriber = arg.subscriber;
        subscriber.clearThrottle();
      }
    }
  });

  // node_modules/rxjs/internal/operators/timeInterval.js
  var require_timeInterval = __commonJS({
    "node_modules/rxjs/internal/operators/timeInterval.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var scan_1 = require_scan();
      var defer_1 = require_defer();
      var map_1 = require_map();
      function timeInterval(scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return function(source) {
          return defer_1.defer(function() {
            return source.pipe(scan_1.scan(function(_a, value) {
              var current = _a.current;
              return { value, current: scheduler.now(), last: current };
            }, { current: scheduler.now(), value: void 0, last: void 0 }), map_1.map(function(_a) {
              var current = _a.current, last = _a.last, value = _a.value;
              return new TimeInterval(value, current - last);
            }));
          });
        };
      }
      exports.timeInterval = timeInterval;
      var TimeInterval = /* @__PURE__ */ function() {
        function TimeInterval2(value, interval) {
          this.value = value;
          this.interval = interval;
        }
        return TimeInterval2;
      }();
      exports.TimeInterval = TimeInterval;
    }
  });

  // node_modules/rxjs/internal/operators/timeoutWith.js
  var require_timeoutWith = __commonJS({
    "node_modules/rxjs/internal/operators/timeoutWith.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var isDate_1 = require_isDate();
      var innerSubscribe_1 = require_innerSubscribe();
      function timeoutWith(due, withObservable, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return function(source) {
          var absoluteTimeout = isDate_1.isDate(due);
          var waitFor = absoluteTimeout ? +due - scheduler.now() : Math.abs(due);
          return source.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
        };
      }
      exports.timeoutWith = timeoutWith;
      var TimeoutWithOperator = function() {
        function TimeoutWithOperator2(waitFor, absoluteTimeout, withObservable, scheduler) {
          this.waitFor = waitFor;
          this.absoluteTimeout = absoluteTimeout;
          this.withObservable = withObservable;
          this.scheduler = scheduler;
        }
        TimeoutWithOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
        };
        return TimeoutWithOperator2;
      }();
      var TimeoutWithSubscriber = function(_super) {
        __extends(TimeoutWithSubscriber2, _super);
        function TimeoutWithSubscriber2(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.absoluteTimeout = absoluteTimeout;
          _this.waitFor = waitFor;
          _this.withObservable = withObservable;
          _this.scheduler = scheduler;
          _this.scheduleTimeout();
          return _this;
        }
        TimeoutWithSubscriber2.dispatchTimeout = function(subscriber) {
          var withObservable = subscriber.withObservable;
          subscriber._unsubscribeAndRecycle();
          subscriber.add(innerSubscribe_1.innerSubscribe(withObservable, new innerSubscribe_1.SimpleInnerSubscriber(subscriber)));
        };
        TimeoutWithSubscriber2.prototype.scheduleTimeout = function() {
          var action = this.action;
          if (action) {
            this.action = action.schedule(this, this.waitFor);
          } else {
            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber2.dispatchTimeout, this.waitFor, this));
          }
        };
        TimeoutWithSubscriber2.prototype._next = function(value) {
          if (!this.absoluteTimeout) {
            this.scheduleTimeout();
          }
          _super.prototype._next.call(this, value);
        };
        TimeoutWithSubscriber2.prototype._unsubscribe = function() {
          this.action = void 0;
          this.scheduler = null;
          this.withObservable = null;
        };
        return TimeoutWithSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/timeout.js
  var require_timeout = __commonJS({
    "node_modules/rxjs/internal/operators/timeout.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var TimeoutError_1 = require_TimeoutError();
      var timeoutWith_1 = require_timeoutWith();
      var throwError_1 = require_throwError();
      function timeout(due, scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return timeoutWith_1.timeoutWith(due, throwError_1.throwError(new TimeoutError_1.TimeoutError()), scheduler);
      }
      exports.timeout = timeout;
    }
  });

  // node_modules/rxjs/internal/operators/timestamp.js
  var require_timestamp = __commonJS({
    "node_modules/rxjs/internal/operators/timestamp.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async();
      var map_1 = require_map();
      function timestamp(scheduler) {
        if (scheduler === void 0) {
          scheduler = async_1.async;
        }
        return map_1.map(function(value) {
          return new Timestamp(value, scheduler.now());
        });
      }
      exports.timestamp = timestamp;
      var Timestamp = /* @__PURE__ */ function() {
        function Timestamp2(value, timestamp2) {
          this.value = value;
          this.timestamp = timestamp2;
        }
        return Timestamp2;
      }();
      exports.Timestamp = Timestamp;
    }
  });

  // node_modules/rxjs/internal/operators/toArray.js
  var require_toArray = __commonJS({
    "node_modules/rxjs/internal/operators/toArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var reduce_1 = require_reduce();
      function toArrayReducer(arr, item, index) {
        if (index === 0) {
          return [item];
        }
        arr.push(item);
        return arr;
      }
      function toArray() {
        return reduce_1.reduce(toArrayReducer, []);
      }
      exports.toArray = toArray;
    }
  });

  // node_modules/rxjs/internal/operators/window.js
  var require_window = __commonJS({
    "node_modules/rxjs/internal/operators/window.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var innerSubscribe_1 = require_innerSubscribe();
      function window2(windowBoundaries) {
        return function windowOperatorFunction(source) {
          return source.lift(new WindowOperator(windowBoundaries));
        };
      }
      exports.window = window2;
      var WindowOperator = function() {
        function WindowOperator2(windowBoundaries) {
          this.windowBoundaries = windowBoundaries;
        }
        WindowOperator2.prototype.call = function(subscriber, source) {
          var windowSubscriber = new WindowSubscriber(subscriber);
          var sourceSubscription = source.subscribe(windowSubscriber);
          if (!sourceSubscription.closed) {
            windowSubscriber.add(innerSubscribe_1.innerSubscribe(this.windowBoundaries, new innerSubscribe_1.SimpleInnerSubscriber(windowSubscriber)));
          }
          return sourceSubscription;
        };
        return WindowOperator2;
      }();
      var WindowSubscriber = function(_super) {
        __extends(WindowSubscriber2, _super);
        function WindowSubscriber2(destination) {
          var _this = _super.call(this, destination) || this;
          _this.window = new Subject_1.Subject();
          destination.next(_this.window);
          return _this;
        }
        WindowSubscriber2.prototype.notifyNext = function() {
          this.openWindow();
        };
        WindowSubscriber2.prototype.notifyError = function(error) {
          this._error(error);
        };
        WindowSubscriber2.prototype.notifyComplete = function() {
          this._complete();
        };
        WindowSubscriber2.prototype._next = function(value) {
          this.window.next(value);
        };
        WindowSubscriber2.prototype._error = function(err) {
          this.window.error(err);
          this.destination.error(err);
        };
        WindowSubscriber2.prototype._complete = function() {
          this.window.complete();
          this.destination.complete();
        };
        WindowSubscriber2.prototype._unsubscribe = function() {
          this.window = null;
        };
        WindowSubscriber2.prototype.openWindow = function() {
          var prevWindow = this.window;
          if (prevWindow) {
            prevWindow.complete();
          }
          var destination = this.destination;
          var newWindow = this.window = new Subject_1.Subject();
          destination.next(newWindow);
        };
        return WindowSubscriber2;
      }(innerSubscribe_1.SimpleOuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/windowCount.js
  var require_windowCount = __commonJS({
    "node_modules/rxjs/internal/operators/windowCount.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subscriber_1 = require_Subscriber();
      var Subject_1 = require_Subject();
      function windowCount(windowSize, startWindowEvery) {
        if (startWindowEvery === void 0) {
          startWindowEvery = 0;
        }
        return function windowCountOperatorFunction(source) {
          return source.lift(new WindowCountOperator(windowSize, startWindowEvery));
        };
      }
      exports.windowCount = windowCount;
      var WindowCountOperator = function() {
        function WindowCountOperator2(windowSize, startWindowEvery) {
          this.windowSize = windowSize;
          this.startWindowEvery = startWindowEvery;
        }
        WindowCountOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
        };
        return WindowCountOperator2;
      }();
      var WindowCountSubscriber = function(_super) {
        __extends(WindowCountSubscriber2, _super);
        function WindowCountSubscriber2(destination, windowSize, startWindowEvery) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.windowSize = windowSize;
          _this.startWindowEvery = startWindowEvery;
          _this.windows = [new Subject_1.Subject()];
          _this.count = 0;
          destination.next(_this.windows[0]);
          return _this;
        }
        WindowCountSubscriber2.prototype._next = function(value) {
          var startWindowEvery = this.startWindowEvery > 0 ? this.startWindowEvery : this.windowSize;
          var destination = this.destination;
          var windowSize = this.windowSize;
          var windows = this.windows;
          var len = windows.length;
          for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
          }
          var c = this.count - windowSize + 1;
          if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
          }
          if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            destination.next(window_1);
          }
        };
        WindowCountSubscriber2.prototype._error = function(err) {
          var windows = this.windows;
          if (windows) {
            while (windows.length > 0 && !this.closed) {
              windows.shift().error(err);
            }
          }
          this.destination.error(err);
        };
        WindowCountSubscriber2.prototype._complete = function() {
          var windows = this.windows;
          if (windows) {
            while (windows.length > 0 && !this.closed) {
              windows.shift().complete();
            }
          }
          this.destination.complete();
        };
        WindowCountSubscriber2.prototype._unsubscribe = function() {
          this.count = 0;
          this.windows = null;
        };
        return WindowCountSubscriber2;
      }(Subscriber_1.Subscriber);
    }
  });

  // node_modules/rxjs/internal/operators/windowTime.js
  var require_windowTime = __commonJS({
    "node_modules/rxjs/internal/operators/windowTime.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var async_1 = require_async();
      var Subscriber_1 = require_Subscriber();
      var isNumeric_1 = require_isNumeric();
      var isScheduler_1 = require_isScheduler();
      function windowTime(windowTimeSpan) {
        var scheduler = async_1.async;
        var windowCreationInterval = null;
        var maxWindowSize = Number.POSITIVE_INFINITY;
        if (isScheduler_1.isScheduler(arguments[3])) {
          scheduler = arguments[3];
        }
        if (isScheduler_1.isScheduler(arguments[2])) {
          scheduler = arguments[2];
        } else if (isNumeric_1.isNumeric(arguments[2])) {
          maxWindowSize = Number(arguments[2]);
        }
        if (isScheduler_1.isScheduler(arguments[1])) {
          scheduler = arguments[1];
        } else if (isNumeric_1.isNumeric(arguments[1])) {
          windowCreationInterval = Number(arguments[1]);
        }
        return function windowTimeOperatorFunction(source) {
          return source.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
        };
      }
      exports.windowTime = windowTime;
      var WindowTimeOperator = function() {
        function WindowTimeOperator2(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
          this.windowTimeSpan = windowTimeSpan;
          this.windowCreationInterval = windowCreationInterval;
          this.maxWindowSize = maxWindowSize;
          this.scheduler = scheduler;
        }
        WindowTimeOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
        };
        return WindowTimeOperator2;
      }();
      var CountedSubject = function(_super) {
        __extends(CountedSubject2, _super);
        function CountedSubject2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this._numberOfNextedValues = 0;
          return _this;
        }
        CountedSubject2.prototype.next = function(value) {
          this._numberOfNextedValues++;
          _super.prototype.next.call(this, value);
        };
        Object.defineProperty(CountedSubject2.prototype, "numberOfNextedValues", {
          get: function() {
            return this._numberOfNextedValues;
          },
          enumerable: true,
          configurable: true
        });
        return CountedSubject2;
      }(Subject_1.Subject);
      var WindowTimeSubscriber = function(_super) {
        __extends(WindowTimeSubscriber2, _super);
        function WindowTimeSubscriber2(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.windowTimeSpan = windowTimeSpan;
          _this.windowCreationInterval = windowCreationInterval;
          _this.maxWindowSize = maxWindowSize;
          _this.scheduler = scheduler;
          _this.windows = [];
          var window2 = _this.openWindow();
          if (windowCreationInterval !== null && windowCreationInterval >= 0) {
            var closeState = { subscriber: _this, window: window2, context: null };
            var creationState = { windowTimeSpan, windowCreationInterval, subscriber: _this, scheduler };
            _this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
            _this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
          } else {
            var timeSpanOnlyState = { subscriber: _this, window: window2, windowTimeSpan };
            _this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
          }
          return _this;
        }
        WindowTimeSubscriber2.prototype._next = function(value) {
          var windows = this.windows;
          var len = windows.length;
          for (var i = 0; i < len; i++) {
            var window_1 = windows[i];
            if (!window_1.closed) {
              window_1.next(value);
              if (window_1.numberOfNextedValues >= this.maxWindowSize) {
                this.closeWindow(window_1);
              }
            }
          }
        };
        WindowTimeSubscriber2.prototype._error = function(err) {
          var windows = this.windows;
          while (windows.length > 0) {
            windows.shift().error(err);
          }
          this.destination.error(err);
        };
        WindowTimeSubscriber2.prototype._complete = function() {
          var windows = this.windows;
          while (windows.length > 0) {
            var window_2 = windows.shift();
            if (!window_2.closed) {
              window_2.complete();
            }
          }
          this.destination.complete();
        };
        WindowTimeSubscriber2.prototype.openWindow = function() {
          var window2 = new CountedSubject();
          this.windows.push(window2);
          var destination = this.destination;
          destination.next(window2);
          return window2;
        };
        WindowTimeSubscriber2.prototype.closeWindow = function(window2) {
          window2.complete();
          var windows = this.windows;
          windows.splice(windows.indexOf(window2), 1);
        };
        return WindowTimeSubscriber2;
      }(Subscriber_1.Subscriber);
      function dispatchWindowTimeSpanOnly(state) {
        var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window2 = state.window;
        if (window2) {
          subscriber.closeWindow(window2);
        }
        state.window = subscriber.openWindow();
        this.schedule(state, windowTimeSpan);
      }
      function dispatchWindowCreation(state) {
        var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
        var window2 = subscriber.openWindow();
        var action = this;
        var context = { action, subscription: null };
        var timeSpanState = { subscriber, window: window2, context };
        context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
        action.add(context.subscription);
        action.schedule(state, windowCreationInterval);
      }
      function dispatchWindowClose(state) {
        var subscriber = state.subscriber, window2 = state.window, context = state.context;
        if (context && context.action && context.subscription) {
          context.action.remove(context.subscription);
        }
        subscriber.closeWindow(window2);
      }
    }
  });

  // node_modules/rxjs/internal/operators/windowToggle.js
  var require_windowToggle = __commonJS({
    "node_modules/rxjs/internal/operators/windowToggle.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var Subscription_1 = require_Subscription();
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      function windowToggle(openings, closingSelector) {
        return function(source) {
          return source.lift(new WindowToggleOperator(openings, closingSelector));
        };
      }
      exports.windowToggle = windowToggle;
      var WindowToggleOperator = function() {
        function WindowToggleOperator2(openings, closingSelector) {
          this.openings = openings;
          this.closingSelector = closingSelector;
        }
        WindowToggleOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
        };
        return WindowToggleOperator2;
      }();
      var WindowToggleSubscriber = function(_super) {
        __extends(WindowToggleSubscriber2, _super);
        function WindowToggleSubscriber2(destination, openings, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.openings = openings;
          _this.closingSelector = closingSelector;
          _this.contexts = [];
          _this.add(_this.openSubscription = subscribeToResult_1.subscribeToResult(_this, openings, openings));
          return _this;
        }
        WindowToggleSubscriber2.prototype._next = function(value) {
          var contexts = this.contexts;
          if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
              contexts[i].window.next(value);
            }
          }
        };
        WindowToggleSubscriber2.prototype._error = function(err) {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
              var context_1 = contexts[index];
              context_1.window.error(err);
              context_1.subscription.unsubscribe();
            }
          }
          _super.prototype._error.call(this, err);
        };
        WindowToggleSubscriber2.prototype._complete = function() {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
              var context_2 = contexts[index];
              context_2.window.complete();
              context_2.subscription.unsubscribe();
            }
          }
          _super.prototype._complete.call(this);
        };
        WindowToggleSubscriber2.prototype._unsubscribe = function() {
          var contexts = this.contexts;
          this.contexts = null;
          if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
              var context_3 = contexts[index];
              context_3.window.unsubscribe();
              context_3.subscription.unsubscribe();
            }
          }
        };
        WindowToggleSubscriber2.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
          if (outerValue === this.openings) {
            var closingNotifier = void 0;
            try {
              var closingSelector = this.closingSelector;
              closingNotifier = closingSelector(innerValue);
            } catch (e) {
              return this.error(e);
            }
            var window_1 = new Subject_1.Subject();
            var subscription = new Subscription_1.Subscription();
            var context_4 = { window: window_1, subscription };
            this.contexts.push(context_4);
            var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context_4);
            if (innerSubscription.closed) {
              this.closeWindow(this.contexts.length - 1);
            } else {
              innerSubscription.context = context_4;
              subscription.add(innerSubscription);
            }
            this.destination.next(window_1);
          } else {
            this.closeWindow(this.contexts.indexOf(outerValue));
          }
        };
        WindowToggleSubscriber2.prototype.notifyError = function(err) {
          this.error(err);
        };
        WindowToggleSubscriber2.prototype.notifyComplete = function(inner) {
          if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
          }
        };
        WindowToggleSubscriber2.prototype.closeWindow = function(index) {
          if (index === -1) {
            return;
          }
          var contexts = this.contexts;
          var context = contexts[index];
          var window2 = context.window, subscription = context.subscription;
          contexts.splice(index, 1);
          window2.complete();
          subscription.unsubscribe();
        };
        return WindowToggleSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/windowWhen.js
  var require_windowWhen = __commonJS({
    "node_modules/rxjs/internal/operators/windowWhen.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var Subject_1 = require_Subject();
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      function windowWhen(closingSelector) {
        return function windowWhenOperatorFunction(source) {
          return source.lift(new WindowOperator(closingSelector));
        };
      }
      exports.windowWhen = windowWhen;
      var WindowOperator = function() {
        function WindowOperator2(closingSelector) {
          this.closingSelector = closingSelector;
        }
        WindowOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new WindowSubscriber(subscriber, this.closingSelector));
        };
        return WindowOperator2;
      }();
      var WindowSubscriber = function(_super) {
        __extends(WindowSubscriber2, _super);
        function WindowSubscriber2(destination, closingSelector) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          _this.closingSelector = closingSelector;
          _this.openWindow();
          return _this;
        }
        WindowSubscriber2.prototype.notifyNext = function(_outerValue, _innerValue, _outerIndex, _innerIndex, innerSub) {
          this.openWindow(innerSub);
        };
        WindowSubscriber2.prototype.notifyError = function(error) {
          this._error(error);
        };
        WindowSubscriber2.prototype.notifyComplete = function(innerSub) {
          this.openWindow(innerSub);
        };
        WindowSubscriber2.prototype._next = function(value) {
          this.window.next(value);
        };
        WindowSubscriber2.prototype._error = function(err) {
          this.window.error(err);
          this.destination.error(err);
          this.unsubscribeClosingNotification();
        };
        WindowSubscriber2.prototype._complete = function() {
          this.window.complete();
          this.destination.complete();
          this.unsubscribeClosingNotification();
        };
        WindowSubscriber2.prototype.unsubscribeClosingNotification = function() {
          if (this.closingNotification) {
            this.closingNotification.unsubscribe();
          }
        };
        WindowSubscriber2.prototype.openWindow = function(innerSub) {
          if (innerSub === void 0) {
            innerSub = null;
          }
          if (innerSub) {
            this.remove(innerSub);
            innerSub.unsubscribe();
          }
          var prevWindow = this.window;
          if (prevWindow) {
            prevWindow.complete();
          }
          var window2 = this.window = new Subject_1.Subject();
          this.destination.next(window2);
          var closingNotifier;
          try {
            var closingSelector = this.closingSelector;
            closingNotifier = closingSelector();
          } catch (e) {
            this.destination.error(e);
            this.window.error(e);
            return;
          }
          this.add(this.closingNotification = subscribeToResult_1.subscribeToResult(this, closingNotifier));
        };
        return WindowSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/withLatestFrom.js
  var require_withLatestFrom = __commonJS({
    "node_modules/rxjs/internal/operators/withLatestFrom.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        return function(d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      var OuterSubscriber_1 = require_OuterSubscriber();
      var subscribeToResult_1 = require_subscribeToResult();
      function withLatestFrom() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return function(source) {
          var project;
          if (typeof args[args.length - 1] === "function") {
            project = args.pop();
          }
          var observables = args;
          return source.lift(new WithLatestFromOperator(observables, project));
        };
      }
      exports.withLatestFrom = withLatestFrom;
      var WithLatestFromOperator = function() {
        function WithLatestFromOperator2(observables, project) {
          this.observables = observables;
          this.project = project;
        }
        WithLatestFromOperator2.prototype.call = function(subscriber, source) {
          return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
        };
        return WithLatestFromOperator2;
      }();
      var WithLatestFromSubscriber = function(_super) {
        __extends(WithLatestFromSubscriber2, _super);
        function WithLatestFromSubscriber2(destination, observables, project) {
          var _this = _super.call(this, destination) || this;
          _this.observables = observables;
          _this.project = project;
          _this.toRespond = [];
          var len = observables.length;
          _this.values = new Array(len);
          for (var i = 0; i < len; i++) {
            _this.toRespond.push(i);
          }
          for (var i = 0; i < len; i++) {
            var observable = observables[i];
            _this.add(subscribeToResult_1.subscribeToResult(_this, observable, void 0, i));
          }
          return _this;
        }
        WithLatestFromSubscriber2.prototype.notifyNext = function(_outerValue, innerValue, outerIndex) {
          this.values[outerIndex] = innerValue;
          var toRespond = this.toRespond;
          if (toRespond.length > 0) {
            var found = toRespond.indexOf(outerIndex);
            if (found !== -1) {
              toRespond.splice(found, 1);
            }
          }
        };
        WithLatestFromSubscriber2.prototype.notifyComplete = function() {
        };
        WithLatestFromSubscriber2.prototype._next = function(value) {
          if (this.toRespond.length === 0) {
            var args = [value].concat(this.values);
            if (this.project) {
              this._tryProject(args);
            } else {
              this.destination.next(args);
            }
          }
        };
        WithLatestFromSubscriber2.prototype._tryProject = function(args) {
          var result;
          try {
            result = this.project.apply(this, args);
          } catch (err) {
            this.destination.error(err);
            return;
          }
          this.destination.next(result);
        };
        return WithLatestFromSubscriber2;
      }(OuterSubscriber_1.OuterSubscriber);
    }
  });

  // node_modules/rxjs/internal/operators/zip.js
  var require_zip2 = __commonJS({
    "node_modules/rxjs/internal/operators/zip.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var zip_1 = require_zip();
      function zip() {
        var observables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
        }
        return function zipOperatorFunction(source) {
          return source.lift.call(zip_1.zip.apply(void 0, [source].concat(observables)));
        };
      }
      exports.zip = zip;
    }
  });

  // node_modules/rxjs/internal/operators/zipAll.js
  var require_zipAll = __commonJS({
    "node_modules/rxjs/internal/operators/zipAll.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var zip_1 = require_zip();
      function zipAll(project) {
        return function(source) {
          return source.lift(new zip_1.ZipOperator(project));
        };
      }
      exports.zipAll = zipAll;
    }
  });

  // node_modules/rxjs/operators/index.js
  var require_operators = __commonJS({
    "node_modules/rxjs/operators/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var audit_1 = require_audit();
      exports.audit = audit_1.audit;
      var auditTime_1 = require_auditTime();
      exports.auditTime = auditTime_1.auditTime;
      var buffer_1 = require_buffer();
      exports.buffer = buffer_1.buffer;
      var bufferCount_1 = require_bufferCount();
      exports.bufferCount = bufferCount_1.bufferCount;
      var bufferTime_1 = require_bufferTime();
      exports.bufferTime = bufferTime_1.bufferTime;
      var bufferToggle_1 = require_bufferToggle();
      exports.bufferToggle = bufferToggle_1.bufferToggle;
      var bufferWhen_1 = require_bufferWhen();
      exports.bufferWhen = bufferWhen_1.bufferWhen;
      var catchError_1 = require_catchError();
      exports.catchError = catchError_1.catchError;
      var combineAll_1 = require_combineAll();
      exports.combineAll = combineAll_1.combineAll;
      var combineLatest_1 = require_combineLatest2();
      exports.combineLatest = combineLatest_1.combineLatest;
      var concat_1 = require_concat2();
      exports.concat = concat_1.concat;
      var concatAll_1 = require_concatAll();
      exports.concatAll = concatAll_1.concatAll;
      var concatMap_1 = require_concatMap();
      exports.concatMap = concatMap_1.concatMap;
      var concatMapTo_1 = require_concatMapTo();
      exports.concatMapTo = concatMapTo_1.concatMapTo;
      var count_1 = require_count();
      exports.count = count_1.count;
      var debounce_1 = require_debounce();
      exports.debounce = debounce_1.debounce;
      var debounceTime_1 = require_debounceTime();
      exports.debounceTime = debounceTime_1.debounceTime;
      var defaultIfEmpty_1 = require_defaultIfEmpty();
      exports.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;
      var delay_1 = require_delay();
      exports.delay = delay_1.delay;
      var delayWhen_1 = require_delayWhen();
      exports.delayWhen = delayWhen_1.delayWhen;
      var dematerialize_1 = require_dematerialize();
      exports.dematerialize = dematerialize_1.dematerialize;
      var distinct_1 = require_distinct();
      exports.distinct = distinct_1.distinct;
      var distinctUntilChanged_1 = require_distinctUntilChanged();
      exports.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;
      var distinctUntilKeyChanged_1 = require_distinctUntilKeyChanged();
      exports.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;
      var elementAt_1 = require_elementAt();
      exports.elementAt = elementAt_1.elementAt;
      var endWith_1 = require_endWith();
      exports.endWith = endWith_1.endWith;
      var every_1 = require_every();
      exports.every = every_1.every;
      var exhaust_1 = require_exhaust();
      exports.exhaust = exhaust_1.exhaust;
      var exhaustMap_1 = require_exhaustMap();
      exports.exhaustMap = exhaustMap_1.exhaustMap;
      var expand_1 = require_expand();
      exports.expand = expand_1.expand;
      var filter_1 = require_filter();
      exports.filter = filter_1.filter;
      var finalize_1 = require_finalize();
      exports.finalize = finalize_1.finalize;
      var find_1 = require_find();
      exports.find = find_1.find;
      var findIndex_1 = require_findIndex();
      exports.findIndex = findIndex_1.findIndex;
      var first_1 = require_first();
      exports.first = first_1.first;
      var groupBy_1 = require_groupBy();
      exports.groupBy = groupBy_1.groupBy;
      var ignoreElements_1 = require_ignoreElements();
      exports.ignoreElements = ignoreElements_1.ignoreElements;
      var isEmpty_1 = require_isEmpty();
      exports.isEmpty = isEmpty_1.isEmpty;
      var last_1 = require_last();
      exports.last = last_1.last;
      var map_1 = require_map();
      exports.map = map_1.map;
      var mapTo_1 = require_mapTo();
      exports.mapTo = mapTo_1.mapTo;
      var materialize_1 = require_materialize();
      exports.materialize = materialize_1.materialize;
      var max_1 = require_max();
      exports.max = max_1.max;
      var merge_1 = require_merge2();
      exports.merge = merge_1.merge;
      var mergeAll_1 = require_mergeAll();
      exports.mergeAll = mergeAll_1.mergeAll;
      var mergeMap_1 = require_mergeMap();
      exports.mergeMap = mergeMap_1.mergeMap;
      exports.flatMap = mergeMap_1.flatMap;
      var mergeMapTo_1 = require_mergeMapTo();
      exports.mergeMapTo = mergeMapTo_1.mergeMapTo;
      var mergeScan_1 = require_mergeScan();
      exports.mergeScan = mergeScan_1.mergeScan;
      var min_1 = require_min();
      exports.min = min_1.min;
      var multicast_1 = require_multicast();
      exports.multicast = multicast_1.multicast;
      var observeOn_1 = require_observeOn();
      exports.observeOn = observeOn_1.observeOn;
      var onErrorResumeNext_1 = require_onErrorResumeNext2();
      exports.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNext;
      var pairwise_1 = require_pairwise();
      exports.pairwise = pairwise_1.pairwise;
      var partition_1 = require_partition2();
      exports.partition = partition_1.partition;
      var pluck_1 = require_pluck();
      exports.pluck = pluck_1.pluck;
      var publish_1 = require_publish();
      exports.publish = publish_1.publish;
      var publishBehavior_1 = require_publishBehavior();
      exports.publishBehavior = publishBehavior_1.publishBehavior;
      var publishLast_1 = require_publishLast();
      exports.publishLast = publishLast_1.publishLast;
      var publishReplay_1 = require_publishReplay();
      exports.publishReplay = publishReplay_1.publishReplay;
      var race_1 = require_race2();
      exports.race = race_1.race;
      var reduce_1 = require_reduce();
      exports.reduce = reduce_1.reduce;
      var repeat_1 = require_repeat();
      exports.repeat = repeat_1.repeat;
      var repeatWhen_1 = require_repeatWhen();
      exports.repeatWhen = repeatWhen_1.repeatWhen;
      var retry_1 = require_retry();
      exports.retry = retry_1.retry;
      var retryWhen_1 = require_retryWhen();
      exports.retryWhen = retryWhen_1.retryWhen;
      var refCount_1 = require_refCount();
      exports.refCount = refCount_1.refCount;
      var sample_1 = require_sample();
      exports.sample = sample_1.sample;
      var sampleTime_1 = require_sampleTime();
      exports.sampleTime = sampleTime_1.sampleTime;
      var scan_1 = require_scan();
      exports.scan = scan_1.scan;
      var sequenceEqual_1 = require_sequenceEqual();
      exports.sequenceEqual = sequenceEqual_1.sequenceEqual;
      var share_1 = require_share();
      exports.share = share_1.share;
      var shareReplay_1 = require_shareReplay();
      exports.shareReplay = shareReplay_1.shareReplay;
      var single_1 = require_single();
      exports.single = single_1.single;
      var skip_1 = require_skip();
      exports.skip = skip_1.skip;
      var skipLast_1 = require_skipLast();
      exports.skipLast = skipLast_1.skipLast;
      var skipUntil_1 = require_skipUntil();
      exports.skipUntil = skipUntil_1.skipUntil;
      var skipWhile_1 = require_skipWhile();
      exports.skipWhile = skipWhile_1.skipWhile;
      var startWith_1 = require_startWith();
      exports.startWith = startWith_1.startWith;
      var subscribeOn_1 = require_subscribeOn();
      exports.subscribeOn = subscribeOn_1.subscribeOn;
      var switchAll_1 = require_switchAll();
      exports.switchAll = switchAll_1.switchAll;
      var switchMap_1 = require_switchMap();
      exports.switchMap = switchMap_1.switchMap;
      var switchMapTo_1 = require_switchMapTo();
      exports.switchMapTo = switchMapTo_1.switchMapTo;
      var take_1 = require_take();
      exports.take = take_1.take;
      var takeLast_1 = require_takeLast();
      exports.takeLast = takeLast_1.takeLast;
      var takeUntil_1 = require_takeUntil();
      exports.takeUntil = takeUntil_1.takeUntil;
      var takeWhile_1 = require_takeWhile();
      exports.takeWhile = takeWhile_1.takeWhile;
      var tap_1 = require_tap();
      exports.tap = tap_1.tap;
      var throttle_1 = require_throttle();
      exports.throttle = throttle_1.throttle;
      var throttleTime_1 = require_throttleTime();
      exports.throttleTime = throttleTime_1.throttleTime;
      var throwIfEmpty_1 = require_throwIfEmpty();
      exports.throwIfEmpty = throwIfEmpty_1.throwIfEmpty;
      var timeInterval_1 = require_timeInterval();
      exports.timeInterval = timeInterval_1.timeInterval;
      var timeout_1 = require_timeout();
      exports.timeout = timeout_1.timeout;
      var timeoutWith_1 = require_timeoutWith();
      exports.timeoutWith = timeoutWith_1.timeoutWith;
      var timestamp_1 = require_timestamp();
      exports.timestamp = timestamp_1.timestamp;
      var toArray_1 = require_toArray();
      exports.toArray = toArray_1.toArray;
      var window_1 = require_window();
      exports.window = window_1.window;
      var windowCount_1 = require_windowCount();
      exports.windowCount = windowCount_1.windowCount;
      var windowTime_1 = require_windowTime();
      exports.windowTime = windowTime_1.windowTime;
      var windowToggle_1 = require_windowToggle();
      exports.windowToggle = windowToggle_1.windowToggle;
      var windowWhen_1 = require_windowWhen();
      exports.windowWhen = windowWhen_1.windowWhen;
      var withLatestFrom_1 = require_withLatestFrom();
      exports.withLatestFrom = withLatestFrom_1.withLatestFrom;
      var zip_1 = require_zip2();
      exports.zip = zip_1.zip;
      var zipAll_1 = require_zipAll();
      exports.zipAll = zipAll_1.zipAll;
    }
  });

  // node_modules/muse-js/dist/lib/muse-parse.js
  var require_muse_parse = __commonJS({
    "node_modules/muse-js/dist/lib/muse-parse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var operators_1 = require_operators();
      function parseControl(controlData) {
        return controlData.pipe(operators_1.concatMap(function(data) {
          return data.split("");
        }), operators_1.scan(function(acc, value) {
          if (acc.indexOf("}") >= 0) {
            return value;
          } else {
            return acc + value;
          }
        }, ""), operators_1.filter(function(value) {
          return value.indexOf("}") >= 0;
        }), operators_1.map(function(value) {
          return JSON.parse(value);
        }));
      }
      exports.parseControl = parseControl;
      function decodeUnsigned12BitData(samples) {
        var samples12Bit = [];
        for (var i = 0; i < samples.length; i++) {
          if (i % 3 === 0) {
            samples12Bit.push(samples[i] << 4 | samples[i + 1] >> 4);
          } else {
            samples12Bit.push((samples[i] & 15) << 8 | samples[i + 1]);
            i++;
          }
        }
        return samples12Bit;
      }
      exports.decodeUnsigned12BitData = decodeUnsigned12BitData;
      function decodeUnsigned24BitData(samples) {
        var samples24Bit = [];
        for (var i = 0; i < samples.length; i = i + 3) {
          samples24Bit.push(samples[i] << 16 | samples[i + 1] << 8 | samples[i + 2]);
        }
        return samples24Bit;
      }
      exports.decodeUnsigned24BitData = decodeUnsigned24BitData;
      function decodeEEGSamples(samples) {
        return decodeUnsigned12BitData(samples).map(function(n) {
          return 0.48828125 * (n - 2048);
        });
      }
      exports.decodeEEGSamples = decodeEEGSamples;
      function decodePPGSamples(samples) {
        return decodeUnsigned24BitData(samples);
      }
      exports.decodePPGSamples = decodePPGSamples;
      function parseTelemetry(data) {
        return {
          sequenceId: data.getUint16(0),
          batteryLevel: data.getUint16(2) / 512,
          fuelGaugeVoltage: data.getUint16(4) * 2.2,
          // Next 2 bytes are probably ADC millivolt level, not sure
          temperature: data.getUint16(8)
        };
      }
      exports.parseTelemetry = parseTelemetry;
      function parseImuReading(data, scale) {
        function sample(startIndex) {
          return {
            x: scale * data.getInt16(startIndex),
            y: scale * data.getInt16(startIndex + 2),
            z: scale * data.getInt16(startIndex + 4)
          };
        }
        return {
          sequenceId: data.getUint16(0),
          samples: [sample(2), sample(8), sample(14)]
        };
      }
      function parseAccelerometer(data) {
        return parseImuReading(data, 610352e-10);
      }
      exports.parseAccelerometer = parseAccelerometer;
      function parseGyroscope(data) {
        return parseImuReading(data, 74768e-7);
      }
      exports.parseGyroscope = parseGyroscope;
    }
  });

  // node_modules/muse-js/dist/lib/muse-utils.js
  var require_muse_utils = __commonJS({
    "node_modules/muse-js/dist/lib/muse-utils.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : new P(function(resolve2) {
              resolve2(result.value);
            }).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var rxjs_1 = require_rxjs();
      var operators_1 = require_operators();
      function decodeResponse(bytes) {
        return new TextDecoder().decode(bytes.subarray(1, 1 + bytes[0]));
      }
      exports.decodeResponse = decodeResponse;
      function encodeCommand(cmd) {
        var encoded = new TextEncoder().encode("X" + cmd + "\n");
        encoded[0] = encoded.length - 1;
        return encoded;
      }
      exports.encodeCommand = encodeCommand;
      function observableCharacteristic(characteristic) {
        return __awaiter(this, void 0, void 0, function() {
          var disconnected;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, characteristic.startNotifications()];
              case 1:
                _a.sent();
                disconnected = rxjs_1.fromEvent(characteristic.service.device, "gattserverdisconnected");
                return [2, rxjs_1.fromEvent(characteristic, "characteristicvaluechanged").pipe(operators_1.takeUntil(disconnected), operators_1.map(function(event) {
                  return event.target.value;
                }))];
            }
          });
        });
      }
      exports.observableCharacteristic = observableCharacteristic;
    }
  });

  // node_modules/muse-js/dist/lib/zip-samples.js
  var require_zip_samples = __commonJS({
    "node_modules/muse-js/dist/lib/zip-samples.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var rxjs_1 = require_rxjs();
      var operators_1 = require_operators();
      var muse_1 = require_muse();
      function zipSamples2(eegReadings) {
        var buffer = [];
        var lastTimestamp = null;
        return eegReadings.pipe(operators_1.mergeMap(function(reading) {
          if (reading.timestamp !== lastTimestamp) {
            lastTimestamp = reading.timestamp;
            if (buffer.length) {
              var result = rxjs_1.from([buffer.slice()]);
              buffer.splice(0, buffer.length, reading);
              return result;
            }
          }
          buffer.push(reading);
          return rxjs_1.from([]);
        }), operators_1.concat(rxjs_1.from([buffer])), operators_1.mergeMap(function(readings) {
          var result = readings[0].samples.map(function(x, index) {
            var data = [NaN, NaN, NaN, NaN, NaN];
            for (var _i = 0, readings_1 = readings; _i < readings_1.length; _i++) {
              var reading = readings_1[_i];
              data[reading.electrode] = reading.samples[index];
            }
            return {
              data,
              index: readings[0].index,
              timestamp: readings[0].timestamp + index * 1e3 / muse_1.EEG_FREQUENCY
            };
          });
          return rxjs_1.from(result);
        }));
      }
      exports.zipSamples = zipSamples2;
    }
  });

  // node_modules/muse-js/dist/lib/zip-samplesPpg.js
  var require_zip_samplesPpg = __commonJS({
    "node_modules/muse-js/dist/lib/zip-samplesPpg.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var rxjs_1 = require_rxjs();
      var operators_1 = require_operators();
      var muse_1 = require_muse();
      function zipSamplesPpg(ppgReadings) {
        var buffer = [];
        var lastTimestamp = null;
        return ppgReadings.pipe(operators_1.mergeMap(function(reading) {
          if (reading.timestamp !== lastTimestamp) {
            lastTimestamp = reading.timestamp;
            if (buffer.length) {
              var result = rxjs_1.from([buffer.slice()]);
              buffer.splice(0, buffer.length, reading);
              return result;
            }
          }
          buffer.push(reading);
          return rxjs_1.from([]);
        }), operators_1.concat(rxjs_1.from([buffer])), operators_1.mergeMap(function(readings) {
          var result = readings[0].samples.map(function(x, index) {
            var data = [NaN, NaN, NaN];
            for (var _i = 0, readings_1 = readings; _i < readings_1.length; _i++) {
              var reading = readings_1[_i];
              data[reading.ppgChannel] = reading.samples[index];
            }
            return {
              data,
              index: readings[0].index,
              timestamp: readings[0].timestamp + index * 1e3 / muse_1.PPG_FREQUENCY
            };
          });
          return rxjs_1.from(result);
        }));
      }
      exports.zipSamplesPpg = zipSamplesPpg;
    }
  });

  // node_modules/muse-js/dist/muse.js
  var require_muse = __commonJS({
    "node_modules/muse-js/dist/muse.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : new P(function(resolve2) {
              resolve2(result.value);
            }).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var rxjs_1 = require_rxjs();
      var operators_1 = require_operators();
      var muse_parse_1 = require_muse_parse();
      var muse_utils_1 = require_muse_utils();
      var zip_samples_1 = require_zip_samples();
      exports.zipSamples = zip_samples_1.zipSamples;
      var zip_samplesPpg_1 = require_zip_samplesPpg();
      exports.zipSamplesPpg = zip_samplesPpg_1.zipSamplesPpg;
      exports.MUSE_SERVICE = 65165;
      var CONTROL_CHARACTERISTIC = "273e0001-4c4d-454d-96be-f03bac821358";
      var TELEMETRY_CHARACTERISTIC = "273e000b-4c4d-454d-96be-f03bac821358";
      var GYROSCOPE_CHARACTERISTIC = "273e0009-4c4d-454d-96be-f03bac821358";
      var ACCELEROMETER_CHARACTERISTIC = "273e000a-4c4d-454d-96be-f03bac821358";
      var PPG_CHARACTERISTICS = [
        "273e000f-4c4d-454d-96be-f03bac821358",
        "273e0010-4c4d-454d-96be-f03bac821358",
        "273e0011-4c4d-454d-96be-f03bac821358"
      ];
      exports.PPG_FREQUENCY = 64;
      exports.PPG_SAMPLES_PER_READING = 6;
      var EEG_CHARACTERISTICS = [
        "273e0003-4c4d-454d-96be-f03bac821358",
        "273e0004-4c4d-454d-96be-f03bac821358",
        "273e0005-4c4d-454d-96be-f03bac821358",
        "273e0006-4c4d-454d-96be-f03bac821358",
        "273e0007-4c4d-454d-96be-f03bac821358"
      ];
      exports.EEG_FREQUENCY = 256;
      exports.EEG_SAMPLES_PER_READING = 12;
      exports.ppgChannelNames = ["ambient", "infrared", "red"];
      exports.channelNames = ["TP9", "AF7", "AF8", "TP10", "AUX"];
      var MuseClient2 = (
        /** @class */
        function() {
          function MuseClient3() {
            this.enableAux = false;
            this.enablePpg = false;
            this.deviceName = "";
            this.connectionStatus = new rxjs_1.BehaviorSubject(false);
            this.gatt = null;
            this.lastIndex = null;
            this.lastTimestamp = null;
          }
          MuseClient3.prototype.connect = function(gatt) {
            return __awaiter(this, void 0, void 0, function() {
              var device, _a, service, _b, _c, telemetryCharacteristic, _d, gyroscopeCharacteristic, _e, accelerometerCharacteristic, _f, ppgObservables, ppgChannelCount, _loop_1, this_1, ppgChannelIndex, eegObservables, channelCount, _loop_2, this_2, channelIndex;
              var _this = this;
              return __generator(this, function(_g) {
                switch (_g.label) {
                  case 0:
                    if (!gatt)
                      return [3, 1];
                    this.gatt = gatt;
                    return [3, 4];
                  case 1:
                    return [4, navigator.bluetooth.requestDevice({
                      filters: [{ services: [exports.MUSE_SERVICE] }]
                    })];
                  case 2:
                    device = _g.sent();
                    _a = this;
                    return [4, device.gatt.connect()];
                  case 3:
                    _a.gatt = _g.sent();
                    _g.label = 4;
                  case 4:
                    this.deviceName = this.gatt.device.name || null;
                    return [4, this.gatt.getPrimaryService(exports.MUSE_SERVICE)];
                  case 5:
                    service = _g.sent();
                    rxjs_1.fromEvent(this.gatt.device, "gattserverdisconnected").pipe(operators_1.first()).subscribe(function() {
                      _this.gatt = null;
                      _this.connectionStatus.next(false);
                    });
                    _b = this;
                    return [4, service.getCharacteristic(CONTROL_CHARACTERISTIC)];
                  case 6:
                    _b.controlChar = _g.sent();
                    _c = this;
                    return [4, muse_utils_1.observableCharacteristic(this.controlChar)];
                  case 7:
                    _c.rawControlData = _g.sent().pipe(operators_1.map(function(data) {
                      return muse_utils_1.decodeResponse(new Uint8Array(data.buffer));
                    }), operators_1.share());
                    this.controlResponses = muse_parse_1.parseControl(this.rawControlData);
                    // PATCHED: Skip optional telemetry/gyro/accel for Muse 2016 compatibility
                    // These characteristics don't exist on older Muse devices
                    console.log('⚠️ Skipping optional characteristics (telemetry/gyro/accel) for compatibility');
                    this.telemetryData = new rxjs_1.Subject();
                    this.gyroscopeData = new rxjs_1.Subject();
                    this.accelerometerData = new rxjs_1.Subject();
                    this.eventMarkers = new rxjs_1.Subject();
                    if (!this.enablePpg)
                      return [3, 18];
                    this.ppgCharacteristics = [];
                    ppgObservables = [];
                    ppgChannelCount = PPG_CHARACTERISTICS.length;
                    _loop_1 = function(ppgChannelIndex2) {
                      var characteristicId, ppgChar, _a2, _b2;
                      return __generator(this, function(_c2) {
                        switch (_c2.label) {
                          case 0:
                            characteristicId = PPG_CHARACTERISTICS[ppgChannelIndex2];
                            return [4, service.getCharacteristic(characteristicId)];
                          case 1:
                            ppgChar = _c2.sent();
                            _b2 = (_a2 = ppgObservables).push;
                            return [4, muse_utils_1.observableCharacteristic(ppgChar)];
                          case 2:
                            _b2.apply(_a2, [_c2.sent().pipe(operators_1.map(function(data) {
                              var eventIndex = data.getUint16(0);
                              return {
                                index: eventIndex,
                                ppgChannel: ppgChannelIndex2,
                                samples: muse_parse_1.decodePPGSamples(new Uint8Array(data.buffer).subarray(2)),
                                timestamp: _this.getTimestamp(eventIndex, exports.PPG_SAMPLES_PER_READING, exports.PPG_FREQUENCY)
                              };
                            }))]);
                            this_1.ppgCharacteristics.push(ppgChar);
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    };
                    this_1 = this;
                    ppgChannelIndex = 0;
                    _g.label = 14;
                  case 14:
                    if (!(ppgChannelIndex < ppgChannelCount))
                      return [3, 17];
                    return [5, _loop_1(ppgChannelIndex)];
                  case 15:
                    _g.sent();
                    _g.label = 16;
                  case 16:
                    ppgChannelIndex++;
                    return [3, 14];
                  case 17:
                    this.ppgReadings = rxjs_1.merge.apply(void 0, ppgObservables);
                    _g.label = 18;
                  case 18:
                    this.eegCharacteristics = [];
                    eegObservables = [];
                    channelCount = this.enableAux ? EEG_CHARACTERISTICS.length : 4;
                    _loop_2 = function(channelIndex2) {
                      var characteristicId, eegChar, _a2, _b2;
                      return __generator(this, function(_c2) {
                        switch (_c2.label) {
                          case 0:
                            characteristicId = EEG_CHARACTERISTICS[channelIndex2];
                            return [4, service.getCharacteristic(characteristicId)];
                          case 1:
                            eegChar = _c2.sent();
                            _b2 = (_a2 = eegObservables).push;
                            return [4, muse_utils_1.observableCharacteristic(eegChar)];
                          case 2:
                            _b2.apply(_a2, [_c2.sent().pipe(operators_1.map(function(data) {
                              var eventIndex = data.getUint16(0);
                              return {
                                electrode: channelIndex2,
                                index: eventIndex,
                                samples: muse_parse_1.decodeEEGSamples(new Uint8Array(data.buffer).subarray(2)),
                                timestamp: _this.getTimestamp(eventIndex, exports.EEG_SAMPLES_PER_READING, exports.EEG_FREQUENCY)
                              };
                            }))]);
                            this_2.eegCharacteristics.push(eegChar);
                            return [
                              2
                              /*return*/
                            ];
                        }
                      });
                    };
                    this_2 = this;
                    channelIndex = 0;
                    _g.label = 19;
                  case 19:
                    if (!(channelIndex < channelCount))
                      return [3, 22];
                    return [5, _loop_2(channelIndex)];
                  case 20:
                    _g.sent();
                    _g.label = 21;
                  case 21:
                    channelIndex++;
                    return [3, 19];
                  case 22:
                    this.eegReadings = rxjs_1.merge.apply(void 0, eegObservables);
                    this.connectionStatus.next(true);
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.sendCommand = function(cmd) {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.controlChar.writeValue(muse_utils_1.encodeCommand(cmd))];
                  case 1:
                    _a.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.start = function() {
            return __awaiter(this, void 0, void 0, function() {
              var preset;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.pause()];
                  case 1:
                    _a.sent();
                    preset = "p21";
                    if (this.enablePpg) {
                      preset = "p50";
                    } else if (this.enableAux) {
                      preset = "p20";
                    }
                    return [4, this.controlChar.writeValue(muse_utils_1.encodeCommand(preset))];
                  case 2:
                    _a.sent();
                    return [4, this.controlChar.writeValue(muse_utils_1.encodeCommand("s"))];
                  case 3:
                    _a.sent();
                    return [4, this.resume()];
                  case 4:
                    _a.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.pause = function() {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.sendCommand("h")];
                  case 1:
                    _a.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.resume = function() {
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.sendCommand("d")];
                  case 1:
                    _a.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.deviceInfo = function() {
            return __awaiter(this, void 0, void 0, function() {
              var resultListener;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    resultListener = this.controlResponses.pipe(operators_1.filter(function(r) {
                      return !!r.fw;
                    }), operators_1.take(1)).toPromise();
                    return [4, this.sendCommand("v1")];
                  case 1:
                    _a.sent();
                    return [2, resultListener];
                }
              });
            });
          };
          MuseClient3.prototype.injectMarker = function(value, timestamp) {
            if (timestamp === void 0) {
              timestamp = (/* @__PURE__ */ new Date()).getTime();
            }
            return __awaiter(this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4, this.eventMarkers.next({ value, timestamp })];
                  case 1:
                    _a.sent();
                    return [
                      2
                      /*return*/
                    ];
                }
              });
            });
          };
          MuseClient3.prototype.disconnect = function() {
            if (this.gatt) {
              this.lastIndex = null;
              this.lastTimestamp = null;
              this.gatt.disconnect();
              this.connectionStatus.next(false);
            }
          };
          MuseClient3.prototype.getTimestamp = function(eventIndex, samplesPerReading, frequency) {
            var READING_DELTA = 1e3 * (1 / frequency) * samplesPerReading;
            if (this.lastIndex === null || this.lastTimestamp === null) {
              this.lastIndex = eventIndex;
              this.lastTimestamp = (/* @__PURE__ */ new Date()).getTime() - READING_DELTA;
            }
            while (this.lastIndex - eventIndex > 4096) {
              eventIndex += 65536;
            }
            if (eventIndex === this.lastIndex) {
              return this.lastTimestamp;
            }
            if (eventIndex > this.lastIndex) {
              this.lastTimestamp += READING_DELTA * (eventIndex - this.lastIndex);
              this.lastIndex = eventIndex;
              return this.lastTimestamp;
            } else {
              return this.lastTimestamp - READING_DELTA * (this.lastIndex - eventIndex);
            }
          };
          return MuseClient3;
        }()
      );
      exports.MuseClient = MuseClient2;
    }
  });

  // src/muse-bundle.js
  var import_muse_js = __toESM(require_muse());
  window.muse = {
    MuseClient: import_muse_js.MuseClient,
    zipSamples: import_muse_js.zipSamples
  };
  console.log("\u2705 muse-js bundle loaded!");
})();
