import { CourseInfo } from './courseInfo.model';

export interface CourseBySchoolYear {
  id: string,
  startYear: number,
  endYear: number,
  startMonth: string
  endMonth: string
  franchise: string
  userId: string
  courses: CourseInfo[]
}
