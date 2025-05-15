import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendanceByStudent } from 'src/models/attendance/attendanceByStudent.model';
import { Pagination } from 'src/models/parametric/pagination.model';
import { AttendanceService } from 'src/services/attendance/attendance.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceCorrectionDialogComponent } from '../attendance-correction-dialog/attendance-correction-dialog.component';
import { EvidenceAttachmentDialogComponent } from '../evidence-attachment-dialog/evidence-attachment-dialog.component';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  // Datos para la tabla
  mensajes: AttendanceByStudent[] = [];
  outBoxTitle: string = 'Asistencias';
  outBoxSubtitle: string = 'Lista de asistencias por estudiante';
  headers = [
    'ID Estudiante',
    'Nombre Completo',
    'Clases Totales',
    'Clases Asistidas',
    'Clases Perdidas',
    'Porcentaje de Asistencia',
    'Acciones'
  ];

  keys = [
    'studentId',
    'fullName',
    'totalClasses',
    'attendedClasses',
    'missedClasses',
    'attendancePercentage',
    'actions'
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
      school: new FormControl(''),
      subject: new FormControl(''),
      level: new FormControl(''),
    });
  }

  fetchAttendances(school: string, subject: string, level: string) {
    /*const attendanceArray: AttendanceByStudent[] = [
      {
        studentId: 1,
        fullName: "Juan Pérez",
        totalClasses: 20,
        attendedClasses: 18,
        missedClasses: 2,
        attendancePercentage: 90
      },
      {
        studentId: 2,
        fullName: "María García",
        totalClasses: 20,
        attendedClasses: 15,
        missedClasses: 5,
        attendancePercentage: 75
      },
      {
        studentId: 3,
        fullName: "Carlos López",
        totalClasses: 20,
        attendedClasses: 20,
        missedClasses: 0,
        attendancePercentage: 100
      },
      {
        studentId: 4,
        fullName: "Ana Martínez",
        totalClasses: 20,
        attendedClasses: 12,
        missedClasses: 8,
        attendancePercentage: 60
      },
      {
        studentId: 5,
        fullName: "Pedro Sánchez",
        totalClasses: 20,
        attendedClasses: 19,
        missedClasses: 1,
        attendancePercentage: 95
      }
    ];*/
   /* this.mensajes = attendanceArray.map(item => ({
      ...item,
      actions: ''
    }));*/
    this.attendanceService.getAllAttendances(school, subject, level).subscribe({
      next: (data) => {
        this.mensajes = data;  // Asigna los datos a la variable mensajes
      },
      error: (err) => {
        console.error(err);  // Maneja el error
      },
    });
  }

  onSubmit() {
    if (this.attendanceForm.valid) {
      const { school, subject, level } = this.attendanceForm.value;
      this.fetchAttendances(school, subject, level);
    }
  }

  onAction(event: { action: string; index: number }) {
    const student = this.mensajes[event.index];

    switch(event.action) {
      case 'add_evidence':
        this.openEvidenceDialog(student);
        break;
      case 'correct_attendance':
        this.openCorrectionDialog(student);
        break;
      default:
        console.log('Acción no reconocida:', event.action);
    }
  }

  openEvidenceDialog(student: AttendanceByStudent) {
    this.dialog.open(EvidenceAttachmentDialogComponent, {
      width: '600px',
      data: { student }
    }).afterClosed().subscribe(result => {
      if (result) {
        // Lógica para guardar la evidencia
        console.log('Evidencia guardada:', result);
      }
    });
  }

  openCorrectionDialog(student: AttendanceByStudent) {
    this.dialog.open(AttendanceCorrectionDialogComponent, {
      width: '600px',
      data: { student }
    }).afterClosed().subscribe(result => {
      if (result) {
        // Lógica para corregir la asistencia
        console.log('Asistencia corregida:', result);
        // Actualizar los datos
        this.fetchAttendances(
          this.attendanceForm.value.school,
          this.attendanceForm.value.subject,
          this.attendanceForm.value.level
        );
      }
    });
  }

  onRequest(event: { page: number; text: string }) {
    this.pagination.currentPage = event.page;
    this.fetchAttendances('school123', 'subject456', 'level789');
  }
}
