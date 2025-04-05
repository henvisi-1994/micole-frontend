import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenombrarPeriodosComponent } from './renombrar-periodos.component';

describe('RenombrarPeriodosComponent', () => {
  let component: RenombrarPeriodosComponent;
  let fixture: ComponentFixture<RenombrarPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenombrarPeriodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenombrarPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
