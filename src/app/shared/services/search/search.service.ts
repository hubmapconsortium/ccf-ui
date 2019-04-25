import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SetAgeRangeFilter } from '../../state/search/search.action';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Dispatch()
  setAgeRange(min?: number, max?: number): SetAgeRangeFilter {
    return new SetAgeRangeFilter(min, max);
  }
}
