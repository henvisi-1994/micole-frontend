import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionRolesComponent } from './notificacion-roles.component';

describe('NotificacionRolesComponent', () => {
  let component: NotificacionRolesComponent;
  let fixture: ComponentFixture<NotificacionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
