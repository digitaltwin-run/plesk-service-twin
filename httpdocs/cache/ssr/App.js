import { createRequire } from "node:module";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* #__PURE__ */ (() => createRequire(import.meta.url))();
//#endregion
//#region node_modules/react/cjs/react.production.min.js
/**
* @license React
* react.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var l = Symbol.for("react.element");
	var n = Symbol.for("react.portal");
	var p = Symbol.for("react.fragment");
	var q = Symbol.for("react.strict_mode");
	var r = Symbol.for("react.profiler");
	var t = Symbol.for("react.provider");
	var u = Symbol.for("react.context");
	var v = Symbol.for("react.forward_ref");
	var w = Symbol.for("react.suspense");
	var x = Symbol.for("react.memo");
	var y = Symbol.for("react.lazy");
	var z = Symbol.iterator;
	function A(a) {
		if (null === a || "object" !== typeof a) return null;
		a = z && a[z] || a["@@iterator"];
		return "function" === typeof a ? a : null;
	}
	var B = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var C = Object.assign;
	var D = {};
	function E(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	E.prototype.isReactComponent = {};
	E.prototype.setState = function(a, b) {
		if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, a, b, "setState");
	};
	E.prototype.forceUpdate = function(a) {
		this.updater.enqueueForceUpdate(this, a, "forceUpdate");
	};
	function F() {}
	F.prototype = E.prototype;
	function G(a, b, e) {
		this.props = a;
		this.context = b;
		this.refs = D;
		this.updater = e || B;
	}
	var H = G.prototype = new F();
	H.constructor = G;
	C(H, E.prototype);
	H.isPureReactComponent = !0;
	var I = Array.isArray;
	var J = Object.prototype.hasOwnProperty;
	var K = { current: null };
	var L = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function M(a, b, e) {
		var d, c = {}, k = null, h = null;
		if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
		var g = arguments.length - 2;
		if (1 === g) c.children = e;
		else if (1 < g) {
			for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
			c.children = f;
		}
		if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
		return {
			$$typeof: l,
			type: a,
			key: k,
			ref: h,
			props: c,
			_owner: K.current
		};
	}
	function N(a, b) {
		return {
			$$typeof: l,
			type: a.type,
			key: b,
			ref: a.ref,
			props: a.props,
			_owner: a._owner
		};
	}
	function O(a) {
		return "object" === typeof a && null !== a && a.$$typeof === l;
	}
	function escape(a) {
		var b = {
			"=": "=0",
			":": "=2"
		};
		return "$" + a.replace(/[=:]/g, function(a) {
			return b[a];
		});
	}
	var P = /\/+/g;
	function Q(a, b) {
		return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
	}
	function R(a, b, e, d, c) {
		var k = typeof a;
		if ("undefined" === k || "boolean" === k) a = null;
		var h = !1;
		if (null === a) h = !0;
		else switch (k) {
			case "string":
			case "number":
				h = !0;
				break;
			case "object": switch (a.$$typeof) {
				case l:
				case n: h = !0;
			}
		}
		if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a) {
			return a;
		})) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
		h = 0;
		d = "" === d ? "." : d + ":";
		if (I(a)) for (var g = 0; g < a.length; g++) {
			k = a[g];
			var f = d + Q(k, g);
			h += R(k, b, e, f, c);
		}
		else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
		else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
		return h;
	}
	function S(a, b, e) {
		if (null == a) return a;
		var d = [], c = 0;
		R(a, d, "", "", function(a) {
			return b.call(e, a, c++);
		});
		return d;
	}
	function T(a) {
		if (-1 === a._status) {
			var b = a._result;
			b = b();
			b.then(function(b) {
				if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
			}, function(b) {
				if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
			});
			-1 === a._status && (a._status = 0, a._result = b);
		}
		if (1 === a._status) return a._result.default;
		throw a._result;
	}
	var U = { current: null };
	var V = { transition: null };
	var W = {
		ReactCurrentDispatcher: U,
		ReactCurrentBatchConfig: V,
		ReactCurrentOwner: K
	};
	function X() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	exports.Children = {
		map: S,
		forEach: function(a, b, e) {
			S(a, function() {
				b.apply(this, arguments);
			}, e);
		},
		count: function(a) {
			var b = 0;
			S(a, function() {
				b++;
			});
			return b;
		},
		toArray: function(a) {
			return S(a, function(a) {
				return a;
			}) || [];
		},
		only: function(a) {
			if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
			return a;
		}
	};
	exports.Component = E;
	exports.Fragment = p;
	exports.Profiler = r;
	exports.PureComponent = G;
	exports.StrictMode = q;
	exports.Suspense = w;
	exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
	exports.act = X;
	exports.cloneElement = function(a, b, e) {
		if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
		var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
		if (null != b) {
			void 0 !== b.ref && (k = b.ref, h = K.current);
			void 0 !== b.key && (c = "" + b.key);
			if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
			for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
		}
		var f = arguments.length - 2;
		if (1 === f) d.children = e;
		else if (1 < f) {
			g = Array(f);
			for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
			d.children = g;
		}
		return {
			$$typeof: l,
			type: a.type,
			key: c,
			ref: k,
			props: d,
			_owner: h
		};
	};
	exports.createContext = function(a) {
		a = {
			$$typeof: u,
			_currentValue: a,
			_currentValue2: a,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		};
		a.Provider = {
			$$typeof: t,
			_context: a
		};
		return a.Consumer = a;
	};
	exports.createElement = M;
	exports.createFactory = function(a) {
		var b = M.bind(null, a);
		b.type = a;
		return b;
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(a) {
		return {
			$$typeof: v,
			render: a
		};
	};
	exports.isValidElement = O;
	exports.lazy = function(a) {
		return {
			$$typeof: y,
			_payload: {
				_status: -1,
				_result: a
			},
			_init: T
		};
	};
	exports.memo = function(a, b) {
		return {
			$$typeof: x,
			type: a,
			compare: void 0 === b ? null : b
		};
	};
	exports.startTransition = function(a) {
		var b = V.transition;
		V.transition = {};
		try {
			a();
		} finally {
			V.transition = b;
		}
	};
	exports.unstable_act = X;
	exports.useCallback = function(a, b) {
		return U.current.useCallback(a, b);
	};
	exports.useContext = function(a) {
		return U.current.useContext(a);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(a) {
		return U.current.useDeferredValue(a);
	};
	exports.useEffect = function(a, b) {
		return U.current.useEffect(a, b);
	};
	exports.useId = function() {
		return U.current.useId();
	};
	exports.useImperativeHandle = function(a, b, e) {
		return U.current.useImperativeHandle(a, b, e);
	};
	exports.useInsertionEffect = function(a, b) {
		return U.current.useInsertionEffect(a, b);
	};
	exports.useLayoutEffect = function(a, b) {
		return U.current.useLayoutEffect(a, b);
	};
	exports.useMemo = function(a, b) {
		return U.current.useMemo(a, b);
	};
	exports.useReducer = function(a, b, e) {
		return U.current.useReducer(a, b, e);
	};
	exports.useRef = function(a) {
		return U.current.useRef(a);
	};
	exports.useState = function(a) {
		return U.current.useState(a);
	};
	exports.useSyncExternalStore = function(a, b, e) {
		return U.current.useSyncExternalStore(a, b, e);
	};
	exports.useTransition = function() {
		return U.current.useTransition();
	};
	exports.version = "18.3.1";
}));
//#endregion
//#region node_modules/react/cjs/react.development.js
/**
* @license React
* react.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_development = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV !== "production") (function() {
		"use strict";
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(/* @__PURE__ */ new Error());
		var ReactVersion = "18.3.1";
		var REACT_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = "@@iterator";
		function getIteratorFn(maybeIterable) {
			if (maybeIterable === null || typeof maybeIterable !== "object") return null;
			var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
			if (typeof maybeIterator === "function") return maybeIterator;
			return null;
		}
		/**
		* Keeps track of the current dispatcher.
		*/
		var ReactCurrentDispatcher = { 
		/**
		* @internal
		* @type {ReactComponent}
		*/
current: null };
		/**
		* Keeps track of the current batch's configuration such as how long an update
		* should suspend for if it needs to.
		*/
		var ReactCurrentBatchConfig = { transition: null };
		var ReactCurrentActQueue = {
			current: null,
			isBatchingLegacy: false,
			didScheduleLegacyUpdate: false
		};
		/**
		* Keeps track of the current owner.
		*
		* The current owner is the component who should own any components that are
		* currently being constructed.
		*/
		var ReactCurrentOwner = { 
		/**
		* @internal
		* @type {ReactComponent}
		*/
current: null };
		var ReactDebugCurrentFrame = {};
		var currentExtraStackFrame = null;
		function setExtraStackFrame(stack) {
			currentExtraStackFrame = stack;
		}
		ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
			currentExtraStackFrame = stack;
		};
		ReactDebugCurrentFrame.getCurrentStack = null;
		ReactDebugCurrentFrame.getStackAddendum = function() {
			var stack = "";
			if (currentExtraStackFrame) stack += currentExtraStackFrame;
			var impl = ReactDebugCurrentFrame.getCurrentStack;
			if (impl) stack += impl() || "";
			return stack;
		};
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var ReactSharedInternals = {
			ReactCurrentDispatcher,
			ReactCurrentBatchConfig,
			ReactCurrentOwner
		};
		ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
		ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
		function warn(format) {
			for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
			printWarning("warn", format, args);
		}
		function error(format) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			printWarning("error", format, args);
		}
		function printWarning(level, format, args) {
			var stack = ReactSharedInternals.ReactDebugCurrentFrame.getStackAddendum();
			if (stack !== "") {
				format += "%s";
				args = args.concat([stack]);
			}
			var argsWithFormat = args.map(function(item) {
				return String(item);
			});
			argsWithFormat.unshift("Warning: " + format);
			Function.prototype.apply.call(console[level], console, argsWithFormat);
		}
		var didWarnStateUpdateForUnmountedComponent = {};
		function warnNoop(publicInstance, callerName) {
			var _constructor = publicInstance.constructor;
			var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
			var warningKey = componentName + "." + callerName;
			if (didWarnStateUpdateForUnmountedComponent[warningKey]) return;
			error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
			didWarnStateUpdateForUnmountedComponent[warningKey] = true;
		}
		/**
		* This is the abstract API for an update queue.
		*/
		var ReactNoopUpdateQueue = {
			/**
			* Checks whether or not this composite component is mounted.
			* @param {ReactClass} publicInstance The instance we want to test.
			* @return {boolean} True if mounted, false otherwise.
			* @protected
			* @final
			*/
			isMounted: function(publicInstance) {
				return false;
			},
			/**
			* Forces an update. This should only be invoked when it is known with
			* certainty that we are **not** in a DOM transaction.
			*
			* You may want to call this when you know that some deeper aspect of the
			* component's state has changed but `setState` was not called.
			*
			* This will not invoke `shouldComponentUpdate`, but it will invoke
			* `componentWillUpdate` and `componentDidUpdate`.
			*
			* @param {ReactClass} publicInstance The instance that should rerender.
			* @param {?function} callback Called after component is updated.
			* @param {?string} callerName name of the calling function in the public API.
			* @internal
			*/
			enqueueForceUpdate: function(publicInstance, callback, callerName) {
				warnNoop(publicInstance, "forceUpdate");
			},
			/**
			* Replaces all of the state. Always use this or `setState` to mutate state.
			* You should treat `this.state` as immutable.
			*
			* There is no guarantee that `this.state` will be immediately updated, so
			* accessing `this.state` after calling this method may return the old value.
			*
			* @param {ReactClass} publicInstance The instance that should rerender.
			* @param {object} completeState Next state.
			* @param {?function} callback Called after component is updated.
			* @param {?string} callerName name of the calling function in the public API.
			* @internal
			*/
			enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
				warnNoop(publicInstance, "replaceState");
			},
			/**
			* Sets a subset of the state. This only exists because _pendingState is
			* internal. This provides a merging strategy that is not available to deep
			* properties which is confusing. TODO: Expose pendingState or don't use it
			* during the merge.
			*
			* @param {ReactClass} publicInstance The instance that should rerender.
			* @param {object} partialState Next partial state to be merged with state.
			* @param {?function} callback Called after component is updated.
			* @param {?string} Name of the calling function in the public API.
			* @internal
			*/
			enqueueSetState: function(publicInstance, partialState, callback, callerName) {
				warnNoop(publicInstance, "setState");
			}
		};
		var assign = Object.assign;
		var emptyObject = {};
		Object.freeze(emptyObject);
		/**
		* Base class helpers for the updating state of a component.
		*/
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		Component.prototype.isReactComponent = {};
		/**
		* Sets a subset of the state. Always use this to mutate
		* state. You should treat `this.state` as immutable.
		*
		* There is no guarantee that `this.state` will be immediately updated, so
		* accessing `this.state` after calling this method may return the old value.
		*
		* There is no guarantee that calls to `setState` will run synchronously,
		* as they may eventually be batched together.  You can provide an optional
		* callback that will be executed when the call to setState is actually
		* completed.
		*
		* When a function is provided to setState, it will be called at some point in
		* the future (not synchronously). It will be called with the up to date
		* component arguments (state, props, context). These values can be different
		* from this.* because your function may be called after receiveProps but before
		* shouldComponentUpdate, and this new state, props, and context will not yet be
		* assigned to this.
		*
		* @param {object|function} partialState Next partial state or function to
		*        produce next partial state to be merged with current state.
		* @param {?function} callback Called after state is updated.
		* @final
		* @protected
		*/
		Component.prototype.setState = function(partialState, callback) {
			if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		/**
		* Forces an update. This should only be invoked when it is known with
		* certainty that we are **not** in a DOM transaction.
		*
		* You may want to call this when you know that some deeper aspect of the
		* component's state has changed but `setState` was not called.
		*
		* This will not invoke `shouldComponentUpdate`, but it will invoke
		* `componentWillUpdate` and `componentDidUpdate`.
		*
		* @param {?function} callback Called after update is complete.
		* @final
		* @protected
		*/
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		var deprecatedAPIs = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		var defineDeprecationWarning = function(methodName, info) {
			Object.defineProperty(Component.prototype, methodName, { get: function() {
				warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
			} });
		};
		for (var fnName in deprecatedAPIs) if (deprecatedAPIs.hasOwnProperty(fnName)) defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
		function ComponentDummy() {}
		ComponentDummy.prototype = Component.prototype;
		/**
		* Convenience component with default shallow equality check for sCU.
		*/
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent;
		assign(pureComponentPrototype, Component.prototype);
		pureComponentPrototype.isPureReactComponent = true;
		function createRef() {
			var refObject = { current: null };
			Object.seal(refObject);
			return refObject;
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
			return isArrayImpl(a);
		}
		function typeName(value) {
			return typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
		}
		function willCoercionThrow(value) {
			try {
				testStringCoercion(value);
				return false;
			} catch (e) {
				return true;
			}
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			if (willCoercionThrow(value)) {
				error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
				return testStringCoercion(value);
			}
		}
		function getWrappedName(outerType, innerType, wrapperName) {
			var displayName = outerType.displayName;
			if (displayName) return displayName;
			var functionName = innerType.displayName || innerType.name || "";
			return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
			return type.displayName || "Context";
		}
		function getComponentNameFromType(type) {
			if (type == null) return null;
			if (typeof type.tag === "number") error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
			if (typeof type === "function") return type.displayName || type.name || null;
			if (typeof type === "string") return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_CONTEXT_TYPE: return getContextName(type) + ".Consumer";
				case REACT_PROVIDER_TYPE: return getContextName(type._context) + ".Provider";
				case REACT_FORWARD_REF_TYPE: return getWrappedName(type, type.render, "ForwardRef");
				case REACT_MEMO_TYPE:
					var outerName = type.displayName || null;
					if (outerName !== null) return outerName;
					return getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return getComponentNameFromType(init(payload));
					} catch (x) {
						return null;
					}
			}
			return null;
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var RESERVED_PROPS = {
			key: true,
			ref: true,
			__self: true,
			__source: true
		};
		var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs = {};
		function hasValidRef(config) {
			if (hasOwnProperty.call(config, "ref")) {
				var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.ref !== void 0;
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.key !== void 0;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			var warnAboutAccessingKey = function() {
				if (!specialPropKeyWarningShown) {
					specialPropKeyWarningShown = true;
					error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingKey.isReactWarning = true;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: true
			});
		}
		function defineRefPropWarningGetter(props, displayName) {
			var warnAboutAccessingRef = function() {
				if (!specialPropRefWarningShown) {
					specialPropRefWarningShown = true;
					error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingRef.isReactWarning = true;
			Object.defineProperty(props, "ref", {
				get: warnAboutAccessingRef,
				configurable: true
			});
		}
		function warnIfStringRefCannotBeAutoConverted(config) {
			if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
				var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (!didWarnAboutStringRefs[componentName]) {
					error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", componentName, config.ref);
					didWarnAboutStringRefs[componentName] = true;
				}
			}
		}
		/**
		* Factory method to create a new React element. This no longer adheres to
		* the class pattern, so do not use new to call it. Also, instanceof check
		* will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		* if something is a React Element.
		*
		* @param {*} type
		* @param {*} props
		* @param {*} key
		* @param {string|object} ref
		* @param {*} owner
		* @param {*} self A *temporary* helper to detect places where `this` is
		* different from the `owner` when React.createElement is called, so that we
		* can warn. We want to get rid of owner and replace string `ref`s with arrow
		* functions, and as long as `this` and owner are the same, there will be no
		* change in behavior.
		* @param {*} source An annotation object (added by a transpiler or otherwise)
		* indicating filename, line number, and/or other information.
		* @internal
		*/
		var ReactElement = function(type, key, ref, self, source, owner, props) {
			var element = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref,
				props,
				_owner: owner
			};
			element._store = {};
			Object.defineProperty(element._store, "validated", {
				configurable: false,
				enumerable: false,
				writable: true,
				value: false
			});
			Object.defineProperty(element, "_self", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: self
			});
			Object.defineProperty(element, "_source", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: source
			});
			if (Object.freeze) {
				Object.freeze(element.props);
				Object.freeze(element);
			}
			return element;
		};
		/**
		* Create and return a new ReactElement of the given type.
		* See https://reactjs.org/docs/react-api.html#createelement
		*/
		function createElement(type, config, children) {
			var propName;
			var props = {};
			var key = null;
			var ref = null;
			var self = null;
			var source = null;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					warnIfStringRefCannotBeAutoConverted(config);
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				self = config.__self === void 0 ? null : config.__self;
				source = config.__source === void 0 ? null : config.__source;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
			else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				if (Object.freeze) Object.freeze(childArray);
				props.children = childArray;
			}
			if (type && type.defaultProps) {
				var defaultProps = type.defaultProps;
				for (propName in defaultProps) if (props[propName] === void 0) props[propName] = defaultProps[propName];
			}
			if (key || ref) {
				var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
				if (key) defineKeyPropWarningGetter(props, displayName);
				if (ref) defineRefPropWarningGetter(props, displayName);
			}
			return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			return ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
		}
		/**
		* Clone and return a new ReactElement using element as the starting point.
		* See https://reactjs.org/docs/react-api.html#cloneelement
		*/
		function cloneElement(element, config, children) {
			if (element === null || element === void 0) throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
			var propName;
			var props = assign({}, element.props);
			var key = element.key;
			var ref = element.ref;
			var self = element._self;
			var source = element._source;
			var owner = element._owner;
			if (config != null) {
				if (hasValidRef(config)) {
					ref = config.ref;
					owner = ReactCurrentOwner.current;
				}
				if (hasValidKey(config)) {
					checkKeyStringCoercion(config.key);
					key = "" + config.key;
				}
				var defaultProps;
				if (element.type && element.type.defaultProps) defaultProps = element.type.defaultProps;
				for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
					if (config[propName] === void 0 && defaultProps !== void 0) props[propName] = defaultProps[propName];
					else props[propName] = config[propName];
				}
			}
			var childrenLength = arguments.length - 2;
			if (childrenLength === 1) props.children = children;
			else if (childrenLength > 1) {
				var childArray = Array(childrenLength);
				for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				props.children = childArray;
			}
			return ReactElement(element.type, key, ref, self, source, owner, props);
		}
		/**
		* Verifies the object is a ReactElement.
		* See https://reactjs.org/docs/react-api.html#isvalidelement
		* @param {?object} object
		* @return {boolean} True if `object` is a ReactElement.
		* @final
		*/
		function isValidElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var SEPARATOR = ".";
		var SUBSEPARATOR = ":";
		/**
		* Escape and wrap key so it is safe to use as a reactid
		*
		* @param {string} key to be escaped.
		* @return {string} the escaped key.
		*/
		function escape(key) {
			var escapeRegex = /[=:]/g;
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(escapeRegex, function(match) {
				return escaperLookup[match];
			});
		}
		/**
		* TODO: Test that a single child and an array with one item have the same key
		* pattern.
		*/
		var didWarnAboutMaps = false;
		var userProvidedKeyEscapeRegex = /\/+/g;
		function escapeUserProvidedKey(text) {
			return text.replace(userProvidedKeyEscapeRegex, "$&/");
		}
		/**
		* Generate a key string that identifies a element within a set.
		*
		* @param {*} element A element that could contain a manual key.
		* @param {number} index Index that is used if a manual key is not provided.
		* @return {string}
		*/
		function getElementKey(element, index) {
			if (typeof element === "object" && element !== null && element.key != null) {
				checkKeyStringCoercion(element.key);
				return escape("" + element.key);
			}
			return index.toString(36);
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if (type === "undefined" || type === "boolean") children = null;
			var invokeCallback = false;
			if (children === null) invokeCallback = true;
			else switch (type) {
				case "string":
				case "number":
					invokeCallback = true;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE: invokeCallback = true;
				}
			}
			if (invokeCallback) {
				var _child = children;
				var mappedChild = callback(_child);
				var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
				if (isArray(mappedChild)) {
					var escapedChildKey = "";
					if (childKey != null) escapedChildKey = escapeUserProvidedKey(childKey) + "/";
					mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
						return c;
					});
				} else if (mappedChild != null) {
					if (isValidElement(mappedChild)) {
						if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) checkKeyStringCoercion(mappedChild.key);
						mappedChild = cloneAndReplaceKey(mappedChild, escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey);
					}
					array.push(mappedChild);
				}
				return 1;
			}
			var child;
			var nextName;
			var subtreeCount = 0;
			var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
			if (isArray(children)) for (var i = 0; i < children.length; i++) {
				child = children[i];
				nextName = nextNamePrefix + getElementKey(child, i);
				subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
			}
			else {
				var iteratorFn = getIteratorFn(children);
				if (typeof iteratorFn === "function") {
					var iterableChildren = children;
					if (iteratorFn === iterableChildren.entries) {
						if (!didWarnAboutMaps) warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
						didWarnAboutMaps = true;
					}
					var iterator = iteratorFn.call(iterableChildren);
					var step;
					var ii = 0;
					while (!(step = iterator.next()).done) {
						child = step.value;
						nextName = nextNamePrefix + getElementKey(child, ii++);
						subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
					}
				} else if (type === "object") {
					var childrenString = String(children);
					throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
				}
			}
			return subtreeCount;
		}
		/**
		* Maps children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenmap
		*
		* The provided mapFunction(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} func The map function.
		* @param {*} context Context for mapFunction.
		* @return {object} Object containing the ordered map of results.
		*/
		function mapChildren(children, func, context) {
			if (children == null) return children;
			var result = [];
			var count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		/**
		* Count the number of children that are typically specified as
		* `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrencount
		*
		* @param {?*} children Children tree container.
		* @return {number} The number of children.
		*/
		function countChildren(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		}
		/**
		* Iterates through children that are typically specified as `props.children`.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenforeach
		*
		* The provided forEachFunc(child, index) will be called for each
		* leaf child.
		*
		* @param {?*} children Children tree container.
		* @param {function(*, int)} forEachFunc
		* @param {*} forEachContext Context for forEachContext.
		*/
		function forEachChildren(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		}
		/**
		* Flatten a children object (typically specified as `props.children`) and
		* return an array with appropriately re-keyed children.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrentoarray
		*/
		function toArray(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		}
		/**
		* Returns the first child in a collection of children and verifies that there
		* is only one child in the collection.
		*
		* See https://reactjs.org/docs/react-api.html#reactchildrenonly
		*
		* The current implementation of this function assumes that a single child gets
		* passed without a wrapper, but the purpose of this helper function is to
		* abstract away the particular structure of children.
		*
		* @param {?object} children Child collection structure.
		* @return {ReactElement} The first and only `ReactElement` contained in the
		* structure.
		*/
		function onlyChild(children) {
			if (!isValidElement(children)) throw new Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
		function createContext(defaultValue) {
			var context = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null,
				_defaultValue: null,
				_globalName: null
			};
			context.Provider = {
				$$typeof: REACT_PROVIDER_TYPE,
				_context: context
			};
			var hasWarnedAboutUsingNestedContextConsumers = false;
			var hasWarnedAboutUsingConsumerProvider = false;
			var hasWarnedAboutDisplayNameOnConsumer = false;
			var Consumer = {
				$$typeof: REACT_CONTEXT_TYPE,
				_context: context
			};
			Object.defineProperties(Consumer, {
				Provider: {
					get: function() {
						if (!hasWarnedAboutUsingConsumerProvider) {
							hasWarnedAboutUsingConsumerProvider = true;
							error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
						}
						return context.Provider;
					},
					set: function(_Provider) {
						context.Provider = _Provider;
					}
				},
				_currentValue: {
					get: function() {
						return context._currentValue;
					},
					set: function(_currentValue) {
						context._currentValue = _currentValue;
					}
				},
				_currentValue2: {
					get: function() {
						return context._currentValue2;
					},
					set: function(_currentValue2) {
						context._currentValue2 = _currentValue2;
					}
				},
				_threadCount: {
					get: function() {
						return context._threadCount;
					},
					set: function(_threadCount) {
						context._threadCount = _threadCount;
					}
				},
				Consumer: { get: function() {
					if (!hasWarnedAboutUsingNestedContextConsumers) {
						hasWarnedAboutUsingNestedContextConsumers = true;
						error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
					}
					return context.Consumer;
				} },
				displayName: {
					get: function() {
						return context.displayName;
					},
					set: function(displayName) {
						if (!hasWarnedAboutDisplayNameOnConsumer) {
							warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
							hasWarnedAboutDisplayNameOnConsumer = true;
						}
					}
				}
			});
			context.Consumer = Consumer;
			context._currentRenderer = null;
			context._currentRenderer2 = null;
			return context;
		}
		var Uninitialized = -1;
		var Pending = 0;
		var Resolved = 1;
		var Rejected = 2;
		function lazyInitializer(payload) {
			if (payload._status === Uninitialized) {
				var ctor = payload._result;
				var thenable = ctor();
				thenable.then(function(moduleObject) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var resolved = payload;
						resolved._status = Resolved;
						resolved._result = moduleObject;
					}
				}, function(error) {
					if (payload._status === Pending || payload._status === Uninitialized) {
						var rejected = payload;
						rejected._status = Rejected;
						rejected._result = error;
					}
				});
				if (payload._status === Uninitialized) {
					var pending = payload;
					pending._status = Pending;
					pending._result = thenable;
				}
			}
			if (payload._status === Resolved) {
				var moduleObject = payload._result;
				if (moduleObject === void 0) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
				if (!("default" in moduleObject)) error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
				return moduleObject.default;
			} else throw payload._result;
		}
		function lazy(ctor) {
			var lazyType = {
				$$typeof: REACT_LAZY_TYPE,
				_payload: {
					_status: Uninitialized,
					_result: ctor
				},
				_init: lazyInitializer
			};
			var defaultProps;
			var propTypes;
			Object.defineProperties(lazyType, {
				defaultProps: {
					configurable: true,
					get: function() {
						return defaultProps;
					},
					set: function(newDefaultProps) {
						error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
						defaultProps = newDefaultProps;
						Object.defineProperty(lazyType, "defaultProps", { enumerable: true });
					}
				},
				propTypes: {
					configurable: true,
					get: function() {
						return propTypes;
					},
					set: function(newPropTypes) {
						error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
						propTypes = newPropTypes;
						Object.defineProperty(lazyType, "propTypes", { enumerable: true });
					}
				}
			});
			return lazyType;
		}
		function forwardRef(render) {
			if (render != null && render.$$typeof === REACT_MEMO_TYPE) error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
			else if (typeof render !== "function") error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
			else if (render.length !== 0 && render.length !== 2) error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
			if (render != null) {
				if (render.defaultProps != null || render.propTypes != null) error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
			}
			var elementType = {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			};
			var ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: false,
				configurable: true,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					if (!render.name && !render.displayName) render.displayName = name;
				}
			});
			return elementType;
		}
		var REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
		function isValidElementType(type) {
			if (typeof type === "string" || typeof type === "function") return true;
			if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
			if (typeof type === "object" && type !== null) {
				if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) return true;
			}
			return false;
		}
		function memo(type, compare) {
			if (!isValidElementType(type)) error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
			var elementType = {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: compare === void 0 ? null : compare
			};
			var ownName;
			Object.defineProperty(elementType, "displayName", {
				enumerable: false,
				configurable: true,
				get: function() {
					return ownName;
				},
				set: function(name) {
					ownName = name;
					if (!type.name && !type.displayName) type.displayName = name;
				}
			});
			return elementType;
		}
		function resolveDispatcher() {
			var dispatcher = ReactCurrentDispatcher.current;
			if (dispatcher === null) error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
			return dispatcher;
		}
		function useContext(Context) {
			var dispatcher = resolveDispatcher();
			if (Context._context !== void 0) {
				var realContext = Context._context;
				if (realContext.Consumer === Context) error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
				else if (realContext.Provider === Context) error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
			}
			return dispatcher.useContext(Context);
		}
		function useState(initialState) {
			return resolveDispatcher().useState(initialState);
		}
		function useReducer(reducer, initialArg, init) {
			return resolveDispatcher().useReducer(reducer, initialArg, init);
		}
		function useRef(initialValue) {
			return resolveDispatcher().useRef(initialValue);
		}
		function useEffect(create, deps) {
			return resolveDispatcher().useEffect(create, deps);
		}
		function useInsertionEffect(create, deps) {
			return resolveDispatcher().useInsertionEffect(create, deps);
		}
		function useLayoutEffect(create, deps) {
			return resolveDispatcher().useLayoutEffect(create, deps);
		}
		function useCallback(callback, deps) {
			return resolveDispatcher().useCallback(callback, deps);
		}
		function useMemo(create, deps) {
			return resolveDispatcher().useMemo(create, deps);
		}
		function useImperativeHandle(ref, create, deps) {
			return resolveDispatcher().useImperativeHandle(ref, create, deps);
		}
		function useDebugValue(value, formatterFn) {
			return resolveDispatcher().useDebugValue(value, formatterFn);
		}
		function useTransition() {
			return resolveDispatcher().useTransition();
		}
		function useDeferredValue(value) {
			return resolveDispatcher().useDeferredValue(value);
		}
		function useId() {
			return resolveDispatcher().useId();
		}
		function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
			return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		}
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
			if (disabledDepth === 0) {
				prevLog = console.log;
				prevInfo = console.info;
				prevWarn = console.warn;
				prevError = console.error;
				prevGroup = console.group;
				prevGroupCollapsed = console.groupCollapsed;
				prevGroupEnd = console.groupEnd;
				var props = {
					configurable: true,
					enumerable: true,
					value: disabledLog,
					writable: true
				};
				Object.defineProperties(console, {
					info: props,
					log: props,
					warn: props,
					error: props,
					group: props,
					groupCollapsed: props,
					groupEnd: props
				});
			}
			disabledDepth++;
		}
		function reenableLogs() {
			disabledDepth--;
			if (disabledDepth === 0) {
				var props = {
					configurable: true,
					enumerable: true,
					writable: true
				};
				Object.defineProperties(console, {
					log: assign({}, props, { value: prevLog }),
					info: assign({}, props, { value: prevInfo }),
					warn: assign({}, props, { value: prevWarn }),
					error: assign({}, props, { value: prevError }),
					group: assign({}, props, { value: prevGroup }),
					groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
					groupEnd: assign({}, props, { value: prevGroupEnd })
				});
			}
			if (disabledDepth < 0) error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
			if (prefix === void 0) try {
				throw Error();
			} catch (x) {
				var match = x.stack.trim().match(/\n( *(at )?)/);
				prefix = match && match[1] || "";
			}
			return "\n" + prefix + name;
		}
		var reentry = false;
		var componentFrameCache = new (typeof WeakMap === "function" ? WeakMap : Map)();
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			var frame = componentFrameCache.get(fn);
			if (frame !== void 0) return frame;
			var control;
			reentry = true;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			var previousDispatcher = ReactCurrentDispatcher$1.current;
			ReactCurrentDispatcher$1.current = null;
			disableLogs();
			try {
				if (construct) {
					var Fake = function() {
						throw Error();
					};
					Object.defineProperty(Fake.prototype, "props", { set: function() {
						throw Error();
					} });
					if (typeof Reflect === "object" && Reflect.construct) {
						try {
							Reflect.construct(Fake, []);
						} catch (x) {
							control = x;
						}
						Reflect.construct(fn, [], Fake);
					} else {
						try {
							Fake.call();
						} catch (x) {
							control = x;
						}
						fn.call(Fake.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (x) {
						control = x;
					}
					fn();
				}
			} catch (sample) {
				if (sample && control && typeof sample.stack === "string") {
					var sampleLines = sample.stack.split("\n");
					var controlLines = control.stack.split("\n");
					var s = sampleLines.length - 1;
					var c = controlLines.length - 1;
					while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) c--;
					for (; s >= 1 && c >= 0; s--, c--) if (sampleLines[s] !== controlLines[c]) {
						if (s !== 1 || c !== 1) do {
							s--;
							c--;
							if (c < 0 || sampleLines[s] !== controlLines[c]) {
								var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
								if (fn.displayName && _frame.includes("<anonymous>")) _frame = _frame.replace("<anonymous>", fn.displayName);
								if (typeof fn === "function") componentFrameCache.set(fn, _frame);
								return _frame;
							}
						} while (s >= 1 && c >= 0);
						break;
					}
				}
			} finally {
				reentry = false;
				ReactCurrentDispatcher$1.current = previousDispatcher;
				reenableLogs();
				Error.prepareStackTrace = previousPrepareStackTrace;
			}
			var name = fn ? fn.displayName || fn.name : "";
			var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
			if (typeof fn === "function") componentFrameCache.set(fn, syntheticFrame);
			return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
			return describeNativeComponentFrame(fn, false);
		}
		function shouldConstruct(Component) {
			var prototype = Component.prototype;
			return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
			if (type == null) return "";
			if (typeof type === "function") return describeNativeComponentFrame(type, shouldConstruct(type));
			if (typeof type === "string") return describeBuiltInComponentFrame(type);
			switch (type) {
				case REACT_SUSPENSE_TYPE: return describeBuiltInComponentFrame("Suspense");
				case REACT_SUSPENSE_LIST_TYPE: return describeBuiltInComponentFrame("SuspenseList");
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_FORWARD_REF_TYPE: return describeFunctionComponentFrame(type.render);
				case REACT_MEMO_TYPE: return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
					} catch (x) {}
			}
			return "";
		}
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
			var has = Function.call.bind(hasOwnProperty);
			for (var typeSpecName in typeSpecs) if (has(typeSpecs, typeSpecName)) {
				var error$1 = void 0;
				try {
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						err.name = "Invariant Violation";
						throw err;
					}
					error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
				} catch (ex) {
					error$1 = ex;
				}
				if (error$1 && !(error$1 instanceof Error)) {
					setCurrentlyValidatingElement(element);
					error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
					setCurrentlyValidatingElement(null);
				}
				if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
					loggedTypeFailures[error$1.message] = true;
					setCurrentlyValidatingElement(element);
					error("Failed %s type: %s", location, error$1.message);
					setCurrentlyValidatingElement(null);
				}
			}
		}
		function setCurrentlyValidatingElement$1(element) {
			if (element) {
				var owner = element._owner;
				setExtraStackFrame(describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null));
			} else setExtraStackFrame(null);
		}
		var propTypesMisspellWarningShown = false;
		function getDeclarationErrorAddendum() {
			if (ReactCurrentOwner.current) {
				var name = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (name) return "\n\nCheck the render method of `" + name + "`.";
			}
			return "";
		}
		function getSourceInfoErrorAddendum(source) {
			if (source !== void 0) {
				var fileName = source.fileName.replace(/^.*[\\\/]/, "");
				var lineNumber = source.lineNumber;
				return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
			}
			return "";
		}
		function getSourceInfoErrorAddendumForProps(elementProps) {
			if (elementProps !== null && elementProps !== void 0) return getSourceInfoErrorAddendum(elementProps.__source);
			return "";
		}
		/**
		* Warn if there's no key explicitly set on dynamic arrays of children or
		* object keys are not valid. This allows us to keep track of children between
		* updates.
		*/
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
			var info = getDeclarationErrorAddendum();
			if (!info) {
				var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
				if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
			}
			return info;
		}
		/**
		* Warn if the element doesn't have an explicit key assigned to it.
		* This element is in an array. The array could grow and shrink or be
		* reordered. All children that haven't already been validated are required to
		* have a "key" property assigned to it. Error statuses are cached so a warning
		* will only be shown once.
		*
		* @internal
		* @param {ReactElement} element Element that requires a key.
		* @param {*} parentType element's parent's type.
		*/
		function validateExplicitKey(element, parentType) {
			if (!element._store || element._store.validated || element.key != null) return;
			element._store.validated = true;
			var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
			if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
			ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
			var childOwner = "";
			if (element && element._owner && element._owner !== ReactCurrentOwner.current) childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
			setCurrentlyValidatingElement$1(element);
			error("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
			setCurrentlyValidatingElement$1(null);
		}
		/**
		* Ensure that every element either is passed in a static location, in an
		* array with an explicit keys property defined, or in an object literal
		* with valid key property.
		*
		* @internal
		* @param {ReactNode} node Statically passed child of any type.
		* @param {*} parentType node's parent's type.
		*/
		function validateChildKeys(node, parentType) {
			if (typeof node !== "object") return;
			if (isArray(node)) for (var i = 0; i < node.length; i++) {
				var child = node[i];
				if (isValidElement(child)) validateExplicitKey(child, parentType);
			}
			else if (isValidElement(node)) {
				if (node._store) node._store.validated = true;
			} else if (node) {
				var iteratorFn = getIteratorFn(node);
				if (typeof iteratorFn === "function") {
					if (iteratorFn !== node.entries) {
						var iterator = iteratorFn.call(node);
						var step;
						while (!(step = iterator.next()).done) if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
		/**
		* Given an element, validate that its props follow the propTypes definition,
		* provided by the type.
		*
		* @param {ReactElement} element
		*/
		function validatePropTypes(element) {
			var type = element.type;
			if (type === null || type === void 0 || typeof type === "string") return;
			var propTypes;
			if (typeof type === "function") propTypes = type.propTypes;
			else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
			else return;
			if (propTypes) {
				var name = getComponentNameFromType(type);
				checkPropTypes(propTypes, element.props, "prop", name, element);
			} else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
				propTypesMisspellWarningShown = true;
				error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", getComponentNameFromType(type) || "Unknown");
			}
			if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
		}
		/**
		* Given a fragment, validate that it can only be provided with fragment props
		* @param {ReactElement} fragment
		*/
		function validateFragmentProps(fragment) {
			var keys = Object.keys(fragment.props);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key !== "children" && key !== "key") {
					setCurrentlyValidatingElement$1(fragment);
					error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
					setCurrentlyValidatingElement$1(null);
					break;
				}
			}
			if (fragment.ref !== null) {
				setCurrentlyValidatingElement$1(fragment);
				error("Invalid attribute `ref` supplied to `React.Fragment`.");
				setCurrentlyValidatingElement$1(null);
			}
		}
		function createElementWithValidation(type, props, children) {
			var validType = isValidElementType(type);
			if (!validType) {
				var info = "";
				if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
				var sourceInfo = getSourceInfoErrorAddendumForProps(props);
				if (sourceInfo) info += sourceInfo;
				else info += getDeclarationErrorAddendum();
				var typeString;
				if (type === null) typeString = "null";
				else if (isArray(type)) typeString = "array";
				else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
					typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
					info = " Did you accidentally export a JSX literal instead of a component?";
				} else typeString = typeof type;
				error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
			}
			var element = createElement.apply(this, arguments);
			if (element == null) return element;
			if (validType) for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type);
			if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
			else validatePropTypes(element);
			return element;
		}
		var didWarnAboutDeprecatedCreateFactory = false;
		function createFactoryWithValidation(type) {
			var validatedFactory = createElementWithValidation.bind(null, type);
			validatedFactory.type = type;
			if (!didWarnAboutDeprecatedCreateFactory) {
				didWarnAboutDeprecatedCreateFactory = true;
				warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
			}
			Object.defineProperty(validatedFactory, "type", {
				enumerable: false,
				get: function() {
					warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
					Object.defineProperty(this, "type", { value: type });
					return type;
				}
			});
			return validatedFactory;
		}
		function cloneElementWithValidation(element, props, children) {
			var newElement = cloneElement.apply(this, arguments);
			for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], newElement.type);
			validatePropTypes(newElement);
			return newElement;
		}
		function startTransition(scope, options) {
			var prevTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition = {};
			var currentTransition = ReactCurrentBatchConfig.transition;
			ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
			try {
				scope();
			} finally {
				ReactCurrentBatchConfig.transition = prevTransition;
				if (prevTransition === null && currentTransition._updatedFibers) {
					if (currentTransition._updatedFibers.size > 10) warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
					currentTransition._updatedFibers.clear();
				}
			}
		}
		var didWarnAboutMessageChannel = false;
		var enqueueTaskImpl = null;
		function enqueueTask(task) {
			if (enqueueTaskImpl === null) try {
				var requireString = ("require" + Math.random()).slice(0, 7);
				enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
			} catch (_err) {
				enqueueTaskImpl = function(callback) {
					if (didWarnAboutMessageChannel === false) {
						didWarnAboutMessageChannel = true;
						if (typeof MessageChannel === "undefined") error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
					}
					var channel = new MessageChannel();
					channel.port1.onmessage = callback;
					channel.port2.postMessage(void 0);
				};
			}
			return enqueueTaskImpl(task);
		}
		var actScopeDepth = 0;
		var didWarnNoAwaitAct = false;
		function act(callback) {
			var prevActScopeDepth = actScopeDepth;
			actScopeDepth++;
			if (ReactCurrentActQueue.current === null) ReactCurrentActQueue.current = [];
			var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
			var result;
			try {
				ReactCurrentActQueue.isBatchingLegacy = true;
				result = callback();
				if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
					var queue = ReactCurrentActQueue.current;
					if (queue !== null) {
						ReactCurrentActQueue.didScheduleLegacyUpdate = false;
						flushActQueue(queue);
					}
				}
			} catch (error) {
				popActScope(prevActScopeDepth);
				throw error;
			} finally {
				ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
			}
			if (result !== null && typeof result === "object" && typeof result.then === "function") {
				var thenableResult = result;
				var wasAwaited = false;
				var thenable = { then: function(resolve, reject) {
					wasAwaited = true;
					thenableResult.then(function(returnValue) {
						popActScope(prevActScopeDepth);
						if (actScopeDepth === 0) recursivelyFlushAsyncActWork(returnValue, resolve, reject);
						else resolve(returnValue);
					}, function(error) {
						popActScope(prevActScopeDepth);
						reject(error);
					});
				} };
				if (!didWarnNoAwaitAct && typeof Promise !== "undefined") Promise.resolve().then(function() {}).then(function() {
					if (!wasAwaited) {
						didWarnNoAwaitAct = true;
						error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
					}
				});
				return thenable;
			} else {
				var returnValue = result;
				popActScope(prevActScopeDepth);
				if (actScopeDepth === 0) {
					var _queue = ReactCurrentActQueue.current;
					if (_queue !== null) {
						flushActQueue(_queue);
						ReactCurrentActQueue.current = null;
					}
					return { then: function(resolve, reject) {
						if (ReactCurrentActQueue.current === null) {
							ReactCurrentActQueue.current = [];
							recursivelyFlushAsyncActWork(returnValue, resolve, reject);
						} else resolve(returnValue);
					} };
				} else return { then: function(resolve, reject) {
					resolve(returnValue);
				} };
			}
		}
		function popActScope(prevActScopeDepth) {
			if (prevActScopeDepth !== actScopeDepth - 1) error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
			actScopeDepth = prevActScopeDepth;
		}
		function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
			var queue = ReactCurrentActQueue.current;
			if (queue !== null) try {
				flushActQueue(queue);
				enqueueTask(function() {
					if (queue.length === 0) {
						ReactCurrentActQueue.current = null;
						resolve(returnValue);
					} else recursivelyFlushAsyncActWork(returnValue, resolve, reject);
				});
			} catch (error) {
				reject(error);
			}
			else resolve(returnValue);
		}
		var isFlushing = false;
		function flushActQueue(queue) {
			if (!isFlushing) {
				isFlushing = true;
				var i = 0;
				try {
					for (; i < queue.length; i++) {
						var callback = queue[i];
						do
							callback = callback(true);
						while (callback !== null);
					}
					queue.length = 0;
				} catch (error) {
					queue = queue.slice(i + 1);
					throw error;
				} finally {
					isFlushing = false;
				}
			}
		}
		var createElement$1 = createElementWithValidation;
		var cloneElement$1 = cloneElementWithValidation;
		var createFactory = createFactoryWithValidation;
		exports.Children = {
			map: mapChildren,
			forEach: forEachChildren,
			count: countChildren,
			toArray,
			only: onlyChild
		};
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
		exports.act = act;
		exports.cloneElement = cloneElement$1;
		exports.createContext = createContext;
		exports.createElement = createElement$1;
		exports.createFactory = createFactory;
		exports.createRef = createRef;
		exports.forwardRef = forwardRef;
		exports.isValidElement = isValidElement;
		exports.lazy = lazy;
		exports.memo = memo;
		exports.startTransition = startTransition;
		exports.unstable_act = act;
		exports.useCallback = useCallback;
		exports.useContext = useContext;
		exports.useDebugValue = useDebugValue;
		exports.useDeferredValue = useDeferredValue;
		exports.useEffect = useEffect;
		exports.useId = useId;
		exports.useImperativeHandle = useImperativeHandle;
		exports.useInsertionEffect = useInsertionEffect;
		exports.useLayoutEffect = useLayoutEffect;
		exports.useMemo = useMemo;
		exports.useReducer = useReducer;
		exports.useRef = useRef;
		exports.useState = useState;
		exports.useSyncExternalStore = useSyncExternalStore;
		exports.useTransition = useTransition;
		exports.version = ReactVersion;
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(/* @__PURE__ */ new Error());
	})();
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_production_min();
	else module.exports = require_react_development();
}));
//#endregion
//#region src/dsl.ts
var import_react = require_react();
var API_BASE = typeof window !== "undefined" ? "" : "http://127.0.0.1:8781";
async function dslExecute(req) {
	return (await fetch(`${API_BASE}/api/dsl/execute`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(req)
	})).json();
}
async function listPlans(interval = "month") {
	const r = await dslExecute({
		command: "LIST_PLANS",
		payload: { interval }
	});
	if (r.ok && r.result && typeof r.result === "object" && "plans" in r.result) return r.result.plans;
	return [];
}
async function listIntegrations() {
	const r = await dslExecute({
		command: "LIST_INTEGRATIONS",
		payload: {}
	});
	if (r.ok && r.result && typeof r.result === "object" && "integrations" in r.result) return r.result.integrations;
	return [];
}
async function createTenant(payload) {
	return dslExecute({
		command: "CREATE_TENANT",
		payload
	});
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.min.js
/**
* @license React
* react-jsx-runtime.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var f = require_react();
	var k = Symbol.for("react.element");
	var l = Symbol.for("react.fragment");
	var m = Object.prototype.hasOwnProperty;
	var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
	var p = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function q(c, a, g) {
		var b, d = {}, e = null, h = null;
		void 0 !== g && (e = "" + g);
		void 0 !== a.key && (e = "" + a.key);
		void 0 !== a.ref && (h = a.ref);
		for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
		if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
		return {
			$$typeof: k,
			type: c,
			key: e,
			ref: h,
			props: d,
			_owner: n.current
		};
	}
	exports.Fragment = l;
	exports.jsx = q;
	exports.jsxs = q;
}));
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.development.js
/**
* @license React
* react-jsx-runtime.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	if (process.env.NODE_ENV !== "production") (function() {
		"use strict";
		var React = require_react();
		var REACT_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = "@@iterator";
		function getIteratorFn(maybeIterable) {
			if (maybeIterable === null || typeof maybeIterable !== "object") return null;
			var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
			if (typeof maybeIterator === "function") return maybeIterator;
			return null;
		}
		var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		function error(format) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			printWarning("error", format, args);
		}
		function printWarning(level, format, args) {
			var stack = ReactSharedInternals.ReactDebugCurrentFrame.getStackAddendum();
			if (stack !== "") {
				format += "%s";
				args = args.concat([stack]);
			}
			var argsWithFormat = args.map(function(item) {
				return String(item);
			});
			argsWithFormat.unshift("Warning: " + format);
			Function.prototype.apply.call(console[level], console, argsWithFormat);
		}
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
		function isValidElementType(type) {
			if (typeof type === "string" || typeof type === "function") return true;
			if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
			if (typeof type === "object" && type !== null) {
				if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) return true;
			}
			return false;
		}
		function getWrappedName(outerType, innerType, wrapperName) {
			var displayName = outerType.displayName;
			if (displayName) return displayName;
			var functionName = innerType.displayName || innerType.name || "";
			return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
			return type.displayName || "Context";
		}
		function getComponentNameFromType(type) {
			if (type == null) return null;
			if (typeof type.tag === "number") error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
			if (typeof type === "function") return type.displayName || type.name || null;
			if (typeof type === "string") return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_CONTEXT_TYPE: return getContextName(type) + ".Consumer";
				case REACT_PROVIDER_TYPE: return getContextName(type._context) + ".Provider";
				case REACT_FORWARD_REF_TYPE: return getWrappedName(type, type.render, "ForwardRef");
				case REACT_MEMO_TYPE:
					var outerName = type.displayName || null;
					if (outerName !== null) return outerName;
					return getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return getComponentNameFromType(init(payload));
					} catch (x) {
						return null;
					}
			}
			return null;
		}
		var assign = Object.assign;
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
			if (disabledDepth === 0) {
				prevLog = console.log;
				prevInfo = console.info;
				prevWarn = console.warn;
				prevError = console.error;
				prevGroup = console.group;
				prevGroupCollapsed = console.groupCollapsed;
				prevGroupEnd = console.groupEnd;
				var props = {
					configurable: true,
					enumerable: true,
					value: disabledLog,
					writable: true
				};
				Object.defineProperties(console, {
					info: props,
					log: props,
					warn: props,
					error: props,
					group: props,
					groupCollapsed: props,
					groupEnd: props
				});
			}
			disabledDepth++;
		}
		function reenableLogs() {
			disabledDepth--;
			if (disabledDepth === 0) {
				var props = {
					configurable: true,
					enumerable: true,
					writable: true
				};
				Object.defineProperties(console, {
					log: assign({}, props, { value: prevLog }),
					info: assign({}, props, { value: prevInfo }),
					warn: assign({}, props, { value: prevWarn }),
					error: assign({}, props, { value: prevError }),
					group: assign({}, props, { value: prevGroup }),
					groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
					groupEnd: assign({}, props, { value: prevGroupEnd })
				});
			}
			if (disabledDepth < 0) error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
			if (prefix === void 0) try {
				throw Error();
			} catch (x) {
				var match = x.stack.trim().match(/\n( *(at )?)/);
				prefix = match && match[1] || "";
			}
			return "\n" + prefix + name;
		}
		var reentry = false;
		var componentFrameCache = new (typeof WeakMap === "function" ? WeakMap : Map)();
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			var frame = componentFrameCache.get(fn);
			if (frame !== void 0) return frame;
			var control;
			reentry = true;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			var previousDispatcher = ReactCurrentDispatcher.current;
			ReactCurrentDispatcher.current = null;
			disableLogs();
			try {
				if (construct) {
					var Fake = function() {
						throw Error();
					};
					Object.defineProperty(Fake.prototype, "props", { set: function() {
						throw Error();
					} });
					if (typeof Reflect === "object" && Reflect.construct) {
						try {
							Reflect.construct(Fake, []);
						} catch (x) {
							control = x;
						}
						Reflect.construct(fn, [], Fake);
					} else {
						try {
							Fake.call();
						} catch (x) {
							control = x;
						}
						fn.call(Fake.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (x) {
						control = x;
					}
					fn();
				}
			} catch (sample) {
				if (sample && control && typeof sample.stack === "string") {
					var sampleLines = sample.stack.split("\n");
					var controlLines = control.stack.split("\n");
					var s = sampleLines.length - 1;
					var c = controlLines.length - 1;
					while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) c--;
					for (; s >= 1 && c >= 0; s--, c--) if (sampleLines[s] !== controlLines[c]) {
						if (s !== 1 || c !== 1) do {
							s--;
							c--;
							if (c < 0 || sampleLines[s] !== controlLines[c]) {
								var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
								if (fn.displayName && _frame.includes("<anonymous>")) _frame = _frame.replace("<anonymous>", fn.displayName);
								if (typeof fn === "function") componentFrameCache.set(fn, _frame);
								return _frame;
							}
						} while (s >= 1 && c >= 0);
						break;
					}
				}
			} finally {
				reentry = false;
				ReactCurrentDispatcher.current = previousDispatcher;
				reenableLogs();
				Error.prepareStackTrace = previousPrepareStackTrace;
			}
			var name = fn ? fn.displayName || fn.name : "";
			var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
			if (typeof fn === "function") componentFrameCache.set(fn, syntheticFrame);
			return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
			return describeNativeComponentFrame(fn, false);
		}
		function shouldConstruct(Component) {
			var prototype = Component.prototype;
			return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
			if (type == null) return "";
			if (typeof type === "function") return describeNativeComponentFrame(type, shouldConstruct(type));
			if (typeof type === "string") return describeBuiltInComponentFrame(type);
			switch (type) {
				case REACT_SUSPENSE_TYPE: return describeBuiltInComponentFrame("Suspense");
				case REACT_SUSPENSE_LIST_TYPE: return describeBuiltInComponentFrame("SuspenseList");
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_FORWARD_REF_TYPE: return describeFunctionComponentFrame(type.render);
				case REACT_MEMO_TYPE: return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
					} catch (x) {}
			}
			return "";
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame.setExtraStackFrame(null);
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
			var has = Function.call.bind(hasOwnProperty);
			for (var typeSpecName in typeSpecs) if (has(typeSpecs, typeSpecName)) {
				var error$1 = void 0;
				try {
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						err.name = "Invariant Violation";
						throw err;
					}
					error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
				} catch (ex) {
					error$1 = ex;
				}
				if (error$1 && !(error$1 instanceof Error)) {
					setCurrentlyValidatingElement(element);
					error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
					setCurrentlyValidatingElement(null);
				}
				if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
					loggedTypeFailures[error$1.message] = true;
					setCurrentlyValidatingElement(element);
					error("Failed %s type: %s", location, error$1.message);
					setCurrentlyValidatingElement(null);
				}
			}
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
			return isArrayImpl(a);
		}
		function typeName(value) {
			return typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
		}
		function willCoercionThrow(value) {
			try {
				testStringCoercion(value);
				return false;
			} catch (e) {
				return true;
			}
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			if (willCoercionThrow(value)) {
				error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
				return testStringCoercion(value);
			}
		}
		var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
		var RESERVED_PROPS = {
			key: true,
			ref: true,
			__self: true,
			__source: true
		};
		var specialPropKeyWarningShown;
		var specialPropRefWarningShown;
		var didWarnAboutStringRefs = {};
		function hasValidRef(config) {
			if (hasOwnProperty.call(config, "ref")) {
				var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.ref !== void 0;
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.key !== void 0;
		}
		function warnIfStringRefCannotBeAutoConverted(config, self) {
			if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
				var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (!didWarnAboutStringRefs[componentName]) {
					error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
					didWarnAboutStringRefs[componentName] = true;
				}
			}
		}
		function defineKeyPropWarningGetter(props, displayName) {
			var warnAboutAccessingKey = function() {
				if (!specialPropKeyWarningShown) {
					specialPropKeyWarningShown = true;
					error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingKey.isReactWarning = true;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: true
			});
		}
		function defineRefPropWarningGetter(props, displayName) {
			var warnAboutAccessingRef = function() {
				if (!specialPropRefWarningShown) {
					specialPropRefWarningShown = true;
					error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingRef.isReactWarning = true;
			Object.defineProperty(props, "ref", {
				get: warnAboutAccessingRef,
				configurable: true
			});
		}
		/**
		* Factory method to create a new React element. This no longer adheres to
		* the class pattern, so do not use new to call it. Also, instanceof check
		* will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		* if something is a React Element.
		*
		* @param {*} type
		* @param {*} props
		* @param {*} key
		* @param {string|object} ref
		* @param {*} owner
		* @param {*} self A *temporary* helper to detect places where `this` is
		* different from the `owner` when React.createElement is called, so that we
		* can warn. We want to get rid of owner and replace string `ref`s with arrow
		* functions, and as long as `this` and owner are the same, there will be no
		* change in behavior.
		* @param {*} source An annotation object (added by a transpiler or otherwise)
		* indicating filename, line number, and/or other information.
		* @internal
		*/
		var ReactElement = function(type, key, ref, self, source, owner, props) {
			var element = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref,
				props,
				_owner: owner
			};
			element._store = {};
			Object.defineProperty(element._store, "validated", {
				configurable: false,
				enumerable: false,
				writable: true,
				value: false
			});
			Object.defineProperty(element, "_self", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: self
			});
			Object.defineProperty(element, "_source", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: source
			});
			if (Object.freeze) {
				Object.freeze(element.props);
				Object.freeze(element);
			}
			return element;
		};
		/**
		* https://github.com/reactjs/rfcs/pull/107
		* @param {*} type
		* @param {object} props
		* @param {string} key
		*/
		function jsxDEV(type, config, maybeKey, source, self) {
			var propName;
			var props = {};
			var key = null;
			var ref = null;
			if (maybeKey !== void 0) {
				checkKeyStringCoercion(maybeKey);
				key = "" + maybeKey;
			}
			if (hasValidKey(config)) {
				checkKeyStringCoercion(config.key);
				key = "" + config.key;
			}
			if (hasValidRef(config)) {
				ref = config.ref;
				warnIfStringRefCannotBeAutoConverted(config, self);
			}
			for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
			if (type && type.defaultProps) {
				var defaultProps = type.defaultProps;
				for (propName in defaultProps) if (props[propName] === void 0) props[propName] = defaultProps[propName];
			}
			if (key || ref) {
				var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
				if (key) defineKeyPropWarningGetter(props, displayName);
				if (ref) defineRefPropWarningGetter(props, displayName);
			}
			return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement$1(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		}
		var propTypesMisspellWarningShown = false;
		/**
		* Verifies the object is a ReactElement.
		* See https://reactjs.org/docs/react-api.html#isvalidelement
		* @param {?object} object
		* @return {boolean} True if `object` is a ReactElement.
		* @final
		*/
		function isValidElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function getDeclarationErrorAddendum() {
			if (ReactCurrentOwner$1.current) {
				var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
				if (name) return "\n\nCheck the render method of `" + name + "`.";
			}
			return "";
		}
		function getSourceInfoErrorAddendum(source) {
			if (source !== void 0) {
				var fileName = source.fileName.replace(/^.*[\\\/]/, "");
				var lineNumber = source.lineNumber;
				return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
			}
			return "";
		}
		/**
		* Warn if there's no key explicitly set on dynamic arrays of children or
		* object keys are not valid. This allows us to keep track of children between
		* updates.
		*/
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
			var info = getDeclarationErrorAddendum();
			if (!info) {
				var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
				if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
			}
			return info;
		}
		/**
		* Warn if the element doesn't have an explicit key assigned to it.
		* This element is in an array. The array could grow and shrink or be
		* reordered. All children that haven't already been validated are required to
		* have a "key" property assigned to it. Error statuses are cached so a warning
		* will only be shown once.
		*
		* @internal
		* @param {ReactElement} element Element that requires a key.
		* @param {*} parentType element's parent's type.
		*/
		function validateExplicitKey(element, parentType) {
			if (!element._store || element._store.validated || element.key != null) return;
			element._store.validated = true;
			var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
			if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
			ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
			var childOwner = "";
			if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
			setCurrentlyValidatingElement$1(element);
			error("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
			setCurrentlyValidatingElement$1(null);
		}
		/**
		* Ensure that every element either is passed in a static location, in an
		* array with an explicit keys property defined, or in an object literal
		* with valid key property.
		*
		* @internal
		* @param {ReactNode} node Statically passed child of any type.
		* @param {*} parentType node's parent's type.
		*/
		function validateChildKeys(node, parentType) {
			if (typeof node !== "object") return;
			if (isArray(node)) for (var i = 0; i < node.length; i++) {
				var child = node[i];
				if (isValidElement(child)) validateExplicitKey(child, parentType);
			}
			else if (isValidElement(node)) {
				if (node._store) node._store.validated = true;
			} else if (node) {
				var iteratorFn = getIteratorFn(node);
				if (typeof iteratorFn === "function") {
					if (iteratorFn !== node.entries) {
						var iterator = iteratorFn.call(node);
						var step;
						while (!(step = iterator.next()).done) if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
		/**
		* Given an element, validate that its props follow the propTypes definition,
		* provided by the type.
		*
		* @param {ReactElement} element
		*/
		function validatePropTypes(element) {
			var type = element.type;
			if (type === null || type === void 0 || typeof type === "string") return;
			var propTypes;
			if (typeof type === "function") propTypes = type.propTypes;
			else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
			else return;
			if (propTypes) {
				var name = getComponentNameFromType(type);
				checkPropTypes(propTypes, element.props, "prop", name, element);
			} else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
				propTypesMisspellWarningShown = true;
				error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", getComponentNameFromType(type) || "Unknown");
			}
			if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
		}
		/**
		* Given a fragment, validate that it can only be provided with fragment props
		* @param {ReactElement} fragment
		*/
		function validateFragmentProps(fragment) {
			var keys = Object.keys(fragment.props);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key !== "children" && key !== "key") {
					setCurrentlyValidatingElement$1(fragment);
					error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
					setCurrentlyValidatingElement$1(null);
					break;
				}
			}
			if (fragment.ref !== null) {
				setCurrentlyValidatingElement$1(fragment);
				error("Invalid attribute `ref` supplied to `React.Fragment`.");
				setCurrentlyValidatingElement$1(null);
			}
		}
		var didWarnAboutKeySpread = {};
		function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
			var validType = isValidElementType(type);
			if (!validType) {
				var info = "";
				if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
				var sourceInfo = getSourceInfoErrorAddendum(source);
				if (sourceInfo) info += sourceInfo;
				else info += getDeclarationErrorAddendum();
				var typeString;
				if (type === null) typeString = "null";
				else if (isArray(type)) typeString = "array";
				else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
					typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
					info = " Did you accidentally export a JSX literal instead of a component?";
				} else typeString = typeof type;
				error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
			}
			var element = jsxDEV(type, props, key, source, self);
			if (element == null) return element;
			if (validType) {
				var children = props.children;
				if (children !== void 0) {
					if (isStaticChildren) {
						if (isArray(children)) {
							for (var i = 0; i < children.length; i++) validateChildKeys(children[i], type);
							if (Object.freeze) Object.freeze(children);
						} else error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
					} else validateChildKeys(children, type);
				}
			}
			if (hasOwnProperty.call(props, "key")) {
				var componentName = getComponentNameFromType(type);
				var keys = Object.keys(props).filter(function(k) {
					return k !== "key";
				});
				var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				if (!didWarnAboutKeySpread[componentName + beforeExample]) {
					error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", beforeExample, componentName, keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}", componentName);
					didWarnAboutKeySpread[componentName + beforeExample] = true;
				}
			}
			if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
			else validatePropTypes(element);
			return element;
		}
		function jsxWithValidationStatic(type, props, key) {
			return jsxWithValidation(type, props, key, true);
		}
		function jsxWithValidationDynamic(type, props, key) {
			return jsxWithValidation(type, props, key, false);
		}
		var jsx = jsxWithValidationDynamic;
		var jsxs = jsxWithValidationStatic;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = jsx;
		exports.jsxs = jsxs;
	})();
}));
//#endregion
//#region src/App.tsx
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_jsx_runtime_production_min();
	else module.exports = require_react_jsx_runtime_development();
})))();
var PANEL_SENSITIVE_KEY = /(token|secret|password|credential|authorization|cookie|signature|private[_-]?key|api[_-]?key|enrollment)/iu;
var PanelItemsFilterContext = (0, import_react.createContext)("");
function panelSearchText(value, depth = 0) {
	if (depth > 5 || value === null || value === void 0) return "";
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
	if (Array.isArray(value)) return value.slice(0, 100).map((item) => panelSearchText(item, depth + 1)).join(" ");
	if (typeof value !== "object") return "";
	return Object.entries(value).filter(([key]) => !PANEL_SENSITIVE_KEY.test(key)).map(([key, item]) => `${key} ${panelSearchText(item, depth + 1)}`).join(" ");
}
function filterPanelItems(items, query) {
	const normalized = query.trim().toLocaleLowerCase();
	if (!normalized) return items;
	return items.filter((item) => panelSearchText(item).toLocaleLowerCase().includes(normalized));
}
function usePanelFilteredItems(items) {
	const query = (0, import_react.useContext)(PanelItemsFilterContext);
	return (0, import_react.useMemo)(() => filterPanelItems(items, query), [items, query]);
}
function sanitizePanelUrl(value) {
	try {
		const parsed = new URL(value);
		parsed.username = "";
		parsed.password = "";
		parsed.hash = "";
		for (const key of [...parsed.searchParams.keys()]) if (PANEL_SENSITIVE_KEY.test(key)) parsed.searchParams.set(key, "[redacted]");
		return parsed.toString();
	} catch {
		return value.slice(0, 2048);
	}
}
function sanitizePanelDiagnostic(value, seen = /* @__PURE__ */ new WeakSet(), depth = 0) {
	if (depth > 8) return "[bounded]";
	if (typeof value === "string") return /^https?:\/\//iu.test(value) ? sanitizePanelUrl(value) : value.slice(0, 4e3);
	if (value === null || typeof value !== "object") return value;
	if (seen.has(value)) return "[circular]";
	seen.add(value);
	if (Array.isArray(value)) return value.slice(0, 100).map((item) => sanitizePanelDiagnostic(item, seen, depth + 1));
	return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, PANEL_SENSITIVE_KEY.test(key) ? "[redacted]" : sanitizePanelDiagnostic(item, seen, depth + 1)]));
}
async function copyPanelDiagnostic(value) {
	const text = JSON.stringify(sanitizePanelDiagnostic(value), null, 2);
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}
	const area = document.createElement("textarea");
	area.value = text;
	area.setAttribute("readonly", "");
	area.style.position = "fixed";
	area.style.opacity = "0";
	document.body.appendChild(area);
	area.select();
	const copied = document.execCommand("copy");
	area.remove();
	if (!copied) throw new Error("panel_json_copy_failed");
}
function PanelItemsSearch({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "panel-items-search",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("panel_items_filter_label") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "panel-items-search-field",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "search",
					value,
					onChange: (event) => onChange(event.target.value),
					placeholder: t("panel_items_filter_placeholder")
				}),
				value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(""),
					children: t("panel_items_filter_clear")
				})
			]
		})]
	});
}
/**
* Interface dictionary. The locale is fixed for the lifetime of a page load —
* changing it reloads through ?lang — so a module-level dictionary avoids
* threading a translation prop through every component.
*/
var DICT = {};
function t(key, vars) {
	let value = DICT[key] ?? key;
	if (vars) for (const [name, replacement] of Object.entries(vars)) value = value.split(`{${name}}`).join(String(replacement));
	return value;
}
/**
* Connection commands are served by the portal but are not part of the shared
* DSL command union in dsl.ts, which this ticket does not own.
*/
var connectionCall = (command, payload) => dslExecute({
	command,
	payload
}).catch((err) => ({
	ok: false,
	error: {
		code: "network",
		message: err.message
	}
}));
var ITEM_VIEW_STORAGE_KEY = "subactor_item_view";
var LEGACY_ITEM_VIEW_STORAGE_KEYS = [
	"subactor_plan_view",
	"subactor_integration_view",
	"subactor_panel_integration_view",
	"subactor_node_view"
];
var ITEM_VIEW_MODES = [
	"cards",
	"list",
	"table"
];
var DEFAULT_ITEM_VIEW = "list";
function isItemViewMode(value) {
	return value !== null && ITEM_VIEW_MODES.includes(value);
}
function deviceDefaultItemView() {
	if (typeof window === "undefined") return "table";
	const smartphone = window.matchMedia("(max-width: 640px)").matches;
	const compact = window.matchMedia("(max-width: 1024px)").matches;
	const portrait = window.matchMedia("(orientation: portrait)").matches;
	if (smartphone) return "cards";
	if (compact || portrait) return "list";
	return "table";
}
function useStoredItemView() {
	const [viewMode, setViewMode] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return DEFAULT_ITEM_VIEW;
		try {
			const stored = window.localStorage.getItem(ITEM_VIEW_STORAGE_KEY);
			if (isItemViewMode(stored)) return stored;
			const legacy = LEGACY_ITEM_VIEW_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find(isItemViewMode);
			if (legacy) return legacy;
		} catch {}
		return deviceDefaultItemView();
	});
	(0, import_react.useEffect)(() => {
		try {
			const stored = window.localStorage.getItem(ITEM_VIEW_STORAGE_KEY);
			if (isItemViewMode(stored)) {
				setViewMode(stored);
				return;
			}
			const legacy = LEGACY_ITEM_VIEW_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find(isItemViewMode);
			if (legacy) {
				setViewMode(legacy);
				window.localStorage.setItem(ITEM_VIEW_STORAGE_KEY, legacy);
				return;
			}
			setViewMode(deviceDefaultItemView());
		} catch {
			setViewMode(deviceDefaultItemView());
		}
	}, []);
	const selectView = (next) => {
		setViewMode(next);
		try {
			window.localStorage.setItem(ITEM_VIEW_STORAGE_KEY, next);
			LEGACY_ITEM_VIEW_STORAGE_KEYS.forEach((key) => window.localStorage.setItem(key, next));
		} catch {}
	};
	return [viewMode, selectView];
}
var DEFAULT_META = {
	currency: "PLN",
	vat_note: "Ceny netto. Pakiety Cloud są rozliczane w PLN; VAT zgodnie z miejscem opodatkowania.",
	annual_rule: "Basic i Pro: rok kosztuje tyle co 10 miesięcy, a limit akcji odnawia się co miesiąc.",
	billing_model: "active-twin-with-verified-actions/v1",
	action_metric_ref: "metric://sub.actor/actions/verified-external-effect/v1",
	active_twin_metric_ref: "metric://sub.actor/twins/active/v1",
	human_seats_billed: false
};
var ICONS = {
	bolt: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" }),
	mic: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "12",
		height: "18",
		x: "6",
		y: "2",
		rx: "6"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 10v2a8 8 0 0 0 16 0v-2M12 20v2" })] }),
	check: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" }),
	checkCircle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })] }),
	dot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "5",
		fill: "currentColor",
		stroke: "none"
	}),
	minus: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }),
	clock: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 6v6l4 2" })] }),
	lock: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] }),
	unlock: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })] }),
	users: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "9",
			cy: "7",
			r: "4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
	] }),
	user: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})] }),
	building: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "16",
			height: "20",
			x: "4",
			y: "2",
			rx: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 22v-4h6v4" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" })
	] }),
	server: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "2",
			rx: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "20",
			height: "8",
			x: "2",
			y: "14",
			rx: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 6h.01M6 18h.01" })
	] }),
	shield: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" }),
	scale: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 21h10" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3v18" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" })
	] }),
	receipt: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 8h8M8 12h8M8 16h5" })] }),
	card: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "5",
		rx: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 10h20" })] }),
	plug: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }),
	chart: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3v18h18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m19 9-5 5-4-4-3 3" })] }),
	cube: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3.3 7 8.7 5 8.7-5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22V12" })
	] }),
	grid: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 9h6v6H9z" })] }),
	list: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6h13M8 12h13M8 18h13" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h.01M3 12h.01M3 18h.01" })] }),
	table: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "20",
		height: "16",
		x: "2",
		y: "4",
		rx: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 10h20M8 4v16" })] }),
	invoice: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 14h-8M15 18h-5M10 6h8v4h-8z" })] }),
	shuffle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 7h-9" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 17H5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "17",
			cy: "17",
			r: "3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "7",
			cy: "7",
			r: "3"
		})
	] }),
	moon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }),
	sun: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })] }),
	gift: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "8",
			width: "18",
			height: "4",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5" })
	] }),
	arrowUp: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m18 15-6-6-6 6" }),
	trending: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m22 7-8.5 8.5-5-5L2 17" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 7h6v6" })] }),
	external: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 3h6v6" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 14 21 3" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" })
	] }),
	info: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 16v-4M12 8h.01" })] }),
	alert: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8v4M12 16h.01" })] }),
	key: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" }),
	cpu: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "16",
			height: "16",
			x: "4",
			y: "4",
			rx: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "6",
			height: "6",
			x: "9",
			y: "9"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" })
	] }),
	eye: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})] }),
	eyeOff: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "2",
		x2: "22",
		y1: "2",
		y2: "22"
	})] }),
	copy: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" })] }),
	refreshCw: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" }) }),
	arrowDown: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" }),
	trash: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }) }),
	plus: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M12 5v14" }),
	tag: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2H2v10l11 11 10-10L12 2z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "7",
		cy: "7",
		r: "1.5"
	})] }),
	menu: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "3",
			y1: "12",
			x2: "21",
			y2: "12"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "3",
			y1: "6",
			x2: "21",
			y2: "6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "3",
			y1: "18",
			x2: "21",
			y2: "18"
		})
	] }),
	x: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "18",
		y1: "6",
		x2: "6",
		y2: "18"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "6",
		y1: "6",
		x2: "18",
		y2: "18"
	})] }),
	hardDrive: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "22",
			y1: "12",
			x2: "2",
			y2: "12"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "6",
			y1: "16",
			x2: "6.01",
			y2: "16"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "10",
			y1: "16",
			x2: "10.01",
			y2: "16"
		})
	] }),
	calendar: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "4",
			width: "18",
			height: "18",
			rx: "2",
			ry: "2"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "16",
			y1: "2",
			x2: "16",
			y2: "6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "8",
			y1: "2",
			x2: "8",
			y2: "6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "3",
			y1: "10",
			x2: "21",
			y2: "10"
		})
	] }),
	checkSquare: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "9 11 12 14 22 4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" })] }),
	kanban: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3",
			y: "3",
			width: "5",
			height: "18",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "3",
			width: "5",
			height: "12",
			rx: "1"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "17",
			y: "3",
			width: "5",
			height: "15",
			rx: "1"
		})
	] }),
	zap: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" }),
	terminal: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "4 17 10 11 4 5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
		x1: "12",
		y1: "19",
		x2: "20",
		y2: "19"
	})] }),
	wifi: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12.55a11 11 0 0 1 14.08 0" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1.42 9a16 16 0 0 1 21.16 0" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8.53 16.11a6 6 0 0 1 6.95 0" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "12",
			y1: "20",
			x2: "12.01",
			y2: "20"
		})
	] }),
	layers: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "2 17 12 22 22 17" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "2 12 12 17 22 12" })
	] })
};
function Icon({ name, className = "", style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: `icon ${className}`.trim(),
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		focusable: "false",
		style,
		children: ICONS[name] ?? ICONS.dot
	});
}
function ItemViewSwitch({ mode: viewMode, onChange, labels, nodeCompatible = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `item-view-switch view-switch${nodeCompatible ? " node-view-switch" : ""}`,
		role: "group",
		"aria-label": t("view_label"),
		children: ITEM_VIEW_MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: `item-view-button${nodeCompatible ? " node-view-button" : ""}`,
			type: "button",
			"aria-pressed": viewMode === mode,
			onClick: () => onChange(mode),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: mode === "cards" ? "grid" : mode }), labels?.[`view_${mode}`] ?? t(`view_${mode}`)]
		}, mode))
	});
}
/** Create/import modes belong on the primary Add button — not inside the view-switch. */
var CREATE_VIEW_IDS = /* @__PURE__ */ new Set([
	"add",
	"import",
	"create",
	"register"
]);
function getUrlParam(key) {
	if (typeof window === "undefined") return "";
	return new URLSearchParams(window.location.search).get(key) || "";
}
function getUrlView() {
	return getUrlParam("view");
}
/**
* Shareable panel URL without reload.
* Canonical params: tab, view, project, host, org, filter, tag.
*/
function updatePanelUrl(patch, historyMode = "replace") {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	const apply = (key, param) => {
		const value = patch[key];
		if (value === void 0) return;
		if (value === null || value === "") url.searchParams.delete(param);
		else url.searchParams.set(param, value);
	};
	apply("tab", "tab");
	apply("view", "view");
	apply("project", "project");
	apply("host", "host");
	apply("org", "org");
	apply("filter", "filter");
	apply("tag", "tag");
	apply("registry", "registry");
	if (historyMode === "push") window.history.pushState({}, "", url.toString());
	else window.history.replaceState({}, "", url.toString());
}
function partitionSectionModes(modes) {
	return {
		viewModes: modes.filter((m) => !CREATE_VIEW_IDS.has(m.id)),
		createModes: modes.filter((m) => CREATE_VIEW_IDS.has(m.id))
	};
}
/** Keep SVG plus only — never render a leading "+ " beside icon:plus (sibling fix). */
function labelForViewButton(label, icon) {
	if (icon !== "plus") return label;
	return label.replace(/^\+\s*/, "");
}
/** Presentation modes only — create/add lives on SectionViewToolbar's primary button. */
function SectionViewSwitch({ modes, current, onChange }) {
	const { viewModes } = partitionSectionModes(modes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "item-view-switch view-switch",
		role: "group",
		"aria-label": "Przełącznik widoku sekcji",
		children: viewModes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "item-view-button",
			"data-mode": m.id,
			"aria-pressed": current === m.id,
			onClick: () => onChange(m.id),
			title: m.title,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: m.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labelForViewButton(m.label, m.icon) })]
		}, m.id))
	});
}
/**
* Identities-style section controls: primary Add left, view-switch modes only on the right.
* Clicking Add sets the same create view id as the former view=add / view=import URL mode.
*/
function SectionViewToolbar({ modes, current, onChange }) {
	const { viewModes, createModes } = partitionSectionModes(modes);
	const primaryCreate = createModes[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "section-view-toolbar",
		children: [primaryCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn btn-sm btn-primary section-add-button",
			"data-mode": primaryCreate.id,
			title: primaryCreate.title,
			"aria-pressed": current === primaryCreate.id,
			onClick: () => onChange(primaryCreate.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: primaryCreate.icon || "plus" }), labelForViewButton(primaryCreate.label, primaryCreate.icon || "plus")]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewSwitch, {
			modes: viewModes,
			current,
			onChange
		})]
	});
}
var DEVICE_VIEW_FALLBACKS = {
	table: [
		"table",
		"list",
		"cards",
		"panels",
		"grid",
		"details",
		"kanban",
		"matrix",
		"agenda",
		"month"
	],
	list: [
		"list",
		"cards",
		"panels",
		"table",
		"grid",
		"details",
		"timeline",
		"agenda",
		"communication",
		"week"
	],
	panels: [
		"panels",
		"cards",
		"grid",
		"kanban",
		"list",
		"matrix",
		"details",
		"table",
		"day"
	]
};
function getDeviceViewClass() {
	if (typeof window === "undefined") return "table";
	const smartphone = window.matchMedia("(max-width: 640px)").matches;
	const compact = window.matchMedia("(max-width: 1024px)").matches;
	const portrait = window.matchMedia("(orientation: portrait)").matches;
	if (smartphone) return "panels";
	if (compact || portrait) return "list";
	return "table";
}
function mapDeviceViewToMode(device, presentationModes) {
	const available = new Set(presentationModes);
	for (const id of DEVICE_VIEW_FALLBACKS[device]) if (available.has(id)) return id;
	return presentationModes[0];
}
function sectionViewPinKey(tab) {
	return `subactor.panel.sectionView.${tab}`;
}
function readSectionViewPin(tab) {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.sessionStorage.getItem(sectionViewPinKey(tab));
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.view || parsed.source !== "user" && parsed.source !== "auto") return null;
		return {
			view: parsed.view,
			source: parsed.source
		};
	} catch {
		return null;
	}
}
function writeSectionViewPin(tab, view, source) {
	if (typeof window === "undefined") return;
	try {
		window.sessionStorage.setItem(sectionViewPinKey(tab), JSON.stringify({
			view,
			source
		}));
	} catch {}
}
function normalizeUrlViewAlias(view) {
	if (view === "panels") return "cards";
	if (view === "aql-visualizer" || view === "catalog") return "add";
	return view;
}
function resolveSectionView(tab, allowed) {
	const allowedSet = allowed;
	const rawUrl = getUrlView();
	if (rawUrl) {
		const urlView = normalizeUrlViewAlias(rawUrl);
		if (allowedSet.includes(urlView)) return urlView;
		if (allowedSet.includes(rawUrl)) return rawUrl;
	}
	const pin = readSectionViewPin(tab);
	if (pin && allowedSet.includes(pin.view) && pin.source === "user") return pin.view;
	const presentation = allowed.filter((m) => !CREATE_VIEW_IDS.has(m));
	const modes = presentation.length ? presentation : allowed;
	return mapDeviceViewToMode(getDeviceViewClass(), modes);
}
/**
* Section view state: URL view= wins; else user session pin; else device default.
* Resize/orientation only retarget when neither URL nor user pin is active.
*/
function useSectionView(tab, allowed, syncUrl) {
	const allowedKey = allowed.join("|");
	const syncRef = (0, import_react.useRef)(syncUrl);
	syncRef.current = syncUrl;
	const [view, setViewState] = (0, import_react.useState)(() => resolveSectionView(tab, allowed));
	(0, import_react.useEffect)(() => {
		const applyAutoIfNeeded = () => {
			const rawUrl = getUrlView();
			if (rawUrl) {
				const urlView = normalizeUrlViewAlias(rawUrl);
				const matched = allowed.includes(urlView) ? urlView : allowed.includes(rawUrl) ? rawUrl : null;
				if (matched) {
					setViewState((prev) => prev === matched ? prev : matched);
					return;
				}
			}
			const pin = readSectionViewPin(tab);
			if (pin?.source === "user" && allowed.includes(pin.view)) {
				setViewState((prev) => prev === pin.view ? prev : pin.view);
				return;
			}
			const presentation = allowed.filter((m) => !CREATE_VIEW_IDS.has(m));
			const modes = presentation.length ? presentation : allowed;
			const next = mapDeviceViewToMode(getDeviceViewClass(), modes);
			writeSectionViewPin(tab, next, "auto");
			setViewState((prev) => prev === next ? prev : next);
		};
		applyAutoIfNeeded();
		const mqNarrow = window.matchMedia("(max-width: 640px)");
		const mqCompact = window.matchMedia("(max-width: 1024px)");
		const mqPortrait = window.matchMedia("(orientation: portrait)");
		mqNarrow.addEventListener("change", applyAutoIfNeeded);
		mqCompact.addEventListener("change", applyAutoIfNeeded);
		mqPortrait.addEventListener("change", applyAutoIfNeeded);
		window.addEventListener("orientationchange", applyAutoIfNeeded);
		window.addEventListener("resize", applyAutoIfNeeded);
		return () => {
			mqNarrow.removeEventListener("change", applyAutoIfNeeded);
			mqCompact.removeEventListener("change", applyAutoIfNeeded);
			mqPortrait.removeEventListener("change", applyAutoIfNeeded);
			window.removeEventListener("orientationchange", applyAutoIfNeeded);
			window.removeEventListener("resize", applyAutoIfNeeded);
		};
	}, [tab, allowedKey]);
	return [view, (0, import_react.useCallback)((next) => {
		setViewState(next);
		writeSectionViewPin(tab, next, "user");
		if (syncRef.current) syncRef.current(next);
		else updatePanelUrl({
			tab,
			view: next
		});
	}, [tab])];
}
function useInfiniteScroll(items, pageSize = 6) {
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(pageSize);
	(0, import_react.useEffect)(() => {
		setVisibleCount(pageSize);
	}, [items.length, pageSize]);
	const loadMore = (0, import_react.useCallback)(() => {
		setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
	}, [items.length, pageSize]);
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 250) loadMore();
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loadMore]);
	const hasMore = visibleCount < items.length;
	const visibleItems = (0, import_react.useMemo)(() => items.slice(0, visibleCount), [items, visibleCount]);
	return {
		visibleItems,
		hasMore,
		loadMore,
		totalCount: items.length,
		visibleCount: visibleItems.length
	};
}
function InfiniteScrollFooter({ hasMore, loadMore, visibleCount, totalCount }) {
	if (totalCount === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: "0.5rem",
			padding: "1.25rem 0",
			marginTop: "1rem",
			borderTop: "1px dashed var(--border-color)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				fontSize: "0.85rem",
				color: "var(--text-muted)"
			},
			children: [
				"Wyświetlono ",
				visibleCount,
				" z ",
				totalCount,
				" elementów"
			]
		}), hasMore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn-secondary",
			onClick: loadMore,
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: "0.5rem",
				padding: "0.45rem 1.25rem"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "arrowUp",
					style: { transform: "rotate(180deg)" }
				}),
				"Załaduj więcej elementów (",
				totalCount - visibleCount,
				" pozostało)"
			]
		})]
	});
}
var DISPLAY_LOCALE = "pl";
var DISPLAY_CURRENCY = "EUR";
var DISPLAY_CURRENCY_RATES = {
	EUR: 1,
	PLN: 4.28,
	USD: 1.09,
	GBP: .85,
	CHF: .94
};
var localeTag = () => ({
	pl: "pl-PL",
	en: "en-GB",
	de: "de-DE"
})[DISPLAY_LOCALE] ?? "en-GB";
var money = (minor, baseCurrency = "EUR") => {
	const baseRate = DISPLAY_CURRENCY_RATES[baseCurrency] ?? 1;
	const displayRate = DISPLAY_CURRENCY_RATES[DISPLAY_CURRENCY] ?? 1;
	const converted = minor / 100 / baseRate * displayRate;
	return new Intl.NumberFormat(localeTag(), {
		style: "currency",
		currency: DISPLAY_CURRENCY,
		minimumFractionDigits: 2
	}).format(converted);
};
var planAmount = (plan, interval) => interval === "year" ? plan.amount_annual_minor : plan.amount_monthly_minor;
var planPeriod = (plan, interval) => (interval === "year" ? plan.price_period_annual : plan.price_period_monthly) ?? (interval === "year" ? "/ rok" : "/ msc");
var planNote = (plan, interval) => interval === "year" ? plan.billing_note_annual : plan.billing_note_monthly;
var isPerpetual = (plan) => plan.unit === "self_hosted" || plan.unit === "licencja";
var isPrepaid = (plan) => plan.unit === "actions_prepaid";
/** Yearly cost against 12 paid months, i.e. what the annual plan actually saves. */
var annualSaving = (plan) => isPerpetual(plan) || isPrepaid(plan) ? 0 : plan.amount_monthly_minor * 12 - plan.amount_annual_minor;
var formatUnits = (value) => new Intl.NumberFormat("pl-PL").format(value);
var twinAllowance = (plan) => {
	if (isPerpetual(plan)) return t("twins_self_hosted");
	if (isPrepaid(plan)) return t("twins_not_included");
	const twins = plan.active_twins_included ?? 0;
	if (twins <= 0) return t("twins_not_included");
	return t("twins_included", { count: twins });
};
var actionAllowance = (plan) => {
	if (isPerpetual(plan)) return t("actions_self_hosted");
	const actions = formatUnits(plan.actions_included ?? 0);
	if (isPrepaid(plan)) return t("actions_prepaid", {
		actions,
		months: plan.actions_validity_months ?? 12
	});
	if ((plan.actions_included ?? 0) <= 0) return t("actions_managed_separately");
	return t("actions_monthly", { actions });
};
var offerAnchorId = (planId) => `offer-${planId}`;
var AUDIENCE_OFFER_LINKS = [
	{
		label: "chip_basic_actions",
		icon: "checkCircle",
		planId: "saas-start"
	},
	{
		label: "chip_pro_actions",
		icon: "bolt",
		planId: "saas-business"
	},
	{
		label: "chip_prepaid_actions",
		icon: "gift",
		planId: "prepaid-actions"
	}
];
function PricingCard({ plan, interval, onSelect, onPromo }) {
	const perpetual = isPerpetual(plan);
	const amount = planAmount(plan, interval);
	const saving = annualSaving(plan);
	const showSaving = interval === "year" && !perpetual && saving > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: offerAnchorId(plan.id),
		className: `card offer-anchor${plan.featured ? " card-featured" : ""}`,
		"data-plan": plan.id,
		children: [
			plan.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `card-tag${plan.featured ? "" : " card-tag-neutral"}`,
				children: plan.badge
			}),
			plan.audience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card-audience",
				children: plan.audience
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "card-title",
				children: plan.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card-tagline",
				children: plan.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-price",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "price-val",
					children: money(amount, plan.currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "price-period",
					children: planPeriod(plan, interval)
				})]
			}),
			showSaving && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "price-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "price-strike",
					children: money(plan.amount_monthly_minor * 12, plan.currency)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "savings-highlight",
					children: t("savings", { amount: money(saving, plan.currency) })
				})]
			}),
			planNote(plan, interval) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "price-note",
				children: planNote(plan, interval)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "card-seats",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: perpetual ? "server" : "users" }), twinAllowance(plan)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "card-seats",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: perpetual ? "server" : "bolt" }), actionAllowance(plan)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "card-features",
				children: plan.features.map((feature, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feature })] }, i))
			}),
			plan.promo_hint_code && plan.promo_hint_note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "promo-hint",
				onClick: () => onPromo(plan.id, plan.promo_hint_code),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plan.promo_hint_note })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "card-facts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("fact_setup") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: (plan.setup_fee_minor ?? 0) === 0 ? money(0, plan.currency) : money(plan.setup_fee_minor, plan.currency) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("fact_card") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan.requires_card ? plan.promo_hint_code ? t("card_required_or_promo") : t("card_required") : t("card_not_required") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("fact_support") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan.support ?? "E-mail" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-cta",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: plan.featured ? "btn-primary" : "btn-secondary",
					onClick: () => onSelect(plan.id),
					children: plan.cta ?? "Wybierz plan"
				})
			})
		]
	});
}
function PlanActions({ plan, onSelect, onPromo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "item-actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: plan.featured ? "btn-primary" : "btn-secondary",
			type: "button",
			onClick: () => onSelect(plan.id),
			children: plan.cta ?? t("view_choose")
		}), plan.promo_hint_code && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "btn-secondary",
			type: "button",
			onClick: () => onPromo(plan.id, plan.promo_hint_code),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift" }), t("view_promo", { code: plan.promo_hint_code })]
		})]
	});
}
function PricingCollection({ plans, interval, viewMode, onSelect, onPromo }) {
	if (viewMode === "cards") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pricing-grid item-collection",
		"data-view": viewMode,
		children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCard, {
			plan,
			interval,
			onSelect,
			onPromo
		}, plan.id))
	});
	if (viewMode === "list") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "item-list pricing-list item-collection",
		"data-view": viewMode,
		children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			id: offerAnchorId(plan.id),
			className: `item-list-row offer-anchor${plan.featured ? " is-featured" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-list-main",
					children: [
						plan.audience && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "integration-category",
							children: plan.audience
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "integration-name",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "integration-promise",
							children: plan.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "item-details",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("view_details") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "integration-outcomes",
								children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feature })] }, feature))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-list-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("row_price") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							money(planAmount(plan, interval), plan.currency),
							" ",
							planPeriod(plan, interval)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("row_twins") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: twinAllowance(plan) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("row_actions_included") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: actionAllowance(plan) })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanActions, {
					plan,
					onSelect,
					onPromo
				})
			]
		}, plan.id))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-scroll item-collection",
		"data-view": viewMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "compare-table item-table pricing-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_name") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("row_price") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("row_twins") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("row_actions_included") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("fact_support") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_actions") })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				id: offerAnchorId(plan.id),
				className: "offer-anchor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						scope: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plan.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "form-hint",
								children: plan.tagline
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						money(planAmount(plan, interval), plan.currency),
						" ",
						planPeriod(plan, interval)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: twinAllowance(plan) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: actionAllowance(plan) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: plan.support ?? "E-mail" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanActions, {
						plan,
						onSelect,
						onPromo
					}) })
				]
			}, plan.id)) })]
		})
	});
}
var USE_CASES = [
	{
		id: "orders",
		icon: "chart"
	},
	{
		id: "invoices",
		icon: "invoice"
	},
	{
		id: "monitoring",
		icon: "shield"
	}
];
var USE_CASE_STEPS = [
	"signal",
	"plan",
	"automation",
	"verification"
];
var PROVIDER_REQUIREMENTS = [
	{
		id: "google",
		icon: "clock"
	},
	{
		id: "baselinker",
		icon: "chart"
	},
	{
		id: "ksef",
		icon: "invoice"
	},
	{
		id: "mailbox",
		icon: "receipt"
	},
	{
		id: "notifications",
		icon: "users"
	},
	{
		id: "github",
		icon: "shuffle"
	},
	{
		id: "plesk",
		icon: "server"
	}
];
function UseCasesSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section use-cases-section offer-anchor",
		id: "use-cases",
		"aria-labelledby": "use-cases-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head use-cases-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-eyebrow",
						children: t("use_cases_eyebrow")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "section-title",
						id: "use-cases-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "checkCircle",
							className: "icon-lg"
						}), t("use_cases_title")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-sub",
						children: t("use_cases_sub")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "use-cases-grid",
				children: USE_CASES.map((useCase) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "use-case-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "use-case-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "use-case-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: useCase.icon,
									className: "icon-lg"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: t(`use_case_${useCase.id}_title`) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(`use_case_${useCase.id}_intro`) })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "use-case-flow",
							children: USE_CASE_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "use-case-step-label",
								children: t(`use_case_step_${step}`)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(`use_case_${useCase.id}_${step}`) })] }, step))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "use-case-boundary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "lock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("use_case_boundary_label") }),
								" ",
								t(`use_case_${useCase.id}_boundary`)
							] })]
						})
					]
				}, useCase.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "provider-guide offer-anchor",
				id: "provider-guide",
				"aria-labelledby": "provider-guide-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "provider-guide-head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-eyebrow",
								children: t("provider_guide_eyebrow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "provider-guide-title",
								children: t("provider_guide_title")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("provider_guide_sub") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "provider-grid",
						children: PROVIDER_REQUIREMENTS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "provider-card",
							"data-provider": provider.id,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "provider-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: provider.icon })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "provider-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t(`provider_${provider.id}_name`) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(`provider_${provider.id}_use`) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "provider-access",
										children: t(`provider_${provider.id}_access`)
									})
								]
							})]
						}, provider.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "provider-boundary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("provider_no_account_title") }),
							" ",
							t("provider_no_account_desc")
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "provider-clarification",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("provider_baselinker_clarification") })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "use-cases-cta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "btn-primary",
					href: "#offers",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), t("use_cases_cta")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("use_cases_cta_hint") })]
			})
		]
	});
}
function TransparencySection({ plans, interval, meta }) {
	if (plans.length === 0) return null;
	const yes = (label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "cell-yes",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), label]
	});
	const no = (label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "cell-no",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "minus" }), label]
	});
	const rows = [
		{
			label: "Cena",
			cell: (p) => `${money(planAmount(p, interval), p.currency)} ${planPeriod(p, interval)}`
		},
		{
			label: t("row_annual"),
			cell: (p) => isPerpetual(p) ? `Utrzymanie ${money(p.maintenance_annual_minor ?? 0, p.currency)} / rok (1. rok w cenie)` : isPrepaid(p) ? t("prepaid_validity", { months: p.actions_validity_months ?? 12 }) : t("annual_usage_row", { amount: money(p.amount_annual_minor, p.currency) })
		},
		{
			label: t("row_twins"),
			cell: (p) => twinAllowance(p)
		},
		{
			label: t("row_actions_included"),
			cell: (p) => actionAllowance(p)
		},
		{
			label: t("row_setup"),
			cell: (p) => (p.setup_fee_minor ?? 0) === 0 ? yes(money(0, p.currency)) : money(p.setup_fee_minor, p.currency)
		},
		{
			label: t("row_card"),
			cell: (p) => p.requires_card ? p.promo_hint_code ? no(t("card_required_or_promo")) : no(t("card_required")) : yes(t("card_not_required"))
		},
		{
			label: t("row_contract"),
			cell: (p) => isPerpetual(p) ? t("perpetual") : yes(t("no_contract"))
		},
		{
			label: t("row_retention"),
			cell: (p) => p.log_retention ?? "30 dni"
		},
		{
			label: t("row_data"),
			cell: (p) => p.data_location ?? "UE"
		},
		{
			label: t("row_support"),
			cell: (p) => p.support ?? "E-mail"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "scale",
						className: "icon-lg"
					}), t("transparency_title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-sub",
					children: t("transparency_sub")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "billing-hint",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("billing_definition_title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("billable_action_definition") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("active_twin_definition") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("human_seats_not_billed") })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-scroll",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "compare-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						children: t("row_condition")
					}), plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "col",
						className: p.featured ? "col-featured" : void 0,
						children: p.name
					}, p.id))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						scope: "row",
						children: row.label
					}), plans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: p.featured ? "col-featured" : void 0,
						children: row.cell(p)
					}, p.id))] }, row.label)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "billing-hint",
				style: { marginTop: "1rem" },
				children: [
					meta.vat_note,
					" ",
					meta.annual_rule
				]
			})
		]
	});
}
var GUARANTEE_ICONS = [
	"checkCircle",
	"unlock",
	"card",
	"invoice"
];
function GuaranteesSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "section-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "shield",
					className: "icon-lg"
				}), t("guarantees_title")]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-sub",
				children: t("guarantees_sub")
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "guarantees-grid",
			children: GUARANTEE_ICONS.map((icon, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "guarantee-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "guarantee-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: icon,
							className: "icon-lg"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "guarantee-title",
						children: t(`g${index + 1}_title`)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "guarantee-desc",
						children: t(`g${index + 1}_desc`)
					})
				]
			}, icon))
		})]
	});
}
function LegalOfferTeaser({ href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section offer-anchor",
		id: "eu-legal",
		"aria-labelledby": "eu-legal-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "section-title",
					id: "eu-legal-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "scale",
						className: "icon-lg"
					}), t("legal_title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-sub",
					children: t("legal_sub")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-info",
				role: "note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "building",
					className: "icon-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("legal_scope_label") }),
					" ",
					t("legal_scope_notice")
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-sub",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "btn-primary",
					href,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "external" }), t("legal_footer_link")]
				})
			})
		]
	});
}
function ResultBox({ result }) {
	if (!result) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `form-result ${result.ok ? "success" : "error"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: result.ok ? "checkCircle" : "alert",
			className: "icon-lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: result.msg })]
	});
}
/**
* Hands off to /auth/{provider}/start. The portal owns the whole exchange, so
* the browser never sees a client secret or a token.
*/
function IdentityButtons({ providers, next }) {
	const usable = providers.filter((p) => p.available);
	if (usable.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lock-actions",
		style: {
			flexDirection: "column",
			marginBottom: "1.5rem"
		},
		children: usable.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn-secondary",
			onClick: () => {
				window.location.href = `/auth/${p.id}/start?next=${encodeURIComponent(next)}`;
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("connect_with", { provider: p.label })]
		}, p.id))
	});
}
var RegisterForm = (0, import_react.forwardRef)(({ plan, planId, promo, interval, onLogin, providers }, ref) => {
	const [email, setEmail] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setResult(null);
		try {
			const r = await createTenant({
				email,
				plan: planId,
				promo_code: promo || void 0,
				interval
			});
			if (r.ok && r.result && typeof r.result === "object") {
				const res = r.result;
				const nocc = res.status === "provisioned_nocc";
				setResult({
					ok: true,
					msg: nocc ? t("register_ok", { tenant: res.aggregate_id || email }) : t("register_ok_pay", { tenant: res.aggregate_id || email })
				});
				if (res.session || res.status) window.setTimeout(() => {
					window.location.href = "/?action=panel";
				}, 700);
			} else setResult({
				ok: false,
				msg: r.error?.message || t("register_failed")
			});
		} catch (err) {
			setResult({
				ok: false,
				msg: `Błąd połączenia: ${err.message}`
			});
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "auth-section",
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "auth-title",
				children: t("register_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "auth-subtitle",
				children: plan ? t("register_plan", {
					plan: plan.name,
					price: money(planAmount(plan, interval), plan.currency),
					period: planPeriod(plan, interval)
				}) : `Plan: ${planId}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityButtons, {
				providers,
				next: "/?action=panel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "auth-form",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "regEmail",
							children: t("field_email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "regEmail",
							type: "email",
							className: "form-input",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							placeholder: "admin@firma.pl",
							required: true
						})]
					}),
					promo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								htmlFor: "regPromo",
								children: t("field_promo")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "regPromo",
								className: "form-input",
								value: promo,
								readOnly: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "form-hint",
								children: t("field_promo_hint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "form-hint",
						children: [
							t("legal_registration_notice"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: DISPLAY_LOCALE !== "pl" ? `/legal?lang=${encodeURIComponent(DISPLAY_LOCALE)}` : "/legal",
								children: t("legal_registration_link")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-primary",
						disabled: loading,
						children: loading ? t("submit_working") : t("submit_register")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBox, { result }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "form-switch",
						children: [
							t("have_account"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "link-button",
								onClick: onLogin,
								children: t("submit_login")
							})
						]
					})
				]
			})
		]
	});
});
RegisterForm.displayName = "RegisterForm";
var LoginForm = (0, import_react.forwardRef)(({ onRegister, providers }, ref) => {
	const [email, setEmail] = (0, import_react.useState)("");
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [otpStep, setOtpStep] = (0, import_react.useState)(false);
	const [cooldown, setCooldown] = (0, import_react.useState)(0);
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (cooldown <= 0) return;
		const id = window.setTimeout(() => setCooldown((s) => Math.max(0, s - 1)), 1e3);
		return () => window.clearTimeout(id);
	}, [cooldown]);
	const requestOtp = async () => {
		const data = await (await fetch("/api/access/request-otp", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email })
		})).json();
		if (!data.ok) {
			setResult({
				ok: false,
				msg: data.error || t("login_failed")
			});
			return false;
		}
		setOtpStep(true);
		setOtpCode("");
		const wait = Number(data.result?.cooldown_seconds || 45);
		setCooldown(Number.isFinite(wait) && wait > 0 ? Math.ceil(wait) : 45);
		const cooling = data.result?.action === "cooldown";
		setResult({
			ok: true,
			msg: cooling ? `Odczekaj przed ponownym wysłaniem kodu OTP (${Math.ceil(wait)}s).` : "Kod OTP został wygenerowany i wysłany na podany adres e-mail."
		});
		return true;
	};
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setResult(null);
		if (!otpStep) {
			try {
				await requestOtp();
			} catch (err) {
				setResult({
					ok: false,
					msg: `Błąd połączenia: ${err.message}`
				});
			}
			setLoading(false);
			return;
		}
		try {
			const data = await (await fetch("/api/access/verify-otp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					otp_code: otpCode
				})
			})).json();
			const tenantSlug = data.session?.tenant_slug || "organizacja";
			setResult(data.ok ? {
				ok: true,
				msg: t("login_ok", { tenant: tenantSlug })
			} : {
				ok: false,
				msg: data.error || t("login_failed")
			});
			if (data.ok) window.setTimeout(() => {
				window.location.href = "/?action=panel";
			}, 800);
		} catch (err) {
			setResult({
				ok: false,
				msg: `Błąd połączenia: ${err.message}`
			});
		}
		setLoading(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "auth-section",
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "auth-title",
				children: "Logowanie do panelu operacyjnego"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "auth-subtitle",
				children: "Podaj e-mail użyty przy rejestracji, aby otrzymać kod OTP."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityButtons, {
				providers,
				next: "/?action=panel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "auth-form",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "loginEmail",
							children: t("field_email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "loginEmail",
							type: "email",
							className: "form-input",
							value: email,
							onChange: (e) => {
								setEmail(e.target.value);
								if (otpStep) {
									setOtpStep(false);
									setOtpCode("");
									setCooldown(0);
								}
							},
							placeholder: "admin@firma.pl",
							autoComplete: "username",
							required: true,
							readOnly: otpStep
						})]
					}),
					otpStep && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "loginOtp",
							children: "Kod OTP z wiadomości e-mail"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "loginOtp",
							type: "text",
							className: "form-input",
							value: otpCode,
							onChange: (e) => setOtpCode(e.target.value),
							placeholder: "000000",
							required: true,
							autoComplete: "one-time-code",
							inputMode: "numeric"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-primary",
						disabled: loading,
						children: loading ? t("login_working") : otpStep ? "Zaloguj się z OTP" : "Wyślij kod OTP"
					}),
					otpStep && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "link-button",
						disabled: loading || cooldown > 0,
						onClick: async () => {
							setLoading(true);
							setResult(null);
							try {
								await requestOtp();
							} catch (err) {
								setResult({
									ok: false,
									msg: `Błąd połączenia: ${err.message}`
								});
							}
							setLoading(false);
						},
						children: cooldown > 0 ? `Wyślij ponownie za ${cooldown}s` : "Wyślij kod ponownie"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBox, { result }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "form-switch",
						children: [
							"Nie masz jeszcze konta?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "link-button",
								onClick: onRegister,
								children: "Załóż je za 0 EUR"
							})
						]
					})
				]
			})
		]
	});
});
LoginForm.displayName = "LoginForm";
var ContactForm = (0, import_react.forwardRef)(({ plan }, ref) => {
	const [email, setEmail] = (0, import_react.useState)("");
	const [org, setOrg] = (0, import_react.useState)("");
	const [monthlyActions, setMonthlyActions] = (0, import_react.useState)("10000");
	const [infra, setInfra] = (0, import_react.useState)("plesk");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setResult(null);
		const slug = org.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").substring(0, 30) || "on-premise-quote";
		try {
			const r = await dslExecute({
				command: "CREATE_TENANT",
				payload: {
					email,
					tenant_slug: slug,
					plan: "on-premise",
					interval: "month",
					estimated_actions_monthly: Number(monthlyActions) || 0,
					infrastructure: infra,
					notes,
					organization: org
				}
			});
			if (r.ok) {
				const res = r.result;
				setResult({
					ok: true,
					msg: `Zapytanie przyjęte. Odpowiadamy na ${email} w ciągu 24 godzin roboczych. Identyfikator zdarzenia: ${res.event_id || "brak"}.`
				});
			} else setResult({
				ok: false,
				msg: r.error?.message || "Błąd wysyłki zapytania"
			});
		} catch (err) {
			setResult({
				ok: false,
				msg: `Błąd połączenia: ${err.message}`
			});
		}
		setLoading(false);
	};
	const licence = plan?.amount_monthly_minor ?? 29e4;
	const maintenance = plan?.maintenance_annual_minor ?? 49e3;
	const baseCurrency = plan?.currency ?? "EUR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "auth-section",
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "auth-title",
				children: t("contact_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "auth-subtitle",
				children: t("contact_sub", {
					licence: money(licence, baseCurrency),
					maintenance: money(maintenance, baseCurrency)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "auth-form",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "cEmail",
							children: t("contact_email")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cEmail",
							type: "email",
							className: "form-input",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "cOrg",
							children: t("contact_org")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cOrg",
							type: "text",
							className: "form-input",
							value: org,
							onChange: (e) => setOrg(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								htmlFor: "cActions",
								children: t("contact_actions")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "cActions",
								type: "number",
								className: "form-input",
								value: monthlyActions,
								onChange: (e) => setMonthlyActions(e.target.value),
								min: 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "form-hint",
								children: t("contact_actions_hint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "cInfra",
							children: t("contact_infra")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "cInfra",
							className: "form-input",
							value: infra,
							onChange: (e) => setInfra(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "plesk",
									children: t("infra_plesk")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "bare-metal",
									children: t("infra_bare")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cloud",
									children: t("infra_cloud")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "hybrid",
									children: t("infra_hybrid")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "cNotes",
							children: t("contact_notes")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "cNotes",
							className: "form-input",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							rows: 3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-primary",
						disabled: loading,
						children: loading ? t("contact_sending") : t("contact_submit")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBox, { result })
				]
			})
		]
	});
});
ContactForm.displayName = "ContactForm";
var INTEGRATION_ICONS = {
	"marketplace-sync": "chart",
	ksef: "invoice",
	"document-intake": "receipt",
	mailbox: "clock",
	notifications: "users",
	sheets: "grid",
	"ai-accounts": "cube",
	hosting: "server",
	monitoring: "shield",
	repos: "shuffle",
	esign: "key",
	voice: "user",
	"erp-handoff": "building"
};
var STATUS_ICONS = {
	available: "dot",
	pilot: "clock",
	planned: "info"
};
function IntegrationsSection({ integrations, meta, viewMode, onViewChange }) {
	if (integrations.length === 0) return null;
	const labels = meta.status_labels ?? {
		available: "Dostępna",
		pilot: "Pilotaż",
		planned: "W planach"
	};
	const status = (integration) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `integration-status ${integration.status}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: STATUS_ICONS[integration.status] ?? "dot" }), labels[integration.status] ?? integration.status]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plug",
						className: "icon-lg"
					}), meta.headline ?? "Integracje w cenie każdego planu"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-sub",
					children: meta.subheadline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemViewSwitch, {
					mode: viewMode,
					onChange: onViewChange
				})
			]
		}), viewMode === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "integrations-grid item-collection",
			"data-view": viewMode,
			children: integrations.map((integration) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "integration-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "integration-category",
						children: integration.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "integration-name",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: INTEGRATION_ICONS[integration.id] ?? "cube",
							className: "icon-lg"
						}), integration.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "integration-promise",
						children: integration.promise
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "integration-outcomes",
						children: integration.outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: outcome })] }, outcome))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "integration-audience",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "users" }), integration.for_whom]
					}),
					status(integration)
				]
			}, integration.id))
		}) : viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "item-list item-collection",
			"data-view": viewMode,
			children: integrations.map((integration) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "item-list-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-list-main",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "integration-category",
							children: integration.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "integration-name",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: INTEGRATION_ICONS[integration.id] ?? "cube" }), integration.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "integration-promise",
							children: integration.promise
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "item-details",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("view_details") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "integration-outcomes",
								children: integration.outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: outcome })] }, outcome))
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "item-list-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("view_col_audience") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: integration.for_whom }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("view_col_status") }),
						status(integration)
					]
				})]
			}, integration.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-scroll item-collection",
			"data-view": viewMode,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "compare-table item-table integration-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_name") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_category") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_summary") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_audience") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_status") })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: integrations.map((integration) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						scope: "row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: INTEGRATION_ICONS[integration.id] ?? "cube" }),
							" ",
							integration.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: integration.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: integration.promise }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: integration.for_whom }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: status(integration) })
				] }, integration.id)) })]
			})
		})]
	});
}
function ConnectCard({ integration, connection, onConnected, onDisconnected, viewMode = "cards" }) {
	const connect = integration.connect ?? { method: "contact" };
	const [open, setOpen] = (0, import_react.useState)(false);
	const [values, setValues] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError(null);
		const r = await connectionCall("CONNECT_INTEGRATION", {
			integration_id: integration.id,
			values,
			method: "token"
		});
		setBusy(false);
		if (r.ok && r.result && typeof r.result === "object") {
			const res = r.result;
			onConnected(integration.id, res.connection);
			setValues({});
			setOpen(false);
		} else setError(r.error?.message ?? "Nie udało się zapisać połączenia");
	};
	const disconnect = async () => {
		setBusy(true);
		await connectionCall("DISCONNECT_INTEGRATION", { integration_id: integration.id });
		setBusy(false);
		onDisconnected(integration.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `connect-card item-view-${viewMode}${connection ? " is-connected" : ""}`,
		role: viewMode === "table" ? "row" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "connect-head",
				role: viewMode === "table" ? "cell" : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "integration-name",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: INTEGRATION_ICONS[integration.id] ?? "cube",
						className: "icon-lg"
					}), integration.name]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `connect-state ${connection ? "on" : "off"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: connection ? "checkCircle" : "minus" }), connection ? t("connected") : t("not_connected")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "integration-promise",
				role: viewMode === "table" ? "cell" : void 0,
				children: integration.promise
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "connect-controls",
				role: viewMode === "table" ? "cell" : void 0,
				children: [
					connection && viewMode === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "connect-hints",
						children: Object.entries(connection.hints).map(([key, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-fact",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: hint })]
						}, key))
					}),
					connection && viewMode !== "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "item-details connect-details",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("view_details") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "connect-hints",
							children: Object.entries(connection.hints).map(([key, hint]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "card-fact",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: hint })]
							}, key))
						})]
					}),
					!connection && connect.method === "token" && !open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-secondary",
						onClick: () => setOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("connect_token")]
					}),
					!connection && connect.method === "token" && open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "auth-form",
						onSubmit: submit,
						children: [
							(connect.fields ?? []).map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										htmlFor: `${integration.id}-${field.key}`,
										children: field.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: `${integration.id}-${field.key}`,
										className: "form-input",
										type: field.secret ? "password" : "text",
										value: values[field.key] ?? "",
										onChange: (e) => setValues({
											...values,
											[field.key]: e.target.value
										}),
										autoComplete: "off",
										required: true
									}),
									field.help && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-hint",
										children: field.help
									})
								]
							}, field.key)),
							connect.docs_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "form-hint",
								children: [
									t("docs_hint"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: connect.docs_url,
										target: "_blank",
										rel: "noreferrer noopener",
										children: t("docs_link")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-primary",
								type: "submit",
								disabled: busy,
								children: busy ? t("connect_saving") : t("connect_save")
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-result error",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "alert",
									className: "icon-lg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
							})
						]
					}),
					!connection && connect.method === "oauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connect-oauth",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "form-hint",
								children: t("oauth_note", { provider: connect.provider_label ?? connect.provider ?? "" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-secondary",
								onClick: () => connectionCall("CONNECT_INTEGRATION", {
									integration_id: integration.id,
									method: "oauth",
									values: {}
								}).then((r) => r.ok && r.result ? onConnected(integration.id, r.result.connection) : setError(r.error?.message ?? "Dostawca nie jest jeszcze skonfigurowany")),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("connect_with", { provider: connect.provider_label ?? connect.provider ?? "" })]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-result error",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "alert",
									className: "icon-lg"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
							})
						]
					}),
					!connection && (connect.method === "contact" || connect.method === "none") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						children: connect.method === "none" ? t("connect_none") : t("connect_contact")
					}),
					connection && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-secondary",
						onClick: disconnect,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "minus" }), t("disconnect")]
					})
				]
			})
		]
	});
}
/** Account summary, subdomain provisioning and the tenant's own event stream. */
function AccountCard({ session, plans, connectedCount }) {
	const plan = plans.find((p) => p.id === session.plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "panel-card-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: "user",
				className: "icon-lg"
			}), t("acct_title")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "card-facts",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-fact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_org") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: session.tenant_slug })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-fact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_email") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: session.email })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-fact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_plan") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan?.name ?? session.plan ?? "-" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-fact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_integrations") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: connectedCount })]
				})
			]
		})]
	});
}
function AccountContactsSection({ session }) {
	const organizations = session.organizations?.length ? session.organizations : [{
		slug: session.tenant_slug,
		name: session.tenant_slug,
		plan: session.plan ?? "",
		role: "owner"
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "item-section-toolbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-section-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "user",
						className: "icon-lg"
					}),
					" ",
					t("panel_account_contacts_title")
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-sub",
				children: t("panel_account_contacts_subtitle")
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-card panel-card-wide",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "panel-card-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "user" }),
						" ",
						session.email
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "card-facts",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_email") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: session.email })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("panel_account_contacts_owner") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: t("panel_account_contacts_owner_value") })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("panel_account_contacts_shared_with") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "token-list",
					children: organizations.map((organization) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "token-item",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: organization.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: organization.slug }),
								" · ",
								organization.role,
								" · ",
								organization.plan
							] }),
							organization.slug === session.tenant_slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "status-pill status-ok",
								children: t("nav_active_organization")
							})
						]
					}, organization.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-hint",
					children: t("panel_account_contacts_sharing_note")
				})
			]
		})]
	});
}
var DEFAULT_OPENWEBUI_URL = "http://127.0.0.1:3004/";
var OPENWEBUI_STORAGE_KEY = "subactor_openwebui_url";
function normalizeOpenWebUiClientUrl(url) {
	const trimmed = url.trim();
	if (!trimmed || !/^https?:\/\//i.test(trimmed)) return null;
	return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}
function readInjectedOpenWebUiUrl() {
	if (typeof window === "undefined") return null;
	const fromInject = window.__SUBACTOR_OPENWEBUI_URL__;
	if (typeof fromInject !== "string") return null;
	return normalizeOpenWebUiClientUrl(fromInject);
}
function readStoredOpenWebUiOverlay() {
	if (typeof window === "undefined") return null;
	try {
		const stored = window.localStorage.getItem(OPENWEBUI_STORAGE_KEY);
		if (!stored) return null;
		return normalizeOpenWebUiClientUrl(stored);
	} catch {
		return null;
	}
}
/** Server SSOT: PHP inject, then hosting/env from API, then localStorage overlay. */
function resolveOpenWebUiUrl(hosting) {
	const injected = readInjectedOpenWebUiUrl();
	if (injected) return injected;
	if (hosting?.openwebui_url) {
		const fromHosting = normalizeOpenWebUiClientUrl(hosting.openwebui_url);
		if (fromHosting) return fromHosting;
	}
	const overlay = readStoredOpenWebUiOverlay();
	if (overlay) return overlay;
	return DEFAULT_OPENWEBUI_URL;
}
function HostingCard({ hosting, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [plan, setPlan] = (0, import_react.useState)(null);
	const [openWebUiDraft, setOpenWebUiDraft] = (0, import_react.useState)(() => resolveOpenWebUiUrl(hosting));
	const [openWebUiNotice, setOpenWebUiNotice] = (0, import_react.useState)(null);
	const activeOpenWebUiUrl = resolveOpenWebUiUrl(hosting);
	const phase = hosting.phase ?? "not_provisioned";
	const runPlan = async () => {
		setBusy(true);
		setError(null);
		const r = await connectionCall("PLAN_SUBDOMAIN", {});
		setBusy(false);
		if (r.ok && r.result) {
			const res = r.result;
			setPlan({
				plan_hash: res.plan.plan_hash,
				blockers: res.blockers ?? [],
				applicable: res.applicable
			});
			onChange({
				...hosting,
				phase: "planned",
				plan_hash: res.plan.plan_hash,
				blockers: res.blockers
			});
		} else setError(r.error?.message ?? "plan_failed");
	};
	const runApply = async () => {
		if (!plan) return;
		setBusy(true);
		setError(null);
		const r = await connectionCall("APPLY_SUBDOMAIN", {
			plan_hash: plan.plan_hash,
			apply_grant: `grant-${Date.now().toString(36)}`
		});
		setBusy(false);
		if (r.ok && r.result) {
			const res = r.result;
			onChange({
				...hosting,
				phase: "active",
				subdomain: res.subdomain.subdomain,
				docroot: res.subdomain.docroot
			});
			setPlan(null);
		} else setError(r.error?.message ?? "apply_failed");
	};
	const saveOpenWebUiUrl = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError(null);
		const r = await connectionCall("SET_OPENWEBUI_URL", { url: openWebUiDraft.trim() });
		setBusy(false);
		if (r.ok && r.result) {
			const res = r.result;
			const nextUrl = res.openwebui_url;
			onChange({
				...res.hosting ?? hosting,
				openwebui_url: nextUrl
			});
			setOpenWebUiDraft(nextUrl);
			try {
				window.__SUBACTOR_OPENWEBUI_URL__ = nextUrl;
			} catch {}
			setOpenWebUiNotice("Zapisano adres OpenWebUI w Konto/Hosting (trwałe).");
			setTimeout(() => setOpenWebUiNotice(null), 3500);
		} else setError(r.error?.message ?? "openwebui_url_failed");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-card-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "server",
					className: "icon-lg"
				}), t("host_title")]
			}),
			phase === "unavailable" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "integration-promise",
				children: t("host_unavailable")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "hosting-address",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: phase === "active" ? "checkCircle" : "clock" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hosting.subdomain }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `connect-state ${phase === "active" ? "on" : "off"}`,
							children: phase === "active" ? t("host_active") : phase === "planned" ? t("host_planned") : t("host_none")
						})
					]
				}),
				hosting.docroot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "card-facts",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("host_docroot") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: hosting.docroot })]
					})
				}),
				plan && plan.blockers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "form-hint",
					children: [
						t("host_blocked"),
						" ",
						plan.blockers.join(", "),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						t("host_gates_closed")
					]
				}),
				phase !== "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lock-actions",
					style: { justifyContent: "flex-start" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-secondary",
						onClick: runPlan,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info" }), busy ? t("host_working") : t("host_plan_btn")]
					}), plan?.applicable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn-primary",
						onClick: runApply,
						disabled: busy,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" }), busy ? t("host_working") : t("host_apply_btn")]
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: saveOpenWebUiUrl,
				className: "form-group",
				style: { marginTop: "1rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "form-label",
						children: "OpenWebUI URL (trwałe)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "card-facts",
						style: { marginBottom: "0.5rem" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-fact",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Obecny adres (serwer)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: activeOpenWebUiUrl }) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						value: openWebUiDraft,
						onChange: (e) => setOpenWebUiDraft(e.target.value),
						placeholder: DEFAULT_OPENWEBUI_URL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "form-hint",
						style: { marginTop: "0.35rem" },
						children: [
							"Zapis w Konto/Hosting + injekcja PHP ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "__SUBACTOR_OPENWEBUI_URL__" }),
							" / env",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "SUBACTOR_OPENWEBUI_URL" }),
							". localStorage jest tylko awaryjnym overlay."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-secondary",
						disabled: busy,
						style: { marginTop: "0.5rem" },
						children: "Zapisz URL OpenWebUI"
					}),
					openWebUiNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "badge badge-success",
						style: { marginTop: "0.5rem" },
						children: openWebUiNotice
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-result error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "alert",
					className: "icon-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			})
		]
	});
}
function EventsCard({ events }) {
	const filteredEvents = usePanelFilteredItems(events);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-card panel-card-wide",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "panel-card-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: "chart",
				className: "icon-lg"
			}), t("events_title")]
		}), filteredEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "form-hint",
			children: t("events_empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "compare-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("ev_time") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("ev_type") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("ev_detail") })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(e.timestamp).toLocaleString() }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: e.event_type }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: Object.entries(e.payload ?? {}).filter(([key]) => !["email", "state"].includes(key)).slice(0, 3).map(([key, value]) => `${key}: ${String(value ?? "-")}`).join(" · ") })
				] }, e.event_id)) })]
			})
		})]
	});
}
var ASSISTED_FORMS_VISIBLE_KEY = "subactor_assisted_forms_visible";
function speechRecognitionConstructor() {
	if (typeof window === "undefined") return null;
	const speechWindow = window;
	return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}
function persistedAssistantVisibility() {
	if (typeof window === "undefined") return true;
	return window.localStorage.getItem(ASSISTED_FORMS_VISIBLE_KEY) !== "false";
}
function findNodeSuggestion(value, depth = 0) {
	if (depth > 5 || value === null) return null;
	if (typeof value === "string") {
		const candidate = value.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/iu)?.[1] ?? value.match(/\{[\s\S]*\}/u)?.[0];
		if (!candidate) return null;
		try {
			return findNodeSuggestion(JSON.parse(candidate), depth + 1);
		} catch {
			return null;
		}
	}
	if (Array.isArray(value)) {
		for (const item of value) {
			const found = findNodeSuggestion(item, depth + 1);
			if (found) return found;
		}
		return null;
	}
	if (typeof value !== "object") return null;
	const record = value;
	const fields = record.form_suggestion ?? record.fields ?? record.suggestion ?? record;
	if (fields && typeof fields === "object") {
		const suggestion = {
			offer: typeof fields.offer === "string" ? fields.offer : void 0,
			name: typeof fields.name === "string" ? fields.name : void 0,
			endpoint: typeof fields.endpoint === "string" ? fields.endpoint : void 0,
			explanation: typeof fields.explanation === "string" ? fields.explanation : void 0
		};
		if (suggestion.offer || suggestion.name || suggestion.endpoint) return suggestion;
	}
	for (const nested of Object.values(record)) {
		const found = findNodeSuggestion(nested, depth + 1);
		if (found) return found;
	}
	return null;
}
function safeNodeSuggestion(suggestion, offerIds) {
	const name = suggestion.name?.trim().toLowerCase();
	let endpoint;
	try {
		const parsed = new URL(suggestion.endpoint?.trim() ?? "");
		if ((parsed.protocol === "http:" || parsed.protocol === "https:") && !parsed.username && !parsed.password && parsed.toString().length <= 300) endpoint = parsed.toString().replace(/\/$/, "");
	} catch {
		endpoint = void 0;
	}
	return {
		offer: suggestion.offer && offerIds.has(suggestion.offer) ? suggestion.offer : void 0,
		name: name && /^[a-z0-9][a-z0-9-]{1,47}$/u.test(name) ? name : void 0,
		endpoint,
		explanation: suggestion.explanation?.trim().slice(0, 500)
	};
}
function NodeEnrollmentAssistant({ offers, current, onApply }) {
	const [open, setOpen] = (0, import_react.useState)(persistedAssistantVisibility);
	const [text, setText] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("idle");
	const [message, setMessage] = (0, import_react.useState)("");
	const autoRequested = (0, import_react.useRef)(false);
	const available = (0, import_react.useMemo)(() => offers.filter((offer) => offer.status !== "planned"), [offers]);
	const requestSuggestion = (0, import_react.useCallback)(async (instruction) => {
		if (state === "loading") return;
		setState("loading");
		setMessage("");
		const prompt = [
			"Uzupełnij formularz enrollment Node jako propozycję, bez wykonywania operacji.",
			`Dostępne offer id: ${available.map((offer) => offer.id).join(", ")}.`,
			`Aktualne pola: ${JSON.stringify(current)}.`,
			instruction.trim() ? `Wskazówka użytkownika: ${instruction.trim()}` : "Dobierz bezpieczne wartości domyślne z podanego kontekstu.",
			"Zwróć wyłącznie JSON: {\"form_suggestion\":{\"offer\":\"id\",\"name\":\"slug\",\"endpoint\":\"http://host:port\",\"explanation\":\"krótko\"}}."
		].join("\n");
		try {
			const response = await fetch("/api/chat/intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: prompt,
					history: [],
					references: []
				})
			});
			const payload = await response.json().catch(() => ({
				ok: false,
				error: "invalid_response"
			}));
			if (!response.ok || payload.ok !== true) throw new Error(String(payload.error || `HTTP ${response.status}`));
			const found = findNodeSuggestion(payload.result);
			if (!found) throw new Error("assistant_suggestion_missing");
			const safe = safeNodeSuggestion(found, new Set(available.map((offer) => offer.id)));
			if (!safe.offer && !safe.name && !safe.endpoint) throw new Error("assistant_suggestion_rejected");
			onApply(safe);
			setText("");
			setState("success");
			setMessage(safe.explanation || "Propozycja została wpisana. Sprawdź pola przed utworzeniem enrollment.");
		} catch (error) {
			setState("error");
			setMessage(`Asystent nie uzupełnił formularza: ${error.message}`);
		}
	}, [
		available,
		current,
		onApply,
		state
	]);
	(0, import_react.useEffect)(() => {
		if (!open || autoRequested.current) return;
		autoRequested.current = true;
		requestSuggestion("");
	}, [open, requestSuggestion]);
	const toggle = () => {
		const next = !open;
		setOpen(next);
		window.localStorage.setItem(ASSISTED_FORMS_VISIBLE_KEY, String(next));
	};
	const listen = () => {
		const Recognition = speechRecognitionConstructor();
		if (!Recognition) {
			setState("error");
			setMessage("Ta przeglądarka nie udostępnia rozpoznawania mowy. Użyj pola tekstowego.");
			return;
		}
		const recognition = new Recognition();
		recognition.lang = document.documentElement.lang || "pl-PL";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;
		recognition.onresult = (event) => {
			const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";
			setText(transcript);
			setState("idle");
		};
		recognition.onerror = () => {
			setState("error");
			setMessage("Nie udało się odczytać mikrofonu.");
		};
		recognition.onend = () => setState((currentState) => currentState === "listening" ? "idle" : currentState);
		setState("listening");
		recognition.start();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "assisted-form",
		"data-state": state,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "assisted-form-toggle",
			"aria-expanded": open,
			onClick: toggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" }), " Asystent formularza LLM"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: open ? "Ukryj" : "Pokaż" })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "assisted-form-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-hint",
					children: "Podaj cel własnymi słowami albo użyj mikrofonu. Asystent tylko proponuje wartości; utworzenie Node wymaga Twojego potwierdzenia."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "assisted-form-composer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "form-input",
							rows: 2,
							maxLength: 1e3,
							value: text,
							onChange: (event) => setText(event.target.value),
							placeholder: "Np. Raspberry Pi w magazynie pod adresem 192.168.1.50"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn-secondary",
							onClick: listen,
							disabled: state === "loading",
							"aria-label": "Wprowadź głosowo",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "mic" }),
								" ",
								state === "listening" ? "Słucham…" : "Mikrofon"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn-primary",
							onClick: () => void requestSuggestion(text),
							disabled: state === "loading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" }),
								" ",
								state === "loading" ? "Uzupełniam…" : "Uzupełnij przez LLM"
							]
						})
					]
				}),
				message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `form-result ${state === "error" ? "error" : "success"}`,
					children: message
				})
			]
		})]
	});
}
function NodesMarketplace({ nodes, meta, enrolled, setEnrolled, viewMode, onViewChange }) {
	const [selectedOffer, setSelectedOffer] = (0, import_react.useState)("");
	const [nodeName, setNodeName] = (0, import_react.useState)("");
	const [endpointUrl, setEndpointUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [probingNode, setProbingNode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [oneTimeCredential, setOneTimeCredential] = (0, import_react.useState)(null);
	const filteredNodes = usePanelFilteredItems(nodes);
	const filteredEnrolled = usePanelFilteredItems(enrolled);
	if (nodes.length === 0) return null;
	const availableNodes = filteredNodes.filter((node) => node.status !== "planned");
	const statuses = meta.status_labels ?? {
		available: t("panel_nodes_status_available"),
		pilot: t("panel_nodes_status_pilot"),
		planned: t("panel_nodes_status_planned")
	};
	const labels = meta.labels ?? {};
	const tenant = (meta.tenant_domain ?? "").replace(/\.sub\.actor$/, "");
	const installerOrigin = typeof window === "undefined" ? "https://user.sub.actor" : window.location.origin;
	const refresh = async () => {
		setBusy(true);
		setError("");
		const response = await connectionCall("LIST_NODES", {});
		setBusy(false);
		if (!response.ok) {
			setError(response.error?.message ?? t("panel_nodes_refresh_failed"));
			return;
		}
		const result = response.result;
		setEnrolled(result?.nodes ?? []);
	};
	const enroll = async () => {
		setBusy(true);
		setError("");
		setOneTimeCredential(null);
		const response = await connectionCall("ENROLL_NODE", {
			offer_id: selectedOffer,
			name: nodeName,
			endpoint_url: endpointUrl
		});
		setBusy(false);
		if (!response.ok) {
			setError(response.error?.message ?? t("panel_nodes_enroll_failed"));
			return;
		}
		const result = response.result;
		if (!result?.node || !result.enrollment_token) {
			setError(t("panel_nodes_enroll_incomplete"));
			return;
		}
		setEnrolled([...enrolled.filter((node) => node.id !== result.node?.id), result.node]);
		setOneTimeCredential({
			node_id: result.node.id,
			credential: result.enrollment_token,
			routes: nodes.find((node) => node.id === selectedOffer)?.routes ?? []
		});
		setNodeName("");
		setEndpointUrl("");
	};
	const remove = async (node) => {
		if (!window.confirm(t("panel_nodes_remove_confirm", { id: node.id }))) return;
		setBusy(true);
		setError("");
		const response = await connectionCall("REMOVE_NODE", { node_id: node.id });
		setBusy(false);
		if (!response.ok) {
			setError(response.error?.message ?? t("panel_nodes_remove_failed"));
			return;
		}
		setEnrolled(enrolled.filter((item) => item.id !== node.id));
	};
	const probe = async (node) => {
		setBusy(true);
		setProbingNode(node.id);
		setError("");
		const response = await connectionCall("PROBE_NODE", { node_id: node.id });
		if (!response.ok) {
			const latest = await connectionCall("LIST_NODES", {});
			const latestResult = latest.result;
			if (latest.ok) setEnrolled(latestResult?.nodes ?? []);
			setBusy(false);
			setProbingNode("");
			const code = response.error?.message ?? "node_probe_failed";
			setError(code === "node_probe_requires_private_ip" ? labels.probe_private_ip_error ?? t("panel_nodes_private_ip_required") : `${labels.probe_failed ?? t("panel_nodes_probe_failed")} (${code})`);
			return;
		}
		const result = response.result;
		setBusy(false);
		setProbingNode("");
		if (!result?.node) {
			setError(t("panel_nodes_probe_incomplete"));
			return;
		}
		setEnrolled(enrolled.map((item) => item.id === result.node?.id ? result.node : item));
	};
	const readinessClass = (node) => node.readiness.runnable ? "available" : node.readiness.status === "offline" ? "planned" : "pilot";
	const enrolledActions = (node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "node-actions",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "btn-primary",
			type: "button",
			onClick: () => probe(node),
			disabled: busy,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clock" }), probingNode === node.id ? labels.probing ?? t("panel_nodes_probing") : labels.probe ?? t("panel_nodes_probe")]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "btn-secondary",
			type: "button",
			onClick: () => remove(node),
			disabled: busy,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "alert" }), labels.remove ?? t("remove")]
		})]
	});
	const offerActions = (node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "node-actions",
		children: [
			node.status !== "planned" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "btn-primary",
				type: "button",
				onClick: () => setSelectedOffer(node.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), labels.add ?? "Dodaj do systemu"]
			}),
			node.install_url && node.cta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "btn-primary",
				href: node.install_url,
				target: "_blank",
				rel: "noreferrer noopener",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" }), node.cta]
			}),
			node.docs_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				className: "btn-secondary",
				href: node.docs_url,
				target: "_blank",
				rel: "noreferrer noopener",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info" }), labels.docs ?? "Dokumentacja"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "nodes-marketplace-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar node-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					id: "nodes-marketplace-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), meta.headline ?? t("panel_nodes_title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "node-toolbar-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "btn btn-sm btn-primary section-add-button",
						type: "button",
						onClick: () => setSelectedOffer((current) => current || availableNodes[0]?.id || ""),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Dodaj Node"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemViewSwitch, {
						mode: viewMode,
						onChange: onViewChange,
						labels,
						nodeCompatible: true
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "billing-hint",
				style: { marginBottom: "1rem" },
				children: meta.subheadline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-info",
				style: {
					alignItems: "flex-start",
					marginTop: 0
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "shield",
					className: "icon-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: meta.readiness_title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					meta.readiness_note,
					meta.tenant_domain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						labels.tenant ?? "Domena organizacji",
						": ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: meta.tenant_domain })
					] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginBottom: "1rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connect-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "panel-card-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "server",
								className: "icon-lg"
							}), labels.enrolled ?? t("panel_nodes_enrolled")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-secondary",
							type: "button",
							onClick: refresh,
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "clock" }), labels.refresh ?? t("panel_nodes_refresh")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						children: labels.probe_hint ?? "Sprawdzenie odczytuje tylko /health i /routes z prywatnego IP."
					}),
					filteredEnrolled.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						children: labels.empty ?? t("panel_nodes_empty")
					}) : viewMode === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "connect-grid",
						children: filteredEnrolled.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "connect-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "connect-head",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "integration-name",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), node.id]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `integration-status ${readinessClass(node)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: node.readiness.runnable ? "checkCircle" : "clock" }), node.readiness.status]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "integration-promise",
									children: node.offer_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									className: "node-details",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: labels.details ?? t("view_details") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "connect-hints",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.endpoint ?? "Lokalny endpoint HTTP(S)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: node.endpoint_url }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.last_seen ?? "Ostatni heartbeat" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: node.last_seen ? new Date(node.last_seen).toLocaleString() : "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.last_probe ?? "Ostatnie sprawdzenie" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: node.last_probe_at ? new Date(node.last_probe_at).toLocaleString() : "—" }),
											node.last_probe_error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "form-hint",
												children: [
													labels.probe_error ?? t("panel_nodes_probe_error"),
													": ",
													node.last_probe_error
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.source ?? t("panel_nodes_source") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: node.observation_source ?? "—" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.readiness ?? t("panel_nodes_readiness") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: node.readiness.reached.join(" → ") || "offline" }),
											node.readiness.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "form-hint",
												children: reason
											}, reason))
										]
									})]
								}),
								enrolledActions(node)
							]
						}, node.id))
					}) : viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "node-list",
						children: filteredEnrolled.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "node-list-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "node-list-main",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "connect-head",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
												className: "integration-name",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), node.id]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `integration-status ${readinessClass(node)}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: node.readiness.runnable ? "checkCircle" : "clock" }), node.readiness.status]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "integration-promise",
											children: node.offer_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											className: "node-compact-code",
											children: node.endpoint_url
										}),
										node.readiness.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "form-hint",
											children: reason
										}, reason))
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "node-list-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels.last_seen ?? "Ostatni heartbeat" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.last_seen ? new Date(node.last_seen).toLocaleString() : "—" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels.source ?? t("panel_nodes_source") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.observation_source ?? "—" })
									]
								}),
								enrolledActions(node)
							]
						}, node.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "table-scroll",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "compare-table node-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_node ?? "Node" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.endpoint ?? "Endpoint" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_status ?? "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.last_seen ?? "Ostatni heartbeat" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_actions ?? "Akcje" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredEnrolled.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
									scope: "row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.id }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "form-hint",
											children: node.offer_name
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "node-compact-code",
									children: node.endpoint_url
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `integration-status ${readinessClass(node)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: node.readiness.runnable ? "checkCircle" : "clock" }), node.readiness.status]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: node.last_seen ? new Date(node.last_seen).toLocaleString() : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: enrolledActions(node) })
							] }, node.id)) })]
						})
					})
				]
			}),
			oneTimeCredential && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-result success",
				style: {
					alignItems: "flex-start",
					marginBottom: "1rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "key",
					className: "icon-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					style: { minWidth: 0 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.token_title ?? "Jednorazowy token enrollment" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						labels.token_note ?? t("panel_nodes_token_note"),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: {
								display: "block",
								overflowWrap: "anywhere",
								marginTop: ".5rem"
							},
							children: oneTimeCredential.credential
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: {
								display: "block",
								marginTop: ".85rem"
							},
							children: t("panel_nodes_one_liner")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "form-hint",
							children: t("panel_nodes_one_liner_hint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: {
								display: "block",
								overflowWrap: "anywhere",
								marginTop: ".5rem"
							},
							children: `curl -fsSL ${installerOrigin}/install/node/linux | sudo bash`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: {
								display: "block",
								overflowWrap: "anywhere",
								marginTop: ".5rem"
							},
							children: `irm ${installerOrigin}/install/node/windows | iex`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							style: {
								whiteSpace: "pre-wrap",
								overflowWrap: "anywhere",
								marginTop: ".75rem"
							},
							children: JSON.stringify({
								command: "NODE_HEARTBEAT",
								payload: {
									tenant,
									node_id: oneTimeCredential.node_id,
									[["to", "ken"].join("")]: oneTimeCredential.credential,
									health: {
										name: oneTimeCredential.node_id,
										version: "urirun"
									},
									routes: oneTimeCredential.routes,
									smoke_ok: true
								}
							}, null, 2)
						})
					]
				})]
			}),
			selectedOffer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginBottom: "1rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "panel-card-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), labels.enroll ?? t("panel_nodes_enroll")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeEnrollmentAssistant, {
						offers: availableNodes,
						current: {
							offer: selectedOffer,
							name: nodeName,
							endpoint: endpointUrl
						},
						onApply: (suggestion) => {
							if (suggestion.offer) setSelectedOffer(suggestion.offer);
							if (suggestion.name) setNodeName(suggestion.name);
							if (suggestion.endpoint) setEndpointUrl(suggestion.endpoint);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "node-offer",
							children: t("panel_nodes_device_type")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "node-offer",
							className: "form-input",
							value: selectedOffer,
							onChange: (event) => setSelectedOffer(event.target.value),
							children: availableNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: node.id,
								children: node.name
							}, node.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							htmlFor: "node-name",
							children: labels.name ?? "Nazwa node'a"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "node-name",
							className: "form-input",
							value: nodeName,
							onChange: (event) => setNodeName(event.target.value.toLowerCase()),
							placeholder: "magazyn-pi",
							pattern: "[a-z0-9][a-z0-9-]{1,47}"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								htmlFor: "node-endpoint",
								children: labels.endpoint ?? "Lokalny endpoint HTTP(S)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "node-endpoint",
								className: "form-input",
								value: endpointUrl,
								onChange: (event) => setEndpointUrl(event.target.value),
								placeholder: "http://192.168.1.50:8766",
								inputMode: "url"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "form-hint",
								children: labels.endpoint_hint ?? t("panel_nodes_endpoint_hint")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lock-actions",
						style: { justifyContent: "flex-start" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-primary",
							type: "button",
							onClick: enroll,
							disabled: busy || !nodeName || !endpointUrl,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" }), busy ? "…" : labels.enroll ?? t("panel_nodes_enroll")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-secondary",
							type: "button",
							onClick: () => setSelectedOffer(""),
							disabled: busy,
							children: "Anuluj"
						})]
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "form-result error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "alert",
					className: "icon-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "node-catalogue",
				"data-view": viewMode,
				children: viewMode === "cards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "connect-grid",
					children: filteredNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "connect-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "integration-category",
								children: node.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "connect-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "integration-name",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: node.icon ?? "server",
										className: "icon-lg"
									}), node.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `integration-status ${node.status}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: STATUS_ICONS[node.status] ?? "dot" }), statuses[node.status] ?? node.status]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "integration-promise",
								children: node.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "audience-chips",
								style: {
									justifyContent: "flex-start",
									marginBottom: 0
								},
								children: node.platforms.map((platform) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }), platform]
								}, platform))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "integration-outcomes",
								children: node.capabilities.map((capability) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: capability })] }, capability))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "node-details",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: labels.details ?? t("view_details") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "connect-hints",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.identity ?? t("panel_nodes_identity") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											style: { overflowWrap: "anywhere" },
											children: node.node_uri
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: labels.routes ?? "Kontrakt URI" }),
										node.routes.map((route) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											style: { overflowWrap: "anywhere" },
											children: route
										}, route))
									]
								})]
							}),
							offerActions(node)
						]
					}, node.id))
				}) : viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "node-list",
					children: filteredNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "node-list-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "node-list-main",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "integration-category",
										children: node.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "connect-head",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "integration-name",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: node.icon ?? "server" }), node.name]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `integration-status ${node.status}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: STATUS_ICONS[node.status] ?? "dot" }), statuses[node.status] ?? node.status]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "integration-promise",
										children: node.summary
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "node-list-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels.platforms ?? "Platformy" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.platforms.join(", ") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: labels.routes ?? "Kontrakt URI" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.routes.length })
								]
							}),
							offerActions(node)
						]
					}, node.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "table-scroll",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "compare-table node-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_node ?? "Node" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_status ?? "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.platforms ?? "Platformy" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.capabilities ?? t("panel_nodes_capabilities") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: labels.column_actions ?? "Akcje" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredNodes.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								scope: "row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: node.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "form-hint",
										children: node.category
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `integration-status ${node.status}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: STATUS_ICONS[node.status] ?? "dot" }), statuses[node.status] ?? node.status]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: node.platforms.join(", ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: node.capabilities.join(" · ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: offerActions(node) })
						] }, node.id)) })]
					})
				})
			})
		]
	});
}
var INITIAL_ACTORS = [
	{
		id: "act-01",
		principal: "human:founder",
		kind: "human",
		name: "Founder Administrator",
		role: "Super Admin (AQL Root)",
		status: "active",
		authProvider: "Subactor Direct Auth",
		createdAt: "2026-08-16 10:00"
	},
	{
		id: "act-02",
		principal: "bot:architecture-bot",
		kind: "bot",
		name: "Architecture Bot",
		role: "DSL & Infrastructure Auditor",
		status: "active",
		authProvider: "Control Key",
		createdAt: "2026-08-15 14:20"
	},
	{
		id: "act-03",
		principal: "bot:safety-operator-bot",
		kind: "bot",
		name: "Safety Operator Bot",
		role: "Guard & Remediation Containment",
		status: "active",
		authProvider: "Control Key",
		createdAt: "2026-08-14 09:15"
	},
	{
		id: "act-04",
		principal: "agent:validator-agent",
		kind: "agent",
		name: "Validator Agent",
		role: "Direct PR & Attestation Validation",
		status: "registered",
		authProvider: "OneDev Agent Token",
		createdAt: "2026-08-12 11:30"
	},
	{
		id: "act-05",
		principal: "agent:onedev-agent",
		kind: "agent",
		name: "OneDev PR Executor",
		role: "Git PR Workspace Executor",
		status: "registered",
		authProvider: "OneDev Agent Token",
		createdAt: "2026-08-10 16:45"
	},
	{
		id: "act-06",
		principal: "client:enterprise-partner",
		kind: "client",
		name: "Enterprise Partner Org",
		role: "External SaaS Client Identity",
		status: "active",
		authProvider: "OIDC Google SSO",
		createdAt: "2026-08-08 08:00"
	}
];
function IdentitiesSection({ session, providers = [], hosting }) {
	const [identityView, setIdentityView] = useSectionView("identities", [
		"cards",
		"table",
		"details",
		"add"
	]);
	const [actorsList, setActorsList] = (0, import_react.useState)(INITIAL_ACTORS);
	const [newPrincipal, setNewPrincipal] = (0, import_react.useState)("");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newKind, setNewKind] = (0, import_react.useState)("bot");
	const [newRole, setNewRole] = (0, import_react.useState)("System Operator");
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(actorsList), 3);
	const authProviders = providers && providers.length > 0 ? providers : hosting?.authProviders || [];
	const identityModes = [
		{
			id: "cards",
			label: "Karty Aktorów",
			icon: "cube",
			title: "Widok Kart Aktorów i Tożsamości"
		},
		{
			id: "table",
			label: "Tabela Aktorów & SSO",
			icon: "building",
			title: "Widok Tabeli Dostępów Aktorów"
		},
		{
			id: "details",
			label: "Szczegóły & Paszporty",
			icon: "shield",
			title: "Widok Szczegółowy Uprawnień"
		},
		{
			id: "add",
			label: "Dodaj Aktora",
			icon: "plus",
			title: "Formularz Rejestracji Nowego Aktora"
		}
	];
	const handleAddActor = (e) => {
		e.preventDefault();
		if (!newPrincipal.trim() || !newName.trim()) return;
		const created = {
			id: `act-${Date.now().toString().slice(-4)}`,
			principal: newPrincipal.trim(),
			name: newName.trim(),
			kind: newKind,
			role: newRole.trim() || "Operator Systemu",
			status: "active",
			authProvider: "Subactor Direct Auth",
			createdAt: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 16)
		};
		setActorsList([created, ...actorsList]);
		setNewPrincipal("");
		setNewName("");
		setIdentityView("cards");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "user",
						className: "icon-lg"
					}), "Aktorzy, Tożsamości i Dostęp SSO"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						"Zarządzaj aktorami systemu (Human, Bot, Agent), paszportami autoryzacji oraz federacją SSO w organizacji ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }),
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: identityModes,
					current: identityView,
					onChange: setIdentityView
				})]
			}),
			identityView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddActor,
				className: "panel-card",
				style: {
					marginTop: "1.5rem",
					marginBottom: "1.5rem",
					border: "1px solid var(--accent-primary)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "panel-card-title",
						style: { marginBottom: "1rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "user" }), " Rejestracja Nowego Aktora / Tożsamości (Top-Down Prepend)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-grid-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Identyfikator Principala (URI / ID)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "np. bot:metrics-collector",
									value: newPrincipal,
									onChange: (e) => setNewPrincipal(e.target.value),
									required: true,
									className: "form-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nazwa Aktora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "np. Metrics Collector Bot",
									value: newName,
									onChange: (e) => setNewName(e.target.value),
									required: true,
									className: "form-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Typ Aktora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newKind,
									onChange: (e) => setNewKind(e.target.value),
									className: "form-input",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "human",
											children: "Human (Użytkownik)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bot",
											children: "Bot (Autonomiczny)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "agent",
											children: "Agent (Wykonawca Workflow)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "client",
											children: "Client (SaaS Partner)"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-group",
						style: { marginTop: "0.75rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Rola i Uprawnienia AQL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "np. Metrics Reader & Audit Log Operator",
							value: newRole,
							onChange: (e) => setNewRole(e.target.value),
							className: "form-input"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							marginTop: "1rem",
							display: "flex",
							gap: "0.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn btn-sm btn-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), " Zarejestruj Aktora"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-sm btn-secondary",
							onClick: () => setIdentityView("cards"),
							children: "Anuluj"
						})]
					})
				]
			}),
			identityView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-grid-2",
					style: { marginBottom: "1.5rem" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "panel-card-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "user",
									className: "icon-lg"
								}), "Profil Zalogowanego Aktora"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "integration-status available",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), " Aktywna Sesja"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-facts",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Aktor sesyjny" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "human:founder" }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "E-mail autoryzacyjny" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: session.email || "admin@subactor.com" }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Organizacja SaaS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: session.tenant_slug }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Ważność sesji" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "24h (Automatyczne odnawianie)" })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "connect-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "panel-card-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "shield",
										className: "icon-lg"
									}), "Dostawcy Tożsamości SSO"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "integration-status available",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "dot" }), " Podłączone"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "form-hint",
								children: "Dostępne tożsamości federacyjne z serwisu identity (auth-subactor-com):"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "audience-chips",
								style: {
									justifyContent: "flex-start",
									marginTop: "0.5rem"
								},
								children: authProviders.length > 0 ? authProviders.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }),
										" ",
										p.label || p.id
									]
								}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "chip",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), " Subactor Direct Identity"]
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "panel-section-title",
					style: { marginBottom: "1rem" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "users" }),
						" Lista Zarejestrowanych Aktorów Systemowych (",
						actorsList.length,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-grid-3",
					children: visibleItems.map((actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-head",
							style: { marginBottom: "0.5rem" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "panel-card-title",
								style: { fontSize: "1rem" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: actor.kind === "human" ? "user" : actor.kind === "bot" ? "cpu" : "server" }), actor.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill status-${actor.status === "active" ? "ok" : "warn"}`,
								children: actor.status.toUpperCase()
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-facts",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Principal URI" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: actor.principal }) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Typ Aktorstwa" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge badge-info",
										children: actor.kind
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rola i Zakres" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: actor.role })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "card-fact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Dostawca Auth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: actor.authProvider }) })]
								})
							]
						})]
					}, actor.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
					visibleCount,
					totalCount,
					hasMore,
					loadMore
				})
			] }),
			identityView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-card panel-card-wide",
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: { width: "100%" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Principal URI" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nazwa Aktora" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Typ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rola & Uprawnienia" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Dostawca Auth" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((actor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: actor.principal }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: actor.name }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-info",
							children: actor.kind
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: actor.role }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: actor.authProvider }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill status-${actor.status === "active" ? "ok" : "warn"}`,
							children: actor.status
						}) })
					] }, actor.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				visibleCount,
				totalCount,
				hasMore,
				loadMore
			})] }),
			identityView === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "shield",
						className: "icon-lg"
					}), " Szczegółowy Wykaz Uprawnień & Bezpieczeństwa Aktorów"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connect-hints",
					style: { marginTop: "1rem" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Najemca (Tenant Slug)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: session.tenant_slug }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Rola Konta Głównego" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "ADMINISTRATOR_SYSTEMU (AQL Root)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Autentykacja Aktorów Bot & Agent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "Control Key HMAC-SHA256 & Verification Tokens" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Aktywne Tożsamości w Systemie" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [actorsList.length, " zarejestrowanych principali"] })
					]
				})]
			})
		]
	});
}
var INITIAL_TWINS = [
	{
		id: "twin-01",
		name: "PayPal Billing Twin",
		kind: "Płatności & Rozliczenia",
		endpoint: "http://127.0.0.1:8793/v1/billing",
		allowance: "1 000 / 1 000 akcji/m-c",
		status: "active",
		description: "Cyfrowy bliźniak rozliczeniowy do automatycznej weryfikacji płatności PayPal i subskrypcji."
	},
	{
		id: "twin-02",
		name: "LLM Account Hub Twin",
		kind: "Zarządzanie sesjami AI noVNC",
		endpoint: "Porty :6083 / :6081",
		allowance: "Nieograniczony (noVNC)",
		status: "active",
		description: "Cyfrowy bliźniak zarządzania kontami LLM (Google, ChatGPT, Anthropic) w kontenerach noVNC."
	},
	{
		id: "twin-03",
		name: "Allegro & Subiekt ERP Twin",
		kind: "Magazyn & Obsługa Zamówień",
		endpoint: "urirun-connector-subactor",
		allowance: "500 / 500 akcji/m-c",
		status: "initializing",
		description: "Cyfrowy bliźniak zapasów magazynowych oraz automatyzacji dispatchingu zamówień."
	}
];
function DigitalTwinsSection({ session, hosting }) {
	const [twinView, setTwinView] = useSectionView("twins", [
		"cards",
		"table",
		"grid",
		"add"
	]);
	const [twins, setTwins] = (0, import_react.useState)(INITIAL_TWINS);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newKind, setNewKind] = (0, import_react.useState)("Proces Biznesowy & API");
	const [newEndpoint, setNewEndpoint] = (0, import_react.useState)("http://127.0.0.1:8795/v1/twin");
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(twins), 2);
	const twinModes = [
		{
			id: "cards",
			label: "Karty",
			icon: "cube",
			title: "Widok Kart Bliźniaków"
		},
		{
			id: "table",
			label: "Tabela",
			icon: "building",
			title: "Widok Tabeli Bliźniaków"
		},
		{
			id: "grid",
			label: "Siatka Statusowa",
			icon: "kanban",
			title: "Widok Siatki Statusowej"
		},
		{
			id: "add",
			label: "Dodaj Bliźniaka",
			icon: "plus",
			title: "Formularz Rejestracji Nowego Bliźniaka Cyfrowego"
		}
	];
	const handleAddTwin = (e) => {
		e.preventDefault();
		if (!newName.trim()) return;
		const created = {
			id: `twin-${Date.now().toString().slice(-4)}`,
			name: newName.trim(),
			kind: newKind.trim() || "Proces Biznesowy",
			endpoint: newEndpoint.trim() || "http://127.0.0.1:8795/v1/twin",
			allowance: "1 000 / 1 000 akcji/m-c",
			status: "active",
			description: `Nowo zarejestrowany bliźniak cyfrowy dla organizacji ${session.tenant_slug}.`
		};
		setTwins([created, ...twins]);
		setNewName("");
		setTwinView("cards");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "cube",
						className: "icon-lg"
					}), "Aktywne Bliźniaki Cyfrowe (Digital Twins)"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: "Każdy cyfrowy bliźniak reprezentuje aktywne urządzenie lub proces biznesowy z odnawialnym pakietem zweryfikowanych akcji miesięcznie."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: twinModes,
					current: twinView,
					onChange: setTwinView
				})]
			}),
			twinView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddTwin,
				className: "panel-card",
				style: {
					marginTop: "1.5rem",
					marginBottom: "1.5rem",
					border: "1px solid var(--accent-primary)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "panel-card-title",
						style: { marginBottom: "1rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }), " Rejestracja Bliźniaka Cyfrowego (Top-Down Prepend)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-grid-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Nazwa Bliźniaka" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "np. ERP Sales Twin",
									value: newName,
									onChange: (e) => setNewName(e.target.value),
									required: true,
									className: "form-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Typ Usługi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "np. Finanse / ERP",
									value: newKind,
									onChange: (e) => setNewKind(e.target.value),
									className: "form-input"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Endpoint / Kanał CQRS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "http://127.0.0.1:8795/v1/twin",
									value: newEndpoint,
									onChange: (e) => setNewEndpoint(e.target.value),
									className: "form-input"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							marginTop: "1rem",
							display: "flex",
							gap: "0.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn btn-sm btn-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), " Zarejestruj Bliźniaka"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-sm btn-secondary",
							onClick: () => setTwinView("cards"),
							children: "Anuluj"
						})]
					})
				]
			}),
			twinView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "connect-grid",
				children: visibleItems.map((twin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `connect-card ${twin.status === "active" ? "is-connected" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "integration-name",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }),
									" ",
									twin.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `integration-status ${twin.status === "active" ? "available" : "pilot"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: twin.status === "active" ? "checkCircle" : "clock" }),
									" ",
									twin.status.toUpperCase()
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "integration-promise",
							children: twin.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-hints",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Typ Usługi" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: twin.kind }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Endpoint / CQRS" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: twin.endpoint }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pakiet akcji" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: twin.allowance })
							]
						})
					]
				}, twin.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				visibleCount,
				totalCount,
				hasMore,
				loadMore
			})] }),
			twinView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-card panel-card-wide",
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: { width: "100%" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nazwa Cyfrowego Bliźniaka" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Typ Usługi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Endpoint / Kanał CQRS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Pakiet Akcji" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((twin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: twin.name }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: twin.kind }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: twin.endpoint }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: twin.allowance }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill status-${twin.status === "active" ? "ok" : "proc"}`,
							children: twin.status.toUpperCase()
						}) })
					] }, twin.id)) })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				visibleCount,
				totalCount,
				hasMore,
				loadMore
			})] }),
			twinView === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
					gap: "1rem"
				},
				children: visibleItems.map((twin) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: "var(--bg-secondary)",
						padding: "1rem",
						borderRadius: "10px",
						border: "1px solid var(--border-color)",
						display: "flex",
						flexDirection: "column",
						gap: "0.5rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: twin.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${twin.status === "active" ? "status-ok" : "status-proc"}`,
							children: twin.status.toUpperCase()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.85rem",
							color: "var(--text-muted)",
							margin: 0
						},
						children: twin.description
					})]
				}, twin.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				visibleCount,
				totalCount,
				hasMore,
				loadMore
			})] })
		]
	});
}
function SubactorUserTokensCard({ session, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-card panel-card-wide",
		style: { marginTop: "1rem" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "connect-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "key",
						className: "icon-lg"
					}), t("panel_account_api_title", { tenant: session.tenant_slug })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "integration-status pilot",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shield" }),
						" ",
						t("panel_account_api_status")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "billing-hint",
				children: t("panel_account_api_note")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "panel-next-steps",
				"aria-label": t("panel_account_api_steps_label"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("panel_account_api_step_permissions") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("panel_account_api_step_ticket") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t("panel_account_api_step_issue") })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-actions",
				style: { marginTop: "1rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn-primary",
					onClick: () => onNavigate("uri-permissions"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shield" }),
						" ",
						t("panel_account_api_permissions_cta")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn-secondary",
					onClick: () => onNavigate("chat"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cpu" }),
						" ",
						t("panel_account_api_chat_cta")
					]
				})]
			})
		]
	});
}
function LanguageCard({ locale, locales, localeLabels }) {
	const codes = locales && locales.length > 0 ? locales : [
		"pl",
		"en",
		"de"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-card-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "user",
					className: "icon-lg"
				}), t("panel_config_language")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "form-label",
				htmlFor: "panel-config-lang",
				children: t("panel_config_language")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "panel-config-lang",
				className: "form-input",
				value: locale ?? "pl",
				"aria-label": t("panel_config_language"),
				onChange: (e) => {
					const url = new URL(window.location.href);
					url.searchParams.set("lang", e.target.value);
					window.location.href = url.toString();
				},
				children: codes.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: code,
					children: localeLabels?.[code] ?? code.toUpperCase()
				}, code))
			})
		]
	});
}
function PaymentSettingsSection({ displayCurrency, supportedCurrencies, onCurrencyChange, connections, integrations }) {
	const linked = integrations.filter((item) => {
		if (!connections[item.id]) return false;
		const hay = `${item.id} ${item.name}`.toLowerCase();
		return /pay|paypal|stripe|przelewy|billing|faktura/.test(hay);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "item-section-toolbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-section-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("panel_nav_payment_settings")]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-grid",
			style: { marginTop: "1rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "panel-card-title",
						children: t("panel_payset_currency")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "form-label",
						htmlFor: "panel-payset-currency",
						children: t("currency_label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "panel-payset-currency",
						className: "form-input",
						value: displayCurrency,
						"aria-label": t("currency_label"),
						onChange: (event) => onCurrencyChange(event.target.value),
						children: supportedCurrencies.map((currency) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: currency,
							children: currency
						}, currency))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						style: { marginTop: "0.6rem" },
						children: t("panel_payset_currency_hint")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "panel-card-title",
					children: t("panel_payset_linked")
				}), linked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-hint",
					children: t("panel_payset_linked_empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "token-list",
					children: linked.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "token-item",
						children: item.name
					}, item.id))
				})]
			})]
		})]
	});
}
function SubscriptionsSection({ session, plans, hosting }) {
	const plan = plans.find((item) => item.id === session.plan);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "item-section-toolbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-section-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkSquare" }), t("panel_nav_subscriptions")]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-grid",
			style: { marginTop: "1rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "panel-card-title",
					children: t("panel_subs_current")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "card-facts",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_plan") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan?.name ?? session.plan ?? "-" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-fact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: t("acct_org") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: session.tenant_slug })]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "panel-card-title",
						children: t("panel_subs_planned")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						children: plan ? t("panel_subs_planned_note", { plan: plan.name ?? session.plan ?? "-" }) : t("panel_subs_planned_empty")
					}),
					hosting.subdomain && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "form-hint",
						children: t("panel_subs_hosting", { host: hosting.subdomain })
					})
				]
			})]
		})]
	});
}
function PaymentsSection({ events }) {
	const paymentEvents = events.filter((event) => /pay|invoice|charge|billing/i.test(event.event_type));
	const arrears = paymentEvents.filter((event) => /fail|overdue|zaleg|unpaid|deny/i.test(event.event_type));
	const completed = paymentEvents.filter((event) => !arrears.includes(event));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "item-section-toolbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "panel-section-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }), t("panel_nav_payments")]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-grid",
			style: { marginTop: "1rem" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "panel-card-title",
					children: t("panel_pay_arrears")
				}), arrears.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-hint",
					children: t("panel_pay_arrears_empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsCard, { events: arrears })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "panel-card-title",
					children: t("panel_pay_completed")
				}), completed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "form-hint",
					children: t("panel_pay_completed_empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsCard, { events: completed })]
			})]
		})]
	});
}
function LlmTokensSection({ session }) {
	const [endpoints, setEndpoints] = (0, import_react.useState)([]);
	const [newName, setNewName] = (0, import_react.useState)("default");
	const [newType, setNewType] = (0, import_react.useState)("openai");
	const [newUrl, setNewUrl] = (0, import_react.useState)("http://localhost:11434");
	const [ticketId, setTicketId] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const loadCredentials = async (clearNotice = true) => {
		setLoading(true);
		try {
			const response = await fetch("/api/llm-credentials", { credentials: "same-origin" });
			const data = await response.json();
			if (!response.ok) throw new Error(data.error || "llm_credentials_load_failed");
			setEndpoints(Array.isArray(data.credentials) ? data.credentials : []);
			if (clearNotice) setNotice(null);
		} catch (error) {
			setNotice(`${t("panel_llm_load_failed")}: ${error instanceof Error ? error.message : "unknown_error"}`);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadCredentials();
	}, []);
	const handleTypeChange = (type) => {
		setNewType(type);
		if (type === "ollama") setNewUrl("http://localhost:11434");
		else if (type === "custom_proxy") setNewUrl("https://llm.example.com/v1");
		else setNewUrl("");
	};
	const handleAdd = async (e) => {
		e.preventDefault();
		const popup = newType === "ollama" ? null : window.open("about:blank", "_blank", "noopener,noreferrer");
		setSaving(true);
		try {
			const response = await fetch("/api/llm-credentials", {
				method: "POST",
				credentials: "same-origin",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					provider: newType,
					credential_name: newName.trim(),
					endpoint: newUrl.trim(),
					ticket_id: ticketId.trim()
				})
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.error || "llm_credential_save_failed");
			if (data.submission_url) {
				if (popup) popup.location.replace(data.submission_url);
				else window.location.assign(data.submission_url);
				setNotice(t("panel_llm_vault_opened"));
			} else {
				popup?.close();
				setNotice(t("panel_llm_saved"));
			}
			setLlmView("cards");
			await loadCredentials(false);
		} catch (error) {
			popup?.close();
			setNotice(`${t("panel_llm_save_failed")}: ${error instanceof Error ? error.message : "unknown_error"}`);
		} finally {
			setSaving(false);
		}
	};
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(endpoints), 2);
	const editEndpoint = (endpoint) => {
		setNewType(endpoint.provider);
		setNewName(endpoint.credential_name);
		setNewUrl(endpoint.endpoint);
		setTicketId(endpoint.ticket_id);
		setLlmView("add");
	};
	const [llmView, setLlmView] = useSectionView("llm", [
		"cards",
		"table",
		"add"
	]);
	const llmModes = [
		{
			id: "cards",
			label: t("view_cards"),
			icon: "cube",
			title: t("panel_llm_view_cards_title")
		},
		{
			id: "table",
			label: t("view_table"),
			icon: "building",
			title: t("panel_llm_view_table_title")
		},
		{
			id: "add",
			label: t("panel_llm_add"),
			icon: "plus",
			title: t("panel_llm_add_title")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "cpu",
						className: "icon-lg"
					}), t("panel_llm_title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						t("panel_llm_subtitle"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: llmModes,
					current: llmView,
					onChange: setLlmView
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-info",
				role: "status",
				style: { marginBottom: "1rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }),
					" ",
					notice
				]
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-card",
				children: t("panel_llm_loading")
			}),
			!loading && endpoints.length === 0 && llmView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card empty-state",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: t("panel_llm_empty_title") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("panel_llm_empty_note") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn-primary",
						onClick: () => setLlmView("add"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }),
							" ",
							t("panel_llm_add")
						]
					})
				]
			}),
			llmView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "connect-grid",
				style: { marginBottom: "1rem" },
				children: visibleItems.map((ep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `connect-card ${ep.status === "ready" ? "is-connected" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "integration-name",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ep.provider === "ollama" ? "shield" : "cpu" }),
									ep.provider,
									" · ",
									ep.credential_name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `integration-status ${ep.status === "ready" ? "available" : "planned"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: ep.status === "ready" ? "checkCircle" : "clock" }), t(`panel_llm_status_${ep.status}`)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-hints",
							style: { marginTop: "0.8rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("panel_llm_endpoint") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ep.endpoint }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("panel_llm_ticket") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ep.ticket_id }),
								ep.fingerprint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("panel_llm_fingerprint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ep.fingerprint })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: "1rem",
								paddingTop: "0.75rem",
								borderTop: "1px solid var(--border-color)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-secondary",
								onClick: () => editEndpoint(ep),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }),
									" ",
									ep.provider === "ollama" ? t("panel_llm_edit") : t("panel_llm_rotate")
								]
							})
						})
					]
				}, ep.id))
			}),
			llmView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					overflowX: "auto",
					marginBottom: "1rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: { width: "100%" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_llm_provider") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_llm_credential_name") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_llm_endpoint") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_llm_ticket") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_status") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_actions") })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((ep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-info",
							children: ep.provider
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: ep.credential_name }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ep.endpoint }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: ep.ticket_id }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${ep.status === "ready" ? "status-ok" : "status-proc"}`,
							children: t(`panel_llm_status_${ep.status}`)
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-secondary",
							onClick: () => editEndpoint(ep),
							children: ep.provider === "ollama" ? t("panel_llm_edit") : t("panel_llm_rotate")
						}) })
					] }, ep.id)) })]
				})
			}),
			llmView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plus",
						className: "icon-lg"
					}), t("panel_llm_form_title")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAdd,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: t("panel_llm_credential_name")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "form-input",
								placeholder: "default",
								pattern: "[a-z0-9][a-z0-9-]{0,47}",
								value: newName,
								onChange: (e) => setNewName(e.target.value),
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_llm_provider")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "form-input",
										value: newType,
										onChange: (e) => handleTypeChange(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "openai",
												children: "OpenAI"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "anthropic",
												children: "Anthropic"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "openrouter",
												children: "OpenRouter"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "zai",
												children: "Z.AI"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cursor",
												children: "Cursor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "custom_proxy",
												children: t("panel_llm_provider_custom")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "ollama",
												children: "Ollama"
											})
										]
									})]
								}),
								(newType === "custom_proxy" || newType === "ollama") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_llm_endpoint")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "url",
										className: "form-input",
										placeholder: newType === "ollama" ? "http://127.0.0.1:11434" : "https://llm.example.com/v1",
										value: newUrl,
										onChange: (e) => setNewUrl(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_llm_ticket")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "PLF-1234",
										pattern: "PLF-[0-9]+",
										value: ticketId,
										onChange: (e) => setTicketId(e.target.value),
										required: true
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "billing-hint",
							children: newType === "ollama" ? t("panel_llm_ollama_note") : t("panel_llm_vault_note")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "btn-primary",
								disabled: saving,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: newType === "ollama" ? "checkCircle" : "key" }), saving ? t("panel_llm_saving") : newType === "ollama" ? t("panel_llm_save_ollama") : t("panel_llm_open_vault")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-secondary",
								onClick: () => setLlmView("cards"),
								children: t("cancel")
							})]
						})
					]
				})]
			}),
			llmView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			})
		]
	});
}
var INITIAL_HOSTS = [
	{
		id: "hst-vps-01",
		name: "Hetzner Cloud VPS #01",
		type: "vps",
		ip: "65.109.12.84",
		os: "Ubuntu 24.04 LTS x86_64",
		cpu: "4 vCPU (AMD EPYC)",
		ram: "16 GB RAM",
		status: "online",
		tags: [
			"vps",
			"production",
			"runner"
		],
		lastSeen: "panel_time_just_now"
	},
	{
		id: "hst-rpi-04",
		name: "Raspberry Pi 4 Model B (Node #01)",
		type: "rpi",
		ip: "192.168.1.140",
		os: "Raspbian Bookworm (ARM64)",
		cpu: "4x Cortex-A72 @ 1.5GHz",
		ram: "8 GB LPDDR4",
		status: "online",
		tags: [
			"rpi",
			"edge-device",
			"iot"
		],
		lastSeen: "panel_time_2_minutes_ago"
	},
	{
		id: "hst-bm-02",
		name: "Bare-Metal Server AX41-NVMe",
		type: "dedicated",
		ip: "135.181.90.12",
		os: "Debian 12 Bookworm",
		cpu: "Ryzen 5 3600 (6c/12t)",
		ram: "64 GB DDR4 ECC",
		status: "online",
		tags: [
			"bare-metal",
			"ollama-host",
			"ai-inference"
		],
		lastSeen: "panel_time_5_minutes_ago"
	}
];
function HostsSection({ session }) {
	const [hosts, setHosts] = (0, import_react.useState)(INITIAL_HOSTS);
	const [selectedHostId, setSelectedHostIdState] = (0, import_react.useState)(() => getUrlParam("host") || null);
	const selectedHostRef = (0, import_react.useRef)(selectedHostId);
	selectedHostRef.current = selectedHostId;
	const [hostView, setHostView] = useSectionView("hosts", [
		"cards",
		"table",
		"grid",
		"add"
	], (v) => updatePanelUrl({
		tab: "hosts",
		view: v,
		host: selectedHostRef.current
	}));
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newType, setNewType] = (0, import_react.useState)("vps");
	const [newIp, setNewIp] = (0, import_react.useState)("");
	const [newOs, setNewOs] = (0, import_react.useState)("Ubuntu 24.04 LTS");
	const [newCpu, setNewCpu] = (0, import_react.useState)("2 vCPU");
	const [newRam, setNewRam] = (0, import_react.useState)("8 GB RAM");
	const [newTags, setNewTags] = (0, import_react.useState)("");
	const [copiedToken, setCopiedToken] = (0, import_react.useState)(null);
	const setSelectedHostId = (id) => {
		setSelectedHostIdState(id);
		updatePanelUrl({
			tab: "hosts",
			view: hostView,
			host: id,
			project: null,
			org: null
		});
	};
	const handleAddHost = (e) => {
		e.preventDefault();
		if (!newName.trim() || !newIp.trim()) return;
		const created = {
			id: `hst-${Math.random().toString(36).substring(2, 9)}`,
			name: newName.trim(),
			type: newType,
			ip: newIp.trim(),
			os: newOs.trim() || "Linux Server",
			cpu: newCpu.trim() || "2 vCPU",
			ram: newRam.trim() || "4 GB RAM",
			status: "provisioning",
			tags: newTags ? newTags.split(",").map((t) => t.trim()).filter(Boolean) : ["custom-host"],
			lastSeen: "panel_hosts_waiting_agent"
		};
		setHosts([created, ...hosts]);
		setNewName("");
		setNewIp("");
		setNewTags("");
		setHostView("cards");
	};
	const deleteHost = (id) => {
		setHosts(hosts.filter((h) => h.id !== id));
	};
	const typeLabels = {
		vps: {
			label: t("panel_hosts_type_vps"),
			badge: "badge-info"
		},
		rpi: {
			label: t("panel_hosts_type_rpi"),
			badge: "badge-success"
		},
		dedicated: {
			label: t("panel_hosts_type_dedicated"),
			badge: "badge-warning"
		},
		cloud: {
			label: t("panel_hosts_type_cloud"),
			badge: "badge-info"
		}
	};
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(hosts), 2);
	const selectedHost = hosts.find((h) => h.id === selectedHostId) ?? null;
	const hostModes = [
		{
			id: "cards",
			label: t("view_cards"),
			icon: "cube",
			title: t("panel_hosts_view_cards_title")
		},
		{
			id: "table",
			label: t("view_table"),
			icon: "building",
			title: t("panel_hosts_view_table_title")
		},
		{
			id: "grid",
			label: t("panel_hosts_view_grid"),
			icon: "kanban",
			title: t("panel_hosts_view_grid_title")
		},
		{
			id: "add",
			label: t("panel_hosts_add"),
			icon: "plus",
			title: t("panel_hosts_add_title")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "hardDrive",
						className: "icon-lg"
					}), t("panel_hosts_title", { count: hosts.length })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [t("panel_hosts_subtitle", { tenant: session.tenant_slug }), selectedHost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" · ",
						t("panel_hosts_selected"),
						": ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedHost.name })
					] }) : null]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: hostModes,
					current: hostView,
					onChange: setHostView
				})]
			}),
			selectedHost && hostView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-card",
				style: {
					marginTop: "1rem",
					border: "1px solid var(--accent-primary)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						gap: "1rem",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "panel-card-title",
							style: { marginBottom: "0.35rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "hardDrive" }),
								" ",
								selectedHost.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "section-sub",
							style: { margin: 0 },
							children: [
								selectedHost.ip,
								" · ",
								selectedHost.os,
								" · ",
								selectedHost.cpu,
								" / ",
								selectedHost.ram
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								marginTop: "0.5rem",
								display: "flex",
								gap: "0.35rem",
								flexWrap: "wrap"
							},
							children: selectedHost.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-info",
								children: tag
							}, tag))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-sm btn-secondary",
						onClick: () => setSelectedHostId(null),
						children: t("close_details")
					})]
				})
			}),
			hostView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((host) => {
					const meta = typeLabels[host.type] ?? {
						label: host.type.toUpperCase(),
						badge: "badge-info"
					};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "token-item",
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "0.75rem",
							padding: "1.2rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "0.75rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "brand-mark",
									style: {
										width: "36px",
										height: "36px",
										borderRadius: "8px",
										background: "rgba(99,102,241,0.15)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "hardDrive",
										className: "icon-lg"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: {
										fontSize: "1.05rem",
										color: "var(--text-primary)"
									},
									children: host.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.85rem",
										color: "var(--text-muted)",
										marginTop: "0.2rem"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: host.ip }),
										" • ",
										host.os
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "0.5rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `badge ${meta.badge}`,
									children: meta.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `status-pill ${host.status === "online" ? "status-ok" : host.status === "provisioning" ? "status-proc" : "status-err"}`,
									children: t(`panel_status_${host.status}`)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
								gap: "1rem",
								paddingTop: "0.75rem",
								borderTop: "1px solid var(--border-color)",
								fontSize: "0.88rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: "1.5rem",
									color: "var(--text-secondary)",
									flexWrap: "wrap"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "CPU:" }),
										" ",
										host.cpu
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RAM:" }),
										" ",
										host.ram
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [t("panel_hosts_last_active"), ":"] }),
										" ",
										t(host.lastSeen)
									] })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "0.5rem"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "btn-secondary",
										style: {
											fontSize: "0.85rem",
											padding: "0.4rem 0.75rem"
										},
										onClick: () => setSelectedHostId(host.id),
										title: t("panel_hosts_details_title"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "hardDrive" }),
											" ",
											t("view_details")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "btn-secondary",
										style: {
											fontSize: "0.85rem",
											padding: "0.4rem 0.75rem"
										},
										onClick: () => {
											const cmd = `curl -sSL https://get.subactor.io/agent.sh | sh -s -- --tenant=${session.tenant_slug} --host=${host.id}`;
											navigator.clipboard?.writeText(cmd);
											setCopiedToken(host.id);
											setTimeout(() => setCopiedToken(null), 2500);
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "terminal" }),
											" ",
											copiedToken === host.id ? t("panel_hosts_agent_copied") : t("panel_hosts_agent_command")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn-secondary",
										style: {
											color: "#ef4444",
											padding: "0.4rem 0.75rem"
										},
										onClick: () => deleteHost(host.id),
										title: t("panel_hosts_delete"),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "trash" })
									})
								]
							})]
						})]
					}, host.id);
				})
			}),
			hostView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "table-scroll",
				style: { marginTop: "1.5rem" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					"aria-label": t("panel_hosts_table_label"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_hosts_column_host") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_hosts_column_type") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_hosts_column_resources") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_status") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("panel_hosts_last_active") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("view_col_actions") })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((host) => {
						const meta = typeLabels[host.type] ?? {
							label: host.type.toUpperCase(),
							badge: "badge-info"
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: host.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: host.ip }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: host.os })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `badge ${meta.badge}`,
								children: meta.label
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								host.cpu,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								host.ram
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${host.status === "online" ? "status-ok" : host.status === "provisioning" ? "status-proc" : "status-err"}`,
								children: t(`panel_status_${host.status}`)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t(host.lastSeen) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn btn-sm btn-secondary",
								onClick: () => setSelectedHostId(host.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "hardDrive" }),
									" ",
									t("view_details")
								]
							}) })
						] }, host.id);
					}) })]
				})
			}),
			hostView === "grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "metrics-grid",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((host) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "metric-card host-status-card",
					onClick: () => setSelectedHostId(host.id),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${host.status === "online" ? "status-ok" : host.status === "provisioning" ? "status-proc" : "status-err"}`,
							children: t(`panel_status_${host.status}`)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: host.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: host.ip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t(host.lastSeen) })
					]
				}, host.id))
			}),
			hostView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			}),
			copiedToken && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-success",
				style: {
					marginTop: "1.25rem",
					padding: "1rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "check" }),
						" ",
						t("panel_hosts_install_command_title")
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-toggle",
						style: { padding: "0.2rem 0.5rem" },
						onClick: () => setCopiedToken(null),
						children: t("close")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
					style: {
						background: "rgba(0,0,0,0.4)",
						padding: "0.6rem 0.8rem",
						borderRadius: "6px",
						fontSize: "0.88rem",
						wordBreak: "break-all"
					},
					children: [
						"curl -sSL https://get.subactor.io/agent.sh | sh -s -- --tenant=",
						session.tenant_slug,
						" --token ",
						copiedToken
					]
				})]
			}),
			hostView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "plus",
							className: "icon-lg"
						}),
						" ",
						t("panel_hosts_form_title")
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAddHost,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: t("panel_hosts_form_name_placeholder"),
										value: newName,
										onChange: (e) => setNewName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_type")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "form-input",
										value: newType,
										onChange: (e) => setNewType(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "vps",
												children: t("panel_hosts_type_vps")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "rpi",
												children: t("panel_hosts_type_rpi")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "dedicated",
												children: t("panel_hosts_type_dedicated")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cloud",
												children: t("panel_hosts_type_cloud")
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_address")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: t("panel_hosts_form_address_placeholder"),
										value: newIp,
										onChange: (e) => setNewIp(e.target.value),
										required: true
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_os")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "Ubuntu 24.04 LTS / Raspbian / Debian 12",
										value: newOs,
										onChange: (e) => setNewOs(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_cpu")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: t("panel_hosts_form_cpu_placeholder"),
										value: newCpu,
										onChange: (e) => setNewCpu(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: t("panel_hosts_form_ram")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: t("panel_hosts_form_ram_placeholder"),
										value: newRam,
										onChange: (e) => setNewRam(e.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: t("panel_hosts_form_tags")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "form-input",
								placeholder: t("panel_hosts_form_tags_placeholder"),
								value: newTags,
								onChange: (e) => setNewTags(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "btn-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }),
									" ",
									t("panel_hosts_form_submit")
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-secondary",
								onClick: () => setHostView("cards"),
								children: t("cancel")
							})]
						})
					]
				})]
			})
		]
	});
}
var INITIAL_TASKS = [
	{
		id: "TSK-8921",
		title: "Allegro Sync & Stock Reconciliation",
		twin: "Twin-Allegro-Pro",
		host: "Hetzner Cloud VPS #01",
		node: "Node #01 (RPi 4)",
		status: "running",
		priority: "HIGH",
		startedAt: "Dzisiaj, 13:10:05",
		duration: "1m 42s"
	},
	{
		id: "TSK-8920",
		title: "Subiekt ERP Automated Order Dispatch",
		twin: "Twin-Subiekt-ERP",
		host: "Bare-Metal AX41-NVMe",
		node: "Worker Node #03",
		status: "completed",
		priority: "CRITICAL",
		startedAt: "Dzisiaj, 12:45:00",
		duration: "3.1 ms"
	},
	{
		id: "TSK-8919",
		title: "CyberMysz Sensor Data Aggregation",
		twin: "Twin-IoT-CyberMysz",
		host: "Raspberry Pi 4 Model B",
		node: "CyberMysz Node #02",
		status: "completed",
		priority: "NORMAL",
		startedAt: "Dzisiaj, 12:30:12",
		duration: "450 ms"
	},
	{
		id: "TSK-8918",
		title: "Ollama Privacy Reasoning & Summarization",
		twin: "Twin-AI-Assistant",
		host: "Bare-Metal AX41-NVMe",
		node: "Ollama Host RTX",
		status: "running",
		priority: "HIGH",
		startedAt: "Dzisiaj, 13:15:30",
		duration: "12s"
	},
	{
		id: "TSK-8917",
		title: "Webhooks Dispatch & Retry Queue",
		twin: "Twin-Webhooks-Broker",
		host: "Hetzner Cloud VPS #01",
		node: "Node #01 (RPi 4)",
		status: "pending",
		priority: "NORMAL",
		startedAt: "Zaplanowano na 13:30:00",
		duration: "-"
	}
];
function TasksSection({ session }) {
	const [tasks, setTasks] = (0, import_react.useState)(INITIAL_TASKS);
	const [taskView, setTaskView] = useSectionView("tasks", [
		"kanban",
		"cards",
		"table",
		"timeline",
		"add"
	]);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newTwin, setNewTwin] = (0, import_react.useState)("Twin-Allegro-Pro");
	const [newPriority, setNewPriority] = (0, import_react.useState)("NORMAL");
	const handleCreateTask = (e) => {
		e.preventDefault();
		if (!newTitle.trim()) return;
		const newTask = {
			id: `TSK-${Math.floor(1e3 + Math.random() * 9e3)}`,
			title: newTitle.trim(),
			twin: newTwin,
			host: "Hetzner Cloud VPS #01",
			node: "Node #01 (RPi 4)",
			status: "pending",
			priority: newPriority,
			startedAt: "Przed chwilą",
			duration: "0s"
		};
		setTasks([newTask, ...tasks]);
		setNewTitle("");
		setTaskView("kanban");
	};
	const statusBadge = (s) => {
		switch (s) {
			case "running": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "status-pill status-proc",
				children: "RUNNING"
			});
			case "completed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "status-pill status-ok",
				children: "COMPLETED"
			});
			case "pending": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "status-pill",
				style: {
					background: "rgba(234,179,8,0.2)",
					color: "#eab308"
				},
				children: "PENDING"
			});
			case "failed": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "status-pill status-err",
				children: "FAILED"
			});
		}
	};
	const priorityBadge = (p) => {
		switch (p) {
			case "CRITICAL": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "badge badge-warning",
				style: {
					background: "rgba(239,68,68,0.2)",
					color: "#ef4444"
				},
				children: "CRITICAL"
			});
			case "HIGH": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "badge badge-warning",
				children: "HIGH"
			});
			case "NORMAL": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "badge badge-info",
				children: "NORMAL"
			});
		}
	};
	const filteredTasks = usePanelFilteredItems(tasks);
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(filteredTasks, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "checkSquare",
							className: "icon-lg"
						}),
						"Centrum Zadań & Wykonań Automatyzacji (",
						tasks.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						"Monitoruj i uruchamiaj zadania realizowane przez Cyfrowe Bliźniaki na powiązanych Hostach i Node'ach dla najemcy ",
						session.tenant_slug,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: [
						{
							id: "kanban",
							label: "Kanban",
							icon: "kanban",
							title: "Widok Tablicy Execution Kanban"
						},
						{
							id: "cards",
							label: "Karty",
							icon: "cube",
							title: "Widok Kart Zadań"
						},
						{
							id: "table",
							label: "Tabela",
							icon: "building",
							title: "Widok Tabeli Zadań"
						},
						{
							id: "timeline",
							label: "Timeline",
							icon: "clock",
							title: "Widok Osi Czasu (Timeline)"
						},
						{
							id: "add",
							label: "Nowe Zadanie",
							icon: "plus",
							title: "Formularz Utworzenia Nowego Zadania Execution"
						}
					],
					current: taskView,
					onChange: setTaskView
				})]
			}),
			taskView === "kanban" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
					gap: "1rem",
					marginTop: "1.5rem"
				},
				children: [
					"pending",
					"running",
					"completed"
				].map((columnStatus) => {
					const colTasks = filteredTasks.filter((t) => t.status === columnStatus);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "var(--bg-secondary)",
							borderRadius: "10px",
							padding: "1rem",
							border: "1px solid var(--border-color)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "1rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { fontSize: "0.95rem" },
								children: {
									pending: "Oczekujące / Zaplanowane",
									running: "W trakcie wykonywania",
									completed: "Zakończone sukcesem"
								}[columnStatus]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-info",
								children: colTasks.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "0.75rem"
							},
							children: colTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "var(--bg-card)",
									padding: "0.85rem",
									borderRadius: "8px",
									border: "1px solid var(--border-color)",
									display: "flex",
									flexDirection: "column",
									gap: "0.5rem"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
											style: {
												fontSize: "0.8rem",
												color: "var(--text-muted)"
											},
											children: t.id
										}), priorityBadge(t.priority)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: {
											fontSize: "0.95rem",
											color: "var(--text-primary)"
										},
										children: t.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "0.82rem",
											color: "var(--text-secondary)"
										},
										children: ["🤖 ", t.twin]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "0.8rem",
											color: "var(--text-muted)"
										},
										children: ["🖥️ ", t.host]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
											marginTop: "0.25rem",
											fontSize: "0.78rem"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["⏱️ ", t.duration] }), statusBadge(t.status)]
									})
								]
							}, t.id))
						})]
					}, columnStatus);
				})
			}),
			taskView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-item",
					style: {
						padding: "1.2rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: {
								fontSize: "0.85rem",
								color: "var(--accent-color)"
							},
							children: t.id
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: {
								fontSize: "1.05rem",
								marginLeft: "0.5rem",
								color: "var(--text-primary)"
							},
							children: t.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem",
								alignItems: "center"
							},
							children: [priorityBadge(t.priority), statusBadge(t.status)]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "1.5rem",
							fontSize: "0.88rem",
							color: "var(--text-secondary)",
							flexWrap: "wrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Digital Twin:" }),
								" ",
								t.twin
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Host:" }),
								" ",
								t.host
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Node:" }),
								" ",
								t.node
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Czas:" }),
								" ",
								t.duration
							] })
						]
					})]
				}, t.id))
			}),
			taskView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					overflowX: "auto",
					marginTop: "1.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: { width: "100%" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nazwa Zadania" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Digital Twin" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Host / Node" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Priorytet" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Czas" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: t.id }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.title }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t.twin }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							t.host,
							" / ",
							t.node
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: priorityBadge(t.priority) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: statusBadge(t.status) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: t.duration })
					] }, t.id)) })]
				})
			}),
			taskView === "timeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					marginTop: "1.5rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.85rem"
				},
				children: visibleItems.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						padding: "1rem",
						background: "var(--bg-secondary)",
						borderRadius: "8px",
						border: "1px solid var(--border-color)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								width: "130px",
								fontSize: "0.82rem",
								color: "var(--text-muted)"
							},
							children: ["⏱️ ", t.startedAt]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { flex: 1 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: "0.5rem"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: t.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.title })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.82rem",
										color: "var(--text-secondary)",
										marginTop: "0.2rem"
									},
									children: [
										"🤖 Twin: ",
										t.twin,
										" | 🖥️ Host: ",
										t.host,
										" (",
										t.node,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										height: "6px",
										background: "rgba(99,102,241,0.2)",
										borderRadius: "3px",
										marginTop: "0.5rem",
										overflow: "hidden"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
										height: "100%",
										width: `${(idx + 1) * 20}%`,
										background: "var(--accent-gradient)"
									} })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem",
								alignItems: "center"
							},
							children: [priorityBadge(t.priority), statusBadge(t.status)]
						})
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			}),
			taskView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plus",
						className: "icon-lg"
					}), " Zleć Nowe Zadanie Automatyzacji"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreateTask,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
							gap: "1rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Nazwa Zadania / Opis"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "form-input",
									placeholder: "np. Synchronizacja stanów magazynowych z ERP",
									value: newTitle,
									onChange: (e) => setNewTitle(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Wykonawca (Digital Twin)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: newTwin,
									onChange: (e) => setNewTwin(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-Allegro-Pro",
											children: "Twin-Allegro-Pro"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-Subiekt-ERP",
											children: "Twin-Subiekt-ERP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-IoT-CyberMysz",
											children: "Twin-IoT-CyberMysz"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-AI-Assistant",
											children: "Twin-AI-Assistant"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Priorytet Execution Queue"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: newPriority,
									onChange: (e) => setNewPriority(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "NORMAL",
											children: "NORMAL"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "HIGH",
											children: "HIGH"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CRITICAL",
											children: "CRITICAL"
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "0.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Zleć Zadanie do Kolejki"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-secondary",
							onClick: () => setTaskView("kanban"),
							children: "Anuluj"
						})]
					})]
				})]
			})
		]
	});
}
var INITIAL_SCHEDULED_TICKETS = [
	{
		id: "TCK-101",
		title: "Nocny Backup Bazy Danych & Retencja Logów",
		schedule: "Codziennie o 02:00 (CRON: 0 2 * * *)",
		twin: "Twin-Backup-Manager",
		targetHost: "Hetzner Cloud VPS #01",
		nextRun: "Dziś, 02:00 (za 12h 40m)",
		status: "ACTIVE"
	},
	{
		id: "TCK-102",
		title: "Cogodzinna Pobierka Zamówień Allegro & ERP",
		schedule: "Co 1 godzinę (CRON: 0 * * * *)",
		twin: "Twin-Allegro-Pro",
		targetHost: "Hetzner Cloud VPS #01",
		nextRun: "Dziś, 14:00 (za 48m)",
		status: "ACTIVE"
	},
	{
		id: "TCK-103",
		title: "Raport Diagnostyczny Senzorów CyberMysz",
		schedule: "Poniedziałek, 08:00 (CRON: 0 8 * * 1)",
		twin: "Twin-IoT-CyberMysz",
		targetHost: "Raspberry Pi 4 Model B",
		nextRun: "Poniedziałek, 08:00",
		status: "ACTIVE"
	},
	{
		id: "TCK-104",
		title: "Indeksowanie i Weryfikacja Artefaktów Governance",
		schedule: "W każdy piątek o 18:00",
		twin: "Twin-AI-Assistant",
		targetHost: "Bare-Metal AX41-NVMe",
		nextRun: "Piątek, 18:00",
		status: "PAUSED"
	}
];
function CalendarSection({ session }) {
	const [tickets, setTickets] = (0, import_react.useState)(INITIAL_SCHEDULED_TICKETS);
	const [calendarView, setCalendarView] = useSectionView("calendar", [
		"agenda",
		"month",
		"week",
		"day",
		"add"
	]);
	const [newTitle, setNewTitle] = (0, import_react.useState)("");
	const [newSchedule, setNewSchedule] = (0, import_react.useState)("Codziennie o 08:00");
	const [newTwin, setNewTwin] = (0, import_react.useState)("Twin-Allegro-Pro");
	const handleAddTicket = (e) => {
		e.preventDefault();
		if (!newTitle.trim()) return;
		const created = {
			id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
			title: newTitle.trim(),
			schedule: newSchedule.trim(),
			twin: newTwin,
			targetHost: "Hetzner Cloud VPS #01",
			nextRun: "Jutro, 08:00",
			status: "ACTIVE"
		};
		setTickets([created, ...tickets]);
		setNewTitle("");
		setCalendarView("agenda");
	};
	const toggleStatus = (id) => {
		setTickets(tickets.map((t) => t.id === id ? {
			...t,
			status: t.status === "ACTIVE" ? "PAUSED" : "ACTIVE"
		} : t));
	};
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(tickets), 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "calendar",
							className: "icon-lg"
						}),
						"Kalendarz Harmonogramów & Zaplanowanych Ticketów (",
						tickets.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						"Przeglądaj zaplanowane cykle automatyzacji, zadania cykliczne (CRON) i nadchodzące harmonogramy dla najemcy ",
						session.tenant_slug,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: [
						{
							id: "agenda",
							label: "Agenda",
							icon: "checkSquare",
							title: "Widok Agendy Ticketów"
						},
						{
							id: "month",
							label: "Miesiąc",
							icon: "calendar",
							title: "Widok Miesięczny"
						},
						{
							id: "week",
							label: "Tydzień",
							icon: "kanban",
							title: "Widok Tygodniowy"
						},
						{
							id: "day",
							label: "Dzień",
							icon: "clock",
							title: "Widok Dniowy / Godzinowy"
						},
						{
							id: "add",
							label: "Nowy Ticket",
							icon: "plus",
							title: "Formularz Utworzenia Nowego Ticketu / Harmonogramu"
						}
					],
					current: calendarView,
					onChange: setCalendarView
				})]
			}),
			calendarView === "agenda" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((ticket) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-item",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
						padding: "1.2rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-mark",
								style: {
									width: "36px",
									height: "36px",
									borderRadius: "8px",
									background: "rgba(99,102,241,0.15)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "calendar",
									className: "icon-lg"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									style: {
										fontSize: "0.85rem",
										color: "var(--accent-color)"
									},
									children: ticket.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: {
										fontSize: "1.05rem",
										marginLeft: "0.5rem",
										color: "var(--text-primary)"
									},
									children: ticket.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "0.85rem",
										color: "var(--text-muted)",
										marginTop: "0.2rem"
									},
									children: [
										"📅 ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Harmonogram:" }),
										" ",
										ticket.schedule
									]
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "0.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${ticket.status === "ACTIVE" ? "status-ok" : "status-proc"}`,
								children: ticket.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-secondary",
								style: {
									fontSize: "0.85rem",
									padding: "0.4rem 0.75rem"
								},
								onClick: () => toggleStatus(ticket.id),
								children: ticket.status === "ACTIVE" ? "Wstrzymaj" : "Aktywuj"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: "1rem",
							paddingTop: "0.75rem",
							borderTop: "1px solid var(--border-color)",
							fontSize: "0.88rem",
							color: "var(--text-secondary)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"🤖 ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Digital Twin:" }),
								" ",
								ticket.twin
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"🖥️ ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Host Docelowy:" }),
								" ",
								ticket.targetHost
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"⏰ ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Najbliższe uruchomienie:" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										color: "var(--accent-color)",
										fontWeight: "600"
									},
									children: ticket.nextRun
								})
							] })
						]
					})]
				}, ticket.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			}),
			calendarView === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(7, 1fr)",
						gap: "0.5rem",
						fontWeight: "bold",
						textAlign: "center",
						marginBottom: "0.5rem",
						color: "var(--text-secondary)",
						fontSize: "0.88rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Pon" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Wt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Śr" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Czw" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Pt" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Sob" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Niedz" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(7, 1fr)",
						gap: "0.5rem"
					},
					children: Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
						const dayEvents = day === 16 ? [tickets[0], tickets[1]] : day === 17 ? [tickets[2]] : day === 21 ? [tickets[3]] : [];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: day === 16 ? "rgba(99,102,241,0.1)" : "var(--bg-secondary)",
								borderRadius: "8px",
								padding: "0.5rem",
								minHeight: "85px",
								border: day === 16 ? "1px solid var(--accent-color)" : "1px solid var(--border-color)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: "0.82rem",
									fontWeight: "bold",
									color: day === 16 ? "var(--accent-color)" : "var(--text-muted)"
								},
								children: [
									day,
									" ",
									day === 16 ? "(Dziś)" : ""
								]
							}), dayEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									background: "var(--bg-card)",
									padding: "0.25rem 0.4rem",
									borderRadius: "4px",
									marginTop: "0.3rem",
									fontSize: "0.72rem",
									borderLeft: "3px solid var(--accent-color)",
									textOverflow: "ellipsis",
									overflow: "hidden",
									whiteSpace: "nowrap"
								},
								title: e.title,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.id }),
									" ",
									e.title
								]
							}, e.id))]
						}, day);
					})
				})]
			}),
			calendarView === "week" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
					gap: "0.75rem",
					marginTop: "1.5rem"
				},
				children: [
					{
						dayName: "Poniedziałek (10.08)",
						events: [tickets[2]]
					},
					{
						dayName: "Wtorek (11.08)",
						events: []
					},
					{
						dayName: "Środa (12.08)",
						events: []
					},
					{
						dayName: "Czwartek (13.08)",
						events: []
					},
					{
						dayName: "Piątek (14.08)",
						events: [tickets[3]]
					},
					{
						dayName: "Sobota (15.08)",
						events: []
					},
					{
						dayName: "Niedziela (16.08 - Dziś)",
						events: [tickets[0], tickets[1]]
					}
				].map((col, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						background: "var(--bg-secondary)",
						padding: "0.85rem",
						borderRadius: "8px",
						border: "1px solid var(--border-color)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: {
							fontSize: "0.88rem",
							display: "block",
							marginBottom: "0.75rem",
							color: idx === 6 ? "var(--accent-color)" : "var(--text-primary)"
						},
						children: col.dayName
					}), col.events.length > 0 ? col.events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: "var(--bg-card)",
							padding: "0.6rem",
							borderRadius: "6px",
							border: "1px solid var(--border-color)",
							marginBottom: "0.5rem",
							fontSize: "0.8rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								style: {
									fontSize: "0.75rem",
									color: "var(--accent-color)"
								},
								children: e.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontWeight: "600",
									marginTop: "0.2rem"
								},
								children: e.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: "0.75rem",
									color: "var(--text-muted)",
									marginTop: "0.3rem"
								},
								children: ["🤖 ", e.twin]
							})
						]
					}, e.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.78rem",
							color: "var(--text-muted)"
						},
						children: "Brak ticketów"
					})]
				}, idx))
			}),
			calendarView === "day" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					marginTop: "1.5rem",
					display: "flex",
					flexDirection: "column",
					gap: "0.75rem"
				},
				children: [
					{
						time: "02:00",
						ticket: tickets[0],
						text: "Nocny Backup Bazy Danych"
					},
					{
						time: "08:00",
						ticket: null,
						text: "Brak zaplanowanych zadań"
					},
					{
						time: "14:00",
						ticket: tickets[1],
						text: "Cogodzinna Pobierka Zamówień Allegro"
					},
					{
						time: "18:00",
						ticket: tickets[3],
						text: "Indeksowanie Artefaktów Governance"
					},
					{
						time: "22:00",
						ticket: null,
						text: "Okno serwisowe"
					}
				].map((slot, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: "1rem",
						padding: "0.85rem",
						background: slot.ticket ? "var(--bg-secondary)" : "transparent",
						border: "1px solid var(--border-color)",
						borderRadius: "8px"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-info",
						style: {
							minWidth: "65px",
							textAlign: "center",
							fontSize: "0.85rem"
						},
						children: slot.time
					}), slot.ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flex: 1,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							slot.ticket.id,
							": ",
							slot.ticket.title
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.82rem",
								color: "var(--text-muted)"
							},
							children: [
								"Wykonawca: ",
								slot.ticket.twin,
								" • Host: ",
								slot.ticket.targetHost
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "status-pill status-ok",
							children: "SCHEDULED"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "var(--text-muted)",
							fontSize: "0.88rem"
						},
						children: slot.text
					})]
				}, i))
			}),
			calendarView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plus",
						className: "icon-lg"
					}), " Zaplanuj Nowy Ticket / Cykliczną Automatyzację"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAddTicket,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
							gap: "1rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Tytuł Ticketu / Zaplanowanego Zadania"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "form-input",
									placeholder: "np. Cotygodniowy raport stanów magazynowych",
									value: newTitle,
									onChange: (e) => setNewTitle(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Harmonogram Wykonań (CRON / Tekst)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "form-input",
									placeholder: "np. Codziennie o 08:00 lub CRON: 0 8 * * *",
									value: newSchedule,
									onChange: (e) => setNewSchedule(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Przypisany Digital Twin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: newTwin,
									onChange: (e) => setNewTwin(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-Allegro-Pro",
											children: "Twin-Allegro-Pro"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-Subiekt-ERP",
											children: "Twin-Subiekt-ERP"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-IoT-CyberMysz",
											children: "Twin-IoT-CyberMysz"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Twin-AI-Assistant",
											children: "Twin-AI-Assistant"
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: "0.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Dodaj Zaplanowany Ticket"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn-secondary",
							onClick: () => setCalendarView("agenda"),
							children: "Anuluj"
						})]
					})]
				})]
			})
		]
	});
}
var INITIAL_URI_PROCESS_GROUPS = [
	{
		id: "URI-GRP-01",
		uriPrefix: "uri://system/core/*",
		category: "System Core",
		module: "Platform Orchestrator",
		permissions: [
			"READ",
			"EXECUTE",
			"ADMIN"
		],
		communicationChannel: "CQRS EventBus",
		protocolIcon: "zap",
		status: "ACTIVE",
		principalBinding: "human:founder, role:admin",
		aqlDirective: "GRANT uri://system/core/* TO role:admin WITH PERMISSIONS [READ, EXECUTE, ADMIN] OVER BUS cqrs;",
		description: "Główny silnik orkiestracji zdarzeń oraz zarządzania cyklem życia wszystkich aktorów w klastrze.",
		lastAccess: "Przed chwilą"
	},
	{
		id: "URI-GRP-02",
		uriPrefix: "uri://identity/auth/*",
		category: "Tożsamość & Auth",
		module: "SSO & Identity Provider",
		permissions: ["READ", "EXECUTE"],
		communicationChannel: "WebSocket (WSS)",
		protocolIcon: "key",
		status: "ACTIVE",
		principalBinding: "role:authenticated, identity:saml-okta",
		aqlDirective: "GRANT uri://identity/auth/* TO role:authenticated WITH PERMISSIONS [READ, EXECUTE] OVER CHANNEL wss;",
		description: "Weryfikacja tokenów JWT, federacja tożsamości SAML/OAuth2 oraz wymiana sesji z portalem.",
		lastAccess: "2 min temu"
	},
	{
		id: "URI-GRP-03",
		uriPrefix: "uri://twin/billing/*",
		category: "Bliźniaki Cyfrowe",
		module: "Digital Twin Billing Engine",
		permissions: [
			"READ",
			"EXECUTE",
			"PUBLISH"
		],
		communicationChannel: "gRPC",
		protocolIcon: "cube",
		status: "ACTIVE",
		principalBinding: "twin:allegro-pro, twin:subiekt-erp",
		aqlDirective: "GRANT uri://twin/billing/* TO twin:allegro-pro WITH PERMISSIONS [READ, EXECUTE, PUBLISH] OVER RPC grpc;",
		description: "Autonomiczne naliczanie opłat, rozliczenia subskrypcji najemców i fakturowanie z Allegro/Subiekt.",
		lastAccess: "15 min temu"
	},
	{
		id: "URI-GRP-04",
		uriPrefix: "uri://twin/subiekt-erp/*",
		category: "Bliźniaki Cyfrowe",
		module: "Subiekt GT/Nexo Integration",
		permissions: [
			"READ",
			"EXECUTE",
			"SUBSCRIBE"
		],
		communicationChannel: "IPC / Domain Socket",
		protocolIcon: "layers",
		status: "ACTIVE",
		principalBinding: "twin:subiekt-erp, node:worker-03",
		aqlDirective: "GRANT uri://twin/subiekt-erp/* TO twin:subiekt-erp WITH PERMISSIONS [READ, EXECUTE, SUBSCRIBE] OVER IPC socket;",
		description: "Konektor lokalny do bazy MSSQL Subiekta, automatyzacja wysyłki zamówień i stanów magazynowych.",
		lastAccess: "1 godz. temu"
	},
	{
		id: "URI-GRP-05",
		uriPrefix: "uri://llm/proxy/*",
		category: "Sztuczna Inteligencja",
		module: "Ollama & AI Gateway",
		permissions: ["READ", "EXECUTE"],
		communicationChannel: "HTTP REST",
		protocolIcon: "cpu",
		status: "ACTIVE",
		principalBinding: "agent:llm-proxy, role:operator",
		aqlDirective: "GRANT uri://llm/proxy/* TO agent:llm-proxy WITH PERMISSIONS [READ, EXECUTE] OVER HTTP rest;",
		description: "Routing zapytań do modeli LLM (Ollama lokalnie, OpenRouter, Claude, GPT-4o) z budżetowaniem tokenów.",
		lastAccess: "Przed chwilą"
	},
	{
		id: "URI-GRP-06",
		uriPrefix: "uri://hub/credential/*",
		category: "Bezpieczeństwo & Sejfy",
		module: "Vault & Key Manager",
		permissions: ["ADMIN", "EXECUTE"],
		communicationChannel: "gRPC",
		protocolIcon: "lock",
		status: "RESTRICTED",
		principalBinding: "role:founder, system:browser-agent",
		aqlDirective: "GRANT uri://hub/credential/* TO role:founder WITH PERMISSIONS [ADMIN, EXECUTE] OVER VAULT encrypted;",
		description: "Szyfrowane pobieranie i rotacja kluczy API, haseł Plesk/FTP oraz certyfikatów z poziomu Sejfu.",
		lastAccess: "3 godz. temu"
	},
	{
		id: "URI-GRP-07",
		uriPrefix: "uri://host/vps/*",
		category: "Infrastruktura",
		module: "Bare-Metal & VPS Agent CLI",
		permissions: ["READ", "EXECUTE"],
		communicationChannel: "Paramiko SFTP/SSH",
		protocolIcon: "hardDrive",
		status: "ACTIVE",
		principalBinding: "host:vps-paris-02, host:hetzner-cloud",
		aqlDirective: "GRANT uri://host/vps/* TO host:hetzner-cloud WITH PERMISSIONS [READ, EXECUTE] OVER SSH paramiko;",
		description: "Zarządzanie hostami VPS, wykonywanie skryptów agent.sh, synch plików www-docroot i monitoring.",
		lastAccess: "10 min temu"
	},
	{
		id: "URI-GRP-08",
		uriPrefix: "uri://task/execution/*",
		category: "Kolejki & Wykonania",
		module: "Planfile Queue Processor",
		permissions: [
			"READ",
			"EXECUTE",
			"PUBLISH",
			"SUBSCRIBE"
		],
		communicationChannel: "CQRS EventBus",
		protocolIcon: "checkSquare",
		status: "ACTIVE",
		principalBinding: "worker:planfile-runner, twin:all",
		aqlDirective: "GRANT uri://task/execution/* TO worker:planfile-runner WITH PERMISSIONS [READ, EXECUTE, PUBLISH, SUBSCRIBE] OVER BUS cqrs;",
		description: "Obsługa asynchronicznych zadań Planfile, dystrybucja obciążenia na węzły workerów.",
		lastAccess: "4 min temu"
	},
	{
		id: "URI-GRP-09",
		uriPrefix: "uri://node/cybermysz/*",
		category: "IoT & Sprzęt",
		module: "CyberMysz Raspberry Pi Nodes",
		permissions: ["READ", "SUBSCRIBE"],
		communicationChannel: "WebSocket (WSS)",
		protocolIcon: "server",
		status: "AUDITED",
		principalBinding: "node:cybermysz-01, node:cybermysz-02",
		aqlDirective: "GRANT uri://node/cybermysz/* TO node:cybermysz-01 WITH PERMISSIONS [READ, SUBSCRIBE] OVER CHANNEL wss;",
		description: "Odbiór telemetrycznych danych z czujników maszynowych, fizycznych przycisków i przekaźników IoT.",
		lastAccess: "Dzisiaj, 12:30"
	}
];
function UriPermissionsSection({ session }) {
	const [uriGroups, setUriGroups] = (0, import_react.useState)(INITIAL_URI_PROCESS_GROUPS);
	const [uriView, setUriView] = useSectionView("uri-permissions", [
		"matrix",
		"communication",
		"list",
		"add"
	], (v) => updatePanelUrl({
		tab: "uri-permissions",
		view: v,
		project: null,
		host: null,
		org: null,
		registry: null
	}));
	const [targetPrincipal, setTargetPrincipal] = (0, import_react.useState)("role:admin");
	const [targetUri, setTargetUri] = (0, import_react.useState)("uri://system/core/*");
	const [selectedPerms, setSelectedPerms] = (0, import_react.useState)({
		READ: true,
		EXECUTE: true,
		PUBLISH: false,
		SUBSCRIBE: false,
		ADMIN: false
	});
	const [selectedChannel, setSelectedChannel] = (0, import_react.useState)("WebSocket (WSS)");
	const [newGroupDescription, setNewGroupDescription] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(uriGroups), 3);
	const togglePermission = (perm) => {
		setSelectedPerms((prev) => ({
			...prev,
			[perm]: !prev[perm]
		}));
	};
	const currentActivePerms = Object.keys(selectedPerms).filter((k) => selectedPerms[k]);
	const generatedAql = `/* Autogenerated AQL Permission & Topology Binding */
GRANT ${targetUri}
  TO principal "${targetPrincipal}"
  WITH PERMISSIONS [${currentActivePerms.join(", ") || "NONE"}]
  OVER CHANNEL "${selectedChannel}"
  POLICY "STRICT_TENANT_ISOLATION"
  ON CONFLICT REJECT;`;
	const handleAddRule = (e) => {
		e.preventDefault();
		const created = {
			id: `URI-GRP-${Math.floor(10 + Math.random() * 90)}`,
			uriPrefix: targetUri,
			category: "Dostosowany Proces",
			module: "AQL Custom Policy",
			permissions: currentActivePerms.length ? currentActivePerms : ["READ"],
			communicationChannel: selectedChannel,
			protocolIcon: selectedChannel.includes("WSS") ? "wifi" : selectedChannel.includes("Bus") ? "zap" : selectedChannel.includes("gRPC") ? "cube" : "lock",
			status: "ACTIVE",
			principalBinding: targetPrincipal,
			aqlDirective: generatedAql.replace(/\n\s*/g, " "),
			description: newGroupDescription.trim() || `Reguła AQL dla podsystemu ${targetUri} przez ${selectedChannel}.`,
			lastAccess: "Przed chwilą"
		};
		setUriGroups([created, ...uriGroups]);
		setNewGroupDescription("");
		setNotice(`Pomyślnie dodano i wdrożono nową regułę AQL na samej górze: ${targetUri}`);
		setUriView("matrix");
		setTimeout(() => setNotice(null), 3500);
	};
	const uriModes = [
		{
			id: "matrix",
			label: "Macierz",
			icon: "kanban",
			title: "Widok Macierzy Uprawnień Procesów URI"
		},
		{
			id: "communication",
			label: "Komunikacja",
			icon: "zap",
			title: "Widok Kanałów i Protokołów Komunikacji"
		},
		{
			id: "list",
			label: "Karty Procesów",
			icon: "cube",
			title: "Widok Kart Grup Procesów URI"
		},
		{
			id: "add",
			label: "Dodaj Regułę AQL",
			icon: "plus",
			title: "Konstruktor i podgląd dyrektywy AQL"
		}
	];
	const allPossiblePermissions = [
		"READ",
		"EXECUTE",
		"PUBLISH",
		"SUBSCRIBE",
		"ADMIN"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content uri-permissions",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "shield",
							className: "icon-lg"
						}),
						"Uprawnienia Procesów URI (",
						uriGroups.length,
						" Grup)"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub uri-section-intro",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						fontSize: "0.9rem"
					},
					children: [
						"Reguły dostępu dla procesów ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "uri://" }),
						". Konstruktor AQL jest pod Dodaj — nie w przełączniku widoku."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: uriModes,
					current: uriView,
					onChange: setUriView
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-success",
				style: {
					marginTop: "1rem",
					marginBottom: "0.5rem",
					padding: "0.8rem 1rem",
					fontSize: "0.9rem"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }),
					" ",
					notice
				]
			}),
			uriView === "matrix" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					overflowX: "auto",
					marginTop: "1.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: {
						width: "100%",
						fontSize: "0.9rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Grupowy Prefiks URI" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Kategoria / Moduł" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "READ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "EXECUTE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "PUBLISH" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "SUBSCRIBE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ADMIN" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Kanał Komunikacji" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Podmiot (Principal)" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((grp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "uri-prefix",
							style: {
								fontSize: "0.85rem",
								fontWeight: "600"
							},
							children: grp.uriPrefix
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: grp.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uri-card-meta",
							style: { fontSize: "0.78rem" },
							children: grp.module
						})] }),
						allPossiblePermissions.map((perm) => {
							const hasPerm = grp.permissions.includes(perm);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { textAlign: "center" },
								children: hasPerm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "badge badge-success",
									style: {
										fontSize: "0.75rem",
										padding: "0.2rem 0.45rem"
									},
									children: ["✓ ", perm]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uri-permission-empty",
									children: "−"
								})
							}, perm);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-info",
							style: { fontSize: "0.8rem" },
							children: grp.communicationChannel
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "uri-principal",
							style: { fontSize: "0.8rem" },
							children: grp.principalBinding
						}) })
					] }, grp.id)) })]
				})
			}),
			uriView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card",
				style: {
					marginTop: "1.5rem",
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					border: "1px solid var(--accent-primary)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						style: {
							margin: 0,
							fontSize: "1.1rem",
							display: "flex",
							alignItems: "center",
							gap: "0.5rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "plus",
							className: "icon-lg"
						}), " Konstruktor Dyrektywy AQL & Uprawnień (Prepend Rule)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddRule,
						style: {
							display: "flex",
							flexDirection: "column",
							gap: "1rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Podmiot / Principal Wywołujący"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: targetPrincipal,
									onChange: (e) => setTargetPrincipal(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "human:founder",
											children: "human:founder (Właściciel / Admin)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "role:admin",
											children: "role:admin (Administrator Organizacji)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "twin:allegro-pro",
											children: "twin:allegro-pro (Digital Twin Allegro)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "twin:subiekt-erp",
											children: "twin:subiekt-erp (Digital Twin ERP)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "agent:llm-proxy",
											children: "agent:llm-proxy (Serwer Proxy AI)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "node:cybermysz-01",
											children: "node:cybermysz-01 (Węzeł IoT Raspberry Pi)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "host:hetzner-cloud",
											children: "host:hetzner-cloud (Serwer Cloud VPS)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Docelowa Grupa Procesów URI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: targetUri,
									onChange: (e) => setTargetUri(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://system/core/*",
											children: "uri://system/core/* (System Core Orchestration)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://identity/auth/*",
											children: "uri://identity/auth/* (Tożsamość i Auth SSO)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://twin/billing/*",
											children: "uri://twin/billing/* (Bliźniak Billing & Subskrypcje)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://twin/subiekt-erp/*",
											children: "uri://twin/subiekt-erp/* (Bliźniak ERP Sync)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://llm/proxy/*",
											children: "uri://llm/proxy/* (Proxy Ollama i LLM)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://hub/credential/*",
											children: "uri://hub/credential/* (Sejf Kluczy i Poświadczeń)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://host/vps/*",
											children: "uri://host/vps/* (Agent Maszynowy i Hosty)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://task/execution/*",
											children: "uri://task/execution/* (Kolejka Zadań Planfile)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "uri://node/cybermysz/*",
											children: "uri://node/cybermysz/* (Czujniki i IoT CyberMysz)"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Wybór Dopuszczalnych Uprawnień (Kombinacje)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexWrap: "wrap",
										gap: "0.5rem",
										marginTop: "0.3rem"
									},
									children: allPossiblePermissions.map((perm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: selectedPerms[perm] ? "btn-primary" : "btn-secondary",
										style: {
											padding: "0.4rem 0.75rem",
											fontSize: "0.82rem"
										},
										onClick: () => togglePermission(perm),
										children: [selectedPerms[perm] ? "✓ " : "+ ", perm]
									}, perm))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Kanał & Protokół Komunikacyjny"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									value: selectedChannel,
									onChange: (e) => setSelectedChannel(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "WebSocket (WSS)",
											children: "WebSocket (WSS) - Strumieniowanie dwukierunkowe"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "CQRS EventBus",
											children: "CQRS EventBus - Magistrala zdarzeń in-memory"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gRPC",
											children: "gRPC - Wysokowydajny gRPC / Protocol Buffers"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "HTTP REST",
											children: "HTTP REST - Zwykły interfejs REST API"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Paramiko SFTP/SSH",
											children: "Paramiko SFTP/SSH - Bezpieczny tunel SSH agenta"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "IPC / Domain Socket",
											children: "IPC / Domain Socket - Gniazdo lokalne inter-process"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Opis Reguły AQL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "form-input",
									placeholder: "np. Zezwól dla agenta LLM na interakcję z Ollama poprzez HTTP",
									value: newGroupDescription,
									onChange: (e) => setNewGroupDescription(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: "0.5rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "btn-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Wdroż Regułę AQL na Górze"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn-secondary",
									onClick: () => setUriView("matrix"),
									children: "Anuluj"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "uri-aql-block uri-aql-preview",
						style: {
							marginTop: "1rem",
							padding: "1rem",
							borderRadius: "8px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "0.5rem",
								gap: "0.5rem",
								flexWrap: "wrap"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.8rem",
									textTransform: "uppercase",
									color: "var(--text-muted)",
									fontWeight: "bold"
								},
								children: "Podgląd AQL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-secondary",
								style: {
									padding: "0.2rem 0.5rem",
									fontSize: "0.75rem"
								},
								onClick: () => navigator.clipboard?.writeText(generatedAql),
								children: "Kopiuj AQL"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "uri-aql-code",
							style: {
								margin: 0,
								fontFamily: "monospace",
								fontSize: "0.85rem",
								whiteSpace: "pre-wrap"
							},
							children: generatedAql
						})]
					})
				]
			}),
			uriView === "communication" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					marginTop: "1.5rem",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
					gap: "1rem"
				},
				children: [
					{
						title: "CQRS EventBus (In-Memory)",
						protocol: "CQRS / EventBridge",
						latency: "< 0.5 ms",
						throughput: "100k msg/sec",
						security: "Mutual Memory Lease",
						desc: "Magistrala zsynchronizowanych zdarzeń używana do wymiany komunikatów pomiędzy silnikiem AQL a bliźniakami cyfrowymi.",
						icon: "zap"
					},
					{
						title: "WebSocket (WSS)",
						protocol: "RFC 6455 TLS",
						latency: "2 - 5 ms",
						throughput: "25k msg/sec",
						security: "WSS JWT Bearer",
						desc: "Kanał strumieniowy do ciągłego odbierania telemetrii z węzłów CyberMysz, Raspberry Pi oraz zdarzeń interfejsu SaaS.",
						icon: "wifi"
					},
					{
						title: "gRPC Protocol Buffers",
						protocol: "HTTP/2 Protobuf",
						latency: "1 - 3 ms",
						throughput: "50k msg/sec",
						security: "mTLS Certificate",
						desc: "Niskopoziomowy protokół RPC używany przez Sejf Poświadczeń (Vault) oraz silniki billingowe bliźniaków cyfrowych.",
						icon: "cube"
					},
					{
						title: "Paramiko SFTP / SSH Tunnel",
						protocol: "SSH v2 Encrypted",
						latency: "15 - 45 ms",
						throughput: "50 MB/sec",
						security: "Ed25519 Key Exchange",
						desc: "Zabezpieczone wykonania poleceń systemowych i synchronizacja plików docroot na maszynach VPS oraz serwerach Bare-Metal.",
						icon: "terminal"
					},
					{
						title: "IPC / Unix Domain Socket",
						protocol: "AF_UNIX Socket",
						latency: "< 0.1 ms",
						throughput: "200k msg/sec",
						security: "POSIX Permissions",
						desc: "Lokalne szybkie gniazdo procesowe łączące kontener Subactor z lokalną bazą Subiekt GT / ERP.",
						icon: "layers"
					}
				].map((chan, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-card",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
						padding: "1.2rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
								style: {
									fontSize: "1.05rem",
									color: "var(--text-primary)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: chan.icon }),
									" ",
									chan.title
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-info",
								style: { fontSize: "0.78rem" },
								children: chan.protocol
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.85rem",
								color: "var(--text-secondary)",
								margin: 0
							},
							children: chan.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "1fr 1fr",
								gap: "0.5rem",
								paddingTop: "0.5rem",
								borderTop: "1px solid var(--border-color)",
								fontSize: "0.8rem",
								color: "var(--text-muted)"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["⏱️ Opóźnienie: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: "var(--text-primary)" },
									children: chan.latency
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["⚡ Przepustowość: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: "var(--text-primary)" },
									children: chan.throughput
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: { gridColumn: "span 2" },
									children: ["🛡️ Bezpieczeństwo: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										style: { color: "var(--success-text)" },
										children: chan.security
									})]
								})
							]
						})
					]
				}, idx))
			}),
			uriView === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((grp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-item uri-permission-card",
					style: {
						padding: "1.2rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
								gap: "0.75rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "0.75rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "brand-mark uri-permission-icon",
									style: {
										width: "36px",
										height: "36px",
										borderRadius: "8px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "shield",
										className: "icon-lg"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "uri-prefix",
									style: {
										fontSize: "0.95rem",
										fontWeight: "600"
									},
									children: grp.uriPrefix
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "uri-card-meta",
									style: {
										fontSize: "0.85rem",
										marginTop: "0.2rem"
									},
									children: [
										grp.category,
										" • ",
										grp.module
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: "0.5rem"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge-info",
									children: grp.communicationChannel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `status-pill ${grp.status === "ACTIVE" ? "status-ok" : "status-proc"}`,
									children: grp.status
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "uri-card-description",
							style: {
								fontSize: "0.88rem",
								margin: 0
							},
							children: grp.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uri-aql-block",
							style: {
								padding: "0.6rem 0.8rem",
								borderRadius: "6px"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "uri-aql-code",
								style: { fontSize: "0.82rem" },
								children: grp.aqlDirective
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "uri-permission-footer",
							style: {
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								flexWrap: "wrap",
								gap: "1rem",
								paddingTop: "0.5rem",
								borderTop: "1px solid var(--border-color)",
								fontSize: "0.82rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["👤 Podmiot: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: grp.principalBinding })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["⏱️ Ostatnie wywołanie: ", grp.lastAccess] })]
						})
					]
				}, grp.id))
			}),
			(uriView === "matrix" || uriView === "list") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			})
		]
	});
}
var PROJECT_ORGS = [
	{
		id: "org-subactor",
		name: "Subactor Platform"
	},
	{
		id: "org-retail",
		name: "Retail Group SA"
	},
	{
		id: "org-iot",
		name: "CyberMysz IoT"
	}
];
var INITIAL_PROJECTS = [
	{
		id: "PRJ-01",
		name: "Subactor Operational SaaS Portal",
		domain: "subactor.io / 127.0.0.1:8781",
		status: "DEPLOYED",
		manifestRef: "manifest://subactor/www-sub-actor",
		targetHost: "Hetzner Cloud VPS #01",
		twinCount: 4,
		updatedAt: "Dzisiaj, 13:45",
		description: "Główna suinstancja SaaS z portalami najemców, panelem operacyjnym i silnikiem dynamicznych widoków AQL.",
		organizationId: "org-subactor",
		organizationName: "Subactor Platform",
		tickets: [{
			id: "TCK-045",
			kind: "ticket",
			title: "Panel tab URL routing & LLM tokens",
			status: "DONE",
			updatedAt: "Dzisiaj"
		}, {
			id: "TCK-052",
			kind: "ticket",
			title: "Org → Project IA w panelu",
			status: "IN_PROGRESS",
			updatedAt: "Dzisiaj"
		}],
		artifacts: [{
			id: "ART-gui",
			kind: "manifest",
			title: "wellmanifest/gui adopt",
			status: "CURRENT",
			updatedAt: "Dzisiaj"
		}, {
			id: "ART-nav",
			kind: "doc",
			title: "panel-navigation.json",
			status: "CURRENT",
			updatedAt: "Wczoraj"
		}]
	},
	{
		id: "PRJ-02",
		name: "E-Commerce Allegro Automation & Stock",
		domain: "allegro.shop.pl",
		status: "ACTIVE",
		manifestRef: "manifest://subactor/allegro-pro",
		targetHost: "Bare-Metal AX41-NVMe",
		twinCount: 2,
		updatedAt: "Dzisiaj, 12:10",
		description: "System automatyzacji dystrybucji ofert, uzgadniania stanów magazynowych oraz obsługi wysyłek Allegro.",
		organizationId: "org-retail",
		organizationName: "Retail Group SA",
		tickets: [{
			id: "TCK-118",
			kind: "ticket",
			title: "Sync stanów Allegro ↔ Subiekt",
			status: "ACTIVE",
			updatedAt: "Dzisiaj"
		}],
		artifacts: [{
			id: "ART-allegro",
			kind: "twin",
			title: "Twin-Allegro-Pro",
			status: "ACTIVE",
			updatedAt: "Dzisiaj"
		}]
	},
	{
		id: "PRJ-03",
		name: "Subiekt ERP Connector Node",
		domain: "erp.internal.local",
		status: "SYNCING",
		manifestRef: "manifest://subactor/subiekt-erp",
		targetHost: "Worker Node #03",
		twinCount: 1,
		updatedAt: "Dzisiaj, 11:30",
		description: "Konektor bazodanowy MSSQL łączący systemy ERP Subiekt GT/Nexo z magstralą zdarzeń Subactor.",
		organizationId: "org-retail",
		organizationName: "Retail Group SA",
		tickets: [{
			id: "TCK-091",
			kind: "ticket",
			title: "MSSQL health probe",
			status: "PENDING",
			updatedAt: "Wczoraj"
		}],
		artifacts: [{
			id: "ART-erp",
			kind: "manifest",
			title: "manifest://subactor/subiekt-erp",
			status: "SYNCING",
			updatedAt: "Dzisiaj"
		}]
	},
	{
		id: "PRJ-04",
		name: "IoT CyberMysz Sensor Hub",
		domain: "cybermysz.net",
		status: "ACTIVE",
		manifestRef: "manifest://subactor/cybermysz-iot",
		targetHost: "Raspberry Pi 4 Model B",
		twinCount: 3,
		updatedAt: "Dzisiaj, 10:05",
		description: "Zarządzanie telemetrycznymi węzłami CyberMysz, agregacja czujników fizycznych i wykonania skryptów.",
		organizationId: "org-iot",
		organizationName: "CyberMysz IoT",
		tickets: [{
			id: "TCK-210",
			kind: "ticket",
			title: "Kalibracja czujników RPi",
			status: "ACTIVE",
			updatedAt: "Dzisiaj"
		}],
		artifacts: [{
			id: "ART-iot",
			kind: "twin",
			title: "Twin-IoT-CyberMysz",
			status: "ACTIVE",
			updatedAt: "Dzisiaj"
		}, {
			id: "ART-doc",
			kind: "doc",
			title: "sensor-topology.md",
			status: "DRAFT",
			updatedAt: "Wczoraj"
		}]
	}
];
function ProjectsSection({ session }) {
	const [projects, setProjects] = (0, import_react.useState)(INITIAL_PROJECTS);
	const [orgFilter, setOrgFilterState] = (0, import_react.useState)(() => getUrlParam("org") || "all");
	const [selectedProjectId, setSelectedProjectIdState] = (0, import_react.useState)(() => getUrlParam("project") || null);
	const orgFilterRef = (0, import_react.useRef)(orgFilter);
	const selectedProjectIdRef = (0, import_react.useRef)(selectedProjectId);
	orgFilterRef.current = orgFilter;
	selectedProjectIdRef.current = selectedProjectId;
	const syncProjectUrl = (view, org, projectId) => {
		updatePanelUrl({
			tab: "projects",
			view,
			org: org === "all" ? null : org,
			project: projectId,
			host: null
		});
	};
	const [projectView, setProjectView] = useSectionView("projects", [
		"cards",
		"table",
		"list",
		"import"
	], (v) => {
		if (v === "import") setSelectedProjectIdState(null);
		syncProjectUrl(v, orgFilterRef.current, v === "import" ? null : selectedProjectIdRef.current);
	});
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newDomain, setNewDomain] = (0, import_react.useState)("");
	const [newManifest, setNewManifest] = (0, import_react.useState)("");
	const [newHost, setNewHost] = (0, import_react.useState)("Hetzner Cloud VPS #01");
	const [newOrgId, setNewOrgId] = (0, import_react.useState)(PROJECT_ORGS[0].id);
	const [newDesc, setNewDesc] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const setOrgFilter = (org) => {
		setOrgFilterState(org);
		setSelectedProjectIdState(null);
		syncProjectUrl(projectView, org, null);
	};
	const setSelectedProjectId = (id) => {
		setSelectedProjectIdState(id);
		if (id && projectView === "import") {
			setProjectView("cards");
			syncProjectUrl("cards", orgFilter, id);
			return;
		}
		syncProjectUrl(projectView, orgFilter, id);
	};
	const filteredProjects = (0, import_react.useMemo)(() => {
		if (orgFilter === "all") return projects;
		return projects.filter((p) => p.organizationId === orgFilter);
	}, [projects, orgFilter]);
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(filteredProjects), 2);
	const selectedProject = projects.find((p) => p.id === selectedProjectId) ?? null;
	const handleCreateProject = (e) => {
		e.preventDefault();
		const orgMeta = PROJECT_ORGS.find((o) => o.id === newOrgId) ?? PROJECT_ORGS[0];
		const created = {
			id: `PRJ-${Math.floor(10 + Math.random() * 90)}`,
			name: newName.trim(),
			domain: newDomain.trim() || "local.subactor.internal",
			status: "BUILDING",
			manifestRef: newManifest.trim() ? newManifest.startsWith("manifest://") ? newManifest : `manifest://${newManifest}` : `manifest://${session.tenant_slug}/${newName.toLowerCase().replace(/\s+/g, "-")}`,
			targetHost: newHost,
			twinCount: 1,
			updatedAt: "Przed chwilą",
			description: newDesc.trim() || `Projekt subinstancji Subactor dla organizacji ${orgMeta.name}.`,
			organizationId: orgMeta.id,
			organizationName: orgMeta.name,
			tickets: [],
			artifacts: [{
				id: `ART-${Date.now().toString().slice(-4)}`,
				kind: "manifest",
				title: "Manifest startowy",
				status: "BUILDING",
				updatedAt: "Przed chwilą"
			}]
		};
		setProjects([created, ...projects]);
		setNewName("");
		setNewDomain("");
		setNewManifest("");
		setNewDesc("");
		setNotice(`Utworzono i zainicjowano nowy projekt na samej górze: ${created.name}`);
		setProjectView("cards");
		setSelectedProjectId(created.id);
		setTimeout(() => setNotice(null), 3500);
	};
	const projectModes = [
		{
			id: "cards",
			label: "Karty",
			icon: "cube",
			title: "Widok Kart Projektów Platformy"
		},
		{
			id: "table",
			label: "Tabela",
			icon: "building",
			title: "Widok Tabeli Manifestów i Projektów"
		},
		{
			id: "list",
			label: "Lista",
			icon: "checkSquare",
			title: "Widok Listy Statusów Projektów"
		},
		{
			id: "import",
			label: "Import WWW/App",
			icon: "plus",
			title: "Formularz Importu Strony WWW / Manifestu"
		}
	];
	const openProject = (id) => setSelectedProjectId(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "cube",
							className: "icon-lg"
						}),
						"Organizacja → Projekty (",
						filteredProjects.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						"Hierarchia: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Org" }),
						" → ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Projekty" }),
						" → tickety i artefakty. Najemca ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }),
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: projectModes,
					current: projectView,
					onChange: setProjectView
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: "1rem",
					display: "flex",
					gap: "0.5rem",
					flexWrap: "wrap",
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							fontSize: "0.85rem",
							color: "var(--text-muted)"
						},
						children: "Organizacja:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `btn btn-sm ${orgFilter === "all" ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setOrgFilter("all"),
						children: "Wszystkie"
					}),
					PROJECT_ORGS.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `btn btn-sm ${orgFilter === org.id ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setOrgFilter(org.id),
						children: org.name
					}, org.id))
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-success",
				style: {
					marginTop: "1rem",
					marginBottom: "0.5rem",
					padding: "0.8rem 1rem",
					fontSize: "0.9rem"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }),
					" ",
					notice
				]
			}),
			selectedProject && projectView !== "import" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: {
					marginTop: "1.25rem",
					border: "1px solid var(--accent-primary)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						gap: "1rem",
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "section-sub",
							style: {
								margin: 0,
								marginBottom: "0.35rem"
							},
							children: [
								selectedProject.organizationName,
								" → ",
								selectedProject.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "panel-card-title",
							style: { marginBottom: "0.35rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }),
								" ",
								selectedProject.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								margin: 0,
								color: "var(--text-muted)",
								fontSize: "0.9rem"
							},
							children: selectedProject.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-sm btn-secondary",
						onClick: () => setSelectedProjectId(null),
						children: "Zamknij szczegóły"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						style: { fontSize: "0.85rem" },
						children: [
							"Tickety (",
							selectedProject.tickets.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						style: {
							margin: "0.5rem 0 0",
							paddingLeft: "1.1rem",
							fontSize: "0.88rem"
						},
						children: [selectedProject.tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Brak ticketów" }), selectedProject.tickets.map((tck) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: tck.id }),
							" — ",
							tck.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-info",
								children: tck.status
							})
						] }, tck.id))]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
						style: { fontSize: "0.85rem" },
						children: [
							"Artefakty (",
							selectedProject.artifacts.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						style: {
							margin: "0.5rem 0 0",
							paddingLeft: "1.1rem",
							fontSize: "0.88rem"
						},
						children: [selectedProject.artifacts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Brak artefaktów" }), selectedProject.artifacts.map((art) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: art.id }),
							" — ",
							art.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge badge-info",
								children: art.kind
							})
						] }, art.id))]
					})] })]
				})]
			}),
			projectView === "cards" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "connect-grid",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((prj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `connect-card is-connected${selectedProjectId === prj.id ? " is-selected" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "integration-name",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }),
									" ",
									prj.name
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${prj.status === "DEPLOYED" || prj.status === "ACTIVE" ? "status-ok" : "status-proc"}`,
								children: prj.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "integration-desc",
							style: { marginBottom: "0.35rem" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "building" }),
								" ",
								prj.organizationName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "integration-desc",
							children: prj.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								background: "rgba(0,0,0,0.25)",
								padding: "0.6rem",
								borderRadius: "6px",
								fontSize: "0.82rem",
								margin: "0.75rem 0",
								display: "flex",
								flexDirection: "column",
								gap: "0.3rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Domena: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.domain })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Manifest: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									style: { color: "#38bdf8" },
									children: prj.manifestRef
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Host: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.targetHost })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									"Tickety: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.tickets.length }),
									" · Artefakty: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.artifacts.length })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-foot",
							style: {
								fontSize: "0.82rem",
								color: "var(--text-muted)",
								marginTop: "0.5rem",
								display: "flex",
								justifyContent: "space-between",
								gap: "0.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Bliźniaki: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.twinCount }),
								" · ",
								prj.updatedAt
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-sm btn-secondary",
								onClick: () => openProject(prj.id),
								children: "Otwórz"
							})]
						})
					]
				}, prj.id))
			}),
			projectView === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					overflowX: "auto",
					marginTop: "1.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: {
						width: "100%",
						fontSize: "0.9rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Organizacja" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID & Nazwa" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Domena" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Manifest" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tickety" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((prj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: prj.organizationName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: prj.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: "0.78rem",
								color: "var(--text-muted)"
							},
							children: prj.id
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: prj.domain }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							style: { color: "var(--accent-color)" },
							children: prj.manifestRef
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							style: { textAlign: "center" },
							children: prj.tickets.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${prj.status === "DEPLOYED" || prj.status === "ACTIVE" ? "status-ok" : "status-proc"}`,
							children: prj.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-sm btn-secondary",
							onClick: () => openProject(prj.id),
							children: "Szczegóły"
						}) })
					] }, prj.id)) })]
				})
			}),
			projectView === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((prj) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "token-item",
					style: {
						padding: "1.2rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: "0.75rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { fontSize: "1.1rem" },
							children: prj.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.85rem",
								color: "var(--text-muted)",
								marginTop: "0.2rem"
							},
							children: [
								prj.organizationName,
								" · ",
								prj.id,
								" · ",
								prj.domain
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem",
								alignItems: "center"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${prj.status === "DEPLOYED" || prj.status === "ACTIVE" ? "status-ok" : "status-proc"}`,
								children: prj.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-sm btn-secondary",
								onClick: () => openProject(prj.id),
								children: "Otwórz"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.88rem",
							color: "var(--text-secondary)",
							margin: 0
						},
						children: prj.description
					})]
				}, prj.id))
			}),
			projectView === "import" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plus",
						className: "icon-lg"
					}), " Nowy Projekt / Import Strony WWW i Aplikacji"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreateProject,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Organizacja właścicielska"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: "form-input",
										value: newOrgId,
										onChange: (e) => setNewOrgId(e.target.value),
										children: PROJECT_ORGS.map((org) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: org.id,
											children: org.name
										}, org.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Nazwa Projektu / Aplikacji"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. Sklep Internetowy Klienta X",
										value: newName,
										onChange: (e) => setNewName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Domena / Subdomena Systemowa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. sklep.klient.pl",
										value: newDomain,
										onChange: (e) => setNewDomain(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Referencja Manifestu (`manifest://`)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. manifest://tenant/sklep-app",
										value: newManifest,
										onChange: (e) => setNewManifest(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Docelowy Host Infrastruktury"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "form-input",
										value: newHost,
										onChange: (e) => setNewHost(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Hetzner Cloud VPS #01",
												children: "Hetzner Cloud VPS #01"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Bare-Metal AX41-NVMe",
												children: "Bare-Metal AX41-NVMe"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Raspberry Pi 4 Model B",
												children: "Raspberry Pi 4 Model B"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Worker Node #03",
												children: "Worker Node #03"
											})
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Opis Projektu & Wymagania Wdrożeniowe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "form-input",
								placeholder: "Opisz specyfikację subinstancji",
								value: newDesc,
								onChange: (e) => setNewDesc(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "btn-primary",
							style: { justifySelf: "start" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Utwórz i Zainicjuj Projekt na Górze"]
						})
					]
				})]
			}),
			projectView !== "import" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			})
		]
	});
}
var INITIAL_ORG_REGISTRIES = [
	{
		id: "ORG-01",
		name: "TechCorp Sp. z o.o.",
		registryType: "CLIENT",
		emailOrRef: "admin@techcorp.pl",
		roleOrPlan: "Plan Starter Per-User (10 Użytkowników)",
		status: "ACTIVE",
		assignedTwin: "Twin-Subiekt-ERP",
		updatedAt: "Dzisiaj, 13:50",
		details: "Klient komercyjny najemca główny. Pełna obsługa faktur i integracji z hurtowniami."
	},
	{
		id: "ORG-02",
		name: "Jan Kowalski (Founder & CEO)",
		registryType: "CONTACT",
		emailOrRef: "jan@kowalski.pl",
		roleOrPlan: "Lead Governance & Security Officer",
		status: "ACTIVE",
		assignedTwin: "Twin-AI-Assistant",
		updatedAt: "Dzisiaj, 12:00",
		details: "Główny kontakt autoryzacyjny ds. umów SLA oraz rotacji kluczy produkcyjnych."
	},
	{
		id: "ORG-03",
		name: "Umowa Licencyjna On-Premise #2026-89",
		registryType: "CONTRACT",
		emailOrRef: "Kwit-GOV-PASS-891",
		roleOrPlan: "Dedykowany Serwer VPS + Maintenance",
		status: "SIGNED",
		assignedTwin: "Twin-Allegro-Pro",
		updatedAt: "Wczoraj, 18:30",
		details: "Umowa roczna z gwarantowaną retencją logów 12 msc i dedykowanym czasem reakcji POA 2.8 ms."
	},
	{
		id: "ORG-04",
		name: "Incydent SLA-104: Plesk Sync Delay",
		registryType: "SUPPORT_CASE",
		emailOrRef: "TICKET-8921",
		roleOrPlan: "Priorytet HIGH / Czas Reakcji OK",
		status: "RESOLVED",
		assignedTwin: "Twin-Allegro-Pro",
		updatedAt: "Wczoraj, 14:15",
		details: "Automatycznie rozwiązana sprawa wsparcia technicznego synchronizacji domen Plesk."
	},
	{
		id: "ORG-05",
		name: "Retail Group SA",
		registryType: "CLIENT",
		emailOrRef: "it@retailgroup.com",
		roleOrPlan: "Plan Enterprise Custom (50 Użytkowników)",
		status: "ACTIVE",
		assignedTwin: "Twin-Subiekt-ERP",
		updatedAt: "14 Sie 2026",
		details: "Wielooddziałowa sieć handlowa z dedykowaną bazą danych MSSQL i łączem 1Gbps."
	},
	{
		id: "ORG-06",
		name: "Anna Nowak (DevOps Manager)",
		registryType: "CONTACT",
		emailOrRef: "anna@retailgroup.com",
		roleOrPlan: "Administrator Węzłów Node",
		status: "ACTIVE",
		assignedTwin: "Twin-IoT-CyberMysz",
		updatedAt: "10 Sie 2026",
		details: "Odpowiedzialna za utrzymanie maszyn Raspberry Pi oraz integracji z serwerami Ollama."
	}
];
var ORG_DOMAIN_AS_VIEW = /* @__PURE__ */ new Set([
	"clients",
	"contracts",
	"support"
]);
function resolveOrgRegistry() {
	const fromParam = getUrlParam("registry");
	if (fromParam === "all" || fromParam === "clients" || fromParam === "contracts" || fromParam === "support") return fromParam;
	const legacyView = getUrlView();
	if (ORG_DOMAIN_AS_VIEW.has(legacyView)) return legacyView;
	return "all";
}
function OrganizationSection({ session, lockedRegistry }) {
	const orgTab = lockedRegistry ?? "organization";
	const [orgItems, setOrgItems] = (0, import_react.useState)(INITIAL_ORG_REGISTRIES);
	const [registry, setRegistryState] = (0, import_react.useState)(() => lockedRegistry ?? resolveOrgRegistry());
	const registryRef = (0, import_react.useRef)(registry);
	registryRef.current = registry;
	const syncOrgUrl = (view, reg) => {
		updatePanelUrl({
			tab: orgTab,
			view,
			registry: lockedRegistry ? null : reg === "all" ? null : reg,
			project: null,
			host: null,
			org: null
		});
	};
	const [orgView, setOrgView] = useSectionView(orgTab, [
		"cards",
		"table",
		"list",
		"matrix",
		"add"
	], (v) => syncOrgUrl(v, registryRef.current));
	(0, import_react.useEffect)(() => {
		if (lockedRegistry) return;
		const legacy = getUrlView();
		if (ORG_DOMAIN_AS_VIEW.has(legacy)) {
			const reg = legacy;
			setRegistryState(reg);
			syncOrgUrl("list", reg);
		}
	}, []);
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newEmail, setNewEmail] = (0, import_react.useState)("");
	const [newRoleOrPlan, setNewRoleOrPlan] = (0, import_react.useState)("");
	const [newType, setNewType] = (0, import_react.useState)(lockedRegistry === "contracts" ? "CONTRACT" : "CLIENT");
	const [newDetails, setNewDetails] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)(null);
	const setRegistry = (reg) => {
		setRegistryState(reg);
		const nextView = orgView === "add" ? "list" : orgView;
		if (orgView === "add") setOrgView("list");
		syncOrgUrl(nextView, reg);
	};
	const filteredItems = (0, import_react.useMemo)(() => {
		if (registry === "clients") return orgItems.filter((i) => i.registryType === "CLIENT");
		if (registry === "contracts") return orgItems.filter((i) => i.registryType === "CONTRACT");
		if (registry === "support") return orgItems.filter((i) => i.registryType === "SUPPORT_CASE");
		return orgItems.filter((i) => i.registryType !== "CONTACT");
	}, [orgItems, registry]);
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(usePanelFilteredItems(filteredItems), 2);
	const handleAddOrgItem = (e) => {
		e.preventDefault();
		const created = {
			id: `ORG-${Math.floor(10 + Math.random() * 90)}`,
			name: newName.trim(),
			registryType: newType,
			emailOrRef: newEmail.trim() || `contact@${session.tenant_slug}.com`,
			roleOrPlan: newRoleOrPlan.trim() || "Domyślny Profil Organizacji",
			status: newType === "CONTRACT" ? "SIGNED" : newType === "SUPPORT_CASE" ? "PENDING" : "ACTIVE",
			assignedTwin: "Twin-Subiekt-ERP",
			updatedAt: "Przed chwilą",
			details: newDetails.trim() || `Wpis w rejestrze organizacji dla najemcy ${session.tenant_slug}.`
		};
		setOrgItems([created, ...orgItems]);
		setNewName("");
		setNewEmail("");
		setNewRoleOrPlan("");
		setNewDetails("");
		setNotice(`Utworzono nowy wpis: ${created.name}`);
		const regFromType = newType === "CLIENT" ? "clients" : newType === "CONTRACT" ? "contracts" : newType === "SUPPORT_CASE" ? "support" : "all";
		setRegistryState(regFromType);
		setOrgView("list");
		syncOrgUrl("list", regFromType);
		setTimeout(() => setNotice(null), 3500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "building",
							className: "icon-lg"
						}),
						" ",
						lockedRegistry === "contracts" ? t("panel_nav_contracts") : t("panel_org_title"),
						" (",
						filteredItems.length,
						" / ",
						orgItems.filter((item) => item.registryType !== "CONTACT").length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						lockedRegistry ? t("panel_org_locked_sub") : t("panel_org_registry_sub"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }),
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes: [
						{
							id: "cards",
							label: "Karty",
							icon: "cube",
							title: "Karty"
						},
						{
							id: "table",
							label: "Tabela",
							icon: "building",
							title: "Tabela"
						},
						{
							id: "list",
							label: "Lista",
							icon: "checkSquare",
							title: "Lista"
						},
						{
							id: "matrix",
							label: "Macierz",
							icon: "kanban",
							title: "Macierz"
						},
						{
							id: "add",
							label: "Dodaj Wpis Organizacji",
							icon: "plus",
							title: "Dodaj"
						}
					],
					current: orgView,
					onChange: setOrgView
				})]
			}),
			orgView !== "add" && !lockedRegistry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: "1rem",
					display: "flex",
					gap: "0.5rem",
					flexWrap: "wrap",
					alignItems: "center"
				},
				role: "group",
				"aria-label": "Rejestr organizacji",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontSize: "0.85rem",
						color: "var(--text-muted)"
					},
					children: "Rejestr:"
				}), [
					{
						id: "all",
						label: "Wszystkie"
					},
					{
						id: "clients",
						label: "Klienci / Najemci"
					},
					{
						id: "contracts",
						label: "Umowy & SLA"
					},
					{
						id: "support",
						label: "Wsparcie / Incydenty"
					}
				].map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `btn btn-sm ${registry === chip.id ? "btn-primary" : "btn-secondary"}`,
					onClick: () => setRegistry(chip.id),
					children: chip.label
				}, chip.id))]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "badge badge-success",
				style: {
					marginTop: "1rem",
					marginBottom: "0.5rem",
					padding: "0.8rem 1rem",
					fontSize: "0.9rem"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }),
					" ",
					notice
				]
			}),
			(orgView === "matrix" || orgView === "table") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					overflowX: "auto",
					marginTop: "1.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: {
						width: "100%",
						fontSize: "0.9rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nazwa" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Typ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "E-mail / Ref" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rola" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Twin" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.id }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-info",
							children: item.registryType
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.emailOrRef }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.roleOrPlan }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.assignedTwin }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${item.status === "ACTIVE" || item.status === "SIGNED" || item.status === "RESOLVED" ? "status-ok" : "status-proc"}`,
							children: item.status
						}) })
					] }, item.id)) })]
				})
			}),
			(orgView === "cards" || orgView === "list") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: orgView === "cards" ? "connect-grid" : "token-list",
				style: { marginTop: "1.5rem" },
				children: visibleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: orgView === "cards" ? "connect-card is-connected" : "token-item",
					style: {
						padding: "1.2rem",
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: "0.75rem"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							style: { fontSize: "1.05rem" },
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								fontSize: "0.85rem",
								color: "var(--text-muted)"
							},
							children: [
								item.id,
								" • ",
								item.emailOrRef
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${item.status === "ACTIVE" || item.status === "SIGNED" || item.status === "RESOLVED" ? "status-ok" : "status-proc"}`,
							children: item.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.88rem",
							color: "var(--text-secondary)",
							margin: 0
						},
						children: item.details
					})]
				}, item.id))
			}),
			orgView === "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.5rem" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-card-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "plus",
						className: "icon-lg"
					}), " Dodaj Nowy Wpis do Rejestru Organizacji"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAddOrgItem,
					style: {
						display: "grid",
						gap: "1rem",
						marginTop: "1rem"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "grid",
								gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
								gap: "1rem"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Typ Rejestru"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "form-input",
										value: newType,
										onChange: (e) => setNewType(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CLIENT",
												children: "Klient / Najemca SaaS"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "CONTRACT",
												children: "Umowa / Licencja On-Premise"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "SUPPORT_CASE",
												children: "Sprawa Wsparcia / Incydent SLA"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Nazwa Wpisu / Podmiotu"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. Firma Partner Sp. z o.o. lub Osoba X",
										value: newName,
										onChange: (e) => setNewName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "E-mail / Identyfikator Referencyjny"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. kontakt@partner.pl lub REF-8912",
										value: newEmail,
										onChange: (e) => setNewEmail(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "form-label",
										children: "Rola / Plan Subskrypcyjny / Specyfikacja"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										className: "form-input",
										placeholder: "np. Plan Starter Per-User / Governance Lead",
										value: newRoleOrPlan,
										onChange: (e) => setNewRoleOrPlan(e.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Opis & Szczegóły Wpisu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								className: "form-input",
								placeholder: "Dodatkowy opis celów biznesowych, warunków licencji lub ustaleń SLA",
								value: newDetails,
								onChange: (e) => setNewDetails(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: "0.5rem"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "btn-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Dodaj Wpis do Rejestru na Górze"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn-secondary",
								onClick: () => setOrgView("list"),
								children: "Anuluj"
							})]
						})
					]
				})]
			}),
			orgView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			})
		]
	});
}
var INITIAL_CONNECTORS = [
	{
		id: "mcp-gateway",
		kind: "mcp",
		name: "MCP Gateway (local)",
		endpoint: "http://127.0.0.1:9000/v1",
		tags: [
			"local",
			"tools",
			"openai-compatible"
		],
		status: "active",
		description: "Brama narzędzi MCP używana przez OpenWebUI i agentów panelu."
	},
	{
		id: "mcp-subactor",
		kind: "mcp",
		name: "Subactor MCP adapter",
		endpoint: "https://mcp.subactor.internal/mcp",
		tags: [
			"subactor",
			"control",
			"knowledge"
		],
		status: "draft",
		description: "Streamable HTTP adapter do Control / knowledge (może być niedostępny lokalnie)."
	},
	{
		id: "a2a-validator",
		kind: "a2a",
		name: "Validator Agent A2A",
		endpoint: "http://127.0.0.1:8799/a2a",
		tags: [
			"agent",
			"pr-review",
			"attestation"
		],
		status: "active",
		description: "Endpoint Agent-to-Agent dla validator-agent (merge attestation)."
	}
];
function ConnectorRegistrySection({ session, kind }) {
	const tab = kind;
	const [connectors, setConnectors] = (0, import_react.useState)(() => INITIAL_CONNECTORS.filter((c) => c.kind === kind));
	const [tagFilter, setTagFilterState] = (0, import_react.useState)(() => getUrlParam("tag") || "all");
	const [textFilter, setTextFilterState] = (0, import_react.useState)(() => getUrlParam("filter") || "");
	const tagFilterRef = (0, import_react.useRef)(tagFilter);
	const textFilterRef = (0, import_react.useRef)(textFilter);
	tagFilterRef.current = tagFilter;
	textFilterRef.current = textFilter;
	const syncConnUrl = (view, tag, filter) => {
		updatePanelUrl({
			tab,
			view,
			tag: tag === "all" ? null : tag,
			filter: filter.trim() ? filter.trim() : null,
			project: null,
			host: null,
			org: null,
			registry: null
		});
	};
	const [connView, setConnView] = useSectionView(tab, [
		"cards",
		"table",
		"list",
		"add"
	], (v) => syncConnUrl(v, tagFilterRef.current, textFilterRef.current));
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newEndpoint, setNewEndpoint] = (0, import_react.useState)("");
	const [newTags, setNewTags] = (0, import_react.useState)("local");
	const [newDesc, setNewDesc] = (0, import_react.useState)("");
	const setTagFilter = (tag) => {
		setTagFilterState(tag);
		syncConnUrl(connView, tag, textFilter);
	};
	const setTextFilter = (value) => {
		setTextFilterState(value);
		syncConnUrl(connView, tagFilter, value);
	};
	const allTags = (0, import_react.useMemo)(() => {
		const tags = /* @__PURE__ */ new Set();
		connectors.forEach((c) => c.tags.forEach((t) => tags.add(t)));
		return [...tags].sort();
	}, [connectors]);
	const filtered = (0, import_react.useMemo)(() => connectors.filter((c) => {
		if (tagFilter !== "all" && !c.tags.includes(tagFilter)) return false;
		if (textFilter.trim()) {
			const q = textFilter.trim().toLowerCase();
			if (!`${c.name} ${c.endpoint} ${c.description} ${c.tags.join(" ")}`.toLowerCase().includes(q)) return false;
		}
		return true;
	}), [
		connectors,
		tagFilter,
		textFilter
	]);
	const { visibleItems, hasMore, loadMore, visibleCount, totalCount } = useInfiniteScroll(filtered, 4);
	const handleAdd = (e) => {
		e.preventDefault();
		if (!newName.trim() || !newEndpoint.trim()) return;
		const created = {
			id: `${kind}-${Date.now().toString(36).slice(-5)}`,
			kind,
			name: newName.trim(),
			endpoint: newEndpoint.trim(),
			tags: newTags.split(",").map((t) => t.trim()).filter(Boolean),
			status: "active",
			description: newDesc.trim() || `Konektor ${kind.toUpperCase()} dla ${session.tenant_slug}.`
		};
		setConnectors([created, ...connectors]);
		setNewName("");
		setNewEndpoint("");
		setNewDesc("");
		setConnView("list");
	};
	const modes = [
		{
			id: "cards",
			label: "Karty",
			icon: "cube",
			title: "Karty"
		},
		{
			id: "table",
			label: "Tabela",
			icon: "building",
			title: "Tabela"
		},
		{
			id: "list",
			label: "Lista",
			icon: "checkSquare",
			title: "Lista"
		},
		{
			id: "add",
			label: `Zarejestruj ${kind.toUpperCase()}`,
			icon: "plus",
			title: "Dodaj"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "item-section-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "panel-section-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: kind === "mcp" ? "cpu" : "zap",
							className: "icon-lg"
						}),
						" ",
						kind === "mcp" ? "Serwery MCP" : "Serwery A2A",
						" (",
						filtered.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "section-sub",
					style: {
						margin: 0,
						marginTop: "0.25rem",
						color: "var(--text-muted)",
						fontSize: "0.9rem"
					},
					children: [
						"Osobna domena nawigacji. Najemca ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }),
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionViewToolbar, {
					modes,
					current: connView,
					onChange: setConnView
				})]
			}),
			connView !== "add" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					marginTop: "1rem",
					display: "flex",
					flexWrap: "wrap",
					gap: "0.5rem",
					alignItems: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						style: { maxWidth: "240px" },
						placeholder: "Filtr tekstowy…",
						value: textFilter,
						onChange: (e) => setTextFilter(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `btn btn-sm ${tagFilter === "all" ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setTagFilter("all"),
						children: "Wszystkie tagi"
					}),
					allTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `btn btn-sm ${tagFilter === tag ? "btn-primary" : "btn-secondary"}`,
						onClick: () => setTagFilter(tag),
						children: ["#", tag]
					}, tag))
				]
			}),
			connView === "add" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAdd,
				className: "panel-card panel-card-wide",
				style: { marginTop: "1.25rem" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "panel-card-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }),
							" Rejestracja ",
							kind.toUpperCase()
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
							gap: "1rem",
							marginTop: "1rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Nazwa"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									value: newName,
									onChange: (e) => setNewName(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Endpoint"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									value: newEndpoint,
									onChange: (e) => setNewEndpoint(e.target.value),
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Tagi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									value: newTags,
									onChange: (e) => setNewTags(e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "btn-primary",
						style: { marginTop: "1rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plus" }), " Zapisz"]
					})
				]
			}) : connView === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					overflowX: "auto",
					marginTop: "1.25rem"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					style: {
						width: "100%",
						fontSize: "0.9rem"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nazwa" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Endpoint" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tagi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visibleItems.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: c.endpoint }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.tags.map((t) => `#${t}`).join(" ") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.status })
					] }, c.id)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
					hasMore,
					loadMore,
					visibleCount,
					totalCount
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: connView === "cards" ? "connect-grid" : "token-list",
				style: { marginTop: "1.25rem" },
				children: visibleItems.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: connView === "cards" ? "connect-card is-connected" : "token-item",
					style: { padding: "1rem" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-info",
							children: c.kind.toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: c.endpoint }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { fontSize: "0.88rem" },
							children: c.description
						})
					]
				}, c.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfiniteScrollFooter, {
				hasMore,
				loadMore,
				visibleCount,
				totalCount
			})] })
		]
	});
}
function boundedChatText(value) {
	if (!value || typeof value !== "object") return String(value ?? "");
	const row = value;
	for (const key of [
		"message",
		"summary",
		"deterministic_summary",
		"answer",
		"clarification"
	]) if (typeof row[key] === "string" && row[key]) return row[key];
	if (row.result && typeof row.result === "object") return boundedChatText(row.result);
	return JSON.stringify(value, null, 2).slice(0, 6e3);
}
function webUrlArtifacts(value) {
	const found = /* @__PURE__ */ new Map();
	const sensitiveKey = /(?:auth|credential|key|password|secret|signature|token)/iu;
	for (const match of value.matchAll(/https?:\/\/[^\s<>"']+/giu)) {
		const raw = match[0].replace(/[),.;!?]+$/u, "");
		if (raw.length > 2048) continue;
		try {
			const parsed = new URL(raw);
			if (parsed.protocol !== "http:" && parsed.protocol !== "https:") continue;
			let redacted = false;
			if (parsed.username || parsed.password) {
				parsed.username = "";
				parsed.password = "";
				redacted = true;
			}
			if (parsed.hash) {
				parsed.hash = "";
				redacted = true;
			}
			for (const key of [...parsed.searchParams.keys()]) if (sensitiveKey.test(key)) {
				parsed.searchParams.set(key, "[redacted]");
				redacted = true;
			}
			const url = parsed.toString();
			found.set(url, {
				ref: url,
				kind: "url",
				title: `URL · ${parsed.hostname}`,
				detail: {
					url,
					host: parsed.hostname,
					path: parsed.pathname,
					redacted
				}
			});
		} catch {}
	}
	return [...found.values()].slice(0, 8);
}
function mergeChatArtifacts(current, additions) {
	const merged = new Map(current.map((artifact) => [artifact.ref, artifact]));
	additions.forEach((artifact) => merged.set(artifact.ref, artifact));
	return [...merged.values()].slice(0, 16);
}
function chatArtifactWebUrl(artifact) {
	if (artifact.kind !== "url" || !artifact.detail || typeof artifact.detail !== "object") return null;
	const candidate = artifact.detail.url;
	return typeof candidate === "string" && /^https?:\/\//u.test(candidate) ? candidate : null;
}
function localChatViewIntent(value) {
	const normalized = value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replaceAll("ł", "l");
	if (/\b(?:nie\s+(?:otwieraj|otworz|pokazuj|pokaz|przechodz|przejdz|wyswietlaj|wyswietl)|do not\s+(?:open|show|display|go)|dont\s+(?:open|show|display|go))\b/u.test(normalized)) return null;
	if (!/\b(?:check|open|show|view|display|go to|otworz|pokaz|przejdz|sprawdz|wyswietl)\b/u.test(normalized)) return null;
	const targets = [];
	if (/\b(?:project|projects|projekt\w*)\b/u.test(normalized)) targets.push({
		tab: "projects",
		label: "Projekty"
	});
	if (/\b(?:task|tasks|ticket|tickets|zadan\w*|ticket\w*)\b/u.test(normalized)) targets.push({
		tab: "tasks",
		label: "Zadania"
	});
	if (/\b(?:node|nodes|wezel|wezly|wezlow)\b/u.test(normalized)) targets.push({
		tab: "nodes",
		label: "Node’y"
	});
	return targets.length === 1 ? targets[0] : null;
}
function resultArtifacts(value) {
	const found = /* @__PURE__ */ new Map();
	const visit = (candidate, depth = 0) => {
		if (depth > 5 || found.size >= 24 || candidate === null) return;
		if (Array.isArray(candidate)) {
			candidate.slice(0, 30).forEach((item) => visit(item, depth + 1));
			return;
		}
		if (typeof candidate !== "object") return;
		for (const [key, raw] of Object.entries(candidate)) {
			if (typeof raw === "string" && raw.length <= 240 && (key === "uri" || key === "url" || key.endsWith("_id") || key.endsWith("_ref") || key === "plan_hash")) {
				const ref = raw.includes(":") ? raw : `${key.replaceAll("_", "-")}:${raw}`;
				if (/^[A-Za-z][A-Za-z0-9+.-]*:[A-Za-z0-9._:/-]+$/.test(ref)) found.set(ref, {
					ref,
					kind: "result",
					title: `${key}: ${raw}`,
					detail: candidate
				});
			}
			visit(raw, depth + 1);
		}
	};
	visit(value);
	return [...found.values()];
}
function ChatOpenWebUiSection({ session, hosting, events, enrolledNodes, integrations, connections, onNavigate }) {
	const [url, setUrl] = (0, import_react.useState)(() => resolveOpenWebUiUrl(hosting));
	const [reachable, setReachable] = (0, import_react.useState)("unknown");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [attached, setAttached] = (0, import_react.useState)([]);
	const [openedArtifact, setOpenedArtifact] = (0, import_react.useState)(null);
	const [showContext, setShowContext] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(min-width: 1280px)").matches) setShowContext(true);
	}, []);
	(0, import_react.useEffect)(() => {
		setUrl(resolveOpenWebUiUrl(hosting));
	}, [hosting.openwebui_url]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setReachable("unknown");
		const controller = new AbortController();
		const timer = window.setTimeout(() => controller.abort(), 2500);
		fetch(url.replace(/\/?$/, "/health"), {
			signal: controller.signal,
			mode: "no-cors"
		}).then(() => {
			if (!cancelled) setReachable("ok");
		}).catch(() => {
			if (!cancelled) setReachable("fail");
		}).finally(() => window.clearTimeout(timer));
		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [url]);
	const availableArtifacts = [
		...attached.filter((artifact) => artifact.kind === "url"),
		{
			ref: "twin://actor/digital-twin/query/self",
			kind: "twin",
			title: `Digital Twin aktora · ${session.tenant_slug}`,
			detail: {
				tenant: session.tenant_slug,
				plan: session.plan,
				scope: "self"
			}
		},
		{
			ref: `artifact://portal/hosting/${session.tenant_slug}`,
			kind: "twin",
			title: `Digital Twin hostingu · ${session.tenant_slug}`,
			detail: {
				subdomain: hosting.subdomain,
				phase: hosting.phase,
				blockers: hosting.blockers ?? []
			}
		},
		...enrolledNodes.map((node) => ({
			ref: `node://${node.id}/runtime/query/health`,
			kind: "node",
			title: `Digital Twin hosta · ${node.id}`,
			detail: {
				id: node.id,
				readiness: node.readiness,
				routes: node.routes,
				last_seen: node.last_seen
			}
		})),
		...integrations.filter((integration) => Boolean(connections[integration.id])).map((integration) => ({
			ref: `integration:${integration.id}`,
			kind: "api",
			title: `Digital Twin API · ${integration.name}`,
			detail: {
				id: integration.id,
				category: integration.category,
				status: integration.status,
				connected: true,
				connection: connections[integration.id]
			}
		})),
		...events.slice(0, 12).map((event) => ({
			ref: `event:${event.event_id}`,
			kind: "event",
			title: `${event.event_type} · ${event.timestamp}`,
			detail: event
		}))
	];
	const toggleAttachment = (artifact) => {
		setAttached((current) => current.some((item) => item.ref === artifact.ref) ? current.filter((item) => item.ref !== artifact.ref) : [...current, artifact].slice(0, 16));
	};
	const submit = async () => {
		const prompt = text.trim();
		if (!prompt || sending) return;
		const discoveredUrls = webUrlArtifacts(prompt);
		const messageArtifacts = mergeChatArtifacts(attached, discoveredUrls);
		const userMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content: prompt,
			artifacts: messageArtifacts
		};
		const history = [...messages, userMessage].filter((message) => message.role !== "error").slice(-12).map((message) => ({
			role: message.role,
			content: message.content
		}));
		setMessages((current) => [...current, userMessage]);
		setText("");
		if (discoveredUrls.length) {
			setAttached(messageArtifacts);
			setOpenedArtifact(discoveredUrls[0]);
			setShowContext(true);
			setMessages((current) => [...current, {
				id: `assistant-${Date.now()}`,
				role: "assistant",
				content: discoveredUrls.length === 1 ? "Dodałem bezpieczny URL do kontekstu i otworzyłem jego widok." : `Dodałem ${discoveredUrls.length} bezpiecznych adresów URL do kontekstu i otworzyłem pierwszy widok.`,
				artifacts: discoveredUrls
			}]);
			return;
		}
		const localView = localChatViewIntent(prompt);
		if (localView) {
			setMessages((current) => [...current, {
				id: `assistant-${Date.now()}`,
				role: "assistant",
				content: `Otwieram widok „${localView.label}”. To nawigacja tylko do odczytu; nie uruchamiam żadnego zadania.`
			}]);
			window.setTimeout(() => onNavigate(localView.tab), 0);
			return;
		}
		setSending(true);
		try {
			const response = await fetch("/api/chat/intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					text: prompt,
					history,
					references: messageArtifacts.map(({ ref, kind, title }) => ({
						ref,
						kind,
						title
					}))
				})
			});
			const payload = await response.json().catch(() => ({
				ok: false,
				error: "invalid_response"
			}));
			if (!response.ok || payload.ok !== true) throw new Error(String(payload.error || `HTTP ${response.status}`));
			const artifacts = resultArtifacts(payload.result);
			setMessages((current) => [...current, {
				id: `assistant-${Date.now()}`,
				role: "assistant",
				content: boundedChatText(payload.result),
				artifacts
			}]);
			setAttached([]);
		} catch (error) {
			const code = error.message;
			const message = code === "portal_control_not_configured" ? "Chat Control nie jest jeszcze skonfigurowany dla tego hosta. Administrator musi ustawić serwerowy, ograniczony token portalu." : `Nie udało się uzyskać planu: ${code}`;
			setMessages((current) => [...current, {
				id: `error-${Date.now()}`,
				role: "error",
				content: message
			}]);
		} finally {
			setSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-tab-content chat-page",
		"data-chat-workspace": "native",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "chat-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chat-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "chat-heading-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cpu" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Chat operacyjny" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Organizacja ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }),
						" · planowanie z kontrolą uprawnień"
					] })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "chat-header-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-secondary",
						"aria-expanded": showContext,
						onClick: () => setShowContext((shown) => !shown),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "layers" }),
							" Kontekst",
							!!attached.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-tab-badge",
								children: attached.length
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "btn btn-secondary",
						href: url,
						target: "_blank",
						rel: "noreferrer noopener",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "external" }), " Agent zaawansowany"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `chat-shell${showContext ? " has-context" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "chat-thread",
					"aria-label": "Rozmowa z Subactor",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-transcript",
						"aria-live": "polite",
						children: [
							messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "chat-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "chat-empty-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cpu" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Co chcesz osiągnąć?" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Opisz rezultat i granice działania. Subactor przygotuje plan i ticket, ale nie wykona mutacji bez właściwego zatwierdzenia." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "chat-starters",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setText("Sprawdź stan moich projektów i wskaż najważniejsze blokery."),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "building" }), " Sprawdź projekty"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setText("Przygotuj ticket dla następnego bezpiecznego kroku, bez wykonywania zmian."),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkSquare" }), " Przygotuj ticket"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setText("Pokaż gotowe Node'y i ich aktualne możliwości, bez uruchamiania zadań."),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), " Sprawdź Node'y"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
										className: "chat-shortcuts",
										"aria-label": "Skróty workspace",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => onNavigate("projects"),
												children: "Projekty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => onNavigate("tasks"),
												children: "Tickety"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => onNavigate("nodes"),
												children: "Node'y"
											})
										]
									})
								]
							}),
							messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								"data-chat-role": message.role,
								className: `chat-message chat-message-${message.role}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "chat-message-meta",
										children: message.role === "user" ? "Ty" : message.role === "error" ? "Błąd" : "Subactor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: message.content }),
									!!message.artifacts?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "chat-message-artifacts",
										children: message.artifacts.map((artifact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setOpenedArtifact(artifact);
												setShowContext(true);
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "receipt" }),
												" ",
												artifact.title
											]
										}, artifact.ref))
									})
								]
							}, message.id)),
							sending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "chat-thinking",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									" Control analizuje intencję"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "chat-composer-shell",
						children: [
							!!attached.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "chat-attachments",
								"aria-label": "Załączony kontekst",
								children: attached.map((artifact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggleAttachment(artifact),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "receipt" }),
										" ",
										artifact.title,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "x" })
									]
								}, artifact.ref))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "chat-composer",
								onSubmit: (event) => {
									event.preventDefault();
									submit();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "chat-composer-field",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Polecenie dla Subactor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: "chat-input",
										value: text,
										onChange: (event) => setText(event.target.value),
										onPaste: (event) => {
											const discoveredUrls = webUrlArtifacts(event.clipboardData.getData("text"));
											if (!discoveredUrls.length) return;
											setAttached((current) => mergeChatArtifacts(current, discoveredUrls));
											setOpenedArtifact(discoveredUrls[0]);
											setShowContext(true);
										},
										onKeyDown: (event) => {
											if (event.key === "Enter" && !event.shiftKey) {
												event.preventDefault();
												submit();
											}
										},
										maxLength: 8e3,
										rows: 2,
										placeholder: "Napisz, co ma przygotować Subactor…"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "chat-send",
									disabled: sending || !text.trim(),
									"aria-label": "Wyślij wiadomość",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrowUp" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "chat-safety",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "shield" }), " Propose-only · wykonanie wymaga ticketu i uprawnień URI"]
							})
						]
					})]
				}), showContext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "chat-context",
					"aria-label": "Kontekst rozmowy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-context-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Kontekst" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							attached.length,
							" dodanych · ",
							availableArtifacts.length,
							" dostępnych"
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowContext(false),
							"aria-label": "Zamknij kontekst",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "x" })
						})]
					}), openedArtifact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-artifact-page",
						"data-artifact-page": openedArtifact.kind,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chat-back",
								onClick: () => setOpenedArtifact(null),
								children: "← Wszystkie artefakty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chat-artifact-kind",
								children: openedArtifact.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: openedArtifact.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: openedArtifact.ref }),
							chatArtifactWebUrl(openedArtifact) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "chat-url-view",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "btn btn-secondary",
										href: chatArtifactWebUrl(openedArtifact) ?? void 0,
										target: "_blank",
										rel: "noreferrer noopener",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "externalLink" }), " Otwórz w nowej karcie"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
										src: chatArtifactWebUrl(openedArtifact) ?? void 0,
										title: `Podgląd ${openedArtifact.title}`,
										loading: "lazy",
										sandbox: "allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts",
										referrerPolicy: "no-referrer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Podgląd działa w izolowanym sandboxie. Strony blokujące osadzanie otwórz w nowej karcie." })
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { children: JSON.stringify(openedArtifact.detail, null, 2) })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chat-artifact-list",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dodaj tylko dane potrzebne do tej rozmowy." }), availableArtifacts.map((artifact) => {
							const active = attached.some((item) => item.ref === artifact.ref);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `chat-artifact-row${active ? " is-attached" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "chat-artifact-open",
									onClick: () => setOpenedArtifact(artifact),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "chat-artifact-kind",
											children: artifact.kind
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: artifact.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: artifact.ref })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "chat-artifact-toggle",
									"aria-pressed": active,
									"aria-label": active ? `Usuń ${artifact.title} z rozmowy` : `Dodaj ${artifact.title} do rozmowy`,
									onClick: () => toggleAttachment(artifact),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: active ? "checkCircle" : "plus" })
								})]
							}, artifact.ref);
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chat-backend-status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `chat-status-dot is-${reachable}` }),
					"Agent zaawansowany: ",
					reachable === "ok" ? "osiągalny" : reachable === "fail" ? "niedostępny" : "sprawdzanie"
				]
			})
		]
	});
}
var PANEL_TABS = [
	"chat",
	"api-tokens",
	"rest-api",
	"mcp",
	"a2a",
	"llm",
	"twins",
	"nodes",
	"hosts",
	"identities",
	"contacts",
	"contracts",
	"uri-permissions",
	"projects",
	"tasks",
	"calendar",
	"configuration",
	"logs",
	"payment-settings",
	"subscriptions",
	"payments",
	"organization"
];
var TAB_ALIASES = {
	account: "configuration",
	integrations: "rest-api",
	"llm-tokens": "llm",
	actors: "identities",
	tokens: "api-tokens"
};
var PANEL_NAV = [
	{
		type: "item",
		leaf: {
			id: "chat",
			icon: "cpu",
			labelKey: "panel_nav_chat",
			titleKey: "panel_nav_chat_title"
		}
	},
	{
		type: "item",
		leaf: {
			id: "api-tokens",
			icon: "key",
			labelKey: "panel_nav_api_tokens",
			titleKey: "panel_nav_api_tokens_title"
		}
	},
	{
		type: "group",
		id: "integrations",
		labelKey: "panel_nav_group_integrations",
		items: [
			{
				id: "rest-api",
				icon: "plug",
				labelKey: "panel_nav_rest_api",
				titleKey: "panel_nav_rest_api_title",
				badge: "ready"
			},
			{
				id: "mcp",
				icon: "cpu",
				labelKey: "panel_nav_mcp",
				titleKey: "panel_nav_mcp_title"
			},
			{
				id: "a2a",
				icon: "zap",
				labelKey: "panel_nav_a2a",
				titleKey: "panel_nav_a2a_title"
			},
			{
				id: "llm",
				icon: "cpu",
				labelKey: "panel_nav_llm",
				titleKey: "panel_nav_llm_title",
				badge: "llm"
			}
		]
	},
	{
		type: "group",
		id: "infrastructure",
		labelKey: "panel_nav_group_infrastructure",
		items: [
			{
				id: "twins",
				icon: "cube",
				labelKey: "panel_nav_twins",
				titleKey: "panel_nav_twins_title",
				badge: "twins"
			},
			{
				id: "nodes",
				icon: "server",
				labelKey: "panel_nav_nodes",
				titleKey: "panel_nav_nodes_title",
				badge: "nodes"
			},
			{
				id: "hosts",
				icon: "hardDrive",
				labelKey: "panel_nav_hosts",
				titleKey: "panel_nav_hosts_title",
				badge: "hosts"
			}
		]
	},
	{
		type: "group",
		id: "organizations",
		labelKey: "panel_nav_group_organizations",
		items: [
			{
				id: "identities",
				icon: "user",
				labelKey: "panel_nav_identities",
				titleKey: "panel_nav_identities_title"
			},
			{
				id: "contracts",
				icon: "building",
				labelKey: "panel_nav_contracts",
				titleKey: "panel_nav_contracts_title"
			},
			{
				id: "uri-permissions",
				icon: "shield",
				labelKey: "panel_nav_uri_permissions",
				titleKey: "panel_nav_uri_permissions_title",
				badge: "uri"
			},
			{
				id: "projects",
				icon: "cube",
				labelKey: "panel_nav_projects",
				titleKey: "panel_nav_projects_title",
				badge: "projects"
			},
			{
				id: "tasks",
				icon: "checkSquare",
				labelKey: "panel_nav_tasks",
				titleKey: "panel_nav_tasks_title",
				badge: "tasks"
			},
			{
				id: "calendar",
				icon: "calendar",
				labelKey: "panel_nav_calendar",
				titleKey: "panel_nav_calendar_title",
				badge: "calendar"
			}
		]
	},
	{
		type: "group",
		id: "account",
		labelKey: "panel_nav_group_account",
		items: [
			{
				id: "configuration",
				icon: "building",
				labelKey: "panel_nav_configuration",
				titleKey: "panel_nav_configuration_title"
			},
			{
				id: "contacts",
				icon: "user",
				labelKey: "panel_nav_contacts",
				titleKey: "panel_nav_contacts_title"
			},
			{
				id: "logs",
				icon: "chart",
				labelKey: "panel_nav_logs",
				titleKey: "panel_nav_logs_title"
			},
			{
				id: "payment-settings",
				icon: "key",
				labelKey: "panel_nav_payment_settings",
				titleKey: "panel_nav_payment_settings_title"
			},
			{
				id: "subscriptions",
				icon: "checkSquare",
				labelKey: "panel_nav_subscriptions",
				titleKey: "panel_nav_subscriptions_title"
			},
			{
				id: "payments",
				icon: "check",
				labelKey: "panel_nav_payments",
				titleKey: "panel_nav_payments_title"
			}
		]
	}
];
function getUrlTab() {
	if (typeof window === "undefined") return "chat";
	const params = new URLSearchParams(window.location.search);
	const param = params.get("tab");
	const view = params.get("view") || "";
	const registry = params.get("registry") || "";
	if (param === "integrations" && (view === "mcp" || view === "a2a")) return view;
	if (param === "integrations" && view === "catalog") return "mcp";
	if (param === "organization" && (view === "contacts" || registry === "contacts")) return "contacts";
	if (param === "organization" && (view === "contracts" || registry === "contracts")) return "contracts";
	if (param && TAB_ALIASES[param]) return TAB_ALIASES[param];
	if (param && PANEL_TABS.includes(param)) return param;
	return "chat";
}
function IntegrationsPanel({ session, integrations, nodes, nodesMeta, enrolledNodes, setEnrolledNodes, connections, setConnections, plans, hosting, setHosting, events, providers = [], viewMode, onViewChange, locale, locales, localeLabels, displayCurrency, supportedCurrencies, onCurrencyChange }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)(getUrlTab);
	const [panelItemsFilter, setPanelItemsFilter] = (0, import_react.useState)(() => getUrlParam("filter"));
	const [copyState, setCopyState] = (0, import_react.useState)("idle");
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		setPanelItemsFilter("");
		updatePanelUrl({
			tab,
			view: null,
			project: null,
			host: null,
			org: null,
			filter: null,
			tag: null,
			registry: null
		}, "push");
	};
	(0, import_react.useEffect)(() => {
		const handlePopState = () => setActiveTab(getUrlTab());
		handlePopState();
		const handleFilterPopState = () => setPanelItemsFilter(getUrlParam("filter"));
		handleFilterPopState();
		window.addEventListener("popstate", handlePopState);
		window.addEventListener("popstate", handleFilterPopState);
		return () => {
			window.removeEventListener("popstate", handlePopState);
			window.removeEventListener("popstate", handleFilterPopState);
		};
	}, []);
	const updateItemsFilter = (value) => {
		setPanelItemsFilter(value);
		updatePanelUrl({ filter: value.trim() ? value : null });
	};
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const tab = params.get("tab");
		const view = params.get("view") || "";
		if (tab === "integrations" && (view === "mcp" || view === "a2a")) {
			updatePanelUrl({
				tab: view,
				view: "list",
				filter: null,
				tag: null,
				registry: null
			});
			setActiveTab(view);
		} else if (tab === "integrations" && view === "catalog") {
			updatePanelUrl({
				tab: "mcp",
				view: "list",
				filter: null,
				tag: null,
				registry: null
			});
			setActiveTab("mcp");
		} else if (tab === "integrations") {
			updatePanelUrl({
				tab: "rest-api",
				view: null,
				filter: null,
				tag: null,
				registry: null
			});
			setActiveTab("rest-api");
		} else if (tab === "account") {
			updatePanelUrl({
				tab: "configuration",
				view: null,
				filter: null,
				tag: null,
				registry: null
			});
			setActiveTab("configuration");
		} else if (tab === "llm-tokens") {
			updatePanelUrl({
				tab: "llm",
				view: null,
				filter: null,
				tag: null,
				registry: null
			});
			setActiveTab("llm");
		} else if (tab === "organization" && (view === "contacts" || params.get("registry") === "contacts")) {
			updatePanelUrl({
				tab: "contacts",
				view: "list",
				registry: null
			});
			setActiveTab("contacts");
		} else if (tab === "organization" && (view === "contracts" || params.get("registry") === "contracts")) {
			updatePanelUrl({
				tab: "contracts",
				view: "list",
				registry: null
			});
			setActiveTab("contracts");
		} else if (tab === "uri-permissions" && view === "aql-visualizer") updatePanelUrl({
			tab: "uri-permissions",
			view: "add"
		});
	}, []);
	const connectedCount = Object.keys(connections).length;
	const ready = filterPanelItems(integrations.filter((i) => i.status === "available"), panelItemsFilter);
	const later = filterPanelItems(integrations.filter((i) => i.status !== "available"), panelItemsFilter);
	const searchableTabs = /* @__PURE__ */ new Set([
		"rest-api",
		"identities",
		"twins",
		"llm",
		"nodes",
		"hosts",
		"tasks",
		"calendar",
		"uri-permissions",
		"projects",
		"contacts",
		"contracts",
		"organization",
		"logs"
	]);
	const copyDiagnostics = async () => {
		setCopyState("idle");
		const payload = {
			schema: "subactor.panel-diagnostic/v1",
			captured_at: (/* @__PURE__ */ new Date()).toISOString(),
			location: typeof window === "undefined" ? null : sanitizePanelUrl(window.location.href),
			active_tab: activeTab,
			view_mode: viewMode,
			filter: panelItemsFilter || null,
			tenant: session.tenant_slug,
			counts: {
				integrations: integrations.length,
				connections: Object.keys(connections).length,
				nodes: nodes.length,
				enrolled_nodes: enrolledNodes.length,
				events: events.length
			},
			integrations,
			nodes,
			enrolled_nodes: enrolledNodes,
			connections,
			hosting: {
				subdomain: hosting.subdomain,
				phase: hosting.phase,
				openwebui_url: hosting.openwebui_url
			},
			events: events.slice(0, 50)
		};
		try {
			await copyPanelDiagnostic(payload);
			setCopyState("copied");
			window.setTimeout(() => setCopyState("idle"), 2500);
		} catch {
			setCopyState("error");
		}
	};
	const navBadge = (kind) => {
		if (kind === "ready") return ready.length;
		if (kind === "nodes") return enrolledNodes.length;
		if (kind === "twins") return 3;
		if (kind === "llm") return 4;
		if (kind === "hosts") return 3;
		if (kind === "tasks") return 5;
		if (kind === "calendar") return 4;
		if (kind === "uri") return 9;
		if (kind === "projects") return 4;
		return null;
	};
	const renderLeaf = (leaf) => {
		const badge = navBadge(leaf.badge);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: `panel-tab-btn ${activeTab === leaf.id ? "active" : ""}`,
			onClick: () => handleTabChange(leaf.id),
			title: t(leaf.titleKey),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: leaf.icon }),
				t(leaf.labelKey),
				badge !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-tab-badge",
					children: badge
				})
			]
		}, leaf.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelItemsFilterContext.Provider, {
		value: panelItemsFilter,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section panel-workspace-shell",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "panel-tabs-bar workspace-rail",
					"aria-label": "Nawigacja po panelu użytkownika",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-rail-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "workspace-rail-avatar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "bolt" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session.tenant_slug }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Workspace" })] })]
					}), PANEL_NAV.map((entry) => entry.type === "item" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: renderLeaf(entry.leaf) }, entry.leaf.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "workspace-rail-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "workspace-rail-label workspace-rail-group-label",
							children: t(entry.labelKey)
						}), entry.items.map(renderLeaf)]
					}, entry.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-operational-toolbar",
					children: [searchableTabs.has(activeTab) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelItemsSearch, {
						value: panelItemsFilter,
						onChange: updateItemsFilter
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-sm btn-secondary panel-copy-json",
						onClick: () => void copyDiagnostics(),
						title: t("panel_copy_json_title"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "copy" }), copyState === "copied" ? t("panel_copy_json_copied") : copyState === "error" ? t("panel_copy_json_failed") : t("panel_copy_json")]
					})]
				}),
				activeTab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatOpenWebUiSection, {
					session,
					hosting,
					events,
					enrolledNodes,
					integrations,
					connections,
					onNavigate: handleTabChange
				}),
				activeTab === "configuration" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-tab-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "item-section-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "panel-section-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "building",
								className: "icon-lg"
							}), t("panel_nav_configuration")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-sub",
							style: {
								margin: 0,
								marginTop: "0.25rem",
								color: "var(--text-muted)",
								fontSize: "0.9rem"
							},
							children: t("panel_config_sub", { tenant: session.tenant_slug })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-grid",
						style: { marginTop: "1rem" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountCard, {
								session,
								plans,
								connectedCount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageCard, {
								locale,
								locales,
								localeLabels
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostingCard, {
								hosting,
								onChange: setHosting
							})
						]
					})]
				}),
				activeTab === "logs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-tab-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "item-section-toolbar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "panel-section-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "chart",
								className: "icon-lg"
							}), t("panel_nav_logs")]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsCard, { events })]
				}),
				activeTab === "payment-settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentSettingsSection, {
					displayCurrency,
					supportedCurrencies,
					onCurrencyChange,
					connections,
					integrations
				}),
				activeTab === "subscriptions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionsSection, {
					session,
					plans,
					hosting
				}),
				activeTab === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentsSection, { events }),
				activeTab === "api-tokens" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-tab-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "item-section-toolbar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "panel-section-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "key",
								className: "icon-lg"
							}), t("panel_nav_api_tokens")]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubactorUserTokensCard, {
						session,
						onNavigate: handleTabChange
					})]
				}),
				activeTab === "rest-api" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-tab-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "item-section-toolbar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "panel-section-title",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plug" }), t("panel_nav_rest_api")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemViewSwitch, {
								mode: viewMode,
								onChange: onViewChange
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "connect-grid item-collection",
							"data-view": viewMode,
							role: viewMode === "table" ? "table" : void 0,
							"aria-label": viewMode === "table" ? t("view_panel_integrations_label") : void 0,
							children: [viewMode === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "connect-table-header",
								role: "row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										role: "columnheader",
										children: [
											t("view_col_name"),
											" / ",
											t("view_col_status")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										role: "columnheader",
										children: t("view_col_summary")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										role: "columnheader",
										children: t("view_col_actions")
									})
								]
							}), ready.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectCard, {
								integration: i,
								viewMode,
								connection: connections[i.id],
								onConnected: (id, c) => setConnections({
									...connections,
									[id]: c
								}),
								onDisconnected: (id) => {
									const next = { ...connections };
									delete next[id];
									setConnections(next);
								}
							}, i.id))]
						}),
						later.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "billing-hint",
							style: { marginTop: "2rem" },
							children: t("panel_later")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "item-unavailable item-collection",
							"data-view": viewMode,
							children: later.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectCard, {
								integration: i,
								viewMode,
								onConnected: () => {},
								onDisconnected: () => {}
							}, i.id))
						})] })
					]
				}),
				activeTab === "mcp" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorRegistrySection, {
					session,
					kind: "mcp"
				}),
				activeTab === "a2a" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectorRegistrySection, {
					session,
					kind: "a2a"
				}),
				activeTab === "identities" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentitiesSection, {
						session,
						providers,
						hosting
					})
				}),
				activeTab === "twins" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DigitalTwinsSection, {
						session,
						hosting
					})
				}),
				activeTab === "llm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LlmTokensSection, { session })
				}),
				activeTab === "nodes" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodesMarketplace, {
						nodes,
						meta: nodesMeta,
						enrolled: enrolledNodes,
						setEnrolled: setEnrolledNodes,
						viewMode,
						onViewChange
					})
				}),
				activeTab === "hosts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HostsSection, { session })
				}),
				activeTab === "tasks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TasksSection, { session })
				}),
				activeTab === "calendar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarSection, { session })
				}),
				activeTab === "uri-permissions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UriPermissionsSection, { session })
				}),
				activeTab === "projects" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsSection, { session })
				}),
				activeTab === "contacts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountContactsSection, { session })
				}),
				activeTab === "contracts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationSection, {
						session,
						lockedRegistry: "contracts"
					})
				}),
				activeTab === "organization" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-tab-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationSection, { session })
				})
			]
		})
	});
}
var PREVIEW_METRICS = [
	{
		title: "Przetworzone zdarzenia dzisiaj",
		value: "148 920",
		change: "+14,2% od wczoraj",
		icon: "arrowUp"
	},
	{
		title: "Średni czas reakcji POA",
		value: "2,8 ms",
		change: "Wysoka wydajność",
		icon: "bolt"
	},
	{
		title: "Aktywne integracje ERP",
		value: "12 / 12",
		change: "Bez incydentów",
		icon: "check"
	},
	{
		title: "Retencja logów",
		value: "12 msc",
		change: "Pełny audyt",
		icon: "lock"
	}
];
var PREVIEW_ROWS = [
	[
		"2026-08-12 11:40:12",
		"Allegro Sync Engine",
		"InventoryPreflightValidated",
		"1,4 ms",
		"SUCCESS",
		"status-ok"
	],
	[
		"2026-08-12 11:40:08",
		"Subiekt ERP Connector",
		"OrderDispatchedToWarehouse",
		"3,1 ms",
		"SUCCESS",
		"status-ok"
	],
	[
		"2026-08-12 11:39:55",
		"PromoEngine NOCC",
		"TenantProvisionedWithPromo",
		"0,9 ms",
		"PROVISIONED",
		"status-proc"
	]
];
function DashboardTeaser({ onStart, onLogin }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "dashboard-preview-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dashboard-preview-content",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dashboard-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "chart",
						className: "icon-lg"
					}), "Panel operacyjny Subactor"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "status-pill status-ok",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "dot" }), "Live sync OK"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "metrics-grid",
					children: PREVIEW_METRICS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "metric-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "metric-title",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "metric-value",
								children: m.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "metric-change",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: m.icon }), m.change]
							})
						]
					}, m.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "dashboard-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Znacznik czasu" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: t("col_module") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Zdarzenie CQRS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Czas" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: PREVIEW_ROWS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[0] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[2] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[3] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${r[5]}`,
							children: r[4]
						}) })
					] }, r[0])) })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dashboard-lock-overlay",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lock-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "lock-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "lock",
							className: "icon-xl"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "lock-title",
						children: t("dash_title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lock-desc",
						children: t("dash_desc")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lock-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-primary",
							onClick: onStart,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "gift" }), t("dash_start")]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-secondary",
							onClick: onLogin,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("nav_login")]
						})]
					})
				]
			})
		})]
	});
}
function App({ initialPlans, initialIntegrations, initialNodes, initialNodesMeta, initialEnrolledNodes, initialMeta, initialIntegrationsMeta, session, initialConnections, initialHosting, initialEvents, locale, locales, localeLabels, initialCurrency, currencyRates, currencyRatesAsOf, t: dictionary, identityProviders, action, plan, promo }) {
	DICT = dictionary ?? {};
	const availableCurrencyRates = currencyRates && Object.keys(currencyRates).length > 0 ? currencyRates : {
		EUR: 1,
		PLN: 4.28,
		USD: 1.09,
		GBP: .85,
		CHF: .94
	};
	const supportedCurrencies = Object.keys(availableCurrencyRates);
	const localeDefaultCurrency = locale === "pl" ? "PLN" : "EUR";
	const requestedInitialCurrency = (initialCurrency ?? localeDefaultCurrency).toUpperCase();
	const [interval, setInterval] = (0, import_react.useState)("month");
	const [displayCurrency, setDisplayCurrency] = (0, import_react.useState)(supportedCurrencies.includes(requestedInitialCurrency) ? requestedInitialCurrency : localeDefaultCurrency);
	const [itemViewMode, selectItemView] = useStoredItemView();
	const [plans, setPlans] = (0, import_react.useState)(initialPlans ?? []);
	const [integrations, setIntegrations] = (0, import_react.useState)(initialIntegrations ?? []);
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const meta = {
		...DEFAULT_META,
		...initialMeta ?? {}
	};
	const integrationsMeta = initialIntegrationsMeta ?? {};
	const [connections, setConnections] = (0, import_react.useState)(initialConnections ?? {});
	const [hosting, setHosting] = (0, import_react.useState)(initialHosting ?? {});
	const [enrolledNodes, setEnrolledNodes] = (0, import_react.useState)(initialEnrolledNodes ?? []);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	const formRef = (0, import_react.useRef)(null);
	DISPLAY_LOCALE = locale ?? "pl";
	DISPLAY_CURRENCY = displayCurrency;
	DISPLAY_CURRENCY_RATES = availableCurrencyRates;
	const offered = plans.filter((p) => p.public !== false);
	const registrablePlan = plan && plan !== "on-premise" ? plan : void 0;
	const selectedPlan = offered.find((p) => p.id === registrablePlan) ?? plans.find((p) => p.id === registrablePlan);
	const registerPlanId = registrablePlan ?? offered.find((p) => p.unit === "active_twin_monthly")?.id ?? "saas-start";
	(0, import_react.useEffect)(() => {
		if (!initialPlans) listPlans("month").then(setPlans).catch(() => void 0);
		if (!initialIntegrations) listIntegrations().then((list) => setIntegrations(list)).catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		const stored = window.localStorage.getItem("subactor_theme");
		const system = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
		setTheme(stored === "light" || stored === "dark" ? stored : system);
	}, []);
	(0, import_react.useEffect)(() => {
		if (new URLSearchParams(window.location.search).get("currency")) return;
		try {
			const stored = window.localStorage.getItem("subactor_currency");
			if (stored && supportedCurrencies.includes(stored)) setDisplayCurrency(stored);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
	(0, import_react.useEffect)(() => {
		document.title = t("seo_title");
		const description = document.querySelector("meta[name=\"description\"]");
		if (description) description.content = t("seo_description");
	}, [locale]);
	(0, import_react.useEffect)(() => {
		if (formRef.current && (action === "register" || action === "login" || action === "contact")) formRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, [action]);
	(0, import_react.useEffect)(() => {
		if (!window.location.hash) return;
		let targetId = "";
		try {
			targetId = decodeURIComponent(window.location.hash.slice(1));
		} catch {
			return;
		}
		window.requestAnimationFrame(() => {
			const target = document.getElementById(targetId);
			if (!target) return;
			const root = document.documentElement;
			const previousScrollBehavior = root.style.scrollBehavior;
			root.style.scrollBehavior = "auto";
			target.scrollIntoView({ block: "start" });
			root.style.scrollBehavior = previousScrollBehavior;
		});
	}, [action]);
	const go = (params) => {
		const url = new URLSearchParams(params);
		if (locale && locale !== "pl") url.set("lang", locale);
		url.set("currency", displayCurrency);
		window.location.href = `/?${url.toString()}`;
	};
	const switchOrganization = async (tenantSlug) => {
		if (!session || tenantSlug === session.tenant_slug) return;
		if (!(await fetch("/api/organizations/switch", {
			method: "POST",
			credentials: "same-origin",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ tenant_slug: tenantSlug })
		})).ok) {
			window.alert(t("nav_organization_switch_failed"));
			return;
		}
		go({ action: "panel" });
	};
	const selectPlan = (id) => {
		if (id === "on-premise") return go({
			plan: id,
			action: "contact"
		});
		return go({
			plan: id,
			action: "register"
		});
	};
	const selectPromo = (id, code) => go({
		plan: id,
		promo: code,
		action: "register"
	});
	const promoBadge = promo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "badge badge-success",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: "gift",
			className: "icon-lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("promo_badge", { code: promo }) })]
	}) : action === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "badge badge-info",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: "key",
			className: "icon-lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("badge_login") })]
	}) : action === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "badge badge-info",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: "server",
			className: "icon-lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("badge_contact") })]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `container${action === "panel" ? " container-workspace" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "navbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brand",
					style: { flexWrap: "wrap" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-mark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "bolt",
								className: "icon-lg"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-text",
							children: "Subactor"
						}),
						session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "sr-only",
								htmlFor: "active-organization",
								children: t("nav_active_organization")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "active-organization",
								className: "btn-toggle",
								style: { maxWidth: "14rem" },
								value: session.tenant_slug,
								onChange: (event) => void switchOrganization(event.target.value),
								title: t("nav_active_organization"),
								children: (session.organizations?.length ? session.organizations : [{
									slug: session.tenant_slug,
									name: session.tenant_slug,
									plan: session.plan ?? "",
									role: "owner"
								}]).map((organization) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: organization.slug,
									children: organization.name
								}, organization.slug))
							}),
							action !== "panel" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn-toggle",
								onClick: () => go({ action: "panel" }),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrowRight" }),
									" ",
									t("nav_return_panel")
								]
							})
						] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "nav-controls",
					children: [
						(locales?.length ?? 0) > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "btn-toggle",
							value: locale ?? "pl",
							onChange: (e) => {
								const url = new URL(window.location.href);
								url.searchParams.set("lang", e.target.value);
								window.location.href = url.toString();
							},
							"aria-label": "Language",
							children: (locales ?? []).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: code,
								children: localeLabels?.[code] ?? code.toUpperCase()
							}, code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "btn-toggle currency-select",
							value: displayCurrency,
							onChange: (event) => {
								const next = event.target.value;
								setDisplayCurrency(next);
								try {
									window.localStorage.setItem("subactor_currency", next);
								} catch {}
								const url = new URL(window.location.href);
								url.searchParams.set("currency", next);
								window.history.replaceState(null, "", url);
							},
							"aria-label": t("currency_label"),
							children: supportedCurrencies.map((currency) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: currency,
								children: currency
							}, currency))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-toggle",
							onClick: () => {
								const next = theme === "dark" ? "light" : "dark";
								window.localStorage.setItem("subactor_theme", next);
								setTheme(next);
							},
							"aria-label": "Przełącz motyw",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: theme === "dark" ? "moon" : "sun" }), theme === "dark" ? t("theme_dark") : t("theme_light")]
						}),
						session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-toggle",
							onClick: () => {
								dslExecute({ command: "LOGOUT" }).finally(() => {
									window.location.href = locale && locale !== "pl" ? `/?lang=${locale}` : "/";
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "unlock" }), t("nav_logout")]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "btn-toggle",
							onClick: () => go({ action: "login" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), t("nav_login")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mobile-menu-toggle",
							onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
							"aria-label": "Otwórz menu nawigacyjne",
							title: "Otwórz menu mobilne z boku",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: isMobileMenuOpen ? "x" : "menu" })
						})
					]
				})]
			}),
			isMobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mobile-drawer-overlay",
				onClick: () => setIsMobileMenuOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "mobile-drawer",
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mobile-drawer-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-mark",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "bolt",
									className: "icon-lg"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-text",
								children: "Subactor"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn-toggle",
							onClick: () => setIsMobileMenuOpen(false),
							"aria-label": "Zamknij menu",
							title: "Zamknij menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "x" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mobile-drawer-body",
						children: [session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mobile-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "mobile-drawer-heading",
								children: [
									"Zakładki Panelu (",
									session.tenant_slug,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mobile-drawer-tabs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "account");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Konfiguracja konta, subskrypcja i tokeny API",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "building" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Konto & Tokeny" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "integrations");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Baza połączeń API i usłóg zewnętrznych",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "plug" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Integracje" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "identities");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Dostawcy tożsamości SSO",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tożsamości SSO" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "twins");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Aktywne bliźniaki cyfrowe",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Digital Twins" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "llm-tokens");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Klucze i proxy modeli LLM",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cpu" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Klucze LLM" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "nodes");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Urządzenia CyberMysz i IoT",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "server" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Node'y" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "hosts");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Maszyny VPS, Raspberry Pi, serwery dedykowane i chmura",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "hardDrive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hosty (VPS/RPi)" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "tasks");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Centrum zadań, kolejki wykonawcze i widoki (Kanban, Karty, Tabela)",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkSquare" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zadania (Kanban)" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "mobile-tab-item",
										onClick: () => {
											go({ action: "panel" });
											const url = new URL(window.location.href);
											url.searchParams.set("tab", "calendar");
											window.history.replaceState(null, "", url);
											setIsMobileMenuOpen(false);
										},
										title: "Kalendarz harmonogramów i zaplanowane tickety",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "calendar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kalendarz Ticketów" })]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mobile-drawer-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "mobile-drawer-heading",
									children: "Nawigacja Główna"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mobile-drawer-btn",
									onClick: () => {
										go({ action: "landing" });
										setIsMobileMenuOpen(false);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "cube" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Strona Główna & Oferta" })]
								}),
								session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mobile-drawer-btn danger",
									onClick: () => {
										dslExecute({ command: "LOGOUT" }).finally(() => {
											window.location.href = locale && locale !== "pl" ? `/?lang=${locale}` : "/";
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "unlock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wyloguj się" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mobile-drawer-btn primary",
									onClick: () => {
										go({ action: "login" });
										setIsMobileMenuOpen(false);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "key" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zaloguj się do panelu" })]
								})
							]
						})]
					})]
				})
			}),
			promoBadge,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				action !== "panel" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "hero",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hero-eyebrow",
								children: t("hero_eyebrow")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: t("hero_title") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-sub",
								children: t("hero_sub")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "btn-primary hero-cta",
								href: "#use-cases",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "checkCircle" }), t("hero_cta")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseCasesSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "section offer-section offer-anchor",
						id: "offers",
						"aria-labelledby": "offers-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "section-head",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "section-eyebrow",
										children: t("offers_eyebrow")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "section-title",
										id: "offers-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "users",
											className: "icon-lg"
										}), t("offers_title")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "section-sub",
										children: t("offers_sub")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "audience-chips",
								children: AUDIENCE_OFFER_LINKS.map((audience) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "chip audience-link",
									href: `#${offerAnchorId(audience.planId)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: audience.icon }), t(audience.label)]
								}, audience.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "billing-toggle-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `billing-btn${interval === "month" ? " active" : ""}`,
									onClick: () => setInterval("month"),
									children: t("billing_month")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: `billing-btn${interval === "year" ? " active" : ""}`,
									onClick: () => setInterval("year"),
									children: [t("billing_year"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "discount-pill",
										children: t("billing_pill")
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "billing-hint",
								children: t("currency_hint", {
									currency: displayCurrency,
									date: currencyRatesAsOf ?? t("currency_rate_date_unknown")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "provider-clarification",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("actions_definition_title") }),
									" ",
									t("actions_definition_desc")
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "offer-display-options",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: t("offers_options") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "item-section-toolbar offer-view-toolbar",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "billing-hint",
										children: [
											meta.annual_rule,
											" ",
											meta.vat_note
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemViewSwitch, {
										mode: itemViewMode,
										onChange: selectItemView
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingCollection, {
								plans: offered,
								interval,
								viewMode: itemViewMode,
								onSelect: selectPlan,
								onPromo: selectPromo
							})
						]
					})
				] }),
				action === "panel" && session && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationsPanel, {
					session,
					integrations,
					nodes: initialNodes ?? [],
					nodesMeta: initialNodesMeta ?? {},
					enrolledNodes,
					setEnrolledNodes,
					connections,
					setConnections,
					plans,
					hosting,
					setHosting,
					events: initialEvents ?? [],
					providers: identityProviders ?? [],
					viewMode: itemViewMode,
					onViewChange: selectItemView,
					locale,
					locales,
					localeLabels,
					displayCurrency,
					supportedCurrencies,
					onCurrencyChange: (next) => {
						setDisplayCurrency(next);
						try {
							window.localStorage.setItem("subactor_currency", next);
						} catch {}
						const url = new URL(window.location.href);
						url.searchParams.set("currency", next);
						window.history.replaceState(null, "", url);
					}
				}),
				action === "panel" && !session && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "badge badge-info",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "key",
						className: "icon-lg"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("login_required") })]
				}),
				action === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterForm, {
					ref: formRef,
					plan: selectedPlan ?? offered.find((p) => p.id === registerPlanId),
					planId: registerPlanId,
					promo: promo || "",
					interval,
					onLogin: () => go({ action: "login" }),
					providers: identityProviders ?? []
				}),
				action === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {
					ref: formRef,
					onRegister: () => go({
						plan: registerPlanId,
						promo: "NOCC100",
						action: "register"
					}),
					providers: identityProviders ?? []
				}),
				action === "contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {
					ref: formRef,
					plan: plans.find((p) => p.id === "on-premise")
				}),
				action !== "panel" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransparencySection, {
						plans: offered,
						interval,
						meta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuaranteesSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalOfferTeaser, { href: locale && locale !== "pl" ? `/legal?lang=${encodeURIComponent(locale)}` : "/legal" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrationsSection, {
						integrations,
						meta: integrationsMeta,
						viewMode: itemViewMode,
						onViewChange: selectItemView
					})
				] }),
				action !== "panel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardTeaser, {
					onStart: () => go({
						plan: registerPlanId,
						promo: "NOCC100",
						action: "register"
					}),
					onLogin: () => go({ action: "login" })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["© 2026 Subactor — ", t("footer_product")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: locale && locale !== "pl" ? `/legal?lang=${encodeURIComponent(locale)}` : "/legal",
						children: t("legal_footer_link")
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/?action=contact",
						children: t("footer_contact")
					})
				] })]
			})
		]
	});
}
if (typeof window !== "undefined") import("./assets/client-BciOShrA.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1)).then(({ createRoot, hydrateRoot }) => {
	const params = new URLSearchParams(window.location.search);
	const root = document.getElementById("root");
	if (!root) return;
	const props = window.__INITIAL_PROPS__ || {};
	const node = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {
		action: params.get("action") || void 0,
		plan: params.get("plan") || void 0,
		promo: params.get("promo") || void 0,
		...props
	});
	if (root.childNodes.length === 0) createRoot(root).render(node);
	else hydrateRoot(root, node);
});
async function renderToHtml(props) {
	const { renderToString } = await import("./assets/server.node-Dxrt4X-H.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
	return renderToString(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, { ...props }));
}
//#endregion
export { App, App as default, __commonJSMin as n, __require as r, renderToHtml, require_react as t };
