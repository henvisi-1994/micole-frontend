import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DataService } from "../data.service";
import { catchError, map, switchMap } from "rxjs/operators";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Response } from "src/models/reponse.model";
import { StudentForReturn, StudentForCreate, StudentForUpdate } from "src/models/school/student.model";
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private ENDPOINT = "api/students/";

  constructor(private http: HttpClient, private dataService: DataService) {}

  // Obtener todos los estudiantes
  getStudents(
    page = 1,
    pageSize = 10,
    name = "",
    campus?: string,
    grade?: string,
    group?: string
  ) {
    this.dataService.loadingScreen.next(true);
    let params = new HttpParams()
      .set("pageNumber", page.toString())
      .set("pageSize", pageSize.toString())
      .set("name", name);

    if (campus) {
      params = params.set("campus", campus);
    }
    if (grade) {
      params = params.set("grade", grade);
    }
    if (group) {
      params = params.set("group", group);
    }

    return this.http
      .get<Response<StudentForReturn[]>>(`${environment.url}${this.ENDPOINT}`, {
        observe: "response",
        params,
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
          this.dataService.loadingScreen.next(false);
          return data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cargar los estudiantes");
        })
      );
  }

  // Obtener un estudiante por ID
  getStudentById(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .get<Response<StudentForReturn>>(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response.data;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos obtener la información del estudiante");
        })
      );
  }

  // Crear un nuevo estudiante
  createStudent(student: StudentForCreate) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .post(`${environment.url}${this.ENDPOINT}`, student)
      .pipe(
        map(() => {
          this.dataService.loadingScreen.next(false);
          return "Estudiante creado con éxito";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos crear el estudiante");
        })
      );
  }

  // Actualizar un estudiante
  updateStudent(id: string, student: StudentForUpdate) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, student)
      .pipe(
        map(() => {
          this.dataService.loadingScreen.next(false);
          return "Estudiante actualizado con éxito";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos actualizar el estudiante");
        })
      );
  }

  // Cambiar el estado de un estudiante
  changeStudentStatus(id: string, status: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .put(
        `${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/status/${status}`,
        {}
      )
      .pipe(
        switchMap(() => {
          return this.getStudentById(id);
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos cambiar el estado del estudiante");
        })
      );
  }

  // Eliminar un estudiante
  deleteStudent(id: string) {
    this.dataService.loadingScreen.next(true);
    return this.http
      .delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(
        map(() => {
          this.dataService.loadingScreen.next(false);
          return "Estudiante eliminado con éxito";
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError("No pudimos eliminar el estudiante");
        })
      );
  }

}
