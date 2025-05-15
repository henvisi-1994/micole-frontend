import { Score } from './../../models/score/score.model';
import { TaskById } from './../../models/task/taskById.model';
import { Response } from './../../models/reponse.model';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/services/data.service';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'
import { TaskForUpdate } from 'src/models/task/taskForUpdate.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  ENDPOINT = "api/Tasks/"
  ATTACHMENT_ENDPOINT = "api/Attachments/"

  constructor(private dataService: DataService, private http: HttpClient) { }

  getTaskById(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<TaskById>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return response.data
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos cargar la información de la tarea")
      }))
  }

  getScore(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.get<Response<Score>>(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/GradeByUser`)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return response.data
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos obtener la información de la calificación")
      }))
  }

  answerTask(id: string, file: File) {
    let formData = new FormData();
    formData.append('file',file, file.name)
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Answers`, formData)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos subido el archvio exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos subir el archivo")
      }))
  }

  deleteTask(id: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`)
      .pipe(catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError("No pudimos borrar la tarea por que ya tiene asociado calificaciones")
      }))
  }

  updateTask(id: string, value: any) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado la tarea exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError('No pudimos actualizar la tarea, porque el porcentaje de las tareas del periodo es mayor a 100')
      }))
  }
  updateTaskEditable(value: TaskForUpdate) {
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}Update`, value)
      .pipe(map(response => {
        this.dataService.loadingScreen.next(false)
        return "Hemos actualizado la tarea exitosamente"
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        if(err.error && err.error.data && err.error.data.message && err.error.data.message.includes("El periodo esta cerrado")) return throwError(err.error.data.message)
        return throwError('No pudimos actualizar la tarea, porque el porcentaje de las tareas del periodo es mayor a 100')
      }))
  }

  uploadFile(id: string, isUrl: boolean, value: any) {
    const formData = new FormData()
    formData.append('name',value.name)
    formData.append('description',value.description)
    formData.append('isUrl',isUrl + "")
    if(isUrl) {
      formData.append('url',value.url)
    } else {
      formData.append('file',value.file, value.file.name)
    }
    this.dataService.loadingScreen.next(true)
    return this.http.put(`${environment.url}${this.ENDPOINT}${encodeURIComponent(id)}/Attachments`,formData)
      .pipe(mergeMap(response => {
        return this.getTaskById(id)
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos subir el adjunto")
      }))
  }

  deleteAttachment(id: string, attachment: string) {
    this.dataService.loadingScreen.next(true)
    return this.http.delete(`${environment.url}${this.ATTACHMENT_ENDPOINT}${encodeURIComponent(attachment)}`)
      .pipe(mergeMap(response => {
        return this.getTaskById(id)
      }), catchError(err => {
        this.dataService.loadingScreen.next(false)
        return throwError("No pudimos borrar el archivo")
      }))
  }
}
