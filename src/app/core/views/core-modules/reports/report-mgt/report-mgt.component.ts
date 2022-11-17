import { StorageService } from './../../../../../shared/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ReportsService } from 'src/app/shared/services/reports/reports.service';

@Component({
  selector: 'app-report-mgt',
  templateUrl: './report-mgt.component.html',
  styleUrls: ['./report-mgt.component.scss'],
})
export class ReportMgtComponent implements OnInit {
  reports!: any[];

  constructor(
    private reportService: ReportsService,
    private notify: NotificationService,
    private route: Router,
    private storageService: StorageService
  ) // private dialog: MatDialog
  {}

  ngOnInit(): void {
    this.getReports();

    this.setMessagStorage('Report');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  getReports() {
    this.reportService.getReports().subscribe({
      next: (res: any) => {
        this.reports = res;
      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    });
  }

  resolveReport(reportId: string) {
    this.reportService.resolveReports(reportId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${res.message}`);
        this.getReports();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  archiveReport(reportId: string) {
    this.reportService.archiveReports(reportId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${res.message}`);
        this.getReports();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  goto(route: string) {
    this.route.navigateByUrl(route);
  }
}
