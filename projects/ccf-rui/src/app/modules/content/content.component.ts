import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'ccf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  resetStage(): void {
    // Registration block return to starting position
    // The crosshairs return to start position
    // the x, y, z info abouve the gizo goes back to zero
  }
}
