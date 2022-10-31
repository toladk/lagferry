import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/shared/models';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  updateForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,@Inject(MAT_DIALOG_DATA) public data: Users,
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      firstname: [ this.data.firstname, [Validators.required]],
      lastname: [this.data.lastname, [Validators.required]],
      email: [{ value: this.data.email, disabled:true }]
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.userService.updateUser(this.updateForm.value).subscribe({
      next: (res:any) => {
        this.loading = false;
        this.notification.showSuccess(res.message);
        this.dialogRef.close(res);
      },
      error: (err:any) => {
        this.loading = false;
        this.notification.showError(err);
      }
    });
  }

}
