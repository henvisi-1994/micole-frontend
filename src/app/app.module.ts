import { RedemptionIndexComponent } from "./redemption/redemption-index/redemption-index.component";
import { StatsComponent } from "./stats/stats.component";
import { NotificationIndexComponent } from "./notification/notification-index/notification-index.component";
import { AuthInterceptor } from "./../interceptors/auth/auth.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AppRoutingModule } from "./../routes/app-routing.module";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeComponent } from "./home/home.component";
import { LoadingScreenComponent } from "./shared/loading-screen/loading-screen.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { BreadcrumbComponent } from "./shared/breadcrumb/breadcrumb.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditProfileComponent } from "./user/edit-profile/edit-profile.component";
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UploadPhotoComponent } from "./shared/upload-photo/upload-photo.component";
import { PasswordFormComponent } from "./user/password-form/password-form.component";
import { UnauthorizedFormComponent } from "./shared/unauthorized-form/unauthorized-form.component";
import { PublicComponent } from "./public/public.component";
import { RequestVerificationEmailComponent } from "./request-verification-email/request-verification-email.component";
import { ValidateAccountComponent } from "./validate-account/validate-account.component";
import { MaterialModule } from "./material.module";
import { RestartPasswordComponent } from "./restart-password/restart-password.component";
import { SchoolComponent } from "./school/school.component";
import { SchoolIndexComponent } from "./school/school-index/school-index.component";
import { TableComponent } from "./shared/table/table.component";
import { SchoolShowComponent } from "./school/school-show/school-show.component";
import { SchoolFormComponent } from "./school/school-form/school-form.component";
import { SchoolPlanComponent } from "./school/school-plan/school-plan.component";
import { HasPermissionDirective } from "../directives/has-permission/has-permission.directive";
import { UserComponent } from "./user/user.component";
import { UserIndexComponent } from "./user/user-index/user-index.component";
import { UserNewComponent } from "./user/user-new/user-new.component";
import { UserMassiveNewComponent } from "./user/user-massive-new/user-massive-new.component";
import { UserShowComponent } from "./user/user-show/user-show.component";
import { UserCardComponent } from "./user/user-card/user-card.component";
import { SchoolCardComponent } from "./school/school-card/school-card.component";
import { FranchiseFormComponent } from "./franchise/franchise-form/franchise-form.component";
import { FranchiseModalFormComponent } from "./franchise/franchise-modal-form/franchise-modal-form.component";
import { FranchiseShowComponent } from "./franchise/franchise-show/franchise-show.component";
import { FranchiseCardComponent } from "./franchise/franchise-card/franchise-card.component";
import { GroupShowComponent } from "./group/group-show/group-show.component";
import { GroupCardComponent } from "./group/group-card/group-card.component";
import { CourseFormComponent } from "./course/course-form/course-form.component";
import { CourseComponent } from "./course/course.component";
import { CourseIndexComponent } from "./course/course-index/course-index.component";
import { CourseShowComponent } from "./course/course-show/course-show.component";
import { CourseCardComponent } from "./course/course-card/course-card.component";
import { SelectPersonComponent } from "./shared/select-person/select-person.component";
import { EventComponent } from "./event/event.component";
import { EventIndexComponent } from "./event/event-index/event-index.component";
import { EventFormComponent } from "./event/event-form/event-form.component";
import { CourseSubjectComponent } from "./course-subject/course-subject.component";
import { CourseSubjectShowComponent } from "./course-subject/course-subject-show/course-subject-show.component";
import { CourseSubjectCardComponent } from "./course-subject/course-subject-card/course-subject-card.component";
import { AcheivementComponent } from "./acheivement/acheivement.component";
import { AcheivementIndexComponent } from "./acheivement/acheivement-index/acheivement-index.component";
import { AcheivementModalComponent } from "./acheivement/acheivement-modal/acheivement-modal.component";
import { TimetableComponent } from "./timetable/timetable.component";
import { FullCalendarComponent } from "./shared/full-calendar/full-calendar.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskIndexComponent } from "./tasks/task-index/task-index.component";
import { TaskModalComponent } from "./tasks/task-modal/task-modal.component";
import { TaskShowComponent } from "./tasks/task-show/task-show.component";
import { TaskCardComponent } from "./tasks/task-card/task-card.component";
import { UploadFileComponent } from "./shared/upload-file/upload-file.component";
import { TaskGradeComponent } from "./tasks/task-grade/task-grade.component";
import { AttendaceComponent } from "./attendace/attendace.component";
import { AttendaceIndexComponent } from "./attendace/attendace-index/attendace-index.component";
import { NotificationComponent as NotificationComponentMain } from "./notification/notification.component";
import { NotificationComponent } from "./shared/notification/notification.component";
import { NotificationDischargeComponent } from "./shared/notification-discharge/notification-discharge.component";
import { GradeModalComponent } from "./shared/grade-modal/grade-modal.component";
import { CourseByTeacherComponent } from "./course/course-by-teacher/course-by-teacher.component";
import { MyTimetableComponent } from "./timetable/my-timetable/my-timetable.component";
import { SubjectByTeacherComponent } from "./subject/subject-by-teacher/subject-by-teacher.component";
import { ParentIndexComponent } from "./user/parent-index/parent-index.component";
import { UpcomingTaskComponent } from "./tasks/upcoming-task/upcoming-task.component";
import { MyAttendanceComponent } from "./attendace/my-attendance/my-attendance.component";
import { GradeIndexComponent } from "./grade/grade-index/grade-index.component";
import { AssociateStudentComponent } from "./shared/associate-student/associate-student.component";
import { RemainderIndexComponent } from "./remainder/remainder-index/remainder-index.component";
import { LinkClassModalComponent } from "./course-subject/link-class-modal/link-class-modal.component";
import { CourseClassComponent } from "./course-class/course-class.component";
import { AddClassModalComponent } from "./course-class/add-class-modal/add-class-modal.component";
import { SchoolYearShowComponent } from "./schoolYear/school-year-show/school-year-show.component";
import { SchoolYearCardComponent } from "./schoolYear/school-year-card/school-year-card.component";
import { SchoolYearPeriodComponent } from "./schoolYear/school-year-period/school-year-period.component";
import { SchoolYearCloseComponent } from "./schoolYear/school-year-close/school-year-close.component";
import { AssociateParentMassiveComponent } from "./user/associate-parent-massive/associate-parent-massive.component";
import { DownloadAttendanceComponent } from "./course-subject/download-attendance/download-attendance.component";
import { ChartsModule } from "ng2-charts";
import { NotificationModalComponent } from "./shared/notification-modal/notification-modal.component";
import { LevelComponent } from "./level/level.component";
import { LevelFormComponent } from "./level/level-form/level-form.component";
import { CategoryComponent } from "./category/category.component";
import { CategoryFormComponent } from "./category/category-form/category-form.component";
import { AllyComponent } from "./ally/ally.component";
import { AllyFormComponent } from "./ally/ally-form/ally-form.component";
import { LevelCardComponent } from "./level/level-card/level-card.component";
import { CategoryCardComponent } from "./category/category-card/category-card.component";
import { AllyShowComponent } from "./ally/ally-show/ally-show.component";
import { AllyCardComponent } from "./ally/ally-card/ally-card.component";
import { AllyEditComponent } from "./ally/ally-edit/ally-edit.component";
import { PrizeComponent } from "./prize/prize.component";
import { PrizeFormComponent } from "./prize/prize-form/prize-form.component";
import { PrizeCardComponent } from "./prize/prize-card/prize-card.component";
import { CouponModalComponent } from "./shared/coupon-modal/coupon-modal.component";
import { RedepmtionComponent } from "./redemption/redepmtion.component";
import { UserPointComponent } from "./user/user-point/user-point.component";
import { AllyIndexComponent } from "./ally/ally-index/ally-index.component";
import { PaginationComponent } from "./shared/pagination/pagination.component";
import { PrizeByAllyIndexComponent } from "./prize/prize-by-ally-index/prize-by-ally-index.component";
import { PrizeIndexComponent } from "./prize/prize-index/prize-index.component";
import { PrizeSearchComponent } from "./prize/prize-search/prize-search.component";
import { PointIndexComponent } from "./point/point-index/point-index.component";
import { RedemptionCardComponent } from "./redemption/redemption-card/redemption-card.component";
import { TaskFinalModalComponent } from "./tasks/task-final-modal/task-final-modal.component";
import { ConfigFormComponent } from './config-grade/config-form/config-form.component';
import { AcheivementCopyModalComponent } from './acheivement/acheivement-copy-modal/acheivement-copy-modal.component';
import { CourseObservationComponent } from './course/course-observation/course-observation.component';
import { CourseObservationModalComponent } from './course/course-observation-modal/course-observation-modal.component';
import { AcheivementCreateMassiveModalComponent } from './acheivement/acheivement-create-massive-modal/acheivement-create-massive-modal.component';
import { HelpComponent } from './help/help.component';
import { HelpFormComponent } from './help/help-form/help-form.component';
import { CaseIndexComponent } from './cases/case-index/case-index.component';
import { CaseShowComponent } from './cases/case-show/case-show.component';
import { CaseCardComponent } from './cases/case-card/case-card.component';
import { CaseAttendFormComponent } from './cases/case-attend-form/case-attend-form.component';
import { CaseStudentCardComponent } from './cases/case-student-card/case-student-card.component';
import { CaseObservationCardComponent } from './cases/case-observation-card/case-observation-card.component';
import { CaseObservationModalComponent } from './cases/case-observation-modal/case-observation-modal.component';
import { CaseCreationComponent } from './cases/case-creation/case-creation.component';
import { TaskRecoveryModalComponent } from './tasks/task-recovery-modal/task-recovery-modal.component';
import { NotificationRolsComponent } from "./school/notification-rols/notification-rols.component";
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoadingScreenComponent,
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    DashboardComponent,
    EditProfileComponent,
    UserFormComponent,
    UploadPhotoComponent,
    PasswordFormComponent,
    UnauthorizedFormComponent,
    PublicComponent,
    RequestVerificationEmailComponent,
    ValidateAccountComponent,
    RestartPasswordComponent,
    SchoolComponent,
    SchoolIndexComponent,
    TableComponent,
    SchoolShowComponent,
    SchoolFormComponent,
    SchoolPlanComponent,
    HasPermissionDirective,
    UserComponent,
    UserIndexComponent,
    UserNewComponent,
    UserMassiveNewComponent,
    UserShowComponent,
    UserCardComponent,
    SchoolCardComponent,
    FranchiseFormComponent,
    FranchiseModalFormComponent,
    FranchiseShowComponent,
    FranchiseCardComponent,
    GroupShowComponent,
    GroupCardComponent,
    CourseFormComponent,
    CourseComponent,
    CourseIndexComponent,
    CourseShowComponent,
    CourseCardComponent,
    SelectPersonComponent,
    EventComponent,
    EventIndexComponent,
    EventFormComponent,
    CourseSubjectComponent,
    CourseSubjectShowComponent,
    CourseSubjectCardComponent,
    AcheivementComponent,
    AcheivementIndexComponent,
    AcheivementModalComponent,
    TimetableComponent,
    FullCalendarComponent,
    TasksComponent,
    TaskIndexComponent,
    TaskModalComponent,
    TaskFinalModalComponent,
    TaskRecoveryModalComponent,
    TaskShowComponent,
    TaskCardComponent,
    UploadFileComponent,
    TaskGradeComponent,
    AttendaceComponent,
    AttendaceIndexComponent,
    NotificationComponent,
    NotificationDischargeComponent,
    GradeModalComponent,
    CourseByTeacherComponent,
    MyTimetableComponent,
    SubjectByTeacherComponent,
    ParentIndexComponent,
    UpcomingTaskComponent,
    MyAttendanceComponent,
    NotificationComponentMain,
    NotificationIndexComponent,
    GradeIndexComponent,
    AssociateStudentComponent,
    RemainderIndexComponent,
    LinkClassModalComponent,
    CourseClassComponent,
    AddClassModalComponent,
    SchoolYearShowComponent,
    SchoolYearCardComponent,
    SchoolYearPeriodComponent,
    SchoolYearCloseComponent,
    AssociateParentMassiveComponent,
    DownloadAttendanceComponent,
    StatsComponent,
    NotificationModalComponent,
    LevelComponent,
    LevelFormComponent,
    CategoryComponent,
    CategoryFormComponent,
    AllyComponent,
    AllyFormComponent,
    LevelCardComponent,
    CategoryCardComponent,
    AllyShowComponent,
    AllyCardComponent,
    AllyEditComponent,
    PrizeComponent,
    PrizeFormComponent,
    PrizeCardComponent,
    CouponModalComponent,
    RedepmtionComponent,
    UserPointComponent,
    AllyIndexComponent,
    PaginationComponent,
    PrizeByAllyIndexComponent,
    PrizeIndexComponent,
    PrizeSearchComponent,
    PointIndexComponent,
    RedemptionIndexComponent,
    RedemptionCardComponent,
    ConfigFormComponent,
    AcheivementCopyModalComponent,
    CourseObservationComponent,
    CourseObservationModalComponent,
    AcheivementCreateMassiveModalComponent,
    HelpComponent,
    HelpFormComponent,
    CaseIndexComponent,
    CaseShowComponent,
    CaseCardComponent,
    CaseAttendFormComponent,
    CaseStudentCardComponent,
    CaseObservationCardComponent,
    CaseObservationModalComponent,
    CaseCreationComponent,
    NotificationRolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule,
    NgxMaterialTimepickerModule.setLocale("es"),
    AngularEditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
