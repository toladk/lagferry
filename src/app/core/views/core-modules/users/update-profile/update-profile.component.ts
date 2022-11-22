import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  profileForm!: FormGroup
  loading = false;

  imageURL!: string;
  uploadedFile!: string;
  profileDetails: any;
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private userService: UsersService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      // email: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.setMessagStorage('Update Profile');

    this.getProfileInfo();
  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  getProfileInfo(): void{
    this.userService.getProfileInfo().subscribe((result: any) => {
      this.profileForm.patchValue({...result})
        this.profileDetails = result;
        this.userId = this.profileDetails.userId
    },error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }

  readImage(event:any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
          const fileImg: string = this.imageURL;
          this.uploadedFile = fileImg.split(',')[1];
      };
      reader.readAsDataURL(file);
      this.uploadPicture();
  }

  uploadPicture(): void{
    const payload = {
      image: this.uploadedFile
    }
    this.userService.updateImage(this.userId, payload).subscribe((result: any) => {
      if(result.status === 0) {
        this.notify.showSuccess(result.message);
      } else {
        this.notify.showError(result.message)
        this.imageURL = '';
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
      this.imageURL = '';
    })
  }

  onSubmitUpdateProfile(): void{
    this.loading = true;
    this.userService.updateUser(this.profileForm.value).subscribe((result: any) => {
      if(result.status === 0) {
        this.loading = false;

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = 'success-dialog';
        dialogConfig.data = {description: result.message, action:'successfully'}
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open( SuccessModalComponent, dialogConfig)

        this.router.navigateByUrl('/dashboard')

      } else {
        this.loading = false;
        this.notify.showError(result.message)
      }
    }, error => {
      this.loading = false;
      this.notify.showError(error.message || error.errors[0])
    })
  }

}
