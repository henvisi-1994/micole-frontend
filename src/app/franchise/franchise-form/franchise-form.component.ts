import { FranchiseById } from './../../../models/franchise/franchiseById.model';
import { showSuccess, hasError, ValidateExt } from 'src/util/validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FranchiseService } from 'src/services/franchise/franchise.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-franchise-form',
  templateUrl: './franchise-form.component.html',
  styleUrls: ['./franchise-form.component.sass']
})
export class FranchiseFormComponent implements OnInit {
  isEditing: boolean
  title: string
  isVisible: boolean = false
  franchiseForm: FormGroup
  school: string
  franchiseId: string
  franchise: FranchiseById

  constructor(private route: ActivatedRoute, private dataService: DataService,
    private franchiseService: FranchiseService, private router: Router) { }

  ngOnInit(): void {
    this.franchiseId = this.route.snapshot.paramMap.get('franchise_id')
    this.school = this.route.snapshot.paramMap.get('id')
    this.franchise = this.route.snapshot.data['franchise']
    this.route.data.subscribe(value => {
      this.isEditing =  value['isEditing']
      if(this.isEditing) {
        this.dataService.breadcrumbs.next(['Colegios','Editar'])
        this.title = 'Actualizar'
        this.dataService.breadcrumbs.next(['Colegios','Sedes',this.franchise.name,'Editar'])
        this.initForm()
      }else {
        this.dataService.breadcrumbs.next(['Colegios','Crear'])
        this.dataService.breadcrumbs.next(['Colegios','Sedes','Crear'])
        this.title = 'Crear'
        this.initForm()
      }
    })
  }

  showSuccess(name: string, subGroup: string = null): boolean {
    let group: FormGroup
    if(subGroup) {
      group = this.franchiseForm.get(subGroup) as FormGroup
    }else {
      group = this.franchiseForm
    }
    return showSuccess(group, name)
  }

  hasError(name: string, validation: string, subGroup: string = null) {
    let group: FormGroup
    if(subGroup) {
      group = this.franchiseForm.get(subGroup) as FormGroup
    }else {
      group = this.franchiseForm
    }
    return hasError(group, name, validation)
  }

  private initForm() {
    this.franchiseForm = new FormGroup({
      name: new FormControl(this.franchise?.name || '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      message: new FormControl(this.franchise?.message || '', []),
      address: new FormGroup({
        country: new FormControl(this.franchise?.address.country || '',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        city: new FormControl(this.franchise?.address.city || '',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        street: new FormControl(this.franchise?.address.street || '',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        postCode: new FormControl(this.franchise?.address.postCode || '',[Validators.required, Validators.pattern(/^[0-9]{3,30}$/)])
      }),
      phone: new FormGroup({
        number: new FormControl(this.franchise?.phone.number || '', [Validators.required, Validators.pattern(/^[0-9]{6,15}$/)]),
        indicative: new FormControl(this.franchise?.phone.indicative.substring(1) || '', [Validators.required, Validators.pattern(/^[0-9]{2,6}$/)]),
        ext: new FormControl(this.franchise?.phone.ext || '', [ValidateExt])
      }),
    })
    this.isVisible = true
  }

  onSubmit() {
    console.log(this.franchiseForm.value)
    let request = this.franchiseService.createFranchise(this.franchiseForm.value,this.school)
    if(this.isEditing) {
      request = this.franchiseService.updateFranchise(this.franchiseId, this.franchiseForm.value)
    }
    request.subscribe((data:string) => {
      swal({
        title: "Éxito",
        text: data,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        type: "success"
    }).then(result => {
      if(result.value) {
        this.router.navigate(['/','dashboard','schools',this.school])
      }
    }).catch(swal.noop)
    }, (err: string) => {
      swal({
        title: "Error",
        text: err,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        type: "error"
      })
    })
  }

}
