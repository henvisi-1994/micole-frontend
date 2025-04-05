import { Calendar } from "./../../../models/calendar.model";
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import * as moment from "moment";

declare const $: any;

@Component({
  selector: "app-full-calendar",
  templateUrl: "./full-calendar.component.html",
  styleUrls: ["./full-calendar.component.sass"],
})
export class FullCalendarComponent implements OnInit, OnChanges {
  @Input() canEdit: Boolean;
  @Input() events: any[];
  @Output() onCreate: EventEmitter<{
    day: string;
    startTime: string;
    endTime: string;
  }> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Output() onShow: EventEmitter<{
    course: string;
    subject: string;
    url: string;
  }> = new EventEmitter();
  @Output() onReload: EventEmitter<{ start: string; end: string }> =
    new EventEmitter();
  $calendar: any;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.$calendar) {
      this.$calendar.fullCalendar("removeEvents");
      this.$calendar.fullCalendar("addEventSource", this.events);
      this.$calendar.fullCalendar("rerenderEvents");
    }
  }
  ngOnInit(): void {
    this.initCalendar();
  }

  private initCalendar() {
    this.$calendar = $("#fullCalendar");
    const $calendar = this.$calendar;
    const today = moment().startOf("day").toDate();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const canEdit = this.canEdit;
    const onCreate = this.onCreate;
    const onDelete = this.onDelete;
    const onShow = this.onShow;
    const onReload = this.onReload;
    const events = this.events;
    this.$calendar.fullCalendar({
      viewRender: function (view: any, element: any) {
        onReload.emit({
          start: view.start.format("YYYY-MM-DD"),
          end: view.end.format("YYYY-MM-DD"),
        });
        if (view.name != "month") {
          let elem = $(element).find(".fc-scroller")[0];
          let ps = new PerfectScrollbar(elem);
        }
      },
      locale: "es",
      header: {
        left: "title",
        center: "month, agendaWeek, agendaDay",
        right: "prev, next, today",
      },
      defaultView: "agendaDay",
      defaultDate: today,
      selectable: false,
      selectHelper: false,
      views: {
        month: {
          // name of view
          titleFormat: "MMMM YYYY",
        },
        week: {
          titleFormat: " MMMM D YYYY",
        },
        day: {
          titleFormat: "DD MMM, YYYY",
        },
      },
      dayClick: function (date, jsEvent, view) {
        if (canEdit) {
          swal({
            title: "Create horario " + date.format("YYYY-MM-DD"),
            html:
              '<div class="form-group">' +
              '<input class="form-control" placeholder="Hora de inicio" id="startTime" min="400" max="2400" step="5" required type="number">' +
              '<input class="form-control" placeholder="Hora de fin" id="endTime" min="400" max="2400" step="5" required type="number">' +
              "</div>",
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            buttonsStyling: false,
          }).then(function (result: any) {
            const startTime = $("#startTime").val();
            const endTime = $("#endTime").val();
            if (startTime && endTime) {
              onCreate.emit({
                day: date.format("YYYY-MM-DD"),
                startTime,
                endTime,
              });
            }

            $calendar.fullCalendar("unselect");
          });
        }
      },
      eventClick: function (info) {
        if (canEdit) {
          onDelete.emit(info.id);
        } else {
          onShow.emit({
            course: info.courseId,
            subject: info.subjectId,
            url: info.link,
          });
        }
      },
      editable: false,
      eventLimit: true,
      events: events,
    });
  }
}
