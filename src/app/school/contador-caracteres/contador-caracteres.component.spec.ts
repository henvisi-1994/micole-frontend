import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorCaracteresComponent } from './contador-caracteres.component';

describe('ContadorCaracteresComponent', () => {
  let component: ContadorCaracteresComponent;
  let fixture: ComponentFixture<ContadorCaracteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorCaracteresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorCaracteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
