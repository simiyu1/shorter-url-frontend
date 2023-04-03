import { TestBed } from '@angular/core/testing';

import { UrlShorteningService } from './url-shortening.service';

describe('UrlShorteningService', () => {
  let service: UrlShorteningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlShorteningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
