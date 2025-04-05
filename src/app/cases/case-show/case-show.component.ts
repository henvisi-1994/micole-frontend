import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseById } from 'src/models/cases/caseById.model';
import { CaseService } from 'src/services/case/case.service';
import { DataService } from 'src/services/data.service';
import { Notification } from 'src/util/notifications';
import swal from 'sweetalert2';

declare const $: any

@Component({
  selector: 'app-case-show',
  templateUrl: './case-show.component.html',
  styleUrls: ['./case-show.component.sass']
})
export class CaseShowComponent implements OnInit {
  case: CaseById
  show: boolean
  constructor(private route: ActivatedRoute, private dataService: DataService,
    private caseService: CaseService) { }

  ngOnInit(): void {
    this.case = this.route.snapshot.data["response"];
    this.show = false
    this.dataService.breadcrumbs.next(['Mi Cole Me Cuida','Caso para', this.case.user.name])
  }

  showForm(value) {
    this.show = true
  }

  comment(value) {
    $("#caseObservationModal").modal("show");
  }

  createComment(value: {text: string}) {
    this.caseService.createComment(this.case.id, value.text).subscribe(response => {
      this.case = response
      $("#caseObservationModal").modal("hide");
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      Notification.show("<b>Éxito</b>","Hemos añadido el comentario","bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  close(value) {
    swal({
      title: 'Cerrar caso',
      text: "Seguro quieres cerrar el caso, uno vez realizado este no podra ser reabierto",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        this.caseService.close(this.case.id)
          .subscribe(response => {
            this.case = response
            Notification.show("<b>Éxito</b>","Hemos cerrado el caso correctamente","bottom","right","success")
          }, err => {
            Notification.show("<b>Error</b>",err)
          })

      }
    })
  }

  studentCard(value: {data: any, observation?: string}) {
    this.caseService.studentCard(this.case.id, value.data, value.observation).subscribe((data) => {
      this.case = data
      this.show = false
      Notification.show("<b>Éxito</b>","Se ha creado la ficha del estudiante correctamente","bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  ngOnDestroy(): void {
    $("#caseObservationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
