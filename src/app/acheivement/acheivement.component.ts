import { DataService } from './../../services/data.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-acheivement',
  templateUrl: './acheivement.component.html',
  styleUrls: ['./acheivement.component.sass']
})
export class AcheivementComponent implements OnInit, OnDestroy {
  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
    this.dataService.openAcheivementModal.next(false);
    this.dataService.openAcheivementMassiveModal.next(false);
  }

}
