import { Score } from "./../score/score.model";
import { Attachment } from "./../attachment/attachment.model";
export interface TaskById {
  id: string;
  subject: string;
  name: string;
  description: string;
  taskDate: string;
  percentage: number;
  type: string;
  attachments: Attachment[];
  scores: Score[];
}
