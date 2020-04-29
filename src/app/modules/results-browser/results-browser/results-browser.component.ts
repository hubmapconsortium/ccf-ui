import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-results-browser',
  templateUrl: './results-browser.component.html',
  styleUrls: ['./results-browser.component.scss']
})
export class ResultsBrowserComponent implements OnInit {

  metaData = [
    { key: 'Donors', value: '15' },
    { key: 'Tissue samples', value: '200' },
    { key: 'Tissue slices', value: '1,250' },
  ];

  results = [
    {
      gender: 'Female',
      age: 38,
      IMSresolution: '10 um/px',
      microscopyRes: '0.5 um/px',
      IMSbyMicro: 20
    },
    {
      gender: 'Male',
      age: 44,
      IMSresolution: '10 um/px',
      microscopyRes: '0.5 um/px',
      IMSbyMicro: 20
    },
    {
      gender: 'Female',
      age: 36,
      IMSresolution: '10 um/px',
      microscopyRes: '0.5 um/px',
      IMSbyMicro: 20
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
