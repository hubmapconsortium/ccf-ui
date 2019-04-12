import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { TissueImage } from '../../shared/state/database/database.models';

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
  @Input() item: TissueImage;

  /**
   * Gets the tile's background url.
   */
  get thumbnailUrl(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.item.thumbnailUrl})`);
  }

  /**
   * Creates an instance of tissues browser grid item component.
   *
   * @param navigator The navigation service.
   * @param sanitizer The sanitaion service used to sanitize background image urls.
   */
  constructor(readonly navigator: NavigationService, private sanitizer: DomSanitizer) { }
}
