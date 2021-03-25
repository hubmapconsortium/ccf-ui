import { Shallow } from 'shallow-render';

import { 
  ResultsBrowserComponent, 
  ColorSwatch, 
  ColorPalette, 
  TissueBlockRegistryEntry, 
  TissueBlockRegistry 
} from './results-browser.component';
import { AggregateResult, ListResult, TissueBlockResult, DonorResult } from 'ccf-database';

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

const paletteColors = [
  '#FF8800',
  '#2979ff',
  '#ffd740',
  '#b92dff',
  '#da326f',
  '#7323e2',
  '#acf32b',
  '#82B1FF',
  '#E040FB',
  '#00E5FF',
];

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
    instance.donorColorPalette = testPalette;
    expect(instance.getTissueBlockColor('1')).toEqual('red');
  });

  it('should tell if the tissue block is selected', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1]
    expect(instance.isTissueBlockSelected(testBlock)).toBeTrue();
  });

  it('should select the tissue block', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1]
    instance.donorColorPalette = testPalette;
    instance.paletteColors = paletteColors;
    instance.availableColors = ['red', 'blue'];
    instance.spatialEntityIds = [];
    instance.selectTissueBlock(testBlock);
    expect(instance.tissueBlockRegistry[0].color).toEqual('red');
  });

  it('selecting a block should recycle the oldest color if there are no more colors left', async () => {
    const { instance } = await shallow.render();
    const testBlock3 = {
      '@id': '3',
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
      spatialEntityId: '3',
      sections: [],
      datasets: [],
    } as TissueBlockResult;

    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2]
    instance.donorColorPalette = testPalette;
    instance.paletteColors = paletteColors;
    instance.availableColors = [];
    instance.spatialEntityIds = ['1', '2'];
    const spy = spyOn(instance, 'recycleOldestColor');
    instance.selectTissueBlock(testBlock3);
    expect(spy).toHaveBeenCalled();
  });

  it('should deselect the tissue block and update', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1]
    instance.donorColorPalette = testPalette;
    instance.availableColors = [];
    instance.spatialEntityIds = ['1'];
    const spy = spyOn(instance, 'updateColorWithId');
    instance.deselectTissueBlock(testBlock);
    expect(instance.availableColors).toEqual(['red']);
    expect(spy).toHaveBeenCalled();
  });

  it('should update color with new id', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1]
    instance.donorColorPalette = testPalette;
    instance.updateColorWithId('red', '2');
    expect(instance.donorColorPalette[0].spatialEntityId).toEqual('2');
  });

  it('should return the oldest color when recycleOldestColor is called', async () => {
    const { instance } = await shallow.render();
    instance.tissueBlockRegistry = [testTissueBlockRegistryEntry1, testTissueBlockRegistryEntry2]
    instance.donorColorPalette = testPalette;
    instance.spatialEntityIds = ['1', '2'];
    expect(instance.recycleOldestColor('3')).toEqual('red');
  });
});
