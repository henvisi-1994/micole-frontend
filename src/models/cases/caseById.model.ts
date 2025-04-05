import { Case } from './case.model'
import { CaseUser } from './caseUser.model'

export interface CaseById extends Case {
  attendedBy?: CaseUser
  user: CaseUser
  studentGuidenceSheet?: string
  answers?: string
  answersTransformed?: any
  studentGuidenceSheetTransformed?: any
  grade: string
  records: CaseRecord[]
}

export interface CaseRecord {
  user: string
  text: string
  createdAt: string
}

