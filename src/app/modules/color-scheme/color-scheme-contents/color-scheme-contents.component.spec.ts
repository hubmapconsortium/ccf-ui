import { Shallow } from 'shallow-render';

import { DEFAULT_COLOR_SCHEMES } from '../color-schemes';
import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { ColorSchemeContentsModule } from './color-scheme-contents.module';
import { ColorScheme } from 'src/app/core/models/color-scheme';

describe('ColorSchemeContentsComponent', () => {
  let shallow: Shallow<ColorSchemeContentsComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemeContentsComponent, ColorSchemeContentsModule);
  });

});
