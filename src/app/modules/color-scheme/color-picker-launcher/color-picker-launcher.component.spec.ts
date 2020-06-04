import { Shallow } from 'shallow-render';

import { ColorPickerLauncherComponent } from './color-picker-launcher.component';
import { ColorPickerLauncherModule } from './color-picker-launcher.module';

describe('ColorPickerLauncherComponent', () => {
    let shallow: Shallow<ColorPickerLauncherComponent>;

    beforeEach(() => {
        shallow = new Shallow(ColorPickerLauncherComponent, ColorPickerLauncherModule);
    });
});
