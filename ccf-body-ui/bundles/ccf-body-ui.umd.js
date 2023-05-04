(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@deck.gl/core'), require('@deck.gl/layers'), require('@deck.gl/mesh-layers'), require('@luma.gl/core'), require('@math.gl/core'), require('@loaders.gl/core'), require('@loaders.gl/draco'), require('@loaders.gl/gltf'), require('cannon-es'), require('bind-decorator'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ccf-body-ui', ['exports', '@deck.gl/core', '@deck.gl/layers', '@deck.gl/mesh-layers', '@luma.gl/core', '@math.gl/core', '@loaders.gl/core', '@loaders.gl/draco', '@loaders.gl/gltf', 'cannon-es', 'bind-decorator', 'rxjs', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ccf-body-ui'] = {}, global.core$3, global.layers, global.meshLayers, global.core$2, global.core, global.core$1, global.draco, global.gltf, global.cannonEs, global.bind, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core$3, layers, meshLayers, core$2, core, core$1, draco, gltf, cannonEs, bind, rxjs, operators) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var bind__default = /*#__PURE__*/_interopDefaultLegacy(bind);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
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
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
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
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function traverseScene(scene, worldMatrix, visitor) {
        var e_1, _a;
        if (!worldMatrix) {
            worldMatrix = new core.Matrix4(core.Matrix4.IDENTITY);
        }
        var matrix = new core.Matrix4(core.Matrix4.IDENTITY);
        if (!scene) {
            return true;
        }
        else if (scene.matrix) {
            matrix.copy(scene.matrix);
        }
        else {
            matrix.identity();
            if (scene.translation) {
                matrix.translate(scene.translation);
            }
            if (scene.rotation) {
                var rotationMatrix = new core.Matrix4(core.Matrix4.IDENTITY).fromQuaternion(scene.rotation);
                matrix.multiplyRight(rotationMatrix);
            }
            if (scene.scale) {
                matrix.scale(scene.scale);
            }
        }
        var modelMatrix = new core.Matrix4(worldMatrix).multiplyRight(matrix);
        if (visitor(scene, modelMatrix, worldMatrix) === false) {
            return false;
        }
        try {
            for (var _b = __values((scene.nodes || scene.children || [])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (traverseScene(child, modelMatrix, visitor) === false) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }

    function registerGLTFLoaders() {
        core$1.registerLoaders([draco.DracoWorkerLoader, gltf.GLTFLoader]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    function deriveScenegraph(scenegraphNodeName, gltf) {
        var e_1, _b;
        var _a;
        var scenegraphNode = (_a = gltf.nodes) === null || _a === void 0 ? void 0 : _a.find(function (n) { return n.name === scenegraphNodeName; });
        if (scenegraphNode) {
            var foundNodeInScene_1 = false;
            try {
                for (var _c = __values(gltf.scenes), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var scene = _d.value;
                    if (!foundNodeInScene_1) {
                        traverseScene(scene, new core.Matrix4(core.Matrix4.IDENTITY), function (child, modelMatrix) {
                            if (child === scenegraphNode) {
                                child.matrix = modelMatrix;
                                child.translation = undefined;
                                child.rotation = undefined;
                                child.scale = undefined;
                                foundNodeInScene_1 = true;
                                return false;
                            }
                            return true;
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            gltf.scene = {
                id: scenegraphNodeName,
                name: scenegraphNodeName,
                nodes: [scenegraphNode]
            };
            gltf.scenes = [gltf.scene];
            return { scene: gltf.scene, scenes: gltf.scenes };
        }
        else {
            return gltf;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function loadGLTF(model, cache) {
        return __awaiter(this, void 0, void 0, function () {
            var gltfUrl, gltfPromise, gltf$1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        gltfUrl = model.scenegraph;
                        if (cache) {
                            gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then(function (r) { return r.blob(); }));
                        }
                        else {
                            gltfPromise = fetch(gltfUrl);
                        }
                        return [4 /*yield*/, core$1.parse(gltfPromise, gltf.GLTFLoader, { DracoLoader: draco.DracoLoader, gltf: { decompressMeshes: true, postProcess: true } })];
                    case 1:
                        gltf$1 = _b.sent();
                        if (!gltf$1.nodes) {
                            console.log('WARNING: Empty Scene', gltfUrl, gltf$1);
                        }
                        return [2 /*return*/, deriveScenegraph(model.scenegraphNode, gltf$1)];
                }
            });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function loadGLTF2(scenegraphNodeName, gltfPromise) {
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = deriveScenegraph;
                        _c = [scenegraphNodeName];
                        return [4 /*yield*/, gltfPromise];
                    case 1: return [2 /*return*/, _b.apply(void 0, _c.concat([_d.sent()]))];
                }
            });
        });
    }
    /* eslint-enable */

    /* eslint-disable  */
    function doCollisions(scene) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceBoxes, targetBoxes, _loop_1, _a, _b, model, e_1_1, report, sad, sourceBoxes_1, sourceBoxes_1_1, src, hits, targetBoxes_1, targetBoxes_1_1, target, csvReport, report_1, report_1_1, hit, _c, _d, h;
            var e_1, _e, e_2, _f, e_3, _g, e_4, _h, e_5, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        console.log('Starting Collisioning');
                        sourceBoxes = scene
                            .filter(function (d) { return !d.scenegraph && d.geometry !== 'wireframe'; })
                            .map(function (model) {
                            var mat = new core.Matrix4(model.transformMatrix);
                            var lowerBound = mat.transformAsPoint([-1, -1, -1], []);
                            var upperBound = mat.transformAsPoint([1, 1, 1], []);
                            return {
                                '@id': model['@id'],
                                name: model.tooltip,
                                entityId: model.entityId,
                                bbox: new cannonEs.AABB({
                                    lowerBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(lowerBound.map(function (n, i) { return Math.min(n, upperBound[i]); })))))(),
                                    upperBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(upperBound.map(function (n, i) { return Math.max(n, lowerBound[i]); })))))()
                                })
                            };
                        });
                        targetBoxes = [];
                        _loop_1 = function (model) {
                            var gltf$1, _l, _m, gltfScene;
                            var e_6, _o;
                            return __generator(this, function (_p) {
                                switch (_p.label) {
                                    case 0: return [4 /*yield*/, core$1.load(model.scenegraph, gltf.GLTFLoader, { DracoLoader: draco.DracoLoader, decompress: true, postProcess: true })];
                                    case 1:
                                        gltf$1 = _p.sent();
                                        try {
                                            for (_l = (e_6 = void 0, __values(gltf$1.scenes)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                                gltfScene = _m.value;
                                                traverseScene(gltfScene, new core.Matrix4(model.transformMatrix), function (node, modelMatrix) {
                                                    var e_7, _a;
                                                    if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                                                        var _loop_2 = function (primitive) {
                                                            if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                                                                var lowerBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                                                                var upperBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                                                                targetBoxes.push({
                                                                    '@id': model['@id'],
                                                                    name: node.name,
                                                                    entityId: model.entityId,
                                                                    bbox: new cannonEs.AABB({
                                                                        lowerBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(lowerBound_1.map(function (n, i) { return Math.min(n, upperBound_1[i]); })))))(),
                                                                        upperBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(upperBound_1.map(function (n, i) { return Math.max(n, lowerBound_1[i]); })))))()
                                                                    }),
                                                                    gltf: gltf$1
                                                                });
                                                            }
                                                        };
                                                        try {
                                                            for (var _b = (e_7 = void 0, __values(node.mesh.primitives)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                                                var primitive = _c.value;
                                                                _loop_2(primitive);
                                                            }
                                                        }
                                                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                                        finally {
                                                            try {
                                                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                                            }
                                                            finally { if (e_7) throw e_7.error; }
                                                        }
                                                    }
                                                    return true;
                                                });
                                            }
                                        }
                                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                        finally {
                                            try {
                                                if (_m && !_m.done && (_o = _l.return)) _o.call(_l);
                                            }
                                            finally { if (e_6) throw e_6.error; }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 6, 7, 8]);
                        _a = __values(scene.filter(function (d) { return !!d.scenegraph; })), _b = _a.next();
                        _k.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        model = _b.value;
                        return [5 /*yield**/, _loop_1(model)];
                    case 3:
                        _k.sent();
                        _k.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _k.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        report = [];
                        sad = [];
                        try {
                            for (sourceBoxes_1 = __values(sourceBoxes), sourceBoxes_1_1 = sourceBoxes_1.next(); !sourceBoxes_1_1.done; sourceBoxes_1_1 = sourceBoxes_1.next()) {
                                src = sourceBoxes_1_1.value;
                                hits = [];
                                try {
                                    for (targetBoxes_1 = (e_3 = void 0, __values(targetBoxes)), targetBoxes_1_1 = targetBoxes_1.next(); !targetBoxes_1_1.done; targetBoxes_1_1 = targetBoxes_1.next()) {
                                        target = targetBoxes_1_1.value;
                                        if (src.bbox.overlaps(target.bbox)) {
                                            hits.push({ '@id': target['@id'], name: target.name });
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (targetBoxes_1_1 && !targetBoxes_1_1.done && (_g = targetBoxes_1.return)) _g.call(targetBoxes_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                if (hits.length > 0) {
                                    report.push({
                                        '@id': src.entityId,
                                        name: src.name,
                                        hits: hits
                                    });
                                }
                                else {
                                    sad.push(src);
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (sourceBoxes_1_1 && !sourceBoxes_1_1.done && (_f = sourceBoxes_1.return)) _f.call(sourceBoxes_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        console.log({ sourceBoxes: sourceBoxes, targetBoxes: targetBoxes, report: report, sad: sad, maxHits: Math.max.apply(Math, __spreadArray([], __read(report.map(function (r) { return r.hits.length; })))) });
                        csvReport = [];
                        try {
                            for (report_1 = __values(report), report_1_1 = report_1.next(); !report_1_1.done; report_1_1 = report_1.next()) {
                                hit = report_1_1.value;
                                csvReport.push({
                                    'Tissue ID': hit['@id'],
                                    'Tissue Name': hit.name,
                                    'Hit ID': '',
                                    'Hit Name': ''
                                });
                                try {
                                    for (_c = (e_5 = void 0, __values(hit.hits)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        h = _d.value;
                                        csvReport.push({
                                            'Tissue ID': hit['@id'],
                                            'Tissue Name': hit.name,
                                            'Hit ID': h['@id'],
                                            'Hit Name': h.name
                                        });
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_j = _c.return)) _j.call(_c);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (report_1_1 && !report_1_1.done && (_h = report_1.return)) _h.call(report_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        console.log(csvReport);
                        return [2 /*return*/, report];
                }
            });
        });
    }
    /* eslint-enable */

    function meshLayer(id, data, options) {
        if (!data || data.length === 0) {
            return undefined;
        }
        else {
            var mesh = void 0;
            switch (options.geometry) {
                case 'sphere':
                    mesh = new core$2.SphereGeometry();
                    break;
                case 'cone':
                    mesh = new core$2.ConeGeometry();
                    break;
                case 'cylinder':
                    mesh = new core$2.CylinderGeometry();
                    break;
                case 'cube':
                default:
                    mesh = new core$2.CubeGeometry();
                    break;
            }
            return new meshLayers.SimpleMeshLayer(Object.assign({
                id: id,
                pickable: true,
                autoHighlight: false,
                highlightColor: [30, 136, 229, 255],
                coordinateSystem: core$3.COORDINATE_SYSTEM.CARTESIAN,
                data: data,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                mesh: mesh,
                wireframe: false,
                getTransformMatrix: function (d) { return d.transformMatrix; },
                getColor: function (d) { return d.color || [255, 255, 255, 0.9 * 255]; }
            }, options));
        }
    }
    function textLayer(id, data, options) {
        if (!data || data.length === 0) {
            return undefined;
        }
        else {
            return new layers.TextLayer(Object.assign({
                id: id,
                pickable: true,
                data: data.map(function (d) { return (Object.assign(Object.assign({}, d), { position: new core.Matrix4(d.transformMatrix).getTranslation() })); }),
                getText: function (d) { return d.text; },
                getPosition: function (d) { return d.position; },
                getColor: function (d) { return d.color; }
            }, options));
        }
    }
    var BodyUILayer = /** @class */ (function (_super) {
        __extends(BodyUILayer, _super);
        function BodyUILayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BodyUILayer.prototype.initializeState = function () {
            var data = this.props.data;
            this.setState({ data: data !== null && data !== void 0 ? data : [], zoomOpacity: 0.8, doCollisions: false });
            registerGLTFLoaders();
        };
        BodyUILayer.prototype.renderLayers = function () {
            var e_1, _c, e_2, _d, e_3, _e, e_4, _f;
            var _a, _b;
            var state = this.state;
            var geometries = {
                'sphere': [], 'cone': [], 'cylinder': [], 'cube': [], 'text': [], 'wireframe': [], 'scenegraph': []
            };
            try {
                for (var _g = __values(state.data), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var node = _h.value;
                    var geometry = (_a = node.geometry) !== null && _a !== void 0 ? _a : 'cube';
                    if (node.scenegraph) {
                        geometries.scenegraph.push(node);
                    }
                    else if (geometries[geometry] !== undefined) {
                        geometries[geometry].push(node);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var url2gltf = {};
            try {
                for (var _j = __values(geometries.scenegraph), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var m = _k.value;
                    if (m.scenegraph && m.scenegraphNode && !Object.prototype.hasOwnProperty.call(url2gltf, m.scenegraph)) {
                        url2gltf[m.scenegraph] = loadGLTF({ scenegraph: m.scenegraph }, BodyUILayer.gltfCache);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var layers = [];
            try {
                for (var _l = __values(Object.entries(geometries)), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var _o = __read(_m.value, 2), geometry = _o[0], nodes = _o[1];
                    if (geometry === 'scenegraph') {
                        try {
                            for (var nodes_1 = (e_4 = void 0, __values(nodes)), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                                var model = nodes_1_1.value;
                                layers.push(new meshLayers.ScenegraphLayer({
                                    id: 'models-' + model['@id'],
                                    opacity: model.zoomBasedOpacity ? state.zoomOpacity : (model.opacity !== undefined ? model.opacity : 1.0),
                                    pickable: !model.unpickable,
                                    coordinateSystem: core$3.COORDINATE_SYSTEM.CARTESIAN,
                                    data: [model],
                                    scenegraph: model.scenegraphNode ?
                                        loadGLTF2(model.scenegraphNode, url2gltf[model.scenegraph]) :
                                        model.scenegraph,
                                    // eslint-disable-next-line @typescript-eslint/naming-convention
                                    _lighting: model._lighting,
                                    getTransformMatrix: model.transformMatrix,
                                    getColor: (_b = model.color) !== null && _b !== void 0 ? _b : [0, 255, 0, 0.5 * 255],
                                    parameters: { depthMask: !model.zoomBasedOpacity && (model.opacity === undefined || model.opacity === 1) }
                                }));
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (nodes_1_1 && !nodes_1_1.done && (_f = nodes_1.return)) _f.call(nodes_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                    else if (geometry === 'text') {
                        layers.push(textLayer('text', nodes.filter(function (n) { return n.unpickable; }), { pickable: false }));
                        layers.push(textLayer('textPickable', nodes.filter(function (n) { return !n.unpickable; }), { pickable: true }));
                    }
                    else if (geometry === 'wireframe') {
                        layers.push(meshLayer(geometry, nodes, { wireframe: true, pickable: false, geometry: geometry }));
                    }
                    else {
                        layers.push(meshLayer(geometry, nodes.filter(function (n) { return n.unpickable; }), { wireframe: false, pickable: false, geometry: geometry }));
                        layers.push(meshLayer(geometry + "Pickable", nodes.filter(function (n) { return !n.unpickable; }), { wireframe: false, pickable: true, geometry: geometry }));
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_e = _l.return)) _e.call(_l);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (state.doCollisions) {
                doCollisions(state.data);
            }
            return layers.filter(function (l) { return !!l; });
        };
        BodyUILayer.prototype.getPickingInfo = function (e) {
            return e.info;
        };
        return BodyUILayer;
    }(core$3.CompositeLayer));
    BodyUILayer.layerName = 'BodyUILayer';
    BodyUILayer.gltfCache = {};

    /* eslint-disable  */
    function childNames(scene, names) {
        var e_1, _a;
        if (names === void 0) { names = []; }
        try {
            for (var _b = __values((scene.nodes || scene.children || [])), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                names.push(child.name);
                childNames(child, names);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return names;
    }
    function processSceneNodes(gltfUrl, worldMatrix, scenegraphNode) {
        return __awaiter(this, void 0, void 0, function () {
            var gltf, nodes, gltfNodes, _a, _b, scene, _c, _d, node, _e, _f, child, _g, _h, node, lb, ub, size, halfSize, center, gltfNodes_1, gltfNodes_1_1, node;
            var e_2, _j, e_3, _k, e_4, _l, e_5, _m, e_6, _o;
            return __generator(this, function (_p) {
                switch (_p.label) {
                    case 0:
                        registerGLTFLoaders();
                        return [4 /*yield*/, loadGLTF({ scenegraph: gltfUrl, scenegraphNode: scenegraphNode })];
                    case 1:
                        gltf = _p.sent();
                        nodes = {};
                        gltfNodes = [];
                        try {
                            for (_a = __values(gltf.scenes), _b = _a.next(); !_b.done; _b = _a.next()) {
                                scene = _b.value;
                                worldMatrix = new core.Matrix4(worldMatrix || core.Matrix4.IDENTITY);
                                traverseScene(scene, worldMatrix, function (node, modelMatrix) {
                                    var e_7, _a;
                                    var processedNode = {
                                        '@id': (node.name || node.id),
                                        '@type': 'ProcessedNode',
                                        transformMatrix: new core.Matrix4(modelMatrix),
                                        geometry: 'wireframe',
                                        node: node
                                    };
                                    gltfNodes.push({
                                        '@id': "GLTF:" + processedNode['@id'],
                                        '@type': 'GLTFNode',
                                        scenegraph: gltfUrl,
                                        scenegraphNode: processedNode['@id'],
                                        transformMatrix: new core.Matrix4(worldMatrix || core.Matrix4.IDENTITY),
                                        tooltip: (node.name || node.id),
                                        color: [255, 255, 255, 255],
                                        _lighting: 'pbr',
                                        zoomBasedOpacity: true,
                                        node: node
                                    });
                                    if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                                        var _loop_1 = function (primitive) {
                                            if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                                                var lowerBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                                                var upperBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                                                processedNode.bbox = new cannonEs.AABB({
                                                    lowerBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(lowerBound_1.map(function (n, i) { return Math.min(n, upperBound_1[i]); })))))(),
                                                    upperBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(upperBound_1.map(function (n, i) { return Math.max(n, lowerBound_1[i]); })))))()
                                                });
                                            }
                                        };
                                        try {
                                            for (var _b = (e_7 = void 0, __values(node.mesh.primitives)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                                var primitive = _c.value;
                                                _loop_1(primitive);
                                            }
                                        }
                                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                        finally {
                                            try {
                                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                            }
                                            finally { if (e_7) throw e_7.error; }
                                        }
                                    }
                                    nodes[processedNode['@id']] = processedNode;
                                    return true;
                                });
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_j = _a.return)) _j.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        try {
                            for (_c = __values(Object.values(nodes).filter(function (n) { return !n.bbox; })), _d = _c.next(); !_d.done; _d = _c.next()) {
                                node = _d.value;
                                try {
                                    for (_e = (e_4 = void 0, __values(childNames(node.node).map(function (n) { return nodes[n]; }).filter(function (n) { return n.bbox; }))), _f = _e.next(); !_f.done; _f = _e.next()) {
                                        child = _f.value;
                                        if (!node.bbox) {
                                            node.bbox = child.bbox.clone();
                                        }
                                        else {
                                            node.bbox.extend(child.bbox);
                                        }
                                    }
                                }
                                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                finally {
                                    try {
                                        if (_f && !_f.done && (_l = _e.return)) _l.call(_e);
                                    }
                                    finally { if (e_4) throw e_4.error; }
                                }
                                if (!node.bbox) {
                                    delete nodes[node['@id']];
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_k = _c.return)) _k.call(_c);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        try {
                            for (_g = __values(Object.values(nodes)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                node = _h.value;
                                lb = node.bbox.lowerBound;
                                ub = node.bbox.upperBound;
                                size = node.size = ub.clone().vsub(lb);
                                halfSize = size.clone().vmul(new cannonEs.Vec3(0.5, 0.5, 0.5));
                                center = node.center = lb.clone().vadd(halfSize);
                                node.transformMatrix = new core.Matrix4(core.Matrix4.IDENTITY)
                                    .translate(center.toArray())
                                    .scale(halfSize.toArray());
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_m = _g.return)) _m.call(_g);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        try {
                            for (gltfNodes_1 = __values(gltfNodes), gltfNodes_1_1 = gltfNodes_1.next(); !gltfNodes_1_1.done; gltfNodes_1_1 = gltfNodes_1.next()) {
                                node = gltfNodes_1_1.value;
                                nodes[node['@id']] = node;
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (gltfNodes_1_1 && !gltfNodes_1_1.done && (_o = gltfNodes_1.return)) _o.call(gltfNodes_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        return [2 /*return*/, nodes];
                }
            });
        });
    }
    /* eslint-enable */

    /**
     * A convenience wrapper class for the CCF Body UI
     */
    var BodyUI = /** @class */ (function () {
        function BodyUI(deckProps) {
            var _this = this;
            var _a, _b, _c, _d, _e;
            this.deckProps = deckProps;
            this.bodyUILayer = new BodyUILayer({});
            this.nodeClickSubject = new rxjs.Subject();
            this.nodeHoverStartSubject = new rxjs.Subject();
            this.nodeHoverStopSubject = new rxjs.Subject();
            this.sceneRotationSubject = new rxjs.BehaviorSubject([0, 0]);
            this.nodeDragStartSubject = new rxjs.Subject();
            this.nodeDragSubject = new rxjs.Subject();
            this.nodeDragEndSubject = new rxjs.Subject();
            this.nodeClick$ = this.nodeClickSubject.pipe(operators.share());
            this.nodeHoverStart$ = this.nodeHoverStartSubject.pipe(operators.share());
            this.nodeHoverStop$ = this.nodeHoverStopSubject.pipe(operators.share());
            this.sceneRotation$ = this.sceneRotationSubject.pipe(operators.share());
            this.nodeDragStart$ = this.nodeDragStartSubject.pipe(operators.share());
            this.nodeDrag$ = this.nodeDragSubject.pipe(operators.share());
            this.nodeDragEnd$ = this.nodeDragEndSubject.pipe(operators.share());
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var props = Object.assign(Object.assign({}, deckProps), { views: [deckProps.camera === 'orthographic' ? new core$3.OrthographicView({
                        flipY: false,
                        near: -1000
                    }) : new core$3.OrbitView({ orbitAxis: 'Y' })], controller: deckProps.interactive !== undefined ? deckProps.interactive : true, layers: [this.bodyUILayer], onHover: this._onHover, onClick: this._onClick, onViewStateChange: this._onViewStateChange, onDragStart: this._onDragStart, onDrag: this._onDrag, onDragEnd: this._onDragEnd, getCursor: function (e) { var _a; return (_a = _this.cursor) !== null && _a !== void 0 ? _a : (e.isDragging ? 'grabbing' : 'grab'); } });
            if (deckProps.legacyLighting) {
                // eslint-disable-next-line
                props.effects = [
                    new core$3.LightingEffect({
                        ambientLight: new core$3.AmbientLight({
                            color: [255, 255, 255],
                            intensity: 10.0
                        })
                    })
                ];
            }
            // eslint-disable-next-line
            this.deck = new core$3.Deck(props);
            this.deck.setProps({
                viewState: {
                    orbitAxis: 'Y',
                    minRotationX: (_a = deckProps.minRotationX) !== null && _a !== void 0 ? _a : -15,
                    maxRotationX: (_b = deckProps.maxRotationX) !== null && _b !== void 0 ? _b : 15,
                    target: (_c = deckProps.target) !== null && _c !== void 0 ? _c : [0.5, 0.5, 0],
                    rotationX: 0,
                    rotationOrbit: (_d = deckProps.rotation) !== null && _d !== void 0 ? _d : 0,
                    zoom: (_e = deckProps.zoom) !== null && _e !== void 0 ? _e : 9.5,
                    camera: deckProps.camera
                }
            });
            if (deckProps.rotation) {
                this.sceneRotationSubject.next([deckProps.rotation, 0]);
            }
        }
        BodyUI.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (!!this.bodyUILayer.state) return [3 /*break*/, 2];
                            // eslint-disable-next-line no-await-in-loop
                            return [4 /*yield*/, new Promise(function (r) {
                                    setTimeout(r, 200);
                                })];
                        case 1:
                            // eslint-disable-next-line no-await-in-loop
                            _f.sent();
                            return [3 /*break*/, 0];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        BodyUI.prototype.finalize = function () {
            this.deck.finalize();
        };
        BodyUI.prototype.setScene = function (data) {
            var e_1, _f;
            if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
                var zoomOpacity = this.bodyUILayer.state.zoomOpacity;
                var didZoom = false;
                try {
                    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                        var node = data_1_1.value;
                        if (node.zoomToOnLoad) {
                            this.zoomTo(node);
                            didZoom = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_f = data_1.return)) _f.call(data_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                zoomOpacity = didZoom ? 0.05 : zoomOpacity;
                if (!this.deckProps.debugSceneNodeProcessing) {
                    this.bodyUILayer.setState({ data: data, zoomOpacity: zoomOpacity });
                }
                else {
                    this.debugSceneNodeProcessing(data, zoomOpacity);
                }
            }
        };
        BodyUI.prototype.debugSceneNodeProcessing = function (data, zoomOpacity) {
            var _this = this;
            // const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Male/United/VHM_United_Color.glb';
            var gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Female/United/VHF_United_Color.glb';
            // const gltfUrl = 'https://hubmapconsortium.github.io/hubmap-ontology/objects/VHF_United_v01_060420.glb';
            var gltfTransform = new core.Matrix4([0.076, 0, 0, 0, 0, 0.076, 1.6875389974302382e-17, 0, 0, -1.6875389974302382e-17, 0.076, 0, 0.49, 0.034, 0.11, 1]);
            processSceneNodes(gltfUrl, gltfTransform, 'VHF_Kidney_L_Low1').then(function (results) {
                console.log('results', results);
                console.log('data', data);
                // data = Object.values(results);
                data = data.concat(Object.values(results));
                data.push({
                    '@id': 'TEST',
                    '@type': 'TEST',
                    scenegraph: gltfUrl,
                    scenegraphNode: 'VHF_Kidney_R_Low',
                    transformMatrix: gltfTransform,
                    color: [255, 255, 255, 200],
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    _lighting: 'pbr',
                    zoomBasedOpacity: false
                });
                _this.bodyUILayer.setState({ data: data, zoomOpacity: zoomOpacity });
            });
        };
        BodyUI.prototype.zoomTo = function (node) {
            var matrix = new core.Matrix4(node.transformMatrix);
            this.deck.setProps({
                viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { target: matrix.getTranslation(), rotationX: 0, rotationOrbit: 0, zoom: 11.5 })
            });
        };
        BodyUI.prototype.setRotation = function (value) {
            this.deck.setProps({
                viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { rotationOrbit: value })
            });
        };
        BodyUI.prototype.setRotationX = function (value) {
            this.deck.setProps({
                viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { rotationX: value })
            });
        };
        BodyUI.prototype.setZoom = function (value) {
            this.deck.setProps({
                viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { zoom: value })
            });
        };
        BodyUI.prototype.setTarget = function (value) {
            this.deck.setProps({
                viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { target: value })
            });
        };
        BodyUI.prototype.setInteractive = function (value) {
            this.deck.setProps({
                controller: value
            });
        };
        BodyUI.prototype._onHover = function (e) {
            var lastHovered = this.lastHovered;
            this.cursor = e.picked ? 'pointer' : undefined;
            if (e.picked && e.object && e.object['@id']) {
                if (lastHovered !== e.object) {
                    if (lastHovered) {
                        this.nodeHoverStopSubject.next(lastHovered);
                    }
                    this.lastHovered = e.object;
                    this.nodeHoverStartSubject.next(e.object);
                }
            }
            else if (lastHovered) {
                this.nodeHoverStopSubject.next(lastHovered);
                this.lastHovered = undefined;
            }
        };
        BodyUI.prototype._onClick = function (info, e) {
            var _a, _b;
            if (info.picked && info.object && info.object['@id']) {
                this.nodeClickSubject.next({ node: info.object, ctrlClick: (_b = (_a = e === null || e === void 0 ? void 0 : e.srcEvent) === null || _a === void 0 ? void 0 : _a.ctrlKey) !== null && _b !== void 0 ? _b : undefined });
            }
        };
        BodyUI.prototype._onViewStateChange = function (event) {
            var _a;
            if ((_a = event.interactionState) === null || _a === void 0 ? void 0 : _a.isZooming) {
                var currentState = this.bodyUILayer.state;
                var zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 2, 0.05), 1.0);
                if (currentState.zoomOpacity !== zoomOpacity) {
                    this.bodyUILayer.setState({ data: currentState.data, zoomOpacity: zoomOpacity });
                }
            }
            this.deck.setProps({ viewState: Object.assign({}, event.viewState) });
            this.sceneRotationSubject.next([event.viewState.rotationOrbit, event.viewState.rotationX]);
        };
        BodyUI.prototype._onDragStart = function (info, e) {
            this._dragEvent(info, e, this.nodeDragStartSubject);
        };
        BodyUI.prototype._onDrag = function (info, e) {
            this._dragEvent(info, e, this.nodeDragSubject);
        };
        BodyUI.prototype._onDragEnd = function (info, e) {
            this._dragEvent(info, e, this.nodeDragEndSubject);
        };
        BodyUI.prototype._dragEvent = function (info, e, subject) {
            var _a;
            if ((_a = info === null || info === void 0 ? void 0 : info.object) === null || _a === void 0 ? void 0 : _a['@id']) {
                subject.next({ node: info.object, info: info, e: e });
            }
        };
        return BodyUI;
    }());
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onHover", null);
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onClick", null);
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onViewStateChange", null);
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onDragStart", null);
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onDrag", null);
    __decorate([
        bind__default['default']
    ], BodyUI.prototype, "_onDragEnd", null);

    function simplifyScene(nodes) {
        return __awaiter(this, void 0, void 0, function () {
            var gltfCache, gltfUrls, gltfUrls_1, gltfUrls_1_1, gltfUrl, _a, _b, e_1_1, newNodes, _loop_1, _c, _d, model;
            var e_1, _e, e_2, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        gltfCache = {};
                        gltfUrls = new Set(nodes.map(function (n) { return n.scenegraph; }).filter(function (n) { return !!n; }));
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        gltfUrls_1 = __values(gltfUrls), gltfUrls_1_1 = gltfUrls_1.next();
                        _g.label = 2;
                    case 2:
                        if (!!gltfUrls_1_1.done) return [3 /*break*/, 5];
                        gltfUrl = gltfUrls_1_1.value;
                        // eslint-disable-next-line no-await-in-loop
                        _a = gltfCache;
                        _b = gltfUrl;
                        return [4 /*yield*/, loadGLTF({ scenegraph: gltfUrl })];
                    case 3:
                        // eslint-disable-next-line no-await-in-loop
                        _a[_b] = _g.sent();
                        _g.label = 4;
                    case 4:
                        gltfUrls_1_1 = gltfUrls_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (gltfUrls_1_1 && !gltfUrls_1_1.done && (_e = gltfUrls_1.return)) _e.call(gltfUrls_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        newNodes = nodes.filter(function (n) { return !n.scenegraph; });
                        _loop_1 = function (model) {
                            var e_3, _h;
                            var gltf = gltfCache[model.scenegraph];
                            var bbox = new cannonEs.AABB();
                            var worldMatrix = new core.Matrix4(model.transformMatrix);
                            /* eslint-disable  */
                            if (model.scenegraphNode) {
                                var scenegraphNode_1 = model.scenegraphNode ? gltf.nodes.find(function (n) { return n.name === model.scenegraphNode; }) : undefined;
                                var foundNodeInScene_1 = false;
                                try {
                                    for (var _j = (e_3 = void 0, __values(gltf.scenes)), _k = _j.next(); !_k.done; _k = _j.next()) {
                                        var scene = _k.value;
                                        if (!foundNodeInScene_1) {
                                            traverseScene(scene, new core.Matrix4(model.transformMatrix), function (child, modelMatrix) {
                                                if (child === scenegraphNode_1) {
                                                    worldMatrix = modelMatrix;
                                                    foundNodeInScene_1 = true;
                                                    return false;
                                                }
                                                return true;
                                            });
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_k && !_k.done && (_h = _j.return)) _h.call(_j);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                gltf.scene = {
                                    id: model.scenegraphNode,
                                    name: model.scenegraphNode,
                                    nodes: [scenegraphNode_1]
                                };
                            }
                            traverseScene(gltf.scene, worldMatrix, function (node, modelMatrix) {
                                var e_4, _a;
                                if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                                    var _loop_2 = function (primitive) {
                                        if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                                            var lowerBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                                            var upperBound_1 = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                                            var innerBbox = new cannonEs.AABB({
                                                lowerBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(lowerBound_1.map(function (n, i) { return Math.min(n, upperBound_1[i]); })))))(),
                                                upperBound: new (cannonEs.Vec3.bind.apply(cannonEs.Vec3, __spreadArray([void 0], __read(upperBound_1.map(function (n, i) { return Math.max(n, lowerBound_1[i]); })))))()
                                            });
                                            bbox.extend(innerBbox);
                                        }
                                    };
                                    try {
                                        for (var _b = (e_4 = void 0, __values(node.mesh.primitives)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                            var primitive = _c.value;
                                            _loop_2(primitive);
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                }
                                return true;
                            });
                            /* eslint-enable */
                            var size = bbox.upperBound.clone().vsub(bbox.lowerBound);
                            var halfSize = size.clone().vmul(new cannonEs.Vec3(0.5, 0.5, 0.5));
                            var position = bbox.lowerBound.clone().vadd(halfSize);
                            var transformMatrix = new core.Matrix4(core.Matrix4.IDENTITY)
                                .translate(position.toArray())
                                .scale(halfSize.toArray());
                            var newNode = Object.assign(Object.assign({}, model), { transformMatrix: transformMatrix, geometry: 'wireframe' });
                            delete newNode.scenegraph;
                            delete newNode.scenegraphNode;
                            newNodes.push(newNode);
                        };
                        try {
                            for (_c = __values(nodes.filter(function (n) { return n.scenegraph; })), _d = _c.next(); !_d.done; _d = _c.next()) {
                                model = _d.value;
                                _loop_1(model);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/, newNodes];
                }
            });
        });
    }

    // Hack to support deck.gl and other typings

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BodyUI = BodyUI;
    exports.BodyUILayer = BodyUILayer;
    exports.deriveScenegraph = deriveScenegraph;
    exports.doCollisions = doCollisions;
    exports.loadGLTF = loadGLTF;
    exports.loadGLTF2 = loadGLTF2;
    exports.processSceneNodes = processSceneNodes;
    exports.registerGLTFLoaders = registerGLTFLoaders;
    exports.simplifyScene = simplifyScene;
    exports.traverseScene = traverseScene;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ccf-body-ui.umd.js.map
