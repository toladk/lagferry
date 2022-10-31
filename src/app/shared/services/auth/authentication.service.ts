import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models';
import { CookiesStorageService } from '../cookies-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  public get userValue(): User {
    return this.userSubject.value;
  }
  constructor(
    private http: HttpClient,
    private cookiesStorageService: CookiesStorageService,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(
      this.cookiesStorageService.getUser()!
    );
    this.user = this.userSubject.asObservable();
  }

  login(userDetails: { username: string; password: string }) {
    return this.http
      .post<User>(environment.apiUrl + 'auth/signin', userDetails)
      .pipe(
        tap((user) => {
          this.userSubject.next(user);
          this.cookiesStorageService.saveRefreshToken(user.refreshToken);
          this.cookiesStorageService.saveToken(user.token);
          this.cookiesStorageService.saveUser(user);
        })
      );
  }
  refreshToken() {
    return this.http
      .post<User>(
        environment.apiUrl +
          `auth/refresh?token=${this.cookiesStorageService.getRefreshToken()}`,
        null
      )
      .pipe(
        tap((user) => {
          const { token } = user;
          this.userSubject.next({ ...this.userValue, token: token });
        })
      );
  }
  logout() {
    this.cookiesStorageService.clearStorage();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Just to test that the Bearer token Works! will be removed
  getVessel() {
    return this.http.get(environment.apiUrl + 'vessel/api/v1');
  }
}
