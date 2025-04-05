import { showSuccess, hasError, ValdateUrl } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.sass']
})
export class UploadFileComponent implements OnInit, OnChanges {
  @Input() modalTitle: string
  @Input() isUrl: boolean
  @Input() onlyFile: boolean
  fileForm: FormGroup
  fileToUpload: File
  @Output() onUpload: EventEmitter<{isUrl: boolean, value: {
    name: string,
    description: string,
    file?: File
    url?: string
  }}> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
  }

  extensions() {
    return this.onlyFile  ? "image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    : "image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,video/mp4,audio/mp3"
  }

  private initForm() {
    if(this.onlyFile) {
      this.fileForm = new FormGroup({
        file: new FormControl(null, [Validators.required])
      })
    }else {
      this.fileForm = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        description: new FormControl('')
      })
      if(this.isUrl) {
        this.fileForm.addControl('url',new FormControl('', [Validators.required,ValdateUrl]))
      } else {
        this.fileForm.addControl('file',new FormControl(null, [Validators.required]))
      }
    }

  }

  showSuccess(name: string): boolean {
    return showSuccess(this.fileForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.fileForm, name, validation)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.onUpload.emit(
      {
        isUrl: this.isUrl,
        value: {
          name: this.fileForm.value.name,
          description: this.fileForm.value.description,
          file: this.fileToUpload,
          url: this.fileForm.value.url
        }
      }
    )
  }

}
