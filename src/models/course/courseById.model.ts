import { SchoolYearById } from './../school-year/schoolYearById.model';
export interface CourseById {
  id: string
  name: string
  description: string
  grade: string
  gradeId: string
  startYear: number
  endYear: number
  schoolYear: SchoolYearById
}
