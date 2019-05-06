import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor() { }

  ngOnInit() {
  }

}
