import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-associate-student',
  templateUrl: './associate-student.component.html',
  styleUrls: ['./associate-student.component.sass']
})
export class AssociateStudentComponent implements OnInit {
  userForm: FormGroup
  fileToUpload: File = null
  @Input() title: String
  @Input() buttonText: String
  @Output() onAssociateUser: EventEmitter<File> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.onAssociateUser.emit(this.fileToUpload)
  }

  private initForm() {
    this.userForm = new FormGroup({
      users: new FormControl(null, [Validators.required])
    })

  }

}
