export class AttendanceAttachment {
  id: string;
  description: string;
  name: string;
  isUrl: boolean;
  url:string;
  file: File | null;
  constructor(){
    this.id = "";
    this.description = "";
    this.name = "";
    this.url = "";
    this.file = null;
    this.isUrl=false;
  }
}
