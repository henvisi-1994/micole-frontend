import { DataService } from 'src/services/data.service';
import { FormAction } from './../../../models/franchise/formAction.enum';
import { rule } from './../../../models/parametric/rule.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.showDownload = false
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
        name: new FormControl(this.currentValue?.name || '',[Validators.required, Validators.minLength(3)])
      })
      if(this.action === FormAction.NOTIFICACTION) {
        this.modalForm.addControl("role", new FormControl('All', [Validators.required]))
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

  openModal() {
    this.dataService.currentSchoolCardValue.next(null)
    $('#formFranchiseModal' + this.index).modal('show')
  }

  onSubmit() {
    $('#formFranchiseModal' + this.index).modal('hide')
    let value: any = this.modalForm.value
    if(this.showNotification()) {
      value = {...value, file: this.fileToUpload}
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
}
