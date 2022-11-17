import { StorageService } from './../../../../../shared/services/storage/storage.service';
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
    private dialog: MatDialog,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.getTerminals();

    this.setMessagStorage('Terminal Management');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
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

  activateTerminal(id: number){
    this.terminalService.activateTerminal(id).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message)
        this.getTerminals()
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errors[0])
    })
  }

  deactivateTerminal(id: number){
    this.terminalService.deactivateTerminal(id).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message)
        this.getTerminals()
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errors[0])
    })
  }

}
