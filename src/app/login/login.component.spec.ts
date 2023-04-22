import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { AuthenticationService } from '../services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
  });
});
