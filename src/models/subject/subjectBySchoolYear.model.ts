import { SubjectById } from './subjectById.model';
export interface SubjectBySchoolYear {
  id: string,
  startYear: number,
  endYear: number,
  startMonth: string
  endMonth: string
  franchise: string
  subjects: SubjectById[]
}
