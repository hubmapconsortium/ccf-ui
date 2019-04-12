import { Component, OnInit } from '@angular/core';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

@Component({
  selector: 'ccf-organ',
  templateUrl: './organ.component.html',
  styleUrls: ['./organ.component.scss']
})
export class OrganComponent implements OnInit {

  organImagePath: string;
  constructor(private readonly organService: OrganDataService) { }

  ngOnInit() {
    this.organService.getOrganSourcePath().subscribe((image: string) => {
      this.organImagePath = image;
      console.log(image);
    });
    this.organService.getMetadata().subscribe((d) => {
      console.log(d);
    });
  }

  onOverlayClick(event) {
    alert(event);
  }
}
