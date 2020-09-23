import { AfterViewInit, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { BodyUI, SpatialSceneNode } from 'ccf-body-ui';
import { ModelState } from '../../core/store/model/model.state';

@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-body-ui';

  @Input() scene: SpatialSceneNode[];

  bodyUI: BodyUI;

  @ViewChild('bodyCanvas', { read: ElementRef }) bodyCanvas: ElementRef<HTMLCanvasElement>;

  constructor(readonly model: ModelState) { }

  ngAfterViewInit(): void {
    this.setupBodyUI();
  }

  setupBodyUI(): void {
    const canvas = this.bodyCanvas.nativeElement;
    this.bodyUI = new BodyUI({ id: 'body-ui', canvas });
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());

    setTimeout(() => {
      this.bodyUI.setScene(this.scene);
    }, 100);
  }
}
