/* eslint-disable @typescript-eslint/naming-convention */
import { Shallow } from 'shallow-render';
import { DOCUMENT } from '@angular/common';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { MousePositionTrackerModule } from './mouse-position-tracker.module';
import { MousePositionTrackerComponent } from './mouse-position-tracker.component';

describe('MousePositionTrackerModule', () => {
  let shallow: Shallow<MousePositionTrackerModule>;

  beforeEach(() => {
    shallow = new Shallow(MousePositionTrackerComponent, MousePositionTrackerModule)
      .provide({ provide: Document, useValue: {DOCUMENT} })
      .provide({ provide: GoogleAnalyticsService, useValue: {} });
  });

  it('exists', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
