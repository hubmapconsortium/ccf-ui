import { Shallow } from 'shallow-render';

import { ResultsBrowserComponent, ColorSwatch, ColorPalette, TissueBlockRegistryEntry } from './results-browser.component';
import { TissueBlockResult, DonorResult } from 'ccf-database';

import { ResultsBrowserModule } from './results-browser.module';


function makeScrollEventObject(
  clientHeight: number, scrollHeight: number, scrollTop: number
): UIEvent {
  return {
    target: {
      clientHeight,
      scrollHeight,
      scrollTop
    } as Element as EventTarget
  } as UIEvent;
}

const testBlock = {
  '@id': '1',
  label: 'string',
  description: 'string',
  link: 'string',
  '@type': 'Sample',
  sampleType: 'Tissue Block',
  sectionCount: 0,
  sectionSize: 0,
  sectionUnits: 'string',
  donor: {
    '@type': 'Donor',
    providerName: 'string',
  } as DonorResult,
  spatialEntityId: '1',
  sections: [],
  datasets: [],
} as TissueBlockResult;

const testTissueBlockRegistryEntry1 = {
  tissueBlockId: '1',
  spatialEntityId: '1',
  color: 'red'
} as TissueBlockRegistryEntry;

const testTissueBlockRegistryEntry2 = {
  tissueBlockId: '2',
  spatialEntityId: '2',
  color: 'blue'
} as TissueBlockRegistryEntry;

const testTissueBlockRegistryEntry3 = {
  tissueBlockId: '3',
  spatialEntityId: '1',
  color: 'red'
} as TissueBlockRegistryEntry;

describe('ResultsBrowserComponent', () => {
  let shallow: Shallow<ResultsBrowserComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserComponent, ResultsBrowserModule);
  });

  it('should re-run the gradient display logic on a scroll event', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');
    const spy = spyOn(instance, 'onScroll');

    list.triggerEventHandler('scroll', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should disable gradient if close to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');

    instance.atScrollBottom = false;
    list.triggerEventHandler('scroll', makeScrollEventObject(100, 200, 100));
    expect(instance.atScrollBottom).toBeTruthy();
  });

  it('should enable gradient if not close to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');

    instance.atScrollBottom = true;
    list.triggerEventHandler('scroll', makeScrollEventObject(100, 300, 100));
    expect(instance.atScrollBottom).toBeFalsy();
  });

  it('should emit the url whenever visitLink is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.visitLink('test.com');
    expect(outputs.resultClicked.emit).toHaveBeenCalledWith('test.com');
  });

  it('should initialize donorColorPalette', async () => {
    const { instance } = await shallow.render();
    const sampleSwatch = {color: '#ffd740', spatialEntityId: ''} as ColorSwatch;
    expect(instance.donorColorPalette[2]).toEqual(sampleSwatch);
  });

  it('should handle donor card selection', async () => {
    const { instance } = await shallow.render();
    const testResult = {} as TissueBlockResult;
    const spy1 = spyOn(instance, 'selectTissueBlock');
    const spy2 = spyOn(instance, 'deselectTissueBlock');
    instance.handleDonorCardSelection(true, testResult);
    expect(spy1).toHaveBeenCalled();
    instance.handleDonorCardSelection(false, testResult);
    expect(spy2).toHaveBeenCalled();
  });

  it('should get the tissue block color', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: '2'
      },
    ] as ColorPalette;
    instance.donorColorPalette = testPalette;
    expect(instance.getTissueBlockColor('2')).toEqual('blue');
  });

  it('should tell if the tissue block is selected', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2];
    expect(instance.isTissueBlockSelected(testBlock)).toBeTrue();
  });

  it('should select the tissue block', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: ''
      },
      {
        color: 'blue',
        spatialEntityId: ''
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry2];
    instance.donorColorPalette = testPalette;
    instance.availableColors = ['red'];
    instance.spatialEntityIds = [];
    instance.selectTissueBlock(testBlock);
    expect(instance.tissueBlockRegistry[1].color).toEqual('red');
  });

  it('should assign the same color to each spatialEntityId', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: '2'
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry2, testTissueBlockRegistryEntry3];
    instance.donorColorPalette = testPalette;
    instance.spatialEntityIds = ['1', '2'];
    instance.selectTissueBlock(testBlock);
    expect(instance.tissueBlockRegistry[2].color).toEqual('red');
  });

  it('should deselect the tissue block', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: '2'
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2, testTissueBlockRegistryEntry3];
    instance.donorColorPalette = testPalette;
    instance.spatialEntityIds = ['1', '2'];
    instance.deselectTissueBlock(testBlock);
    expect(instance.tissueBlockRegistry.length).toEqual(2);
  });

  it('should add the color back into the availableColor pool and preserve correct order', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: ''
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1];
    instance.donorColorPalette = testPalette;
    instance.allColors = ['red', 'blue'];
    instance.availableColors = ['blue'];
    instance.spatialEntityIds = ['1'];
    instance.deselectTissueBlock(testBlock);
    expect(instance.availableColors).toEqual(['red', 'blue']);
  });


  it('should update color with new id', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: '2'
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2];
    instance.donorColorPalette = testPalette;
    instance.allColors = ['red', 'blue'];
    instance.availableColors = [];
    instance.updateColorWithId('blue', '3');
    expect(instance.donorColorPalette[1].spatialEntityId).toEqual('3');
  });

  it('should return the oldest color when recycleOldestColor is called', async () => {
    const { instance } = await shallow.render();
    const testPalette = [
      {
        color: 'red',
        spatialEntityId: '1'
      },
      {
        color: 'blue',
        spatialEntityId: '2'
      },
    ] as ColorPalette;
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2];
    instance.donorColorPalette = testPalette;
    instance.allColors = ['red', 'blue'];
    instance.availableColors = [];
    instance.spatialEntityIds = ['1', '2'];
    expect(instance.recycleOldestColor('3')).toEqual('red');
  });

  it('should not be recycling colors if none are currently selected', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [];
    expect(instance.recycleOldestColor('1')).toEqual('');
  });
});
