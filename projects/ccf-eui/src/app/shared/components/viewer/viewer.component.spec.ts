import { Shallow } from 'shallow-render';
import { ViewerComponent } from './viewer.component';
import { ViewerModule } from './viewer.module';
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

describe('ViewerComponent', () => {
  let shallow: Shallow<ViewerComponent>;

  beforeEach(() => {
    shallow = new Shallow(ViewerComponent, ViewerModule);
  });

  it('should call openLink() when open link button is clicked', async () => {
    const { instance } = await shallow.render({ bind: {result: getListResult() }});
    const spy = spyOn(window, 'open');
    instance.openLink();
    expect(spy).toHaveBeenCalledWith(instance.result.resultUrl, '_blank');
  });

  it('should set loading to false', async () => {
    const { instance } = await shallow.render();
    instance.onLoad();
    expect(instance.loading).toBeFalse();
  });

  it('should set loading to true when input changes', async () => {
    const { instance } = await shallow.render({bind: {result: getListResult()}});
    instance.iframe.nativeElement = {};
    spyOn(instance, 'ngOnChanges');
    
    expect(instance.loading).toBeTrue();
  });

});
