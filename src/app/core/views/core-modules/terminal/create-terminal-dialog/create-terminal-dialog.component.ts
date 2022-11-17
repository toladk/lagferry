import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SuccessModalComponent } from "src/app/shared/components/success-modal/success-modal.component";
import { NotificationService } from "src/app/shared/services/notification.service";
import { TerminalService } from "src/app/shared/services/terminals/terminal.service";

@Component({
  selector: 'app-create-terminal-dialog',
  templateUrl:'./create-terminal-dialog.component.html',
  styleUrls:['./create-terminal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateTerminalDialogComponent implements OnInit{

  terminalForm!: FormGroup;
  imageURL!: string;
  zipFile!: string;
  loading = false;
  imageURLZip!: string;
  zipFileName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private dialog: MatDialog,
    private terminalService: TerminalService,
    private dialogRef: MatDialogRef<CreateTerminalDialogComponent>,
    // @Inject(MAT_DIALOG_DATA),
  ){
    this.terminalForm = this.formBuilder.group({
      zip:[""],
      file:["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.loading = true;
    let data = {
      file: this.imageURLZip
    }
      this.terminalService
      .addTerminal(data)
      .subscribe({
        next:(res:any) => {
          console.log(res?.errors);
          this.loading = false;

          this.notify.showSuccess(res?.msg)
          this.dialogRef.close(data)
          this.onSubmitSuccess();
        },
        error:(error:any) => {
          this.loading = false;
          this.notify.showError(error.message);
        }
      })
  }

  onSubmitSuccess(){
    const dialogConfig = new MatDialogConfig()

    dialogConfig.panelClass = 'success-dialog';
    dialogConfig.data = {description: 'Terminal', action:'Created'}
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(
      SuccessModalComponent,
      dialogConfig
    )
  }

  readImage(event:any): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.terminalForm.patchValue({
      file: file.name
    });

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  readZipFile(event:any): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURLZip = reader.result as string;
      this.zipFileName = file.name
    }
    reader.readAsDataURL(file)
  }

}
