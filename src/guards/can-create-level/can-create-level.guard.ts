import { Role } from "./../../models/parametric/role.model";
import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/services/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class CanCreateLevelGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.hasRole([Role.SUPER_ADMIN])) {
      return true;
    } else {
      return this.router.createUrlTree(["/", "dashboard"]);
    }
  }
}
