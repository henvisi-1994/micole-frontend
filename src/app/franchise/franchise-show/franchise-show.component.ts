import { SCHOOL_YEAR } from './../../../util/constants';
import { Role } from './../../../models/parametric/role.model';
import { AuthService } from 'src/services/auth/auth.service';
import { SchoolYearById } from './../../../models/school-year/schoolYearById.model';
import { Action } from './../../../models/parametric/action.model';
import { Notification } from './../../../util/notifications';
import { FranchiseById } from './../../../models/franchise/franchiseById.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FranchiseService } from 'src/services/franchise/franchise.service';
import swal from 'sweetalert2';
import { User } from 'src/models/user/user.model';

declare const $: any;


@Component({
  selector: 'app-franchise-show',
  templateUrl: './franchise-show.component.html',
  styleUrls: ['./franchise-show.component.sass']
})
export class FranchiseShowComponent implements OnInit, OnDestroy {
  franchise: FranchiseById
  currentValue: SchoolYearById
  showSchoolYear: boolean = false
  schoolYearHeaders: string[]
  schoolYearKeys: string[]
  schoolYearItems: SchoolYearById[]
  schoolYearAction: Action[]
  hasAction: boolean = false
  users: User[]

  userHeaders: string[]
  userKeys: string[]
  userAction: Action[]


  constructor(private dataService: DataService,
    private route: ActivatedRoute, private franchiseService: FranchiseService,
    private authService: AuthService, private router: Router) {
      this.schoolYearHeaders = ['Año de inicio', 'Mes de inicio','Año de finalización','Mes de finalización', 'Jornada']
      this.schoolYearKeys = ['startYear', 'normalizedStartMonth','endYear','normalizedEndMonth','normalizedSchoolDay']
      this.schoolYearAction = [
        {type: 'info', action: 'show',icon:"fa fa-eye", tooltip: 'Consultar'},
        {type: 'primary', action: 'edit',icon:"fa fa-edit", tooltip: 'Editar'},
        {type: 'danger', action: 'delete',icon:"fa fa-trash", tooltip: 'Borrar'}
      ]
      if(this.authService.hasRole([Role.SUPER_ADMIN,Role.ADMIN]))
        this.hasAction = true

      this.userHeaders = ["Nombre", "Correo electronico", "Identificación", "Celular"]
      this.userKeys = ["fullName","email","identification","mobile"]
      this.userAction = [
        {type: 'danger', action: 'delete',icon:"fa fa-trash", tooltip: 'Borrar'}
      ]

    }

  ngOnInit(): void {
    this.franchise = this.route.snapshot.data['franchise']
    this.dataService.breadcrumbs.next(['Colegios','Sedes',this.franchise.name,'Información'])
    this.users =  this.route.snapshot.data['counselors']
    this.showSchoolYear = true
    this.schoolYearItems = this.franchise.schoolYears

  }

  onCounselor(event) {
    this.franchiseService.addCounselor(this.franchise.id,event).subscribe(data => {
      Notification.show("<b>Éxito</b>","Hemos associado el orientador correctamente","bottom","right","success")
      this.users = data
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  onSubmit(value: any) {
    let request = this.franchiseService.createSchoolYear(this.franchise.id, value.value)
    let text = "Hemos creado exitosamente el año escolar"
    if(value.isEditing) {
      request = this.franchiseService.updateSchoolYear(this.franchise.id, this.currentValue?.id, value.value)
      this.currentValue = null
      text = "Hemos actualizado exitosamente el año escolar"
    }
    request.subscribe(data => {
      this.franchise = data
      this.schoolYearItems = this.franchise.schoolYears
      Notification.show("<b>Éxito</b>",text,"bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  disabledFranchise() {
    let request = this.franchiseService.disableFranchise(this.franchise.id, this.route.snapshot.paramMap.get('id'))
    if(this.franchise.disabled) {
      request = this.franchiseService.restoreFranchise(this.franchise.id, this.route.snapshot.paramMap.get('id'))
      Notification.show("<b>Éxito</b>","Hemos actualizado el estado exitosamente","bottom","right","success")
    }
    request.subscribe(data => {
      this.franchise = data as FranchiseById
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  onSchoolYearAction(value: any) {
    const schoolYear = this.schoolYearItems[value.index]
    if(value.action === 'edit') {
      this.currentValue = schoolYear
      $("#planSchoolModal").modal('show')
    } else if(value.action === 'show') {
      localStorage.setItem(SCHOOL_YEAR,JSON.stringify(schoolYear))
      this.router.navigate(['school-years',schoolYear.id], { relativeTo: this.route})
    }
    else {
      swal({
        title: 'Eliminar año escolar',
        text: "Seguro quieres borrar el año escolar ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'SI',
        cancelButtonText: "NO",
         buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.franchiseService.deleteSchoolYear(this.franchise.id, schoolYear.id)
          .subscribe(data => {
            this.franchise = data
            this.schoolYearItems = this.franchise.schoolYears
            Notification.show("<b>Éxito</b>","Hemos borrado el año escolar","bottom","right","success")
          }, err => {
            Notification.show("<b>Error</b>",err)
          })
        }
      })

    }
  }

  onUserAction(value: any) {
    const selectedUser = this.users[value.index]
    if(value.action === 'delete') {
      swal({
        title: 'Eliminar orientador',
        text: "Seguro quieres borrar el orientador ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'SI',
        cancelButtonText: "NO",
         buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.franchiseService.deleteCounselor(this.franchise.id, selectedUser.id)
          .subscribe(data => {
            this.users = data
            Notification.show("<b>Éxito</b>","Hemos borrado el orientador","bottom","right","success")
          }, err => {
            Notification.show("<b>Error</b>",err)
          })
        }
      })

    }
  }

  ngOnDestroy(): void {
    $("#planSchoolModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
