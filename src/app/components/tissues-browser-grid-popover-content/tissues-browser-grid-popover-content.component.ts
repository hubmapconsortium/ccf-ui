import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-tissues-browser-grid-popover-content',
  templateUrl: './tissues-browser-grid-popover-content.component.html',
  styleUrls: ['./tissues-browser-grid-popover-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridPopoverContentComponent {
  @Input() item: any; // FIXME: Correct typings
}
