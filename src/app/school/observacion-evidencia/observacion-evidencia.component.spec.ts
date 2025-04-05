import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionEvidenciaComponent } from './observacion-evidencia.component';

describe('ObservacionEvidenciaComponent', () => {
  let component: ObservacionEvidenciaComponent;
  let fixture: ComponentFixture<ObservacionEvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservacionEvidenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservacionEvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
