import { forkJoin, Observable } from "rxjs";
import { SchoolService } from "./../../../services/school/school.service";
import { DataService } from "src/services/data.service";
import { GradeService } from "./../../../services/grade/grade.service";
import { GroupService } from "./../../../services/group/group.service";
import { PeriodService } from "./../../../services/period/period.service";
import { Phone } from "./../../../models/shared/phone.model";
import { SettingService } from "./../../../services/setting/setting.service";
import { Action } from "./../../../models/parametric/action.model";
import { FormAction } from "./../../../models/franchise/formAction.enum";
import { plan } from "./../../../models/parametric/plan.model";
import { SchoolById } from "src/models/school/schoolById.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { values } from "lodash";

declare const $: any;

@Component({
  selector: "app-school-card",
  templateUrl: "./school-card.component.html",
  styleUrls: ["./school-card.component.sass"],
})
export class SchoolCardComponent implements OnInit {
  @Input() school: SchoolById;
  @Input() showEditButton: boolean = false;
  @Input() showActions: boolean = false;
  @Output() onDisabled: EventEmitter<boolean> = new EventEmitter();
  @Output() onPlanSelected: EventEmitter<string> = new EventEmitter();
  @Output() onUpdated: EventEmitter<boolean> = new EventEmitter();
  formActionSetting: FormAction = FormAction.SETTING;
  formActionPeriod: FormAction = FormAction.PERIOD;
  formActionGroup: FormAction = FormAction.GROUP;
  formActionGrade: FormAction = FormAction.GRADE;
  formActionNotification: FormAction = FormAction.NOTIFICACTION;
  currentValue: {
    id: string;
    name: string;
    description: string;
    preschool?: boolean;
    index: number;
  } = null;
  settingText = "Crear Configuraciónes";
  periodText = "Crear Periodos";
  groupText = "Crear Áreas";
  gradeText = "Crear Grados";
  constructor(
    private router: Router,
    private schoolService: SchoolService,
    private settingService: SettingService,
    private dataService: DataService,
    private periodService: PeriodService,
    private groupService: GroupService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.dataService.currentSchoolCardValue.subscribe((value) => {
      this.currentValue = value;
      if (value) {
        if (value.index === 0) {
          this.settingText = "Actualizar configuración";
        } else if (value.index === 1) {
          this.periodText = "Actualizar el periodo";
        } else if (value.index === 2) {
          this.groupText = "Actualizar el áreas";
        } else if (value.index === 3) {
          this.gradeText = "Actualizar el grado";
        }
        $("#formFranchiseModal" + value.index).modal("show");
      } else {
        this.settingText = "Crear configuración";
        this.periodText = "Crear periodo";
        this.groupText = "Crear área";
        this.gradeText = "Crear grado";
      }
    });
  }

  getSchoolImage() {
    if (this.school && this.school.logo) {
      return this.school.logo;
    } else {
      return "../../../assets/img/logo.png";
    }
  }

  // getPlan(): string {
  //   return plan[this.school.plan]
  // }

  getEnableText() {
    return !this.school.disabled ? "Deshabilitar" : "Habilitar";
  }

  planSelected(value: string) {
    this.onPlanSelected.emit(value);
  }

  disableSchool() {
    this.onDisabled.emit(true);
  }

  editSchool() {
    this.router.navigate(["/", "dashboard", "schools", this.school.id, "edit"]);
  }

  createConfigGrade() {
    this.router.navigate([
      "/",
      "dashboard",
      "schools",
      this.school.id,
      "configs",
    ]);
  }

  onAction(result: any) {
    console.log("***RESULT");        
    console.log(result);
    let request: Observable<string> = null;
    if (result.isEditing) {
      request = this.settingService.updateSetting(result.id, {
        rule: result.value.name,
        value: result.value.description,
      });
      if (result.action === FormAction.GRADE) {
        request = this.gradeService.updateGrade(result.id, {
          name: result.value.name,
          description: result.value.description,
          preschool: result.value.preschool === "1",
        });
      } else if (result.action === FormAction.PERIOD) {
        request = this.periodService.updatePeriod(result.id, {
          position: result.value.name,
          description: result.value.description,
        });
      } else if (result.action === FormAction.GROUP) {
        request = this.groupService.updateGroup(result.id, {
          name: result.value.name,
          description: result.value.description,
        });
      } else if (result.action == FormAction.NOTIFICACTION) {
        console.log("***");        
        console.log(result.value.grade);
        
        request = this.schoolService.sendNotification(
          this.school.id,
          result.value.name,
          result.value.description,
          result.value.role,
          result.value.file,
          result.value.grade,
          result.value.couse,
          null
        );
      }
    } else {
      request = this.settingService.createSetting(
        { rule: result.value.name, value: result.value.description },
        this.school.id
      );
      if (result.action === FormAction.GRADE) {
        request = this.gradeService.createGrade(
          {
            name: result.value.name,
            description: result.value.description,
            preschool: result.value.preschool === "1",
          },
          this.school.id
        );
      } else if (result.action === FormAction.PERIOD) {
        request = this.periodService.createPeriod(
          {
            position: result.value.name,
            description: result.value.description,
          },
          this.school.id
        );
      } else if (result.action === FormAction.GROUP) {
        request = this.groupService.createGroup(
          { name: result.value.name, description: result.value.description },
          this.school.id
        );
      } else if (result.action == FormAction.NOTIFICACTION) {
        const roles = [
          "ALL",
          "Student",
          "Parent",
          "Teacher",
          "Counselor",
          "Admin",
        ];

        if(result.value.grade || result.value.course || result.value.franchise) {
          this.schoolService.sendNotificationParams(
            this.school.id,
            result.value.name,
            result.value.description,
            null,
            result.value.file,
            result.value.grade,
            result.value.course,
            result.value.franchise
          ).subscribe(
            {
              next: (responses) => {
                swal({
                  title: "Éxito",
                  text: "Notificaciones enviadas correctamente.",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                })
                  .then((result) => {
                    if (result.value) {
                      this.onUpdated.next(true);
                    }
                  })
                  .catch(swal.noop);
              },
              error: (error) => {
                swal({
                  title: "Error",
                  text: error,
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger",
                  type: "error",
                }).catch(swal.noop);
              },
            });
        }

        const requests = result.value.role
          .map((value, index) => {
            if (value) {
              return this.schoolService.sendNotification(
                this.school.id,
                result.value.name,
                result.value.description,
                roles[index],
                result.value.file
              );
            }
            return null;
          })
          .filter((req) => req !== null);

        if (requests.length > 0) {
          forkJoin(requests).subscribe({
            next: (responses) => {
              swal({
                title: "Éxito",
                text: "Notificaciones enviadas correctamente.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
                .then((result) => {
                  if (result.value) {
                    this.onUpdated.next(true);
                  }
                })
                .catch(swal.noop);
            },
            error: (error) => {
              swal({
                title: "Error",
                text: error,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "error",
              }).catch(swal.noop);
            },
          });
        }

        /*request = this.schoolService.sendNotification(
          this.school.id,
          result.value.name,
          result.value.description,
          result.value.role,
          result.value.file
        );*/
      }
    }
  }
}
