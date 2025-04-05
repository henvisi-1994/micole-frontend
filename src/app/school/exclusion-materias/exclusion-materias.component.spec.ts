import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusionMateriasComponent } from './exclusion-materias.component';

describe('ExclusionMateriasComponent', () => {
  let component: ExclusionMateriasComponent;
  let fixture: ComponentFixture<ExclusionMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusionMateriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExclusionMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
