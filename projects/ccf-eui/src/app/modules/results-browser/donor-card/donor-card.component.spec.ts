/* eslint-disable @typescript-eslint/naming-convention */
import { TissueBlockResult } from 'ccf-database';
import { Shallow } from 'shallow-render';
import { DonorCardComponent } from './donor-card.component';
import { DonorCardModule } from './donor-card.module';


const tissueBlock: TissueBlockResult = {
  '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#TissueBlock',
  '@type': 'Sample',
  sections: [],
  datasets: [
    {
      '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#Dataset',
      '@type': 'Dataset',
      label: 'Registered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
      thumbnail: 'assets/kpmp/thumbnails/kpmp-sample.jpg',
      technology: 'OTHER',
      description: 'Data/Assay Types: Cytometry',
      link: 'http://dx.doi.org/10.154016/j.trsl.2017.07.006'
    }
  ],
  label: 'Registered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
  description: '3.44 x 7.78 x 0.07 millimeter, 0.07 millimeter, nephrectomy, 0 Sections',
  link: 'http://dx.doi.org/10.103216/j.trsl.2017.07.006',
  donor: {
    '@id': 'http://dx.doi.org/10.1016/j.trsl.2017.07.006#Donor',
    '@type': 'Donor',
    label: 'CoverNephrectomy',
    description: 'Entered 5/18/2020, Seth Winfree, KPMP-IU/OSU',
    link: 'http://dx.doi.orgs/10.1016/j.trsl.2017.07.006',
    providerName: 'KPMP-IU/OSU'
  },
  spatialEntityId: 'http://purl.org/ccf/0.5/bd7a9bea-aaaa726-427a-8360-8a017ef8178d',
  sampleType: 'Tissue Block',
  sectionCount: 1,
  sectionSize: 0.07,
  sectionUnits: 'millimeter'
};

describe('DonorCardComponent', () => {
  let shallow: Shallow<DonorCardComponent>;

  beforeEach(() => {
    shallow = new Shallow(DonorCardComponent, DonorCardModule);
  });

  it('should not toggle the expanded variable if selected is false', async () => {
    const { instance } = await shallow.render({ bind: { tissueBlock, selected: false } });

    instance.expanded = false;
    instance.toggleExpansion();
    expect(instance.expanded).not.toBeTrue();

    instance.expanded = true;
    instance.toggleExpansion();
    expect(instance.expanded).toBeTrue();
  });

  it('should toggle the expanded variable if selected is true', async () => {
    const { instance } = await shallow.render({ bind: { tissueBlock, selected: true } });

    instance.expanded = false;
    instance.toggleExpansion();
    expect(instance.expanded).toBeTrue();

    instance.expanded = true;
    instance.toggleExpansion();
    expect(instance.expanded).not.toBeTrue();
  });

  it('should toggle selected whenever handleCheckbox is called', async () => {
    const { instance } = await shallow.render({ bind: { tissueBlock, selected: false } });

    instance.handleCheckbox();
    expect(instance.selected).toBeTrue();

    instance.selected = true;
    instance.handleCheckbox();
    expect(instance.expanded).not.toBeTrue();
  });

  it('should emit the new selected value whenever handleCheckbox is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: { tissueBlock, selected: false } });

    instance.handleCheckbox();
    expect(outputs.checked.emit).toHaveBeenCalledWith(true);
  });

  it('should set expanded to false whenever handleCheckbox is called', async () => {
    const { instance } = await shallow.render({ bind: { tissueBlock, selected: false } });
    instance.expanded = true;
    instance.handleCheckbox();
    expect(instance.expanded).not.toBeTrue();
  });

  it('should emit linkClick when linkHandler is called if selected is true', async () => {
    const { instance, outputs } = await shallow.render({ bind: { tissueBlock, selected: true } });

    instance.linkHandler('test.com');
    expect(outputs.linkClick.emit).toHaveBeenCalled();
  });

  it('should not emit linkClick when linkHandler is called if selected is false', async () => {
    const { instance, outputs } = await shallow.render({ bind: { tissueBlock, selected: false } });

    instance.linkHandler('test.com');
    expect(outputs.linkClick.emit).not.toHaveBeenCalled();
  });

  it('should set selected to true if linkHandler is called when selected is false', async () => {
    const { instance } = await shallow.render({ bind: { tissueBlock, selected: false } });

    instance.linkHandler('test.com');
    expect(instance.selected).toBeTrue();
  });
});
