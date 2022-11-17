import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-boat-more-details-modal',
  templateUrl: './boat-more-details-modal.component.html',
  styleUrls: ['./boat-more-details-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoatMoreDetailsModalComponent implements OnInit {

  boatId!: number;
  boatDetails: any;

  constructor(
    public dialogRef: MatDialogRef<BoatMoreDetailsModalComponent>,
    private boatService: BoatsService
    ) { }

    ngOnInit(): void {
      this.getBoatId();
    }

    getBoatId(): void{
      this.boatId = this.boatService.getBoatIdSend();
      this.getBoatById();
    }

    getBoatById(): void{
      this.boatService.getSingleBoat(this.boatId).subscribe((result: any) => {
        if (result.status === 0){
          this.boatDetails = result.data;
          console.log('boat', this.boatDetails)
        }
      }, error => {
        // this.notify.showError(error.error.msg);
      })
    }

  closeDialog(){
    this.dialogRef.close();
  }

}
