declare const $: any;

export class Notification {
  static show(title: string,message: string, from: string = "bottom", align: string = "right", type: string = "danger", icon: string = "notifications") {
    $.notify({
      icon: icon,
      title: title,
      message: message
    }, {
      type: type,
      timer: 3000,
      placement: {
          from: from,
          align: align
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">' + icon + '</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
      '</div>'
    })
  }
}
