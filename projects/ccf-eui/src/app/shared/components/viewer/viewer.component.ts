import { Component, EventEmitter, Input, Output, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ListResult } from 'ccf-database';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'ccf-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnChanges, AfterViewInit {

  @Input() result: ListResult;
  @ViewChild('iframe') iframe: ElementRef;
  @Output() close = new EventEmitter();

  loading: boolean;
  
  constructor() { }

  ngOnChanges(): void {
    if(this.result) {
      this.loading = true;
      this.iframe.nativeElement.src = this.result.resultUrl;
    }
    
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.addEventListener('load', this.onLoad.bind(this));
  }

  openLink(): void {
    if(this.result) {
      window.open(this.result.resultUrl, '_blank');
    }
  }

  onLoad(): void {
    this.loading = false;
  }


}
