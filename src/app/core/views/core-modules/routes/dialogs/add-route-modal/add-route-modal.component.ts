import { RoutesService } from 'src/app/shared/services/routes/routes.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-add-route-modal',
  templateUrl: './add-route-modal.component.html',
  styleUrls: ['./add-route-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddRouteModalComponent implements OnInit {

  imageURL!: string;
  zipFile!: string;
  uploadedZipFile!: string;
  loading = false;
  zipFileName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private dialog: MatDialog,
    private routeService: RoutesService,
    private dialogRef: MatDialogRef<AddRouteModalComponent>
  ){}

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  readZipFile(e: any): void{
    const file = e.target.files[0];
    const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
          const fileImg: string = this.imageURL;
          this.uploadedZipFile = fileImg.split(',')[1];
          this.zipFileName = file.name
      };
      reader.readAsDataURL(file);
  }

  onSubmitAddRoute(): void{
    this.loading = true;
    const payload = {
      file: this.uploadedZipFile
    }
    this.routeService.addRoute(payload).subscribe((result: any) => {
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
      console.log('ade', error);
      this.loading = false;
      this.notify.showError(error.message || error.errors[0])
    })
  }

}
