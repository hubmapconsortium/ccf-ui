import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BodyUI } from 'ccf-body-ui';
import { Filter } from 'ccf-database';

import { DataSourceService } from './../../../core/services/data-source/data-source.service';
import { DataState } from './../../../core/store/data/data.state';


@Component({
  selector: 'ccf-body-ui',
  templateUrl: './body-ui.component.html',
  styleUrls: ['./body-ui.component.scss']
})
export class BodyUiComponent implements AfterViewInit {
  bodyUI: BodyUI;

  @ViewChild('bodyCanvas', { read: ElementRef }) bodyCanvas: ElementRef<HTMLCanvasElement>;

  constructor(readonly data: DataState, readonly dataSourceService: DataSourceService) { }

  ngAfterViewInit(): void {
    const canvas = this.bodyCanvas.nativeElement;
    this.bodyUI = new BodyUI({ id: 'body-ui', canvas });
    canvas.addEventListener('contextmenu', evt => evt.preventDefault());

    // TODO: Replace with a single @Input with scene provided by ngxs
    this.data.filter$.subscribe(async (f: Filter) => {
      await this.dataSourceService.dataSource.connect();
      const scene = await this.dataSourceService.dataSource.getScene(f);
      this.bodyUI.setScene(scene);
    });
  }
}
