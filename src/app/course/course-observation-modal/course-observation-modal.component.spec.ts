import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseObservationModalComponent } from './course-observation-modal.component';

describe('CourseObservationModalComponent', () => {
  let component: CourseObservationModalComponent;
  let fixture: ComponentFixture<CourseObservationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseObservationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseObservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
