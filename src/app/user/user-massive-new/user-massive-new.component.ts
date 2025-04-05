import { Role } from './../../../models/parametric/role.model';
import { SCHOOL } from './../../../util/constants';
import { UserService } from './../../../services/user/user.service';
import { ParametricService } from 'src/services/parametric/parametric.service';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { AuthService } from 'src/services/auth/auth.service';
import { ValidateConfirmPassword, showSuccess, hasError } from 'src/util/validators';
import { PasswordConfirmMatcher } from './../../../util/validators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Notification } from 'src/util/notifications';

@Component({
  selector: 'app-user-massive-new',
  templateUrl: './user-massive-new.component.html',
  styleUrls: ['./user-massive-new.component.sass']
})
export class UserMassiveNewComponent implements OnInit {
  userForm: FormGroup
  fileToUpload: File = null
  hideConfirm: boolean = true
  hide: boolean = true
  matcher = new PasswordConfirmMatcher()
  showSchools: boolean
  showRoles: boolean
  roles: string[]
  schools: Array<SchoolParametric>


  constructor(private authService: AuthService,
    private parametricService: ParametricService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router) {
    this.showSchools = this.authService.hasRole([Role.SUPER_ADMIN])
    if(this.authService.hasRole([Role.SUPER_ADMIN,Role.ADMIN])) {
      this.showRoles = true
      this.roles = ['Profesor','Estudiante','Acudiente']
    } else {
      this.showRoles = false
      this.showSchools = false
    }

   }

  ngOnInit(): void {
    this.initForm()
    this.parametricService.getSchools().subscribe(schools => {
      this.schools = schools
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private initForm() {
    this.userForm = new FormGroup({
      users: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      newPasswordConfirmation: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required])
    },[ValidateConfirmPassword])

    if(this.authService.hasRole(['SuperAdmin'])) {
      this.userForm.addControl('school',new FormControl(null, [Validators.required]))
    }

  }

  showSuccess(name: string): boolean {
    return showSuccess(this.userForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.userForm, name, validation)
  }

  onSubmit() {
    this.userService.createMassiveUser(this.fileToUpload, this.userForm.value.newPassword,
      this.userForm.value.role, this.userForm.value.school || localStorage.getItem(SCHOOL))
      .subscribe(
        (data) => {
          this.initForm()
          Notification.show("<b>Éxito</b>", "Solicitud para crear usuarios exitosa", "bottom","right","success");
          this.dataService.loadingScreen.next(false);
          let newBlob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(newBlob);
          let link = document.createElement("a");
          link.href = url;
          link.download = `User errors`;
          link.click();
        },
        (err) => {
          this.initForm()
          this.dataService.loadingScreen.next(false);
          Notification.show("<b>Error</b>", "No se pudo crear los usuarios");
        }
      );
  }

}
