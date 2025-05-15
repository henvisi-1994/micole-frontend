import { UserRedemption } from "./../../models/redemption/userRedemption.model";
import { GradeBySubject } from "./../../models/grade/gradeBySubject.model";
import { MyAttendace } from "./../../models/attendance/myAttendance.model";
import { TaskInfo } from "src/models/task/taskInfo.model";
import { UpcomingEvent } from "src/models/event/upcomingEvent.model";
import { Role } from "./../../models/parametric/role.model";
import { NotificationByCourse } from "./../../models/notification/notificationByCourse.model";
import { SCHOOL } from "./../../util/constants";
import { AuthService } from "src/services/auth/auth.service";
import { Users } from "./../../models/user/users.model";
import { UserDisabled } from "./../../models/user/userDisabled.model";
import { LoginInfo } from "./../../models/auth/loginInfo.model";
import { map, catchError, tap, mergeMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { UserById } from "./../../models/user/userById.model";
import { Response } from "./../../models/reponse.model";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { User } from "src/models/user/user.model";
import { CourseById } from "src/models/course/courseById.model";
import { Observable } from "rxjs";
import { GradeStats } from "src/models/stats/gradeStats.model";
import { UserPoint } from "src/models/user/userPoint.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  ENDPOINT = "api/Users/";
  ENDPOINT_SCHOOL = "api/Schools/";
  ENDPOINT_NOTIFICATION = "api/Notifications/";

  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  redemptions(id: string, page = 1, pageSize = 10) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<UserRedemption[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Redemptions`,
        {
          observe: "response",
          params: {
            pageNumber: page.toString(),
            pageSize: pageSize.toString(),
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
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los premios redimidos");
        })
      );
  }

  sendNotification(
    id: string,
    school: string,
    title: string,
    description: string,
    fileToUpload?: File
  ) {
    const formData = new FormData()
    formData.append('title',title)
    formData.append('description',description)
    formData.append('schoolId', school)
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
          return "Hemos enviado la notificación correctamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos enviar la notificación al usuario");
        })
      );
  }

  points(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<UserPoint>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Points`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos conseguir los puntos del usuario");
        })
      );
  }

  downloadNotificationsExcel(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Notifications/Excel`,
      {
        responseType: "blob",
      }
    );
  }

  downloadNotifications(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http.get(
      `${environment.url}${this.ENDPOINT}${encodeURIComponent(
        id
      )}/Notifications/Pdf`,
      {
        responseType: "blob",
      }
    );
  }

  getGrades(id: string, course: string, subject: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<GradeBySubject>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Grades?courseId=${encodeURIComponent(
          course
        )}&subjectId=${encodeURIComponent(subject)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las notas");
        })
      );
  }

  createUser(user: any, role: string, school: string) {
    let path: string = `${environment.url}${
      this.ENDPOINT_SCHOOL
    }${encodeURIComponent(school)}`;
    switch (role) {
      case "Orientador":
        path = `${path}/Counselors`;
        break;
      case "Administrador":
        path = `${path}/Admins`;
        break;
      case "Director":
        path = `${path}/Managers`;
        break;
      case "Profesor":
        path = `${path}/Teachers`;
        break;
      case "Estudiante":
        path = `${path}/Students`;
        break;
      case "Acudiente":
        path = `${path}/Parents`;
        break;
    }
    this.dataService.loadingScreen.next(true);
    return this.http.post(path, user).pipe(
      map((response) => {
        this.dataService.loadingScreen.next(false);
        return "Hemos creado el usario exitosamente";
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos crear el usario");
      })
    );
  }

  getAttendance(id: string, day: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<MyAttendace[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Attendances?day=${day}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos conseguir la asistencia");
        })
      );
  }

  getUpcomingTasks(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<TaskInfo[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/UpcomingTasks`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las tareas del usuario");
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
          return throwError("No pudimos cargar los eventos del usuario");
        })
      );
  }

  grades(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<GradeStats[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Stats`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar las notas");
        })
      );
  }

  addDischarges(id: string, notification: string, value: any) {
    this.dataService.loadingScreen.next(true);
    let request: Observable<any>;
    if (this.authService.hasRole([Role.STUDENT])) {
      request = this.http.put(
        `${environment.url}${this.ENDPOINT_NOTIFICATION}${encodeURIComponent(
          notification
        )}/StudentDisgraces`,
        value
      );
    } else if (this.authService.hasRole([Role.PARENT])) {
      request = this.http.put(
        `${environment.url}${this.ENDPOINT_NOTIFICATION}${encodeURIComponent(
          notification
        )}/ParentDisgraces`,
        value
      );
    }
    return request.pipe(
      mergeMap((response) => {
        return this.getNotifications(id);
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos guardar los descargos");
      })
    );
  }

  getNotifications(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<NotificationByCourse[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Notifications`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar el observador");
        })
      );
  }

  deleteParent(id: string, parent: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Parents/${encodeURIComponent(parent)}`
      )
      .pipe(
        map((response) => {
          return "Hemos desasociado el acudiente al estudiante";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos desasociar el acudiente al usuario");
        })
      );
  }

  deleteStudent(id: string, student: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Students/${encodeURIComponent(student)}`
      )
      .pipe(
        map((response) => {
          return "Hemos desasociado el estudiante al acudiente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos desasociar el estudiante al usuario");
        })
      );
  }

  associateParent(id: string, parent: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Parents/${encodeURIComponent(parent)}`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos asociado el acudiente al usuario";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos asociar el acudiente al usuario");
        })
      );
  }

  associateStudent(id: string, student: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(
          id
        )}/Students/${encodeURIComponent(student)}`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos asociado el estudiante al usuario";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos asociar el estudiante al usuario");
        })
      );
  }

  getTeachers(
    page: number = 1,
    perPage: number = 10,
    search: string = "",
    schoolId: string = null
  ) {
    this.dataService.loadingScreen.next(true);
    let request = this.http.get<Response<Users[]>>(
      `${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(
        schoolId
      )}/Teachers`,
      {
        observe: "response",
        params: {
          fullName: search,
          email: search,
          identification: search,
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
        },
      }
    );
    return request.pipe(
      map((response) => {
        let data = response.body;
        let dataToReturn = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data.map((s) => s.user),
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los usuarios");
      })
    );
  }

  getAdmins(
    page: number = 1,
    perPage: number = 10,
    search: string = "",
    schoolId: string = null
  ) {
    this.dataService.loadingScreen.next(true);
    let request = this.http.get<Response<Users[]>>(
      `${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(
        schoolId
      )}/Admins`,
      {
        observe: "response",
        params: {
          fullName: search,
          email: search,
          identification: search,
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
        },
      }
    );
    return request.pipe(
      map((response) => {
        let data = response.body;
        let dataToReturn = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data.map((s) => s.user),
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los usuarios");
      })
    );
  }

  getStudentsByPagination(
    page: number = 1,
    perPage: number = 10,
    search: string = "",
    schoolId: string = null
  ) {
    this.dataService.loadingScreen.next(true);
    let request = this.http.get<Response<Users[]>>(
      `${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(
        schoolId
      )}/Students`,
      {
        observe: "response",
        params: {
          fullName: search,
          email: search,
          identification: search,
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
        },
      }
    );
    return request.pipe(
      map((response) => {
        let data = response.body;
        let dataToReturn = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data.map((s) => s.user),
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los usuarios");
      })
    );
  }

  getUsers(
    page: number = 1,
    perPage: number = 10,
    search: string = "",
    role: string = "",
    schoolId: string = null
  ) {
    this.dataService.loadingScreen.next(true);
    let request = this.http.get<Response<Users[]>>(
      `${environment.url}${this.ENDPOINT}`,
      {
        observe: "response",
        params: {
          fullName: search,
          email: search,
          identification: search,
          role: role,
          pageNumber: page.toString(),
          pageSize: perPage.toString(),
        },
      }
    );
    if (this.authService.hasRole([Role.ADMIN, Role.COUNSELOR]) || schoolId) {
      const id = schoolId || localStorage.getItem(SCHOOL);
      request = this.http.get<Response<Users[]>>(
        `${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(
          id
        )}/Users`,
        {
          observe: "response",
          params: {
            fullName: search,
            email: search,
            identification: search,
            role: role,
            pageNumber: page.toString(),
            pageSize: perPage.toString(),
          },
        }
      );
    }
    return request.pipe(
      map((response) => {
        let data = response.body;
        let dataToReturn = {
          pagination: {
            currentPage: Number(response.headers.get("x-current-page")),
            itemPerPage: Number(response.headers.get("x-items-per-page")),
            totalItems: Number(response.headers.get("x-total-items")),
            totalPages: Number(response.headers.get("x-total-pages")),
          },
          code: data.code,
          codeName: data.codeName,
          data: data.data.map((s) => s.user),
        };
        this.dataService.loadingScreen.next(false);
        return dataToReturn;
      }),
      catchError((error) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No pudimos cargar los usuarios");
      })
    );
  }

  getUserById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<UserById>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`,
        {}
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("Usuario no encontrado");
        })
      );
  }

  getUserDisabled(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<UserDisabled>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Disabled`
      )
      .pipe(
        map((reponse) => {
          this.dataService.loadingScreen.next(false);
          return reponse.data;
        }),
        catchError((err) => {
          // console.log(err)
          this.dataService.loadingScreen.next(false);
          return throwError("Usuario no encontrado");
        })
      );
  }

  updateUser(user: any) {
    this.dataService.loadingScreen.next(true);
    return this.http.put(`${environment.url}${this.ENDPOINT}`, user).pipe(
      tap((response) => {
        this.dataService.loadingScreen.next(false);
      }),
      catchError((err) => {
        this.dataService.loadingScreen.next(false);
        return throwError("No se pudo actualizar la información del usuario");
      })
    );
  }

  associtateMassiveParent(file: File) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("users", file, file.name);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}Parents`, formData)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Hemos asociado los usuarios exitosamente";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos asociar los usuarios");
        })
      );
  }

  createMassiveUser(
    file: File,
    password: string,
    role: string,
    school: string
  ) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("users", file, file.name);
    formData.append("password", password);
    let path: string = `${environment.url}${
      this.ENDPOINT_SCHOOL
    }${encodeURIComponent(school)}`;
    switch (role) {
      case "Profesor":
        path = `${path}/Teachers/Excel`;
        break;
      case "Estudiante":
        path = `${path}/Students/Excel`;
        break;
      case "Acudiente":
        path = `${path}/Parents/Excel`;
        break;
    }
    return this.http.post(path, formData, {
      responseType: "blob",
    })
  }

  uploadPhoto(file: File) {
    this.dataService.loadingScreen.next(true);
    const formData: FormData = new FormData();
    formData.append("photo", file, file.name);
    return this.http
      .put(`${environment.url}${this.ENDPOINT}Photo`, formData)
      .pipe(
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No se pudo actualizar la foto del usuario");
        })
      );
  }

  updatePassword(password: any) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}ChangePassword`, password)
      .pipe(
        tap((response) => {
          this.dataService.loadingScreen.next(false);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar la contraseña");
        })
      );
  }

  requestVerificationEmail(email: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get(`${environment.url}${this.ENDPOINT}ValidateAccount`, {
        params: {
          email,
        },
      })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Se ha enviado el correo de verificación, por favor siga las instrucciones para poder iniciar sesión";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("El usuario con este correo electrónico no existe");
        })
      );
  }

  requestPasswordChange(email: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get(`${environment.url}${this.ENDPOINT}RestartPassword`, {
        params: {
          email,
        },
      })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return "Se ha enviado el correo con los pasos para restaurar la contraseña";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("El usuario con este correo electrónico no existe");
        })
      );
  }

  validateAccount(email: string, token: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}ValidateAccount`, {
        email,
        token,
      })
      .pipe(
        tap((response) => {
          this.dataService.loadingScreen.next(false);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No se ha podido validar la cuenta");
        })
      );
  }

  restartPassword(email: string, token: string, password: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}RestartPassword`, {
        email,
        token,
        password,
      })
      .pipe(
        tap((response) => {
          this.dataService.loadingScreen.next(false);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No se ha podido restablecer la contraseña");
        })
      );
  }

  disabledUser(disabled: boolean, user: string, school: string) {
    this.dataService.loadingScreen.next(true);
    let method = "DISABLE";
    if (disabled) {
      method = "ENABLE";
    }
    return this.http
      .post(
        `${environment.url}${this.ENDPOINT_SCHOOL}${encodeURIComponent(
          school
        )}/Users/${encodeURIComponent(user)}/${method}`,
        {}
      )
      .pipe(
        tap((res) => {
          this.dataService.loadingScreen.next(false);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos deshabilitar el usuario");
        })
      );
  }

  getParents(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<User[]>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Parents`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los acudiente del estudiante");
        })
      );
  }

  getParentsByAuth() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<User[]>>(`${environment.url}${this.ENDPOINT}Parents`)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los acudiente del estudiante");
        })
      );
  }

  getStudentsByAuth() {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<User[]>>(`${environment.url}${this.ENDPOINT}Students`)
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los acudiente del estudiante");
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
          return throwError("No pudimos cargar los estudiantes del acudiente");
        })
      );
  }
}
