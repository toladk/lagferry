import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateScheduleDialogComponent } from 'src/app/core/views/core-modules/terminal/create-schedule-dialog/create-schedule-dialog.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ScheduleService } from 'src/app/shared/services/schedule/schedule.service';
import { TerminalService } from 'src/app/shared/services/terminals/terminal.service';

const SCHEDULE_DATA = [
  { id:"1", route:"falomo - ikoyi",  date:"16/02/2022", time:["8AM","6PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
  { id:"2", route:"falomo - ikoyi ", date:"16/02/2022", time:["8AM","6PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
  { id:"3", route:"falomo - ikoyi ", date:"16/02/2022", time:["8AM","6PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
  { id:"4", route:"falomo - ikoyi ", date:"16/02/2022", time:["8AM","6PM"], vessel:"MF - Akran", captain:[{img:"/assets/images/profileImg.png"}, {name:"John Doe"}], crew:["/assets/images/profileImg.png", "/assets/images/profileImg.png","/assets/images/profileImg.png"]},
]

@Component({
  selector: 'app-terminal-detail',
  templateUrl: './terminal-detail.component.html',
  styleUrls: ['./terminal-detail.component.scss']
})
export class TerminalDetailComponent implements OnInit {

  routeId!:string;
  routeSub!: Subscription;
  testing!:string;
  terminalDetails!: any;
  schedules: any[] = SCHEDULE_DATA;
  displayedColumns: string[] = ['route', 'date', 'time', 'vessel', 'captain', 'crew'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(
    private route: ActivatedRoute,
    private terminalService: TerminalService,
    private scheduleService: ScheduleService,
    private notify: NotificationService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getParamId();
    this.getTerminalById();
    // this.getSchedules();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  getParamId(){
    this.routeSub = this.route.params.subscribe((param:any)=>{
      this.routeId = param.id
    })
  }

  getTerminalById(){
    this.terminalService.getTerminalById(this.routeId)
    .subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource<any>(res.data.schedules);
      this.terminalDetails = res?.data

      this.dataSource.paginator = this.paginator;
    })
  }

  getSchedules(){
    this.scheduleService.getAllSchedules().subscribe({
      next: (res: any) => {
        console.log(res)
        // this.terminals = res?.data;
      },
      error: (err) => {
        console.log(err)
        this.notify.showError(err.msg);
      },
    });
  }

  createSchedule(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'schedule-dialog';
    dialogConfig.data = {description: 'Add'}

    this.dialog.open(CreateScheduleDialogComponent,
      dialogConfig
    )
  }

  editSchedule(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'schedule-dialog';
    dialogConfig.data = {description: 'Edit'}

    this.dialog.open(CreateScheduleDialogComponent,
      dialogConfig
    )
  }

}
