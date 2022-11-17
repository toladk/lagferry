import { DashboardService } from './../../../../shared/services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EditProfileComponent } from 'src/app/core/main/layout/edit-profile/edit-profile.component';
import { Users } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { StorageService } from 'src/app/shared/services/storage/storage.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
export type ChartPieOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartBarOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  titleManagement = 'Dashboard'

  public chartOptions: Partial<ChartOptions> | any;
  public chartPieOptions: Partial<ChartPieOptions> | any;
  public chartBarOptions: Partial<ChartBarOptions> | any;

  myFakeData = [
    { id:"1", route:"falomo - ikoyi",  date:"16/02/2022", time:["8:45 AM","6:34 PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
    { id:"2", route:"falomo - ikoyi ", date:"16/02/2022", time:["8:45 AM","6:34 PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
    { id:"3", route:"falomo - ikoyi ", date:"16/02/2022", time:["8:45 AM","6:34 PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
    { id:"4", route:"falomo - ikoyi ", date:"16/02/2022", time:["8:45 AM","6:34 PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
  ]

  terminalList!: any[];
  terminalDetails: any;
  terminalDetailsList!: any[];
  terminalListFirstIndex: any;
  reportDetails: any;
  incidentDetails: any;
  summaryDetails: any;

  constructor(
    private auth: AuthenticationService,
    private notify: NotificationService,
    private userService: UsersService,
    private dialog: MatDialog,
    public authService : AuthenticationService,
    private route: Router,
    private dashbaordService: DashboardService,
    private storageService: StorageService
  ) {}
  vesselSub!: Subscription;

  userInfo!: Users;

  ngOnInit(): void {

    this.getLineApexChart();
    this.getPieApexChart();
    this.getBarApexChert();

    this.getAllTerminal();
    this.getDashboardSummary()

    this.setMessagStorage('Dashboard');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  goto(route:string){
    this.route.navigateByUrl(route)
  }

  getDashboardSummary(): void{
    this.dashbaordService.getSummary('THIS_YEAR').subscribe((result: any) => {
      if(result.status === 0){
        this.summaryDetails = result.data;
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.message || error.erros[0])
    })
  }
  getChangedDashboard(e: any): void{
    const data = e.target.value;
    this.dashbaordService.getSummary(data).subscribe((result: any) => {
      if(result.status === 0){
        this.summaryDetails = result.data;
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.message || error.erros[0])
    })
  }

  getLineApexChart(): void{
    this.chartOptions = {
      series: [
        {
          name: "Boat",
          data: [120, 41, 35, 51, 114, 62, 169, 91, 148, 121, 67, 89]
        }
      ],
      chart: {
        height: 400,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Boat Route Covered",
        align: "left"
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
      },
      yaxis: {
        min: 5,
        max: 200,
        labels: {
          show: true,
          formatter: (value: any) => {return `${value}km`}
        }
      },
    };
  }

  getPieApexChart(): void{
    this.dashbaordService.getPieChatInfo('THIS_YEAR').subscribe((result: any) => {
      if(result.status === 0){
        this.reportDetails = result.data;

        this.chartPieOptions = {
          series: [this.reportDetails.resolvedReports, this.reportDetails.totalReports, this.reportDetails.unresolvedReports],
          chart: {
            type: "donut"
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#F3061A", "#803DD6", "#198D3A"],
          labels: [`${this.reportDetails.resolvedReports} Resolved Reports`, `${this.reportDetails.totalReports} Total Reports`, `${this.reportDetails.unresolvedReports} Unresolved Reports`],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })

  }
  getChangedPieChart(e: any): void{
    const data = e.target.value;
    this.dashbaordService.getPieChatInfo(data).subscribe((result: any) => {
      if(result.status === 0){
        this.reportDetails = result.data;

        this.chartPieOptions = {
          series: [this.reportDetails.resolvedReports, this.reportDetails.totalReports, this.reportDetails.unresolvedReports],
          chart: {
            type: "donut"
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#F3061A", "#803DD6", "#198D3A"],
          labels: [`${this.reportDetails.resolvedReports} Resolved Reports`, `${this.reportDetails.totalReports} Total Reports`, `${this.reportDetails.unresolvedReports} Unresolved Reports`],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

      } else {
        this.notify.showError(result.message);
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }

  getBarApexChert(): void{
    this.dashbaordService.getBarChatInfo(1).subscribe((result: any) => {
      if(result.status === 0){
        this.incidentDetails = result.data;

        this.chartBarOptions = {
          series: [{
            name: 'Boat',
            data: [44, 55, 41, 37, 22, 43]
          }],
            chart: {
            type: 'bar',
            height: 180,
            stacked: true,
          },
          stroke: {
            width: 1,
            colors: ['#fff']
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: ''
          },
          xaxis: {
            categories: ['MF-Akran', 'MF-Akran', 'MF-Akran', 'MF-Akran', 'MF-Akran', 'MF-Akran']
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
          }
        };

      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }



  getProfileInfo() {
    this.userService.getProfileInfo().subscribe({
      next: (res: any) => {
        this.userInfo = res;
      },
    });
  }

  openEditModal() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '20rem',
      data: this.userInfo,
      position: { top: '20px', right: '20px' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.status === 0) {
        this.getProfileInfo();
      }
    });
  }

  ngOnDestroy(): void {
    // this.vesselSub.unsubscribe();
  }

  getAllTerminal(): void{
    this.dashbaordService.getAllTerminal().subscribe((result: any) => {
      if(result.status === 0){
        this.terminalList = result.data
        this.terminalListFirstIndex = result.data.find((x: { name: any; }) => x.name)

        this.dashbaordService.getTerminalById(this.terminalListFirstIndex.terminalId).subscribe((result: any) => {
          if(result.status === 0){
            this.terminalDetails = result.data;
            this.terminalDetailsList = this.terminalDetails.schedules;
          } else {
            this.notify.showError(result.message)
          }
        }, error => {
          this.notify.showError(error.message || error.errors[0])
        })

      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }

  getTerminalId(e: any): void{
    const terminalId = e.target.value;
    console.log('dddd', terminalId)
    this.dashbaordService.getTerminalById(terminalId).subscribe((result: any) => {
      if(result.status === 0){
        this.terminalDetails = result.data;
        this.terminalDetailsList = this.terminalDetails.schedules;
        console.log('eeeee', this.terminalDetailsList)
      } else {
        this.notify.showError(result.message)
      }
    }, error => {
      this.notify.showError(error.message || error.errors[0])
    })
  }



}
