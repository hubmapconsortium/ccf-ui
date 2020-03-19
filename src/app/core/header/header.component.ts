import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnChanges {
  @Input() filters: Record<string, unknown[]> = { sex: ['Both'], ageRange: [1, 110], BMIRange: [13, 83] };
  @Output() logoClicked = new EventEmitter<void>();
  @Output() downloadClicked = new EventEmitter<void>();
  @Output() infoClicked = new EventEmitter<void>();

  currentSex = this.filters.sex;
  currentAgeRange = this.filters.ageRange;
  currentBMIRange = this.filters.BMIRange;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this.currentSex = this.filters.sex;
      this.currentAgeRange = this.filters.ageRange;
      this.currentBMIRange = this.filters.BMIRange;
    }
  }
}
