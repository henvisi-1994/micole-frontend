import { Role } from './../../../models/parametric/role.model';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { AuthService } from 'src/services/auth/auth.service';
import { SchoolService } from './../../../services/school/school.service';
import { CourseService } from './../../../services/course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Pagination } from './../../../models/parametric/pagination.model';
import { Action } from './../../../models/parametric/action.model';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SCHOOL } from 'src/util/constants';

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.sass']
})
export class CourseIndexComponent implements OnInit {
  headers: string[]
  items: any[] = []
  keys: string[]
  actions: Action[]
  pagination: Pagination = null
  show: boolean = false
  schoolId: string = null
  currentSearch = ''
  schools: SchoolParametric[]

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService, private schoolService: SchoolService,
    private authService: AuthService, private router: Router) {
    this.headers = ['Nombre', 'Descripción','Grado','Año de inicio','Año de fin']
    this.keys = ['name','description','grade','startYear','endYear']
    this.actions = [
      {type: 'info', action: 'show',icon:"fa fa-eye", tooltip: 'Consultar'}
    ]
    if(this.authService.hasRole([Role.SUPER_ADMIN,Role.ADMIN])) {
      this.actions.push({type: 'primary', action: 'edit',icon:"fa fa-edit", tooltip: 'Editar'})
      this.actions.push({type: 'danger', action: 'delete',icon:"fa fa-trash", tooltip: 'Borrar'})
    }
    if(this.authService.hasRole([Role.SUPER_ADMIN])) {
      this.schoolId = null;
    } else {
      this.schoolId = localStorage.getItem(SCHOOL)
    }
  }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(['Cursos'])
    let response = this.route.snapshot.data['response']
    this.schools = this.route.snapshot.data['schools']
    this.schools.unshift({id: null, name: 'Todos'})
    this.items = response.data
    this.pagination = response.pagination
    this.show = true
  }

  onRequest(value: any) {
    this.currentSearch = value.text
    let request = this.courseService.getCourses(value.page, this.pagination.itemPerPage, this.currentSearch)
    if(this.schoolId) {
      request = this.schoolService.getCourses(value.page, this.pagination.itemPerPage, this.currentSearch, this.schoolId)
    }
    request.subscribe(response => {
      this.items = response.data
      this.pagination = response.pagination
    })
  }

  changeFilter(value) {
    this.schoolId = value
    this.onRequest({page: 1, text: this.currentSearch})
  }

  onAction(value: any) {
    const course = this.items[value.index]

    if(value.action == 'edit') {
      this.router.navigate(['/','dashboard','schools',course.schoolYear.schoolId,'grades',course.gradeId,'courses',course.id,value.action])

    }else if(value.action == 'show') {
      this.router.navigate(['/','dashboard','courses',course.id])
    }
    else {
      swal({
        title: 'Eliminar el curso',
        text: "Seguro quieres borrar el curso ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'SI',
        cancelButtonText: "NO",
         buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.courseService.deleteCourse(course.id)
          .subscribe((data:string) => {
            swal({
              title: "Éxito",
              text: data,
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success"
          }).then(result => {
            if(result.value) {
              this.onRequest({page: 1, text: this.currentSearch})
            }
          }).catch(swal.noop)
          }, (err: string) => {
            swal({
              title: "Error",
              text: err,
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger",
              type: "error"
            })
          })
        }
      })
    }
  }

}
