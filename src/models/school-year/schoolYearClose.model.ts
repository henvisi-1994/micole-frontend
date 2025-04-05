export interface SchoolYearClose {
  school: string
  year: string
  franchise: string
  grades: SchoolYearCloseGrade[]
}

export interface SchoolYearCloseGrade {
  grade: string
  courses: SchoolYearCloseCourse[]
}

export interface SchoolYearCloseCourse {
  course: string
  users: SchoolYearCloseUser[]
}

export interface SchoolYearCloseUser {
  name: string
  identification: string
  groups: SchoolYearCloseGroup[]
}

export interface SchoolYearCloseGroup {
  group: string
  grade: number
}
