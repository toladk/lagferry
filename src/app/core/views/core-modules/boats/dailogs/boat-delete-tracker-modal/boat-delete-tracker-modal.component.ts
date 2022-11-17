import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-boat-delete-tracker-modal',
  templateUrl: './boat-delete-tracker-modal.component.html',
  styleUrls: ['./boat-delete-tracker-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoatDeleteTrackerModalComponent implements OnInit {

  crewMemberList!: any[]
  crewMemberListFiltered!: any[]
  boatId!: number;
  loading = false;
  boatTrackerId!: number;

  constructor(
    public dialogRef: MatDialogRef<BoatDeleteTrackerModalComponent>,
    private boatService: BoatsService,
    private notify: NotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.getBoatId()
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();

    this.boatService.getSingleBoat(this.boatId).subscribe((result: any) => {
      if(result.status === 0){
        this.boatTrackerId = result.data.tracker.trackerId;
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errors[0])
    })

  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteTracker(): void{
    this.boatService.deleteTracker(this.boatTrackerId).subscribe((result: any) => {
      if(result.status === 0){
        this.closeDialog()

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = 'success-dialog';
        dialogConfig.data = {description: result.message, action:'successfully'}
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open( SuccessModalComponent, dialogConfig)

      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errors[0])
    })
  }

}
