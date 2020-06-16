import { AmbientLight, Deck, LightingEffect, OrbitView } from '@deck.gl/core';
import { Matrix4 } from '@math.gl/core';
import bind from 'bind-decorator';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

import { BodyUILayer, SpatialSceneNode } from './body-ui-layer';


export interface BodyUIProps {
  id: string;
  canvas: string | HTMLCanvasElement;
  parent: HTMLElement;
}

/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
  deck: Deck;
  private readonly bodyUILayer = new BodyUILayer({});

  private readonly nodeClickSubject = new Subject<SpatialSceneNode>();
  private readonly nodeHoverStartSubject = new Subject<SpatialSceneNode>();
  private readonly nodeHoverStopSubject = new Subject<SpatialSceneNode>();

  readonly nodeClick$ = this.nodeClickSubject.pipe(share());
  readonly nodeHoverStart$ = this.nodeHoverStartSubject.pipe(share());
  readonly nodeHoverStop$ = this.nodeHoverStopSubject.pipe(share());

  private cursor?: string;
  private lastHovered?: SpatialSceneNode;

  constructor(deckProps: Partial<BodyUIProps>) {
    this.nodeClick$.subscribe(e => this.zoomTo(e));

    const props = {
      ...deckProps,
      effects: [
        new LightingEffect({
          ambientLight: new AmbientLight({
            color: [255, 255, 255],
            intensity: 10.0
          })
        })
      ],
      views: [ new OrbitView({}) ],
      controller: true,
      layers: [ this.bodyUILayer ],
      onHover: this._onHover,
      onClick: this._onClick,
      onViewStateChange: this._onViewStateChange,
      getCursor: (e: {isDragging: boolean}) => this.cursor || (e.isDragging ? 'grabbing' : 'grab')
    };
    // tslint:disable-next-line: no-any
    this.deck = new Deck(props as any);
    this.deck.setProps({viewState: {
      orbitAxis: 'Y',
      minRotationX: -15,
      maxRotationX: 15,
      target: [0.5, 0.5, 0],
      rotationX: 0,
      rotationOrbit: 0,
      zoom: 9.5
    }});
  }

  setScene(data: SpatialSceneNode[]): void {
    if (data?.length > 0) {
      const zoomOpacity = (this.bodyUILayer.state as {zoomOpacity: boolean}).zoomOpacity;
      this.bodyUILayer.setState({data, zoomOpacity});
    }
  }

  zoomTo(node: SpatialSceneNode): void {
    const matrix = new Matrix4(node.transformMatrix);
    this.deck.setProps({
      viewState: {
        ...this.deck.props.viewState,
        target: matrix.getTranslation(),
        rotationX: 0,
        rotationOrbit: 0,
        zoom: 10.5,
      }
    });
    console.log(matrix.getTranslation(), matrix.getScale(), node);
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
  private _onClick(e: {picked: boolean, object: SpatialSceneNode}): void {
    if (e.picked && e.object && e.object['@id']) {
      // alert('You clicked ' + e.object?.tooltip || JSON.stringify(e.object, null, 2));
      this.nodeClickSubject.next(e.object);
    }
  }

  @bind
  private _onViewStateChange(event: { interactionState: { isZooming: boolean; }; viewState: { zoom: number; } }): void {
    if (event.interactionState?.isZooming) {
      const currentState = this.bodyUILayer.state as {zoomOpacity: number, data: unknown};
      const zoomOpacity = Math.min(Math.max(1 - (event.viewState.zoom - 8.9) / 3, 0.2), 1.0);
      if (currentState.zoomOpacity !== zoomOpacity) {
        this.bodyUILayer.setState({data: currentState.data, zoomOpacity});
      }
    }
    this.deck.setProps({viewState: { ...event.viewState }});
  }
}
