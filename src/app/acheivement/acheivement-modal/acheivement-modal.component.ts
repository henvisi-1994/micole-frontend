import { AcheivementInfo } from './../../../models/acheivement/acheivementInfo.model';
import { showSuccess, hasError } from 'src/util/validators';
import { PeriodSchool } from './../../../models/school/schoolById.model';
import { SchoolService } from './../../../services/school/school.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

declare const $: any;


@Component({
  selector: 'app-acheivement-modal',
  templateUrl: './acheivement-modal.component.html',
  styleUrls: ['./acheivement-modal.component.sass']
})
export class AcheivementModalComponent implements OnInit, OnChanges {
  @Input() modalTitle: string
  @Input() modalButton: string
  @Input() showPeriods: boolean
  @Input() schoolId: string
  @Input() currentAcheivement: AcheivementInfo
  @Output() onAction: EventEmitter<{name: string, description: string, periodId?: string}> = new EventEmitter()
  acheivementForm: FormGroup
  periods: PeriodSchool[]

  constructor(private schoolService: SchoolService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
    if(this.showPeriods)
      this.schoolService.getPeriods(this.schoolId)
        .subscribe(data => {
          this.periods = data
          this.initForm()
        }, err => {
          console.log(err);
        })
  }

  ngOnInit(): void {
    // this.initForm()
    // if(this.showPeriods)
    //   this.schoolService.getPeriods(this.schoolId)
    //     .subscribe(data => {
    //       this.periods = data
    //       this.initForm()
    //     }, err => {
    //       console.log(err);
    //     })
  }

  private initForm() {
    this.acheivementForm = new FormGroup({
      name: new FormControl(this.currentAcheivement?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description: new FormControl(this.currentAcheivement?.description || '')
    })
    if(this.showPeriods)
      this.acheivementForm.addControl('periodId', new FormControl(this.periods ? this.periods[0].id :'', [Validators.required]))
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.acheivementForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.acheivementForm, name, validation)
  }

  onSubmit() {
    $('#acheivementModal').modal('hide')
    this.onAction.emit(this.acheivementForm.value)
  }

}
