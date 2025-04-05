import { CourseStats } from "./../../models/stats/courseStats.model";
import { severity } from "./../../models/parametric/serverity.model";
import { User } from "./../../models/user/user.model";
import { Attendace } from "./../../models/attendance/attendance.model";
import { Task } from "./../../models/task/task.model";
import { Calendar } from "./../../models/calendar.model";
import { TimetableSubject } from "./../../models/timetable/timetableSubject.model";
import { SubjectById } from "./../../models/subject/subjectById.model";
import { Acheivement, AcheivementByUser } from "./../../models/acheivement/acheivement.model";
import { UpcomingEvent } from "./../../models/event/upcomingEvent.model";
import { Role } from "./../../models/parametric/role.model";
import { CourseWithSubject } from "./../../models/course/courseWithSubject";
import { map, catchError, mergeMap } from "rxjs/operators";
import { Response } from "./../../models/reponse.model";
import { DataService } from "src/services/data.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CourseById } from "src/models/course/courseById.model";
import { environment } from "src/environments/environment";
import { throwError, pipe } from "rxjs";
import { CourseSubjectById } from "src/models/course-subject/courseSubjectById.model";
import * as moment from "moment";
import { CourseClass } from "src/models/course-class/courseClass.model";
import { AcheivementData, AcheivementParameters } from "src/models/acheivement/acheivement.parameters";
import { CourseObservation } from "src/models/course/courseObservation.model";
import { AllowGrades } from 'src/models/school/allowed.grades';

@Injectable({
  providedIn: "root",
})
export class CourseService {
  ENDPOINT = "api/Courses/";
  EVENT_ENDPOINT = "api/Events/";
  TIMETABLE_ENDPOINT = "api/Timetables/";
  ENDPOINT_OBSERVATION = "api/CourseObservation/"

  constructor(private http: HttpClient, private dataService: DataService) {}

  downloadGrade(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/GradesBySubjects`,
      { responseType: "blob" }
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
            "No pudismos cargar la información si se puede descargar el boletin final"
          );
        })
      );
  }

  downloadGradeBySubject(id: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Subjects/${encodeURIComponent(subject)}/Excel`,
      { responseType: "blob" }
    );
  }

  consolidateByPeriod(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/ConsolidatedGradesByPeriod`,
      { responseType: "blob" }
    );
  }

  consolidate(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/ConsolidatedGrades`,
      { responseType: "blob" }
    );
  }

  downloadAttendance(id: string, subject: string, year: string, month: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Subjects/${encodeURIComponent(subject)}/Attendances/${year}/${month}`,
      { responseType: "blob", observe: "response" }
    );
  }

  downloadFormat(id: string, format: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.post(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Format/${format}`,
      {},
      { responseType: "blob" }
    );
  }

  downloadTasksTemplate(id: string, periodId: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Periods/${encodeURIComponent(
        periodId
      )}/Tasks?subjectParams=${encodeURIComponent(subject)}`,
      { responseType: "blob" }
    );
  }

  uploadTasksTemplate(id: string, periodId: string, subject: string, file: any) {
    this.dataService.loadingScreen.next(true)
    let data = new FormData()
    data.append('subject', subject)
    data.append('file', file)
    return this.http.post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Periods/${encodeURIComponent(
        periodId
      )}/Tasks`, data)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado la calificaciones"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError("No pudimos actualizar las calificaciones")
      }))
  }

  downloadStudentAdminFormat(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.post(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Format/StudentAdmin`,
      {},
      { responseType: "blob" }
    );
  }

  downloadUser(id: string, value: boolean) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Users/Excel?parent=${value}`,
      { responseType: "blob" }
    );
  }

  getObservations(courseId: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseObservation>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          courseId
        )}/Observations`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos traer las clases");
        })
      );
  }

  getClasses(courseId: string, subjectId: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseClass[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          courseId
        )}/Subjects/${encodeURIComponent(subjectId)}/Classes`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos traer las clases");
        })
      );
  }

  uploadClass(courseId: string, subjectId: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          courseId
        )}/Subjects/${encodeURIComponent(subjectId)}/Classes`,
        value
      )
      .pipe(
        mergeMap((response) => {
          return this.getClasses(courseId, subjectId);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos subir la clases");
        })
      );
  }

  updateClass(id: string, courseId: string, subjectId: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Classes`,
        value
      )
      .pipe(
        mergeMap((response) => {
          return this.getClasses(courseId, subjectId);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la clase");
        })
      );
  }

  deleteClass(id: string, courseId: string, subjectId: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Classes`
      )
      .pipe(
        mergeMap((response) => {
          return this.getClasses(courseId, subjectId);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar la clase");
        })
      );
  }

  deleteObservation(courseId: string, id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT_OBSERVATION}${encodeURIComponent(
        id
      )}`)
      .pipe(
        mergeMap((response) => {
          return this.getObservations(courseId)
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar la observación");
        })
      )
  }

  createObservation(courseId: string, data: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}${encodeURIComponent(
        courseId
      )}/Observations/`, data)
      .pipe(
        mergeMap((response) => {
          return this.getObservations(courseId)
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear la observación");
        })
      )
  }

  addLink(courseId: string, subjectId: string, link: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          courseId
        )}/Subjects/${encodeURIComponent(subjectId)}`,
        {
          url: link,
        }
      )
      .pipe(
        mergeMap((response) => {
          return this.getSubjectById(courseId, subjectId);
        }),
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar el link de la clase");
        })
      );
  }

  downloadPdf(id: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/GradesByUser/Pdf`,
      {
        responseType: "blob",
        params: {
          userId: user,
        },
      }
    );
  }

  downloadPdfEnd(id: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/GradesByUserEnd/Pdf`,
      {
        responseType: "blob",
        params: {
          userId: user,
        },
      }
    );
  }

  downloadPdfCertificate(id: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/CourseCertificate/Pdf`,
      {
        responseType: "blob",
        params: {
          userId: user,
        },
      }
    );
  }

  getRecoveryGrades(id: string, subject: string = null) {
    this.dataService.loadingScreen.next(true);
    let url = `${environment.url}${this.ENDPOINT}${encodeURIComponent(
      id
    )}/RecoveryGrades`;
    if (subject) {
      url = `${url}?subjectParams=${encodeURIComponent(subject)}`;
    }
    return this.http.get<Response<Task[]>>(url).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar las recuperaciones");
      })
    );
  }

  getFinalGrades(id: string, subject: string = null) {
    this.dataService.loadingScreen.next(true);
    let url = `${environment.url}${this.ENDPOINT}${encodeURIComponent(
      id
    )}/FinalGrades`;
    if (subject) {
      url = `${url}?subjectParams=${encodeURIComponent(subject)}`;
    }
    return this.http.get<Response<Task[]>>(url).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar las definitivas");
      })
    );
  }

  getTasks(id: string, subject: string = null) {
    this.dataService.loadingScreen.next(true);
    let url = `${environment.url}${this.ENDPOINT}${encodeURIComponent(
      id
    )}/Tasks`;
    if (subject) {
      url = `${url}?subjectParams=${encodeURIComponent(subject)}`;
    }
    return this.http.get<Response<Task[]>>(url).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar las tareas");
      })
    );
  }

  addNotification(
    id: string,
    userId: string,
    appointment: string,
    description: string,
    severity: string,
    action: string
  ) {
    let data: any = {
      description,
      severity,
      actionTaken: action,
      userId,
    };
    // console.log(appointment);
    if (appointment) {
      data["appointment"] = appointment;
    }
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Notifications`,
        data
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado la observación";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear la observación");
        })
      );
  }

  grades(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseStats>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Stats`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener las notas");
        })
      );
  }

  addTask(id: string, subject: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post<Response<string>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Tasks`,
        {
          subjectId: subject,
          ...value,
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
          return throwError(
            "No pudimos crear la tarea, recuerda que el porcentaje de todas las tareas de un periodo tiene que ser 100"
          );
        })
      );
  }

  addFinalGrade(id: string, subject: string, period: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post<Response<string>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/FinalGrades`,
        {
          subjectId: subject,
          periodId: period,
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
          return throwError(
            "No pudimos crear la definitiva, recuerda que si tienes tareas creadas no podrias crear definitivas al menos que borres las tareas creadas previamente"
          );
        })
      );
  }

  addRecoveryGrade(id: string, subject: string, period: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post<Response<string>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/RecoveryGrades`,
        {
          subjectId: subject,
          periodId: period,
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
          return throwError(
            "No pudimos crear la definitiva, recuerda que si tienes tareas creadas no podrias crear definitivas al menos que borres las tareas creadas previamente"
          );
        })
      );
  }

  getAttendances(id: string, subject: string, date: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Attendace[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Attendances?subjectId=${encodeURIComponent(subject)}&date=${date}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las asistencias");
        })
      );
  }

  deleteTimetable(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.TIMETABLE_ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos borrado el horario";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return "No hemos podido borrar el horario";
        })
      );
  }

  getTeacherTimetable(start: string, end: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<TimetableSubject[]>>(
        `${environment.url}${this.TIMETABLE_ENDPOINT}?StartDate=${start}&EndDate=${end}`
      )
      .pipe(
        map((response) => {
          const colors = [
            "event-default",
            "event-blue",
            "event-azure",
            "event-green",
            "event-orange",
            "event-red",
          ];
          const data = response.data;
          let i = 0;
          let values: Calendar[] = [];
          data.forEach((d) => {
            d.timetables.forEach((t) => {
              let value: Calendar = {
                id: t.id,
                link: d.link,
                courseId: d.courseId,
                subjectId: d.subjectId,
                start: moment(t.start).toDate(),
                end: moment(t.end).toDate(),
                title: `${d.course}-${d.subject}`,
                className: colors[i % 6],
              };
              values.push(value);
            });
            i++;
          });
          this.dataService.loadingScreen.next(false);
          return values;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los horarios");
        })
      );
  }

  getTimetableByStudentId(id: string, start: string, end: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<TimetableSubject[]>>(
        `${environment.url}${
          this.TIMETABLE_ENDPOINT
        }Students/${encodeURIComponent(id)}?StartDate=${start}&EndDate=${end}`
      )
      .pipe(
        map((response) => {
          const colors = [
            "event-default",
            "event-blue",
            "event-azure",
            "event-green",
            "event-orange",
            "event-red",
          ];
          const data = response.data;
          let i = 0;
          let values: Calendar[] = [];
          data.forEach((d) => {
            d.timetables.forEach((t) => {
              let value: Calendar = {
                id: t.id,
                link: d.link,
                courseId: d.courseId,
                subjectId: d.subjectId,
                start: moment(t.start).toDate(),
                end: moment(t.end).toDate(),
                title: `${d.course}-${d.subject}`,
                className: colors[i % 6],
              };
              values.push(value);
            });
            i++;
          });
          this.dataService.loadingScreen.next(false);
          return values;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los horarios");
        })
      );
  }

  getTimetables(
    id: string,
    start: string,
    end: string,
    subject: string = null
  ) {
    this.dataService.loadingScreen.next(true);
    let url = `${environment.url}${this.ENDPOINT}${encodeURIComponent(
      id
    )}/Timetables?StartDate=${start}&EndDate=${end}`;
    if (subject) {
      url = `${url}&SubjectId=${encodeURIComponent(subject)}`;
    }
    return this.http.get<Response<TimetableSubject[]>>(url).pipe(
      map((response) => {
        const colors = [
          "event-default",
          "event-blue",
          "event-azure",
          "event-green",
          "event-orange",
          "event-red",
        ];
        const data = response.data;
        let i = 0;
        let values: Calendar[] = [];
        data.forEach((d) => {
          d.timetables.forEach((t) => {
            let value: Calendar = {
              id: t.id,
              link: d.link,
              courseId: d.courseId,
              subjectId: d.subjectId,
              start: moment(t.start).toDate(),
              end: moment(t.end).toDate(),
              title: d.subject,
              className: colors[i % 6],
            };
            values.push(value);
          });
          i++;
        });

        this.dataService.loadingScreen.next(false);
        return values;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los horarios");
      })
    );
  }

  getStudents(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<User[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Students`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener los estudiantes del curso");
        })
      );
  }

  createTimetableMassive(id: string, subject: string, file: File) {
    const formData: FormData = new FormData();
    formData.append("timetables", file, file.name);
    formData.append("subject", subject);
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Timetables/Excel`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado los horarios";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear los horarios");
        })
      );
  }

  createTimetable(id: string, subject: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Timetables`,
        {
          subjects: [
            {
              subjectId: subject,
              timetables: [
                {
                  ...value,
                },
              ],
            },
          ],
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado el horario";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear el horario");
        })
      );
  }
  associateSubject(id: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Subjects`,
        value
      )
      .pipe(
        mergeMap((response) => {
          return this.getCourseWithSubjectById(id);
        }),
        catchError((error) => {
          this.dataService.loadingScreen.next(false);
          return throwError(
            "No pudimos associar la materia, recuerda que el porcentaje de las materias del área debe ser 100%"
          );
        })
      );
  }

  addAcheivement(
    id: string,
    value: {
      name: string;
      description: string;
      periodId: string;
      subjectId: string;
    }
  ) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Acheivements`,
        value
      )
      .pipe(
        mergeMap((response) => {
          return this.getAcheivements(id, value.subjectId);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear el desempeño");
        })
      );
  }

  addAcheivementByStudent(
    id: string,
    value: {
      name: string;
      description: string;
      periodId: string;
      subjectId: string;
      userId: string
    }
  ) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/AcheivementsByUser`,
        value
      )
      .pipe(
        mergeMap((response) => {
          return this.getAcheivementsByUser(id, value.subjectId);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear el desempeño");
        })
      );
  }

  deleteEvent(id: string, event: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.EVENT_ENDPOINT}${encodeURIComponent(event)}`
      )
      .pipe(
        mergeMap((response) => {
          return this.getUpcomingEvents(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos borrar el evento");
        })
      );
  }

  getSubjectById(id: string, subject: string) {
    this.dataService.loadingScreen.next(false);
    return this.http
      .get<Response<CourseSubjectById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}
      /Subjects/${encodeURIComponent(subject)}`
      )
      .pipe(
        map((resposne) => {
          this.dataService.loadingScreen.next(false);
          return resposne.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar la materia");
        })
      );
  }

  addEvent(id: string, value: any, fileToUpload?: File) {
    this.dataService.loadingScreen.next(true);
    const formData = new FormData()
    formData.append('name',value.name)
    formData.append('description',value.description)
    formData.append('eventDate', moment(value.eventDate).format("YYYY-MM-DD"))
    if(fileToUpload) {
      formData.append('file',fileToUpload, fileToUpload.name)
    }
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Events`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos creado el evento exitosamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError(
            "No pudimos crear el evento, recuerda que el nombre debe ser único para la fecha seleccionada"
          );
        })
      );
  }

  getUpcomingEvents(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<UpcomingEvent>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/UpcomingEvents`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los eventos");
        })
      );
  }

  deleteUser(id: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/DeleteUsers`,
        {
          users: [user],
        }
      )
      .pipe(
        mergeMap((response) => {
          return this.getCourseWithSubjectById(id);
        }),
        catchError((error) => {
          this.dataService.loadingScreen.next(false);
          return throwError(
            "No pudimos eliminar el usuario del curso, porque ya tiene información asociada"
          );
        })
      );
  }

  deleteTeacher(id: string, subject: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/DeleteTeachers`,
        {
          subject: subject,
          users: [user],
        }
      )
      .pipe(
        mergeMap((response) => {
          return this.getTeachers(id, subject);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos desasociar el profesor de la materia");
        })
      );
  }

  associateTeacher(id: string, subject: string, user: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Teachers`,
        {
          subject: subject,
          users: [user],
        }
      )
      .pipe(
        mergeMap((response) => {
          // this.dataService.loadingScreen.next(false)
          return this.getTeachers(id, subject);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos asociar el profesor");
        })
      );
  }

  associateStudents(id: string, file: File) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("users", file, file.name);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Students/Excel`,
        formData
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return `Hemos asociado los estudiantes al curso`;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(true);
          return throwError(`No pudimos asociar los estudiantes al curso`);
        })
      );
  }

  associateUser(id: string, role: string, user: string) {
    this.dataService.loadingScreen.next(true);
    let message = "El director de curso";
    let request = this.http.post(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Directors`,
      {
        users: [user],
      }
    );
    if (role === Role.STUDENT) {
      message = "El estudiante";
      request = this.http.post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Students`,
        {
          users: [user],
        }
      );
    }
    return request.pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return `Hemos asociado ${message} al curso`;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(true);
        return throwError(`No pudimos asociar ${message} al curso`);
      })
    );
  }

  deleteSubject(id: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Subjects/${encodeURIComponent(subject)}`
      )
      .pipe(
        mergeMap((response) => {
          return this.getCourseWithSubjectById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No hemos podido borrar la materia del curso");
        })
      );
  }

  updateCourse(id: string, value: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos actualizado la información del curso exitosamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la información del curso");
        })
      );
  }

  getCourseWithSubjectById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseWithSubject>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Subjects`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos encontrar el curso");
        })
      );
  }

  getCourseById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No encontramos el curso");
        })
      );
  }

  getCourses(page: number = 1, perPage: number = 10, search: string = "") {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<CourseById[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params: {
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
          name: search,
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

  deleteCourse(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos borrado el curso";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No hemos podido borrar el curso porque este tene información asociada");
        })
      );
  }

  getTeachers(id: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<User[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Subjects/${encodeURIComponent(subject)}/Teachers`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los profesores");
        })
      );
  }

  getAcheivements(id: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<Acheivement[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Acheivements?subjectParams=${encodeURIComponent(subject)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los desempeños");
        })
      );
  }

  getAcheivementsByUser(id: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<AcheivementByUser[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/AcheivementsByStudent?subjectParams=${encodeURIComponent(subject)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los desempeños");
        })
      );
  }

  copyAcheivementsParameters(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<AcheivementParameters>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/AcheivementsParameters`)
    .pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los parametros");
      })
    );
  }

  searchCourses(grade: string, year: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<AcheivementData[]>>(`${environment.url}${this.ENDPOINT}Grade/${encodeURIComponent(grade)}/year/${encodeURIComponent(year)}`)
    .pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return response.data;
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los cursos");
      })
    );
  }

  copyAcheivements(courseTo: string, subject: string, courseFrom: string, period: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.post(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(courseTo)}/${encodeURIComponent(courseFrom)}/${encodeURIComponent(subject)}/${encodeURIComponent(subject)}/Acheivements/${encodeURIComponent(period)}`, {})
      .pipe(
        mergeMap((response) => {
          return this.getAcheivements(courseTo, subject)
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los desempeños");
        })
      );
  }

  uploadAcheivements(course: string, subject: string, year: string[], period: string, file: File) {
    this.dataService.loadingScreen.next(true)
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);
    year.forEach(x => {
      formData.append("years[]",x);
    })
    return this.http.post(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(course)}/${encodeURIComponent(subject)}/Acheivements/${encodeURIComponent(period)}/Excel`, formData)
      .pipe(
        mergeMap((response) => {
          return this.getAcheivements(course, subject)
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los desempeños");
        })
      );
  }

  takeAttendace(id: string, subject: string, date: string, users: any[]) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Attendances`,
        {
          subjectId: subject,
          date,
          users,
        }
      )
      .pipe(
        mergeMap((response) => {
          return this.getAttendances(id, subject, date);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos tomar la asistencia");
        })
      );
  }
}
