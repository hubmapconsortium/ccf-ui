import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { VisibilityItem } from '../../core/models/visibility-item';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { LeftSidebarComponent } from './left-sidebar.component';
import { LeftSidebarModule } from './left-sidebar.module';

const testVisibilityItems = [{ id: 1, name: 'test', opacity: 90 }] as VisibilityItem[];

describe('LeftSidebarComponent', () => {
    let shallow: Shallow<LeftSidebarComponent>;

    beforeEach(() => {
        const mockModelState = jasmine.createSpyObj<ModelState>(
            'ModelState', ['setViewType', 'setViewSide', 'setShowPrevious', 'setAnatomicalStructures', 'setGender', 'setSide']
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
                side$: of('left' as 'left' | 'right'),
                anatomicalStructures$: of(testVisibilityItems),
                snapshot: { anatomicalStructures: testVisibilityItems }
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

    it('should call model.setAnatomicalStructures when previous registration blocks visibility is changed', async () => {
        const { instance } = await shallow.render();
        instance.togglePreviousRegistrationBlocks(true);
        instance.togglePreviousRegistrationBlocks(false);

        expect(instance.model.setAnatomicalStructures).toHaveBeenCalledTimes(2);
    });

    it('should update previousVisibilityItems when previous registration blocks visibility is set to true', async () => {
        const { instance } = await shallow.render();
        instance.togglePreviousRegistrationBlocks(true);

        expect(instance.previousVisibilityItems).toEqual(testVisibilityItems);
    });

    it('should call setShowPrevious with the value passed into togglePreviousRegistrationBlocks whenever called', async () => {
        const { instance } = await shallow.render();
        instance.togglePreviousRegistrationBlocks(true);
        expect(instance.model.setShowPrevious).toHaveBeenCalledWith(true);

        instance.togglePreviousRegistrationBlocks(false);
        expect(instance.model.setShowPrevious).toHaveBeenCalledWith(true);
    });
});
