import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { ModelState } from './core/store/model/model.state';
import { RUI_ORGANS } from './core/store/model/model.state';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === undefined ? false : true)
  );

  organList = RUI_ORGANS;

  constructor(
    // readonly page: PageState,
    readonly model: ModelState,
    // readonly registration: RegistrationState
  ) { }
}
