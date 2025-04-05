import { Role } from './../../../models/parametric/role.model';
import { AuthService } from 'src/services/auth/auth.service';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from './../../../models/parametric/action.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-index',
  templateUrl: './parent-index.component.html',
  styleUrls: ['./parent-index.component.sass']
})
export class ParentIndexComponent implements OnInit {
  show: boolean
  headers: string[]
  items: any[] = []
  keys: string[]
  actions: Action[]
  userTitle: string
  userSubtitle: string

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService,
    private authService: AuthService) {
    this.items = this.route.snapshot.data['response']
    this.show = true
    this.headers = ['Nombre','Correo electrónico']
    this.keys = ['fullName','email']
    if(this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER])) {
      this.headers.push('Numero de documento')
      this.headers.push('Celular')
      this.headers.push('Teléfono')
      this.keys.push('identification')
      this.keys.push('mobile')
      this.keys.push('phone')
    }
    this.actions = [
      {type: 'info', action: 'show',icon:"fa fa-eye", tooltip: 'Consultar'}
    ]
    const isParent = this.route.snapshot.data['isParent']
    if(isParent) {
      this.userTitle = "Mis hijo/as"
      this.userSubtitle = "Información de mis hijo/as"
      this.dataService.breadcrumbs.next(['Mis hijo/as'])
    } else {
      this.userTitle = "Mis acudientes"
      this.userSubtitle = "Información de mis acudientes"
      this.dataService.breadcrumbs.next(['Mis acudientes'])
    }
  }

  ngOnInit(): void {
  }

  onAction(value) {
    if(value.action == 'show') {
      this.router.navigate(['/','dashboard','users',this.items[value.index].id])
    }
  }

}
