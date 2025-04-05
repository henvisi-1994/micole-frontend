import { PeriodStats } from './periodStats.model';
export interface CourseStats {
  id: string
  name: string
  maxGrade: number
  periods: PeriodStats[]
}
