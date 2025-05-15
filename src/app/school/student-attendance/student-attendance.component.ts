import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendanceByStudent } from 'src/models/attendance/attendanceByStudent.model';
import { Pagination } from 'src/models/parametric/pagination.model';
import { AttendanceService } from 'src/services/attendance/attendance.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceStatsRequest } from 'src/models/attendance/attendanceStatsRequest.model';
import { AttendanceStats } from 'src/models/attendance/attendanceStat.model';
import { SCHOOL } from 'src/util/constants';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  // Datos para la tabla
  mensajes: AttendanceStats[] = []; // ✅ Cambiado a AttendanceStats[]
  outBoxTitle: string = 'Asistencias';
  outBoxSubtitle: string = 'Lista de asistencias por estudiante';
  headers = [
    'Estudiante',
    'Clases Asistidas',
    'Clases Perdidas',
    'Total de Asistenncias',
    'Primera Asistencia',
    'Ultima Asistencia',
  ];

  keys = [
    'userName',
    'totalAttendances',
    'totalDelays',
    'totalOnTime',
    'firstAttendanceDate',
    'lastAttendanceDate'
  ];

  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };

  // Formulario de entrada
  attendanceForm: FormGroup;

  constructor(
    private attendanceService: AttendanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.attendanceForm = new FormGroup({
      dateStart: new FormControl(''),
      dateEnd: new FormControl('')
    });
  }

  fetchAttendances(dateStart: string, dateEnd: string) {
   const attendaceStatRequest: AttendanceStatsRequest= {dateStart, dateEnd};
    this.attendanceService.getAttendanceStats(attendaceStatRequest).subscribe({
      next: (data) => {
        console.log(data);

        this.mensajes = data;  // Asigna los datos a la variable mensajes
      },
      error: (err) => {
        console.error(err);  // Maneja el error
      },
    });
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      const { dateStart, dateEnd } = this.attendanceForm.value;
      this.fetchAttendances(dateStart,dateEnd );
    }
  }







  onRequest(event: { page: number; text: string }) {
    this.pagination.currentPage = event.page;
    const { dateStart, dateEnd } = this.attendanceForm.value;
    this.fetchAttendances(dateStart, dateEnd);
  }
}
