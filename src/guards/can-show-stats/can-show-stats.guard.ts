import { Role } from "./../../models/parametric/role.model";
import { AuthService } from "./../../services/auth/auth.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CanShowStatsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      return true;
    } else {
      return this.router.createUrlTree(["/", "dashboard"]);
    }
  }
}
