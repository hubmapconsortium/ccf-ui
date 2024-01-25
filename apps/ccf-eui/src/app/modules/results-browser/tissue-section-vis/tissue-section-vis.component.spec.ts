/* eslint-disable @typescript-eslint/naming-convention */
import { TissueSectionResult } from 'ccf-database';
import { Shallow } from 'shallow-render';
import { TissueSectionVisComponent } from './tissue-section-vis.component';
import { TissueSectionVisModule } from './tissue-section-vis.module';

function getTissueSections(count: number): TissueSectionResult[] {
  const tempSections: TissueSectionResult[] = [];

  for (let i = 1; i < count; i++) {
    tempSections.push({
      '@type': 'Sample',
      sampleType: 'Tissue Section',
      sectionNumber: i,
      datasets: [],
      '@id': `${i}`,
      label: `${i}`,
      description: `${i}`,
      link: `${i}`
    });
  }

  return tempSections;
}

describe('TissueSectionVisComponent', () => {
  let shallow: Shallow<TissueSectionVisComponent>;

  beforeEach(() => {
    shallow = new Shallow(TissueSectionVisComponent, TissueSectionVisModule);
  });

  it('should return false when tissueSectionExists is called with a section number that is not registerd', async () => {
    const tissueSections = getTissueSections(1);
    const { instance } = await shallow.render({ bind: { tissueSections, totalTissueSections: 3 } });
    const sectionExists = instance.tissueSectionExists(3);

    expect(sectionExists).not.toBeTrue();
  });

  it('should return true when tissueSectionExists is called with a section number that is registerd', async () => {
    const tissueSections = getTissueSections(4);
    const { instance } = await shallow.render({ bind: { tissueSections, totalTissueSections: 4 } });
    const sectionExists = instance.tissueSectionExists(2);

    expect(sectionExists).toBeTrue();
  });
});
