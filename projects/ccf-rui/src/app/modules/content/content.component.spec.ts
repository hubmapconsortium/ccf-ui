import { Shallow } from 'shallow-render';

import { ContentComponent } from './content.component';
import { ContentModule } from './content.module';

describe('ContentComponent', () => {
    let shallow: Shallow<ContentComponent>;

    beforeEach(() => {
        shallow = new Shallow(ContentComponent, ContentModule);
    });

    it('should call the resetStage method when the reset button is clicked.', async () => {
        const { find, instance } = await shallow.render();
        const spy = spyOn(instance, 'resetStage');
        const resetButton = find('.icon.reset');

        resetButton.triggerEventHandler('click', {});
        expect(spy).toHaveBeenCalled();
    });
});
