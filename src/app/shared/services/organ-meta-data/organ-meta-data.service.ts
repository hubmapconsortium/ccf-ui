import { Injectable } from '@angular/core';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { OrganMetaData } from '../../state/organ-meta-data/organ-meta-data.model';

@Injectable({
  providedIn: 'root'
})

export class OrganMetaDataService {

  readonly data: Observable<OrganMetaData>;
  subject = new ReplaySubject<OrganMetaData>();
  constructor() {
    this.data = this.subject.asObservable();
  }

  nextData(organ: string) {
    if (organ === 'heart') {
      this.subject.next({
        patientNumber: 12323,
        procedureId: 34534
      } as OrganMetaData);
    } else if (organ === 'kidney') {
      this.subject.next({
        patientNumber: 14562323,
        procedureId: 123123
      } as OrganMetaData);
    } else {
      this.subject.next(null);
    }
  }
}
