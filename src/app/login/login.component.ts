import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            if (this.authService.isAdmin()) { // Check if the user has the 'ADMIN' role
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          } else {
            alert('Invalid username or password');
          }
        },
        (error) => {
          console.log("----", JSON.stringify(error))
          //alert('An error occurred. Please try again later.');
        }
      );
    }
  }
}