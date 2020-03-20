import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() filters: Record<string, unknown[] | unknown>;
  @Output() logoClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();
  @Output() infoClicked = new EventEmitter<void>();
}
