import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; // Asegúrate de importar solo lo necesario
import { Campus } from 'src/models/school/campus.model';
import { Grade } from 'src/models/school/grade.model';
import { Group } from 'src/models/school/group.model';
import { Shift } from 'src/models/school/shift.model';

@Component({
  selector: 'app-users-by-school',
  templateUrl: './users-by-school.component.html',
  styleUrls: ['./users-by-school.component.scss']
})
export class UsersBySchoolComponent implements OnInit {

   estudianteForm: FormGroup;
    mostrarCamposAdicionales: boolean = false;
    sedes: Campus[] = [];  // Inicializa tus sedes
    grados: Grade[] = []; // Inicializa tus grados
    grupos: Group[] = []; // Inicializa tus grados
    jornadas: Shift[] = []; // Inicializa tus grados

    constructor(private fb: FormBuilder) {
      this.estudianteForm = this.fb.group({
        tipoDocumento: ['', Validators.required],
        numeroDocumento: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        primerNombre: ['', Validators.required],
        segundoNombre: [''],
        primerApellido: ['', Validators.required],
        segundoApellido: [''],
        genero: ['', Validators.required],
        sede: ['', Validators.required],
        grado: ['', Validators.required],
        grupo: ['', Validators.required],
        jornada: ['', Validators.required],
        correoElectronico: ['', [Validators.required, Validators.email]],
        telefonoContacto: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        direccion: [''],
        eps: [''],
        nombreAcudiente: [''],
        telefonoAcudiente: [''],
        observaciones: ['']
      });
    }

    ngOnInit(): void {
      // Aquí puedes cargar dinámicamente sedes y grados si es necesario
      this.sedes = [
        { id: 1, nombre: 'Sede A' },
        { id: 2, nombre: 'Sede B' }
      ];
      this.grados = [
        { id: 1, nombre: 'Grado 1' },
        { id: 2, nombre: 'Grado 2' }
      ];
      this.grupos = [
        { id: 1, nombre: 'A' },
        { id: 2, nombre: 'B' },
        { id: 2, nombre: 'C' },
        { id: 2, nombre: 'D' }
      ];
      this.jornadas = [
        { id: 1, nombre: 'Mañana' },
        { id: 2, nombre: 'Tarde' },
        { id: 2, nombre: 'Completa' }
      ];
    }

    guardarEstudiante() {
      if (this.estudianteForm.valid) {
        console.log('Formulario enviado', this.estudianteForm.value);
      } else {
        console.log('Formulario no válido');
      }
    }

    cancelar() {
      this.estudianteForm.reset();
    }
}
