import { DataService } from "./../../../services/data.service";
import { Notification } from "./../../../util/notifications";
import { AuthService } from "src/services/auth/auth.service";
import { Role } from "./../../../models/parametric/role.model";
import { roleValue } from "./../../../models/parametric/roleValue.model";
import { UserById } from "./../../../models/user/userById.model";
import { identificationType } from "./../../../models/parametric/identificationType.model";
import { bloodType } from "./../../../models/parametric/bloodType.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserDisabled } from "src/models/user/userDisabled.model";
import { Router } from "@angular/router";
import { gender } from "src/models/parametric/gender.model";
import { UserService } from "src/services/user/user.service";

@Component({
  selector: "app-user-card",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.sass"],
})
export class UserCardComponent implements OnInit {
  @Input() user: UserById;
  @Input() roles: string[];
  @Input() disabled: UserDisabled;
  @Input() showActions: boolean;
  @Input() showEdit: boolean;
  @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();
  student: string = Role.STUDENT;
  parent: string = Role.PARENT;
  @Output() onUser: EventEmitter<{ id: string }> = new EventEmitter();
  // isAdmin: boolean
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.isAdmin = this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])
  }

  getUserImage(): string {
    if (this.user && this.user.photo) {
      return this.user.photo;
    } else {
      return "../../../assets/img/default-avatar.png";
    }
  }

  getUserRoles(): String {
    let roles = "";
    this.roles.forEach((r) => {
      roles += roleValue[r.toString()] + ", ";
    });
    return roles.substr(0, roles.length - 2);
  }

  getBloodType(): String {
    return bloodType[this.user?.bloodType];
  }

  getGender(): String {
    return gender[this.user?.gender];
  }

  getIdentification() {
    if (this.user)
      return (
        identificationType[this.user?.identificationType] +
        " " +
        this.user?.identification
      );
    return "";
  }

  getFullName() {
    if (this.user)
      return (
        this.user?.firstName +
        " " +
        this.user?.secondName +
        " " +
        this.user?.surname +
        " " +
        this.user?.lastname
      );
    return "";
  }

  downloadNotificationsExcel() {
    this.userService.downloadNotificationsExcel(this.user.id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Observador-${this.user.firstName}_${this.user.surname}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show("<b>Error</b>", "No se pudo descargar el observador");
      }
    );
  }

  downloadNotifications() {
    this.userService.downloadNotifications(this.user.id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);
        let newBlob = new Blob([data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(newBlob);
        let link = document.createElement("a");
        link.href = url;
        link.download = `Observador-${this.user.firstName}_${this.user.surname}`;
        link.click();
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show("<b>Error</b>", "No se pudo descargar el observador");
      }
    );
  }

  getEnableText() {
    return this.disabled?.disabled ? "Habilitar" : "Deshabilitar";
  }

  disableUser() {
    this.onDisabled.emit(true);
  }

  editProfile() {
    this.router.navigate(["dashboard", "users", this.user.id, "edit"]);
  }

  onParent(value) {
    this.onUser.emit({
      id: value,
    });
  }

  isParent() {
    return this.authService.hasRole([Role.PARENT]);
  }

  isAdmin() {
    return this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN]);
  }

  canShow(): boolean {
    return (
      this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER]) ||
      this.showEdit
    );
  }
}
