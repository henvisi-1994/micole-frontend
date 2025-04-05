export interface UserById {
  id: string
  firstName: string
  secondName: string
  surname: string
  lastname: string
  phone: string
  phoneNumber: string
  hasChangedPassword: boolean
  identification: string
  photo: string
  diseases: string
  email: string
  bloodType: string
  identificationType: string
  description: string
  populationGroup: string
  populationGroupOther: string
  specialFeature: string
  gender: string
  birthday: Date
  role: string
  schoolId: string
  sms: boolean
  schoolName: string
  franchise?: string
  course?: string
}
