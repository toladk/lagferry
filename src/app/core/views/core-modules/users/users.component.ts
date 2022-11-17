import { StorageService } from './../../../../shared/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Users } from 'src/app/shared/models';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users!: Users[];
  constructor(
    private usersService: UsersService,
    private notify: NotificationService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.setMessagStorage('User Management');

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (users: Users[]) => {
        this.users = users;
      },
      error: (err) => {
        this.notify.showError(err.msg);
      },
    });
  }

  creatUserDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent, { width: '23rem'});

    dialogRef.afterClosed().subscribe((result) => {
      if (result.status === 0) {
        this.getUsers();
      }
    });
  }

  activateUser(user: Users) {
    this.usersService.activateUser(user.userId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${user.firstname} ${user.lastname} ${res.message}`);
        this.getUsers();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }

  deactivateUser(user: Users) {
    this.usersService.deactivateUser(user.userId).subscribe({
      next: (res: any) => {
        this.notify.showSuccess(`${user.firstname} ${user.lastname} ${res.message}`);
        this.getUsers();
      },
      error: (err) => {
        this.notify.showError(err.msg);
      }
    });
  }
}
