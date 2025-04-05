import { Role } from './../../../models/parametric/role.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupSchool, SubjectsSchool } from './../../../models/school/schoolById.model';
import { SchoolService } from './../../../services/school/school.service';
import { CourseWithSubject } from './../../../models/course/courseWithSubject';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/services/course/course.service';
import { DataService } from 'src/services/data.service';
import { Notification } from 'src/util/notifications';

declare const $: any;

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.sass']
})
export class CourseCardComponent implements OnInit, OnDestroy {
  @Input() course: CourseWithSubject
  groups: GroupSchool[]
  subjectForm: FormGroup
  selectedSubjects: SubjectsSchool[]
  @Output() onSubject: EventEmitter<{id: string, groupId: string, percentage: number}> =
   new EventEmitter()
  @Output() onUser: EventEmitter<{id: string, role: string}> = new EventEmitter()
  @Output() onDownload: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadUser: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadStudentAdmin: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadFormat: EventEmitter<string> = new EventEmitter()
  @Output() onDownloadPdf: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadPdfEnd: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadMassivePdf: EventEmitter<boolean> = new EventEmitter()
  @Output() onDownloadMassivePdfEnd: EventEmitter<boolean> = new EventEmitter()
  @Output() onAssociateUserExcel: EventEmitter<File> = new EventEmitter()
  teacher = Role.TEACHER
  student = Role.STUDENT
  showDownload: Boolean = false
  showDownloadFinal: Boolean = false

  constructor(private schoolService: SchoolService, private courseService: CourseService, private dataService: DataService, private router: Router) {
    this.initForm()
    this.selectedSubjects = []
  }

  ngOnInit(): void {
    this.schoolService.getGroupsWithSubject(this.course.schoolId)
      .subscribe(data => {
        this.groups = data
        this.initForm()
      });
    this.schoolService.getAllowDownload(this.course.schoolId)
      .subscribe(data => {
        this.showDownload = data
      })
    this.courseService.getAllowDownload(this.course.id).subscribe(data => {
      this.showDownloadFinal = data
    })
  }

  groupChanged(value) {
    this.selectedSubjects = this.groups.filter(x => x.id === value)[0].subjects
    this.subjectForm.get('id').setValue(this.selectedSubjects[0].id)
  }

  openModal() {
    $('#formSubjectModal').modal('show')
  }

  openGradeModal() {
    $('#gradeModal').modal('show')
  }

  downloadGrade() {
    this.onDownload.next(true)
  }

  downloadUserExcel(value) {
    this.onDownloadUser.next(value)
  }

  downloadStudentAdminExcel(value) {
    this.onDownloadStudentAdmin.next(value)
  }

  consolidateByPeriod() {
    this.courseService.consolidateByPeriod(this.course.id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Consolidado por periodo  ${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No pudidmos descargar el consolidado por periodo"
        );
      }
    );
  }

  consolidate() {
    this.courseService.consolidate(this.course.id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Consolidado final  ${this.course.name}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No pudidmos descargar el consolidado final"
        );
      }
    );
  }

  downloadFormat(format: string) {
    this.onDownloadFormat.next(format)
  }

  showSuccess(name: string, ): boolean {
    return showSuccess(this.subjectForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.subjectForm, name, validation)
  }

  associateStudents() {
    $('#associteStudentModal').modal('show')
  }

  onAssociateUser(file: File) {
    $('#associteStudentModal').modal('hide')
    this.onAssociateUserExcel.emit(file)
  }

  goToCourseObservations() {
    this.router.navigate([
      "/",
      "dashboard",
      "courses",
      this.course.id,
      "observations"
    ]);
  }

  onSubmit() {
    $('#formSubjectModal').modal('hide')
    this.onSubject.emit(this.subjectForm.value);
  }

  private initForm() {
    let groupValue = ''
    let subjectValue = ''
    if(this.groups) {
      groupValue = this.groups[0].id
      this.selectedSubjects = this.groups[0].subjects
      subjectValue = this.groups[0].subjects[0].id
    }
    this.subjectForm = new FormGroup({
      groupId: new FormControl(groupValue),
      id: new FormControl(subjectValue),
      percentage: new FormControl(0,[Validators.required,Validators.min(0),Validators.max(100)])
    })
  }

  onDirector(value) {
   this.onUser.emit({id: value, role: this.teacher})
  }

  onStudent(value) {
    this.onUser.emit({id: value, role: this.student})
  }

  downloadPdf() {
    this.onDownloadPdf.emit(true)
  }

  downloadPdfEnd() {
    this.onDownloadPdfEnd.emit(true)
  }

  downloadMassivePdf() {
    this.onDownloadMassivePdf.emit(true)
  }

  downloadMassivePdfEnd() {
    this.onDownloadMassivePdfEnd.emit(true)
  }


  ngOnDestroy(): void {
    $('#formSubjectModal').modal('hide')
    $('#associteStudentModal').modal('hide')
    $('#gradeModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

}
