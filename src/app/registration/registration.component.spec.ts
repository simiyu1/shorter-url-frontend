import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistrationComponent } from './registration.component';
import { AuthService } from '../services/auth.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RegistrationComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call register method of authService when the form is valid', () => {
      const authService = TestBed.inject(AuthService);
      const authServiceSpy = spyOn(authService, 'register').and.callThrough();
  
      component.registerForm.setValue({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });
  
      component.onSubmit();
  
      expect(authServiceSpy).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      });
    });
  
    it('should not call register method of authService when the form is invalid', () => {
      const authService = TestBed.inject(AuthService);
      const authServiceSpy = spyOn(authService, 'register');
  
      component.registerForm.setValue({
        username: '',
        email: 'invalid-email',
        password: '',
      });
  
      component.onSubmit();
  
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
  });
  
});
