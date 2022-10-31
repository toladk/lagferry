import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/shared/services/routes/routes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRouteDialogComponent } from '../dialogs/add-route-dialog/add-route-dialog.component';

@Component({
  selector: 'app-monitor-mgt',
  templateUrl: './monitor-mgt.component.html',
  styleUrls: ['./monitor-mgt.component.scss'],
})
export class MonitorMgtComponent implements OnInit {
  routes: any[] = [];
  position: boolean = true;

  constructor(
    private routesService: RoutesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllRoutes();
  }

  getAllRoutes() {
    this.routesService.getAllRoutes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.routes = res.data;
        // this.terminals = res?.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changePosition() {
    this.position = !this.position;
  }

  addRouteDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'route-dialog';

    const dialogRef = this.dialog.open(AddRouteDialogComponent, dialogConfig);
  }
}
