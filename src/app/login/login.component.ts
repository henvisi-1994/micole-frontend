import { Authentication } from './../../models/auth/authentication.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SchoolParametric } from 'src/models/parametric/school.model';
import { ParametricService } from 'src/services/parametric/parametric.service';
import { AuthService } from 'src/services/auth/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  schools: Array<SchoolParametric>

  constructor(private parametricService: ParametricService,
    private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.parametricService.getSchools().subscribe(schools => {
      this.schools = schools
    })
    const body = document.getElementsByTagName('body')[0];
    if (!body.classList.contains('off-canvas-sidebar')) {
      body.classList.add('off-canvas-sidebar')
    }
  }

  onLogin(value: Authentication) {
    // this.authModel = this.loginForm.value
    this.authService.login(value).subscribe(data => {
        swal({
          title: "Éxito",
          text: "El inicio de sesión es valido, iniciemos!!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
      }).then(result => {
        if(result.value) {
          this.router.navigate(['/dashboard'])
        }
      }).catch(swal.noop)
    }, error => {
        swal({
            title: "Error",
            text: error,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger",
            type: "error"
        }).catch(swal.noop)
    })
  }
}
