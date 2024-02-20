import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

    if (localStorage.getItem('access_token')) {
      
      if ((state.url.includes('/portal-administration/') || state.url.includes('/archive-details')) && localStorage.getItem("Role") == 'A') {
        this.router.navigate(["dashboard"]);
        return true;
      } else if (state.url.includes('/login')) {
        this.router.navigate(["dashboard"]);
        return true;
      } else {
        return true
      }
    } else if (state.url.includes('/login')) {
      return true;
    } else {
      return true;
    }

  }
}
