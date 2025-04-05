import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcheivementParameters } from 'src/models/acheivement/acheivement.parameters';

declare const $: any;

@Component({
  selector: 'app-acheivement-create-massive-modal',
  templateUrl: './acheivement-create-massive-modal.component.html',
  styleUrls: ['./acheivement-create-massive-modal.component.sass']
})
export class AcheivementCreateMassiveModalComponent implements OnInit {

  @Input() modalTitle: string
  @Input() modalButton: string
  @Input() parameters: AcheivementParameters
  @Output() onAction: EventEmitter<{year: string, period: string, file: File}> = new EventEmitter()
  acheivementUploadForm: FormGroup
  fileToUpload: File = null

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private initForm() {
    this.acheivementUploadForm = new FormGroup({
      year: new FormControl('', [Validators.required]),
      period: new FormControl('', [Validators.required]),
      file: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    $('#acheivementMassiveModal').modal('hide')
    this.onAction.emit({
      year: this.acheivementUploadForm.value.year,
      period: this.acheivementUploadForm.value.period,
      file: this.fileToUpload
    })
    this.acheivementUploadForm.reset()
  }

}
