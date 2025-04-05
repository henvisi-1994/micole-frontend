import { Response } from './../../models/reponse.model';
import { environment } from './../../environments/environment';
import { SchoolParametric } from './../../models/parametric/school.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ParametricService {

  private ENDPOINT = "api/Parametric/"

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http
      .get<Response<Array<SchoolParametric>>>(`${environment.url}${this.ENDPOINT}Schools`)
      .pipe(map(response => {
        return response.data
      }))
  }
}
