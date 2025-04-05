import { GradeBySubjectTask } from './gradeBySubjectTask.model';

export interface GradeBySubjectPeriod {
  id: string,
  name: string
  tasks: GradeBySubjectTask[]
}
