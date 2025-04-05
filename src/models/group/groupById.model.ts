import { SubjectById } from './../subject/subjectById.model';
export interface GroupById {
  id: string
  name: string
  description: string
  subjects: SubjectById[]
}
