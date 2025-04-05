import { SchoolYearById } from './../school-year/schoolYearById.model';
import { Phone } from './../shared/phone.model';
import { Address } from './../shared/address.model';

export interface FranchiseById {
  id: string
  name: string,
  address: Address
  message?: string
  phone: Phone
  disabled: boolean
  schoolId: string
  schoolYears: SchoolYearById[]
}
