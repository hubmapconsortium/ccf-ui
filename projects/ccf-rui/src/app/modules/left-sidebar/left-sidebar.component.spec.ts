import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { VisibilityItem } from '../../core/models/visibility-item';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';

import { LeftSidebarComponent } from './left-sidebar.component';
import { LeftSidebarModule } from './left-sidebar.module';

describe('LeftSidebarComponent', () => {
    let shallow: Shallow<LeftSidebarComponent>;

    beforeEach(() => {
        const mockModelState = jasmine.createSpyObj<ModelState>(
          'ModelState', ['setViewType', 'setViewSide']
        );

        const mockPageState = jasmine.createSpyObj<PageState>(
            'PageStage', ['setEmbedded', 'setUserName', 'setTutorialMode']
        );

        shallow = new Shallow(LeftSidebarComponent, LeftSidebarModule)
        .mock(ModelState, {
            ...mockModelState,
            viewType$: of('register'),
            viewSide$: of('anterior'),
            gender$: of('male' as 'male' | 'female'),
            side$: of('left' as 'left' | 'right')
          })
        .mock(PageState, {
            ...mockPageState,
            tutorialMode$: of(false)
        });
    });

    it('should successfully set the extractionSiteTooltip to the VisibilityItem tooltip passed in', async () => {
        const { instance } = await shallow.render();
        const testVisibilityItem: VisibilityItem = {
            id: 1,
            name: 'test',
            visible: false,
            tooltip: 'test tooltip'
        };

        instance.updateExtractionSiteTooltip(testVisibilityItem);
        expect(instance.extractionSiteTooltip).toEqual('test tooltip');
    });

    it('should set the extractionSiteTooltip to empty string when no visibilityitem is passed in', async () => {
        const { instance } = await shallow.render();
        instance.updateExtractionSiteTooltip(undefined);
        expect(instance.extractionSiteTooltip).toEqual('');
    });
});
