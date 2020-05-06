import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BodyUI } from 'ccf-body-ui';


@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit {
  bodyUI: BodyUI;

  @ViewChild('bodyCanvas', {read: ElementRef}) bodyCanvas: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const canvas = this.bodyCanvas.nativeElement;
    this.bodyUI = new BodyUI({id: 'body-ui', canvas});
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());
    console.log(this.bodyUI);
  }
}
