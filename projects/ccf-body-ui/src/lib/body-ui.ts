import { BodyUILayer, BodyUIData } from './body-ui-layer';
import { Deck, OrbitView } from '@deck.gl/core';

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
  bodyUILayer: BodyUILayer;

  constructor(deckProps: Partial<BodyUIProps>) {
    this.bodyUILayer = new BodyUILayer({data: []});
    let cursor: string | undefined;
    const props = {
      ...deckProps,
      initialViewState: {
        target: [0.5, 0.5, 0],
        orbitAxis: 'Y',
        rotationX: 0,
        minRotationX: -15,
        maxRotationX: 15,
        rotationOrbit: 0,
        zoom: 8
      },
      views: [new OrbitView({})],
      controller: true,
      layers: [
        this.bodyUILayer
      ],
      onHover: (e: {picked: boolean}) => {
        cursor = e.picked ? 'pointer' : undefined;
      },
      getCursor: (e: {isDragging: boolean}) => cursor || (e.isDragging ? 'grabbing' : 'grab')
    };
    // tslint:disable-next-line: no-any
    this.deck = new Deck(props as any);
  }

  setScene(data: BodyUIData[]) {
    this.bodyUILayer.setState({data});
  }
}
