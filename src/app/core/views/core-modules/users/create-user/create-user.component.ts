import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getErrorMessage() {
    if (this.createForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    return this.createForm.get('email')?.hasError('email')
      ? 'Please enter a valid email address'
      : '';
  }

  submit(): void {
    this.loading = true;
    this.userService.createUser(this.createForm.value).subscribe({
      next: (res:any) => {
        this.loading = false;
        this.notification.showSuccess(res.message);
        this.dialogRef.close(res);
      },
      error: (err) => {
        this.loading = false;
        this.notification.showError(err);
      },
    });
  }
}
