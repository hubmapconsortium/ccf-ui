import { Injectable } from '@angular/core';

import { OntologyNode } from '../../state/ontology/ontology.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  download(node: OntologyNode | OntologyNode[]): void {
    // TODO: Create download logic
  }
}
