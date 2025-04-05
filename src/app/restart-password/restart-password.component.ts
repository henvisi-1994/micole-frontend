import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-restart-password',
  templateUrl: './restart-password.component.html',
  styleUrls: ['./restart-password.component.sass']
})
export class RestartPasswordComponent implements OnInit {
  private email: string
  private token: string

  constructor(private route: ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams.email,
    this.token = this.route.snapshot.queryParams.token
  }

  onSubmit(value: any) {
    this.userService.restartPassword(this.email,this.token, value.newPassword)
    .subscribe(response => {
      swal({
        title: "Éxito",
        text: "La contraseña ha sido restablecida",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
    }).then(result => {
      if(result.value) {
        this.router.navigate(['/login'])
      }
    }).catch(swal.noop)
    }, err => {
      swal({
        title: "Error",
        text: err,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        type: "error"
    }).catch(swal.noop)
    })
  }

}
