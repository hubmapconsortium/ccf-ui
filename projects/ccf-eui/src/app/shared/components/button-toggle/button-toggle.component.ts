import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'ccf-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ButtonToggleComponent {
  @Input() menuOptions: string[];

  @Input() selectedItems?: string[] = [];

  /**
   * Any time a button is clicked, event is emitted.
   */
  @Output() readonly selectionChange = new EventEmitter<string[]>();

  isItemSelected(item: string) {
    return this.selectedItems?.includes(item);
  }
}
