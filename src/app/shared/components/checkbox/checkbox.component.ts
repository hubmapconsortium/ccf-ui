import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'ccf-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() label: string;
  @Input() options: string[];
  @Input() selection: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  filterOnChange(event: MatCheckboxChange, option: string): void {
    const checked = event.checked;

    if(checked) {
      this.selection.push(option);
    } else {
      this.selection = this.selection.filter(selection => selection !== option);
    }

    this.selectionChange.emit(this.selection);
  }
}
