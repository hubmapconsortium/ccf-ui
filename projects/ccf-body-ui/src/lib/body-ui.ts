import { BodyUILayer } from './body-ui-layer';
import { Deck, OrbitView } from '@deck.gl/core';
import { DeckProps } from '@deck.gl/core/lib/deck';

export interface BodyUIProps extends DeckProps {
  id: string;
  canvas: string | HTMLCanvasElement;
  parent: HTMLElement;
}

/**
 * A convenience wrapper class for the CCF Body UI
 */
export class BodyUI {
  deck: Deck;

  constructor(deckProps: Partial<BodyUIProps>) {
    deckProps = {
      ...deckProps,
      initialViewState: {
        target: [0, 5, 0],
        orbitAxis: 'Y',
        rotationX: 0,
        minRotationX: -15,
        maxRotationX: 15,
        rotationOrbit: 0,
        zoom: 5
      },
      views: [new OrbitView({})],
      controller: true,
      layers: [
        new BodyUILayer({})
      ]
    };
    this.deck = new Deck(deckProps as DeckProps);
  }
}
