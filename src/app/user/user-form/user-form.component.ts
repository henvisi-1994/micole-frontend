import { specialFeature } from './../../../models/parametric/specialFeature.model';
import { populationGroup } from './../../../models/parametric/populationGroup.model';
import { ParametricService } from 'src/services/parametric/parametric.service';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { PasswordConfirmMatcher } from './../../../util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { identificationType } from '../../../models/parametric/identificationType.model';
import { bloodType } from '../../../models/parametric/bloodType.model';
import { UserById } from '../../../models/user/userById.model';
import { ValidatePhone, showSuccess, hasError, ValidateConfirmPassword } from 'src/util/validators';
import { gender } from 'src/models/parametric/gender.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  @Input() user: UserById = null
  @Input() title: string
  @Input() showSchools: boolean = false
  @Input() showRoles: boolean = false
  @Input() showPassword: boolean = false
  @Input() roles: string[]
  @Output() onEdit: EventEmitter<any> = new EventEmitter<any>()
  editForm: FormGroup
  bloodType = bloodType
  identificationType = identificationType
  populationGroup = populationGroup
  specialFeature = specialFeature
  gender = gender
  hide: boolean = true
  hideConfirm: boolean = true
  showOther: boolean = false
  matcher = new PasswordConfirmMatcher()
  schools: Array<SchoolParametric>
  minDate: Date
  maxDate: Date

  constructor(private parametricService: ParametricService) { }

  ngOnInit(): void {
    this.minDate = new Date(1930,1,1)
    this.maxDate = new Date()
    this.initForm()
    this.parametricService.getSchools().subscribe(schools => {
      this.schools = schools
    })
  }

  getBloadTypes(){
    return Object.keys(this.bloodType)
  }

  getIdentificationTypes() {
    return Object.keys(this.identificationType)
  }

  getSpecialFeature() {
    return Object.keys(this.specialFeature)
  }

  getPopulationGroup() {
    return Object.keys(this.populationGroup)
  }

  getGender() {
    return Object.keys(this.gender)
  }

  onSubmit() {
    this.onEdit.emit(this.editForm.value)
  }

  validPhone() : boolean {
    return (<string>this.editForm.get('phone').value).trim().length > 0
  }

  private initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName || '', [Validators.required,
        Validators.minLength(3), Validators.maxLength(255)]),
      secondName: new FormControl(this.user?.secondName || ''),
      surname: new FormControl(this.user?.surname || '', [Validators.required,
        Validators.minLength(3), Validators.maxLength(255)]),
      lastname: new FormControl(this.user?.lastname || ''),
      email: new FormControl(this.user?.email || '', [Validators.required, Validators.email]),
      mobile: new FormControl(this.user?.phoneNumber || '', [Validators.required, Validators.pattern(/[0-9]{10,10}/)]),
      phone: new FormControl(this.user?.phone || '',[ ValidatePhone ]),
      diseases: new FormControl(this.user?.diseases || ''),
      rh: new FormControl(this.user?.bloodType || '', [Validators.required]),
      identificationType: new FormControl(this.user?.identificationType || '', [Validators.required]),
      gender: new FormControl(this.user?.gender || '', [Validators.required]),
      identification: new FormControl(this.user?.identification || '',[Validators.required, Validators.minLength(4)]),
      description: new FormControl(this.user?.description || ''),
      populationGroup: new FormControl(this.user?.populationGroup || ''),
      specialFeature: new FormControl(this.user?.specialFeature || ''),
      birthday: new FormControl(this.user?.birthday),
      sms: new FormControl(this.user?.sms || false)
    })
    if(this.user?.populationGroup == "Otro") {
      this.showOther = true
      this.editForm.addControl('populationGroupOther', new FormControl(this.user?.populationGroupOther || '', [Validators.required]))
    }
    if(this.showSchools) {
      this.editForm.addControl('school', new FormControl(null, [Validators.required]))
    }
    if(this.showRoles) {
      this.editForm.addControl('role', new FormControl(null,[Validators.required]))
    }
    if(this.showPassword) {
      this.editForm.addControl('newPassword', new FormControl(null, [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]))
      this.editForm.addControl('newPasswordConfirmation', new FormControl(null, [Validators.required]))
      this.editForm.setValidators(ValidateConfirmPassword)
    }
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.editForm, name)
  }

  selectedPopulationGroup(value: string) {
    if(value == "Otro") {
      this.showOther = true
      this.editForm.addControl('populationGroupOther', new FormControl(this.user?.populationGroup || '', [Validators.required]))
    } else {
      this.showOther = false
      this.editForm.removeControl('populationGroupOther')
    }
  }

  hasError(name: string, validation: string) {
    return hasError(this.editForm, name, validation)
  }

}
