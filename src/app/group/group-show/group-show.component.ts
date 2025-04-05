import { AuthService } from 'src/services/auth/auth.service';
import { group } from '@angular/animations';
import { Action } from './../../../models/parametric/action.model';
import { SubjectById } from './../../../models/subject/subjectById.model';
import { Notification } from './../../../util/notifications';
import { mergeMap } from 'rxjs/operators';
import { GroupService } from './../../../services/group/group.service';
import { GroupById } from './../../../models/group/groupById.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Role } from 'src/models/parametric/role.model';

declare const $: any;

@Component({
  selector: 'app-group-show',
  templateUrl: './group-show.component.html',
  styleUrls: ['./group-show.component.sass']
})
export class GroupShowComponent implements OnInit, OnDestroy {
  group: GroupById
  showSubject: boolean = false
  subjectHeaders: string[]
  subjectKeys: string[]
  subjectItems: SubjectById[]
  subjectAction: Action[]
  currentValue: SubjectById
  hasAction: boolean = false

  constructor(private dataService: DataService,
    private route: ActivatedRoute, private groupService: GroupService,
    private authService: AuthService) {
      this.subjectHeaders = ['Nombre', 'Porcentaje', 'Descripción']
      this.subjectKeys = ['name','percentage','description']
      if(this.authService.hasRole([Role.SUPER_ADMIN, Role.ADMIN]))
        this.hasAction = true
      this.subjectAction = [
        {type: 'primary', action: 'edit',icon:"fa fa-edit", tooltip: 'Editar'},
        {type: 'danger', action: 'delete',icon:"fa fa-trash", tooltip: 'Borrar'}
      ]
  }

  ngOnInit(): void {
    this.group = this.route.snapshot.data['group'];
    this.dataService.breadcrumbs.next(['Colegios','Área',this.group.name,'Información'])
    this.showSubject = true
    this.subjectItems = this.group.subjects
  }


  upadateGroup(value: {name: string, description: string}) {
    this.groupService.updateGroup(this.group.id, value)
      .pipe(mergeMap(response => {
        return this.groupService.getGroupById(this.group.id)
      })).subscribe(data => {
        this.group = data
        this.subjectItems = this.group.subjects
      })
  }

  onSubjectAction(value: any) {
    const subject = this.subjectItems[value.index]
    if(value.action === 'edit') {
      this.currentValue = subject
      $('#formSubjectModal').modal('show')
    }else {
      swal({
        title: 'Eliminar materia',
        text: "Seguro quieres borrar el la materia ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'SI',
        cancelButtonText: "NO",
         buttonsStyling: false
      }).then((result) => {
        if (result.value) {
          this.groupService.deleteSubject(this.group.id, subject.id)
          .subscribe(data => {
            this.group = data
            this.subjectItems = this.group.subjects
            Notification.show("<b>Éxito</b>","Hemos borrado la materia exitosamente","bottom","right","success")
          }, err => {
            Notification.show("<b>Error</b>",err)
          })
        }
      })

    }
  }

  onSubject(result: any) {
    let request = this.groupService.createSubject(this.group.id, result.value)
    let message = "Hemos creado la materia exitosamente"
    if(result.isEditing) {
      this.currentValue = null
      message = "Hemos acutalizado la materia exitosamente"
      request = this.groupService.updateSubject(this.group.id, result.value.id, result.value)
    }
    request.subscribe(data => {
      this.group = data
      this.subjectItems = this.group.subjects
      Notification.show("<b>Éxito</b>",message,"bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  ngOnDestroy(): void {
    $("#formSubjectModal").modal("hide");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  }

}
