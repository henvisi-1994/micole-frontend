import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { hasError, showSuccess } from 'src/util/validators';
import * as _ from 'lodash'
import { Role } from 'src/models/parametric/role.model';
import { SCHOOL } from 'src/util/constants';
import { User } from 'src/models/user/user.model';
import swal from 'sweetalert2';
import { CaseService } from 'src/services/case/case.service';
import { Notification } from 'src/util/notifications';
import { Router } from '@angular/router';


@Component({
  selector: 'app-case-creation',
  templateUrl: './case-creation.component.html',
  styleUrls: ['./case-creation.component.sass']
})
export class CaseCreationComponent implements OnInit {
  caseForm: FormGroup
  student: string = Role.STUDENT
  school: string
  selectedUser: User
  constructor(private dataService: DataService, private caseService: CaseService, private router: Router) { 
    this.school = localStorage.getItem(SCHOOL)
  }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(['Mi Cole Me Cuida','Casos','Crear'])
    this.initForm()
  }
 
  showSuccess(name: string): boolean {
    return showSuccess(this.caseForm, name)
  }

  hasError(name: string, validation: string,) {
    return hasError(this.caseForm, name, validation)
  }

  deleteUser() {
    swal({
      title: 'Desasociar el estudiante',
      text: `Seguro quieres desasociar el estudiante ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.selectedUser = null
      }
    })
  }

  onSubmit() {
    const failText: string[] = []
    const texts = ['Dificultades económicas de tu familia','Problemas de inseguridad de tu barrio','Tienes que ir a trabajar',
  'No sientes ganas de asistir','Otra razón']
    for(let i = 0; i < 5; i++) {
      if(this.caseForm.value['fail'][i]) {
        failText.push(texts[i])
      }
    }
    const result = {
      ..._.omit(this.caseForm.value,['fail','danger']),
      failText
    }
    this.caseService.createCounselor(this.selectedUser.id, this.caseForm.value['danger'], JSON.stringify(result)).subscribe((data) => {
      Notification.show("<b>Éxito</b>","Hemos creado el caso de manera correcta","bottom","right","success")
      this.router.navigate(["/", "dashboard", "cases"]);
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
    // this.onAction.emit(result)
  }

  onSelected(value) {
    this.selectedUser = value
  }

  private initForm() {   
    this.caseForm = new FormGroup({
      danger: new FormControl(null, Validators.required),
      sad: new FormControl(null, [Validators.required]),
      mistreated: new FormControl(null, [Validators.required]),
      fear: new FormControl(null, [Validators.required]),
      mood: new FormControl(null, [Validators.required]),
      suicide: new FormControl(null, [Validators.required]),
      fail: new FormArray([new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false)]),
      pregnancy: new FormControl(null, [Validators.required])
    })
  }

}
