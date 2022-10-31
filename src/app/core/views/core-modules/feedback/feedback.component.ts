import { ReportsService } from './../../../../shared/services/reports/reports.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

const PROFILES = [
  {
    id:"1",
    name:"john legend",
    email:"johnlegend@gmail.com",
    status:"Emergency",
    lastseen:"2 days ago",
    article:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    assignedTo:"John Hult",
  },
  {
    id:"2",
    name:"Chris Rooster",
    email:"chrisrooster@hotmail.com",
    status:"Emergency",
    lastseen:"1 day ago",
    article:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    assignedTo:"John Hult",
  },
  {
    id:"3",
    name:"calvin klien",
    email:"calvinklien@yahoo.com",
    status:"Emergency",
    lastseen:"2 hours ago",
    article:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    assignedTo:"John Hult",
  },
]

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  profiles: any[] = PROFILES;

  reports!: any[];

  constructor( public reportService: ReportsService, private notify: NotificationService) { }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
     this.reportService.getReports().subscribe({
      next: (res: any) => {
        console.log(res)
        this.reports = res;

      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    })
  }

}
