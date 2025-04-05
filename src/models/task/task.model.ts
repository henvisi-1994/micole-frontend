import { PeriodSchool } from './../school/schoolById.model';
import { TaskInfo } from './taskInfo.model';
export interface Task {
  period: PeriodSchool
  tasks: TaskInfo[]
}
