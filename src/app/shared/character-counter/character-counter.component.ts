import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.scss']
})
export class CharacterCounterComponent implements OnInit {
  @Input() caracteresMaximos = 500;
  @Input() mensaje = '';
  @Output() mensajeChange = new EventEmitter<string>();
  caracteresRestantes = 500;
  constructor() { }

  ngOnInit(): void {
    this.actualizarContador();
  }

  actualizarContador(): void {
    this.caracteresRestantes = this.caracteresMaximos - (this.mensaje?.length || 0);
    this.mensajeChange.emit(this.mensaje);
  }

}
