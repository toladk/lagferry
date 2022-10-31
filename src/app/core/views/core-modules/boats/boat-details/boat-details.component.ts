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

@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {

  boatId!: number;
  routeSub!: Subscription;
  boatDetails: any;

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

}
