import { Component, EventEmitter, Input, Output, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ListResult } from 'ccf-database';

@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnChanges, AfterViewInit {

  @Input() result: ListResult;
  @ViewChild('iframe', {static: false}) iframe: ElementRef;
  @Output() closeViewer = new EventEmitter();

  loading = true;

  constructor() { }

  ngOnChanges(): void {
    if(this.result && this.iframe) {
      this.loading = true;
      this.iframe.nativeElement.src = this.result.resultUrl;
    }
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.addEventListener('load', this.onLoad.bind(this));
  }

  onLoad(): void {
    this.loading = false;
  }


  openLink(): void {
    window.open(this.result.resultUrl, '_blank');
  }

}