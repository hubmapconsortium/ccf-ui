import { Deck, OrbitView } from '@deck.gl/core';
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { Matrix4 } from '@math.gl/core';
import bind from 'bind-decorator';
import { BehaviorSubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

import { BodyUILayer } from './body-ui-layer';
import { SpatialSceneNode } from './shared/spatial-scene-node';
import { processSceneNodes } from './util/process-scene-nodes';


interface BodyUIViewStateProps extends ViewStateProps {
  orbitAxis?: string;
  target?: Matrix4 | number[];
  zoom: number;
  rotationOrbit: number;
}

export interface BodyUIProps {
  id: string;
  canvas: string | HTMLCanvasElement;
  parent: HTMLElement;
  debugSceneNodeProcessing?: boolean;
  target: Matrix4 | number[];
  interactive: boolean;
  rotation: number;
}

/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
  deck: Deck;
  private readonly bodyUILayer = new BodyUILayer({});

  private readonly nodeClickSubject = new Subject<{node: SpatialSceneNode, ctrlClick: boolean}>();
  private readonly nodeHoverStartSubject = new Subject<SpatialSceneNode>();
  private readonly nodeHoverStopSubject = new Subject<SpatialSceneNode>();
  private readonly sceneRotationSubject = new BehaviorSubject<number>(0);

  readonly nodeClick$ = this.nodeClickSubject.pipe(share());
  readonly nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
  readonly nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());
  readonly sceneRotation$ = this.sceneRotationSubject.pipe(share());

  private cursor?: string;
  private lastHovered?: SpatialSceneNode;

  constructor(private deckProps: Partial<BodyUIProps>) {
    const props = {
      ...deckProps,
      views: [ new OrbitView({}) ],
      controller: deckProps.interactive !== undefined ? deckProps.interactive : true,
      layers: [ this.bodyUILayer ],
      onHover: this._onHover,
      onClick: this._onClick,
      onViewStateChange: this._onViewStateChange,
      getCursor: (e: {isDragging: boolean}) => this.cursor || (e.isDragging ? 'grabbing' : 'grab')
    };
    // tslint:disable-next-line: no-any
    this.deck = new Deck(props as any);
    this.deck.setProps({
      viewState: {
        orbitAxis: 'Y',
        minRotationX: -15,
        maxRotationX: 15,
        target: deckProps.target || [0.5, 0.5, 0],
        rotationX: 0,
        rotationOrbit: deckProps.rotation || 0,
        zoom: 9.5
      } as BodyUIViewStateProps
    });
    if (deckProps.rotation) {
      this.sceneRotationSubject.next(deckProps.rotation);
    }
  }

  async initialize(): Promise<void> {
    while (!this.bodyUILayer.state) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  setScene(data: SpatialSceneNode[]): void {
    if (data?.length > 0) {
      let zoomOpacity = (this.bodyUILayer.state as {zoomOpacity: number}).zoomOpacity;
      let didZoom = false;
      for (const node of data) {
        if (node.zoomToOnLoad) {
          this.zoomTo(node);
          didZoom = true;
        }
      }
      zoomOpacity = didZoom ? 0.5 : zoomOpacity;
      if (!this.deckProps.debugSceneNodeProcessing) {
        this.bodyUILayer.setState({data, zoomOpacity});
      } else {
        this.debugSceneNodeProcessing(data, zoomOpacity);
      }
    }
  }

  debugSceneNodeProcessing(data: SpatialSceneNode[], zoomOpacity: number): void {
    // const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Male/United/VHM_United_Color.glb';
    const gltfUrl = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/VH_Female/United/VHF_United_Color.glb';
    // const gltfUrl = 'https://hubmapconsortium.github.io/hubmap-ontology/objects/VHF_United_v01_060420.glb';
    const gltfTransform = new Matrix4([0.076,0,0,0,0,0.076,1.6875389974302382e-17,0,0,-1.6875389974302382e-17,0.076,0,0.49,0.034,0.11,1]);
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
          _lighting: 'pbr',
          zoomBasedOpacity: false
        });
        this.bodyUILayer.setState({data, zoomOpacity});
    });
  }

  zoomTo(node: SpatialSceneNode): void {
    const matrix = new Matrix4(node.transformMatrix);
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        target: matrix.getTranslation(),
        rotationX: 0,
        rotationOrbit: 0,
        zoom: 11.5,
      } as BodyUIViewStateProps
    });
  }

  setRotation(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        rotationOrbit: value
      } as BodyUIViewStateProps
    });
  }

  setInteractive(value: boolean): void {
    this.deck.setProps({
      controller: value
    });
  }

  @bind
  private _onHover(e: {picked: boolean, object: SpatialSceneNode}): void {
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
    } else if (lastHovered) {
      this.nodeHoverStopSubject.next(lastHovered);
      this.lastHovered = undefined;
    }
  }

  @bind
  private _onClick(e: {picked: boolean, object: SpatialSceneNode}, mouseEvent: { srcEvent: { ctrlKey: boolean; }; }): void {
    if (e.picked && e.object && e.object['@id']) {
      this.nodeClickSubject.next({node: e.object, ctrlClick: mouseEvent?.srcEvent?.ctrlKey ?? undefined});
    }
  }

  @bind
  private _onViewStateChange(event: { interactionState: { isZooming: boolean; }; viewState: BodyUIViewStateProps }): void {
    if (event.interactionState?.isZooming) {
      const currentState = this.bodyUILayer.state as {zoomOpacity: number, data: unknown};
      const zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 3, 0.2), 1.0);
      if (currentState.zoomOpacity !== zoomOpacity) {
        this.bodyUILayer.setState({data: currentState.data, zoomOpacity});
      }
    }
    this.deck.setProps({viewState: { ...event.viewState }});
    this.sceneRotationSubject.next(event.viewState.rotationOrbit);
  }
}
