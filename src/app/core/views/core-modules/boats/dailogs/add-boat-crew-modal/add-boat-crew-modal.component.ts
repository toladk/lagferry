import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-add-boat-crew-modal',
  templateUrl: './add-boat-crew-modal.component.html',
  styleUrls: ['./add-boat-crew-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddBoatCrewModalComponent implements OnInit {

  crewForm!: FormGroup;

  crewMemberList!: any[]
  crewMemberListFiltered!: any[]
  boatId!: number;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddBoatCrewModalComponent>,
    private boatService: BoatsService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.crewForm = this.formBuilder.group({
      crewMemberId: ['', [Validators.required]],
    });

    this.getBoatId()
    this.getCrewMembers();
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  getCrewMembers(): void{
    this.boatService.getAllCrewMember().subscribe((result: any) => {
      if(result.status === 0){
        this.crewMemberList = result.data;
        this.crewMemberListFiltered = this.crewMemberList.filter(x => x.vessel === null);
      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.error.message);
    })
  }

  onSubmitAddCrew(): void{
    this.loading = true;
    const payload = {
      crewMemberId: Number(this.crewForm.value.crewMemberId),
      vesselId: Number(this.boatId)
    }
    this.boatService.addCrewMemberToVessel(payload, this.crewForm.value.crewMemberId, this.boatId).subscribe((result: any) => {
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
