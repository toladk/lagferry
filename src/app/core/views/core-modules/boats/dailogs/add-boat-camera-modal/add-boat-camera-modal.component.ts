import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-add-boat-camera-modal',
  templateUrl: './add-boat-camera-modal.component.html',
  styleUrls: ['./add-boat-camera-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBoatCameraModalComponent implements OnInit {

  cameraForm!: FormGroup;

  cameraList!: any[]
  cameraListFiltered!: any[]
  boatId!: number;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddBoatCameraModalComponent>,
    private boatService: BoatsService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.cameraForm = this.formBuilder.group({
      serialNumber: ['', [Validators.required]],
    });

    this.getBoatId()
    this.getCamera();
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getCamera(): void{
    this.boatService.getAllCamera().subscribe((result: any) => {
      if(result.status === 0){
        this.cameraList = result.data;
      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.error.message);
    })
  }

  onSubmitAddCamera(): void{
    this.loading = true;
    const payload = {
      serialNumber: this.cameraForm.value.serialNumber,
      vesselId: Number(this.boatId)
    }
    this.boatService.addCameraToBoat(payload).subscribe((result: any) => {
      if(result.status === 0){
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

}


