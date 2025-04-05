import { GradeBySubjectPeriod } from './gradeBySubjectPeriod.model';

export interface GradeBySubject {
  name: string,
  course: string,
  periods: GradeBySubjectPeriod[]
}
