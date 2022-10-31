import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CreateUserComponent } from '../../users/create-user/create-user.component';

@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent implements OnInit {
  createForm!: FormGroup;
  crewTypes = ['CAPTAIN', 'DECKHAND']
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      type: ['DECKHAND', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [ '' ,[Validators.required]],
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
    this.userService.createCrewMember(this.createForm.value).subscribe({
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
