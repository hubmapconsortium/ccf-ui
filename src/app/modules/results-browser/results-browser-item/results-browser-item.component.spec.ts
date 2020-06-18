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
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test'};
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.result-image-placeholder')).toHaveFoundOne();
  });

  it('should not show a placeholder div when a thumbnail image url is present', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', thumbnailUrl: 'test.com'};
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.result-image-placeholder')).not.toHaveFoundOne();
  });

  it('should show a grayed out icon when no download url is present', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test' };
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.no-download')).toHaveFoundOne();
  });

  it('should show a non-grayed out icon when download url is present', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { find } = await shallow.render({ bind: { data }});

    expect(find('.download')).toHaveFoundOne();
  });

  it('should trigger the openImageViewer emit when a result with resultType image_viewer is clicked', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { instance, outputs } = await shallow.render({ bind: { data }});
    data.resultType = 'image_viewer';

    instance.openResult();
    expect(outputs.openImageViewer.emit).toHaveBeenCalled();
  });

  it('should trigger the openImageViewer emit when a result with no resultType is clicked', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { instance, outputs } = await shallow.render({ bind: { data }});

    instance.openResult();
    expect(outputs.openImageViewer.emit).toHaveBeenCalled();
  });

  it('should call window.open for a new tab when a result with external_link resultType is clicked', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { instance, outputs } = await shallow.render({ bind: { data }});
    data.resultUrl = 'testresult.com';
    data.resultType = 'external_link';
    const spy = spyOn(window, 'open');

    instance.openResult();
    expect(spy).toHaveBeenCalledWith(data.resultUrl, '_blank');
  });

  it('should call window.open in the same tab when a result with local_link resultType is clicked', async () => {
    const data: ListResult = { '@id': '123', '@type': 'ListResult', id: '123', label: 'test', downloadUrl: 'test.com' };
    const { instance, outputs } = await shallow.render({ bind: { data }});
    data.resultUrl = 'testresult.com';
    data.resultType = 'local_link';
    const spy = spyOn(window, 'open');

    instance.openResult();
    expect(spy).toHaveBeenCalledWith(data.resultUrl, '_self');
  });
});
