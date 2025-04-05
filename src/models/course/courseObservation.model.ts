export interface CourseObservation {
  periods: CourseObservationPeriod[]
  students: CourseObservationStudent[]
}

export interface CourseObservationPeriod {
  id: string
  period: string
}

export interface CourseObservationStudent {
  id: string
  student: string
  periods: CourseObservationStudentPeriod[]
}

export interface CourseObservationStudentPeriod {
  period: string
  text: string
  id: string
}
