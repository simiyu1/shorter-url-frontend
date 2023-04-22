import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UrlShorteningService } from './url-shortening.service';

describe('UrlShorteningService', () => {
  let service: UrlShorteningService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Make sure HttpClientTestingModule is imported
      providers: [UrlShorteningService],
    });
    service = TestBed.inject(UrlShorteningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
