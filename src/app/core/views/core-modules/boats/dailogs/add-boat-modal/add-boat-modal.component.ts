import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateUserComponent } from '../../../users/create-user/create-user.component';

@Component({
  selector: 'app-add-boat-modal',
  templateUrl: './add-boat-modal.component.html',
  styleUrls: ['./add-boat-modal.component.scss'],
})
export class AddBoatModalComponent implements OnInit {
  createForm!: FormGroup;
  boatTypes = ['Double Decker', 'Single Decker'];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private boatService: BoatsService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<CreateUserComponent>
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      yearOfBuilt: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
      tonnage: [null, [Validators.required]],
      length: [null, [Validators.required]],
      width: [null, [Validators.required]],
      draft: [null, [Validators.required]],
      speed: [null, [Validators.required]],
    });
  }


  submit(): void {
    this.loading = true;
    this.boatService.createBoat(this.createForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
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
