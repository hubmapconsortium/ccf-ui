import { Shallow } from 'shallow-render';

import { JsonFileReaderComponent } from './json-file-reader.component';
import { JsonFileReaderModule } from './json-file-reader.module';


describe('JsonFileReaderComponent', () => {
  let shallow: Shallow<JsonFileReaderComponent>;
  let fileReaderInstance: jasmine.SpyObj<FileReader>;

  beforeEach(() => {
    shallow = new Shallow(JsonFileReaderComponent, JsonFileReaderModule);
    fileReaderInstance = jasmine.createSpyObj<FileReader>('FileReader', ['readAsText'], { result: '"abc"' });

    // Doesn't work with arrow functions.
    spyOn(globalThis, 'FileReader').and.callFake(function (): jasmine.SpyObj<FileReader> {
      return fileReaderInstance;
    });
  });

  it('should call triggerFileInput when the upload button is clicked', async () => {
    const { instance, find } = await shallow.render();
    const spy = spyOn(instance, 'triggerFileInput');
    const button = find('.upload-button');
    button.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger the fileInput click event when triggerFileInput is called', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance.fileInput.nativeElement, 'click');
    instance.triggerFileInput();
    expect(spy).toHaveBeenCalled();
  });

  it('should parse out the json from an input file event', async () => {
    const { instance } = await shallow.render();
    const blob: Blob = new Blob(['abc']);
    const event = { target: { files: [blob] } } as unknown as InputEvent;
    instance.handleFile(event);

    expect(fileReaderInstance.readAsText).toHaveBeenCalledWith(blob);
  });

  it('should emit the json extracted from the file input', async () => {
    const { instance, outputs } = await shallow.render();
    const blob: Blob = new Blob(['abc']);
    const event = { target: { files: [blob] } } as unknown as InputEvent;
    instance.handleFile(event);
    fileReaderInstance.onload?.call(fileReaderInstance, undefined as unknown);
    expect(outputs.parsedJson.emit).toHaveBeenCalledWith('abc');
  });

  it('should return if there are no files', async () => {
    const { instance } = await shallow.render();
    const event = { target: { files: undefined } } as unknown as InputEvent;
    instance.handleFile(event);
    expect(fileReaderInstance.readAsText).toHaveBeenCalledTimes(0);
  });
});
