import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/services/course/course.service';
import { group } from '@angular/animations';
import { showSuccess, hasError } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import swal from 'sweetalert2';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.sass']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup
  minDate: Date
  hasFile: number = 0
  fileToUpload?: File

  constructor(private dataService: DataService, private courseService: CourseService,
    private route: ActivatedRoute, private router: Router) {
    this.dataService.breadcrumbs.next(['Cursos', 'Eventos','Crear'])
    this.dataService.showNewEvent.next(false)
    this.minDate = moment().startOf('day').toDate();
  }

  ngOnInit(): void {
    this.initForm()
    // this.eventsForm()
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup
    if(subGroup) {
      group = this.eventForm.get(subGroup) as FormGroup
    }else {
      group = this.eventForm
    }
    return showSuccess(group, name)
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup
    if(subGroup) {
      group = this.eventForm.get(subGroup) as FormGroup
    }else {
      group = this.eventForm
    }
    return hasError(group, name, validation)
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit() {
    this.courseService.addEvent(this.route.snapshot.parent.params['id'], this.eventForm.value, this.fileToUpload)
      .subscribe(data => {
        swal({
          title: 'Éxito',
          text: data,
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/','dashboard','courses',this.route.snapshot.parent.params['id'],'events'])
          }
        })
      }, (err:string) => {
        swal({
          title: 'Error',
          text: err,
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger",
          type: "error"
        })
      })
  }

  // private eventsForm() {
  //   this.eventForm.get('hasFile').valueChanges.subscribe((value: number) => {
  //     this.hasFile = value
  //     if(this.hasFile === 0) {
  //       this.eventForm.removeControl('eventInvitation')
  //     } else {
  //       this.eventForm.addControl('eventInvitation', new FormGroup( {
  //         name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
  //         description: new FormControl('')
  //       }))
  //       if(this.hasFile === 1) {
  //         (<FormGroup>this.eventForm.get('eventInvitation'))
  //         .addControl('file', new FormControl(null,[Validators.required]))
  //       }else {
  //         (<FormGroup>this.eventForm.get('eventInvitation'))
  //         .addControl('url', new FormControl('',[Validators.required]))
  //       }
  //     }
  //   })
  // }

  extensions() {
    return "image/jpeg,image/jpg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  }

  private initForm() {
    this.eventForm = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description: new FormControl(''),
      eventDate: new FormControl(moment().startOf('day').toDate(), [Validators.required]),
      file: new FormControl(null)
    })
  }

}
