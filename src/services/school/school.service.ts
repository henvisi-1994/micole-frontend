import { ConfigGrade } from "./../../models/config-grade/configGrade.model";
import { AllowGrades } from "./../../models/school/allowed.grades";
import { SubjectBySchoolYear } from "./../../models/subject/subjectBySchoolYear.model";
import { CourseBySchoolYear } from "./../../models/course/courseBySchoolYear.model";
import { schoolDay } from "./../../models/parametric/schoolDay.model";
import { month } from "./../../models/parametric/month.model";
import { SchoolWithYear } from "./../../models/school/schoolWithYear.model";
import { rule } from "./../../models/parametric/rule.model";
import {
  SchoolById,
  PeriodSchool,
} from "./../../models/school/schoolById.model";
import { plan } from "./../../models/parametric/plan.model";
import { map, catchError, tap, mergeMap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { School } from "./../../models/school/school.model";
import { Response } from "./../../models/reponse.model";
import { DataService } from "./../data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CourseById } from "src/models/course/courseById.model";
import { SCHOOL } from "src/util/constants";
import { SchoolWithFranchises } from "src/models/school/schoolWithFranchises.model";
import { ExcludedSubjectsUpdate } from "src/models/subject/excludedSubjectsUpdate.model";

@Injectable({
  providedIn: "root",
})
export class SchoolService {
  ENDPOINT = "api/Schools/";
  ENDPOINT_SUBJECT = "api/Subjects/"

  constructor(private http: HttpClient, private dataService: DataService) {}

  getFranchises() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolWithFranchises[]>>(
        `${environment.url}${this.ENDPOINT}WithFranchises`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data.filter((x) => x.franchises.length > 0);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las franchises");
        })
      );
  }

  addConfig(id: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/ConfigGrades`,
        value
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado la equivalencia";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear la equivalencia");
        })
      );
  }

  updateConfig(id: string, configId: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/ConfigGrades/${encodeURIComponent(configId)}`,
        value
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado la equivalencia";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la equivalencia");
        })
      );
  }

  deleteConfig(id: string, configId: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/ConfigGrades/${encodeURIComponent(configId)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos borrado la equivalencia";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar la equivalencia");
        })
      );
  }

  getConfig(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<ConfigGrade[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/ConfigGrades`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las equivalencias de las notas");
        })
      );
  }

  getPeriods(id: string) {
    //this.dataService.loadingScreen.next(true)
    return this.http
      .get<Response<PeriodSchool[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Periods`
      )
      .pipe(
        map((response) => {
          //this.dataService.loadingScreen.next(false)
          return response.data;
        }),
        catchError((err) => {
          //this.dataService.loadingScreen.next(false)
          return throwError("No pudimos cargar los periodos");
        })
      );
  }

  sendNotification(
    id: string,
    title: string,
    description: string,
    role: string,
    fileToUpload?: File
  ) {
    const formData = new FormData()
    formData.append('title',title)
    formData.append('description',description)
    formData.append('role', role)
    if(fileToUpload) {
      formData.append('file',fileToUpload, fileToUpload.name)
    }
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Notifications`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos enviado la notifación a los usuarios";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos enviar la notificacion");
        })
      );
  }

  getCoursesByTeacher(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseBySchoolYear[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/CoursesByTeacher`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos recuperar los cursos");
        })
      );
  }

  getCoursesByStudent(id: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseBySchoolYear[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/CoursesByStudent/${encodeURIComponent(user)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos recuperar los cursos");
        })
      );
  }

  getSubjectsByTeacher(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SubjectBySchoolYear[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/SubjectsByTeacher`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos recuperar las materias");
        })
      );
  }

  getSchoolsAll() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolById[]>>(`${environment.url}${this.ENDPOINT}All`)
      .pipe(
        map((response) => {
          let data = response.data;
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((error) => {
          return throwError("No pudismos cargar los colegios");
        })
      );
  }

  getSchools(page: number = 1, perPage: number = 10, search: string = "") {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<School[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params: {
          name: search,
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
        },
      })
      .pipe(
        map((response) => {
          let data = response.body;
          data.pagination = {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          };
          data.data.forEach((s) => {
            s.status = s.disabled ? "Deshabilitado" : "Habilitado";
            s.plan = plan[s.plan];
          });
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((error) => {
          return throwError("No pudismos cargar los colegios");
        })
      );
  }

  getCourses(
    page: number = 1,
    perPage: number = 10,
    search = "",
    schoolId: string = null
  ) {
    schoolId = schoolId || localStorage.getItem(SCHOOL);
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseById[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          schoolId
        )}/Courses`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: perPage.toString(),
            name: search,
          },
        }
      )
      .pipe(
        map((response) => {
          let data = response.body;
          data.pagination = {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          };
          data.data.forEach((d) => {
            d.startYear = d.schoolYear.startYear;
            d.endYear = d.schoolYear.endYear;
          });
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudismos cargar los cursos");
        })
      );
  }

  getFranchiseInfo(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolWithYear>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Franchises`
      )
      .pipe(
        map((respones) => {
          this.dataService.loadingScreen.next(false);
          let data = respones.data;
          data.franchises.forEach((f) => {
            f.schoolYears.forEach((sy) => {
              sy.normalizedStartMonth = month[sy.startMonth];
              sy.normalizedEndMonth = month[sy.endMonth];
              sy.normalizedSchoolDay = schoolDay[sy.schoolDay];
            });
          });
          return data.franchises;
        }),
        catchError((err) => {
          return throwError("No encontramos la escuela");
        })
      );
  }

  getGroupsWithSubject(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        {
          params: {
            includes: "Groups.Subjects",
          },
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          let groups = response.data.groups.filter(
            (g) => g.subjects.length > 0
          );
          return groups;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los grupos");
        })
      );
  }

  getAllowDownload(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<AllowGrades>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/AllowDownload`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data.allowed;
        }),
        catchError((error) => {
          this.dataService.loadingScreen.next(false);
          return throwError(
            "No pudismos cargar la información si se puede descargar el boletin o no"
          );
        })
      );
  }

  getSchoolById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<SchoolById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        {
          params: {
            includes: "Franchises,Groups,Grades,Periods,Settings",
          },
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          response.data.franchises.forEach((f) => {
            f.status = f.disabled ? "Deshabilitada" : "Habilitada";
          });
          // response.data.groups.forEach((g) => {
          //   g.subjectsCount = g.subjects.length;
          // });
          response.data.grades.forEach(g => {
            g.preschool = g.preschool ? "Si": "No"
          })
          response.data.settings.forEach((s) => {
            s.ruleNormalized = rule[s.rule];
            s.valueNormalized =
              s.rule === "ENABLE_DOWNLOAD_GRADE" || s.rule === "DISABLE_SHOWING_NUMERIC_GRADE_PRESCHOOL" ||  s.rule === "SHOW_GENERAL_SUMMARY"
                ? s.value == 1
                  ? "Permitir"
                  : "No Permitir"
                : s.value + "";
          });
          return response.data;
        }),
        catchError((error) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudismos cargar la información del colegio");
        })
      );
  }

  disableSchool(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(
        mergeMap((response) => {
          return this.getSchoolById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos deshabilitar la escuela");
        })
      );
  }

  restoreSchool(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, {})
      .pipe(
        mergeMap((response) => {
          return this.getSchoolById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos habilitar la escuela");
        })
      );
  }

  updatePlan(id: string, plan: string) {
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/${plan}`,
        {}
      )
      .pipe(
        mergeMap((response) => {
          return this.getSchoolById(id);
        }),
        catchError((err) => {
          return throwError("No pudimos actualizar el plan");
        })
      );
  }

  createSchool(school: object) {
    this.dataService.loadingScreen.next(true);
    return this.http.post(`${environment.url}${this.ENDPOINT}`, school).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado el colegio";
      }),
      catchError((err) => {
        console.log(err);
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear el colegio");
      })
    );
  }

  updateSchool(id: string, school: object) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        school
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos acutailzado el colegio";
        }),
        catchError((err) => {
          console.log(err);
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la información del colegio");
        })
      );
  }

  updateLogo(id: string, file: File) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("logo", file, file.name);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Logo`,
        formData
      )
      .pipe(
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No se pudo actualizar el logo del colegio");
        })
      );
  }
   // Nuevo método para actualizar materias excluidas
   updateExcludedSubjects(excludedSubjectIds: string[]): Observable<boolean> {
    this.dataService.loadingScreen.next(true);
    const payload: ExcludedSubjectsUpdate = { excludedSubjectIds };

    return this.http.put<Response<boolean>>(
      `${environment.url}${this.ENDPOINT_SUBJECT}excluded`,
      payload
    ).pipe(
      map(response => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError(err => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos actualizar las materias excluidas");
      })
    );
  }

  // Método para obtener materias excluidas (opcional)
  getExcludedSubjects(): Observable<string[]> {
    this.dataService.loadingScreen.next(true);
    return this.http.get<Response<string[]>>(
      `${environment.url}${this.ENDPOINT_SUBJECT}excluded`
    ).pipe(
      map(response => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError(err => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos obtener las materias excluidas");
      })
    );
  }
}
