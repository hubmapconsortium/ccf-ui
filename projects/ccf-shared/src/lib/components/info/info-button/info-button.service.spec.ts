import { InfoButtonService } from './info-button.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('InfoButtonService', () => {
  let service: InfoButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [InfoButtonService]
    }).compileComponents();

    spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of('# About'));
    service = TestBed.inject(InfoButtonService);
  });

  it('should test parse markdown function', () => {
    const testData = '# About';
    expect(service.parseMarkdown(testData)).toEqual([{ title: 'About', content: '' }]);
  });

  it('readMarkdown function should call parseMarkdown function', async () => {
    const spy = spyOn(service, 'parseMarkdown');
    service.readMarkdown();
    expect(spy).toHaveBeenCalled();
  });

  it('readMarkdown function should emit data to the markdownContent behavior subject', async () => {
    const spy = spyOn(service.markdownContent, 'next');
    service.readMarkdown();
    expect(spy).toHaveBeenCalled();
  });
});
