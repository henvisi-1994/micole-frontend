import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { DataService } from 'src/services/data.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.sass']
})
export class ValidateAccountComponent implements OnInit {

  constructor(private userService: UserService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.validateAccount(this.route.snapshot.queryParams.email,
      this.route.snapshot.queryParams.token).subscribe(data => {
        swal({
          title: "Éxito",
          text: "Se ha validado correctamente la cuenta",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
        }).then(result => {
          if(result.value) {
            this.router.navigate(['/login'])
          }

      })}, err => {
        swal({
          title: "Error",
          text: err,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger",
          type: "error"
        }).then(result => {
          if(result.value) {
            this.router.navigate(['/login'])
          }
        })
      })
  }
}
