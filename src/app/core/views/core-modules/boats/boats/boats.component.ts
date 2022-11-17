import { StorageService } from './../../../../../shared/services/storage/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Users } from 'src/app/shared/models';
import { Boats } from 'src/app/shared/models/interfaces/boats.interface';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AddBoatModalComponent } from '../dailogs/add-boat-modal/add-boat-modal.component';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.scss']
})
export class BoatsComponent implements OnInit {

  boats!: Boats[];
  // boats!: any[];
  boatDetails!: any[];
  crewMembers!: any[];
  // boats = [
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'},
  //   {name: 'MF-Akran', speed:'25Km/hr', vesselId: '234', referenceNumber:'LAG56908765', image:'/assets/svg/boat-img.svg'}
  // ];

  constructor(
    private boatsService: BoatsService,
    private notify: NotificationService,
    private route : Router,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {

    sessionStorage.setItem('title', 'Boat Management');

    this.getBoats();

    this.setMessagStorage('Boat Management');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  getBoats() {
    this.boatsService.getBoats().subscribe({
      next: (res: any) => {
        console.log(res)
        this.boats = res.data;

      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    });
  }

  createBoatDialog() {
    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'add-boat-dialog';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open( AddBoatModalComponent, dialogConfig)
  }

  activate(boat: Boats) {
    this.boatsService.activateBoat(boat.vesselId).subscribe({
      next: (res: any) => {
        // this.notify.showSuccess(`${user.firstname} ${user.lastname} ${res.message}`);
        this.getBoats();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  deactivate(boat: Boats) {
    this.boatsService.deactivateBoat(boat.vesselId).subscribe({
      next: (res: any) => {
        // this.notify.showSuccess(`${user.firstname} ${user.lastname} ${res.message}`);
        this.getBoats();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  getBoatInfo(vesselId: number){
    //  alert(`this is vesselId ${vesselId}`)
     this.boatsService.getSingleBoat(vesselId).subscribe({
      next: (res: any) => {
       this.boatDetails = [res?.data];
       this.crewMembers = res?.data?.crewMembers;
       console.log(this.boatDetails);
       console.log(this.crewMembers);

      },
      error: (err:any) => {
        this.notify.showError(err.msg);
      }
    });
  }

  goto(route:string){
      this.route.navigateByUrl(route)
  }

}
