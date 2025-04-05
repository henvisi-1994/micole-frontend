import { LevelService } from "src/services/level/level.service";
import { Router } from "@angular/router";
import { Level } from "./../../../models/level/level.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LEVEL } from "src/util/constants";
import swal from "sweetalert2";
import { Notification } from "src/util/notifications";

declare const $: any;

@Component({
  selector: "app-level-card",
  templateUrl: "./level-card.component.html",
  styleUrls: ["./level-card.component.sass"],
})
export class LevelCardComponent implements OnInit {
  @Input() level: Level;
  @Output() onLodLevels = new EventEmitter<Level[]>();
  constructor(private router: Router, private levelService: LevelService) {}

  ngOnInit(): void {}

  updateLevel() {
    localStorage.setItem(LEVEL, JSON.stringify(this.level));
    this.router.navigate(["/", "dashboard", "levels", this.level.id, "edit"]);
  }

  deleteLevel() {
    swal({
      title: `Eliminar nivel: ${this.level.name}`,
      text: "Seguro quieres borrar el nivel ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.levelService.deleteLevel(this.level.id).subscribe(
          (data) => {
            this.onLodLevels.emit(data);
            // this.levels = data;
            Notification.show(
              "<b>Éxito</b>",
              "Hemos borrado el nivel",
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
}
