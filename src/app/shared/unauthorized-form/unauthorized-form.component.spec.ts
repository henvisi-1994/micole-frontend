import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedFormComponent } from './unauthorized-form.component';

describe('UnauthorizedFormComponent', () => {
  let component: UnauthorizedFormComponent;
  let fixture: ComponentFixture<UnauthorizedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
