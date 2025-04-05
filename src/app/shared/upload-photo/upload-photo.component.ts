import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.sass']
})
export class UploadPhotoComponent implements OnInit {
  @Input() url: string
  @Input() title: string
  @Input() defaultPhoto: string = "../../../assets/img/default-avatar.png"
  @Output() onUpload: EventEmitter<File> = new EventEmitter<File>()
  avatarForm: FormGroup
  fileToUpload: File = null

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.avatarForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.avatarForm, name, validation)
  }

  getUserImage(): string {
    if(this.url){
      return this.url
    }else {
      return this.defaultPhoto
    }
  }

  onSubmit() {
    this.onUpload.emit(this.fileToUpload)
  }

  private initForm() {
    this.avatarForm = new FormGroup({
      avatar: new FormControl(null, [Validators.required])
    })
  }

}
