import { User } from './../user/user.model';
import { SubjectById } from './../subject/subjectById.model';
export interface CourseWithSubject {
  id: string
  description: string
  name: string
  school: string
  franchise: string
  schoolId: string
  subjects: SubjectById[]
  directors: User[]
  students: User[]
}
