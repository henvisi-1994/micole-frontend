import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-contador-caracteres',
  templateUrl: './contador-caracteres.component.html',
  styleUrls: ['./contador-caracteres.component.scss'],
})
export class ContadorCaracteresComponent implements OnInit {
  @Input() caracteresMaximos = 500;
  @Input() mensaje = '';
  @Output() mensajeChange = new EventEmitter<string>();

  caracteresRestantes = 500;

  constructor() {}

  ngOnInit(): void {
    this.actualizarContador();
  }

  actualizarContador(): void {
    this.caracteresRestantes = this.caracteresMaximos - (this.mensaje?.length || 0);
    this.mensajeChange.emit(this.mensaje);
  }
}
