import { Component, Input } from '@angular/core';
import { ALL_ORGANS, OrganInfo } from 'ccf-shared';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ccf-organ-info';
  @Input() organ = 'Kidney';
  @Input() sex: 'Both' | 'Male' | 'Female' = 'Female';
  @Input() side?: 'Left' | 'Right' | undefined = 'Right';

  organIri: string | undefined;

  constructor() {
    this.organIri = this.getCurrentOrgan()?.id;
    this.side = this.getCurrentOrgan()?.side;
  }

  sideChange(selection: 'Left' | 'Right'): void {
    this.side = selection === 'Left' ? 'Left' : 'Right';
    this.organIri = this.getCurrentOrgan()?.id;
  }

  getCurrentOrgan(): OrganInfo | undefined {
    return ALL_ORGANS.find(organ => organ.organ === this.organ && (this.side ? organ.side === this.side : true));
  }
}
