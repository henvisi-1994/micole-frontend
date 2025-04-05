import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CaseById } from 'src/models/cases/caseById.model';
import { hasError, showSuccess } from 'src/util/validators';

@Component({
  selector: 'app-case-attend-form',
  templateUrl: './case-attend-form.component.html',
  styleUrls: ['./case-attend-form.component.sass']
})
export class CaseAttendFormComponent implements OnInit {

  caseAttendForm: FormGroup
  @Input() case: CaseById
  @Output() onAction: EventEmitter<{data: any, observation?: string}> = new EventEmitter()
  ages:  {id: number, value: string}[] = []
  gender: string[] = []
  day: string[] = []
  educationLevel: string[] = []
  relationship: string[] = []
  reasonOfTheService: string[] = []
  whoSends: string[] = []
  yesOrNo: string[] = []
  howMany: string[] = []
  technicalHelp: string[] = []
  pathologyType: string[] = []
  typeOfBirth: string[] = []
  months: string[] = []
  options: string[] = []
  person: string[] = []
  minDate: Date
  maxDate: Date

  constructor() {
    for(let i=1; i<=20; i++) this.ages.push({id: i,value: ""+i})
    for(let i=1; i<=9; i++) this.months.push(`${i}`)
    this.gender.push(...["Masculino","Femenino","Prefiere no decir","Otro"])
    this.day.push(...["Mañana","Tarde","Única","Otra"])
    this.educationLevel.push(...["Primaria","Secundaria","Técnico","Profesional","Magister","Doctorado","Ninguno"])
    this.relationship.push(...["Madre","Padre","Otro familiar","Otro no familiar","No aplica"])
    this.reasonOfTheService.push(...["Es remitido","Activo por mi te ayuda","Por iniciativa propia","Por solicitud del acudiente"])
    this.whoSends.push(...["Profesor","Director de curso","Coordinador","Otro","No aplica"])
    this.yesOrNo.push(...["Sí","No","No sabe/No responde"])
    this.typeOfBirth.push(...["Vaginal", "Cesárea"])
    this.minDate = moment().startOf('day').subtract(1,'year').toDate()
    this.maxDate = moment().startOf('day').toDate()
    this.pathologyType.push(...["Cardiaca","Respiratoria","Muscular","Limitiación Física","Neurológico"])
    this.technicalHelp.push(...["Visuales","Auditivas","Ópticas","Ortopédicas","Otro"])
    this.options.push(...["Nunca","Casi nunca","a veces","frecuentemente","siempre"])
    this.howMany.push(...["1","2","3","Mas"])
    this.person.push(...["Estudiante","Acudiente","Ambos","Otro"])
  }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    this.onAction.emit({
      data: _.omit(this.caseAttendForm.value, 'observation'),
      observation: this.caseAttendForm.value['observation']
    })
  }

  showSuccess(name: string): boolean {
    return showSuccess(this.caseAttendForm, name)
  }

  hasError(name: string, validation: string,) {
    return hasError(this.caseAttendForm, name, validation)
  }

  private initForm() {   
    this.caseAttendForm = new FormGroup({
      dateAndPlace: new FormControl('',[Validators.required]),
      age: new FormControl(null, [Validators.required]),
      nuip: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      day: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      attendant: new FormControl(null, [Validators.required]),
      attendantPhone: new FormControl(null, [Validators.required]),
      attendantRelationship: new FormControl(null,[Validators.required]),
      attendantEducationLevel: new FormControl(null, [Validators.required]),
      reasonOfTheService: new FormControl(null,[Validators.required]),
      submissionDate: new FormControl(null, [Validators.required]),
      whoSends: new FormControl(null,[Validators.required]),
      serviceDate: new FormControl(null, [Validators.required]),
      descriptionFamiliarRelationship: new FormControl(null,[Validators.required]),
      mother: new FormControl(null,[Validators.required]),
      motherPhone: new FormControl(null,[Validators.required]),
      motherJob: new FormControl(null, [Validators.required]),
      motherEducationLevel: new FormControl(null,[Validators.required]),
      father: new FormControl(null,[Validators.required]),
      fatherPhone: new FormControl(null,[Validators.required]),
      fatherJob: new FormControl(null, [Validators.required]),
      fatherEducationLevel: new FormControl(null,[Validators.required]),
      desiredPregnancy: new FormControl(null),
      pregnancyTime: new FormControl(null),
      pregnancyMedicaments: new FormControl(null),
      drugs: new FormControl(null),
      nutrition: new FormControl(null),
      weight: new FormControl(null),
      size: new FormControl(null),
      incubator: new FormControl(null),
      typeOfBirth: new FormControl(null),
      forceps: new FormControl(null),
      difficulties: new FormControl(null),
      difficultiesText: new FormControl(null),
      engineDevelopment: new FormControl(null),
      engineLanguage: new FormControl(null),
      hospitalizations: new FormControl(null),
      disease: new FormControl(null),
      pathologyType: new FormControl(null),
      disability: new FormControl(null),
      technicalHelp: new FormControl(null),
      technicalHelpText: new FormControl(null),
      diagnosticImpression: new FormControl(null),
      pregnancy: new FormControl(null),
      pregnancyMonth: new FormControl(null),
      spa: new FormControl(null),
      repeatedSchoolYear: new FormControl(null),
      repeatedSchoolYearTimes: new FormControl(null),
      repeatedReason: new FormControl(null),
      repeatedGrades: new FormControl(null),
      activitiesLowerDifficulty: new FormControl(null),
      activitiesHigherDifficulty: new FormControl(null),
      studiedSchools: new FormControl(null),
      studiedSchoolsText: new FormControl(null),
      personGiveInformation: new FormControl(null),
      personGiveInformationText: new FormControl(null),
      relationship: new FormControl(null),
      observation: new FormControl(null)
    })
  }

}
