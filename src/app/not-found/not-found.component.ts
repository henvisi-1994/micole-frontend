import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit {
  ngOnInit() {

  }
}
