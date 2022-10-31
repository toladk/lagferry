import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  loading: boolean = false;
  loginForm!: FormGroup;
  loginSub!: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private notification: NotificationService
  ) {}
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        this.loginForm.get(field)?.updateValueAndValidity();
        this.loginForm.get(field)?.markAsDirty();
      });
      return;
    }

    //
    this.loading = true;
    this.loginSub = this.authService.login(this.loginForm.value).subscribe({
      next: (data: User) => {
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.notification.showError(error.msg);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe();
  }
}
