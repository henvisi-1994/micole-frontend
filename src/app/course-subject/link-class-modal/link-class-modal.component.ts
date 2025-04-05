import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ValdateUrl, showSuccess, hasError } from 'src/util/validators';

declare const $: any;

@Component({
  selector: 'app-link-class-modal',
  templateUrl: './link-class-modal.component.html',
  styleUrls: ['./link-class-modal.component.sass']
})
export class LinkClassModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() modalTitle: string
  @Input() link: string
  linkForm: FormGroup
  @Output() onAction: EventEmitter<{link: string}> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initForm();
  }

  private initForm() {
    this.linkForm = new FormGroup({
      link: new FormControl(this.link || '', [Validators.required, ValdateUrl])
    })
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.linkForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.linkForm, name, validation)
  }

  onSubmit() {
    $('#linkClass').modal('hide')
    this.onAction.emit(this.linkForm.value)
  }

  ngOnDestroy(): void {
    $("#linkClass").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
