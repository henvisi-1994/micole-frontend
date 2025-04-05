import { SchoolYearById } from './../school-year/schoolYearById.model';
export interface FranchiseWithSchoolYear {
  id: string
  name: string
  schoolYears: SchoolYearById[]
}
