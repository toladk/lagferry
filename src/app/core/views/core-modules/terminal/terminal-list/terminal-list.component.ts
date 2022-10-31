import { TerminalService } from './../../../../../shared/services/terminals/terminal.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CreateTerminalDialogComponent } from '../create-terminal-dialog/create-terminal-dialog.component';
@Component({
  selector: 'app-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrls: ['./terminal-list.component.scss'],
})
export class TerminalListComponent implements OnInit {

  terminals!: any[];

  constructor(
    private terminalService:TerminalService,
    private notify: NotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getTerminals();
  }

  createTerminalDialog(){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'terminal-dialog';

    const dialogRef = this.dialog.open(CreateTerminalDialogComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(
    //   data => console.log("dialog output", data)
    // );

  }

  getTerminals(){
    this.terminalService.getAllTerminal().subscribe({
      next: (res: any) => {
        console.log(res)
        this.terminals = res?.data;
      },
      error: (err) => {
        console.log(err)
        this.notify.showError(err.msg);
      },
    });
  }

}
