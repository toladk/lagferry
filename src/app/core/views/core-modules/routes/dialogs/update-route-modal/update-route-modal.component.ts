import { RoutesService } from './../../../../../../shared/services/routes/routes.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-update-route-modal',
  templateUrl: './update-route-modal.component.html',
  styleUrls: ['./update-route-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateRouteModalComponent implements OnInit {

  routeForm!: FormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateRouteModalComponent>,
    private routeService: RoutesService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.routeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getRouteById()

  }

  closeDialog(){
    this.dialogRef.close();
  }

  getRouteById(){
    const routeId = this.routeService.returnRouteId()
    this.routeService.getRouteById(routeId).subscribe((result: any) => {
      this.routeForm.patchValue({...result.data})
    })
  }

  onSubmitUpdateRoute(): void{
    this.loading = true;
    this.routeService.updateRoute(this.routeForm.value).subscribe((result: any) => {
      if(result.status === 0){
        this.loading = false;
        this.closeDialog()

        const dialogConfig = new MatDialogConfig()

          dialogConfig.panelClass = 'success-dialog';
          dialogConfig.data = {description: result.message, action:'successfully'}
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;

          this.dialog.open( SuccessModalComponent, dialogConfig)

      } else {
        this.loading = false;
        this.notify.showError(result.message)
      }
    }, error => {
      this.loading = false;
      this.notify.showError(error.message || error.errors[0])
    })
  }

}
