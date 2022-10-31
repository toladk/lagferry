import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models';
import { Crew } from 'src/app/shared/models/interfaces/crew.interface';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AddCrewModalComponent } from './add-crew-modal/add-crew-modal.component';

@Component({
  selector: 'app-crew-members',
  templateUrl: './crew-members.component.html',
  styleUrls: ['./crew-members.component.scss']
})
export class CrewMembersComponent implements OnInit {

  crewMember!: Crew[];

  // crewMember = [
  //   {firstName: 'Test', lastName:'Member', crewMemberId: '2', email:'muilat.champ@gmail.com', type:'CAPTAIN', status:'ACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'DECKHAND', status:'ACTIVE'},
  //   {firstName: 'New', lastName:'Member', crewMemberId: '2', email:'test@gmail.com', type:'CAPTAIN', status:'ACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test.user@gmail.com', type:'CAPTAIN', status:'INACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'DECKHAND', status:'ACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'CAPTAIN', status:'INACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'DECKHAND', status:'ACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'CAPTAIN', status:'ACTIVE'},
  //   {firstName: 'John', lastName:'Doe', crewMemberId: '2', email:'test@gmail.com', type:'CAPTAIN', status:'ACTIVE'},
  // ]


  constructor(
    private usersService: UsersService,
    private notify: NotificationService,
    private route : Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getCrewMembers().subscribe({
      next: (res: any) => {
        console.log(res)
        this.crewMember = res.data;
      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    });
  }

  creatUserDialog() {
    const dialogRef = this.dialog.open(AddCrewModalComponent, { width: '23rem'});

    dialogRef.afterClosed().subscribe((result) => {
      if (result.status === 0) {
        this.getUsers();
      }
    });
  }

  activateUser(user: any) {
    this.usersService.activateCrewMember(user.crewMemberId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${user.firstName} ${user.lastName} ${res.message}`);
        this.getUsers();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  deactivateUser(user: any) {
    this.usersService.deactivateCrewMember(user.crewMemberId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${user.firstName} ${user.lastName} ${res.message}`);
        this.getUsers();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  goto(route:string){
    this.route.navigateByUrl(route)
}

}
