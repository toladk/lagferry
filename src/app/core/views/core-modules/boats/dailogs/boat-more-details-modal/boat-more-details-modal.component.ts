import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-boat-more-details-modal',
  templateUrl: './boat-more-details-modal.component.html',
  styleUrls: ['./boat-more-details-modal.component.scss']
})
export class BoatMoreDetailsModalComponent implements OnInit {

  description = 'ddddddddddddddddddddddd';
  action ='aaaaaaaaaaaaaaaaa';

  constructor(
    public dialogRef: MatDialogRef<BoatMoreDetailsModalComponent>
    ) { }

  ngOnInit(): void {

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
