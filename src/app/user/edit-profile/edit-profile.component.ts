import { AuthService } from 'src/services/auth/auth.service';
import { Notification } from '../../../util/notifications';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserById } from '../../../models/user/userById.model';
import { UserService } from '../../../services/user/user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatePhone, showSuccess, hasError, ValidateConfirmPassword } from 'src/util/validators';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  user: UserById
  constructor(private dataService: DataService, private route: ActivatedRoute,
    private userService: UserService, private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(['Usuarios','Editar'])
    this.user = this.route.snapshot.data['user']
    if(this.route.snapshot.queryParamMap.has('passwordChange')) {
      Notification.show("<b>Acutalización de la contraseña</b>","Nunca has cambiado la contraseña por favor actualízala","bottom","right","warning")
    }

  }

  onEdit(value) {
    this.userService.updateUser(value).subscribe(data => {
      let id = this.route.snapshot.params['id']
      Notification.show("<b>Acutalización</b>","Se ha actualizado la información del usuario correctamente","bottom","right","success")
      this.authService.me().subscribe()
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  onPasswordChange(password: any) {
    this.userService.updatePassword(password).subscribe(data => {
      Notification.show("<b>Acutalización</b>","Se ha actualizado la contraseña correctamente","bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  onAvatar(file: File) {
    this.userService.uploadPhoto(file).subscribe(data => {
      window.location.reload()
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

}
