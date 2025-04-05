import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcheivementData, AcheivementParameters } from 'src/models/acheivement/acheivement.parameters';
import { CourseService } from 'src/services/course/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-acheivement-copy-modal',
  templateUrl: './acheivement-copy-modal.component.html',
  styleUrls: ['./acheivement-copy-modal.component.sass']
})
export class AcheivementCopyModalComponent implements OnInit {

  @Input() copyModalTitle: string
  @Input() parameters: AcheivementParameters
  courses: AcheivementData[]
  @Output() onAction: EventEmitter<{course: string, period: string}> = new EventEmitter()
  @Input() courseId: string
  grade: string
  year: string
  acheivementCopyForm: FormGroup

  constructor(private courseService: CourseService) {

  }

  ngOnInit(): void {
    this.grade = ""
    this.year = ""
    this.courses = []
    this.initForm()
  }

  searchCourses() {
    this.courseService.searchCourses(this.grade, this.year).subscribe(data => {
      this.courses = data.filter(x => x.id !== this.courseId)
    }, err => {

    })
  }

  private initForm() {
    this.acheivementCopyForm = new FormGroup({
      course: new FormControl('', [Validators.required]),
      period: new FormControl('', [Validators.required])
    })
    // if(this.showPeriods)
    //   this.acheivementForm.addControl('periodId', new FormControl(this.periods ? this.periods[0].id :'', [Validators.required]))
  }

  onSubmit() {
    $('#acheivementCopyModal').modal('hide')
    this.onAction.emit(this.acheivementCopyForm.value)
    this.grade = ""
    this.year = ""
    this.courses = []
  }

}
