import { StorageService } from './../../../../../shared/services/storage/storage.service';
import { CreateReportCategoryModalComponent } from './../dialogs/create-report-category-modal/create-report-category-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ReportsService } from 'src/app/shared/services/reports/reports.service';

@Component({
  selector: 'app-report-categories',
  templateUrl: './report-categories.component.html',
  styleUrls: ['./report-categories.component.scss']
})
export class ReportCategoriesComponent implements OnInit {

  categories!: any[];
  checkingCreateOrUpdateCategory!: string;
  categoryId!: number;

  constructor(
    private reportService: ReportsService,
    private notify: NotificationService,
    private route : Router,
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getReportCategories();

    this.setMessagStorage('Report Categories');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  getReportCategories(){
     this.reportService.getReportCategories().subscribe({
      next: (res: any) => {
        console.log(res)
        this.categories = res;

      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    })
  }

  createReportCategoryDialog(val: string){
      this.checkingCreateOrUpdateCategory = val;
      this.passingCreateAndUpdateValue()
      const dialogConfig = new MatDialogConfig()

      dialogConfig.panelClass = 'create-report-category-dialog';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open( CreateReportCategoryModalComponent, dialogConfig)
  }

  updateReportCategoryDialog(val: string, categoryId: number){
    this.checkingCreateOrUpdateCategory = val;
      this.categoryId = categoryId;
      this.passingCreateAndUpdateValue()
      const dialogConfig = new MatDialogConfig()

      dialogConfig.panelClass = 'create-report-category-dialog';
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open( CreateReportCategoryModalComponent, dialogConfig)
  }

  passingCreateAndUpdateValue(){
    this.reportService.createOrUpdate = this.checkingCreateOrUpdateCategory;
    this.reportService.categoryByToSend = this.categoryId;
  }

  deleteCategory(id: number): void{
    this.reportService.deleteCategoryReport(id).subscribe((result: any) => {
      if(result.status === 0){
        this.notify.showSuccess(result.message);
        this.getReportCategories();
      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }

  goto(route:string){
    this.route.navigateByUrl(route)
  }
}
