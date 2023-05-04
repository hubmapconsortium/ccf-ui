import { COORDINATE_SYSTEM, CompositeLayer, OrthographicView, OrbitView, LightingEffect, AmbientLight, Deck } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import { SimpleMeshLayer, ScenegraphLayer } from '@deck.gl/mesh-layers';
import { CubeGeometry, CylinderGeometry, ConeGeometry, SphereGeometry } from '@luma.gl/core';
import { Matrix4 } from '@math.gl/core';
import { __awaiter, __decorate } from 'tslib';
import { registerLoaders, parse, load } from '@loaders.gl/core';
import { DracoWorkerLoader, DracoLoader } from '@loaders.gl/draco';
import { GLTFLoader } from '@loaders.gl/gltf';
import { AABB, Vec3 } from 'cannon-es';
import bind from 'bind-decorator';
import { Subject, BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function traverseScene(scene, worldMatrix, visitor) {
    if (!worldMatrix) {
        worldMatrix = new Matrix4(Matrix4.IDENTITY);
    }
    const matrix = new Matrix4(Matrix4.IDENTITY);
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
            const rotationMatrix = new Matrix4(Matrix4.IDENTITY).fromQuaternion(scene.rotation);
            matrix.multiplyRight(rotationMatrix);
        }
        if (scene.scale) {
            matrix.scale(scene.scale);
        }
    }
    const modelMatrix = new Matrix4(worldMatrix).multiplyRight(matrix);
    if (visitor(scene, modelMatrix, worldMatrix) === false) {
        return false;
    }
    for (const child of (scene.nodes || scene.children || [])) {
        if (traverseScene(child, modelMatrix, visitor) === false) {
            return false;
        }
    }
    return true;
}

function registerGLTFLoaders() {
    registerLoaders([DracoWorkerLoader, GLTFLoader]);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function deriveScenegraph(scenegraphNodeName, gltf) {
    var _a;
    const scenegraphNode = (_a = gltf.nodes) === null || _a === void 0 ? void 0 : _a.find((n) => n.name === scenegraphNodeName);
    if (scenegraphNode) {
        let foundNodeInScene = false;
        for (const scene of gltf.scenes) {
            if (!foundNodeInScene) {
                traverseScene(scene, new Matrix4(Matrix4.IDENTITY), (child, modelMatrix) => {
                    if (child === scenegraphNode) {
                        child.matrix = modelMatrix;
                        child.translation = undefined;
                        child.rotation = undefined;
                        child.scale = undefined;
                        foundNodeInScene = true;
                        return false;
                    }
                    return true;
                });
            }
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
    return __awaiter(this, void 0, void 0, function* () {
        const gltfUrl = model.scenegraph;
        let gltfPromise;
        if (cache) {
            gltfPromise = cache[gltfUrl] || (cache[gltfUrl] = fetch(gltfUrl).then(r => r.blob()));
        }
        else {
            gltfPromise = fetch(gltfUrl);
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const gltf = yield parse(gltfPromise, GLTFLoader, { DracoLoader, gltf: { decompressMeshes: true, postProcess: true } });
        if (!gltf.nodes) {
            console.log('WARNING: Empty Scene', gltfUrl, gltf);
        }
        return deriveScenegraph(model.scenegraphNode, gltf);
    });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadGLTF2(scenegraphNodeName, gltfPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        return deriveScenegraph(scenegraphNodeName, yield gltfPromise);
    });
}
/* eslint-enable */

/* eslint-disable  */
function doCollisions(scene) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting Collisioning');
        const sourceBoxes = scene
            .filter(d => !d.scenegraph && d.geometry !== 'wireframe')
            .map(model => {
            const mat = new Matrix4(model.transformMatrix);
            const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
            const upperBound = mat.transformAsPoint([1, 1, 1], []);
            return {
                '@id': model['@id'],
                name: model.tooltip,
                entityId: model.entityId,
                bbox: new AABB({
                    lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                    upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
                })
            };
        });
        const targetBoxes = [];
        for (const model of scene.filter(d => !!d.scenegraph)) {
            const gltf = yield load(model.scenegraph, GLTFLoader, { DracoLoader, decompress: true, postProcess: true });
            for (const gltfScene of gltf.scenes) {
                traverseScene(gltfScene, new Matrix4(model.transformMatrix), (node, modelMatrix) => {
                    if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                        for (const primitive of node.mesh.primitives) {
                            if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                                const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                                const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                                targetBoxes.push({
                                    '@id': model['@id'],
                                    name: node.name,
                                    entityId: model.entityId,
                                    bbox: new AABB({
                                        lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                                        upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
                                    }),
                                    gltf
                                });
                            }
                        }
                    }
                    return true;
                });
            }
        }
        const report = [];
        const sad = [];
        for (const src of sourceBoxes) {
            const hits = [];
            for (const target of targetBoxes) {
                if (src.bbox.overlaps(target.bbox)) {
                    hits.push({ '@id': target['@id'], name: target.name });
                }
            }
            if (hits.length > 0) {
                report.push({
                    '@id': src.entityId,
                    name: src.name,
                    hits
                });
            }
            else {
                sad.push(src);
            }
        }
        console.log({ sourceBoxes, targetBoxes, report, sad, maxHits: Math.max(...report.map(r => r.hits.length)) });
        const csvReport = [];
        for (const hit of report) {
            csvReport.push({
                'Tissue ID': hit['@id'],
                'Tissue Name': hit.name,
                'Hit ID': '',
                'Hit Name': ''
            });
            for (const h of hit.hits) {
                csvReport.push({
                    'Tissue ID': hit['@id'],
                    'Tissue Name': hit.name,
                    'Hit ID': h['@id'],
                    'Hit Name': h.name
                });
            }
        }
        console.log(csvReport);
        return report;
    });
}
/* eslint-enable */

/* eslint-disable @typescript-eslint/no-unsafe-call */
function meshLayer(id, data, options) {
    if (!data || data.length === 0) {
        return undefined;
    }
    else {
        let mesh;
        switch (options.geometry) {
            case 'sphere':
                mesh = new SphereGeometry();
                break;
            case 'cone':
                mesh = new ConeGeometry();
                break;
            case 'cylinder':
                mesh = new CylinderGeometry();
                break;
            case 'cube':
            default:
                mesh = new CubeGeometry();
                break;
        }
        return new SimpleMeshLayer(Object.assign({
            id,
            pickable: true,
            autoHighlight: false,
            highlightColor: [30, 136, 229, 255],
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mesh: mesh,
            wireframe: false,
            getTransformMatrix: (d) => d.transformMatrix,
            getColor: (d) => d.color || [255, 255, 255, 0.9 * 255]
        }, options));
    }
}
function textLayer(id, data, options) {
    if (!data || data.length === 0) {
        return undefined;
    }
    else {
        return new TextLayer(Object.assign({
            id,
            pickable: true,
            data: data.map(d => (Object.assign(Object.assign({}, d), { position: new Matrix4(d.transformMatrix).getTranslation() }))),
            getText: (d) => d.text,
            getPosition: (d) => d.position,
            getColor: (d) => d.color
        }, options));
    }
}
class BodyUILayer extends CompositeLayer {
    initializeState() {
        const { data } = this.props;
        this.setState({ data: data !== null && data !== void 0 ? data : [], zoomOpacity: 0.8, doCollisions: false });
        registerGLTFLoaders();
    }
    renderLayers() {
        var _a, _b;
        const state = this.state;
        const geometries = {
            'sphere': [], 'cone': [], 'cylinder': [], 'cube': [], 'text': [], 'wireframe': [], 'scenegraph': []
        };
        for (const node of state.data) {
            const geometry = (_a = node.geometry) !== null && _a !== void 0 ? _a : 'cube';
            if (node.scenegraph) {
                geometries.scenegraph.push(node);
            }
            else if (geometries[geometry] !== undefined) {
                geometries[geometry].push(node);
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const url2gltf = {};
        for (const m of geometries.scenegraph) {
            if (m.scenegraph && m.scenegraphNode && !Object.prototype.hasOwnProperty.call(url2gltf, m.scenegraph)) {
                url2gltf[m.scenegraph] = loadGLTF({ scenegraph: m.scenegraph }, BodyUILayer.gltfCache);
            }
        }
        const layers = [];
        for (const [geometry, nodes] of Object.entries(geometries)) {
            if (geometry === 'scenegraph') {
                for (const model of nodes) {
                    layers.push(new ScenegraphLayer({
                        id: 'models-' + model['@id'],
                        opacity: model.zoomBasedOpacity ? state.zoomOpacity : (model.opacity !== undefined ? model.opacity : 1.0),
                        pickable: !model.unpickable,
                        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
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
            else if (geometry === 'text') {
                layers.push(textLayer('text', nodes.filter(n => n.unpickable), { pickable: false }));
                layers.push(textLayer('textPickable', nodes.filter(n => !n.unpickable), { pickable: true }));
            }
            else if (geometry === 'wireframe') {
                layers.push(meshLayer(geometry, nodes, { wireframe: true, pickable: false, geometry }));
            }
            else {
                layers.push(meshLayer(geometry, nodes.filter(n => n.unpickable), { wireframe: false, pickable: false, geometry }));
                layers.push(meshLayer(`${geometry}Pickable`, nodes.filter(n => !n.unpickable), { wireframe: false, pickable: true, geometry }));
            }
        }
        if (state.doCollisions) {
            doCollisions(state.data);
        }
        return layers.filter(l => !!l);
    }
    getPickingInfo(e) {
        return e.info;
    }
}
BodyUILayer.layerName = 'BodyUILayer';
BodyUILayer.gltfCache = {};

/* eslint-disable  */
function childNames(scene, names = []) {
    for (const child of (scene.nodes || scene.children || [])) {
        names.push(child.name);
        childNames(child, names);
    }
    return names;
}
function processSceneNodes(gltfUrl, worldMatrix, scenegraphNode) {
    return __awaiter(this, void 0, void 0, function* () {
        registerGLTFLoaders();
        const gltf = yield loadGLTF({ scenegraph: gltfUrl, scenegraphNode });
        const nodes = {};
        const gltfNodes = [];
        for (const scene of gltf.scenes) {
            worldMatrix = new Matrix4(worldMatrix || Matrix4.IDENTITY);
            traverseScene(scene, worldMatrix, (node, modelMatrix) => {
                const processedNode = {
                    '@id': (node.name || node.id),
                    '@type': 'ProcessedNode',
                    transformMatrix: new Matrix4(modelMatrix),
                    geometry: 'wireframe',
                    node
                };
                gltfNodes.push({
                    '@id': `GLTF:${processedNode['@id']}`,
                    '@type': 'GLTFNode',
                    scenegraph: gltfUrl,
                    scenegraphNode: processedNode['@id'],
                    transformMatrix: new Matrix4(worldMatrix || Matrix4.IDENTITY),
                    tooltip: (node.name || node.id),
                    color: [255, 255, 255, 255],
                    _lighting: 'pbr',
                    zoomBasedOpacity: true,
                    node
                });
                if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                    for (const primitive of node.mesh.primitives) {
                        if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                            const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                            const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                            processedNode.bbox = new AABB({
                                lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                                upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
                            });
                        }
                    }
                }
                nodes[processedNode['@id']] = processedNode;
                return true;
            });
        }
        for (const node of Object.values(nodes).filter(n => !n.bbox)) {
            for (const child of childNames(node.node).map(n => nodes[n]).filter(n => n.bbox)) {
                if (!node.bbox) {
                    node.bbox = child.bbox.clone();
                }
                else {
                    node.bbox.extend(child.bbox);
                }
            }
            if (!node.bbox) {
                delete nodes[node['@id']];
            }
        }
        for (const node of Object.values(nodes)) {
            const lb = node.bbox.lowerBound;
            const ub = node.bbox.upperBound;
            const size = node.size = ub.clone().vsub(lb);
            const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
            const center = node.center = lb.clone().vadd(halfSize);
            node.transformMatrix = new Matrix4(Matrix4.IDENTITY)
                .translate(center.toArray())
                .scale(halfSize.toArray());
        }
        for (const node of gltfNodes) {
            nodes[node['@id']] = node;
        }
        return nodes;
    });
}
/* eslint-enable */

/**
 * A convenience wrapper class for the CCF Body UI
 */
class BodyUI {
    constructor(deckProps) {
        var _a, _b, _c, _d, _e;
        this.deckProps = deckProps;
        this.bodyUILayer = new BodyUILayer({});
        this.nodeClickSubject = new Subject();
        this.nodeHoverStartSubject = new Subject();
        this.nodeHoverStopSubject = new Subject();
        this.sceneRotationSubject = new BehaviorSubject([0, 0]);
        this.nodeDragStartSubject = new Subject();
        this.nodeDragSubject = new Subject();
        this.nodeDragEndSubject = new Subject();
        this.nodeClick$ = this.nodeClickSubject.pipe(share());
        this.nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
        this.nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());
        this.sceneRotation$ = this.sceneRotationSubject.pipe(share());
        this.nodeDragStart$ = this.nodeDragStartSubject.pipe(share());
        this.nodeDrag$ = this.nodeDragSubject.pipe(share());
        this.nodeDragEnd$ = this.nodeDragEndSubject.pipe(share());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props = Object.assign(Object.assign({}, deckProps), { views: [deckProps.camera === 'orthographic' ? new OrthographicView({
                    flipY: false,
                    near: -1000
                }) : new OrbitView({ orbitAxis: 'Y' })], controller: deckProps.interactive !== undefined ? deckProps.interactive : true, layers: [this.bodyUILayer], onHover: this._onHover, onClick: this._onClick, onViewStateChange: this._onViewStateChange, onDragStart: this._onDragStart, onDrag: this._onDrag, onDragEnd: this._onDragEnd, getCursor: (e) => { var _a; return (_a = this.cursor) !== null && _a !== void 0 ? _a : (e.isDragging ? 'grabbing' : 'grab'); } });
        if (deckProps.legacyLighting) {
            // eslint-disable-next-line
            props.effects = [
                new LightingEffect({
                    ambientLight: new AmbientLight({
                        color: [255, 255, 255],
                        intensity: 10.0
                    })
                })
            ];
        }
        // eslint-disable-next-line
        this.deck = new Deck(props);
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
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!this.bodyUILayer.state) {
                // eslint-disable-next-line no-await-in-loop
                yield new Promise(r => {
                    setTimeout(r, 200);
                });
            }
        });
    }
    finalize() {
        this.deck.finalize();
    }
    setScene(data) {
        if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
            let zoomOpacity = this.bodyUILayer.state.zoomOpacity;
            let didZoom = false;
            for (const node of data) {
                if (node.zoomToOnLoad) {
                    this.zoomTo(node);
                    didZoom = true;
                }
            }
            zoomOpacity = didZoom ? 0.05 : zoomOpacity;
            if (!this.deckProps.debugSceneNodeProcessing) {
                this.bodyUILayer.setState({ data, zoomOpacity });
            }
            else {
                this.debugSceneNodeProcessing(data, zoomOpacity);
            }
        }
    }
    debugSceneNodeProcessing(data, zoomOpacity) {
        // const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Male/United/VHM_United_Color.glb';
        const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Female/United/VHF_United_Color.glb';
        // const gltfUrl = 'https://hubmapconsortium.github.io/hubmap-ontology/objects/VHF_United_v01_060420.glb';
        const gltfTransform = new Matrix4([0.076, 0, 0, 0, 0, 0.076, 1.6875389974302382e-17, 0, 0, -1.6875389974302382e-17, 0.076, 0, 0.49, 0.034, 0.11, 1]);
        processSceneNodes(gltfUrl, gltfTransform, 'VHF_Kidney_L_Low1').then((results) => {
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
            this.bodyUILayer.setState({ data, zoomOpacity });
        });
    }
    zoomTo(node) {
        const matrix = new Matrix4(node.transformMatrix);
        this.deck.setProps({
            viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { target: matrix.getTranslation(), rotationX: 0, rotationOrbit: 0, zoom: 11.5 })
        });
    }
    setRotation(value) {
        this.deck.setProps({
            viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { rotationOrbit: value })
        });
    }
    setRotationX(value) {
        this.deck.setProps({
            viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { rotationX: value })
        });
    }
    setZoom(value) {
        this.deck.setProps({
            viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { zoom: value })
        });
    }
    setTarget(value) {
        this.deck.setProps({
            viewState: Object.assign(Object.assign({}, this.deck.props.viewState), { target: value })
        });
    }
    setInteractive(value) {
        this.deck.setProps({
            controller: value
        });
    }
    _onHover(e) {
        const { lastHovered } = this;
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
    }
    _onClick(info, e) {
        var _a, _b;
        if (info.picked && info.object && info.object['@id']) {
            this.nodeClickSubject.next({ node: info.object, ctrlClick: (_b = (_a = e === null || e === void 0 ? void 0 : e.srcEvent) === null || _a === void 0 ? void 0 : _a.ctrlKey) !== null && _b !== void 0 ? _b : undefined });
        }
    }
    _onViewStateChange(event) {
        var _a;
        if ((_a = event.interactionState) === null || _a === void 0 ? void 0 : _a.isZooming) {
            const currentState = this.bodyUILayer.state;
            const zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 2, 0.05), 1.0);
            if (currentState.zoomOpacity !== zoomOpacity) {
                this.bodyUILayer.setState({ data: currentState.data, zoomOpacity });
            }
        }
        this.deck.setProps({ viewState: Object.assign({}, event.viewState) });
        this.sceneRotationSubject.next([event.viewState.rotationOrbit, event.viewState.rotationX]);
    }
    _onDragStart(info, e) {
        this._dragEvent(info, e, this.nodeDragStartSubject);
    }
    _onDrag(info, e) {
        this._dragEvent(info, e, this.nodeDragSubject);
    }
    _onDragEnd(info, e) {
        this._dragEvent(info, e, this.nodeDragEndSubject);
    }
    _dragEvent(info, e, subject) {
        var _a;
        if ((_a = info === null || info === void 0 ? void 0 : info.object) === null || _a === void 0 ? void 0 : _a['@id']) {
            subject.next({ node: info.object, info, e });
        }
    }
}
__decorate([
    bind
], BodyUI.prototype, "_onHover", null);
__decorate([
    bind
], BodyUI.prototype, "_onClick", null);
__decorate([
    bind
], BodyUI.prototype, "_onViewStateChange", null);
__decorate([
    bind
], BodyUI.prototype, "_onDragStart", null);
__decorate([
    bind
], BodyUI.prototype, "_onDrag", null);
__decorate([
    bind
], BodyUI.prototype, "_onDragEnd", null);

function simplifyScene(nodes) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const gltfCache = {};
        const gltfUrls = new Set(nodes.map(n => n.scenegraph).filter(n => !!n));
        for (const gltfUrl of gltfUrls) {
            // eslint-disable-next-line no-await-in-loop
            gltfCache[gltfUrl] = yield loadGLTF({ scenegraph: gltfUrl });
        }
        const newNodes = nodes.filter(n => !n.scenegraph);
        for (const model of nodes.filter(n => n.scenegraph)) {
            const gltf = gltfCache[model.scenegraph];
            const bbox = new AABB();
            let worldMatrix = new Matrix4(model.transformMatrix);
            /* eslint-disable  */
            if (model.scenegraphNode) {
                const scenegraphNode = model.scenegraphNode ? gltf.nodes.find((n) => n.name === model.scenegraphNode) : undefined;
                let foundNodeInScene = false;
                for (const scene of gltf.scenes) {
                    if (!foundNodeInScene) {
                        traverseScene(scene, new Matrix4(model.transformMatrix), (child, modelMatrix) => {
                            if (child === scenegraphNode) {
                                worldMatrix = modelMatrix;
                                foundNodeInScene = true;
                                return false;
                            }
                            return true;
                        });
                    }
                }
                gltf.scene = {
                    id: model.scenegraphNode,
                    name: model.scenegraphNode,
                    nodes: [scenegraphNode]
                };
            }
            traverseScene(gltf.scene, worldMatrix, (node, modelMatrix) => {
                if (node.mesh && node.mesh.primitives && node.mesh.primitives.length > 0) {
                    for (const primitive of node.mesh.primitives) {
                        if (primitive.attributes.POSITION && primitive.attributes.POSITION.min) {
                            const lowerBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.min, []);
                            const upperBound = modelMatrix.transformAsPoint(primitive.attributes.POSITION.max, []);
                            const innerBbox = new AABB({
                                lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
                                upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
                            });
                            bbox.extend(innerBbox);
                        }
                    }
                }
                return true;
            });
            /* eslint-enable */
            const size = bbox.upperBound.clone().vsub(bbox.lowerBound);
            const halfSize = size.clone().vmul(new Vec3(0.5, 0.5, 0.5));
            const position = bbox.lowerBound.clone().vadd(halfSize);
            const transformMatrix = new Matrix4(Matrix4.IDENTITY)
                .translate(position.toArray())
                .scale(halfSize.toArray());
            const newNode = Object.assign(Object.assign({}, model), { transformMatrix, geometry: 'wireframe' });
            delete newNode.scenegraph;
            delete newNode.scenegraphNode;
            newNodes.push(newNode);
        }
        return newNodes;
    });
}

// Hack to support deck.gl and other typings

/**
 * Generated bundle index. Do not edit.
 */

export { BodyUI, BodyUILayer, deriveScenegraph, doCollisions, loadGLTF, loadGLTF2, processSceneNodes, registerGLTFLoaders, simplifyScene, traverseScene };
//# sourceMappingURL=ccf-body-ui.js.map
