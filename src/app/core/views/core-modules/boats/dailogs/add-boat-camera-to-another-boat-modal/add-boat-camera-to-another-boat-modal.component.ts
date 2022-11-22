import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';


@Component({
  selector: 'app-add-boat-camera-to-another-boat-modal',
  templateUrl: './add-boat-camera-to-another-boat-modal.component.html',
  styleUrls: ['./add-boat-camera-to-another-boat-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBoatCameraToAnotherBoatModalComponent implements OnInit {

  cameraForm!: FormGroup;

  boatList!: any[]
  boatListFiltered!: any[]
  boatId!: number;
  loading = false;
  cameraId!: number;

  constructor(
    public dialogRef: MatDialogRef<AddBoatCameraToAnotherBoatModalComponent>,
    private boatService: BoatsService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.cameraForm = this.formBuilder.group({
      vessel: ['', [Validators.required]],
    });

    this.getBoatId();
    this.getBoat();
    this.getCameraId();
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
  }

  getCameraId(): void{
    this.cameraId = this.boatService.getCameraIdSend();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getBoat(): void{
    this.boatService.getBoats().subscribe((result: any) => {
      if(result.status === 0){
        this.boatList = result.data;
      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.error.message);
    })
  }

  onSubmitAddCameraToAnotherBoat(): void{
    this.boatService.assignCameraToAnotherVessel(this.cameraId, this.boatId).subscribe((result: any) => {
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



