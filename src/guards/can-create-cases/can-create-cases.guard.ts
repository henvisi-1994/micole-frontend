import { AuthService } from 'src/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/models/parametric/role.model';

@Injectable({
  providedIn: 'root'
})
export class CanCreateCasesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.hasRole([Role.STUDENT])) {
        return true
      } else {
        return this.router.createUrlTree(['/','dashboard'])
      }
  }

}
