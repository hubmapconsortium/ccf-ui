/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { AmbientLight, Deck, LightingEffect, OrbitView, OrthographicView } from '@deck.gl/core';
import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { Matrix4 } from '@math.gl/core';
import { bind } from 'bind-decorator';
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
  rotationX: number;
  camera: string;
}

export interface BodyUIProps {
  id: string;
  canvas: string | HTMLCanvasElement;
  parent: HTMLElement;
  debugSceneNodeProcessing?: boolean;
  target: Matrix4 | number[];
  interactive: boolean;
  rotation: number;
  minRotationX: number;
  maxRotationX: number;
  zoom: number;
  legacyLighting?: boolean;
  camera: string;
}

export interface PickInfo<D> {
  layer: unknown;
  index: number;
  object: D;
  x: number;
  y: number;
  coordinate?: unknown;
  picked?: boolean;
}

export type NodeDragEvent = { node: SpatialSceneNode; info: PickInfo<SpatialSceneNode>; e: MouseEvent };

export type NodeClickEvent = { node: SpatialSceneNode; ctrlClick: boolean };

/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
  deck: Deck;
  private readonly bodyUILayer = new BodyUILayer({});

  private readonly nodeClickSubject = new Subject<NodeClickEvent>();
  private readonly nodeHoverStartSubject = new Subject<SpatialSceneNode>();
  private readonly nodeHoverStopSubject = new Subject<SpatialSceneNode>();
  private readonly sceneRotationSubject = new BehaviorSubject<[number, number]>([0, 0]);
  private readonly nodeDragStartSubject = new Subject<NodeDragEvent>();
  private readonly nodeDragSubject = new Subject<NodeDragEvent>();
  private readonly nodeDragEndSubject = new Subject<NodeDragEvent>();

  readonly nodeClick$ = this.nodeClickSubject.pipe(share());
  readonly nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
  readonly nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());
  readonly sceneRotation$ = this.sceneRotationSubject.pipe(share());
  readonly nodeDragStart$ = this.nodeDragStartSubject.pipe(share());
  readonly nodeDrag$ = this.nodeDragSubject.pipe(share());
  readonly nodeDragEnd$ = this.nodeDragEndSubject.pipe(share());

  private cursor?: string;
  private lastHovered?: SpatialSceneNode;

  constructor(private deckProps: Partial<BodyUIProps>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {
      ...deckProps,
      views: [ deckProps.camera === 'orthographic' ? new OrthographicView({
        flipY: false,
        near: -1000
      }) : new OrbitView({ orbitAxis: 'Y' }) ],
      controller: deckProps.interactive ?? true,
      layers: [ this.bodyUILayer ],
      onHover: this._onHover,
      onClick: this._onClick,
      onViewStateChange: this._onViewStateChange,
      onDragStart: this._onDragStart,
      onDrag: this._onDrag,
      onDragEnd: this._onDragEnd,
      getCursor: (e: { isDragging: boolean }) => this.cursor ?? (e.isDragging ? 'grabbing' : 'grab')
    };
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
        minRotationX: deckProps.minRotationX ?? -15,
        maxRotationX: deckProps.maxRotationX ?? 15,
        target: deckProps.target ?? [0.5, 0.5, 0],
        rotationX: 0,
        rotationOrbit: deckProps.rotation ?? 0,
        zoom: deckProps.zoom ?? 9.5,
        camera: deckProps.camera
      } as BodyUIViewStateProps
    });
    if (deckProps.rotation) {
      this.sceneRotationSubject.next([deckProps.rotation, 0]);
    }
  }

  async initialize(): Promise<void> {
    while (!this.bodyUILayer.state) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => {
        setTimeout(r, 200);
      });
    }
  }

  finalize(): void {
    this.deck.finalize();
  }

  setScene(data: SpatialSceneNode[]): void {
    if (data?.length > 0) {
      let zoomOpacity = (this.bodyUILayer.state as { zoomOpacity: number }).zoomOpacity;
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _lighting: 'pbr',
        zoomBasedOpacity: false
      });
      this.bodyUILayer.setState({ data, zoomOpacity });
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

  setRotationX(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        rotationX: value
      } as BodyUIViewStateProps
    });
  }

  setZoom(value: number): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        zoom: value
      } as BodyUIViewStateProps
    });
  }

  setTarget(value: number[]): void {
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        target: value
      } as BodyUIViewStateProps
    });
  }

  setInteractive(value: boolean): void {
    this.deck.setProps({
      controller: value
    });
  }

  @bind
  private _onHover(e: { picked: boolean; object: SpatialSceneNode }): void {
    const { lastHovered } = this;
    this.cursor = e.picked ? 'pointer' : undefined;
    if (e.picked && e.object?.['@id']) {
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
  private _onClick(info: PickInfo<SpatialSceneNode>, e: { srcEvent: { ctrlKey: boolean } }): void {
    if (info.picked && info.object?.['@id']) {
      this.nodeClickSubject.next({ node: info.object, ctrlClick: e?.srcEvent?.ctrlKey ?? undefined });
    }
  }

  @bind
  private _onViewStateChange(event: { interactionState: { isZooming: boolean }; viewState: BodyUIViewStateProps }): void {
    if (event.interactionState?.isZooming) {
      const currentState = this.bodyUILayer.state as { zoomOpacity: number; data: unknown };
      const zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 2, 0.05), 1.0);
      if (currentState.zoomOpacity !== zoomOpacity) {
        this.bodyUILayer.setState({ data: currentState.data, zoomOpacity });
      }
    }
    this.deck.setProps({ viewState: { ...event.viewState } });
    this.sceneRotationSubject.next([event.viewState.rotationOrbit, event.viewState.rotationX]);
  }

  @bind
  private _onDragStart(info: PickInfo<SpatialSceneNode>, e: MouseEvent): void {
    this._dragEvent(info, e, this.nodeDragStartSubject);
  }

  @bind
  private _onDrag(info: PickInfo<SpatialSceneNode>, e: MouseEvent): void {
    this._dragEvent(info, e, this.nodeDragSubject);
  }

  @bind
  private _onDragEnd(info: PickInfo<SpatialSceneNode>, e: MouseEvent): void {
    this._dragEvent(info, e, this.nodeDragEndSubject);
  }

  private _dragEvent(info: PickInfo<SpatialSceneNode>, e: MouseEvent, subject: Subject<NodeDragEvent>): void {
    if (info?.object?.['@id']) {
      subject.next({ node: info.object, info, e });
    }
  }
}
