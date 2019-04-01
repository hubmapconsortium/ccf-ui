import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-tissues-browser-grid-item',
  templateUrl: './tissues-browser-grid-item.component.html',
  styleUrls: ['./tissues-browser-grid-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridItemComponent {
  @Input() item: any; // FIXME: Correct typings
}
