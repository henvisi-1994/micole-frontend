import { DataService } from 'src/services/data.service';
import { FormAction } from './../../../models/franchise/formAction.enum';
import { rule } from './../../../models/parametric/rule.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { GradeService } from "./../../../services/grade/grade.service";
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';

declare const $: any;

@Component({
  selector: 'app-franchise-modal-form',
  templateUrl: './franchise-modal-form.component.html',
  styleUrls: ['./franchise-modal-form.component.sass']
})
export class FranchiseModalFormComponent implements OnInit, OnChanges, OnDestroy {
  fileToUpload?: File
  @Input() index: number
  @Input() btnClass: string
  @Input() buttonText: string
  @Input() modalText: string
  @Input() disabled: boolean
  @Input() action: FormAction
  @Input() currentValue: {id: string, name: string, description: string, preschool?: boolean}
  @Output() onAction: EventEmitter<{action: FormAction, value: any, isEditing: boolean, id: string}> = new EventEmitter()
  modalForm: FormGroup
  ruleValue = rule
  roles = {
    "All": "Todos",
    "Student": "Estudiante",
    "Parent": "Acudiente",
    "Teacher": "Profesor",
    "Counselor": "Orientador",
    "Admin": "Cordinador"
  }
  showDownload: Boolean = false
  selectedRoles: string[] = [];

  lstGrades: any[] = [];
  lstCourses: any[] = [];
  lstSedes: any[] = [];
  school: any;
  selectedGrade: any;
  selectedCourse: any;
  selectedSede: any;
  swShowDate: boolean = false;
  //dateNotifications: Date = new Date();

  constructor(private dataService: DataService, private gradeService: GradeService, private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) { 
    this.dateAdapter.setLocale('es-CO');
  }

  ngOnInit(): void {
    this.showDownload = false;
    this.school = this.route.snapshot.data["school"];
    this.loadClasifiers();    
  }

  loadClasifiers() {
    this.gradeService.getGrades(this.school.id).subscribe(response => {
      this.lstGrades = response
    })
    this.gradeService.getFranchises(this.school.id).subscribe(response => {
      this.lstSedes = response
    })
  }

  onGradeChange(event: any) {
    console.log(event);    
    console.log(this.selectedGrade);
    this.gradeService.getCoursesByGrade(this.school.id, this.selectedGrade.id).subscribe(response => {
      this.lstCourses = response
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name)
  }

  hasError(name: string, validation: string,) {
    return hasError(this.modalForm, name, validation)
  }

  isDownloadGrade(value: string) {
    this.showDownload = value === "ENABLE_DOWNLOAD_GRADE" || value === "DISABLE_SHOWING_NUMERIC_GRADE_PRESCHOOL" || value === 'SHOW_GENERAL_SUMMARY'
  }

  roleKeys() {
    return Object.keys(this.roles);
  }

  extensions() {
    return "image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private initForm() {
    // console.log(this.currentValue)
    if(this.action === FormAction.GRADE || this.action === FormAction.GROUP
      || this.action === FormAction.NOTIFICACTION) {
      this.modalForm = new FormGroup({
        description: new FormControl(this.currentValue?.description || ''),
        name: new FormControl(this.currentValue?.name || '',[Validators.required, Validators.minLength(3)]),
        //dateNotification: new FormControl(new Date()),
        //this.modalForm.addControl('dateNotification', new FormControl(null))  //new Date()
      })
      if(this.action === FormAction.NOTIFICACTION) {
        this.modalForm.addControl('role', new FormArray([], [Validators.required]));
        const roleFormArray = this.modalForm.get('role') as FormArray;
        this.roleKeys().forEach(() => roleFormArray.push(new FormControl(false)));
        this.modalForm.addControl("file", new FormControl(null))        
      }
      if(this.action === FormAction.GRADE) {
        this.modalForm.addControl("preschool", new FormControl(this.currentValue?.preschool ? "1": "0", [Validators.required]))
      }
    } else if (this.action === FormAction.PERIOD) {
      this.modalForm = new FormGroup({
        description: new FormControl(this.currentValue?.description || ''),
        name: new FormControl(Number(this.currentValue?.name) || 1,[Validators.required])
      })
    } else {
      this.modalForm = new FormGroup({
        description: new FormControl(this.currentValue?.description || '1',[Validators.required]),
        name: new FormControl(this.currentValue?.name || '',[Validators.required])
      })
      if (this.currentValue != null && this.currentValue?.name === "ENABLE_DOWNLOAD_GRADE" || this.currentValue?.name === "DISABLE_SHOWING_NUMERIC_GRADE_PRESCHOOL" || this.currentValue?.name === "SHOW_GENERAL_SUMMARY") {
        this.showDownload = true
      }
    }

  }
get roleArray(): FormArray {
  return this.modalForm.get('role') as FormArray;
}
onRoleChange(event: any, roleKey: string, index: number): void {
  const isFirstRole = roleKey === 'All'; // reemplaza 'admin' por tu primer rol real

  if (event.checked) {
    if (isFirstRole) {
      // Deseleccionar todos excepto el primero
      this.selectedRoles = [roleKey];
      this.roleArray.controls.forEach((ctrl, i) => {
        ctrl.setValue(i === index); // solo el primero en true
      });
    } else {
      // Si hay 'admin', quitarlo
      const adminIndex = this.roleKeys().indexOf('All');
      if (this.selectedRoles.includes('All')) {
        this.selectedRoles.splice(this.selectedRoles.indexOf('All'), 1);
        this.roleArray.at(adminIndex).setValue(false);
      }
      this.selectedRoles.push(roleKey);
      this.roleArray.at(index).setValue(true);
    }
  } else {
    // Quitar del array
    const idx = this.selectedRoles.indexOf(roleKey);
    if (idx > -1) this.selectedRoles.splice(idx, 1);
    this.roleArray.at(index).setValue(false);
  }
}



  openModal() {
    this.dataService.currentSchoolCardValue.next(null)
    $('#formFranchiseModal' + this.index).modal('show')
  }

  onSubmit() {
    $('#formFranchiseModal' + this.index).modal('hide')
    let value: any = this.modalForm.value
    if(this.showNotification()) {
      value = {...value, file: this.fileToUpload, grade: this.selectedGrade?this.selectedGrade.idGrade:null, course: this.selectedCourse?this.selectedCourse.idCourse:null, franchise: this.selectedSede?this.selectedSede.idFranchise:null}
    }

    this.onAction.emit({
      action: this.action,
      value: value,
      isEditing: !!this.currentValue,
      id: this.currentValue?.id
    })
    this.modalForm.reset()
    this.modalForm.setValue({
      description: '',
      name: ''
    })
    this.fileToUpload = null
  }

  getRules() {
    return Object.keys(this.ruleValue)
  }

  showGrade() {
    return this.action === FormAction.GRADE || this.action === FormAction.GROUP || this.action == FormAction.NOTIFICACTION
  }

  showNotification() {
    return this.action === FormAction.NOTIFICACTION
  }

  isGrade() {
    return this.action === FormAction.GRADE
  }

  showPeriod() {
    return this.action === FormAction.PERIOD
  }

  showSetting() {
    return this.action === FormAction.SETTING
  }

  ngOnDestroy(): void {
    $('#formFranchiseModal' + this.index).modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

  sendNotification() {
    console.log('Notif');    
  }
}
