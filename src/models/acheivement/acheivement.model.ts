import { PeriodSchool } from './../school/schoolById.model';
import { AcheivementInfo } from './acheivementInfo.model';
export interface Acheivement {
  acheivements: AcheivementInfo[]
  period: PeriodSchool
}

export interface AcheivementByUser {
  id: string
  fullName: string
  periods: Acheivement[]
}