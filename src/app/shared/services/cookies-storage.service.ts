import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

const TOKEN_KEY = 'lagferry-token';
const REFRESHTOKEN_KEY = 'lagferry-refreshtoken';
const USER_KEY = 'lagferry-user';
@Injectable({
  providedIn: 'root',
})
export class CookiesStorageService {
  constructor() {}

  public saveToken(token: string): void {
    Cookie.set(TOKEN_KEY, token);

    const user = this.getUser();
    if (user) {
      this.saveUser({ ...user, token: token });
    }
  }
  public getToken(): string | null {
    return Cookie.get(TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    Cookie.set(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return Cookie.get(REFRESHTOKEN_KEY);
  }
  public saveUser(user: any): void {
    Cookie.set(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = Cookie.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  public clearStorage() {
    Cookie.delete(TOKEN_KEY);
    Cookie.delete(REFRESHTOKEN_KEY);
    Cookie.delete(USER_KEY);
    Cookie.deleteAll('/');
    Cookie.deleteAll();
  }
}
