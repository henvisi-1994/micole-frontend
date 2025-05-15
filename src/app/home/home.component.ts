import { NavigationEnd, Router } from '@angular/router';
import { LoginInfo } from './../../models/auth/loginInfo.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { CaseService } from 'src/services/case/case.service';
import { Notification } from 'src/util/notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  loginInfo: LoginInfo
  showButton: boolean

  constructor(private dataService: DataService, private router: Router) {
    this.showButton = false
    router.events.subscribe((val: any) => {
      if(val instanceof NavigationEnd)
        this.showButton = !val.url.includes('help')
    })
  }

  ngOnInit(): void {
    this.dataService.userData.subscribe(data => {
      this.loginInfo = data
      if(!data) {
        this.router.navigate(['login'])
      }
      if(!this.loginInfo.user?.hasChangedPassword) {
        this.router.navigate(['/','dashboard','users',this.loginInfo.user.id,'edit'], {queryParams: {
          passwordChange: true
        }})
      }
    })
  }

  notify() {
    this.router.navigate(['/', 'dashboard', 'help'])
  
  }

}
