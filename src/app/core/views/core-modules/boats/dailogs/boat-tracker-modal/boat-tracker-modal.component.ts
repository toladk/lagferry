import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-boat-tracker-modal',
  templateUrl: './boat-tracker-modal.component.html',
  styleUrls: ['./boat-tracker-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoatTrackerModalComponent implements OnInit {

  trackerForm!: FormGroup;

  crewMemberList!: any[]
  crewMemberListFiltered!: any[]
  boatId!: number;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<BoatTrackerModalComponent>,
    private boatService: BoatsService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.trackerForm = this.formBuilder.group({
      notes: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    this.getBoatId()
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmitAddTracker(): void{
    this.loading = true;
    const payload = {
      serialNumber: this.trackerForm.value.serialNumber,
      notes: this.trackerForm.value.notes,
      phoneNumber: this.trackerForm.value.phoneNumber,
      vesselId: Number(this.boatId)
    }
    this.boatService.addTracker(payload).subscribe((result: any) => {
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

}
