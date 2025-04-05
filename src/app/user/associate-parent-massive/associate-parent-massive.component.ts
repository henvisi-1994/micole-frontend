import { showSuccess, hasError } from 'src/util/validators';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-associate-parent-massive',
  templateUrl: './associate-parent-massive.component.html',
  styleUrls: ['./associate-parent-massive.component.sass']
})
export class AssociateParentMassiveComponent implements OnInit {
  userForm: FormGroup
  fileToUpload: File = null

  constructor(
    private userService: UserService,
    private router: Router) {

   }

  ngOnInit(): void {
    this.initForm()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  private initForm() {
    this.userForm = new FormGroup({
      users: new FormControl(null, [Validators.required]),
    })

  }

  showSuccess(name: string): boolean {
    return showSuccess(this.userForm, name)
  }

  hasError(name: string, validation: string) {
    return hasError(this.userForm, name, validation)
  }

  onSubmit() {
    this.userService.associtateMassiveParent(this.fileToUpload)
      .subscribe((data: string) => {
        swal({
          title: "Éxito",
          text: data,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success"
      }).then(result => {
        if(result.value) {
          this.router.navigate(['/','dashboard','users'])
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
