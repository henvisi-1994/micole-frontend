import { mergeMap } from 'rxjs/operators';
import { Notification } from './../../../util/notifications';
import { AcheivementService } from './../../../services/acheivement/acheivement.service';
import { CourseService } from './../../../services/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Acheivement, AcheivementByUser } from 'src/models/acheivement/acheivement.model';
import swal from 'sweetalert2';
import { AcheivementInfo } from 'src/models/acheivement/acheivementInfo.model';
import { AcheivementParameters } from 'src/models/acheivement/acheivement.parameters';
import { CourseSubjectById } from 'src/models/course-subject/courseSubjectById.model';

declare const $: any;

@Component({
  selector: 'app-acheivement-index',
  templateUrl: './acheivement-index.component.html',
  styleUrls: ['./acheivement-index.component.sass']
})
export class AcheivementIndexComponent implements OnInit, OnDestroy {
  subjectId: string
  courseId: string
  acheivements: Acheivement[]
  acheivementsPerUser: AcheivementByUser[]
  courseSubject: CourseSubjectById
  modalText: string
  copyModalTitle: string
  modalButton: string
  showPeriods: boolean
  currentAcheivement: AcheivementInfo
  parameters: AcheivementParameters
  selectedTabIndex: number
  showNewButton: boolean
  selectedUser: string

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private courseService: CourseService, private acheivementService: AcheivementService,
    private cdr: ChangeDetectorRef) {
    this.selectedTabIndex = 0
    this.modalText = 'Crear desempeño'
    this.modalButton = 'Crear'
    this.showPeriods = true
    this.currentAcheivement = null
    this.subjectId = this.route.snapshot.paramMap.get('subject_id');
    this.courseId = this.route.snapshot.parent.parent.parent.paramMap.get('id');
    // console.log(JSON.stringify(route.snapshot.parent.data))
    // console.log(JSON.stringify(route.snapshot.parent.parent.data))
    this.courseSubject = route.snapshot.parent.parent.data["courseSubject"];
    this.dataService.breadcrumbs.next(['Courses',this.courseSubject.course,'Materias',this.courseSubject.subject,'Desempeños'])
    this.dataService.showNewAcheivement.next(true)
    this.acheivements = this.route.snapshot.data['acheivements']
    this.acheivementsPerUser = this.route.snapshot.data['acheivementsByUser']
    this.parameters = null
    this.dataService.showNewAcheivement.subscribe(value => {
      if(value != null)
        this.showNewButton = value
        this.cdr.detectChanges()
    })
  }

  

  addAcheivement() {
    this.dataService.openAcheivementModal.next(true);
  }

  addAcheivementStudent(userId: string) {
    this.selectedUser = userId
    this.dataService.openAcheivementModal.next(true);
  }

  addMassiveAcheivement() {
    this.dataService.openAcheivementMassiveModal.next(true);
  }

  ngOnInit(): void {
    this.dataService.openAcheivementModal.subscribe(data => {
      if(data) {
        this.modalText = 'Crear desempeño'
        this.modalButton = 'Crear'
        this.showPeriods = true
        this.currentAcheivement = null
        $('#acheivementModal').modal('show')
      } else {
        $('#acheivementModal').modal('hide')
      }
    })
    this.dataService.openAcheivementMassiveModal.subscribe(data => {
      if(data) {
        this.modalText = 'Cargar desempeños'
        this.modalButton = 'Cargar'
        $('#acheivementMassiveModal').modal('show')
      } else {
        $('#acheivementMassiveModal').modal('hide')
      }
    })
    this.courseService.copyAcheivementsParameters(this.courseId).subscribe(data => {
      this.parameters = data
    }, err => {
      console.log('Error')
    })
  }

  copyAcheivement() {
    this.copyModalTitle = 'Copiar valores de otro curso'
    $('#acheivementCopyModal').modal('show')
  }

  copy(event) {
    this.courseService.copyAcheivements(
      this.courseId, this.subjectId,
      event.course, event.period
    ).subscribe(data => {
      this.acheivements = data
      Notification.show("<b>Éxito</b>","Los desempeño han sido copiados exitosamente","bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  upload(event) {
    this.courseService.uploadAcheivements(
      this.courseId, this.subjectId,
      event.year, event.period, event.file
    ).subscribe(data => {
      this.acheivements = data
      Notification.show("<b>Éxito</b>","Los desempeños han sido creados en todos los cursos del mismo grado para el año escolar","bottom","right","success")
    }, err => {
      Notification.show("<b>Error</b>",err)
    })
  }

  onDelete(id: string, name: string) {
    swal({
      title: 'Eliminar el desempeño',
      text: `Seguro quieres eliminar el desempeño ${name} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'SI',
      cancelButtonText: "NO",
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        if(this.selectedTabIndex === 0) {
          this.acheivementService.deleteAcheivement(id)
          .subscribe(data => {
            const message = data
            this.courseService.getAcheivements(this.courseId,this.subjectId).subscribe(data => {
              this.acheivements = data
              Notification.show("<b>Éxito</b>",message,"bottom","right","success")
            })
          }, err => {
            Notification.show("<b>Error</b>",err)
          })
        } else {
          this.acheivementService.deleteAcheivementByUser(id)
          .subscribe(data => {
            const message = data
            this.courseService.getAcheivementsByUser(this.courseId,this.subjectId).subscribe(data => {
              this.acheivementsPerUser = data
              Notification.show("<b>Éxito</b>",message,"bottom","right","success")
            })
          }, err => {
            Notification.show("<b>Error</b>",err)
          })
        }
        
      }
    })
  }

  onEdit(value: AcheivementInfo) {
    this.currentAcheivement = value
    this.modalText = 'Actualizar desempeño'
    this.modalButton = 'Editar'
    this.showPeriods = false
    $('#acheivementModal').modal('show')

  }

  onAction(value: any) {
    if(this.currentAcheivement) {
      if(this.selectedTabIndex === 0) {
        this.acheivementService.updateAcheivement(this.currentAcheivement.id, value)
        .pipe(mergeMap(response => {
          return this.courseService.getAcheivements(this.courseId, this.subjectId)
        })).subscribe(data => {
          this.acheivements = data
          Notification.show("<b>Éxito</b>","Hemos actualizado el desempeño exitosamente","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      } else {
        this.acheivementService.updateAcheivementByUser(this.currentAcheivement.id, value)
        .pipe(mergeMap(response => {
          return this.courseService.getAcheivementsByUser(this.courseId, this.subjectId)
        })).subscribe(data => {
          this.acheivementsPerUser = data
          Notification.show("<b>Éxito</b>","Hemos actualizado el desempeño exitosamente","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    } else {
      if(this.selectedTabIndex === 0) {
        this.courseService.addAcheivement(this.courseId, {...value, subjectId: this.subjectId})
        .subscribe(data => {
          this.acheivements = data
          Notification.show("<b>Éxito</b>","Hemos creado el desempeño exitosamente","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      } else  {
        this.courseService.addAcheivementByStudent(this.courseId, {...value, subjectId: this.subjectId, userId: this.selectedUser})
        .subscribe(data => {
          this.acheivementsPerUser = data
          Notification.show("<b>Éxito</b>","Hemos creado el desempeño exitosamente","bottom","right","success")
        }, err => {
          Notification.show("<b>Error</b>",err)
        })
      }
    }

  }

  ngOnDestroy(): void {
    $('#acheivementCopyModal').modal('hide')
    $('#acheivementModal').modal('hide')
    $('#acheivementMassiveModal').modal('hide')
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

}
