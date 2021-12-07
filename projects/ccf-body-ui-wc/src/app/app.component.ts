import { Component, EventEmitter, Output } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

interface GlobalConfig {
  highlightID?: string;
}

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly data$ = this.configState.getOption('data');
  readonly highlightID$ = this.configState.getOption('highlightID');
  readonly zoomToID$ = this.configState.getOption('zoomToID');

  @Output() readonly onHover = new EventEmitter<string>();
  @Output() readonly onClick = new EventEmitter<string>();

  constructor(private readonly configState: GlobalConfigState<GlobalConfig>) { }
}
