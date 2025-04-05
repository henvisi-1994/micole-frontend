import { showSuccess, hasError, ValdateUrl } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CourseClass } from 'src/models/course-class/courseClass.model';
import * as moment from 'moment'

declare const $: any;

@Component({
  selector: 'app-add-class-modal',
  templateUrl: './add-class-modal.component.html',
  styleUrls: ['./add-class-modal.component.sass']
})
export class AddClassModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() modalTitle: string
  @Input() courseClass: CourseClass
  classForm: FormGroup
  maxDate: Date = moment().startOf('day').toDate();
  minDate: Date = moment().startOf('day').subtract(1, 'years').toDate();
  @Output()  onUpload: EventEmitter<{date: string, link: string, description: string}> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
  }

  private initForm() {
    this.classForm = new FormGroup({
      link: new FormControl(this.courseClass?.link || '', [Validators.required, ValdateUrl]),
      description: new FormControl(this.courseClass?.description || ''),
      date: new FormControl(this.courseClass ? moment(this.courseClass.date, "YYYY-MM-DD").startOf('day').toDate() : moment().startOf('day').toDate(), [Validators.required])
    })
  }

  onSubmit() {
    $('#uploadClass').modal('hide')
    this.onUpload.next(
      {
        link: this.classForm.value['link'],
        description: this.classForm.value['description'],
        date: moment(this.classForm.value['date']).format('YYYY-MM-DD')
      }
    )
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.classForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.classForm, name, validation)
  }

  ngOnDestroy(): void {
    $("#uploadClass").modal("hide");
    $('.modal-backdrop').remove();
  }



}
