import { LoginInfo } from "./../models/auth/loginInfo.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TOKEN } from "src/util/constants";

@Injectable({
  providedIn: "root",
})
export class DataService {
  loadingScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userData: BehaviorSubject<LoginInfo> = new BehaviorSubject(null);
  breadcrumbs: BehaviorSubject<String[]> = new BehaviorSubject([]);
  showSchoolNew: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showUserNew: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showNewEvent: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showNewAcheivement: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showNewTask: BehaviorSubject<boolean> = new BehaviorSubject(null);
  currentSchoolCardValue: BehaviorSubject<{
    id: string;
    name: string;
    description: string;
    preschool?: boolean;
    index: number;
  }> = new BehaviorSubject(null);
  openAcheivementModal: BehaviorSubject<boolean> = new BehaviorSubject(null);
  openAcheivementMassiveModal: BehaviorSubject<boolean> = new BehaviorSubject(null);
  openTaskModal: BehaviorSubject<boolean> = new BehaviorSubject(null);
  openTaskFinalModal: BehaviorSubject<boolean> = new BehaviorSubject(null);
  openTaskRecoverModal: BehaviorSubject<boolean> = new BehaviorSubject(null);


  constructor() {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN);
  }
}
