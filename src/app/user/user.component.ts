import { DataService } from 'src/services/data.service';
import { AuthService } from 'src/services/auth/auth.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  showNewButton: boolean = false
  constructor(private cdr: ChangeDetectorRef,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.showUserNew.subscribe(value => {
      if(value != null)
        this.showNewButton = value
        this.cdr.detectChanges()
    })
  }

}
