import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseObservationComponent } from './course-observation.component';

describe('CourseObservationComponent', () => {
  let component: CourseObservationComponent;
  let fixture: ComponentFixture<CourseObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
