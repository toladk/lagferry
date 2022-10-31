import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectOnAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.user.pipe(
      map((user: User) => {
        if (user) {
          // authorised so return false then route the user back to Dashboard
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  }
}
