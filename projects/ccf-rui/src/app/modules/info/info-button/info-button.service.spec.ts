import { InfoButtonService } from './info-button.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('InfoButtonService', () => {
  let service: InfoButtonService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [InfoButtonService]
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InfoButtonService);
  });

  it('can test http GET', () => {
    const testData = '# About';
    const documentationURL = 'assets/docs/TEST.md';
    httpClient.get(documentationURL)
      .subscribe(data => {
        expect(data).toEqual(testData);
      });

    const req = httpTestingController.expectOne('assets/docs/TEST.md');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('should test parse markdown function', () => {
    const testData: string = '# About'
    expect(service.parseMarkdown(testData)).toEqual([{title: 'About', content: ''}])
  });
});
