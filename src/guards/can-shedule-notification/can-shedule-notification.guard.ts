import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from "src/models/parametric/role.model";
import { AuthService } from "src/services/auth/auth.service";
@Injectable({
  providedIn: 'root'
})
export class CanSheduleNotificationGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (this.authService.hasRole([Role.ADMIN])) {
        return true;
      } else {
        return this.router.createUrlTree(["/", "dashboard"]);
      }
    }

}
