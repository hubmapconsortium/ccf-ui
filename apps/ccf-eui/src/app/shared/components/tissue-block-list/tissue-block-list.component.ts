import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TissueBlockResult } from 'ccf-database';


/**
 * Tissue block list in spatial search UI
 */
@Component({
  selector: 'ccf-tissue-block-list',
  templateUrl: './tissue-block-list.component.html',
  styleUrls: ['./tissue-block-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissueBlockListComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'ccf-tissue-block-list';

  /** Tissue blocks to be displayed */
  @Input() tissueBlocks: TissueBlockResult[] = [];

}
