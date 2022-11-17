import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateUserComponent } from '../../../users/create-user/create-user.component';

@Component({
  selector: 'app-add-boat-modal',
  templateUrl: './add-boat-modal.component.html',
  styleUrls: ['./add-boat-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBoatModalComponent implements OnInit {
  boatForm!: FormGroup;

  loading = false;
  boatId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private dialog: MatDialog,
    private boatService: BoatsService,
    private dialogRef: MatDialogRef<AddBoatModalComponent>,
    // @Inject(MAT_DIALOG_DATA),
  ){
    this.boatForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      width: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      length: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      yearOfBuilt: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      tonnage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      speed: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      draft: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
    this.getBoatId();
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
  }

  onSubmitAddBoat(){
    this.loading = true;
    this.boatService.createBoat(this.boatForm.value).subscribe((result: any) => {
      if(result.status === 0){
        this.loading = false;
        this.closeDialog();

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = 'success-dialog';
        dialogConfig.data = {description: result.message, action:'successfully'}
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open( SuccessModalComponent, dialogConfig)

      } else {
        this.loading = false;
        this.notify.showError(result.message);
      }
    }, error => {
      this.loading = false;
      this.notify.showError(error.error.message || error.error.errors[0]);
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
