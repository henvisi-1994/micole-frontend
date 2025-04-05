import { showSuccess, hasError } from 'src/util/validators';
import { month } from './../../../models/parametric/month.model';
import { schoolDay } from './../../../models/parametric/schoolDay.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolYearById } from './../../../models/school-year/schoolYearById.model';
import { ActivatedRoute } from '@angular/router';
import { FranchiseById } from './../../../models/franchise/franchiseById.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FranchiseService } from 'src/services/franchise/franchise.service';
import { Role } from 'src/models/parametric/role.model';
import { Notification } from 'src/util/notifications';

declare const $: any;

@Component({
  selector: 'app-franchise-card',
  templateUrl: './franchise-card.component.html',
  styleUrls: ['./franchise-card.component.sass']
})
export class FranchiseCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() franchise: FranchiseById
  @Output() onDisabled: EventEmitter<boolean> = new EventEmitter()
  @Input() currentValue: SchoolYearById
  @Output() onSubmit: EventEmitter<{value: any, isEditing: boolean}> = new EventEmitter()
  @Output() onOpenModal: EventEmitter<boolean> = new EventEmitter()
  @Output() onCounselor: EventEmitter<string> = new EventEmitter()

  schoolDayValue = schoolDay
  monthValue = month
  modalText: string = "Crear año escolar"
  modalForm: FormGroup
  counselor = Role.COUNSELOR

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
    if(this.currentValue != null) {
      this.modalText = "Acualizar año escolar"
    }else {
      this.modalText = "Crear año escolar"
    }
  }

  

  getDisabledText() {
    return this.franchise.disabled ? "Habilitar": "Deshabilitar"
  }

  disabledFranchise() {
    this.onDisabled.emit(true)
  }

  onCounselorEvent(event) {
    this.onCounselor.emit(event)
  }

  openModal() {
    $("#planSchoolModal").modal('show')
    this.onOpenModal.emit(true)
  }

  submit() {
    $("#planSchoolModal").modal('hide')
    this.onSubmit.emit({value: this.modalForm.value, isEditing: !!this.currentValue})
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.modalForm, name, validation)
  }

  getMonth() {
    return Object.keys(this.monthValue)
  }

  getSchoolDay() {
    return Object.keys(this.schoolDayValue)
  }

  ngOnDestroy(): void {
    $("#planSchoolModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

  private initForm() {
    this.modalForm = new FormGroup({
      startYear: new FormControl(this.currentValue?.startYear || new Date().getFullYear(), [Validators.required, Validators.pattern(/^[0-9]{4,4}$/)]),
      endYear: new FormControl(this.currentValue?.endYear || new Date().getFullYear(), [Validators.required, Validators.pattern(/^[0-9]{4,4}$/)]),
      startMonth: new FormControl(this.currentValue?.startMonth || Object.keys(this.monthValue)[0], [Validators.required]),
      endMonth: new FormControl(this.currentValue?.endMonth || Object.keys(this.monthValue)[0], [Validators.required]),
      schoolDay: new FormControl(this.currentValue?.schoolDay || Object.keys(this.schoolDayValue)[0], [Validators.required])
    })
  }

}
