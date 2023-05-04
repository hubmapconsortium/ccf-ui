(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('idb-keyval'), require('triple-store-utils'), require('@math.gl/core'), require('graphology'), require('graphology-shortest-path/unweighted'), require('lodash'), require('uuid'), require('rdf-literal'), require('@math.gl/culling')) :
    typeof define === 'function' && define.amd ? define('ccf-database', ['exports', 'idb-keyval', 'triple-store-utils', '@math.gl/core', 'graphology', 'graphology-shortest-path/unweighted', 'lodash', 'uuid', 'rdf-literal', '@math.gl/culling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ccf-database'] = {}, global['idb-keyval'], global.tripleStoreUtils, global.core, global.graphology, global.shortestPath, global.lodash, global.uuid, global.rdfLiteral, global.culling));
}(this, (function (exports, idbKeyval, tripleStoreUtils, core, graphology, shortestPath, lodash, uuid, rdfLiteral, culling) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var shortestPath__default = /*#__PURE__*/_interopDefaultLegacy(shortestPath);

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

    /**
     * Iterates over the key/value pairs for an IRI, using the specified mapping with quads from the store.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @param mapping Property mappings.
     * @returns an iterator over the key/value pairs
     */
    function getEntries(store, iri, mapping) {
        var _a, _b, _c, predicate, key, _d, _e, quad, value, e_1_1, e_2_1;
        var e_2, _f, e_1, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _h.trys.push([0, 11, 12, 13]);
                    _a = __values(Object.entries(mapping)), _b = _a.next();
                    _h.label = 1;
                case 1:
                    if (!!_b.done) return [3 /*break*/, 10];
                    _c = __read(_b.value, 2), predicate = _c[0], key = _c[1];
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 7, 8, 9]);
                    _d = (e_1 = void 0, __values(tripleStoreUtils.readQuads(store, iri, predicate, null, null))), _e = _d.next();
                    _h.label = 3;
                case 3:
                    if (!!_e.done) return [3 /*break*/, 6];
                    quad = _e.value;
                    value = quad.object.termType === 'Literal' ? rdfLiteral.fromRdf(quad.object) : quad.object.id;
                    return [4 /*yield*/, [key, value]];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5:
                    _e = _d.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    _b = _a.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_2_1 = _h.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    }
    /**
     * Creates an object of the specified type using quads from the store.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @param type Type name.
     * @param mapping Property mappings.
     * @returns A new data object.
     */
    function getMappedResult(store, iri, type, mapping) {
        var e_3, _a, e_4, _b;
        var result = { '@id': iri, '@type': type };
        try {
            for (var _c = __values(Object.entries(mapping)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), predicate = _e[0], key = _e[1];
                try {
                    for (var _f = (e_4 = void 0, __values(tripleStoreUtils.readQuads(store, result['@id'], predicate, null, null))), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var quad = _g.value;
                        var value = quad.object.termType === 'Literal' ? rdfLiteral.fromRdf(quad.object) : quad.object.id;
                        result[key] = value;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return result;
    }

    /* eslint-disable @typescript-eslint/naming-convention */
    /** Constants used to create entity accessors. */
    var PREFIXES = {
        base: 'http://purl.org/ccf/latest/ccf.owl#',
        ccf: 'http://purl.org/ccf/',
        fma: 'http://purl.org/sig/ont/fma/fma',
        obo: 'http://purl.obolibrary.org/obo/',
        uberon: 'http://purl.obolibrary.org/obo/UBERON_',
        cl: 'http://purl.obolibrary.org/obo/CL_',
        lmha: 'http://purl.obolibrary.org/obo/LMHA_',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        dc: 'http://purl.org/dc/elements/1.1/',
        dcterms: 'http://purl.org/dc/terms/'
    };
    /** Prefix factory. */
    var prefixer = tripleStoreUtils.Util.prefixes(PREFIXES, tripleStoreUtils.DataFactory);
    var rdf = {
        x: prefixer('rdf'),
        type: prefixer('rdf')('type')
    };
    var rdfs = {
        x: prefixer('rdfs'),
        label: prefixer('rdfs')('label'),
        comment: prefixer('rdfs')('comment'),
        isDefinedBy: prefixer('rdfs')('isDefinedBy'),
        seeAlso: prefixer('rdfs')('seeAlso')
    };
    /** CCF id helper. */
    var ccfx = prefixer('ccf');
    /** Common entity ids. */
    var entity = {
        id: prefixer('ccf')('has_registration_location'),
        label: prefixer('rdfs')('label'),
        description: prefixer('rdfs')('comment'),
        link: ccfx('url'),
        sex: ccfx('sex'),
        age: ccfx('age'),
        bmi: ccfx('bmi'),
        Male: tripleStoreUtils.DataFactory.literal('Male'),
        Female: tripleStoreUtils.DataFactory.literal('Female'),
        consortiumName: ccfx('consortium_name'),
        providerName: ccfx('tissue_provider_name'),
        providerUUID: ccfx('tissue_provider_uuid'),
        donor: ccfx('comes_from'),
        sections: ccfx('subdivided_into_sections'),
        datasets: ccfx('generates_dataset'),
        sampleType: ccfx('sample_type'),
        TissueBlock: tripleStoreUtils.DataFactory.literal('Tissue Block'),
        TissueSection: tripleStoreUtils.DataFactory.literal('Tissue Section'),
        NonStandard: tripleStoreUtils.DataFactory.literal('Non-standard'),
        sectionCount: ccfx('section_count'),
        sectionSize: ccfx('section_size'),
        sectionUnits: ccfx('section_size_unit'),
        sectionNumber: ccfx('section_number'),
        spatialEntity: ccfx('has_registration_location'),
        ontologyTerms: ccfx('has_ontology_term'),
        cellTypeTerms: ccfx('has_cell_type_term'),
        technology: ccfx('technology'),
        thumbnail: ccfx('thumbnail')
    };
    /** CCF specific ids. */
    var ccf = {
        x: ccfx,
        base: prefixer('base'),
        ontologyNode: {
            label: ccfx('ccf_pref_label'),
            parent: ccfx('ccf_part_of'),
            children: ccfx('ccf_part_of'),
            rui_rank: ccfx('rui_rank'),
            synonymLabels: tripleStoreUtils.DataFactory.namedNode('http://www.geneontology.org/formats/oboInOwl#hasExactSynonym')
        },
        asctb: {
            part_of: ccfx('ccf_part_of'),
            ct_is_a: ccfx('ccf_ct_isa'),
            located_in: ccfx('ccf_located_in'),
            characterizes: ccfx('ccf_characterizes')
        },
        spatial: {
            Female: prefixer('base')('VHFemale'),
            Male: prefixer('base')('VHMale'),
            BothSexes: prefixer('base')('VHBothSexes'),
            FemaleOrgans: prefixer('base')('VHFemaleOrgans'),
            MaleOrgans: prefixer('base')('VHMaleOrgans')
        },
        SpatialObjectReference: ccfx('spatial_object_reference'),
        SpatialEntity: ccfx('spatial_entity'),
        SpatialPlacement: ccfx('spatial_placement'),
        spatialObjectReference: {
            file: ccfx('file_url'),
            file_format: ccfx('file_format'),
            file_subpath: ccfx('file_subpath')
        },
        extractionSet: {
            label: prefixer('rdfs')('label'),
            rui_rank: ccfx('rui_rank')
        },
        spatialEntity: {
            label: prefixer('rdfs')('label'),
            description: prefixer('rdfs')('comment'),
            creator: prefixer('dcterms')('creator'),
            creator_first_name: ccfx('creator_first_name'),
            creator_last_name: ccfx('creator_last_name'),
            creator_orcid: ccfx('creator_orcid'),
            creation_date: prefixer('dcterms')('created'),
            updated_date: ccfx('updated_date'),
            ccf_annotations: ccfx('collides_with'),
            representation_of: ccfx('representation_of'),
            reference_organ: ccfx('has_reference_organ'),
            extraction_set_for: ccfx('extraction_set_for'),
            extraction_set: ccfx('has_extraction_set'),
            sex: ccfx('organ_owner_sex'),
            side: ccfx('organ_side'),
            rui_rank: ccfx('rui_rank'),
            slice_thickness: ccfx('slice_thickness'),
            slice_count: ccfx('slice_count'),
            x_dimension: ccfx('x_dimension'),
            y_dimension: ccfx('y_dimension'),
            z_dimension: ccfx('z_dimension'),
            dimension_units: ccfx('dimension_unit'),
            object: ccfx('has_object_reference')
        },
        spatialPlacement: {
            source: ccfx('placement_for'),
            target: ccfx('placement_relative_to'),
            placement_date: prefixer('dcterms')('created'),
            x_scaling: ccfx('x_scaling'),
            y_scaling: ccfx('y_scaling'),
            z_scaling: ccfx('z_scaling'),
            scaling_units: ccfx('scaling_unit'),
            x_rotation: ccfx('x_rotation'),
            y_rotation: ccfx('y_rotation'),
            z_rotation: ccfx('z_rotation'),
            w_rotation: ccfx('theta_rotation'),
            rotation_order: ccfx('rotation_order'),
            rotation_units: ccfx('rotation_unit'),
            x_translation: ccfx('x_translation'),
            y_translation: ccfx('y_translation'),
            z_translation: ccfx('z_translation'),
            translation_units: ccfx('translation_unit')
        }
    };
    /** Uberon specific ids. */
    var uberon = {
        x: prefixer('uberon'),
        body: prefixer('uberon')('0013702')
    };
    /** CL specific ids. */
    var cl = {
        x: prefixer('cl'),
        cell: prefixer('cl')('0000000')
    };
    /** FMA specific ids. */
    var fma = {
        x: prefixer('fma')
    };
    /** LMHA specific ids. */
    var lmha = {
        x: prefixer('lmha')
    };
    /** RUI accessors. */
    var rui = {
        body: uberon.body,
        cell: cl.cell,
        respiratory_system: uberon.x('0001004'),
        colon: uberon.x('0001155'),
        left_lung: uberon.x('0002168'),
        right_lung: uberon.x('0002167'),
        left_bronchus: uberon.x('0002178'),
        right_bronchus: uberon.x('0002177'),
        kidney: uberon.x('0002113'),
        ureter: uberon.x('0000056'),
        eye: uberon.x('0000970'),
        fallopian_tube: uberon.x('0003889'),
        knee: uberon.x('0001465'),
        ovary: uberon.x('0000992'),
        trachea: uberon.x('0003126'),
        aorta: uberon.x('0000947'),
        blood: uberon.x('0000178'),
        bone_marrow: uberon.x('0002371'),
        male_reproductive_system: uberon.x('0000079'),
        lymph_node: uberon.x('0000029'),
        // Derived using console.log(ALL_POSSIBLE_ORGANS.map(o => `  ${o.name.toLowerCase().replace(',', '').replace(/ /g, '_')}: ${o.id.split('/').slice(-1)[0].split('_')[0].toLowerCase()}.x('${o.id.split('_').slice(-1)[0]}'),`).join('\n'));
        blood_vasculature: uberon.x('0004537'),
        brain: uberon.x('0000955'),
        eye_left: uberon.x('0004548'),
        eye_right: fma.x('54449'),
        fallopian_tube_left: uberon.x('0001303'),
        fallopian_tube_right: uberon.x('0001302'),
        heart: uberon.x('0000948'),
        kidney_left: uberon.x('0004538'),
        kidney_right: uberon.x('0004539'),
        knee_left: fma.x('24978'),
        knee_right: fma.x('24977'),
        large_intestine: uberon.x('0000059'),
        liver: uberon.x('0002107'),
        lungs: uberon.x('0002048'),
        mesenteric_lymph_node: uberon.x('0002509'),
        ovary_left: fma.x('7214'),
        ovary_right: fma.x('7213'),
        pancreas: uberon.x('0001264'),
        pelvis: uberon.x('0001270'),
        prostate_gland: uberon.x('0002367'),
        skin: uberon.x('0002097'),
        small_intestine: uberon.x('0002108'),
        spleen: uberon.x('0002106'),
        thymus: uberon.x('0002370'),
        ureter_left: uberon.x('0001223'),
        ureter_right: uberon.x('0001222'),
        urinary_bladder: uberon.x('0001255'),
        uterus: uberon.x('0000995')
    };

    /**
     * Reverses the keys and values in a mapping.
     *
     * @param mapping The mapping to reverse.
     * @returns The reversed mapping.
     */
    function reverseMapping(mapping) {
        var newMapping = {};
        Object.entries(mapping).forEach(function (_a) {
            var _b = __read(_a, 2), prop = _b[0], predicate = _b[1];
            newMapping[predicate.id] = prop;
        });
        return newMapping;
    }
    /** A mapping of spatial objects. */
    var mappings = {
        spatialObjectReference: reverseMapping(ccf.spatialObjectReference),
        spatialEntity: reverseMapping(ccf.spatialEntity),
        spatialPlacement: reverseMapping(ccf.spatialPlacement)
    };
    /**
     * Creates a spatial object reference.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @returns The new reference.
     */
    function getSpatialObjectReference(store, iri) {
        return getMappedResult(store, iri, 'SpatialObjectReference', mappings.spatialObjectReference);
    }
    /**
     * Creates an extraction set data object.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @returns The new entity.
     */
    function getExtractionSet(store, iri) {
        var result = getMappedResult(store, iri, 'ExtractionSet', mappings.spatialEntity);
        result.extractionSites = lodash.sortBy(store.getSubjects(ccf.spatialEntity.extraction_set, iri, null)
            .map(function (value) { return getSpatialEntity(store, value.id); }), ['rui_rank']);
        return result;
    }
    /**
     * Gets extraction sets associated with a reference organ
     *
     * @param store The triple store.
     * @param iri The data identifier (the reference organ).
     * @returns A set of extraction sets associated with the reference organ
     */
    function getExtractionSets(store, iri) {
        return lodash.sortBy(store.getSubjects(ccf.spatialEntity.extraction_set_for, iri, null)
            .map(function (value) { return getExtractionSet(store, value.id); }), ['rui_rank']);
    }
    /**
     * Gets the anatomical structures associated with a reference organ.
     *
     * @param store The triple store.
     * @param iri The data identifier (reference organ).
     * @returns The new entity.
     */
    function getAnatomicalStructures(store, iri) {
        return lodash.sortBy(store.getSubjects(ccf.spatialEntity.reference_organ, iri, null)
            .map(function (value) { return getSpatialEntity(store, value.id); })
            .filter(function (e) { return e['@id'] !== iri; }), ['rui_rank']);
    }
    /**
     * Gets all reference organs in the triple store
     *
     * @param store The triple store.
     * @returns All the reference organs.
     */
    function getReferenceOrgans(store) {
        var results = [];
        store.forEach(function (quad) {
            if (quad.subject.id === quad.object.id) {
                results.push(getSpatialEntity(store, quad.subject.id));
            }
        }, null, ccf.spatialEntity.reference_organ, null, null);
        return lodash.sortBy(results, ['rui_rank']);
    }
    /**
     * Creates a spatial entity data object.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @returns The new entity.
     */
    function getSpatialEntity(store, iri) {
        var result = getMappedResult(store, iri, 'SpatialEntity', mappings.spatialEntity);
        // Default mapping will come back as an IRI which we can look up for the full object
        if (result.object) {
            result.object = getSpatialObjectReference(store, result.object);
        }
        if (result.ccf_annotations) {
            result.ccf_annotations = store.getObjects(iri, ccf.spatialEntity.ccf_annotations, null).map(function (o) { return o.id; });
        }
        store.forSubjects(function (subject) { return (result.entityId = subject.id); }, entity.spatialEntity, iri, null);
        return result;
    }
    /**
     * Creates a spatial placement object.
     *
     * @param store The triple store.
     * @param iri The data identifier.
     * @returns THe new placement object.
     */
    function getSpatialPlacement(store, iri) {
        var result = getMappedResult(store, iri, 'SpatialPlacement', mappings.spatialPlacement);
        // Default mapping will come back as an IRI for source/target which we can look up for the full object
        if (result.source) {
            result.source = getSpatialEntity(store, result.source);
        }
        if (result.target) {
            result.target = getSpatialEntity(store, result.target);
        }
        return result;
    }
    /**
     * Creates a spatial entity based on another entity in the store.
     *
     * @param store The triple store.
     * @param entityIRI The indentifier of the store entity.
     * @returns A new entity.
     */
    function getSpatialEntityForEntity(store, entityIRI) {
        var spatialEntityNodes = store.getObjects(tripleStoreUtils.DataFactory.namedNode(entityIRI), entity.spatialEntity, null);
        if (spatialEntityNodes.length > 0) {
            return getSpatialEntity(store, spatialEntityNodes[0].id);
        }
        else {
            return undefined;
        }
    }

    function applySpatialPlacement(tx, placement) {
        var p = placement;
        var factor;
        switch (p.translation_units) {
            case 'centimeter':
                factor = 1 / 100;
                break;
            case 'millimeter':
                factor = 1 / 1000;
                break;
            case 'meter':
            default:
                factor = 1;
                break;
        }
        var T = [p.x_translation, p.y_translation, p.z_translation].map(function (t) { return t * factor; });
        var R = [p.x_rotation, p.y_rotation, p.z_rotation].map(core.toRadians);
        var S = [p.x_scaling, p.y_scaling, p.z_scaling];
        return tx.translate(T).rotateXYZ(R).scale(S);
    }
    var CCFSpatialGraph = /** @class */ (function () {
        function CCFSpatialGraph(db) {
            this.db = db;
            this.createGraph();
        }
        CCFSpatialGraph.prototype.createGraph = function () {
            var e_1, _a, e_2, _b;
            var _this = this;
            this.graph = new graphology.DirectedGraph();
            var store = this.db.store;
            // Add all Spatial Object References
            store.forSubjects(function (subject) {
                _this.addNode(subject.id, 'SpatialObjectReference');
            }, rdf.type, ccf.SpatialObjectReference, null);
            // Add all Spatial Entities
            store.forSubjects(function (subject) {
                _this.addNode(subject.id, 'SpatialEntity');
            }, rdf.type, ccf.SpatialEntity, null);
            // Add all Spatial Placements
            var edgeSource = {};
            try {
                for (var _c = __values(tripleStoreUtils.readQuads(store, null, ccf.spatialPlacement.source, null, null)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var quad = _d.value;
                    edgeSource[quad.subject.id] = quad.object.id;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _e = __values(tripleStoreUtils.readQuads(store, null, ccf.spatialPlacement.target, null, null)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var quad = _f.value;
                    var source = edgeSource[quad.subject.id];
                    if (source) {
                        this.addEdge(quad.subject.id, source, quad.object.id, 'SpatialPlacement');
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        CCFSpatialGraph.prototype.addNode = function (id, type) {
            this.graph.mergeNode(id, { type: type });
        };
        CCFSpatialGraph.prototype.addEdge = function (id, source, target, type) {
            this.graph.mergeDirectedEdge(source, target, { type: type, id: id });
        };
        CCFSpatialGraph.prototype.getTransformationMatrix = function (sourceIRI, targetIRI) {
            var e_3, _a;
            if (sourceIRI === targetIRI) {
                return new core.Matrix4(core.Matrix4.IDENTITY); // identity
            }
            if (!this.graph.hasNode(sourceIRI) || !this.graph.hasNode(targetIRI)) {
                return undefined;
            }
            var store = this.db.store;
            var tx = new core.Matrix4(core.Matrix4.IDENTITY);
            var path = shortestPath__default['default'](this.graph, sourceIRI, targetIRI);
            if (path && path.length > 0) {
                path.reverse();
                var target = '';
                try {
                    for (var path_1 = __values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                        var source = path_1_1.value;
                        if (target) {
                            var placementId = this.graph.getEdgeAttribute(source, target, 'id');
                            var placement = getSpatialPlacement(store, placementId);
                            applySpatialPlacement(tx, placement);
                        }
                        target = source;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return tx;
            }
            else {
                return undefined;
            }
        };
        CCFSpatialGraph.prototype.getSpatialPlacement = function (source, targetIri) {
            var sourceIri = this.graph.hasNode(source['@id']) ? source['@id'] : undefined;
            var placement = lodash.get(source, 'placement[0]', lodash.get(source, 'placement', undefined));
            var matrix;
            if (placement && this.graph.hasNode(placement.target)) {
                matrix = this.getTransformationMatrix(placement.target, targetIri);
                if (matrix) {
                    matrix = applySpatialPlacement(matrix, placement);
                }
            }
            else if (sourceIri) {
                matrix = this.getTransformationMatrix(sourceIri, targetIri);
            }
            if (matrix) {
                var euler = new core.Euler().fromRotationMatrix(matrix, core.Euler.XYZ);
                var T = matrix.getTranslation().map(function (n) { return n * 1000; });
                var R = euler.toVector3().map(core.toDegrees);
                var S = matrix.getScale().map(function (n) { return n < 1 && n > 0.999999 ? 1 : n; });
                return {
                    '@context': 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld',
                    '@id': "http://purl.org/ccf/1.5/" + uuid.v4() + "_placement",
                    '@type': 'SpatialPlacement',
                    source: source['@id'],
                    target: targetIri,
                    placement_date: new Date().toISOString().split('T')[0],
                    x_scaling: S[0],
                    y_scaling: S[1],
                    z_scaling: S[2],
                    scaling_units: 'ratio',
                    x_rotation: R[0],
                    y_rotation: R[1],
                    z_rotation: R[2],
                    rotation_order: 'XYZ',
                    rotation_units: 'degree',
                    x_translation: T[0],
                    y_translation: T[1],
                    z_translation: T[2],
                    translation_units: 'millimeter'
                };
            }
            else {
                return undefined;
            }
        };
        return CCFSpatialGraph;
    }());

    var CCFSpatialScene = /** @class */ (function () {
        function CCFSpatialScene(db) {
            this.db = db;
        }
        CCFSpatialScene.prototype.getSpatialEntity = function (iri) {
            return getSpatialEntity(this.db.store, iri);
        };
        CCFSpatialScene.prototype.getExtractionSets = function (iri) {
            return getExtractionSets(this.db.store, iri);
        };
        CCFSpatialScene.prototype.getExtractionSet = function (iri) {
            return getExtractionSet(this.db.store, iri);
        };
        CCFSpatialScene.prototype.getAnatomicalStructures = function (iri) {
            return getAnatomicalStructures(this.db.store, iri);
        };
        CCFSpatialScene.prototype.getReferenceOrgans = function () {
            return getReferenceOrgans(this.db.store);
        };
        CCFSpatialScene.prototype.getReferenceBody = function (filter) {
            var bodyId;
            switch (filter === null || filter === void 0 ? void 0 : filter.sex) {
                case 'Male':
                    bodyId = ccf.spatial.Male.id;
                    break;
                case 'Female':
                    bodyId = ccf.spatial.Female.id;
                    break;
                case 'Both':
                default:
                    bodyId = ccf.spatial.BothSexes.id;
                    break;
            }
            return this.getSpatialEntity(bodyId);
        };
        CCFSpatialScene.prototype.getReferenceOrganSets = function (filter) {
            var _this = this;
            var organSet = this.getReferenceOrgans();
            switch (filter === null || filter === void 0 ? void 0 : filter.sex) {
                case 'Male':
                    organSet = organSet.filter(function (s) { return s.sex === 'Male'; });
                    break;
                case 'Female':
                    organSet = organSet.filter(function (s) { return s.sex === 'Female'; });
                    break;
                case 'Both':
                default:
                    break;
            }
            if (filter === null || filter === void 0 ? void 0 : filter.debug) {
                organSet = organSet.map(function (o) { return [[o], _this.getAnatomicalStructures(o['@id'])]; })
                    .reduce(function (acc, _e) {
                    var _f = __read(_e, 2), organ = _f[0], structures = _f[1];
                    return acc.concat(structures.length > 0 ? structures : organ);
                }, []);
            }
            return organSet;
        };
        CCFSpatialScene.prototype.getReferenceSceneNodes = function (filter) {
            var _this = this;
            var body = this.getReferenceBody(filter);
            var skinNodes = [];
            var nodes = __spreadArray([], __read(this.getReferenceOrganSets(filter).map(function (organ) {
                var isSkin = organ.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
                var sceneNode = _this.getSceneNode(organ, body, {
                    color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr', zoomBasedOpacity: !isSkin
                });
                if (isSkin && sceneNode) {
                    skinNodes.push(sceneNode);
                    return undefined;
                }
                else {
                    return sceneNode;
                }
            })));
            if (skinNodes.length > 0) {
                nodes = __spreadArray(__spreadArray([], __read(skinNodes)), __read(nodes));
            }
            if (filter === null || filter === void 0 ? void 0 : filter.debug) {
                // Debug bounding boxes
                nodes = nodes.concat([
                    this.getSceneNode(this.getSpatialEntity(ccf.base('VHRightKidney').id), body, { color: [0, 0, 255, 0.5 * 255], geometry: 'wireframe' }),
                    this.getSceneNode(this.getSpatialEntity(ccf.base('VHLeftKidney').id), body, { color: [255, 0, 0, 0.5 * 255], geometry: 'wireframe' }),
                    this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC1').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' }),
                    this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC2').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' }),
                    this.getSceneNode(this.getSpatialEntity(ccf.base('VHSpleenCC3').id), body, { color: [0, 255, 0, 0.5 * 255], geometry: 'wireframe' })
                ]);
            }
            return nodes.filter(function (s) { return s !== undefined; });
        };
        CCFSpatialScene.prototype.getReferenceOrganScene = function (organIri, filter) {
            var _this = this;
            var _a, _b;
            var hasSexFilter = (filter === null || filter === void 0 ? void 0 : filter.sex) !== undefined && ((_a = filter === null || filter === void 0 ? void 0 : filter.sex) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'both';
            var organs = this.getReferenceOrgans().filter(function (o) { return o.representation_of === organIri && (!hasSexFilter || o.sex === (filter === null || filter === void 0 ? void 0 : filter.sex)); });
            if (organs.length > 0) {
                var organ_1 = organs[0];
                var isSkin = organ_1.representation_of === 'http://purl.obolibrary.org/obo/UBERON_0002097';
                var organNode = this.getSceneNode(organ_1, organ_1, {
                    color: [255, 255, 255, 255], opacity: isSkin ? 0.5 : 0.2, unpickable: true, _lighting: 'pbr'
                });
                var scene = ((_b = this.db.getSpatialEntities(filter)) !== null && _b !== void 0 ? _b : []).map(function (entity) { return _this.getSceneNode(entity, organ_1, { color: [255, 255, 255, 0.9 * 255] }); });
                return [organNode].concat(scene).filter(function (n) { return n !== undefined; });
            }
            else {
                return [];
            }
        };
        CCFSpatialScene.prototype.getEntitySceneNodes = function (filter) {
            var _this = this;
            var body = this.getReferenceBody(filter);
            return this.db.getSpatialEntities(filter).map(function (entity) { return _this.getSceneNode(entity, body, { color: [255, 255, 255, 0.9 * 255] }); }).filter(function (s) { return s !== undefined; });
        };
        CCFSpatialScene.prototype.getSceneNode = function (source, target, nodeAttrs) {
            if (nodeAttrs === void 0) { nodeAttrs = {}; }
            var _a, _b, _c, _d;
            var has3dObject = (_b = (_a = source === null || source === void 0 ? void 0 : source.object) === null || _a === void 0 ? void 0 : _a.file_format) === null || _b === void 0 ? void 0 : _b.startsWith('model/gltf');
            var sourceID = has3dObject && source.object ? source.object['@id'] : source['@id'];
            var transform = this.db.graph.getTransformationMatrix(sourceID, target['@id']);
            if (transform) {
                if (has3dObject) {
                    transform = new core.Matrix4(core.Matrix4.IDENTITY).rotateX(core.toRadians(90)).multiplyLeft(transform);
                }
                else {
                    // Scale visible bounding boxes to the desired dimensions
                    var factor_1;
                    switch (source.dimension_units) {
                        case 'centimeter':
                            factor_1 = 1 / 100;
                            break;
                        case 'millimeter':
                            factor_1 = 1 / 1000;
                            break;
                        case 'meter':
                        default:
                            factor_1 = 1;
                            break;
                    }
                    var scale = [source.x_dimension, source.y_dimension, source.z_dimension].map(function (dim) { return dim * factor_1 / 2; });
                    transform.scale(scale);
                }
                return Object.assign({ '@id': source['@id'], '@type': 'SpatialSceneNode', entityId: source.entityId, ccf_annotations: source.ccf_annotations, representation_of: source.representation_of, reference_organ: source.reference_organ, scenegraph: has3dObject ? (_c = source.object) === null || _c === void 0 ? void 0 : _c.file : undefined, scenegraphNode: has3dObject ? (_d = source.object) === null || _d === void 0 ? void 0 : _d.file_subpath : undefined, transformMatrix: transform, tooltip: source.label }, nodeAttrs);
            }
            else {
                return undefined;
            }
        };
        CCFSpatialScene.prototype.getScene = function (filter) {
            return __spreadArray(__spreadArray([], __read(this.getReferenceSceneNodes(filter))), __read(this.getEntitySceneNodes(filter)));
        };
        return CCFSpatialScene;
    }());

    var HBM_PREFIX = 'https://entity.api.hubmapconsortium.org/entities/';
    // eslint-disable-next-line max-len
    var DR1_VU_THUMBS = new Set(['VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0009-LK-102-7-AF_preIMS_registered_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0009-LK-102-7-PAS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-AF_preIMS_registered_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0010-LK-155-40-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0013-LK-202-96-AF_preIMS_registered_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0013-LK-202-96-PAS_registered_thumbnail.jpg', 'VAN0013-LK-202-97-AF_preMxIF_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0013-LK-202-97-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0014-LK-203-108-AF_preIMS_registered_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0014-LK-203-108-PAS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-AF_preIMS_registered_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0016-LK-202-89-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-AF_preIMS_registered_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0003-LK-32-21-PAS_registered_thumbnail.jpg', 'VAN0003-LK-32-22-AF_preMxIF_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0003-LK-32-22-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0005-RK-1-1-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-1-1-PAS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-AF_preIMS_registered_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0005-RK-4-172-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-AF_preIMS_registered_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0006-LK-2-85-PAS_registered_thumbnail.jpg', 'VAN0006-LK-2-86-AF_preMxIF_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0006-LK-2-86-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0007-LK-203-103-AF_preIMS_registered_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0007-LK-203-103-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-AF_preIMS_registered_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0008-RK-403-100-PAS_registered_thumbnail.jpg', 'VAN0008-RK-403-101-AF_preMxIF_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0008-RK-403-101-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0011-RK-3-10-AF_preIMS_registered_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0011-RK-3-10-PAS_registered_thumbnail.jpg', 'VAN0011-RK-3-11-AF_preMxIF_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0011-RK-3-11-MxIF_cyc3_registered_thumbnail.jpg', 'VAN0012-RK-103-75-AF_preIMS_registered_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_NegMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-IMS_PosMode_multilayer_thumbnail.jpg', 'VAN0012-RK-103-75-PAS_registered_thumbnail.jpg', 'VAN0012-RK-103-76-AF_preMxIF_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc1_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc2_registered_thumbnail.jpg', 'VAN0012-RK-103-76-MxIF_cyc3_registered_thumbnail.jpg']);
    // eslint-disable-next-line max-len
    var UFL_THUMBS = { 'HBM558.SRZG.629': 'HBM558.SRZG.629_UFL0002-SP-3-4-1.jpg', 'HBM562.NTMH.548': 'HBM562.NTMH.548_UFL0006-SP-1-2-1.jpg', 'HBM685.KHRQ.684': 'HBM685.KHRQ.684_UFL0008-LY07-1-1.jpg', 'HBM278.SFQW.627': 'HBM278.SFQW.627_UFL0008-LY09-1-1.jpg', 'HBM427.SMGB.866': 'HBM427.SMGB.866_UFL0004-SP-1-4-1.jpg', 'HBM432.LLCF.677': 'HBM432.LLCF.677_UFL0001-SP-2-5-1.jpg', 'HBM586.ZSVS.996': 'HBM586.ZSVS.996_UFL0008-SP-1-1-1.jpg', 'HBM285.XMBT.542': 'HBM285.XMBT.542_UFL0006-TH-1-3-1.jpg', 'HBM289.BWJW.663': 'HBM289.BWJW.663_UFL0006-TH-1-2-1.jpg', 'HBM255.SRPR.985': 'HBM255.SRPR.985_UFL0005-TH-2-2-1.jpg', 'HBM799.WXHD.535': 'HBM799.WXHD.535_UFL0009-LY02-1-1.jpg', 'HBM294.RZFN.624': 'HBM294.RZFN.624_UFL0005-TH-1-1-1.jpg', 'HBM383.TRQG.424': 'HBM383.TRQG.424_UFL0006-SP-1-3-1.jpg', 'HBM647.MFQB.496': 'HBM647.MFQB.496_UFL0001-SP-1-2-1.jpg', 'HBM237.GGPR.739': 'HBM237.GGPR.739_UFL0006-LY01-1-1.jpg', 'HBM288.TPBD.654': 'HBM288.TPBD.654_UFL0003-SP-2-2-1.jpg', 'HBM974.NDXT.675': 'HBM974.NDXT.675_UFL0008-TH-2-2-1.jpg', 'HBM589.SLVV.423': 'HBM589.SLVV.423_UFL0008-LY10-1-1.jpg', 'HBM794.RLFN.358': 'HBM794.RLFN.358_UFL0006-LY03-1-1.jpg', 'HBM372.BQSR.778': 'HBM372.BQSR.778_UFL0007-SP-1-1-1.jpg', 'HBM499.TKDW.458': 'HBM499.TKDW.458_UFL0009-LY03-1-1.jpg', 'HBM342.PRQB.739': 'HBM342.PRQB.739_UFL0003-LY06-1-1.jpg', 'HBM633.CLVN.674': 'HBM633.CLVN.674_UFL0003-SP-3-6-1.jpg', 'HBM343.JQKM.578': 'HBM343.JQKM.578_UFL0009-LY01-1-1.jpg', 'HBM987.XGTH.368': 'HBM987.XGTH.368_UFL0002-SP-2-4-1.jpg', 'HBM964.CWCP.788': 'HBM964.CWCP.788_UFL0006-LY02-2-1.jpg', 'HBM244.TJLK.223': 'HBM244.TJLK.223_UFL0003-SP-1-4-1.jpg', 'HBM646.FSBQ.966': 'HBM646.FSBQ.966_UFL0007-SP-2-2-1.jpg', 'HBM572.GXSB.234': 'HBM572.GXSB.234_UFL0003-SP-3-2-1.jpg', 'HBM772.TKGJ.794': 'HBM772.TKGJ.794_UFL0008-SP-2-1-1.jpg', 'HBM239.CBWR.263': 'HBM239.CBWR.263_UFL0008-SP-1-2-1.jpg', 'HBM992.NRTT.383': 'HBM992.NRTT.383_UFL0006-SP-1-1-1.jpg', 'HBM283.DQXD.546': 'HBM283.DQXD.546_UFL0003-SP-1-2-1.jpg', 'HBM795.JHND.856': 'HBM795.JHND.856_UFL0007-SP-1-2-1.jpg', 'HBM267.BZKT.867': 'HBM267.BZKT.867_UFL0003-SP-2-6-1.jpg', 'HBM838.DLMJ.782': 'HBM838.DLMJ.782_UFL0008-TH-1-1-1.jpg', 'HBM337.FSXL.564': 'HBM337.FSXL.564_UFL0001-SP-3-8-2.jpg', 'HBM355.JDLK.244': 'HBM355.JDLK.244_UFL0004-SP-2-4-1.jpg', 'HBM599.PSZG.737': 'HBM599.PSZG.737_UFL0006-LY02-1-1.jpg' };
    /** UUID to TMC mapping. */
    var GROUP_UUID_MAPPING = {
        '03b3d854-ed44-11e8-8bce-0e368f3075e8': 'TMC-UCSD',
        '07a29e4c-ed43-11e8-b56a-0e8017bdda58': 'TMC-Florida',
        '308f5ffc-ed43-11e8-b56a-0e8017bdda58': 'TMC-CalTech',
        '5bd084c8-edc2-11e8-802f-0e368f3075e8': 'HBM-TestingGroup',
        '73bb26e4-ed43-11e8-8f19-0a7c1eab007a': 'TMC-Vanderbilt',
        'def5fd76-ed43-11e8-b56a-0e8017bdda58': 'TMC-Stanford',
        '5c106f29-ea2d-11e9-85e8-0efb3ba9a670': 'RTI-General Electric',
        '301615f9-c870-11eb-a8dc-35ce3d8786fe': 'TMC-UConn'
    };
    var ENTITY_CONTEXT = {
        '@base': 'http://purl.org/ccf/latest/ccf-entity.owl#',
        '@vocab': 'http://purl.org/ccf/latest/ccf-entity.owl#',
        ccf: 'http://purl.org/ccf/',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        label: 'rdfs:label',
        description: 'rdfs:comment',
        link: {
            '@id': 'rdfs:seeAlso',
            '@type': '@id'
        },
        samples: {
            '@reverse': 'has_donor'
        },
        sections: {
            '@id': 'has_tissue_section',
            '@type': '@id'
        },
        datasets: {
            '@id': 'has_dataset',
            '@type': '@id'
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        rui_location: {
            '@id': 'has_spatial_entity',
            '@type': '@id'
        },
        ontologyTerms: {
            '@id': 'has_ontology_term',
            '@type': '@id'
        },
        cellTypeTerms: {
            '@id': 'has_cell_type_term',
            '@type': '@id'
        },
        thumbnail: {
            '@id': 'has_thumbnail'
        }
    };
    /**
     * Converts a hubmap response object into JsonLd.
     *
     * @param data The hubmap data.
     * @returns The converted data.
     */
    function hubmapResponseAsJsonLd(data, assetsApi, portalUrl, serviceToken, debug) {
        var e_1, _c;
        if (assetsApi === void 0) { assetsApi = ''; }
        if (portalUrl === void 0) { portalUrl = ''; }
        if (debug === void 0) { debug = false; }
        var entries = lodash.get(data, 'hits.hits', [])
            .map(function (e) { return lodash.get(e, '_source', {}); })
            .sort(function (a, b) { return a['uuid'].localeCompare(b['uuid']); });
        var donorLookup = {};
        var unflattened = entries.map(function (e) { return new HuBMAPTissueBlock(e, assetsApi, portalUrl, serviceToken).toJsonLd(); });
        try {
            for (var unflattened_1 = __values(unflattened), unflattened_1_1 = unflattened_1.next(); !unflattened_1_1.done; unflattened_1_1 = unflattened_1.next()) {
                var donor = unflattened_1_1.value;
                var donorId = donor['@id'];
                if (!donorLookup[donorId]) {
                    donorLookup[donorId] = donor;
                }
                else {
                    var samples = donorLookup[donorId].samples;
                    samples.push(donor.samples[0]);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (unflattened_1_1 && !unflattened_1_1.done && (_c = unflattened_1.return)) _c.call(unflattened_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var donors = Object.values(donorLookup);
        if (debug) {
            debugDonors(donors);
            console.log(donors.map(function (d) { return (Object.assign({ '@context': ENTITY_CONTEXT }, d)); }));
        }
        return { '@context': ENTITY_CONTEXT, '@graph': donors };
    }
    function debugDonors(donors) {
        var e_2, _c;
        var datasets = [];
        var deleted = 0;
        try {
            for (var _d = __values(donors.filter(function (d) { return d.samples.length > 1; })), _e = _d.next(); !_e.done; _e = _d.next()) {
                var donor = _e.value;
                var samples = donor.samples;
                var _loop_1 = function (i) {
                    var e_3, _f;
                    var blockId = samples[i]['@id'];
                    datasets = datasets.concat(samples[i].datasets);
                    try {
                        for (var _g = (e_3 = void 0, __values(samples[i].sections)), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var section = _h.value;
                            datasets = datasets.concat(section.datasets);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_f = _g.return)) _f.call(_g);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    for (var j = i + 1; j < samples.length; j++) {
                        var sections = samples[j].sections;
                        if (sections.find(function (s) { return s['@id'] === blockId; })) {
                            samples[i].deleteMe = true;
                            deleted++;
                        }
                    }
                };
                for (var i = 0; i < samples.length; i++) {
                    _loop_1(i);
                }
                donor.samples = samples.filter(function (s) { return s.deleteMe !== true; });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (deleted > 0) {
            console.log("\u26A0 " + deleted + " sections identified as blocks");
        }
    }
    var HuBMAPTissueBlock = /** @class */ (function () {
        function HuBMAPTissueBlock(data, assetsApi, portalUrl, serviceToken) {
            var e_4, _c, e_5, _d;
            if (assetsApi === void 0) { assetsApi = ''; }
            if (portalUrl === void 0) { portalUrl = ''; }
            var _a, _b;
            this.data = data;
            this.bad = false;
            this['@type'] = 'Sample';
            this.sample_type = 'Tissue Block';
            var entityType = this.data.entity_type;
            if (entityType !== 'Sample') {
                this.bad = true;
                return;
            }
            var ancestors = (this.data.ancestors || []);
            var descendants = (this.data.descendants || []);
            var donor = ancestors.find(function (e) { return e.entity_type === 'Donor'; });
            this.donor = this.getDonor(donor, portalUrl);
            var ruiLocation = this.getRuiLocation(data, this.donor);
            if (!ruiLocation) {
                this.bad = true;
            }
            else {
                this.rui_location = ruiLocation;
            }
            if (!GROUP_UUID_MAPPING[data.group_uuid]) {
                GROUP_UUID_MAPPING[data.group_uuid] = data.group_name;
            }
            var dateEntered = new Date(data.last_modified_timestamp).toLocaleDateString();
            var groupName = GROUP_UUID_MAPPING[data.group_uuid] || data.group_name;
            var creator = data.created_by_user_displayname;
            this['@id'] = HBM_PREFIX + data.uuid;
            this.label = "Registered " + dateEntered + ", " + creator + ", " + groupName;
            this.link = portalUrl + "browse/sample/" + data.uuid;
            var sectionLookup = {};
            var sections = [];
            this.sections = sections;
            var datasets = [];
            this.datasets = datasets;
            try {
                for (var _e = __values(descendants.filter(function (d) { return d.entity_type === 'Sample'; })), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var descendant = _f.value;
                    var section = this.getSection(descendant, data, portalUrl);
                    var sectionId = descendant.submission_id;
                    sectionLookup[sectionId] = section;
                    sections.push(section);
                    section.section_number = (_a = section.section_number) !== null && _a !== void 0 ? _a : sections.length;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
            try {
                for (var descendants_1 = __values(descendants), descendants_1_1 = descendants_1.next(); !descendants_1_1.done; descendants_1_1 = descendants_1.next()) {
                    var descendant = descendants_1_1.value;
                    if (descendant.entity_type === 'Dataset') {
                        var dataset = this.getDataset(descendant, assetsApi, portalUrl, serviceToken);
                        var sectionId = lodash.get(descendant, ['ingest_metadata', 'metadata', 'tissue_id']);
                        if (sectionLookup[sectionId]) {
                            (_b = sectionLookup[sectionId].datasets) === null || _b === void 0 ? void 0 : _b.push(dataset);
                        }
                        else {
                            datasets.push(dataset);
                        }
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (descendants_1_1 && !descendants_1_1.done && (_d = descendants_1.return)) _d.call(descendants_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            var loc = ruiLocation !== null && ruiLocation !== void 0 ? ruiLocation : {};
            var dims = loc.x_dimension + " x " + loc.y_dimension + " x " + loc.z_dimension + " " + loc.dimension_units;
            this.section_count = loc.slice_count || sections.length;
            var sSize = parseFloat((loc.slice_thickness ||
                ((loc.z_dimension || 0) / Math.max(this.section_count, 1)))
                .toFixed(1));
            this.section_size = sSize;
            var sUnits = loc.dimension_units || 'millimeter';
            this.section_units = sUnits;
            this.description = dims + ", " + sSize + " " + sUnits + ", " + data.specimen_type + ", " + this.section_count + " Sections";
            sections.forEach(function (section, index) {
                section.description = loc.x_dimension + " x " + loc.y_dimension + " x " + sSize + " " + sUnits + ", " + sSize + " " + sUnits + ", " + section.description;
                section.section_number = index + 1;
            });
        }
        HuBMAPTissueBlock.prototype.getSection = function (section, data, portalUrl) {
            var dateEntered = new Date(section.last_modified_timestamp).toLocaleDateString();
            var groupName = GROUP_UUID_MAPPING[section.group_uuid] || section.group_name;
            var creator = section.created_by_user_displayname;
            return {
                '@id': HBM_PREFIX + section.uuid,
                '@type': 'Sample',
                label: "Registered " + dateEntered + ", " + creator + ", " + groupName,
                description: "" + data.specimen_type,
                link: portalUrl + "browse/sample/" + section.uuid,
                sample_type: 'Tissue Section',
                section_number: 1,
                samples: [],
                datasets: []
            };
        };
        HuBMAPTissueBlock.prototype.getDataset = function (dataset, assetsApi, portalUrl, serviceToken) {
            if (assetsApi === void 0) { assetsApi = ''; }
            if (portalUrl === void 0) { portalUrl = ''; }
            var _a;
            var dateEntered = new Date(dataset.last_modified_timestamp).toLocaleDateString();
            var groupName = GROUP_UUID_MAPPING[dataset.group_uuid] || dataset.group_name;
            var creator = dataset.created_by_user_displayname;
            var types = __spreadArray(__spreadArray([], __read(dataset.data_types)), [
                lodash.get(dataset, ['ingest_metadata', 'metadata', 'assay_type'], '')
            ]);
            var typesSearch = types.join('|').toLowerCase();
            var technology;
            var thumbnail = 'assets/icons/ico-unknown.svg';
            if (typesSearch.indexOf('10x') !== -1) {
                technology = '10x';
                thumbnail = 'assets/icons/ico-bulk-10x.svg';
            }
            else if (typesSearch.indexOf('af') !== -1) {
                technology = 'AF';
                thumbnail = 'assets/icons/ico-spatial-af.svg';
            }
            else if (typesSearch.indexOf('codex') !== -1) {
                technology = 'CODEX';
                thumbnail = 'assets/icons/ico-spatial-codex.svg';
            }
            else if (typesSearch.indexOf('imc') !== -1) {
                technology = 'IMC';
                thumbnail = 'assets/icons/ico-spatial-imc.svg';
            }
            else if ((typesSearch.indexOf('lc') !== -1) && (typesSearch.indexOf('af') === -1)) {
                technology = 'LC';
                thumbnail = 'assets/icons/ico-bulk-lc.svg';
            }
            else if (typesSearch.indexOf('maldi') !== -1) {
                technology = 'MALDI';
            }
            else if (typesSearch.indexOf('pas') !== -1) {
                technology = 'PAS';
            }
            else {
                technology = 'OTHER';
            }
            thumbnail = (_a = this.getDatasetThumbnail(dataset, assetsApi, serviceToken)) !== null && _a !== void 0 ? _a : thumbnail;
            return {
                '@id': HBM_PREFIX + dataset.uuid,
                '@type': 'Dataset',
                label: "Registered " + dateEntered + ", " + creator + ", " + groupName,
                description: "Data/Assay Types: " + types.join(', '),
                link: portalUrl + "browse/dataset/" + dataset.uuid,
                technology: technology,
                thumbnail: thumbnail
            };
        };
        HuBMAPTissueBlock.prototype.getDatasetThumbnail = function (dataset, assetsApi, serviceToken) {
            if (dataset.thumbnail_file) {
                var thumbnailFile = dataset.thumbnail_file;
                return assetsApi + "/" + thumbnailFile.file_uuid + "/" + thumbnailFile.filename + (serviceToken ? "?token=" + serviceToken : '');
            }
            else if (dataset.group_uuid === '73bb26e4-ed43-11e8-8f19-0a7c1eab007a') { // TMC-Vanderbilt
                var tiffs = lodash.get(dataset, 'metadata.files', [])
                    .filter(function (f) { return /\.(ome\.tif|ome\.tiff)$/.test(f.rel_path); })
                    .filter(function (f) { return !/(multilayer\.ome\.tif|_ac\.ome\.tif)/.test(f.rel_path); })
                    .filter(function (f) { return DR1_VU_THUMBS.has(f.rel_path.split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg')); })
                    .map(function (f) { return assetsApi + "/" + dataset.uuid + "/" + f.rel_path + (serviceToken ? "?token=" + serviceToken : ''); });
                if (tiffs.length > 0) {
                    var thumb = tiffs[0].split('/').slice(-1)[0].split('?')[0].replace('.ome.tif', '_thumbnail.jpg');
                    if (DR1_VU_THUMBS.has(thumb)) {
                        return "assets/thumbnails/TMC-Vanderbilt/DR1/" + thumb;
                    }
                }
            }
            else if (dataset.group_uuid === '07a29e4c-ed43-11e8-b56a-0e8017bdda58') { // TMC-Florida
                var thumb = UFL_THUMBS[dataset.hubmap_id];
                if (thumb) {
                    return "assets/thumbnails/TMC-Florida/" + thumb;
                }
            }
            return undefined;
        };
        HuBMAPTissueBlock.prototype.getDonor = function (donor, portalUrl) {
            var e_6, _c;
            var donorDescription = (donor.description || '').toLowerCase();
            var sex;
            if (donorDescription.includes('female')) {
                sex = 'Female';
            }
            else if (donorDescription.includes('male')) {
                sex = 'Male';
            }
            var ageMatch = donorDescription.match(/age ([0-9]+)/);
            var age;
            if (ageMatch) {
                age = lodash.toNumber(ageMatch[1]);
            }
            var bmi;
            try {
                for (var _d = __values(lodash.get(donor, 'metadata.organ_donor_data', lodash.get(donor, 'metadata.living_donor_data', []))), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var md = _e.value;
                    if (md.preferred_term === 'Feminine gender' || md.preferred_term === 'Female') {
                        sex = 'Female';
                    }
                    else if (md.preferred_term === 'Masculine gender' || md.preferred_term === 'Male') {
                        sex = 'Male';
                    }
                    else if (md.preferred_term === 'Current chronological age' || md.preferred_term === 'Age') {
                        age = lodash.toNumber(md.data_value);
                    }
                    else if (md.preferred_term === 'Body mass index') {
                        bmi = lodash.toNumber(md.data_value);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_6) throw e_6.error; }
            }
            var label = '';
            if (sex && age) {
                label += sex + ", Age " + age;
                if (bmi) {
                    label += ", BMI " + bmi.toFixed(1);
                }
            }
            var dateEntered = new Date(donor.last_modified_timestamp).toLocaleDateString();
            var groupName = GROUP_UUID_MAPPING[donor.group_uuid] || donor.group_name;
            var creator = donor.created_by_user_displayname;
            return {
                '@id': HBM_PREFIX + donor.uuid,
                '@type': 'Donor',
                label: label,
                description: "Entered " + dateEntered + ", " + creator + ", " + groupName,
                link: portalUrl + "browse/donor/" + donor.uuid,
                age: age,
                sex: sex,
                bmi: bmi,
                consortium_name: 'HuBMAP',
                provider_name: groupName,
                provider_uuid: donor.group_uuid,
                samples: []
            };
        };
        HuBMAPTissueBlock.prototype.getRuiLocation = function (data, donor) {
            var _a;
            var spatialEntity;
            var ruiLocation = data.rui_location;
            if (ruiLocation) {
                // RUI Location may come in as an unparsed string
                if (typeof ruiLocation === 'string') {
                    ruiLocation = JSON.parse(ruiLocation);
                }
                if (ruiLocation.alignment_id) { // Detect RUI 0.5 generated JSON
                    console.log('Detected a deprecated rui_location', data.uuid);
                }
                else if (ruiLocation['@id']) { // Detect RUI 1.0+ generated JSON-LD
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    spatialEntity = ruiLocation;
                }
            }
            if (spatialEntity) {
                // Patch to fix RUI 0.5 Kidney and Spleen Placements
                var target = (_a = lodash.get(spatialEntity, ['placement', 'target'])) !== null && _a !== void 0 ? _a : '';
                if (target.startsWith('http://purl.org/ccf/latest/ccf.owl#VHSpleenCC')) {
                    if (donor.sex === 'Male') {
                        lodash.set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHMSpleenCC'));
                    }
                    else {
                        lodash.set(spatialEntity, ['placement', 'target'], target.replace('#VHSpleenCC', '#VHFSpleenCC'));
                    }
                }
                else if (target === 'http://purl.org/ccf/latest/ccf.owl#VHLeftKidney' || target === 'http://purl.org/ccf/latest/ccf.owl#VHRightKidney') {
                    if (donor.sex === 'Male') {
                        lodash.set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHM') + '_Patch');
                    }
                    else {
                        lodash.set(spatialEntity, ['placement', 'target'], target.replace('#VH', '#VHF') + '_Patch');
                    }
                }
            }
            return spatialEntity;
        };
        HuBMAPTissueBlock.prototype.getTissueBlock = function () {
            return lodash.omit(Object.assign({}, this), ['data', 'bad', 'donor']);
        };
        HuBMAPTissueBlock.prototype.toJsonLd = function () {
            return Object.assign(Object.assign({}, this.donor), { samples: [this.getTissueBlock()] });
        };
        return HuBMAPTissueBlock;
    }());

    // Reduce this value if including more data fields
    var PER_API_SEARCH_REQUEST_COUNT = 250;
    var INCLUDED_DATA_FIELDS = [
        'uuid', 'entity_type',
        'group_uuid', 'group_name',
        'last_modified_timestamp', 'created_by_user_displayname',
        'ancestors.entity_type',
        'ancestors.description',
        'ancestors.metadata.organ_donor_data.preferred_term',
        'ancestors.metadata.organ_donor_data.data_value',
        'ancestors.metadata.living_donor_data.preferred_term',
        'ancestors.metadata.living_donor_data.data_value',
        'ancestors.last_modified_timestamp',
        'ancestors.group_uuid',
        'ancestors.group_name',
        'ancestors.created_by_user_displayname',
        'ancestors.uuid',
        'descendants.entity_type',
        'descendants.ingest_metadata.metadata.tissue_id',
        'descendants.last_modified_timestamp',
        'descendants.group_uuid',
        'descendants.group_name',
        'descendants.created_by_user_displayname',
        'descendants.uuid',
        'descendants.data_types',
        'descendants.ingest_metadata.metadata.assay_type',
        'descendants.thumbnail_file',
        'descendants.metadata.files.rel_path',
        'rui_location', 'specimen_type'
    ];
    var DEFAULT_API_SEARCH_QUERY = {
        exists: {
            field: 'rui_location'
        }
    };
    function getApiSearchHeaders(token) {
        var headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (token) {
            headers.append('Authorization', "Bearer " + token);
        }
        return headers;
    }
    function getApiSearchBody(from, size, query) {
        var bodyObj = {
            version: true,
            from: from,
            size: size,
            stored_fields: ['*'],
            script_fields: {},
            docvalue_fields: [],
            query: query !== null && query !== void 0 ? query : DEFAULT_API_SEARCH_QUERY,
            _source: {
                includes: INCLUDED_DATA_FIELDS
            }
        };
        return JSON.stringify(bodyObj);
    }
    function doSearchRequest(url, init) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, _error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch(url, init)];
                    case 1:
                        res = _b.sent();
                        if (!res.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.json()];
                    case 2:
                        _a = (_b.sent());
                        return [3 /*break*/, 4];
                    case 3:
                        _a = undefined;
                        _b.label = 4;
                    case 4: return [2 /*return*/, _a];
                    case 5:
                        _error_1 = _b.sent();
                        return [2 /*return*/, undefined];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function doApiSearch(url, token, query) {
        return __awaiter(this, void 0, void 0, function () {
            var perReqCount, headers, body, firstResult, totalCount, requests, from, results, items;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        perReqCount = PER_API_SEARCH_REQUEST_COUNT;
                        headers = getApiSearchHeaders(token);
                        body = getApiSearchBody(0, perReqCount, query);
                        return [4 /*yield*/, doSearchRequest(url, { method: 'POST', headers: headers, body: body })];
                    case 1:
                        firstResult = _b.sent();
                        if (!firstResult) {
                            return [2 /*return*/, undefined];
                        }
                        totalCount = firstResult.hits.total.value;
                        if (totalCount <= perReqCount) {
                            return [2 /*return*/, firstResult];
                        }
                        requests = [];
                        for (from = perReqCount; from < totalCount; from += perReqCount) {
                            requests.push(doSearchRequest(url, {
                                method: 'POST',
                                headers: headers,
                                body: getApiSearchBody(from, perReqCount, query)
                            }));
                        }
                        return [4 /*yield*/, Promise.all(requests)];
                    case 2:
                        results = _b.sent();
                        if (results.some(function (res) { return !res; })) {
                            return [2 /*return*/, undefined];
                        }
                        items = results.map(function (res) { return res.hits.hits; });
                        return [2 /*return*/, Object.assign(Object.assign({}, firstResult), { hits: Object.assign(Object.assign({}, firstResult.hits), { hits: (_a = firstResult.hits.hits).concat.apply(_a, __spreadArray([], __read(items))) }) })];
                }
            });
        });
    }
    /**
     * Search the HuBMAP Search API and return CCF-compatible JSON-LD data
     *
     * @param dataUrl the search API url
     * @param serviceType 'static' if a statically saved response or 'search-api' if querying the search-api live
     * @param query the elastic search query to use
     * @param serviceToken the api key to the search-api
     * @param assetsApi the assets api endpoint
     * @param portalUrl the portal url to point to
     * @returns CCF-compatible JSON-LD data or undefined on error
     */
    function searchHubmap(dataUrl, serviceType, query, serviceToken, assetsApi, portalUrl) {
        if (assetsApi === void 0) { assetsApi = ''; }
        if (portalUrl === void 0) { portalUrl = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var hubmapData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(serviceType === 'static')) return [3 /*break*/, 2];
                        return [4 /*yield*/, doSearchRequest(dataUrl)];
                    case 1:
                        hubmapData = _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(serviceType === 'search-api')) return [3 /*break*/, 4];
                        return [4 /*yield*/, doApiSearch(dataUrl, serviceToken, query)];
                    case 3:
                        hubmapData = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (hubmapData) {
                            return [2 /*return*/, hubmapResponseAsJsonLd(hubmapData, assetsApi, portalUrl, serviceToken)];
                        }
                        else {
                            console.warn("Unable to load " + dataUrl + " as HuBMAP Data");
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    /**
     * Adds hubmap data from a url to the triple store.
     *
     * @param store The triple store.
     * @param dataUrl The data url.
     * @param serviceType The service type.
     */
    function addHubmapDataToStore(store, dataUrl, serviceType, serviceToken, assetsApi, portalUrl) {
        if (assetsApi === void 0) { assetsApi = ''; }
        if (portalUrl === void 0) { portalUrl = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var hubmapData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, searchHubmap(dataUrl, serviceType, undefined, serviceToken, assetsApi, portalUrl)];
                    case 1:
                        hubmapData = _a.sent();
                        if (!hubmapData) return [3 /*break*/, 3];
                        return [4 /*yield*/, tripleStoreUtils.addJsonLdToStore(hubmapData, store)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    function getObjects(store, ids, predicate) {
        var e_1, _a, e_2, _b;
        var objects = new Set();
        try {
            for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
                var id = ids_1_1.value;
                try {
                    for (var _c = (e_2 = void 0, __values(tripleStoreUtils.readQuads(store, id, predicate, null, null))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var quad = _d.value;
                        objects.add(quad.object.id);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (ids_1_1 && !ids_1_1.done && (_a = ids_1.return)) _a.call(ids_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return objects;
    }
    /**
     * Computes aggregate results.
     *
     * @param ids Ids of objects to calculate aggregate over.
     * @param store The triple store.
     * @returns The list of aggregate results.
     */
    function getAggregateResults(ids, store) {
        var e_3, _a, e_4, _b;
        var donors = getObjects(store, ids, entity.donor.id);
        var centers = getObjects(store, donors, entity.providerUUID.id);
        var tissueBlocks = new Set();
        try {
            for (var ids_2 = __values(ids), ids_2_1 = ids_2.next(); !ids_2_1.done; ids_2_1 = ids_2.next()) {
                var id = ids_2_1.value;
                try {
                    for (var _c = (e_4 = void 0, __values(tripleStoreUtils.readQuads(store, id, entity.spatialEntity, null, null))), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var quad = _d.value;
                        tissueBlocks.add(quad.subject.id);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) _a.call(ids_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var tissueSections = getObjects(store, tissueBlocks, entity.sections.id);
        var tissueDatasets = new Set(__spreadArray(__spreadArray([], __read(getObjects(store, tissueBlocks, entity.datasets.id))), __read(getObjects(store, tissueSections, entity.datasets.id))));
        var results = {
            'Tissue Data Providers': centers.size,
            Donors: donors.size,
            'Tissue Blocks': tissueBlocks.size,
            'Tissue Sections': tissueSections.size,
            'Tissue Datasets': tissueDatasets.size
        };
        return Object.entries(results).map(function (_a) {
            var _b = __read(_a, 2), label = _b[0], count = _b[1];
            return ({ label: label, count: count });
        });
    }
    /**
     * Get a list of technology names used by datasets
     *
     * @param store The triple store.
     * @returns list of unique technology names in the data
     */
    function getDatasetTechnologyNames(store) {
        var e_5, _a;
        var names = new Set();
        try {
            for (var _b = __values(tripleStoreUtils.readQuads(store, null, entity.technology, null, null)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var quad = _c.value;
                names.add(quad.object.value);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return Array.from(names).sort();
    }
    /**
     * Get a list of provider names from the database
     *
     * @param store The triple store.
     * @returns list of unique provider names in the data
     */
    function getProviderNames(store) {
        var e_6, _a;
        var names = new Set();
        try {
            for (var _b = __values(tripleStoreUtils.readQuads(store, null, entity.providerName, null, null)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var quad = _c.value;
                names.add(quad.object.value);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return Array.from(names).sort();
    }

    var _a$1;
    var spatialEntityDimensions = (_a$1 = {},
        _a$1[ccf.spatialEntity.x_dimension.id] = 'x',
        _a$1[ccf.spatialEntity.y_dimension.id] = 'y',
        _a$1[ccf.spatialEntity.z_dimension.id] = 'z',
        _a$1);
    function getSpatialEntityDimensions(store, iri) {
        var dims = getMappedResult(store, iri, 'Dimensions', spatialEntityDimensions);
        return [dims.x, dims.y, dims.z];
    }
    function getOrientedBoundingBox(store, graph, sourceIri, targetIri) {
        var matrix = graph.getTransformationMatrix(sourceIri, targetIri);
        var result = undefined;
        if (matrix) {
            var center = matrix.getTranslation();
            var halfSize = getSpatialEntityDimensions(store, sourceIri).map(function (n) { return n / 1000 / 2; });
            var quaternion = new core.Euler().fromRotationMatrix(matrix, core.Euler.XYZ).toQuaternion().normalize().calculateW();
            result = new culling.OrientedBoundingBox().fromCenterHalfSizeQuaternion(center, halfSize, quaternion);
        }
        return result;
    }
    function filterByProbingSphere(store, graph, seen, search) {
        var e_1, _a;
        var x = search.x, y = search.y, z = search.z, radius = search.radius, target = search.target;
        var newSeen = new Set();
        var radiusSquared = (radius / 1000) * (radius / 1000);
        try {
            for (var seen_1 = __values(seen), seen_1_1 = seen_1.next(); !seen_1_1.done; seen_1_1 = seen_1.next()) {
                var sourceIri = seen_1_1.value;
                var boundingBox = getOrientedBoundingBox(store, graph, sourceIri, target);
                if (boundingBox) {
                    var distanceSquared = boundingBox.distanceSquaredTo([x, y, z].map(function (n) { return n / 1000; }));
                    if (distanceSquared <= radiusSquared) {
                        newSeen.add(sourceIri);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (seen_1_1 && !seen_1_1.done && (_a = seen_1.return)) _a.call(seen_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newSeen;
    }

    function filterWithDonor(store, seen, callback) {
        var e_1, _h, e_2, _j, e_3, _k, e_4, _l;
        var _a, _b;
        var donor2entity = new Map();
        var donors = new Set();
        try {
            for (var seen_1 = __values(seen), seen_1_1 = seen_1.next(); !seen_1_1.done; seen_1_1 = seen_1.next()) {
                var subject = seen_1_1.value;
                try {
                    for (var _m = (e_2 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.donor, null, null))), _o = _m.next(); !_o.done; _o = _m.next()) {
                        var quad = _o.value;
                        donors.add(quad.object.id);
                        if (!donor2entity.has(quad.object.id)) {
                            donor2entity.set(quad.object.id, [subject]);
                        }
                        else {
                            (_a = donor2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_o && !_o.done && (_j = _m.return)) _j.call(_m);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (seen_1_1 && !seen_1_1.done && (_h = seen_1.return)) _h.call(seen_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var newDonors = callback(donors);
        var newSeen = new Set();
        try {
            for (var newDonors_1 = __values(newDonors), newDonors_1_1 = newDonors_1.next(); !newDonors_1_1.done; newDonors_1_1 = newDonors_1.next()) {
                var d = newDonors_1_1.value;
                try {
                    for (var _p = (e_4 = void 0, __values((_b = donor2entity.get(d)) !== null && _b !== void 0 ? _b : [])), _q = _p.next(); !_q.done; _q = _p.next()) {
                        var s = _q.value;
                        newSeen.add(s);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_q && !_q.done && (_l = _p.return)) _l.call(_p);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (newDonors_1_1 && !newDonors_1_1.done && (_k = newDonors_1.return)) _k.call(newDonors_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return newSeen;
    }
    function filterWithSpatialEntity(store, seen, callback) {
        var e_5, _h, e_6, _j, e_7, _k, e_8, _l;
        var _a, _b;
        var spatial2entity = new Map();
        var entities = new Set();
        try {
            for (var seen_2 = __values(seen), seen_2_1 = seen_2.next(); !seen_2_1.done; seen_2_1 = seen_2.next()) {
                var subject = seen_2_1.value;
                try {
                    for (var _m = (e_6 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.spatialEntity, null, null))), _o = _m.next(); !_o.done; _o = _m.next()) {
                        var quad = _o.value;
                        entities.add(quad.object.id);
                        if (!spatial2entity.has(quad.object.id)) {
                            spatial2entity.set(quad.object.id, [subject]);
                        }
                        else {
                            (_a = spatial2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_o && !_o.done && (_j = _m.return)) _j.call(_m);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (seen_2_1 && !seen_2_1.done && (_h = seen_2.return)) _h.call(seen_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var newSpatialEntities = callback(entities);
        var newSeen = new Set();
        try {
            for (var newSpatialEntities_1 = __values(newSpatialEntities), newSpatialEntities_1_1 = newSpatialEntities_1.next(); !newSpatialEntities_1_1.done; newSpatialEntities_1_1 = newSpatialEntities_1.next()) {
                var e = newSpatialEntities_1_1.value;
                try {
                    for (var _p = (e_8 = void 0, __values((_b = spatial2entity.get(e)) !== null && _b !== void 0 ? _b : [])), _q = _p.next(); !_q.done; _q = _p.next()) {
                        var s = _q.value;
                        newSeen.add(s);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_q && !_q.done && (_l = _p.return)) _l.call(_p);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (newSpatialEntities_1_1 && !newSpatialEntities_1_1.done && (_k = newSpatialEntities_1.return)) _k.call(newSpatialEntities_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return newSeen;
    }
    function filterWithDataset(store, seen, callback) {
        var e_9, _h, e_10, _j, e_11, _k, e_12, _l, e_13, _m, e_14, _o;
        var _a, _b;
        var dataset2entity = new Map();
        var datasets = new Set();
        var sectionAndBlockSeen = new Set(seen);
        try {
            for (var seen_3 = __values(seen), seen_3_1 = seen_3.next(); !seen_3_1.done; seen_3_1 = seen_3.next()) {
                var subject = seen_3_1.value;
                try {
                    for (var _p = (e_10 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.sections, null, null))), _q = _p.next(); !_q.done; _q = _p.next()) {
                        var quad = _q.value;
                        sectionAndBlockSeen.add(quad.object.id);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_q && !_q.done && (_j = _p.return)) _j.call(_p);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (seen_3_1 && !seen_3_1.done && (_h = seen_3.return)) _h.call(seen_3);
            }
            finally { if (e_9) throw e_9.error; }
        }
        try {
            for (var sectionAndBlockSeen_1 = __values(sectionAndBlockSeen), sectionAndBlockSeen_1_1 = sectionAndBlockSeen_1.next(); !sectionAndBlockSeen_1_1.done; sectionAndBlockSeen_1_1 = sectionAndBlockSeen_1.next()) {
                var subject = sectionAndBlockSeen_1_1.value;
                try {
                    for (var _r = (e_12 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.datasets, null, null))), _s = _r.next(); !_s.done; _s = _r.next()) {
                        var quad = _s.value;
                        datasets.add(quad.object.id);
                        if (!dataset2entity.has(quad.object.id)) {
                            dataset2entity.set(quad.object.id, [subject]);
                        }
                        else {
                            (_a = dataset2entity.get(quad.object.id)) === null || _a === void 0 ? void 0 : _a.push(subject);
                        }
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (_s && !_s.done && (_l = _r.return)) _l.call(_r);
                    }
                    finally { if (e_12) throw e_12.error; }
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (sectionAndBlockSeen_1_1 && !sectionAndBlockSeen_1_1.done && (_k = sectionAndBlockSeen_1.return)) _k.call(sectionAndBlockSeen_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        var newDatasets = callback(datasets);
        var newSeen = new Set();
        try {
            for (var newDatasets_1 = __values(newDatasets), newDatasets_1_1 = newDatasets_1.next(); !newDatasets_1_1.done; newDatasets_1_1 = newDatasets_1.next()) {
                var e = newDatasets_1_1.value;
                try {
                    for (var _t = (e_14 = void 0, __values((_b = dataset2entity.get(e)) !== null && _b !== void 0 ? _b : [])), _u = _t.next(); !_u.done; _u = _t.next()) {
                        var s = _u.value;
                        newSeen.add(s);
                    }
                }
                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                finally {
                    try {
                        if (_u && !_u.done && (_o = _t.return)) _o.call(_t);
                    }
                    finally { if (e_14) throw e_14.error; }
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (newDatasets_1_1 && !newDatasets_1_1.done && (_m = newDatasets_1.return)) _m.call(newDatasets_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return newSeen;
    }
    /**
     * Finds all ids of object matching a filter.
     *
     * @param store The triple store.
     * @param filter The filter to limit objects.
     * @returns A set of all ids matching the filter.
     */
    function findIds(store, graph, filter) {
        var _a, _b, _c, _d, _e, _f, _g;
        var seen = getAllEntities(store);
        if (seen.size > 0) {
            seen = filterByHasSpatialEntity(store, seen);
        }
        if (seen.size > 0 && (filter.sex === 'Male' || filter.sex === 'Female')) {
            var sex_1 = filter.sex;
            seen = filterWithDonor(store, seen, function (donors) { return filterBySex(store, donors, sex_1); });
        }
        if (seen.size > 0 && ((_a = filter.tmc) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            seen = filterWithDonor(store, seen, function (donors) { return filterByGroupName(store, donors, filter.tmc); });
        }
        if (seen.size > 0 && ((_b = filter.technologies) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            seen = filterWithDataset(store, seen, function (datasets) { return filterByTechnology(store, datasets, filter.technologies); });
        }
        if (seen.size > 0 && ((_c = filter.spatialSearches) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            seen = filterWithSpatialEntity(store, seen, function (entities) { return filterBySpatialSearches(store, graph, entities, filter.spatialSearches); });
        }
        if (seen.size > 0 && ((_d = filter.ontologyTerms) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            var terms_1 = filter.ontologyTerms;
            if (terms_1.indexOf(rui.body.id) === -1) {
                seen = filterWithSpatialEntity(store, seen, function (entities) { return filterByOntologyTerms(store, entities, terms_1); });
            }
        }
        if (seen.size > 0 && ((_e = filter.cellTypeTerms) === null || _e === void 0 ? void 0 : _e.length) > 0) {
            var terms_2 = filter.cellTypeTerms;
            if (terms_2.indexOf(rui.cell.id) === -1) {
                seen = filterWithSpatialEntity(store, seen, function (entities) { return filterByCellTypeTerms(store, entities, terms_2); });
            }
        }
        if (seen.size > 0 && ((_f = filter.ageRange) === null || _f === void 0 ? void 0 : _f.length) === 2 &&
            lodash.isFinite(filter.ageRange[0]) && lodash.isFinite(filter.ageRange[1])) {
            var maxAge_1 = Math.max.apply(Math, __spreadArray([], __read(filter.ageRange)));
            var minAge_1 = Math.min.apply(Math, __spreadArray([], __read(filter.ageRange)));
            // Age filter given by their default range will be ignored
            if (!(minAge_1 === 1 && maxAge_1 === 110)) {
                seen = filterWithDonor(store, seen, function (donors) { return filterByAge(store, donors, minAge_1, maxAge_1); });
            }
        }
        if (seen.size > 0 && ((_g = filter.bmiRange) === null || _g === void 0 ? void 0 : _g.length) === 2 &&
            lodash.isFinite(filter.bmiRange[0]) && lodash.isFinite(filter.bmiRange[1])) {
            var maxBMI_1 = Math.max.apply(Math, __spreadArray([], __read(filter.bmiRange)));
            var minBMI_1 = Math.min.apply(Math, __spreadArray([], __read(filter.bmiRange)));
            // BMI filter given by their default range will be ignored
            if (!(minBMI_1 === 13 && maxBMI_1 === 83)) {
                seen = filterWithDonor(store, seen, function (donors) { return filterByBMI(store, donors, minBMI_1, maxBMI_1); });
            }
        }
        return seen;
    }
    /**
     * Gets all object ids in a store.
     *
     * @param store The triple store.
     * @returns A set of all ids.
     */
    function getAllEntities(store) {
        var seen = new Set();
        store.forSubjects(function (s) { return seen.add(s.id); }, entity.spatialEntity, null, null);
        return seen;
    }
    /**
     * Creates a callback function that adds ids to a second set iff it exists in the first set.
     *
     * @param seen The first set of ids.
     * @param newSeen The second set to add ids to.
     * @returns The callback function.
     */
    function differenceCallback(seen, newSeen) {
        return function (term) {
            if (seen.has(term.id)) {
                newSeen.add(term.id);
            }
        };
    }
    /**
     * Filters ids by sex.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param sex Sex to filter on.
     * @returns The subset of ids with the specified sex.
     */
    function filterBySex(store, seen, sex) {
        var newSeen = new Set();
        store.forSubjects(differenceCallback(seen, newSeen), entity.sex, entity[sex], null);
        return newSeen;
    }
    /**
     * Filters ids by group names.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param groupNames Group names to filter on.
     * @returns The subset of ids with the specified group names.
     */
    function filterByGroupName(store, seen, groupNames) {
        var e_15, _h;
        var newSeen = new Set();
        try {
            for (var groupNames_1 = __values(groupNames), groupNames_1_1 = groupNames_1.next(); !groupNames_1_1.done; groupNames_1_1 = groupNames_1.next()) {
                var groupName = groupNames_1_1.value;
                var literal = tripleStoreUtils.DataFactory.literal(groupName);
                store.forSubjects(differenceCallback(seen, newSeen), entity.providerName, literal, null);
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (groupNames_1_1 && !groupNames_1_1.done && (_h = groupNames_1.return)) _h.call(groupNames_1);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return newSeen;
    }
    /**
     * Filters ids by technology names.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param technologies Technology names to filter on.
     * @returns The subset of ids with the specified technology names.
     */
    function filterByTechnology(store, seen, technologies) {
        var e_16, _h;
        var newSeen = new Set();
        try {
            for (var technologies_1 = __values(technologies), technologies_1_1 = technologies_1.next(); !technologies_1_1.done; technologies_1_1 = technologies_1.next()) {
                var technology = technologies_1_1.value;
                var literal = tripleStoreUtils.DataFactory.literal(technology);
                store.forSubjects(differenceCallback(seen, newSeen), entity.technology, literal, null);
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (technologies_1_1 && !technologies_1_1.done && (_h = technologies_1.return)) _h.call(technologies_1);
            }
            finally { if (e_16) throw e_16.error; }
        }
        return newSeen;
    }
    /**
     * Filters ids by ontology terms.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param terms Ontology terms to filter on.
     * @returns The subset of ids with the specified ontology terms.
     */
    function filterByOntologyTerms(store, seen, terms) {
        var e_17, _h;
        var newSeen = new Set();
        try {
            for (var terms_3 = __values(terms), terms_3_1 = terms_3.next(); !terms_3_1.done; terms_3_1 = terms_3.next()) {
                var term = terms_3_1.value;
                var namedNode = tripleStoreUtils.DataFactory.namedNode(term);
                store.forSubjects(differenceCallback(seen, newSeen), ccf.spatialEntity.ccf_annotations, namedNode, null);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (terms_3_1 && !terms_3_1.done && (_h = terms_3.return)) _h.call(terms_3);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return newSeen;
    }
    /**
     * Filters ids by cell type terms.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param terms Cell type terms to filter on.
     * @returns The subset of ids with the specified cell type terms.
     */
    function filterByCellTypeTerms(store, seen, terms) {
        var e_18, _h;
        var asTerms = new Set();
        try {
            for (var terms_4 = __values(terms), terms_4_1 = terms_4.next(); !terms_4_1.done; terms_4_1 = terms_4.next()) {
                var term = terms_4_1.value;
                store.forObjects(function (asTerm) {
                    asTerms.add(asTerm.id);
                }, term, ccf.asctb.located_in, null);
                if (term === rui.cell.id) {
                    asTerms.add(rui.body.id);
                }
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (terms_4_1 && !terms_4_1.done && (_h = terms_4.return)) _h.call(terms_4);
            }
            finally { if (e_18) throw e_18.error; }
        }
        return filterByOntologyTerms(store, seen, __spreadArray([], __read(asTerms)));
    }
    /**
     * Filters ids by age.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param minAge Minimum age.
     * @param maxAge Maximum age.
     * @returns The subset of ids with the specified age.
     */
    function filterByAge(store, seen, minAge, maxAge) {
        var e_19, _h, e_20, _j;
        var newSeen = new Set();
        try {
            for (var seen_4 = __values(seen), seen_4_1 = seen_4.next(); !seen_4_1.done; seen_4_1 = seen_4.next()) {
                var subject = seen_4_1.value;
                try {
                    for (var _k = (e_20 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.age, null, null))), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var quad = _l.value;
                        var value = rdfLiteral.fromRdf(quad.object);
                        if (value >= minAge && value <= maxAge) {
                            newSeen.add(subject);
                        }
                    }
                }
                catch (e_20_1) { e_20 = { error: e_20_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_j = _k.return)) _j.call(_k);
                    }
                    finally { if (e_20) throw e_20.error; }
                }
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (seen_4_1 && !seen_4_1.done && (_h = seen_4.return)) _h.call(seen_4);
            }
            finally { if (e_19) throw e_19.error; }
        }
        return newSeen;
    }
    /**
     * Filters ids by BMI.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param minBMI Minimum BMI.
     * @param maxBMI Maximum BMI.
     * @returns The subset of ids with the specified BMI.
     */
    function filterByBMI(store, seen, minBMI, maxBMI) {
        var e_21, _h, e_22, _j;
        var newSeen = new Set();
        try {
            for (var seen_5 = __values(seen), seen_5_1 = seen_5.next(); !seen_5_1.done; seen_5_1 = seen_5.next()) {
                var subject = seen_5_1.value;
                try {
                    for (var _k = (e_22 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.bmi, null, null))), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var quad = _l.value;
                        var value = rdfLiteral.fromRdf(quad.object);
                        if (value >= minBMI && value <= maxBMI) {
                            newSeen.add(subject);
                        }
                    }
                }
                catch (e_22_1) { e_22 = { error: e_22_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_j = _k.return)) _j.call(_k);
                    }
                    finally { if (e_22) throw e_22.error; }
                }
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (seen_5_1 && !seen_5_1.done && (_h = seen_5.return)) _h.call(seen_5);
            }
            finally { if (e_21) throw e_21.error; }
        }
        return newSeen;
    }
    /**
     * Filters ids by spatial entities.
     *
     * @param store The triple store.
     * @param seen All ids to choose from.
     * @param hasSpatialEntity Whether the filtered objects should have a spatial entity.
     * @returns The subset of ids with/without spatial entities.
     */
    function filterByHasSpatialEntity(store, seen, hasSpatialEntity) {
        if (hasSpatialEntity === void 0) { hasSpatialEntity = true; }
        var newSeen = new Set();
        store.forSubjects(differenceCallback(seen, newSeen), entity.spatialEntity, null, null);
        if (!hasSpatialEntity) {
            var notNewSeen_1 = new Set();
            seen.forEach(function (s) { return !newSeen.has(s) ? notNewSeen_1.add(s) : undefined; });
            return notNewSeen_1;
        }
        return newSeen;
    }
    function filterBySpatialSearches(store, graph, seen, spatialSearches) {
        var e_23, _h;
        var newSeen = new Set();
        try {
            for (var spatialSearches_1 = __values(spatialSearches), spatialSearches_1_1 = spatialSearches_1.next(); !spatialSearches_1_1.done; spatialSearches_1_1 = spatialSearches_1.next()) {
                var search = spatialSearches_1_1.value;
                var thisSeen = filterByProbingSphere(store, graph, seen, search);
                thisSeen.forEach(function (s) { return newSeen.add(s); });
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (spatialSearches_1_1 && !spatialSearches_1_1.done && (_h = spatialSearches_1.return)) _h.call(spatialSearches_1);
            }
            finally { if (e_23) throw e_23.error; }
        }
        return newSeen;
    }

    function getSpatialEntityMapping(subjects, store) {
        var e_1, _c, e_2, _d;
        var spatial2entity = new Map();
        try {
            for (var subjects_1 = __values(subjects), subjects_1_1 = subjects_1.next(); !subjects_1_1.done; subjects_1_1 = subjects_1.next()) {
                var subject = subjects_1_1.value;
                try {
                    for (var _e = (e_2 = void 0, __values(tripleStoreUtils.readQuads(store, subject, entity.spatialEntity, null, null))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var quad = _f.value;
                        if (!spatial2entity.has(quad.object.id)) {
                            spatial2entity.set(quad.object.id, new Set([subject]));
                        }
                        else {
                            spatial2entity.get(quad.object.id).add(subject);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (subjects_1_1 && !subjects_1_1.done && (_c = subjects_1.return)) _c.call(subjects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return spatial2entity;
    }
    function getAnatomicalStructureMapping(ids, store) {
        var e_3, _c, e_4, _d;
        var spatial2entity = getSpatialEntityMapping(ids, store);
        var term2entity = new Map();
        try {
            for (var _e = __values(spatial2entity.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var subject = _f.value;
                var entities = spatial2entity.get(subject);
                var _loop_1 = function (quad) {
                    if (!term2entity.has(quad.object.id)) {
                        term2entity.set(quad.object.id, new Set(entities));
                    }
                    else {
                        var termEntities_1 = term2entity.get(quad.object.id);
                        entities.forEach(function (value) { return termEntities_1.add(value); });
                    }
                };
                try {
                    for (var _g = (e_4 = void 0, __values(tripleStoreUtils.readQuads(store, subject, ccf.spatialEntity.ccf_annotations, null, null))), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var quad = _h.value;
                        _loop_1(quad);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return term2entity;
    }
    /**
     * Get number of occurrences of ontology terms for a set of ids.
     *
     * @param ids Ids of objects to calculate aggregate over.
     * @param store The triple store.
     * @returns Ontology term counts.
     */
    function getOntologyTermOccurences(ids, store) {
        var counts = {};
        var term2entities = getAnatomicalStructureMapping(ids, store);
        term2entities.forEach(function (value, key) {
            counts[key] = value.size;
        });
        return counts;
    }
    /**
     * Get number of occurrences of cell type terms for a set of ids.
     *
     * @param ids Ids of objects to calculate aggregate over.
     * @param store The triple store.
     * @returns Ontology term counts.
     */
    function getCellTypeTermOccurences(ids, store) {
        var e_5, _c, e_6, _d;
        var _a, _b;
        var asTerm2entities = getAnatomicalStructureMapping(ids, store);
        var ctTerm2entities = new Map();
        try {
            for (var _e = __values(asTerm2entities.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var asTerm = _f.value;
                var entities = asTerm2entities.get(asTerm);
                var _loop_2 = function (quad) {
                    var cellType = quad.subject.id;
                    if (!ctTerm2entities.has(cellType)) {
                        ctTerm2entities.set(cellType, new Set(entities));
                    }
                    else {
                        var termEntities_2 = ctTerm2entities.get(cellType);
                        entities.forEach(function (value) { return termEntities_2.add(value); });
                    }
                };
                try {
                    for (var _g = (e_6 = void 0, __values(tripleStoreUtils.readQuads(store, null, ccf.asctb.located_in, asTerm, null))), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var quad = _h.value;
                        _loop_2(quad);
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var counts = {};
        ctTerm2entities.forEach(function (value, key) {
            counts[key] = value.size;
        });
        counts[rui.cell.id] = (_b = (_a = asTerm2entities.get(rui.body.id)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
        return counts;
    }

    function getOntologyTreeNode(store, iri, relationshipIri) {
        var _a, e_1, _b;
        var result = {
            '@id': iri, '@type': 'OntologyTreeNode', id: iri, parent: '',
            children: [], synonymLabels: [], label: ''
        };
        var ontologyTreeNodeResult = (_a = {},
            _a[ccf.ontologyNode.label.id] = 'label',
            _a[relationshipIri] = 'parent',
            _a[ccf.ontologyNode.synonymLabels.id] = 'synonymLabels',
            _a);
        try {
            for (var _c = __values(getEntries(store, iri, ontologyTreeNodeResult)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                if (key === 'synonymLabels') {
                    result.synonymLabels.push(value);
                }
                else {
                    result[key] = value;
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
        result.children = store.getSubjects(relationshipIri, iri, null).map(function (s) { return s.id; });
        return result;
    }
    function getOntologyTreeModel(store, rootIri, rootLabel, relationshipIri) {
        var e_2, _a, e_3, _b;
        var result = { root: rootIri, nodes: {} };
        var seen = new Set();
        try {
            for (var _c = __values(tripleStoreUtils.readQuads(store, null, relationshipIri, null, null)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var quad = _d.value;
                seen.add(quad.subject.id);
                seen.add(quad.object.id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var seen_1 = __values(seen), seen_1_1 = seen_1.next(); !seen_1_1.done; seen_1_1 = seen_1.next()) {
                var iri = seen_1_1.value;
                result.nodes[iri] = getOntologyTreeNode(store, iri, relationshipIri);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (seen_1_1 && !seen_1_1.done && (_b = seen_1.return)) _b.call(seen_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (!result.nodes[rootIri]) {
            result.nodes[rootIri] = {
                '@id': rootIri,
                '@type': 'OntologyTreeNode',
                id: rootIri,
                label: rootLabel,
                children: [],
                synonymLabels: []
            };
        }
        var rootChildren = store
            .getSubjects(relationshipIri, rootIri, null).map(function (o) { return o.id; })
            .sort(function (a, b) { return result.nodes[a].label.localeCompare(result.nodes[b].label); });
        result.nodes[rootIri].children = rootChildren;
        treeify(result);
        return result;
    }
    /**
     * Recursive function to ensure that the given ontology tree model is actually a tree by essentially using a BFS search.
     *
     * @param model the ontology tree model to mutate
     * @param nodeIri the tree node iri to modify. Starts at root in the base case
     * @param seen a set of IRIs that have been 'seen' so far to remove loops in the graph
     */
    function treeify(model, nodeIri, seen) {
        var e_4, _a;
        if (nodeIri === void 0) { nodeIri = undefined; }
        if (seen === void 0) { seen = new Set(); }
        var node = model.nodes[nodeIri !== null && nodeIri !== void 0 ? nodeIri : model.root];
        if (node) {
            node.children = node.children.filter(function (n) { return !seen.has(n); });
            node.children.forEach(function (n) { return seen.add(n); });
            try {
                for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var childId = _c.value;
                    treeify(model, childId, seen);
                    if (model.nodes[childId]) {
                        model.nodes[childId].parent = node['@id'];
                    }
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
    }
    function getAnatomicalStructureTreeModelSlowly(store) {
        var model = getOntologyTreeModel(store, rui.body.id, 'body', ccf.asctb.part_of.id);
        model.nodes[rui.body.id].children = [
            'http://purl.obolibrary.org/obo/UBERON_0000955',
            'http://purl.obolibrary.org/obo/UBERON_0000029',
            // 'http://purl.obolibrary.org/obo/UBERON_0002509', // Mesenteric Lymph Node
            'http://purl.obolibrary.org/obo/UBERON_0000970',
            // 'http://purl.obolibrary.org/obo/UBERON_0004548', // Eye, L
            // 'http://purl.org/sig/ont/fma/fma54449', // Eye, R
            'http://purl.obolibrary.org/obo/UBERON_0003889',
            // 'http://purl.obolibrary.org/obo/UBERON_0001303', // Fallopian Tube, L
            // 'http://purl.obolibrary.org/obo/UBERON_0001302', // Fallopian Tube, R
            'http://purl.obolibrary.org/obo/UBERON_0000948',
            'http://purl.obolibrary.org/obo/UBERON_0002113',
            // 'http://purl.obolibrary.org/obo/UBERON_0004538', // Kidney, L
            // 'http://purl.obolibrary.org/obo/UBERON_0004539', // Kidney, R
            'http://purl.obolibrary.org/obo/UBERON_0001465',
            // 'http://purl.org/sig/ont/fma/fma24978', // Knee, L
            // 'http://purl.org/sig/ont/fma/fma24977', // Knee, R
            'http://purl.obolibrary.org/obo/UBERON_0002107',
            'http://purl.obolibrary.org/obo/UBERON_0002048',
            'http://purl.obolibrary.org/obo/UBERON_0001911',
            // 'http://purl.org/sig/ont/fma/fma57991', // Mammary Gland, L
            // 'http://purl.org/sig/ont/fma/fma57987', // Mammary Gland, R
            'http://purl.obolibrary.org/obo/UBERON_0000992',
            // 'http://purl.org/sig/ont/fma/fma7214', // Ovary, L
            // 'http://purl.org/sig/ont/fma/fma7213', // Ovary, R
            'http://purl.obolibrary.org/obo/UBERON_0001264',
            'http://purl.obolibrary.org/obo/UBERON_0001270',
            'http://purl.obolibrary.org/obo/UBERON_0001987',
            'http://purl.obolibrary.org/obo/UBERON_0002367',
            'http://purl.obolibrary.org/obo/UBERON_0002097',
            'http://purl.obolibrary.org/obo/UBERON_0002108',
            'http://purl.obolibrary.org/obo/UBERON_0002240',
            'http://purl.obolibrary.org/obo/UBERON_0000059',
            'http://purl.obolibrary.org/obo/UBERON_0002106',
            'http://purl.obolibrary.org/obo/UBERON_0002370',
            'http://purl.obolibrary.org/obo/UBERON_0000056',
            // 'http://purl.obolibrary.org/obo/UBERON_0001223', // Ureter, L
            // 'http://purl.obolibrary.org/obo/UBERON_0001222', // Ureter, R
            'http://purl.obolibrary.org/obo/UBERON_0001255',
            'http://purl.obolibrary.org/obo/UBERON_0000995',
            'http://purl.obolibrary.org/obo/UBERON_0004537' // Blood Vasculature
        ].filter(function (iri) { return iri in model.nodes; });
        return model;
    }
    var getAnatomicalStructureTreeModel = lodash.memoize(getAnatomicalStructureTreeModelSlowly, function () { return ''; });
    function getCellTypeTreeModel(store) {
        return getOntologyTreeModel(store, rui.cell.id, 'cell', ccf.asctb.ct_is_a.id);
    }

    var _a, _b, _c, _d, _e;
    /** Entity iri to property path. */
    var listResultSet = (_a = {},
        _a[entity.label.id] = 'label',
        _a[entity.description.id] = 'description',
        _a[entity.link.id] = 'link',
        _a);
    var donorResultSet = Object.assign(Object.assign({}, listResultSet), (_b = {}, _b[entity.providerName.id] = 'providerName', _b));
    var datasetResultSet = Object.assign(Object.assign({}, listResultSet), (_c = {}, _c[entity.technology.id] = 'technology', _c[entity.thumbnail.id] = 'thumbnail', _c));
    var tissueSectionResultSet = Object.assign(Object.assign({}, listResultSet), (_d = {}, _d[entity.sampleType.id] = 'sampleType', _d[entity.sectionNumber.id] = 'sectionNumber', _d[entity.datasets.id] = 'datasets', _d));
    var tissueBlockResultSet = Object.assign(Object.assign({}, listResultSet), (_e = {}, _e[entity.sampleType.id] = 'sampleType', _e[entity.sectionCount.id] = 'sectionCount', _e[entity.sectionSize.id] = 'sectionSize', _e[entity.sectionUnits.id] = 'sectionUnits', _e[entity.donor.id] = 'donor', _e[entity.spatialEntity.id] = 'spatialEntityId', _e[entity.sections.id] = 'sections', _e[entity.datasets.id] = 'datasets', _e));
    /**
     * Extracts a single donor result from the triple store.
     *
     * @param store The triple store.
     * @param iri The entity id.
     * @returns The list data.
     */
    function getDonorResult(store, iri) {
        return getMappedResult(store, iri, 'Donor', donorResultSet);
    }
    /**
     * Extracts a single dataset result from the triple store.
     *
     * @param store The triple store.
     * @param iri The entity id.
     * @returns The list data.
     */
    function getDatasetResult(store, iri) {
        return getMappedResult(store, iri, 'Dataset', datasetResultSet);
    }
    /**
     * Extracts a single tissue section result from the triple store.
     *
     * @param store The triple store.
     * @param iri The entity id.
     * @returns The list data.
     */
    function getTissueSectionResult(store, iri) {
        var e_1, _a;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        var result = { '@id': iri, '@type': 'Sample', datasets: [] };
        try {
            for (var _b = __values(getEntries(store, iri, tissueSectionResultSet)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (key === 'datasets') {
                    var dataset = getDatasetResult(store, value);
                    result[key].push(dataset);
                }
                else {
                    result[key] = value;
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
        return result;
    }
    /**
     * Extracts a single tissue block result from the triple store.
     *
     * @param store The triple store.
     * @param iri The entity id.
     * @returns The list data.
     */
    function getTissueBlockResult(store, iri) {
        var e_2, _a;
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        var result = { '@id': iri, '@type': 'Sample',
            sections: [], datasets: []
        };
        try {
            for (var _b = __values(getEntries(store, iri, tissueBlockResultSet)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (key === 'sections') {
                    var section = getTissueSectionResult(store, value);
                    result[key].push(section);
                }
                else if (key === 'datasets') {
                    var dataset = getDatasetResult(store, value);
                    result[key].push(dataset);
                }
                else if (key === 'donor') {
                    result[key] = getDonorResult(store, value);
                }
                else {
                    result[key] = value;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    }

    var CCFDatabaseStatusTracker = /** @class */ (function () {
        function CCFDatabaseStatusTracker(database) {
            this.database = database;
            this.connect();
        }
        CCFDatabaseStatusTracker.prototype.toJson = function () {
            return {
                status: this.status,
                message: this.message,
                checkback: this.status === 'Ready' || this.status === 'Error' ? 60 * 60 * 1000 : 2000,
                loadTime: this.loadTime
            };
        };
        CCFDatabaseStatusTracker.prototype.connect = function () {
            var _this = this;
            this.status = 'Loading';
            this.message = 'Loading database';
            var startTime = Date.now();
            return this.database.connect()
                .then(function (loaded) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!loaded) return [3 /*break*/, 4];
                            // Warm up the database
                            this.message = 'Building scene';
                            return [4 /*yield*/, this.database.getScene()];
                        case 1:
                            _b.sent();
                            this.message = 'Building tissue block results';
                            return [4 /*yield*/, this.database.getTissueBlockResults()];
                        case 2:
                            _b.sent();
                            this.message = 'Aggregating results';
                            return [4 /*yield*/, this.database.getAggregateResults()];
                        case 3:
                            _b.sent();
                            this.status = 'Ready';
                            this.message = 'Database successfully loaded';
                            return [3 /*break*/, 5];
                        case 4:
                            this.status = 'Error';
                            this.message = 'Unknown error while loading database';
                            _b.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (error) {
                var _a;
                _this.status = 'Error';
                _this.message = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error while loading database';
            })
                .finally(function () {
                _this.loadTime = Date.now() - startTime;
            });
        };
        return CCFDatabaseStatusTracker;
    }());

    /* eslint-disable @typescript-eslint/naming-convention */
    /** CCF v2.0 JSON-LD Context */
    var CCF_CONTEXT = {
        '@context': {
            '@base': 'http://purl.org/ccf/',
            '@vocab': 'http://purl.org/ccf/',
            'ccf': 'http://purl.org/ccf/',
            'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
            'dcterms': 'http://purl.org/dc/terms/',
            'label': 'rdfs:label',
            'description': 'rdfs:comment',
            'link': 'ccf:url',
            'sex': 'ccf:sex',
            'age': 'ccf:age',
            'bmi': 'ccf:bmi',
            'consortium_name': 'ccf:consortium_name',
            'provider_name': 'ccf:tissue_provider_name',
            'provider_uuid': 'ccf:tissue_provider_uuid',
            'donor': {
                '@id': 'ccf:comes_from',
                '@type': '@id'
            },
            'samples': {
                '@reverse': 'donor'
            },
            'sections': {
                '@id': 'ccf:subdivided_into_sections',
                '@type': '@id'
            },
            'datasets': {
                '@id': 'ccf:generates_dataset',
                '@type': '@id'
            },
            'sample_type': 'ccf:sample_type',
            'section_count': 'ccf:section_count',
            'section_size': 'ccf:section_size',
            'section_units': 'ccf:section_size_unit',
            'section_number': 'ccf:section_number',
            'rui_location': {
                '@id': 'ccf:has_registration_location',
                '@type': '@id'
            },
            'ccf_annotations': {
                '@id': 'ccf:collides_with',
                '@type': '@id',
                '@container': '@set'
            },
            'representation_of': {
                '@id': 'ccf:representation_of',
                '@type': '@id'
            },
            'reference_organ': {
                '@id': 'ccf:has_reference_organ',
                '@type': '@id'
            },
            'extraction_set_for': {
                '@id': 'ccf:extraction_set_for',
                '@type': '@id'
            },
            'extraction_set': {
                '@id': 'ccf:has_extraction_set',
                '@type': '@id'
            },
            'organ_owner_sex': 'ccf:organ_owner_sex',
            'side': 'ccf:organ_side',
            'rui_rank': 'ccf:rui_rank',
            'slice_thickness': 'ccf:slice_thickness',
            'slice_count': 'ccf:slice_count',
            'object': {
                '@id': 'ccf:has_object_reference',
                '@type': '@id'
            },
            'creation_date': 'dcterms:created',
            'updated_date': 'ccf:updated_date',
            'creator': 'dcterms:creator',
            'creator_first_name': 'ccf:creator_first_name',
            'creator_last_name': 'ccf:creator_last_name',
            'placement': {
                '@reverse': 'ccf:placement_for'
            },
            'placement_date': 'dcterms:created',
            'rotation_order': 'ccf:rotation_order',
            'dimension_units': 'ccf:dimension_unit',
            'rotation_units': 'ccf:rotation_unit',
            'scaling_units': 'ccf:scaling_unit',
            'translation_units': 'ccf:translation_unit',
            'source': {
                '@id': 'ccf:placement_for',
                '@type': '@id'
            },
            'target': {
                '@id': 'ccf:placement_relative_to',
                '@type': '@id'
            },
            'x_rotation': 'ccf:x_rotation',
            'y_rotation': 'ccf:y_rotation',
            'z_rotation': 'ccf:z_rotation',
            'x_scaling': 'ccf:x_scaling',
            'y_scaling': 'ccf:y_scaling',
            'z_scaling': 'ccf:z_scaling',
            'x_translation': 'ccf:x_translation',
            'y_translation': 'ccf:y_translation',
            'z_translation': 'ccf:z_translation',
            'x_dimension': 'ccf:x_dimension',
            'y_dimension': 'ccf:y_dimension',
            'z_dimension': 'ccf:z_dimension',
            'ontology_terms': {
                '@id': 'ccf:has_ontology_term',
                '@type': '@id'
            },
            'technology': 'ccf:technology',
            'thumbnail': 'ccf:thumbnail',
            'file': 'ccf:file_url',
            'file_format': 'ccf:file_format',
            'file_subpath': 'ccf:file_subpath'
        }
    };
    /* eslint-enable @typescript-eslint/naming-convention */
    /**
     * Function which takes JSON-LD data and makes patches to update from CCF v1.x to v2.0 automatically
     *
     * @param jsonLdString the input JSON-LD as a string
     * @returns A JSON-LD object derived from the given string with updated data to be compatible with CCF v2.0
     */
    function patchJsonLd(jsonLdString) {
        return JSON.parse(jsonLdString, function (key, value) {
            if (key === 'ccf_annotations' && Array.isArray(value)) {
                return value.map(function (iri) {
                    if (iri === null || iri === void 0 ? void 0 : iri.startsWith('http://purl.obolibrary.org/obo/FMA_')) {
                        return iri.replace('http://purl.obolibrary.org/obo/FMA_', 'http://purl.org/sig/ont/fma/fma');
                    }
                    else {
                        return iri;
                    }
                });
            }
            else if (key === '@context' && value && (value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-entity-context.jsonld'
                || value === 'https://hubmapconsortium.github.io/hubmap-ontology/ccf-context.jsonld'
                || value === 'https://hubmapconsortium.github.io/ccf-ontology/ccf-context.jsonld'
                || value['@base'] === 'http://purl.org/ccf/latest/ccf-entity.owl#')) {
                return CCF_CONTEXT;
            }
            return value;
        });
    }

    /**
     * Function to add additional ccf_annotations to rui locations based on the
     * reference organ it was placed relative to.
     *
     * @param store the triple store holding the CCF.OWL data
     */
    function enrichRuiLocations(store) {
        var e_1, _d, e_2, _e, e_3, _f, e_4, _g, e_5, _h;
        var _a, _b, _c;
        var tree = getAnatomicalStructureTreeModel(store);
        var refOrganMap = new Map();
        try {
            // Build a map from reference organ to ccf annotations via representation_of and the AS partonomy
            for (var _j = __values(tripleStoreUtils.readQuads(store, null, ccf.spatialEntity.representation_of, null, null)), _k = _j.next(); !_k.done; _k = _j.next()) {
                var _l = _k.value, organ = _l.subject, term = _l.object;
                var annotations = new Set([term.id]);
                var parent = (_a = tree.nodes[term.id]) === null || _a === void 0 ? void 0 : _a.parent;
                while (parent) {
                    if (annotations.has(parent)) {
                        break;
                    }
                    else {
                        annotations.add(parent);
                        parent = (_b = tree.nodes[parent]) === null || _b === void 0 ? void 0 : _b.parent;
                    }
                }
                refOrganMap.set(organ.id, __spreadArray([], __read(annotations)).map(function (s) { return tripleStoreUtils.DataFactory.namedNode(s); }));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // Add AS terms for rui locations based on the reference organs they are placed relative to
            for (var _m = __values(tripleStoreUtils.readQuads(store, null, entity.spatialEntity, null, null)), _o = _m.next(); !_o.done; _o = _m.next()) {
                var ruiLocation = _o.value.object;
                try {
                    for (var _p = (e_3 = void 0, __values(tripleStoreUtils.readQuads(store, null, ccf.spatialPlacement.source, ruiLocation, null))), _q = _p.next(); !_q.done; _q = _p.next()) {
                        var placement = _q.value.subject;
                        try {
                            for (var _r = (e_4 = void 0, __values(tripleStoreUtils.readQuads(store, placement, ccf.spatialPlacement.target, null, null))), _s = _r.next(); !_s.done; _s = _r.next()) {
                                var organ = _s.value.object;
                                try {
                                    for (var _t = (e_5 = void 0, __values((_c = refOrganMap.get(organ.id)) !== null && _c !== void 0 ? _c : [])), _u = _t.next(); !_u.done; _u = _t.next()) {
                                        var term = _u.value;
                                        store.addQuad(tripleStoreUtils.DataFactory.namedNode(ruiLocation.id), ccf.spatialEntity.ccf_annotations, term);
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (_u && !_u.done && (_h = _t.return)) _h.call(_t);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_s && !_s.done && (_g = _r.return)) _g.call(_r);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_q && !_q.done && (_f = _p.return)) _f.call(_p);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_e = _m.return)) _e.call(_m);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }

    /** Default initialization options. */
    var DEFAULT_CCF_DB_OPTIONS = {
        ccfOwlUrl: 'https://purl.org/ccf/latest/ccf.owl',
        ccfContextUrl: 'https://purl.org/ccf/latest/ccf-context.jsonld',
        dataSources: [],
        hubmapDataService: 'static',
        hubmapPortalUrl: 'https://portal.hubmapconsortium.org/',
        hubmapDataUrl: '',
        hubmapAssetsUrl: 'https://assets.hubmapconsortium.org'
    };
    /** Database provider. */
    var CCFDatabase = /** @class */ (function () {
        /**
         * Creates an instance of ccfdatabase.
         *
         * @param [options] Initialization options.
         */
        function CCFDatabase(options) {
            if (options === void 0) { options = DEFAULT_CCF_DB_OPTIONS; }
            this.options = options;
            this.store = new tripleStoreUtils.Store(undefined, { factory: tripleStoreUtils.DataFactory });
            this.graph = new CCFSpatialGraph(this);
            this.scene = new CCFSpatialScene(this);
        }
        /**
         * Connects the database.
         *
         * @param [options] Options used to initialize.
         * @returns A promise resolving to true if data has been loaded into the database.
         */
        CCFDatabase.prototype.connect = function (options, cached) {
            if (cached === void 0) { cached = false; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (options) {
                                this.options = options;
                            }
                            if (!this.initializing) {
                                if (cached) {
                                    this.initializing = this.cachedConnect();
                                }
                                else {
                                    this.initializing = this.doConnect();
                                }
                            }
                            return [4 /*yield*/, this.initializing];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, this.store.size > 0];
                    }
                });
            });
        };
        CCFDatabase.prototype.cachedConnect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var start, lastModifiedKey, ccfDatabaseKey, lastModified, serializedDb;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            start = new Date().getTime();
                            lastModifiedKey = 'ccf-database.last_modified';
                            ccfDatabaseKey = 'ccf-database';
                            return [4 /*yield*/, idbKeyval.get(lastModifiedKey).catch(function () { return undefined; })];
                        case 1:
                            lastModified = _c.sent();
                            if (!(lastModified && start - new Date(+lastModified).getTime() > 60 * 60 * 1000)) return [3 /*break*/, 3];
                            return [4 /*yield*/, idbKeyval.delMany([ccfDatabaseKey, lastModifiedKey]).catch(function () { return undefined; })];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, idbKeyval.get(ccfDatabaseKey).catch(function () { return undefined; })];
                        case 4:
                            serializedDb = _c.sent();
                            _c.label = 5;
                        case 5:
                            if (!serializedDb) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.deserialize(serializedDb)];
                        case 6:
                            _c.sent();
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, this.doConnect()];
                        case 8:
                            _c.sent();
                            idbKeyval.setMany([
                                [ccfDatabaseKey, this.serialize()],
                                [lastModifiedKey, '' + start]
                            ]).catch(function () { return undefined; });
                            _c.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Actually connects to the database.
         *
         * @returns A promise resolving to void when connected.
         */
        CCFDatabase.prototype.doConnect = function () {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var ops, sources, ccfOwlUrl, storeString;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            ops = [];
                            sources = (_b = (_a = this.options.dataSources) === null || _a === void 0 ? void 0 : _a.concat()) !== null && _b !== void 0 ? _b : [];
                            ccfOwlUrl = this.options.ccfOwlUrl;
                            if (!ccfOwlUrl.startsWith('{')) return [3 /*break*/, 1];
                            // serialized n3 store was provided as the ccfOwlUrl
                            this.store = tripleStoreUtils.deserializeN3Store(ccfOwlUrl, tripleStoreUtils.DataFactory);
                            return [3 /*break*/, 4];
                        case 1:
                            if (!ccfOwlUrl.endsWith('.n3store.json')) return [3 /*break*/, 3];
                            return [4 /*yield*/, fetch(ccfOwlUrl).then(function (r) { return r.text(); })
                                    .catch(function () { return console.log('Couldn\'t locate serialized store.'); })];
                        case 2:
                            storeString = _c.sent();
                            if (storeString) {
                                this.store = tripleStoreUtils.deserializeN3Store(storeString, tripleStoreUtils.DataFactory);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            if ((ccfOwlUrl === null || ccfOwlUrl === void 0 ? void 0 : ccfOwlUrl.length) > 0) {
                                sources.push(ccfOwlUrl);
                            }
                            _c.label = 4;
                        case 4:
                            if (this.options.hubmapDataUrl) {
                                if (this.options.hubmapDataUrl.endsWith('jsonld')) {
                                    sources.push(this.options.hubmapDataUrl);
                                }
                                else {
                                    ops.push(searchHubmap(this.options.hubmapDataUrl, this.options.hubmapDataService, this.options.hubmapQuery, this.options.hubmapToken, this.options.hubmapAssetsUrl, this.options.hubmapPortalUrl).then(function (jsonld) {
                                        if (jsonld) {
                                            return _this.addDataSources([jsonld]);
                                        }
                                        else {
                                            return undefined;
                                        }
                                    }));
                                }
                            }
                            ops.push(this.addDataSources(sources));
                            return [4 /*yield*/, Promise.all(ops)];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, this.synchronize()];
                        case 6:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CCFDatabase.prototype.addDataSources = function (sources, inputStore) {
            return __awaiter(this, void 0, void 0, function () {
                var store;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            store = inputStore !== null && inputStore !== void 0 ? inputStore : this.store;
                            return [4 /*yield*/, Promise.all(sources.map(function (source) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                if (!(typeof source === 'string')) return [3 /*break*/, 10];
                                                if (!((source.startsWith('http') || source.startsWith('assets/')) && source.includes('jsonld'))) return [3 /*break*/, 3];
                                                return [4 /*yield*/, fetch(source).then(function (r) { return r.text(); })];
                                            case 1:
                                                source = _c.sent();
                                                source = patchJsonLd(source);
                                                return [4 /*yield*/, tripleStoreUtils.addJsonLdToStore(source, store)];
                                            case 2:
                                                _c.sent();
                                                return [3 /*break*/, 9];
                                            case 3:
                                                if (!source.endsWith('n3')) return [3 /*break*/, 5];
                                                return [4 /*yield*/, tripleStoreUtils.addN3ToStore(source, store)];
                                            case 4:
                                                _c.sent();
                                                return [3 /*break*/, 9];
                                            case 5:
                                                if (!(source.endsWith('rdf') || source.endsWith('owl') || source.endsWith('xml'))) return [3 /*break*/, 7];
                                                return [4 /*yield*/, tripleStoreUtils.addRdfXmlToStore(source, store)];
                                            case 6:
                                                _c.sent();
                                                return [3 /*break*/, 9];
                                            case 7:
                                                // Passthrough assumes a JSON-LD response
                                                source = patchJsonLd(source);
                                                return [4 /*yield*/, tripleStoreUtils.addJsonLdToStore(source, store)];
                                            case 8:
                                                _c.sent();
                                                _c.label = 9;
                                            case 9: return [3 /*break*/, 12];
                                            case 10:
                                                source = patchJsonLd(JSON.stringify(source));
                                                return [4 /*yield*/, tripleStoreUtils.addJsonLdToStore(source, store)];
                                            case 11:
                                                _c.sent();
                                                _c.label = 12;
                                            case 12: return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, this];
                    }
                });
            });
        };
        CCFDatabase.prototype.synchronize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: 
                        // Add a small delay to allow the triple store to settle
                        return [4 /*yield*/, new Promise(function (r) {
                                setTimeout(r, 500);
                            })];
                        case 1:
                            // Add a small delay to allow the triple store to settle
                            _c.sent();
                            this.graph.createGraph();
                            enrichRuiLocations(this.store);
                            return [2 /*return*/, this];
                    }
                });
            });
        };
        CCFDatabase.prototype.serialize = function () {
            return tripleStoreUtils.serializeN3Store(this.store);
        };
        CCFDatabase.prototype.deserialize = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            this.store = tripleStoreUtils.deserializeN3Store(value, tripleStoreUtils.DataFactory);
                            this.graph = new CCFSpatialGraph(this);
                            this.scene = new CCFSpatialScene(this);
                            return [4 /*yield*/, new Promise(function (r) {
                                    setTimeout(r, 10);
                                })];
                        case 1:
                            _c.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets all ids matching the filter.
         *
         * @param [filter] The filter.
         * @returns A set of all matching ids.
         */
        CCFDatabase.prototype.getIds = function (filter) {
            if (filter === void 0) { filter = {}; }
            return findIds(this.store, this.graph, filter);
        };
        /**
         * Gets the data for an object.
         *
         * @param id The id of the requested object.
         * @returns The object data.
         */
        CCFDatabase.prototype.get = function (id) {
            return this.store.getQuads(tripleStoreUtils.DataFactory.namedNode(id), null, null, null);
        };
        /**
         * Gets the data for objects matching a filter.
         *
         * @param [filter] The filter.
         * @returns An array of data.
         */
        CCFDatabase.prototype.search = function (filter) {
            var _this = this;
            if (filter === void 0) { filter = {}; }
            return __spreadArray([], __read(this.getIds(filter))).map(function (s) { return _this.get(s); });
        };
        /**
         * Gets all spatial entities for a filter.
         *
         * @param [filter] The filter.
         * @returns A list of spatial entities.
         */
        CCFDatabase.prototype.getSpatialEntities = function (filter) {
            var _this = this;
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
            return __spreadArray([], __read(this.getIds(filter))).map(function (s) { return getSpatialEntityForEntity(_this.store, s); });
        };
        CCFDatabase.prototype.getDatabaseStatus = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    if (!this.status) {
                        this.status = new CCFDatabaseStatusTracker(this);
                    }
                    return [2 /*return*/, this.status.toJson()];
                });
            });
        };
        /**
         * Get a list of technology names used by datasets
         *
         * @returns list of unique technology names in the data
         */
        CCFDatabase.prototype.getDatasetTechnologyNames = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getDatasetTechnologyNames(this.store)];
                });
            });
        };
        /**
         * Get a list of provider names from the database
         *
         * @returns list of unique provider names in the data
         */
        CCFDatabase.prototype.getProviderNames = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getProviderNames(this.store)];
                });
            });
        };
        /**
         * Gets all tissue block results for a filter.
         *
         * @param [filter] The filter.
         * @returns A list of results.
         */
        CCFDatabase.prototype.getTissueBlockResults = function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_c) {
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    filter = Object.assign(Object.assign({}, filter), { hasSpatialEntity: true });
                    return [2 /*return*/, __spreadArray([], __read(this.getIds(filter))).map(function (s) { return getTissueBlockResult(_this.store, s); })];
                });
            });
        };
        /**
         * Gets all aggregate results for a filter.
         *
         * @param [filter] The filter.
         * @returns A list of aggregate data.
         */
        CCFDatabase.prototype.getAggregateResults = function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getAggregateResults(this.getIds(filter), this.store)];
                });
            });
        };
        /**
         * Get number of occurrences of ontology terms for a set of ids.
         *
         * @param [filter] The filter.
         * @returns Ontology term counts.
         */
        CCFDatabase.prototype.getOntologyTermOccurences = function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getOntologyTermOccurences(this.getIds(filter), this.store)];
                });
            });
        };
        /**
         * Get number of occurrences of cell type terms for a set of ids.
         *
         * @param [filter] The filter.
         * @returns Cell type term counts.
         */
        CCFDatabase.prototype.getCellTypeTermOccurences = function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getCellTypeTermOccurences(this.getIds(filter), this.store)];
                });
            });
        };
        /**
         * Get ontology term tree nodes
         *
         * @returns Ontology term counts.
         */
        CCFDatabase.prototype.getOntologyTreeModel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getAnatomicalStructureTreeModel(this.store)];
                });
            });
        };
        /**
         * Get cell type term tree nodes
         *
         * @returns Ontology term counts.
         */
        CCFDatabase.prototype.getCellTypeTreeModel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, getCellTypeTreeModel(this.store)];
                });
            });
        };
        /**
         * Get reference organs
         *
         * @returns Ontology term counts.
         */
        CCFDatabase.prototype.getReferenceOrgans = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.scene.getReferenceOrgans()];
                });
            });
        };
        /**
         * Get all nodes to form the 3D scene of reference body, organs, and tissues
         *
         * @param [filter] The filter.
         * @returns A list of Spatial Scene Nodes for the 3D Scene
         */
        CCFDatabase.prototype.getScene = function (filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    this.graph.createGraph();
                    return [2 /*return*/, this.scene.getScene(filter)];
                });
            });
        };
        /**
         * Get all nodes to form the 3D scene of reference organ and tissues
         *
         * @param [organIri] The Reference Organ IRI
         * @param [filter] The filter.
         * @returns A list of Spatial Scene Nodes for the 3D Scene
         */
        CCFDatabase.prototype.getReferenceOrganScene = function (organIri, filter) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    this.graph.createGraph();
                    return [2 /*return*/, this.scene.getReferenceOrganScene(organIri, filter)];
                });
            });
        };
        CCFDatabase.prototype.getSpatialPlacement = function (source, targetIri) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, this.graph.getSpatialPlacement(source, targetIri)];
                });
            });
        };
        return CCFDatabase;
    }());

    var gold = [240, 183, 98, 255];
    var red$1 = [213, 0, 0, 255];
    var green$1 = [29, 204, 101, 255];
    var blue$1 = [41, 121, 255, 255];
    /**
     * Create a set of scene nodes for the body-ui to show the probing sphere and lines around it
     * for a given spatial search.
     * @param node the Spatial Entity (usually a reference organ) that the sphere is probing into
     * @param sphere the Spatial Search that defines where and how big the probing sphere is
     * @returns a set of scene nodes for the body-ui
     */
    function getProbingSphereScene(node, sphere) {
        var _a;
        var sceneWidth = node.x_dimension / 1000;
        var sceneHeight = node.y_dimension / 1000;
        var sceneDepth = node.z_dimension / 1000;
        var defaultSphereRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.07;
        var sphereLineRadius = defaultSphereRadius * 0.05;
        var sphereLineLength = defaultSphereRadius * 2;
        var sphereConeRadius = sphereLineRadius * 4;
        if (!sphere) {
            sphere = {
                target: (_a = node.representation_of) !== null && _a !== void 0 ? _a : node['@id'],
                radius: defaultSphereRadius,
                x: sceneWidth / 2,
                y: sceneHeight / 2,
                z: sceneDepth / 2
            };
        }
        else {
            sphere = Object.assign(Object.assign({}, sphere), { radius: sphere.radius / 1000, x: sphere.x / 1000, y: sphere.y / 1000, z: sphere.z / 1000 });
        }
        return [
            // Probing Sphere
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingSphere',
                '@type': 'SpatialSceneNode',
                unpickable: false,
                geometry: 'sphere',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([sphere.x, sphere.y, sphere.z]).scale(sphere.radius),
                color: gold
            },
            // Probing Sphere Positive X Axis (D)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXD',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x + sphere.radius + sphereLineLength / 2, sphere.y, sphere.z])
                    .rotateZ(core.toRadians(-90))
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: red$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x + sphere.radius + sphereLineLength, sphere.y, sphere.z])
                    .rotateZ(core.toRadians(-90))
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: red$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXDLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'D',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.y, sphere.z])
                    .scale(sphereConeRadius),
                color: red$1
            },
            // Probing Sphere Negative X Axis (A)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXA',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x - sphere.radius - sphereLineLength / 2, sphere.y, sphere.z])
                    .rotateZ(core.toRadians(-90))
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: red$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXACone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x - sphere.radius - sphereLineLength, sphere.y, sphere.z])
                    .rotateZ(core.toRadians(90))
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: red$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereXALabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'A',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.y, sphere.z])
                    .scale(sphereConeRadius),
                color: red$1
            },
            // Probing Sphere Positive Y Axis (W)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYW',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength / 2, sphere.z])
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: green$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength, sphere.z])
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: green$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYWLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'W',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y + sphere.radius + sphereLineLength + sphereConeRadius * 3, sphere.z])
                    .scale(sphereConeRadius),
                color: green$1
            },
            // Probing Sphere Negative Y Axis (S)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYS',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength / 2, sphere.z])
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: green$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength, sphere.z])
                    .rotateZ(core.toRadians(180))
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: green$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereYSLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'S',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y - sphere.radius - sphereLineLength - sphereConeRadius * 3.5, sphere.z])
                    .scale(sphereConeRadius),
                color: green$1
            },
            // Probing Sphere Positive Z Axis (E)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZE',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength / 2])
                    .rotateX(core.toRadians(90))
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: blue$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZECone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength])
                    .rotateX(core.toRadians(90))
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: blue$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZELabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'E',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z + sphere.radius + sphereLineLength + sphereConeRadius * 3])
                    .scale(sphereConeRadius),
                color: blue$1
            },
            // Probing Sphere Negative Z Axis (Q)
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQ',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength / 2])
                    .rotateX(core.toRadians(-90))
                    .scale([sphereLineRadius, sphereLineLength, sphereLineRadius]),
                color: blue$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength])
                    .rotateX(core.toRadians(-90))
                    .scale([sphereConeRadius, sphereConeRadius * 3, sphereConeRadius]),
                color: blue$1
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#ProbingsphereZQLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'Q',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sphere.x, sphere.y, sphere.z - sphere.radius - sphereLineLength - sphereConeRadius * 3.5])
                    .scale(sphereConeRadius),
                color: blue$1
            }
        ];
    }

    var gray = [204, 204, 204, 255];
    var red = [213, 0, 0, 255];
    var green = [29, 204, 101, 255];
    var blue = [41, 121, 255, 255];
    /**
     * Create a set of scene nodes for the body-ui to show the origin and lines extending to it's dimensions.
     * @param node the Spatial Entity (usually a reference organ) that the origin is defined by
     * @param includeLetters whether to show the keyboard letters associated with the origin points
     * @returns a set of scene nodes for the body-ui
     */
    function getOriginScene(node, includeLetters) {
        if (includeLetters === void 0) { includeLetters = false; }
        var sceneWidth = node.x_dimension / 1000;
        var sceneHeight = node.y_dimension / 1000;
        var sceneDepth = node.z_dimension / 1000;
        var originRadius = Math.max(sceneWidth, sceneHeight, sceneDepth) * 0.05;
        var lineRadius = originRadius * 0.1;
        return [
            // Origin Sphere
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginSphere',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'sphere',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).scale(originRadius),
                color: gray
            },
            // Origin X Axis
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginX',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sceneWidth / 2, 0, 0])
                    .rotateZ(core.toRadians(-90))
                    .scale([lineRadius, sceneWidth, lineRadius]),
                color: red
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([sceneWidth, 0, 0])
                    .rotateZ(core.toRadians(-90))
                    .scale([originRadius, originRadius * 3, originRadius]),
                color: red
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXALabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'A',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([-originRadius * 2, 0, 0]).scale(originRadius),
                color: red
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginXDLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'D',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([sceneWidth + originRadius * 2, 0, 0]).scale(originRadius),
                color: red
            },
            // Origin Y Axis
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginY',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([0, sceneHeight / 2, 0])
                    .scale([lineRadius, sceneHeight, lineRadius]),
                color: green
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([0, sceneHeight, 0])
                    .scale([originRadius, originRadius * 3, originRadius]),
                color: green
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYSLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'S',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([originRadius * 1.5, originRadius * 1.5, 0]).scale(originRadius),
                color: green
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginYWLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'W',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([0, sceneHeight + originRadius * 2, 0]).scale(originRadius),
                color: green
            },
            // Origin Z Axis
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZ',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cylinder',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([0, 0, sceneDepth / 2])
                    .rotateX(core.toRadians(90))
                    .scale([lineRadius, sceneDepth, lineRadius]),
                color: blue
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZCone',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'cone',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY)
                    .translate([0, 0, sceneDepth])
                    .rotateX(core.toRadians(90))
                    .scale([originRadius, originRadius * 3, originRadius]),
                color: blue
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZQLabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'Q',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([originRadius * 1.5, -originRadius * 1.5, 0]).scale(originRadius),
                color: blue
            },
            {
                '@id': 'http://purl.org/ccf/latest/ccf.owl#OriginZELabel',
                '@type': 'SpatialSceneNode',
                unpickable: true,
                geometry: 'text',
                text: 'E',
                transformMatrix: new core.Matrix4(core.Matrix4.IDENTITY).translate([0, 0, sceneDepth + originRadius * 2]).scale(originRadius),
                color: blue
            }
        ].filter(function (n) { return (includeLetters && n.geometry === 'text' && n.text) || !n.text; });
    }

    /*
     * Public API Surface of ccf
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CCFDatabase = CCFDatabase;
    exports.CCFDatabaseStatusTracker = CCFDatabaseStatusTracker;
    exports.CCFSpatialScene = CCFSpatialScene;
    exports.DEFAULT_CCF_DB_OPTIONS = DEFAULT_CCF_DB_OPTIONS;
    exports.addHubmapDataToStore = addHubmapDataToStore;
    exports.getOriginScene = getOriginScene;
    exports.getProbingSphereScene = getProbingSphereScene;
    exports.searchHubmap = searchHubmap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ccf-database.umd.js.map
