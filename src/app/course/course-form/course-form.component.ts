import { CourseService } from './../../../services/course/course.service';
import { CourseById } from 'src/models/course/courseById.model';
import { GradeService } from './../../../services/grade/grade.service';
import { SchoolYearById } from './../../../models/school-year/schoolYearById.model';
import { FranchiseWithSchoolYear } from './../../../models/franchise/franchiseWithSchoolYears.model';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.sass']
})
export class CourseFormComponent implements OnInit {
  title: string
  buttonText: string
  courseForm: FormGroup
  grade: string
  franchises: FranchiseWithSchoolYear[]
  selectedSchoolYears: SchoolYearById[];
  gradeId: string
  isEditing: boolean
  course: CourseById

  constructor(private route: ActivatedRoute,
    private dataService: DataService, private gradeService: GradeService,
    private router: Router, private courseService: CourseService) {

    this.grade = this.route.snapshot.data['grade'].name
    this.franchises = this.route.snapshot.data['franchises']
    this.dataService.showSchoolNew.next(false)
    this.gradeId = this.route.snapshot.paramMap.get('grade_id')
    this.isEditing = this.route.snapshot.data['isEditing']
    this.course = this.route.snapshot.data['course']
    if(this.isEditing) {
      this.title = "Actualizar curso"
      this.buttonText = 'Actualizar'
      this.dataService.breadcrumbs.next(['Grados', 'Cursos', 'Actualizar'])
    } else {
      this.title = 'Crear Curso'
      this.buttonText = 'Crear'
      this.dataService.breadcrumbs.next(['Grados', 'Cursos', 'Crear'])

    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.courseForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.courseForm, name, validation)
  }

  getSchoolYear(index: number) {
    const schoolYear = this.selectedSchoolYears[index]
    return `${schoolYear.startYear}-${schoolYear.normalizedStartMonth} ${schoolYear.endYear}-${schoolYear.normalizedEndMonth} ${schoolYear.normalizedSchoolDay}`
  }

  selectedFranchise(value: string) {
    const franchise = this.franchises.filter(f => f.id === value)[0]
    this.selectedSchoolYears = franchise.schoolYears
    this.courseForm.get('schoolYearId').setValue(franchise.schoolYears[0]?.id)
  }

  private initForm() {
    if(this.isEditing) {
      this.selectedSchoolYears = this.franchises.filter(x => x.id === this.course.schoolYear.franchiseId)[0].schoolYears
    }else {
      this.selectedSchoolYears = this.franchises[0]?.schoolYears
    }
    this.courseForm = new FormGroup({
      name: new FormControl(this.course?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description: new FormControl(this.course?.description || ''),
      franchise: new FormControl(this.course?.schoolYear.franchiseId || this.franchises[0]?.id, [Validators.required]),
      schoolYearId: new FormControl(this.course?.schoolYear.id || this.selectedSchoolYears[0]?.id, [Validators.required])
    })
  }

  onSubmit() {
    let request = this.gradeService.createCourse(this.gradeId, this.courseForm.value)
    if(this.isEditing) {
      request = this.courseService.updateCourse(this.course.id, this.courseForm.value);
    }
    request.subscribe((data:string) => {
      swal({
        title: "Éxito",
        text: data,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
    }).then(result => {
      if(result.value) {
        this.router.navigate(['/','dashboard','courses'])
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

}
