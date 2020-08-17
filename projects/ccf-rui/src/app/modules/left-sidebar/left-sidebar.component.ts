import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
  detailsLabels: string[] = ['heart', 'front', 'female'];
}
