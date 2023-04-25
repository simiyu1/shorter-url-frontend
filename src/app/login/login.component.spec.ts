import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call login method of authenticationService when the form is valid', () => {
      const authService = TestBed.inject(AuthenticationService);
      const authServiceSpy = spyOn(authService, 'login').and.callThrough();

      component.loginForm.setValue({
        username: 'testuser',
        password: 'testpassword',
      });

      fixture.detectChanges();

      component.onSubmit();

      expect(authServiceSpy).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      });
    });

    it('should not call login method of authenticationService when the form is invalid', () => {
      const authService = TestBed.inject(AuthenticationService);
      const authServiceSpy = spyOn(authService, 'login');

      component.loginForm.setValue({
        username: '',
        password: '',
      });

      component.onSubmit();

      expect(authServiceSpy).not.toHaveBeenCalled();
    });

    it('should successfully log in as a non-admin user', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      const mockResponse = {
        token: 'fake-token',
      };
  
      component.loginForm.setValue({
        username: 'testuser',
        password: 'testpassword',
      });
  
      spyOn(authService, 'login').and.returnValue(of({ ...mockResponse, isAdmin: false }));
      component.onSubmit();
  
      const req = httpTestingController.expectOne('/api/login');
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
  
      expect(localStorage.getItem('authToken')).toEqual('fake-token');
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/dashboard']);
    });
  
    it('should successfully log in as an admin user', () => {
      const routerNavigateSpy = spyOn(router, 'navigate');
      const mockResponse = {
        token: 'fake-token',
      };
  
      component.loginForm.setValue({
        username: 'admin',
        password: 'adminpassword',
      });
  
      spyOn(authService, 'login').and.returnValue(of({ ...mockResponse, isAdmin: true }));
      component.onSubmit();
  
      const req = httpTestingController.expectOne('/api/login');
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
  
      expect(localStorage.getItem('authToken')).toEqual('fake-token');
      expect(routerNavigateSpy).toHaveBeenCalledWith(['/admin-dashboard']);
    });
  
    it('should not log in with an invalid username or password', () => {
      spyOn(window, 'alert');
      const mockResponse = {
        token: null,
      };
  
      component.loginForm.setValue({
        username: 'wronguser',
        password: 'wrongpassword',
      });
  
      component.onSubmit();
  
      const req = httpTestingController.expectOne('/api/login');
      expect(req.request.method).toEqual('POST');
      req.flush(mockResponse);
  
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(window.alert).toHaveBeenCalledWith('Invalid username or password');
    });

  });
});
