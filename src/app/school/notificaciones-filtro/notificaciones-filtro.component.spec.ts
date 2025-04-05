import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesFiltroComponent } from './notificaciones-filtro.component';

describe('NotificacionesFiltroComponent', () => {
  let component: NotificacionesFiltroComponent;
  let fixture: ComponentFixture<NotificacionesFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionesFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
