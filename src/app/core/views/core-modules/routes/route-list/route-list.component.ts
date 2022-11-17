import { StorageService } from './../../../../../shared/services/storage/storage.service';
import { UpdateRouteModalComponent } from './../dialogs/update-route-modal/update-route-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getRoutes();

    this.setMessagStorage('Route Management');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
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

  goto(route:string){
    this.route.navigateByUrl(route)
  }

  activateRoute(id: number): void{
    this.routesService.activateRoute(id).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message);
        this.getRoutes()
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errrors[0])
    })
  }

  deactivateRoute(id: number): void{
    this.routesService.deactivateRoute(id).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message);
        this.getRoutes()
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.error.message || error.error.errrors[0])
    })
  }

  openCreateRouteModal(): void{
    const dialogConfig = new MatDialogConfig()

      dialogConfig.panelClass = 'add-route-dialog';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open( AddRouteModalComponent, dialogConfig)
  }

  openUpdateRouteModal(id: number): void{
    const dialogConfig = new MatDialogConfig()

      dialogConfig.panelClass = 'update-route-dialog';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open( UpdateRouteModalComponent, dialogConfig)

    this.routesService.routeId = id;
  }

}
