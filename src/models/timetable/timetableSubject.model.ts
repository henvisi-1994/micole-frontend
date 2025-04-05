import { Timetable } from './timetable.model';
export interface TimetableSubject {
  subject: string
  subjectId: string
  course: string
  courseId: string
  link: string
  timetables: Timetable[]
}
