import { SubjectStats } from './subjectStats.model';
export interface PeriodStats {
  id: string
  name: string
  subjects: SubjectStats[]
}
