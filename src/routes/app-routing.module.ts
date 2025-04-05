import { ConfigFormComponent } from "./../app/config-grade/config-form/config-form.component";
import { UserRedemptionResolver } from "./../resolvers/userRedemption.resolver";
import { RedemptionIndexComponent } from "./../app/redemption/redemption-index/redemption-index.component";
import { PrizeIndexComponent } from "./../app/prize/prize-index/prize-index.component";
import { PrizeByAllyIndexComponent } from "./../app/prize/prize-by-ally-index/prize-by-ally-index.component";
import { CanSeeGamificationGuard } from "./../guards/can-see-gamification/can-see-gamification.guard";
import { AllyIndexComponent } from "./../app/ally/ally-index/ally-index.component";
import { PrizeByAllyResolver } from "./../resolvers/prizeByAlly.resolver";
import { AllyShowComponent } from "./../app/ally/ally-show/ally-show.component";
import { AllyFormComponent } from "./../app/ally/ally-form/ally-form.component";
import { CategoryFormComponent } from "./../app/category/category-form/category-form.component";
import { CategoryResolver } from "./../resolvers/category.resolver";
import { LevelFormComponent } from "./../app/level/level-form/level-form.component";
import { CanShowStatsGuard } from "./../guards/can-show-stats/can-show-stats.guard";
import { AssociateParentMassiveComponent } from "./../app/user/associate-parent-massive/associate-parent-massive.component";
import { SchoolYearSummaryResolver } from "./../resolvers/schoolYearSummary.resolver";
import { SchoolYearCloseComponent } from "./../app/schoolYear/school-year-close/school-year-close.component";
import { SchoolYearPeriodSummaryResolver } from "./../resolvers/schoolYearPeriodSummary.resolver";
import { SchoolYearPeriodComponent } from "./../app/schoolYear/school-year-period/school-year-period.component";
import { PeriodResolver } from "./../resolvers/period.resolver";
import { SchoolYearShowComponent } from "./../app/schoolYear/school-year-show/school-year-show.component";
import { CourseClassResolver } from "./../resolvers/courseClass.resolver";
import { CourseClassComponent } from "./../app/course-class/course-class.component";
import { RemainderResolver } from "./../resolvers/remainder.resolver";
import { ChildrenResolver } from "./../resolvers/children.resolver";
import { CanShowChildrenGuard } from "./../guards/can-show-children/can-show-children.guard";
import { GradeBySubjectResolver } from "./../resolvers/gradeBySubject.resolver";
import { GradeIndexComponent } from "./../app/grade/grade-index/grade-index.component";
import { NotificationResolver } from "./../resolvers/notification.resolver";
import { NotificationComponent } from "./../app/notification/notification.component";
import { MyAttendanceComponent } from "./../app/attendace/my-attendance/my-attendance.component";
import { MyAttendaceResolver } from "./../resolvers/myAttendance.resolver";
import { UpcomingTasksResolver } from "./../resolvers/upcomingTask.resolver";
import { UpcomingTaskComponent } from "./../app/tasks/upcoming-task/upcoming-task.component";
import { UpcomingEventsStudentResolver } from "./../resolvers/upcomingEventsStudent.resolver";
import { ParentsResolver } from "./../resolvers/parents.resolver";
import { CourseByStudentResolver } from "./../resolvers/courseByStudent.resolver";
import { CanShowStudentCourseGuard } from "./../guards/can-show-student-course/can-show-student-course.guard";
import { SubjectByTeacherComponent } from "./../app/subject/subject-by-teacher/subject-by-teacher.component";
import { SubjectByTeacherResolver } from "./../resolvers/subjectByTeacher.resolver";
import { MyTimetableComponent } from "./../app/timetable/my-timetable/my-timetable.component";
import { CourseByTeacherResolver } from "./../resolvers/courseByTeacher.resolver";
import { CourseByTeacherComponent } from "./../app/course/course-by-teacher/course-by-teacher.component";
import { CanShowStudentGuard } from "./../guards/can-show-student/can-show-student.guard";
import { CanShowTeacherGuard } from "./../guards/can-show-teacher/can-show-teacher.guard";
import { StudentsResolver } from "./../resolvers/students.resolver";
import { TeachersResolver } from "./../resolvers/teachers.resolver";
import { CanCreateCourseGuard } from "./../guards/can-create-course/can-create-course.guard";
import { CanShowUserGuard } from "./../guards/can-show-user/can-show-user.guard";
import { CanCreateFranchiseGuard } from "./../guards/can-create-franchise/can-create-franchise.guard";
import { CanEditSchoolGuard } from "./../guards/can-edit-school/can-edit-school.guard";
import { StudentResolver } from "./../resolvers/student.resolver";
import { AttendaceResolver } from "./../resolvers/attendace.resolver";
import { AttendaceIndexComponent } from "./../app/attendace/attendace-index/attendace-index.component";
import { AttendaceComponent } from "./../app/attendace/attendace.component";
import { TaskShowComponent } from "./../app/tasks/task-show/task-show.component";
import { TaskByResolver } from "./../resolvers/taskby.resolver";
import { TaskResolver } from "./../resolvers/task.resolver";
import { TasksComponent } from "./../app/tasks/tasks.component";
import { TimetableComponent } from "./../app/timetable/timetable.component";
import { AcheivementResolver } from "./../resolvers/acheivement.resolver";
import { CourseSubjectResolver } from "./../resolvers/courseSubject.resolver";
import { CourseSubjectShowComponent } from "./../app/course-subject/course-subject-show/course-subject-show.component";
import { CourseSubjectComponent } from "./../app/course-subject/course-subject.component";
import { UpcomingEventsResolver } from "./../resolvers/upcomingEvents.resolver";
import { EventFormComponent } from "./../app/event/event-form/event-form.component";
import { EventIndexComponent } from "./../app/event/event-index/event-index.component";
import { EventComponent } from "./../app/event/event.component";
import { CourseWithSubjectResolver } from "./../resolvers/courseWithSubject.resolver";
import { CourseShowComponent } from "./../app/course/course-show/course-show.component";
import { CourseByResolver } from "./../resolvers/courseby.resolver";
import { SchoolParametricResolver } from "./../resolvers/schoolParametric.resolver";
import { CoursesResolver } from "./../resolvers/courses.resolver";
import { CourseIndexComponent } from "./../app/course/course-index/course-index.component";
import { FranchiseWithSchoolYearResolver } from "./../resolvers/franchisesWithYears.resolver";
import { GradeByResolver } from "./../resolvers/gradeby.resolver";
import { CourseFormComponent } from "./../app/course/course-form/course-form.component";
import { GroupByResolver } from "./../resolvers/groupby.resolver";
import { GroupShowComponent } from "./../app/group/group-show/group-show.component";
import { FranchiseByResolver } from "./../resolvers/franchiseby.resolver";
import { FranchiseFormComponent } from "../app/franchise/franchise-form/franchise-form.component";
import { UserShowComponent } from "../app/user/user-show/user-show.component";
import { UserMassiveNewComponent } from "./../app/user/user-massive-new/user-massive-new.component";
import { UserNewComponent } from "./../app/user/user-new/user-new.component";
import { UserComponent } from "./../app/user/user.component";
import { SchoolbyResolver } from "./../resolvers/schoolby.resolver";
import { SchoolShowComponent } from "./../app/school/school-show/school-show.component";
import { SchoolFormComponent } from "./../app/school/school-form/school-form.component";
import { SchoolsResolver } from "../resolvers/schools.resolver";
import { SchoolIndexComponent } from "./../app/school/school-index/school-index.component";
import { SchoolComponent } from "./../app/school/school.component";
import { RequestVerificationEmailComponent } from "./../app/request-verification-email/request-verification-email.component";
import { PublicComponent } from "./../app/public/public.component";
import { UserByResolver } from "./../resolvers/userby.resolver";
import { EditProfileComponent } from "../app/user/edit-profile/edit-profile.component";
import { DashboardComponent } from "./../app/dashboard/dashboard.component";
import { UserResolver } from "./../resolvers/user.resolver";
import { NotAuthGuard } from "../guards/not-auth/not-auth.guard";
import { AuthGuard } from "./../guards/auth/auth.guard";
import { NgModule, Component } from "@angular/core";
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  CanActivate,
} from "@angular/router";

import { HomeComponent } from "./../app/home/home.component";
import { LoginComponent } from "../app/login/login.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { ValidateAccountComponent } from "src/app/validate-account/validate-account.component";
import { ValidateAccountGuard } from "src/guards/validate-account/validate-account.guard";
import { RestartPasswordComponent } from "src/app/restart-password/restart-password.component";
import { CanCreateSchoolGuard } from "src/guards/can-create-school/can-create-school.guard";
import { UserIndexComponent } from "src/app/user/user-index/user-index.component";
import { UsersResolver } from "src/resolvers/users.resolver";
import { FranchiseShowComponent } from "src/app/franchise/franchise-show/franchise-show.component";
import { CourseComponent } from "src/app/course/course.component";
import { AcheivementComponent } from "src/app/acheivement/acheivement.component";
import { AcheivementIndexComponent } from "src/app/acheivement/acheivement-index/acheivement-index.component";
import { TaskIndexComponent } from "src/app/tasks/task-index/task-index.component";
import { ParentIndexComponent } from "src/app/user/parent-index/parent-index.component";
import { RemainderIndexComponent } from "src/app/remainder/remainder-index/remainder-index.component";
import { StatsComponent } from "src/app/stats/stats.component";
import { SchoolAllResolver } from "src/resolvers/schoolAll.resolver";
import { AdminsResolver } from "src/resolvers/admins.resolver";
import { LevelComponent } from "src/app/level/level.component";
import { CanCreateLevelGuard } from "src/guards/can-create-level/can-create-level.guard";
import { LevelResolver } from "src/resolvers/level.resolver";
import { CategoryComponent } from "src/app/category/category.component";
import { AllyComponent } from "src/app/ally/ally.component";
import { SchoolWithFranchisesResolver } from "src/resolvers/schoolWithFranchises.resolver";
import { AllyShowResolver } from "src/resolvers/allyShow.resolver";
import { AllyEditComponent } from "src/app/ally/ally-edit/ally-edit.component";
import { AllyByCategoryResolver } from "src/resolvers/allyByCategory.resolver";
import { PrizeFormComponent } from "src/app/prize/prize-form/prize-form.component";
import { PrizeComponent } from "src/app/prize/prize.component";
import { PrizeByIdResolver } from "src/resolvers/prizeById.resolver";
import { RedepmtionComponent } from "src/app/redemption/redepmtion.component";
import { AllySchoolResolver } from "src/resolvers/allySchool.resolver";
import { PrizeResolver } from "src/resolvers/prizes.resolver";
import { PointIndexComponent } from "src/app/point/point-index/point-index.component";
import { PointResolver } from "src/resolvers/point.resolver";
import { FinalGradeResolver } from "src/resolvers/finalGrade.resolver";
import { CourseObservationComponent } from "src/app/course/course-observation/course-observation.component";
import { CanCreateObservationsGuard } from "src/guards/can-create-observations/can-create-observations.guard";
import { CourseObservationsResolver } from "src/resolvers/courseObservations.resolver";
import { FranchiseCounselorsResolver } from "src/resolvers/franchiseCounselors.resolver";
import { HelpComponent } from "src/app/help/help.component";
import { HelpResolver } from "src/resolvers/help.resolver";
import { CanCreateCasesGuard } from "src/guards/can-create-cases/can-create-cases.guard";
import { SchoolYearPeriodResolver } from "src/resolvers/schoolYearPeriod.resolver";
import { CaseIndexComponent } from "src/app/cases/case-index/case-index.component";
import { CanSeeCasesGuard } from "src/guards/can-see-cases/can-see-cases.guard";
import { CasesResolver } from "src/resolvers/cases.resolver";
import { CaseShowComponent } from "src/app/cases/case-show/case-show.component";
import { CaseByIdResolver } from "src/resolvers/caseById.resolver";
import { CaseCreationComponent } from "src/app/cases/case-creation/case-creation.component";
import { RecoveryGradeResolver } from "src/resolvers/recoveryGrade.resolver";
import { AcheivementByUserResolver } from "src/resolvers/acheivementByUser.resolver";
import { ContadorCaracteresComponent } from "src/app/school/contador-caracteres/contador-caracteres.component";
import { ExclusionMateriasComponent } from "src/app/school/exclusion-materias/exclusion-materias.component";
import { LlamadoListaEditableComponent } from "src/app/school/llamado-lista-editable/llamado-lista-editable.component";
import { NotificacionRolesComponent } from "src/app/school/notificacion-roles/notificacion-roles.component";
import { NotificacionesFiltroComponent } from "src/app/school/notificaciones-filtro/notificaciones-filtro.component";
import { ObservacionEvidenciaComponent } from "src/app/school/observacion-evidencia/observacion-evidencia.component";
import { ProgramarNotificacionComponent } from "src/app/school/programar-notificacion/programar-notificacion.component";
import { RenombrarPeriodosComponent } from "src/app/school/renombrar-periodos/renombrar-periodos.component";
import { StudentReferralComponent } from "src/app/school/student-referral/student-referral.component";
import { OutboxComponent } from "src/app/school/outbox/outbox.component";
import { StudentAttendanceComponent } from "src/app/school/student-attendance/student-attendance.component";
import { UsersBySchoolComponent } from "src/app/school/users-by-school/users-by-school.component";
import { TaskTemplateComponent } from "src/app/school/task-template/task-template.component";

const appRoutes: Routes = [
  {
    path: "dashboard",
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: [UserResolver],
    children: [
      {
        path: "student-referral",
        component: StudentReferralComponent,
       /* resolve: {
          response: StudentReferralResolver,
        },*/
      },
      { path: "outbox", component: OutboxComponent },
      { path: "contador-caracteres", component: ContadorCaracteresComponent },
      { path: "exclusion-materias", component: ExclusionMateriasComponent },
      {
        path: "users-by-school",
        component: UsersBySchoolComponent,
      },
      {
        path: "llamado-lista-editable",
        component: LlamadoListaEditableComponent,
      },
      { path: "notificaciones-roles", component: NotificacionRolesComponent },
      {
        path: "notificaciones-filtro",
        component: NotificacionesFiltroComponent,
      },
      {
        path: "observacion-evidencia",
        component: ObservacionEvidenciaComponent,
      },      {
        path: "student-attendace",
        component: StudentAttendanceComponent,
      },
      { path: "task-template", component: TaskTemplateComponent },
      {
        path: "programar-notificacion",
        component: ProgramarNotificacionComponent,
      },
      { path: "renombrar-periodos", component: RenombrarPeriodosComponent },
      {
        path: "help",
        component: HelpComponent,
        resolve: {
          response: HelpResolver,
        },
        canActivate: [CanCreateCasesGuard],
      },
      {
        path: "cases",
        canActivateChild: [CanSeeCasesGuard],
        children: [
          {
            path: "",
            component: CaseIndexComponent,
            resolve: {
              response: CasesResolver,
            },
          },
          {
            path: "new",
            component: CaseCreationComponent,
          },
          {
            path: ":id",
            component: CaseShowComponent,
            resolve: {
              response: CaseByIdResolver,
            },
          },
        ],
      },
      {
        path: "prizes",
        canActivateChild: [CanCreateLevelGuard],
        children: [
          {
            path: ":id/redemptions",
            component: RedepmtionComponent,
            resolve: {
              response: PrizeByIdResolver,
            },
          },
          {
            path: ":id",
            component: PrizeComponent,
            resolve: {
              response: PrizeByIdResolver,
            },
          },
          {
            path: ":id/edit",
            component: PrizeFormComponent,
            data: {
              isEditing: true,
            },
          },
        ],
      },
      {
        path: "my-redemptions",
        canActivate: [CanSeeGamificationGuard],
        component: RedemptionIndexComponent,
        resolve: {
          response: UserRedemptionResolver,
        },
      },
      {
        path: "my-points",
        canActivate: [CanSeeGamificationGuard],
        component: PointIndexComponent,
        resolve: {
          response: PointResolver,
        },
      },
      {
        path: "school-prizes",
        canActivate: [CanSeeGamificationGuard],
        component: PrizeIndexComponent,
        resolve: {
          response: PrizeResolver,
        },
      },
      {
        path: "school-allies",
        canActivateChild: [CanSeeGamificationGuard],
        children: [
          {
            path: "",
            component: AllyIndexComponent,
            resolve: {
              response: AllySchoolResolver,
            },
          },
          {
            path: ":id/prizes",
            component: PrizeByAllyIndexComponent,
            resolve: {
              response: PrizeByAllyResolver,
            },
          },
        ],
      },
      {
        path: "allies",
        canActivateChild: [CanCreateLevelGuard],
        children: [
          {
            path: ":id",
            component: AllyShowComponent,
            resolve: {
              response: AllyShowResolver,
              data: PrizeByAllyResolver,
            },
          },
          {
            path: ":id/prizes/new",
            component: PrizeFormComponent,
            data: {
              isEditing: false,
            },
          },
          {
            path: ":id/edit",
            component: AllyEditComponent,
          },
        ],
      },
      {
        path: "categories",
        canActivateChild: [CanCreateLevelGuard],
        children: [
          {
            path: "",
            component: CategoryComponent,
            resolve: {
              response: CategoryResolver,
            },
          },
          {
            path: "new",
            component: CategoryFormComponent,
            data: {
              isEditing: false,
            },
          },
          {
            path: ":id/edit",
            component: CategoryFormComponent,
            data: {
              isEditing: true,
            },
          },
          {
            path: ":id/allies",
            component: AllyComponent,
            resolve: {
              response: AllyByCategoryResolver,
            },
          },
          {
            path: ":id/allies/new",
            component: AllyFormComponent,
            resolve: {
              response: SchoolWithFranchisesResolver,
            },
          },
        ],
      },
      {
        path: "levels",
        canActivateChild: [CanCreateLevelGuard],
        children: [
          {
            path: "",
            component: LevelComponent,
            resolve: {
              response: LevelResolver,
            },
          },
          {
            path: "new",
            component: LevelFormComponent,
            data: {
              isEditing: false,
            },
          },
          {
            path: ":id/edit",
            component: LevelFormComponent,
            data: {
              isEditing: true,
            },
          },
        ],
      },
      {
        path: "stats",
        component: StatsComponent,
        resolve: { response: SchoolAllResolver },
        canActivate: [CanShowStatsGuard],
      },
      {
        path: "stats/:id",
        component: StatsComponent,
        resolve: { response: SchoolAllResolver },
        canActivate: [CanShowStatsGuard],
      },
      {
        path: "timetables",
        component: MyTimetableComponent,
        canActivate: [CanShowTeacherGuard],
      },
      {
        path: "teachers",
        component: UserIndexComponent,
        canActivate: [CanShowTeacherGuard],
        resolve: { response: TeachersResolver },
        data: {
          showFilter: false,
          teacher: true,
          admin: false,
        },
      },
      {
        path: "admins",
        component: UserIndexComponent,
        canActivate: [CanShowTeacherGuard],
        resolve: { response: AdminsResolver },
        data: {
          showFilter: false,
          teacher: true,
          admin: true,
        },
      },
      {
        path: "remainders",
        component: RemainderIndexComponent,
        resolve: { remainder: RemainderResolver },
      },
      {
        path: "attendances",
        children: [
          {
            path: "",
            component: MyAttendanceComponent,
            canActivate: [CanShowStudentCourseGuard],
            resolve: {
              response: MyAttendaceResolver,
            },
          },
          {
            path: ":id",
            component: MyAttendanceComponent,
            canActivate: [CanShowChildrenGuard],
            resolve: {
              response: MyAttendaceResolver,
            },
          },
        ],
      },
      {
        path: "notifications",
        component: NotificationComponent,
        canActivate: [CanShowStudentCourseGuard],
        resolve: { response: NotificationResolver },
      },
      {
        path: "tasks",
        children: [
          {
            path: "",
            component: UpcomingTaskComponent,
            canActivate: [CanShowStudentCourseGuard],
            resolve: {
              response: UpcomingTasksResolver,
            },
            data: {
              isStudent: true,
            },
          },
          {
            path: "student/:id",
            component: UpcomingTaskComponent,
            canActivate: [CanShowChildrenGuard],
            resolve: {
              response: UpcomingTasksResolver,
            },
            data: {
              isStudent: true,
            },
          },
        ],
      },
      {
        path: "children",
        component: ParentIndexComponent,
        canActivate: [CanShowChildrenGuard],
        resolve: {
          response: ChildrenResolver,
        },
        data: {
          isParent: true,
        },
      },
      {
        path: "parents",
        component: ParentIndexComponent,
        canActivate: [CanShowStudentCourseGuard],
        resolve: {
          response: ParentsResolver,
        },
        data: {
          isParent: false,
        },
      },
      {
        path: "events",
        children: [
          {
            path: "",
            component: EventIndexComponent,
            canActivate: [CanShowStudentCourseGuard],
            resolve: { upcomingEvent: UpcomingEventsStudentResolver },
            data: {
              isStudent: true,
            },
          },
          {
            path: ":id",
            component: EventIndexComponent,
            canActivate: [CanShowChildrenGuard],
            resolve: { upcomingEvent: UpcomingEventsStudentResolver },
            data: {
              isStudent: true,
            },
          },
        ],
      },
      {
        path: "students",
        component: UserIndexComponent,
        canActivate: [CanShowStudentGuard],
        resolve: { response: StudentsResolver },
        data: {
          showFilter: false,
          teacher: false,
          admin: false,
        },
      },
      { path: "", component: DashboardComponent },
      {
        path: "tasks/:id",
        component: TaskShowComponent,
        resolve: {
          task: TaskByResolver,
        },
      },
      {
        path: "subjects",
        component: CourseComponent,
        children: [
          {
            path: "teachers",
            component: SubjectByTeacherComponent,
            canActivate: [CanShowStudentGuard],
            resolve: {
              response: SubjectByTeacherResolver,
            },
          },
        ],
      },
      {
        path: "courses",
        component: CourseComponent,
        children: [
          {
            path: "students",
            children: [
              {
                path: "",
                component: CourseByTeacherComponent,
                canActivate: [CanShowStudentCourseGuard],
                resolve: {
                  response: CourseByStudentResolver,
                },
                data: {
                  isTeacher: false,
                },
              },
              {
                path: ":id",
                component: CourseByTeacherComponent,
                canActivate: [CanShowChildrenGuard],
                resolve: {
                  response: CourseByStudentResolver,
                },
                data: {
                  isTeacher: false,
                },
              },
            ],
          },
          {
            path: "teachers",
            component: CourseByTeacherComponent,
            canActivate: [CanShowStudentGuard],
            resolve: {
              response: CourseByTeacherResolver,
            },
            data: {
              isTeacher: true,
            },
          },
          {
            path: "",
            component: CourseIndexComponent,
            resolve: {
              response: CoursesResolver,
              schools: SchoolParametricResolver,
            },
          },
          {
            path: ":id",
            children: [
              {
                path: "",
                component: CourseShowComponent,
                resolve: {
                  course: CourseWithSubjectResolver,
                },
              },
              {
                path: "observations",
                component: CourseObservationComponent,
                canActivate: [CanCreateObservationsGuard],
                resolve: {
                  course: CourseObservationsResolver,
                },
              },
              {
                path: "events",
                component: EventComponent,
                children: [
                  {
                    path: "",
                    component: EventIndexComponent,
                    resolve: { upcomingEvent: UpcomingEventsResolver },
                  },
                  { path: "new", component: EventFormComponent },
                ],
              },
              {
                path: "subjects",
                component: CourseSubjectComponent,
                children: [
                  {
                    path: ":subject_id",
                    resolve: {
                      courseSubject: CourseSubjectResolver,
                    },
                    children: [
                      {
                        path: "classes",
                        component: CourseClassComponent,
                        resolve: {
                          classes: CourseClassResolver,
                        },
                      },
                      {
                        path: "",
                        component: CourseSubjectShowComponent,
                        // resolve: {
                        //   courseSubject: CourseSubjectResolver,
                        // },
                      },
                      { path: "timetables", component: TimetableComponent },
                      {
                        path: "acheivements",
                        // resolve: {
                        //   courseSubject: CourseSubjectResolver
                        // },
                        component: AcheivementComponent,
                        children: [
                          {
                            path: "",
                            component: AcheivementIndexComponent,
                            resolve: {
                              acheivements: AcheivementResolver,
                              acheivementsByUser: AcheivementByUserResolver,
                            },
                          },
                        ],
                      },
                      {
                        path: "grades",
                        children: [
                          {
                            path: ":student_id",
                            component: GradeIndexComponent,
                            resolve: {
                              response: GradeBySubjectResolver,
                            },
                          },
                        ],
                      },
                      {
                        path: "attendances",
                        component: AttendaceComponent,
                        resolve: {
                          students: StudentResolver,
                        },
                        children: [
                          {
                            path: "",
                            component: AttendaceIndexComponent,
                            resolve: {
                              attendances: AttendaceResolver,
                            },
                          },
                        ],
                      },
                      {
                        path: "finalGrades",
                        component: TasksComponent,
                        data: {
                          finalGrade: true,
                        },
                        children: [
                          {
                            path: "",
                            component: TaskIndexComponent,
                            resolve: {
                              tasks: FinalGradeResolver,
                            },
                            data: {
                              finalGrade: true,
                            },
                          },
                        ],
                      },
                      {
                        path: "recoveryGrades",
                        component: TasksComponent,
                        data: {
                          recoveryGrade: true,
                        },
                        children: [
                          {
                            path: "",
                            component: TaskIndexComponent,
                            resolve: {
                              tasks: RecoveryGradeResolver,
                            },
                            data: {
                              recoveryGrade: true,
                            },
                          },
                        ],
                      },
                      {
                        path: "tasks",
                        component: TasksComponent,
                        data: {
                          finalGrade: false,
                        },
                        children: [
                          {
                            path: "",
                            component: TaskIndexComponent,
                            resolve: {
                              tasks: TaskResolver,
                            },
                            data: {
                              finalGrade: false,
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "schools",
        component: SchoolComponent,
        children: [
          {
            path: "",
            component: SchoolIndexComponent,
            canActivate: [CanCreateSchoolGuard],
            resolve: { response: SchoolsResolver },
          },
          {
            path: "new",
            component: SchoolFormComponent,
            canActivate: [CanCreateSchoolGuard],
            data: {
              isEditing: false,
            },
          },

          {
            path: ":id",
            children: [
              {
                path: "",
                component: SchoolShowComponent,
                resolve: {
                  school: SchoolbyResolver,
                },
              },
              {
                path: "configs",
                component: ConfigFormComponent,
                canActivate: [CanEditSchoolGuard],
                data: {
                  isEditing: false,
                },
              },
              {
                path: "configs/edit",
                component: ConfigFormComponent,
                canActivate: [CanEditSchoolGuard],
                data: {
                  isEditing: true,
                },
              },
              {
                path: "edit",
                component: SchoolFormComponent,
                canActivate: [CanEditSchoolGuard],
                resolve: {
                  school: SchoolbyResolver,
                },
                data: {
                  isEditing: true,
                },
              },
              {
                path: "grades",
                children: [
                  {
                    path: ":grade_id",
                    resolve: { grade: GradeByResolver },
                    children: [
                      {
                        path: "courses",
                        resolve: {
                          franchises: FranchiseWithSchoolYearResolver,
                        },
                        children: [
                          {
                            path: "new",
                            component: CourseFormComponent,
                            canActivate: [CanCreateCourseGuard],
                            data: {
                              isEditing: false,
                            },
                          },
                          {
                            path: ":course_id",
                            children: [
                              {
                                path: "edit",
                                component: CourseFormComponent,
                                canActivate: [CanCreateCourseGuard],
                                resolve: {
                                  course: CourseByResolver,
                                },
                                data: {
                                  isEditing: true,
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                path: "franchises",
                children: [
                  {
                    path: "new",
                    component: FranchiseFormComponent,
                    canActivate: [CanCreateFranchiseGuard],
                    data: {
                      isEditing: false,
                    },
                  },
                  {
                    path: ":franchise_id",
                    children: [
                      {
                        path: "school-years/:school_year_id/periods/:school_year_perido_id",
                        component: SchoolYearPeriodComponent,
                        resolve: {
                          school_year_period: SchoolYearPeriodSummaryResolver,
                        },
                      },
                      {
                        path: "school-years/:school_year_id/years",
                        component: SchoolYearCloseComponent,
                        resolve: {
                          school_year: SchoolYearSummaryResolver,
                        },
                      },
                      {
                        path: "school-years/:school_year_id",
                        component: SchoolYearShowComponent,
                        resolve: {
                          school_years: SchoolYearPeriodResolver,
                          periods: PeriodResolver,
                        },
                      },
                      {
                        path: "",
                        component: FranchiseShowComponent,
                        resolve: {
                          franchise: FranchiseByResolver,
                          counselors: FranchiseCounselorsResolver,
                        },
                      },
                      {
                        path: "edit",
                        component: FranchiseFormComponent,
                        canActivate: [CanCreateFranchiseGuard],
                        resolve: {
                          franchise: FranchiseByResolver,
                        },
                        data: {
                          isEditing: true,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "users",
        component: UserComponent,
        children: [
          {
            canActivateChild: [CanShowUserGuard],
            path: "",
            component: UserIndexComponent,
            resolve: { response: UsersResolver },
            data: {
              showFilter: true,
            },
          },
          {
            canActivateChild: [CanShowUserGuard],
            path: "new",
            component: UserNewComponent,
          },
          {
            canActivateChild: [CanShowUserGuard],
            path: "new-massive",
            component: UserMassiveNewComponent,
          },
          {
            canActivateChild: [CanShowUserGuard],
            path: "new-parent-massive",
            component: AssociateParentMassiveComponent,
          },
          {
            path: ":id",
            component: UserShowComponent,
            resolve: { user: UserByResolver },
          },
          {
            path: ":id/edit",
            component: EditProfileComponent,
            resolve: { user: UserByResolver },
          },
        ],
      },
      {
        path: "groups",
        children: [
          {
            path: ":id",
            component: GroupShowComponent,
            resolve: {
              group: GroupByResolver,
            },
          },
        ],
      },
    ],
  },
  {
    path: "",
    component: PublicComponent,
    canActivate: [NotAuthGuard],
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      {
        path: "request-email-verification",
        component: RequestVerificationEmailComponent,
        data: {
          title: "Solicitar correo de verificacion",
          buttonText: "Enviar",
          email: true,
        },
      },
      {
        path: "request-password-change",
        component: RequestVerificationEmailComponent,
        data: {
          title: "Solicitar restauracion de Contraseña",
          buttonText: "Enviar",
          email: false,
        },
      },
      {
        path: "restart-password",
        component: RestartPasswordComponent,
        canActivate: [ValidateAccountGuard],
      },
      {
        path: "validate-account",
        component: ValidateAccountComponent,
        canActivate: [ValidateAccountGuard],
      },
    ],
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
