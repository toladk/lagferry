import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SuccessModalComponent implements OnInit {

  description!:string;
  action!:string;

  constructor(
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {description: string, action:string}) { }

  ngOnInit(): void {
    this.description = this.data.description;
    this.action = this.data.action;
  }

  closeDialog(){
    this.dialogRef.close();
    window.location.reload()
  }

}
