/**
 * 
 * Package: jstypes
 * Author: Ganesh B
 * Description: 
 * Install: npm i jstypes --save
 * Github: https://github.com/ganeshkbhat/jstypes
 * npmjs Link: https://www.npmjs.com/package/jstypes
 * File: .js
 * File Description: 
 * 
 * 
*/

'use strict';


let inbuilt = ["string", "number", "boolean", "null", "undefined", "bigint", "symbol", "set", "array", "object", "function"];
let extendedtypes = [...inbuilt, "int", "float", "nan"];

let typedefs = [...extendedtypes,
    "String", "Boolean", "Math", "Number", "BigInt", "Float", "Symbol", "Object", "null", "undefined", "Int", "NaN",
    "Infinity", /*non-js object*/ "Finite", "Atomics", "globalThis",
    "Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Int8Array",
    "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", /*non-js object*/ "TypedArray", "ArrayBuffer", "SharedArrayBuffer",
    "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "AggregateError", "Non-standardInternalError",
    "Function", "AsyncFunction", "Generator", "GeneratorFunction", "AsyncGenerator", "AsyncGeneratorFunction",
    "Promise", /*non-js object*/ "URIComponent", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Deprecatedunescape", "Deprecatedescape",
    "Map", "WeakMap", "WeakRef", "WeakSet", "Set",
    "DataView", "Date", "JSON", "Proxy", "Reflect", "RegExp", "Intl", "FinalizationRegistry"
];

/**
 *
 *
 * @param {*} obj
 * @return {*} 
 */
function getObjectMethods(obj) {
    const methods = [];
    for (const prop in obj) {
        if (typeof obj[prop] === 'function') {
            methods.push(prop);
        }
    }
    return methods;
}

/**
 *
 *
 * @param {*} obj
 * @param {*} inst
 * @return {*} 
 */
function checkInstanceOfMethod(obj, inst) {
    let method;
    for (const prop in inst) {
        if (typeof inst[prop] === 'function') {
            if (obj instanceof inst[prop]) {
                method = inst[prop];
            };
        }
    }
    return false;
}


/**
 * isBrowser
 *
 * @return {*} 
 */
function isBrowser() {
    if (typeof process === "object" && typeof require === "function") {
        return false;
    }
    if (typeof importScripts === "function") { return false; }
    if (typeof window === "object") { return true; }
}

function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function (obj) {
        return toString.call(obj) === tag;
    };
}

var supportsArrayBuffer = () => typeof ArrayBuffer !== 'undefined',
    ObjProto = Object.prototype,
    toString = ObjProto.toString,
    supportsDataView = () => typeof DataView !== 'undefined',
    nativeIsArrayBufferView = supportsArrayBuffer() && ArrayBuffer.isView;

// Is a given variable an object?
function isTagObject(obj) {
    var type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
}

// Is a given variable an object?
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
}

// Is a given value equal to null?
function isTagNull(obj) {
    return obj === null;
}

// Is a given variable undefined?
function isTagTagUndefined(obj) {
    return obj === void 0;
}

// Is a given value a DOM element?
function isTagElement(obj) {
    return !!(obj && obj.nodeType === 1);
}

// Sample Usage for 

var isTagString = tagTester('String');
var isTagNumber = tagTester('Number');
var isTagDate = tagTester('Date');
var isTagRegExp = tagTester('RegExp');
var isTagError = tagTester('Error');
var isTagSymbol = tagTester('Symbol');
var isTagArrayBuffer = tagTester('ArrayBuffer');
var isTagFunction = tagTester('Function');
var isTagDataView = tagTester('DataView');
var isTagObject = tagTester('Object');
var hasObjectTag = isTagObject;

var isTagAlternateIsDataView = tagTester('DataView');
var isDataView = tagTester('DataView');
var hasObjectTag = tagTester('Object');

function alternateIsDataView(obj) {
  return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
}

var hasDataViewBug = (
  supportsDataView() && (!/\[native code\]/.test(String(DataView)) || hasObjectTag(new DataView(new ArrayBuffer(8))))
)

var isValidDataView = (hasDataViewBug ? alternateIsDataView : isDataView);

function getShallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}

// Common internal logic for `isArrayLike` and `isBufferLike`.
function createSizePropertyCheck(getSizeProperty) {
  return function (collection) {
    var sizeProperty = getSizeProperty(collection);
    return (
      typeof sizeProperty == 'number' &&
      sizeProperty >= 0 &&
      sizeProperty <= MAX_ARRAY_INDEX
    );
  };
}

var getByteLength = getShallowProperty('byteLength');
var isBufferLike = createSizePropertyCheck(getByteLength);


// String
function isString(obj) {
    return (
        typeof obj === "string" || obj instanceof String
    );
}

// Number
function isNumber(obj) {
    return (
        (typeof obj === "number" || obj instanceof Number) && (isTagNumber(obj) === '[object Number]')
    );
}

// Boolean
// Is a given value a boolean?
function isBoolean(obj) {
    return (
        (obj instanceof Boolean || ((obj === true || obj === false) && typeof obj === "object")) && (tagTester('Boolean')(obj) === '[object Boolean]')
    );
}

// null
function isNull(obj) {
    return (
        (obj === null && typeof obj === "object") && (tagTester('Null')(obj) === '[object Null]')
    );
}

// undefined
function isUndefined(obj) {
    return (
        (obj === undefined || typeof obj === "undefined") && (tagTester('undefined')(obj) === '[object undefined]')
    );
}

// BigInt
function isBigInt(obj) {
    return (
        (typeof obj === "bigint") && (tagTester('BigInt')(obj) === '[object BigInt]')
    );
}

// Symbol
function isSymbol(obj) {
    return (
        (typeof obj === "symbol") && (tagTester('Symbol')(obj) === '[object Symbol]')
    );
}

// Array
function isArray(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Array')(obj) === '[object Array]')
    );
}


// Uint16Array
var isTagUint16Array = tagTester('Uint16Array');

// Uint32Array
var isTagUint32Array = tagTester('Uint32Array');

// Uint8Array
var isTagUint8Array = tagTester('Uint8Array');

// Uint8ClampedArray
var isTagUint8ClampedArray = tagTester('Uint8ClampedArray');

// Int16Array
var isTagInt16Array = tagTester('Int16Array');

// Int32Array
var isTagInt32Array = tagTester('Int32Array');

// Int8Array
var isTagInt8Array = tagTester('Int8Array');

// Float32Array
var isTagFloat32Array = tagTester('Float32Array');

// Float64Array
var isTagFloat64Array = tagTester('Float64Array');

// BigInt64Array
var isTagBigInt64Array = tagTester('BigInt64Array');

// BigUint64Array
var isTagBigUint64Array = tagTester('BigUint64Array');

// TypedArray - check all TypedArrays above
var isTagTypedArray = tagTester('TypedArray');

// ArrayBuffer
var isTagArrayBuffer = tagTester('ArrayBuffer');

// SharedArrayBuffer
var isTagSharedArrayBuffer = tagTester('SharedArrayBuffer');

// Uint16Array
function Uint16Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Uint16Array) && (tagTester('Uint16Array')(obj) === '[object Uint16Array]')
    );
}

// Uint32Array
function Uint32Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Uint32Array')(obj) === '[object Uint32Array]')
    );
}

// Uint8Array
function Uint8Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Uint8Array')(obj) === '[object Uint8Array]')
    );
}

// Uint8ClampedArray
function Uint8ClampedArray(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Uint8ClampedArray')(obj) === '[object Uint8ClampedArray]')
    );
}

// Int16Array
function Int16Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Int16Array')(obj) === '[object Int16Array]')
    );
}

// Int32Array
function Int32Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Int32Array')(obj) === '[object Int32Array]')
    );
}

// Int8Array
function Int8Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Int8Array')(obj) === '[object Int8Array]')
    );
}

// Float32Array
function Float32Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Float32Array')(obj) === '[object Float32Array]')
    );
}

// Float64Array
function Float64Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('Float64Array')(obj) === '[object Float64Array]')
    );
}

// BigInt64Array
function BigInt64Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('BigInt64Array')(obj) === '[object BigInt64Array]')
    );
}

// BigUint64Array
function BigUint64Array(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('BigUint64Array')(obj) === '[object BigUint64Array]')
    );
}

// TypedArray - check all TypedArrays above
function TypedArray(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('TypedArray')(obj) === '[object TypedArray]')
    );
}

// ArrayBuffer
function ArrayBuffer(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('ArrayBuffer')(obj) === '[object ArrayBuffer]')
    );
}

// SharedArrayBuffer
function SharedArrayBuffer(obj) {
    return (
        (!!Array.isArray(obj) || obj instanceof Array) && (tagTester('SharedArrayBuffer')(obj) === '[object SharedArrayBuffer]')
    );
}

// Set
function isSet(obj) {
    return (
        (Set.prototype.isPrototypeOf(obj) || obj instanceof Set)
    );
}

// Object
function isObject(obj) {
    (obj instanceof Object || typeof obj === "object")
}

// Function
function isFunction(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// AsyncFunction
function isAsyncFunction(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// globalThis
function isGlobalThis(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// Generator
function isGenerator(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply && obj.constructor.name === 'GeneratorFunction'))
    );
}

// GeneratorFunction
function isGeneratorFunction(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply && obj.constructor.name === 'AsyncGeneratorFunction'))
    );
}

// AsyncGenerator
function isAsyncGenerator(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply && obj.constructor.name === 'AsyncGenerator'))
    );
}

// AsyncGeneratorFunction
function isAsyncGeneratorFunction(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply && obj.constructor.name === 'AsyncGeneratorFunction'))
    );
}

// Promise
function isPromise(obj) {
    return (
        (typeof obj === "function" || obj instanceof Promise || Boolean(obj && obj.constructor && obj.call && obj.apply && obj.constructor.name === 'Promise'))
    );
}

// decodeURI()
function isDecodeURI(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// decodeURIComponent()
function isDecodeURIComponent(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// encodeURI()
function isEncodeURI(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// encodeURIComponent()
function isEncodeURIComponent(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// Deprecatedunescape()
function isDeprecatedunescape(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// Deprecatedescape()
function isDeprecatedescape(obj) {
    return (
        (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply))
    );
}

// eval()
function isEval(obj) {
    return (typeof obj === "function" || Boolean(obj && obj.constructor && obj.call && obj.apply));
}

// Error
function isError(obj) {
    return (typeof obj === "object" || obj instanceof Error);
}

// EvalError
function isEvalError(obj) {
    return (typeof obj === "object" || obj instanceof EvalError);
}

// RangeError
function isRangeError(obj) {
    return (typeof obj === "object" || obj instanceof RangeError);
}

// ReferenceError
function isReferenceError(obj) {
    return (typeof obj === "object" || obj instanceof ReferenceError);
}

// SyntaxError
function isSyntaxError(obj) {
    return (typeof obj === "object" || obj instanceof SyntaxError);
}

// TypeError
function isTypeError(obj) {
    return (typeof obj === "object" || obj instanceof TypeError);
}

// URIError
function isURIError(obj) {
    return (typeof obj === "object" || obj instanceof URIError);
}

// AggregateError
function isAggregateError(obj) {
    return (typeof obj === "object" || obj instanceof AggregateError);
}

// Non-standardInternalError
function isNonStandardInternalError(obj) { }

// Map
function isMap(obj) {
    return (typeof obj === "object" || obj instanceof Map);
}

// WeakMap
function isWeakMap(obj) {
    return (typeof obj === "object" || obj instanceof WeakMap);
}

// WeakRef
function isWeakRef(obj) {
    // return (typeof obj === "object" || obj instanceof WeakRef);
}

// WeakSet
function isWeakSet(obj) {
    return (typeof obj === "object" || obj instanceof WeakSet);
}

// DataView
function isDataView(obj) {
    return (typeof obj === "object" || obj instanceof DataView);
}

// Date
function isDate(obj, dateFormat) {
    return ((!isNaN(new Date(obj)) && obj.length === dateFormat.length) && ((tagTester("Date")(obj) === '[object Date]')));
}

// Date
function isDateObject(obj) {
    return (typeof obj === 'object' && obj.constructor === Date.constructor);
}

// JSON
function isJSON(obj) {
    try { return !!JSON.parse(obj); } catch (e) { return false; }
}

// JSON
function isJSONMethod(obj) {
    // return typeof obj === 'object' && obj.constructor === JSON.constructor;
}

// Proxy
function isProxy(obj) {
    return typeof obj === "object" || obj instanceof Proxy;
}

// Reflect
function isReflect(obj) {
    return typeof obj === "object" || obj instanceof Reflect;
}

// ReflectMethod
function isReflectMethod() {
    // const reflectFunction = Reflect.get;
    // console.log(isReflectFunction(reflectFunction));   // true
    return (typeof func === 'function' && Reflect.hasOwnProperty(func.name)) || (typeof func === 'function' && Reflect[func.name] === func);
}

// RegExp
function isRegExp() {
    return typeof obj === "object" || obj instanceof RegExp;
}

// Intl
function isIntl() {
    return typeof obj === 'object' && obj.constructor === Intl.constructor;
}

// IntlMethod
function isIntlMethod(obj) {
    return checkInstanceOfMethod(obj, Intl);
}

// FinalizationRegistry
function isFinalizationRegistry() {

}

// Math
function isMath() {
    return typeof obj === 'object' && obj.constructor === Math.constructor;
}

// MathMethod
function isMathMethod(obj) {
    return checkInstanceOfMethod(obj, Math);
}

// parseFloat()
function isFloat(obj) {

}

// isNotNaN() notNaN()
function notNaN(obj) {
    return !isNaN(obj);
}

// isNotNaN() notNaN()
const isNotNaN = notNaN;

// NaN
function isNaN(obj) {
    return isNaN(obj);
}

// Infinity
function isInfinity(obj) {
    return !isFinite(obj);
}

// isFinite()
function isFinite(obj) {
    return !!isFinite(obj);
}

// isFinite()
function isFiniteFunction(obj) {
    return typeof obj === "function" && obj.name === "isFinite";
}

// Atomics
function isAtomics(obj) {
    return typeof obj === 'object' && obj.constructor === Atomics.constructor;
}

// Atomics
function isAtomicsMethod(obj) {
    return checkInstanceOfMethod(obj, Atomics);
}

function isType(obj, typeStringName) {
    return (
        typeof obj === typeStringName ||
        Boolean(obj && obj.constructor && obj.call && obj.apply)
    );
    // return (
    //     typeof obj === typeStringName ||
    //     Boolean(obj && obj.constructor && obj.call && obj.apply)
    // );
}

module.exports = {
    isString,
    isNumber,
    isBoolean,
    isNull,
    isUndefined,
    isBigInt,
    isSymbol,
    isArray,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Int32Array,
    Int8Array,
    Float32Array,
    Float64Array,
    BigInt64Array,
    BigUint64Array,
    TypedArray,
    ArrayBuffer,
    SharedArrayBuffer,
    isSet,
    isObject,
    isFunction,
    isAsyncFunction,
    isGlobalThis,
    isGenerator,
    isGeneratorFunction,
    isAsyncGenerator,
    isAsyncGeneratorFunction,
    isPromise,
    isDecodeURI,
    isDecodeURIComponent,
    isEncodeURI,
    isEncodeURIComponent,
    isDeprecatedunescape,
    isDeprecatedescape,
    isEval,
    isError,
    isEvalError,
    isRangeError,
    isReferenceError,
    isSyntaxError,
    isTypeError,
    isURIError,
    isAggregateError,
    isNonStandardInternalError,
    isMap,
    isWeakMap,
    isWeakRef,
    isWeakSet,
    isSet,
    isDataView,
    isDate,
    isJSON,
    isProxy,
    isReflect,
    isRegExp,
    isIntl,
    isFinalizationRegistry,
    isMath,
    isFloat,
    isNotNaN,
    isNaN,
    isInfinity,
    isisFinite,
    isAtomics,
    isType,
    inbuilt,
    extendedtypes,
    typedefs
}

module.exports.inbuilt = inbuilt;
module.exports.extendedtypes = extendedtypes;
module.exports.typedefs = typedefs;
