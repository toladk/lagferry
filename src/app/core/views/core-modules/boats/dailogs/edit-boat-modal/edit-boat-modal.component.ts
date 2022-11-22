import { BoatsService } from 'src/app/shared/services/boats/boats.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TerminalService } from 'src/app/shared/services/terminals/terminal.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';
import { Boats } from 'src/app/shared/models/interfaces/boats.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-boat-modal',
  templateUrl: './edit-boat-modal.component.html',
  styleUrls: ['./edit-boat-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditBoatModalComponent implements OnInit {

  boatForm!: FormGroup;
  imageURL!: string;
  uploadedFile!: string;
  zipFile!: string;

  loading = false;
  boatId!: number;


  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private dialog: MatDialog,
    private boatService: BoatsService,
    private dialogRef: MatDialogRef<EditBoatModalComponent>,
    // @Inject(MAT_DIALOG_DATA),
  ){
    this.boatForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      referenceNumber: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      width: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      length: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      yearOfBuilt: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      tonnage: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      speed: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      draft: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
    this.getBoatId();
  }

  getBoatId(): void{
    this.boatId = this.boatService.getBoatIdSend();
    this.getBoatById();
  }

  getBoatById(): void{
    this.boatService.getSingleBoat(this.boatId).subscribe((result: any) => {
      this.boatForm.patchValue({...result.data})
    }, error => {
      // this.notify.showError(error.error.msg);
    })
  }

  readImage(event:any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
        reader.onload = () => {
          this.imageURL = reader.result as string;
          const fileImg: string = this.imageURL;
          this.uploadedFile = fileImg.split(',')[1];
      };
      reader.readAsDataURL(file);
      this.onsubitPictureUpload();
  }

  onsubitPictureUpload(): void{
    const payload = {
      image: this.uploadedFile
    }
    this.boatService.uploadBoatPicture(payload, this.boatId).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message);
      } else {
        this.notify.showError(result.message);
        this.imageURL = '';
      }
    }, error => {
      this.notify.showError('Something has gone wrong on the server');
      this.imageURL = '';
    })
  }

  onSubmitUpdateBoat(){
    this.loading = true;
    this.boatService.updateBoat(this.boatForm.value, this.boatId).subscribe((result: any) => {
      if(result.status === 0){
        this.loading = false;
        this.closeDialog();

        const dialogConfig = new MatDialogConfig()

        dialogConfig.panelClass = 'success-dialog';
        dialogConfig.data = {description: result.message, action:'successfully'}
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        this.dialog.open( SuccessModalComponent, dialogConfig)

      } else {
        this.loading = false;
        this.notify.showError(result.message);
      }
    }, error => {
      this.loading = false;
      this.notify.showError(error.error.message || error.error.errors[0]);
    })
  }

  onSubmitSuccess(){

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
