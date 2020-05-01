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
      a: 'Female, Age 38',
      b: 'IMS resolution = 10um/px',
      c: 'Microscopy res = 0.5um/px',
      d: 'IMS res./Microscopy res = 20',
      downloadURL: 'https://sampledata.hubmapconsortium.org/home'
    },
    {
      a: 'Male, Age 42',
      b: 'IMS resolution = 90um/px',
      c: 'Microscopy res = 0.6um/px',
      d: 'IMS res./Microscopy res = 18',
      downloadURL: 'https://sampledata.hubmapconsortium.org/home'
    },
    {
      a: 'Female, Age 32',
      b: 'IMS resolution = 11um/px',
      c: 'Microscopy res = 0.5um/px',
      d: 'IMS res./Microscopy res = 21',
      downloadURL: 'https://sampledata.hubmapconsortium.org/home'
    },
    {
      a: 'Male, Age 55',
      b: 'IMS resolution = 12um/px',
      c: 'Microscopy res = 0.7um/px',
      d: 'IMS res./Microscopy res = 25',
      downloadURL: 'https://sampledata.hubmapconsortium.org/home'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
