import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
  });

  afterEach(() => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the login API with the correct credentials', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    const mockCredentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    service.login(mockCredentials).subscribe();

    const req = httpTestingController.expectOne(`${service['apiUrl']}/auth/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockCredentials);

    req.flush({});
  });
});
