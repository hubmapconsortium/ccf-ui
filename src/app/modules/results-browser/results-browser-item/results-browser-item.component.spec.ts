import { Shallow } from 'shallow-render';

import { ResultsBrowserItemComponent } from './results-browser-item.component';
import { ResultsBrowserItemModule } from './results-browser-item.module';
import { ListResult } from 'ccf-database';

describe('ResultsBrowserItemComponent', () => {
  let shallow: Shallow<ResultsBrowserItemComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserItemComponent, ResultsBrowserItemModule);
  });

  it('should show a placeholder div when no thumbnail image url is present', async () => {
    const testListResult: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test'};
    const { find } = await shallow.render({ bind: { data: testListResult }});

    expect(find('.result-image-placeholder')).toHaveFoundOne();
  });

  it('should not show a placeholder div when a thumbnail image url is present', async () => {
    const testListResult: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', thumbnailUrl: 'test.com'};
    const { find } = await shallow.render({ bind: { data: testListResult }});

    expect(find('.result-image-placeholder')).not.toHaveFoundOne();
  });

  it('should show a grayed out icon when no download url is present', async () => {
    const testListResult: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test' };
    const { find } = await shallow.render({ bind: { data: testListResult }});

    expect(find('.no-download')).toHaveFoundOne();
  });

  it('should show a non-grayed out icon when download url is present', async () => {
    const testListResult: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { find } = await shallow.render({ bind: { data: testListResult }});

    expect(find('.download')).toHaveFoundOne();
  });
});
