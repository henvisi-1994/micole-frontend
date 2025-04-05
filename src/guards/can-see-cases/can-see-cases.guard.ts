import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/models/parametric/role.model';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanSeeCasesGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.hasRole([Role.COUNSELOR])) {
      return true
    } else {
      return this.router.createUrlTree(['/','dashboard'])
    }
  }
  
}
