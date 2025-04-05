import { CourseStats } from './courseStats.model';
export interface GradeStats {
  id: string
  name: string
  courses: CourseStats[]
}
