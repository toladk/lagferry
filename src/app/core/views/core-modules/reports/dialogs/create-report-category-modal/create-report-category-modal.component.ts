import { ReportsService } from 'src/app/shared/services/reports/reports.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component';

@Component({
  selector: 'app-create-report-category-modal',
  templateUrl: './create-report-category-modal.component.html',
  styleUrls: ['./create-report-category-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateReportCategoryModalComponent implements OnInit {

  reportForm!: FormGroup;
  loading = false;
  createOrUpdate!: string;
  categoryIdUpdate!: number;

  constructor(
    public dialogRef: MatDialogRef<CreateReportCategoryModalComponent>,
    private reportService: ReportsService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getCreateOrUpdateValue();
    this.getCategoryById();

  }

  closeDialog(){
    this.dialogRef.close();
  }
  closeDialogUpdate(){
    this.dialogRef.close();
    // window.location.reload();
  }

  getCreateOrUpdateValue(): void{
    this.createOrUpdate = this.reportService.getValueFromReportCategory()
  }

  getCategoryById(): void{
    this.categoryIdUpdate = this.reportService.getCategoryIdValue();
    this.reportService.getCategoryReporById(this.categoryIdUpdate).subscribe((result: any) => {
      this.reportForm.patchValue({...result.data});
    })
  }

  onSubmitReportCategory(): void{
    if(this.createOrUpdate === 'create'){
      this.loading = true;
      this.reportService.createCategoryReport(this.reportForm.value).subscribe((result: any) => {
        if(result.status === 0){
          this.loading = false;
          this.closeDialogUpdate()

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
        this.notify.showError(error.errors[0] || error.message);
      })
    } else {
      this.loading = true;
      this.reportService.updateCategoryReport(this.categoryIdUpdate, this.reportForm.value).subscribe((result: any) => {
        if(result.status === 0){
          this.loading = false;
          this.closeDialogUpdate()

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
        this.notify.showError(error.errors[0] || error.message);
      })
    }
  }

}
