import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { bloodType } from 'src/models/parametric/bloodType.model';
import { gender } from 'src/models/parametric/gender.model';
import { identificationType } from 'src/models/parametric/identificationType.model';
import { Pagination } from 'src/models/parametric/pagination.model';
import { populationGroup } from 'src/models/parametric/populationGroup.model';
import { Role } from 'src/models/parametric/role.model';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { specialFeature } from 'src/models/parametric/specialFeature.model';
import { StudentForCreate, StudentForUpdate } from 'src/models/school/student.model'; // Importa los modelos adecuados
import { AuthService } from 'src/services/auth/auth.service';
import { DataService } from 'src/services/data.service';
import { StudentService } from 'src/services/student/student.service';
import { UserService } from 'src/services/user/user.service';
import { SCHOOL } from 'src/util/constants';
import { hasError, PasswordConfirmMatcher, showSuccess, ValidatePhone } from 'src/util/validators';

@Component({
  selector: 'app-users-by-school',
  templateUrl: './users-by-school.component.html',
  styleUrls: ['./users-by-school.component.scss']
})
export class UsersBySchoolComponent implements OnInit {

  estudianteForm: FormGroup;
  estudiantes: any[] = []; // Lista de estudiantes
  roles: string[];
  showSchools: boolean;
  pagination: Pagination = {
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
  };
  showRoles: boolean = false
  showPassword: boolean = false
    tableHeaders: string[] = ['Tipo Documento', 'Número Documento', 'Primer Nombre', 'Segundo Nombre', 'Primer Apellido', 'Segundo Apellido'];
 bloodType = bloodType
  identificationType = identificationType
  populationGroup = populationGroup
  specialFeature = specialFeature
  gender = gender
  hide: boolean = true
  hideConfirm: boolean = true
  showOther: boolean = false
  matcher = new PasswordConfirmMatcher()
  schools: Array<SchoolParametric>
  minDate: Date
  maxDate: Date
  constructor(private fb: FormBuilder, private studentService: StudentService,private dataService: DataService,
      private authService: AuthService,
      private userService: UserService,) {
        this.estudianteForm = this.fb.group({
          firstName: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255)
          ]),
          secondName: new FormControl(''),
          surname: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255)
          ]),
          lastname: new FormControl(''),
          email: new FormControl('', [
            Validators.required,
            Validators.email
          ]),
          mobile: new FormControl('', [
            Validators.required,
            Validators.pattern(/[0-9]{10}/)
          ]),
          phone: new FormControl('', [ValidatePhone]),
          diseases: new FormControl(''),
          rh: new FormControl('', [Validators.required]),
          identificationType: new FormControl('', [Validators.required]),
          gender: new FormControl('', [Validators.required]),
          identification: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
          ]),
          description: new FormControl(''),
          populationGroup: new FormControl(''),
          specialFeature: new FormControl(''),
          birthday: new FormControl(''),
          sms: new FormControl(false)
        });

  }

  ngOnInit(): void {
     this.showSchools = this.authService.hasRole([Role.SUPER_ADMIN]);
        if (this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN])) {
          this.roles = ["Orientador","Profesor", "Estudiante", "Acudiente"];
        }
        if (this.showSchools) {
          this.roles.unshift("Administrador");
        }
    this.cargarEstudiantes(); // Cargar estudiantes iniciales al inicio
  }

  cargarEstudiantes(page: number = 1, searchText: string = ''): void {
    this.studentService.getStudents(page, 10, searchText).subscribe(response => {
      this.estudiantes = response.data; // Los estudiantes se obtienen en el cuerpo de la respuesta
      this.pagination = response.pagination; // Actualizamos la paginación con la respuesta de la API
    }, error => {
      console.error('Error cargando estudiantes:', error);
    });
  }

  guardarEstudiante() {
    if (this.estudianteForm.valid) {
      const student: StudentForCreate = this.estudianteForm.value;
      this.userService.createUser(
              _.pick(student, [
                "firstName",
                "secondName",
                "surname",
                "lastname",
                "email",
                "mobile",
                "phone",
                "diseases",
                "description",
                "rh",
                "identificationType",
                "identification",
                "password",
                "populationGroup",
                "populationGroupOther",
                "specialFeature",
                "birthday",
                "sms",
              ]),
              'Teacher',
              localStorage.getItem(SCHOOL)).subscribe(response => {
        alert(response); // Muestra mensaje de éxito
        this.estudianteForm.reset(); // Limpiar el formulario
        this.cargarEstudiantes(this.pagination.currentPage); // Recargar los estudiantes
      }, error => {
        console.error('Error guardando estudiante:', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  cancelar() {
    this.estudianteForm.reset(); // Limpiar formulario
  }
  showSuccess(name: string): boolean {
    return showSuccess(this.estudianteForm, name)
  }
    hasError(name: string, validation: string) {
      return hasError(this.estudianteForm, name, validation)
    }
    validPhone() : boolean {
      return (<string>this.estudianteForm.get('phone').value).trim().length > 0
    }
    getBloadTypes(){
      return Object.keys(this.bloodType)
    }

    getIdentificationTypes() {
      return Object.keys(this.identificationType)
    }

    getSpecialFeature() {
      return Object.keys(this.specialFeature)
    }

    getPopulationGroup() {
      return Object.keys(this.populationGroup)
    }

    getGender() {
      return Object.keys(this.gender)
    }
    selectedPopulationGroup(value: string) {
      if(value == "Otro") {
        this.showOther = true
        this.estudianteForm.addControl('populationGroupOther', new FormControl( [Validators.required]))
      } else {
        this.showOther = false
        this.estudianteForm.removeControl('populationGroupOther')
      }
    }

  handleRequest(event: { page: number, text: string }) {
    this.cargarEstudiantes(event.page, event.text); // Cargar estudiantes con la nueva página y texto de búsqueda
  }

  handleAction(event: { action: string, index: number }) {
    const student = this.estudiantes[event.index];
    if (event.action === 'edit') {
      this.editarEstudiante(student);
    } else if (event.action === 'delete') {
      this.eliminarEstudiante(student);
    }
  }

  editarEstudiante(student: any) {
    this.estudianteForm.patchValue(student);
  }

  eliminarEstudiante(student: any) {
    this.studentService.deleteStudent(student.numeroDocumento).subscribe(() => {
      this.estudiantes = this.estudiantes.filter(e => e.numeroDocumento !== student.numeroDocumento);
      alert('Estudiante eliminado con éxito');
    }, error => {
      console.error('Error eliminando estudiante:', error);
    });
  }
}
