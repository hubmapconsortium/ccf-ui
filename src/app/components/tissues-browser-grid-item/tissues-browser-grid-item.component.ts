import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { OntologyNode } from '../../shared/state/ontology/ontology.model';

/**
 * Encapsulates the content of a single tissues browser grid item.
 */
@Component({
  selector: 'ccf-tissues-browser-grid-item',
  templateUrl: './tissues-browser-grid-item.component.html',
  styleUrls: ['./tissues-browser-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridItemComponent {
  /**
   * The item for which to display a tile.
   */
  @Input() item: OntologyNode;

  /**
   * Gets the tile's url.
   */
  get tileUrl(): string {
    return this.item.tileUrl;
  }

  /**
   * Alternate textual description of the tile.
   */
  get description(): string {
    return this.item.description || `Tissue sample id: ${this.item.id}`;
  }

  /**
   * Creates an instance of tissues browser grid item component.
   *
   * @param navigator The navigation service.
   */
  constructor(readonly navigator: NavigationService) { }
}
