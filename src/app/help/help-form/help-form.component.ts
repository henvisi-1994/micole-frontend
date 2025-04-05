import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { hasError, showSuccess } from 'src/util/validators';
import * as _ from 'lodash'

@Component({
  selector: 'app-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: ['./help-form.component.sass']
})
export class HelpFormComponent implements OnInit {

  @Output() onAction: EventEmitter<any> = new EventEmitter()
  helpForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.helpForm, name)
  }

  hasError(name: string, validation: string,) {
    return hasError(this.helpForm, name, validation)
  }

  onSubmit() {
    const failText: string[] = []
    const texts = ['Dificultades económicas de tu familia','Problemas de inseguridad de tu barrio','Tienes que ir a trabajar',
  'No sientes ganas de asistir','Otra razón']
    for(let i = 0; i < 5; i++) {
      if(this.helpForm.value['fail'][i]) {
        failText.push(texts[i])
      }
    }
    const result = {
      ..._.omit(this.helpForm.value,['fail']),
      failText
    }
    // console.log(result)
    this.onAction.emit(result)
  }

  private initForm() {   
    this.helpForm = new FormGroup({
      sad: new FormControl(null, [Validators.required]),
      mistreated: new FormControl(null, [Validators.required]),
      fear: new FormControl(null, [Validators.required]),
      mood: new FormControl(null, [Validators.required]),
      suicide: new FormControl(null, [Validators.required]),
      fail: new FormArray([new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false)]),
      pregnancy: new FormControl(null, [Validators.required])
    })
  }

}
