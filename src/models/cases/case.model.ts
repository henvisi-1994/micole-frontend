import { CaseUser } from './caseUser.model'

export interface Case {
  id: string
  user: string | CaseUser 
  course: string
  franchise: string
  createdAt: string
  lifeAtRisk: boolean
  lifeAtRiskText?: string
  status: string
  year: string
}