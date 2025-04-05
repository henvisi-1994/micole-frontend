import { Phone } from "./../shared/phone.model";
import { Address } from "./../shared/address.model";
export interface SchoolById {
  id: string;
  name: string;
  description: string;
  address: Address;
  phone: Phone;
  email: string;
  logo: string;
  disabled: boolean;
  // plan: string;
  sms: boolean;
  dane: string;
  resolution: string
  shortName: string;
  franchises: FranchiseSchool[];
  groups: GroupSchool[];
  grades: GradeSchool[];
  periods: PeriodSchool[];
  settings: SettingSchool[];
  directorName: string
  directorIdentification: string
  secretariatName: string
  secretariatIdentification: string
}

export interface FranchiseSchool {
  id: string;
  name: string;
  address: string;
  phone: string;
  disabled: boolean;
  status?: string;
  schoolYears?: SchoolYearSchool[];
}

export interface SchoolYearSchool {
  id: string;
  year: string;
  courses: CourseSchool[];
}

export interface CourseSchool {
  id: string;
  name: string;
}

export interface GroupSchool {
  id: string;
  name: string;
  description: string;
  subjects: SubjectsSchool[];
  subjectsCount?: number;
}

export interface SubjectsSchool {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

export interface GradeSchool {
  id: string;
  name: string;
  description: string;
  preschool: string
}

export interface PeriodSchool {
  id: string;
  position: number;
  description: string;
  schoolId: string;
}

export interface SettingSchool {
  id: string;
  rule: string;
  value: number;
  ruleNormalized?: string;
  valueNormalized?: string;
}
