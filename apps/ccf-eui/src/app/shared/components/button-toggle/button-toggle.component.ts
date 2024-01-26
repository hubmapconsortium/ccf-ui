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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleComponent {
  @Input() menuOptions!: string[];

  @Input() selectedItems?: string[] = [];

  @Input() enableTooltip = false;
  @Input() tooltips: string[] = [];

  /**
   * Any time a button is clicked, event is emitted.
   */
  @Output() readonly selectionChange = new EventEmitter<string[]>();

  isItemSelected(item: string) {
    return this.selectedItems?.includes(item);
  }

  toggleSelection(value: string): void {
    if (this.isItemSelected(value)) {
      this.selectedItems = this.selectedItems?.filter(
        (el) => el != value
      );
    } else {
      this.selectedItems?.push(value);
    }
    this.selectionChange.emit(this.selectedItems);
  }
}
