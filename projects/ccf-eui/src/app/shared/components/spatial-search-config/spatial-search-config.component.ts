import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss']
})
export class SpatialSearchConfigComponent implements OnInit {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  constructor() { }

  ngOnInit(): void {
  }

}
