import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadoListaEditableComponent } from './llamado-lista-editable.component';

describe('LlamadoListaEditableComponent', () => {
  let component: LlamadoListaEditableComponent;
  let fixture: ComponentFixture<LlamadoListaEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlamadoListaEditableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlamadoListaEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
