import { DataService } from 'src/services/data.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.sass']
})
export class SchoolComponent implements OnInit {
  showNewButton = true

  constructor(private dataService: DataService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.dataService.showSchoolNew.subscribe(value => {
      if(value != null)
        this.showNewButton = value
        this.cdr.detectChanges()
    })
  }

}
