import { Notification } from "./../../../util/notifications";
import { Role } from "./../../../models/parametric/role.model";
import { AuthService } from "./../../../services/auth/auth.service";
import { CourseService } from "src/services/course/course.service";
import { DataService } from "./../../../services/data.service";
import { month } from "./../../../models/parametric/month.model";
import { CourseBySchoolYear } from "./../../../models/course/courseBySchoolYear.model";
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
} from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-course-by-teacher",
  templateUrl: "./course-by-teacher.component.html",
  styleUrls: ["./course-by-teacher.component.sass"],
})
export class CourseByTeacherComponent implements OnInit {
  courses: CourseBySchoolYear[];
  month = month;
  isTeacher: boolean;
  name: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private courseService: CourseService,
    private authService: AuthService
  ) {
    if (this.route.snapshot.queryParamMap.has("name")) {
      this.name = this.route.snapshot.queryParamMap.get("name");
      this.dataService.breadcrumbs.next(["Cursos", this.name]);
    } else this.dataService.breadcrumbs.next(["Mis cursos"]);
  }

  ngOnInit(): void {
    this.courses = this.route.snapshot.data["response"];
    this.isTeacher = this.route.snapshot.data["isTeacher"];
  }

  courseInfo(id: string, user: string) {
    if (this.authService.hasRole([Role.PARENT]))
      this.router.navigate(["/", "dashboard", "courses", id], {
        queryParams: { student: user },
      });
    else this.router.navigate(["/", "dashboard", "courses", id]);
  }

  downloadGrade(id: string) {
    this.courseService.downloadGrade(id).subscribe(
      (data) => {
        this.dataService.loadingScreen.next(false);

        let newBlob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(newBlob);
        window.open(url);
      },
      (err) => {
        this.dataService.loadingScreen.next(false);
        Notification.show(
          "<b>Error</b>",
          "No se pudo generar el Excel de notas"
        );
      }
    );
  }

  getSchoolYear(schoolYear: CourseBySchoolYear) {
    if (schoolYear.startYear === schoolYear.endYear)
      return `${schoolYear.startYear} ${month[schoolYear.startMonth]}-${
        month[schoolYear.endMonth]
      }`;
    return `${schoolYear.startYear} ${month[schoolYear.startMonth]} ${
      schoolYear.endYear
    } ${month[schoolYear.endMonth]}`;
  }
}
