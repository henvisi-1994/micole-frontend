import { AuthService } from 'src/services/auth/auth.service';
import { DataService } from './../../services/data.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService) { }


  @Input() set appHasPermission(permission: []) {
    let hasPermission = false
    if(this.authService.hasPermission(permission) || this.authService.hasRole(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }else {
      this.viewContainer.clear();

    }

  }


}
