import { Role } from "./../../models/parametric/role.model";
import { AuthService } from "./../../services/auth/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanSeeGamificationGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.authService.hasRole([
        Role.ADMIN,
        Role.PARENT,
        Role.STUDENT,
        Role.TEACHER,
      ])
    ) {
      return true;
    } else {
      return this.router.createUrlTree(["/", "dashboard"]);
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.authService.hasRole([
        Role.PARENT,
        Role.STUDENT,
        Role.TEACHER,
        Role.ADMIN,
      ])
    ) {
      return true;
    } else {
      return this.router.createUrlTree(["/", "dashboard"]);
    }
  }
}
