/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./resources/js/alpine.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var _PatchFlagNames, _slotFlagsText;

  // packages/alpinejs/src/scheduler.js
  var flushPending = false;
  var flushing = false;
  var queue = [];

  function _scheduler(callback) {
    queueJob(callback);
  }

  function queueJob(job) {
    if (!queue.includes(job)) queue.push(job);
    queueFlush();
  }

  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }

  function flushJobs() {
    flushPending = false;
    flushing = true;

    for (var i = 0; i < queue.length; i++) {
      queue[i]();
    }

    queue.length = 0;
    flushing = false;
  } // packages/alpinejs/src/reactivity.js


  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;

  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }

  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;

    effect = function effect(callback) {
      return engine.effect(callback, {
        scheduler: function scheduler(task) {
          if (shouldSchedule) {
            _scheduler(task);
          } else {
            task();
          }
        }
      });
    };

    raw = engine.raw;
  }

  function overrideEffect(override) {
    effect = override;
  }

  function elementBoundEffect(el) {
    var cleanup2 = function cleanup2() {};

    var wrappedEffect = function wrappedEffect(callback) {
      var effectReference = effect(callback);

      if (!el._x_effects) {
        el._x_effects = new Set();

        el._x_runEffects = function () {
          el._x_effects.forEach(function (i) {
            return i();
          });
        };
      }

      el._x_effects.add(effectReference);

      cleanup2 = function cleanup2() {
        if (effectReference === void 0) return;

        el._x_effects["delete"](effectReference);

        release(effectReference);
      };
    };

    return [wrappedEffect, function () {
      cleanup2();
    }];
  } // packages/alpinejs/src/mutation.js


  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];

  function onElAdded(callback) {
    onElAddeds.push(callback);
  }

  function onElRemoved(callback) {
    onElRemoveds.push(callback);
  }

  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }

  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups) el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name]) el._x_attributeCleanups[name] = [];

    el._x_attributeCleanups[name].push(callback);
  }

  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups) return;
    Object.entries(el._x_attributeCleanups).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          value = _ref2[1];

      (names === void 0 || names.includes(name)) && value.forEach(function (i) {
        return i();
      });
      delete el._x_attributeCleanups[name];
    });
  }

  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;

  function startObservingMutations() {
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeOldValue: true
    });
    currentlyObserving = true;
  }

  function stopObservingMutations() {
    observer.disconnect();
    currentlyObserving = false;
  }

  var recordQueue = [];
  var willProcessRecordQueue = false;

  function flushObserver() {
    recordQueue = recordQueue.concat(observer.takeRecords());

    if (recordQueue.length && !willProcessRecordQueue) {
      willProcessRecordQueue = true;
      queueMicrotask(function () {
        processRecordQueue();
        willProcessRecordQueue = false;
      });
    }
  }

  function processRecordQueue() {
    onMutate(recordQueue);
    recordQueue.length = 0;
  }

  function mutateDom(callback) {
    if (!currentlyObserving) return callback();
    flushObserver();
    stopObservingMutations();
    var result = callback();
    startObservingMutations();
    return result;
  }

  function onMutate(mutations) {
    var addedNodes = [];
    var removedNodes = [];
    var addedAttributes = new Map();
    var removedAttributes = new Map();

    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver) continue;

      if (mutations[i].type === "childList") {
        mutations[i].addedNodes.forEach(function (node) {
          return node.nodeType === 1 && addedNodes.push(node);
        });
        mutations[i].removedNodes.forEach(function (node) {
          return node.nodeType === 1 && removedNodes.push(node);
        });
      }

      if (mutations[i].type === "attributes") {
        (function () {
          var el = mutations[i].target;
          var name = mutations[i].attributeName;
          var oldValue = mutations[i].oldValue;

          var add2 = function add2() {
            if (!addedAttributes.has(el)) addedAttributes.set(el, []);
            addedAttributes.get(el).push({
              name: name,
              value: el.getAttribute(name)
            });
          };

          var remove = function remove() {
            if (!removedAttributes.has(el)) removedAttributes.set(el, []);
            removedAttributes.get(el).push(name);
          };

          if (el.hasAttribute(name) && oldValue === null) {
            add2();
          } else if (el.hasAttribute(name)) {
            remove();
            add2();
          } else {
            remove();
          }
        })();
      }
    }

    removedAttributes.forEach(function (attrs, el) {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach(function (attrs, el) {
      onAttributeAddeds.forEach(function (i) {
        return i(el, attrs);
      });
    });

    var _loop = function _loop() {
      var node = _addedNodes[_i2];
      if (removedNodes.includes(node)) return "continue";
      onElAddeds.forEach(function (i) {
        return i(node);
      });
    };

    for (var _i2 = 0, _addedNodes = addedNodes; _i2 < _addedNodes.length; _i2++) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }

    var _loop2 = function _loop2() {
      var node = _removedNodes[_i3];
      if (addedNodes.includes(node)) return "continue";
      onElRemoveds.forEach(function (i) {
        return i(node);
      });
    };

    for (var _i3 = 0, _removedNodes = removedNodes; _i3 < _removedNodes.length; _i3++) {
      var _ret2 = _loop2();

      if (_ret2 === "continue") continue;
    }

    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  } // packages/alpinejs/src/scope.js


  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2].concat(_toConsumableArray(closestDataStack(referenceNode || node)));
    return function () {
      node._x_dataStack = node._x_dataStack.filter(function (i) {
        return i !== data2;
      });
    };
  }

  function refreshScope(element, scope) {
    var existingScope = element._x_dataStack[0];
    Object.entries(scope).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];

      existingScope[key] = value;
    });
  }

  function closestDataStack(node) {
    if (node._x_dataStack) return node._x_dataStack;

    if (node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }

    if (!node.parentNode) {
      return [];
    }

    return closestDataStack(node.parentNode);
  }

  function mergeProxies(objects) {
    return new Proxy({}, {
      ownKeys: function ownKeys() {
        return Array.from(new Set(objects.flatMap(function (i) {
          return Object.keys(i);
        })));
      },
      has: function has(target, name) {
        return objects.some(function (obj) {
          return obj.hasOwnProperty(name);
        });
      },
      get: function get(target, name) {
        return (objects.find(function (obj) {
          return obj.hasOwnProperty(name);
        }) || {})[name];
      },
      set: function set(target, name, value) {
        var closestObjectWithKey = objects.find(function (obj) {
          return obj.hasOwnProperty(name);
        });

        if (closestObjectWithKey) {
          closestObjectWithKey[name] = value;
        } else {
          objects[objects.length - 1][name] = value;
        }

        return true;
      }
    });
  } // packages/alpinejs/src/interceptor.js


  function initInterceptors(data2) {
    var isObject2 = function isObject2(val) {
      return _typeof(val) === "object" && !Array.isArray(val) && val !== null;
    };

    var recurse = function recurse(obj) {
      var basePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      Object.entries(obj).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            value = _ref6[1];

        var path = basePath === "" ? key : "".concat(basePath, ".").concat(key);

        if (_typeof(value) === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };

    return recurse(data2);
  }

  function interceptor(callback) {
    var mutateObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize: function initialize(data2, path, key) {
        return callback(this.initialValue, function () {
          return get(data2, path);
        }, function (value) {
          return set(data2, path, value);
        }, path, key);
      }
    };
    mutateObj(obj);
    return function (initialValue) {
      if (_typeof(initialValue) === "object" && initialValue !== null && initialValue._x_interceptor) {
        var initialize = obj.initialize.bind(obj);

        obj.initialize = function (data2, path, key) {
          var innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }

      return obj;
    };
  }

  function get(obj, path) {
    return path.split(".").reduce(function (carry, segment) {
      return carry[segment];
    }, obj);
  }

  function set(obj, path, value) {
    if (typeof path === "string") path = path.split(".");
    if (path.length === 1) obj[path[0]] = value;else if (path.length === 0) throw error;else {
      if (obj[path[0]]) return set(obj[path[0]], path.slice(1), value);else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  } // packages/alpinejs/src/magics.js


  var magics = {};

  function magic(name, callback) {
    magics[name] = callback;
  }

  function injectMagics(obj, el) {
    Object.entries(magics).forEach(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          name = _ref8[0],
          callback = _ref8[1];

      Object.defineProperty(obj, "$".concat(name), {
        get: function get() {
          return callback(el, {
            Alpine: alpine_default,
            interceptor: interceptor
          });
        },
        enumerable: false
      });
    });
    return obj;
  } // packages/alpinejs/src/evaluator.js


  function evaluate(el, expression) {
    var extras = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var result;
    evaluateLater(el, expression)(function (value) {
      return result = value;
    }, extras);
    return result;
  }

  function evaluateLater() {
    return theEvaluatorFunction.apply(void 0, arguments);
  }

  var theEvaluatorFunction = normalEvaluator;

  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }

  function normalEvaluator(el, expression) {
    var overriddenMagics = {};
    injectMagics(overriddenMagics, el);
    var dataStack = [overriddenMagics].concat(_toConsumableArray(closestDataStack(el)));

    if (typeof expression === "function") {
      return generateEvaluatorFromFunction(dataStack, expression);
    }

    var evaluator = generateEvaluatorFromString(dataStack, expression);
    return tryCatch.bind(null, el, expression, evaluator);
  }

  function generateEvaluatorFromFunction(dataStack, func) {
    return function () {
      var receiver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref9$scope = _ref9.scope,
          scope = _ref9$scope === void 0 ? {} : _ref9$scope,
          _ref9$params = _ref9.params,
          params = _ref9$params === void 0 ? [] : _ref9$params;

      var result = func.apply(mergeProxies([scope].concat(_toConsumableArray(dataStack))), params);
      runIfTypeOfFunction(receiver, result);
    };
  }

  var evaluatorMemo = {};

  function generateFunctionFromString(expression) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }

    var AsyncFunction = Object.getPrototypeOf( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))).constructor;
    var rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)/.test(expression) ? "(() => { ".concat(expression, " })()") : expression;
    var func = new AsyncFunction(["__self", "scope"], "with (scope) { __self.result = ".concat(rightSideSafeExpression, " }; __self.finished = true; return __self.result;"));
    evaluatorMemo[expression] = func;
    return func;
  }

  function generateEvaluatorFromString(dataStack, expression) {
    var func = generateFunctionFromString(expression);
    return function () {
      var receiver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref11$scope = _ref11.scope,
          scope = _ref11$scope === void 0 ? {} : _ref11$scope,
          _ref11$params = _ref11.params,
          params = _ref11$params === void 0 ? [] : _ref11$params;

      func.result = void 0;
      func.finished = false;
      var completeScope = mergeProxies([scope].concat(_toConsumableArray(dataStack)));
      var promise = func(func, completeScope);

      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params);
      } else {
        promise.then(function (result) {
          runIfTypeOfFunction(receiver, result, completeScope, params);
        });
      }
    };
  }

  function runIfTypeOfFunction(receiver, value, scope, params) {
    if (typeof value === "function") {
      var result = value.apply(scope, params);

      if (result instanceof Promise) {
        result.then(function (i) {
          return runIfTypeOfFunction(receiver, i, scope, params);
        });
      } else {
        receiver(result);
      }
    } else {
      receiver(value);
    }
  }

  function tryCatch(el, expression, callback) {
    try {
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      return callback.apply(void 0, args);
    } catch (e) {
      console.warn("Alpine Expression Error: ".concat(e.message, "\n\nExpression: \"").concat(expression, "\"\n\n"), el);
      throw e;
    }
  } // packages/alpinejs/src/directives.js


  var prefixAsString = "x-";

  function prefix() {
    var subject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return prefixAsString + subject;
  }

  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }

  var directiveHandlers = {};

  function directive(name, callback) {
    directiveHandlers[name] = callback;
  }

  function directives(el, attributes, originalAttributeOverride) {
    var transformedAttributeMap = {};
    var directives2 = Array.from(attributes).map(toTransformedAttributes(function (newName, oldName) {
      return transformedAttributeMap[newName] = oldName;
    })).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map(function (directive2) {
      return getDirectiveHandler(el, directive2);
    });
  }

  var isDeferringHandlers = false;
  var directiveHandlerStack = [];

  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;

    var flushHandlers = function flushHandlers() {
      while (directiveHandlerStack.length) {
        directiveHandlerStack.shift()();
      }
    };

    var stopDeferring = function stopDeferring() {
      isDeferringHandlers = false;
      flushHandlers();
    };

    callback(flushHandlers);
    stopDeferring();
  }

  function getDirectiveHandler(el, directive2) {
    var noop = function noop() {};

    var handler3 = directiveHandlers[directive2.type] || noop;
    var cleanups = [];

    var cleanup2 = function cleanup2(callback) {
      return cleanups.push(callback);
    };

    var _elementBoundEffect = elementBoundEffect(el),
        _elementBoundEffect2 = _slicedToArray(_elementBoundEffect, 2),
        effect3 = _elementBoundEffect2[0],
        cleanupEffect = _elementBoundEffect2[1];

    cleanups.push(cleanupEffect);
    var utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };

    var doCleanup = function doCleanup() {
      return cleanups.forEach(function (i) {
        return i();
      });
    };

    onAttributeRemoved(el, directive2.original, doCleanup);

    var fullHandler = function fullHandler() {
      if (el._x_ignore || el._x_ignoreSelf) return;
      handler3.inline && handler3.inline(el, directive2, utilities);
      handler3 = handler3.bind(handler3, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStack.push(handler3) : handler3();
    };

    fullHandler.runCleanups = doCleanup;
    return fullHandler;
  }

  var startingWith = function startingWith(subject, replacement) {
    return function (_ref12) {
      var name = _ref12.name,
          value = _ref12.value;
      if (name.startsWith(subject)) name = name.replace(subject, replacement);
      return {
        name: name,
        value: value
      };
    };
  };

  var into = function into(i) {
    return i;
  };

  function toTransformedAttributes(callback) {
    return function (_ref13) {
      var name = _ref13.name,
          value = _ref13.value;

      var _attributeTransformer = attributeTransformers.reduce(function (carry, transform) {
        return transform(carry);
      }, {
        name: name,
        value: value
      }),
          newName = _attributeTransformer.name,
          newValue = _attributeTransformer.value;

      if (newName !== name) callback(newName, name);
      return {
        name: newName,
        value: newValue
      };
    };
  }

  var attributeTransformers = [];

  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }

  function outNonAlpineAttributes(_ref14) {
    var name = _ref14.name;
    return alpineAttributeRegex().test(name);
  }

  var alpineAttributeRegex = function alpineAttributeRegex() {
    return new RegExp("^".concat(prefixAsString, "([^:^.]+)\\b"));
  };

  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return function (_ref15) {
      var name = _ref15.name,
          value = _ref15.value;
      var typeMatch = name.match(alpineAttributeRegex());
      var valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
      var modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      var original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map(function (i) {
          return i.replace(".", "");
        }),
        expression: value,
        original: original
      };
    };
  }

  var DEFAULT = "DEFAULT";
  var directiveOrder = ["ignore", "ref", "data", "bind", "init", "for", "model", "transition", "show", "if", DEFAULT, "element"];

  function byPriority(a, b) {
    var typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    var typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  } // packages/alpinejs/src/utils/dispatch.js


  function dispatch(el, name) {
    var detail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    el.dispatchEvent(new CustomEvent(name, {
      detail: detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  } // packages/alpinejs/src/nextTick.js


  var tickStack = [];
  var isHolding = false;

  function nextTick(callback) {
    tickStack.push(callback);
    queueMicrotask(function () {
      isHolding || setTimeout(function () {
        releaseNextTicks();
      });
    });
  }

  function releaseNextTicks() {
    isHolding = false;

    while (tickStack.length) {
      tickStack.shift()();
    }
  }

  function holdNextTicks() {
    isHolding = true;
  } // packages/alpinejs/src/utils/walk.js


  function walk(el, callback) {
    if (el instanceof ShadowRoot) {
      Array.from(el.children).forEach(function (el2) {
        return walk(el2, callback);
      });
      return;
    }

    var skip = false;
    callback(el, function () {
      return skip = true;
    });
    if (skip) return;
    var node = el.firstElementChild;

    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  } // packages/alpinejs/src/utils/warn.js


  function warn(message) {
    var _console;

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (_console = console).warn.apply(_console, ["Alpine Warning: ".concat(message)].concat(args));
  } // packages/alpinejs/src/lifecycle.js


  function start() {
    if (!document.body) warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded(function (el) {
      return initTree(el, walk);
    });
    onElRemoved(function (el) {
      return nextTick(function () {
        return destroyTree(el);
      });
    });
    onAttributesAdded(function (el, attrs) {
      directives(el, attrs).forEach(function (handle) {
        return handle();
      });
    });

    var outNestedComponents = function outNestedComponents(el) {
      return !closestRoot(el.parentNode || closestRoot(el));
    };

    Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach(function (el) {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
  }

  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];

  function rootSelectors() {
    return rootSelectorCallbacks.map(function (fn) {
      return fn();
    });
  }

  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map(function (fn) {
      return fn();
    });
  }

  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }

  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }

  function closestRoot(el) {
    if (rootSelectors().some(function (selector) {
      return el.matches(selector);
    })) return el;
    if (!el.parentElement) return;
    return closestRoot(el.parentElement);
  }

  function isRoot(el) {
    return rootSelectors().some(function (selector) {
      return el.matches(selector);
    });
  }

  function initTree(el) {
    var walker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : walk;
    deferHandlingDirectives(function () {
      walker(el, function (el2, skip) {
        directives(el2, el2.attributes).forEach(function (handle) {
          return handle();
        });
        el2._x_ignore && skip();
      });
    });
  }

  function destroyTree(root) {
    walk(root, function (el) {
      return cleanupAttributes(el);
    });
  } // packages/alpinejs/src/plugin.js


  function plugin(callback) {
    callback(alpine_default);
  } // packages/alpinejs/src/store.js


  var stores = {};
  var isReactive = false;

  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }

    if (value === void 0) {
      return stores[name];
    }

    stores[name] = value;

    if (_typeof(value) === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
  }

  function getStores() {
    return stores;
  } // packages/alpinejs/src/clone.js


  var isCloning = false;

  function skipDuringClone(callback) {
    return function () {
      return isCloning || callback.apply(void 0, arguments);
    };
  }

  function clone(oldEl, newEl) {
    newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    dontRegisterReactiveSideEffects(function () {
      cloneTree(newEl);
    });
    isCloning = false;
  }

  function cloneTree(el) {
    var hasRunThroughFirstEl = false;

    var shallowWalker = function shallowWalker(el2, callback) {
      walk(el2, function (el3, skip) {
        if (hasRunThroughFirstEl && isRoot(el3)) return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };

    initTree(el, shallowWalker);
  }

  function dontRegisterReactiveSideEffects(callback) {
    var cache = effect;
    overrideEffect(function (callback2, el) {
      var storedEffect = cache(callback2);
      release(storedEffect);
      return function () {};
    });
    callback();
    overrideEffect(cache);
  } // packages/alpinejs/src/datas.js


  var datas = {};

  function data(name, callback) {
    datas[name] = callback;
  }

  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(function (_ref16) {
      var _ref17 = _slicedToArray(_ref16, 2),
          name = _ref17[0],
          callback = _ref17[1];

      Object.defineProperty(obj, name, {
        get: function get() {
          return function () {
            return callback.bind(context).apply(void 0, arguments);
          };
        },
        enumerable: false
      });
    });
    return obj;
  } // packages/alpinejs/src/alpine.js


  var Alpine = {
    get reactive() {
      return reactive;
    },

    get release() {
      return release;
    },

    get effect() {
      return effect;
    },

    get raw() {
      return raw;
    },

    version: "3.2.0",
    disableEffectScheduling: disableEffectScheduling,
    setReactivityEngine: setReactivityEngine,
    addRootSelector: addRootSelector,
    mapAttributes: mapAttributes,
    evaluateLater: evaluateLater,
    setEvaluator: setEvaluator,
    closestRoot: closestRoot,
    interceptor: interceptor,
    mutateDom: mutateDom,
    directive: directive,
    evaluate: evaluate,
    initTree: initTree,
    nextTick: nextTick,
    prefix: setPrefix,
    plugin: plugin,
    magic: magic,
    store: store,
    start: start,
    clone: clone,
    data: data
  };
  var alpine_default = Alpine; // node_modules/@vue/shared/dist/shared.esm-bundler.js

  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(",");

    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }

    return expectsLowerCase ? function (val) {
      return !!map[val.toLowerCase()];
    } : function (val) {
      return !!map[val];
    };
  }

  var PatchFlagNames = (_PatchFlagNames = {}, _defineProperty(_PatchFlagNames, 1, "TEXT"), _defineProperty(_PatchFlagNames, 2, "CLASS"), _defineProperty(_PatchFlagNames, 4, "STYLE"), _defineProperty(_PatchFlagNames, 8, "PROPS"), _defineProperty(_PatchFlagNames, 16, "FULL_PROPS"), _defineProperty(_PatchFlagNames, 32, "HYDRATE_EVENTS"), _defineProperty(_PatchFlagNames, 64, "STABLE_FRAGMENT"), _defineProperty(_PatchFlagNames, 128, "KEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 256, "UNKEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 512, "NEED_PATCH"), _defineProperty(_PatchFlagNames, 1024, "DYNAMIC_SLOTS"), _defineProperty(_PatchFlagNames, 2048, "DEV_ROOT_FRAGMENT"), _defineProperty(_PatchFlagNames, -1, "HOISTED"), _defineProperty(_PatchFlagNames, -2, "BAIL"), _PatchFlagNames);
  var slotFlagsText = (_slotFlagsText = {}, _defineProperty(_slotFlagsText, 1, "STABLE"), _defineProperty(_slotFlagsText, 2, "DYNAMIC"), _defineProperty(_slotFlagsText, 3, "FORWARDED"), _slotFlagsText);
  var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var isBooleanAttr = /* @__PURE__ */makeMap(specialBooleanAttrs + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
  var EMPTY_OBJ =  true ? Object.freeze({}) : 0;
  var EMPTY_ARR =  true ? Object.freeze([]) : 0;
  var extend = Object.assign;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var hasOwn = function hasOwn(val, key) {
    return hasOwnProperty.call(val, key);
  };

  var isArray = Array.isArray;

  var isMap = function isMap(val) {
    return toTypeString(val) === "[object Map]";
  };

  var isString = function isString(val) {
    return typeof val === "string";
  };

  var isSymbol = function isSymbol(val) {
    return _typeof(val) === "symbol";
  };

  var isObject = function isObject(val) {
    return val !== null && _typeof(val) === "object";
  };

  var objectToString = Object.prototype.toString;

  var toTypeString = function toTypeString(value) {
    return objectToString.call(value);
  };

  var toRawType = function toRawType(value) {
    return toTypeString(value).slice(8, -1);
  };

  var isIntegerKey = function isIntegerKey(key) {
    return isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  };

  var cacheStringFunction = function cacheStringFunction(fn) {
    var cache = Object.create(null);
    return function (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };

  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction(function (str) {
    return str.replace(camelizeRE, function (_, c) {
      return c ? c.toUpperCase() : "";
    });
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction(function (str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
  });
  var capitalize = cacheStringFunction(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var toHandlerKey = cacheStringFunction(function (str) {
    return str ? "on".concat(capitalize(str)) : "";
  });

  var hasChanged = function hasChanged(value, oldValue) {
    return value !== oldValue && (value === value || oldValue === oldValue);
  }; // node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js


  var targetMap = new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol( true ? "iterate" : 0);
  var MAP_KEY_ITERATE_KEY = Symbol( true ? "Map key iterate" : 0);

  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }

  function effect2(fn) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EMPTY_OBJ;

    if (isEffect(fn)) {
      fn = fn.raw;
    }

    var effect3 = createReactiveEffect(fn, options);

    if (!options.lazy) {
      effect3();
    }

    return effect3;
  }

  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);

      if (effect3.options.onStop) {
        effect3.options.onStop();
      }

      effect3.active = false;
    }
  }

  var uid = 0;

  function createReactiveEffect(fn, options) {
    var effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }

      if (!effectStack.includes(effect3)) {
        cleanup(effect3);

        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };

    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }

  function cleanup(effect3) {
    var deps = effect3.deps;

    if (deps.length) {
      for (var i = 0; i < deps.length; i++) {
        deps[i]["delete"](effect3);
      }

      deps.length = 0;
    }
  }

  var shouldTrack = true;
  var trackStack = [];

  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }

  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }

  function resetTracking() {
    var last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }

  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }

    var depsMap = targetMap.get(target);

    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    var dep = depsMap.get(key);

    if (!dep) {
      depsMap.set(key, dep = new Set());
    }

    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);

      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target: target,
          type: type,
          key: key
        });
      }
    }
  }

  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    var depsMap = targetMap.get(target);

    if (!depsMap) {
      return;
    }

    var effects = new Set();

    var add2 = function add2(effectsToAdd) {
      if (effectsToAdd) {
        effectsToAdd.forEach(function (effect3) {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };

    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach(function (dep, key2) {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }

      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));

            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }

          break;

        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));

            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }

          break;

        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }

          break;
      }
    }

    var run = function run(effect3) {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target: target,
          key: key,
          type: type,
          newValue: newValue,
          oldValue: oldValue,
          oldTarget: oldTarget
        });
      }

      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };

    effects.forEach(run);
  }

  var isNonTrackableKeys = /* @__PURE__ */makeMap("__proto__,__v_isRef,__isVue");
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(function (key) {
    return Symbol[key];
  }).filter(isSymbol));
  var get2 = /* @__PURE__ */createGetter();
  var shallowGet = /* @__PURE__ */createGetter(false, true);
  var readonlyGet = /* @__PURE__ */createGetter(true);
  var shallowReadonlyGet = /* @__PURE__ */createGetter(true, true);
  var arrayInstrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach(function (key) {
    var method = Array.prototype[key];

    arrayInstrumentations[key] = function () {
      var arr = toRaw(this);

      for (var i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var res = method.apply(arr, args);

      if (res === -1 || res === false) {
        return method.apply(arr, args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach(function (key) {
    var method = Array.prototype[key];

    arrayInstrumentations[key] = function () {
      pauseTracking();

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var res = method.apply(this, args);
      resetTracking();
      return res;
    };
  });

  function createGetter() {
    var isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }

      var targetIsArray = isArray(target);

      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      var res = Reflect.get(target, key, receiver);

      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }

      if (!isReadonly) {
        track(target, "get", key);
      }

      if (shallow) {
        return res;
      }

      if (isRef(res)) {
        var shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }

      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }

      return res;
    };
  }

  var set2 = /* @__PURE__ */createSetter();
  var shallowSet = /* @__PURE__ */createSetter(true);

  function createSetter() {
    var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function set3(target, key, value, receiver) {
      var oldValue = target[key];

      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);

        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }

      var hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      var result = Reflect.set(target, key, value, receiver);

      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }

      return result;
    };
  }

  function deleteProperty(target, key) {
    var hadKey = hasOwn(target, key);
    var oldValue = target[key];
    var result = Reflect.deleteProperty(target, key);

    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }

    return result;
  }

  function has(target, key) {
    var result = Reflect.has(target, key);

    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }

    return result;
  }

  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }

  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty: deleteProperty,
    has: has,
    ownKeys: ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set: function set(target, key) {
      if (true) {
        console.warn("Set operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }

      return true;
    },
    deleteProperty: function deleteProperty(target, key) {
      if (true) {
        console.warn("Delete operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }

      return true;
    }
  };
  var shallowReactiveHandlers = extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  var shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });

  var toReactive = function toReactive(value) {
    return isObject(value) ? reactive2(value) : value;
  };

  var toReadonly = function toReadonly(value) {
    return isObject(value) ? readonly(value) : value;
  };

  var toShallow = function toShallow(value) {
    return value;
  };

  var getProto = function getProto(v) {
    return Reflect.getPrototypeOf(v);
  };

  function get$1(target, key) {
    var isReadonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isShallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    target = target["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);

    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }

    !isReadonly && track(rawTarget, "get", rawKey);

    var _getProto = getProto(rawTarget),
        has2 = _getProto.has;

    var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;

    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }

  function has$1(key) {
    var isReadonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var target = this["__v_raw"];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);

    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }

    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }

  function size(target) {
    var isReadonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    target = target["__v_raw"];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }

  function add(value) {
    value = toRaw(value);
    var target = toRaw(this);
    var proto = getProto(target);
    var hadKey = proto.has.call(target, value);

    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }

    return this;
  }

  function set$1(key, value) {
    value = toRaw(value);
    var target = toRaw(this);

    var _getProto2 = getProto(target),
        has2 = _getProto2.has,
        get3 = _getProto2.get;

    var hadKey = has2.call(target, key);

    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }

    var oldValue = get3.call(target, key);
    target.set(key, value);

    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }

    return this;
  }

  function deleteEntry(key) {
    var target = toRaw(this);

    var _getProto3 = getProto(target),
        has2 = _getProto3.has,
        get3 = _getProto3.get;

    var hadKey = has2.call(target, key);

    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }

    var oldValue = get3 ? get3.call(target, key) : void 0;
    var result = target["delete"](key);

    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }

    return result;
  }

  function clear() {
    var target = toRaw(this);
    var hadItems = target.size !== 0;
    var oldTarget =  true ? isMap(target) ? new Map(target) : new Set(target) : 0;
    var result = target.clear();

    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }

    return result;
  }

  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      var observed = this;
      var target = observed["__v_raw"];
      var rawTarget = toRaw(target);
      var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach(function (value, key) {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }

  function createIterableMethod(method, isReadonly, isShallow) {
    return function () {
      var target = this["__v_raw"];
      var rawTarget = toRaw(target);
      var targetIsMap = isMap(rawTarget);
      var isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      var isKeyOnly = method === "keys" && targetIsMap;
      var innerIterator = target[method].apply(target, arguments);
      var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return _defineProperty({
        next: function next() {
          var _innerIterator$next = innerIterator.next(),
              value = _innerIterator$next.value,
              done = _innerIterator$next.done;

          return done ? {
            value: value,
            done: done
          } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done: done
          };
        }
      }, Symbol.iterator, function () {
        return this;
      });
    };
  }

  function createReadonlyMethod(type) {
    return function () {
      if (true) {
        var key = (arguments.length <= 0 ? undefined : arguments[0]) ? "on key \"".concat(arguments.length <= 0 ? undefined : arguments[0], "\" ") : "";
        console.warn("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
      }

      return type === "delete" ? false : this;
    };
  }

  var mutableInstrumentations = {
    get: function get(key) {
      return get$1(this, key);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add: add,
    set: set$1,
    "delete": deleteEntry,
    clear: clear,
    forEach: createForEach(false, false)
  };
  var shallowInstrumentations = {
    get: function get(key) {
      return get$1(this, key, false, true);
    },

    get size() {
      return size(this);
    },

    has: has$1,
    add: add,
    set: set$1,
    "delete": deleteEntry,
    clear: clear,
    forEach: createForEach(false, true)
  };
  var readonlyInstrumentations = {
    get: function get(key) {
      return get$1(this, key, true);
    },

    get size() {
      return size(this, true);
    },

    has: function has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    "delete": createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  var shallowReadonlyInstrumentations = {
    get: function get(key) {
      return get$1(this, key, true, true);
    },

    get size() {
      return size(this, true);
    },

    has: function has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    "delete": createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach(function (method) {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
  });

  function createInstrumentationGetter(isReadonly, shallow) {
    var instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return function (target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }

      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }

  var mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
  };
  var shallowReadonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, true)
  };

  function checkIdentityKeys(target, has2, key) {
    var rawKey = toRaw(key);

    if (rawKey !== key && has2.call(target, rawKey)) {
      var type = toRawType(target);
      console.warn("Reactive ".concat(type, " contains both the raw and reactive versions of the same object").concat(type === "Map" ? " as keys" : "", ", which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible."));
    }
  }

  var reactiveMap = new WeakMap();
  var shallowReactiveMap = new WeakMap();
  var readonlyMap = new WeakMap();
  var shallowReadonlyMap = new WeakMap();

  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;

      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;

      default:
        return 0;
    }
  }

  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }

  function reactive2(target) {
    if (target && target["__v_isReadonly"]) {
      return target;
    }

    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }

  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }

  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn("value cannot be made reactive: ".concat(String(target)));
      }

      return target;
    }

    if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) {
      return target;
    }

    var existingProxy = proxyMap.get(target);

    if (existingProxy) {
      return existingProxy;
    }

    var targetType = getTargetType(target);

    if (targetType === 0) {
      return target;
    }

    var proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }

  function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
  }

  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  } // packages/alpinejs/src/magics/$nextTick.js


  magic("nextTick", function () {
    return nextTick;
  }); // packages/alpinejs/src/magics/$dispatch.js

  magic("dispatch", function (el) {
    return dispatch.bind(dispatch, el);
  }); // packages/alpinejs/src/magics/$watch.js

  magic("watch", function (el) {
    return function (key, callback) {
      var evaluate2 = evaluateLater(el, key);
      var firstTime = true;
      var oldValue;
      effect(function () {
        return evaluate2(function (value) {
          var div = document.createElement("div");
          div.dataset.throwAway = value;

          if (!firstTime) {
            queueMicrotask(function () {
              callback(value, oldValue);
              oldValue = value;
            });
          } else {
            oldValue = value;
          }

          firstTime = false;
        });
      });
    };
  }); // packages/alpinejs/src/magics/$store.js

  magic("store", getStores); // packages/alpinejs/src/magics/$refs.js

  magic("refs", function (el) {
    return closestRoot(el)._x_refs || {};
  }); // packages/alpinejs/src/magics/$el.js

  magic("el", function (el) {
    return el;
  }); // packages/alpinejs/src/utils/classes.js

  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (_typeof(value) === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }

    return setClassesFromString(el, value);
  }

  function setClassesFromString(el, classString) {
    var split = function split(classString2) {
      return classString2.split(" ").filter(Boolean);
    };

    var missingClasses = function missingClasses(classString2) {
      return classString2.split(" ").filter(function (i) {
        return !el.classList.contains(i);
      }).filter(Boolean);
    };

    var addClassesAndReturnUndo = function addClassesAndReturnUndo(classes) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classes));

      return function () {
        var _el$classList2;

        (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(classes));
      };
    };

    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }

  function setClassesFromObject(el, classObject) {
    var split = function split(classString) {
      return classString.split(" ").filter(Boolean);
    };

    var forAdd = Object.entries(classObject).flatMap(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
          classString = _ref20[0],
          bool = _ref20[1];

      return bool ? split(classString) : false;
    }).filter(Boolean);
    var forRemove = Object.entries(classObject).flatMap(function (_ref21) {
      var _ref22 = _slicedToArray(_ref21, 2),
          classString = _ref22[0],
          bool = _ref22[1];

      return !bool ? split(classString) : false;
    }).filter(Boolean);
    var added = [];
    var removed = [];
    forRemove.forEach(function (i) {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach(function (i) {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return function () {
      removed.forEach(function (i) {
        return el.classList.add(i);
      });
      added.forEach(function (i) {
        return el.classList.remove(i);
      });
    };
  } // packages/alpinejs/src/utils/styles.js


  function setStyles(el, value) {
    if (_typeof(value) === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }

    return setStylesFromString(el, value);
  }

  function setStylesFromObject(el, value) {
    var previousStyles = {};
    Object.entries(value).forEach(function (_ref23) {
      var _ref24 = _slicedToArray(_ref23, 2),
          key = _ref24[0],
          value2 = _ref24[1];

      previousStyles[key] = el.style[key];
      el.style[key] = value2;
    });
    setTimeout(function () {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return function () {
      setStyles(el, previousStyles);
    };
  }

  function setStylesFromString(el, value) {
    var cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return function () {
      el.setAttribute("style", cache);
    };
  } // packages/alpinejs/src/utils/once.js


  function once(callback) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var called = false;
    return function () {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  } // packages/alpinejs/src/directives/x-transition.js


  directive("transition", function (el, _ref25) {
    var value = _ref25.value,
        modifiers = _ref25.modifiers,
        expression = _ref25.expression;

    if (!expression) {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });

  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    var directiveStorageMap = {
      enter: function enter(classes) {
        el._x_transition.enter.during = classes;
      },
      "enter-start": function enterStart(classes) {
        el._x_transition.enter.start = classes;
      },
      "enter-end": function enterEnd(classes) {
        el._x_transition.enter.end = classes;
      },
      leave: function leave(classes) {
        el._x_transition.leave.during = classes;
      },
      "leave-start": function leaveStart(classes) {
        el._x_transition.leave.start = classes;
      },
      "leave-end": function leaveEnd(classes) {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }

  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    var doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    var transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    var transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);

    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter(function (i, index) {
        return index < modifiers.indexOf("out");
      });
    }

    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter(function (i, index) {
        return index > modifiers.indexOf("out");
      });
    }

    var wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    var wantsOpacity = wantsAll || modifiers.includes("opacity");
    var wantsScale = wantsAll || modifiers.includes("scale");
    var opacityValue = wantsOpacity ? 0 : 1;
    var scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    var delay = modifierValue(modifiers, "delay", 0);
    var origin = modifierValue(modifiers, "origin", "center");
    var property = "opacity, transform";
    var durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    var durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    var easing = "cubic-bezier(0.4, 0.0, 0.2, 1)";

    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: "".concat(durationIn, "s"),
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: "scale(".concat(scaleValue, ")")
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: "scale(1)"
      };
    }

    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: "".concat(durationOut, "s"),
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: "scale(1)"
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: "scale(".concat(scaleValue, ")")
      };
    }
  }

  function registerTransitionObject(el, setFunction) {
    var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!el._x_transition) el._x_transition = {
      enter: {
        during: defaultValue,
        start: defaultValue,
        end: defaultValue
      },
      leave: {
        during: defaultValue,
        start: defaultValue,
        end: defaultValue
      },
      "in": function _in() {
        var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end,
          entering: true
        }, before, after);
      },
      out: function out() {
        var before = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
        var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end,
          entering: false
        }, before, after);
      }
    };
  }

  window.Element.prototype._x_toggleAndCascadeWithTransitions = function (el, value, show, hide) {
    var clickAwayCompatibleShow = function clickAwayCompatibleShow() {
      return requestAnimationFrame(show);
    };

    if (value) {
      el._x_transition ? el._x_transition["in"](show) : clickAwayCompatibleShow();
      return;
    }

    el._x_hidePromise = el._x_transition ? new Promise(function (resolve, reject) {
      el._x_transition.out(function () {}, function () {
        return resolve(hide);
      });

      el._x_transitioning.beforeCancel(function () {
        return reject({
          isFromCancelledTransition: true
        });
      });
    }) : Promise.resolve(hide);
    queueMicrotask(function () {
      var closest = closestHide(el);

      if (closest) {
        if (!closest._x_hideChildren) closest._x_hideChildren = [];

        closest._x_hideChildren.push(el);
      } else {
        queueMicrotask(function () {
          var hideAfterChildren = function hideAfterChildren(el2) {
            var carry = Promise.all([el2._x_hidePromise].concat(_toConsumableArray((el2._x_hideChildren || []).map(hideAfterChildren)))).then(function (_ref26) {
              var _ref27 = _slicedToArray(_ref26, 1),
                  i = _ref27[0];

              return i();
            });
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };

          hideAfterChildren(el)["catch"](function (e) {
            if (!e.isFromCancelledTransition) throw e;
          });
        });
      }
    });
  };

  function closestHide(el) {
    var parent = el.parentNode;
    if (!parent) return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }

  function transition(el, setFunction) {
    var _ref28 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _during = _ref28.during,
        start2 = _ref28.start,
        _end = _ref28.end,
        entering = _ref28.entering;

    var before = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var after = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
    if (el._x_transitioning) el._x_transitioning.cancel();

    if (Object.keys(_during).length === 0 && Object.keys(start2).length === 0 && Object.keys(_end).length === 0) {
      before();
      after();
      return;
    }

    var undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start: function start() {
        undoStart = setFunction(el, start2);
      },
      during: function during() {
        undoDuring = setFunction(el, _during);
      },
      before: before,
      end: function end() {
        undoStart();
        undoEnd = setFunction(el, _end);
      },
      after: after,
      cleanup: function cleanup() {
        undoDuring();
        undoEnd();
      }
    }, entering);
  }

  function performTransition(el, stages, entering) {
    var interrupted, reachedBefore, reachedEnd;
    var finish = once(function () {
      mutateDom(function () {
        interrupted = true;
        if (!reachedBefore) stages.before();

        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }

        stages.after();
        if (el.isConnected) stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel: function beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function () {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }

        ;
        finish();
      }),
      finish: finish,
      entering: entering
    };
    mutateDom(function () {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(function () {
      if (interrupted) return;
      var duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      var delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0) duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(function () {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(function () {
        if (interrupted) return;
        mutateDom(function () {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }

  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1) return fallback;
    var rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;

    if (key === "scale") {
      if (isNaN(rawValue)) return fallback;
    }

    if (key === "duration") {
      var match = rawValue.match(/([0-9]+)ms/);
      if (match) return match[1];
    }

    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }

    return rawValue;
  } // packages/alpinejs/src/directives/x-ignore.js


  var handler = function handler() {};

  handler.inline = function (el, _ref29, _ref30) {
    var modifiers = _ref29.modifiers;
    var cleanup2 = _ref30.cleanup;
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(function () {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };

  directive("ignore", handler); // packages/alpinejs/src/directives/x-effect.js

  directive("effect", function (el, _ref31, _ref32) {
    var expression = _ref31.expression;
    var effect3 = _ref32.effect;
    return effect3(evaluateLater(el, expression));
  }); // packages/alpinejs/src/utils/bind.js

  function bind(el, name, value) {
    var modifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    if (!el._x_bindings) el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;

    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;

      case "style":
        bindStyles(el, value);
        break;

      case "class":
        bindClasses(el, value);
        break;

      default:
        bindAttribute(el, name, value);
        break;
    }
  }

  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }

      if (window.fromModel) {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Number.isInteger(value) && !Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some(function (val) {
            return checkedAttrLooseCompare(val, el.value);
          });
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value) return;
      el.value = value;
    }
  }

  function bindClasses(el, value) {
    if (el._x_undoAddedClasses) el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }

  function bindStyles(el, value) {
    if (el._x_undoAddedStyles) el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }

  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr2(name)) value = name;
      setIfChanged(el, name, value);
    }
  }

  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }

  function updateSelect(el, value) {
    var arrayWrappedValue = [].concat(value).map(function (value2) {
      return value2 + "";
    });
    Array.from(el.options).forEach(function (option) {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }

  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, function (match, _char) {
      return _char.toUpperCase();
    });
  }

  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }

  function isBooleanAttr2(attrName) {
    var booleanAttributes = ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"];
    return booleanAttributes.includes(attrName);
  }

  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked"].includes(name);
  } // packages/alpinejs/src/utils/on.js


  function on(el, event, modifiers, callback) {
    var listenerTarget = el;

    var handler3 = function handler3(e) {
      return callback(e);
    };

    var options = {};

    var wrapHandler = function wrapHandler(callback2, wrapper) {
      return function (e) {
        return wrapper(callback2, e);
      };
    };

    if (modifiers.includes("camel")) event = camelCase2(event);
    if (modifiers.includes("passive")) options.passive = true;
    if (modifiers.includes("window")) listenerTarget = window;
    if (modifiers.includes("document")) listenerTarget = document;
    if (modifiers.includes("prevent")) handler3 = wrapHandler(handler3, function (next, e) {
      e.preventDefault();
      next(e);
    });
    if (modifiers.includes("stop")) handler3 = wrapHandler(handler3, function (next, e) {
      e.stopPropagation();
      next(e);
    });
    if (modifiers.includes("self")) handler3 = wrapHandler(handler3, function (next, e) {
      e.target === el && next(e);
    });

    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler3 = wrapHandler(handler3, function (next, e) {
        if (el.contains(e.target)) return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1) return;
        next(e);
      });
    }

    handler3 = wrapHandler(handler3, function (next, e) {
      if (isKeyEvent(event)) {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
      }

      next(e);
    });

    if (modifiers.includes("debounce")) {
      var nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      var wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler3 = debounce(handler3, wait, this);
    }

    if (modifiers.includes("throttle")) {
      var _nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";

      var _wait = isNumeric(_nextModifier.split("ms")[0]) ? Number(_nextModifier.split("ms")[0]) : 250;

      handler3 = throttle(handler3, _wait, this);
    }

    if (modifiers.includes("once")) {
      handler3 = wrapHandler(handler3, function (next, e) {
        next(e);
        listenerTarget.removeEventListener(event, handler3, options);
      });
    }

    listenerTarget.addEventListener(event, handler3, options);
    return function () {
      listenerTarget.removeEventListener(event, handler3, options);
    };
  }

  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, function (match, _char2) {
      return _char2.toUpperCase();
    });
  }

  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    var inThrottle;
    return function () {
      var context = this,
          args = arguments;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function () {
          return inThrottle = false;
        }, limit);
      }
    };
  }

  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }

  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }

  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }

  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    var keyModifiers = modifiers.filter(function (i) {
      return !["window", "document", "prevent", "stop", "once"].includes(i);
    });

    if (keyModifiers.includes("debounce")) {
      var debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }

    if (keyModifiers.length === 0) return false;
    if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key)) return false;
    var systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    var selectedSystemKeyModifiers = systemKeyModifiers.filter(function (modifier) {
      return keyModifiers.includes(modifier);
    });
    keyModifiers = keyModifiers.filter(function (i) {
      return !selectedSystemKeyModifiers.includes(i);
    });

    if (selectedSystemKeyModifiers.length > 0) {
      var activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(function (modifier) {
        if (modifier === "cmd" || modifier === "super") modifier = "meta";
        return e["".concat(modifier, "Key")];
      });

      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (keyModifiers[0] === keyToModifier(e.key)) return false;
      }
    }

    return true;
  }

  function keyToModifier(key) {
    switch (key) {
      case "/":
        return "slash";

      case " ":
      case "Spacebar":
        return "space";

      default:
        return key && kebabCase(key);
    }
  } // packages/alpinejs/src/directives/x-model.js


  directive("model", function (el, _ref33, _ref34) {
    var modifiers = _ref33.modifiers,
        expression = _ref33.expression;
    var effect3 = _ref34.effect,
        cleanup2 = _ref34.cleanup;
    var evaluate2 = evaluateLater(el, expression);
    var assignmentExpression = "".concat(expression, " = rightSideOfExpression($event, ").concat(expression, ")");
    var evaluateAssignment = evaluateLater(el, assignmentExpression);
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    var assigmentFunction = generateAssignmentFunction(el, modifiers, expression);
    var removeListener = on(el, event, modifiers, function (e) {
      evaluateAssignment(function () {}, {
        scope: {
          $event: e,
          rightSideOfExpression: assigmentFunction
        }
      });
    });
    cleanup2(function () {
      return removeListener();
    });

    el._x_forceModelUpdate = function () {
      evaluate2(function (value) {
        if (value === void 0 && expression.match(/\./)) value = "";
        window.fromModel = true;
        mutateDom(function () {
          return bind(el, "value", value);
        });
        delete window.fromModel;
      });
    };

    effect3(function () {
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el)) return;

      el._x_forceModelUpdate();
    });
  });

  function generateAssignmentFunction(el, modifiers, expression) {
    if (el.type === "radio") {
      mutateDom(function () {
        if (!el.hasAttribute("name")) el.setAttribute("name", expression);
      });
    }

    return function (event, currentValue) {
      return mutateDom(function () {
        if (event instanceof CustomEvent && event.detail !== void 0) {
          return event.detail;
        } else if (el.type === "checkbox") {
          if (Array.isArray(currentValue)) {
            var newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
            return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter(function (el2) {
              return !checkedAttrLooseCompare2(el2, newValue);
            });
          } else {
            return event.target.checked;
          }
        } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
          return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map(function (option) {
            var rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          }) : Array.from(event.target.selectedOptions).map(function (option) {
            return option.value || option.text;
          });
        } else {
          var rawValue = event.target.value;
          return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
        }
      });
    };
  }

  function safeParseNumber(rawValue) {
    var number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }

  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }

  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  } // packages/alpinejs/src/directives/x-cloak.js


  directive("cloak", function (el) {
    return queueMicrotask(function () {
      return mutateDom(function () {
        return el.removeAttribute(prefix("cloak"));
      });
    });
  }); // packages/alpinejs/src/directives/x-init.js

  addInitSelector(function () {
    return "[".concat(prefix("init"), "]");
  });
  directive("init", skipDuringClone(function (el, _ref35) {
    var expression = _ref35.expression;
    return evaluate(el, expression, {}, false);
  })); // packages/alpinejs/src/directives/x-text.js

  directive("text", function (el, _ref36, _ref37) {
    var expression = _ref36.expression;
    var effect3 = _ref37.effect,
        evaluateLater2 = _ref37.evaluateLater;
    var evaluate2 = evaluateLater2(expression);
    effect3(function () {
      evaluate2(function (value) {
        mutateDom(function () {
          el.textContent = value;
        });
      });
    });
  }); // packages/alpinejs/src/directives/x-html.js

  directive("html", function (el, _ref38, _ref39) {
    var expression = _ref38.expression;
    var effect3 = _ref39.effect,
        evaluateLater2 = _ref39.evaluateLater;
    var evaluate2 = evaluateLater2(expression);
    effect3(function () {
      evaluate2(function (value) {
        el.innerHTML = value;
      });
    });
  }); // packages/alpinejs/src/directives/x-bind.js

  mapAttributes(startingWith(":", into(prefix("bind:"))));
  directive("bind", function (el, _ref40, _ref41) {
    var value = _ref40.value,
        modifiers = _ref40.modifiers,
        expression = _ref40.expression,
        original = _ref40.original;
    var effect3 = _ref41.effect;
    if (!value) return applyBindingsObject(el, expression, original, effect3);
    if (value === "key") return storeKeyForXFor(el, expression);
    var evaluate2 = evaluateLater(el, expression);
    effect3(function () {
      return evaluate2(function (result) {
        if (result === void 0 && expression.match(/\./)) result = "";
        mutateDom(function () {
          return bind(el, value, result, modifiers);
        });
      });
    });
  });

  function applyBindingsObject(el, expression, original, effect3) {
    var getBindings = evaluateLater(el, expression);
    var cleanupRunners = [];
    effect3(function () {
      while (cleanupRunners.length) {
        cleanupRunners.pop()();
      }

      getBindings(function (bindings) {
        var attributes = Object.entries(bindings).map(function (_ref42) {
          var _ref43 = _slicedToArray(_ref42, 2),
              name = _ref43[0],
              value = _ref43[1];

          return {
            name: name,
            value: value
          };
        });
        directives(el, attributes, original).map(function (handle) {
          cleanupRunners.push(handle.runCleanups);
          handle();
        });
      });
    });
  }

  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  } // packages/alpinejs/src/directives/x-data.js


  addRootSelector(function () {
    return "[".concat(prefix("data"), "]");
  });
  directive("data", skipDuringClone(function (el, _ref44, _ref45) {
    var expression = _ref44.expression;
    var cleanup2 = _ref45.cleanup;
    expression = expression === "" ? "{}" : expression;
    var magicContext = {};
    injectMagics(magicContext, el);
    var dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    var data2 = evaluate(el, expression, {
      scope: dataProviderContext
    });
    injectMagics(data2, el);
    var reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    var undo = addScopeToNode(el, reactiveData);
    if (reactiveData["init"]) reactiveData["init"]();
    cleanup2(function () {
      undo();
      reactiveData["destroy"] && reactiveData["destroy"]();
    });
  })); // packages/alpinejs/src/directives/x-show.js

  directive("show", function (el, _ref46, _ref47) {
    var modifiers = _ref46.modifiers,
        expression = _ref46.expression;
    var effect3 = _ref47.effect;
    var evaluate2 = evaluateLater(el, expression);

    var hide = function hide() {
      return mutateDom(function () {
        el.style.display = "none";
        el._x_isShown = false;
      });
    };

    var show = function show() {
      return mutateDom(function () {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }

        el._x_isShown = true;
      });
    };

    var clickAwayCompatibleShow = function clickAwayCompatibleShow() {
      return setTimeout(show);
    };

    var toggle = once(function (value) {
      return value ? show() : hide();
    }, function (value) {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    });
    var oldValue;
    var firstTime = true;
    effect3(function () {
      return evaluate2(function (value) {
        if (!firstTime && value === oldValue) return;
        if (modifiers.includes("immediate")) value ? clickAwayCompatibleShow() : hide();
        toggle(value);
        oldValue = value;
        firstTime = false;
      });
    });
  }); // packages/alpinejs/src/directives/x-for.js

  directive("for", function (el, _ref48, _ref49) {
    var expression = _ref48.expression;
    var effect3 = _ref49.effect,
        cleanup2 = _ref49.cleanup;
    var iteratorNames = parseForExpression(expression);
    var evaluateItems = evaluateLater(el, iteratorNames.items);
    var evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(function () {
      return loop(el, iteratorNames, evaluateItems, evaluateKey);
    });
    cleanup2(function () {
      Object.values(el._x_lookup).forEach(function (el2) {
        return el2.remove();
      });
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });

  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    var isObject2 = function isObject2(i) {
      return _typeof(i) === "object" && !Array.isArray(i);
    };

    var templateEl = el;
    evaluateItems(function (items) {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), function (i) {
          return i + 1;
        });
      }

      var lookup = el._x_lookup;
      var prevKeys = el._x_prevKeys;
      var scopes = [];
      var keys = [];

      if (isObject2(items)) {
        items = Object.entries(items).map(function (_ref50) {
          var _ref51 = _slicedToArray(_ref50, 2),
              key = _ref51[0],
              value = _ref51[1];

          var scope = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey(function (value2) {
            return keys.push(value2);
          }, {
            scope: _objectSpread({
              index: key
            }, scope)
          });
          scopes.push(scope);
        });
      } else {
        for (var i = 0; i < items.length; i++) {
          var scope = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey(function (value) {
            return keys.push(value);
          }, {
            scope: _objectSpread({
              index: i
            }, scope)
          });
          scopes.push(scope);
        }
      }

      var adds = [];
      var moves = [];
      var removes = [];
      var sames = [];

      for (var _i4 = 0; _i4 < prevKeys.length; _i4++) {
        var key = prevKeys[_i4];
        if (keys.indexOf(key) === -1) removes.push(key);
      }

      prevKeys = prevKeys.filter(function (key) {
        return !removes.includes(key);
      });
      var lastKey = "template";

      for (var _i5 = 0; _i5 < keys.length; _i5++) {
        var _key5 = keys[_i5];
        var prevIndex = prevKeys.indexOf(_key5);

        if (prevIndex === -1) {
          prevKeys.splice(_i5, 0, _key5);
          adds.push([lastKey, _i5]);
        } else if (prevIndex !== _i5) {
          var keyInSpot = prevKeys.splice(_i5, 1)[0];
          var keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(_i5, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(_key5);
        }

        lastKey = _key5;
      }

      for (var _i6 = 0; _i6 < removes.length; _i6++) {
        var _key6 = removes[_i6];

        lookup[_key6].remove();

        lookup[_key6] = null;
        delete lookup[_key6];
      }

      var _loop3 = function _loop3(_i7) {
        var _moves$_i = _slicedToArray(moves[_i7], 2),
            keyInSpot = _moves$_i[0],
            keyForSpot = _moves$_i[1];

        var elInSpot = lookup[keyInSpot];
        var elForSpot = lookup[keyForSpot];
        var marker = document.createElement("div");
        mutateDom(function () {
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          marker.before(elInSpot);
          marker.remove();
        });
        refreshScope(elForSpot, scopes[keys.indexOf(keyForSpot)]);
      };

      for (var _i7 = 0; _i7 < moves.length; _i7++) {
        _loop3(_i7);
      }

      var _loop4 = function _loop4(_i8) {
        var _adds$_i = _slicedToArray(adds[_i8], 2),
            lastKey2 = _adds$_i[0],
            index = _adds$_i[1];

        var lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        var scope = scopes[index];
        var key = keys[index];
        var clone2 = document.importNode(templateEl.content, true).firstElementChild;
        addScopeToNode(clone2, reactive(scope), templateEl);
        mutateDom(function () {
          lastEl.after(clone2);
          initTree(clone2);
        });

        if (_typeof(key) === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }

        lookup[key] = clone2;
      };

      for (var _i8 = 0; _i8 < adds.length; _i8++) {
        _loop4(_i8);
      }

      for (var _i9 = 0; _i9 < sames.length; _i9++) {
        refreshScope(lookup[sames[_i9]], scopes[keys.indexOf(sames[_i9])]);
      }

      templateEl._x_prevKeys = keys;
    });
  }

  function parseForExpression(expression) {
    var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    var stripParensRE = /^\s*\(|\)\s*$/g;
    var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    var inMatch = expression.match(forAliasRE);
    if (!inMatch) return;
    var res = {};
    res.items = inMatch[2].trim();
    var item = inMatch[1].replace(stripParensRE, "").trim();
    var iteratorMatch = item.match(forIteratorRE);

    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();

      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }

    return res;
  }

  function getIterationScopeVariables(iteratorNames, item, index, items) {
    var scopeVariables = {};

    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      var names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map(function (i) {
        return i.trim();
      });
      names.forEach(function (name, i) {
        scopeVariables[name] = item[i];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }

    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }

  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  } // packages/alpinejs/src/directives/x-ref.js


  function handler2() {}

  handler2.inline = function (el, _ref52, _ref53) {
    var expression = _ref52.expression;
    var cleanup2 = _ref53.cleanup;
    var root = closestRoot(el);
    if (!root._x_refs) root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(function () {
      return delete root._x_refs[expression];
    });
  };

  directive("ref", handler2); // packages/alpinejs/src/directives/x-if.js

  directive("if", function (el, _ref54, _ref55) {
    var expression = _ref54.expression;
    var effect3 = _ref55.effect,
        cleanup2 = _ref55.cleanup;
    var evaluate2 = evaluateLater(el, expression);

    var show = function show() {
      if (el._x_currentIfEl) return el._x_currentIfEl;
      var clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(function () {
        el.after(clone2);
        initTree(clone2);
      });
      el._x_currentIfEl = clone2;

      el._x_undoIf = function () {
        clone2.remove();
        delete el._x_currentIfEl;
      };

      return clone2;
    };

    var hide = function hide() {
      if (!el._x_undoIf) return;

      el._x_undoIf();

      delete el._x_undoIf;
    };

    effect3(function () {
      return evaluate2(function (value) {
        value ? show() : hide();
      });
    });
    cleanup2(function () {
      return el._x_undoIf && el._x_undoIf();
    });
  }); // packages/alpinejs/src/directives/x-on.js

  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone(function (el, _ref56, _ref57) {
    var value = _ref56.value,
        modifiers = _ref56.modifiers,
        expression = _ref56.expression;
    var cleanup2 = _ref57.cleanup;
    var evaluate2 = expression ? evaluateLater(el, expression) : function () {};
    var removeListener = on(el, value, modifiers, function (e) {
      evaluate2(function () {}, {
        scope: {
          $event: e
        },
        params: [e]
      });
    });
    cleanup2(function () {
      return removeListener();
    });
  })); // packages/alpinejs/src/index.js

  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({
    reactive: reactive2,
    effect: effect2,
    release: stop,
    raw: toRaw
  });
  var src_default = alpine_default; // packages/alpinejs/builds/cdn.js

  window.Alpine = src_default;
  queueMicrotask(function () {
    src_default.start();
  });
})();
})();

/******/ })()
;