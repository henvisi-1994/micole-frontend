import { GradeBySubjectScore } from './gradeBySubjectScore.model';

export interface GradeBySubjectTask {
  id: string,
  name: string,
  percentage: number,
  score: GradeBySubjectScore
}
