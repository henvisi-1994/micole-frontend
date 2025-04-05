import { SubjectById } from './../../../models/subject/subjectById.model';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormAction } from './../../../models/franchise/formAction.enum';
import { GroupById } from './../../../models/group/groupById.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.sass']
})
export class GroupCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() group: GroupById
  @Output() onEdit: EventEmitter<{name: string, description: string}> = new EventEmitter()
  @Output() onSubject: EventEmitter<
  {
    value: SubjectById,
    isEditing: boolean
  }
  > = new EventEmitter()
  formActionGroup: FormAction = FormAction.GROUP
  currentValue: {id: string, name: string, description: string, index: number} = null
  modalText: string = "Crear materia"
  modalForm: FormGroup
  @Input() currentValueSubject: SubjectById
  @Output() onOpenModal: EventEmitter<boolean> = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.currentValue = {id: this.group.id, name: this.group.name, description: this.group.description, index: -1}
    this.initForm()
    if(this.currentValueSubject != null) {
      this.modalText = "Acualizar materia"
    }else {
      this.modalText = "Crear materia"
    }
  }

  openModal() {
    this.onOpenModal.emit(true)
    $('#formSubjectModal').modal('show')
  }

  private initForm() {
    this.modalForm = new FormGroup({
      name: new FormControl(this.currentValueSubject?.name || '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(this.currentValueSubject?.description || ''),
      percentage: new FormControl(this.currentValueSubject?.percentage || 0, [Validators.min(1), Validators.max(100)])
    })
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.modalForm, name)
  }

  hasError(name: string, validation: string,) {
    return hasError(this.modalForm, name, validation)
  }

  onSubmit() {
    this.onSubject.emit({
      value: {...this.modalForm.value, id: this.currentValueSubject?.id},
      isEditing: !!this.currentValueSubject
    })
    $('#formSubjectModal').modal('hide')
  }

  onAction(result: any) {
    this.onEdit.emit({name: result.value.name, description: result.value.description})
  }

  ngOnDestroy(): void {
    $("#formSubjectModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }


}
