import { AddBoatCameraToAnotherBoatModalComponent } from './../dailogs/add-boat-camera-to-another-boat-modal/add-boat-camera-to-another-boat-modal.component';
import { BoatDeleteTrackerModalComponent } from './../dailogs/boat-delete-tracker-modal/boat-delete-tracker-modal.component';
import { BoatTrackerModalComponent } from './../dailogs/boat-tracker-modal/boat-tracker-modal.component';
import { AddBoatCrewModalComponent } from './../dailogs/add-boat-crew-modal/add-boat-crew-modal.component';
import { EditBoatModalComponent } from './../dailogs/edit-boat-modal/edit-boat-modal.component';
import { BoatMoreDetailsModalComponent } from './../dailogs/boat-more-details-modal/boat-more-details-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { TerminalService } from 'src/app/shared/services/terminals/terminal.service';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { Boats } from 'src/app/shared/models/interfaces/boats.interface';
import { AddBoatCameraModalComponent } from '../dailogs/add-boat-camera-modal/add-boat-camera-modal.component';

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss'],
})
export class BoatDetailsComponent implements OnInit {

  boatId!: number;
  routeSub!: Subscription;
  boatDetails: any;
  crewMemberList!: any[];
  cameraId!: number;

  constructor(
    private actRoute: ActivatedRoute,
    private route: Router,
    private notify: NotificationService,
    private dialog: MatDialog,
    private boatService: BoatsService,

  ) { }

  ngOnInit(): void {
    this.getParamId();
  }

  getParamId(){
    this.routeSub = this.actRoute.params.subscribe((param:any)=>{
      this.boatId = param.id
      console.log(this.boatId)
      this.getBoatById()
    })
  }

  getBoatById(): void{
    this.boatService.getSingleBoat(this.boatId).subscribe((result: any) => {
      if (result.status === 0){
        this.boatDetails = result.data;
        this.crewMemberList = this.boatDetails.crewMembers;
        console.log('boat', this.boatDetails)
      }
    }, error => {
      this.notify.showError(error.error.msg);
    })
  }

  goto(route:string){
    this.route.navigateByUrl(route)
  }

  moreDetailsDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'boat-more-details-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( BoatMoreDetailsModalComponent, dialogConfig)

  }

  editBoatDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'edit-boat-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( EditBoatModalComponent, dialogConfig)

  }

  assignCrewMemeberDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'add-boat-crew-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( AddBoatCrewModalComponent, dialogConfig)

  }

  addCameraDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'add-camera-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( AddBoatCameraModalComponent, dialogConfig)

  }

  addCameraToAnotherBoatDialog(id: number): void{
    this.boatService.getCameraById(id);

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'add-camera-to-another-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( AddBoatCameraToAnotherBoatModalComponent, dialogConfig)

  }

  boatTrackerDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'boat-tracker-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( BoatTrackerModalComponent, dialogConfig)

  }

  deleteTrackerDialog(): void{

    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'delete-tracker-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( BoatDeleteTrackerModalComponent, dialogConfig)

  }

}
