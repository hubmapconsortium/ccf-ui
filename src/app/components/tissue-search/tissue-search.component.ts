import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ccf-tissue-search',
  templateUrl: './tissue-search.component.html',
  styleUrls: ['./tissue-search.component.scss']
})
export class TissueSearchComponent implements OnInit {
  @Input() searchFilterCategories: string[];
  searchFilterMap = {
    'Technologies': ['IMS', 'MxIF', 'AF'] ,
    'TMCs': ['TMC-Vanderbilt', 'TMC-UCSD', 'TMC-Stanford', 'TMC-Florida', 'TMC-CalTech']
  };

  constructor() { }

  ngOnInit() {
  }
}
