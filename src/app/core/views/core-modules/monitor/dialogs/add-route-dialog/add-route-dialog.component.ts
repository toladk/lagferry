import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-route-dialog",
  templateUrl: "./add-route-dialog.component.html",
  styleUrls: ["./add-route-dialog.component.scss"]
})

export class AddRouteDialogComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<AddRouteDialogComponent>
    ) { }

    ngOnInit(): void {}

   closeDialog(){
    this.dialogRef.close();
  }
}