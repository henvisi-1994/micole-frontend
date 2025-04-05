import { DataService } from 'src/services/data.service';
import { TaskInfo } from 'src/models/task/taskInfo.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-task',
  templateUrl: './upcoming-task.component.html',
  styleUrls: ['./upcoming-task.component.sass']
})
export class UpcomingTaskComponent implements OnInit {
  tasks: TaskInfo[]

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.tasks = route.snapshot.data['response']
    if(this.route.snapshot.data['isStudent'])
      this.dataService.breadcrumbs.next(['Próximas tareas'])
    else
      this.dataService.breadcrumbs.next(['Próximas tareas', this.route.snapshot.queryParamMap.get('name')])
  }

  ngOnInit(): void {
  }

}
