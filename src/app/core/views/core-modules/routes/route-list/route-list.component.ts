import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { RoutesService } from 'src/app/shared/services/routes/routes.service';
import { AddRouteModalComponent } from '../dialogs/add-route-modal/add-route-modal.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  routes!: any[];

  constructor(
    private notify: NotificationService,
    private route : Router,
    private routesService : RoutesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this.routesService.getAllRoutes().subscribe({
      next: (res: any) => {
        console.log(res)
        this.routes = res;

      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    });
  }

  createRouteDialog() {
    const dialogRef = this.dialog.open(AddRouteModalComponent, { width: '35rem'});

    dialogRef.afterClosed().subscribe((result) => {
      if (result.status === 0) {
        this.getRoutes();
      }
    });
  }


  goto(route:string){
    this.route.navigateByUrl(route)
}

}
