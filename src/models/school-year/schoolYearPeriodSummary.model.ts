export interface SchoolYearPeriodSummary {
  school: string
  year: string
  franchise: string
  period: SchoolYearPeriodSummaryPeriod
}

export interface SchoolYearPeriodSummaryPeriod {
  period: string
  grades: SchoolYearPeriodSummaryGrade[]
}

export interface SchoolYearPeriodSummaryGrade {
  grade: string
  courses: SchoolYearPeriodSummaryCourse[]
}

export interface SchoolYearPeriodSummaryCourse {
  course: string
  courseId: string
  subjects: SchoolYearPeriodSummarySubject[]
}

export interface SchoolYearPeriodSummarySubject {
  subject: string
  users: SchoolYearPeriodSummaryUser[]
}

export interface SchoolYearPeriodSummaryUser {
  name: string
  identification: string
  grade: number
  failed: boolean
}
