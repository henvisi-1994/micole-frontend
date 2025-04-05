import { CONFIG_GRADE } from "./../../../util/constants";
import { Role } from "./../../../models/parametric/role.model";
import { AuthService } from "src/services/auth/auth.service";
import { GroupService } from "./../../../services/group/group.service";
import { GradeService } from "./../../../services/grade/grade.service";
import { PeriodService } from "./../../../services/period/period.service";
import { SettingService } from "./../../../services/setting/setting.service";
import { Action } from "./../../../models/parametric/action.model";
import { DataService } from "src/services/data.service";
import { Notification } from "./../../../util/notifications";
import { SchoolService } from "./../../../services/school/school.service";
import { plan } from "./../../../models/parametric/plan.model";
import { ActivatedRoute, Router } from "@angular/router";
import {
  SchoolById,
  FranchiseSchool,
  GroupSchool,
  GradeSchool,
  PeriodSchool,
  SettingSchool,
} from "./../../../models/school/schoolById.model";
import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { ConfigGrade } from "src/models/config-grade/configGrade.model";

@Component({
  selector: "app-school-show",
  templateUrl: "./school-show.component.html",
  styleUrls: ["./school-show.component.sass"],
})
export class SchoolShowComponent implements OnInit {
  id: string;
  school: SchoolById;
  showFranchises: boolean = false;
  franchiseHeaders: string[];
  franchiseKeys: string[];
  franchiseItems: FranchiseSchool[];
  franchiseAction: Action[];

  showGroups: boolean = false;
  groupHeaders: string[];
  groupKeys: string[];
  groupItems: GroupSchool[];
  groupAction: Action[];

  showGrade: boolean = false;
  gradeHeaders: string[];
  gradeKeys: string[];
  gradeItems: GradeSchool[];
  gradeAction: Action[];

  showPeriod: boolean = false;
  periodHeaders: string[];
  periodKeys: string[];
  periodItems: PeriodSchool[];
  periodAction: Action[];
  hasPeriodAction: boolean = false;

  showSetting: boolean = false;
  settingHeaders: string[];
  settingKeys: string[];
  settingItems: SettingSchool[];
  settingAction: Action[];
  hasSettingAction: boolean = false;

  showConfigGrade: boolean = false;
  configGradeHeaders: string[];
  configGradeKeys: string[];
  configGradeItems: ConfigGrade[];
  configGradeAction: Action[];
  hasConfigGradeAction: boolean = false;

  private confingIndex = 0;
  private periodIndex = 1;
  private groupIndex = 2;
  private gradeIndex = 3;
  // collapsibleHeaders: string[]
  // collapsibleItems: any[]

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService,
    private dataService: DataService,
    private router: Router,
    private settingService: SettingService,
    private periodService: PeriodService,
    private gradeService: GradeService,
    private groupService: GroupService,
    private authService: AuthService
  ) {
    this.showConfigGrade = false;

    this.franchiseHeaders = ["Nombre", "Dirección", "Teléfono"];
    this.franchiseKeys = ["name", "address", "phone"];
    // if (authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
    //   this.franchiseHeaders.push("Estado");
    //   this.franchiseKeys.push("status");
    // }
    this.franchiseAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.franchiseAction.push({
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      });
    }
    this.groupHeaders = ["Nombre", "Descripción"];
    this.groupKeys = ["name", "description"];
    this.groupAction = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.groupAction.push({
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      });
      this.groupAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }
    this.gradeHeaders = ["Nombre", "Descripción",'Pre escolar'];
    this.gradeKeys = ["name", "description","preschool"];
    this.gradeAction = [];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.gradeAction.push({
        type: "info",
        action: "show",
        icon: "fa fa-graduation-cap",
        tooltip: "Crear curso",
      });
    }
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
      this.gradeAction.push({
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      });
      this.gradeAction.push({
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      });
    }

    this.periodHeaders = ["Periodo", "Descripción"];
    this.periodKeys = ["position", "description"];
    this.periodAction = [
      {
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      },
      {
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      },
    ];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN]))
      this.hasPeriodAction = true;

    this.settingHeaders = ["Regla", "Valor"];
    this.settingKeys = ["ruleNormalized", "valueNormalized"];
    this.settingAction = [
      {
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      },
      {
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      },
    ];

    this.configGradeHeaders = [
      "Nombre",
      "Iniciales",
      "Valor minino",
      "Valor maximo",
    ];
    this.configGradeKeys = ["name", "initials", "minValue", "maxValue"];
    this.configGradeAction = [
      {
        type: "primary",
        action: "edit",
        icon: "fa fa-edit",
        tooltip: "Editar",
      },
      {
        type: "danger",
        action: "delete",
        icon: "fa fa-trash",
        tooltip: "Borrar",
      },
    ];
    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN]))
      this.hasConfigGradeAction = true;

    if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN]))
      this.hasSettingAction = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.reload(this.route.snapshot.data["school"]);
    this.showFranchises = true;
    this.showGroups = true;
    this.showGrade = true;
    this.showPeriod = true;
    this.showSetting = true;
    this.dataService.breadcrumbs.next(["Colegios", "Información"]);
    this.schoolService.getConfig(this.id).subscribe((data) => {
      this.configGradeItems = data;
      this.showConfigGrade = true;
    });
  }

  disableSchool() {
    const id = this.route.snapshot.params["id"];
    let request = this.schoolService.disableSchool(id);
    if (this.school.disabled) {
      request = this.schoolService.restoreSchool(id);
    }
    request.subscribe(
      (data) => {
        this.reload(data);
        Notification.show(
          "<b>Éxito</b>",
          "Hemos actualizado el estado exitosamente",
          "bottom",
          "right",
          "success"
        );
      },
      (err) => {
        Notification.show("<b>Error</b>", err);
      }
    );
  }

  onPlanSelected(value: string) {
    // const id = this.route.snapshot.params['id']
    // if(this.school.plan != value) {
    //   this.schoolService.updatePlan(id, value)
    //     .subscribe(data => {
    //       this.reload(data)
    //     }, err => {
    //       Notification.show("<b>Error</b>",err)
    //     })
    // }
  }

  onConfigGradeAction(value: any) {
    const config = this.configGradeItems[value.index];

    if (value.action === "edit") {
      localStorage.setItem(CONFIG_GRADE, JSON.stringify(config));
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.id,
        "configs",
        "edit",
      ]);
    } else {
      swal({
        title: "Eliminar equivalencia",
        text: "Seguro quieres borrar la equivalencia ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.schoolService.deleteConfig(this.school.id, config.id).subscribe(
            (data: string) => {
              swal({
                title: "Éxito",
                text: data,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.schoolService.getConfig(this.id).subscribe((data) => {
                      this.configGradeItems = data;
                    });
                  }
                })
                .catch(swal.noop);
            },
            (err: string) => {
              swal({
                title: "Error",
                text: err,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              });
            }
          );
        }
      });
    }
  }

  onFranchiseAction(value: any) {
    if (value.action === "edit") {
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.school.id,
        "franchises",
        this.franchiseItems[value.index].id,
        value.action,
      ]);
    } else {
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.school.id,
        "franchises",
        this.franchiseItems[value.index].id,
      ]);
    }
  }

  private reload(data: SchoolById) {
    this.school = data;
    this.franchiseItems = this.school.franchises;
    this.groupItems = this.school.groups;
    this.gradeItems = this.school.grades;
    this.periodItems = this.school.periods;
    this.settingItems = this.school.settings;
  }

  onGroupAction(value: any) {
    const group = this.school.groups[value.index];
    if (value.action === "edit") {
      this.dataService.currentSchoolCardValue.next({
        id: group.id,
        name: group.name,
        description: group.description,
        index: this.groupIndex,
      });
    } else if (value.action === "delete") {
      swal({
        title: "Eliminar área",
        text: "Seguro quieres borrar el área ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.groupService.deleteGroup(group.id, this.school.id).subscribe(
            (data: string) => {
              swal({
                title: "Éxito",
                text: data,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.onUpdated(true);
                  }
                })
                .catch(swal.noop);
            },
            (err: string) => {
              swal({
                title: "Error",
                text: err,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              });
            }
          );
        }
      });
    } else {
      this.router.navigate(["/", "dashboard", "groups", group.id]);
    }
  }

  onUpdated(value: any) {
    this.schoolService.getSchoolById(this.school.id).subscribe((data) => {
      this.reload(data);
    });
  }

  onGradeAction(value: any) {
    const grade = this.school.grades[value.index];
    if (value.action === "edit") {
      this.dataService.currentSchoolCardValue.next({
        id: grade.id,
        name: grade.name,
        description: grade.description,
        preschool: grade.preschool == 'Si',
        index: this.gradeIndex,
      });
    } else if (value.action === "delete") {
      swal({
        title: "Eliminar grado",
        text: "Seguro quieres borrar el grado ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.gradeService.deleteGrade(grade.id, this.school.id).subscribe(
            (data: string) => {
              swal({
                title: "Éxito",
                text: data,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.onUpdated(true);
                  }
                })
                .catch(swal.noop);
            },
            (err: string) => {
              swal({
                title: "Error",
                text: err,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              });
            }
          );
        }
      });
    } else {
      this.router.navigate([
        "/",
        "dashboard",
        "schools",
        this.school.id,
        "grades",
        grade.id,
        "courses",
        "new",
      ]);
    }
  }

  onPeriodAction(value: any) {
    const period = this.school.periods[value.index];
    if (value.action === "edit") {
      this.dataService.currentSchoolCardValue.next({
        id: period.id,
        name: period.position + "",
        description: period.description,
        index: this.periodIndex,
      });
    } else {
      swal({
        title: "Eliminar periodo",
        text: "Seguro quieres borrar el periodo ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.periodService.deletePeriod(period.id).subscribe(
            (data: string) => {
              swal({
                title: "Éxito",
                text: data,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.onUpdated(true);
                  }
                })
                .catch(swal.noop);
            },
            (err: string) => {
              swal({
                title: "Error",
                text: err,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              });
            }
          );
        }
      });
    }
  }

  onSettingAction(value: any) {
    const setting = this.school.settings[value.index];
    if (value.action === "edit") {
      this.dataService.currentSchoolCardValue.next({
        id: setting.id,
        name: setting.rule,
        description: setting.value + "",
        index: this.confingIndex,
      });
    } else {
      swal({
        title: "Eliminar configuración",
        text: "Seguro quieres borrar la configuración ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.settingService.deleteSetting(setting.id).subscribe(
            (data: string) => {
              swal({
                title: "Éxito",
                text: data,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.onUpdated(true);
                  }
                })
                .catch(swal.noop);
            },
            (err: string) => {
              swal({
                title: "Error",
                text: err,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              });
            }
          );
        }
      });
    }
  }
}
