import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TissueSample } from 'src/app/shared/state/database/database.models';

@Component({
  selector: 'ccf-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  @Input() metadata$: Observable<{ [label: string]: string }[]>;
  metadata: { [label: string]: string }[];
  constructor() { }

  ngOnInit() {
    this.metadata$.subscribe(d => {
      this.metadata = d;
    });
  }

}
