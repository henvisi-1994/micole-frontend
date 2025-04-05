import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass']
})
export class EventComponent implements OnInit {
  showNewButton: boolean = false

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute,
    private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.showNewEvent.subscribe(value => {
      if(value != null)
        this.showNewButton = value
        this.cdr.detectChanges()
    })
  }

  createEvent() {
    this.router.navigate(['/','dashboard','courses', this.route.snapshot.paramMap.get('id'),'events','new'])
  }

}
