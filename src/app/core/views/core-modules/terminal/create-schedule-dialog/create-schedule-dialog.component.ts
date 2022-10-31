import { RoutesService } from './../../../../../shared/services/routes/routes.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { TerminalService } from 'src/app/shared/services/terminals/terminal.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateScheduleDialogComponent implements OnInit {

  scheduleForm!: FormGroup;
  description!:string;
  terminalList!: any[];
  routeList!: any[];
  vesselList!: any[];

  constructor(
    private dialog: MatDialog,
    private routesService: RoutesService,
    private terminalService: TerminalService,
    private vesselService: BoatsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {description: string}
  ) {
    this.scheduleForm = this.fb.group({
      startTerminal:[''],
      endTerminal: [''],
      route: [''],
      vessel:[''],
      stopTerminals: [''],
      scheduleDate: [''],
      scheduleTime: ['']
    })
  }

  ngOnInit(): void {
    this.getAllDropDowns();
    this.description = this.data.description;

  }

  getAllDropDowns(){
    const terminals = this.terminalService.getAllTerminal();
    const routes = this.routesService.getAllRoutes();
    const vessels = this.vesselService.getBoats();

    forkJoin([terminals, routes, vessels]).subscribe((res:any) => {
      this.terminalList = res[0].data;
      // console.log(this.terminalList)
      this.routeList = res[1];
      // console.log(this.routeList)
      this.vesselList = res[2].data;
      // console.log(this.vesselList)
  });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){

    console.log(this.scheduleForm.value);

      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'success-dialog';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      if (this.description == 'Add') {
        dialogConfig.data = {
          description:'Schedule',
          action:'Created'
        };
      }else{
        dialogConfig.data = {
          description:'Schedule',
          action:'Edited'
        };
      }

      this.dialog.open(SuccessModalComponent,
        dialogConfig,
      )
  }


}
