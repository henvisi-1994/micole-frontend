import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramarNotificacionComponent } from './programar-notificacion.component';

describe('ProgramarNotificacionComponent', () => {
  let component: ProgramarNotificacionComponent;
  let fixture: ComponentFixture<ProgramarNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramarNotificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramarNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
