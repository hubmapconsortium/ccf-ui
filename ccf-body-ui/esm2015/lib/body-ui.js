import { __awaiter, __decorate } from "tslib";
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
import { AmbientLight, Deck, LightingEffect, OrbitView, OrthographicView } from '@deck.gl/core';
import { Matrix4 } from '@math.gl/core';
import bind from 'bind-decorator';
import { BehaviorSubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { BodyUILayer } from './body-ui-layer';
import { processSceneNodes } from './util/process-scene-nodes';
/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS11aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZi1ib2R5LXVpL3NyYy9saWIvYm9keS11aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsa0VBQWtFO0FBQ2xFLHVEQUF1RDtBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXlDL0Q7O0dBRUc7QUFDSCxNQUFNLE9BQU8sTUFBTTtJQXVCakIsWUFBb0IsU0FBK0I7O1FBQS9CLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBckJsQyxnQkFBVyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWxDLHFCQUFnQixHQUFHLElBQUksT0FBTyxFQUFrQixDQUFDO1FBQ2pELDBCQUFxQixHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ3hELHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ3ZELHlCQUFvQixHQUFHLElBQUksZUFBZSxDQUFtQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLHlCQUFvQixHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO1FBQ3BELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFDL0Ms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O0lBREMsSUFBSTt3Q0FHSiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtYXNzZXJ0aW9ucyAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L21lbWJlci1vcmRlcmluZyAqL1xuaW1wb3J0IHsgQW1iaWVudExpZ2h0LCBEZWNrLCBMaWdodGluZ0VmZmVjdCwgT3JiaXRWaWV3LCBPcnRob2dyYXBoaWNWaWV3IH0gZnJvbSAnQGRlY2suZ2wvY29yZSc7XG5pbXBvcnQgeyBWaWV3U3RhdGVQcm9wcyB9IGZyb20gJ0BkZWNrLmdsL2NvcmUvbGliL2RlY2snO1xuaW1wb3J0IHsgTWF0cml4NCB9IGZyb20gJ0BtYXRoLmdsL2NvcmUnO1xuaW1wb3J0IGJpbmQgZnJvbSAnYmluZC1kZWNvcmF0b3InO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQm9keVVJTGF5ZXIgfSBmcm9tICcuL2JvZHktdWktbGF5ZXInO1xuaW1wb3J0IHsgU3BhdGlhbFNjZW5lTm9kZSB9IGZyb20gJy4vc2hhcmVkL3NwYXRpYWwtc2NlbmUtbm9kZSc7XG5pbXBvcnQgeyBwcm9jZXNzU2NlbmVOb2RlcyB9IGZyb20gJy4vdXRpbC9wcm9jZXNzLXNjZW5lLW5vZGVzJztcblxuXG5pbnRlcmZhY2UgQm9keVVJVmlld1N0YXRlUHJvcHMgZXh0ZW5kcyBWaWV3U3RhdGVQcm9wcyB7XG4gIG9yYml0QXhpcz86IHN0cmluZztcbiAgdGFyZ2V0PzogTWF0cml4NCB8IG51bWJlcltdO1xuICB6b29tOiBudW1iZXI7XG4gIHJvdGF0aW9uT3JiaXQ6IG51bWJlcjtcbiAgcm90YXRpb25YOiBudW1iZXI7XG4gIGNhbWVyYTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJvZHlVSVByb3BzIHtcbiAgaWQ6IHN0cmluZztcbiAgY2FudmFzOiBzdHJpbmcgfCBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgZGVidWdTY2VuZU5vZGVQcm9jZXNzaW5nPzogYm9vbGVhbjtcbiAgdGFyZ2V0OiBNYXRyaXg0IHwgbnVtYmVyW107XG4gIGludGVyYWN0aXZlOiBib29sZWFuO1xuICByb3RhdGlvbjogbnVtYmVyO1xuICBtaW5Sb3RhdGlvblg6IG51bWJlcjtcbiAgbWF4Um90YXRpb25YOiBudW1iZXI7XG4gIHpvb206IG51bWJlcjtcbiAgbGVnYWN5TGlnaHRpbmc/OiBib29sZWFuO1xuICBjYW1lcmE6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQaWNrSW5mbzxEPiB7XG4gIGxheWVyOiB1bmtub3duO1xuICBpbmRleDogbnVtYmVyO1xuICBvYmplY3Q6IEQ7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBjb29yZGluYXRlPzogdW5rbm93bjtcbiAgcGlja2VkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgTm9kZURyYWdFdmVudCA9IHsgbm9kZTogU3BhdGlhbFNjZW5lTm9kZTsgaW5mbzogUGlja0luZm88U3BhdGlhbFNjZW5lTm9kZT47IGU6IE1vdXNlRXZlbnQgfTtcblxuZXhwb3J0IHR5cGUgTm9kZUNsaWNrRXZlbnQgPSB7IG5vZGU6IFNwYXRpYWxTY2VuZU5vZGU7IGN0cmxDbGljazogYm9vbGVhbiB9O1xuXG4vKipcbiAqIEEgY29udmVuaWVuY2Ugd3JhcHBlciBjbGFzcyBmb3IgdGhlIENDRiBCb2R5IFVJXG4gKi9cbmV4cG9ydCBjbGFzcyBCb2R5VUkge1xuICBkZWNrOiBEZWNrO1xuICBwcml2YXRlIHJlYWRvbmx5IGJvZHlVSUxheWVyID0gbmV3IEJvZHlVSUxheWVyKHt9KTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG5vZGVDbGlja1N1YmplY3QgPSBuZXcgU3ViamVjdDxOb2RlQ2xpY2tFdmVudD4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlSG92ZXJTdGFydFN1YmplY3QgPSBuZXcgU3ViamVjdDxTcGF0aWFsU2NlbmVOb2RlPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IG5vZGVIb3ZlclN0b3BTdWJqZWN0ID0gbmV3IFN1YmplY3Q8U3BhdGlhbFNjZW5lTm9kZT4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzY2VuZVJvdGF0aW9uU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8W251bWJlciwgbnVtYmVyXT4oWzAsIDBdKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlRHJhZ1N0YXJ0U3ViamVjdCA9IG5ldyBTdWJqZWN0PE5vZGVEcmFnRXZlbnQ+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbm9kZURyYWdTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Tm9kZURyYWdFdmVudD4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlRHJhZ0VuZFN1YmplY3QgPSBuZXcgU3ViamVjdDxOb2RlRHJhZ0V2ZW50PigpO1xuXG4gIHJlYWRvbmx5IG5vZGVDbGljayQgPSB0aGlzLm5vZGVDbGlja1N1YmplY3QucGlwZShzaGFyZSgpKTtcbiAgcmVhZG9ubHkgbm9kZUhvdmVyU3RhcnQkID0gdGhpcy5ub2RlSG92ZXJTdGFydFN1YmplY3QucGlwZShzaGFyZSgpKTtcbiAgcmVhZG9ubHkgbm9kZUhvdmVyU3RvcCQgPSB0aGlzLm5vZGVIb3ZlclN0b3BTdWJqZWN0LnBpcGUoc2hhcmUoKSk7XG4gIHJlYWRvbmx5IHNjZW5lUm90YXRpb24kID0gdGhpcy5zY2VuZVJvdGF0aW9uU3ViamVjdC5waXBlKHNoYXJlKCkpO1xuICByZWFkb25seSBub2RlRHJhZ1N0YXJ0JCA9IHRoaXMubm9kZURyYWdTdGFydFN1YmplY3QucGlwZShzaGFyZSgpKTtcbiAgcmVhZG9ubHkgbm9kZURyYWckID0gdGhpcy5ub2RlRHJhZ1N1YmplY3QucGlwZShzaGFyZSgpKTtcbiAgcmVhZG9ubHkgbm9kZURyYWdFbmQkID0gdGhpcy5ub2RlRHJhZ0VuZFN1YmplY3QucGlwZShzaGFyZSgpKTtcblxuICBwcml2YXRlIGN1cnNvcj86IHN0cmluZztcbiAgcHJpdmF0ZSBsYXN0SG92ZXJlZD86IFNwYXRpYWxTY2VuZU5vZGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkZWNrUHJvcHM6IFBhcnRpYWw8Qm9keVVJUHJvcHM+KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBwcm9wczogYW55ID0ge1xuICAgICAgLi4uZGVja1Byb3BzLFxuICAgICAgdmlld3M6IFsgZGVja1Byb3BzLmNhbWVyYSA9PT0gJ29ydGhvZ3JhcGhpYycgPyBuZXcgT3J0aG9ncmFwaGljVmlldyh7XG4gICAgICAgIGZsaXBZOiBmYWxzZSxcbiAgICAgICAgbmVhcjogLTEwMDBcbiAgICAgIH0pIDogbmV3IE9yYml0Vmlldyh7IG9yYml0QXhpczogJ1knIH0pIF0sXG4gICAgICBjb250cm9sbGVyOiBkZWNrUHJvcHMuaW50ZXJhY3RpdmUgIT09IHVuZGVmaW5lZCA/IGRlY2tQcm9wcy5pbnRlcmFjdGl2ZSA6IHRydWUsXG4gICAgICBsYXllcnM6IFsgdGhpcy5ib2R5VUlMYXllciBdLFxuICAgICAgb25Ib3ZlcjogdGhpcy5fb25Ib3ZlcixcbiAgICAgIG9uQ2xpY2s6IHRoaXMuX29uQ2xpY2ssXG4gICAgICBvblZpZXdTdGF0ZUNoYW5nZTogdGhpcy5fb25WaWV3U3RhdGVDaGFuZ2UsXG4gICAgICBvbkRyYWdTdGFydDogdGhpcy5fb25EcmFnU3RhcnQsXG4gICAgICBvbkRyYWc6IHRoaXMuX29uRHJhZyxcbiAgICAgIG9uRHJhZ0VuZDogdGhpcy5fb25EcmFnRW5kLFxuICAgICAgZ2V0Q3Vyc29yOiAoZTogeyBpc0RyYWdnaW5nOiBib29sZWFuIH0pID0+IHRoaXMuY3Vyc29yID8/IChlLmlzRHJhZ2dpbmcgPyAnZ3JhYmJpbmcnIDogJ2dyYWInKVxuICAgIH07XG4gICAgaWYgKGRlY2tQcm9wcy5sZWdhY3lMaWdodGluZykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBwcm9wcy5lZmZlY3RzID0gW1xuICAgICAgICBuZXcgTGlnaHRpbmdFZmZlY3Qoe1xuICAgICAgICAgIGFtYmllbnRMaWdodDogbmV3IEFtYmllbnRMaWdodCh7XG4gICAgICAgICAgICBjb2xvcjogWzI1NSwgMjU1LCAyNTVdLFxuICAgICAgICAgICAgaW50ZW5zaXR5OiAxMC4wXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIF07XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRoaXMuZGVjayA9IG5ldyBEZWNrKHByb3BzKTtcbiAgICB0aGlzLmRlY2suc2V0UHJvcHMoe1xuICAgICAgdmlld1N0YXRlOiB7XG4gICAgICAgIG9yYml0QXhpczogJ1knLFxuICAgICAgICBtaW5Sb3RhdGlvblg6IGRlY2tQcm9wcy5taW5Sb3RhdGlvblggPz8gLTE1LFxuICAgICAgICBtYXhSb3RhdGlvblg6IGRlY2tQcm9wcy5tYXhSb3RhdGlvblggPz8gMTUsXG4gICAgICAgIHRhcmdldDogZGVja1Byb3BzLnRhcmdldCA/PyBbMC41LCAwLjUsIDBdLFxuICAgICAgICByb3RhdGlvblg6IDAsXG4gICAgICAgIHJvdGF0aW9uT3JiaXQ6IGRlY2tQcm9wcy5yb3RhdGlvbiA/PyAwLFxuICAgICAgICB6b29tOiBkZWNrUHJvcHMuem9vbSA/PyA5LjUsXG4gICAgICAgIGNhbWVyYTogZGVja1Byb3BzLmNhbWVyYVxuICAgICAgfSBhcyBCb2R5VUlWaWV3U3RhdGVQcm9wc1xuICAgIH0pO1xuICAgIGlmIChkZWNrUHJvcHMucm90YXRpb24pIHtcbiAgICAgIHRoaXMuc2NlbmVSb3RhdGlvblN1YmplY3QubmV4dChbZGVja1Byb3BzLnJvdGF0aW9uLCAwXSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaW5pdGlhbGl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB3aGlsZSAoIXRoaXMuYm9keVVJTGF5ZXIuc3RhdGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyLCAyMDApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZmluYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWNrLmZpbmFsaXplKCk7XG4gIH1cblxuICBzZXRTY2VuZShkYXRhOiBTcGF0aWFsU2NlbmVOb2RlW10pOiB2b2lkIHtcbiAgICBpZiAoZGF0YT8ubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IHpvb21PcGFjaXR5ID0gKHRoaXMuYm9keVVJTGF5ZXIuc3RhdGUgYXMgeyB6b29tT3BhY2l0eTogbnVtYmVyIH0pLnpvb21PcGFjaXR5O1xuICAgICAgbGV0IGRpZFpvb20gPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBkYXRhKSB7XG4gICAgICAgIGlmIChub2RlLnpvb21Ub09uTG9hZCkge1xuICAgICAgICAgIHRoaXMuem9vbVRvKG5vZGUpO1xuICAgICAgICAgIGRpZFpvb20gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB6b29tT3BhY2l0eSA9IGRpZFpvb20gPyAwLjA1IDogem9vbU9wYWNpdHk7XG4gICAgICBpZiAoIXRoaXMuZGVja1Byb3BzLmRlYnVnU2NlbmVOb2RlUHJvY2Vzc2luZykge1xuICAgICAgICB0aGlzLmJvZHlVSUxheWVyLnNldFN0YXRlKHsgZGF0YSwgem9vbU9wYWNpdHkgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnU2NlbmVOb2RlUHJvY2Vzc2luZyhkYXRhLCB6b29tT3BhY2l0eSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVidWdTY2VuZU5vZGVQcm9jZXNzaW5nKGRhdGE6IFNwYXRpYWxTY2VuZU5vZGVbXSwgem9vbU9wYWNpdHk6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIGNvbnN0IGdsdGZVcmwgPSAnaHR0cHM6Ly9odWJtYXBjb25zb3J0aXVtLmdpdGh1Yi5pby9jY2YtM2QtcmVmZXJlbmNlLW9iamVjdC1saWJyYXJ5L1ZIX01hbGUvVW5pdGVkL1ZITV9Vbml0ZWRfQ29sb3IuZ2xiJztcbiAgICBjb25zdCBnbHRmVXJsID0gJ2h0dHBzOi8vaHVibWFwY29uc29ydGl1bS5naXRodWIuaW8vY2NmLTNkLXJlZmVyZW5jZS1vYmplY3QtbGlicmFyeS9WSF9GZW1hbGUvVW5pdGVkL1ZIRl9Vbml0ZWRfQ29sb3IuZ2xiJztcbiAgICAvLyBjb25zdCBnbHRmVXJsID0gJ2h0dHBzOi8vaHVibWFwY29uc29ydGl1bS5naXRodWIuaW8vaHVibWFwLW9udG9sb2d5L29iamVjdHMvVkhGX1VuaXRlZF92MDFfMDYwNDIwLmdsYic7XG4gICAgY29uc3QgZ2x0ZlRyYW5zZm9ybSA9IG5ldyBNYXRyaXg0KFswLjA3NiwwLDAsMCwwLDAuMDc2LDEuNjg3NTM4OTk3NDMwMjM4MmUtMTcsMCwwLC0xLjY4NzUzODk5NzQzMDIzODJlLTE3LDAuMDc2LDAsMC40OSwwLjAzNCwwLjExLDFdKTtcbiAgICBwcm9jZXNzU2NlbmVOb2RlcyhnbHRmVXJsLCBnbHRmVHJhbnNmb3JtLCAnVkhGX0tpZG5leV9MX0xvdzEnKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygncmVzdWx0cycsIHJlc3VsdHMpO1xuICAgICAgY29uc29sZS5sb2coJ2RhdGEnLCBkYXRhKTtcbiAgICAgIC8vIGRhdGEgPSBPYmplY3QudmFsdWVzKHJlc3VsdHMpO1xuICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KE9iamVjdC52YWx1ZXMocmVzdWx0cykpO1xuICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgJ0BpZCc6ICdURVNUJyxcbiAgICAgICAgJ0B0eXBlJzogJ1RFU1QnLFxuICAgICAgICBzY2VuZWdyYXBoOiBnbHRmVXJsLFxuICAgICAgICBzY2VuZWdyYXBoTm9kZTogJ1ZIRl9LaWRuZXlfUl9Mb3cnLFxuICAgICAgICB0cmFuc2Zvcm1NYXRyaXg6IGdsdGZUcmFuc2Zvcm0sXG4gICAgICAgIGNvbG9yOiBbMjU1LCAyNTUsIDI1NSwgMjAwXSxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICAgICAgICBfbGlnaHRpbmc6ICdwYnInLFxuICAgICAgICB6b29tQmFzZWRPcGFjaXR5OiBmYWxzZVxuICAgICAgfSk7XG4gICAgICB0aGlzLmJvZHlVSUxheWVyLnNldFN0YXRlKHsgZGF0YSwgem9vbU9wYWNpdHkgfSk7XG4gICAgfSk7XG4gIH1cblxuICB6b29tVG8obm9kZTogU3BhdGlhbFNjZW5lTm9kZSk6IHZvaWQge1xuICAgIGNvbnN0IG1hdHJpeCA9IG5ldyBNYXRyaXg0KG5vZGUudHJhbnNmb3JtTWF0cml4KTtcbiAgICB0aGlzLmRlY2suc2V0UHJvcHMoe1xuICAgICAgdmlld1N0YXRlOiB7XG4gICAgICAgIC4uLnRoaXMuZGVjay5wcm9wcy52aWV3U3RhdGUsXG4gICAgICAgIHRhcmdldDogbWF0cml4LmdldFRyYW5zbGF0aW9uKCksXG4gICAgICAgIHJvdGF0aW9uWDogMCxcbiAgICAgICAgcm90YXRpb25PcmJpdDogMCxcbiAgICAgICAgem9vbTogMTEuNSxcbiAgICAgIH0gYXMgQm9keVVJVmlld1N0YXRlUHJvcHNcbiAgICB9KTtcbiAgfVxuXG4gIHNldFJvdGF0aW9uKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRlY2suc2V0UHJvcHMoe1xuICAgICAgdmlld1N0YXRlOiB7XG4gICAgICAgIC4uLnRoaXMuZGVjay5wcm9wcy52aWV3U3RhdGUsXG4gICAgICAgIHJvdGF0aW9uT3JiaXQ6IHZhbHVlXG4gICAgICB9IGFzIEJvZHlVSVZpZXdTdGF0ZVByb3BzXG4gICAgfSk7XG4gIH1cblxuICBzZXRSb3RhdGlvblgodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGVjay5zZXRQcm9wcyh7XG4gICAgICB2aWV3U3RhdGU6IHtcbiAgICAgICAgLi4udGhpcy5kZWNrLnByb3BzLnZpZXdTdGF0ZSxcbiAgICAgICAgcm90YXRpb25YOiB2YWx1ZVxuICAgICAgfSBhcyBCb2R5VUlWaWV3U3RhdGVQcm9wc1xuICAgIH0pO1xuICB9XG5cbiAgc2V0Wm9vbSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5kZWNrLnNldFByb3BzKHtcbiAgICAgIHZpZXdTdGF0ZToge1xuICAgICAgICAuLi50aGlzLmRlY2sucHJvcHMudmlld1N0YXRlLFxuICAgICAgICB6b29tOiB2YWx1ZVxuICAgICAgfSBhcyBCb2R5VUlWaWV3U3RhdGVQcm9wc1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VGFyZ2V0KHZhbHVlOiBudW1iZXJbXSk6IHZvaWQge1xuICAgIHRoaXMuZGVjay5zZXRQcm9wcyh7XG4gICAgICB2aWV3U3RhdGU6IHtcbiAgICAgICAgLi4udGhpcy5kZWNrLnByb3BzLnZpZXdTdGF0ZSxcbiAgICAgICAgdGFyZ2V0OiB2YWx1ZVxuICAgICAgfSBhcyBCb2R5VUlWaWV3U3RhdGVQcm9wc1xuICAgIH0pO1xuICB9XG5cbiAgc2V0SW50ZXJhY3RpdmUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRlY2suc2V0UHJvcHMoe1xuICAgICAgY29udHJvbGxlcjogdmFsdWVcbiAgICB9KTtcbiAgfVxuXG4gIEBiaW5kXG4gIHByaXZhdGUgX29uSG92ZXIoZTogeyBwaWNrZWQ6IGJvb2xlYW47IG9iamVjdDogU3BhdGlhbFNjZW5lTm9kZSB9KTogdm9pZCB7XG4gICAgY29uc3QgeyBsYXN0SG92ZXJlZCB9ID0gdGhpcztcbiAgICB0aGlzLmN1cnNvciA9IGUucGlja2VkID8gJ3BvaW50ZXInIDogdW5kZWZpbmVkO1xuICAgIGlmIChlLnBpY2tlZCAmJiBlLm9iamVjdCAmJiBlLm9iamVjdFsnQGlkJ10pIHtcbiAgICAgIGlmIChsYXN0SG92ZXJlZCAhPT0gZS5vYmplY3QpIHtcbiAgICAgICAgaWYgKGxhc3RIb3ZlcmVkKSB7XG4gICAgICAgICAgdGhpcy5ub2RlSG92ZXJTdG9wU3ViamVjdC5uZXh0KGxhc3RIb3ZlcmVkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RIb3ZlcmVkID0gZS5vYmplY3Q7XG4gICAgICAgIHRoaXMubm9kZUhvdmVyU3RhcnRTdWJqZWN0Lm5leHQoZS5vYmplY3QpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGFzdEhvdmVyZWQpIHtcbiAgICAgIHRoaXMubm9kZUhvdmVyU3RvcFN1YmplY3QubmV4dChsYXN0SG92ZXJlZCk7XG4gICAgICB0aGlzLmxhc3RIb3ZlcmVkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIEBiaW5kXG4gIHByaXZhdGUgX29uQ2xpY2soaW5mbzogUGlja0luZm88U3BhdGlhbFNjZW5lTm9kZT4sIGU6IHsgc3JjRXZlbnQ6IHsgY3RybEtleTogYm9vbGVhbiB9IH0pOiB2b2lkIHtcbiAgICBpZiAoaW5mby5waWNrZWQgJiYgaW5mby5vYmplY3QgJiYgaW5mby5vYmplY3RbJ0BpZCddKSB7XG4gICAgICB0aGlzLm5vZGVDbGlja1N1YmplY3QubmV4dCh7IG5vZGU6IGluZm8ub2JqZWN0LCBjdHJsQ2xpY2s6IGU/LnNyY0V2ZW50Py5jdHJsS2V5ID8/IHVuZGVmaW5lZCB9KTtcbiAgICB9XG4gIH1cblxuICBAYmluZFxuICBwcml2YXRlIF9vblZpZXdTdGF0ZUNoYW5nZShldmVudDogeyBpbnRlcmFjdGlvblN0YXRlOiB7IGlzWm9vbWluZzogYm9vbGVhbiB9OyB2aWV3U3RhdGU6IEJvZHlVSVZpZXdTdGF0ZVByb3BzIH0pOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuaW50ZXJhY3Rpb25TdGF0ZT8uaXNab29taW5nKSB7XG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLmJvZHlVSUxheWVyLnN0YXRlIGFzIHsgem9vbU9wYWNpdHk6IG51bWJlcjsgZGF0YTogdW5rbm93biB9O1xuICAgICAgY29uc3Qgem9vbU9wYWNpdHkgPSBNYXRoLm1pbihNYXRoLm1heCgxIC0gKGV2ZW50LnZpZXdTdGF0ZS56b29tIC0gOC45KSAvIDIsIDAuMDUpLCAxLjApO1xuICAgICAgaWYgKGN1cnJlbnRTdGF0ZS56b29tT3BhY2l0eSAhPT0gem9vbU9wYWNpdHkpIHtcbiAgICAgICAgdGhpcy5ib2R5VUlMYXllci5zZXRTdGF0ZSh7IGRhdGE6IGN1cnJlbnRTdGF0ZS5kYXRhLCB6b29tT3BhY2l0eSB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZWNrLnNldFByb3BzKHsgdmlld1N0YXRlOiB7IC4uLmV2ZW50LnZpZXdTdGF0ZSB9IH0pO1xuICAgIHRoaXMuc2NlbmVSb3RhdGlvblN1YmplY3QubmV4dChbZXZlbnQudmlld1N0YXRlLnJvdGF0aW9uT3JiaXQsIGV2ZW50LnZpZXdTdGF0ZS5yb3RhdGlvblhdKTtcbiAgfVxuXG4gIEBiaW5kXG4gIHByaXZhdGUgX29uRHJhZ1N0YXJ0KGluZm86IFBpY2tJbmZvPFNwYXRpYWxTY2VuZU5vZGU+LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZHJhZ0V2ZW50KGluZm8sIGUsIHRoaXMubm9kZURyYWdTdGFydFN1YmplY3QpO1xuICB9XG5cbiAgQGJpbmRcbiAgcHJpdmF0ZSBfb25EcmFnKGluZm86IFBpY2tJbmZvPFNwYXRpYWxTY2VuZU5vZGU+LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZHJhZ0V2ZW50KGluZm8sIGUsIHRoaXMubm9kZURyYWdTdWJqZWN0KTtcbiAgfVxuXG4gIEBiaW5kXG4gIHByaXZhdGUgX29uRHJhZ0VuZChpbmZvOiBQaWNrSW5mbzxTcGF0aWFsU2NlbmVOb2RlPiwgZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2RyYWdFdmVudChpbmZvLCBlLCB0aGlzLm5vZGVEcmFnRW5kU3ViamVjdCk7XG4gIH1cblxuICBwcml2YXRlIF9kcmFnRXZlbnQoaW5mbzogUGlja0luZm88U3BhdGlhbFNjZW5lTm9kZT4sIGU6IE1vdXNlRXZlbnQsIHN1YmplY3Q6IFN1YmplY3Q8Tm9kZURyYWdFdmVudD4pOiB2b2lkIHtcbiAgICBpZiAoaW5mbz8ub2JqZWN0Py5bJ0BpZCddKSB7XG4gICAgICBzdWJqZWN0Lm5leHQoeyBub2RlOiBpbmZvLm9iamVjdCwgaW5mbywgZSB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==