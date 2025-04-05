import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseObservation } from 'src/models/course/courseObservation.model';
import { CourseService } from 'src/services/course/course.service';
import { Notification } from 'src/util/notifications';
import swal from "sweetalert2";

declare const $: any

@Component({
  selector: 'app-course-observation',
  templateUrl: './course-observation.component.html',
  styleUrls: ['./course-observation.component.sass']
})
export class CourseObservationComponent implements OnInit, OnDestroy {
  course: CourseObservation
  userSelected: string
  constructor(private route: ActivatedRoute,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
  }

  deleteObservation(id: string, student: string, period: string) {
    swal({
      title: `Eliminar la observación`,
      text: `Seguro quieres borrar la observiación del ${period} para el estudiante ${student}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.courseService
          .deleteObservation(this.route.snapshot.paramMap.get('id'), id)
          .subscribe(
            (data) => {
              this.course = data
              Notification.show(
                "<b>Éxito</b>",
                "Hemos borrado la observacion del estudiante",
                "bottom",
                "right",
                "success"
              );
            },
            (err) => {
              Notification.show("<b>Error</b>", err);
            }
          );
      }
    });
  }

  create(data) {
    this.courseService.createObservation(this.route.snapshot.paramMap.get('id'), {
      userId: this.userSelected,
      ...data
    }).subscribe(data => {
      this.course = data
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  createObservation(id: string) {
    this.userSelected = id;
    $("#courseObservationModal").modal("show");
  }

  ngOnDestroy(): void {
    $("#courseObservationModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
