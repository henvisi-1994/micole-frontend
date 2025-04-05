import { TaskStats } from './tasksStats.model';
export interface SubjectStats {
  id: string
  name: string
  grade: number
  tasks: TaskStats[]
}
