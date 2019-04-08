import { Component } from '@angular/core';

@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  /**
   * Indicates whether the about item is currenlty being hovered over.
   */
  isAboutItemHovered = false;
}
