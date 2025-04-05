import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-verification-email',
  templateUrl: './request-verification-email.component.html',
  styleUrls: ['./request-verification-email.component.sass']
})
export class RequestVerificationEmailComponent implements OnInit {
  title: string
  buttonText: string
  email: boolean
  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title']
    this.buttonText = this.route.snapshot.data['buttonText']
    this.email = this.route.snapshot.data['email']
  }

  onSubmit(value: any) {
    let request = null
    if(this.email) {
      request = this.userService.requestVerificationEmail(value.email)
    } else {
      request = this.userService.requestPasswordChange(value.email)
    }
    request.subscribe(response => {
      swal({
        title: "Éxito",
        text: response,
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
