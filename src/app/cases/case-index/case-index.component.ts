import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from 'src/models/parametric/pagination.model';
import { Action } from "./../../../models/parametric/action.model";
import { CaseService } from 'src/services/case/case.service';
import { Notification } from 'src/util/notifications';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-case-index',
  templateUrl: './case-index.component.html',
  styleUrls: ['./case-index.component.sass']
})
export class CaseIndexComponent implements OnInit {
  show: boolean
  headers: string[];
  items: any[] = [];
  keys: string[];
  actions: Action[];
  pagination: Pagination = null;
  search: string = "";
  caseTitle: string;
  caseSubtitle: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private caseService: CaseService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.breadcrumbs.next(['Mi Cole Me Cuida','Casos'])
    let response = this.route.snapshot.data["response"];
    this.items = response.data;
    this.pagination = response.pagination;
    this.headers = ["Usuario", "Curso", "Sede", "Año", "Vida en riesgo ?","Creado en","Estado"];
    this.keys = ["user", "course","franchise","year","lifeAtRiskText","createdAt","status"];
    this.actions = [
      { type: "info", action: "show", icon: "fa fa-eye", tooltip: "Consultar" },
    ];
    this.show = true

    this.caseTitle = "Casos";
    this.caseSubtitle = "Todos los de las sedes a las cuales el orientador se encuentra vinculado";

  }

  onAction(value) {
    if (value.action == "show") {
      this.router.navigate([
        "/",
        "dashboard",
        "cases",
        this.items[value.index].id,
      ]);
    }
  }

  onRequest(value) {
    this.search = value.text;
    this.loadCases(value.page, this.search);
  }

  private loadCases(page: number, search: string) {
    this.caseService.getAllCases(search,page,10).subscribe((data) => {
      this.pagination = data.pagination
      this.items = data.data
    }, (err) => {
      Notification.show("<b>Error</b>",err)
    })
  }

}
