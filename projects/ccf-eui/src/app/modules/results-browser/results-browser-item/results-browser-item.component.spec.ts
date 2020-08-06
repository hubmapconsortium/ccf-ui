import { Shallow } from 'shallow-render';

import { ResultsBrowserItemComponent } from './results-browser-item.component';
import { ResultsBrowserItemModule } from './results-browser-item.module';
import { ListResult } from 'ccf-database';

function getListResult(): ListResult {
  return {
    '@id': '123',
    '@type': 'ListResult',
    id: '123',
    label: 'test',
    thumbnailUrl: 'test.com',
    downloadTooltip: 'test tooltip',
    resultUrl: 'resultsurl.com',
    downloadUrl: 'download.com'
  } as ListResult;
}


describe('ResultsBrowserItemComponent', () => {
  let shallow: Shallow<ResultsBrowserItemComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserItemComponent, ResultsBrowserItemModule);
  });

  it('should show a placeholder div when no thumbnail image url is present', async () => {
    const data = getListResult();
    delete data.thumbnailUrl;
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.result-image-placeholder')).toHaveFoundOne();
  });

  it('should not show a placeholder div when a thumbnail image url is present', async () => {
    const { find } = await shallow.render({ bind: { data: getListResult() }});

    expect(find('.result-image-placeholder')).not.toHaveFoundOne();
  });

  it('should show a grayed out icon when no download url is present', async () => {
    const data = getListResult();
    delete data.downloadUrl;
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.no-download')).toHaveFoundOne();
  });

  it('should show a non-grayed out icon when download url is present', async () => {
    const { find } = await shallow.render({ bind: { data: getListResult() }});
    expect(find('.download')).toHaveFoundOne();
  });

  it('should trigger the openImageViewer emit when a result with resultType image_viewer is clicked', async () => {
    const { outputs, instance } = await shallow.render({ bind: { data: getListResult() }});
    instance.data.resultType = 'image_viewer';

    instance.openResult();
    expect(outputs.openImageViewer.emit).toHaveBeenCalled();
  });

  it('should trigger the openImageViewer emit when a result with no resultType is clicked', async () => {
    const { outputs, instance } = await shallow.render({ bind: { data: getListResult() }});

    instance.openResult();
    expect(outputs.openImageViewer.emit).toHaveBeenCalled();
  });

  it('should call window.open for a new tab when a result with external_link resultType is clicked', async () => {
    const { instance } = await shallow.render({ bind: { data: getListResult() }});
    instance.data.resultType = 'external_link';
    const spy = spyOn(window, 'open');

    instance.openResult();
    expect(spy).toHaveBeenCalledWith(instance.data.resultUrl, '_blank');
  });

  it('should call window.open in the same tab when a result with local_link resultType is clicked', async () => {
    const { instance } = await shallow.render({ bind: { data: getListResult() }});
    instance.data.resultType = 'local_link';
    const spy = spyOn(window, 'open');

    instance.openResult();
    expect(spy).toHaveBeenCalledWith(instance.data.resultUrl, '_self');
  });
});
