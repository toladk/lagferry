import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookiesStorageService } from 'src/app/shared/services/cookies-storage.service';
import { Observable, fromEvent, filter, pluck } from "rxjs";
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  topTitle!: Observable<string>;
  notificationIconIsVisible = false;
  alertIconIsVisible = true;
  showNotification = false;
  showAlert = true;

  constructor(
    private route: Router,
    private cookiesStorage: CookiesStorageService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.topTitle = this.storageService.storageChange$.pipe(
      filter(({ storageArea }) => storageArea === "sessionStorage"),
      filter(({ key }) => key === "title"),
      pluck("value")
    );

    this.setMessagStorage(sessionStorage.getItem('title')!);

  }

  setMessagStorage(value: string): void {
    this.storageService.setStorageItem({
      key: "title",
      value,
      storageArea: "sessionStorage"
    });
  }

  logout(): void{
    this.cookiesStorage.clearStorage()
    this.route.navigateByUrl('/login')
    window.location.reload();
  }

  goto(data: string): void {
    console.log(data);
    this.route.navigateByUrl(data);
  }

  notificationToggle() {
    this.notificationIconIsVisible = true;
    this.alertIconIsVisible = false;
    this.showNotification = true;
    this.showAlert = false;
  }
  alertToggle() {
    this.alertIconIsVisible = true;
    this.notificationIconIsVisible = false;
     this.showAlert= true;
     this.showNotification = false;
  }

}
